import type { BandId, CekInput, CekResult, CheckItem, PlatformId, SuspendType, TimelineStep } from "@/lib/types";

const HARD = /(penipuan|fraud|kekerasan|pelecehan|akun ganda|fake gps|gps palsu|narkoba|kecelakaan|keselamatan|palsu)/i;
const SYSTEM = /(sistem|error|bug|gangguan|saldo|aplikasi|sinyal|maintenance)/i;

export function platformLabel(platform: PlatformId): string {
  if (platform === "gojek") return "Gojek";
  if (platform === "grab") return "Grab";
  return "platform lain";
}

export function suspendLabel(kind: SuspendType): string {
  if (kind === "sementara") return "suspend sementara";
  if (kind === "permanen") return "suspend permanen";
  return "putus mitra";
}

function clamp(score: number): number {
  return Math.max(0, Math.min(100, score));
}

function scoreInput(input: CekInput): { score: number; hard: boolean; system: boolean } {
  let score = input.suspendType === "sementara" ? 22 : input.suspendType === "permanen" ? 58 : 78;
  if (input.daysLeft === null) score += 8;
  else if (input.daysLeft === 0) score += 22;
  else if (input.daysLeft === 1) score += 16;
  else if (input.daysLeft === 2) score += 10;
  else if (input.daysLeft <= 5) score += 4;
  else if (input.daysLeft >= 15) score -= 4;

  if (input.warnings === 0) score += 0;
  else if (input.warnings === 1) score += 4;
  else if (input.warnings === 2) score += 9;
  else if (input.warnings <= 5) score += 14;
  else score += 20;

  const hard = HARD.test(input.reason);
  const system = SYSTEM.test(input.reason) && !hard;
  if (hard) score += 12;
  if (system) score -= 6;
  return { score: clamp(score), hard, system };
}

function bandOf(score: number): BandId {
  if (score < 40) return "longgar";
  if (score < 70) return "sempit";
  return "kritis";
}

function channelFor(platform: PlatformId): string {
  if (platform === "gojek") {
    return "Kirim banding lewat Pusat Bantuan di aplikasi Gojek, pada tombol atau formulir yang muncul di layar suspend. Abaikan nomor WhatsApp yang mengaku admin di luar aplikasi.";
  }
  if (platform === "grab") {
    return "Kirim banding lewat Help Center di aplikasi Grab, pada pemberitahuan suspend. Jangan pindah ke chat di luar aplikasi yang menjanjikan akun nyala.";
  }
  return "Pakai tombol atau tautan yang tertulis di layar suspend aplikasi itu. Kalau tidak ada tombol, buka pusat bantuan resmi di dalam aplikasi yang sama. Abaikan ajakan di grup.";
}

function checklistFor(input: CekInput, hard: boolean, system: boolean): CheckItem[] {
  const items: CheckItem[] = [
    {
      title: "Layar suspend utuh",
      detail: "Simpan tangkapan layar yang masih memuat alasan, tanggal, dan tombol banding. Jangan potong bagian jam.",
    },
    {
      title: "Order di sekitar kejadian",
      detail: "Catat ID order sebelum dan sesudah notifikasi. Tulis jam, bukan opini.",
    },
    {
      title: "Peringatan lama",
      detail:
        input.warnings === 0
          ? "Kalau belum pernah ada peringatan, tulis itu dengan jujur di kronologi."
          : `Kamu menyebut ${input.warnings} peringatan. Lampirkan tangkapan masing-masing kalau masih tersimpan.`,
    },
  ];

  if (system) {
    items.push({
      title: "Jejak gangguan aplikasi",
      detail: "Kalau alasan terasa seperti error, lampirkan pesan gangguan, jam kejadian, dan apakah order lain di sekitar lokasi yang sama juga bermasalah.",
    });
  } else if (hard) {
    items.push({
      title: "Kronologi tanpa tambahan",
      detail: "Tulis urutan kejadian yang benar-benar kamu alami. Jangan menambah detail agar terdengar lebih ringan.",
    });
  } else {
    items.push({
      title: "Chat di dalam aplikasi",
      detail: "Kalau ada percakapan dengan pelanggan soal order itu, simpan dari dalam aplikasi. Jangan unggah nomor atau alamat pelanggan ke luar.",
    });
  }

  items.push({
    title: "Identitas yang sama dengan akun",
    detail: "Siapkan data yang memang terdaftar di akun. Jangan pinjam KTP, nomor, atau akun orang lain.",
  });

  return items;
}

function daysPhrase(daysLeft: number | null): string {
  if (daysLeft === null) return "sisa waktu tidak tertulis di isian";
  if (daysLeft === 0) return "sisa waktu banding terlihat habis";
  if (daysLeft === 1) return "sisa waktu banding 1 hari";
  return `sisa waktu banding ${daysLeft} hari`;
}

function timelineFor(input: CekInput): TimelineStep[] {
  const urgent = input.daysLeft !== null && input.daysLeft <= 1;
  return [
    {
      window: "0–2 jam",
      title: "Bekukan bukti",
      action: urgent
        ? "Ambil tangkapan layar sekarang, sebelum notifikasi tergeser. Jangan instal ulang aplikasi dulu."
        : "Ambil tangkapan layar suspend, peringatan, dan order terkait. Simpan di folder terpisah dari galeri harian.",
    },
    {
      window: "2–12 jam",
      title: "Tulis kronologi pendek",
      action: "Lima sampai delapan kalimat: apa yang tampil di layar, jam kejadian, dan bukti yang dilampirkan. Satu fakta per kalimat.",
    },
    {
      window: "12–24 jam",
      title: "Kirim lewat kanal resmi",
      action: urgent
        ? "Kalau tombol banding masih ada, kirim hari ini. Kalau tombol hilang, catat jamnya dan tetap lewat pusat bantuan di dalam aplikasi."
        : "Kirim sekali, lengkap, lewat kanal di aplikasi. Mengirim sepuluh chat pendek biasanya lebih lambat daripada satu berkas rapi.",
    },
    {
      window: "24–48 jam",
      title: "Satu tindak lanjut, lalu tahan",
      action:
        input.suspendType === "putus"
          ? "Satu tindak lanjut sopan. Siapkan pemasukan di luar platform tanpa membuka akun kedua. Putus mitra tidak diubah oleh chat grup."
          : "Satu tindak lanjut menanyakan nomor tiket. Sambil menunggu, jangan menerima order lewat akun lain.",
    },
  ];
}

function avoidFor(input: CekInput): string[] {
  const items = [
    "Jangan buka akun kedua, nomor kedua, atau menitip KTP ke teman supaya tetap bisa narik.",
    "Jangan kirim OTP, foto KTP, atau kata sandi ke orang yang mengaku bisa menyalakan akun.",
    "Jangan mengancam atau membanjiri pusat bantuan. Nada marah tidak mempercepat antrean.",
    "Jangan unggah nomor, alamat, atau chat pelanggan ke media sosial.",
    "Jangan bayar pihak yang menjanjikan akun pasti aktif lagi.",
  ];
  if (input.suspendType === "putus") {
    items.push("Jangan menganggap keputusan di grup WhatsApp sebagai keputusan resmi platform.");
  } else if (input.daysLeft === 0) {
    items.push("Jangan mengarang tanggal banding baru. Tulis jam terakhir tombol itu masih terlihat.");
  }
  return items;
}

function draftFor(input: CekInput): string {
  const reason = input.reason ? input.reason : "alasan tidak tertulis di layar yang saya lihat";
  const days = daysPhrase(input.daysLeft);
  return [
    `Halo tim bantuan ${platformLabel(input.platform)}.`,
    `Akun saya berstatus ${suspendLabel(input.suspendType)}. Teks yang tampil: "${reason}".`,
    `Peringatan sebelumnya yang saya ingat: ${input.warnings}. ${days.charAt(0).toUpperCase()}${days.slice(1)}.`,
    "Saya mengajukan banding dengan kronologi singkat dan lampiran tangkapan layar. Saya tidak membuka akun lain.",
    "Mohon peninjauan lewat kanal resmi. Saya paham keputusan akhir tetap di platform. Terima kasih.",
  ].join(" ");
}

function headlineFor(band: BandId, input: CekInput): string {
  if (band === "longgar") {
    return `Masih ada ruang untuk menyusun banding ${platformLabel(input.platform)} sebelum waktu menyempit.`;
  }
  if (band === "sempit") {
    return "Riwayat dan sisa waktu sudah sempit. Satu berkas rapi lebih berguna daripada chat beruntun.";
  }
  return "Risiko putus mitra tinggi. Utamakan bukti dan kanal resmi, bukan jalan pintas akun baru.";
}

export function decideCek(input: CekInput): CekResult {
  const { score, hard, system } = scoreInput(input);
  const band = bandOf(score);
  const bandLabel =
    band === "longgar" ? "Masih ada ruang banding" : band === "sempit" ? "Waktu sudah sempit" : "Risiko putus mitra tinggi";

  const assumptions = [
    "Pita ini disusun dari isianmu, bukan dari data internal Gojek, Grab, atau platform lain.",
    "Keputusan akhir — akun nyala, tetap suspend, atau putus mitra — ada di platform.",
    "Ini panduan informasi, bukan layanan hukum dan bukan jaminan banding diterima.",
  ];
  if (hard) {
    assumptions.push("Kalau kejadian menyangkut keselamatan atau kekerasan, urus laporan resmi lebih dulu daripada naskah banding.");
  }
  if (input.platform === "lain") {
    assumptions.push("Nama kanal mengikuti layar suspend di aplikasimu. Nomor yang beredar di grup tidak dipakai di sini.");
  }

  return {
    band,
    bandLabel,
    headline: headlineFor(band, input),
    score,
    channel: channelFor(input.platform),
    checklist: checklistFor(input, hard, system),
    timeline: timelineFor(input),
    avoid: avoidFor(input),
    appealDraft: draftFor(input),
    assumptions,
  };
}
