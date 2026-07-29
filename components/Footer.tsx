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
                href="https://wa.me/447344279177"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200"
                style={{ color: "rgba(253,250,244,0.85)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(253,250,244,0.85)")}
              >
                WhatsApp or Message on 07344279177
              </a>
              <a
                href="mailto:charlotte@squeakycleanstrollers.com"
                className="transition-colors duration-200"
                style={{ color: "rgba(253,250,244,0.85)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(253,250,244,0.85)")}
              >
                charlotte@squeakycleanstrollers.com
              </a>

              {/* Social links */}
              <div className="mt-2 flex items-center gap-4">
                <a
                  href="https://www.instagram.com/squeakycleanstrollersglasgow/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  style={{ color: "rgba(253,250,244,0.7)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(253,250,244,0.7)")}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61590689573706"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  style={{ color: "rgba(253,250,244,0.7)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(253,250,244,0.7)")}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@squeaky.clean.str"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  style={{ color: "rgba(253,250,244,0.7)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(253,250,244,0.7)")}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.5 3c.3 2.1 1.5 3.6 3.5 3.9v2.4c-1.2.1-2.4-.2-3.5-.8v5.9c0 3.1-2.3 5.6-5.4 5.6S5.7 20.5 5.7 17.4c0-2.9 2.2-5.3 5.1-5.4v2.5c-.3 0-.5.1-.8.2-1 .4-1.7 1.4-1.6 2.5.1 1.3 1.1 2.2 2.4 2.2 1.4 0 2.4-1.1 2.4-2.5V3h2.3z" />
                  </svg>
                </a>
              </div>
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
              Based in G46 we cover Glasgow and East Renfrewshire and are here for every busy parent, grandparent, childminder and caregiver in the local area. Drop your items off with us, leave the hard work completely to us and collect them sparkling clean and sanitised within days.
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col items-start justify-between gap-3 pt-8 text-xs sm:flex-row sm:items-center"
          style={{ color: "rgba(253,250,244,0.3)" }}
        >
          <p>© {new Date().getFullYear()} Squeaky Clean Strollers Ltd. Glasgow and East Renfrewshire&apos;s pram cleaning specialists</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" style={{ color: "rgba(253,250,244,0.5)" }} className="transition-colors hover:text-[rgba(253,250,244,0.85)]">Terms &amp; Conditions</Link>
            <p>Made by <a href="https://lochsidecreative.com" target="_blank" rel="noreferrer" style={{ color: "rgba(253,250,244,0.75)" }} className="transition-colors hover:text-[rgba(253,250,244,0.8)]">Lochside Creative Ltd</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
