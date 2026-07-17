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

export function ReviewCard({ quote, author, item, dark = false, index = 0 }: ReviewCardProps) {
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
      className="py-2"
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

      {/* Author + item */}
      <div className="mt-4 flex items-center gap-3">
        <span
          className="text-xs uppercase tracking-[0.2em]"
          style={{ color: dark ? "rgba(253,250,244,0.6)" : "var(--taupe)" }}
        >
          {author}
        </span>
        {item && (
          <>
            <span
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: dark ? "rgba(253,250,244,0.4)" : "var(--taupe)",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span
              className="text-xs"
              style={{ color: dark ? "rgba(253,250,244,0.45)" : "var(--taupe)" }}
            >
              {item}
            </span>
          </>
        )}
      </div>
    </motion.article>
  );
}
