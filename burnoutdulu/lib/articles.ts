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
    slug: "kerja-tujuh-hari-bukan-bukti-rajin",
    title: "Kerja tujuh hari bukan bukti kamu rajin",
    description:
      "Weekend yang hilang sering disangka dedikasi. Untuk freelancer, itu biasanya tanda kapasitas tidak pernah ditulis.",
    publishedAt: "2026-04-02",
    minutes: 5,
    paragraphs: [
      "Di grup freelancer, foto laptop di hari Minggu sering dapat pujian. Yang tidak kelihatan adalah revisi ketiga yang masuk pukul sembilan malam, lalu dibalas karena takut klien pindah. Rajin dan tidak punya batas terlihat sama dari luar.",
      "Jam mingguan yang aman untuk menjaga kualitas biasanya masih di sekitar empat puluh. Lewat lima puluh, tidur dan hari kosong mulai dipinjam. Lewat enam puluh, tubuh biasanya sudah protes sebelum otak mengakuinya.",
      "Menghitung jam bukan untuk membanggakan kesibukan. Menghitung jam adalah cara melihat apakah “iya, bisa” yang kamu kirim minggu ini diambil dari istirahat minggu depan.",
      "Satu hari tanpa kerja dalam sebulan tidak cukup untuk memulihkan orang yang bekerja setiap malam. Empat sampai enam hari kosong memberi ruang untuk sakit, keluarga, dan pekerjaan yang tidak darurat.",
      "Kalau kalendermu tidak punya satu blok libur yang sudah dituliskan, libur itu akan kalah dari chat. Tulis dulu tanggalnya, baru jawab brief.",
    ],
  },
  {
    slug: "revisi-tanpa-batas-menguras-malam",
    title: "Revisi tanpa batas menguras malam, bukan meningkatkan mutu",
    description:
      "Mengiyakan setiap putaran revisi terasa sopan. Yang terjadi kemudian adalah mutu turun karena kamu sudah lelah.",
    publishedAt: "2026-04-06",
    minutes: 4,
    paragraphs: [
      "Freelancer sering mengira klien yang banyak revisi adalah klien yang peduli kualitas. Kadang iya. Kadang itu brief yang tidak pernah selesai, dan kamu menjadi tempat menaruh keraguan mereka.",
      "Mutu tidak naik otomatis di putaran kelima kalau kamu mengerjakannya pukul satu pagi. Mata lelah melewatkan detail yang justru diminta. Siklusnya kemudian membenarkan dirinya sendiri: hasil kurang rapi, klien minta ulang, kamu tidur lebih larut.",
      "Batas yang jujur berbunyi seperti jadwal, bukan seperti penolakan. “Putaran ini saya kerjakan besok di jam kerja” menjaga hubungan lebih baik daripada “saya usahakan malam ini” yang diucapkan sambil menahan marah.",
      "Kalau satu klien mengisi lebih banyak revisi daripada klien lain digabung, klien itu yang pertama dijeda atau diselesaikan. Bukan semuanya sekaligus. Memotong satu beban sudah mengubah minggu.",
      "Naskah jeda tidak perlu menjelaskan seluruh hidupmu. Cukup sebut antrean yang masih kamu selesaikan, lalu sebut bahwa tambahan di luar jam tidak kamu ambil.",
    ],
  },
  {
    slug: "uang-masuk-tapi-kosong",
    title: "Uang masuk, tapi rasanya tetap kosong",
    description:
      "Invoice lunas tidak selalu memperbaiki hari. Kekosongan setelah dibayar sering datang dari minggu yang tidak punya sisa.",
    publishedAt: "2026-04-09",
    minutes: 4,
    paragraphs: [
      "Ada freelancer yang mengecek mutasi, melihat dana masuk, lalu tidak merasa lega. Yang tersisa adalah bahu pegal dan chat berikutnya. Kekosongan itu bukan bukti kamu tidak bersyukur. Itu sinyal bahwa minggu itu hanya berisi penyerahan.",
      "Pekerjaan lepas mudah diukur dari rupiah yang masuk. Yang jarang diukur adalah hari tanpa layar. Kalau setiap pembayaran dibarengi gejala tubuh — kepala berat, rahang mengunci, takut membuka laptop — pita bebannya sudah bergeser, berapa pun invoice-nya.",
      "Mengosongkan satu sore setelah dana masuk adalah bagian dari pekerjaan, bukan hadiah yang harus ditunda sampai “semua klien tenang”. Klien tidak pernah selesai bersamaan.",
      "Kalau kamu melewatkan makan karena masih di file, catat itu sebagai gejala, bukan sebagai dedikasi. Tubuh yang tidak makan tidak menjadi lebih kreatif di jam ketujuh.",
      "Alat ini tidak menghitung tarif dan tidak membandingkan penghasilan. Pertanyaannya lain: apakah pola minggu ini masih bisa kamu jalani bulan depan tanpa meminjam kesehatan.",
    ],
  },
  {
    slug: "jeda-satu-klien-tanpa-menghilang",
    title: "Cara jeda satu klien tanpa menghilang dari chat",
    description:
      "Menghilang membuat klien panik. Jeda yang tertulis membuat kamu bisa kembali dengan mutu, bukan dengan rasa bersalah.",
    publishedAt: "2026-04-13",
    minutes: 5,
    paragraphs: [
      "Banyak freelancer menunda batas sampai mereka benar-benar tidak sanggup membalas. Dari sisi klien, keheningan itu terasa seperti ditinggal. Dari sisi kamu, keheningan itu adalah tubuh yang sudah menyerah duluan.",
      "Pesan yang lebih mudah diterima menyebut tiga hal: apa yang masih kamu selesaikan, kapan kamu berhenti menerima tambahan, dan kapan kamu bisa diajak bicara lagi. Tanpa tiga hal itu, jeda terdengar seperti menghilang.",
      "Pilih satu klien, bukan semua. Klien dengan revisi paling sering, atau yang paling sering minta weekend, biasanya yang paling mahal bagi tidurmu. Klien yang brief-nya rapi bisa tetap jalan di jam yang sudah dijanjikan.",
      "Kalau klien aktif sudah empat atau lebih dan minggu ini sudah merah, mengakhiri satu kerjaan lebih jujur daripada menunda semuanya. Selesaikan antrean yang sudah masuk, lalu berhenti. Jangan menambah “sekali lagi saja”.",
      "Simpan naskahnya, ganti nama klien, kirim di jam kerja. Mengirim pukul dua pagi mengkhianati isi pesannya.",
    ],
  },
  {
    slug: "tidur-lima-jam-bukan-mode-kerja",
    title: "Tidur lima jam bukan mode kerja, itu utang",
    description:
      "Freelancer sering menukar tidur dengan revisi. Utang itu tidak kelihatan di invoice, tapi kelihatan di pagi berikutnya.",
    publishedAt: "2026-04-16",
    minutes: 4,
    paragraphs: [
      "Lima jam tidur terasa cukup kalau kamu masih bisa membuka file. Cukup untuk membuka file bukan cukup untuk menjaga mutu atau suasana hati. Dada yang sesak saat notifikasi masuk sering menyusul di minggu yang sama.",
      "Naikkan tidur sedikit, bukan sekaligus menjadi delapan jam yang terasa mustahil. Setengah jam sampai satu jam yang dikembalikan tiga malam berturut sudah mengubah pita. Chat yang masuk setelah jam tidur dibalas besok.",
      "Kopi tambahan bukan pengganti jam yang hilang. Ia hanya menunda rasa kantuk sampai revisi berikutnya, lalu membuat tidur malamnya lebih susah. Kalau kamu capek tapi tetap tidak bisa tidur, itu gejala yang masuk hitungan, bukan kepribadian.",
      "Hari libur yang diisi “rapihin file sebentar” tetap hari kerja. Kalau sebulan hanya punya satu hari tanpa laptop, anggap itu peringatan, bukan prestasi bertahan.",
      "Kalau takut membuka laptop sudah muncul di pagi hari, kurangi layar hari itu. Ini bukan diagnosis. Ini alasan untuk berhenti menambah klien sebelum kamu berbicara dengan orang yang kamu percaya, atau dengan layanan kesehatan kalau rasanya tidak aman.",
    ],
  },
];
