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
    slug: "visa-wisata-bukan-izin-kerja",
    title: "Visa wisata yang dijanjikan untuk kerja bukan jalur berangkat",
    description: "Janji gaji lewat visa kunjungan atau umrah adalah alasan untuk berhenti, bukan untuk berangkat lebih dulu.",
    publishedAt: "2026-05-04",
    minutes: 5,
    paragraphs: [
      "Banyak tawaran di chat berbunyi singkat: negara sudah ada, kerja sudah ada, visa-nya wisata dulu biar cepat. Keluarga yang mendengar angka gaji sering menganggap visa hanya urusan teknis. Untuk kerja di luar negeri, jenis visa adalah bagian dari izin tinggal, bukan tempelan.",
      "Visa kunjungan dibuat untuk berkunjung. Visa umrah dibuat untuk ibadah. Keduanya bukan izin untuk masuk pabrik, kebun, atau rumah tangga sebagai pekerja. Kalau orang yang menawari sudah mencampur janji kerja dengan visa itu, tahan keberangkatan.",
      "Kamu tidak perlu berdebat pasal visa di warung. Cukup minta jenis visa disebut tertulis, lalu cocokkan nama penyalurnya di cek legalitas Migran Aman. Lowongan yang sah tampil di akun SISKOP2MI milikmu, bukan hanya di tangkapan layar.",
      "Kalau paspor sudah diminta “biar visanya diuruskan”, itu alasan tambahan untuk tidak menyerahkan buku itu. Urus pertanyaanmu dulu di kanal resmi. Berangkat bisa ditunda. Paspor yang sudah lepas tangan lebih sulit ditarik.",
      "TawaranAman membaca isian seperti ini sebagai tanda bahaya. Laporannya bukan surat resmi pemerintah. Status penyalur tetap duduk di KP2MI.",
    ],
  },
  {
    slug: "uang-di-muka-dan-pinjaman-calo",
    title: "Uang di muka dan pinjaman sebelum berangkat",
    description: "Biaya yang diminta sebelum status penempatan resmi, apalagi lewat utang, layak ditahan dulu.",
    publishedAt: "2026-05-08",
    minutes: 4,
    paragraphs: [
      "Ongkos penempatan memang bisa ada. Yang berbahaya adalah urutannya: transfer dulu, atau tanda tangan utang dulu, baru nanti namamu “dimasukkan”. Keluarga yang sedang butuh kerja mudah percaya karena angkanya terasa seperti satu-satunya pintu.",
      "Catat jumlah yang disebut dan kapan harus dibayar. Jangan mengirimnya hanya karena takut kuota ditutup malam ini. Kuota yang hanya hidup di chat tidak bisa kamu cek. Yang bisa kamu cek adalah nama badan usaha di Migran Aman dan lowongan di akunmu sendiri.",
      "Pinjaman dari orang yang sekaligus mencari kerja membuat kamu berutang sebelum gaji pertama ada. Tolak dengan kalimat pendek: uang dan utang ditahan sampai penempatan resmi. Kamu tidak harus menjelaskan seluruh isi dompet.",
      "Potongan gaji yang disebut di depan juga perlu tertulis di perjanjian, lengkap dengan jabatan dan negara. Angka di suara tidak sama dengan angka di kertas yang kamu pegang.",
      "Alat ini tidak menghitung gaji yang pantas dan tidak membandingkan upah. Pertanyaannya hanya: apakah tawaran yang ada di depanmu sudah aman untuk dijawab ya.",
    ],
  },
  {
    slug: "ijazah-dan-paspor-tetap-di-rumah",
    title: "Ijazah asli dan paspor tidak dititipkan",
    description: "Dokumen asli yang ditahan membuat kamu sulit menolak. Fotokopi cukup untuk diperiksa.",
    publishedAt: "2026-05-12",
    minutes: 4,
    paragraphs: [
      "Permintaan yang terdengar sopan sering berbunyi: ijazah asli dititip dulu sebagai jaminan, paspor diuruskan biar kamu tidak repot. Di telinga keluarga, itu terdengar seperti bantuan. Di praktik yang aman, dokumen asli tetap di rumah.",
      "Ijazah bisa diperiksa lewat salinan. Paspor adalah dokumen perjalananmu. Begitu buku itu tidak di tanganmu, kamu lebih sulit membatalkan, pulang, atau menjelaskan kepada keluarga apa yang sedang terjadi.",
      "Kalau penyalur resmi membutuhkan berkas, tanyakan persis nama berkas dan apakah aslinya hanya ditunjukkan lalu dikembalikan di tempat. Janji “nanti dikembalikan setelah berangkat” bukan jadwal yang bisa kamu pegang.",
      "Sampaikan ke keluarga di rumah agar tidak ada yang menyerahkan amplop berisi ijazah saat kamu sedang di luar. Satu kalimat cukup: aslinya tidak keluar rumah.",
      "Tanda ini, apalagi digabung dengan biaya di muka, membuat pita di TawaranAman naik ke bahaya. Itu pengingat untuk berhenti, bukan vonis pengadilan.",
    ],
  },
  {
    slug: "akun-siskop2mi-milik-sendiri",
    title: "Lowongan dilihat dari akun SISKOP2MI milik sendiri",
    description: "Tangkapan layar dari akun orang lain tidak sama dengan status penempatanmu.",
    publishedAt: "2026-05-16",
    minutes: 5,
    paragraphs: [
      "Seseorang bisa menunjukkan layar ponsel dan berkata lowongan sudah masuk. Layar itu tidak membuktikan bahwa namamu yang terdaftar. Akun resmi harus kamu buka sendiri, dengan kata sandi yang tidak kamu berikan ke orang lain.",
      "Daftar di SISKOP2MI dari ponselmu. Kalau nama penyalur dan negara tujuan tidak ada di sana, tawaran di WhatsApp masih berupa cerita. Migran Aman dipakai untuk mencocokkan apakah nama badan usaha itu memang terdaftar.",
      "Jangan mengirim foto KTP, kartu keluarga, atau kata sandi hanya supaya “akunnya dibuatkan”. Akun yang dibuatkan orang lain membuat kamu tidak melihat perubahan status.",
      "P3MI yang namanya lolos cek legalitas tetap perlu cocok dengan lowongan di akunmu. Nama yang terdaftar tidak membuat setiap chat atas nama mereka otomatis benar.",
      "Langkah ini gratis di situs resmi. Laporan berbayar di situs ini hanya merangkai isianmu menjadi pita, daftar tanda, dan kalimat tolak. Ia tidak menggantikan kedua situs itu.",
    ],
  },
  {
    slug: "menolak-calo-tanpa-berdebat",
    title: "Menolak calo dengan sopan, tanpa berdebat panjang",
    description: "Kamu tidak perlu membuktikan niat orang lain. Cukup tahan dokumen, tahan uang, dan hentikan pembicaraan dengan keluarga.",
    publishedAt: "2026-05-20",
    minutes: 4,
    paragraphs: [
      "Menolak di desa atau di grup keluarga sering terasa tidak sopan, karena yang menawari adalah kenalan. Sopan dan setuju adalah dua hal yang berbeda. Kamu bisa berterima kasih, lalu menyatakan tidak lanjut.",
      "Pesan yang pendek lebih mudah dikirim daripada ceramah. Sebut tiga batas: tidak lanjut lewat jalur ini, dokumen asli tidak dititip, uang tidak ditransfer. Tambahkan bahwa keluarga tidak perlu dihubungi lagi.",
      "Jangan menuliskan tuduhan berat di chat. Kamu tidak sedang mengadili orang itu. Kamu sedang menjaga paspor dan ijazah. Kalau suasana sudah menekan atau kamu takut, hubungi 112 atau polisi setempat, dan kabari keluarga yang kamu percaya.",
      "Simpan bukti percakapan untuk dirimu, tanpa menyebarkannya ke grup. Menyebarkan nomor dan nama ke banyak orang tidak membuatmu lebih aman.",
      "Setelah mengirim pesan, buka Migran Aman dan akunmu sendiri. Keputusan ya atau tidak baru punya pijakan kalau kedua cek itu sudah kamu lakukan, bukan karena seseorang mendesak malam ini.",
    ],
  },
];
