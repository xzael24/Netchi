export type BreachArticle = {
  slug: string;
  title: string;
  summary: string;
  source: string; // where the data comes from
  date: string;
  pwnCount: number;
  dataClasses: string[];
  body: string[]; // paragraphs (5-8 paragraphs each, detailed, factual)
  keyTakeaways: string[];
};

export const BREACH_ARTICLES: BreachArticle[] = [
  {
    slug: "breach-16miliar",
    title: "16 Miliar Password Bocor — 30 Database Jadi Target Malware",
    summary:
      "16 miliar kredensial login bocor dari 30 database berbeda lewat malware infostealer — kebocoran password terbesar yang pernah tercatat.",
    source: "Bitwarden State of Password Security 2025 & laporan kebocoran kredensial 2025",
    date: "2025-01-30",
    pwnCount: 16000000000,
    dataClasses: ["Email addresses", "Passwords", "Usernames", "Browser cookies"],
    body: [
      "Sekitar 16 miliar kombinasi email dan password ditemukan beredar di pasar gelap (dark web). Angka itu dihimpun dari 30 database yang berhasil dibobol, lalu digabung menjadi salah satu kumpulan kredensial terbesar yang pernah terungkap. Penting dipahami: ini bukan satu serangan ke satu perusahaan, melainkan akumulasi banyak kebocoran kecil yang dikumpulkan selama bertahun-tahun.",
      "Penyebab utamanya bukan brute force, melainkan malware jenis infostealer. Infostealer menyusup ke perangkat lewat file bajakan, lampiran email phishing, atau iklan berbahaya. Begitu masuk, malware ini membaca password yang tersimpan di browser, cookie sesi login, hingga data autofill, lalu mengirim semuanya ke server pelaku.",
      "Satu perangkat yang terinfeksi bisa membocorkan password dari puluhan akun sekaligus. Karena banyak orang memakai password yang sama di banyak situs, satu kredensial yang bocor bisa dipakai untuk mencoba masuk ke akun lain. Teknik ini disebut credential stuffing dan jadi favorit penyerang karena murah serta efektif.",
      "Data yang terkumpul biasanya dijual dalam paket besar di forum underground atau marketplace gelap. Pembelinya bisa menggunakannya untuk menebak kombinasi password kamu di layanan lain, melakukan penipuan, atau membangun kampanye phishing yang lebih meyakinkan. Semakin lama kredensial itu mengendap tanpa diganti, semakin besar peluangnya dimanfaatkan.",
      "Kabar baiknya, kebocoran sebesar ini justru bisa jadi alarm dini. Kamu bisa memeriksa apakah email atau nomor HP-mu ikut masuk dalam daftar lewat tool cek kebocoran seperti yang tersedia di Netchi. Kalau ternyata kena, artinya password yang selama ini kamu pakai sudah bukan rahasia lagi dan harus segera diganti.",
      "Cara paling aman mengunci akun adalah memakai password unik untuk tiap layanan dan mengaktifkan verifikasi dua langkah (2FA). Password unik memastikan satu kebocoran tidak menjalar ke akun lain. Password manager membantu menyimpan dan membuat password kuat tanpa harus menghafal semuanya.",
      "Bahkan kredensial yang terlihat 'tua' tetap berbahaya. Banyak orang tidak pernah mengganti password sejak bertahun-tahun lalu, jadi data lama itu masih bisa dipakai untuk login sampai sekarang. Karena itu, rutin mengganti password akun penting setidaknya setahun sekali adalah kebiasaan murah yang menyelamatkan banyak hal.",
    ],
    keyTakeaways: [
      "Cek email dan nomor HP-mu di tool cek kebocoran — kalau kena, anggap password itu sudah bocor.",
      "Ganti semua password yang terdampak dengan kombinasi unik dan kuat, jangan dipakai ulang.",
      "Aktifkan 2FA di semua akun penting, terutama email dan e-wallet.",
      "Hindari file bajakan dan lampiran mencurigakan — itu pintu masuk utama infostealer.",
    ],
  },
  {
    slug: "breach-prabowo-wasit",
    title: "Prabowo Segera Tunjuk 'Wasit' Data Warga RI",
    summary:
      "Pemerintah merampungkan pembentukan Otoritas PDP via Perpres agar data warga punya pengawas independen di luar kementerian.",
    source: "UU No. 27 Tahun 2022 & draf Perpres Otoritas PDP (2024)",
    date: "2024-12-05",
    pwnCount: 0,
    dataClasses: [],
    body: [
      "Indonesia butuh 'wasit' resmi untuk urusan data pribadi, dan pemerintahan Prabowo Subianto berencana segera menunjuknya. Lembaga yang dimaksud adalah Otoritas Perlindungan Data Pribadi (Otoritas PDP), badan independen yang diamanatkan oleh UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP). Kehadirannya diharapkan mengakhiri kebuntuan pengawasan data selama ini.",
      "UU PDP sebenarnya sudah disahkan sejak 2022, tapi kehadiran otoritasnya tertunda. Pembentukannya membutuhkan Peraturan Presiden (Perpres) sebagai payung hukum kelembagaan. Pada 2024 pemerintah menyusun draf Perpres tersebut, dengan target otoritas beroperasi setelah persiapan anggaran, SDM, dan infrastruktur lembaga tuntas.",
      "Salah satu poin krusial yang diatur adalah posisi otoritas yang independen. Otoritas PDP dirancang berada langsung di bawah dan bertanggung jawab kepada Presiden, bukan berada di bawah kementerian seperti Komdigi. Pemisahan ini penting supaya pengawasan tidak dipegang oleh institusi yang juga mengurusi industri digital.",
      "Tugas utama otoritas antara lain mengawasi kepatuhan pengendali data, menangani pengaduan masyarakat, dan menjatuhkan sanksi administratif bagi pelanggar UU PDP. Otoritas juga berwenang meninjau praktik pemrosesan data yang berisiko tinggi. Dengan adanya lembaga ini, aturan yang selama ini terasa seperti 'macan kertas' akhirnya punya gigi.",
      "Buat warga negara, dampaknya sangat nyata. Kalau ada perusahaan yang menyalahgunakan atau membocorkan data kamu, sekarang ada lembaga resmi yang bisa dituju untuk melapor. Sebelum otoritas terbentuk, korban kebocoran data sering bingung dan buntu menentukan mau lapor ke mana.",
      "Masyarakat juga diuntungkan karena otoritas bisa menjatuhkan sanksi administratif berjenjang, mulai dari teguran tertulis, penghentian sementara pemrosesan, sampai denda hingga 2% dari pendapatan tahunan perusahaan. Harapannya kepatuhan terhadap UU PDP jadi pertimbangan serius bagi bisnis, bukan sekadar formalitas di atas kertas.",
      "Namun pembentukan otoritas bukan tanpa tantangan. Butuh waktu untuk mengalihkan sumber daya, menyiapkan personel yang kompeten, dan memastikan lembaga benar-benar independen dari intervensi. Publik perlu terus mengawal agar 'wasit' yang lahir benar-benar memihak kepentingan warga, bukan kepentingan industri.",
    ],
    keyTakeaways: [
      "Otoritas PDP adalah lembaga independen yang diamanatkan UU PDP No. 27/2022, rencananya lapor langsung ke Presiden.",
      "Tugas utamanya: mengawasi kepatuhan, menangani pengaduan, dan menjatuhkan sanksi administratif.",
      "Kehadirannya memberi warga tempat resmi untuk melapor kasus kebocoran dan penyalahgunaan data.",
      "Pantau perkembangannya — berfungsinya otoritas menentukan masa depan privasi digital Indonesia.",
    ],
  },
  {
    slug: "breach-coupang-denda",
    title: "Ecommerce Ini Kena Denda Rp7,38 Triliun",
    summary:
      "Coupang, e-commerce terbesar Korea Selatan, kena denda terbesar dalam sejarah kebocoran data — 37,6 juta pelanggan terdampak.",
    source: "PIPC Korea Selatan & laporan kebocoran data Coupang 2023",
    date: "2023-08-11",
    pwnCount: 37600000,
    dataClasses: ["Names", "Phone numbers", "Emails", "Home addresses"],
    body: [
      "Coupang, e-commerce terbesar di Korea Selatan, harus membayar denda yang disebut-sebut sebagai yang terbesar dalam sejarah penanganan kebocoran data. Nilai sanksinya dilaporkan tembus sekitar Rp7,38 triliun jika dikonversi ke rupiah. Kasus ini jadi pengingat keras bahwa kelalaian keamanan data bisa menelan biaya jauh lebih besar daripada anggaran pengamanan mana pun.",
      "Akar masalahnya ternyata sederhana tapi mematikan: akses yang tidak dicabut. Seorang mantan karyawan developer asal China masih memegang kunci autentikasi (API key) milik Coupang bahkan setelah tidak lagi bekerja di sana. Dengan kunci itu, ia bisa masuk ke server penyimpan data pelanggan tanpa perlu membobol sistem dari luar.",
      "Data yang diambil bukan sekadar nama atau email, tapi juga nomor HP dan alamat sekitar 37,6 juta pelanggan. Jumlah itu melebihi 70% populasi Korea Selatan. Data tersebut kemudian dijual lewat platform perpesanan dan forum gelap, sehingga menyebar luas sebelum perusahaan menyadarinya.",
      "Setelah penyelidikan, PIPC (Personal Information Protection Commission) Korea Selatan menemukan kelemahan pengelolaan akses di internal Coupang. Perusahaan dinilai gagal mencabut hak akses mantan karyawan tepat waktu dan gagal memantau aktivitas mencurigakan di servernya. Kelalaian seperti inilah yang menjadikan kasus ini pelajaran klasik soal ancaman dari dalam (insider threat).",
      "Besarnya denda menunjukkan bedanya cara Korea memperlakukan data pribadi. Korea punya UU PDPA yang usianya lebih tua dari GDPR Uni Eropa, dan otoritasnya berani menjatuhkan sanksi finansial yang benar-benar menyakitkan. Banyak negara lain masih memperlakukan denda kebocoran data seperti 'biaya produksi' yang bisa dibayar saja.",
      "Buat Indonesia, kasus ini harusnya jadi cermin. UU PDP sudah mengatur kewajiban keamanan data dan denda administratif hingga 2% dari pendapatan tahunan perusahaan. Yang belum tuntas adalah pengawas yang tegas, yaitu Otoritas PDP yang masih dalam proses pembentukan lewat Perpres. Tanpa pengawas, aturan yang kuat tetap sulit ditegakkan.",
      "Sisi lain yang perlu disorot adalah pencegahan. Kasus Coupang bisa dicegah dengan praktik sederhana: mencabut akses karyawan yang keluar, merotasi kredensial secara berkala, dan memantau log akses secara aktif. Di dunia nyata, sebagian besar kebocoran besar bukan karena hacking canggih, melainkan pintu belakang yang dibiarkan terbuka.",
      "Sebagai konsumen, kamu tetap perlu waspada. Kalau sebuah layanan pernah bocor, anggap informasi yang tersimpan di sana sudah bukan rahasia lagi. Segera ganti password, aktifkan 2FA, dan jangan pernah memakai ulang password yang sama untuk layanan penting lain.",
    ],
    keyTakeaways: [
      "Mantan karyawan yang masih memegang akses adalah bahaya besar — perusahaan wajib mencabut akses saat orang keluar.",
      "Cek riwayat kebocoran akunmu dengan tool cek kebocoran di Netchi secara berkala.",
      "Setiap layanan kena bocor, langsung ganti password dan aktifkan 2FA.",
      "Dukung penguatan UU PDP dan pembentukan Otoritas PDP agar kasus serupa ditangani tegas di Indonesia.",
    ],
  },
];
