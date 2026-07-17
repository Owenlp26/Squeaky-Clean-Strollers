import { NextRequest, NextResponse } from "next/server";
import { getAvailableWindows } from "@/lib/google-calendar";

export type AvailabilitySlot = {
  date: string;      // "2025-06-23"
  startTime: string; // "09:00"
  endTime: string;   // "11:30"
  label: string;     // "Mon 23 Jun, 9:00am"
};

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatSlotLabel(date: string, startTime: string): string {
  const d = new Date(`${date}T${startTime}`);
  const day = DAY_NAMES[d.getDay()];
  const month = MONTH_NAMES[d.getMonth()];
  const dateNum = d.getDate();
  const hour = d.getHours();
  const min = d.getMinutes();
  const ampm = hour < 12 ? "am" : "pm";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const minStr = min === 0 ? "" : `:${String(min).padStart(2, "0")}`;
  return `${day} ${dateNum} ${month}, ${hour12}${minStr}${ampm}`;
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
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

    if (!durationHours || durationHours <= 0) {
      return NextResponse.json({ slots: [] });
    }

    const windows = await getAvailableWindows(from, to);

    if (windows.length === 0) {
      return NextResponse.json({ slots: [] });
    }

    const durationMins = Math.ceil(durationHours * 60);
    const slots: AvailabilitySlot[] = [];

    for (const window of windows) {
      const windowStartMins = timeToMinutes(window.start);
      const windowEndMins = timeToMinutes(window.end);

      // Slice window into consecutive blocks of durationMins
      let cursor = windowStartMins;
      while (cursor + durationMins <= windowEndMins) {
        const slotStart = minutesToTime(cursor);
        const slotEnd = minutesToTime(cursor + durationMins);
        slots.push({
          date: window.date,
          startTime: slotStart,
          endTime: slotEnd,
          label: formatSlotLabel(window.date, slotStart),
        });
        cursor += durationMins;
      }
    }

    return NextResponse.json({ slots });
  } catch (err) {
    console.error("GET /api/availability error:", err);
    return NextResponse.json({ slots: [] });
  }
}
