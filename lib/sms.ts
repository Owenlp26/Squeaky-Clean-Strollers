/**
 * Twilio SMS helper.
 * Gracefully skips if env vars are not set — email notifications still work.
 *
 * Required env vars:
 *   TWILIO_ACCOUNT_SID
 *   TWILIO_AUTH_TOKEN
 *   TWILIO_FROM_NUMBER  (E.164 format, e.g. +44xxxxxxxxxx)
 */

export async function sendSMS(to: string, body: string): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;

  if (!accountSid || !authToken || !from) {
    // SMS not configured — log and skip, emails still go out
    console.log(`[SMS skipped — Twilio not configured] To: ${to} | ${body.slice(0, 60)}...`);
    return;
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  const credentials = Buffer.from(`${accountSid}:${authToken}`).toString("base64");

  const params = new URLSearchParams({ To: to, From: from, Body: body });

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`[SMS failed] To: ${to} | Status: ${res.status} | ${text}`);
    // Don't throw — a failed SMS should not break the booking flow
  }
}
