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
    slug: "jam-setahun-di-kendaraan",
    title: "Berapa jam setahun yang habis di perjalanan",
    description: "Cara mengubah menit sekali jalan menjadi jam setahun, tanpa mencampur jam itu dengan jam kerja.",
    publishedAt: "2026-11-08",
    minutes: 6,
    paragraphs: [
      "Satu jam di kereta terasa seperti harga biasa supaya tetap bisa masuk kantor. Yang jarang dijumlahkan adalah ulangannya. Satu jam sekali jalan, lima hari seminggu, lima puluh dua minggu, sudah sekitar 520 jam pulang-pergi dalam setahun. Sembilan puluh menit sekali jalan mendekati 780 jam. Dua jam sekali jalan melewati 1.000 jam.",
      "Survei Komuter BPS 2023 mencatat 3,61 juta orang di Jabodetabek menyeberang batas kota atau kabupaten untuk bekerja. Liputan Kompas dari survei yang sama menyebut 35,5 persen komuter menempuh sedikitnya satu jam. KRL Commuter Line sendiri mengangkut rata-rata 951.111 penumpang per hari pada Januari–November 2025. Angka-angka itu menjelaskan kenapa pertanyaan ini terasa ramai, bukan kenapa tubuhmu harus kuat.",
      "Jam di jalan tidak sama dengan jam kerja. Kamu tidak dibayar untuk berdiri, menahan motor, atau menunggu ganti. Karena itu Capek di Jalan memisahkan jam setahun dari skor beban. Jam menjawab berapa lama. Skor menjawab apakah menit itu disertai berdiri, tidur yang pendek, dan akhir pekan yang tidak memulihkan.",
      "Hitungan di hasil memakai lima hari kerja dan tidak mengurangi cuti. Kalau kamu kerja empat hari, angka jam itu terlalu tinggi. Kalau kamu sering lembur sampai malam, angka jam itu terlalu rendah. Keduanya tetap bisa dibaca: ubah menit dan jam pulang, lalu lihat pita skornya bergeser atau tidak.",
      "Menulis menit pintu-ke-pintu lebih jujur daripada menit di peta. Peta sering berhenti di stasiun. Badanmu masih berjalan ke halte, menunggu, dan berjalan lagi dari stasiun ke rumah.",
    ],
  },
  {
    slug: "berdiri-di-krl-dan-leher",
    title: "Berdiri, duduk, dan ganti di stasiun padat",
    description: "Menit yang sama terasa berbeda kalau kamu berdiri atau dua kali berganti kendaraan.",
    publishedAt: "2026-11-08",
    minutes: 5,
    paragraphs: [
      "Lima puluh menit duduk dan lima puluh menit berdiri sama-sama lima puluh menit di kolom waktu. Bahunya tidak sama. Berdiri menahan goyangan, tas, dan pengereman. Duduk masih melelahkan, tapi beban itu lebih dekat ke bosan dan jam daripada ke punggung.",
      "Ganti kendaraan menambah beban yang tidak selalu tertulis di menit. Kamu turun, berjalan, naik lagi, dan sering kehilangan tempat duduk. Di jalur yang padat, satu ganti di stasiun besar bisa terasa seperti perjalanan kedua. Nama seperti Manggarai muncul karena banyak orang mengenali antreannya, bukan karena setiap komuter melewati stasiun itu.",
      "Capek di Jalan menanyakan postur dan jumlah ganti karena dua hal itu mengubah skor tanpa mengubah rumus jam. Moda juga dicatat. Motor menambah keseimbangan dan hujan. Ojol mengurangi mengemudi, tapi tidak menghapus menunggu. Mobil tetap duduk di dalam macet.",
      "Keluhan punggung atau leher yang kamu isi adalah laporan rasa, bukan hasil pemeriksaan. Alat ini tidak menyimpulkan saraf terjepit atau menyarankan obat. Kalau nyeri menetap, memburuk, atau datang bersama sesak dan pusing yang mengganggu aktivitas, itu urusan tenaga kesehatan, di luar skor.",
      "Selama dua minggu, target yang masuk akal sering kali kecil: satu penggal perjalanan yang diduduki, atau satu ganti yang dihindari. Bukan rute baru yang sempurna.",
    ],
  },
  {
    slug: "alarm-subuh-dan-sisa-tidur",
    title: "Alarm subuh memotong tidur, bukan hanya menambah menit",
    description: "Jam berangkat sebelum terang mengubah sisa hari, termasuk suasana saat sampai di rumah.",
    publishedAt: "2026-11-09",
    minutes: 6,
    paragraphs: [
      "Berangkat jam lima lebih sepuluh berarti alarm berbunyi ketika rumah masih gelap. Menit di kendaraannya mungkin tujuh puluh. Yang hilang lebih dulu adalah tidur. Karena itu isian Capek di Jalan menanyakan jam berangkat dan jam tidur secara terpisah.",
      "Tidur di bawah enam jam tidak otomatis berarti seseorang sakit. Tidur itu membuat perjalanan yang sama lebih menguras, dan membuat akhir hari lebih pendek untuk makan tenang. Suasana saat sampai — masih segar, datar, habis, atau mudah tersulut — adalah cara sederhana mencatat sisa tenaga.",
      "Pulang setelah jam tujuh malam memperkecil jeda sebelum tidur berikutnya. Kalau jarak antara berangkat dan sampai rumah lebih dari tiga belas jam, badan menyimpan hari yang panjang itu walaupun sebagian di antaranya adalah kerja, bukan macet.",
      "Akhir pekan yang tidak memulihkan adalah sinyal yang berbeda dari satu hari yang melelahkan. Satu Senin yang berat bisa karena hujan. Senin yang selalu berat berarti pola hari kerja tidak kembali ke nol.",
      "Rencana tidur di hasil, kalau tidurmu pendek, hanya menambah sekitar tiga puluh menit dan mematikan layar sebelum tidur. Itu pengaturan rumah tangga selama empat belas hari, bukan program medis.",
    ],
  },
  {
    slug: "rencana-14-hari-bukan-obat",
    title: "Rencana 14 hari mengatur jadwal, bukan mengobati",
    description: "Apa yang boleh diharapkan dari reset dua minggu, dan apa yang harus dibawa ke tenaga kesehatan.",
    publishedAt: "2026-11-09",
    minutes: 5,
    paragraphs: [
      "Skor ringan, berat, atau bahaya adalah pita beban dari isianmu. Pita bahaya berarti polanya sudah mengambil pemulihan, bukan berarti kamu mendapat diagnosis. Capek di Jalan tidak mengenal rekam medis dan tidak boleh dibaca sebagai surat keterangan.",
      "Rencana dua minggu punya empat pintu: jam berangkat, cara duduk atau berhenti, tidur, dan satu permintaan ke kantor. Semuanya bisa dicoba tanpa pindah rumah dan tanpa mengubah gaji. Kalau setelah dua minggu nyeri tetap atau napas terasa tidak biasa, berhenti mengandalkan rencana ini dan periksakan diri.",
      "Menggeser alarm tiga puluh menit hanya masuk akal kalau kantor punya jendela kedatangan. Kalau tidak, rencana yang jujur adalah menyiapkan tas pada malam sebelumnya supaya pagi tidak menambah kepanikan di atas perjalanan yang sudah panjang.",
      "Istirahat mikro di jalan — tiga menit menurunkan bahu, atau menunggu rangkaian berikutnya supaya bisa duduk — terlihat sepele. Itu memang sepele. Tujuannya mengurangi satu beban terbesar, bukan menghapus komuter Jabodetabek.",
      "Simpan tautan hasilmu. Isian tidak perlu diulang kalau kamu hanya ingin membaca lagi tiga beban dan empat langkahnya.",
    ],
  },
  {
    slug: "permintaan-ke-kantor-yang-bukan-gaji",
    title: "Satu permintaan ke kantor yang bukan tentang gaji",
    description: "Cara meminta jendela kedatangan atau satu hari dari rumah dengan jam perjalanan yang konkret.",
    publishedAt: "2026-11-10",
    minutes: 5,
    paragraphs: [
      "Banyak komuter menelan perjalanan karena merasa satu-satunya permintaan yang sah adalah naik gaji. Capek di Jalan tidak menghitung gaji dan tidak menyarankan tawaran gaji. Permintaan yang cocok dengan alat ini adalah soal jam dan napas.",
      "Kalimat yang bisa dipakai: saya menempuh sekian menit sekali jalan dan berangkat pada jam sekian. Saya minta jendela kedatangan tiga puluh menit, atau rapat pertama tidak dimulai pada menit saya sampai. Angkanya datang dari isianmu, jadi tidak mengambang.",
      "Satu hari kerja dari rumah dalam sebulan, kalau peranmu memungkinkan, memotong empat puluh perjalanan dalam hitungan kasar sepuluh bulan. Itu tidak menghapus empat hari lainnya. Itu memberi satu hari saat punggung tidak ikut serta.",
      "Kalau pita skor masih ringan, kamu tidak harus menegosiasikan apa pun. Permintaan kecil yang cukup adalah rapat pagi tidak menempel pada waktu sampai. Kalau pita sudah berat atau bahaya, satu permintaan konkret lebih berguna daripada keluhan umum bahwa perjalanan melelahkan.",
      "Atasan bisa menolak. Penolakan itu tidak mengubah jam setahun di jalan. Yang masih bisa diatur di rumah adalah tas malam hari, satu penggal duduk, dan jam tidur. Kantor hanya salah satu dari empat langkah.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
