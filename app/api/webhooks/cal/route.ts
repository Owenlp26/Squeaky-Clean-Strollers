import { NextResponse } from "next/server";
import { verifyCalSignature } from "@/lib/verifyCalWebhook";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "CAL_WEBHOOK_SECRET not configured" },
      { status: 500 },
    );
  }

  const raw = await req.text();
  const signature = req.headers.get("x-cal-signature-256");

  if (!verifyCalSignature(raw, signature, secret)) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  let payload: { triggerEvent?: string; payload?: Record<string, unknown> };
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  if (payload.triggerEvent === "BOOKING_PAID") {
    const p = (payload.payload ?? {}) as {
      title?: string;
      startTime?: string;
      attendees?: Array<{ name?: string; email?: string }>;
      paymentInfo?: { amount?: number; currency?: string };
    };
    console.log("[cal webhook] BOOKING_PAID", {
      title: p.title,
      startTime: p.startTime,
      attendee: p.attendees?.[0],
      amount: p.paymentInfo?.amount,
      currency: p.paymentInfo?.currency,
    });
  } else {
    console.log("[cal webhook] event:", payload.triggerEvent);
  }

  return NextResponse.json({ ok: true });
}
