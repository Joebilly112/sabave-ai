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
    slug: "cv-ditolak-tanpa-balasan",
    title: "CV dikirim puluhan kali, tidak ada satu balasan pun",
    description:
      "Sunyi setelah lamaran sering terasa seperti vonis atas diri. Lebih sering itu halaman yang tidak memberi mesin apa pun untuk dicocokkan.",
    publishedAt: "2026-11-04",
    readingMinutes: 6,
    keywords: ["cv ditolak", "lamaran tanpa balasan", "ats"],
    sections: [
      {
        heading: "Sunyi itu terasa pribadi, prosesnya tidak",
        paragraphs: [
          "Kotak masuk yang tetap kosong setelah dua puluh lamaran mudah dibaca sebagai “saya tidak layak”. Rekruter yang menyaring seratus file tidak menulis alasan untuk yang tidak lolos putaran pertama. Tidak ada balasan bukan berarti ada rapat yang membahas namamu.",
          "Yang terjadi lebih kecil dan lebih mekanis: file dibuka, enam detik, lalu ditutup. Kalau kata peran, alat, dan satu hasil tidak muncul di layar itu, manusia berikutnya tidak pernah melihatnya.",
        ],
      },
      {
        heading: "Template yang rapi tetap bisa tidak terbaca",
        paragraphs: [
          "Canva yang cantik sering pecah saat sistem mengubahnya jadi teks. Kolom dua, ikon, dan garis dekoratif membuat pengalaman kerjamu terselip di bawah hobi. Mata manusia di layar kecil juga lelah sebelum sampai ke bullet ketiga.",
          "Coba salin isi CV ke notepad. Urutan yang tersisa itulah yang dilihat banyak saringan. Kalau namamu, email, dan peran pertama tidak berurutan, itu bukan soal selera desain.",
        ],
      },
      {
        heading: "Satu peran, satu halaman",
        paragraphs: [
          "CV yang sama dikirim ke analis, ke admin, dan ke magang desain akan kalah dari CV yang hanya berbicara ke satu lowongan. Mesin mencocokkan frasa, bukan potensi.",
          "Sebelum mengirim ulang, pilih satu peran. Hapus baris yang tidak membantu peran itu. Tambahkan kata yang benar-benar kamu kerjakan, bukan kata yang hanya terdengar keren.",
        ],
      },
    ],
  },
  {
    slug: "kata-kunci-yang-hilang",
    title: "Kata kunci yang bikin CV lolos saringan, lalu hilang di halamanmu",
    description:
      "ATS tidak menilai semangat. Ia mencari frasa yang sama dengan lowongan. Ini cara melihat celahnya tanpa menjejalkan kata palsu.",
    publishedAt: "2026-11-05",
    readingMinutes: 7,
    keywords: ["kata kunci cv", "ats indonesia", "lowongan"],
    sections: [
      {
        heading: "Salin bahasa lowongan, jangan bahasa motivasimu",
        paragraphs: [
          "Lowongan menulis “rekonsiliasi” dan CV menulis “membantu keuangan”. Bagi manusia yang buru-buru, dua kalimat itu tidak sama. Bagi saringan kata, mereka tidak bertemu sama sekali.",
          "Ambil lima kata benda dari iklan lowongan. Cek apakah kelimanya ada di CV karena kamu memang melakukan kerja itu. Yang tidak pernah kamu lakukan jangan dipaksakan — itu cepat ketahuan di wawancara.",
        ],
      },
      {
        heading: "Nama alat lebih keras daripada “mampu mengoperasikan komputer”",
        paragraphs: [
          "“Mahir komputer” tidak mencocokkan apa pun. Excel, SQL, Figma, atau nama mesin kasir yang spesifik mencocokkan persyaratan. Tulis nama yang dipakai tim, bukan kategori besarnya.",
          "Kalau alatmu tidak populer, tetap tulis. Lalu tambahkan satu kalimat hasil: apa yang berubah setelah kamu memakainya. Alat tanpa hasil masih lemah, tetapi alat yang tidak disebut sama sekali tidak masuk saringan.",
        ],
      },
      {
        heading: "Jangan mengubur kata di paragraf tujuan",
        paragraphs: [
          "Paragraf “saya individu yang berkomitmen” memakan tempat paling mahal di CV: enam baris pertama. Taruh peran dan satu bukti di situ. Tujuan karir yang umum bisa dihapus tanpa kehilangan apa pun.",
          "Ulangi kata penting dua kali saja — di ringkasan dan di bullet pengalaman. Lebih dari itu terdengar seperti daftar yang ditumpuk, dan rekruter yang lolos dari mesin tetap manusia.",
        ],
      },
    ],
  },
  {
    slug: "ringkasan-enam-detik",
    title: "Ringkasan CV yang keburu dibaca dalam enam detik",
    description:
      "Kalimat pembuka yang baik tidak memperkenalkan kepribadian. Ia memberi peran, bukti, dan alasan file ini tidak langsung ditutup.",
    publishedAt: "2026-11-06",
    readingMinutes: 5,
    keywords: ["ringkasan cv", "summary cv", "fresh graduate"],
    sections: [
      {
        heading: "Kalimat pertama adalah peran, bukan sifat",
        paragraphs: [
          "“Mudah beradaptasi dan pekerja keras” bisa ditempel di CV siapa saja. Rekruter tidak bisa memakainya untuk membandingkan kamu dengan sembilan pelamar lain. Mulai dari peran yang dilamar dan lama pengalaman, termasuk nol tahun kalau kamu baru lulus.",
          "Lulusan baru tidak perlu berpura-pura punya sepuluh tahun. Tulis proyek, magang, atau organisasi dengan kata kerja yang sama dengan kerja di lowongan. Kejujuran yang spesifik lebih kuat daripada senioritas yang dikarang.",
        ],
      },
      {
        heading: "Pinjam satu angka dari isi halaman",
        paragraphs: [
          "Kalau di tengah CV ada “mengurus 40 peserta” atau “menurunkan waktu balas”, angka itu harus naik ke ringkasan. Angka yang terkubur tidak ikut dalam enam detik pertama.",
          "Belum punya angka? Jangan mengarang persen. Hitung yang nyata: berapa orang, berapa minggu, berapa dokumen, berapa shift. Ukuran kecil tetap lebih jelas daripada kata “banyak”.",
        ],
      },
      {
        heading: "Dua kalimat cukup",
        paragraphs: [
          "Ringkasan yang jadi paragraf motivasi memaksa pembaca bekerja. Dua kalimat: siapa kamu untuk peran ini, lalu satu bukti. Sisanya hidup di bullet.",
          "Bacalah keras. Kalau kalimat itu masih benar setelah nama peran diganti, ia terlalu umum. Tulis ulang sampai peran ini tidak bisa ditukar.",
        ],
      },
    ],
  },
  {
    slug: "simpan-potong-tambah",
    title: "Simpan, potong, tambah: merapikan CV jadi satu halaman",
    description:
      "Audit yang berguna tidak menulis ulang hidupmu. Ia memutuskan baris mana yang tinggal, mana yang pergi, dan mana yang belum ada.",
    publishedAt: "2026-11-07",
    readingMinutes: 6,
    keywords: ["cv satu halaman", "edit cv", "checklist cv"],
    sections: [
      {
        heading: "Simpan yang sudah mencocokkan peran",
        paragraphs: [
          "Jangan mulai dari halaman kosong kalau ada bullet yang sudah menyebut alat atau hasil. Pindahkan bullet itu ke atas. Heading “Pengalaman” dan “Pendidikan” yang polos juga layak disimpan — nama kreatif sering tidak dikenali.",
          "Email dan telepon yang tertulis utuh di baris pertama adalah bagian yang tidak perlu dirombak. Banyak lamaran senyap berhenti di masalah yang lebih sederhana dari itu.",
        ],
      },
      {
        heading: "Potong yang tidak mengubah keputusan",
        paragraphs: [
          "Hobi traveling, referensi tersedia, dan pas foto di dalam teks jarang membuat seseorang dihubungi. Mereka mengambil baris. Organisasi yang tidak mirip dengan peran target juga boleh turun atau hilang saat kamu sudah memilih satu lowongan.",
          "Kata “saya” yang berulang bisa dipotong tanpa mengubah fakta. “Saya membuat laporan” menjadi “Membuat laporan mingguan untuk 12 toko”. Maknanya sama, scan-nya lebih bersih.",
        ],
      },
      {
        heading: "Tambah hanya yang bisa kamu jelaskan",
        paragraphs: [
          "Daftar tambah bukan daftar kata ajaib. Kalau lowongan menyebut SQL dan kamu pernah menulis kueri, tambahkan. Kalau belum pernah, belajar dulu atau lamar peran yang lebih dekat dengan bukti yang ada.",
          "Satu halaman yang jujur lebih mudah dipertahankan di wawancara daripada dua halaman yang ditambal kata kunci. Wawancara akan menanyakan baris yang kamu tambahkan.",
        ],
      },
    ],
  },
  {
    slug: "format-yang-pecah-di-ats",
    title: "Format CV yang pecah saat dibaca mesin",
    description:
      "Kolom, ikon, dan tabel sering terlihat rapi di laptopmu lalu berantakan di sistem rekruter. Ini tanda-tanda yang bisa kamu cek sendiri.",
    publishedAt: "2026-11-08",
    readingMinutes: 6,
    keywords: ["format cv ats", "cv canva", "cv pdf"],
    sections: [
      {
        heading: "Satu kolom mengalahkan desain dua kolom",
        paragraphs: [
          "Layout dua kolom membuat urutan baca bergantung pada bagaimana file diekspor. Parser sering membaca kolom kiri sampai habis, lalu baru kolom kanan, sehingga tanggal dan jabatan terpisah dari ceritanya.",
          "Satu kolom, heading biasa, dan bullet sederhana selamat di lebih banyak sistem. Kamu bisa tetap memakai huruf yang nyaman dibaca tanpa kotak dan ikon di setiap baris.",
        ],
      },
      {
        heading: "Tahun harus berupa angka",
        paragraphs: [
          "“Kemarin”, “beberapa tahun”, atau garis dekoratif tanpa 2023 tidak bisa diurutkan. Tulis bulan dan tahun, atau setidaknya tahun. “Sekarang” boleh untuk peran yang masih berjalan, asalkan awalnya jelas.",
          "Urutkan dari yang terbaru. Pengalaman paling mirip dengan lowongan tidak harus yang paling panjang, tetapi ia harus mudah ditemukan sebelum pembaca scroll.",
        ],
      },
      {
        heading: "Cek hasil tempel, bukan hasil lihat",
        paragraphs: [
          "Buka PDF, pilih semua, tempel ke dokumen polos. Kalau jabatan menempel ke hobi atau email terpecah, itulah yang akan diindeks. Perbaiki sumbernya, lalu ekspor ulang.",
          "Nama file juga bagian dari kesan: nama-peran.pdf lebih jelas daripada CV_final_fix3.pdf. Isinya tetap yang menentukan, tetapi nama yang acak menambah gesekan kecil yang tidak perlu.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
