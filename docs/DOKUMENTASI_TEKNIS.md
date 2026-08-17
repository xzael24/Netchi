# Netchi — Dokumentasi Teknis Pendukung

> **FTI FEST 2026 · Lomba Web Development — Tim ICHI**
> Subtema: *Privasi Data & Perlindungan Identitas Digital*
> **Website live:** https://netchi.vercel.app — **Deadline pengumpulan:** 18 Agustus 2026

Dokumen ini menggabungkan **dokumentasi API**, **user flow**, dan **wireframe** Netchi dalam satu dokumen pendukung (sesuai guidebook §8.C: Wireframe/Mockup UI/UX, User Flow/Flowchart, Dokumentasi API, dan dokumen teknis pendukung lainnya). Seluruh isi diverifikasi terhadap implementasi final.

---

## 1. Ringkasan Arsitektur

Netchi berjalan **100% di perangkat pengguna (client-side)** — tanpa server, tanpa database, tanpa login. Seluruh state hidup di memori halaman; data pengguna tidak pernah dikirim ke server Netchi. Satu-satunya panggilan jaringan keluar adalah **Have I Been Pwned (Pwned Passwords)** dengan prinsip **k-anonymity**.

```
[ Browser (Next.js 15 / React 18, App Router) ]
   │
   ├─ fungsi lokal (src/lib, src/data) — TANPA jaringan
   │
   └─ SATU panggilan keluar:
        GET https://api.pwnedpasswords.com/range/{PREFIX}
        (hanya 5 karakter pertama hash SHA-1 — k-anonymity)
```

---

## 2. API & Integrasi

### 2.1 API Eksternal: HIBP Pwned Passwords

Satu-satunya integrasi jaringan, dipakai oleh `/breach-checker` dan `/password` (via `src/lib/pwned.ts`).

**Spesifikasi Request**

| Item | Nilai |
| --- | --- |
| Method | `GET` |
| URL | `https://api.pwnedpasswords.com/range/{prefix}` |
| `{prefix}` | 5 karakter pertama SHA-1 **huruf besar** dari password |
| Header | `Add-Padding: true` — menyamarkan panjang respons (anti-fingerprint) |
| Auth | Tidak diperlukan (API publik) |
| Body | Tidak ada |

**Spesifikasi Response**

| Kondisi | Status | Body |
| --- | --- | --- |
| Sukses | `200` | `text/plain`; tiap baris `SUFFIX:COUNT` |
| Range tidak punya data | `200` | kosong (tidak ada baris) |
| Bad request | `400` | — |
| Rate limit | `429` | — |

**Contoh request → response**

```
GET https://api.pwnedpasswords.com/range/21BD1 HTTP/1.1
Add-Padding: true

(prefix "21BD1" = 5-char SHA-1 dari "password123")
```

```
0018A45C4D1DEF81644B54AB7F969B88D65:1
00D4F6E8FA6EECAD2A3AA415EEC418D38EC:2
012A2B1B1F1B1F1B1F1B1F1B1F1B1F1B1F1F:3
```

**Alur k-anonymity**

```
password
  └─> SHA-1 (crypto.subtle; fallback pure-JS bila HTTP non-secure)
        └─> hash 40-hex = HHHHH (prefix 5) + ssss… (suffix 35)
              ├─> kirim PREFIX  → GET /range/HHHHH
              └─> cocokkan SUFFIX secara lokal
```

**Jaminan:** password asli dan hash penuh **tidak pernah meninggalkan perangkat**.

**Penanganan error** (timeout fetch 10 detik, `AbortSignal.timeout`):

| Kondisi | `error` | Pesan di UI |
| --- | --- | --- |
| Jaringan gagal | `network` | "Tidak bisa terhubung ke HIBP. Cek koneksi internetmu, lalu coba lagi." |
| HIBP tidak `200` | `http` | "HIBP sedang sibuk. Coba lagi nanti." |
| Timeout > 10 detik | `timeout` | "HIBP tidak merespons. Coba lagi." |

### 2.2 API Internal (Client)

#### `src/lib/pwned.ts`

```ts
type PwnedError = "network" | "http" | "timeout";
type PwnedResult =
  | { pwned: boolean; count: number; error?: undefined }
  | { pwned: false; count: 0; error: PwnedError };

checkPasswordPwned(password: string): Promise<PwnedResult>
```

- SHA-1 via Web Crypto (`crypto.subtle`) pada konteks aman (HTTPS/localhost); fallback implementasi murni JavaScript pada HTTP non-secure (mis. demo via LAN).
- **Contoh:** `checkPasswordPwned("password123")` → `{ pwned: true, count: 6421042 }` (diukur live, 16 Agu 2026) · password aman → `{ pwned: false, count: 0 }`.

#### `src/lib/utils.ts` — Kekuatan & Waktu Crack

```ts
calculatePasswordEntropy(password: string): number   // log2(pool^panjang)
getTimeToCrack(entropy, locale?): string
getStrengthLabel(entropy, locale?): string
getStrengthColor(entropy): string                    // kelas warna tailwind
```

Pool dihitung dari charset yang ada pada password: `a-z` = 26, `A-Z` = 26, `0-9` = 10, simbol = 32. **Contoh:** `calculatePasswordEntropy("password")` ≈ **37.6 bit**.

| Entropy | Waktu Crack | Label | Warna |
| --- | --- | --- | --- |
| < 30 | Instan | Sangat Lemah | `text-danger` |
| 30–39 | Detik | Lemah | `text-warning` |
| 40–49 | Menit | Lemah | `text-warning` |
| 50–59 | Jam | Sedang | `text-accent` |
| 60–69 | Hari | Sedang | `text-accent` |
| 70–79 | Tahun | Kuat | `text-success` |
| 80–89 | Abad | Kuat | `text-success` |
| 90–99 | Abad | Sangat Kuat | `text-success` |
| ≥ 100 | Tidak terpecahkan | Sangat Kuat | `text-success` |

#### `src/lib/validate.ts`

```ts
clampInt(val: unknown, min: number, max: number): number
```

`round` + clamp ke `[min, max]`; nilai non-finite → `min`. **Contoh:** `clampInt("999", 8, 64)` → `64` · `clampInt(3, 1, 20)` → `3`. Dipakai sebagai pertahanan batas input di semua slider/jumlah.

#### `src/data/commonPasswords.ts`

```ts
isCommonPassword(password: string): boolean   // case-insensitive
COMMON_PASSWORDS: string[]                    // 51 password paling umum
```

- **Contoh:** `isCommonPassword("123456")` → `true`.
- Dipakai `/breach-checker`: tolak dulu sebelum panggil HIBP.

#### `src/data/privacyQuestions.ts`

```ts
type Answer = "never" | "sometimes" | "always";
PRIVACY_QUESTIONS: PrivacyQuestion[];   // 12 pertanyaan: id, question, category, weight
ANSWER_SCORE: Record<Answer, number>;   // always: 1, sometimes: 0.5, never: 0

calculateScore(answers: Record<string, Answer>): number  // 0–100 (bobot)
scoreCategory(score): { label; emoji; color; advice }
```

| Kategori | Contoh pertanyaan | Bobot |
| --- | --- | --- |
| password | "Saya memakai password berbeda untuk setiap akun penting." | 2 / 1 |
| account | "Saya mengaktifkan 2FA di semua layanan yang mendukung." | 2 / 1 |
| browsing | "Saya berhati-hati sebelum mengklik link dari email atau chat yang tidak dikenal." | 2 / 1 |
| social | "Saya tidak membagikan data pribadi sensitif di media sosial." | 2 / 1 |

Skor: **Rendah (0–40)** · **Sedang (41–70)** · **Tinggi (71–100)**, masing-masing dengan saran personal. Dipakai `/privacy-score`.

#### `src/data/dummyData.ts`

```ts
type DummyField = "nama" | "email" | "phone" | "alamat" | "ttl"
                | "pekerjaan" | "perusahaan";
type DummyPerson = Record<DummyField, string>;
FIELD_LABELS: Record<DummyField, string>;

generatePeople(fields: DummyField[], count: number): Partial<DummyPerson>[]
toCSV(rows: Partial<DummyPerson>[]): string      // RFC 4180 escaping
```

- Random number pakai `crypto.getRandomValues` (bukan `Math.random`).
- **Contoh `generatePeople(["nama","email"], 2)`** →
  ```json
  [
    { "nama": "Andi Santoso", "email": "andisantoso.482@mail.com" },
    { "nama": "Sari Wijaya",  "email": "sariwijaya.731@mail.com" }
  ]
  ```
- **Contoh `toCSV`** →
  ```csv
  Nama,Email
  Andi Santoso,andisantoso.482@mail.com
  Sari Wijaya,sariwijaya.731@mail.com
  ```
- Fields kosong → semua field (default). Dipakai `/dummy-data`.

#### Data konten (edukasi)

```ts
// src/data/uuPdpArticles.ts
UU_PDP_ARTICLES: UuPdpArticle[];            // daftar pasal (derivasi dari extended)
UU_CATEGORIES: readonly string[];           // filter kategori

// src/data/uPdpArticlesExtended.ts
UU_PDP_ARTICLES_EXTENDED: UuPdpArticle[];   // versi detail (points)

// src/data/breachArticles.ts
BREACH_ARTICLES: BreachArticle[];           // 3 artikel kebocoran data
type BreachArticle = {
  slug: string; title: string; summary: string; source: string;
  date: string; pwnCount: number; dataClasses: string[];
  body: string[]; keyTakeaways: string[];
};
```

Kategori UU PDP: `Semua`, `Hak Subjek Data`, `Kewajiban Pengendali Data`, `Sanksi & Denda`, `Contoh Kasus`. Konten edukasi tetap Bahasa Indonesia sesuai keputusan desain.

### 2.3 Matriks Halaman → API

| Halaman | API yang dipakai |
| --- | --- |
| `/breach-checker` | `isCommonPassword`, `checkPasswordPwned` |
| `/privacy-score` | `PRIVACY_QUESTIONS`, `calculateScore`, `scoreCategory` |
| `/password` | `calculatePasswordEntropy`, `getTimeToCrack`, `getStrengthColor`, `getStrengthLabel`, `clampInt`, `checkPasswordPwned` |
| `/dummy-data` | `generatePeople`, `toCSV`, `FIELD_LABELS`, `clampInt` |
| `/uu-pdp` | `UU_PDP_ARTICLES`, `UU_CATEGORIES`, `UU_PDP_ARTICLES_EXTENDED` |
| `/berita` | `BREACH_ARTICLES` |

### 2.4 Keamanan Integrasi

- **K-anonymity:** hanya 5-char SHA-1 prefix yang dikirim ke HIBP; `Add-Padding` menyamarkan ukuran respons.
- **CSP produksi:** `connect-src 'self' https://api.pwnedpasswords.com` — browser memblokir koneksi ke domain lain; `frame-ancestors 'none'` anti-clickjacking; `base-uri 'self'`; `form-action 'self'`.
- **Header keamanan lain:** HSTS (prod), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Permissions-Policy` (camera/mic/geolocation/payment dinonaktifkan), `poweredByHeader: false`.
- **Fallback:** SHA-1 murni JS (HTTP non-secure) & clipboard `execCommand` (lingkungan terbatas).
- **Tanpa server:** tidak ada endpoint server yang bisa dieksploitasi; tanpa login, tanpa pengumpulan data.
- **Validasi input:** `clampInt` (panjang/jumlah slider), guard charset minimal satu jenis, guard double-tap pada kuis, rejection sampling pada generator password.

---

## 3. Alur Pengguna (User Flow)

Konvensi: `(UI: …)` = elemen terlihat pengguna · `──>` = lanjut langkah · `◇` = titik keputusan.

### 3.1 Alur Global — Navigasi, Menu & Transisi

```
[Buka situs]
  └─> (UI: PageTransition) skeleton shimmer ~1.4 detik, lalu terangkat (reveal)
       └─> halaman siap di-interaksi

┌─ Navbar (fixed di atas, semua halaman)
│    ├─ (UI: "Menu") ──> MenuOverlay (slide dari atas; 7 link:
│    │     Beranda, Cek Password, Skor Privasi, Password, Berita, UU PDP, Dummy Data)
│    │     ├─ pilih link → overlay tutup + pindah halaman
│    │     └─ (UI: "Tutup") → overlay tutup, tetap di halaman
│    └─ (UI: ikon globe) ──> dropdown ID/EN (desktop: hover; mobile: tap)
│
└─ (UI: marquee strip bawah, hanya halaman fitur — menetap di viewport)
```

### 3.2 Beranda (`/`)

```
Scroll beranda (satu arah, top→bottom):

R1 Hero "Netchi Sentinel"
   (UI: CTA "MULAI SEKARANG") ├─> klik ──> /breach-checker
                              └─> scroll ──> R2

R2 "Yang Bisa Kamu Lakukan" — 5 kartu fitur + infografis fakta
   1://SCAN  ──> /breach-checker   2://SCORE ──> /privacy-score
   3://CRACK ──> /password         2://EDU   ──> /uu-pdp
   5://MASK  ──> /dummy-data

R3 "Berita Kami" (pinned scroll; 3 judul artikel)
   klik judul (hover: tooltip "Lihat lebih lanjut") ──> /berita/{slug}

R4 Kutipan (curtain reveal, GSAP ScrollTrigger) — lanjut scroll

R5 FAQ — accordion: klik pertanyaan ──> expand (+); klik lagi ──> collapse (×)

R6 Footer — big links semua fitur; wordmark; marquee; © 2026 Netchi
```

### 3.3 Cek Password Bocor (`/breach-checker`)

```
(UI: input "ketik password yang mau dicek di sini" + tombol "Cek →")
  └─> isi password → klik "Cek →"

◇ input kosong? ── ya ──> (UI: "Password tidak boleh kosong") — berhenti
◇ password umum (isCommonPassword)?
   ├─ ya ──> card merah "⚠ Password terlalu umum" + link "Generate password kuat →" (/password) — SELESAI
◇ hash SHA-1 + k-anonymity (5-char prefix → HIBP)
   ├─ gagal ──> pesan sesuai tipe error (network/http/timeout) — lihat §2.1
◇ hasil HIBP:
   ├─ bocor ──> card merah "⚠ Password pernah bocor" + jumlah kemunculan
   │            + saran: ganti password, aktifkan 2FA, password unik per akun
   └─ aman ──> card hijau "✓ Tidak ditemukan dalam kebocoran"
```

State UI: `idle` → `checking` (tombol "Mengecek…", disabled) → `common` / `pwned` / `safe` / `error`.

### 3.4 Skor Privasi (`/privacy-score`)

```
Intro: (UI) "12 pertanyaan cepat, satu per satu." + progress "Q01 / 12"

Kuis (satu pertanyaan per layar):
   pilih (UI: "A Selalu" / "B Kadang" / "C Tidak Pernah")
   ├─> jawab ──> auto-advance (animasi slide)
   ├─> (UI: "← Sebelumnya") ──> balik 1 pertanyaan (jawaban tersimpan)
   └─> semua terjawab ──> muncul (UI: "Lihat Skor →")

◇ klik "Lihat Skor →" ──> layar hasil:
   - Skor 0–100 (count-up animation)
   - Kategori berwarna: Rendah (0–40) / Sedang (41–70) / Tinggi (71–100)
   - "Rincian Per Kategori": bar 4 kategori (Kata Sandi, Keamanan Akun,
     Kebiasaan Browsing, Media Sosial)
   - Saran personal dinamis (menyebut kelemahan spesifik dari jawaban)

Aksi: (UI: "Ulangi") reset dari Q01 · "Buat Password Kuat →" (/password)
      · "Cek Password Bocor" (/breach-checker)
```

Edge case: double-tap cepat pada opsi — guard indeks (tidak skip, tidak crash).

### 3.5 Generator Password (`/password`)

```
Form opsi:
   - slider Panjang (8–64)  · slider Jumlah (1–10)
   - checkbox charset: a-z / A-Z / 0-9 / simbol
   - checkbox "Hindari karakter ambigu (il1Lo0O)"
   - opsional input "Dari kata" (contoh "John Doe" → "@J0hnDoe24!")

◇ klik "Generate →"
   ├─ tanpa charset ──> (UI: "Pilih minimal satu jenis karakter.") tombol disabled
   └─ oke ──> hasil {jumlah} password, masing-masing:
        (UI: password, tombol "Copy" / "✓ Tersalin")
        + label kekuatan berwarna + "Entropy N.N bit" + "Estimasi crack: …"

◇ mode "Dari kata": leet-substitution (a→@/4, i→1/!, o→0, s→$/5),
   kapital awal, simbol + 4 digit — tetap memenuhi target entropy.

◇ blok opsional "Cek password hasil generate — udah pernah bocor?"
   └─> HIBP k-anonymity: bocor → "⚠ Password ini ditemukan {N}× … JANGAN dipakai."
       aman → "✓ Password tidak ditemukan …" · gagal → pesan error §2.1
```

Edge case: copy di HTTP (fallback `execCommand`), teks panjang terpotong rapi (`break-all`).

### 3.6 Berita (`/berita`, `/berita/{slug}`)

```
/berita — daftar 3 kartu artikel (label "Berita", tanggal, jumlah akun terdampak)
   └─> klik kartu ──> /berita/{slug}

/berita/{slug} — ArticleView:
   judul + chapter "Berita" · meta (tanggal, sumber, "N akun terdampak")
   chips DataClasses (mis. Email addresses, Passwords)
   isi paragraf + (UI: "Yang Perlu Diketahui") — key takeaways
   (UI: "← Kembali ke Daftar Berita") ──> /berita

◇ slug tidak dikenal ──> (UI: "Berita tidak ditemukan." + kembali ke /berita)
```

### 3.7 Edukasi UU PDP (`/uu-pdp`, `/uu-pdp/{slug}`)

```
/uu-pdp — hero editorial + search + filter:
   (UI: "Cari pasal / kata kunci...") ──> filter live (judul/summary)
   filter kategori: Semua / Hak Subjek Data / Kewajiban Pengendali Data /
     Sanksi & Denda / Contoh Kasus
   daftar pasal bernomor (01, 02, …) + badge chapter berwarna + "{n} PASAL"

◇ hasil filter kosong ──> (UI: "Tidak ada pasal yang cocok.")
   └─> ada ──> klik pasal ──> /uu-pdp/{slug}

/uu-pdp/{slug} — ArticleView: chapter + judul + poin-poin pasal;
   (UI: "← Kembali ke Daftar UU PDP")
◇ slug tidak dikenal ──> (UI: "Artikel tidak ditemukan." + kembali)
```

### 3.8 Generator Data Dummy (`/dummy-data`)

```
Form:
   - checkbox field: Nama, Email, No. HP, Alamat, Tanggal Lahir, Pekerjaan, Perusahaan
   - input Jumlah (1–20)
   └─> klik "Generate →" ──> tabel hasil ({jumlah} baris; scroll horizontal
        di dalam kontainer bila lebar)

Ekspor:
   └─ (UI: "⬇ JSON") ──> download netchi-dummy.json
   └─ (UI: "⬇ CSV")  ──> download netchi-dummy.csv
```

Edge case: semua field di-uncheck → kembali ke semua field (default).

### 3.9 Matriks Keputusan & Edge Cases

| Titik | Kondisi | Perilaku sistem |
| --- | --- | --- |
| Navigasi | halaman baru dimuat | PageTransition skeleton → reveal |
| Cek bocor | input kosong | error inline "Password tidak boleh kosong" |
| Cek bocor | password umum | card "⚠ Password terlalu umum" + link generate |
| Cek bocor | HIBP tak terjangkau | pesan error per tipe (network/http/timeout) |
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

## 4. Wireframe

### 4.1 Sistem Grid & Palet

- **Grid global (desktop):** kolom tepi 25px `│ │`, konten di tengah; hero pakai 5 kolom `2.6% / 30% / 35% / 29.05% / 1fr`, 5 baris `4vh / 27vh / 22vh / 18vh / 29vh`. **Mobile:** kolom tepi 25px, konten single-column.
- **Tipografi fluid:** `clamp(min, min(cqw, vh), max)` — teks menyesuaikan lebar kolomnya (container query) di 1024–2560px.
- **Palet:** biru `#1A3CDB` (bg) · cream `#f5f0d5` (teks) · oranye `#EF4444` (accent) · garis `cream/25` · sukses `#10b981` · warning `#f59e0b` · bahaya `#ef4444`.
- **Font:** Space Grotesk (display), Inter (body), JetBrains Mono (mono), Press Start 2P (pixel, huruf "S" pada logo).

### 4.2 Navbar & Menu Overlay (semua halaman)

```
┌──────────────────────────────────────────────────┐
││  NETCHI SENTINEL                ☰ MENU    🌐    ││  <- globe = dropdown ID/EN
└──────────────────────────────────────────────────┘

Menu Overlay (klik ☰, slide dari atas):
┌──────────────────────────────────────────────────┐
││  NETCHI SENTINEL                     TUTUP (✕)  ││
│  Beranda · Cek Password · Skor Privasi · Password│
│  Berita · UU PDP · Dummy Data                    │
└──────────────────────────────────────────────────┘
```

### 4.3 Beranda (`/`)

```
R1 HERO    [ headline "Netchi S entinel", sub, CTA "MULAI SEKARANG", waving lines ]
R2 TOOLS   [ 5 kartu: 1://SCAN 2://SCORE 3://CRACK 2://EDU 5://MASK + infografis fakta ]
R3 BERITA  [ judul section + 3 kartu artikel (hover "Lihat lebih lanjut") ]
R4 KUTIPAN [ kutipan (curtain reveal) ]
R5 FAQ     [ accordion: + / × per pertanyaan ]
R6 FOOTER  [ big links semua fitur + marquee + © 2026 ]
(strip marquee fixed di bawah viewport — halaman fitur)
```

### 4.4 Cek Password (`/breach-checker`)

```
││ 1://SCAN   NETCHI SENTINEL      ☰ MENU   🌐   ││
│  Apakah passwordmu pernah bocor?               │
│  [ input password            ] [ Cek → ]      │
│  ┌─ hasil ─┐                                  │
│  │ ⚠ Bocor: N× | ✓ Aman | ⚠ Terlalu umum │   │
│  └─────────┘                                  │
```

### 4.5 Skor Privasi (`/privacy-score`)

```
"Ukur kebiasaan digitalmu?"   Q01/12
PERTANYAAN (1 per layar):  A Selalu   B Kadang   C Tidak Pernah
[ ← Sebelumnya ]
HASIL:  Skor count-up 0–100 + kategori (Rendah/Sedang/Tinggi)
        + Rincian Per Kategori (4 bar) + Saran personal
[ Ulangi ] [ Buat Password Kuat → ] [ Cek Password Bocor ]
```

### 4.6 Password (`/password`)

```
"Buat password super kuat"
[ Panjang (16) slider ] [ Jumlah (3) slider ]
[ ☑ a-z ] [ ☑ A-Z ] [ ☑ 0-9 ] [ ☑ #$% ] [ ☑ hindari ambigu ]
[ Dari kata (opsional): "John Doe" ]
[ Generate → ]
┌─ hasil (per baris) ──────────────┐
│ aB3$xZ...9  [Copy] │ Entropy 48.1 bit · Sedang · crack: Jam │
└──────────────────────────────────┘
Real check: "udah pernah bocor?"  [ input ] [ Cek ]
```

### 4.7 Berita (`/berita`, `/berita/[slug]`)

```
BERITA: [ card 1 ] [ card 2 ] [ card 3 ]   (label, tanggal, akun terdampak)
DETAIL: judul + chapter "Berita" · meta (tanggal · sumber · N akun)
        · chips dataClasses · isi paragraf + "Yang Perlu Diketahui" + [ Kembali ]
```

### 4.8 UU PDP (`/uu-pdp`, `/uu-pdp/[slug]`)

```
UU PDP: [ Cari pasal... ]  [ filter: Semua/Hak/Kewajiban/Sanksi/Contoh ]
        [ 01 Pasal... ] [ 02 Pasal... ] ...  (badge chapter berwarna, "{n} PASAL")
DETAIL: chapter + judul + poin-poin pasal + [ Kembali ]
```

### 4.9 Dummy Data (`/dummy-data`)

```
"Lindungi identitas aslimu"
[ ☑ Nama ][ ☑ Email ][ ☑ No.HP ]...  Jumlah: [ n (1–20) ]
[ Generate → ]
┌─ tabel ───────────────────────────┐
│ Nama     Email            No.HP   │  (scroll horizontal)
│ Andi...  andi@mail.com   0812...  │
└───────────────────────────────────┘
[ ⬇ JSON ] [ ⬇ CSV ]
```

---

## 5. Referensi Silang Dokumen

| Dokumen | Isi |
| --- | --- |
| `README.md` | Ringkasan untuk juri, fitur, keamanan, tech stack, cara menjalankan |
| `docs/PRD.md` | Product Requirements — ide → spesifikasi fitur |
| `docs/ARCHITECTURE.md` | Arsitektur, alur data, ADR (No Auth, No DB, Monolith) |
| `docs/FLOWCHART.md` | Diagram alur sistem (Mermaid) |
| `docs/implementation-plan.md` | Rencana & status implementasi (keamanan, i18n, testing, docs) |
| `docs/GUIDEBOOK WEB DEVELOPMENT.md` | Buku panduan resmi lomba (kriteria penilaian, ketentuan) |

---

*Dokumen pendukung — Netchi • Tim ICHI • FTI FEST 2026* (guidebook §8.C: Wireframe, User Flow, Dokumentasi API)