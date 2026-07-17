"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ReviewCardProps {
  quote: string;
  author: string;
  item?: string;
  rating?: number;
  dark?: boolean;
  index?: number;
}

export function ReviewCard({ quote, author, item, rating = 5, dark = false, index = 0 }: ReviewCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const hoverBorder = dark ? "2px solid rgba(255,255,255,0.3)" : "2px solid var(--charcoal)";
  const direction = index % 2 === 0 ? -40 : 40;

  const handleMouseEnter = () => {
    if (quoteRef.current) quoteRef.current.style.borderBottom = hoverBorder;
  };
  const handleMouseLeave = () => {
    if (quoteRef.current) quoteRef.current.style.borderBottom = "2px solid transparent";
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, x: direction }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.1 }}
      className="py-2 flex flex-col h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Huge decorative quote mark */}
      <div
        aria-hidden
        style={{
          fontSize: "clamp(6rem, 12vw, 10rem)",
          color: "var(--gold)",
          opacity: dark ? 0.4 : 0.5,
          lineHeight: 0.6,
          marginBottom: "-1rem",
          fontFamily: "Georgia, serif",
          fontWeight: 400,
          userSelect: "none",
        }}
      >
        &ldquo;
      </div>

      {/* Quote body */}
      <div
        ref={quoteRef}
        className="pb-4 transition-all duration-300"
        style={{ borderBottom: "2px solid transparent" }}
      >
        <p
          style={{
            color: dark ? "rgba(253,250,244,0.8)" : "var(--charcoal)",
            lineHeight: 1.8,
            fontStyle: "italic",
          }}
          className="text-base"
        >
          {quote}
        </p>
      </div>

      {/* Author */}
      <div className="mt-auto pt-4">
        <div className="flex gap-0.5 mb-1">
          {Array.from({ length: rating }).map((_, i) => (
            <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="var(--gold)" aria-hidden>
              <path d="M6 1l1.3 2.6L10 4l-2 1.9.5 2.7L6 7.4l-2.5 1.2.5-2.7L2 4l2.7-.4z" />
            </svg>
          ))}
        </div>
        <span
          className="text-xs uppercase tracking-[0.2em]"
          style={{ color: dark ? "rgba(253,250,244,0.6)" : "var(--taupe)" }}
        >
          {author}
        </span>
      </div>
    </motion.article>
  );
}
