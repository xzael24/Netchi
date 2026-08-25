# Netchi: Privacy Shield

> **FTI FEST 2026, Lomba Web Development, Tim ICHI**
> Tema: **PIXEL, Protection Information Exploration in the Digital Era**
> Subtema: *Keamanan Siber dan Perlindungan Informasi Digital*, *Privasi Data dan Perlindungan Identitas Digital*

**Website live:** https://netchi.vercel.app
**Status kompetisi:** Lolos ke Grand Final (5 Besar), presentasi 28 Agustus 2026

---

## Ringkasan untuk Juri

Netchi adalah situs literasi dan perlindungan data pribadi yang bekerja 100% di perangkat pengguna (client-side). Semua fitur berjalan di browser: tidak ada akun, tidak ada server penyimpan data, dan data sensitif pengguna tidak pernah dikirim ke mana pun.

Melalui Netchi, pengguna dapat memeriksa apakah password mereka pernah bocor, mengukur kebiasaan privasi digital dengan skor interaktif, membuat password kuat (termasuk dari kata yang mudah diingat), mempelajari UU Pelindungan Data Pribadi dalam bahasa yang mudah dipahami, serta menghasilkan data palsu realistis untuk pendaftaran di situs yang tidak tepercaya.

## Fitur Utama

| Route | Fitur |
| --- | --- |
| `/` | Landing page editorial dengan pinned scroll, curtain reveal, dan micro-interaction |
| `/breach-checker` | **Cek password bocor** melalui Have I Been Pwned (Pwned Passwords) |
| `/privacy-score` | **Skor privasi** interaktif: 12 pertanyaan dan saran personal per jawaban |
| `/password` | **Generator password** kuat, mode "dari kata", dan cek kebocoran hasil generate |
| `/berita` | Artikel kasus kebocoran data nyata di Indonesia |
| `/uu-pdp` | Edukasi **UU Pelindungan Data Pribadi** dalam bahasa yang mudah dipahami, bukan bahasa hukum |
| `/dummy-data` | **Data dummy** realistis khas Indonesia untuk pendaftaran di situs yang tidak tepercaya |

## Keamanan (Privacy by Design)

- **K-anonymity (fitur unggulan):** password di-hash SHA-1 di perangkat pengguna, hanya 5 karakter prefix yang dikirim ke `api.pwnedpasswords.com`. Password asli tidak pernah meninggalkan perangkat, mengikuti pola yang sama dengan yang dipakai layanan keamanan industri.
- Semua proses (hash, generate, skor) berjalan lokal di browser: tanpa akun, tanpa database, tanpa pengumpulan data apa pun.
- **Security headers** di produksi: `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- Validasi form di semua fitur, dengan fallback SHA-1 murni JavaScript dan fallback clipboard agar tetap berfungsi di lingkungan terbatas.
- Tidak ada dependensi pihak ketiga pada runtime selain HIBP Pwned Passwords (API publik gratis).
- **Performa:** First Contentful Paint di bawah 2 detik, shared bundle sekitar 103kB, halaman statis di-pre-render.

## Desain dan Keputusan Desain

- Identitas visual pixel-grid editorial terinspirasi terminal dan era 8-bit, merepresentasikan tema "PIXEL" secara konsisten dari wireframe hingga implementasi.
- Grid 5x5 dengan rasio kolom `2.6% / 30% / 35% / 29.05% / 1fr` dan tipografi fluid berbasis `container query`, sehingga teks selalu menyesuaikan lebar kolomnya di semua ukuran layar (1024 hingga 2560px).
- **Dual-language (ID/EN)** untuk memperluas jangkauan literasi digital.
- Desain dimulai dari wireframe manual, kemudian dikembangkan menjadi iterasi high-fidelity di kode; setiap keputusan layout didokumentasikan di `docs/DOKUMENTASI_TEKNIS.md` dan `docs/ARCHITECTURE.md`.

## Tech Stack

- **Next.js 15** (App Router) dengan **React 18**, **TypeScript**
- **Tailwind CSS v4**
- **GSAP dengan ScrollTrigger** (pinned scroll dan animasi), **Framer Motion** (transisi halaman, micro-interaction)
- Font self-hosted melalui `next/font` (Inter, Space Grotesk, JetBrains Mono, Press Start 2P, lisensi OFL)
- Third-party API: [Have I Been Pwned, Pwned Passwords](https://haveibeenpwned.com/API/v3#PwnedPasswords)

## Cara Menjalankan

```bash
# 1. install dependencies
npm install

# 2. development server
npm run dev        # buka http://localhost:3000

# 3. production build + start
npm run build
npm run start      # http://localhost:3000
```

Tidak diperlukan akun login. Seluruh fitur Netchi langsung bisa dipakai.

## Deployment

**Live:** https://netchi.vercel.app (Vercel, auto-deploy dari branch `main` repo ini).

## Akun Demo

**Tidak diperlukan.** Netchi sengaja dirancang tanpa sistem login, sebuah keputusan arsitektur yang didokumentasikan (ADR-001): semua fitur dapat digunakan langsung tanpa akun, sejalan dengan prinsip privasi "minimal data, minimal jejak". Juri cukup membuka URL di atas.

## Struktur Folder

```
src/
  app/            # halaman (App Router): landing, fitur, halaman detail [slug]
  components/
    home/         # section landing page (Hero, Section2-5, Footer)
    layout/       # Navbar, MenuOverlay, FeatureShell, ArticleView, PageTransition
  data/           # konten statis (artikel, pertanyaan skor, dummy data)
  lib/            # utilitas (pwned, utils, validate)
next.config.ts    # security headers dan konfigurasi
```

## Dokumentasi Pendukung (Kriteria Kualitas Kode)

| Dokumen | Isi |
| --- | --- |
| `docs/PRD.md` | Product Requirements, dari ide menuju spesifikasi fitur |
| `docs/ARCHITECTURE.md` | Arsitektur, alur data, dan keputusan ADR (termasuk ADR-001) |
| `docs/DOKUMENTASI_TEKNIS.md` | Dokumentasi pendukung lengkap: API, user flow, wireframe (guidebook, bagian 8.C) |
| `docs/FLOWCHART.md` | Diagram alur sistem |
| `docs/implementation-plan.md` | Rencana dan progres implementasi |
| `docs/DAFTAR_PENGEMBANGAN.md` | Catatan revisi Hard Minor Changes pasca Technical Meeting Grand Final (bagian yang diperbaiki, perubahan kode, dan alasan) |