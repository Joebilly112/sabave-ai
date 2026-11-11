import { cancelLabel, complaintLabel, formatRating, platformLabel } from "@/lib/labels";
import type { BandId, CekInput, CekResult, ComplaintId, DriverId, PlanBlock, ScorePart, ScriptCard } from "@/lib/types";

function ratingPoints(rating: number): number {
  if (rating >= 4.9) return 6;
  if (rating >= 4.85) return 16;
  if (rating >= 4.75) return 28;
  if (rating >= 4.6) return 42;
  if (rating >= 4.4) return 58;
  if (rating >= 4.15) return 72;
  return 86;
}

function cancelPoints(cancel: CekInput["cancel"]): number {
  if (cancel === "tidak") return 0;
  if (cancel === "sedikit") return 14;
  return 32;
}

function complaintPoints(items: ComplaintId[]): number {
  const weight: Record<ComplaintId, number> = { kasar: 11, helm: 9, rute: 8, telat: 8 };
  return items.reduce((sum, item) => sum + weight[item], 0);
}

function volumePoints(trips: number, cancel: CekInput["cancel"]): number {
  let points = 0;
  if (trips === 0) points = 14;
  else if (trips < 12) points = 18;
  else if (trips < 35) points = 7;
  if (trips >= 50 && cancel === "sering") points += 6;
  return points;
}

function bandFor(score: number): BandId {
  if (score <= 34) return "aman";
  if (score <= 64) return "waspada";
  return "kritis";
}

const BAND_LABEL: Record<BandId, string> = {
  aman: "Aman",
  waspada: "Waspada",
  kritis: "Kritis",
};

function headline(band: BandId, input: CekInput): string {
  const rating = formatRating(input.rating);
  if (band === "aman") {
    return `Rating ${rating} masih di pita yang biasanya tidak menggeser prioritas order, selama batal dan keluhan minggu ini tidak bertambah.`;
  }
  if (band === "waspada") {
    return `Bintang di ${rating} sudah merosot cukup untuk dijaga. Kalau pola minggu ini terulang, prioritas order bisa tergeser pelan-pelan.`;
  }
  return `Pola di rating ${rating} masuk pita kritis. Pulihkan dulu lewat order yang selesai rapi sebelum menambah batal atau skip.`;
}

function complaintFocus(input: CekInput): string {
  if (input.complaints.length === 0) {
    return "Belum ada keluhan yang kamu tandai. Di sepuluh order ini, tanyakan sekali di akhir apakah perjalanan nyaman, lalu diam. Jangan memohon bintang.";
  }
  const names = input.complaints.map((item) => complaintLabel(item)).join(", ");
  const lines: string[] = [`Keluhan yang kamu sebut: ${names}.`];
  if (input.complaints.includes("helm")) {
    lines.push("Siapkan helm bersih sebelum penumpang membuka pintu, dan tawarkan ganti ukuran tanpa menunggu diminta.");
  }
  if (input.complaints.includes("rute")) {
    lines.push("Ulangi tujuan sebelum jalan. Kalau macet, sebut dua pilihan dan biarkan penumpang yang memutuskan.");
  }
  if (input.complaints.includes("telat")) {
    lines.push("Kirim satu kabar ETA begitu order diterima. Jangan menghilang dari chat lalu muncul di titik jemput.");
  }
  if (input.complaints.includes("kasar")) {
    lines.push("Satu kalimat maaf di awal lebih berguna daripada penjelasan panjang. Potong musik, dan jangan memotong ucapan penumpang.");
  }
  return lines.join(" ");
}

function plan(input: CekInput): PlanBlock[] {
  const cancelLine =
    input.cancel === "sering"
      ? "Empat batal atau lebih dalam seminggu biasanya lebih berat daripada satu bintang yang goyah. Terima hanya order yang benar-benar kamu selesaikan."
      : input.cancel === "sedikit"
        ? "Satu sampai tiga batal masih bisa diimbangi, asal dua puluh order berikut tidak menambah skip baru. Batal hanya kalau keselamatan yang menuntut."
        : "Kamu hampir tidak batal. Pertahankan itu. Jangan mulai skip hanya karena order terasa sepi.";

  const volumeLine =
    input.trips < 12
      ? `Tujuh hari terakhir hanya ${input.trips} order selesai. Setiap keluhan jadi lebih kelihatan, jadi dua puluh order ini harus bersih.`
      : `Ada ${input.trips} order selesai dalam tujuh hari. Volume ini bisa mengencerkan satu keluhan, asal pola yang sama tidak masuk lagi.`;

  return [
    {
      range: "Order 1–5",
      title: "Berhenti menambah luka",
      detail: `${cancelLine} ${volumeLine}`,
    },
    {
      range: "Order 6–10",
      title: "Rapikan keluhan yang paling sering",
      detail: complaintFocus(input),
    },
    {
      range: "Order 11–15",
      title: "Obrolan pendek, bukan pembelaan",
      detail:
        "Sapa sekali, konfirmasi tujuan, lalu beri ruang. Kalau suasana tegang, satu kalimat cukup: “Saya sesuaikan supaya perjalanan ini nyaman.” Jangan berdebat soal bintang di tengah jalan.",
    },
    {
      range: "Order 16–20",
      title: "Tutup minggu tanpa memaksa ulasan",
      detail:
        "Di akhir perjalanan yang memang mulus, kamu boleh bertanya sekali apakah ada yang kurang. Jangan meminta bintang lima, jangan menawar ulasan, dan jangan membeli review. Tutup aplikasi sebentar setelah order yang buruk supaya kamu tidak membalas dengan nada kaku.",
    },
  ];
}

function scripts(input: CekInput): ScriptCard[] {
  const cards: ScriptCard[] = [];
  if (input.complaints.includes("helm") || input.complaints.length === 0) {
    cards.push({
      situation: "Helm",
      text: "Pak/Bu, helm bersihnya saya taruh di sini. Kalau kekecilan, saya ganti dulu sebelum kita berangkat.",
    });
  }
  if (input.complaints.includes("rute") || input.complaints.includes("telat")) {
    cards.push({
      situation: "Rute atau telat",
      text: "Saya sudah sampai dekat titik jemput. Tujuan tetap yang di aplikasi, ya? Kalau macet di depan, saya bisa lewat jalan biasa atau tetap di rute ini — Bapak/Ibu yang pilih.",
    });
  }
  if (input.complaints.includes("kasar")) {
    cards.push({
      situation: "Suasana tegang",
      text: "Maaf kalau tadi nada saya terdengar singkat. Saya lanjut pelan, dan kalau ada yang kurang nyaman silakan bilang sekarang.",
    });
  }
  if (input.cancel !== "tidak") {
    cards.push({
      situation: "Hampir membatalkan",
      text: "Order ini saya ambil dan saya selesaikan. Kalau titik jemput atau tujuan terasa tidak aman, saya kabari penumpang dulu, lalu baru putuskan — bukan langsung skip.",
    });
  }
  if (cards.length < 2) {
    cards.push({
      situation: "Penumpang diam",
      text: "Selamat pagi. Tujuan sesuai aplikasi, ya? Saya nyalakan AC dan helmnya siap. Kalau nanti ada permintaan di jalan, bilang saja.",
    });
  }
  cards.push({
    situation: "Akhir perjalanan",
    text: "Sudah sampai. Kalau ada yang kurang tadi, saya catat buat order berikut. Hati-hati di turunan.",
  });
  return cards.slice(0, 3);
}

export function decideCek(input: CekInput): CekResult {
  const parts: ScorePart[] = [
    { id: "rating", label: "Posisi bintang sekarang", points: ratingPoints(input.rating) },
    { id: "batal", label: "Pola batal atau skip", points: cancelPoints(input.cancel) },
    { id: "keluhan", label: "Keluhan yang berulang", points: complaintPoints(input.complaints) },
    { id: "volume", label: "Order selesai 7 hari", points: volumePoints(input.trips, input.cancel) },
  ];
  const score = Math.min(100, parts.reduce((sum, part) => sum + part.points, 0));
  const ranked = [...parts].sort((a, b) => b.points - a.points);
  const driver: DriverId = ranked[0]?.id ?? "rating";
  const band = bandFor(score);
  const complaintText =
    input.complaints.length === 0 ? "belum ada keluhan yang ditandai" : input.complaints.map(complaintLabel).join(", ");

  return {
    score,
    band,
    bandLabel: BAND_LABEL[band],
    headline: headline(band, input),
    driver,
    driverLabel: parts.find((part) => part.id === driver)?.label ?? "Posisi bintang sekarang",
    parts,
    plan: plan(input),
    scripts: scripts(input),
    assumptions: [
      `Ini bacaan dari isianmu di ${platformLabel(input.platform)}, bukan angka dari sistem aplikasi.`,
      "Tidak ada ambang resmi yang kami klaim untuk Gojek, Grab, Maxim, atau inDrive. Pita ini alat urut prioritas, bukan ramalan pemblokiran.",
      `Pola yang masuk hitungan: rating ${formatRating(input.rating)}, ${cancelLabel(input.cancel)}, ${complaintText}, ${input.trips} order selesai.`,
      "Batal karena keselamatan tetap boleh. Yang dihitung berbahaya adalah skip yang jadi kebiasaan.",
      "Membeli ulasan atau menekan penumpang untuk bintang lima bisa memperburuk akun. Rencana ini tidak menyarankan itu.",
    ],
  };
}
