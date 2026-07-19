import { redis } from "./db";
import { nanoid } from "nanoid";
import { BOOKING_PREFIX } from "./config";

export type BookingStatus =
  | "awaiting_deposit" // submitted, waiting for customer deposit
  | "deposit_paid"     // deposit received, Charlotte to confirm slot
  | "confirmed"        // slot confirmed
  | "cancelled";

export type BookingItem = {
  id: string;
  name: string;
  priceGBP: number;
};

export type BookingSlot = {
  date: string;
  label: string;
};

export type Booking = {
  id: string;            // e.g. "SCS-Xk3m9"
  status: BookingStatus;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: BookingItem[];
  totalGBP: number;
  depositGBP: number;    // Math.ceil(totalGBP * DEPOSIT_PERCENT)
  availability: string[];  // kept for backward compat; now typically just the slot label
  availabilityNotes?: string;
  selectedSlot?: BookingSlot;  // the specific slot the customer booked
  paidInFull?: boolean;        // true if the customer chose to pay the full amount now (not just the deposit)
  confirmedSlot?: string;      // Charlotte's confirmed date/time text (legacy / edge cases)
  calendarEventId?: string;    // Google Calendar event ID created on payment
  stripeCheckoutUrl?: string;
  stripeSessionId?: string;
  isSubscription?: boolean;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  createdAt: number;
  updatedAt: number;
};


export function generateBookingId(): string {
  return `${BOOKING_PREFIX}-${nanoid(6).toUpperCase()}`;
}

export async function createBooking(data: Omit<Booking, "id" | "status" | "createdAt" | "updatedAt">): Promise<Booking> {
  const now = Date.now();
  const booking: Booking = {
    ...data,
    id: generateBookingId(),
    status: "awaiting_deposit",
    createdAt: now,
    updatedAt: now,
  };
  await redis.set(`booking:${booking.id}`, booking);
  return booking;
}

export async function getBooking(id: string): Promise<Booking | null> {
  return redis.get<Booking>(`booking:${id}`);
}

export async function updateBooking(id: string, updates: Partial<Booking>): Promise<Booking | null> {
  const existing = await getBooking(id);
  if (!existing) return null;
  const updated: Booking = { ...existing, ...updates, updatedAt: Date.now() };
  await redis.set(`booking:${id}`, updated);
  return updated;
}

