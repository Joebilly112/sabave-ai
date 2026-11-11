export type Article = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  minutes: number;
  paragraphs: string[];
};

export const articles: Article[] = [
  {
    slug: "panggilan-yang-anak-tolak",
    title: "Kalau anak menolak video, jangan kejar dengan panggilan kedua",
    description: "Penolakan di layar sering berarti waktu atau isi obrolan yang tidak muat, bukan bukti anak sudah lupa.",
    publishedAt: "2026-06-02",
    minutes: 5,
    paragraphs: [
      "Banyak orang tua yang kerja jauh menekan tombol lagi begitu panggilan ditolak. Rasanya seperti kesempatan yang hilang. Bagi anak, dua dering berturut-turut terasa seperti diperiksa, bukan diajak bicara.",
      "Tolak sekali sudah cukup untuk hari itu. Kirim pesan pendek ke pengasuh: anak sedang apa, dan kapan ia biasanya lebih longgar. Besok, tawarkan satu waktu, bukan tiga.",
      "Isi panggilan juga menentukan apakah anak mau mengangkat lagi. Kalau yang selalu ditanya adalah nilai, PR, atau “kamu kangen tidak”, anak belajar bahwa layar ini berat. Satu cerita tentang makan siang lebih mudah dijawab.",
      "Remaja yang diam di kamera belum tentu menjauh selamanya. Ia mungkin sedang di kamar bersama teman, atau belum punya kata untuk rindu. Beri pintu yang kecil: “Aku telepon Kamis jam tujuh. Kalau tidak bisa, balas satu kata.”",
      "JauhAnak membaca penolakan sebagai salah satu tanda, bersama irama dan isi panggilan. Laporannya bukan diagnosis, dan tidak menilai pengasuh.",
    ],
  },
  {
    slug: "nenek-jadi-rumah",
    title: "Anak yang lebih akrab dengan nenek bukan kekalahanmu",
    description: "Pengasuh sehari-hari jadi rumah. Tugas orang tua jauh adalah masuk ke rumah itu, bukan merebutnya.",
    publishedAt: "2026-06-09",
    minutes: 4,
    paragraphs: [
      "Video call yang sunyi sering terjadi karena anak baru saja ditolong nenek, dimandikan saudara, atau dijemput pasangan. Orang yang ada di dapur setiap sore otomatis lebih mudah diajak cerita.",
      "Itu bukan bukti kasih sayangmu kalah. Itu bukti anak punya tempat aman saat kamu tidak di rumah. Menyebut pengasuh dengan hangat — “Nenek masaknya enak, ya?” — membuat kamu terasa satu pihak dengan rumah, bukan tamu yang menguji.",
      "Minta satu bahan obrolan yang nyata. Bukan “anak bagaimana?”, melainkan “minggu ini ia paling sering main apa?”. Bahan itu membuat pertanyaanmu spesifik, dan anak merasa kamu mengikuti hidupnya, bukan hanya ulang tahun yang terlewat.",
      "Kalau kamu cemburu, katakan pada pengasuh di luar panggilan anak. Jangan menagih loyalitas di depan layar. Anak tidak perlu memilih siapa yang lebih berhak dicintai.",
      "Naskah untuk pengasuh di laporan ini ditulis supaya terdengar seperti ucapan terima kasih plus satu janji waktu, bukan teguran.",
    ],
  },
  {
    slug: "jangan-mulai-dari-nilai",
    title: "Jangan mulai telepon dari nilai",
    description: "Rapor yang turun perlu ditangani. Ia tidak harus menjadi kalimat pertama setiap minggu.",
    publishedAt: "2026-06-16",
    minutes: 4,
    paragraphs: [
      "Nilai yang turun membuat orang tua cemas, apalagi dari jauh. Cemas itu wajar. Yang membuat anak menutup diri adalah urutannya: baru mengangkat, sudah ditanya ranking.",
      "Urusan sekolah bisa disampaikan ke pengasuh atau wali kelas. Di panggilan dengan anak, buka dengan hari ini. Kalau ia sendiri menyebut ulangan, dengarkan dulu sebelum memberi saran.",
      "Anak yang marah saat ditanya sekolah sering sedang menjaga muka. Ia tidak ingin orang tua yang jarang pulang hanya muncul sebagai pengawas. Satu pujian yang spesifik — “kamu kirim foto tanaman itu” — lebih mengundang daripada “belajar yang rajin”.",
      "Kalau nilai memang bagian dari tanda yang kamu cemaskan, catat itu di isian. Laporan akan menandai kebiasaan itu tanpa menyuruhmu mengabaikan sekolah.",
      "Alat ini tidak menghitung biaya hidup dan tidak membandingkan penghasilan. Pertanyaannya hanya kedekatan yang masih terasa lewat panggilan.",
    ],
  },
  {
    slug: "rencana-mingguan-sesuai-usia",
    title: "Rencana mingguan yang beda untuk balita dan remaja",
    description: "Lama panggilan yang pas di usia empat tahun terasa seperti sidang di usia lima belas.",
    publishedAt: "2026-06-23",
    minutes: 5,
    paragraphs: [
      "Balita mengenal suara dan wajah yang berulang. Dua panggilan pendek dengan lagu yang sama lebih melekat daripada satu panggilan panjang yang membuatnya gelisah.",
      "Anak usia sekolah masih suka menunjukkan benda. Minta satu cerita, lalu berhenti. Sepuluh menit yang selesai saat ia masih mau bicara lebih mudah dijadikan kebiasaan daripada setengah jam yang berakhir dengan “ayah marah”.",
      "Pra-remaja mulai punya dunia sendiri. Ajak lakukan sesuatu di layar: tebak gambar, baca satu halaman, atau lihat video yang ia pilih. Kegiatan bersama mengurangi rasa diinterogasi.",
      "Remaja sering butuh pilihan waktu, bukan durasi yang kamu tentukan. Dua opsi jam, pesan satu kalimat, dan izin untuk mengakhiri lebih cepat. Kedekatan di usia ini terlihat dari ia masih mau membalas, bukan dari ia tertawa sepanjang panggilan.",
      "Rencana di laporan menyesuaikan usia yang kamu isi. Itu usulan mingguan, bukan jadwal yang harus sempurna.",
    ],
  },
  {
    slug: "bicara-dengan-pengasuh",
    title: "Cara minta waktu panggilan tanpa menuduh pengasuh",
    description: "Pengasuh sudah menanggung hari-hari anak. Pesanmu perlu satu permintaan yang jelas, plus terima kasih.",
    publishedAt: "2026-06-30",
    minutes: 4,
    paragraphs: [
      "Pesan yang panjang dan penuh sesal sering dibaca sebagai teguran. Pengasuh yang lelah akan membalas singkat, lalu anak semakin jarang diarahkan ke kamera.",
      "Cukup tiga bagian. Ucapkan terima kasih atas perawatan sehari-hari. Minta satu jendela waktu yang tetap. Tanyakan satu hal yang sedang anak sukai, supaya kamu punya bahan.",
      "Jangan meminta pengasuh memaksa anak sampai panggilan selesai. Paksaan membuat layar jadi hukuman. Kalau anak menolak, minta kabar, lalu coba lagi di waktu yang disepakati.",
      "Sisa kontrak yang tinggal beberapa bulan bisa disebut sebagai janji kecil: satu kegiatan saat pulang, bukan daftar perubahan rumah. Janji yang terlalu besar mudah menjadi kecewa di kedua sisi.",
      "Kalau kamu khawatir anak tidak aman, jangan menunggu laporan. Bicara langsung dengan pengasuh dan cari bantuan setempat. Bacaan ini tidak menggantikan itu.",
    ],
  },
];
