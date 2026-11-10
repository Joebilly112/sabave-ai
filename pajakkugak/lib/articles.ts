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
    slug: "panik-maret-belum-punya-npwp",
    title: "Belum punya NPWP bukan otomatis berarti kamu ilegal",
    description:
      "Musim lapor bikin freelancer merasa buron. Yang perlu dibedakan: belum terdaftar, sudah terdaftar tapi nihil, dan sudah dipotong klien.",
    publishedAt: "2026-03-02",
    minutes: 5,
    paragraphs: [
      "Maret adalah bulan di mana linimasa penuh kalimat “yang belum lapor”. Freelancer yang tidak punya NPWP sering membaca itu sebagai vonis. Padahal kewajiban lapor menempel pada status wajib pajak dan pada penghasilan, bukan pada rasa takut.",
      "Kalau omzet dari klien masih di bawah PTKP dan tidak ada satu pun klien yang memotong pajak, kamu belum tentu harus membuka formulir tahun ini. PTKP TK/0 yang dipakai sebagai garis paling kecil adalah Rp54 juta. Status kawin dan tanggungan membuat batas itu lebih tinggi, jadi garis ini sengaja ketat.",
      "Ceritanya berubah begitu ada bukti potong. PPh 23 atau PPh 21 yang sudah dipotong klien adalah uang yang mengikat namamu pada sistem, meski jumlahnya kecil. Tanpa NPWP, potongan itu sulit dikreditkan. Mengurus NPWP di situ adalah membereskan jejak, bukan mengaku bersalah.",
      "NPWP yang sudah terbit membawa kebiasaan lain: SPT tetap disampaikan, termasuk SPT nihil. Nihil artinya tidak ada pajak yang masih harus disetor, bukan artinya formulirnya boleh dilewati. Banyak panik Maret berasal dari mencampur dua kalimat itu.",
      "Simpan rekap invoice per bulan sebelum membuka artikel mana pun yang menjanjikan “cara hitung cepat”. Angka yang rapi membuat pertanyaan berikutnya pendek: ada potongan atau tidak, dan omzet ada di bawah Rp500 juta, di antaranya, atau sudah melewati Rp4,8 miliar.",
    ],
  },
  {
    slug: "omzet-500-juta-bukan-bebas-lapor",
    title: "Omzet di bawah Rp500 juta bukan surat bebas lapor",
    description:
      "Bagian omzet sampai Rp500 juta untuk UMKM orang pribadi umumnya tidak dikenai PPh final. SPT-nya cerita lain.",
    publishedAt: "2026-03-04",
    minutes: 5,
    paragraphs: [
      "Kalimat yang beredar di grup freelancer: “di bawah 500 juta bebas pajak.” Yang biasanya dimaksud aturan adalah bagian peredaran bruto sampai Rp500 juta untuk orang pribadi UMKM tidak dikenai PPh final. Bebas final bukan kalimat yang sama dengan bebas menyampaikan SPT.",
      "PPh final 0,5% yang dikenal sejak skema UMKM menempel pada bagian omzet di atas Rp500 juta, selama peredaran masih di dalam plafon Rp4,8 miliar dan syarat orang pribadinya terpenuhi. Di bawah garis Rp500 juta, setoran finalnya sering nol. Di atas garis, yang dihitung hanya selisihnya, bukan seluruh omzet dari rupiah pertama.",
      "Freelancer yang sudah punya NPWP tetap masuk musim lapor. Formulir yang biasa dibaca untuk pekerjaan bebas adalah 1770, bukan 1770 SS milik karyawan satu pemberi kerja. DJP Online akan menanyakan sendiri jenis penghasilanmu. Ikuti pertanyaan itu.",
      "Lewat dari Rp4,8 miliar, skema final tidak lagi menjadi rumah. Jalurnya tarif umum dengan pembukuan atau norma. Memaksa setor 0,5% di atas plafon adalah kesalahan peta, bukan hemat.",
      "Saat mencatat, pisahkan dua kolom: omzet sampai Rp500 juta, dan omzet di atasnya. Satu angka gabungan membuat orang mengira seluruh penghasilan kena 0,5%, lalu panik, atau mengira semuanya nol, lalu lengah.",
    ],
  },
  {
    slug: "minta-bukti-potong-tanpa-drama",
    title: "Cara minta bukti potong ke klien tanpa terdengar menuduh",
    description:
      "PPh 23 dan PPh 21 yang dipotong klien butuh PDF atau nomor bukti. Minta di bulan yang sama, bukan di minggu terakhir Maret.",
    publishedAt: "2026-03-06",
    minutes: 4,
    paragraphs: [
      "Banyak klien memotong pajak lalu lupa mengirim buktinya. Di invoice tertulis “setelah pajak”, di rekening masuk angka yang lebih kecil, dan di email tidak ada lampiran. Freelancer mengingat selisihnya sebagai potongan biaya, bukan sebagai PPh.",
      "Bukti potong adalah dokumen yang nanti dicocokkan di SPT. Tanpa nomor atau PDF, kamu hanya punya firasat. Firasat tidak bisa diisi ke formulir. Minta buktinya dengan kalimat pendek: sebut invoice, minta PDF e-Bupot atau konfirmasi bahwa tidak ada potongan, dan jangan menambahkan tarif dari kepala sendiri.",
      "Waktu yang baik adalah saat dana masuk, bukan saat batas lapor sudah kelihatan di kalender. Klien yang dihubungi di minggu tenang masih membuka folder. Klien yang dihubungi tanggal 30 Maret sedang menutup bukunya sendiri.",
      "Kalau klien bilang tidak memotong, simpan balasan itu di samping invoice. Jawaban “tidak ada” sama bergunanya dengan PDF, karena ia menutup lubang “tidak tahu”. Putusan musim lapor sering bergeser hanya karena lubang itu.",
      "Jangan mengirim NPWP lewat chat yang longgar kalau belum perlu, dan jangan pernah mengirim password DJP. Bukti potong cukup dipegang kamu. Klien tidak membutuhkan akses akunmu untuk mengirim PDF yang memang miliknya.",
    ],
  },
  {
    slug: "1770-bukan-formulir-karyawan",
    title: "Kenapa freelancer tidak meniru formulir 1770 SS teman kantoran",
    description:
      "1770 SS untuk karyawan dengan pola yang sempit. Pekerjaan bebas dibaca di 1770. Meniru teman menghemat sepuluh menit dan mengacak peta.",
    publishedAt: "2026-03-09",
    minutes: 4,
    paragraphs: [
      "Teman yang digaji satu perusahaan sering selesai dengan formulir singkat. Freelancer melihat layar itu, merasa tertinggal, lalu mencari versi yang sama. Formulir karyawan tidak menjadi benar hanya karena lebih pendek.",
      "1770 SS dirancang untuk pola pegawai yang sempit: satu pemberi kerja dan penghasilan yang masih di dalam batas formulir itu. Pekerjaan bebas — desain, tulis, program, foto, konsultan — masuk keluarga 1770. 1770 S berada di antara keduanya, biasanya ketika ada pekerjaan dalam hubungan kerja ditambah penghasilan lain, tanpa usaha yang meminta 1770.",
      "DJP Online tidak meminta kamu menghafal kode. Ia bertanya. Jawab sesuai fakta: ada penghasilan dari klien, ada atau tidak bukti potong, ada atau tidak penghasilan final. Peta di PajakKuGak hanya menyiapkan kamu untuk pertanyaan itu.",
      "Kesalahan yang mahal bukan salah ketik nama klien. Kesalahan yang mahal adalah memakai skema final 0,5% padahal omzet sudah di atas Rp4,8 miliar, atau mengisi formulir karyawan padahal seluruh tahun kamu dibayar invoice.",
      "Sebelum mengisi, cetak atau simpan rekap satu halaman. Layar formulir terasa lebih tenang ketika angka sudah selesai dihitung di luar situs.",
    ],
  },
  {
    slug: "checklist-satu-malam-sebelum-lapor",
    title: "Checklist satu malam sebelum kamu membuka DJP Online",
    description:
      "Empat tumpukan kertas cukup untuk menurunkan panik: omzet, bukti potong, NPWP, dan pita UMKM. Sisanya menyusul setelah peta terbaca.",
    publishedAt: "2026-03-12",
    minutes: 5,
    paragraphs: [
      "Jangan mulai dari video “hitung pajak UMKM dalam enam menit”. Mulai dari tumpukan yang kamu sendiri yang punya. Satu malam cukup untuk empat tumpukan, tidak cukup untuk menjadi konsultan.",
      "Tumpukan pertama: omzet bruto. Jumlah yang masuk dari klien sebelum kamu mengurangi biaya sewa atau langganan. Pisahkan per bulan. Kalau ada penghasilan gaji di samping invoice, catat terpisah — alat ini hanya membaca omzet klien, dan penghasilan lain bisa mengubah formulir.",
      "Tumpukan kedua: bukti potong dan balasan “kami tidak memotong”. Tumpukan ketiga: status NPWP. Sudah, belum, atau sedang diurus. Tumpukan keempat: pita omzet. Di bawah Rp500 juta, di antara Rp500 juta dan Rp4,8 miliar, atau sudah di atas plafon.",
      "Empat tumpukan itu yang diubah PajakKuGak menjadi putusan wajib lapor, mungkin, atau belum tentu, plus jalur formulir dan daftar dokumen. Putusannya informasi. Ia tidak mengisi SPT, tidak menghitung kurang bayar sampai rupiah terakhir, dan tidak menggantikan pertanyaan di akun DJP.",
      "Kalau setelah checklist kamu tetap tidak yakin karena ada warisan, crypto, atau usaha lain yang besar, berhenti dan bicara dengan konsultan atau layanan resmi. Panik Maret bukan alasan menyerahkan password pada orang asing.",
    ],
  },
];
