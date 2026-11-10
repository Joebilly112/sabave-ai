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
    slug: "hr-minta-str-di-koridor",
    title: "Kalau SDM menanyakan STR di koridor",
    description: "Cara menjawab tanpa mengarang tanggal, lalu apa yang kamu buka malam itu.",
    minutes: 4,
    publishedAt: "2026-11-10",
    paragraphs: [
      "Pertanyaan itu biasanya singkat: STR-nya masih berlaku? Di lorong, jawaban yang aman adalah tanggal yang tertulis di kartu, bukan perkiraan. Kalau kamu tidak ingat, katakan akan mengirim pindaian hari itu, lalu benar-benar kirim.",
      "Jangan menjanjikan bahwa perpanjangan sudah masuk jika yang kamu punya hanya niat. SDM mencatat jawabanmu. Lebih mudah menjelaskan berkas yang belum lengkap daripada menarik ucapan yang sudah terlanjur.",
      "Malamnya, foto STR yang ada. Catat tanggal habis di kalender yang kamu buka setiap dinas, bukan hanya di galeri. Satu tanggal yang terlihat mengalahkan tiga pengingat di grup yang tenggelam.",
      "STRHabis menyusun hitungan hari dan urutan berkas dari tanggal yang kamu isi. Keputusan apakah praktik boleh berlanjut tetap di tempat kerjamu dan di aturan resmi, bukan di halaman hasil.",
    ],
  },
  {
    slug: "str-bukan-sip",
    title: "STR habis tidak otomatis sama dengan SIP",
    description: "Dua dokumen yang sering tertukar saat panik perpanjangan.",
    minutes: 4,
    publishedAt: "2026-11-10",
    paragraphs: [
      "Surat Tanda Registrasi dan Surat Izin Praktik hidup berdampingan, tetapi tidak saling memperbarui. STR yang baru terbit tidak berarti SIP ikut panjang. SIP yang masih tertera aktif juga tidak menambal STR yang sudah lewat tanggal.",
      "Saat panik, orang cenderung membawa dokumen yang paling mudah ditemukan. Itu sebabnya peta persiapan memisahkan keduanya. Kamu perlu tahu mana yang ada di laci, mana yang sedang proses, dan mana yang tidak kamu ingat.",
      "Kalau status SIP tidak jelas, tugas pertama bukan mengarang di formulir. Cari salinan, tanya bagian yang menyimpan arsip praktik, lalu tulis status yang bisa kamu tunjukkan.",
      "Portal resmi tetap yang menentukan berkas mana yang diminta tahun ini. Catatan di situs ini hanya supaya dua dokumen itu tidak tertukar di kepala.",
    ],
  },
  {
    slug: "skp-sebelum-minggu-terakhir",
    title: "Kredit SKP jangan dikumpulkan di minggu terakhir",
    description: "Cara memakai angka yang kamu ingat tanpa menganggapnya syarat resmi.",
    minutes: 5,
    publishedAt: "2026-11-10",
    paragraphs: [
      "Sertifikat yang tersimpan di chat biasanya tidak tersusun. Judul pelatihan, tanggal, dan penyelenggara tercecer. Saat portal meminta unggahan, kamu baru sadar ada yang buram atau dobel.",
      "Catat dulu jumlah yang benar-benar kamu pegang. Angka itu adalah inventaris, bukan pengumuman bahwa syarat sudah terpenuhi. Syarat angka ada di halaman resmi pada hari kamu mengajukan, dan bisa berbeda dari cerita senior.",
      "Kalau inventarismu tipis sementara tanggal habis sudah dekat, urutan kerjanya berubah: cari salinan yang sah, baru rapikan yang sudah ada. Kalau inventarismu sudah berisi, kerja yang tersisa adalah membuang duplikat dan menamai berkas.",
      "Isyarat di rencana minggu memakai ambang sederhana supaya kamu tidak menunda. Ambang itu bukan kutipan peraturan. Bandingkan lagi sebelum menekan kirim.",
    ],
  },
  {
    slug: "surat-tempat-praktik",
    title: "Surat tempat praktik sering lebih lama dari unggahan",
    description: "Mengapa antrean tanda tangan perlu dimulai sebelum map digital rapi.",
    minutes: 4,
    publishedAt: "2026-11-10",
    paragraphs: [
      "Unggah berkas bisa selesai dalam satu malam. Tanda tangan direktur, kepala puskesmas, atau penanggung jawab klinik tidak begitu. Kalender mereka tidak mengikuti tanggal di STR-mu.",
      "Minta surat selagi identitas dan pas foto masih dikerjakan, bukan sesudah semuanya rapi. Di rumah sakit, sebutkan bahwa yang dibutuhkan adalah keterangan masih bertugas untuk perpanjangan STR, supaya salah formulir tidak bolak-balik.",
      "Praktik mandiri butuh jejak tempat yang bisa ditunjukkan, plus apa yang diminta organisasi profesi setempat. Jangan meniru kalimat surat rumah sakit jika alamat praktikmu berbeda.",
      "Simpan versi bertanda tangan. Tangkapan layar percakapan meminta surat belum cukup saat pemeriksa meminta berkas.",
    ],
  },
  {
    slug: "setelah-nomor-permohonan",
    title: "Setelah nomor permohonan muncul",
    description: "Apa yang dicatat supaya kamu tidak mengulang panik yang sama.",
    minutes: 3,
    publishedAt: "2026-11-10",
    paragraphs: [
      "Nomor permohonan adalah bukti bahwa kamu sudah mengirim, bukan bukti bahwa STR baru sudah terbit. Simpan nomor itu di catatan yang sama dengan tanggal habis yang lama.",
      "Selama menunggu, jangan membuang STR lama. Pemeriksa atau SDM bisa meminta perbandingan. Simpan juga tangkapan syarat portal pada hari unggah, karena halaman itu bisa berubah.",
      "Saat STR baru terbit, baca tanggalnya pelan-pelan, lalu cek SIP. Dua masa berlaku yang berbeda berarti dua pengingat.",
      "Kalau pengajuan ditolak karena berkas, perbaiki item yang disebut, bukan seluruh map sekaligus. Catatan penolakan lebih berguna daripada mengulang dari nol tanpa dibaca.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
