import { NextRequest, NextResponse } from "next/server";
import { validateEmail } from "@/lib/validate";
import { detectBreach } from "@/lib/breachEngine";
import type { Breach } from "@/types";

type EmailIoBreach = { name: string; date?: string; type?: string };
type EmailIoResp = {
  reputation?: string;
  details?: {
    breached?: boolean | number;
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
  const email = encodeURIComponent(v.value);

  // 1) HIBP breachedaccount — paling otoritatif, TAPI berbayar
  const hibpKey = process.env.HIBP_API_KEY;
  if (hibpKey) {
    try {
      const res = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${email}`, {
        headers: {
          "hibp-api-key": hibpKey,
          "user-agent": "Netchi-Sentinel-FTI-Fest-2026",
          "hibp-api-version": "3",
        },
      });
      if (res.status === 200) {
        const breaches = (await res.json()) as Breach[];
        return NextResponse.json({ source: "hibp", breaches });
      }
      if (res.status === 404) {
        return NextResponse.json({ source: "hibp", breaches: [] });
      }
    } catch {
      // fall through
    }
  }

  // 2) email.io / EmailRep — GRATIS (key dari emailrep.io/free)
  const emailRepKey = process.env.EMAILREP_API_KEY;
  if (emailRepKey) {
    try {
      const res = await fetch(`https://emailrep.io/${email}`, {
        headers: { "Key": emailRepKey, "User-Agent": "Netchi-Sentinel (FTI-Fest-2026)" },
      });
      if (res.ok) {
        const data = (await res.json()) as Partial<EmailIoResp>;
        if (data && data.details) {
          const breaches = data.details.data_breaches ?? [];
          const leaked = Boolean(data.details.breached ?? breaches.length);
          return NextResponse.json({
            source: "emailio",
            reputation: data.reputation ?? null,
            leaked,
            breachCount: breaches.length,
            whyBad: data.details.why_bad ?? null,
            breachEmails: breaches.map((b) => b.name),
          });
        }
      }
    } catch {
      // fall through
    }
  }

  // 3) Netchi Breach Intelligence — sistem sendiri, offline-first
  const matches = detectBreach(v.value);
  return NextResponse.json({ source: "self", matches });
}