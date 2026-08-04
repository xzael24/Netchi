import { BREACH_DATASET } from "@/data/breachDataset";
import { COMPROMISED_ACCOUNTS } from "@/data/compromisedAccounts";
import type { Breach } from "@/types";

export type BreachMatch = {
  breach: Breach;
  matchType: "exact" | "domain";
  matchedOn: string;
};

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function extractDomain(account: string): string | null {
  const at = account.indexOf("@");
  if (at !== -1) return account.slice(at + 1);
  return account;
}

function registrableDomain(domain: string): string | null {
  const parts = domain.split(".");
  if (parts.length < 2) return null;
  return parts.slice(-2).join(".");
}

const breachByName = new Map<string, Breach>(
  BREACH_DATASET.map((b) => [b.Name.toLowerCase(), b])
);

const breachByBaseDomain = new Map<string, Breach[]>();
for (const b of BREACH_DATASET) {
  const base = registrableDomain(normalize(b.Domain));
  if (!base) continue;
  const list = breachByBaseDomain.get(base) ?? [];
  list.push(b);
  breachByBaseDomain.set(base, list);
}

export function detectBreach(account: string): BreachMatch[] {
  const normalized = normalize(account);
  if (!normalized) return [];

  const matches: BreachMatch[] = [];

  const exact = COMPROMISED_ACCOUNTS.find((a) => normalize(a.email) === normalized);
  if (exact) {
    const breach = breachByName.get(exact.breachName.toLowerCase());
    if (breach) {
      matches.push({ breach, matchType: "exact", matchedOn: normalized });
    }
  }

  const domain = extractDomain(normalized);
  const base = domain ? registrableDomain(domain) : null;
  if (base) {
    const domainMatches = breachByBaseDomain.get(base);
    if (domainMatches) {
      for (const breach of domainMatches) {
        const already = matches.some((m) => m.breach.Name === breach.Name);
        if (!already) {
          matches.push({ breach, matchType: "domain", matchedOn: base });
        }
      }
    }
  }

  return matches;
}

export function getBreachByName(name: string): Breach | null {
  return breachByName.get(name.toLowerCase()) ?? null;
}

export const DATASET_STATS = {
  breaches: BREACH_DATASET.length,
  accounts: COMPROMISED_ACCOUNTS.length,
  totalRecords: BREACH_DATASET.reduce((sum, b) => sum + b.PwnCount, 0),
};