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
    slug: "kapan-minta-dp",
    title: "Kapan freelancer harus minta DP, bukan setelah file kelar",
    description: "Uang muka bukan curiga berlebihan. DP adalah pintu yang membuat klien tetap ada sampai proyek selesai.",
    publishedAt: "2026-11-02",
    minutes: 4,
    paragraphs: [
      "Banyak freelancer membuka laptop karena brief-nya terdengar seru. Yang belum disepakati justru hal yang menahan klien: berapa yang ditransfer sebelum kerja dimulai. Tanpa angka itu, semangat di chat tidak sama dengan komitmen.",
      "Minta DP sebelum kickoff, bukan setelah draf pertama. Draf yang sudah dilihat mudah dibanding-bandingkan, ditawar, atau dibiarkan menggantung. Dana yang sudah masuk membuat kedua pihak menghitung waktu dengan lebih jujur.",
      "Angka yang biasa dipakai di proyek kreatif kecil adalah 40 sampai 50 persen untuk pekerjaan yang hasilnya baru kelihatan di akhir. Kalau proyek panjang, pecah lagi: muka, tengah setelah konsep dikunci, dan sisa sebelum file final dikirim.",
      "Kalau klien berkata DP menyusul minggu depan, tawarkan jadwal mulai yang ikut mundur. Jangan mengisi jeda itu dengan ‘sekadar sketch’. Sketch adalah kerja. Tuliskan tanggal transfer dan tanggal mulai dalam kalimat yang sama.",
      "DP tidak menggantikan kontrak, tapi tanpa DP kontrak pun sering tidak sempat dibuka. Kunci urutannya: lingkup singkat, angka muka, dana masuk, baru produksi.",
    ],
  },
  {
    slug: "kontrak-minimum-satu-halaman",
    title: "Kontrak minimum satu halaman sebelum kamu membuka file kerja",
    description: "Kamu tidak butuh perjanjian tebal untuk menolak kerja menggantung. Satu halaman yang menyebut hasil, revisi, dan bayaran sudah mengubah posisi tawar.",
    publishedAt: "2026-11-03",
    minutes: 5,
    paragraphs: [
      "Chat yang ramah terasa cukup sampai klien menghilang. Satu halaman lingkup kerja bukan gaya pengacara. Itu catatan bersama supaya ‘nanti saja’ punya batas.",
      "Halaman itu cukup memuat lima hal: hasil yang dikirim, hal yang tidak termasuk, jumlah putaran revisi, jadwal bayar, dan apa yang terjadi jika transfer telat. Kalimatnya boleh sehari-hari, asal angkanya spesifik.",
      "Sebut juga cara proyek berhenti. Misalnya produksi jeda jika DP belum masuk dalam tiga hari, atau jika brief baru muncul di luar lingkup. Berhenti yang tertulis lebih mudah daripada debat di menit terakhir.",
      "Kirim halaman itu sebelum kamu mengerjakan apa pun yang bisa dipakai klien. Logo setengah jadi, naskah kasar, dan moodboard tetap bernilai. Jangan menukarnya dengan janji yang belum ditandatangani, meski tandanya hanya balasan ‘setuju’.",
      "Kalau klien keberatan karena ‘proyeknya kecil’, kecilkan halaman itu, jangan hilangkan isinya. Proyek kecil justru yang paling sering tidak dibayar, karena jumlahnya terasa sepele sampai menumpuk.",
    ],
  },
  {
    slug: "revisi-tanpa-batas",
    title: "Revisi tanpa batas adalah cara pelan membuat proyek tidak selesai",
    description: "Dua putaran di lingkup yang sama melindungi kamu. Revisi tak terbatas membuat sisa pembayaran ikut tidak terbatas.",
    publishedAt: "2026-11-04",
    minutes: 4,
    paragraphs: [
      "Kalimat ‘revisi santai saja’ terdengar murah hati di awal. Di minggu ketiga, brief sudah bergeser tiga kali dan pelunasan masih menunggu ‘versi yang pas’. Yang habis bukan hanya waktu, tapi tanggal kamu bisa menutup invoice.",
      "Batasi revisi dengan dua angka: berapa putaran, dan apa yang masih dihitung putaran yang sama. Mengganti warna di dalam konsep yang sudah disetujui adalah revisi. Mengganti audiens, ukuran, atau tujuan kampanye adalah pekerjaan baru.",
      "Tulis juga jam berlakunya catatan. Masukan yang masuk setelah tanggal review tidak membuka putaran gratis. Tanpa tanggal, klien bisa mengirim catatan tengah malam dan menganggap besok paginya masih termasuk.",
      "Kalau klien memang butuh eksplorasi panjang, juakan tahap konsep secara terpisah. Bayar dulu untuk mencari arah, lalu bayar lagi untuk produksi. Mencampur keduanya dalam satu harga tetap adalah undangan revisi tanpa ujung.",
      "Menolak revisi keempat bukan sikap kaku. Itu menjaga hasil pertama tetap berharga, dan menjaga klien dari rasa bahwa semua versi sama-sama belum final.",
    ],
  },
  {
    slug: "chat-tengah-malam",
    title: "Chat yang hanya hidup tengah malam bukan tanda klien serius",
    description: "Jam satu dini hari terasa mendesak. Besok paginya pesan itu sering tidak ditindaklanjuti dengan transfer.",
    publishedAt: "2026-11-05",
    minutes: 4,
    paragraphs: [
      "Freelancer malam terbiasa membalas cepat karena takut kesempatan hilang. Klien yang hanya muncul lewat tengah malam memanfaatkan ritme itu. Keputusan soal uang yang diambil saat mengantuk jarang lengkap.",
      "Perhatikan apakah isi chatnya maju. Brief yang diulang, emoji yang banyak, dan janji ‘besok transfer’ tanpa nomor rekening di pihak kamu adalah gerak di tempat. Keseriusan kelihatan dari DP dan lingkup, bukan dari kecepatan membalas jam 00.40.",
      "Pasang jendela balas, lalu patuhi sendiri. Kamu bisa membaca pesan malam itu, tetapi membalasnya besok di jam kerja dengan satu pertanyaan: kapan DP ditransfer dan kapan kerja dimulai. Urgensi semu akan turun dengan sendirinya.",
      "Jangan mengerjakan ‘biar ada yang dikirim pagi’ hanya karena chatnya mendesak. File yang terkirim sebelum dana masuk menjadi alasan baru untuk menunda, karena klien sudah melihat arahnya.",
      "Kalau pola tengah malam berulang di klien yang sama, masukkan jam komunikasi ke halaman lingkup. Kerja yang sehat butuh jam yang bisa kamu pertahankan minggu depan, bukan hanya malam ini.",
    ],
  },
  {
    slug: "janji-exposure",
    title: "Janji exposure bukan alasan untuk mulai tanpa transfer",
    description: "Portofolio yang belum dibayar tetap mengambil slot minggu kamu. Eksposur tidak bisa dipakai membayar alat dan waktu.",
    publishedAt: "2026-11-06",
    minutes: 4,
    paragraphs: [
      "Ada klien yang membuka dengan pujian, lalu menutup dengan ‘nanti kami sebut namamu’. Pujian itu menyenangkan. Yang perlu dihitung adalah apakah ada transfer sebelum kamu memproduksi sesuatu yang bisa mereka pakai.",
      "Exposure sulit diverifikasi di depan. Jumlah pengikut, janji kolaborasi, dan ‘proyek ini besar’ tidak mengubah biaya waktumu minggu ini. Kalau manfaatnya nyata, klien tetap bisa membayar kecil sebagai DP, bukan menukar seluruh fee dengan sebutan nama.",
      "Sampel gratis masuk keluarga yang sama. Meminta satu posting percobaan, satu sketsa logo, atau satu paragraf contoh adalah pekerjaan. Kamu boleh menolak dan menawarkan paket uji berbayar dengan batas waktu yang pendek.",
      "Tulis penolakan yang pendek. Kamu tidak perlu menjelaskan seluruh tarif. Cukup katakan kamu mulai setelah DP masuk, dan exposure bisa ditambahkan di samping pembayaran, bukan sebagai gantinya.",
      "Slot minggu yang diberikan gratis pada klien samar adalah slot yang tidak bisa kamu jual pada klien yang sudah siap transfer. Menjaga slot itu sama pentingnya dengan menjaga nada bicara yang sopan.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
