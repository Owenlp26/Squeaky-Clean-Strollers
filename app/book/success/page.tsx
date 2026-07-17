import Link from "next/link";

export default async function BookSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  await searchParams;

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-background">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-7 w-7">
          <path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight">
        You&apos;re booked in!
      </h1>
      <p className="mt-4 text-base text-muted">
        Your slot is confirmed. Charlotte will be in touch to arrange your drop-off time. Check your email and phone for your confirmation.
      </p>
      <Link href="/" className="mt-8 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium hover:border-accent hover:text-accent">
        Back to home
      </Link>
    </div>
  );
}
