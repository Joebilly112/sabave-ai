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
    slug: "bintang-merosot-pelan",
    title: "Rating yang turun pelan terasa berbeda dari akun yang terkunci",
    description: "Beberapa order buruk menggeser bintang tanpa notifikasi dramatis. Itu kecemasan yang lambat, bukan kunci mendadak.",
    publishedAt: "2026-11-11",
    minutes: 4,
    paragraphs: [
      "Mitra sering baru sadar ketika angka di pojok aplikasi berubah dari 4,92 ke 4,78. Tidak ada sirine. Order masih masuk, hanya terasa lebih jarang di jam yang biasanya ramai. Rasa itu bukan panik akun terkunci. Itu was-was bahwa prioritas sedang bergeser.",
      "Satu perjalanan buruk jarang menggulingkan akun. Yang menggeser bintang biasanya tumpukan kecil: telat jemput, helm yang bau, rute yang diubah diam-diam, atau nada suara yang terdengar ketus setelah order sebelumnya batal. Penumpang memberi bintang, lalu kamu lanjut narik tanpa mencatat polanya.",
      "RatingTurun membaca rating sekarang, berapa kali kamu batal atau skip seminggu ini, keluhan yang berulang, dan berapa order yang benar-benar selesai. Hasilnya pita aman, waspada, atau kritis. Pita itu urutan perhatian, bukan ambang resmi Gojek, Grab, Maxim, atau inDrive.",
      "Kalau aplikasi sudah menolak kamu online atau menampilkan skorsing, ini bukan alat untuk membuka kunci itu. Urus pesan dari platformnya langsung. Alat ini untuk minggu ketika bintang masih kelihatan, tetapi rasanya licin.",
    ],
  },
  {
    slug: "batal-dan-skip-seminggu",
    title: "Menghitung batal dan skip tujuh hari terakhir",
    description: "Empat pembatalan dalam seminggu biasanya lebih berat daripada satu bintang yang goyah sendirian.",
    publishedAt: "2026-11-10",
    minutes: 4,
    paragraphs: [
      "Batal sekali karena ban bocor atau titik jemput yang gelap bukan pola. Batal yang jadi kebiasaan — order diterima lalu dilepas karena jarak, karena hujan, karena penumpang terlihat repot — yang ikut menekan akun dan juga suasana hatimu di order berikutnya.",
      "Isi formulir dengan hitungan kasar seminggu ini: hampir tidak batal, satu sampai tiga kali, atau empat kali lebih. Tidak perlu screenshot. Angka yang jujur lebih berguna daripada angka yang dirapikan.",
      "Di pita waspada dan kritis, lima order pertama rencana pemulihan hanya punya satu tugas: jangan menambah batal. Terima yang sanggup kamu selesaiin. Kabari penumpang kalau titik jemput terasa tidak aman, lalu putuskan, bukan langsung skip.",
      "Keselamatan tetap di atas bintang. Rencana ini tidak menyuruhmu memaksa order yang berbahaya. Yang dikurangi adalah skip karena malas, bukan menghindar dari risiko nyata di jalan.",
    ],
  },
  {
    slug: "empat-keluhan-yang-berulang",
    title: "Helm, rute, telat, dan nada: empat keluhan yang sering menggeser bintang",
    description: "Penumpang jarang menulis esai. Mereka menandai satu hal yang terasa di badan: bau helm, jalan memutar, menunggu, atau suara yang ketus.",
    publishedAt: "2026-11-09",
    minutes: 5,
    paragraphs: [
      "Keluhan helm biasanya selesai sebelum motor jalan. Helm bersih, tali yang tidak menjepit, dan tawaran ganti ukuran menghilangkan alasan paling mudah untuk bintang rendah. Jangan menunggu penumpang mengeluh dulu.",
      "Keluhan rute sering lahir dari perubahan diam-diam. Ulangi tujuan sesuai aplikasi, lalu kalau macet sebut dua pilihan dan biarkan penumpang memutuskan. Kamu tetap yang mengemudi. Mereka yang menanggung waktu tempuh.",
      "Telat jemput terasa lebih parah ketika chat kosong. Satu kabar ETA begitu order masuk sudah mengubah cerita dari “driver hilang” menjadi “driver lagi di lampu merah”. Nada ketus biasanya sisa order sebelumnya. Satu kalimat maaf di awal lebih pendek daripada berdebat di tengah jalan.",
      "Centang hanya keluhan yang benar-benar sering minggu ini. Rencana order 6 sampai 10 menempel pada centang itu. Kalau tidak ada yang berulang, biarkan kosong. Jangan menambah masalah yang tidak ada.",
    ],
  },
  {
    slug: "rencana-dua-puluh-order",
    title: "Apa yang dikerjakan pada 20 order berikutnya",
    description: "Pemulihan rating tidak butuh janji bintang lima. Butuh dua puluh perjalanan yang tidak menambah pola yang sama.",
    publishedAt: "2026-11-08",
    minutes: 4,
    paragraphs: [
      "Dua puluh order dibagi empat blok. Lima pertama menghentikan batal baru. Lima berikut merapikan keluhan yang kamu centang. Lima berikutnya melatih obrolan pendek. Lima terakhir menutup minggu tanpa memohon ulasan.",
      "Volume ikut bicara. Kalau tujuh hari terakhir hanya segelintir order selesai, satu bintang rendah jadi sangat kelihatan. Kalau order sudah banyak, satu keluhan lebih mudah terencerkan — asal kamu tidak mengulanginya dua puluh kali.",
      "Jangan membeli review dan jangan menawar bintang. Permintaan yang memaksa sering dilaporkan, dan itu masalah baru di atas rating yang sudah goyah. Kalau perjalanan memang mulus, cukup tanya sekali apakah ada yang kurang, lalu selesai.",
      "Rencana di hasil RatingTurun adalah urutan kerja untukmu, bukan jadwal yang disetujui platform. Aplikasi tetap yang mengatur prioritas order. Kamu mengatur helm, rute, kabar ETA, dan keputusan untuk tidak skip.",
    ],
  },
  {
    slug: "naskah-ke-penumpang",
    title: "Kalimat pendek yang bisa diucapkan tanpa memohon bintang",
    description: "Naskahnya untuk suasana di motor, bukan untuk chat yang panjang atau untuk menekan penumpang.",
    publishedAt: "2026-11-07",
    minutes: 4,
    paragraphs: [
      "Penumpang naik dalam keadaan buru-buru. Kalimat yang membantu adalah kalimat yang menyebut benda atau keputusan: helm, tujuan, dua pilihan jalan, atau satu maaf. Cerita panjang tentang ratingmu membuat perjalanan terasa tentang kamu, bukan tentang mereka.",
      "Contoh yang cukup: “Helm bersihnya di sini. Tujuan tetap yang di aplikasi, ya?” Kalau macet: “Lewat jalan biasa atau tetap di rute ini?” Kalau suasana sudah tegang: “Maaf kalau tadi nada saya singkat. Saya lanjut pelan.”",
      "Di akhir, cukup “Sudah sampai. Hati-hati.” Menambah “kalau boleh bintang lima” mengubah bantuan jadi tagihan. RatingTurun menolak naskah yang menjanjikan bintang naik atau yang membahas uang.",
      "Kamu boleh memendekkan naskah di halaman hasil. Yang dipertahankan adalah urutannya: sapa, konfirmasi, satu perbaikan yang sesuai keluhan, lalu tutup tanpa permintaan.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
