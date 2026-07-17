import { NextRequest, NextResponse } from "next/server";
import { getBooking, updateBooking } from "@/lib/bookings";
import { requireAdmin } from "@/lib/admin-auth";
import { sendEmail, emailLayout, itemsTable, escapeHtml } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    // Defense in depth: verify the admin session in-handler, not just in middleware.
    if (!(await requireAdmin(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bookingId, confirmedSlot } = await req.json();

    if (!bookingId || !confirmedSlot) {
      return NextResponse.json({ error: "Missing bookingId or confirmedSlot" }, { status: 400 });
    }

    const booking = await getBooking(bookingId);
    if (!booking || booking.status !== "deposit_paid") {
      return NextResponse.json({ error: "Booking not found or not awaiting confirmation" }, { status: 404 });
    }

    await updateBooking(bookingId, { status: "confirmed", confirmedSlot });

    const safeName = escapeHtml(booking.customerName);
    const safeSlot = escapeHtml(confirmedSlot);
    const safeBookingId = escapeHtml(bookingId);

    await sendEmail(
      booking.customerEmail,
      `You're booked in -- ${confirmedSlot}`,
      emailLayout(`
        <h2 style="margin:0 0 8px;font-size:22px;color:#1f1d1a;">You're booked in!</h2>
        <p style="margin:0 0 20px;color:#6b6660;">Hi ${safeName}, your drop-off slot has been confirmed. See you then!</p>
        <table width="100%" style="border-collapse:collapse;margin:0 0 16px;">
          <tr><td style="padding:4px 0;color:#6b6660;width:180px;">Drop-off slot</td><td style="padding:4px 0;color:#1f1d1a;font-weight:600;">${safeSlot}</td></tr>
          <tr><td style="padding:4px 0;color:#6b6660;">Booking ID</td><td style="padding:4px 0;color:#1f1d1a;">${safeBookingId}</td></tr>
          <tr><td style="padding:4px 0;color:#6b6660;">Deposit paid</td><td style="padding:4px 0;color:#1f1d1a;">£${booking.depositGBP}</td></tr>
          <tr><td style="padding:4px 0;color:#6b6660;">Remainder on collection</td><td style="padding:4px 0;color:#1f1d1a;">£${booking.totalGBP - booking.depositGBP}</td></tr>
        </table>
        <p style="margin:0 0 8px;color:#6b6660;font-size:13px;">Items:</p>
        ${itemsTable(booking.items)}
        <p style="margin:0 0 0;color:#6b6660;font-size:13px;">We'll send you the workshop address the day before your drop-off. Any questions, contact Charlotte at charlottesweeney7@gmail.com</p>
      `)
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/admin/confirm error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
