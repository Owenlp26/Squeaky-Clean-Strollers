import { getBooking } from "@/lib/bookings";
import { ConfirmForm } from "./ConfirmForm";

export default async function ConfirmPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = await params;
  const booking = await getBooking(bookingId);

  if (!booking || booking.status !== "deposit_paid") {
    return (
      <div className="mx-auto max-w-lg px-6 py-20 text-center">
        <h1 className="font-display text-3xl font-semibold">Booking not found</h1>
        <p className="mt-3 text-muted">This booking doesn&apos;t exist or has already been confirmed.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">Admin</p>
      <h1 className="mt-3 font-display text-3xl font-semibold">Confirm a slot</h1>
      <p className="mt-2 text-muted">Booking <span className="font-medium text-foreground">{booking.id}</span></p>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-sm">
        <div className="grid gap-2">
          <div className="flex justify-between"><span className="text-muted">Customer</span><span className="font-medium">{booking.customerName}</span></div>
          <div className="flex justify-between"><span className="text-muted">Phone</span><span>{booking.customerPhone}</span></div>
          <div className="flex justify-between"><span className="text-muted">Email</span><span>{booking.customerEmail}</span></div>
          <div className="flex justify-between"><span className="text-muted">Deposit paid</span><span className="font-medium text-accent">£{booking.depositGBP}</span></div>
          <div className="flex justify-between"><span className="text-muted">Remainder</span><span>£{booking.totalGBP - booking.depositGBP}</span></div>
        </div>
        <div className="mt-4 border-t border-border pt-4">
          <p className="mb-2 text-muted">Items:</p>
          <ul className="space-y-1">
            {booking.items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name}</span><span className="text-muted">£{item.priceGBP}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 border-t border-border pt-4">
          <p className="mb-2 text-muted">Their availability:</p>
          <ul className="space-y-1">
            {booking.availability.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
          {booking.availabilityNotes && (
            <p className="mt-2 text-muted">Notes: <span className="text-foreground">{booking.availabilityNotes}</span></p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <ConfirmForm bookingId={booking.id} customerEmail={booking.customerEmail} />
      </div>
    </div>
  );
}
