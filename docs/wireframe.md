# Netchi — Wireframe (Sketsa Layout)

Wireframe level rendah untuk seluruh halaman Netchi. Format bracket `[ ]` = box/kolom grid, `(text)` = isi. Selaras dengan `USERFLOW.md` & `API.md`.

**Sistem grid global (desktop):** kolom tepi kotak 25px `│ │`, konten di tengah. Mobile: kolom tepi jadi 25px, konten single-column.
**Palet:** biru `#1A3CDB` (bg), cream `#f5f0d5` (text), oranye `#EF4444` (accent), garis `cream/25`.

---

## 1. Navbar (semua halaman, fixed)

```
┌──────────────────────────────────────────────┐
││                NETCHI SENTINEL     ☰ MENU  🌐 ││   <- globe buka dropdown ID/EN
└──────────────────────────────────────────────┘
```

## 2. Menu Overlay (klik ☰, slide dari atas)

```
┌──────────────────────────────────────────────┐
││ 0  NETCHI SENTINEL              TUTUP (✕)   ││
├──────────────────────────────────────────────┤
││  Beranda                                     ││
││  Cek Password                               ││
││  Skor Privasi                               ││
││  Password                                   ││
││  Berita                                     ││
││  UU PDP                                     ││
││  Dummy Data                                 ││
└──────────────────────────────────────────────┘
```

---

## 3. Beranda (`/`)

```
R1 HERO  [ hero editorial: headline "Netchi S entinel", sub, CTA "MULAI SEKARANG", waving lines ]
R2 TOOLS  [ 5 kartu: 1://SCAN 2://SCORE 3://CRACK 2://EDU 5://MASK + infografis fakta ]
R3 ARTICLE [ judul section + 3 kartu artikel (hover "Lihat lebih lanjut") ]
R4 QUOTE  [ kutipan (curtain reveal) ]
R5 FAQ    [ accordion: + / × per pertanyaan ]
R6 FOOTER [ big links semua fitur + marquee + © ]
(strip marquee fixed di bawah viewport)
```

---

## 4. Cek Password (`/breach-checker`)

```
┌──────────────────────────────────────────────┐
││ 1://SCAN   NETCHI SENTINEL  ☰ MENU  🌐      ││
├──────────────────────────────────────────────┤
│   Apakah passwordmu pernah bocor?             │
│   [ input password            ] [ Cek → ]    │
│                                             │
│   ┌─ hasil ─┐                                │
│   │ ⚠ Bocor: N× | ✓ Aman | ⚠ Terlalu umum │ │
│   └────────┘                                │
└──────────────────────────────────────────────┘
```

## 5. Skor Privasi (`/privacy-score`)

```
HERO: "Ukur kebiasaan digitalmu?"  Q01/12
PERTANYAAN (1 per layar):
   A Selalu   B Kadang   C Tidak Pernah
[ ← Sebelumnya ]
HASIL:  Skor count-up 0–100 + kategori (Rendah/Sedang/Tinggi)
        + Rincian Per Kategori (4 bar) + Saran personal
[ Ulangi ] [ Buat Password Kuat → ] [ Cek Password Bocor ]
```

## 6. Password (`/password`)

```
HERO "Buat password super kuat"
[ Panjang (16) slider ] [ Jumlah (3) slider ]
[ ☑ a-z ] [ ☑ A-Z ] [ ☑ 0-9 ] [ ☑ #$% ] [ ☑ hindari ambigu ]
[ Dari kata (opsional): "John Doe" ]
[ Generate → ]
┌─ hasil (per baris) ─┐
│ aB3$xZ...9  [Copy]  │  Entropy 48.1 bit · Sedang · crack: Jam
└─────────────────────┘
Real check: "udah pernah bocor?"  [ input ] [ Cek ]
```

## 7. Berita (`/berita`, `/berita/[slug]`)

```
BERITA:
[ card 1 ] [ card 2 ] [ card 3 ]   (label, tanggal, akun terdampak)

DETAIL /berita/[slug]:
  judul + chapter "Berita"
  meta (tanggal · sumber · N akun) · chips dataClasses
  isi paragraf + "Yang Perlu Diketahui" + [ Kembali ]
```

## 8. UU PDP (`/uu-pdp`, `/uu-pdp/[slug]`)

```
UU PDP:
[ Cari pasal... ]  [ filter: Semua/Hak/Kewajiban/Sanksi/Contoh ]
[ 01 Pasal... ] [ 02 Pasal... ] ... (badge chapter berwarna)
DETAIL /uu-pdp/[slug]:
  chapter + judul + poin-poin pasal + [ Kembali ]
```

## 9. Dummy Data (`/dummy-data`)

```
HERO "Lindungi identitas aslimu"
[ ☑ Nama ][ ☑ Email ][ ☑ No.HP ]...  Jumlah: [ n ]
[ Generate → ]
┌─ tabel ─┐
│ Nama     Email            No.HP        │  (scroll horizontal)
│ Andi...  andi@mail.com   0812...      │
└─────────┘
[ ⬇ JSON ] [ ⬇ CSV ]
```

---

*Wireframe pendukung — Netchi • Tim ICHI • FTI FEST 2026* (guidebook §8.C)