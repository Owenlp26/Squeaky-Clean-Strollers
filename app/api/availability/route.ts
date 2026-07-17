import { NextRequest, NextResponse } from "next/server";
import { getAvailableWindows } from "@/lib/google-calendar";

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
    const { searchParams } = new URL(req.url);
    const fromParam = searchParams.get("from");
    const toParam = searchParams.get("to");
    const durationParam = searchParams.get("durationHours");

    if (!fromParam || !toParam) {
      return NextResponse.json({ error: "Missing from/to params" }, { status: 400 });
    }

    const from = new Date(fromParam);
    const to = new Date(toParam);

    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      return NextResponse.json({ error: "Invalid dates" }, { status: 400 });
    }

    const durationHours = durationParam ? parseFloat(durationParam) : 0;

    const windows = await getAvailableWindows(from, to);

    if (windows.length === 0) {
      return NextResponse.json({ slots: [] });
    }

    const durationMins = durationHours > 0 ? Math.ceil(durationHours * 60) : 0;
    const seenDates = new Set<string>();
    const slots: AvailabilitySlot[] = [];

    for (const window of windows) {
      if (seenDates.has(window.date)) continue;
      // Only include the date if the window is long enough for the service
      const windowMins = timeToMinutes(window.end) - timeToMinutes(window.start);
      if (durationMins > 0 && windowMins < durationMins) continue;
      seenDates.add(window.date);
      slots.push({ date: window.date, label: formatDateLabel(window.date) });
    }

    return NextResponse.json({ slots });
  } catch (err) {
    console.error("GET /api/availability error:", err);
    return NextResponse.json({ slots: [] });
  }
}
