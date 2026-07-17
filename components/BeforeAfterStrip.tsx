"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";

const images = [
  { src: "/before-after/1.png", alt: "Before and after car seat clean" },
  { src: "/before-after/2.png", alt: "Before and after pram clean" },
  { src: "/before-after/3.png", alt: "Before and after buggy clean" },
  { src: "/before-after/4.png", alt: "Before and after clean" },
  { src: "/before-after/5.png", alt: "Before and after clean" },
  { src: "/before-after/6.png", alt: "Before and after clean" },
];

export function BeforeAfterStrip() {
  return (
    <div style={{ background: "var(--charcoal)" }} className="py-14 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 mb-8 flex items-center gap-4">
        <div style={{ width: "32px", height: "1px", background: "var(--gold)" }} />
        <p className="text-xs uppercase tracking-[0.28em]" style={{ color: "rgba(253,250,244,0.5)" }}>
          Before &amp; after
        </p>
      </div>

      <motion.div
        className="flex"
        style={{ gap: "12px" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {[...images, ...images].map((img, i) => (
          <div
            key={i}
            className="flex-shrink-0 overflow-hidden rounded-xl"
            style={{ width: "300px", height: "300px" }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={300}
              height={300}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
