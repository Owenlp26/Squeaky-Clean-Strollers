import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe-client";
import { getBooking, updateBooking } from "@/lib/bookings";
import { sendEmail, emailLayout, itemsTable } from "@/lib/email";
import { createBookingEvent } from "@/lib/google-calendar";
import { sendSMS } from "@/lib/sms";

export const runtime = "nodejs";

const CHARLOTTE_EMAIL = process.env.NODE_ENV === "development" ? "molly@lochsidecreative.com" : "charlottesweeney7@gmail.com";
const CHARLOTTE_PHONE = "+447344279177";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Stripe webhook signature error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const bookingId = session.metadata?.bookingId;
    if (!bookingId) return NextResponse.json({ ok: true });

    const booking = await getBooking(bookingId);
    if (!booking) return NextResponse.json({ ok: true });

    const slot = booking.selectedSlot;
    const slotLabel = slot?.label ?? booking.confirmedSlot ?? "TBC";
    const isSubscription = session.mode === "subscription";

    if (isSubscription) {
      // Monthly package — store subscription IDs, send subscription-specific emails
      const subscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
      const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id;

      await updateBooking(bookingId, {
        status: "confirmed",
        isSubscription: true,
        stripeSubscriptionId: subscriptionId ?? undefined,
        stripeCustomerId: customerId ?? undefined,
      });

      await sendEmail(
        CHARLOTTE_EMAIL,
        `New monthly subscriber: ${booking.customerName}`,
        emailLayout(`
          <h2 style="margin:0 0 8px;font-size:22px;color:#1f1d1a;">New monthly subscriber!</h2>
          <p style="margin:0 0 20px;color:#6b6660;">£70/month subscription started. First clean arranged for <strong style="color:#1f1d1a;">${slotLabel}</strong>. Contact them to arrange drop-off.</p>
          <table width="100%" style="border-collapse:collapse;margin:0 0 16px;">
            <tr><td style="padding:4px 0;color:#6b6660;width:120px;">Customer</td><td style="padding:4px 0;color:#1f1d1a;font-weight:600;">${booking.customerName}</td></tr>
            <tr><td style="padding:4px 0;color:#6b6660;">Phone</td><td style="padding:4px 0;color:#1f1d1a;">${booking.customerPhone}</td></tr>
            <tr><td style="padding:4px 0;color:#6b6660;">Email</td><td style="padding:4px 0;color:#1f1d1a;">${booking.customerEmail}</td></tr>
            <tr><td style="padding:4px 0;color:#6b6660;">Plan</td><td style="padding:4px 0;color:#1f1d1a;font-weight:600;">£70/month, monthly clean</td></tr>
            <tr><td style="padding:4px 0;color:#6b6660;">Booking ID</td><td style="padding:4px 0;color:#1f1d1a;">${bookingId}</td></tr>
          </table>
        `)
      );

      await sendEmail(
        booking.customerEmail,
        `Your monthly subscription is confirmed`,
        emailLayout(`
          <h2 style="margin:0 0 8px;font-size:22px;color:#1f1d1a;">You&apos;re subscribed!</h2>
          <p style="margin:0 0 20px;color:#6b6660;">Hi ${booking.customerName}, your monthly clean subscription is confirmed. First payment of £70 taken today. You&apos;ll be billed again each month.</p>
          <p style="margin:0 0 20px;color:#6b6660;">Charlotte will be in touch to arrange your first drop-off. Book your monthly slot between the 1st–5th of each month.</p>
          <p style="margin:0;color:#6b6660;font-size:13px;">Any questions? Contact Charlotte at charlottesweeney7@gmail.com or 07344 279177</p>
        `)
      );

      await sendSMS(
        booking.customerPhone,
        `Hi ${booking.customerName.split(" ")[0]}, your Squeaky Clean Strollers monthly subscription is confirmed (£70/month). Charlotte will be in touch to arrange your first drop-off. 07344 279177`
      );

      await sendSMS(
        CHARLOTTE_PHONE,
        `New monthly subscriber: ${booking.customerName}, £70/month started. Contact to arrange first clean.`
      );
    } else {
      // Standard one-off booking
      let calendarEventId: string | null = null;
      if (slot) {
        const itemNames = booking.items.map((i) => i.name).join(", ");
        const durationHours =
          (new Date(`${slot.date}T${slot.endTime}`).getTime() -
            new Date(`${slot.date}T${slot.startTime}`).getTime()) /
          3600000;

        calendarEventId = await createBookingEvent({
          title: `BOOKED: ${booking.customerName} / ${itemNames}`,
          date: slot.date,
          startTime: slot.startTime,
          durationHours,
        });
      }

      await updateBooking(bookingId, {
        status: "confirmed",
        calendarEventId: calendarEventId ?? undefined,
      });

      await sendEmail(
        CHARLOTTE_EMAIL,
        `New booking paid: ${booking.customerName}, ${slotLabel}`,
        emailLayout(`
          <h2 style="margin:0 0 8px;font-size:22px;color:#1f1d1a;">New paid booking!</h2>
          <p style="margin:0 0 20px;color:#6b6660;">Deposit of <strong style="color:#1f1d1a;">£${booking.depositGBP}</strong> received. The slot is confirmed. Please arrange a drop-off time with the customer directly.</p>
          <table width="100%" style="border-collapse:collapse;margin:0 0 16px;">
            <tr><td style="padding:4px 0;color:#6b6660;width:120px;">Customer</td><td style="padding:4px 0;color:#1f1d1a;font-weight:600;">${booking.customerName}</td></tr>
            <tr><td style="padding:4px 0;color:#6b6660;">Phone</td><td style="padding:4px 0;color:#1f1d1a;">${booking.customerPhone}</td></tr>
            <tr><td style="padding:4px 0;color:#6b6660;">Email</td><td style="padding:4px 0;color:#1f1d1a;">${booking.customerEmail}</td></tr>
            <tr><td style="padding:4px 0;color:#6b6660;">Slot</td><td style="padding:4px 0;color:#1f1d1a;font-weight:600;">${slotLabel}</td></tr>
            <tr><td style="padding:4px 0;color:#6b6660;">Booking ID</td><td style="padding:4px 0;color:#1f1d1a;">${bookingId}</td></tr>
            <tr><td style="padding:4px 0;color:#6b6660;">Total</td><td style="padding:4px 0;color:#1f1d1a;">£${booking.totalGBP} (£${booking.depositGBP} paid, £${booking.totalGBP - booking.depositGBP} on collection)</td></tr>
          </table>
          <p style="margin:0 0 4px;color:#6b6660;font-size:13px;">Items:</p>
          ${itemsTable(booking.items)}
          ${calendarEventId ? `<p style="margin:16px 0 0;color:#6b6660;font-size:13px;">Calendar event created for this slot.</p>` : ""}
        `)
      );

      await sendEmail(
        booking.customerEmail,
        `Your booking is confirmed: ${slotLabel}`,
        emailLayout(`
          <h2 style="margin:0 0 8px;font-size:22px;color:#1f1d1a;">You&apos;re booked in!</h2>
          <p style="margin:0 0 20px;color:#6b6660;">Hi ${booking.customerName}, your booking is confirmed for <strong style="color:#1f1d1a;">${slotLabel}</strong>. Charlotte will be in touch to arrange your drop-off time.</p>
          <p style="margin:0 0 8px;color:#6b6660;font-size:13px;">Items booked:</p>
          ${itemsTable(booking.items)}
          <table width="100%" style="border-collapse:collapse;margin:0 0 16px;">
            <tr><td style="padding:4px 0;color:#6b6660;width:160px;">Deposit paid</td><td style="padding:4px 0;color:#1f1d1a;font-weight:600;">£${booking.depositGBP}</td></tr>
            <tr><td style="padding:4px 0;color:#6b6660;">Remainder on collection</td><td style="padding:4px 0;color:#1f1d1a;">£${booking.totalGBP - booking.depositGBP}</td></tr>
          </table>
          <p style="margin:0;color:#6b6660;font-size:13px;">Any questions? Contact Charlotte at charlottesweeney7@gmail.com or 07344 279177</p>
        `)
      );

      await sendSMS(
        booking.customerPhone,
        `Hi ${booking.customerName.split(" ")[0]}, your Squeaky Clean Strollers booking is confirmed for ${slotLabel}. Charlotte will text you to arrange drop-off. Questions? 07344 279177`
      );

      const itemSummary = booking.items.map((i) => i.name).join(", ");
      await sendSMS(
        CHARLOTTE_PHONE,
        `New booking paid: ${booking.customerName}, ${itemSummary}, ${slotLabel}. £${booking.totalGBP} total (£${booking.depositGBP} deposit received)`
      );
    }
  }

  return NextResponse.json({ ok: true });
}
