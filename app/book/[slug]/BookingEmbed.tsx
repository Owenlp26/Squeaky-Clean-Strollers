"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

type Props = {
  calLink: string;
  redirectUrl: string;
};

export default function BookingEmbed({ calLink, redirectUrl }: Props) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      const palette = {
        "cal-brand": "#7a8b7a",
        "cal-brand-emphasis": "#647a64",
        "cal-brand-text": "#ffffff",

        "cal-bg": "#ffffff",
        "cal-bg-emphasis": "#f1ede4",
        "cal-bg-muted": "#faf8f4",
        "cal-bg-subtle": "#f5f1ea",
        "cal-bg-info": "#e7ede4",
        "cal-bg-success": "#e7ede4",

        "cal-border": "#e8e3da",
        "cal-border-subtle": "#efeae0",
        "cal-border-emphasis": "#7a8b7a",
        "cal-border-booker": "#e8e3da",

        "cal-text": "#1f1d1a",
        "cal-text-emphasis": "#1f1d1a",
        "cal-text-subtle": "#6b6660",
        "cal-text-muted": "#9c958c",
        "cal-text-brand": "#647a64",
      };
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: { light: palette, dark: palette },
        hideEventTypeDetails: true,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-2 -z-10 rounded-[2rem] bg-accent-soft/40 blur-2xl"
      />
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_30px_60px_-30px_rgba(122,139,122,0.25)]">
        <Cal
          calLink={calLink}
          style={{ width: "100%", height: "100%", minHeight: 680 }}
          config={{
            layout: "month_view",
            theme: "light",
            "redirect.url": redirectUrl,
          }}
        />
      </div>
    </div>
  );
}
