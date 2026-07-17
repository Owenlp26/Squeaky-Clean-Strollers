import { NextRequest, NextResponse } from "next/server";
import { createBooking, updateBooking, type BookingItem, type BookingSlot } from "@/lib/bookings";
import { stripe } from "@/lib/stripe-client";
import { getServiceItemById } from "@/data/services";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, customerPhone, customerEmail, itemIds, availability, availabilityNotes, selectedSlot, isSubscription } = body;

    if (!customerName || !customerPhone || !customerEmail || !itemIds?.length || !availability?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Resolve items from catalogue
    const items: BookingItem[] = itemIds.map((id: string) => {
      const item = getServiceItemById(id);
      if (!item) throw new Error(`Unknown item: ${id}`);
      return { id: item.id, name: item.name, priceGBP: item.priceGBP };
    });

    const totalGBP = items.reduce((sum, i) => sum + i.priceGBP, 0);
    const depositGBP = isSubscription ? totalGBP : Math.ceil(totalGBP * 0.25);

    // Create booking first so we have the ID for Stripe metadata
    const booking = await createBooking({
      customerName,
      customerPhone,
      customerEmail,
      items,
      totalGBP,
      depositGBP,
      availability,
      availabilityNotes,
      selectedSlot: selectedSlot as BookingSlot | undefined,
      isSubscription: !!isSubscription,
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    let session;

    if (isSubscription) {
      // Monthly package — use subscription mode with a pre-created Stripe Price
      const priceId = process.env.STRIPE_MONTHLY_PRICE_ID;
      if (!priceId) throw new Error("STRIPE_MONTHLY_PRICE_ID is not set");

      session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [{ price: priceId, quantity: 1 }],
        metadata: { bookingId: booking.id },
        subscription_data: { metadata: { bookingId: booking.id } },
        success_url: `${siteUrl}/book/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/book`,
      });
    } else {
      // Standard booking — 25% deposit via one-off payment
      session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "gbp",
              unit_amount: depositGBP * 100,
              product_data: {
                name: `Booking deposit (${booking.id})`,
                description: items.map((i) => i.name).join(", "),
              },
            },
          },
        ],
        metadata: { bookingId: booking.id },
        success_url: `${siteUrl}/book/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/book`,
        expires_at: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
      });
    }

    // Store Stripe session details on booking
    await updateBooking(booking.id, {
      stripeSessionId: session.id,
      stripeCheckoutUrl: session.url ?? undefined,
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (err) {
    console.error("POST /api/bookings error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
