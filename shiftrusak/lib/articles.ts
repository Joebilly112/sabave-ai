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
    slug: "flip-malam-ke-pagi",
    title: "Kenapa dinas malam lalu pagi terasa seperti jet lag",
    description: "Perpindahan langsung dari malam ke pagi membuat tubuh belum selesai menyesuaikan jam tidur.",
    publishedAt: "2026-11-10",
    minutes: 4,
    paragraphs: [
      "Perawat yang baru selesai dinas malam lalu besoknya masuk pagi sering merasa seperti baru turun dari pesawat. Mata perih, mudah tersinggung, dan serah terima terasa lebih panjang dari biasanya. Itu bukan karena kamu kurang kuat. Jam tubuh masih mengira ini waktu tidur.",
      "Flip yang paling berat adalah malam langsung ke pagi, tanpa libur di antaranya. Siang setelah malam masih melelahkan, tapi biasanya lebih lunak karena ada jeda sebelum matahari tinggi. Kalau roster menempelkan dua dinas itu, catat tanggalnya. Angka itu yang nanti kamu bawa, bukan keluhan yang mengambang.",
      "ShiftRusak menghitung berapa kali pola itu muncul dalam 14 hari, lalu menyarankan slot yang sebaiknya dilindungi supaya pagi tidak menempel malam lagi. Skornya membaca isianmu. Ia bukan pemeriksaan dokter dan tidak menggantikan kebijakan rumah sakit.",
      "Kalau kepala terasa berputar, dada sesak, atau kamu hampir tertidur saat merawat pasien, berhenti sejenak dan minta bantuan rekan yang sedang dinas. Alat ini hanya membantu menyusun permintaan roster, bukan menangani keadaan darurat.",
    ],
  },
  {
    slug: "baca-roster-14-hari",
    title: "Cara membaca 14 hari dinas sebelum bicara ke kepala ruangan",
    description: "Satu blok dua minggu cukup untuk melihat flip, malam berturut, dan hari libur yang benar-benar jadi jeda.",
    publishedAt: "2026-11-09",
    minutes: 5,
    paragraphs: [
      "Satu minggu sering kebetulan. Dua minggu mulai kelihatan polanya: berapa malam, apakah malam selalu disusul pagi, dan apakah libur benar-benar kosong atau hanya ganti nama.",
      "Tulis dinas apa adanya. Pagi, siang, malam, atau libur. Jangan digabung jadi “dinas panjang”. Kepala ruangan membaca roster per slot, jadi permintaanmu juga harus per slot.",
      "Lihat tiga hal sebelum menyusun kalimat. Pertama, berapa kali malam langsung ketemu pagi. Kedua, berapa malam berturut-turut tanpa putus. Ketiga, apakah setelah malam ada libur, atau kamu langsung commute lalu tidur sebentar dan bangun untuk pagi.",
      "Permintaan yang jelas terdengar seperti ini: “Jangan jadwalkan pagi besok setelah malam, dan potong blok di malam ketiga.” Permintaan yang sulit ditindaklanjuti terdengar seperti: “Saya capek terus.” Keduanya bisa jujur. Hanya yang pertama yang bisa ditulis di roster.",
      "Usulan tujuh hari di hasil ShiftRusak adalah bahan bicara, bukan jadwal yang sudah disahkan. Rumah sakit tetap yang menentukan dinas.",
    ],
  },
  {
    slug: "kopi-di-dinas-malam",
    title: "Kopi di dinas malam dan tidur yang tidak pulih",
    description: "Gelas ketiga sering terasa menolong di jam 02.00, lalu menggeser tidur setelah kamu sampai rumah.",
    publishedAt: "2026-11-08",
    minutes: 4,
    paragraphs: [
      "Kopi di awal dinas malam memang menahan kantuk. Masalahnya biasanya gelas yang diminum terlalu dekat dengan waktu pulang. Badan sampai rumah, tapi mata tetap terbuka, lalu besoknya pagi datang lebih cepat dari tidurmu.",
      "ShiftRusak menanyakan jumlah gelas pada dinas biasa, bukan supaya menghakimi kopi. Angka itu dipakai bersama jam tidur dan jumlah malam. Empat gelas pada pekan yang penuh malam menaikkan skor lebih tinggi daripada empat gelas di pekan yang hampir semuanya pagi.",
      "Coba pindahkan gelas terakhir ke paruh awal dinas. Catat apakah kamu lebih mudah tidur setelah sampai rumah. Kalau jantung berdebar atau kepala berdenyut, centang gejala itu di formulir supaya skor tidak hanya melihat roster.",
      "Ini bukan anjuran berhenti kopi, dan bukan pengobatan. Kalau keluhan tubuh mengganggu dinas, bicara ke layanan kesehatan yang kamu percaya, terpisah dari permintaan roster.",
    ],
  },
  {
    slug: "naskah-kepala-ruangan",
    title: "Kalimat yang bisa diucapkan ke kepala ruangan",
    description: "Minta jeda setelah malam tanpa membahas gaji dan tanpa mengaku sakit yang belum diperiksa.",
    publishedAt: "2026-11-07",
    minutes: 4,
    paragraphs: [
      "Kepala ruangan mengatur slot, bukan perasaan. Kalimat yang membantu adalah kalimat yang menyebut tanggal, jenis dinas, dan batas yang kamu minta. Misalnya: paling banyak dua malam berturut, dan hari setelah malam bukan pagi.",
      "Hindari membuka dengan gaji, perbandingan rekan, atau diagnosis yang kamu buat sendiri. Tiga hal itu menggeser pembicaraan. Yang kamu butuhkan di ruangan itu adalah perubahan roster, bukan sidang.",
      "Naskah di ShiftRusak disusun dari angkamu: jumlah flip, jumlah malam, jam tidur, dan menit commute. Kamu boleh memendekkannya. Yang penting tiga permintaan tetap utuh: jangan tempel pagi setelah malam, batasi blok malam, dan sebut slot yang dilindungi.",
      "Kalau jawaban ruangan adalah “minggu ini tidak bisa”, minta ditulis untuk roster berikutnya, bukan berdebat di depan pasien. Bawa usulan tujuh hari supaya pembicaraan punya bentuk.",
    ],
  },
  {
    slug: "commute-setelah-malam",
    title: "Pulang dinas malam: commute dan sinyal tubuh yang dicatat",
    description: "Perjalanan pulang setelah malam ikut menggerus sisa tidur, terutama kalau rumah jauh dari rumah sakit.",
    publishedAt: "2026-11-06",
    minutes: 4,
    paragraphs: [
      "Dinas malam tidak selesai di pintu rumah sakit. Commute 70 menit berarti kamu baru berbaring jauh setelah serah terima. Kalau besoknya pagi, sisa tidur bisa tinggal beberapa jam.",
      "Isi commute dengan menit sekali jalan, bukan dengan keluhan macet secara umum. Angka yang sama akan terasa lebih berat bila pekan itu banyak malam. Karena itu skor menaikkan bobot commute ketika ada dinas malam, dan merendahkannya bila 14 hari itu tidak ada malam sama sekali.",
      "Sinyal yang layak dicatat: ngantuk berat di tengah dinas, mudah marah, sakit kepala setelah ganti shift, jantung berdebar setelah kopi, sulit tidur sesampai rumah, mual, konsentrasi drop saat serah terima, dan mood yang jatuh justru di hari libur.",
      "Centang hanya yang benar-benar kamu alami pada dua minggu itu. Skor bukan tes kepribadian. Ia hanya menyusun pola supaya permintaan ke kepala ruangan punya bukti dari rostermu sendiri.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
