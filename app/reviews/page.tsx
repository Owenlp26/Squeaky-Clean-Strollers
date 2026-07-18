"use client";

import { ReviewCarousel } from "@/components/ReviewCarousel";
import { FadeUp } from "@/components/FadeUp";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

function useCountUp(target: number, duration = 1400, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const raf = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

function StatItem({ value, suffix, label }: { value: number | string; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const isNumber = typeof value === "number";
  const counted = useCountUp(isNumber ? value : 0, 1200, inView && isNumber);

  return (
    <div ref={ref}>
      <div className="font-display text-5xl" style={{ color: "#ffffff" }}>
        {isNumber ? counted : value}{suffix ?? ""}
      </div>
      <div className="mt-1 text-sm" style={{ color: "rgba(253,250,244,0.55)" }}>{label}</div>
    </div>
  );
}

const reviews = [
  {
    name: "Amy Stewart",
    location: "East Renfrewshire",
    date: "June 2025",
    rating: 5,
    item: "Bugaboo Donkey, car seat & next to me crib",
    body: "I have had quite a few items cleaned by Charlotte including my Bugaboo Donkey, car seat and next to me crib and everything has come up immaculate! Charlotte is so professional and offers such an amazing service with a great turn around time!",
  },
  {
    name: "Rosie Shum",
    location: "East Renfrewshire",
    date: "June 2025",
    rating: 5,
    item: "Pram & car seat",
    body: "I've had multiple items cleaned by Charlotte for my children and all have come back sparkling new and smelling beautiful! She re-cleaned our pram and inserts for our 4th baby and everything was all fresh and lovely for our new arrival. Highly highly recommend esp for the toddler car seats.",
  },
  {
    name: "Erin Glancey",
    location: "East Renfrewshire",
    date: "June 2025",
    rating: 5,
    item: "Pram",
    body: "Great service and pram was restored to an excellent condition. Highly recommend.",
  },
  {
    name: "Simone Thomson",
    location: "East Renfrewshire",
    date: "June 2025",
    rating: 5,
    item: "Pram",
    body: "I had my pram done by squeaky clean stroller and my pram was like new. I will be using again in the future and will recommend to family and friends. Thanks",
  },
  {
    name: "Deborah McPhee",
    location: "East Renfrewshire",
    date: "June 2025",
    rating: 5,
    item: "",
    body: "Amazing service from start to finish. Great communication and such a professional service. I know my babies are safe after their items have been cleaned with such care and attention to detail. Highly recommend and will be back again and again.",
  },
  {
    name: "Rebecca Knox",
    location: "East Renfrewshire",
    date: "June 2025",
    rating: 5,
    item: "Prams, car seats, next2me crib, Dockatot & more",
    body: "Had a fabulous experience with Squeaky Clean Strollers recently. We are expecting our second child's arrival in the coming weeks and had sent all our first child's prams, next2me crib, car seats, inserts, Dockatot and more to Charlotte to get cleaned and sterilised for our newest arrival. Charlotte not only had great communication throughout, but carried the whole clean out so efficiently in incredible timing. I couldn't believe how well everything came up and also how amazing it smelled. She really paid attention to detail and was in full communication throughout.",
  },
];

export default function ReviewsPage() {

  return (
    <div>
      {/* Charcoal header + stats */}
      <div className="px-6 py-16 lg:py-20" style={{ background: "var(--charcoal)" }}>
        <div className="mx-auto max-w-6xl">
          <FadeUp className="max-w-2xl">
            <h1 className="font-display text-4xl tracking-tight sm:text-5xl" style={{ color: "#ffffff" }}>
              What families across East Renfrewshire are saying.
            </h1>
          </FadeUp>

          {/* Stats — count-up on scroll */}
          <div className="mt-12 flex flex-wrap gap-10 py-8" style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
            <StatItem value="5 star" label="rated" />
            <StatItem value={240} suffix="+" label="items cleaned" />
            <StatItem value="6 days" label="max turnaround" />
          </div>
        </div>
      </div>

      {/* Review slideshow — cream */}
      <div className="px-6 py-16" style={{ background: "var(--cream)" }}>
        <div className="mx-auto max-w-6xl">
          <ReviewCarousel reviews={reviews} />
        </div>
      </div>

      {/* CTA — charcoal */}
      <div className="px-6 py-16" style={{ background: "var(--charcoal)" }}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-display text-2xl" style={{ fontWeight: 500, color: "#ffffff" }}>Had a great experience?</h2>
            <p className="mt-2 text-sm" style={{ color: "rgba(253,250,244,0.6)" }}>
              We&apos;d love it if you left us a review on Google. It helps other families across East Renfrewshire find us.
            </p>
            <a
              href="https://share.google/UuJXuKoeugvN3WRNh"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center rounded-full px-6 py-3 text-sm font-medium transition-colors"
              style={{ background: "var(--gold)", color: "var(--charcoal)" }}
            >
              Leave a Google review
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
