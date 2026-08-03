# PRD: Netchi Sentinel — FTI FEST 2026

## 1. Ringkasan

Netchi Sentinel adalah web app edukasi & perlindungan identitas digital. Target: lomba FTI FEST 2026 Web Development, subtema Privasi Data & Perlindungan Identitas Digital.

## 2. Tujuan

Membangun tools interaktif yang membantu masyarakat Indonesia memahami, memeriksa, dan melindungi identitas digital mereka — tanpa perlu login, tanpa database eksternal.

## 3. Target Audience

- Masyarakat Indonesia awam digital
- Dewan juri FTI FEST 2026 (non-teknis & teknis)

## 4. User Stories

| ID | User Story | Prioritas |
|----|-----------|-----------|
| US-01 | User ingin cek apakah emailnya pernah bocor | P0 |
| US-02 | User ingin mengukur seberapa aman kebiasaan digitalnya | P0 |
| US-03 | User ingin generate password kuat anti-crack | P0 |
| US-04 | User ingin memahami hak data pribadi (UU PDP) | P0 |
| US-05 | User ingin generate data palsu buat daftar situs abal-abal | P0 |
| US-06 | User ingin baca artikel edukasi privasi | P1 |
| US-07 | User ingin tanya jawab seputar privasi digital | P1 |
| US-08 | User ingin ganti bahasa ID/EN | P2 |

## 5. Fitur Detail

### 5.1 Breach Checker (`/breach-checker`)
- **Input**: Email atau username
- **Proses**: Validasi format → cari di mock database breach (10-15 dataset palsu)
- **Output**: Aman / Bocor (detail: sumber, tahun, data exposed) / Error
- **Nilai Edukasi**: Sadar pentingnya ganti password rutin

### 5.2 Privacy Score (`/privacy-score`)
- **Input**: Jawaban kuis 10-15 pertanyaan kebiasaan online
- **Kategori**: password, account, browsing, social
- **Output**: Skor Rendah (0-40) / Sedang (41-70) / Tinggi (71-100) + tips
- **Nilai Edukasi**: Tau titik lemah kebiasaan digital

### 5.3 Password Generator (`/password`)
- **Opsi**: Panjang (8-64), include huruf besar/kecil/angka/simbol, exclude ambiguous, jumlah (1-10)
- **Output**: Password + strength indicator + estimasi waktu crack
- **Nilai Edukasi**: Paham beda password kuat vs lemah

### 5.4 UU PDP Hub (`/uu-pdp`)
- **Konten**: Artikel pasal UU PDP relevan (bahasa manusia)
- **Kategori**: Hak Subjek Data, Kewajiban Pengendali Data, Sanksi, Contoh Kasus
- **Fitur**: Cari artikel, filter kategori
- **Nilai Edukasi**: Tau hak hukum atas data pribadi

### 5.5 Dummy Data Generator (`/dummy-data`)
- **Opsi**: Pilih fields, lokal Indonesia, jumlah 1-20
- **Output**: Tabel/kartu, copy per field/baris, download JSON/CSV
- **Nilai Edukasi**: Alternatif aman saat diminta data di tempat ga jelas

## 6. Halaman & Route

| Route | Halaman | Status |
|-------|---------|--------|
| `/` | Homepage (Hero → TOOLS → FAKTA → EDUCATION → FAQ → Footer) | Partial (Hero, Tools, Fakta) |
| `/breach-checker` | Breach Checker | Belum |
| `/privacy-score` | Privacy Score | Belum |
| `/password` | Password Generator | Belum |
| `/uu-pdp` | UU PDP Hub | Belum |
| `/dummy-data` | Dummy Data Generator | Belum |

## 7. Non-Functional Requirements

- **Tanpa login** — semua fitur akses langsung
- **Responsive** — mobile-first, single column di layar kecil
- **Bahasa** — ID/EN toggle (konten statis + terjemahan)
- **Security** — validasi form, sanitasi input, XSS protection, proteksi API routes
- **Performa** — loading cepat, bundle size optimal
- **Deploy** — Vercel, tanpa database eksternal

## 8. Kriteria Penilaian Lomba

| Aspek | Bobot | Strategi |
|-------|-------|----------|
| Fungsionalitas & Performa | 25% | Semua fitur error-free, fast loading |
| Kesesuaian Tema & Inovasi | 20% | Tema privasi data, tools edukatif |
| Kualitas Kode & Dokumentasi | 20% | Clean code, struktur rapi, README + docs |
| UI/UX & Responsivitas | 20% | Pixel-art modern, mobile-friendly |
| Keamanan Dasar | 15% | Validasi, sanitasi, XSS protection |

## 9. Timeline

| Fase | Target |
|------|--------|
| Phase 1: Homepage + Hero | ✅ Done |
| Phase 2: 5 fitur inti | Next |
| Phase 3: Education + FAQ | Next |
| Phase 4: Refine animasi & interaksi | Next |
| Phase 5: Security hardening | Next |
| Phase 6: Testing & optimasi | Next |
| Deadline pengumpulan | 18 Agustus 2026 |