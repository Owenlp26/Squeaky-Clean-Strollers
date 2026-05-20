import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight">
            Wheel <span className="text-accent">&</span> Wash
          </span>
          <span className="hidden text-xs uppercase tracking-[0.18em] text-muted sm:inline">
            London
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          <a href="/#services" className="hover:text-foreground">
            Services
          </a>
          <a href="/#how" className="hover:text-foreground">
            How it works
          </a>
          <a href="/#faq" className="hover:text-foreground">
            FAQ
          </a>
        </nav>

        <Link
          href="/#services"
          className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-accent"
        >
          Book a clean
        </Link>
      </div>
    </header>
  );
}
