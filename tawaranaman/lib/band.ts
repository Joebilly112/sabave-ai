import { formatRupiah } from "@/lib/price";
import type { BandId, CheckItem, FlagItem, OfferInput, OfferResult } from "@/lib/types";

const MIGRAN = "https://migran-aman.kp2mi.go.id/cek-legalitas";
const SISKO = "https://siskop2mi.bp2mi.go.id/";

function bandFromPoints(points: number): BandId {
  if (points >= 9) return "bahaya";
  if (points >= 4) return "waspada";
  return "aman";
}

function raise(current: BandId, floor: BandId): BandId {
  const rank: Record<BandId, number> = { aman: 0, waspada: 1, bahaya: 2 };
  return rank[floor] > rank[current] ? floor : current;
}

function copyFor(band: BandId): { bandLabel: string; headline: string } {
  if (band === "bahaya") {
    return {
      bandLabel: "Bahaya",
      headline: "Tahan dulu. Jangan transfer dan jangan serahkan dokumen asli.",
    };
  }
  if (band === "waspada") {
    return {
      bandLabel: "Waspada",
      headline: "Ada bagian yang belum aman. Cek di jalur resmi sebelum jawab ya.",
    };
  }
  return {
    bandLabel: "Aman",
    headline: "Isian ini lebih tenang, tapi status resmi tetap dicek di KP2MI.",
  };
}

function feeSentence(input: OfferInput): string {
  if (input.feeWhen === "tidak-diminta" || input.feeIdr === 0) {
    return "Tidak ada biaya yang disebut.";
  }
  const money = formatRupiah(input.feeIdr);
  if (input.feeWhen === "sebelum-berangkat") {
    return `${money} diminta sebelum berangkat.`;
  }
  return `${money} disebut akan dipotong dari gaji.`;
}

export function decideOffer(input: OfferInput): OfferResult {
  let points = 0;
  const flags: FlagItem[] = [];

  if (input.source === "lpk") points += 1;
  if (input.source === "iklan") points += 2;
  if (input.source === "perorangan") points += 3;
  if (input.source === "iklan" || input.source === "perorangan") {
    flags.push({
      title: "Penawarnya bukan kanal yang bisa kamu cek sendiri",
      detail:
        input.source === "iklan"
          ? "Iklan di media sosial bukan lowongan resmi. Nama badan usaha harus bisa diketik di Migran Aman."
          : "Tawaran dari orang perorangan di desa atau chat perlu nama badan usaha yang terdaftar, bukan hanya nomor yang menghubungi.",
    });
  } else if (input.source === "lpk") {
    flags.push({
      title: "LPK tetap perlu dicocokkan",
      detail: "Nama lembaga pelatihan tidak otomatis sama dengan penyalur yang boleh memberangkatkan. Cocokkan namanya di cek legalitas.",
    });
  }

  if (input.visa === "tidak-tahu") {
    points += 2;
    flags.push({
      title: "Jenis visa belum disebut",
      detail: "Kerja ke luar negeri butuh visa yang sesuai pekerjaan. Kalau jenisnya tidak disebut, jangan anggap itu sudah beres.",
    });
  }
  if (input.visa === "wisata" || input.visa === "umrah") {
    points += 4;
    flags.push({
      title: input.visa === "wisata" ? "Visa wisata untuk janji kerja" : "Visa umrah untuk janji kerja",
      detail:
        "Visa kunjungan atau umrah bukan izin tinggal untuk bekerja. Janji gaji lewat visa itu adalah tanda untuk berhenti, bukan untuk berangkat dulu.",
    });
  }

  if (input.feeWhen === "sebelum-berangkat" && input.feeIdr > 0) {
    points += input.feeIdr > 15_000_000 ? 4 : input.feeIdr >= 5_000_000 ? 3 : 2;
    flags.push({
      title: "Uang diminta sebelum berangkat",
      detail: `${feeSentence(input)} Jangan transfer sampai penempatan terlihat di akun resmi milikmu.`,
    });
  } else if (input.feeWhen === "dipotong-gaji" && input.feeIdr > 0) {
    points += input.feeIdr > 10_000_000 ? 2 : 1;
    flags.push({
      title: "Potongan gaji disebut di depan",
      detail: `${feeSentence(input)} Angka ini harus tertulis di perjanjian yang kamu pegang, bukan hanya di chat.`,
    });
  }

  if (input.loan === "ya") {
    points += 2;
    flags.push({
      title: "Ada tawaran pinjaman",
      detail: "Pinjaman dari perekrut mengikat sebelum kamu kerja. Tunda sampai status penempatan resmi, dan jangan tandatangani utang untuk ongkos ini.",
    });
  }

  if (input.documents.includes("paspor")) {
    points += 3;
    flags.push({
      title: "Paspor diminta dititipkan",
      detail: "Paspor tetap di tanganmu atau keluargamu. Menitipkan paspor membuat kamu sulit pulang atau menolak.",
    });
  }
  if (input.documents.includes("ijazah-asli")) {
    points += 4;
    flags.push({
      title: "Ijazah asli diminta dititipkan",
      detail: "Ijazah asli bukan jaminan yang diserahkan ke calo. Salinan bisa diperiksa; aslinya tidak ditahan.",
    });
  }

  if (input.siskoOwn === "tidak") {
    points += 3;
    flags.push({
      title: "Belum lewat akun SISKOP2MI sendiri",
      detail: "Lowongan dan status penempatan dilihat dari akun milikmu, bukan akun orang yang menawari.",
    });
  } else if (input.siskoOwn === "tidak-tahu") {
    points += 2;
    flags.push({
      title: "Akun resmi belum jelas",
      detail: "Kalau kamu tidak tahu apakah lowongan ada di akunmu sendiri, anggap belum aman sampai kamu membukanya sendiri.",
    });
  }

  if (input.contractShown === "tidak") {
    points += 2;
    flags.push({
      title: "Kontrak belum ditunjukkan",
      detail: "Tanpa draf perjanjian, jabatan, negara, dan biaya hanya janji lisan. Minta dokumen sebelum menjawab ya.",
    });
  }

  let band = bandFromPoints(points);
  const touristJob = input.visa === "wisata" || input.visa === "umrah";
  const informal = input.source === "perorangan" || input.source === "iklan";
  if (touristJob && informal) band = raise(band, "bahaya");
  if (input.documents.includes("ijazah-asli") && input.feeWhen === "sebelum-berangkat" && input.feeIdr > 0) {
    band = raise(band, "bahaya");
  }
  if (input.siskoOwn !== "ya" && input.contractShown === "tidak" && input.source !== "p3mi") {
    band = raise(band, "waspada");
  }

  const { bandLabel, headline } = copyFor(band);
  const checks = buildChecks(input);
  const refusalScript = buildScript(input);

  return {
    band,
    bandLabel,
    headline,
    points,
    flags,
    checks,
    refusalScript,
    assumptions: [
      "Pita ini membaca isianmu, bukan memeriksa database penyalur.",
      "Status resmi badan usaha dan lowongan ada di KP2MI, lewat Migran Aman dan SISKOP2MI.",
      "Laporan ini informasi untuk keluarga, bukan nasihat hukum dan bukan penetapan bahwa seseorang bersalah.",
      input.country ? `Negara yang disebut: ${input.country}.` : "Negara tujuan tidak mengubah langkah cek resmi.",
    ],
  };
}

function buildChecks(input: OfferInput): CheckItem[] {
  const checks: CheckItem[] = [
    {
      title: "Cek legalitas di Migran Aman",
      detail:
        input.source === "p3mi" || input.source === "lpk"
          ? "Ketik persis nama yang disebut ke kamu. Kalau tidak muncul, jangan lanjut lewat nama itu."
          : "Minta nama badan usaha tertulis, lalu ketik di Migran Aman. Nomor WhatsApp saja tidak cukup.",
      href: MIGRAN,
    },
    {
      title: "Buka lowongan di akun SISKOP2MI milikmu",
      detail:
        input.siskoOwn === "ya"
          ? "Cocokkan negara, jabatan, dan penyalur dengan yang ada di akunmu. Yang hanya ada di chat belum resmi."
          : "Daftar dan masuk sendiri. Jangan berikan kata sandi ke orang yang menawari kerja.",
      href: SISKO,
    },
  ];

  if (input.visa !== "kerja") {
    checks.push({
      title: "Tanyakan visa yang benar-benar dipakai",
      detail: "Kerja butuh visa yang sesuai pekerjaan. Visa wisata atau umrah bukan jalan pintas yang aman.",
    });
  }

  if (input.feeWhen === "sebelum-berangkat" || input.loan === "ya") {
    checks.push({
      title: "Tahan uang dan utang",
      detail: "Catat jumlah yang diminta, tapi jangan transfer dan jangan menandatangani pinjaman sebelum status penempatan resmi.",
    });
  }

  if (input.documents.includes("paspor") || input.documents.includes("ijazah-asli")) {
    checks.push({
      title: "Dokumen asli tetap di rumah",
      detail: "Bawa fotokopi jika diminta untuk diperiksa. Paspor dan ijazah asli tidak dititipkan.",
    });
  }

  if (input.contractShown === "tidak") {
    checks.push({
      title: "Minta draf perjanjian sebelum menjawab",
      detail: `Untuk tujuan ${input.country}, jabatan, biaya, dan siapa penyalurnya harus tertulis, bukan hanya diceritakan.`,
    });
  }

  return checks;
}

function buildScript(input: OfferInput): string {
  const lines = [
    "Terima kasih sudah menyampaikan tawarannya. Saya putuskan tidak lanjut lewat jalur ini.",
    "Saya akan memeriksa sendiri lewat akun resmi pemerintah sebelum mengambil keputusan apa pun.",
  ];
  if (input.visa === "wisata" || input.visa === "umrah") {
    lines.push("Visa yang disebut bukan visa kerja, jadi saya tidak berangkat dengan tawaran ini.");
  }
  if (input.documents.includes("paspor") || input.documents.includes("ijazah-asli")) {
    lines.push("Saya tidak menitipkan paspor atau ijazah asli.");
  }
  if (input.feeWhen === "sebelum-berangkat" || input.loan === "ya") {
    lines.push("Saya tidak mentransfer biaya dan tidak mengambil pinjaman untuk tawaran ini.");
  }
  lines.push("Mohon tidak menghubungi keluarga saya lagi soal tawaran ini. Terima kasih.");
  return lines.join(" ");
}
