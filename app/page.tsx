import { Hero } from "@/components/Hero";
import { Trustbar } from "@/components/Trustbar";
import { HowItWorks } from "@/components/HowItWorks";
import { BeforeAfterStrip } from "@/components/BeforeAfterStrip";
import { FAQ } from "@/components/FAQ";
import { ReviewCard } from "@/components/ReviewCard";
import { PricingTable } from "@/components/PricingTable";
import { FadeUp } from "@/components/FadeUp";
import Link from "next/link";
import Image from "next/image";

const reviews = [
  {
    quote:
      "I have had quite a few items cleaned by Charlotte including my Bugaboo Donkey, car seat and next to me crib and everything has come up immaculate! Charlotte is so professional and offers such an amazing service with a great turn around time!",
    author: "Amy Stewart",
    item: "Bugaboo Donkey, car seat & next to me crib",
  },
  {
    quote:
      "Had a fabulous experience with Squeaky Clean Strollers recently. Charlotte not only had great communication throughout, but carried the whole clean out so efficiently in incredible timing. I couldn't believe how well everything came up and also how amazing it smelled.",
    author: "Rebecca Knox",
    item: "Prams, car seats, next2me crib & more",
  },
  {
    quote:
      "Amazing service from start to finish. Great communication and such a professional service. I know my babies are safe after their items have been cleaned with such care and attention to detail. Highly recommend and will be back again and again.",
    author: "Deborah McPhee",
    item: "",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Trustbar />

      {/* Services / Pricing section */}
      <section
        id="services"
        className="px-6 py-24"
        style={{ background: "var(--cream)" }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:items-center mb-16">
            <FadeUp>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 500,
                  lineHeight: 1.1,
                  color: "var(--charcoal)",
                }}
              >
                Whatever your little one uses,{" "}
                <em style={{ color: "var(--gold)", fontStyle: "italic" }}>we can get it sparkling clean.</em>
              </h2>
              <p
                className="mt-4 text-base"
                style={{ color: "var(--taupe)" }}
              >
                We clean everything your little one uses, from car seats and buggies to travel cots, high chairs, changing bags and so much more. Every single item is assessed individually, priced fairly and given the same level of care and attention from top to bottom because your little one deserves nothing less.
              </p>
              <Link
                href="/services"
                className="inline-block mt-6 text-sm transition-all duration-200"
                style={{
                  border: "1px solid rgba(42,40,37,0.2)",
                  color: "var(--taupe)",
                  padding: "0.5rem 1.25rem",
                }}
              >
                See full pricing list →
              </Link>
            </FadeUp>

            <FadeUp delay={0.1} className="hidden lg:block">
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src="/charlotte-working.jpg"
                  alt="Charlotte deep cleaning baby equipment"
                  width={420}
                  height={500}
                  className="h-[460px] w-full object-cover object-center"
                />
              </div>
            </FadeUp>
          </div>

          <PricingTable />

          <div className="mt-12 text-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium transition-colors rounded-full"
              style={{ background: "var(--charcoal)", color: "var(--cream)" }}
            >
              Book in now
            </Link>
          </div>
        </div>
      </section>

      <HowItWorks />
      <BeforeAfterStrip />

      {/* Reviews section — charcoal band for mid-page contrast */}
      <section className="px-6 py-24" style={{ background: "var(--charcoal)" }}>
        <div className="mx-auto max-w-6xl">
          <FadeUp className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 500,
                  color: "#ffffff",
                }}
              >
                What families across East Renfrewshire say.
              </h2>
            </div>
            <Link
              href="/reviews"
              className="reviews-link text-sm shrink-0 transition-colors duration-200"
            >
              See all reviews →
            </Link>
          </FadeUp>

          <div className="grid gap-12 sm:grid-cols-3">
            {reviews.map((r, i) => (
              <ReviewCard key={r.author} {...r} dark index={i} />
            ))}
          </div>
        </div>
      </section>

      <FAQ />

      {/* Bottom CTA */}
      <section className="relative overflow-hidden px-6 py-24 text-center" style={{ background: "var(--charcoal)" }}>
        <div className="mx-auto max-w-5xl">
          <div>
            {/* Decorative large ghost text */}
            <div
              aria-hidden
              className="pointer-events-none select-none absolute inset-0 flex items-center justify-center font-display leading-none"
              style={{
                fontSize: "clamp(8rem, 20vw, 16rem)",
                color: "rgba(253,250,244,0.03)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
              }}
            >
              CLEAN
            </div>

            <FadeUp className="relative z-10 mx-auto max-w-2xl">
              {/* Gold rule */}
              <div style={{ width: "40px", height: "1px", background: "var(--gold)", margin: "0 auto 2rem" }} />
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                  fontWeight: 500,
                  color: "#ffffff",
                  lineHeight: 1.15,
                }}
              >
                Imagine collecting your baby items{" "}
                <em style={{ color: "var(--gold)", fontStyle: "italic" }}>sparkling clean</em>
                {" "}without having done a single thing yourself.
              </h2>
              <p
                className="mt-5 text-base mx-auto"
                style={{ color: "rgba(253,250,244,0.55)", maxWidth: "36rem" }}
              >
                Booking takes just a few minutes. Drop off is simple. Collection is the best part.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/book"
                  className="inline-flex items-center rounded-full px-8 py-3.5 text-sm font-medium transition-colors"
                  style={{ background: "var(--gold)", color: "var(--charcoal)" }}
                >
                  Book in now
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center rounded-full border px-8 py-3.5 text-sm font-medium transition-colors"
                  style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}
                >
                  See all services
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
