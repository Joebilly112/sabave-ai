import { CERTS, GOALS, UNITS, YEARS } from "@/lib/types";
import type { CertId, GoalId, Intake, Recommendation, UnitId, YearsId } from "@/lib/types";

type Training = {
  id: CertId;
  name: string;
  timeCost: string;
  fomo: number;
  goals: Partial<Record<GoalId, number>>;
  units: UnitId[];
};

const CATALOG: Training[] = [
  {
    id: "bls",
    name: "BLS / bantuan hidup dasar",
    timeCost: "1 hari (sekitar 8 jam). Biasanya yang termurah dan paling mudah dititipkan shift-nya.",
    fomo: 2,
    goals: { ward: 4, icu: 3, komunitas: 3, "luar-negeri": 2 },
    units: ["igd", "icu", "nicu", "ok", "rawat-inap", "lainnya"],
  },
  {
    id: "btcls",
    name: "BTCLS",
    timeCost: "2–3 hari off, plus satu shift pemulihan. Biaya kursus umumnya mandiri, bukan seminar gratisan rumah sakit.",
    fomo: 5,
    goals: { ward: 8, icu: 8, komunitas: 2, "luar-negeri": 6 },
    units: ["igd", "rawat-inap", "icu", "lainnya"],
  },
  {
    id: "acls",
    name: "ACLS",
    timeCost: "2 hari intensif. Lebih masuk akal setelah BTCLS, supaya kamu tidak membayar materi yang sama dua kali.",
    fomo: 4,
    goals: { ward: 3, icu: 7, komunitas: 1, "luar-negeri": 6 },
    units: ["igd", "icu"],
  },
  {
    id: "icu",
    name: "Dasar keperawatan kritis / ICU",
    timeCost: "4–5 hari atau modul dua minggu. Susah diselipkan kalau jatah cuti tipis dan tidak ada pengganti dinas.",
    fomo: 5,
    goals: { ward: 2, icu: 9, komunitas: 0, "luar-negeri": 5 },
    units: ["icu", "igd"],
  },
  {
    id: "luka",
    name: "Perawatan luka",
    timeCost: "2 hari teori dan praktik. Bahan habis pakai sering ikut ditanggung peserta, jadi siapkan anggaran kecil di luar biaya daftar.",
    fomo: 5,
    goals: { ward: 7, icu: 2, komunitas: 5, "luar-negeri": 1 },
    units: ["rawat-inap", "poli", "puskesmas", "komunitas"],
  },
  {
    id: "ppi",
    name: "PPI / kewaspadaan standar",
    timeCost: "1–2 hari, sering in-house. Waktu hilang sedikit, dan biasanya lebih murah daripada kursus luar.",
    fomo: 1,
    goals: { ward: 6, icu: 4, komunitas: 6, "luar-negeri": 2 },
    units: ["rawat-inap", "icu", "nicu", "poli", "puskesmas", "ok", "hd", "komunitas", "igd"],
  },
  {
    id: "hd",
    name: "Hemodialisis",
    timeCost: "Berminggu-minggu preceptorship, bukan tiket akhir pekan. Hanya layak kalau unitmu memang HD atau kamu sudah ada jalur pindah.",
    fomo: 2,
    goals: { ward: 1, icu: 1, komunitas: 0, "luar-negeri": 1 },
    units: ["hd"],
  },
  {
    id: "nicu",
    name: "NICU / keperawatan perinatal",
    timeCost: "3–5 hari plus orientasi ruang. Waktu dan uangnya terbuang kalau kamu tidak ada rencana masuk neonatus.",
    fomo: 2,
    goals: { ward: 1, icu: 2, komunitas: 1, "luar-negeri": 2 },
    units: ["nicu"],
  },
  {
    id: "ok",
    name: "Perawat kamar operasi",
    timeCost: "3 hari prinsip bedah, lalu orientasi OK. Berguna hanya kalau kamu memang menuju kamar operasi.",
    fomo: 1,
    goals: { ward: 1, icu: 1, komunitas: 0, "luar-negeri": 2 },
    units: ["ok"],
  },
  {
    id: "komunitas",
    name: "Keperawatan komunitas / promkes",
    timeCost: "2–3 hari, sering lewat dinas atau puskesmas. Lebih murah daripada kursus rumah sakit swasta.",
    fomo: 1,
    goals: { ward: 1, icu: 0, komunitas: 9, "luar-negeri": 1 },
    units: ["puskesmas", "komunitas", "poli"],
  },
  {
    id: "manajemen",
    name: "Manajemen bangsal",
    timeCost: "2–4 hari. Baru terasa kalau kamu sudah pegang shift leader — kalau belum, ini sertifikat yang mengendap.",
    fomo: 2,
    goals: { ward: 5, icu: 2, komunitas: 2, "luar-negeri": 1 },
    units: ["rawat-inap", "igd", "icu"],
  },
  {
    id: "kredensial-ln",
    name: "Bahasa medis dan berkas jalur luar negeri",
    timeCost: "3–6 bulan (bahasa dan dokumen), bukan pelatihan Sabtu–Minggu. Uang terbesar ada di tes bahasa dan legalisasi, bukan di sertifikat populer.",
    fomo: 3,
    goals: { ward: 0, icu: 1, komunitas: 0, "luar-negeri": 10 },
    units: [],
  },
];

const BY_ID = new Map(CATALOG.map((item) => [item.id, item]));

function labelOf<T extends { id: string; label: string }>(list: readonly T[], id: string): string {
  return list.find((item) => item.id === id)?.label ?? id;
}

function yearMod(years: YearsId, id: CertId): number {
  if (years === "lt1") {
    if (id === "bls" || id === "ppi" || id === "btcls") return 3;
    if (id === "icu" || id === "manajemen" || id === "kredensial-ln" || id === "hd") return -6;
    return 0;
  }
  if (years === "y1to3") {
    if (id === "btcls" || id === "luka" || id === "ppi") return 2;
    if (id === "manajemen" || id === "kredensial-ln") return -3;
    return 0;
  }
  if (years === "y3to5") {
    if (id === "icu" || id === "acls" || id === "luka") return 2;
    return 0;
  }
  if (id === "manajemen" || id === "kredensial-ln" || id === "acls") return 2;
  if (id === "bls") return -2;
  return 0;
}

function scoreOf(training: Training, intake: Intake): number {
  let score = training.goals[intake.goal] ?? 0;
  if (training.units.includes(intake.unit)) score += 3;
  score += yearMod(intake.years, training.id);

  const held = new Set(intake.held);
  if (intake.goal === "icu" && !held.has("btcls") && training.id === "btcls") score += 4;
  if (intake.goal === "icu" && !held.has("btcls") && training.id === "icu") score -= 2;
  if (intake.goal === "icu" && held.has("btcls") && training.id === "icu") score += 3;
  if (intake.goal === "icu" && held.has("btcls") && held.has("acls") && training.id === "icu") score += 2;
  if (training.id === "acls" && !held.has("btcls") && !held.has("bls")) score -= 2;
  if (intake.goal === "luar-negeri" && (intake.years === "lt1" || intake.years === "y1to3") && training.id === "kredensial-ln") {
    score -= 1;
  }
  return score;
}

function whyFor(training: Training, intake: Intake): string {
  const unit = labelOf(UNITS, intake.unit);
  const goal = labelOf(GOALS, intake.goal);
  const years = labelOf(YEARS, intake.years);

  if (training.id === "btcls" && intake.goal === "icu") {
    return `Kamu di ${unit}, masa kerja ${years.toLowerCase()}, dan tujuanmu ${goal.toLowerCase()}. BTCLS adalah tiket yang paling sering diminta sebelum ruang kritis menerima orientasi — lebih menggeser berkasmu daripada sertifikat yang hanya ramai di grup.`;
  }
  if (training.id === "icu") {
    return `Dasar ICU selaras dengan tujuanmu. Ambil ini ketika BTCLS sudah pegang, supaya minggu pelatihan yang panjang benar-benar membuka pintu ruang, bukan jadi PDF yang tidak dipakai karu.`;
  }
  if (training.id === "acls") {
    return `ACLS mengunci kemampuan ritme dan kode yang membedakan perawat IGD/ICU dari yang hanya punya BTCLS. Waktunya pendek, jadi muat di sela dinas kalau dasar hidup dasar sudah beres.`;
  }
  if (training.id === "luka") {
    return `Di ${unit}, luka adalah pekerjaan harian, bukan hobi sertifikat. Dua hari ini langsung kelihatan di asuhan, terutama kalau kamu belum punya jalur kritis.`;
  }
  if (training.id === "ppi") {
    return `PPI murah waktu dan sering bisa in-house. Untuk masa kerja ${years.toLowerCase()}, ini mengisi lubang yang dinilai atasan tanpa memakan cuti panjang.`;
  }
  if (training.id === "bls") {
    return `BLS adalah dasar yang masih bolong. Satu hari ini lebih berguna sekarang daripada mengejar pelatihan panjang yang mensyaratkan pengalaman yang belum kamu punya.`;
  }
  if (training.id === "komunitas") {
    return `Tujuanmu komunitas. Promkes dan keperawatan komunitas dibaca penempat puskesmas; sertifikat rumah sakit yang ramai tidak otomatis menaikkan berkasmu di dinas.`;
  }
  if (training.id === "kredensial-ln") {
    return `Jalur luar negeri tertahan di bahasa dan berkas, bukan di tumpukan sertifikat akhir pekan. Anggaran berikutmu lebih baik ke tes bahasa dan legalisasi daripada satu lagi kursus yang tidak diminta agen.`;
  }
  if (training.id === "manajemen") {
    return `Dengan masa kerja ${years.toLowerCase()} di ${unit}, manajemen bangsal mulai kebaca kalau kamu sudah mengarah ke ketua tim. Kalau peran itu belum ada, ini bukan giliran pertama.`;
  }
  if (training.id === "hd") {
    return `Kamu di jalur hemodialisis. Preceptorship HD mengubah tempat dinas; sertifikat umum tidak.`;
  }
  if (training.id === "nicu") {
    return `Unitmu neonatus. Pelatihan NICU/perinatal yang pendek plus orientasi ruang lebih relevan daripada kursus dewasa yang sedang viral.`;
  }
  if (training.id === "ok") {
    return `Kamar operasi menilai prinsip bedah dan orientasi OK, bukan sertifikat bangsal. Tiga hari ini selaras dengan unitmu.`;
  }
  return `${training.name} naik ke antrean karena tujuanmu ${goal.toLowerCase()} dan unitmu ${unit}.`;
}

function skipReason(training: Training, intake: Intake): string {
  if (training.fomo >= 4 && (training.goals[intake.goal] ?? 0) <= 2) {
    return `Ramai dibahas, tapi untuk tujuan ${labelOf(GOALS, intake.goal).toLowerCase()} ini tidak menggeser apa-apa dalam 6 bulan ke depan.`;
  }
  if (training.id === "icu" && intake.goal !== "icu") {
    return "Dasar ICU makan cuti panjang. Tunda sampai kamu benar-benar punya jalur pindah ke ruang kritis.";
  }
  if (training.id === "luka" && intake.goal === "icu") {
    return "Perawatan luka berguna, tapi bukan penggeser berkas ICU. Boleh nanti, setelah dasar kritis beres.";
  }
  if (training.id === "kredensial-ln" && intake.goal !== "luar-negeri") {
    return "Persiapan luar negeri mengunci waktu berbulan-bulan. Bukan jawaban untuk karier yang masih di dalam negeri.";
  }
  if (training.id === "manajemen" && (intake.years === "lt1" || intake.years === "y1to3")) {
    return "Manajemen bangsal mengendap kalau kamu belum memimpin shift. Simpan uangnya.";
  }
  if (training.id === "hd" || training.id === "nicu" || training.id === "ok") {
    return "Ini pelatihan unit khusus. Tanpa rencana pindah ke ruang itu, sertifikatnya tidak kepakai.";
  }
  return "Bukan giliran ini: waktu dan biayanya kalah dari tiga pelatihan di atas untuk tujuanmu sekarang.";
}

export function isUnitId(value: string): value is UnitId {
  return UNITS.some((item) => item.id === value);
}

export function isYearsId(value: string): value is YearsId {
  return YEARS.some((item) => item.id === value);
}

export function isGoalId(value: string): value is GoalId {
  return GOALS.some((item) => item.id === value);
}

export function isCertId(value: string): value is CertId {
  return CERTS.some((item) => item.id === value);
}

export function recommend(intake: Intake): Recommendation {
  const held = new Set(intake.held);
  const ranked = CATALOG.filter((item) => !held.has(item.id))
    .map((item) => ({ item, score: scoreOf(item, intake) }))
    .sort((a, b) => b.score - a.score || b.item.fomo - a.item.fomo);

  const next = ranked.slice(0, 3).map(({ item }, index) => ({
    id: item.id,
    rank: index + 1,
    name: item.name,
    why: whyFor(item, intake),
    timeCost: item.timeCost,
  }));

  const nextIds = new Set(next.map((item) => item.id));
  const skip = ranked
    .filter(({ item }) => !nextIds.has(item.id) && item.fomo >= 2)
    .slice(0, 2)
    .map(({ item }) => ({
      id: item.id,
      name: item.name,
      reason: skipReason(item, intake),
    }));

  if (skip.length === 0) {
    const filler = ranked.find(({ item }) => !nextIds.has(item.id));
    if (filler) {
      skip.push({
        id: filler.item.id,
        name: filler.item.name,
        reason: skipReason(filler.item, intake),
      });
    }
  }

  const goal = labelOf(GOALS, intake.goal);
  const summary = `Untuk tujuan ${goal.toLowerCase()} dari ${labelOf(UNITS, intake.unit)}, tiga pelatihan ini yang paling layak duluan. Yang lain bisa menunggu.`;

  return { next, skip, summary };
}

export function sampleBoard(): Recommendation {
  return recommend({
    nickname: "Rani",
    unit: "rawat-inap",
    years: "y3to5",
    held: [],
    goal: "icu",
  });
}
