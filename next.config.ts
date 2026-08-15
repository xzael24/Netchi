import os from "node:os";
import type { NextConfig } from "next";

// Allow any LAN IPv4 as a dev origin so the phone (same-WiFi) can load /_next
// resources over http://<lan-ip>:3000 without a warning.
function lanDevOrigins(): string[] {
  const seen = new Set<string>();
  for (const addrs of Object.values(os.networkInterfaces())) {
    for (const a of addrs ?? []) {
      if (a.family === "IPv4" && !a.internal && !a.address.startsWith("169.254")) {
        seen.add(a.address);
      }
    }
  }
  return [...seen];
}

const isProd = process.env.NODE_ENV === "production";

// 'unsafe-inline' pada script-src dibutuhkan: Next.js me-render inline
// bootstrap/hydration scripts pada halaman statis. App ini tidak memakai
// dangerouslySetInnerHTML / eval sama sekali, dan semua teks sudah di-escape
// React — jadi risiko XSS inline minimal. frame-ancestors 'none' tetap
// melindungi dari clickjacking.
const securityHeaders = [
  ...(isProd
    ? [
        {
          key: "Content-Security-Policy",
          value:
            "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; font-src 'self' data:; connect-src 'self' https://api.pwnedpasswords.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
        },
      ]
    : []),
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: lanDevOrigins(),
  distDir: isProd ? ".next" : ".next-dev",
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;