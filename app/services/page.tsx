import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PricingTable } from "@/components/PricingTable";
import { FadeUp } from "@/components/FadeUp";

export const metadata: Metadata = {
  title: "Services & Pricing | Squeaky Clean Strollers",
  description: "Full pricing for pram cleaning, car seat cleaning, and all baby gear. East Renfrewshire-based. Book in online.",
};

export default function ServicesPage() {
  return (
    <div>
      {/* Charcoal header band */}
      <div className="px-6 py-16 lg:py-20" style={{ background: "var(--charcoal)" }}>
        <div className="mx-auto max-w-6xl">
          <FadeUp className="max-w-3xl">
            <h1 className="font-display text-4xl tracking-tight sm:text-5xl" style={{ color: "#ffffff" }}>
              Professional cleaning for everything your little one uses.
            </h1>
            <p className="mt-4 text-base max-w-2xl" style={{ color: "rgba(253,250,244,0.6)" }}>
              Your little one&apos;s equipment collects bacteria, grime and buildup in all the little places you cannot see and cannot reach no matter how often you wipe it down, which is why every service we offer is a full professional deep clean from top to bottom until every single part is sparkling clean, sanitised and genuinely fresh.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Before/after + process photos */}
      <div className="px-6 py-12" style={{ background: "var(--cream)" }}>
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="overflow-hidden rounded-2xl sm:col-span-2 lg:col-span-1">
              <Image
                src="/process.jpg"
                alt="Charlotte deep cleaning a car seat"
                width={600}
                height={400}
                className="h-[280px] w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/hero.png"
                alt="Charlotte cleaning a buggy seat with specialist equipment"
                width={600}
                height={400}
                className="h-[280px] w-full object-cover object-top"
              />
            </div>
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/after.png"
                alt="Clean Egg pram after a full deep clean"
                width={600}
                height={400}
                className="h-[280px] w-full object-cover object-top"
              />
            </div>
          </div>

          <div className="mt-14">
            <PricingTable />
          </div>
        </div>
      </div>

      {/* CTA banner — charcoal */}
      <div className="px-6 py-20" style={{ background: "var(--charcoal)" }}>
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl sm:text-4xl" style={{ fontWeight: 500, color: "#ffffff" }}>
            Got something unusual? Just ask.
          </h2>
          <p className="mt-3 text-base" style={{ color: "rgba(253,250,244,0.6)" }}>
            If your item isn&apos;t listed, get in touch and we&apos;ll quote you back the same day.
          </p>
          <Link
            href="/book"
            className="mt-6 inline-flex items-center rounded-full px-6 py-3 text-sm font-medium transition-colors"
            style={{ background: "var(--gold)", color: "var(--charcoal)" }}
          >
            Book in
          </Link>
        </div>
      </div>
    </div>
  );
}
