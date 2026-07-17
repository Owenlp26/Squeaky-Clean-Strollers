"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer style={{ background: "var(--charcoal)", color: "var(--cream)" }}>
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-8">

        {/* Top row: brand + nav */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 pb-16 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-hd.png"
                alt="Squeaky Clean Strollers"
                style={{ height: "88px", width: "88px", objectFit: "contain" }}
              />
            </Link>
            <p
              className="mt-4 max-w-xs text-sm leading-relaxed"
              style={{ color: "rgba(253,250,244,0.75)" }}
            >
              Professional baby equipment cleaning for the parents who are already doing it all.
            </p>
          </div>

          <div className="text-sm">
            <div
              className="mb-5 text-[10px] uppercase tracking-[0.22em]"
              style={{ color: "rgba(253,250,244,0.5)" }}
            >
              Navigate
            </div>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/services", label: "Services & Pricing" },
                { href: "/how-it-works", label: "How it works" },
                { href: "/about", label: "About" },
                { href: "/reviews", label: "Reviews" },
                { href: "/book", label: "Book in" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="transition-colors duration-200"
                  style={{ color: "rgba(253,250,244,0.85)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(253,250,244,0.85)")}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="text-sm">
            <div
              className="mb-5 text-[10px] uppercase tracking-[0.22em]"
              style={{ color: "rgba(253,250,244,0.5)" }}
            >
              Get in touch
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+447344279177"
                className="transition-colors duration-200"
                style={{ color: "rgba(253,250,244,0.85)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(253,250,244,0.85)")}
              >
                07344 279177
              </a>
              <a
                href="mailto:charlottesweeney7@gmail.com"
                className="transition-colors duration-200"
                style={{ color: "rgba(253,250,244,0.85)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(253,250,244,0.85)")}
              >
                charlottesweeney7@gmail.com
              </a>
              <p style={{ color: "rgba(253,250,244,0.5)" }}>Mon to Sat, 9am to 5pm</p>
            </div>
          </div>

          <div className="text-sm">
            <div
              className="mb-5 text-[10px] uppercase tracking-[0.22em]"
              style={{ color: "rgba(253,250,244,0.5)" }}
            >
              Service area
            </div>
            <p
              className="leading-relaxed"
              style={{ color: "rgba(253,250,244,0.75)" }}
            >
              Based in East Renfrewshire and here for every busy parent, grandparent, childminder and caregiver in the local area. Drop your items off with us, leave the hard work completely to us and collect them sparkling clean and sanitised within days.
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col items-start justify-between gap-3 pt-8 text-xs sm:flex-row sm:items-center"
          style={{ color: "rgba(253,250,244,0.3)" }}
        >
          <p>© {new Date().getFullYear()} Squeaky Clean Strollers Ltd. East Renfrewshire&apos;s pram cleaning specialists.</p>
          <p>Made by <a href="https://lochsidecreative.com" target="_blank" rel="noreferrer" style={{ color: "rgba(253,250,244,0.75)" }} className="transition-colors hover:text-[rgba(253,250,244,0.8)]">Lochside Creative Ltd</a></p>
        </div>
      </div>
    </footer>
  );
}
