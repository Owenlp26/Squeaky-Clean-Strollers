"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const trustFacts = [
    "Trusted by local families",
    "6 day max turnaround",
    "Prices start from £10",
  ];

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ minHeight: "90vh" }}>

      {/* Background image — parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY, zIndex: 0 }}>
        <Image
          src="/Charlotte.png"
          alt="Charlotte cleaning a pram"
          fill
          className="object-cover object-[center_60%]"
          priority
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: "rgba(20,18,16,0.72)", zIndex: 1 }} />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)", zIndex: 2 }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-0 px-6 py-24 lg:grid-cols-[1fr_440px] lg:items-center lg:py-32 xl:grid-cols-[1fr_500px]" style={{ zIndex: 3 }}>

        {/* ── Left: copy ── */}
        <div className="pr-0 lg:pr-16 xl:pr-24">

          {/* Badge */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            style={{ color: "rgba(255,255,255,0.5)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.3em", display: "block" }}
          >
            East Renfrewshire&apos;s baby equipment cleaning specialist
          </motion.span>

          {/* Rule — draws in left to right */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "48px", opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            style={{ height: "1px", background: "var(--gold)", marginTop: "1.5rem", marginBottom: "2rem", overflow: "hidden" }}
          />

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
            className="font-display"
            style={{ fontSize: "clamp(3.5rem, 7vw, 7rem)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "#ffffff" }}
          >
            Your baby items returned to you{" "}
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>sparkling clean.</em>
            <span style={{ display: "block", fontSize: "clamp(0.75rem, 1.5vw, 1.1rem)", fontWeight: 300, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", fontStyle: "italic", marginTop: "0.75rem" }}>Giving you one less thing to worry about.</span>
          </motion.h1>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <motion.div whileTap={{ scale: 0.97 }}>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 hover:scale-[1.02]"
                style={{ background: "#ffffff", color: "var(--charcoal)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.color = "var(--charcoal)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.color = "var(--charcoal)"; }}
              >
                Services &amp; pricing
              </Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.97 }}>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-full border px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-300"
                style={{ borderColor: "rgba(255,255,255,0.35)", color: "rgba(255,255,255,0.75)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#ffffff"; e.currentTarget.style.color = "#ffffff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
              >
                Our Process
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust signals — stagger */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-14 pt-10 flex flex-wrap gap-x-6 gap-y-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
          >
            {trustFacts.map((fact, i) => (
              <motion.span
                key={fact}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.95 + i * 0.1 }}
                className="text-sm"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                {fact}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* ── Right: logo ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 0.92, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
          className="hidden lg:flex lg:items-center lg:justify-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-hd.png"
            alt=""
            style={{ width: "460px", height: "460px", objectFit: "contain" }}
          />
        </motion.div>

      </div>
    </section>
  );
}
