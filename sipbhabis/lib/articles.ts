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
    slug: "tanggal-di-kartu-bukan-di-ingatan",
    title: "Tanggal di kartu, bukan tanggal yang masih diingat",
    description: "Panik yang pelan muncul saat HRD atau pasien minta berkas dan kamu hanya ingat tahunnya.",
    publishedAt: "2026-11-11",
    minutes: 4,
    paragraphs: [
      "Banyak bidan hafal tahun STRB terbit, lalu lupa bulan dan tanggalnya. Itu cukup sampai seseorang di depan loket atau di meja HRD meminta fotokopi. Saat itulah rasa tenang berubah jadi hitungan yang samar.",
      "SipbHabis minta dua tanggal yang tertulis di kartu: terbit dan habis. Hitungan sisa hari memakai kalender Asia/Jakarta pada saat isian dikirim. Angka itu membaca yang kamu ketik, bukan yang tertera di sistem dinas.",
      "Kalau jarak terbit dan habis jauh dari siklus lima tahun yang sering disebut di Permenkes Nomor 28 Tahun 2017, cek ulang kartu. Kerangka lama itu bukan jaminan aturan hari ini masih sama. Konsil, dinas, dan Kementerian Kesehatan yang memegang versi yang berlaku.",
      "Menulis tanggal sekali lebih tenang daripada membuka galeri jam dua pagi mencari foto kartu yang buram.",
    ],
  },
  {
    slug: "dua-sipb-dua-tanggal",
    title: "Dua SIPB berarti dua tanggal, bukan satu amplop",
    description: "STRB yang masih panjang tidak otomatis membuat kedua izin praktik ikut aman.",
    publishedAt: "2026-11-10",
    minutes: 5,
    paragraphs: [
      "STRB menunjukkan kamu terdaftar sebagai bidan. SIPB menunjukkan di tempat mana kamu boleh praktik. Keduanya sering difotokopi berdempetan, lalu dibahas seolah satu masa berlaku.",
      "Bidan yang memegang dua SIPB perlu menulis habisnya masing-masing. Satu bisa masih panjang di fasilitas, yang lain sudah mepet di praktik mandiri. Menyalin satu tanggal ke keduanya membuat HRD dan loket bertanya dua kali.",
      "Kalau tempatmu pindah ruangan atau pindah nama, tanyakan apakah izin yang lama masih menempel. Nama di kartu yang tidak sama dengan papan nama adalah berkas yang sering dikembalikan, bukan karena niatmu kurang.",
      "SipbHabis memisahkan jumlah SIPB dari tanggal STRB supaya rencana mingguannya tidak menganggap satu surat menutup semuanya. Daftar resmi tetap mengikuti daerah tempat kamu praktik.",
    ],
  },
  {
    slug: "kredit-jangan-ditumpuk-di-bulan-terakhir",
    title: "Kredit jangan ditumpuk di bulan terakhir",
    description: "Patokan perencanaan 25 kredit membantu menghitung yang kurang. Ia bukan kuota yang situs ini tetapkan.",
    publishedAt: "2026-11-09",
    minutes: 4,
    paragraphs: [
      "Sertifikat sering tersimpan di tas seminar, bukan di map perpanjangan. Saat tanggal habis tinggal sebulan, mencari kredit terasa seperti mengejar stempel.",
      "SipbHabis memakai patokan perencanaan 25 kredit supaya kekurangannya kelihatan. Angka itu alat hitung di situs, bukan kuota resmi. Organisasi profesi dan konsil yang menentukan sertifikat mana yang dihitung.",
      "Kalau kamu sudah melewati patokan itu, tetap jajarkan sertifikatnya: penyelenggara, tanggal, dan judul. Sertifikat yang tidak disebut di daftar mereka jangan ikut dicentang hanya karena mapnya jadi tebal.",
      "Menyebar kredit jauh sebelum pengingat 120 hari lebih tenang daripada mengikuti satu seminar seminggu sebelum loket.",
    ],
  },
  {
    slug: "fasilitas-atau-mandiri",
    title: "Berkas fasilitas dan berkas mandiri tidak ditukar",
    description: "HRD melihat jadwal dinas. Loket mandiri melihat alamat yang bisa dibuktikan.",
    publishedAt: "2026-11-08",
    minutes: 4,
    paragraphs: [
      "Praktik di fasilitas pelayanan kesehatan biasanya lewat HRD atau pimpinan. Yang mereka minta sering berupa surat masih bertugas dan jadwal. Praktik mandiri menambah bukti tempat: sewa atau milik, denah, dan alamat yang sama di setiap lembar.",
      "Menaruh surat fasilitas di map mandiri, atau sebaliknya, membuat petugas berhenti di halaman pertama. SipbHabis menyusun daftar yang berbeda untuk dua jenis tempat itu, lalu tetap menyuruhmu mencocokkan dengan daftar yang sedang berlaku.",
      "Dua SIPB yang campuran — satu di fasilitas, satu mandiri — butuh dua set. Satu amplop untuk keduanya hanya menghemat kertas, bukan pertanyaan.",
      "Tidak ada di sini yang memeriksa ruangan atau menjanjikan izin terbit. Yang disusun adalah urutan menyiapkan, sebelum seseorang menanyakan berkas dan kamu hanya mengingat tahunnya.",
    ],
  },
  {
    slug: "pengingat-120-60-30",
    title: "Tiga pengingat: 120, 60, dan 30 hari",
    description: "Kalender pribadi lebih berguna daripada membuka ulang situs setiap minggu.",
    publishedAt: "2026-11-07",
    minutes: 4,
    paragraphs: [
      "Setelah tanggal habis tertulis, yang dibutuhkan bukan cek harian. Tiga titik sudah cukup: 120 hari sebelumnya untuk kredit dan salinan, 60 hari untuk rekomendasi dan surat tempat, 30 hari untuk mengajukan — bukan untuk mulai mencari ijazah.",
      "Kalau tanggal di kartu sudah lewat, pengingat itu tidak menolong. Yang menolong adalah berhenti menganggap surat lama masih menutup praktik, lalu menanyakan jalur yang sedang berlaku.",
      "SipbHabis menyimpan hitungan pada hari isian dikirim. Kalau kamu membuka halaman hasil berminggu-minggu kemudian, kurangi sendiri hari yang sudah berjalan, atau kirim isian baru.",
      "Aturan dapat berubah. Pesan untuk HRD atau loket di hasil hanyalah catatan agar kamu berani bertanya, bukan surat yang menggantikan formulir dinas.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
