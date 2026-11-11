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
    slug: "jangan-buka-akun-kedua",
    title: "Jangan buka akun kedua saat akun utama terkunci",
    description: "Akun cadangan terasa seperti jalan cepat. Untuk mitra, itu sering jadi alasan baru yang lebih berat.",
    publishedAt: "2026-05-04",
    minutes: 5,
    paragraphs: [
      "Begitu layar berubah merah, pikiran pertama sering bukan banding. Pikiran pertama adalah cara tetap dapat order hari ini. Akun kedua, nomor saudara, atau KTP teman terlihat seperti solusi sementara.",
      "Platform membaca pola itu sebagai pelanggaran baru, bukan sebagai mitra yang sedang panik. Akun cadangan yang ketahuan bisa menutup jalur klarifikasi akun pertama. Yang tadinya suspend sementara bisa bergerak ke putus mitra.",
      "Pemasukan hari ini memang berhenti. Itu menyakitkan. Menggeser order ke akun lain tidak mengembalikan akun utama, dan meninggalkan jejak yang sulit dijelaskan di formulir banding.",
      "Yang masih bisa dikerjakan di jam-jam pertama adalah menyimpan bukti dan mengirim satu berkas lewat kanal resmi. Pemasukan darurat, kalau memang perlu, carinya di luar aplikasi yang sama — bukan dengan menyamar sebagai mitra lain.",
      "Kalau seseorang di grup menawarkan akun jadi pakai, anggap itu risiko, bukan pertolongan. Tidak ada naskah banding yang bisa merapikan keputusan membuka akun kedua.",
    ],
  },
  {
    slug: "screenshot-dulu-baru-chat",
    title: "Screenshot dulu, baru chat pusat bantuan",
    description: "Chat yang terburu sering lebih dulu daripada bukti. Padahal layar suspend bisa bergeser.",
    publishedAt: "2026-05-08",
    minutes: 4,
    paragraphs: [
      "Notifikasi suspend tidak selalu tinggal di tempat yang sama. Ada yang tenggelam setelah aplikasi diperbarui, ada yang terganti pesan berikutnya. Kalau kamu chat dulu tanpa tangkapan layar, nanti kamu mengingat alasan dari ingatan.",
      "Tangkapan yang berguna memuat alasan, tanggal, dan tombol yang masih ada. Potongan yang hanya menampilkan kata ditangguhkan hampir tidak menjelaskan apa-apa.",
      "Catat juga ID order di sekitar jam itu. Kamu tidak perlu menempel nomor pelanggan. ID order dan jam sudah cukup untuk menunjuk kejadian.",
      "Satu berkas dengan lima lampiran biasanya lebih mudah ditinjau daripada dua belas chat pendek yang isinya sama. Pusat bantuan membaca antrean, bukan emosi di kalimat pembuka.",
      "Instal ulang aplikasi setelah bukti tersimpan, bukan sebelumnya. Menghapus cache bisa ikut menghapus pesan yang ingin kamu lampirkan.",
    ],
  },
  {
    slug: "sementara-permanen-putus-mitra",
    title: "Bedanya suspend sementara, permanen, dan putus mitra",
    description: "Tiga status itu tidak sama. Langkah 48 jam pertamanya juga tidak sama.",
    publishedAt: "2026-05-12",
    minutes: 5,
    paragraphs: [
      "Suspend sementara biasanya masih menyebut jangka waktu atau memberi tombol banding. Ruang geraknya ada, asal bukti dikirim sebelum waktu di layar habis. Mengira semua suspend sama membuat orang menunda yang seharusnya dikirim hari ini.",
      "Suspend permanen berarti akun tidak otomatis nyala setelah beberapa hari. Banding tetap mungkin kalau kanalnya masih terbuka, tetapi harapannya harus lebih rendah. Kata permanen di layar bukan tebakan grup.",
      "Putus mitra adalah status yang paling berat. Keputusan itu tidak diubah oleh cerita di grup atau janji orang yang mengaku kenal admin. Yang masih bisa dilakukan adalah satu pengajuan resmi, lalu menyiapkan pemasukan di luar platform.",
      "Isian di AkunSuspend memisahkan ketiganya karena daftar bukti dan nada naskahnya berbeda. Status yang kamu lihat di aplikasi lebih penting daripada status yang diceritakan teman satu pool.",
      "Kalau layar tidak memakai ketiga kata itu, salin teks persisnya. Menerjemahkan sendiri ke permanen atau putus mitra bisa membuat banding membahas status yang salah.",
    ],
  },
  {
    slug: "alasan-sistem-atau-pelanggaran",
    title: "Alasan sistem dan alasan pelanggaran tidak dilawan dengan cara yang sama",
    description: "Gangguan aplikasi butuh jejak error. Laporan keselamatan butuh kronologi yang jujur.",
    publishedAt: "2026-05-18",
    minutes: 4,
    paragraphs: [
      "Teks alasan di layar kadang pendek: sistem, saldo, atau pelanggaran. Dua kelompok itu minta lampiran yang berbeda. Mengirim cerita yang sama untuk semuanya membuat peninjau menebak.",
      "Kalau yang tampil terasa seperti gangguan aplikasi, lampirkan jam error, pesan di layar, dan apakah order lain di waktu yang sama juga aneh. Jangan mengubah pengaturan lokasi sebelum bukti itu tersimpan.",
      "Kalau teksnya menyangkut keselamatan, penipuan, atau kekerasan, jangan mencoba membuatnya terdengar lebih ringan. Tambahan yang tidak kamu alami mudah terbantah dan memperburuk berkas.",
      "Kamu tetap boleh menjelaskan konteks yang benar. Konteks bukan alasan untuk menyembunyikan peringatan sebelumnya. Jumlah peringatan yang kamu ingat lebih baik ditulis apa adanya.",
      "AkunSuspend tidak membaca data internal platform. Pita keparahan hanya menyusun isianmu supaya urutan 48 jam pertama tidak tercampur.",
    ],
  },
  {
    slug: "empat-puluh-delapan-jam-pertama",
    title: "48 jam pertama setelah akun terkunci",
    description: "Jam-jam awal menentukan apakah banding punya lampiran atau hanya kalimat panik.",
    publishedAt: "2026-05-22",
    minutes: 5,
    paragraphs: [
      "Dua jam pertama untuk bukti. Ambil tangkapan layar, catat order, dan jangan instal ulang. Panik biasanya ingin langsung mengetik. Mengetik tanpa lampiran hanya menghasilkan chat yang harus diulang.",
      "Dua belas jam berikutnya untuk kronologi. Lima sampai delapan kalimat cukup: apa yang tampil, jam berapa, bukti apa yang dilampirkan. Kalimat panjang tentang kebutuhan keluarga tidak mengganti ID order.",
      "Dalam dua puluh empat jam, kirim sekali lewat kanal di dalam aplikasi. Gojek lewat Pusat Bantuan pada layar suspend. Grab lewat Help Center pada pemberitahuan. Platform lain mengikuti tombol yang tertulis di layar itu, bukan nomor yang beredar.",
      "Sampai jam keempat puluh delapan, satu tindak lanjut menanyakan tiket. Setelah itu, mengirim pesan yang sama berulang jarang mengubah antrean. Gunakan sisa hari untuk pemasukan yang tidak memakai akun kedua.",
      "Kalau sisa waktu di layar tinggal satu hari atau sudah nol, urutannya tetap sama, hanya lebih padat. Tombol yang hilang tetap dicatat jamnya. Jangan mengarang tanggal baru.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
