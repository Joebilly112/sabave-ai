import { symptomLabel } from "@/lib/symptoms";
import type { BandId, CekInput, CekResult, DriverId, PlanStep } from "@/lib/types";

function scoreHours(hours: number): number {
  if (hours <= 40) return 0;
  if (hours <= 50) return 1;
  if (hours <= 60) return 2;
  return 3;
}

function scoreClients(clients: number): number {
  if (clients <= 2) return 0;
  if (clients <= 4) return 1;
  if (clients <= 7) return 2;
  return 3;
}

function scoreSleep(hours: number): number {
  if (hours >= 7) return 0;
  if (hours >= 6) return 1;
  if (hours >= 5) return 2;
  return 3;
}

function scoreOff(days: number): number {
  if (days >= 6) return 0;
  if (days >= 4) return 1;
  if (days >= 2) return 2;
  return 3;
}

function scoreSymptoms(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  return 3;
}

const driverLabel: Record<DriverId, string> = {
  jam: "jam kerja yang menelan weekend",
  klien: "terlalu banyak klien aktif sekaligus",
  tidur: "tidur yang sudah terpotong",
  libur: "hari libur yang hampir tidak ada",
  gejala: "tubuh yang sudah memberi sinyal",
};

function pickDriver(scores: Record<DriverId, number>): DriverId {
  const order: DriverId[] = ["jam", "libur", "tidur", "klien", "gejala"];
  return order.reduce((best, key) => (scores[key] > scores[best] ? key : best), order[0]);
}

function bandOf(score: number): BandId {
  if (score <= 4) return "hijau";
  if (score <= 9) return "amber";
  return "merah";
}

const bandLabel: Record<BandId, string> = {
  hijau: "Hijau — masih ada ruang",
  amber: "Amber — istirahat sudah tergeser",
  merah: "Merah — pola ini tidak bisa diteruskan apa adanya",
};

function headline(band: BandId, driver: DriverId): string {
  if (band === "hijau") {
    return "Pola kerjamu belum menandai burnout, tapi tetap jaga satu batas supaya weekend tidak pelan-pelan hilang.";
  }
  if (band === "amber") {
    return `Bebanmu sudah menggeser istirahat. Pendorong utamanya: ${driverLabel[driver]}.`;
  }
  return `Ini pita merah. Yang paling menekan sekarang: ${driverLabel[driver]}. Potong satu beban sebelum menambah klien baru.`;
}

function plan(input: CekInput, driver: DriverId, band: BandId): PlanStep[] {
  const cap = Math.max(35, Math.min(45, input.hoursWeek - (band === "merah" ? 12 : 8)));
  const offTarget = Math.max(input.daysOff + 2, band === "merah" ? 4 : 3);
  const sleepTarget = input.sleepHours >= 7 ? 7 : Math.min(7.5, input.sleepHours + 1);
  const sleepText = sleepTarget.toLocaleString("id-ID", { maximumFractionDigits: 1 });

  const first: Record<DriverId, string> = {
    jam: `Tutup laptop pukul yang sama tiga malam berturut. Target jam minggu ini turun ke sekitar ${cap} jam, bukan nol.`,
    libur: "Pilih satu tanggal di kalender 14 hari ini dan tulis LIBUR. Tolak revisi yang minta dikerjakan di tanggal itu.",
    tidur: `Naikkan tidur ke sekitar ${sleepText} jam. Chat klien yang masuk setelah jam tidur dibalas besok, kecuali benar-benar darurat yang sudah disepakati.`,
    klien: "Jangan terima brief baru selama tiga hari. Klien yang sudah berjalan tetap dilayani di jam yang sudah dijanjikan.",
    gejala: "Catat gejala yang muncul dan jamnya. Kalau dada sesak atau kamu takut membuka laptop, kurangi layar hari itu, jangan tambah kopi lalu lanjut.",
  };

  return [
    {
      window: "Hari 1–3",
      title: "Pasang batas yang kelihatan",
      action: first[driver],
    },
    {
      window: "Hari 4–7",
      title: band === "merah" && input.activeClients >= 4 ? "Lepas satu klien" : "Jeda satu klien",
      action:
        band === "merah" && input.activeClients >= 4
          ? "Pilih satu klien dengan revisi paling sering. Kirim naskah selesai, bukan naskah jeda. Selesaikan hanya antrean yang sudah masuk."
          : "Pilih satu klien yang paling sering minta revisi di luar jam. Kirim naskah jeda. Klien lain tetap jalan.",
    },
    {
      window: "Hari 8–11",
      title: "Kembalikan tidur dan satu hari kosong",
      action: `Target tidur sekitar ${sleepText} jam dan setidaknya ${offTarget} hari tanpa kerja di hitungan 30 hari ke depan. Satu hari di jendela ini harus benar-benar tanpa revisi.`,
    },
    {
      window: "Hari 12–14",
      title: "Tulis kapasitas minggu depan",
      action: `Tuliskan jam maksimum minggu depan (mulai dari ${cap} jam) dan jumlah klien yang masih kamu layani. Kalau permintaan baru tidak muat, jawab dengan jadwal, bukan dengan “bisa saya usahakan malam ini”.`,
    },
  ];
}

function clientScript(input: CekInput, band: BandId): { kind: "jeda" | "selesai"; text: string } {
  const finish = band === "merah" && input.activeClients >= 4;
  if (finish) {
    return {
      kind: "selesai",
      text: "Halo, aku mau menutup kerjaan kita setelah antrean yang sudah masuk selesai. Beberapa minggu terakhir jam kerjaku melewati batas yang masih bisa kujaga kualitasnya, dan menambah revisi di luar itu membuat hasilnya turun. Aku selesaikan putaran yang sudah disepakati, lalu kita berhenti di situ. Terima kasih sudah percaya. Kalau nanti ada proyek dengan jadwal yang lebih longgar, kita bisa bicara lagi.",
    };
  }
  return {
    kind: "jeda",
    text: "Halo, aku perlu jeda proyek kita mulai minggu depan. Dua minggu terakhir aku kerja hampir tanpa hari kosong, dan revisi tambahan mulai menggeser tidur. Aku selesaikan putaran yang sudah masuk, lalu kita jeda dulu supaya hasil berikutnya tidak asal jadi. Kalau ada yang mendesak, kita jadwalkan satu putaran di jam kerja, bukan tambahan di malam atau weekend. Aku kabari lagi saat kapasitasku kembali.",
  };
}

export function decideCek(input: CekInput): CekResult {
  const scores: Record<DriverId, number> = {
    jam: scoreHours(input.hoursWeek),
    klien: scoreClients(input.activeClients),
    tidur: scoreSleep(input.sleepHours),
    libur: scoreOff(input.daysOff),
    gejala: scoreSymptoms(input.symptoms.length),
  };
  const score = scores.jam + scores.klien + scores.tidur + scores.libur + scores.gejala;
  const driver = pickDriver(scores);
  const band = bandOf(score);
  const script = clientScript(input, band);
  const named = input.symptoms.map((id) => symptomLabel[id]);
  return {
    band,
    bandLabel: bandLabel[band],
    headline: headline(band, driver),
    score,
    driver,
    driverLabel: driverLabel[driver],
    plan: plan(input, driver, band),
    clientScript: script.text,
    scriptKind: script.kind,
    assumptions: [
      "Pita ini membaca pola beban, bukan diagnosis medis dan bukan tes klinis.",
      "Skor menjumlahkan jam, jumlah klien, tidur, hari libur sebulan, dan gejala yang kamu centang. Maksimum 15.",
      "Hijau 0–4, amber 5–9, merah 10–15.",
      named.length
        ? `Gejala yang masuk hitungan: ${named.join("; ")}.`
        : "Tidak ada gejala tubuh yang dicentang, jadi bagian itu bernilai nol.",
      "Naskah klien sengaja tanpa angka tarif. Kamu yang mengisi nama klien sebelum mengirim.",
    ],
  };
}
