import { NextRequest, NextResponse } from "next/server";
import { getAvailableWindows } from "@/lib/google-calendar";
import { redis } from "@/lib/db";
import { getClientIp } from "@/lib/client-ip";

const MAX_REQUESTS_PER_WINDOW = 60;
const RATE_WINDOW_SECONDS = 10 * 60; // 10 minutes
const MAX_RANGE_DAYS = 92; // clamp attacker-supplied ranges to a sane maximum

export type AvailabilitySlot = {
  date: string;  // "2025-06-23"
  label: string; // "Mon 23 Jun"
};

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDateLabel(date: string): string {
  const d = new Date(`${date}T12:00:00`);
  return `${DAY_NAMES[d.getDay()]} ${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`;
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export async function GET(req: NextRequest) {
  try {
    // Rate limit by IP: this endpoint is public and each call hits the Google
    // Calendar API, so throttle it to prevent quota-exhaustion abuse. Fail open
    // if Redis is unavailable so genuine customers are never blocked.
    const ip = getClientIp(req);
    try {
      const rateKey = `availability_attempts:${ip}`;
      const count = await redis.incr(rateKey);
      if (count === 1) await redis.expire(rateKey, RATE_WINDOW_SECONDS);
      if (count > MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 }
        );
      }
    } catch (err) {
      console.error("Availability rate-limit check failed (allowing):", err);
    }

    const { searchParams } = new URL(req.url);
    const fromParam = searchParams.get("from");
    const toParam = searchParams.get("to");
    const durationParam = searchParams.get("durationHours");

    if (!fromParam || !toParam) {
      return NextResponse.json({ error: "Missing from/to params" }, { status: 400 });
    }

    const from = new Date(fromParam);
    let to = new Date(toParam);

    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      return NextResponse.json({ error: "Invalid dates" }, { status: 400 });
    }

    if (to <= from) {
      return NextResponse.json({ error: "Invalid date range" }, { status: 400 });
    }

    // Clamp the queried range so a caller can't ask Google for years of data.
    const maxTo = new Date(from.getTime() + MAX_RANGE_DAYS * 24 * 60 * 60 * 1000);
    if (to > maxTo) to = maxTo;

    const durationHours = durationParam ? parseFloat(durationParam) : 0;

    const windows = await getAvailableWindows(from, to);

    if (windows.length === 0) {
      return NextResponse.json({ slots: [] });
    }

    const durationMins = durationHours > 0 ? Math.ceil(durationHours * 60) : 0;

    // How many days the cleaning is allowed to "roll over" across from the
    // drop-off date (matches the 6-day max turnaround).
    const TURNAROUND_DAYS = 6;
    const DAY_MS = 24 * 60 * 60 * 1000;

    // Total available minutes per date (a date can have more than one window).
    const minutesByDate = new Map<string, number>();
    for (const w of windows) {
      const mins = Math.max(0, timeToMinutes(w.end) - timeToMinutes(w.start));
      minutesByDate.set(w.date, (minutesByDate.get(w.date) ?? 0) + mins);
    }

    // Available drop-off dates, chronological.
    const dates = Array.from(minutesByDate.keys()).sort();
    const slots: AvailabilitySlot[] = [];

    for (const date of dates) {
      if (durationMins > 0) {
        // Sum Charlotte's availability from this drop-off date across the
        // turnaround window, so a big basket rolls over into following days.
        const start = new Date(`${date}T00:00:00`).getTime();
        const horizon = start + TURNAROUND_DAYS * DAY_MS;
        let cumulativeMins = 0;
        for (const d of dates) {
          const t = new Date(`${d}T00:00:00`).getTime();
          if (t < start) continue;
          if (t > horizon) break;
          cumulativeMins += minutesByDate.get(d) ?? 0;
        }
        if (cumulativeMins < durationMins) continue;
      }
      slots.push({ date, label: formatDateLabel(date) });
    }

    return NextResponse.json({ slots });
  } catch (err) {
    console.error("GET /api/availability error:", err);
    return NextResponse.json({ slots: [] });
  }
}
