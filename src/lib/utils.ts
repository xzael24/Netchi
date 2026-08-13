import { t, type Locale } from "@/lib/i18n";

export function getTimeToCrack(entropy: number, locale: Locale = "id"): string {
  if (entropy < 30) return t(locale, "pg.instant");
  if (entropy < 40) return t(locale, "pg.seconds");
  if (entropy < 50) return t(locale, "pg.minutes");
  if (entropy < 60) return t(locale, "pg.hours");
  if (entropy < 70) return t(locale, "pg.days");
  if (entropy < 80) return t(locale, "pg.years");
  if (entropy < 100) return t(locale, "pg.centuries");
  return t(locale, "pg.unbreakable");
}

export function calculatePasswordEntropy(password: string): number {
  const poolSize = getPoolSize(password);
  return Math.log2(Math.pow(poolSize, password.length));
}

function getPoolSize(password: string): number {
  let pool = 0;
  if (/[a-z]/.test(password)) pool += 26;
  if (/[A-Z]/.test(password)) pool += 26;
  if (/[0-9]/.test(password)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(password)) pool += 32;
  return pool;
}

export function getStrengthColor(entropy: number): string {
  if (entropy < 30) return "text-danger";
  if (entropy < 50) return "text-warning";
  if (entropy < 70) return "text-accent";
  return "text-success";
}

export function getStrengthLabel(entropy: number, locale: Locale = "id"): string {
  if (entropy < 30) return t(locale, "pg.veryWeak");
  if (entropy < 50) return t(locale, "pg.weak");
  if (entropy < 70) return t(locale, "pg.medium");
  if (entropy < 90) return t(locale, "pg.strong");
  return t(locale, "pg.veryStrong");
}