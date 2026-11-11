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
    slug: "takut-map-dikembalikan",
    title: "Takut map dikembalikan dinas, sebelum janji loket dibuat",
    description: "Ambisi buka praktik sendiri sering ketemu takut berkas tidak lengkap. Urutkan bukti dulu, baru minta jadwal.",
    publishedAt: "2026-11-11",
    minutes: 4,
    paragraphs: [
      "Banyak bidan sudah membayangkan papan nama, lalu berhenti karena cerita teman: map dikembalikan, antre dua kali, syarat di kota sebelah tidak sama. Rasa itu wajar. Izin praktik mandiri memang ada di dinas kesehatan, bukan di grup WhatsApp.",
      "Yang bisa kamu kendalikan minggu ini bukan keputusan loket. Yang bisa kamu kendalikan adalah bukti: STRB masih berlaku atau belum, alamat sudah ada atau masih cari, alat sudah di ruangan atau masih di catatan, limbah sudah punya alur atau belum, rekomendasi organisasi profesi sudah menyebut alamat yang sama atau belum.",
      "PraktikSiap membaca isian itu dan memberi lampu hijau, kuning, atau merah. Merah bukan vonis. Merah artinya mengantar map sekarang lebih sering membuang hari. Hijau juga bukan jaminan terbit. Hijau artinya tema besar sudah kelihatan, lalu kamu tetap mencocokkan dengan daftar kabupatenmu.",
      "Kalau jantung sudah tidak enak hanya karena memikirkan loket, tulis satu kalimat: saya belum janji, saya sedang melengkapi. Kalimat itu lebih berguna daripada membuka katalog alat sampai larut.",
    ],
  },
  {
    slug: "strb-bukan-sipb",
    title: "STRB yang aktif belum berarti SIPB pindah ke rumah",
    description: "Dua surat itu sering tertukar di percakapan. Yang satu identitas profesi, yang satu izin di tempat tertentu.",
    publishedAt: "2026-11-10",
    minutes: 5,
    paragraphs: [
      "STRB menunjukkan kamu terdaftar sebagai bidan. SIPB menunjukkan di tempat mana kamu diizinkan praktik. Keduanya sering dibawa dalam satu map, lalu dibahas seolah-olah sama. Loket tidak membaca begitu.",
      "SIPB yang masih aktif di puskesmas, rumah sakit, atau klinik lain tidak otomatis menempel di rumah atau ruko yang baru kamu sewa. Alamat baru butuh permohonan untuk alamat itu. Menyalin nomor lama ke kop surat hanya membuat petugas bertanya dua kali.",
      "Kalau STRB sedang diperpanjang, catat tanggal pengajuan. Proses bukan surat yang sudah terbit. Kalau SIPB lama sudah habis masa berlakunya, simpan sebagai arsip dan susun permohonan baru. Jangan menumpuk fotokopi yang sudah kadaluarsa di depan map.",
      "PraktikSiap menandai keduanya terpisah supaya kamu tidak mengira satu surat menutup yang lain. Nama berkas resmi dan lampirannya tetap mengikuti dinas kabupaten atau kota dan peraturan yang sedang berlaku.",
    ],
  },
  {
    slug: "alamat-sewa",
    title: "Sewa atau milik: yang dilihat adalah alamat yang bisa dibuktikan",
    description: "Tempat praktik mandiri butuh alamat yang sama di surat, denah, dan cerita kamu ke loket.",
    publishedAt: "2026-11-09",
    minutes: 4,
    paragraphs: [
      "Rumah sendiri terasa lebih tenang. Sewa juga bisa, asal ada kertas yang mengikat alamat itu dengan niat praktik. Yang membuat map goyah biasanya alamat di kontrak beda satu gang dengan alamat yang kamu tulis di permohonan.",
      "Sebelum membeli alat tambahan, kunci satu alamat. Denah tanpa alamat hanya gambar. Foto ruangan diambil siang hari, dengan tempat cuci tangan dan ruang tunggu kelihatan, bukan foto kosong yang masih berdebu semen.",
      "Tulis juga ke mana kamu merujuk bila ada kasus yang tidak ditangani di tempat itu, dan berapa lama tempuhnya. Angka kasar dari aplikasi peta cukup untuk catatanmu. Dinas bisa meminta versi yang lebih rinci.",
      "Belum punya tempat sama sekali berarti lampu kesiapan belum boleh hijau. Mencari alamat adalah pekerjaan minggu itu, bukan catatan kaki di bawah daftar alat.",
    ],
  },
  {
    slug: "alat-dan-limbah",
    title: "Daftar alat yang jujur, dan limbah yang sudah punya nama pengangkut",
    description: "Wishlist belanja bukan daftar sarana. Limbah medis yang belum ada alurnya sering mengembalikan map.",
    publishedAt: "2026-11-08",
    minutes: 4,
    paragraphs: [
      "Teman yang sudah buka praktik sering mengirim foto lemari penuh. Foto itu bukan daftar milikmu. Tulis yang benar-benar ada di ruangan, lalu pisahkan yang masih akan dibeli. Petugas yang mengecek sarana membandingkan kertas dengan lemari, bukan dengan niat baik.",
      "Mulai dari layanan yang mau kamu buka lebih dulu. Alat untuk layanan itu yang naik ke daftar minimum. Sisanya boleh tahap dua, asal tidak ikut dicentang sebagai sudah tersedia.",
      "Limbah lebih sering dilupakan daripada tensimeter. Siapkan kalimat pendek: benda tajam di wadah mana, sampah infeksius dipilah bagaimana, siapa yang mengangkut, seberapa sering. Satu nama pengangkut lebih berguna daripada paragraf tentang pentingnya kebersihan.",
      "Kalau daftar alat masih kosong dan limbah belum terpikir, itu tanda merah yang wajar. Isi keduanya sebelum meminta jadwal loket. PraktikSiap tidak menentukan merek alat dan tidak menggantikan pemeriksaan sarana oleh dinas.",
    ],
  },
  {
    slug: "tiga-puluh-hari",
    title: "Tiga puluh hari sebelum map disentuh loket",
    description: "Pecah persiapan jadi empat minggu: identitas, alamat, sarana, lalu organisasi profesi.",
    publishedAt: "2026-11-07",
    minutes: 5,
    paragraphs: [
      "Satu daftar panjang bikin malam jadi gelisah. Empat minggu lebih mudah dipegang. Minggu pertama mengurus identitas profesi dan bukti kerja. Minggu kedua mengunci alamat dan foto ruang. Minggu ketiga mencocokkan alat dengan limbah. Minggu keempat membereskan rekomendasi organisasi profesi dan baru menimbang janji loket.",
      "Urutan itu sengaja menahan kamu dari loket. STRB yang belum terbit tidak menjadi lebih meyakinkan karena mapnya sudah tebal. Rekomendasi yang menyebut alamat lama juga tidak menolong alamat baru.",
      "Di akhir minggu keempat, baca ulang persyaratan dinas kabupatenmu. Tema yang dipakai PraktikSiap — STRB, SIPB di tempat baru, tempat, alat, limbah, rekomendasi — hanya peta kasar. Kabupaten bisa menambah butir yang tidak ada di cerita temanmu.",
      "Kalau setelah tiga puluh hari masih ada butir merah, geser janji. Ambisi membuka praktik tidak hilang hanya karena kamu datang dua minggu lebih lambat dengan map yang lebih jujur.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
