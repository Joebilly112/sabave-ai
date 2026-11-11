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
    slug: "paspor-bukan-dijaminkan",
    title: "Paspor bukan jaminan utang",
    description: "Kalau paspor dipegang orang lain, itu bukan cara biasa menahan kontrak. Ini tanda untuk minta bantuan resmi.",
    publishedAt: "2026-11-11",
    minutes: 4,
    paragraphs: [
      "Banyak pekerja migran ditawari kalimat yang terdengar masuk akal: paspor dititipkan supaya aman, atau ditahan sampai biaya penempatan lunas. Dokumen itu adalah milikmu. Menitipkannya kepada majikan atau agensi membuat pulang, berobat, dan lapor menjadi sulit.",
      "Kamu tidak perlu merebut paspor dengan paksa. Rebutan di dalam rumah bisa memperbesar bahaya. Yang lebih aman adalah mencatat siapa yang memegangnya, kapan terakhir kamu melihatnya, dan menghubungi perwakilan RI atau kanal pengaduan resmi sambil dokumen itu masih disebut titipan.",
      "Jika kamu masih memegang paspor, simpan salinan halamannya di luar rumah kerja — ke keluarga, atau ke akun yang tidak dibuka orang lain. Jangan mengirim foto itu ke grup yang majikan ikut di dalamnya.",
      "Biaya yang sudah kamu bayar tidak mengubah status dokumen. Utang boleh dicatat dan diselesaikan lewat jalur yang sah. Dokumen perjalanan tidak dipakai sebagai borgol.",
      "BertahanGak hanya membantu kamu melihat pita situasi. Keputusan perlindungan ada pada petugas resmi dan pada penilaianmu soal apa yang aman dilakukan hari ini.",
    ],
  },
  {
    slug: "gaji-tidak-masuk",
    title: "Gaji yang tidak masuk bukan aib",
    description: "Telat sekali dan tidak dibayar sama sekali butuh respons yang berbeda. Keduanya layak dicatat.",
    publishedAt: "2026-11-10",
    minutes: 4,
    paragraphs: [
      "Malu karena menagih gaji adalah perasaan yang sering dipakai untuk menunda laporan. Gaji adalah bagian dari kerja, bukan hadiah. Kalau tanggal gajian lewat dan tidak ada penjelasan yang bisa kamu simpan, catat hari itu.",
      "Bedakan dua keadaan. Gaji sering telat tetapi akhirnya masuk: kumpulkan tanggal dan jumlahnya, lalu bicarakan lewat bantuan resmi sebelum polanya jadi kebiasaan. Gaji tidak dibayar: jangan menunggu sampai kontrak habis untuk menyebutnya masalah.",
      "Catatan yang berguna pendek saja. Tanggal, jumlah yang dijanjikan, jumlah yang masuk, dan cara bayar. Foto bukti hanya jika mengambilnya tidak membuatmu ketahuan dan tidak membuatmu lebih tidak aman.",
      "Jangan menandatangani kertas potongan baru hanya karena seseorang berkata utangmu bertambah. Minta salinan, dan jika kamu tidak paham isinya, tunda tanda tangan sampai ada yang membantu membaca.",
      "Nomor bantuan di situs ini gratis dipakai. Kamu tidak harus membuka laporan berbayar untuk menelepon atau mengirim pesan ke kanal resmi.",
    ],
  },
  {
    slug: "libur-yang-hilang",
    title: "Hari libur yang tidak pernah datang",
    description: "Tanpa istirahat, keputusan pulang atau bertahan jadi kabur. Libur adalah bagian dari keselamatan, bukan kemewahan.",
    publishedAt: "2026-11-09",
    minutes: 4,
    paragraphs: [
      "Kerja tanpa hari libur sering dijelaskan sebagai masa sibuk yang sebentar. Sebentar itu mudah menjadi bulan. Tubuh yang tidak istirahat lebih mudah sakit, dan pikiran yang lelah lebih mudah percaya bahwa tidak ada jalan selain diam.",
      "Satu hari dalam seminggu yang benar-benar bebas dari pekerjaan rumah, jaga orang, atau lembur pabrik adalah patokan sederhana. Jika hari itu selalu digeser lalu hilang, catat tiga minggu terakhir: hari apa yang dijanjikan, dan hari apa yang terjadi.",
      "Istirahat juga berarti tidur. Kurang tidur bukan bukti kamu lemah. Itu alasan untuk memperlambat keputusan besar, lalu menghubungi keluarga pada jam yang kepalamu lebih jernih.",
      "Jika hilangnya libur datang bersama gaji yang telat atau kata-kata yang membuatmu takut, jangan menunggu musim sepi. Gabungan itu sudah cukup untuk mencari bantuan sekarang.",
      "Rencana bertahan yang sehat selalu punya batas. Batasnya bisa sesederhana: libur hilang dua minggu berturut-turut, maka kamu menghubungi jalur resmi.",
    ],
  },
  {
    slug: "utang-agensi-bukan-borgol",
    title: "Utang agensi bukan alasan untuk diam",
    description: "Biaya penempatan yang sudah keluar terasa sayang. Sayang itu tidak mengharuskan kamu menahan bahaya.",
    publishedAt: "2026-11-08",
    minutes: 5,
    paragraphs: [
      "Hampir semua orang yang berangkat membawa hitungan: berapa yang dipinjam, berapa bulan sampai impas, berapa yang harus dikirim ke rumah. Hitungan itu nyata. Keluarga mungkin menunggu. Karena itu kalimat pulang lebih awal terasa seperti gagal.",
      "Ada perbedaan antara kerja yang berat tetapi syarat dasarnya masih ada, dan kerja yang menahan dokumen, menahan gaji, atau menyakiti badan. Yang pertama bisa disusun jadi rencana sampai kontrak habis. Yang kedua bukan diselesaikan dengan menambah bulan.",
      "Utang tetap boleh kamu catat. Tuliskan kepada siapa, berapa, dan apa yang sudah dibayar. Bawa catatan itu saat berbicara dengan layanan resmi supaya pembicaraan tidak hanya soal perasaan, tetapi juga soal angka yang selama ini membebani.",
      "Jangan meminjam lagi ke orang di sekitar rumah kerja untuk menutup utang lama jika syarat pinjaman baru tidak kamu pahami. Utang bertumpuk sering dipakai untuk menakut-nakuti.",
      "Kamu boleh merindukan rumah dan tetap bekerja ketika situasinya aman. Kamu juga boleh minta pulang atau pindah ketika situasinya tidak aman. Dua-duanya bukan aib.",
    ],
  },
  {
    slug: "tanda-minta-bantuan",
    title: "Tanda sudah waktunya menghubungi orang lain",
    description: "Daftar pendek untuk membedakan hari yang berat dan hari yang perlu bantuan dari luar rumah.",
    publishedAt: "2026-11-07",
    minutes: 4,
    paragraphs: [
      "Hari berat ada di banyak pekerjaan: rindu, bosan, atasan yang rewel, tubuh pegal. Hari yang perlu bantuan dari luar punya tanda yang lebih tajam. Kamu tidak harus menunggu semua tanda muncul.",
      "Hubungi jalur resmi jika paspor tidak ada di tanganmu, jika gaji berhenti, jika ada pukulan atau ancaman yang membuatmu takut pulang ke kamar, atau jika kamu tidak tahu harus menelepon siapa saat sesuatu terjadi malam ini.",
      "Cari bantuan lebih awal — sebelum keadaan itu — jika libur hilang, gaji terus telat, hinaan menjadi kebiasaan, atau kamu sedih terus sampai tidak ingin makan. Menunggu sampai darurat bukan syarat untuk bertanya.",
      "Siapkan kalimat pembuka yang pendek: nama, negara, kota, sektor kerja, dan satu kalimat soal apa yang terjadi. Kamu tidak harus bercerita rapi. Petugas bisa bertanya sisanya.",
      "Alat di situs ini menyusun pita dari isianmu. Alat itu tidak melihat rumahmu, tidak menggantikan telepon darurat, dan tidak boleh menahanmu dari menghubungi orang yang bertugas menolong.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
