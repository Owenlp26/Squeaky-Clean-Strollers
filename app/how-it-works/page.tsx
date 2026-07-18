import type { Metadata } from "next";
import Link from "next/link";
import { HowItWorks } from "@/components/HowItWorks";
import { FadeUp } from "@/components/FadeUp";

export const metadata: Metadata = {
  title: "How It Works | Squeaky Clean Strollers",
  description: "Drop off your pram or baby gear at our East Renfrewshire workshop. We deep clean it and you collect it back spotless in 2 to 6 days.",
};

const turnaroundItems = [
  { name: "Single pram / buggy", turnaround: "Up to 6 days" },
  { name: "Double pram / buggy", turnaround: "Up to 6 days" },
  { name: "Doona", turnaround: "Up to 2 days" },
  { name: "Car seat", turnaround: "Up to 2 days" },
  { name: "Travel cot / next to me crib", turnaround: "Up to 6 days" },
  { name: "High chair / bouncer / Sleepyhead", turnaround: "Up to 6 days" },
  { name: "Changing bag / footmuff / cover", turnaround: "Up to 6 days" },
  { name: "Emergency buggy clean", turnaround: "24 hours" },
  { name: "Emergency car seat clean", turnaround: "24 hours" },
];

export default function HowItWorksPage() {
  return (
    <div>
      {/* Charcoal intro */}
      <div className="px-6 py-16 lg:py-20" style={{ background: "var(--charcoal)" }}>
        <div className="mx-auto max-w-6xl">
          <FadeUp className="max-w-2xl">
            <h1 className="font-display text-4xl tracking-tight sm:text-5xl" style={{ color: "#ffffff" }}>
              Simple, fast, no fuss.
            </h1>
            <p className="mt-4 text-base" style={{ color: "rgba(253,250,244,0.6)" }}>
              Drop it off. We do the hard work. You get it back spotless.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* HowItWorks component — already gold-soft */}
      <HowItWorks />

      {/* Step detail cards — gold-soft band */}
      <div className="px-6 py-16" style={{ background: "var(--gold-soft)" }}>
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl mb-10" style={{ fontWeight: 500, color: "var(--charcoal)" }}>
            Here's exactly what we do
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl p-6 text-sm leading-relaxed" style={{ background: "var(--cream)", border: "1px solid rgba(42,40,37,0.08)" }}>
              <div className="font-display text-sm" style={{ color: "var(--gold)" }}>01 &amp; 02</div>
              <h3 className="mt-1 font-display text-lg font-semibold" style={{ color: "var(--charcoal)" }}>Getting started</h3>
              <p className="mt-2" style={{ color: "var(--taupe)" }}>
                Fill in the booking form on the <Link href="/book" style={{ color: "var(--gold)" }} className="underline underline-offset-2">book in page</Link> with your item type, contact details and preferred drop-off date. Charlotte will confirm your slot and send through the workshop address.
              </p>
            </div>
            <div className="rounded-2xl p-6 text-sm leading-relaxed" style={{ background: "var(--cream)", border: "1px solid rgba(42,40,37,0.08)" }}>
              <div className="font-display text-sm" style={{ color: "var(--gold)" }}>03</div>
              <h3 className="mt-1 font-display text-lg font-semibold" style={{ color: "var(--charcoal)" }}>The clean</h3>
              <p className="mt-2" style={{ color: "var(--taupe)" }}>
                All fabric is removed where possible and deep cleaned with a specialist shampoo, then steam sanitised. Bases and frames are cleaned in every crevice: buckles, straps, wheels. Everything is reassembled once fully dry, then steam cleaned once more to make sure nothing is missed. If there&apos;s mould or heavy soiling, we&apos;ll always let you know before proceeding. A £8 surcharge applies.
              </p>
            </div>
            <div className="rounded-2xl p-6 text-sm leading-relaxed" style={{ background: "var(--cream)", border: "1px solid rgba(42,40,37,0.08)" }}>
              <div className="font-display text-sm" style={{ color: "var(--gold)" }}>04</div>
              <h3 className="mt-1 font-display text-lg font-semibold" style={{ color: "var(--charcoal)" }}>Come and collect</h3>
              <p className="mt-2" style={{ color: "var(--taupe)" }}>
                Once your item is ready, Charlotte will let you know and you come and collect it from the workshop. Fresh, clean and ready to go.
              </p>
            </div>
            <div className="rounded-2xl p-6 text-sm leading-relaxed" style={{ background: "var(--cream)", border: "1px solid rgba(42,40,37,0.08)" }}>
              <div className="font-display text-sm" style={{ color: "var(--gold)" }}>Payment</div>
              <h3 className="mt-1 font-display text-lg font-semibold" style={{ color: "var(--charcoal)" }}>When do I pay?</h3>
              <p className="mt-2" style={{ color: "var(--taupe)" }}>
                A 25% deposit is taken online when you book to secure your slot. The remainder is due when you collect. Prices are fixed and include everything.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Turnaround table — charcoal */}
      <div className="px-6 py-20" style={{ background: "var(--charcoal)" }}>
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl tracking-tight" style={{ fontWeight: 500, color: "#ffffff" }}>Turnaround times</h2>
          <p className="mt-2 text-sm" style={{ color: "rgba(253,250,244,0.5)" }}>These are maximum times, most items are ready sooner.</p>
          <div className="mt-8 overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}>
            {turnaroundItems.map((row, i) => (
              <div
                key={row.name}
                className="flex items-center justify-between px-5 py-4 text-sm"
                style={{
                  borderBottom: i < turnaroundItems.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                }}
              >
                <span style={{ color: "rgba(253,250,244,0.75)" }}>{row.name}</span>
                <span
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={
                    row.turnaround === "24 hours"
                      ? { background: "var(--gold)", color: "var(--charcoal)" }
                      : { background: "rgba(255,255,255,0.08)", color: "rgba(253,250,244,0.7)" }
                  }
                >
                  {row.turnaround}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/book"
              className="inline-flex items-center rounded-full px-8 py-4 text-sm font-medium transition-colors"
              style={{ background: "var(--gold)", color: "var(--charcoal)" }}
            >
              Book in now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
