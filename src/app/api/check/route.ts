import { NextRequest, NextResponse } from "next/server";
import { validateEmail } from "@/lib/validate";
import { MOCK_BREACHES } from "@/data/mockBreaches";
import type { Breach } from "@/types";

export async function GET(req: NextRequest) {
  const account = req.nextUrl.searchParams.get("account") ?? "";
  const v = validateEmail(account);
  if (!v.ok) {
    return NextResponse.json({ error: v.error }, { status: 400 });
  }

  const key = process.env.HIBP_API_KEY;
  if (key) {
    try {
      const res = await fetch(
        `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(v.value)}`,
        {
          headers: {
            "hibp-api-key": key,
            "user-agent": "netchi-app",
            "hibp-api-version": "3",
          },
        }
      );
      if (res.status === 200) {
        const data = (await res.json()) as Breach[];
        return NextResponse.json({ source: "hibp", breaches: data });
      }
      if (res.status === 404) {
        return NextResponse.json({ source: "hibp", breaches: [] });
      }
    } catch {
      // network/parse failure → fall through to mock
    }
  }

  const domain = v.value.split("@")[1]?.toLowerCase();
  const breach = MOCK_BREACHES.find((b) => {
    const base = b.Domain.trim().toLowerCase();
    return domain === base || domain.startsWith(base);
  }) ?? null;

  return NextResponse.json({
    source: "mock",
    breaches: breach ? [breach] : [],
  });
}