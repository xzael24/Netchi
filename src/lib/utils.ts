import { t, type Locale, type TranslationKey } from "@/lib/i18n";

type StrengthBand = {
  min: number;
  timeKey: TranslationKey;
  labelKey: TranslationKey;
  color: string;
};

const STRENGTH_BANDS: StrengthBand[] = [
  { min: 0, timeKey: "pg.instant", labelKey: "pg.veryWeak", color: "text-danger" },
  { min: 30, timeKey: "pg.seconds", labelKey: "pg.weak", color: "text-warning" },
  { min: 40, timeKey: "pg.minutes", labelKey: "pg.weak", color: "text-warning" },
  { min: 50, timeKey: "pg.hours", labelKey: "pg.medium", color: "text-accent" },
  { min: 60, timeKey: "pg.days", labelKey: "pg.medium", color: "text-accent" },
  { min: 70, timeKey: "pg.years", labelKey: "pg.strong", color: "text-success" },
  { min: 80, timeKey: "pg.centuries", labelKey: "pg.strong", color: "text-success" },
  { min: 90, timeKey: "pg.centuries", labelKey: "pg.veryStrong", color: "text-success" },
  { min: 100, timeKey: "pg.unbreakable", labelKey: "pg.veryStrong", color: "text-success" },
];

function bandFor(entropy: number): StrengthBand {
  for (let i = STRENGTH_BANDS.length - 1; i >= 0; i--) {
    if (entropy >= STRENGTH_BANDS[i].min) return STRENGTH_BANDS[i];
  }
  return STRENGTH_BANDS[0];
}

export function getTimeToCrack(entropy: number, locale: Locale = "id"): string {
  return t(locale, bandFor(entropy).timeKey);
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
  return bandFor(entropy).color;
}

export function getStrengthLabel(entropy: number, locale: Locale = "id"): string {
  return t(locale, bandFor(entropy).labelKey);
}