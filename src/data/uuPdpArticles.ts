import type { UuPdpArticle } from "@/types";

export const UU_PDP_ARTICLES: UuPdpArticle[] = [
  {
    id: "hak-akses",
    chapter: "Hak Subjek Data",
    title: "Hak untuk mengakses data pribadimu",
    summary: "Kamu berhak tahu data apa saja yang dikumpulkan dan diproses oleh sebuah perusahaan.",
    points: [
      "Pasal 19 UU PDP: subjek data berhak meminta salinan data pribadinya.",
      "Perusahaan wajib merespons maksimal 30 hari.",
      "Gratis — tidak boleh dipungut biaya berlebihan.",
      "Contoh: minta riwayat data yang disimpan aplikasi e-commerce.",
    ],
  },
  {
    id: "hak-koreksi",
    chapter: "Hak Subjek Data",
    title: "Hak untuk memperbaiki data yang salah",
    summary: "Data yang tidak akurat bisa merugikan — kamu berhak meluruskannya.",
    points: [
      "Pasal 21: subjek data dapat mengajukan perbaikan data yang tidak sesuai.",
      "Berlaku untuk alamat, nomor HP, hingga data kesehatan.",
      "Perusahaan harus mengoreksi dan mengonfirmasi hasil koreksi.",
    ],
  },
  {
    id: "hak-hapus",
    chapter: "Hak Subjek Data",
    title: "Hak untuk menghapus data (right to erasure)",
    summary: "Kamu bisa minta data pribadimu dihapus dari sistem mereka.",
    points: [
      "Pasal 24: penghentian pemrosesan dan penghapusan data.",
      "Bisa dilakukan saat tujuan pemrosesan selesai atau ditarik persetujuannya.",
      "Sangat berguna setelah berhenti berlangganan suatu layanan.",
    ],
  },
  {
    id: "hak-portabilitas",
    chapter: "Hak Subjek Data",
    title: "Hak portabilitas data",
    summary: "Pindah layanan tanpa kehilangan data — datamu ikut kamu.",
    points: [
      "Pasal 25: data pribadi dapat dipindahkan ke pengendali data lain.",
      "Format harus mudah dibaca dan dipakai (machine-readable).",
      "Memudahkan berpindah aplikasi tanpa mulai dari nol.",
    ],
  },
  {
    id: "kewajiban-konsen",
    chapter: "Kewajiban Pengendali Data",
    title: "Kewajiban persetujuan eksplisit",
    summary: "Perusahaan wajib minta izin jelas sebelum mengambil data kamu.",
    points: [
      "Persetujuan harus eksplisit, tidak boleh disembunyikan di halaman syarat.",
      "Checkbox yang sudah tercentang otomatis melanggar ketentuan.",
      "Kamu berhak menarik persetujuan kapan saja.",
    ],
  },
  {
    id: "kewajiban-keamanan",
    chapter: "Kewajiban Pengendali Data",
    title: "Kewajiban menjaga keamanan data",
    summary: "Penyelenggara wajib melindungi data dari kebocoran dan akses ilegal.",
    points: [
      "Wajib menerapkan langkah teknis dan organisasional yang layak.",
      "Wajib melaporkan kebocoran data ke otoritas maksimal 3×24 jam.",
      "Pengendali data bertanggung jawab atas pihak yang dipekerjakannya.",
    ],
  },
  {
    id: "sanksi-admin",
    chapter: "Sanksi & Denda",
    title: "Sanksi administratif hingga denda besar",
    summary: "Pelanggaran UU PDP dihukum tegas, sampai sanksi pidana.",
    points: [
      "Sanksi administratif: teguran, penghentian sementara, hingga pencabutan izin.",
      "Denda administratif maksimal 2% dari pendapatan tahunan perusahaan.",
      "Pasal 67: pelanggaran berat bisa berujung pidana penjara.",
    ],
  },
  {
    id: "kasus-spam",
    chapter: "Contoh Kasus",
    title: "Kasus: telepon marketing tanpa izin",
    summary: "Nomor HP-mu dipakai tanpa persetujuan? Itu pelanggaran.",
    points: [
      "Telemarketing yang menelepon tanpa persetujuan melanggar ketentuan pemrosesan.",
      "Lapor ke otoritas PDP dengan bukti panggilan/chat.",
      "Perusahaan wajib berhenti dan menghapus datamu jika diminta.",
    ],
  },
  {
    id: "kasus-kebocoran",
    chapter: "Contoh Kasus",
    title: "Kasus: kebocoran data e-commerce",
    summary: "Saat platformmu bocor, kamu punya hak untuk tahu dan bertindak.",
    points: [
      "Perusahaan wajib memberi tahu subjek data yang terdampak.",
      "Kamu berhak minta penjelasan data apa saja yang bocor.",
      "Segera ganti password dan aktifkan 2FA untuk meminimalkan risiko.",
    ],
  },
  {
    id: "kasus-fintech",
    chapter: "Contoh Kasus",
    title: "Kasus: pinjol menyebar kontak",
    summary: "Pinjol yang menyebar data kontakmu ke orang lain melanggar hukum.",
    points: [
      "Penyebaran data pribadi tanpa izin = pelanggaran serius.",
      "Termasuk meminta akses kontak sebagai syarat pinjaman.",
      "Kamu bisa melaporkan ke OJK dan otoritas perlindungan data.",
    ],
  },
];

export const UU_CATEGORIES = ["Semua", "Hak Subjek Data", "Kewajiban Pengendali Data", "Sanksi & Denda", "Contoh Kasus"] as const;