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
    slug: "bangun-jam-empat",
    title: "Bangun jam empat: yang hilang bukan cuma tidur",
    description: "Perjalanan panjang menggeser jam makan, jam keluarga, dan jam berangkat. Begini cara menghitungnya sebelum memutuskan ngekos.",
    publishedAt: "2026-11-09",
    minutes: 6,
    paragraphs: [
      "Banyak komuter Jabodetabek berangkat saat langit masih gelap. Alarm jam empat terasa seperti harga yang wajar supaya tetap tinggal bersama keluarga. Yang jarang dihitung adalah sisa hari setelah sampai di rumah: mandi, makan, lalu langsung mengantuk.",
      "Survei Komuter BPS 2023 mencatat 3,61 juta orang di Jabodetabek menyeberang batas kota atau kabupaten untuk bekerja. Sebagian dari mereka menghabiskan satu jam atau lebih di jalan. Satu jam sekali jalan, lima hari seminggu, sudah sekitar 430 jam dalam setahun. Dua jam sekali jalan mendekati 1.000 jam — lebih dari sebulan penuh jika dijumlahkan 24 jam sehari.",
      "Jam itu tidak sama dengan jam kerja. Kamu tidak dibayar, tapi tubuh tetap tegang: berdiri di KRL, menahan motor, atau mencari parkir. Karena itu laporan NgekosGak memisahkan uang dan jam. Uang menjawab sewa. Jam menjawab apakah pagi masih milik kamu.",
      "Tidur yang kembali kalau ngekos hanya perkiraan. Kalau sekali jalan 90 menit, berangkat bisa bergeser kira-kira sejam lebih siang. Itu bukan janji kesehatan. Orang yang tetap begadang akan tetap mengantuk, dengan atau tanpa kos.",
      "Sebelum membandingkan harga kamar, tulis jam bangun dan jam sampai rumah selama seminggu. Angka di iklan kos sering lebih optimistis daripada pintu rumahmu yang asli.",
    ],
  },
  {
    slug: "patokan-ongkos-jalan",
    title: "Patokan 20 persen ongkos jalan, dibaca pelan-pelan",
    description: "Aturan praktis seperlima penghasilan untuk transport sering dikutip. Ini cara memakainya tanpa menjadikannya perintah pindah.",
    publishedAt: "2026-11-09",
    minutes: 5,
    paragraphs: [
      "Artikel properti sering menyebut patokan kasar: ongkos transport sebaiknya tidak memakan lebih dari sekitar 20 persen penghasilan. Angka itu berguna sebagai cermin, bukan sebagai garis yang memaksa kamu pindah kos besok pagi.",
      "Yang dibandingkan adalah ongkos jalan sebulan dengan gaji yang benar-benar masuk rekening. Bonus tahunan dan uang lembur yang tidak tetap sebaiknya tidak dipakai untuk membuat ongkos kelihatan kecil.",
      "Patokan itu juga tidak melihat apa yang rumah sudah tanggung. Makan, cucian, dan penjagaan adik tidak muncul di tiket KRL, tapi muncul begitu kamu menyewa kamar. Laporan yang hanya mengurangi harga tiket dari harga kos akan terlihat murah di kertas dan mahal di minggu kedua.",
      "Kalau ongkos jalan sudah melewati seperlima gaji bersih, itu sinyal untuk menghitung ulang, bukan vonis. Bisa jadi jawabannya kos hari kerja, bukan pindah penuh. Bisa juga jawabannya tetap pulang, karena sewa di dekat kantor menelan lebih banyak daripada tiket.",
      "NgekosGak menampilkan patokan itu di hasil, lalu tetap menghitung sewa, makan pengganti, dan ongkos pulang. Gaji tidak dinilai cukup atau tidak. Yang dinilai hanya pilihan tempat tidur di hari kerja.",
    ],
  },
  {
    slug: "kos-hari-kerja-rumah-akhir-pekan",
    title: "Kos hari kerja, rumah di akhir pekan",
    description: "Pola hibrid tetap membayar sewa sebulan. Yang berubah adalah hari-hari panjang di jalan.",
    publishedAt: "2026-11-10",
    minutes: 6,
    paragraphs: [
      "Banyak orang membayangkan kos sebagai saklar: pindah, atau tidak. Ada pola tengah yang sering lebih jujur untuk yang masih punya tugas di rumah. Kamu sewa kamar dekat kantor, tidur di situ Senin sampai Jumat, lalu pulang di akhir pekan.",
      "Sewanya biasanya tetap harga sebulan. Pemilik kos jarang memotong karena kamu pergi Sabtu. Yang berkurang adalah perjalanan panjang di hari kantor. Yang bertambah adalah satu perjalanan akhir pekan, plus makanan yang tadinya tersedia di rumah.",
      "Pola ini masuk akal kalau perjalanan harian sudah berat dan kamu tidak ingin menghilang dari rumah. Pola ini kurang masuk akal kalau harga kamar sudah lebih tinggi daripada seluruh ongkos jalan, lalu kamu masih membeli makan di luar lima hari.",
      "Coba hitung barang yang ikut bolak-balik: seragam, obat, laptop, dan cucian. Kalau tas akhir pekan selalu penuh, kamar kos yang sempit akan terasa seperti loker, bukan tempat istirahat.",
      "Di putusan NgekosGak, opsi ini disebut hibrid. Angkanya memakai sewa yang kamu isi, jalan pendek di hari kantor, dan ongkos pulang tiap akhir pekan sebesar ongkos harian yang kamu masukkan.",
    ],
  },
  {
    slug: "cek-sebelum-sewa-kos",
    title: "Yang dicek sebelum tanda tangan sewa kos",
    description: "Harga di chat belum termasuk listrik, air, deposit, dan jalan kaki saat hujan.",
    publishedAt: "2026-11-10",
    minutes: 6,
    paragraphs: [
      "Harga kamar yang dikirim lewat chat hampir selalu harga sewa saja. Listrik bisa token, air bisa dibagi, dan deposit bisa sebesar satu bulan yang tidak kembali kalau kamu keluar lebih awal. Tiga angka itu mengubah sewa yang kelihatannya impas.",
      "Jarak di peta adalah jarak pada hari libur. Datanglah pada jam kamu biasa berangkat. Hujan mengubah ojol pendek dan jalan kaki ke halte. Kamar di lantai atas tanpa lift juga mengubah rasa lelah yang tadi ingin kamu kurangi.",
      "Tanya jam gerbang, tamu, dan masak. Sebagian kos melarang kompor. Kalau rumah selama ini menanggung makan, larangan itu berarti kamu makan di luar, bukan hanya berarti kamar lebih aman.",
      "Kontrak singkat lebih ramah untuk percobaan. Satu bulan terasa mahal per hari, tapi lebih murah daripada enam bulan di kamar yang bising sampai subuh. Minta tertulis apa yang terjadi jika kamu berhenti.",
      "Daftar di hasil NgekosGak mengulang hal-hal ini karena putusan angka tidak melihat jendela kamar. Angka memilih pola. Kunjungan memilih kamar.",
    ],
  },
  {
    slug: "beda-lelah-krl-motor-mobil",
    title: "KRL, motor, mobil, ojol, dan bus tidak sama lelahnya",
    description: "Menit yang sama bisa berarti berdiri, mengejar setoran, atau mencari parkir. Moda mengubah apa yang harus dicek di kos.",
    publishedAt: "2026-11-10",
    minutes: 5,
    paragraphs: [
      "Seratus menit di KRL dan seratus menit di motor sama-sama seratus menit di laporan jam. Tubuhnya berbeda. Di KRL kamu mungkin berdiri dan berganti di stasiun. Di motor kamu menahan keseimbangan dan hujan. Di mobil kamu membayar tol dan parkir. Di ojol kamu menunggu dan membayar tarif puncak. Di bus kamu terikat jalur.",
      "Karena itu isian moda tidak mengubah rumus uang — uang datang dari angka yang kamu ketik — tapi mengubah daftar cek sebelum pindah. Pengguna KRL perlu mengukur jalan ke stasiun dari kos, bukan hanya ke kantor. Pengguna motor dan mobil perlu melihat parkir. Pengguna ojol perlu mengingat bahwa hujan membuat tarif lokal naik.",
      "BPS lewat liputan Kompas mencatat sebagian komuter mengeluarkan sedikitnya Rp25 ribu sehari untuk transport. Angka itu rata-rata perjalanan, bukan tarif kos-ke-kantor yang baru. Setelah pindah, sisa ongkos harian harus kamu isi ulang, jangan diasumsikan nol.",
      "NgekosGak memakai sisa ongkos harian Rp12.000 dan 25 menit sekali jalan sebagai jarak dekat. Kalau kos yang kamu incar masih 45 menit, anggap putusan itu terlalu optimistis dan naikkan angkanya sendiri.",
      "Pilih moda yang benar-benar kamu naiki di hari kerja, bukan moda yang ingin kamu coba nanti. Putusan yang jujur dimulai dari perjalanan yang sudah membuat kamu bangun jam empat.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
