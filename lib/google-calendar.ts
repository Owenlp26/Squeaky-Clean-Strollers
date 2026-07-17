import { redis } from "./db";

const REFRESH_TOKEN_KEY = "google:calendar:refresh_token";

async function getAccessToken(): Promise<string | null> {
  const refreshToken = await redis.get<string>(REFRESH_TOKEN_KEY);
  if (!refreshToken) return null;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.access_token ?? null;
}

// Returns YYYY-MM-DD strings for days that have ANY busy block
export async function getBusyDates(from: Date, to: Date): Promise<string[]> {
  const accessToken = await getAccessToken();
  if (!accessToken) return [];

  const res = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      timeMin: from.toISOString(),
      timeMax: to.toISOString(),
      items: [{ id: "primary" }],
    }),
  });

  if (!res.ok) return [];

  const data = await res.json();
  const busy: { start: string; end: string }[] = data.calendars?.primary?.busy ?? [];

  const busyDates = new Set<string>();
  for (const block of busy) {
    const start = new Date(block.start);
    const end = new Date(block.end);
    const cursor = new Date(start);
    cursor.setUTCHours(0, 0, 0, 0);
    while (cursor <= end) {
      busyDates.add(cursor.toISOString().slice(0, 10));
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
  }

  return Array.from(busyDates);
}

export type AvailableWindow = {
  date: string;  // "2025-06-23"
  start: string; // "09:00"
  end: string;   // "13:00"
};

// Find Charlotte's "Available" calendar events and return their time windows
export async function getAvailableWindows(from: Date, to: Date): Promise<AvailableWindow[]> {
  const accessToken = await getAccessToken();
  if (!accessToken) return [];

  const params = new URLSearchParams({
    timeMin: from.toISOString(),
    timeMax: to.toISOString(),
    singleEvents: "true",
    orderBy: "startTime",
    q: "Available",
  });

  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (!res.ok) return [];

  const data = await res.json();
  const events: { summary?: string; start?: { dateTime?: string }; end?: { dateTime?: string } }[] =
    data.items ?? [];

  const windows: AvailableWindow[] = [];
  for (const event of events) {
    if (event.summary?.toLowerCase().trim() !== "available") continue;
    if (!event.start?.dateTime || !event.end?.dateTime) continue;

    const startDt = new Date(event.start.dateTime);
    const endDt = new Date(event.end.dateTime);

    const date = startDt.toLocaleDateString("en-CA"); // YYYY-MM-DD in local time
    const start = startDt.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    const end = endDt.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

    windows.push({ date, start, end });
  }

  return windows;
}

// Create a calendar event to block a booked slot
export async function createBookingEvent(params: {
  title: string;
  date: string;       // "2025-06-23"
  startTime: string;  // "09:00"
  durationHours: number;
}): Promise<string | null> {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  const [year, month, day] = params.date.split("-").map(Number);
  const [startHour, startMin] = params.startTime.split(":").map(Number);

  const startDt = new Date(year, month - 1, day, startHour, startMin);
  const endDt = new Date(startDt.getTime() + params.durationHours * 60 * 60 * 1000);

  // Format as local ISO string for Google Calendar
  function toLocalISO(d: Date): string {
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
  }

  // Detect timezone offset (best effort)
  const tzOffset = -new Date().getTimezoneOffset();
  const tzSign = tzOffset >= 0 ? "+" : "-";
  const tzHours = String(Math.floor(Math.abs(tzOffset) / 60)).padStart(2, "0");
  const tzMins = String(Math.abs(tzOffset) % 60).padStart(2, "0");
  const timeZone = `Etc/GMT${tzSign}${tzHours}` ; // approximate, good enough

  const res = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary: params.title,
        start: { dateTime: `${toLocalISO(startDt)}${tzSign}${tzHours}:${tzMins}` },
        end: { dateTime: `${toLocalISO(endDt)}${tzSign}${tzHours}:${tzMins}` },
        colorId: "11", // Tomato red — clearly a booking
      }),
    }
  );

  if (!res.ok) {
    console.error("createBookingEvent failed:", await res.text());
    return null;
  }

  const event = await res.json();
  return event.id ?? null;
}

export async function saveRefreshToken(token: string): Promise<void> {
  await redis.set(REFRESH_TOKEN_KEY, token);
}

export async function isCalendarConnected(): Promise<boolean> {
  const token = await redis.get<string>(REFRESH_TOKEN_KEY);
  return !!token;
}
