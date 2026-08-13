# Netchi — Privacy Shield

> **PIXEL: Protection Information Exploration in the Digital Era** — FTI FEST 2026
> Tim **ICHI** — Mahasiswa Aktif, Web Development

Netchi adalah situs literasi & perlindungan data pribadi yang bekerja **100% di perangkat pengguna (client-side)**. Netchi membantu kamu memahami, memeriksa, dan melindungi identitas digital — dari cek password bocor, skor privasi, generator password, edukasi UU PDP, hingga data palsu untuk daftar di situs abal-abal.

## Fitur Utama

| Route | Fitur |
| --- | --- |
| `/` | Landing page editorial awwwards (pinned scroll, curtain reveal, marquee, magnetic hover) |
| `/breach-checker` | **Cek password bocor** via Have I Been Pwned (Pwned Passwords) |
| `/privacy-score` | **Skor privasi** interaktif 12 pertanyaan + saran personal per jawaban |
| `/password` | **Generator password** kuat + mode "dari kata" + cek bocor hasil generate |
| `/berita` | Artikel & kasus kebocoran data terbaru |
| `/uu-pdp` | Edukasi **UU Pelindungan Data Pribadi** (bahasa manusia, bukan bahasa pengacara) |
| `/dummy-data` | **Data dummy** realistis khas Indonesia untuk daftar di situs mencurigakan |

## Keamanan (Privacy by Design)

- **Cek password bocor** memakai **k-anonymity**: password di-hash SHA-1 di perangkat, **hanya 5 karakter prefix** yang dikirim ke `api.pwnedpasswords.com`. Password asli tidak pernah meninggalkan perangkat.
- Semua proses (hash, generate, skor) berjalan **lokal di browser** — tanpa akun, tanpa server penyimpan data.
- **Security headers** di produksi: `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- Fallback SHA-1 murni JS & fallback clipboard agar fitur tetap jalan walau diakses via HTTP biasa.

## Tech Stack

- **Next.js 15** (App Router) + **React 18**
- **TypeScript**
- **Tailwind CSS v4**
- **GSAP** + **ScrollTrigger** (animasi & pinned scroll)
- **Framer Motion** (transisi, micro-interaction)
- Font: Inter, Space Grotesk, JetBrains Mono, Press Start 2P (via `next/font`, self-hosted, lisensi OFL)
- Third-party API: [Have I Been Pwned — Pwned Passwords](https://haveibeenpwned.com/API/v3#PwnedPasswords)

## Cara Menjalankan

```bash
# 1. install dependencies
npm install

# 2. development server
npm run dev
# buka http://localhost:3000

# production build + start
npm run build
npm run start
```

Tidak diperlukan akun login — seluruh fitur Netchi bisa langsung dipakai.

## Struktur Folder

```
src/
  app/            # halaman (App Router): /, feature pages, [slug] detail
  components/
    home/         # section landing page (Hero, Section2..5, Footer)
    layout/       # Navbar, MenuOverlay, FeatureShell, ArticleView, PageTransition...
  data/           # konten statis (artikel, pertanyaan skor, dummy data, dll)
  lib/            # utilitas (pwned, utils, validate)
next.config.ts    # security headers + konfigurasi Next
```

## Deployment

URL: _(isi URL deploy—mis. Vercel/Netlify—setelah di-deploy)_

Site adalah aplikasi Next.js statis/client-side, jadi bisa di-deploy ke Vercel, Netlify, atau platform lain. Build sudah teruji bersih lewat `next build`.

**Deploy ke Vercel (rekomendasi, 2 langkah):**
1. `vercel login` — login sekali pakai akun kamu.
2. `vercel --prod` (di root folder ini) atau import repo GitHub `xzael24/Netchi` dari dashboard Vercel → Project Settings → pasang framework preset **Next.js**.
3. Setelah berhasil, isi URL di atas dan di `docs/PRD.md` status deploy.

> Tidak ada env wajib. `.env.local` hanya untuk API opsional (emailrep.io/HIBP BreachedAccount) yang tidak dipakai fitur utama — semua fitur inti jalan tanpa env.

## Akun Demo

Tidak perlu. Netchi sengaja **tanpa sistem login** (semua fitur akses langsung di browser) — sesuai desain ADR-001. Juri tidak perlu akun demo: buka saja URL di atas.