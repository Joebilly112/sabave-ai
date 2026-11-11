export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  minutes: number;
  sections: ArticleSection[];
};

export const ARTICLES: Article[] = [
  {
    slug: "kenapa-berkas-dikembalikan",
    title: "Kenapa berkas kenaikan pangkat sering dikembalikan BKD",
    description:
      "Usulan naik pangkat jarang gagal karena satu aturan rahasia. Yang paling sering terjadi: satu tanggal tidak ketemu, SKP putus, atau scan yang tidak terbaca.",
    date: "2026-11-11",
    minutes: 6,
    sections: [
      {
        heading: "Bolak-balik itu biasanya soal keterbacaan",
        paragraphs: [
          "Banyak ASN sudah mengabdi cukup lama, lalu kaget ketika mapnya kembali dengan catatan singkat. Rasanya seperti seluruh masa kerja yang diuji. Dalam praktik meja BKD, yang diperiksa lebih dulu sering hal yang membosankan: apakah nama sama, apakah NIP sama, apakah tanggal TMT pada SK terakhir bisa dibaca.",
          "Scan yang terpotong di bagian tanggal, atau legalisir yang copnya menutup angka tahun, sudah cukup untuk berkas dinyatakan kurang. Isinya boleh lengkap. Kalau pemeriksa tidak bisa membaca satu baris, usulan tidak bisa diteruskan.",
        ],
      },
      {
        heading: "SKP yang putus di tengah",
        paragraphs: [
          "SKP dua tahun terakhir dengan predikat minimal baik adalah lembar yang paling sering tertinggal separuh. Ada yang hanya melampirkan tahun terakhir. Ada yang lengkap, tetapi tanda tangan pejabat penilai kosong di salah satu semester.",
          "Predikat yang baik tidak menolong kalau periodenya bolong. Sebelum menambah sertifikat baru, susun dulu dua tahun itu berurutan dan pastikan setiap halaman ada nama penilai.",
        ],
      },
      {
        heading: "Salah jalur, bukan kurang semangat",
        paragraphs: [
          "Pelaksana yang menyisipkan borang angka kredit, atau PPPK yang mengisi formulir kenaikan pangkat reguler PNS, akan terlihat salah jalur sejak lembar pertama. Pemeriksa tidak sedang mengukur pengabdian. Ia sedang mencocokkan jenis usul dengan jenis jabatan.",
          "Guru dan jabatan fungsional lain hampir selalu ditanya PAK. Kalau PAK berhenti di pangkat sekarang, DUPAK yang hanya berisi fotokopi piagam tidak menutup kekurangan angka kredit.",
        ],
      },
      {
        heading: "Yang bisa dibereskan minggu ini",
        paragraphs: [
          "Ambil SK pangkat terakhir, SK CPNS, SK PNS, dan SK jabatan. Letakkan berdampingan. Lingkari nama, NIP, dan TMT. Kalau ada yang beda, itu pekerjaan pertama — bukan mencari cap baru.",
          "NaikPangkat menyusun daftar itu dari golongan, jenis jabatan, lama di pangkat, dan tahun SK. Tetap cocokkan hasilnya dengan edaran instansi Anda. Ini informasi, bukan penetapan BKD.",
        ],
      },
    ],
  },
  {
    slug: "reguler-dan-pilihan",
    title: "Kenaikan pangkat reguler dan pilihan tidak memakai map yang sama",
    description:
      "Reguler umumnya menunggu masa dalam pangkat. Pilihan dan penyesuaian mengikuti syarat lain. Mencampur keduanya adalah cara cepat berkas kembali.",
    date: "2026-11-11",
    minutes: 6,
    sections: [
      {
        heading: "Reguler itu kalender, bukan hadiah",
        paragraphs: [
          "Kenaikan pangkat reguler adalah jalur yang paling sering dibicarakan di grup ASN: mengabdi, SKP baik, lalu diusulkan pada periode tertentu. Patokan masa yang biasa disebut adalah empat tahun dalam pangkat terakhir. Angka itu bukan perasaan. Tanggalnya ada di TMT pada SK.",
          "Kalau masa itu belum terpenuhi, map yang tebal tidak mempercepat meja pertama. Usul yang datang terlalu cepat sering kembali dengan alasan masa kerja dalam pangkat, sebelum isi sertifikat dilihat.",
        ],
      },
      {
        heading: "Pilihan dan penyesuaian ijazah jalurnya lain",
        paragraphs: [
          "Ada usul yang tidak menunggu kalender empat tahun, misalnya karena jabatan atau karena penyesuaian ijazah. Syaratnya tidak otomatis lebih mudah. Biasanya justru lebih spesifik: jabatan yang diemban, ijazah yang sudah diakui, dan edaran instansi pada tahun itu.",
          "Mencampur borang reguler dengan alasan pilihan membuat jenis usulnya tidak terbaca. Pemeriksa harus menebak Anda sedang mengusulkan yang mana. Tebakan itu sering berakhir sebagai berkas kembali.",
        ],
      },
      {
        heading: "Struktural jangan dipaksa ikut ritme pelaksana",
        paragraphs: [
          "Pejabat struktural kadang tetap menghitung empat tahun seperti pelaksana. Pada banyak instansi, pangkat struktural terkait dengan jabatan yang dilantik, bukan semata-mata dengan ulang tahun SK. SK pelantikan yang lama, atau uraian jabatan dari unit sebelumnya, jadi temuan.",
          "Kalau Anda struktural, tanyakan dulu jenis usul yang dibuka periode ini. Jangan menyalin daftar grup pelaksana lalu mengganti nama.",
        ],
      },
      {
        heading: "Satu map, satu jalur",
        paragraphs: [
          "Tulis di kertas kecil: reguler, pilihan, atau penyesuaian. Pilih satu. Semua lembar di map harus mendukung pilihan itu. Lembar yang tidak mendukung lebih baik dikeluarkan daripada ikut menumpuk.",
          "Daftar di NaikPangkat mengikuti jalur yang paling umum untuk profil yang Anda isi, lalu menandai kalau masa empat tahun belum terlihat terpenuhi. Edaran BKD tetap yang memutuskan berkas Anda diterima atau tidak.",
        ],
      },
    ],
  },
  {
    slug: "pns-dan-pppk",
    title: "PNS dan PPPK tidak mengantre di loket pangkat yang sama",
    description:
      "PPPK punya golongan, tetapi tidak naik pangkat lewat siklus April dan Oktober seperti PNS. Mencampur formulirnya membuat berkas kembali.",
    date: "2026-11-11",
    minutes: 5,
    sections: [
      {
        heading: "Golongan yang mirip, urusannya tidak",
        paragraphs: [
          "PPPK juga disebut dengan golongan. Karena kata itu sama, banyak orang membuka checklist kenaikan pangkat PNS dan mulai memfotokopi SK. Yang dicari instansi pada PPPK biasanya lain: perjanjian kerja, SK pengangkatan, dan penilaian kinerja.",
          "Kenaikan pangkat reguler adalah mekanisme PNS. Membawa formulir itu ke map PPPK bukan membuat Anda lebih siap. Itu membuat petugas melihat jenis dokumen yang tidak diminta.",
        ],
      },
      {
        heading: "Yang biasanya ada di map PPPK",
        paragraphs: [
          "Perjanjian yang masih berlaku adalah lembar induk. SK pengangkatan menunjukkan golongan saat mulai. Penilaian kinerja periode berjalan menjadi dasar evaluasi. Ijazah yang dipakai saat pengangkatan perlu sama dengan data kepegawaian, termasuk gelar.",
          "Identitas yang sudah diperbaiki di data BKN tetapi masih dikirim dalam scan lama juga sering jadi temuan. Bereskan data dulu, baru gandakan.",
        ],
      },
      {
        heading: "Jangan ikut panik kalender PNS",
        paragraphs: [
          "Grup sekolah atau dinas sering mengirim pengingat yang sama ke semua orang: kumpul berkas sebelum April atau Oktober. Bagi PPPK, tanggal yang lebih relevan adalah akhir perjanjian kerja. Mundur kira-kira tiga bulan dari tanggal itu untuk mulai menyusun, lalu tanyakan edaran instansi.",
          "Kalau atasan meminta surat keterangan masih bertugas, minta surat yang menyebut unit dan jabatan sekarang, bukan tembusan lama.",
        ],
      },
      {
        heading: "Pilih status di awal",
        paragraphs: [
          "NaikPangkat memisahkan daftar PNS dan PPPK sejak formulir. Kalau statusnya PPPK, hasilnya tidak akan menyuruh Anda mengejar TMT April. Tetap baca edaran tempat Anda bertugas, karena evaluasi tiap instansi tidak seragam.",
        ],
      },
    ],
  },
  {
    slug: "skp-dan-masa-pangkat",
    title: "SKP dan masa dalam pangkat, dua hal yang sering terlewat",
    description:
      "Lama mengabdi tidak sama dengan lama di golongan sekarang. SKP yang baik juga tidak menolong kalau periodenya putus.",
    date: "2026-11-11",
    minutes: 6,
    sections: [
      {
        heading: "Lama mengabdi bukan lama di pangkat",
        paragraphs: [
          "Seseorang bisa sudah 15 tahun menjadi ASN tetapi baru 2 tahun di golongan sekarang. Yang dihitung untuk kenaikan pangkat reguler pada umumnya adalah masa dalam pangkat terakhir, bukan seluruh masa bakti sejak CPNS.",
          "Angka itu ada di TMT pada SK pangkat terakhir. Mengira-ngira dari tahun lulus CPNS adalah sumber selisih yang nanti dipersoalkan BKD.",
        ],
      },
      {
        heading: "Empat tahun adalah patokan, bukan janji",
        paragraphs: [
          "Empat tahun sering disebut sebagai masa untuk reguler. Itu patokan umum supaya Anda tahu apakah usul terlalu cepat. Itu bukan surat keputusan bahwa pada hari ke-1461 pangkat otomatis berubah.",
          "Kalau lama di pangkat masih di bawah empat tahun, energi minggu ini lebih baik dipakai merapikan SKP dan menyimpan bukti jabatan, bukan memaksa nomor agenda.",
        ],
      },
      {
        heading: "SKP yang diminta biasanya dua tahun",
        paragraphs: [
          "Predikat minimal baik pada dua tahun terakhir adalah syarat yang terdengar sederhana sampai berkasnya disusun. Tahun yang pindah jabatan, tahun yang pejabat penilainya berganti, atau tahun yang berkasnya hanya tersimpan di email, sering bolong.",
          "Cetak kedua tahun itu. Cek tanda tangan, periode, dan nama pegawai. Kalau satu semester kosong, kejar ke penilai sebelum jendela setor dibuka, bukan pada minggu terakhir.",
        ],
      },
      {
        heading: "Hukuman disiplin yang masih berjalan",
        paragraphs: [
          "SKP baik tidak menutup hukuman disiplin yang belum selesai. Instansi biasanya meminta keterangan bahwa Anda tidak sedang menjalani hukuman. Surat yang tanggalnya sudah basi kalah oleh data yang lebih baru di kepegawaian.",
          "NaikPangkat menandai kalau lama di golongan yang Anda isi belum di patokan empat tahun, dan tetap menaruh SKP di daftar wajib untuk PNS. Cocokkan TMT asli sebelum mempercayai perkiraan kalendernya.",
        ],
      },
    ],
  },
  {
    slug: "kalender-april-oktober",
    title: "Kalender April dan Oktober: kapan berkas sebaiknya sudah masuk",
    description:
      "TMT kenaikan pangkat reguler yang biasa disebut adalah 1 April dan 1 Oktober. Berkas yang datang dekat sekali dengan tanggal itu sering sudah telat untuk periode tersebut.",
    date: "2026-11-11",
    minutes: 5,
    sections: [
      {
        heading: "TMT bukan hari pengumpulan",
        paragraphs: [
          "1 April dan 1 Oktober adalah tanggal mulai berlaku yang biasa disebut untuk kenaikan pangkat reguler, bukan hari Anda mulai memfotokopi. Instansi perlu waktu memeriksa, mengembalikan, dan mengunggah. Karena itu jendela setornya ada beberapa bulan sebelumnya.",
          "Perkiraan yang aman untuk disimpan di kepala: mulai susun sekitar tiga bulan sebelum TMT, dan usahakan sudah masuk sebelum tiga minggu terakhir. Banyak BKD menutup lebih awal. Edaran tahun ini yang menentukan tanggal pastinya.",
        ],
      },
      {
        heading: "Periode yang sudah sempit",
        paragraphs: [
          "Kalau pengingat di grup baru muncul ketika TMT tinggal beberapa minggu, anggap periode itu sempit. Anda masih bisa menyetor kalau edaran memang masih buka, tetapi siapkan diri untuk giliran berikutnya kalau satu lembar tidak keburu dilegalisir.",
          "Memaksa periode yang sudah tutup hanya menambah cap bolak-balik. Catat TMT berikutnya, lalu pakai jedanya untuk SKP dan PAK, bukan untuk marah ke petugas loket.",
        ],
      },
      {
        heading: "Golongan IV sering tidak selesai di daerah",
        paragraphs: [
          "Mulai dari golongan IV, berkas tidak selalu berhenti di BKD tempat Anda mengantar map. Ada tahap tim penilai atau BKN. Scan yang rapi, nama file yang konsisten, dan legalisir yang tidak menutup angka jadi lebih penting, karena berkas itu akan dilihat ulang.",
          "Dari III/d menuju IV/a, pemeriksaan juga biasanya lebih ketat daripada kenaikan di dalam golongan III. Jangan memakai kebiasaan lama 'dulu selalu lolos' sebagai daftar isian.",
        ],
      },
      {
        heading: "Puncak pangkat tidak punya periode berikutnya",
        paragraphs: [
          "Pembina Utama tidak memiliki golongan reguler di atasnya. Mengumpulkan map setiap April hanya karena grup mengingatkan akan berakhir di loket. Kalau yang ditunggu sebenarnya jabatan, tanyakan jalurnya secara terpisah.",
          "NaikPangkat menghitung jendela dari tanggal hari ini dan dari lama di pangkat yang Anda isi. Anggap hasilnya pengingat, lalu timpa dengan tanggal pada edaran BKD Anda kalau keduanya berbeda.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}
