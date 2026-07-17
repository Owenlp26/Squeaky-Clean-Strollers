"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Variant = "charcoal" | "sage" | "cream";

const variants: Record<Variant, { bg: string; text: string; sub: string; btnBg: string; btnText: string; btnHoverBg: string }> = {
  charcoal: {
    bg: "var(--charcoal)",
    text: "var(--cream)",
    sub: "rgba(253,250,244,0.6)",
    btnBg: "var(--cream)",
    btnText: "var(--charcoal)",
    btnHoverBg: "rgba(253,250,244,0.85)",
  },
  sage: {
    bg: "var(--charcoal)",
    text: "var(--cream)",
    sub: "rgba(253,250,244,0.7)",
    btnBg: "var(--cream)",
    btnText: "var(--charcoal)",
    btnHoverBg: "rgba(253,250,244,0.85)",
  },
  cream: {
    bg: "var(--cream)",
    text: "var(--charcoal)",
    sub: "var(--taupe)",
    btnBg: "var(--charcoal)",
    btnText: "var(--cream)",
    btnHoverBg: "var(--gold)",
  },
};

type Props = {
  variant?: Variant;
  label?: string;
  heading: string;
  body?: string;
  primaryCta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

export function SectionCTA({
  variant = "charcoal",
  label,
  heading,
  body,
  primaryCta,
  secondaryCta,
}: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const v = variants[variant];

  return (
    <section
      ref={ref}
      className="py-24"
      style={{ background: v.bg }}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl px-6 text-center"
      >
        {label && (
          <span
            className="text-[10px] uppercase tracking-[0.25em]"
            style={{ color: variant === "charcoal" ? "rgba(253,250,244,0.45)" : "var(--taupe)" }}
          >
            {label}
          </span>
        )}
        <h2
          className="mt-4 font-display leading-tight tracking-tight"
          style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)", color: v.text }}
        >
          {heading}
        </h2>
        {body && (
          <p
            className="mt-5 text-lg leading-relaxed"
            style={{ color: v.sub }}
          >
            {body}
          </p>
        )}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 hover:scale-[1.02]"
            style={{ background: v.btnBg, color: v.btnText }}
            onMouseEnter={(e) => (e.currentTarget.style.background = v.btnHoverBg)}
            onMouseLeave={(e) => (e.currentTarget.style.background = v.btnBg)}
          >
            {primaryCta.label}
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center rounded-full border px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-300"
              style={{
                borderColor: variant === "cream" ? "var(--border-color)" : "rgba(255,255,255,0.25)",
                color: v.sub,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = v.btnBg;
                e.currentTarget.style.color = v.text;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = variant === "cream" ? "var(--border-color)" : "rgba(255,255,255,0.25)";
                e.currentTarget.style.color = v.sub;
              }}
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  );
}
