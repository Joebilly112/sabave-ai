export type ScanInput = {
  cvText: string;
  role: string;
  years: number;
};

export type KeywordRow = {
  term: string;
  why: string;
  present: boolean;
};

export type FormatFlag = {
  title: string;
  detail: string;
  severity: "tinggi" | "sedang";
};

export type ChecklistAction = "simpan" | "potong" | "tambah";

export type ChecklistRow = {
  action: ChecklistAction;
  text: string;
};

export type ScanResult = {
  visibility: number;
  verdict: string;
  summary: string;
  keywords: KeywordRow[];
  flags: FormatFlag[];
  checklist: ChecklistRow[];
  teaser: string;
};

type Term = { term: string; why: string };

const BANKS: { test: RegExp; terms: Term[] }[] = [
  {
    test: /data|analis data|analyst/i,
    terms: [
      { term: "SQL", why: "Saringan pertama peran data hampir selalu mengetik SQL." },
      { term: "dashboard", why: "Rekruter ingin bukti kamu mengubah angka jadi tampilan yang dibaca tim." },
      { term: "metrik", why: "Tanpa kata metrik, pengalaman analis mudah terbaca sebagai admin laporan." },
      { term: "Excel", why: "Excel tetap jadi filter di banyak lowongan analis Indonesia." },
      { term: "stakeholder", why: "Peran ini dinilai dari cara kamu menjelaskan temuan, bukan hanya menghitung." },
    ],
  },
  {
    test: /produk|product manager|product owner|\bpm\b/i,
    terms: [
      { term: "roadmap", why: "Lowongan produk menyaring orang yang pernah mengurutkan pekerjaan, bukan hanya ide." },
      { term: "pengguna", why: "Kalimat tanpa pengguna terdengar seperti laporan internal." },
      { term: "prioritas", why: "Keputusan memotong scope adalah inti kerja produk." },
      { term: "metrik", why: "Produk tanpa metrik susah dibedakan dari koordinasi rapat." },
      { term: "eksperimen", why: "Satu eksperimen kecil lebih meyakinkan daripada daftar fitur." },
    ],
  },
  {
    test: /software|programmer|developer|frontend|backend|engineer|fullstack/i,
    terms: [
      { term: "API", why: "Hampir semua peran teknis menyebut API di saringan kata." },
      { term: "Git", why: "Git adalah tanda kamu pernah kerja di tim, bukan hanya tugas kuliah sendiri." },
      { term: "testing", why: "Testing memisahkan 'bisa jalan di laptop' dari 'bisa dirawat orang lain'." },
      { term: "TypeScript", why: "Banyak lowongan web Indonesia sekarang menulis TypeScript di persyaratan." },
      { term: "deploy", why: "Rekruter ingin tahu kode kamu pernah sampai ke pengguna." },
    ],
  },
  {
    test: /desain|design|ui|ux/i,
    terms: [
      { term: "Figma", why: "Figma adalah kata yang paling sering dipakai untuk menyaring desainer." },
      { term: "prototipe", why: "Prototipe menunjukkan kamu menguji alur, bukan hanya merapikan warna." },
      { term: "riset", why: "Tanpa riset, portofolio mudah dibaca sebagai hiasan." },
      { term: "pengguna", why: "Desain yang tidak menyebut pengguna sulit dipercaya untuk produk nyata." },
      { term: "sistem desain", why: "Tim yang sudah punya produk mencari orang yang bisa merawat konsistensi." },
    ],
  },
  {
    test: /market|pemasar|konten|content|seo|brand/i,
    terms: [
      { term: "kampanye", why: "Kampanye adalah satuan kerja yang dicari, bukan sekadar 'aktif di media sosial'." },
      { term: "konversi", why: "Konversi membuat hasil pemasaran bisa dibandingkan." },
      { term: "kanal", why: "Sebut kanal yang kamu pegang supaya tidak terdengar umum." },
      { term: "audiens", why: "Audiens menunjukkan kamu tahu siapa yang membaca." },
      { term: "analitik", why: "Analitik adalah bukti kamu melihat angka, bukan hanya jadwal posting." },
    ],
  },
  {
    test: /keuang|akutansi|akuntan|finance|accounting|pajak/i,
    terms: [
      { term: "rekonsiliasi", why: "Rekonsiliasi adalah kerja harian yang membedakan staf keuangan dari entri data." },
      { term: "laporan keuangan", why: "Frasa ini muncul di hampir semua lowongan akuntansi." },
      { term: "pajak", why: "Pajak adalah filter yang sering dipakai HR non-teknis." },
      { term: "Excel", why: "Excel tetap menjadi alat yang ditulis di persyaratan." },
      { term: "arus kas", why: "Arus kas menunjukkan kamu membaca kesehatan uang, bukan hanya saldo." },
    ],
  },
  {
    test: /\bhr\b|sdm|rekrut|people|human resource/i,
    terms: [
      { term: "rekrutmen", why: "Rekrutmen adalah kata yang HR ketik saat menyaring sesama HR." },
      { term: "wawancara", why: "Sebut wawancara kalau kamu benar-benar menjalankannya." },
      { term: "onboarding", why: "Onboarding memisahkan administrasi karyawan dari pengalaman karyawan baru." },
      { term: "kebijakan", why: "Kebijakan adalah bukti kamu pernah merapikan aturan, bukan hanya jadwal." },
      { term: "karyawan", why: "Tanpa kata karyawan, CV HR mudah tertukar dengan admin umum." },
    ],
  },
  {
    test: /sales|penjual|account executive|bisnis development/i,
    terms: [
      { term: "target", why: "Penjualan tanpa target terbaca sebagai aktivitas, bukan hasil." },
      { term: "pipeline", why: "Pipeline adalah bahasa yang dipakai tim penjualan untuk menyaring." },
      { term: "klien", why: "Sebut klien atau segmen supaya peranmu tidak mengambang." },
      { term: "negosiasi", why: "Negosiasi adalah keterampilan yang sering ditulis di lowongan." },
      { term: "closing", why: "Closing menandai kamu pernah menyelesaikan deals, bukan hanya follow-up." },
    ],
  },
  {
    test: /customer|layanan|cs\b|service/i,
    terms: [
      { term: "tiket", why: "Tiket adalah satuan kerja layanan yang dikenali ATS." },
      { term: "resolusi", why: "Resolusi menunjukkan kamu menutup masalah, bukan hanya membalas." },
      { term: "pelanggan", why: "Kata pelanggan menempelkan pengalamanmu ke peran ini." },
      { term: "SLA", why: "SLA adalah filter yang dipakai tim layanan yang sudah punya standar." },
      { term: "eskalasi", why: "Eskalasi membuktikan kamu tahu batas wewenangmu." },
    ],
  },
  {
    test: /guru|pengajar|teacher|dosen/i,
    terms: [
      { term: "kelas", why: "Sebut kelas atau jenjang supaya pengalaman mengajar tidak generik." },
      { term: "asesmen", why: "Asesmen membedakan mengajar dari mendampingi." },
      { term: "kurikulum", why: "Kurikulum adalah kata yang sering ada di lowongan sekolah." },
      { term: "orang tua", why: "Komunikasi dengan orang tua adalah bagian kerja yang dicari sekolah." },
      { term: "RPP", why: "RPP tetap menjadi sinyal bagi banyak tim sekolah di Indonesia." },
    ],
  },
];

const GENERIC_TERMS: Term[] = [
  { term: "pencapaian", why: "Pencapaian memberi ATS kata benda yang bisa dicocokkan dengan lowongan." },
  { term: "hasil", why: "Hasil lebih mudah discan daripada daftar tugas." },
  { term: "alat", why: "Sebut nama alat yang kamu pakai, bukan hanya 'komputer'." },
  { term: "tim", why: "Kerja tim adalah sinyal yang sering hilang di CV lulusan baru." },
];

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function includesTerm(haystack: string, term: string): boolean {
  const text = normalize(haystack);
  const needle = normalize(term);
  if (needle.length <= 3) {
    const pattern = new RegExp(`(^|[^a-z0-9])${needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z0-9]|$)`, "i");
    return pattern.test(text);
  }
  return text.includes(needle);
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function termsForRole(role: string): Term[] {
  const bank = BANKS.find((item) => item.test.test(role));
  const picked = bank ? bank.terms : GENERIC_TERMS;
  const roleTerm: Term = {
    term: role.trim(),
    why: "Nama peran yang dilamar harus muncul, supaya mesin tidak menebak kamu melamar posisi lain.",
  };
  const unique: Term[] = [];
  for (const term of [roleTerm, ...picked]) {
    if (unique.some((item) => normalize(item.term) === normalize(term.term))) continue;
    unique.push(term);
  }
  return unique.slice(0, 6);
}

function clampScore(value: number): number {
  return Math.max(8, Math.min(92, Math.round(value)));
}

function buildSummary(input: ScanInput, present: KeywordRow[], missing: KeywordRow[]): string {
  const yearLabel = input.years === 0 ? "baru lulus" : `${input.years} tahun pengalaman`;
  const tools = present
    .filter((row) => normalize(row.term) !== normalize(input.role))
    .slice(0, 2)
    .map((row) => row.term);
  const toolLine = tools.length > 0 ? ` Sudah menyebut ${tools.join(" dan ")}.` : " Belum menempelkan alat yang dicari peran ini.";
  const gapLine =
    missing.length > 0
      ? ` Kalimat pembuka sebaiknya meminjam satu bukti dari isi CV, lalu menambahkan ${missing[0]?.term ?? "kata peran"} secara eksplisit.`
      : " Kalimat pembuka sudah punya bahan peran. Rapikan supaya angka atau hasil berdiri di kalimat kedua.";
  const metricText = input.cvText.replace(/\b20\d{2}\b/g, "");
  const hasMetric = /\d/.test(metricText);
  const proof = hasMetric
    ? "Ada angka di halaman ini — taruh satu di ringkasan, jangan dikubur di tengah bullet."
    : "Belum ada ukuran kerja yang bisa dipinjam. Sebelum mengirim ulang, sisipkan satu jumlah, waktu, atau persen.";
  return `${input.role} · ${yearLabel}.${toolLine}${gapLine} ${proof}`;
}

function buildFlags(text: string): FormatFlag[] {
  const flags: FormatFlag[] = [];
  const words = wordCount(text);
  const lower = normalize(text);

  if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(text)) {
    flags.push({
      title: "Email tidak ketemu",
      detail: "ATS dan manusia sama-sama berhenti kalau tidak ada alamat yang bisa dibalas. Taruh email di baris pertama.",
      severity: "tinggi",
    });
  }
  if (!/(?:\+62|62|08)\d{8,13}|\b08\d{2}[\s-]?\d{3,4}[\s-]?\d{3,4}\b/.test(text.replace(/[.\-]/g, ""))) {
    flags.push({
      title: "Nomor telepon tidak terbaca",
      detail: "Nomor yang dipotong spasi aneh atau hanya ditulis 'hubungi saya' sering hilang saat file diubah jadi teks.",
      severity: "sedang",
    });
  }
  if (words > 750) {
    flags.push({
      title: "Terlalu panjang untuk satu layar",
      detail: `${words} kata. File yang melewati satu halaman membuat saringan manusia menutup tab sebelum sampai ke bukti.`,
      severity: "tinggi",
    });
  } else if (words < 140) {
    flags.push({
      title: "Terlalu tipis untuk discan",
      detail: `${words} kata. Mesin tidak menemukan cukup frasa untuk mencocokkan lowongan.`,
      severity: "tinggi",
    });
  }
  if (/pas foto|foto 3x4|foto formal|terlampir foto/.test(lower)) {
    flags.push({
      title: "Foto disebut di dalam teks",
      detail: "Menyebut pas foto tidak membantu ATS dan memakan baris yang seharusnya untuk hasil kerja.",
      severity: "sedang",
    });
  }
  const saya = (lower.match(/\bsaya\b/g) || []).length;
  if (saya >= 4) {
    flags.push({
      title: "Terlalu banyak “saya”",
      detail: `${saya} kali. CV yang dibaca mesin lebih jelas tanpa kata ganti. Mulai dari kerjaannya, bukan dari diri.`,
      severity: "sedang",
    });
  }
  if (!/\d/.test(text)) {
    flags.push({
      title: "Tidak ada angka sama sekali",
      detail: "Tanpa jumlah, waktu, atau persen, setiap bullet terdengar seperti tugas umum. Ini alasan klasik lamaran senyap.",
      severity: "tinggi",
    });
  }
  if (!/pengalaman|experience|riwayat/.test(lower)) {
    flags.push({
      title: "Bagian pengalaman tidak bernama",
      detail: "Beri heading yang polos: Pengalaman. Heading kreatif sering tidak dikenali parser.",
      severity: "tinggi",
    });
  }
  if (!/pendidikan|education|universitas|sma|s1|s2/.test(lower)) {
    flags.push({
      title: "Pendidikan tidak ketemu",
      detail: "Untuk lulusan baru, pendidikan adalah jangkar. Tanpa heading itu, parser menaruh sekolah di tempat yang salah.",
      severity: "sedang",
    });
  }
  if (!/20\d{2}|sekarang|present/.test(lower)) {
    flags.push({
      title: "Tahun kerja tidak tertulis",
      detail: "Tanpa tahun, sistem tidak bisa mengurutkan pengalaman dan manusia menganggapnya menggantung.",
      severity: "tinggi",
    });
  }
  if ((text.match(/\|/g) || []).length >= 4) {
    flags.push({
      title: "Ada jejak tabel",
      detail: "Kolom dan tabel sering pecah saat ATS mengubah CV jadi teks polos. Satu kolom lebih aman.",
      severity: "tinggi",
    });
  }
  if (/tujuan karir|mencari kesempatan|individu yang berkomitmen|siap bekerja keras/.test(lower)) {
    flags.push({
      title: "Kalimat tujuan yang umum",
      detail: "Frasa seperti “mencari kesempatan” tidak memuat peran, alat, atau hasil. Itu baris yang dilewati.",
      severity: "sedang",
    });
  }
  return flags.slice(0, 6);
}

function buildChecklist(input: ScanInput, keywords: KeywordRow[], flags: FormatFlag[]): ChecklistRow[] {
  const rows: ChecklistRow[] = [];
  const present = keywords.filter((row) => row.present);
  const missing = keywords.filter((row) => !row.present);
  const lower = normalize(input.cvText);

  if (present.length > 0) {
    rows.push({
      action: "simpan",
      text: `Pertahankan penyebutan ${present
        .slice(0, 2)
        .map((row) => row.term)
        .join(" dan ")}. Itu sudah menempel ke peran ${input.role}.`,
    });
  }
  if (/pengalaman|experience/.test(lower)) {
    rows.push({
      action: "simpan",
      text: "Simpan heading Pengalaman. Jangan diganti nama puitis. Parser mencari kata yang biasa.",
    });
  }
  if (/\d/.test(input.cvText)) {
    rows.push({
      action: "simpan",
      text: "Simpan bullet yang sudah berisi angka. Pindahkan yang terkuat ke atas, dekat ringkasan.",
    });
  }

  if (flags.some((flag) => flag.title.includes("Foto"))) {
    rows.push({ action: "potong", text: "Potong baris pas foto. Gunakan ruang itu untuk satu hasil kerja." });
  }
  if (/hobi|hobby|travelling|traveling/.test(lower)) {
    rows.push({ action: "potong", text: "Potong hobi yang tidak mengubah keputusan rekruter. Traveling tidak menjelaskan peran ini." });
  }
  if (/tujuan karir|mencari kesempatan|individu yang berkomitmen/.test(lower)) {
    rows.push({ action: "potong", text: "Potong tujuan karir yang bisa ditempel ke lamaran siapa saja." });
  }
  if (/referensi tersedia|referensi atas permintaan/.test(lower)) {
    rows.push({ action: "potong", text: "Potong baris referensi. Ia tidak membantu saringan dan memakan baris." });
  }
  if (wordCount(input.cvText) > 750) {
    rows.push({ action: "potong", text: "Potong sampai satu halaman. Hapus magang atau organisasi yang tidak mirip dengan peran target." });
  }
  if ((lower.match(/\bsaya\b/g) || []).length >= 4) {
    rows.push({ action: "potong", text: "Potong kata “saya”. Mulai bullet dengan kata kerja: menyusun, mengukur, merilis, menutup." });
  }

  for (const row of missing.slice(0, 3)) {
    rows.push({
      action: "tambah",
      text: `Tambahkan “${row.term}” hanya jika kamu benar-benar melakukannya. ${row.why}`,
    });
  }
  if (!/\d/.test(input.cvText)) {
    rows.push({
      action: "tambah",
      text: "Tambahkan satu ukuran di tiap peran: berapa orang, berapa lama, berapa persen, atau berapa kali.",
    });
  }
  if (!/20\d{2}/.test(lower)) {
    rows.push({ action: "tambah", text: "Tambahkan tahun mulai–selesai di setiap pengalaman, plus kota kalau relevan." });
  }

  const order: ChecklistAction[] = ["simpan", "potong", "tambah"];
  return rows
    .filter((row, index, list) => list.findIndex((item) => item.text === row.text) === index)
    .sort((a, b) => order.indexOf(a.action) - order.indexOf(b.action))
    .slice(0, 9);
}

function verdictFor(score: number, missing: number): string {
  if (score < 42) {
    return "Halaman ini mudah dilewati. Bukan karena kamu kosong, tetapi karena peran yang dilamar hampir tidak tertulis dalam bahasa yang discan.";
  }
  if (missing >= 3 || score < 68) {
    return "Ada bahan yang bisa dipertahankan. Penolakan senyap biasanya terjadi karena rekruter harus menebak kecocokan, lalu memilih CV lain yang sudah menulisnya.";
  }
  return "Kerangka sudah terbaca. Yang tersisa adalah beberapa kata peran dan baris yang masih terdengar seperti template.";
}

export function parseScanInput(body: unknown): ScanInput | string {
  if (!body || typeof body !== "object") return "Isian tidak lengkap.";
  const raw = body as Record<string, unknown>;
  const cvText = typeof raw.cvText === "string" ? raw.cvText.trim() : "";
  const role = typeof raw.role === "string" ? raw.role.trim().replace(/\s+/g, " ") : "";
  const years = typeof raw.years === "number" ? raw.years : Number(raw.years);

  if (cvText.length < 120) return "Tempel isi CV yang lebih utuh, minimal sekitar satu paragraf plus pengalaman.";
  if (cvText.length > 8000) return "CV-nya kepanjangan untuk sekali audit. Potong dulu ke satu atau dua halaman.";
  if (role.length < 2 || role.length > 80) return "Tulis peran yang dilamar, misalnya Analis Data atau Frontend Engineer.";
  if (!Number.isFinite(years) || years < 0 || years > 40) return "Lama pengalaman diisi antara 0 dan 40 tahun.";
  return { cvText, role, years: Math.round(years) };
}

export function buildScan(input: ScanInput): ScanResult {
  const keywords = termsForRole(input.role).map((term) => ({
    ...term,
    present: includesTerm(input.cvText, term.term),
  }));
  const flags = buildFlags(input.cvText);
  const presentCount = keywords.filter((row) => row.present).length;
  const coverage = keywords.length === 0 ? 0 : presentCount / keywords.length;
  const highFlags = flags.filter((flag) => flag.severity === "tinggi").length;
  const visibility = clampScore(38 + coverage * 46 + Math.min(input.years, 8) * 1.5 - highFlags * 8 - (flags.length - highFlags) * 3);
  const missing = keywords.filter((row) => !row.present);
  const checklist = buildChecklist(input, keywords, flags);
  const teaser = `${missing.length} kata kunci peran belum muncul · ${flags.length} tanda format yang sering bikin file dilewati.`;
  return {
    visibility,
    verdict: verdictFor(visibility, missing.length),
    summary: buildSummary(input, keywords.filter((row) => row.present), missing),
    keywords,
    flags,
    checklist,
    teaser,
  };
}
