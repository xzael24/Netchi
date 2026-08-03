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
│   ├── layout.tsx                # Root layout + font loading + LenisProvider
│   ├── globals.css               # Tailwind theme, container queries
│   ├── page.tsx                  # Homepage: Hero → Section2
│   ├── breach-checker/
│   │   └── page.tsx              # (planned) Breach Checker tool
│   ├── privacy-score/
│   │   └── page.tsx              # (planned) Privacy Score tool
│   ├── password/
│   │   └── page.tsx              # (planned) Password Generator
│   ├── uu-pdp/
│   │   └── page.tsx              # (planned) UU PDP Hub
│   └── dummy-data/
│       └── page.tsx              # (planned) Dummy Data Generator
├── components/
│   ├── home/
│   │   ├── Hero.tsx              # Hero section (desktop + mobile)
│   │   └── Section2.tsx         # Tools Grid + Fakta section
│   ├── features/                 # (planned) Komponen fitur
│   │   ├── BreachChecker.tsx
│   │   ├── PrivacyScore.tsx
│   │   ├── PasswordGen.tsx
│   │   ├── UUPDP.tsx
│   │   └── DummyData.tsx
│   ├── layout/
│   │   ├── Navbar.tsx            # Fixed navbar (appear after hero scroll)
│   │   └── Footer.tsx           # (planned)
│   └── providers/
│       └── LenisProvider.tsx     # Lenis smooth scroll wrapper
├── lib/
│   └── utils.ts                  # Utility functions (cn, format, password entropy)
└── types/
    └── index.ts                  # Type definitions (Breach, PrivacyQuestion, UuPdpArticle)
```

## Data Flow

### Tanpa Database
Semua fitur pake mock data / in-memory processing:

```
User Input → Client-side Validation → Processing Logic → Render Result
                                     ↓
                              (mock data / generate / calculate)
```

### Breach Checker Flow
```
Email Input → Validasi Format → Cek Mock DB → Aman / Bocor / Error
[client]                       [in-memory]
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
- **Keputusan**: Semua data in-memory / mock
- **Alasan**: Fitur tidak butuh persistensi, deployment lebih sederhana (Vercel)
- **Konsekuensi**: Mock data di file .ts, reload page berarti data reset

### ADR-003: Monolith App Router
- **Keputusan**: Next.js App Router monolith, bukan split frontend-backend
- **Alasan**: API Routes built-in kalo butuh, satu deploy, zero infra tambahan

## Component Architecture

```
RootLayout
└── LenisProvider
    └── Navbar (fixed, muncul setelah scroll hero)
    └── Page Content
        ├── Homepage: Hero → Section2 (Tools + Fakta)
        ├── /breach-checker: BreachChecker (planned)
        ├── /privacy-score: PrivacyScore (planned)
        ├── /password: PasswordGen (planned)
        ├── /uu-pdp: UUPDP (planned)
        └── /dummy-data: DummyData (planned)
    └── Footer (planned)
```

## Security Layer (WIP)

- Input validation di semua form
- Sanitasi input (XSS protection)
- CSP headers di next.config.ts
- Error boundary per feature page
- Rate limiting kalo pake API Routes

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

- **Fitur**: Real API breach checker (Have I Been Pwned)
- **Database**: Kalo butuh persistensi, tambah SQLite via better-sqlite3
- **Auth**: Kalo butuh, tambah NextAuth.js
- **Testing**: Vitest + React Testing Library