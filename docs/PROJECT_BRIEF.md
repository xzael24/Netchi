# Netchi Sentinel — FTI FEST 2026

## Kompetisi
- **Event**: FTI FEST 2026 — Lomba Web Development
- **Subtema**: Privasi Data & Perlindungan Identitas Digital
- **Tim**: 1 orang (developer tunggal)

## Tujuan
Membangun web app **Netchi Sentinel** sebagai tools edukasi & perlindungan identitas digital, dengan tampilan pixel-art modern dan pengalaman interaktif yang engaging.

## Auth Decision
- **Tanpa login sama sekali.** Semua fitur akses langsung — user experience lebih cepat, cocok demo lomba.
- Nilai **Keamanan Dasar (15%)** dari: validasi form, sanitasi input, XSS protection, proteksi API routes, penanganan data sensitif.

## Halaman & Route Planning

```
/                   — Homepage: Hero → 1://TOOLS (grid fitur) → 2://EDUCATION → 3://FAQ → Footer
/breach-checker     — Cek bocornya email/data
/privacy-score      — Skor privasi digital
/password           — Generator password aman
/uu-pdp             — Hub UU PDP + artikel edukasi
/dummy-data         — Generator data palsu
```

### Homepage Sections
| Section | Isi |
|---|---|
| Hero | (udah jadi) headline, sub, deskripsi, CTA, waving lines |
| 1://TOOLS | Grid card 5 fitur inti (link ke masing-masing page) — kaya USPS/Services punya Netcraft |
| 2://EDUCATION | Artikel edukasi privasi data — kaya BLOG punya Netcraft |
| 3://FAQ | Accordion FAQ tentang privasi & identitas digital |
| Footer | Nav links, sosial media, credits |

### Format Halaman Fitur
Masing-masing halaman fitur pake format header section number (1://BREACH, 2://PRIVACY, dst) — konsisten dengan Netcraft style.

## Fitur Inti
1. **Breach Checker** — Cek apakah email/data pribadi pernah bocor
2. **Privacy Score** — Skor privasi digital berdasarkan kebiasaan online
3. **Password Generator** — Generate password aman
4. **UU PDP Hub** — Informasi & panduan UU Perlindungan Data Pribadi + artikel
5. **Dummy Data Generator** — Generate data palsu untuk proteksi privasi

## Tech Stack
- **Framework**: Next.js 15 (App Router, monolith — API Routes built-in)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animasi**: Framer Motion
- **Smooth Scroll**: Lenis
- **Fonts**: Space Grotesk (display), Inter (body), JetBrains Mono (mono), Press Start 2P (pixel)

## Arsitektur
```
src/
├── app/                  # App Router
│   ├── layout.tsx        # Root layout + font loading
│   ├── globals.css       # Tailwind theme & global styles
│   ├── page.tsx          # Homepage (Hero → TOOLS → EDUCATION → FAQ)
│   ├── breach-checker/
│   │   └── page.tsx      # Breach Checker tool
│   ├── privacy-score/
│   │   └── page.tsx      # Privacy Score tool
│   ├── password/
│   │   └── page.tsx      # Password Generator tool
│   ├── uu-pdp/
│   │   └── page.tsx      # UU PDP Hub
│   └── dummy-data/
│       └── page.tsx      # Dummy Data Generator
├── components/
│   ├── home/
│   │   ├── Hero.tsx      # Hero section
│   │   ├── ToolsGrid.tsx # 1://TOOLS — grid 5 fitur
│   │   ├── Education.tsx # 2://EDUCATION — artikel cards
│   │   └── FAQ.tsx       # 3://FAQ — accordion
│   ├── features/         # Komponen masing-masing fitur
│   │   ├── BreachChecker.tsx
│   │   ├── PrivacyScore.tsx
│   │   ├── PasswordGen.tsx
│   │   ├── UUPDP.tsx
│   │   └── DummyData.tsx
│   ├── layout/
│   │   ├── Navbar.tsx    # Fixed navbar (muncul setelah scroll hero)
│   │   └── Footer.tsx
│   └── providers/
│       └── LenisProvider.tsx
```

## Progress Hero Section

### Grid Layout
- 5 columns: `[2.6%_30%_35%_29.05%_1fr]`
- 5 rows: `[44px_280px_110px_80px_260px]`
- Background: `#1A3CDB` (biru), section full screen (`min-h-screen`)
- Text: cream `#f5f0d5`

### Row 1 — Nav (44px)
- **Col 4**: Menu button (header, hover orange)
- **Col 5**: Globe button → dropdown ID/EN (hover reveal, glass effect)

### Row 2 — Headline (280px)
- **Col 2-3**: "Netchi Sentinel" — font display, text-[18vw] md:text-[13vw]
- Huruf "S" pakai Press Start 2P (pixel art)

### Row 3 — Sub-Headline (110px)
- **Col 2-3**: "Privasi Data & Proteksi Identitas Digital yang Melawan Kompleksitas"
- Font besar full column

### Row 4 — Description (80px)
- **Col 3**: Deskripsi produk, teks full column, vertikal center

### Row 5 — Bars + CTA (260px)
- **Col 2-3**: Abstract waving lines (8 SVG paths morphing via framer-motion)
- **Col 4**: "MULAI SEKARANG" CTA (orange bg, transparent text, glass hover)
- **Col 4**: "Jelajahi ↓" (hover arrow animation looping)
- **Col 5**: "0://HERO" vertical label

### Komponen Interaktif
- **Language dropdown**: Hover globe → muncul ID/EN dengan glass effect
- **Arrow Jelajahi**: Hover → arrow looping kebawah dan muncul dari atas
- **Waving lines**: 8 garis organik morphing terus-menerus (durasi & delay beda tiap garis)

## Design System
- **Primary Blue**: `#1A3CDB`
- **Orange Accent**: `#EF4444`
- **Cream Text**: `#f5f0d5`
- **Cream/25 Border**: garis grid & separator
- **Glass Effect**: `bg-white/10 backdrop-blur-md`
- **Font Display**: Space Grotesk, bold, tracking-tight
- **Font Mono**: JetBrains Mono, uppercase, tracking-widest

## Priority Order
1. **Homepage section TOOLS** (grid card 5 fitur) + link ke masing-masing page
2. **Masing-masing halaman fitur** (breach-checker, privacy-score, password, uu-pdp, dummy-data) — konten dulu fungsional
3. **Homepage section EDUCATION & FAQ**
4. **Navbar fixed** setelah scroll hero
5. **Footer**
6. Refine animasi & interaksi
7. Testing & optimasi

---
*Dibuat untuk FTI FEST 2026 — Web Development Competition*
