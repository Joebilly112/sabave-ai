import { formatClock, minutesOf, spanMinutes } from "@/lib/clock";
import { bandLabel, modeLabel, postureLabel } from "@/lib/labels";
import type { Drain, ResetStep, StrainBand, StrainInput, StrainResult } from "@/lib/types";

const OFFICE_DAYS = 5;
const WEEKS = 52;

type Piece = Drain & { key: string };

export function hoursOnTheRoad(minutesOneWay: number): number {
  return Math.round((minutesOneWay * 2 * OFFICE_DAYS * WEEKS) / 60);
}

export function decideStrain(input: StrainInput): StrainResult {
  const hoursYear = hoursOnTheRoad(input.minutesOneWay);
  const departMin = minutesOf(input.depart);
  const returnMin = minutesOf(input.returnAt);
  const span = spanMinutes(input.depart, input.returnAt);
  const pieces: Piece[] = [];

  let timePoints = Math.round(input.minutesOneWay * 0.28);
  if (input.minutesOneWay >= 90) timePoints += 6;
  if (input.minutesOneWay >= 120) timePoints += 6;
  pieces.push({
    key: "waktu",
    title: `${input.minutesOneWay} menit sekali jalan`,
    detail: `Pulang-pergi ${OFFICE_DAYS} hari seminggu menjadi sekitar ${hoursYear.toLocaleString("id-ID")} jam setahun di dalam perjalanan. Jam ini tidak dibayar dan tidak sama dengan jam kerja.`,
    points: timePoints,
  });

  let posturePoints = input.posture === "berdiri" ? 10 : input.posture === "campuran" ? 5 : 0;
  if (input.posture === "berdiri" && input.minutesOneWay > 70) posturePoints += 4;
  if (posturePoints > 0) {
    pieces.push({
      key: "postur",
      title: postureLabel[input.posture],
      detail:
        input.posture === "berdiri"
          ? "Berdiri lama menahan goyangan kendaraan. Ini catatan beban, bukan pemeriksaan tulang."
          : "Sebagian perjalanan dilakukan berdiri. Duduk di satu penggal sudah mengurangi beban dibanding berdiri terus.",
      points: posturePoints,
    });
  }

  let transferPoints = input.transfers * 3;
  if (input.transfers >= 2 && (input.mode === "krl" || input.mode === "transjakarta")) transferPoints += 3;
  if (transferPoints > 0) {
    pieces.push({
      key: "ganti",
      title: `${input.transfers} kali ganti kendaraan`,
      detail:
        input.transfers >= 2
          ? "Setiap ganti menambah jalan kaki, antrean, dan kesempatan kehilangan tempat duduk. Stasiun padat seperti Manggarai terasa lebih berat daripada menit di peta."
          : "Satu kali ganti masih bisa ditoleransi, tapi tetap menambah langkah di luar menit yang kamu tulis.",
      points: transferPoints,
    });
  }

  let departPoints = 0;
  if (departMin < 5 * 60 + 30) departPoints = 10;
  else if (departMin < 6 * 60 + 15) departPoints = 6;
  else if (departMin < 7 * 60) departPoints = 3;
  if (departPoints > 0) {
    pieces.push({
      key: "berangkat",
      title: `Berangkat jam ${formatClock(input.depart)}`,
      detail: "Jam berangkat yang sangat pagi memotong tidur, bukan hanya memperpanjang perjalanan.",
      points: departPoints,
    });
  }

  let returnPoints = 0;
  if (returnMin >= 21 * 60 && span < 18 * 60) returnPoints = 8;
  else if (returnMin >= 19 * 60 + 30 && span < 18 * 60) returnPoints = 5;
  else if (returnMin >= 18 * 60 + 30 && span < 18 * 60) returnPoints = 2;
  if (returnPoints > 0) {
    pieces.push({
      key: "pulang",
      title: `Sampai rumah sekitar jam ${formatClock(input.returnAt)}`,
      detail: "Pulang larut menyisakan sedikit waktu untuk makan tenang dan tidur sebelum alarm berikutnya.",
      points: returnPoints,
    });
  }

  if (span > 13 * 60) {
    pieces.push({
      key: "rentang",
      title: "Hari di luar rumah lebih dari 13 jam",
      detail: "Yang dihitung di sini jarak antara jam berangkat dan jam pulang, termasuk kerja. Badan tetap menyimpan lelahnya.",
      points: 4,
    });
  }

  let sleepPoints = 0;
  if (input.sleepHours < 5) sleepPoints = 12;
  else if (input.sleepHours < 6) sleepPoints = 8;
  else if (input.sleepHours < 6.5) sleepPoints = 4;
  if (sleepPoints > 0) {
    pieces.push({
      key: "tidur",
      title: `Tidur sekitar ${formatSleep(input.sleepHours)} jam`,
      detail: "Tidur di bawah enam jam membuat perjalanan yang sama terasa lebih panjang. Ini laporan jam, bukan penilaian gangguan tidur.",
      points: sleepPoints,
    });
  }

  const painPoints = input.pain === "keduanya" ? 10 : input.pain === "tidak" ? 0 : 6;
  if (painPoints > 0) {
    pieces.push({
      key: "nyeri",
      title: input.pain === "keduanya" ? "Punggung dan leher ikut berat" : input.pain === "punggung" ? "Punggung ikut berat" : "Leher ikut berat",
      detail: "Nyeri yang kamu rasakan dicatat sebagai sinyal beban. Capek di Jalan tidak mendiagnosis dan tidak menyarankan obat.",
      points: painPoints,
    });
  }

  const moodPoints = input.mood === "marah" ? 8 : input.mood === "habis" ? 6 : input.mood === "datar" ? 3 : 0;
  if (moodPoints > 0) {
    pieces.push({
      key: "suasana",
      title: input.mood === "marah" ? "Sampai dalam keadaan mudah tersulut" : input.mood === "habis" ? "Sampai dalam keadaan sudah habis" : "Sampai dalam keadaan datar",
      detail: "Suasana saat sampai menunjukkan sisa tenaga untuk keluarga atau istirahat, bukan watak seseorang.",
      points: moodPoints,
    });
  }

  const recoveryPoints = input.recovery === "tetaplelah" ? 9 : input.recovery === "setengah" ? 5 : 0;
  if (recoveryPoints > 0) {
    pieces.push({
      key: "pulih",
      title: input.recovery === "tetaplelah" ? "Akhir pekan tidak mengembalikan tenaga" : "Akhir pekan hanya memulihkan sebagian",
      detail: "Kalau Senin masih membawa lelah Jumat, perjalanan harian tidak lagi netral.",
      points: recoveryPoints,
    });
  }

  const modePoints = input.mode === "motor" ? 3 : input.mode === "ojol" ? 2 : input.mode === "bus" || input.mode === "transjakarta" ? 1 : 0;
  if (modePoints > 0) {
    pieces.push({
      key: "moda",
      title: `Moda ${modeLabel[input.mode]}`,
      detail:
        input.mode === "motor"
          ? "Motor menambah beban karena keseimbangan, panas, dan hujan. Menitnya sama, tubuhnya tidak."
          : input.mode === "ojol"
            ? "Ojol mengurangi mengemudi, tapi menunggu dan tarif saat hujan tetap menguras."
            : "Bus dan jalur tetap mengikat kamu pada pemberhentian dan ganti.",
      points: modePoints,
    });
  }

  const raw = pieces.reduce((sum, piece) => sum + piece.points, 0) + (input.sleepHours >= 8 ? -3 : 0);
  const score = clamp(raw, 0, 100);
  const band: StrainBand = score < 36 ? "ringan" : score < 70 ? "berat" : "bahaya";
  const ranked = [...pieces].sort((a, b) => b.points - a.points || a.title.localeCompare(b.title, "id"));
  const drains = ranked.filter((piece) => piece.points > 0).slice(0, 3);
  while (drains.length < 3) {
    drains.push(filler(drains.length, input));
  }

  const plan = buildPlan(input, band);
  const headline = headlineFor(band);
  const summary = [
    `Dengan ${input.minutesOneWay} menit sekali jalan naik ${modeLabel[input.mode]}, berangkat ${formatClock(input.depart)} dan sampai rumah sekitar ${formatClock(input.returnAt)}, beban perjalanan ini masuk pita ${bandLabel[band].toLowerCase()} (skor ${score} dari 100).`,
    `Perkiraan waktu di jalan sekitar ${hoursYear.toLocaleString("id-ID")} jam dalam setahun, dihitung lima hari kerja seminggu.`,
    drains[0] ? `Beban yang paling menonjol: ${drains[0].title.toLowerCase()}.` : "",
    "Angka ini informasi kesejahteraan supaya kamu bisa mengatur dua minggu ke depan. Ini bukan diagnosis, bukan surat sakit, dan bukan penilaian gaji.",
  ]
    .filter(Boolean)
    .join(" ");

  return {
    band,
    score,
    hoursYear,
    headline,
    summary,
    drains: drains.map(({ title, detail, points }) => ({ title, detail, points })),
    plan,
    assumptions: [
      `Jam setahun memakai ${OFFICE_DAYS} hari kerja × ${WEEKS} minggu × pulang-pergi. Hari libur dan cuti tidak dikurangi.`,
      `Jam berangkat ${formatClock(input.depart)} dan jam pulang ${formatClock(input.returnAt)} adalah pintu-ke-pintu, termasuk jalan kaki dan menunggu.`,
      "Skor menjumlahkan menit, postur, ganti kendaraan, jam pagi atau larut, tidur, nyeri yang kamu rasakan, suasana saat sampai, pemulihan akhir pekan, dan moda.",
      "Nyeri tidak diperiksa. Kalau nyeri menetap, memburuk, atau disertai sesak dan pusing yang mengganggu aktivitas, temui tenaga kesehatan.",
      "Rencana 14 hari adalah pengaturan jadwal dan istirahat, bukan terapi.",
    ],
  };
}

function buildPlan(input: StrainInput, band: StrainBand): ResetStep[] {
  const departMin = minutesOf(input.depart);
  let departStep: ResetStep;
  if (departMin < 6 * 60 + 30) {
    departStep = {
      label: "Hari 1–14",
      title: "Geser jendela berangkat, jangan geser tidur",
      detail: `Kamu berangkat ${formatClock(input.depart)}. Selama dua minggu, siapkan tas malam sebelumnya. Pada dua hari yang memungkinkan, minta jendela datang 30 menit lebih siang supaya alarm tidak semakin maju.`,
    };
  } else if (input.posture !== "duduk" && departMin >= 7 * 60 && departMin <= 8 * 60 + 30) {
    departStep = {
      label: "Hari 1–14",
      title: "Pilih satu sisi jam padat",
      detail: `Berangkat ${formatClock(input.depart)} jatuh di himpitan. Coba 25 menit lebih awal untuk mendapat tempat duduk, atau 20 menit lebih akhir kalau kantor mengizinkan. Pakai satu pilihan selama 14 hari, jangan berganti tiap pagi.`,
    };
  } else {
    departStep = {
      label: "Hari 1–14",
      title: "Kunci jam berangkat yang sama",
      detail: `Jam ${formatClock(input.depart)} sudah di luar subuh yang paling gelap. Pertahankan jam itu dua minggu dan catat hari saat kamu tetap berdiri atau tetap terjebak macet.`,
    };
  }

  let seatStep: ResetStep;
  if (input.mode === "motor") {
    seatStep = {
      label: "Jalan",
      title: "Sisipkan satu berhenti pendek",
      detail: "Pada hari hujan, tambahkan 15 menit buffer. Sekali di tengah perjalanan, berhenti 3 menit untuk menurunkan bahu. Jangan mengejar lampu kalau punggung sudah tegang.",
    };
  } else if (input.posture === "duduk") {
    seatStep = {
      label: "Jalan",
      title: "Jaga tempat duduk yang sudah ada",
      detail:
        input.transfers > 0
          ? "Kamu sudah sering duduk. Jangan menambah ganti hanya untuk memotong lima menit kalau ganti itu membuatmu berdiri di penggal berikutnya."
          : "Naik dari pemberhentian awal bila memungkinkan, supaya duduk tidak bergantung pada keberuntungan di tengah jalur.",
    };
  } else {
    seatStep = {
      label: "Jalan",
      title: "Kejar satu penggal duduk",
      detail:
        input.transfers >= 2
          ? "Targetkan duduk di penggal terpanjang. Di titik ganti yang padat, naik satu halte lebih awal atau tunggu rangkaian berikutnya kalau yang ini sudah penuh berdiri."
          : "Pindah ke gerbong atau bagian yang lebih kosong, meski berjalan dua menit lebih jauh di stasiun. Dua menit berjalan lebih murah daripada lima puluh menit berdiri.",
    };
  }

  const sleepStep: ResetStep =
    input.sleepHours < 6.5
      ? {
          label: "Tidur",
          title: `Tambah 30 menit dari ${formatSleep(input.sleepHours)} jam`,
          detail: "Selama 14 hari, matikan layar 40 menit sebelum tidur dan kunci jam tidur, bukan hanya jam alarm. Tambahan setengah jam lebih berguna daripada mencoba mengganti seluruh jadwal sekaligus.",
        }
      : {
          label: "Tidur",
          title: "Pertahankan jam tidur yang sudah cukup",
          detail: `Sekitar ${formatSleep(input.sleepHours)} jam sudah di atas zona yang paling menguras. Jangan dikorbankan untuk mengerjakan sisa pekerjaan di tempat tidur.`,
        };

  const askStep: ResetStep =
    band === "ringan"
      ? {
          label: "Kantor",
          title: "Kamu tidak harus menegosiasikan apa pun",
          detail: "Kalau ingin satu permintaan kecil: rapat pertama tidak menempel pada menit kamu sampai. Ini soal napas, bukan soal naik gaji.",
        }
      : {
          label: "Kantor",
          title: "Satu permintaan yang konkret",
          detail: `Minta jendela kedatangan 30 menit di sekitar jam ${formatClock(input.depart)}, atau satu hari kerja dari rumah dalam sebulan jika peranmu memungkinkan. Sertakan jam di jalan (${input.minutesOneWay} menit sekali jalan), bukan keluhan yang mengambang.`,
        };

  return [departStep, seatStep, sleepStep, askStep];
}

function filler(index: number, input: StrainInput): Piece {
  if (index === 0) {
    return {
      key: "isi",
      title: "Menit perjalanan",
      detail: "Isian menit adalah dasar skor.",
      points: 0,
    };
  }
  if (input.pain === "tidak" && index === 1) {
    return {
      key: "nyeri-nol",
      title: "Nyeri tidak menambah skor",
      detail: "Kamu tidak menandai punggung atau leher sebagai gangguan. Itu tidak muncul di tiga beban teratas.",
      points: 0,
    };
  }
  return {
    key: `nol-${index}`,
    title: "Faktor lain tidak menonjol",
    detail: "Sisa isian menambah sedikit atau tidak sama sekali. Tiga baris ini hanya menyorot yang paling besar.",
    points: 0,
  };
}

function headlineFor(band: StrainBand): string {
  if (band === "bahaya") return "Pola ini sudah di zona bahaya kelelahan. Atur dua minggu ke depan sebelum badan yang mengatur kamu.";
  if (band === "berat") return "Perjalanan ini sudah berat. Belum darurat, tapi pemulihan akhir hari ikut terpakai.";
  return "Beban perjalanan ini masih ringan, asal tidur dan akhir pekan tidak ikut terkuras.";
}

function formatSleep(hours: number): string {
  return Number.isInteger(hours) ? String(hours) : hours.toLocaleString("id-ID");
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
