# Architecture — Netchi Sentinel

## Tech Stack

| Layer | Teknologi | Alasan |
|-------|-----------|--------|
| Framework | Next.js 15 (App Router) | Monolith, API Routes built-in, deployment Vercel |
| Language | TypeScript strict | Type safety, better DX |
| Styling | Tailwind CSS v4 | Utility-first, responsive cepat |
| Animasi | Framer Motion | Declarative animations, gesture support |
| Smooth Scroll | Lenis | Smooth scrolling experience |
| Fonts | Space Grotesk (display), Inter (body), JetBrains Mono (mono), Press Start 2P (pixel) | Netcraft-inspired typography |

## Arsitektur Folder

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout + font loading + Locale/Lenis/Motion provider
│   ├── template.tsx              # PageTransition wrapper (semua halaman)
│   ├── globals.css               # Tailwind theme (container queries, tokens)
│   ├── robots.ts                 # robots.txt
│   ├── page.tsx                  # Homepage (GSAP pinned scroll orchestration)
│   ├── breach-checker/
│   │   └── page.tsx              # Password Breach Checker (HIBP Pwned Passwords)
│   ├── privacy-score/
│   │   └── page.tsx              # Privacy Score quiz (12 pertanyaan)
│   ├── password/
│   │   └── page.tsx              # Password Generator + cek bocor hasil
│   ├── uu-pdp/
│   │   ├── page.tsx              # UU PDP Hub (search + filter)
│   │   └── [slug]/page.tsx       # Detail pasal UU PDP
│   ├── berita/
│   │   ├── page.tsx              # Daftar artikel berita kebocoran data
│   │   └── [slug]/page.tsx       # Detail artikel
│   └── dummy-data/
│       └── page.tsx              # Dummy Data Generator
├── components/
│   ├── home/
│   │   ├── Hero.tsx              # Hero section (desktop + mobile)
│   │   ├── Section2.tsx          # Tools Grid + infografis fakta
│   │   ├── Section3.tsx          # Berita (artikel cards)
│   │   ├── Section4.tsx          # Kutipan (curtain reveal)
│   │   └── Section5.tsx          # FAQ accordion
│   ├── layout/
│   │   ├── Navbar.tsx            # Fixed navbar (muncul setelah scroll hero) + dropdown ID/EN
│   │   ├── MenuOverlay.tsx       # Fullscreen menu (slide dari atas)
│   │   ├── Footer.tsx            # Full-screen footer + marquee
│   │   ├── FeatureShell.tsx      # Editorial layout untuk feature pages + marquee strip fixed
│   │   ├── ArticleView.tsx       # Layout detail artikel (berita / uu-pdp [slug])
│   │   ├── PageTransition.tsx    # Skeleton → reveal antar halaman
│   │   ├── CustomCursor.tsx      # Custom cursor (dot + ring)
│   │   ├── HeadingReveal.tsx     # Mask-reveal judul
│   │   ├── Magnetic.tsx          # Magnetic hover
│   │   └── Tilt.tsx              # Tilt 3D pada kartu
│   ├── ui/
│   │   └── MenuButton.tsx        # Tombol "Menu" navbar
│   └── providers/
│       ├── LenisProvider.tsx     # Lenis smooth scroll wrapper
│       ├── LocaleProvider.tsx    # Konteks ID/EN (localStorage "netchi-locale")
│       └── MotionProvider.tsx    # LazyMotion (framer-motion)
├── data/
│   ├── uuPdpArticles.ts          # Daftar pasal UU PDP (+ kategori)
│   ├── uPdpArticlesExtended.ts   # Versi detail pasal
│   ├── breachArticles.ts         # 3 artikel kebocoran data
│   ├── commonPasswords.ts        # 51 password paling umum
│   ├── privacyQuestions.ts       # 12 pertanyaan skor privasi + kalkulasi
│   └── dummyData.ts              # Generator data dummy Indonesia
├── lib/
│   ├── i18n.ts                   # Kamus ID/EN tipesafe (TranslationKey)
│   ├── pwned.ts                  # checkPasswordPwned (SHA-1 + k-anonymity + fallback)
│   ├── utils.ts                  # Entropy, strength bands, crack time
│   └── validate.ts               # clampInt (batas input)
└── types/
    └── index.ts                  # Type definitions (Breach, PrivacyQuestion, UuPdpArticle)
```

## Data Flow

### Tanpa Database
Sebagian besar fitur pake pemrosesan in-memory / client-side (breach check real via HIBP Pwned Passwords):

```
User Input → Client-side Validation → Processing Logic → Render Result
                                      ↓
                        (HIBP Pwned Passwords / generate / calculate)
```

### Breach Checker Flow (Password)
```
Password Input → Hash SHA-1 (client) → Cek HIBP Pwned Passwords → Aman / Bocor / Terlalu Umum
[client]                              [k-anonymity, gratis]      + daftar password umum lokal
```

### Privacy Score Flow
```
Kuis Jawaban → Hitung Skor → Mapping Kategori → Output + Tips
[client]       [formula]      [threshold]       [render]
```

### Password Generator Flow
```
Opsi → Generate Random → Hitung Entropy → Strength + Crack Time → Copy
[client] [crypto]        [formula]         [display]           [clipboard]
```

### UU PDP Flow
```
Daftar Artikel → Filter/Cari → Baca Detail
[static data]   [client]      [render]
```

### Dummy Data Flow
```
Pilih Fields + Lokal → Generate Random → Tabel/Kartu → Copy / Download
[client]               [faker logic]     [render]      [clipboard/export]
```

## Key Architecture Decisions

### ADR-001: No Authentication
- **Keputusan**: Tanpa login sama sekali
- **Alasan**: Semua fitur akses langsung, UX cepat, cocok demo lomba
- **Konsekuensi**: Nilai keamanan 15% dari validasi form & sanitasi, bukan dari auth

### ADR-002: No Database
- **Keputusan**: Tanpa database eksternal; pemrosesan di client / in-memory
- **Alasan**: Fitur tidak butuh persistensi, deployment lebih sederhana (Vercel)
- **Konsekuensi**: Data statis di file .ts; breach check real via HIBP Pwned Passwords (client-side, gratis)

### ADR-003: Monolith App Router
- **Keputusan**: Next.js App Router monolith, bukan split frontend-backend
- **Alasan**: API Routes built-in kalo butuh, satu deploy, zero infra tambahan

## Component Architecture

```
RootLayout
├── LocaleProvider (ID/EN, localStorage "netchi-locale")
│   └── LenisProvider (smooth scroll)
│       └── MotionProvider (LazyMotion)
│           └── template.tsx → PageTransition (skeleton → reveal)
│               ├── Navbar (fixed, muncul setelah scroll hero; MenuOverlay; dropdown ID/EN)
│               └── Page Content
│                   ├── Homepage: Hero → Section2 (Tools + Fakta) → Section3 (Berita)
│                   │            → Section4 (Kutipan) → Section5 (FAQ) → Footer
│                   ├── /breach-checker, /privacy-score, /password,
│                   │   /uu-pdp(+[slug]), /berita(+[slug]), /dummy-data → FeatureShell/ArticleView
│                   └── Footer (full-screen + marquee)
```

## Security Layer

Sudah diimplementasikan (audit 15 Agu):

- Validasi input di semua form (`src/lib/validate.ts` — `clampInt`; guard charset di password generator)
- CSP produksi (`connect-src 'self' https://api.pwnedpasswords.com`, `frame-ancestors 'none'`, `base-uri`, `form-action`), HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, `poweredByHeader: false` — di `next.config.ts`
- K-anonymity HIBP: hanya 5-char SHA-1 prefix keluar perangkat; timeout fetch 10s; error di-sanitasi per tipe (network/http/timeout)
- Rejection sampling di password generator; `crypto.getRandomValues` di dummy data
- Input password `type="password"` + toggle; robots.txt
- Tanpa `dangerouslySetInnerHTML`/`eval`; teks React ter-escape otomatis

## User Flow

```
Landing (Homepage)
  ↓
Hero → CTA → Scroll ke TOOLS
  ↓
TOOLS → Pilih fitur → Halaman fitur
  ↓
Gunakan fitur → Hasil → Copy/Download
  ↓
Scroll ke EDUKASI → Baca artikel
  ↓
Scroll ke FAQ → Baca jawaban
  ↓
Navigasi via Navbar → halaman lain / balik Home
```

## Future Considerations

- **Fitur**: Tambah email breach check (HIBP Breached Accounts — butuh API key)
- **Database**: Kalo butuh persistensi, tambah SQLite via better-sqlite3
- **Auth**: Kalo butuh, tambah NextAuth.js
- **Testing**: Vitest + React Testing Library