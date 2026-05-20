import Link from "next/link";
import { getServiceBySlug } from "@/data/services";

export const metadata = {
  title: "Booking confirmed — Wheel & Wash",
};

export default async function Thanks({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service: slug } = await searchParams;
  const service = slug ? getServiceBySlug(slug) : undefined;

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-background">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-7 w-7">
          <path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        Your pram clean is booked.
      </h1>

      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
        {service ? (
          <>
            Your <span className="font-medium text-foreground">{service.name}</span> is
            confirmed and the payment of{" "}
            <span className="font-medium text-foreground">£{service.priceGBP}</span> has
            been received.
          </>
        ) : (
          <>Your booking is confirmed and payment has been received.</>
        )}{" "}
        A confirmation email is on its way with your collection window.
      </p>

      <div className="mt-10 grid w-full gap-3 sm:grid-cols-3 sm:text-sm">
        <Card label="Next step" value="We'll text you the morning of collection with a 1-hour window." />
        <Card label="Need to change it?" value="Reschedule free up to 24h before from your confirmation email." />
        <Card label="Questions?" value="hello@wheelandwash.co · 020 1234 5678" />
      </div>

      <div className="mt-12 flex gap-3">
        <Link
          href="/"
          className="rounded-full border border-border bg-card px-5 py-3 text-sm font-medium hover:border-accent hover:text-accent"
        >
          Back to home
        </Link>
        <Link
          href="/#services"
          className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background hover:bg-accent"
        >
          Book another
        </Link>
      </div>
    </div>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 text-left">
      <div className="text-xs uppercase tracking-[0.18em] text-muted">{label}</div>
      <div className="mt-2 text-sm leading-relaxed">{value}</div>
    </div>
  );
}
