"use client";

import Link from "next/link";
import { MobileNav } from "./MobileNav";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-30 transition-all duration-500"
      style={{
        background: "rgba(253,250,244,0.96)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(42,40,37,0.08)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-hd.png"
            alt="Squeaky Clean Strollers"
            style={{ height: "48px", width: "48px", objectFit: "contain" }}
          />
          <span className="font-display flex flex-col leading-none" style={{ letterSpacing: "-0.01em" }}>
            <span style={{ fontSize: "1.35rem", fontWeight: 300, color: "var(--charcoal)" }}>Squeaky</span>
            <span style={{ fontSize: "1.35rem", fontWeight: 300, color: "var(--charcoal)" }}>
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Clean</em>{" "}Strollers
            </span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link text-xs uppercase tracking-[0.18em] transition-colors duration-300"
              style={{ color: "var(--taupe)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--charcoal)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--taupe)")}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA + mobile */}
        <div className="flex items-center gap-3">
          <Link
            href="/book"
            className="hidden sm:inline-flex items-center rounded-full px-5 py-1.5 text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 hover:scale-[1.02]"
            style={{ background: "var(--charcoal)", color: "var(--cream)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.color = "var(--charcoal)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--charcoal)"; e.currentTarget.style.color = "var(--cream)"; }}
          >
            Book in
          </Link>
          <MobileNav links={[...navLinks, { href: "/book", label: "Book in" }]} />
        </div>
      </div>
    </header>
  );
}
