# Netchi — Dokumentasi API

Dokumentasi antarmuka (API) seluruh sistem Netchi. Netchi berjalan **100% client-side** (tanpa server/back-end), sehingga dokumentasi ini mencakup:

1. **API eksternal yang dikonsumsi** — Have I Been Pwned (Pwned Passwords), satu-satunya panggilan jaringan.
2. **Internal client API** — seluruh fungsi ekspor dari `src/lib/` dan `src/data/`, lengkap dengan parameter & contoh.
3. **Aliran data, keamanan (k-anonymity), dan status code.**

---

## 1. Arsitektur

```
[ Browser (Next.js / React, semua halaman "use client") ]
   │
   ├─ fungsi lokal (src/lib, src/data) — TANPA jaringan
   │
   └─ SATU panggilan keluar:
        GET https://api.pwnedpasswords.com/range/{PREFIX}
        (hanya 5 karakter pertama hash SHA-1 — k-anonymity)
```

- Tidak ada server, database, session, atau login.
- Seluruh state hidup di memori halaman; data tidak pernah dikirim ke server Netchi.

---

## 2. API Eksternal: HIBP Pwned Passwords

Satu-satunya integrasi jaringan (dipakai `src/lib/pwned.ts`).

### Spesifikasi Request

| Item | Nilai |
| --- | --- |
| Method | `GET` |
| URL | `https://api.pwnedpasswords.com/range/{prefix}` |
| `{prefix}` | 5 karakter pertama SHA-1 **huruf besar** dari password |
| Header | `Add-Padding: true` — menyamarkan panjang respons (anti-fingerprint) |
| Auth | Tidak diperlukan (API publik) |
| Body | Tidak ada |

### Spesifikasi Response

| Kondisi | Status | Body |
| --- | --- | --- |
| Sukses | `200` | `text/plain`; tiap baris `SUFFIX:COUNT` (contoh di bawah) |
| Range tidak punya data | `200` | kosong (tidak ada baris) |
| Bad request | `400` | — |
| Rate limit | `429` | — |

Contoh respons `text/plain`:
```
0018A45C4D1DEF81644B54AB7F969B88D65:1
00D4F6E8FA6EECAD2A3AA415EEC418D38EC:2
012A2B1B1F1B1F1B1F1B1F1B1F1B1F1B1F1F:3
```

### Alur (k-anonymity)

```
password
  └─> SHA-1 (crypto.subtle; fallback pure-JS bila HTTP non-secure)
        └─> hash 40-hex = HHHHH (prefix 5) + ssss… (suffix 35)
              ├─> kirim PREFIX  → GET /range/HHHHH
              └─> cocokkan SUFFIX secara lokal
```

**Jaminan:** password asli & hash penuh TIDAK pernah meninggalkan perangkat.

### Contoh Request → Response

```
Request:
GET https://api.pwnedpasswords.com/range/21BD1 HTTP/1.1
Add-Padding: true

(prefix "21BD1" = 5-char SHA-1 dari "password123")
```

### Return Type

```ts
type PwnedResult =
  | { pwned: true; count: number; error?: undefined }
  | { pwned: false; count: number; error?: undefined }
  | { pwned: false; count: 0; error: string };
```

**Kasus error yang ditangkap:** jaringan gagal / HIBP tidak `200` → `error` diisi, UI menampilkan "Tidak bisa terhubung ke HIBP (…). Coba lagi."

---

## 3. Internal Client API — `src/lib/pwned.ts`

```ts
checkPasswordPwned(password: string): Promise<PwnedResult>
```

| Param | Tipe | Keterangan |
| --- | --- | --- |
| `password` | `string` | password yang dicek (tidak dikirim, hanya hash prefix) |

- **Dipakai:** `/breach-checker`, `/password`.
- **Contoh:** `checkPasswordPwned("password123")` → `{ pwned: true, count: 15544420 }` (atau `{ pwned: false, count: 0 }`).

---

## 4. Internal Client API — `src/lib/utils.ts`

### `calculatePasswordEntropy`

```ts
calculatePasswordEntropy(password: string): number
```
- Entropy (bit) = `log2(pool^panjang)`; pool dihitung dari charset yang ada (a-z=26, A-Z=26, 0-9=10, simbol=32).
- `calculatePasswordEntropy("password")` → ≈ `37.6` bit.
- **Dipakai:** `/password` (label kekuatan + estimasi crack).

### `getTimeToCrack` / `getStrengthLabel` / `getStrengthColor`

```ts
getTimeToCrack(entropy: number): string
getStrengthLabel(entropy: number): string
getStrengthColor(entropy: number): string   // kelas warna tailwind
```

| Entropy | Waktu Crack | Label | Warna |
| --- | --- | --- | --- |
| < 30 | Instan | Sangat Lemah | `text-danger` |
| 30–49 | Detik–Menit | Lemah | `text-warning` |
| 50–69 | Jam–Hari | Sedang | `text-accent` |
| 70–89 | Tahun–Abad | Kuat | `text-success` |
| ≥ 90 | Tidak terpecahkan | Sangat Kuat | `text-success` |

---

## 5. Internal Client API — `src/lib/validate.ts`

| Fungsi | Signature | Perilaku |
| --- | --- | --- |
| `clampInt` | `(val: unknown, min: number, max: number) => number` | `round` + clamp `[min,max]`; non-finite → `min` |

**Contoh:**
- `clampInt("999", 8, 64)` → `64` · `clampInt(3, 1, 20)` → `3`

---

## 6. Internal Client API — `src/data/`

### `src/data/commonPasswords.ts`

```ts
isCommonPassword(password: string): boolean
COMMON_PASSWORDS: string[]   // 50+ password paling umum
```
- `isCommonPassword("123456")` → `true` (case-insensitive).
- **Dipakai:** `/breach-checker` (tolak dulu sebelum HIBP).

### `src/data/privacyQuestions.ts`

```ts
type Answer = "never" | "sometimes" | "always";
PRIVACY_QUESTIONS: PrivacyQuestion[];   // 12 pertanyaan: id, question, category, weight
ANSWER_SCORE: Record<Answer, number>;   // always:1, sometimes:.5, never:0

calculateScore(answers: Record<string, Answer>): number  // 0–100 (bobot)
scoreCategory(score: number): { label; emoji; color; advice }
```

| Kategori | Pertanyaan (contoh) | Bobot |
| --- | --- | --- |
| password | "Saya memakai password berbeda…" | 2 |
| account | "Saya mengaktifkan 2FA…" | 2 |
| browsing | "Saya berhati-hati sebelum mengklik link…" | 2 |
| social | "Saya tidak membagikan data sensitif…" | 2 |

**Contoh:** `calculateScore({ q1: "always", q2: "never" })` → skor berbobot 0–100.
**Dipakai:** `/privacy-score` (skor, kategori, saran personal).

### `src/data/dummyData.ts`

```ts
type DummyField = "nama" | "email" | "phone" | "alamat" | "ttl"
                | "pekerjaan" | "perusahaan";
type DummyPerson = Record<DummyField, string>;
FIELD_LABELS: Record<DummyField, string>;

generatePeople(fields: DummyField[], count: number): Partial<DummyPerson>[];
toCSV(rows: Partial<DummyPerson>[]): string;
```

**Contoh `generatePeople(["nama","email"], 2)`** →
```json
[
  { "nama": "Andi Santoso", "email": "andisantoso.482@mail.com" },
  { "nama": "Sari Wijaya",  "email": "sariwijaya.731@mail.com" }
]
```
**Contoh `toCSV`** →
```csv
Nama,Email
Andi Santoso,andisantoso.482@mail.com
Sari Wijaya,sariwijaya.731@mail.com
```
**Dipakai:** `/dummy-data` (tabel + download JSON/CSV).

### Data konten (edukasi)

```ts
// src/data/uuPdpArticles.ts
UU_PDP_ARTICLES: UuPdpArticle[];            // daftar pasal
UU_CATEGORIES: readonly string[];           // filter kategori

// src/data/uPdpArticlesExtended.ts
UU_PDP_ARTICLES_EXTENDED: UuPdpArticle[];   // versi detail (points)

// src/data/breachArticles.ts
BREACH_ARTICLES: BreachArticle[];           // 3 artikel kebocoran
type BreachArticle = {
  slug: string; title: string; summary: string; source: string;
  date: string; pwnCount: number; dataClasses: string[];
  body: string[]; keyTakeaways: string[];
};
```

---

## 7. Matriks: Halaman → API

| Halaman | API yang dipakai |
| --- | --- |
| `/breach-checker` | `isCommonPassword`, `checkPasswordPwned` |
| `/privacy-score` | `PRIVACY_QUESTIONS`, `calculateScore`, `scoreCategory` |
| `/password` | `calculatePasswordEntropy`, `getTimeToCrack`, `getStrengthColor`, `getStrengthLabel`, `clampInt`, `checkPasswordPwned` |
| `/dummy-data` | `generatePeople`, `toCSV`, `FIELD_LABELS`, `clampInt` |
| `/uu-pdp` | `UU_PDP_ARTICLES`, `UU_CATEGORIES`, `UU_PDP_ARTICLES_EXTENDED` |
| `/berita` | `BREACH_ARTICLES` |

---

## 8. Keamanan Integrasi

- **K-anonymity:** hanya 5-char SHA-1 prefix dikirim ke HIBP; `Add-Padding` menyamarkan ukuran respons.
- **CSP produksi:** `connect-src 'self' https://api.pwnedpasswords.com` — browser memblokir koneksi ke domain lain.
- **Fallback:** SHA-1 murni JS (HTTP non-secure) & clipboard `execCommand`.
- **Tanpa server:** tidak ada endpoint server yang bisa dieksploitasi.
- **Validasi input:** `clampInt` sebagai pertahanan batas input (panjang/jumlah slider).

---

*Dokumentasi API — Netchi • Tim ICHI • FTI FEST 2026*