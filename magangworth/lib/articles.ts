export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingMinutes: number;
  keywords: string[];
  sections: ArticleSection[];
};

export const articles: Article[] = [
  {
    slug: "semester-habis-di-fotokopi",
    title: "Semester habis di fotokopi, dan tidak ada yang bisa ditulis",
    description:
      "Takut magang berubah jadi antar dokumen itu wajar. Bedakan kesibukan harian dari artefak yang masih bisa kamu tunjukkan setelah nama kantor dilupakan.",
    publishedAt: "2026-11-04",
    readingMinutes: 6,
    keywords: ["magang fotokopi", "magang tidak berguna", "nilai magang"],
    sections: [
      {
        heading: "Sibuk bukan bukti kamu belajar",
        paragraphs: [
          "Hari yang penuh di kantor terasa seperti magang yang serius. Kamu datang pagi, membalas chat, mengambil cetakan, mengantar amplop. Sore hari tubuh lelah, dan itu mudah disalahartikan sebagai kemajuan.",
          "Yang tersisa setelah semester selesai hanya kalimat yang bisa kamu ucapkan tanpa membuka catatan. Kalau kalimat itu cuma “saya bantu operasional”, pewawancara tidak punya apa-apa untuk ditanyakan lebih lanjut.",
        ],
      },
      {
        heading: "Tugas bantu boleh ada, asal tidak menjadi pekerjaan utuh",
        paragraphs: [
          "Minggu pertama memang sering berisi orientasi dan suruhan kecil. Masalahnya bukan satu pagi fotokopi. Masalahnya kalau pola itu tidak pernah diganti, dan tidak ada orang yang merasa bertanggung jawab menggantinya.",
          "Tulis tugas harian apa adanya sebelum kamu menerima. Daftar itu lebih jujur daripada brosur lowongan. Kalau isinya hanya meja depan, arsip, dan story harian, lampu nilainya condong merah sebelum hari pertama.",
        ],
      },
      {
        heading: "Satu keluaran kecil mengubah cerita semester",
        paragraphs: [
          "Artefak tidak harus besar. Satu catatan riset, satu bagian dashboard, satu alur yang kamu ubah, atau satu ringkasan lapangan sudah cukup untuk jadi bahan bicara.",
          "Minta itu di minggu pertama, selagi ekspektasi belum membeku. Menunggu bulan ketiga biasanya berarti antrean operasional sudah dianggap tugas resmimu.",
        ],
      },
    ],
  },
  {
    slug: "tugas-yang-bisa-ditulis",
    title: "Tugas magang yang masih bisa ditulis setelah kamu pergi",
    description:
      "Cara membaca daftar tugas harian: mana yang menghasilkan bukti, mana yang hanya mengisi jam.",
    publishedAt: "2026-11-05",
    readingMinutes: 5,
    keywords: ["tugas magang", "pengalaman magang", "artefak magang"],
    sections: [
      {
        heading: "Cari nama pekerjaan, bukan kata bantu",
        paragraphs: [
          "“Bantu tim marketing” tidak menyebut apa yang berpindah tangan. “Menyusun brief kampanye untuk satu kanal, dengan ukuran berhasil yang disepakati” sudah punya bentuk.",
          "Saat membaca tawaran, lingkari kata yang menghasilkan berkas, keputusan, atau pertemuan dengan pengguna. Yang tidak bisa dilingkari biasanya akan diisi pada hari-H oleh suruhan dadakan.",
        ],
      },
      {
        heading: "Pembimbing adalah bagian dari tugas, bukan fasilitas tambahan",
        paragraphs: [
          "Tanpa orang yang meninjau, standar kerja tidak kelihatan. Kamu bisa rajin sebulan dan tetap tidak tahu apakah hasilmu dipakai.",
          "Akses mingguan sudah cukup untuk mengoreksi arah. Akses yang hanya “kalau sempat” hampir selalu kalah oleh rapat orang dewasa.",
        ],
      },
      {
        heading: "Durasi memperbesar apa yang sudah ada",
        paragraphs: [
          "Dua belas minggu pada tugas yang jelas memberi waktu untuk naik dari membantu menjadi memegang. Dua belas minggu pada antar dokumen hanya memperpanjang kehadiran.",
          "Magang singkat di bawah sebulan jarang cukup untuk satu siklus. Kalau tetap diambil, artefaknya harus lebih kecil dan tenggatnya harus tertulis di hari pertama.",
        ],
      },
    ],
  },
  {
    slug: "minta-skill-minggu-pertama",
    title: "Empat hal yang layak diminta sebelum minggu pertama habis",
    description:
      "Minggu pertama adalah satu-satunya saat permintaanmu masih terdengar seperti perencanaan, bukan keluhan.",
    publishedAt: "2026-11-06",
    readingMinutes: 5,
    keywords: ["minggu pertama magang", "pembimbing magang", "skill magang"],
    sections: [
      {
        heading: "Kunci nama dan jadwal review",
        paragraphs: [
          "Minta satu orang yang boleh kamu datangi, plus dua puluh menit di kalender. Tanpa jam, “pembimbing” hanya gelar di surat penerimaan.",
          "Review yang berguna menilai artefak. Review yang hanya menanyakan “ada kendala?” mudah dijawab tidak ada, lalu pola lama berlanjut.",
        ],
      },
      {
        heading: "Minta pekerjaan bernama, plus contoh yang dianggap baik",
        paragraphs: [
          "Judul tugas, tenggat, dan izin menyimpan salinan membuat pekerjaanmu bisa dibawa pulang secara etis. Tanpa izin simpan, kamu pulang hanya dengan ingatan.",
          "Contoh hasil minggu lalu dari tim menghemat tebakan. Kamu meniru standar, bukan meniru suasana kantor.",
        ],
      },
      {
        heading: "Batasi jam operasional secara eksplisit",
        paragraphs: [
          "Fotokopi dan antar dokumen tidak perlu dihapus dari muka bumi. Yang perlu dibatasi adalah porsinya, supaya sisa jam tidak ikut terseret.",
          "Kalimatnya lebih aman kalau diajukan sebagai usulan jadwal, bukan sebagai penolakan. Orang dewasa lebih mudah mengiyakan batas jam daripada mengiyakan kritik.",
        ],
      },
    ],
  },
  {
    slug: "skrip-renegosiasi-magang",
    title: "Cara minta tugas yang lebih bernilai tanpa terdengar menuntut",
    description:
      "Skrip singkat untuk pembimbing: sebut ritme yang kamu lihat, minta satu keluaran, dan tetap bantu operasional di jam yang disepakati.",
    publishedAt: "2026-11-07",
    readingMinutes: 5,
    keywords: ["negosiasi magang", "bicara ke pembimbing", "tugas magang"],
    sections: [
      {
        heading: "Mulai dari pengamatan, bukan dari kecewa",
        paragraphs: [
          "“Saya bosan fotokopi” membuat pembimbing bertahan. “Ritme saya sejauh ini berkisar pada cetak dan antar dokumen” membuat pembimbing melihat pola yang sama.",
          "Sebutkan cuplikan tugas yang nyata. Kalimat umum mudah dibantah. Cuplikan harian lebih sulit diperdebatkan.",
        ],
      },
      {
        heading: "Minta satu hal, dengan bentuk yang bisa diiyakan",
        paragraphs: [
          "Satu keluaran kecil lebih mudah diterima daripada permintaan “saya ingin belajar banyak”. Sebut judul, tenggat, dan apakah kamu boleh menyimpan salinannya.",
          "Tawarkan tetap membantu operasional pada jam yang dibatasi. Kamu tidak menghilang dari kebutuhan tim. Kamu memindahkan sisanya.",
        ],
      },
      {
        heading: "Tulis ulang kalau jawaban masih mengambang",
        paragraphs: [
          "“Nanti lihat saja” bukan kesepakatan. Ulangi dalam satu kalimat: siapa yang meninjau, hari apa, dan apa nama pekerjaannya.",
          "Kalau setelah dua kali permintaan tetap tidak ada nama maupun tenggat, lampu magang itu tidak akan berubah hanya karena kamu lebih rajin.",
        ],
      },
    ],
  },
  {
    slug: "magang-tanpa-bayaran-tetap-perlu-artefak",
    title: "Magang tanpa bayaran tetap harus meninggalkan artefak",
    description:
      "Status bayar memberi konteks, tetapi yang menentukan nilai semester adalah tugas dan pembimbing, bukan amplop.",
    publishedAt: "2026-11-08",
    readingMinutes: 6,
    keywords: ["magang tidak dibayar", "uang saku magang", "worth it magang"],
    sections: [
      {
        heading: "Bayaran bukan nilai karier",
        paragraphs: [
          "Magang yang dibayar bisa tetap kosong kalau isinya hanya meja depan. Magang tanpa bayaran bisa tetap berguna kalau ada mentor dan satu keluaran yang kamu pegang.",
          "Yang berbahaya adalah kombinasi: tidak dibayar, tidak ada pembimbing, dan tugas harian yang tidak menghasilkan berkas. Di situ waktu kuliah ditukar dengan kehadiran.",
        ],
      },
      {
        heading: "Uang saku tidak menutup tugas yang kabur",
        paragraphs: [
          "Uang saku menandai kantor mau berkomitmen sedikit. Ia tidak menjawab pertanyaan apakah kamu pulang dengan keterampilan.",
          "Saat ragu, tulis tugasnya dulu. Kalau kamu tidak bisa menjabarkan lima hari ke depan tanpa kata “bantu-bantu”, nominal di surat tidak mengubah lampu.",
        ],
      },
      {
        heading: "Putuskan dari bukti yang bisa ditunjukkan",
        paragraphs: [
          "Pertanyaan yang lebih jujur bukan “berapa yang saya terima”, melainkan “kalau nama kantor ini dihapus, apa yang masih bisa saya ceritakan?”",
          "Kalau jawabannya belum ada, minggu pertama adalah untuk membuatnya ada. Kalau pembimbing menolak membahasnya, kamu sudah punya informasi yang cukup.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
