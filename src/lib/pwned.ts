export type PwnedResult = { pwned: boolean; count: number; error?: string };

// Web Crypto (crypto.subtle) is only available in secure contexts (https/localhost).
// On plain http over LAN it's undefined, so fall back to a pure-JS SHA-1.
function sha1Hex(input: string): string {
  const bytes = new TextEncoder().encode(input);
  const ml = bytes.length * 8;
  const msg = new Uint8Array(((bytes.length + 8) >> 6 << 6) + 64);
  msg.set(bytes);
  msg[bytes.length] = 0x80;
  const dv = new DataView(msg.buffer);
  dv.setUint32(msg.length - 4, ml >>> 0, false);

  let h0 = 0x67452301, h1 = 0xefcdab89, h2 = 0x98badcfe, h3 = 0x10325476, h4 = 0xc3d2e1f0;
  const w = new Int32Array(80);
  for (let i = 0; i < msg.length; i += 64) {
    for (let j = 0; j < 16; j++) w[j] = dv.getInt32(i + j * 4, false);
    for (let j = 16; j < 80; j++) {
      const n = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
      w[j] = (n << 1) | (n >>> 31);
    }
    let a = h0, b = h1, c = h2, d = h3, e = h4;
    for (let j = 0; j < 80; j++) {
      let f, k;
      if (j < 20) { f = (b & c) | (~b & d); k = 0x5a827999; }
      else if (j < 40) { f = b ^ c ^ d; k = 0x6ed9eba1; }
      else if (j < 60) { f = (b & c) | (b & d) | (c & d); k = 0x8f1bbcdc; }
      else { f = b ^ c ^ d; k = 0xca62c1d6; }
      const tmp = (((a << 5) | (a >>> 27)) + f + e + k + w[j]) | 0;
      e = d; d = c; c = (b << 30) | (b >>> 2); b = a; a = tmp;
    }
    h0 = (h0 + a) | 0; h1 = (h1 + b) | 0; h2 = (h2 + c) | 0; h3 = (h3 + d) | 0; h4 = (h4 + e) | 0;
  }
  const hex = (n: number) => (n >>> 0).toString(16).padStart(8, "0");
  return (hex(h0) + hex(h1) + hex(h2) + hex(h3) + hex(h4)).toUpperCase();
}

async function sha1HexWithSubtle(input: string): Promise<string> {
  const hashBuf = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(hashBuf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

export async function checkPasswordPwned(password: string): Promise<PwnedResult> {
  try {
    const hash =
      typeof crypto !== "undefined" && typeof crypto.subtle !== "undefined"
        ? await sha1HexWithSubtle(password)
        : sha1Hex(password);
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