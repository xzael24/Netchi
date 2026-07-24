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
| 1://TOOLS | Grid card 5 fitur (SCAN, SCORE, CRACK, LEARN, MASK) — link ke masing-masing page |
| 2://FAKTA | Infografis statistik privasi (8 fakta) |
| 3://EDUCATION | Artikel edukasi privasi data — kaya BLOG punya Netcraft |
| 4://FAQ | Accordion FAQ tentang privasi & identitas digital |
| Footer | Nav links, sosial media, credits |

### Format Halaman Fitur
Masing-masing halaman fitur pake format header section number (1://BREACH, 2://PRIVACY, dst) — konsisten dengan Netcraft style.

## Fitur Inti — Detail

### 1. Breach Checker — `1://SCAN`
**Cek apakah email atau data pribadi pernah bocor.**

- **Input**: Email atau username
- **Proses**: Validasi format → cari di mock database breach (simulasi, ga pake API eksternal beneran)
- **Output**:
  - ✅ **Aman** — tidak ditemukan kebocoran
  - ⚠️ **Bocor** — detail: sumber kebocoran, tahun, jenis data yang bocor (password, no HP, alamat, dll), saran tindakan
  - ❌ **Error** — format email tidak valid
- **Mock Data**: 10-15 dataset breach palsu (nama situs, tahun, data exposed) biar realistis
- **Nilai Edukasi**: User sadar pentingnya ganti password rutin + beda password tiap akun

### 2. Privacy Score — `2://SCORE`
**Ukur seberapa aman kebiasaan digitalmu.**

- **Input**: Jawaban kuis/checklist (10-15 pertanyaan)
- **Pertanyaan mencakup**:
  - Apakah pakai password berbeda tiap akun?
  - Apakah 2FA aktif?
  - Apakah sering klik link sembarangan?
  - Apakah pernah share data sensitif di publik?
  - Apakah update software rutin?
  - dll
- **Proses**: Hitung skor berdasarkan jawaban → mapping ke kategori
- **Output**:
  - 📉 **Rendah (0-40)** — bahaya! tampilin daftar perbaikan prioritas
  - 📊 **Sedang (41-70)** — lumayan, tapi masih bisa ditingkatkan
  - 📈 **Tinggi (71-100)** — bagus! tips maintain
- **Nilai Edukasi**: User tau titik lemah kebiasaan digital mereka

### 3. Password Generator — `3://CRACK`
**Buat password super kuat anti-crack.**

- **Input/Opsi**:
  - Panjang password (8-64 karakter)
  - Include: huruf besar, huruf kecil, angka, simbol
  - Exclude: ambiguous chars (il1Lo0O)
  - Jumlah password yang digenerate (1-10)
- **Proses**: Generate random berdasarkan opsi → hitung kekuatan
- **Output**:
  - 🔑 Password result (bisa copy)
  - 📊 Strength indicator (weak/fair/strong/very strong)
  - ⏱ Estimasi waktu crack (detik/tahun/abad)
- **Nilai Edukasi**: User paham bedanya password "kuat" vs "lemah"

### 4. UU PDP Hub — `4://LEARN`
**Pahami hakmu atas data pribadi — bahasa manusia, bukan pengacara.**

- **Konten**: Artikel pendek yang menjelaskan pasal-pasal UU PDP relevan
- **Kategori**:
  - Hak Subjek Data (akses, hapus, portabilitas)
  - Kewajiban Pengendali Data
  - Sanksi & Denda
  - Contoh kasus sehari-hari
- **Fitur**: Cari artikel, filter kategori
- **Output**: Artikel lengkap dengan highlight poin penting
- **Nilai Edukasi**: User tau hak hukum mereka atas data pribadi

### 5. Dummy Data Generator — `5://MASK`
**Lindungi identitas aslimu — pakai data palsu buat daftar di situs abal-abal.**

- **Input/Opsi**:
  - Pilih fields: Nama, Email, No. HP, Alamat, Tanggal Lahir, Pekerjaan, Perusahaan, dll
  - Lokal: 🇮🇩 Indonesia (nama Indo, alamat jalan Indo, kode pos, kota/kabupaten)
  - Jumlah: 1-20 data sekaligus
- **Proses**: Generate data random realistis berdasarkan fields + lokal
- **Output**:
  - 👤 Data dalam tabel/kartu
  - 📋 Copy per field atau per baris
  - ⬇️ Download JSON atau CSV
- **Nilai Edukasi**: User tau alternatif aman saat diminta data di tempat ga jelas

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
3. **Homepage section FAKTA** (8 infografis statistik privasi)
4. **Homepage section EDUCATION & FAQ**
5. **Navbar fixed** setelah scroll hero
6. **Footer**
7. Refine animasi & interaksi
8. Testing & optimasi

---
*Dibuat untuk FTI FEST 2026 — Web Development Competition*
