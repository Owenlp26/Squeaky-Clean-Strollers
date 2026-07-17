"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    n: "01",
    title: "Book your clean",
    body: "Head to our booking page, choose your service and pick a date that works for you. We will confirm your slot within 24 hours and sort everything from there.",
  },
  {
    n: "02",
    title: "Drop off your items",
    body: "Simply drop your items off in East Renfrewshire at your agreed time. Bring them exactly as they are, no cleaning or preparation needed, and leave the rest completely to Charlotte.",
  },
  {
    n: "03",
    title: "The magic happens",
    body: "We work through every single part of your item from top to bottom: the harness, the buckles, the fabric folds, the wheels and every little crevice a baby wipe simply cannot reach. Hand cleaning, sanitising and fully drying everything with baby-safe products until every part is sparkling clean and genuinely fresh.",
  },
  {
    n: "04",
    title: "Collect your items",
    body: "When your items are sparkling clean, sanitised and fully dried we will let you know they are ready to collect from our East Renfrewshire location. Most items are ready within 4 days, car seats and Doonas within 2 days, and for those moments when you need it sooner we also offer a 24-hour emergency clean.",
  },
];

function Step({ s, index }: { s: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
      className="relative pl-8"
      style={{ borderLeft: "1px solid rgba(42,40,37,0.15)" }}
    >
      {/* Large ghost number */}
      <div
        className="absolute -left-3 -top-4 font-display select-none leading-none pointer-events-none"
        style={{
          fontSize: "clamp(5rem, 10vw, 8rem)",
          color: "var(--charcoal)",
          opacity: 0.05,
          lineHeight: 1,
        }}
      >
        {s.n}
      </div>

      <div
        className="mb-4 inline-block text-[10px] uppercase tracking-[0.22em]"
        style={{ color: "var(--taupe)" }}
      >
        Step {s.n}
      </div>
      <h3
        className="font-display text-2xl leading-tight sm:text-3xl"
        style={{ color: "var(--charcoal)" }}
      >
        {s.title}
      </h3>
      <p
        className="mt-3 text-sm leading-relaxed"
        style={{ color: "var(--taupe)" }}
      >
        {s.body}
      </p>
    </motion.li>
  );
}

export function HowItWorks() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true });

  return (
    <section
      id="how"
      className="py-28"
      style={{ background: "var(--gold-soft)" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg"
        >
          <h2
            className="mt-4 font-display leading-tight tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)", color: "var(--charcoal)" }}
          >
            Our{" "}
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>4 simple steps.</em>
          </h2>
        </motion.div>

        <ol className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((s, i) => (
            <Step key={s.n} s={s} index={i} />
          ))}
        </ol>

        {/* Process image */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 relative overflow-hidden"
          style={{ height: "480px", borderRadius: "8px" }}
        >
          <Image
            src="/process-soap.png"
            alt="Deep cleaning process"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(42,40,37,0.65) 0%, transparent 55%)" }} />
          <div className="absolute bottom-10 left-10">
            <p className="font-display text-xs uppercase tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.55)" }}>The process</p>
            <p className="mt-2 font-display text-3xl font-light" style={{ color: "#ffffff" }}>Hand-washed. Steam-sanitised.<br />Thoroughly dried.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
