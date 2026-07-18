"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type NavLink = { href: string; label: string };

export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Lock background scroll while the full-screen menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // The overlay is rendered into <body> via a portal so it escapes the
  // header's stacking/containing context. The header uses backdrop-filter,
  // which makes it the containing block for position:fixed descendants —
  // without the portal the overlay would be trapped in the header's box
  // instead of covering the viewport.
  const overlay = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60]"
          style={{ background: "var(--charcoal)" }}
        >
            <div className="flex h-full flex-col px-6 py-6">
              <div className="flex items-center justify-between">
                <span
                  className="font-display text-2xl"
                  style={{ color: "var(--cream)" }}
                >
                  <Image src="/logo-hd.png" alt="Squeaky Clean Strollers" width={80} height={80} style={{ height: "52px", width: "auto" }} />
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
                  style={{ borderColor: "rgba(226,221,213,0.2)", color: "var(--cream)" }}
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <nav className="mt-14 flex flex-col gap-1">
                {links.filter(l => l.href !== "/book").map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block py-4 font-display text-3xl leading-tight transition-colors duration-200"
                      style={{ color: "rgba(253,250,244,0.7)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(253,250,244,0.7)")}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <Link
                  href="/book"
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-full py-4 text-center text-sm font-medium uppercase tracking-[0.15em] transition-all duration-300"
                  style={{ background: "var(--gold)", color: "var(--charcoal)" }}
                >
                  Book in now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
  );

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-200"
        style={{ borderColor: "rgba(42,40,37,0.2)", color: "var(--charcoal)" }}
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path fillRule="evenodd" d="M3 5h14a1 1 0 1 1 0 2H3a1 1 0 0 1 0-2Zm0 4h14a1 1 0 1 1 0 2H3a1 1 0 0 1 0-2Zm0 4h14a1 1 0 1 1 0 2H3a1 1 0 0 1 0-2Z" clipRule="evenodd" />
        </svg>
      </button>
      {mounted && createPortal(overlay, document.body)}
    </div>
  );
}
