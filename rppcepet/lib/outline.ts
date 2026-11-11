import type { Intake, Outline } from "@/lib/types";

const DURASI: Record<Intake["jenjang"], { label: string; menit: number }> = {
  SD: { label: "2 × 35 menit", menit: 70 },
  SMP: { label: "2 × 40 menit", menit: 80 },
  SMA: { label: "2 × 45 menit", menit: 90 },
  SMK: { label: "2 × 45 menit", menit: 90 },
};

function tactic(mapel: string): { inti: string; bukti: string; kata: string } {
  const m = mapel.toLowerCase();
  if (/matematika|math/.test(m)) {
    return {
      inti: "kerjakan dua contoh di papan, lalu satu soal setara yang sedikit lebih panjang",
      bukti: "satu soal selesai dengan langkah yang kelihatan",
      kata: "menghitung",
    };
  }
  if (/bahasa indonesia|bahasa inggris|bahasa daerah|bahasa/.test(m)) {
    return {
      inti: "baca teks pendek bersama, tandai bagian pentingnya, lalu tulis ulang dengan kalimat sendiri",
      bukti: "satu paragraf atau lima kalimat",
      kata: "menyusun",
    };
  }
  if (/ipa|biologi|fisika|kimia|sains/.test(m)) {
    return {
      inti: "tunjukkan satu gambar atau gejala, minta siswa menyebut apa yang berubah, lalu hubungkan ke istilah",
      bukti: "satu kalimat kesimpulan yang memakai istilah yang baru",
      kata: "menjelaskan",
    };
  }
  if (/ips|sejarah|geografi|ekonomi|sosiologi|pkn|ppkn|pendidikan pancasila/.test(m)) {
    return {
      inti: "beri satu kasus singkat, siswa memilih posisi, lalu menulis alasan dalam dua kalimat",
      bukti: "dua kalimat alasan yang merujuk pada kasus",
      kata: "membandingkan",
    };
  }
  if (/pjok|penjas|olahraga/.test(m)) {
    return {
      inti: "lakukan pola gerak di tiga stasiun pendek dan koreksi satu poin di tiap stasiun",
      bukti: "ceklis gerak dasar, bukan skor pertandingan",
      kata: "mempraktikkan",
    };
  }
  if (/seni|sbdp|prakarya/.test(m)) {
    return {
      inti: "contohkan satu teknik, siswa membuat versi kecil, lalu bahas satu karya",
      bukti: "karya singkat yang selesai sebelum bel",
      kata: "membuat",
    };
  }
  if (/agama|pai|akidah|budi pekerti/.test(m)) {
    return {
      inti: "baca cuplikan singkat, hubungkan ke satu situasi di kelas, tutup dengan komitmen yang konkret",
      bukti: "satu kalimat komitmen yang bisa diamati minggu ini",
      kata: "menunjukkan",
    };
  }
  if (/informatika|komputer|tkj|rpl|teknik/.test(m)) {
    return {
      inti: "demonstrasikan satu langkah, siswa mengulang urutannya di perangkat atau di kertas",
      bukti: "unjuk kerja satu langkah, bukan proyek besar",
      kata: "mendemonstrasikan",
    };
  }
  return {
    inti: "beri contoh, minta siswa mencoba satu tugas pendek, lalu bahas satu kesalahan yang sering muncul",
    bukti: "hasil tugas pendek yang terkumpul sebelum bel",
    kata: "menyelesaikan",
  };
}

function kelas(n: number): string {
  if (n <= 16) {
    return "Kelas kecil, jadi inti bisa berupa pasangan yang saling menjelaskan selama dua menit.";
  }
  if (n <= 32) {
    return "Bagi kelas menjadi kelompok empat. Tiap kelompok hanya melaporkan satu kalimat supaya presentasi tidak memakan jam.";
  }
  return "Kelas besar: jangan keliling satu per satu. Pakai jawaban serentak (jari, kartu, atau papan bersama), lalu bahas dua sampel.";
}

function splitClass(total: number): [number, number, number] {
  const buka = Math.max(8, Math.round(total * 0.15));
  const tutup = Math.max(8, Math.round(total * 0.15));
  const inti = total - buka - tutup;
  return [buka, inti, tutup];
}

function splitTonight(total: number): number[] {
  const weights = [3, 5, 8, 4, 2];
  const sum = weights.reduce((acc, item) => acc + item, 0);
  const raw = weights.map((weight) => Math.max(2, Math.round((weight / sum) * total)));
  let drift = total - raw.reduce((acc, item) => acc + item, 0);
  raw[2] = raw[2] + drift;
  if (raw[2] < 2) {
    const need = 2 - raw[2];
    raw[2] = 2;
    raw[1] = Math.max(2, raw[1] - need);
  }
  drift = total - raw.reduce((acc, item) => acc + item, 0);
  raw[2] += drift;
  return raw;
}

export function buildOutline(input: Intake): Outline {
  const durasi = DURASI[input.jenjang];
  const cara = tactic(input.mapel);
  const [buka, inti, tutup] = splitClass(durasi.menit);
  const menit = splitTonight(input.menitTersedia);
  const merdeka = input.kurikulum === "Merdeka";

  const tujuan = [
    `Peserta didik dapat ${cara.kata} ${input.topik} pada mata pelajaran ${input.mapel} dan menunjukkan ${cara.bukti}.`,
    merdeka
      ? `Peserta didik yang selesai lebih dulu dapat menambah satu contoh lain tentang ${input.topik} tanpa menunggu instruksi baru.`
      : `Peserta didik dapat memakai ${input.topik} pada satu tugas yang selaras dengan tujuan yang biasa dipakai di sekolah.`,
  ];

  const langkah = [
    {
      fase: "Pendahuluan",
      menit: buka,
      isi: `Sapa kelas, tulis “${input.topik}” di papan, dan ajukan satu pertanyaan yang bisa dijawab tanpa membuka buku. Catat dua jawaban sebagai jembatan ke kegiatan inti.`,
    },
    {
      fase: "Inti",
      menit: inti,
      isi: `${cara.inti.charAt(0).toUpperCase()}${cara.inti.slice(1)}. ${kelas(input.jumlahSiswa)} ${
        merdeka
          ? "Siapkan dua tingkat tugas: satu untuk semua, satu tambahan bagi yang selesai lebih dulu."
          : "Tugas tambahan hanya untuk yang sudah selesai, supaya yang lain tidak merasa dikejar."
      }`,
    },
    {
      fase: "Penutup",
      menit: tutup,
      isi: `Minta tiga siswa menyebut satu hal yang sekarang bisa mereka lakukan tentang ${input.topik}. Kumpulkan bukti asesmen sebelum bel berbunyi.`,
    },
  ];

  const asesmen = [
    {
      nama: "Formatif di jam itu",
      cara: `Kumpulkan ${cara.bukti}. Nilai cukup dengan ceklis “sudah / belum”, bukan angka panjang.`,
    },
    {
      nama: "Bukti untuk jurnal",
      cara: "Simpan dua sampel: satu yang sudah tepat dan satu yang masih perlu dibimbing besok. Jangan simpan pekerjaan seluruh kelas kalau waktunya mepet.",
    },
  ];

  const tugas = [
    "Tulis identitas: jenjang, mapel, topik, dan jumlah siswa. Jangan menghabiskan waktu di font atau bingkai.",
    `Rumuskan dua tujuan tentang “${input.topik}” dengan kata kerja yang kelihatan hasilnya. Hindari kata “memahami” kalau tidak ada buktinya.`,
    "Bagi kegiatan menjadi pembuka, inti, dan penutup. Jumlah menitnya harus sama dengan durasi jam pelajaran.",
    merdeka
      ? "Pilih satu asesmen formatif yang hasilnya bisa dibawa besok: produk singkat atau jawaban tertulis."
      : "Cantumkan asesmen dan selaraskan dengan tujuan atau KD yang dipakai di sekolahmu.",
    "Baca daftar lampu merah di bawah. Coret satu kalimat yang masih mengambang.",
  ];

  const redFlags = [
    "Tujuan memakai “memahami” atau “mengetahui” tanpa bukti yang bisa dilihat besok pagi.",
    "Kegiatan inti hanya menulis “siswa mengerjakan LKS” tanpa peran guru.",
    "Jumlah menit langkah tidak sama dengan durasi jam, atau menitnya dikosongkan.",
    merdeka
      ? "Masih menyalin KI/KD saja, tanpa tujuan pembelajaran yang bisa diajarkan besok."
      : "Tidak ada rujukan ke tujuan atau KD sekolah, jadi kerangka ini menggantung.",
    input.jumlahSiswa > 32
      ? "Presentasi kelompok bergiliran untuk kelas sebesar ini hampir pasti tidak muat."
      : "Asesmen hanya “pengamatan” tanpa satu bukti tertulis atau ceklis.",
  ];

  return {
    identitas: `${input.mapel} · ${input.jenjang} · ${input.topik} · ${input.jumlahSiswa} siswa · Kurikulum ${input.kurikulum}`,
    durasiKelas: `${durasi.label} (${durasi.menit} menit). Ini kelaziman jenjang, bukan jam pasti sekolahmu. Ubah jika jadwalnya beda.`,
    tujuan,
    langkah,
    asesmen,
    checklist: tugas.map((item, index) => ({ menit: menit[index] ?? 2, tugas: item })),
    redFlags,
    catatan: `Kerangka ini untuk kamu selesaikan dalam ${input.menitTersedia} menit malam ini. Kamu tetap yang menyesuaikannya dengan modul, kondisi kelas, dan format yang diminta sekolah. Ini bukan RPP yang ditandatangani orang lain.`,
  };
}

export function outlinePlainText(outline: Outline): string {
  const lines = [
    outline.identitas,
    `Durasi kelas: ${outline.durasiKelas}`,
    "",
    "Tujuan",
    ...outline.tujuan.map((item, index) => `${index + 1}. ${item}`),
    "",
    "Langkah",
    ...outline.langkah.map((item) => `${item.fase} (${item.menit} menit) — ${item.isi}`),
    "",
    "Asesmen",
    ...outline.asesmen.map((item) => `${item.nama}: ${item.cara}`),
    "",
    "Checklist malam ini",
    ...outline.checklist.map((item) => `${item.menit} menit: ${item.tugas}`),
    "",
    "Lampu merah",
    ...outline.redFlags.map((item) => `- ${item}`),
    "",
    outline.catatan,
  ];
  return lines.join("\n");
}
