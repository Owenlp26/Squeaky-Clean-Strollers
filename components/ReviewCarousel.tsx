"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Review = {
  name: string;
  location?: string;
  date?: string;
  rating?: number;
  item?: string;
  body: string;
};

const AUTO_ADVANCE_MS = 7000;

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 64 : -64 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -64 : 64 }),
};

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      {direction === "left" ? (
        <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const count = reviews.length;

  const paginate = useCallback(
    (dir: number) => {
      setState(([current]) => [(current + dir + count) % count, dir]);
    },
    [count]
  );

  const goTo = useCallback(
    (target: number) => {
      setState(([current]) => [target, target > current ? 1 : -1]);
    },
    []
  );

  // Auto-advance, paused on hover/focus/interaction.
  useEffect(() => {
    if (paused || count <= 1) return;
    const id = setTimeout(() => paginate(1), AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
  }, [index, paused, count, paginate]);

  const review = reviews[index];

  return (
    <div
      className="mx-auto max-w-2xl"
      role="group"
      aria-roledescription="carousel"
      aria-label="Customer reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") paginate(-1);
        if (e.key === "ArrowRight") paginate(1);
      }}
    >
      {/* Slide viewport */}
      <div className="relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.article
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) paginate(1);
              else if (info.offset.x > 80) paginate(-1);
            }}
            className="flex min-h-[300px] cursor-grab flex-col rounded-3xl bg-white px-8 py-10 active:cursor-grabbing sm:px-12"
            style={{ border: "1px solid #e8e3da", boxShadow: "0 20px 45px -30px rgba(31,29,26,0.35)" }}
            aria-roledescription="slide"
            aria-label={`Review ${index + 1} of ${count}`}
          >
            {/* Decorative quote mark */}
            <div
              aria-hidden
              style={{
                fontSize: "clamp(4.5rem, 9vw, 7rem)",
                color: "var(--gold)",
                opacity: 0.5,
                lineHeight: 0.6,
                marginBottom: "-0.5rem",
                fontFamily: "Georgia, serif",
                userSelect: "none",
              }}
            >
              &ldquo;
            </div>

            <p
              className="text-base sm:text-lg"
              style={{ color: "var(--charcoal)", lineHeight: 1.8, fontStyle: "italic" }}
            >
              {review.body}
            </p>

            <div className="mt-auto pt-6">
              <div className="mb-1.5 flex gap-0.5">
                {Array.from({ length: review.rating ?? 5 }).map((_, i) => (
                  <svg key={i} width="13" height="13" viewBox="0 0 12 12" fill="var(--gold)" aria-hidden>
                    <path d="M6 1l1.3 2.6L10 4l-2 1.9.5 2.7L6 7.4l-2.5 1.2.5-2.7L2 4l2.7-.4z" />
                  </svg>
                ))}
              </div>
              <div className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--charcoal)" }}>
                {review.name}
              </div>
              {review.item && (
                <div className="mt-0.5 text-xs" style={{ color: "var(--taupe)" }}>
                  {review.item}
                </div>
              )}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-7 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => paginate(-1)}
          aria-label="Previous review"
          className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
          style={{ border: "1px solid #d8d2c6", color: "var(--charcoal)", background: "#fff" }}
        >
          <Arrow direction="left" />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Select review">
          {reviews.map((r, i) => (
            <button
              key={r.name + i}
              type="button"
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to review ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                height: 8,
                width: i === index ? 24 : 8,
                background: i === index ? "var(--gold)" : "#d8d2c6",
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => paginate(1)}
          aria-label="Next review"
          className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
          style={{ border: "1px solid #d8d2c6", color: "var(--charcoal)", background: "#fff" }}
        >
          <Arrow direction="right" />
        </button>
      </div>

      <div className="mt-4 text-center text-xs tracking-[0.2em]" style={{ color: "var(--taupe)" }} aria-live="polite">
        {index + 1} / {count}
      </div>
    </div>
  );
}
