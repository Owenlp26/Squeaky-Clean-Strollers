import { isCalendarConnected } from "@/lib/google-calendar";

export default async function CalendarSetupPage({
  searchParams,
}: {
  searchParams: Promise<{ connected?: string; error?: string }>;
}) {
  const { connected, error } = await searchParams;
  const alreadyConnected = await isCalendarConnected();

  return (
    <div className="mx-auto max-w-lg px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">Admin</p>
      <h1 className="mt-3 font-display text-3xl font-semibold">Google Calendar</h1>
      <p className="mt-2 text-muted text-sm">
        Connect your Google Calendar so the booking form only shows dates you are free.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        {alreadyConnected || connected === "true" ? (
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              <span className="font-medium text-sm">Calendar connected</span>
            </div>
            <p className="mt-2 text-sm text-muted">
              Busy dates from your Google Calendar are now shown as unavailable to customers in the booking form.
            </p>
            <a
              href="/api/admin/calendar-auth"
              className="mt-4 inline-block rounded-full border border-border px-5 py-2 text-sm font-medium hover:border-accent hover:text-accent"
            >
              Reconnect calendar
            </a>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="font-medium text-sm">Not connected</span>
            </div>
            <p className="mt-2 text-sm text-muted">
              Once connected, any day marked as busy in your Google Calendar will be greyed out for customers.
            </p>
            {error && (
              <p className="mt-3 text-sm text-red-600">
                Something went wrong ({error}). Please try again.
              </p>
            )}
            <a
              href="/api/admin/calendar-auth"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.868 0-7-3.14-7-7.018c0-3.878 3.132-7.018 7-7.018c1.89 0 3.47.697 4.682 1.829l-1.974 1.978v-.004c-.735-.702-1.667-1.062-2.708-1.062c-2.31 0-4.187 1.956-4.187 4.273c0 2.315 1.877 4.277 4.187 4.277c2.096 0 3.522-1.202 3.816-2.852H12.14v-2.737h6.585c.088.47.135.96.135 1.474c0 4.01-2.677 6.86-6.72 6.86z"/>
              </svg>
              Connect Google Calendar
            </a>
          </div>
        )}
      </div>

      <p className="mt-6 text-xs text-muted">
        This page is for Charlotte only. Share the URL with her after the site goes live.
      </p>
    </div>
  );
}
