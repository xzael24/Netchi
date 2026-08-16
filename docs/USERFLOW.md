# Netchi — User Flow (Keseluruhan Sistem)

Dokumen alur pengguna (*user flow*) seluruh fitur Netchi. Mencakup alur utama, percabangan/error, dan titik keputusan — bahan presentasi & dokumentasi pendukung (guidebook §8.C).

---

## Konvensi

- `(UI: …)` = elemen/teks yang terlihat oleh pengguna.
- `──>` = lanjut ke langkah berikutnya.
- `◇` = titik keputusan (branch).
- Setiap fitur: **Tujuan → Entry → Alur → Keputusan/Error → Hasil akhir**.

---

## 1. Alur Global: Navigasi, Menu & Transisi Halaman

**Tujuan:** pengguna sampai ke halaman mana pun dengan konsisten di semua perangkat.

```
[Buka situs]
  └─> (UI: PageTransition) skeleton shimmer muncul, lalu terangkat (reveal)
       └─> halaman siap di-interaksi

┌─ Navbar (fixed di atas, semua halaman)
│    ├─ (UI: "Menu") ──> MenuOverlay (slide dari atas)
│    │     ├─ pilih link → overlay tutup + pindah halaman
│    │     └─ (UI: "Tutup") → overlay tutup, tetap di halaman
│    └─ (UI: ikon globe) ──> dropdown ID/EN (turun ke bawah, selebar kolom)
│
└─ (UI: marquee strip bawah, hanya halaman fitur — menetap di viewport)
```

**Keputusan / catatan:**
- Menu overlay menampilkan 7 link: Beranda, Cek Password, Skor Privasi, Password, Berita, UU PDP, Dummy Data.
- Transisi antar halaman = skeleton `~1.4s` lalu reveal.
- `MULAI SEKARANG` (CTA hero) hanya ada di beranda.

---

## 2. Beranda (`/`)

**Tujuan:** pengenalan produk + pintu masuk ke semua fitur.

```
Scroll beranda (satu arah, top→bottom):

R1 Hero "Netchi S entinel"
   (UI: CTA "MULAI SEKARANG")
   ├─> klik CTA ───> /breach-checker
   └─> scroll ──> R2

R2 "Yang Bisa Kamu Lakukan" — 5 kartu fitur
   1://SCAN  ──> /breach-checker
   2://SCORE ──> /privacy-score
   3://CRACK ──> /password
   2://EDU   ──> /uu-pdp
   5://MASK  ──> /dummy-data

R3 "Berita Kami" (pinned scroll; 3 judul artikel)
   klik judul (hover: tooltip "Lihat lebih lanjut") ──> /berita/{slug}

R4 Kutipan (curtain reveal) — tidak ada aksi, lanjut scroll

R5 FAQ — accordion
   (UI: tanda "+"/"×") klik pertanyaan ──> expand; klik lagi ──> collapse

R6 Footer
   big links ──> semua halaman fitur; wordmark; marquee; © 2026 Netchi
```

**Hasil akhir:** pengguna pindah ke fitur yang dipilih.

---

## 3. Cek Password Bocor (`/breach-checker`)

**Tujuan:** mengetahui apakah password sudah pernah bocor, tanpa mengirim password asli.

**Entry:** CTA hero, menu, kartu `1://SCAN`, footer.

```
(UI: input "ketik password yang mau dicek di sini" + tombol "Cek →")
  └─> isi password
  └─> klik "Cek →"

◇ input kosong?
   ├─ ya ──> (UI: "Password tidak boleh kosong") — form error, berhenti
   └─ tidak ─> lanjut

◇ password = daftar password umum (isCommonPassword)?
   ├─ ya ──> (UI: card merah "⚠ Password terlalu umum" + link
   │         "Generate password kuat →" ──> /password) — SELESAI
   └─ tidak ─> lanjut

◇ hash SHA-1 + k-anonymity (5-char prefix → HIBP)
   ├─ gagal jaringan/HIBP ──> (UI: "Tidak bisa terhubung ke HIBP (…). Coba lagi.")
   └─ sukses ─> lanjut

◇ hasil HIBP:
   ├─ pwned ──> (UI: card merah "⚠ Password pernah bocor" + jumlah ×
   │            + saran tindakan (ganti password, 2FA, password unik)
   │            + link "Generate password kuat →")
   └─ aman ──> (UI: card hijau "✓ Tidak ditemukan dalam kebocoran")
```

**State UI yang terlihat:** `idle` (kosong) → `checking` (tombol "Mengecek…", disabled) → `common` / `pwned` / `safe` / `error`.

**Jaminan:** password asli & hash penuh tidak pernah keluar perangkat (hanya 5-char prefix).

**Hasil akhir:** card hasil + aksi lanjut (generate password kuat).

---

## 4. Skor Privasi (`/privacy-score`)

**Tujuan:** menilai kebiasaan digital pengguna (0–100) + saran personal.

**Entry:** menu, kartu `2://SCORE`, footer.

```
Intro: (UI) "12 pertanyaan cepat, satu per satu."
  └─> progress bar + "Q01 / 12" + counter terjawab

Kuis (satu pertanyaan per layar):
  tiap pertanyaan pilih (UI: "A Selalu" / "B Kadang" / "C Tidak Pernah")
   ├─> jawab ──> auto-advance ke pertanyaan berikutnya (animasi slide)
   ├─> (UI: "← Sebelumnya") ──> balik 1 pertanyaan (jawaban tersimpan)
   └─> pertanyaan terakhir terisi ──> muncul (UI: "Lihat Skor →")

◇ klik "Lihat Skor →" ──> layar hasil:
   - Skor 0–100 (count-up animation)
   - Kategori berwarna: Rendah / Sedang / Tinggi (tanpa emoji)
   - "Rincian Per Kategori": bar 4 kategori (Kata Sandi, Keamanan Akun,
     Kebiasaan Browsing, Media Sosial)
   - Saran personal dinamis (menyebut kelemahan spesifik dari jawaban)

Aksi hasil:
   ├─ (UI: "Ulangi") ──> reset kuis dari Q01, skor 0
   ├─ (UI: "Buat Password Kuat →") ──> /password
   └─ (UI: "Cek Password Bocor") ──> /breach-checker
```

**Edge case:** double-tap cepat pada opsi — sistem guard agar tidak skip pertanyaan & tidak crash.

**Hasil akhir:** skor + saran + 3 aksi lanjut.

---

## 5. Generator Password (`/password`)

**Tujuan:** membuat password kuat (acak atau turunan dari kata) + verifikasi kebocoran.

**Entry:** menu, kartu `3://CRACK`, footer, dan dari hasil fitur lain.

```
Form opsi:
   - slider Panjang (8–64) — (UI: "Panjang (16)", "8 – 64 karakter")
   - slider Jumlah (1–10) — (UI: "Jumlah (3)", "1 – 10 password")
   - checkbox charset: a-z / A-Z / 0-9 / simbol
   - checkbox "Hindari karakter ambigu (il1Lo0O)"
   - opsional input "Dari kata" (contoh "John Doe" → "@J0hnDoe24!")

◇ klik "Generate →"
   ├─ tanpa charset ──> (UI: "Pilih minimal satu jenis karakter.") tombol disabled
   └─ oke ──> hasil {count} password, masing-masing:
        (UI: code password, tombol "Copy" / "✓ Tersalin")
        + label kekuatan berwarna + "Entropy N.N bit" + "Estimasi crack: …"

◇ hasil dari kata: leet-substitution (a→@/4, i→1/!, o→0, s→$/5), kapital
   awal, simbol + 4 digit → tetap memenuhi sistem/entropy.

◇ (opsional) blok "Cek password hasil generate — udah pernah bocor?"
   input password + "Cek" ──> HIBP k-anonymity
   ├─ bocor ──> (UI: "⚠ Password ini ditemukan {N}× … JANGAN dipakai.")
   ├─ aman ──> (UI: "✓ Password tidak ditemukan …")
   └─ error ──> (UI: "Terhubung ke HIBP gagal (…).")
```

**Edge cases:** copy di HTTP (fallback `execCommand`), password terpotong rapi (`break-all`).

**Hasil akhir:** daftar password + kekuatan + tombol copy + cek bocor.

---

## 6. Berita (`/berita`, `/berita/{slug}`)

**Tujuan:** membaca artikel kebocoran data & edukasi.

**Entry:** menu "Berita", Section3 beranda, footer.

```
/berita — daftar 3 kartu artikel (label "Berita", tanggal, jumlah akun terdampak)
   └─> klik kartu ──> /berita/{slug}

/berita/{slug} — ArticleView:
   judul + chapter "Berita"
   meta (tanggal, sumber, "N akun terdampak") — hanya jika ada
   chips DataClasses (mis. Email addresses, Passwords)
   isi paragraf (body)
   (UI: "Yang Perlu Diketahui") — key takeaways
   tombol "Kembali" (bar atas) / "← Kembali ke Daftar Berita" ──> /berita

◇ slug tidak dikenal ──> (UI: "Berita tidak ditemukan." + kembali ke /berita)
```

**Hasil akhir:** artikel terbaca; kembali ke daftar.

---

## 7. Edukasi UU PDP (`/uu-pdp`, `/uu-pdp/{slug}`)

**Tujuan:** memahami hak atas data pribadi (UU PDP) dalam bahasa awam.

**Entry:** menu "UU PDP", kartu `2://EDU`, footer.

```
/uu-pdp — hero editorial + search + filter:
   - (UI: "Cari pasal / kata kunci...") ──> filter live (judul/summary)
   - filter kategori: Semua / Hak Subjek Data / Kewajiban Pengendali Data /
     Sanksi & Denda / Contoh Kasus
   - daftar pasal bernomor (01, 02, …) + badge chapter berwarna + "N PASAL"

◇ hasil filter kosong ──> (UI: "Tidak ada pasal yang cocok.")
   └─> ada ──> klik pasal ──> /uu-pdp/{slug}

/uu-pdp/{slug} — ArticleView:
   chapter + judul + poin-poin pasal; tombol "Kembali" / "← Kembali ke Daftar UU PDP"
◇ slug tidak dikenal ──> (UI: "Artikel tidak ditemukan." + kembali)
```

**Hasil akhir:** pasal terbaca; kembali ke daftar.

---

## 8. Generator Data Dummy (`/dummy-data`)

**Tujuan:** membuat identitas palsu realistis untuk daftar di situs yang tidak tepercaya.

**Entry:** menu "Dummy Data", kartu `5://MASK`, footer.

```
Form:
   - checkbox field: Nama, Email, No. HP, Alamat, Tanggal Lahir, Pekerjaan, Perusahaan
   - input Jumlah (1–20)
   └─> klik "Generate →" ──> tabel hasil (field terpilih, {jumlah} baris)
        (tabel lebar → scroll horizontal di dalam kontainer)

Ekspor:
   └─ (UI: "⬇ JSON") ──> download netchi-dummy.json
   └─ (UI: "⬇ CSV")  ──> download netchi-dummy.csv
```

**Edge case:** semua field di-uncheck → kembali ke semua field (default).

**Hasil akhir:** tabel + file JSON/CSV terunduh.

---

## 9. Matriks Keputusan & Edge Cases (keseluruhan sistem)

| Titik | Kondisi | Perilaku sistem |
| --- | --- | --- |
| Navigasi | halaman baru dimuat | PageTransition skeleton → reveal |
| Cek bocor | input kosong | error inline "Password tidak boleh kosong" |
| Cek bocor | password umum | card "⚠ Password terlalu umum" + link generate |
| Cek bocor | HIBP tak terjangkau | error "Tidak bisa terhubung ke HIBP… Coba lagi" |
| Cek bocor | akses HTTP non-secure | fallback SHA-1 murni JS |
| Skor privasi | double-tap opsi | guard indeks — tidak skip, tidak crash |
| Skor privasi | jawaban belum lengkap | tombol "Lihat Skor" belum muncul |
| Password | tanpa charset | warning + tombol disabled |
| Password | copy di HTTP | fallback execCommand → "✓ Tersalin" |
| Password | "Dari kata" kosong | hasil = password acak penuh |
| Berita/UU PDP | slug tak dikenal | halaman "tidak ditemukan" + kembali |
| UU PDP | filter tanpa hasil | "Tidak ada pasal yang cocok." |
| Dummy data | field semua kosong | fallback ke semua field |
| Dummy data | download | blob URL JSON/CSV |

---

*Dokumen pendukung — Netchi • Tim ICHI • FTI FEST 2026*