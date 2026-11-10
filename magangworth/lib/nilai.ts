export type CompanyType = "startup" | "bumn" | "korporat" | "ngo" | "instansi" | "ukm";
export type PayKind = "unpaid" | "stipend" | "paid";
export type SupervisorAccess = "none" | "occasional" | "weekly" | "mentor";
export type Band = "merah" | "kuning" | "hijau";

export type NilaiInput = {
  companyType: CompanyType;
  role: string;
  pay: PayKind;
  durationWeeks: number;
  tasks: string;
  supervisor: SupervisorAccess;
};

export type Signal = {
  title: string;
  detail: string;
  tone: "baik" | "waspada";
};

export type NilaiResult = {
  band: Band;
  headline: string;
  summary: string;
  teaser: string;
  signals: Signal[];
  skills: string[];
  script: string;
};

const COMPANIES = new Set<CompanyType>(["startup", "bumn", "korporat", "ngo", "instansi", "ukm"]);
const PAYS = new Set<PayKind>(["unpaid", "stipend", "paid"]);
const SUPERVISORS = new Set<SupervisorAccess>(["none", "occasional", "weekly", "mentor"]);

const SKILL_PATTERNS: RegExp[] = [
  /\bproyek\b|\bproject\b/,
  /\briset\b|\bresearch\b/,
  /\banalisis\b|\banalisa\b|\banalysis\b/,
  /\bdata\b|\bdataset\b|\bdashboard\b/,
  /\bkode\b|\bcoding\b|\bprogram\b/,
  /\bdesain\b|\bfigma\b|\bprototipe\b|\bprototype\b/,
  /\bpresentasi\b|\bpresent\b/,
  /\bklien\b|\bpengguna\b|\bnasabah\b/,
  /\bkampanye\b|\bbrief\b/,
  /\bobsevasi\b|\blapangan\b/,
  /\beksperimen\b/,
  /\bnegosiasi\b/,
  /\bmenulis\b|\bnaskah\b|\bartikel\b/,
  /\bshadowing\b|\bdamping\b|\bmentoring\b/,
];

const CHORE_PATTERNS: RegExp[] = [
  /\bfotokopi\b|\bfotocopy\b|\bphotocopy\b|\bngecopy\b/,
  /\b(bikin|buat|membuat|menuang)\s+kopi\b|\bngopi\b/,
  /\bantar dokumen\b|\bnganter\b|\bkurir\b/,
  /\bbelanja\b|\bbeli\s+atk\b/,
  /\barsip\b|\bmerapikan berkas\b|\brapikan berkas\b/,
  /\bresepsionis\b|\bjaga meja\b/,
  /\bposting\b|\bupdate story\b|\bstory harian\b/,
  /\bngetik ulang\b|\bketik ulang\b/,
  /\bstempel\b/,
];

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

export function parseNilaiInput(body: unknown): NilaiInput | string {
  if (!body || typeof body !== "object") return "Isian tidak lengkap.";
  const raw = body as Record<string, unknown>;
  const companyType = raw.companyType;
  const pay = raw.pay;
  const supervisor = raw.supervisor;
  if (!COMPANIES.has(companyType as CompanyType)) return "Pilih jenis kantor.";
  if (!PAYS.has(pay as PayKind)) return "Pilih status bayar magang.";
  if (!SUPERVISORS.has(supervisor as SupervisorAccess)) return "Pilih akses ke pembimbing.";

  const role = asText(raw.role);
  if (role.length < 3 || role.length > 80) return "Tulis nama peran, 3–80 karakter.";

  const tasks = asText(raw.tasks);
  if (tasks.length < 24 || tasks.length > 1500) {
    return "Jabarkan tugas harian, minimal satu kalimat yang konkret.";
  }

  const durationWeeks = Number(raw.durationWeeks);
  if (!Number.isInteger(durationWeeks) || durationWeeks < 1 || durationWeeks > 52) {
    return "Durasi diisi dalam minggu, dari 1 sampai 52.";
  }

  return {
    companyType: companyType as CompanyType,
    role,
    pay: pay as PayKind,
    durationWeeks,
    tasks,
    supervisor: supervisor as SupervisorAccess,
  };
}

function hits(text: string, patterns: RegExp[]): string[] {
  return patterns.filter((pattern) => pattern.test(text)).map((pattern) => pattern.source);
}

function bandFor(score: number): Band {
  if (score >= 68) return "hijau";
  if (score >= 42) return "kuning";
  return "merah";
}

function headlineFor(band: Band): string {
  if (band === "hijau") return "Lampu hijau: tugas yang kamu tulis sudah mengarah ke keterampilan yang bisa ditunjukkan.";
  if (band === "kuning") return "Lampu kuning: ada bahan belajar, tapi mudah tertelan kerja operasional.";
  return "Lampu merah: semester ini lebih banyak kehadiran daripada keterampilan.";
}

const COMPANY_NAME: Record<CompanyType, string> = {
  startup: "startup",
  bumn: "BUMN",
  korporat: "korporat",
  ngo: "NGO",
  instansi: "instansi",
  ukm: "UKM",
};

export function buildNilai(input: NilaiInput): NilaiResult {
  const tasks = input.tasks.toLowerCase();
  const role = input.role.toLowerCase();
  const blob = `${role} ${tasks}`;
  const skillHits = hits(tasks, SKILL_PATTERNS).length;
  const choreHits = hits(tasks, CHORE_PATTERNS).length;
  const signals: Signal[] = [];
  let score = 46;

  if (input.pay === "paid") {
    score += 6;
    signals.push({
      tone: "baik",
      title: "Ada kompensasi",
      detail: "Magang yang dibayar biasanya membawa ekspektasi keluaran. Itu belum menjamin skill, tapi lebih jarang murni tenaga sukarela.",
    });
  } else if (input.pay === "stipend") {
    score += 2;
    signals.push({
      tone: "baik",
      title: "Ada uang saku",
      detail: "Uang saku menandai komitmen kantor. Nilai semesternya tetap ditentukan pekerjaan yang kamu pegang, bukan amplopnya.",
    });
  } else {
    score -= 8;
    signals.push({
      tone: "waspada",
      title: "Tidak dibayar",
      detail: "Tanpa bayaran, tugas operasional murni menukar jam kuliah dengan kehadiran. Minta artefak sebelum kamu mengiyakan.",
    });
  }

  if (input.durationWeeks < 4) {
    score -= 4;
    signals.push({
      tone: "waspada",
      title: "Durasi sangat pendek",
      detail: `${input.durationWeeks} minggu nyaris tidak cukup untuk satu siklus kerja yang bisa kamu ceritakan.`,
    });
  } else if (input.durationWeeks <= 16) {
    score += 6;
    signals.push({
      tone: "baik",
      title: "Durasi cukup untuk satu artefak",
      detail: `${input.durationWeeks} minggu cukup untuk satu keluaran kecil kalau minggu pertama tidak habis untuk orientasi kosong.`,
    });
  } else if (choreHits > skillHits) {
    score -= 6;
    signals.push({
      tone: "waspada",
      title: "Durasi panjang, tugas ringan",
      detail: `${input.durationWeeks} minggu dengan tugas operasional akan terasa seperti lowongan paruh waktu, bukan magang.`,
    });
  } else {
    score += 3;
    signals.push({
      tone: "baik",
      title: "Durasi panjang",
      detail: `${input.durationWeeks} minggu memberi ruang untuk naik dari membantu menjadi memegang satu bagian.`,
    });
  }

  if (input.supervisor === "none") {
    score -= 16;
    signals.push({
      tone: "waspada",
      title: "Tidak ada pembimbing",
      detail: "Tanpa nama yang meninjau kerjaanmu, tugas harian mudah mengambang jadi suruhan dadakan.",
    });
  } else if (input.supervisor === "occasional") {
    score -= 4;
    signals.push({
      tone: "waspada",
      title: "Pembimbing jarang muncul",
      detail: "Bimbingan sesekali tidak cukup untuk membetulkan arah di minggu pertama.",
    });
  } else if (input.supervisor === "weekly") {
    score += 8;
    signals.push({
      tone: "baik",
      title: "Ada ritme mingguan",
      detail: "Review seminggu sekali adalah tempat yang tepat untuk menukar jam operasional dengan tugas yang lebih bernilai.",
    });
  } else {
    score += 14;
    signals.push({
      tone: "baik",
      title: "Mentor ikut mengerjakan",
      detail: "Kamu bisa melihat standar kerja, bukan hanya mendengar instruksi.",
    });
  }

  if (skillHits >= 3 && choreHits <= 1) {
    score += 16;
    signals.push({
      tone: "baik",
      title: "Tugas menyebut keluaran",
      detail: "Daftar harianmu memuat pekerjaan yang bisa menjadi bukti, bukan hanya kesibukan.",
    });
  } else if (skillHits >= 1) {
    score += 8;
    signals.push({
      tone: "baik",
      title: "Ada bibit keterampilan",
      detail: "Sebagian tugas sudah bernilai. Sisanya perlu dibatasi supaya tidak menelan bagian yang berguna.",
    });
  }

  if (choreHits >= 2 && skillHits === 0) {
    score -= 18;
    signals.push({
      tone: "waspada",
      title: "Tugas condong ke operasional",
      detail: "Fotokopi, antar dokumen, arsip, atau konten harian tanpa keluaran lain sulit ditulis sebagai pengalaman.",
    });
  } else if (choreHits >= 1 && skillHits === 0) {
    score -= 10;
    signals.push({
      tone: "waspada",
      title: "Operasional tanpa padanan",
      detail: "Ada kerja bantu yang wajar di minggu pertama, tapi belum ada tugas yang menghasilkan artefak.",
    });
  }

  if (input.companyType === "instansi" && choreHits > 0) score -= 4;
  if (input.companyType === "startup" && skillHits > 0) score += 4;
  if (input.companyType === "ngo" && /\blapangan\b|\briset\b|\bkomunitas\b/.test(blob)) score += 3;

  if (tasks.length < 80 && skillHits === 0) {
    score -= 6;
    signals.push({
      tone: "waspada",
      title: "Tugas masih kabur",
      detail: "Kalimat yang terlalu umum biasanya berarti pekerjaan akan diisi suruhan harian.",
    });
  }

  score = Math.max(8, Math.min(96, score));
  const band = bandFor(score);
  const skills = skillsFor(input, skillHits, choreHits);
  const days = input.durationWeeks * 5;

  return {
    band,
    headline: headlineFor(band),
    summary: summaryFor(input, band, days),
    teaser: `Peran ${input.role} di ${COMPANY_NAME[input.companyType]} sudah dibaca dari tugas hariannya. Lampu nilai karier, empat hal yang harus kamu minta di minggu pertama, dan skrip renegosiasi yang sopan terbuka setelah unlock.`,
    signals,
    skills,
    script: scriptFor(input, skillHits),
  };
}

function summaryFor(input: NilaiInput, band: Band, days: number): string {
  const place = COMPANY_NAME[input.companyType];
  const presence = `Sekitar ${days} hari kerja akan lewat di peran ${input.role}.`;
  if (band === "hijau") {
    return `${presence} Di ${place} ini, daftar tugasmu sudah mengandung pekerjaan yang bisa diceritakan. Jaga supaya bagian itu tidak tersisih oleh suruhan kecil.`;
  }
  if (band === "kuning") {
    return `${presence} Ada bahan belajar di ${place}, tetapi komposisinya mudah bergeser jadi kerja bantu. Minggu pertama adalah saat untuk mengunci satu keluaran.`;
  }
  return `${presence} Yang tertulis untuk ${place} masih lebih dekat ke kehadiran daripada keterampilan. Tanpa renegosiasi, semester ini sulit meninggalkan bukti.`;
}

function skillsFor(input: NilaiInput, skillHits: number, choreHits: number): string[] {
  const skills: string[] = [];
  if (input.supervisor === "none" || input.supervisor === "occasional") {
    skills.push("Nama pembimbing dan satu jadwal review 20 menit, dikunci sebelum hari ketiga.");
  } else {
    skills.push("Review akhir minggu pertama yang menilai artefak, bukan daftar hadir.");
  }

  if (skillHits < 2) {
    skills.push(`Satu pekerjaan bernama untuk peran ${input.role}: judulnya, tenggatnya, dan izin menyimpan salinan hasilnya.`);
  } else {
    skills.push("Batas jam untuk tugas operasional supaya pekerjaan bernilai tidak kalah antrean harian.");
  }

  if (/desain|ui|ux|figma/.test(`${input.role} ${input.tasks}`.toLowerCase())) {
    skills.push("Akses file kerja desain dan satu alur yang boleh kamu ubah, bukan hanya merapikan aset.");
  } else if (/data|analis|riset/.test(`${input.role} ${input.tasks}`.toLowerCase())) {
    skills.push("Satu berkas sumber plus pertanyaan yang harus dijawab, bukan hanya merapikan tabel orang lain.");
  } else if (/market|konten|sosial|brand|kampanye/.test(`${input.role} ${input.tasks}`.toLowerCase())) {
    skills.push("Satu brief kecil: siapa audiensnya, kanalnya, dan apa yang dianggap berhasil di akhir minggu.");
  } else {
    skills.push("Contoh hasil minggu lalu dari tim, supaya standarnya kelihatan dan tidak hanya instruksi lisan.");
  }

  if (choreHits >= 2) {
    skills.push("Kesepakatan jam: fotokopi, antar dokumen, dan jaga meja dibatasi, sisanya untuk shadowing.");
  } else {
    skills.push("Catatan tiga baris tiap Jumat: yang dikerjakan, yang dipelajari, dan yang tertahan.");
  }

  return skills.slice(0, 4);
}

function scriptFor(input: NilaiInput, skillHits: number): string {
  const snippet = input.tasks.slice(0, 160);
  const ask =
    skillHits < 2
      ? `satu keluaran kecil untuk peran ${input.role}, lengkap dengan nama tugas, tenggat, dan izin menyimpan salinannya`
      : "batasan jam untuk kerja operasional dan sisa waktu untuk bagian yang menghasilkan artefak";
  return `Selamat pagi. Saya magang sebagai ${input.role}. Ritme tugas yang saya lihat sejauh ini berkisar pada ini: "${snippet}". Saya ingin masa ini meninggalkan keterampilan yang bisa ditunjukkan, bukan hanya kehadiran. Bolehkah kita sepakat minggu ini saya memegang ${ask}? Saya tetap membantu operasional pada jam yang kita batasi. Kalau ada contoh hasil yang dianggap baik, saya ingin melihatnya supaya standarnya jelas. Terima kasih.`;
}
