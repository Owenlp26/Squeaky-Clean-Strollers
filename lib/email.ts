import { Resend } from "resend";

// Lazy singleton -- only initialised on first call so build doesn't crash without env vars
let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

const FROM = "Squeaky Clean Strollers <bookings@squeakycleanstrollers.com>";

export async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const result = await getResend().emails.send({ from: FROM, to, subject, html });
  if (result.error) {
    console.error("Resend error:", JSON.stringify(result.error));
  } else {
    console.log("Email sent:", result.data?.id, "→", to);
  }
}

// Shared email wrapper HTML
export function emailLayout(content: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FDFAF4;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#FDFAF4;padding:32px 16px;">
<tr><td align="center">
<table width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e8e3da;">
<tr><td style="padding:24px 32px;border-bottom:1px solid #e8e3da;">
<p style="margin:0;font-size:18px;font-weight:700;color:#A89A5A;letter-spacing:0.02em;">Squeaky Clean Strollers</p>
</td></tr>
<tr><td style="padding:32px;">
${content}
</td></tr>
<tr><td style="padding:16px 32px;border-top:1px solid #e8e3da;background:#FDFAF4;">
<p style="margin:0;font-size:12px;color:#6b6660;">Squeaky Clean Strollers, East Renfrewshire &bull; charlottesweeney7@gmail.com</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

export function ctaButton(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;margin-top:24px;padding:14px 28px;background:#1f1d1a;color:#ffffff;border-radius:999px;text-decoration:none;font-size:14px;font-weight:600;">${label}</a>`;
}

export function itemsTable(items: { name: string; priceGBP: number }[]): string {
  const rows = items.map(i => `<tr><td style="padding:6px 0;color:#1f1d1a;">${i.name}</td><td style="padding:6px 0;text-align:right;color:#1f1d1a;">£${i.priceGBP}</td></tr>`).join("");
  return `<table width="100%" style="border-collapse:collapse;margin:16px 0;">${rows}</table>`;
}
