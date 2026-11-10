import { symptomLabel } from "@/lib/symptoms";
import type {
  BandId,
  CekInput,
  CekResult,
  DriverId,
  ProtectedNight,
  RosterDay,
  ScorePart,
  ShiftId,
} from "@/lib/types";

const driverLabel: Record<DriverId, string> = {
  flip: "flip malam ke pagi yang terlalu rapat",
  malam: "blok dinas malam yang menumpuk",
  tidur: "jam tidur yang belum pulih",
  commute: "commute setelah dinas",
  kafein: "kafein yang menahan tidur",
  gejala: "sinyal tubuh yang sudah kamu catat",
};

const bandLabel: Record<BandId, string> = {
  jaga: "Ritme masih terjaga",
  goyah: "Ritme mulai goyah",
  rusak: "Ritme rusak",
};

const tieBreak: DriverId[] = ["flip", "malam", "tidur", "commute", "kafein", "gejala"];

export function countNights(shifts: ShiftId[]): number {
  return shifts.filter((shift) => shift === "malam").length;
}

export function maxNightStreak(shifts: ShiftId[]): number {
  let max = 0;
  let current = 0;
  for (const shift of shifts) {
    if (shift === "malam") {
      current += 1;
      max = Math.max(max, current);
    } else {
      current = 0;
    }
  }
  return max;
}

export function trailingNightStreak(shifts: ShiftId[]): number {
  let count = 0;
  for (let index = shifts.length - 1; index >= 0; index -= 1) {
    if (shifts[index] !== "malam") break;
    count += 1;
  }
  return count;
}

export function countFlips(shifts: ShiftId[]): { pagiMalam: number; malamSiang: number; malamToLibur: number } {
  let pagiMalam = 0;
  let malamSiang = 0;
  let malamToLibur = 0;
  for (let index = 1; index < shifts.length; index += 1) {
    const previous = shifts[index - 1];
    const next = shifts[index];
    if ((previous === "malam" && next === "pagi") || (previous === "pagi" && next === "malam")) pagiMalam += 1;
    if ((previous === "malam" && next === "siang") || (previous === "siang" && next === "malam")) malamSiang += 1;
    if (previous === "malam" && next === "libur") malamToLibur += 1;
  }
  return { pagiMalam, malamSiang, malamToLibur };
}

function nightCap(band: BandId): number {
  if (band === "rusak") return 2;
  if (band === "goyah") return 3;
  return 4;
}

function suggestRoster(input: CekInput, band: BandId): RosterDay[] {
  const cap = nightCap(band);
  const historicalNights = countNights(input.shifts);
  const nightTarget = band === "rusak" ? 2 : band === "goyah" ? 3 : historicalNights > 0 ? 3 : 0;
  const labels = ["Besok", "Lusa", "Hari ke-3", "Hari ke-4", "Hari ke-5", "Hari ke-6", "Hari ke-7"];
  let streak = trailingNightStreak(input.shifts);
  let previous: ShiftId = input.shifts[13];
  let placed = 0;
  const days: RosterDay[] = [];

  for (let index = 0; index < labels.length; index += 1) {
    let shift: ShiftId = "siang";
    let protect = false;
    let note = "Dinas siang menjaga ritme tanpa menambah malam.";
    const overCap = previous === "malam" && streak >= cap;

    if (previous === "malam" && (band !== "jaga" || overCap)) {
      shift = "libur";
      protect = true;
      note = overCap
        ? `Blok malam dipotong di sini. Jangan ambil malam ke-${cap + 1} berturut-turut.`
        : "Slot ini dilindungi supaya dinas pagi tidak menempel malam.";
      streak = 0;
    } else if (previous === "malam") {
      shift = "siang";
      note = "Siang, bukan pagi, supaya tubuh sempat turun dari dinas malam.";
      streak = 0;
    } else if (placed < nightTarget && streak < cap && previous !== "pagi") {
      shift = "malam";
      placed += 1;
      streak += 1;
      note = "Malam yang masih masuk akal pada roster usulan ini.";
    } else if (previous === "libur") {
      shift = "pagi";
      streak = 0;
      note = "Pagi hanya setelah jeda, bukan setelah malam.";
    }

    days.push({ label: labels[index], shift, protect, note });
    previous = shift;
  }

  return days;
}

function protectedFrom(roster: RosterDay[]): ProtectedNight[] {
  return roster
    .filter((day) => day.protect)
    .map((day) => ({ label: day.label, reason: day.note }));
}

function buildScript(input: CekInput, band: BandId, protectedNights: ProtectedNight[]): string {
  const flips = countFlips(input.shifts);
  const nights = countNights(input.shifts);
  const cap = nightCap(band);
  const slots =
    protectedNights.length > 0
      ? protectedNights.map((night) => night.label.toLowerCase()).join(", ")
      : "tidak ada slot wajib, asal pagi tidak ditempel setelah malam";
  const sleep = input.sleepHours.toLocaleString("id-ID", { maximumFractionDigits: 1 });

  return [
    "Selamat pagi, Kepala Ruangan. Saya ingin minta penyesuaian roster tujuh hari ke depan, bukan cuti panjang.",
    `Pada 14 hari terakhir saya mencatat ${flips.pagiMalam} kali perpindahan langsung antara dinas malam dan pagi, ${nights} dinas malam, tidur rata-rata sekitar ${sleep} jam, dan commute sekitar ${input.commuteMinutes} menit.`,
    `Yang saya minta: jangan jadwalkan dinas pagi di hari setelah dinas malam, dan batasi blok malam berturut-turut menjadi paling banyak ${cap} malam. Slot yang perlu dilindungi: ${slots}.`,
    "Saya tetap siap mengambil dinas malam yang ada di usulan roster pengganti. Ini soal ritme tidur supaya serah terima tetap waspada, bukan soal gaji.",
    "Terima kasih.",
  ].join(" ");
}

function headline(band: BandId, driver: DriverId, flips: number): string {
  if (band === "jaga" && flips === 0) {
    return "Empat belas hari ini belum menunjukkan flip yang merusak tidur. Tetap jaga jeda setelah malam.";
  }
  if (band === "jaga") {
    return "Ritme masih terjaga, tapi ada flip yang sebaiknya tidak diulang di roster berikutnya.";
  }
  if (band === "goyah") {
    return `Badan mulai seperti jet lag. Pendorong utamanya: ${driverLabel[driver]}.`;
  }
  return `Pola ini sudah merusak ritme. Yang paling menekan: ${driverLabel[driver]}.`;
}

export function decideCek(input: CekInput): CekResult {
  const flips = countFlips(input.shifts);
  const nights = countNights(input.shifts);
  const streak = maxNightStreak(input.shifts);

  const flipPoints = Math.min(42, flips.pagiMalam * 14 + flips.malamSiang * 8);
  let nightPoints = nights <= 2 ? 0 : nights <= 4 ? 6 : nights <= 6 ? 14 : 22;
  if (streak >= 6) nightPoints += 16;
  else if (streak >= 4) nightPoints += 10;
  else if (streak >= 3) nightPoints += 6;
  nightPoints = Math.min(36, nightPoints);

  const sleepPoints = input.sleepHours >= 7 ? 0 : input.sleepHours >= 6 ? 6 : input.sleepHours >= 5 ? 12 : 18;
  const commuteBase =
    input.commuteMinutes < 30 ? 0 : input.commuteMinutes < 60 ? 5 : input.commuteMinutes < 90 ? 10 : 14;
  const commutePoints = nights === 0 ? Math.round(commuteBase / 2) : commuteBase;
  let caffeinePoints = input.caffeine <= 1 ? 0 : input.caffeine <= 3 ? 4 : input.caffeine <= 5 ? 8 : 12;
  if (input.caffeine >= 4 && nights >= 3) caffeinePoints += 4;
  const symptomPoints = Math.min(15, input.symptoms.length * 3);
  const buffer = Math.min(12, flips.malamToLibur * 4);

  const raw: Record<DriverId, number> = {
    flip: flipPoints,
    malam: nightPoints,
    tidur: sleepPoints,
    commute: commutePoints,
    kafein: caffeinePoints,
    gejala: symptomPoints,
  };
  const score = Math.max(0, Math.min(100, flipPoints + nightPoints + sleepPoints + commutePoints + caffeinePoints + symptomPoints - buffer));
  const band: BandId = score <= 32 ? "jaga" : score <= 64 ? "goyah" : "rusak";
  const driver = tieBreak.reduce((best, key) => (raw[key] > raw[best] ? key : best), tieBreak[0]);
  const roster = suggestRoster(input, band);
  const protectedNights = protectedFrom(roster);

  const parts: ScorePart[] = tieBreak.map((id) => ({
    id,
    label: driverLabel[id],
    points: raw[id],
  }));

  const named = input.symptoms.map((id) => symptomLabel[id]);
  const assumptions = [
    "Skor membaca pola dinas, tidur, commute, kafein, dan gejala yang kamu isi. Ini bukan diagnosis dan bukan nasihat medis.",
    `Ada ${flips.pagiMalam} flip langsung malam–pagi dan ${flips.malamSiang} perpindahan malam–siang. Libur setelah malam mengurangi skor karena ada jeda.`,
    nights === 0
      ? "Tidak ada dinas malam pada 14 hari ini, jadi commute dihitung lebih ringan."
      : `Blok malam terpanjang ${streak} hari. Usulan roster memotong blok di batas ${nightCap(band)} malam.`,
    named.length > 0 ? `Gejala yang masuk hitungan: ${named.join(", ")}.` : "Tidak ada gejala yang dicentang.",
    "Roster tujuh hari adalah usulan buat kamu bawa ke kepala ruangan, bukan jadwal resmi rumah sakit.",
  ];

  return {
    score,
    band,
    bandLabel: bandLabel[band],
    headline: headline(band, driver, flips.pagiMalam),
    driver,
    driverLabel: driverLabel[driver],
    parts,
    roster,
    protectedNights,
    script: buildScript(input, band, protectedNights),
    assumptions,
  };
}
