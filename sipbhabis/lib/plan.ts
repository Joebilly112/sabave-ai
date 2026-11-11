import { addDays, daysBetween, formatId, jakartaToday } from "@/lib/dates";
import { urgencyLabel, workplaceLabel } from "@/lib/labels";
import type { CekInput, CekResult, DocItem, Reminder, UrgencyId, WeekBlock } from "@/lib/types";

const SKP_BENCHMARK = 25;

function urgencyFor(daysLeft: number): UrgencyId {
  if (daysLeft < 0) return "lewat";
  if (daysLeft < 30) return "ketat";
  if (daysLeft <= 90) return "dekat";
  if (daysLeft <= 180) return "susun";
  return "longgar";
}

function headlineFor(daysLeft: number, urgency: UrgencyId): string {
  if (urgency === "lewat") {
    return `Tanggal habis di kartu STRB sudah lewat ${Math.abs(daysLeft)} hari. Jangan anggap surat itu masih menutup praktik. Konfirmasi status ke dinas atau HRD sebelum menerima jadwal baru.`;
  }
  if (urgency === "ketat") {
    return `Tersisa ${daysLeft} hari menurut tanggal yang kamu tulis. Minggu ini untuk menyalin berkas dan menanyakan daftar yang sedang berlaku, bukan untuk menunda sampai hari terakhir.`;
  }
  if (urgency === "dekat") {
    return `Masih ${daysLeft} hari. Cukup untuk menyusun map, asal kredit dan rekomendasi tidak dibiarkan di minggu terakhir.`;
  }
  if (urgency === "susun") {
    return `Masih ${daysLeft} hari. Waktunya mengunci daftar berkas dan mengisi kredit yang kurang, sebelum rasa tenang berubah jadi panik di loket.`;
  }
  return `Masih ${daysLeft} hari. Tanggalnya sudah tercatat. Yang berguna sekarang adalah pengingat, bukan map tebal.`;
}

function docsFor(input: CekInput, daysLeft: number, skpGap: number): DocItem[] {
  const strb: DocItem = {
    id: "strb",
    title: "Kartu STRB",
    state: daysLeft < 0 ? "susun" : daysLeft <= 120 ? "cek" : "siap",
    note:
      daysLeft < 0
        ? "Tanggal habis sudah lewat. Simpan kartu sebagai arsip dan tanyakan jalur perpanjangan yang sedang berlaku. Proses pengajuan tidak sama dengan surat yang sudah terbit."
        : `Tercatat terbit ${formatId(input.strbIssued)} dan habis ${formatId(input.strbExpiry)}. Cocokkan ejaan nama dengan KTP sebelum difotokopi.`,
  };

  const sipb: DocItem = {
    id: "sipb",
    title: input.sipbCount === 2 ? "Dua SIPB" : "Satu SIPB",
    state: "cek",
    note:
      input.sipbCount === 2
        ? "Dua izin berarti dua masa berlaku. Tulis tanggal habis masing-masing di selembar kertas. Satu tanggal STRB tidak otomatis menutup keduanya."
        : "Satu izin. Pastikan nama tempat di kartu sama dengan tempat kamu praktik sekarang. Kalau pindah ruangan atau pindah fasilitas, tanyakan apakah izin itu masih menempel.",
  };

  const identitas: DocItem = {
    id: "identitas",
    title: "Identitas dan ijazah",
    state: "cek",
    note: "KTP, pas foto terbaru, ijazah bidan, dan sertifikat kompetensi. Nama dan gelar harus sama di setiap lembar.",
  };

  const kredit: DocItem = {
    id: "kredit",
    title: "Bukti kredit kompetensi",
    state: skpGap === 0 ? "siap" : daysLeft <= 90 ? "susun" : "cek",
    note:
      skpGap === 0
        ? `Kamu menulis ${input.skp} kredit, sudah melewati patokan perencanaan ${SKP_BENCHMARK}. Tetap jajarkan sertifikatnya dengan daftar yang diminta organisasi profesi.`
        : `Masih kurang ${skpGap} kredit dari patokan perencanaan ${SKP_BENCHMARK}. Patokan ini alat hitung di situs, bukan kuota yang kami tetapkan. Sertifikat yang tidak disebut di daftar organisasi profesi jangan dihitung dulu.`,
  };

  const rekomendasi: DocItem = {
    id: "rekomendasi",
    title: "Rekomendasi organisasi profesi",
    state: daysLeft <= 90 ? "susun" : "cek",
    note: "Tanyakan ke pengurus cabang kapan rekomendasi bisa diminta dan apakah mereka perlu melihat masa berlaku STRB. Jangan menaruh surat rekomendasi yang masih menyebut alamat lama di depan map.",
  };

  const tempat: DocItem =
    input.workplace === "fasilitas"
      ? {
          id: "tempat",
          title: "Surat dari pimpinan fasilitas",
          state: daysLeft < 0 ? "susun" : "cek",
          note: "Siapkan surat keterangan masih bertugas atau jadwal praktik yang diminta HRD. Fasilitas sering menjadi pintu pertama sebelum berkas sampai ke dinas.",
        }
      : {
          id: "tempat",
          title: "Bukti tempat praktik mandiri",
          state: "susun",
          note: "Siapkan bukti sewa atau milik, denah, dan catatan sarana yang biasa ditanyakan daerahmu. Alamat di semua lembar harus sama, termasuk gang dan nomor.",
        };

  const items = [strb, sipb, identitas, kredit, rekomendasi, tempat];

  if (input.sipbCount === 2) {
    items.push({
      id: "lokasi-kedua",
      title: "Berkas lokasi kedua",
      state: "susun",
      note:
        input.workplace === "mandiri"
          ? "Lokasi kedua butuh salinan sendiri: surat tempat, dan kalau ada, rekomendasi yang menyebut alamat itu."
          : "Dua SIPB bisa campuran fasilitas dan mandiri. Siapkan surat untuk tiap lokasi, jangan satu amplop untuk keduanya.",
    });
  }

  return items;
}

function block(title: string, window: string, tasks: string[]): WeekBlock {
  return { title, window, tasks };
}

function planFor(input: CekInput, asOf: string, daysLeft: number, skpGap: number): WeekBlock[] {
  const place =
    input.workplace === "fasilitas"
      ? "Minta HRD atau pimpinan menunjukkan daftar berkas perpanjangan yang sedang mereka pakai."
      : "Foto bukti tempat dan tulis alamat lengkap yang sama untuk setiap lembar.";

  if (daysLeft < 0) {
    return [
      block("Hentikan asumsi", `${formatId(asOf)} · hari ini`, [
        "Jangan memakai kartu yang sudah lewat tanggal sebagai alasan menerima pasien atau jadwal baru.",
        "Hubungi dinas kabupaten/kota atau HRD dan tanyakan status suratmu dengan kalimat pendek.",
        "Catat nama petugas dan tanggal jawaban.",
      ]),
      block("Kumpulkan yang ada", formatId(addDays(asOf, 7)), [
        "Foto STRB, setiap SIPB, KTP, dan ijazah dalam satu folder.",
        skpGap > 0
          ? `Pisahkan sertifikat kredit. Kekurangan dari patokan perencanaan: ${skpGap}.`
          : "Jajarkan sertifikat kredit yang sudah kamu hitung.",
        place,
      ]),
      block("Ajukan sesuai jalur yang ditunjukkan", formatId(addDays(asOf, 14)), [
        "Ikuti urutan yang disebut petugas, bukan urutan dari grup teman.",
        "Simpan bukti unggah atau resi loket.",
        "Jangan menulis di media sosial bahwa izin sudah aman sebelum surat terbit.",
      ]),
    ];
  }

  if (daysLeft < 30) {
    return [
      block("Salin berkas inti", `${formatId(asOf)} – ${formatId(addDays(asOf, 3))}`, [
        "Fotokopi STRB, setiap SIPB, KTP, dan ijazah. Centang nama yang sama.",
        place,
      ]),
      block("Kredit dan rekomendasi", formatId(addDays(asOf, 7)), [
        skpGap > 0
          ? `Tandai ${skpGap} kredit yang masih kurang dari patokan perencanaan, lalu tanyakan apakah pengajuan bisa jalan paralel.`
          : "Masukkan sertifikat kredit ke map, diurutkan tanggal.",
        "Minta rekomendasi organisasi profesi jika daftar daerahmu menyebutnya.",
      ]),
      block("Antar atau unggah", formatId(addDays(asOf, 14)), [
        `Tanggal habis yang kamu tulis: ${formatId(input.strbExpiry)}. Jangan menunggu hari itu.`,
        "Simpan nomor antrean dan salinan yang kamu serahkan.",
      ]),
    ];
  }

  if (daysLeft <= 90) {
    return [
      block("Minggu kartu", `${formatId(asOf)} · minggu 1`, [
        "Tulis tanggal terbit dan habis STRB di kalender pribadi, plus tanggal habis tiap SIPB.",
        "Cek ejaan nama di kartu terhadap KTP.",
      ]),
      block("Minggu kredit", formatId(addDays(asOf, 14)), [
        skpGap > 0
          ? `Pilih kegiatan yang menutup ${skpGap} kredit dari patokan perencanaan, lalu simpan sertifikatnya.`
          : "Urutkan sertifikat kredit yang sudah ada dan buang yang tidak relevan.",
        "Catat penyelenggara dan tanggal tiap sertifikat.",
      ]),
      block("Minggu surat tempat", formatId(addDays(asOf, 28)), [
        place,
        input.sipbCount === 2 ? "Ulangi untuk lokasi kedua. Jangan menumpuk dua alamat di satu surat." : "Satu lokasi, satu set salinan.",
      ]),
      block("Minggu pengajuan", formatId(addDays(asOf, 49)), [
        "Minta daftar resmi yang sedang berlaku di dinas atau HRD, lalu coret yang sudah ada.",
        "Ajukan sebelum memasuki 30 hari terakhir.",
      ]),
    ];
  }

  if (daysLeft <= 180) {
    return [
      block("Kunci tanggal", formatId(asOf), [
        `Habis menurut isianmu: ${formatId(input.strbExpiry)}. Pasang pengingat 120, 60, dan 30 hari sebelumnya.`,
        "Foto kartu yang masih terbaca, simpan di luar galeri yang mudah terhapus.",
      ]),
      block("Isi kredit yang longgar", formatId(addDays(asOf, 21)), [
        skpGap > 0
          ? `Masih ${skpGap} kredit dari patokan perencanaan. Sebar, jangan ditumpuk di bulan terakhir.`
          : "Arsipkan sertifikat yang sudah dihitung supaya tidak hilang saat map disusun.",
      ]),
      block("Surat organisasi dan tempat", formatId(addDays(asOf, 60)), [
        "Tanyakan jadwal rekomendasi organisasi profesi.",
        place,
      ]),
      block("Map tipis, lalu tanya loket", formatId(addDays(asOf, 100)), [
        "Bawa salinan, bukan map setebal katalog.",
        "Tulis jawaban petugas di catatan yang sama dengan tanggal habis.",
      ]),
    ];
  }

  const firstReminder = addDays(input.strbExpiry, -120);
  return [
    block("Catat sekali, lalu tutup aplikasi", formatId(asOf), [
      `STRB habis ${formatId(input.strbExpiry)}. Tulis juga masa berlaku tiap SIPB di catatan yang sama.`,
      "Pengingat pertama yang berguna jatuh sekitar " + formatId(firstReminder) + ".",
    ]),
    block("Kredit pelan-pelan", "Sebelum pengingat 120 hari", [
      skpGap > 0
        ? `Target perencanaan: tutup ${skpGap} kredit sebelum pengingat 120 hari, bukan seminggu sebelum habis.`
        : "Simpan sertifikat yang sudah kamu hitung di satu map digital.",
    ]),
    block("Baru sentuh loket", "Pengingat 60 hari", [
      place,
      "Minta daftar berkas yang sedang berlaku. Peraturan daerah bisa menambah butir yang tidak ada di catatan teman.",
    ]),
  ];
}

function remindersFor(expiry: string, asOf: string): Reminder[] {
  const marks: { label: string; offset: number }[] = [
    { label: "120 hari sebelum habis", offset: -120 },
    { label: "60 hari sebelum habis", offset: -60 },
    { label: "30 hari sebelum habis", offset: -30 },
  ];
  return marks.map((mark) => {
    const date = addDays(expiry, mark.offset);
    const distance = daysBetween(asOf, date);
    return { label: mark.label, date, passed: distance !== null && distance < 0 };
  });
}

function pesanFor(input: CekInput, daysLeft: number): string {
  const sisa =
    daysLeft < 0
      ? `tanggal habis STRB yang saya catat (${formatId(input.strbExpiry)}) sudah lewat ${Math.abs(daysLeft)} hari`
      : `STRB yang saya catat terbit ${formatId(input.strbIssued)} dan habis ${formatId(input.strbExpiry)}, sisa ${daysLeft} hari`;
  const sipb = input.sipbCount === 2 ? "Saya memegang dua SIPB." : "Saya memegang satu SIPB.";
  return [
    "Selamat pagi. Saya bidan dan ingin memastikan berkas perpanjangan sebelum praktik terputus.",
    `${sisa}. ${sipb} Tempat praktik: ${workplaceLabel[input.workplace].toLowerCase()}.`,
    `Kredit kompetensi yang sudah saya kumpulkan: ${input.skp}. Mohon ditunjukkan daftar berkas yang sedang berlaku untuk perpanjangan STRB dan SIPB di wilayah ini, termasuk apakah rekomendasi organisasi profesi masih diminta.`,
    "Pesan ini catatan persiapan, bukan surat resmi dan bukan pernyataan bahwa izin sudah diperpanjang.",
  ].join(" ");
}

export function decideCek(input: CekInput, now = new Date()): CekResult {
  const asOf = jakartaToday(now);
  const daysLeft = daysBetween(asOf, input.strbExpiry) ?? 0;
  const cycleDays = daysBetween(input.strbIssued, input.strbExpiry) ?? 0;
  const urgency = urgencyFor(daysLeft);
  const skpGap = Math.max(0, SKP_BENCHMARK - input.skp);
  const assumptions = [
    `Hari dihitung pada kalender Asia/Jakarta tanggal ${formatId(asOf)}, saat isian ini dikirim.`,
    `Patokan ${SKP_BENCHMARK} kredit hanya alat perencanaan di situs ini, bukan kuota resmi.`,
    "Permenkes Nomor 28 Tahun 2017 sering disebut karena membingkai STRB dalam siklus lima tahun. Aturan yang sedang berlaku bisa berbeda. Konfirmasi ke Konsil, dinas kesehatan, dan Kementerian Kesehatan.",
    "Daftar berkas adalah yang sering disiapkan bidan, bukan lampiran resmi kabupaten atau kota.",
    "Hasil ini informasi persiapan. Ia bukan keputusan izin, bukan nasihat hukum, dan bukan pemeriksaan sarana.",
  ];

  const cycleYears = cycleDays / 365;
  if (cycleYears < 4 || cycleYears > 6) {
    assumptions.unshift(
      `Jarak tanggal terbit dan habis adalah ${cycleDays} hari. Cek ulang angka di kartu sebelum map diantar.`,
    );
  }

  return {
    asOf,
    daysLeft,
    cycleDays,
    urgency,
    urgencyLabel: urgencyLabel[urgency],
    headline: headlineFor(daysLeft, urgency),
    skpGap,
    skpBenchmark: SKP_BENCHMARK,
    docs: docsFor(input, daysLeft, skpGap),
    plan: planFor(input, asOf, daysLeft, skpGap),
    reminders: remindersFor(input.strbExpiry, asOf),
    pesan: pesanFor(input, daysLeft),
    assumptions,
  };
}
