import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingFlow } from "@/components/BookingFlow";
import { serviceCategories } from "@/data/services";

export const metadata: Metadata = {
  title: "Book in | Squeaky Clean Strollers",
  description: "Book your pram or baby gear for a deep clean. Select your items, tell us your availability, and we'll confirm your slot.",
};

export default function BookPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
      <div className="max-w-xl">
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
          Ready to get your baby items professionally cleaned?
        </h1>
        <p className="mt-4 text-base text-muted">
          It is time to choose your items, pick your slot and get that job crossed off your list for good. Simply select your service and preferred date, secure your booking with a 25% deposit and we will be in touch to confirm your drop off time. Everything else is taken care of from there.
        </p>
        <p className="mt-3 text-sm text-muted">
          We have a small number of spare buggies and car seats available to borrow while your item is being cleaned. Just ask when booking.
        </p>
      </div>

      <div className="mt-10">
        <Suspense fallback={null}>
          <BookingFlow categories={serviceCategories} />
        </Suspense>
      </div>
    </div>
  );
}
