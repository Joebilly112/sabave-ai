export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingMinutes: number;
  sections: ArticleSection[];
};

export const ARTICLES: Article[] = [
  {
    slug: "fomo-sertifikat-perawat",
    title: "Sertifikat yang ramai di grup belum tentu giliranmu",
    description:
      "ICU, BTCLS, dan perawatan luka selalu muncul bersamaan. Begini cara memisahkan yang menggeser karier dari yang hanya menenangkan rasa ketinggalan.",
    date: "2026-11-04",
    readingMinutes: 6,
    sections: [
      {
        heading: "Rasa ketinggalan itu nyata, dan mahal",
        paragraphs: [
          "Grup perawat jarang sepi dari poster pelatihan. Satu minggu BTCLS diskon, minggu berikutnya dasar ICU, lalu perawatan luka dengan kuota sisa sepuluh. Rasanya kalau tidak daftar, berkasmu diam di tempat sementara teman seangkatan sudah menambah satu baris di CV.",
          "Masalahnya, sertifikat bukan antrean warung. Tiga pelatihan dalam satu semester bisa menghabiskan cuti, uang daftar, dan tenaga shift tanpa mengubah tempat kamu berdinas. Yang kamu butuhkan bukan daftar yang sedang viral, melainkan satu giliran yang cocok dengan unit, masa kerja, dan tujuan 12 bulan ke depan.",
        ],
      },
      {
        heading: "Tiga pertanyaan sebelum transfer",
        paragraphs: [
          "Pertama: siapa yang akan membaca sertifikat ini? Karu, komite keperawatan, penempat puskesmas, dan agen luar negeri tidak mencari hal yang sama. Poster yang ramai biasanya optimis untuk semua orang, jadi tidak optimis untuk siapa-siapa.",
          "Kedua: berapa dinas yang harus dititipkan? Pelatihan dua hari dan modul dua minggu bukan keputusan yang setara, meski sama-sama disebut kompetensi. Kalau pengganti shift tidak ada, kamu membayar dua kali: biaya kursus dan utang jadwal.",
          "Ketiga: apa yang sudah kamu pegang? Mengulang materi hidup dasar dengan nama lain adalah cara paling umum membakar uang. Cek sertifikat yang masih berlaku sebelum menambah yang mirip.",
        ],
      },
      {
        heading: "Tunda bukan berarti menyerah",
        paragraphs: [
          "Menunda perawatan luka saat tujuanmu ICU bukan kemalasan. Itu menjaga satu slot cuti untuk pelatihan yang diminta ruang kritis. Kamu tetap bisa mencatatnya sebagai giliran berikutnya, dengan syarat yang jelas, bukan sebagai rasa bersalah.",
          "Kalau kamu hanya bisa membiayai satu kursus musim ini, pilih yang mengubah percakapan dengan atasanmu. Sisanya boleh ramai di grup tanpa ikut pindah ke keranjang pembayaran.",
        ],
      },
    ],
  },
  {
    slug: "btcls-atau-icu-dulu",
    title: "BTCLS dulu, atau langsung dasar ICU?",
    description:
      "Dua pelatihan yang paling sering bentrok di kepala perawat rawat inap yang ingin ke ruang kritis. Urutannya mengubah biaya waktu.",
    date: "2026-11-05",
    readingMinutes: 6,
    sections: [
      {
        heading: "Keduanya beda pekerjaan",
        paragraphs: [
          "BTCLS mengunci penilaian dan tindakan kegawatan yang dipakai di IGD maupun bangsal. Dasar ICU mengunci cara kerja ruang kritis: alat, giliran observasi, dan bahasa tim yang tidak kamu dapat dari satu poster seminar.",
          "Rumah sakit yang membuka orientasi ICU sering ingin melihat BTCLS sudah beres sebelum kamu masuk daftar tunggu. Langsung mengambil dasar ICU tanpa dasar kegawatan membuat minggu panjang itu lebih rapuh: kamu membayar modul, lalu masih diminta menambah BTCLS.",
        ],
      },
      {
        heading: "Kalau masa kerjamu masih pendek",
        paragraphs: [
          "Di bawah tiga tahun, jatah cuti dan kepercayaan karu biasanya masih tipis. BTCLS dua sampai tiga hari lebih mudah dititipkan daripada modul ICU yang memakan hampir sepekan. Kamu pulang dengan sertifikat yang juga berguna kalau ternyata pindah ruang belum disetujui tahun ini.",
          "Dasar ICU lebih masuk akal ketika ada sinyal konkret: karu mengiyakan minatmu, ada lowongan internal, atau kamu sudah bertugas di ruang yang berbatasan dengan kritis. Tanpa sinyal itu, sertifikat ICU mudah menjadi PDF yang tidak membuka pintu.",
        ],
      },
      {
        heading: "ACLS bukan pengganti keduanya",
        paragraphs: [
          "ACLS sering diselipkan karena namanya lebih gagah. Untuk banyak perawat, ACLS baru terasa setelah BTCLS, karena irama dan algoritma kode menumpuk di atas bantuan hidup dasar yang harus sudah refleks.",
          "Urutan yang hemat untuk jalur ICU biasanya: BTCLS, lalu ACLS kalau IGD atau kode sudah jadi bagian dinasmu, baru dasar ICU ketika pintunya benar-benar terbuka. Membalik urutan itu bisa, tetapi kamu yang menanggung minggu dan biayanya.",
        ],
      },
    ],
  },
  {
    slug: "perawatan-luka-kapan",
    title: "Perawatan luka: kapan layak masuk antrean",
    description:
      "Kursus luka mudah dijual karena hasilnya kelihatan. Tidak setiap perawat perlu mengambilnya musim ini.",
    date: "2026-11-06",
    readingMinutes: 5,
    sections: [
      {
        heading: "Luka adalah kerja harian di bangsal dan poli",
        paragraphs: [
          "Kalau dinasmu penuh balutan, ulkus, atau luka operasi yang pulang terlalu cepat, dua hari perawatan luka langsung mengubah asuhan. Kamu tidak menunggu mutasi. Keterampilan itu kepakai shift berikutnya.",
          "Biayanya tidak selalu berhenti di formulir daftar. Praktik membawa bahan habis pakai, dan beberapa angkatan meminta peserta menyiapkan sendiri. Hitung itu sebelum membandingkan dengan pelatihan in-house yang lebih murah.",
        ],
      },
      {
        heading: "Bukan penggeser berkas ICU",
        paragraphs: [
          "Perawatan luka yang sangat bagus tetap bukan bahasa yang dicari komite ruang kritis. Kalau tujuan 12 bulanmu adalah ICU, menaruh luka di urutan pertama biasanya karena poster itu yang paling sering lewat, bukan karena karu memintanya.",
          "Tunda bukan berarti luka tidak penting. Artinya slot cutimu musim ini lebih mahal untuk BTCLS atau dasar kritis. Luka bisa menjadi giliran setelah pintu ICU jelas, atau setelah kamu memutuskan tetap di bangsal.",
        ],
      },
      {
        heading: "Komunitas dan puskesmas membaca luka dengan cara lain",
        paragraphs: [
          "Di layanan primer, luka dan PPI sering lebih kedengaran daripada sertifikat kamar kritis. Perawat puskesmas yang mengejar dasar ICU karena takut ketinggalan tren rumah sakit bisa menghabiskan uang untuk kompetensi yang penempatnya tidak menilai.",
          "Cocokkan pelatihan dengan orang yang menandatangani penempatanmu, bukan dengan unggahan yang paling banyak disimpan.",
        ],
      },
    ],
  },
  {
    slug: "jalur-luar-negeri-bukan-tumpukan-sertifikat",
    title: "Jalur luar negeri bukan tumpukan pelatihan akhir pekan",
    description:
      "Agen dan grup migrasi sering menyamakan semakin banyak sertifikat dengan semakin siap berangkat. Berkas yang diminta biasanya lain.",
    date: "2026-11-07",
    readingMinutes: 6,
    sections: [
      {
        heading: "Yang menahan biasanya bahasa dan dokumen",
        paragraphs: [
          "Perawat yang ingin ke luar negeri sering sudah punya BTCLS dan satu dua pelatihan lain. Yang membuat berkas berhenti adalah nilai bahasa, legalisasi ijazah, STR yang masih berlaku, dan syarat negara tujuan yang berubah. Tidak ada di poster pelatihan Sabtu.",
          "Mengumpulkan sertifikat populer terasa seperti kemajuan karena ada tanggal dan stempel. Tes bahasa terasa lambat karena hasilnya belum tentu lulus. Lambat yang itu justru yang dibaca penilai.",
        ],
      },
      {
        heading: "Sertifikat klinis tetap ada gunanya, dengan urutan",
        paragraphs: [
          "BTCLS dan pengalaman ruang yang bisa diceritakan tetap membantu. ACLS atau dasar ICU masuk akal kalau negara tujuan atau pemberi kerja memang menilainya, dan kalau kamu sudah bertugas di area yang mirip. Mengambil hemodialisis atau NICU hanya agar daftar sertifikat panjang adalah cara mahal untuk tidak menjawab syarat bahasa.",
          "Kalau masa kerjamu masih di bawah tiga tahun, jalur luar negeri biasanya belum kejar-kejaran dengan satu angkatan pelatihan. Yang lebih jujur: kuatkan kompetensi di unit sekarang, dan sisihkan anggaran untuk bahasa, bukan untuk setiap early bird.",
        ],
      },
      {
        heading: "Jangan bayar rasa takut ketinggalan angkatan",
        paragraphs: [
          "Grup sering memakai kalimat angkatan ini terakhir. Untuk dokumen luar negeri, angkatan pelatihan lokal jarang menentukan tanggal keberangkatan. Yang menentukan adalah berkas lengkap dan lowongan yang memang membuka.",
          "Satu rencana 6 bulan — tes bahasa, daftar dokumen, satu kompetensi klinis yang benar-benar diminta — lebih murah daripada tiga sertifikat yang tidak ada di checklist agenmu.",
        ],
      },
    ],
  },
  {
    slug: "menunda-pelatihan-tanpa-ketinggalan",
    title: "Menunda satu pelatihan tanpa merasa ketinggalan",
    description:
      "Cara menulis keputusan tunda supaya tidak berubah menjadi rasa bersalah di shift malam.",
    date: "2026-11-08",
    readingMinutes: 5,
    sections: [
      {
        heading: "Beri pelatihan yang ditunda sebuah syarat",
        paragraphs: [
          "Tunda yang kosong mudah dibajak poster berikutnya. Tunda yang berguna punya syarat: misalnya perawatan luka baru dibuka lagi kalau tujuan ICU gagal tahun ini, atau manajemen bangsal baru setelah kamu resmi ketua tim.",
          "Syarat itu membuat kamu bisa menjawab teman yang meneruskan brosur. Kamu bukan menolak belajar. Kamu menjaga satu slot waktu dan satu slot uang.",
        ],
      },
      {
        heading: "Hitung dinas, bukan hanya harga early bird",
        paragraphs: [
          "Harga daftar Rp1,5 juta terasa lebih kecil daripada harga yang dicoret. Yang sering tidak dihitung adalah tiga dinas yang ditukar, transport, dan menginap kalau pelatihannya di luar kota. Untuk perawat dengan satu pendapatan rumah tangga, itu keputusan yang setara dengan kebutuhan lain bulan itu.",
          "Pelatihan in-house satu hari bisa kalah gengsi di CV, tetapi menang di kalender. Kalau kompetensinya yang diminta unit, gengsi poster bukan alasan untuk menolak yang lebih murah.",
        ],
      },
      {
        heading: "Satu giliran yang selesai mengalahkan tiga yang diniatkan",
        paragraphs: [
          "Musim ini kamu hanya butuh tiga nama: yang pertama, yang kedua, yang ketiga, plus satu yang sengaja tidak diambil. Urutan itu meredakan FOMO karena keputusan sudah dibuat sebelum brosur berikutnya masuk.",
          "Kalau urutannya berubah, ubah karena unit atau tujuanmu berubah, bukan karena kuota sisa lima belas.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}
