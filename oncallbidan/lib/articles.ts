export type Article = {
  slug: string;
  title: string;
  description: string;
  minutes: number;
  publishedAt: string;
  paragraphs: string[];
};

export const articles: Article[] = [
  {
    slug: "tiga-malam-berturut",
    title: "Tiga malam berturut-turut bukan tanda kamu kuat",
    description: "Mengapa deretan jaga persalinan perlu dipotong sebelum mata tidak fokus.",
    minutes: 4,
    publishedAt: "2026-11-11",
    paragraphs: [
      "Malam pertama masih terasa biasa. Malam kedua kamu mengandalkan kopi dan chat yang tetap dibalas. Malam ketiga, langkah yang biasa hafal mulai perlu diucapkan keras-keras.",
      "Bidan sering mengukur kekuatan dari berapa kali mereka tetap datang. Ukuran yang lebih berguna adalah berapa jam tidur utuh yang tersisa setelah matahari terbit. Kalau tidur itu pecah, tubuh tidak menghitungnya sebagai pulih.",
      "OnCallBidan memakai 14 hari terakhir, bukan satu malam heroik. Satu persalinan panjang bisa masuk pita waspada kalau ditumpuk dengan siaga yang tidak pernah mati. Tiga malam kosong di kalender berikutnya lebih jujur daripada status 'siap 24 jam'.",
      "Ini bukan penilaian apakah kamu bidan yang baik. Ini jeda sebelum rasa bersalah ke anak dan rasa takut salah langkah berjalan bersamaan.",
    ],
  },
  {
    slug: "batas-ke-pasien",
    title: "Batas ke pasien tanpa menutup pintu persalinan",
    description: "Kalimat yang memindahkan kontrol rutin ke siang, dan tetap menyambungkan yang tidak bisa menunggu.",
    minutes: 4,
    publishedAt: "2026-11-11",
    paragraphs: [
      "Pasien praktik mandiri sering menghubungi di jam yang sama dengan teman. Mereka tidak selalu membedakan kontrol kehamilan dan tanda yang harus segera dilihat.",
      "Kalimat yang membantu memisahkan dua hal itu. Kontrol, hasil lab, dan tanya resep dipindah ke siang. Persalinan yang sudah berjalan dan keluhan yang tidak bisa ditunda tetap punya jalur, yaitu kamu atau rekan yang sudah setuju jaga.",
      "Jangan menulis 'saya off' tanpa menyebut siapa yang mengangkat telepon. Pasien yang panik akan tetap mengetuk, lalu kamu terjaga juga. Naskah di halaman hasil sengaja menyebut sambungan, bukan penolakan.",
      "Kirim di siang, saat kamu masih bisa mengoreksi nama dan jam. Jangan menyusun batas jam 01.30 setelah persalinan.",
    ],
  },
  {
    slug: "cadangan-yang-tertulis",
    title: "Bidan cadangan harus tertulis, bukan janji di grup",
    description: "Siaga 24 jam tanpa nama pengganti berarti kamu satu-satunya yang bangun.",
    minutes: 5,
    publishedAt: "2026-11-11",
    paragraphs: [
      "Di rumah sakit, nama jaga menempel di papan. Di praktik mandiri, cadangan sering berupa kalimat 'nanti aku kabari'. Kalimat itu tidak menahan telepon pukul dua.",
      "Kalau cadangan hanya kadang ada, pita beban naik karena istirahatmu bergantung pada orang yang belum mengunci tanggal. Minta malam tertentu, bukan kesediaan umum.",
      "Kalau belum ada siapa-siapa, jangan mengisi formulir seolah ada. Tugas pertama 14 hari itu adalah satu nama yang setuju, atau arah yang jelas ke faskes yang memang buka malam.",
      "Tukar catatan paginya singkat: jam, apa yang terjadi, apa yang masih perlu dilihat. Bukan kamu yang diam-diam tetap membalas chat di malam yang seharusnya kosong.",
    ],
  },
  {
    slug: "rasa-bersalah-ke-anak",
    title: "Rasa bersalah ke anak tidak hilang dengan menambah jaga",
    description: "Tidur yang dicuri malam persalinan biasanya dibayar dengan marah di rumah.",
    minutes: 4,
    publishedAt: "2026-11-11",
    paragraphs: [
      "Banyak bidan pulang saat anak sudah berangkat sekolah, lalu merasa hutang. Hutang itu sering dibayar dengan tidak menolak jaga berikutnya, seolah kerja ekstra menghapus ketidakhadiran.",
      "Yang anak rasakan biasanya bukan jumlah persalinan. Mereka merasakan suara yang pendek dan mata yang tidak ikut bermain. Gejala 'mudah marah' di cek ini ada karena itu bagian dari beban, bukan karena kamu orang tua yang gagal.",
      "Satu malam dilindungi yang benar-benar tanpa telepon lebih terasa di rumah daripada janji 'nanti libur panjang'. Tulis malam itu di kalender yang pasangan juga lihat.",
      "Kalau marah dan tangis datang setiap selesai jaga selama berminggu-minggu, bicara dengan orang yang kamu percaya atau tenaga kesehatan. Pita di situs ini tidak menggantikan percakapan itu.",
    ],
  },
  {
    slug: "istirahat-bukan-tutup-praktik",
    title: "Istirahat bukan berarti menutup praktik",
    description: "Membedakan siaga kosong, janji siang, dan pertolongan yang sudah berjalan.",
    minutes: 4,
    publishedAt: "2026-11-11",
    paragraphs: [
      "Takut menutup praktik membuat banyak bidan menolak ide malam kosong. Yang sebenarnya ditutup hanya siaga untuk hal yang bisa dijadwalkan.",
      "Persalinan yang sudah masuk kala tidak masuk daftar 'nanti siang'. Halaman hasil mengulang itu supaya naskah batas tidak terbaca sebagai abaikan pasien.",
      "Dua sampai lima malam dalam 14 hari masih menyisakan banyak malam jaga. Angka itu sengaja tidak mengosongkan seluruh dua minggu. Tujuannya memutus deretan, bukan menghapus pekerjaan.",
      "Kalau tubuhmu sudah tidak aman memegang pasien, keputusan berhenti malam itu ada di kamu dan tempat praktik, bukan di sebuah pita warna. Situs ini hanya menyusun jeda dari angka yang kamu masukkan.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
