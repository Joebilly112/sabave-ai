import { BACKUP_LABEL, SYMPTOM_LABEL, type CekInput, type CekResult, type NightMark } from "@/lib/types";

function pointsOf(input: CekInput): number {
  let points = 0;
  if (input.nightsOnCall >= 10) points += 3;
  else if (input.nightsOnCall >= 7) points += 2;
  else if (input.nightsOnCall >= 4) points += 1;

  if (input.birthsAfterMidnight >= 6) points += 3;
  else if (input.birthsAfterMidnight >= 3) points += 2;
  else if (input.birthsAfterMidnight >= 1) points += 1;

  if (input.sleepHours < 4) points += 3;
  else if (input.sleepHours < 5) points += 2;
  else if (input.sleepHours < 7) points += 1;

  if (input.backup === "tidak") points += 2;
  else if (input.backup === "kadang") points += 1;

  const count = input.symptoms.length;
  if (count >= 5) points += 3;
  else if (count >= 3) points += 2;
  else if (count >= 1) points += 1;

  return points;
}

function protectCount(input: CekInput, band: CekResult["band"]): number {
  if (band === "kritis") return input.backup === "ada" ? 4 : 5;
  if (band === "waspada") return input.backup === "tidak" ? 4 : 3;
  return input.sleepHours < 6 || input.birthsAfterMidnight >= 3 ? 2 : 1;
}

function marks(input: CekInput, protect: number): NightMark[] {
  const first =
    input.birthsAfterMidnight >= 3
      ? "Malam setelah persalinan lewat tengah malam"
      : "Malam paling dekat setelah jaga panjang";
  const list: NightMark[] = [
    {
      label: "Dilindungi",
      title: first,
      detail:
        protect === 1
          ? "Satu malam ini tidak masuk daftar on-call. Tidur di rumah, telepon praktik diserahkan."
          : "Ini malam pertama yang kamu lepaskan. Jangan diisi kontrol rutin hanya karena pasien sudah kenal.",
    },
  ];
  if (protect >= 3) {
    list.push({
      label: "Dilindungi",
      title: "Dua malam di pertengahan 14 hari",
      detail: "Letakkan di hari yang biasanya ramai chat, bukan hanya di hari yang sudah sepi.",
    });
  }
  if (protect >= 5) {
    list.push({
      label: "Dilindungi",
      title: "Satu malam di akhir dua minggu",
      detail: "Kalau lima malam terasa mustahil, mulai dari tiga yang tertulis, lalu tambah dua sebelum siklus berikutnya.",
    });
  }
  list.push({
    label: "Tetap jaga",
    title: "Persalinan yang sudah berjalan",
    detail:
      "Halaman ini tidak menyuruh menolak kala yang sudah dimulai. Yang dijaga adalah siaga kosong dan janji yang bisa digeser ke siang.",
  });
  return list;
}

function patientScript(input: CekInput, protect: number): string {
  const sleep = input.sleepHours.toString().replace(".", ",");
  return `Bu, dua minggu ke depan saya melindungi ${protect} malam supaya bisa tidur. Rata-rata tidur saya belakangan ${sleep} jam, jadi kontrol rutin saya jadwalkan siang. Kalau persalinan sudah berjalan atau ada tanda yang tidak bisa menunggu, saya tetap sambungkan ke jalur jaga — bukan saya hilang. Chat di luar jam siang saya balas besok pagi.`;
}

function backupScript(input: CekInput, protect: number): string {
  if (input.backup === "tidak") {
    return `Saya belum punya rekan cadangan. Sebelum 14 hari ini berjalan, saya perlu satu nama yang bersedia menutup ${protect} malam, atau pasien darurat di malam itu diarahkan ke faskes yang memang buka. Saya tidak akan menulis "ada backup" di status kalau orangnya belum setuju.`;
  }
  if (input.backup === "kadang") {
    return `Rekan, cadangan kita selama ini tidak tetap. Saya minta ${protect} malam dalam 14 hari ke depan tertulis di jadwal, bukan hanya "kabari kalau bisa". Malam itu telepon pasien saya teruskan ke kamu, dan saya tidak on-call ganda. Kalau kamu tidak bisa di tanggal itu, kita geser malamnya sebelum diumumkan ke pasien.`;
  }
  return `Rekan, saya lepaskan ${protect} malam dalam 14 hari ke depan dari on-call saya. Tolong kunci tanggalnya sekarang. Di malam itu saya tidak standby, dan pasien yang sudah dalam persalinan kamu yang pegang sampai selesai. Besok paginya kita tukar catatan singkat, bukan saya yang tetap menjawab chat.`;
}

function headline(band: CekResult["band"], protect: number): string {
  if (band === "kritis") return `Pita kritis. Lindungi ${protect} malam sebelum siklus jaga berulang.`;
  if (band === "waspada") return `Pita waspada. ${protect} malam dalam 14 hari perlu dikosongkan.`;
  return `Pita aman, dengan ${protect} malam pulih supaya pola ini tidak merayap.`;
}

function note(input: CekInput, band: CekResult["band"]): string {
  const symptom =
    input.symptoms.length === 0
      ? "Kamu tidak mencentang gejala tubuh atau suasana."
      : `Yang kamu centang: ${input.symptoms.map((id) => SYMPTOM_LABEL[id].toLowerCase()).join(", ")}.`;
  const bandLine =
    band === "kritis"
      ? "Angka ini menandai beban jaga yang sudah menekan tidur, bukan diagnosis."
      : band === "waspada"
        ? "Angka ini menandai pola yang mulai menggeser istirahat dan rumah, bukan surat sakit."
        : "Angka ini menandai beban yang masih tertahan, bukan izin untuk menambah malam.";
  return `${bandLine} ${input.nightsOnCall} malam on-call dan ${input.birthsAfterMidnight} persalinan lewat tengah malam dalam 14 hari, tidur rata-rata ${input.sleepHours.toString().replace(".", ",")} jam. ${BACKUP_LABEL[input.backup]}. ${symptom} Kalau kamu hampir tertidur saat menolong atau merasa tidak aman memegang pasien, berhenti dari jaga dan hubungi rekan atau faskes — jangan menunggu pita ini.`;
}

export function decideCek(input: CekInput): CekResult {
  const points = pointsOf(input);
  const band = points <= 4 ? "aman" : points <= 8 ? "waspada" : "kritis";
  const protectNights = protectCount(input, band);
  const bandLabel = band === "aman" ? "Aman" : band === "waspada" ? "Waspada" : "Kritis";
  return {
    points,
    band,
    bandLabel,
    headline: headline(band, protectNights),
    protectNights,
    protectLabel: `${protectNights} malam dilindungi dalam 14 hari ke depan`,
    marks: marks(input, protectNights),
    patientScript: patientScript(input, protectNights),
    backupScript: backupScript(input, protectNights),
    note: note(input, band),
    assumptions: [
      "Pita dihitung dari isianmu: malam on-call, persalinan lewat tengah malam, jam tidur, cadangan, dan gejala. Bukan rekam medis.",
      "Ambang aman (0–4), waspada (5–8), dan kritis (9–14) adalah skala situs ini, bukan standar organisasi profesi.",
      "Malam yang dilindungi adalah usulan jadwal, bukan perintah menutup praktik atau menolak persalinan yang sudah berjalan.",
      "Naskah batas untuk dikirim setelah kamu sesuaikan nama. Situs ini tidak menghubungi pasien.",
    ],
  };
}
