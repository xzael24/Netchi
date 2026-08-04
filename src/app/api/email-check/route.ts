import { NextRequest, NextResponse } from "next/server";
import { validateEmail } from "@/lib/validate";
import { detectBreach } from "@/lib/breachEngine";

type EmailIoBreach = { name: string; date?: string; type?: string };
type EmailIoResp = {
  reputation?: string;
  suspicious?: boolean | number;
  details?: {
    breached?: boolean | number;
    leaks?: boolean | number;
    data_breaches?: EmailIoBreach[];
    why_bad?: string;
  };
};

export async function GET(req: NextRequest) {
  const account = req.nextUrl.searchParams.get("account") ?? "";
  const v = validateEmail(account);
  if (!v.ok) {
    return NextResponse.json({ error: v.error }, { status: 400 });
  }

  const key = process.env.EMAILREP_API_KEY;
  if (key) {
    try {
      const res = await fetch(`https://emailrep.io/${encodeURIComponent(v.value)}`, {
        headers: { "Key": key, "User-Agent": "Netchi-Sentinel (FTI-Fest-2026)" },
      });
      if (res.ok) {
        const data = (await res.json()) as Partial<EmailIoResp>;
        if (data && data.details) {
          const { details } = data;
          const breaches = details.data_breaches ?? [];
          const leaked = Boolean(details.breached ?? breaches.length);
          return NextResponse.json({
            source: "emailio" as const,
            reputation: data.reputation ?? null,
            leaked,
            breachCount: breaches.length,
            badReason: details.why_bad ?? null,
            breachEmails: breaches.map((b) => b.name),
            whyBad: details.why_bad ?? null,
          });
        }
      }
    } catch {
      // fall through to self-hosted engine
    }
  }

  const matches = detectBreach(v.value);
  return NextResponse.json({
    source: "self" as const,
    matches,
  });
}