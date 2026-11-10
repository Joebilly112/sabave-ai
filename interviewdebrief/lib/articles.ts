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
    slug: "artinya-well-get-back-to-you",
    title: "HR bilang “we’ll get back to you” — artinya apa?",
    description:
      "Kalimat penutup itu hampir tidak membawa keputusan. Ini cara membaca sinyal yang benar-benar ada di ruangan, bukan di kepala setelahnya.",
    publishedAt: "2026-11-02",
    readingMinutes: 6,
    keywords: ["setelah interview", "we’ll get back to you", "debrief wawancara"],
    sections: [
      {
        heading: "Kalimat itu adalah penutup, bukan vonis",
        paragraphs: [
          "Hampir setiap wawancara di Indonesia ditutup dengan variasi “nanti kami kabari”. Kalimat itu menjaga sopan santun HR. Ia tidak mengukur seberapa bagus jawabanmu, dan ia tidak mengukur seberapa buruk perasaanmu di kereta pulang.",
          "Spiral biasanya mulai di sini: kamu mengulang satu jawaban yang terasa canggung, lalu menyimpulkan seluruh sesi gagal. Satu kalimat penutup tidak punya data sebanyak itu.",
        ],
      },
      {
        heading: "Yang lebih layak dicatat daripada nada HR",
        paragraphs: [
          "Durasi yang dipersingkat mendadak, pertanyaan yang diulang karena jawabanmu belum konkret, dan tidak adanya pertanyaan balik darimu — itu sinyal yang bisa kamu tulis. Senyum di akhir meeting tidak masuk daftar.",
          "Coba catat empat hal selagi masih segar: peran yang dilamar, format sesi, pertanyaan yang benar-benar muncul, dan rasa di perut. Rasa dicatat, tetapi tidak dijadikan nilai.",
        ],
      },
      {
        heading: "48 jam berikutnya",
        paragraphs: [
          "Follow-up yang berguna tidak meminta kepastian. Ia merapikan satu titik yang kamu tahu lemah, lalu menyatakan minat tanpa merengek. Lebih dari satu email dalam dua hari biasanya mengurangi, bukan menambah, kesan.",
          "Kalau catatanmu masih berputar di “artinya aku ditolak, ya?”, kamu belum punya debrief. Kamu punya tebakan. Tebakan itu yang bikin malam jadi panjang.",
        ],
      },
    ],
  },
  {
    slug: "spiral-setelah-user-interview",
    title: "Spiral setelah user interview: empat sinyal yang sering disalahartikan",
    description:
      "User interview terasa personal. Karena itu satu diam dari calon atasan mudah dibaca sebagai penolakan total.",
    publishedAt: "2026-11-03",
    readingMinutes: 7,
    keywords: ["user interview", "spiral setelah wawancara", "calon atasan"],
    sections: [
      {
        heading: "Diam bukan selalu kecewa",
        paragraphs: [
          "Calon atasan sering diam karena mereka mencatat, bukan karena mereka menyerah. Di sesi user, orang di seberang sedang mencocokkan ceritamu dengan kerja nyata minggu depan. Jeda itu mahal, dan mudah ditafsir sebagai vonis.",
          "Yang lebih informatif: apakah mereka meminta contoh kedua, atau pindah ke topik lain setelah jawaban pertama masih mengambang.",
        ],
      },
      {
        heading: "Cerita panjang belum tentu meyakinkan",
        paragraphs: [
          "User interview mengundang cerita. Banyak kandidat mengisi waktu dengan latar kantor, bukan dengan keputusan yang mereka ambil. Pewawancara keluar dengan suasana, tanpa bukti.",
          "Tanda yang sering terlewat: kamu tidak menyebut hasil. Bukan hasil perusahaan secara umum — hasil dari tindakanmu. Tanpa itu, sesi terasa “hangat” dan tetap tidak bisa dibandingkan dengan kandidat lain.",
        ],
      },
      {
        heading: "Pertanyaan balik yang kedengarannya basa-basi",
        paragraphs: [
          "“Timnya seperti apa?” hampir tidak membedakan kamu. Pertanyaan yang menempel ke peran — bagaimana pekerjaan ini diukur, di mana orang baru biasanya tersangkut — menunjukkan bahwa kamu sudah membayangkan minggu pertama.",
          "Kalau menit terakhir hanya terima kasih, spiralmu nanti akan mengisi kekosongan itu dengan skenario terburuk. Lebih murah mengisi kekosongan itu di dalam sesi.",
        ],
      },
    ],
  },
  {
    slug: "case-interview-grogi-atau-lemah",
    title: "Case interview terasa hancur: membedakan grogi dan jawaban yang memang lemah",
    description:
      "Tangan dingin dan struktur yang bolong bukan hal yang sama. Case menuntut urutan dan angka, bukan ketenangan yang sempurna.",
    publishedAt: "2026-11-04",
    readingMinutes: 7,
    keywords: ["case interview", "studi kasus", "grogi wawancara"],
    sections: [
      {
        heading: "Grogi tidak otomatis merusak struktur",
        paragraphs: [
          "Hampir semua orang gemetar di case pertama. Pewawancara yang terlatih memisahkan suara yang bergetar dari kerangka yang hilang. Kamu, di sisi lain, biasanya mencampur keduanya menjadi satu rasa: hancur.",
          "Cek yang jujur: apakah kamu menyebut asumsi, langkah, lalu kesimpulan — meski pelan? Atau kamu langsung meloncat ke ide karena takut hening?",
        ],
      },
      {
        heading: "Case tanpa angka mudah ambruk",
        paragraphs: [
          "Di format ini, kesan “menurut saya pasarnya besar” tidak cukup. Satu perkiraan yang kamu jelaskan asal-usulnya lebih kuat daripada jawaban yang mulus tetapi tidak bisa dihitung.",
          "Kalau di tengah jalan kamu sadar angkanya salah dan kamu memperbaikinya dengan suara keras, itu sering lebih baik daripada mempertahankan angka yang kamu sendiri tidak percaya.",
        ],
      },
      {
        heading: "Apa yang masih bisa diperbaiki setelahnya",
        paragraphs: [
          "Kamu tidak bisa mengulang case yang sama. Kamu bisa menulis ulang struktur yang bolong, supaya case berikutnya tidak mengulang lubang yang sama. Itu fungsi debrief: tiga titik, bukan seluruh kepribadianmu.",
          "Follow-up untuk case jarang mengubah nilai hari itu. Ia berguna kalau prosesnya masih panjang dan kamu punya satu contoh kerja yang menunjukkan kerangka berpikir lebih rapi.",
        ],
      },
    ],
  },
  {
    slug: "pertanyaan-balik-lima-menit",
    title: "Pertanyaan balik yang menyelamatkan kesan di lima menit terakhir",
    description:
      "Menit akhir sering dibuang untuk lega. Padahal di situ minatmu kelihatan spesifik atau generik.",
    publishedAt: "2026-11-05",
    readingMinutes: 5,
    keywords: ["pertanyaan untuk HR", "akhir wawancara", "minat kandidat"],
    sections: [
      {
        heading: "Jangan tanya sesuatu yang ada di halaman karier",
        paragraphs: [
          "“Budaya kerjanya bagaimana?” memaksa pewawancara mengulang brosur. Pertanyaan yang bagus hanya bisa dijawab oleh orang yang sedang duduk di depanmu: apa yang bikin orang di peran ini bertahan, dan apa yang bikin mereka pergi dalam enam bulan.",
          "Dua pertanyaan cukup. Tiga sering mulai terdengar seperti daftar yang dihafal dari internet.",
        ],
      },
      {
        heading: "Ikat pertanyaannya ke jawabanmu tadi",
        paragraphs: [
          "Kalau tadi kamu cerita soal merapikan antrean laporan, tanyakan bagaimana tim mengukur laporan yang “selesai”. Pertanyaan itu membuktikan kamu mendengar, bukan hanya menunggu giliran bicara.",
          "Hindari gaji, cuti, dan “kapan saya diterima” di menit ini. Itu percakapan tahap lain. Menit terakhir adalah tentang kerja.",
        ],
      },
      {
        heading: "Kalau waktu sudah habis",
        paragraphs: [
          "Kadang HR memang menutup cepat. Kamu tetap bisa menaruh satu pertanyaan di follow-up, asalkan pesannya pendek dan tidak meminta mereka mengulang seluruh sesi.",
          "Tidak bertanya sama sekali bukan dosa moral. Ia hanya sinyal yang mudah diperbaiki, dan sering jadi salah satu dari tiga momen terlemah — bukan seluruh wawancara.",
        ],
      },
    ],
  },
  {
    slug: "follow-up-48-jam",
    title: "Follow-up 48 jam yang sopan tanpa terdengar putus asa",
    description:
      "Pesan setelah wawancara punya satu tugas: merapikan satu titik dan menyatakan minat. Bukan meminta ketenangan.",
    publishedAt: "2026-11-06",
    readingMinutes: 6,
    keywords: ["follow up wawancara", "email setelah interview", "48 jam"],
    sections: [
      {
        heading: "Tunggu sampai catatanmu dingin",
        paragraphs: [
          "Email yang dikirim sejam setelah sesi biasanya masih bergetar. Kamu meminta validasi, bukan memberi kejelasan. Jeda semalam cukup untuk memisahkan rasa malu dari titik yang benar-benar lemah.",
          "Batas yang masuk akal untuk proses kantor di Indonesia: di dalam dua hari kerja. Lebih cepat dari itu jarang mengubah apa pun. Lebih lama dari itu mudah tertelan antrean.",
        ],
      },
      {
        heading: "Satu lubang, bukan biografi",
        paragraphs: [
          "Pilih satu kelemahan yang kamu bisa perbaiki dengan contoh, bukan dengan janji. “Saya terlalu gugup” tidak bisa ditindaklanjuti. “Contoh soal migrasi data tadi belum ada angkanya — ini versi singkatnya” bisa.",
          "Tiga paragraf cukup: terima kasih yang spesifik (peran, format, durasi), satu rapian, lalu minat untuk lanjut. Tanpa “saya sangat sangat berharap”.",
        ],
      },
      {
        heading: "Apa yang tidak perlu diminta",
        paragraphs: [
          "Jangan minta mereka menenangkanmu. Jangan minta alasan jika belum ada kabar. Jangan menyisipkan ekspektasi gaji di pesan ini — itu percakapan lain, dan ia menggeser kesan dari kerja ke tawar-menawar.",
          "Kalau tidak ada balasan, diam. Satu pesan sudah cukup. Debriefnya untuk kamu pakai di interview berikutnya, bukan untuk mengetuk pintu yang sama berkali-kali.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
