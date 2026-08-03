export type PwnedResult = { pwned: boolean; count: number; error?: string };

export async function checkPasswordPwned(password: string): Promise<PwnedResult> {
  try {
    const hashBuf = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(password));
    const hash = Array.from(new Uint8Array(hashBuf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();
    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5);

    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: { "Add-Padding": "true" },
    });
    if (!res.ok) throw new Error(`HIBP ${res.status}`);
    const text = await res.text();

    let pwned = false;
    let count = 0;
    for (const line of text.split("\r\n")) {
      const [suf, cnt] = line.split(":");
      if (suf === suffix) {
        pwned = true;
        count = Number(cnt);
        break;
      }
    }
    return { pwned, count };
  } catch (err) {
    return {
      pwned: false,
      count: 0,
      error: err instanceof Error ? err.message : "network",
    };
  }
}