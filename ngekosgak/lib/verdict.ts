import { choiceLabel, modeLabel } from "@/lib/labels";
import { formatRupiah } from "@/lib/price";
import type { Choice, CommuteInput, CommuteResult, MoneyLine, Side } from "@/lib/types";

const WEEKS = 4.33;
const LOCAL_DAILY = 12_000;
const LOCAL_MINUTES = 25;
const MEAL_DAILY = 40_000;
const LAUNDRY_MONTH = 150_000;

function monthDaily(daily: number, daysPerWeek: number): number {
  return Math.round(daily * daysPerWeek * WEEKS);
}

function hours(minutes: number, times: number): number {
  return Math.round((minutes * times) / 60);
}

function line(label: string, amount: number): MoneyLine {
  return { label, amount };
}

export function decideCommute(input: CommuteInput): CommuteResult {
  const makan = input.perks.includes("makan");
  const cucian = input.perks.includes("cucian");
  const keluarga = input.perks.includes("keluarga");

  const ppTransport = monthDaily(input.dailyCost, input.officeDays);
  const localTransport = monthDaily(LOCAL_DAILY, input.officeDays);
  const meals = makan ? monthDaily(MEAL_DAILY, input.officeDays) : 0;
  const laundry = cucian ? LAUNDRY_MONTH : 0;
  const roundTripMinutes = input.minutesOneWay * 2;
  const officeTripsYear = input.officeDays * 52;

  const kosVisits = keluarga ? 2 : 1;
  const kosVisitCost = input.dailyCost * kosVisits;
  const hybridVisitCost = monthDaily(input.dailyCost, 1);

  const ppHours = hours(roundTripMinutes, officeTripsYear);
  const localHours = hours(LOCAL_MINUTES * 2, officeTripsYear);
  const kosHours = localHours + hours(roundTripMinutes, kosVisits * 12);
  const hybridHours = localHours + hours(roundTripMinutes, 52);

  const sleepMinutes = Math.min(100, Math.max(0, input.minutesOneWay - 40));
  const sleepHours = hours(sleepMinutes, officeTripsYear);

  const kosCash = input.kosBudget + localTransport + meals + laundry + kosVisitCost;
  const hybridCash = input.kosBudget + localTransport + meals + hybridVisitCost;
  const ppCash = ppTransport;

  const sides: Side[] = [
    {
      choice: "pulang",
      title: choiceLabel.pulang,
      cash: ppCash,
      hoursYear: ppHours,
      sleepHoursYear: 0,
      lines: [
        line("Ongkos jalan hari kantor", ppTransport),
        line("Sewa kos", 0),
        line("Makan tetap di rumah", 0),
      ],
      note: "Kamu tetap tidur di rumah. Jam di jalan tidak berkurang.",
    },
    {
      choice: "hibrid",
      title: choiceLabel.hibrid,
      cash: hybridCash,
      hoursYear: hybridHours,
      sleepHoursYear: sleepHours,
      lines: [
        line("Sewa kos sebulan", input.kosBudget),
        line("Jalan pendek hari kantor", localTransport),
        line("Makan pengganti hari kantor", meals),
        line("Pulang rumah tiap akhir pekan", hybridVisitCost),
      ],
      note: cucian
        ? "Cucian dihitung tetap dikerjakan di rumah akhir pekan, jadi tidak ditambah ongkos laundry."
        : "Kamu tetap bayar sewa penuh, lalu pulang di akhir pekan.",
    },
    {
      choice: "ngekos",
      title: choiceLabel.ngekos,
      cash: kosCash,
      hoursYear: kosHours,
      sleepHoursYear: sleepHours,
      lines: [
        line("Sewa kos sebulan", input.kosBudget),
        line("Jalan pendek hari kantor", localTransport),
        line("Makan pengganti", meals),
        line("Cucian pengganti", laundry),
        line(keluarga ? "Pulang ke rumah dua kali sebulan" : "Pulang ke rumah sebulan sekali", kosVisitCost),
      ],
      note: "Hari kerja dekat kantor. Kunjungan ke rumah lebih jarang daripada pola hibrid.",
    },
  ];

  const fixedKosCosts = localTransport + meals + laundry + kosVisitCost;
  const breakEvenKos = ppCash - fixedKosCosts;
  const twentyCap = Math.round(input.takeHome * 0.2);
  const twentyShare = ppTransport / input.takeHome;
  const overTwenty = ppTransport > twentyCap;

  const choice = pickChoice({
    ppCash,
    kosCash,
    hybridCash,
    ppHours,
    keluarga,
  });

  const chosen = sides.find((side) => side.choice === choice) ?? sides[0];
  const route = `${input.homeArea} → ${input.officeArea}`;
  const headline = headlineFor(choice);
  const summary = [
    `Untuk ${route} naik ${modeLabel[input.mode]}, pola yang paling dekat dengan isianmu adalah ${chosen.title.toLowerCase()}.`,
    `Pulang-pergi menghabiskan sekitar ${formatRupiah(ppCash)} per bulan dan ${ppHours.toLocaleString("id-ID")} jam di jalan dalam setahun.`,
    sleepHours > 0
      ? `Kalau hari kerja dekat kantor, perkiraan tidur pagi yang kembali sekitar ${sleepHours.toLocaleString("id-ID")} jam setahun.`
      : "Perjalanan sekali jalan masih relatif pendek, jadi tidur pagi tidak banyak berubah.",
    `Sewa kos yang impas dengan ongkos pulang-pergi, setelah makan, cucian, dan kunjungan, ada di ${breakEvenKos > 0 ? formatRupiah(breakEvenKos) : "bawah nol"}. Anggaran kosmu ${formatRupiah(input.kosBudget)}.`,
  ].join(" ");

  return {
    choice,
    headline,
    summary,
    sides,
    breakEvenKos,
    transportMonthly: ppTransport,
    twentyShare,
    twentyCap,
    overTwenty,
    twentyNote: overTwenty
      ? `Ongkos jalan ${formatRupiah(ppTransport)} melewati 20% dari gaji bersih (${formatRupiah(twentyCap)}). Angka 20% itu patokan yang sering dikutip di media, bukan saran untuk pindah atau bertahan.`
      : `Ongkos jalan ${formatRupiah(ppTransport)} masih di bawah 20% gaji bersih (${formatRupiah(twentyCap)}). Patokan itu hanya pembanding umum, bukan batas yang wajib ditaati.`,
    hybridNote: keluarga
      ? "Karena ada tugas di rumah, pola hibrid tetap membayar sewa sebulan penuh dan ongkos pulang tiap akhir pekan. Itu kompromi, bukan kos yang lebih murah secara otomatis."
      : "Pola hibrid tetap sewa bulanan. Bedanya, akhir pekan kamu pulang dan jam panjang hanya terjadi seminggu sekali, bukan tiap hari kantor.",
    checklist: checklistFor(input),
    assumptions: [
      `Ongkos harian yang kamu isi dianggap biaya pulang-pergi satu hari kantor. Kunjungan ke rumah memakai angka yang sama, sekali jalan pergi-pulang.`,
      `Dekat kantor diasumsikan ${LOCAL_MINUTES} menit sekali jalan dan ${formatRupiah(LOCAL_DAILY)} per hari. Ubah angkanya di kepala kalau kosmu lebih jauh dari itu.`,
      makan
        ? `Makan di rumah diganti ${formatRupiah(MEAL_DAILY)} per hari kantor. Ini bukan harga warteg tertentu.`
        : "Makan tidak ditambah karena rumah tidak kamu tandai sebagai penyedia makan.",
      cucian
        ? `Cucian pengganti saat ngekos penuh ${formatRupiah(LAUNDRY_MONTH)} per bulan. Pada pola hibrid, cucian tetap di rumah.`
        : "Cucian tidak ditambah karena tidak ditandai.",
      "Jam tidur yang kembali adalah perkiraan dari waktu berangkat yang lebih siang, bukan pemeriksaan kesehatan.",
      "Gaji bersih hanya dipakai untuk membandingkan ongkos jalan dengan patokan 20%. Laporan ini tidak menilai apakah gaji itu cukup.",
    ],
  };
}

function pickChoice(input: {
  ppCash: number;
  kosCash: number;
  hybridCash: number;
  ppHours: number;
  keluarga: boolean;
}): Choice {
  const { ppCash, kosCash, hybridCash, ppHours, keluarga } = input;
  const heavy = ppHours >= 650;
  const mild = ppHours < 350;

  if (heavy && keluarga && hybridCash <= ppCash * 1.25) return "hibrid";
  if (heavy && kosCash <= ppCash * 1.15 && (!keluarga || kosCash + 250_000 < hybridCash)) return "ngekos";
  if (heavy && hybridCash <= ppCash * 1.2) return "hibrid";
  if (mild && ppCash <= Math.min(kosCash, hybridCash) * 1.08) return "pulang";
  if (keluarga && hybridCash <= kosCash && hybridCash <= ppCash * 1.35) return "hibrid";
  if (kosCash + 150_000 < ppCash && ppHours >= 450) return "ngekos";
  if (ppCash <= kosCash && ppCash <= hybridCash) return "pulang";
  if (hybridCash <= kosCash) return "hibrid";
  return "ngekos";
}

function headlineFor(choice: Choice): string {
  if (choice === "ngekos") return "Ngekos lebih masuk akal untuk jam dan uang di isian ini.";
  if (choice === "hibrid") return "Kos hari kerja, rumah akhir pekan — kompromi yang paling dekat.";
  return "Tetap pulang-pergi masih lebih ringan daripada kos yang kamu anggarkan.";
}

function checklistFor(input: CommuteInput): string[] {
  const items = [
    "Tanya deposit, listrik, air, dan minimum kontrak sebelum uang sewa dianggap murah.",
    "Coba jalan dari kos ke kantor pada jam berangkatmu, termasuk saat hujan.",
    "Hitung lembur: moda pulang malam bisa lebih mahal atau lebih sepi daripada jam pagi.",
    "Simpan barang yang harus dibawa pulang tiap minggu, jangan hanya bayangkan kasur.",
    "Mulai dari sewa satu bulan kalau pemiliknya mengizinkan, sebelum kontrak panjang.",
  ];
  if (input.perks.includes("makan")) {
    items.push("Sepakati siapa yang masak. Angka makan di laporan ini asumsi, bukan daftar belanja.");
  }
  if (input.perks.includes("cucian")) {
    items.push("Cek jemuran, air, dan apakah kamu akan bawa cucian pulang.");
  }
  if (input.perks.includes("keluarga")) {
    items.push("Tentukan hari pulang sebelum pindah, supaya tugas di rumah tidak menggantung.");
  }
  if (input.mode === "krl") {
    items.push("Ukur jalan kaki dari kos ke stasiun, bukan hanya dari stasiun ke kantor.");
  }
  if (input.mode === "motor" || input.mode === "mobil") {
    items.push("Parkir dan macet di sekitar kos tetap dihitung. Peta yang hijau bisa macet jam tujuh.");
  }
  if (input.mode === "ojol") {
    items.push("Ongkos ojol pendek naik saat hujan. Angka lokal di laporan ini rata, bukan tarif puncak.");
  }
  return items;
}
