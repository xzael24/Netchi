export function validateEmail(input: string): { ok: true; value: string } | { ok: false; error: string } {
  const trimmed = input.trim();
  if (!trimmed) return { ok: false, error: "Email tidak boleh kosong" };
  if (trimmed.length > 254) return { ok: false, error: "Email terlalu panjang (maks 254 karakter)" };
  if (/[<>\"'&]/.test(trimmed)) return { ok: false, error: "Email mengandung karakter yang tidak valid" };
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) return { ok: false, error: "Format email tidak valid" };
  return { ok: true, value: trimmed };
}

export function clampInt(val: unknown, min: number, max: number): number {
  const n = typeof val === "number" ? val : Number(val);
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, Math.round(n)));
}

export function allowlist<T extends string>(val: unknown, allowed: readonly T[]): T | null {
  return typeof val === "string" && (allowed as readonly string[]).includes(val)
    ? (val as T)
    : null;
}

export function safeUrl(raw: string): string | null {
  try {
    const url = new URL(raw);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}