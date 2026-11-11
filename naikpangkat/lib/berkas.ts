export const PRICE_IDR = 19900;

export const JABATAN_OPTIONS = [
  { value: "pelaksana", label: "Pelaksana" },
  { value: "fungsional", label: "Fungsional" },
  { value: "struktural", label: "Struktural" },
  { value: "guru", label: "Guru atau dosen" },
  { value: "kesehatan", label: "Fungsional kesehatan" },
] as const;

export type Jabatan = (typeof JABATAN_OPTIONS)[number]["value"];
export type StatusAsn = "pns" | "pppk";

export type FormInput = {
  status: StatusAsn;
  golongan: string;
  yearsInGrade: number;
  jabatan: Jabatan;
  lastSkYear: number;
};

export type CheckItem = {
  id: string;
  title: string;
  detail: string;
  tag: "wajib" | "khusus" | "cek";
};

export type Rejection = {
  title: string;
  detail: string;
};

export type TimelineTone = "siap" | "siapkan" | "sempit" | "belum" | "puncak" | "pppk";

export type Timeline = {
  tone: TimelineTone;
  title: string;
  window: string;
  rows: { label: string; value: string }[];
  notes: string[];
};

export type Unlock = {
  headline: string;
  summary: string;
  note: string;
  profileLabel: string;
  nextLabel: string;
  items: CheckItem[];
  rejections: Rejection[];
  timeline: Timeline;
};

export const PNS_RANKS = [
  { code: "I/a", name: "Juru Muda" },
  { code: "I/b", name: "Juru Muda Tingkat I" },
  { code: "I/c", name: "Juru" },
  { code: "I/d", name: "Juru Tingkat I" },
  { code: "II/a", name: "Pengatur Muda" },
  { code: "II/b", name: "Pengatur Muda Tingkat I" },
  { code: "II/c", name: "Pengatur" },
  { code: "II/d", name: "Pengatur Tingkat I" },
  { code: "III/a", name: "Penata Muda" },
  { code: "III/b", name: "Penata Muda Tingkat I" },
  { code: "III/c", name: "Penata" },
  { code: "III/d", name: "Penata Tingkat I" },
  { code: "IV/a", name: "Pembina" },
  { code: "IV/b", name: "Pembina Tingkat I" },
  { code: "IV/c", name: "Pembina Utama Muda" },
  { code: "IV/d", name: "Pembina Utama Madya" },
  { code: "IV/e", name: "Pembina Utama" },
] as const;

export const PPPK_GRADES = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
  "XIII",
  "XIV",
  "XV",
  "XVI",
  "XVII",
] as const;

const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const JABATAN_LABEL: Record<Jabatan, string> = {
  pelaksana: "Pelaksana",
  fungsional: "Fungsional",
  struktural: "Struktural",
  guru: "Guru atau dosen",
  kesehatan: "Fungsional kesehatan",
};

export function formatIdDate(date: Date): string {
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

function jabatanLabel(jabatan: Jabatan): string {
  return JABATAN_LABEL[jabatan];
}

export function profileLabel(input: FormInput): string {
  if (input.status === "pppk") {
    return `PPPK golongan ${input.golongan} · ${jabatanLabel(input.jabatan)} · ${input.yearsInGrade} tahun`;
  }
  const rank = PNS_RANKS.find((item) => item.code === input.golongan);
  const name = rank ? `${rank.code} ${rank.name}` : input.golongan;
  return `PNS ${name} · ${jabatanLabel(input.jabatan)} · ${input.yearsInGrade} tahun di pangkat ini`;
}

function nextRank(code: string): { code: string; name: string } | null {
  const index = PNS_RANKS.findIndex((item) => item.code === code);
  if (index < 0 || index >= PNS_RANKS.length - 1) return null;
  return PNS_RANKS[index + 1];
}

function gatesAround(year: number): Date[] {
  const gates: Date[] = [];
  for (let y = year - 1; y <= year + 8; y += 1) {
    gates.push(new Date(Date.UTC(y, 3, 1)));
    gates.push(new Date(Date.UTC(y, 9, 1)));
  }
  return gates;
}

function nextGateAfter(date: Date): Date {
  const found = gatesAround(date.getUTCFullYear()).find((gate) => gate.getTime() > date.getTime());
  return found ?? new Date(Date.UTC(date.getUTCFullYear() + 1, 3, 1));
}

function nextGateOnOrAfter(date: Date): Date {
  const found = gatesAround(date.getUTCFullYear()).find((gate) => gate.getTime() >= date.getTime());
  return found ?? new Date(Date.UTC(date.getUTCFullYear() + 1, 3, 1));
}

function addUtcYears(date: Date, years: number): Date {
  const next = new Date(date.getTime());
  next.setUTCFullYear(next.getUTCFullYear() + years);
  return next;
}

function addUtcDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

function item(id: string, title: string, detail: string, tag: CheckItem["tag"]): CheckItem {
  return { id, title, detail, tag };
}

function basePnsItems(input: FormInput): CheckItem[] {
  return [
    item(
      "pengantar",
      "Surat pengantar usul dari kepegawaian",
      "Lembar ini yang membuat berkas masuk antrian. Tanpa nomor agenda instansi, map sering dianggap belum diusulkan.",
      "wajib",
    ),
    item(
      "sk-terakhir",
      `SK pangkat terakhir (tahun ${input.lastSkYear})`,
      "Salinan yang terbaca, dilegalisir sesuai kebiasaan instansi. Tanggal TMT di SK ini harus ketemu dengan lama Anda di golongan.",
      "wajib",
    ),
    item(
      "sk-cpns",
      "SK CPNS dan SK PNS",
      "BKD mencocokkan nama, NIP, dan tanggal pengangkatan. Cukup satu huruf beda dengan SK terakhir, usulan bisa balik.",
      "wajib",
    ),
    item(
      "sk-jabatan",
      "SK jabatan atau surat penugasan terakhir",
      "Menunjukkan jabatan yang dipakai untuk jalur ini, bukan jabatan lama yang masih tersimpan di map.",
      "wajib",
    ),
    item(
      "skp",
      "SKP dua tahun terakhir, predikat minimal baik",
      "Yang sering kurang bukan nilainya, melainkan tanda tangan pejabat penilai atau periode yang putus di tengah tahun.",
      "wajib",
    ),
    item(
      "disiplin",
      "Keterangan tidak sedang menjalani hukuman disiplin",
      "Hukuman yang masih berjalan adalah alasan klasik penundaan. Minta surat yang tanggalnya masih baru.",
      "wajib",
    ),
    item(
      "drh",
      "Daftar riwayat hidup yang NIP-nya sama di setiap halaman",
      "Perbarui pangkat dan jabatan. Jangan kirim DRH lama yang golongannya masih di bawah SK terakhir.",
      "cek",
    ),
    item(
      "foto",
      "Pas foto sesuai ukuran edaran instansi",
      "Ukuran dan latar berbeda-beda antar daerah. Ikuti edaran BKD Anda, jangan mengira standar nasionalnya satu.",
      "cek",
    ),
  ];
}

function jabatanItems(input: FormInput): CheckItem[] {
  switch (input.jabatan) {
    case "fungsional":
      return [
        item(
          "pak",
          "PAK terakhir",
          "Angka kredit yang sudah ditetapkan, bukan hitungan sendiri di spreadsheet. Tanpa PAK, usul fungsional hampir selalu kembali.",
          "khusus",
        ),
        item(
          "dupak",
          "DUPAK atau bahan penilaian periode berjalan",
          "Siapkan bukti kegiatan yang memang masuk angka kredit jabatan Anda. Sertifikat pelatihan acak biasanya tidak menggantikan DUPAK.",
          "khusus",
        ),
      ];
    case "guru":
      return [
        item(
          "pak-guru",
          "PAK guru atau dosen",
          "Cek apakah angka kredit sudah menutup syarat pangkat berikutnya. Banyak usulan balik karena PAK berhenti di pangkat sekarang.",
          "khusus",
        ),
        item(
          "tugas",
          "SK pembagian tugas mengajar atau linieritas",
          "Mapel atau mata kuliah harus nyambung dengan jabatan yang dinilai. Tugas di luar linier sering dipersoalkan.",
          "khusus",
        ),
        item(
          "serdik",
          "Sertifikat pendidik, bila jalur Anda mensyaratkannya",
          "Jangan lampirkan jika jalur usul Anda tidak memakai sertifikat itu. Berkas yang salah jalur ikut membingungkan pemeriksa.",
          "cek",
        ),
      ];
    case "kesehatan":
      return [
        item(
          "pak-kes",
          "PAK jabatan fungsional kesehatan",
          "Naik pangkat fungsional kesehatan mengikuti angka kredit, bukan sekadar lama bertugas di unit.",
          "khusus",
        ),
        item(
          "str",
          "STR yang masih berlaku, sebagai lampiran bila jabatan mensyaratkan",
          "Ini bukan pemeriksaan masa berlaku STR. Lampirkan hanya jika edaran jabatan Anda memang memintanya bersama PAK.",
          "cek",
        ),
        item(
          "penempatan",
          "Surat penempatan atau keterangan praktik dari rumah sakit atau dinas",
          "Dipakai untuk menunjukkan Anda masih di jabatan yang diusulkan, bukan di tugas lama.",
          "khusus",
        ),
      ];
    case "struktural":
      return [
        item(
          "sk-struktur",
          "SK pelantikan jabatan struktural",
          "Pangkat pejabat struktural sering mengikuti jabatan, bukan kalender empat tahun. Lampirkan SK yang masih berlaku.",
          "khusus",
        ),
        item(
          "uraian",
          "Uraian jabatan terakhir",
          "Pemeriksa ingin melihat jabatan yang diemban sekarang. Uraian lama dari unit sebelumnya sering jadi temuan.",
          "cek",
        ),
      ];
    default:
      return [
        item(
          "uraian-pelaksana",
          "Uraian tugas pelaksana terakhir",
          "Jalur pelaksana tidak memakai PAK. Jangan menyisipkan borang angka kredit kosong — itu tanda berkas salah jalur.",
          "khusus",
        ),
      ];
  }
}

function highRankItems(input: FormInput): CheckItem[] {
  const index = PNS_RANKS.findIndex((rank) => rank.code === input.golongan);
  const extras: CheckItem[] = [];
  if (input.golongan === "III/d") {
    extras.push(
      item(
        "ambang-iv",
        "Kelengkapan tambahan menjelang golongan IV",
        "Dari III/d ke IV/a, pemeriksaan biasanya lebih ketat daripada kenaikan di dalam golongan III. Siapkan PAK atau syarat jabatan tanpa lembar yang mengambang.",
        "cek",
      ),
    );
  }
  if (index >= PNS_RANKS.findIndex((rank) => rank.code === "IV/a")) {
    extras.push(
      item(
        "bkn",
        "Salinan usul yang rapi untuk tim penilai atau BKN",
        "Di golongan IV, berkas sering tidak berhenti di BKD daerah. Scan buram dan nama file acak bikin berkas ditunda di tahap berikutnya.",
        "khusus",
      ),
    );
  }
  return extras;
}

function pppkItems(): CheckItem[] {
  return [
    item(
      "perjanjian",
      "Perjanjian kerja PPPK yang masih berlaku",
      "Ini dokumen induknya. Kenaikan pangkat reguler PNS tidak menggantikan perjanjian kerja.",
      "wajib",
    ),
    item(
      "sk-pppk",
      "SK pengangkatan PPPK",
      "Cocokkan golongan di SK dengan golongan yang Anda pilih di formulir ini.",
      "wajib",
    ),
    item(
      "kinerja-pppk",
      "Penilaian kinerja periode berjalan",
      "Yang biasanya ditagih saat perpanjangan atau evaluasi, bukan SK pangkat PNS.",
      "wajib",
    ),
    item(
      "ijazah",
      "Ijazah yang dipakai saat pengangkatan",
      "Pastikan gelar dan nama sama dengan data kepegawaian. Perbedaan gelar adalah temuan yang mudah dilihat.",
      "cek",
    ),
    item(
      "identitas",
      "Identitas yang sama dengan data BKN",
      "Nama, tanggal lahir, dan NIP/NI PPPK harus konsisten. Jangan mengirim scan KTP lama jika data sudah diperbaiki.",
      "wajib",
    ),
    item(
      "atasan",
      "Surat keterangan dari atasan langsung",
      "Minta surat yang menyebut jabatan Anda sekarang dan bahwa Anda masih bertugas di unit itu.",
      "khusus",
    ),
    item(
      "bukan-pns",
      "Jangan ikutkan formulir kenaikan pangkat reguler PNS",
      "Formulir April/Oktober untuk PNS yang terselip di map PPPK membuat petugas mengembalikan seluruhnya.",
      "cek",
    ),
  ];
}

function buildItems(input: FormInput): CheckItem[] {
  if (input.status === "pppk") return pppkItems();
  return [...basePnsItems(input), ...jabatanItems(input), ...highRankItems(input)];
}

function buildRejections(input: FormInput, skMismatch: boolean, yearsReady: boolean): Rejection[] {
  if (input.status === "pppk") {
    return [
      {
        title: "Map PPPK diisi dengan logika PNS",
        detail:
          "Petugas mengembalikan berkas karena yang dilampirkan adalah usul pangkat reguler, padahal yang diminta perjanjian dan penilaian kinerja.",
      },
      {
        title: "Golongan di surat tidak sama dengan SK pengangkatan",
        detail: "Satu angka golongan yang beda sudah cukup untuk berkas dinyatakan tidak lengkap.",
      },
      {
        title: "Penilaian kinerja periode berjalan kosong",
        detail: "Tanpa penilaian, instansi tidak punya dasar untuk memproses perpanjangan atau evaluasi.",
      },
      {
        title: "Nama atau tanggal lahir tidak sama dengan data BKN",
        detail: "Perbaikan data yang belum tuntas sering baru ketahuan saat berkas dikumpul.",
      },
    ];
  }

  const rows: Rejection[] = [];
  if (skMismatch) {
    rows.push({
      title: "Tahun SK dan lama di golongan tidak selaras",
      detail: `SK terakhir Anda ${input.lastSkYear}, sementara lama di pangkat diisi ${input.yearsInGrade} tahun. Selisih seperti ini sering bikin TMT tidak ketemu.`,
    });
  }
  if (!yearsReady) {
    rows.push({
      title: "Masa dalam pangkat belum memenuhi patokan reguler",
      detail:
        "Patokan umum kenaikan pangkat reguler adalah 4 tahun dalam pangkat terakhir. Di bawah itu, usul reguler sering dikembalikan sebelum isi map diperiksa.",
    });
  }
  if (input.jabatan === "fungsional" || input.jabatan === "guru" || input.jabatan === "kesehatan") {
    rows.push({
      title: "Angka kredit belum menutup pangkat berikutnya",
      detail: "PAK yang hanya mengulang pangkat sekarang, atau DUPAK tanpa bukti kegiatan, adalah alasan balik yang paling sering pada jabatan fungsional.",
    });
  }
  if (input.jabatan === "struktural") {
    rows.push({
      title: "Usul reguler dipakai untuk jabatan yang aturannya lain",
      detail:
        "Pejabat struktural kadang tetap mengisi siklus empat tahun, padahal pangkatnya mengikuti jabatan. BKD mengembalikan karena jenis usulnya tidak cocok.",
    });
  }
  rows.push(
    {
      title: "SKP putus atau predikatnya tidak terbaca",
      detail: "Dua tahun diminta, yang dilampirkan satu tahun, atau ada halaman tanpa tanda tangan pejabat penilai.",
    },
    {
      title: "Scan buram, terpotong, atau tidak dilegalisir",
      detail: "Isi berkas sudah benar, tetapi pemeriksa tidak bisa membaca tanggal SK. Usulan balik hanya karena keterbacaan.",
    },
  );
  const index = PNS_RANKS.findIndex((rank) => rank.code === input.golongan);
  if (index >= PNS_RANKS.findIndex((rank) => rank.code === "IV/a")) {
    rows.push({
      title: "Berkas berhenti di daerah dan tidak siap untuk tahap BKN",
      detail: "Di golongan IV, kekurangan satu daftar atau satu legalisir baru ketahuan setelah lolos meja BKD.",
    });
  }
  return rows.slice(0, 5);
}

function buildTimeline(input: FormInput, now: Date, yearsReady: boolean, isPuncak: boolean): Timeline {
  if (input.status === "pppk") {
    return {
      tone: "pppk",
      title: "Bukan siklus April dan Oktober",
      window: "Susun berkas sekitar 3 bulan sebelum perjanjian kerja berakhir.",
      rows: [
        { label: "Yang diurus", value: "Perjanjian, kinerja, dan kelengkapan evaluasi" },
        { label: "Bukan ini", value: "Usul kenaikan pangkat reguler PNS" },
        { label: "Langkah dekat", value: "Tanya tanggal akhir perjanjian ke kepegawaian" },
      ],
      notes: [
        "PPPK tidak naik golongan lewat kalender pangkat PNS.",
        "Kalau instansi Anda punya edaran sendiri, edaran itulah yang menang.",
      ],
    };
  }

  if (isPuncak) {
    return {
      tone: "puncak",
      title: "Tidak ada periode naik di atas pangkat ini",
      window: "Tidak perlu mengejar jendela April atau Oktober untuk golongan berikutnya.",
      rows: [
        { label: "Pangkat", value: "IV/e Pembina Utama" },
        { label: "Usul reguler", value: "Tidak ada golongan di atasnya" },
        { label: "Yang masih relevan", value: "Arsip jabatan dan penilaian, bukan map pangkat baru" },
      ],
      notes: [
        "Menyetor usul reguler dari pangkat puncak hanya menambah bolak-balik.",
        "Kalau yang Anda kejar adalah jabatan, jalurnya berbeda dari daftar ini.",
      ],
    };
  }

  const tmtApprox = addUtcYears(now, -input.yearsInGrade);
  const eligible = yearsReady ? now : addUtcYears(tmtApprox, 4);
  const gate = yearsReady ? nextGateAfter(now) : nextGateOnOrAfter(eligible);
  const windowOpen = addUtcDays(gate, -90);
  const windowTight = addUtcDays(gate, -21);
  const inWindow = now.getTime() >= windowOpen.getTime() && now.getTime() < windowTight.getTime();
  const tight = yearsReady && now.getTime() >= windowTight.getTime() && now.getTime() < gate.getTime();

  let tone: TimelineTone = "siapkan";
  let title = "Siapkan map sebelum jendela setor dibuka";
  if (!yearsReady) {
    tone = "belum";
    title = "Reguler belum waktunya — tetap susun berkasnya";
  } else if (tight) {
    tone = "sempit";
    title = "Jendela periode ini sudah sempit";
  } else if (inWindow) {
    tone = "siap";
    title = "Jendela setor periode ini sedang berjalan";
  }

  return {
    tone,
    title,
    window: yearsReady
      ? `Setor kira-kira ${formatIdDate(windowOpen)} sampai ${formatIdDate(windowTight)}, untuk TMT ${formatIdDate(gate)}.`
      : `Perkiraan TMT terdekat setelah masa 4 tahun terpenuhi: ${formatIdDate(gate)}.`,
    rows: [
      { label: "TMT yang dituju", value: formatIdDate(gate) },
      { label: "Mulai susun", value: formatIdDate(windowOpen) },
      { label: "Jangan mepet", value: `Idealnya sudah masuk sebelum ${formatIdDate(windowTight)}` },
    ],
    notes: yearsReady
      ? [
          "Banyak instansi menutup unggahan lebih awal dari tanggal TMT. Edaran BKD Anda yang menentukan hari terakhir.",
          "Perkiraan ini memakai patokan umum 4 tahun dan kalender 1 April serta 1 Oktober, bukan penetapan kepegawaian.",
        ]
      : [
          `Dari lama ${input.yearsInGrade} tahun di pangkat ini, patokan 4 tahun belum terpenuhi. Usul reguler yang dipaksakan sering kembali di meja pertama.`,
          "Tanggal pastinya ada di TMT pada SK, bukan di ingatan. Cocokkan sebelum mempercayai kalender ini.",
        ],
  };
}

export function buildUnlock(input: FormInput, now: Date): Unlock {
  const isPuncak = input.status === "pns" && input.golongan === "IV/e";
  const yearsReady = input.yearsInGrade >= 4;
  const skAge = now.getUTCFullYear() - input.lastSkYear;
  const skMismatch = input.status === "pns" && Math.abs(skAge - input.yearsInGrade) >= 2;
  const next = input.status === "pns" ? nextRank(input.golongan) : null;
  const nextLabel =
    input.status === "pppk"
      ? "Bukan naik pangkat PNS"
      : next
        ? `${next.code} ${next.name}`
        : "Tidak ada golongan di atasnya";

  let headline = `Menuju ${nextLabel}, ini yang masih harus ada di map.`;
  let summary = "Daftar ini mengikuti profil yang Anda isi. Cocokkan lagi dengan edaran BKD instansi Anda.";
  if (input.status === "pppk") {
    headline = "Yang kurang biasanya perjanjian dan kinerja, bukan SK pangkat.";
    summary = "PPPK tidak mengantri di siklus kenaikan pangkat reguler PNS. Daftar di bawah untuk kelengkapan yang biasa diminta instansi.";
  } else if (isPuncak) {
    headline = "Anda sudah di pangkat tertinggi. Jangan susun usul reguler baru.";
    summary = "IV/e tidak punya golongan berikutnya. Yang berguna sekarang adalah menyimpan arsip, bukan menambah map usulan.";
  } else if (!yearsReady) {
    headline = `Belum di patokan 4 tahun. Kalau tetap ingin siap, ini isi map menuju ${nextLabel}.`;
    summary = "Usul reguler yang disetor terlalu cepat sering kembali sebelum isi berkas dibaca. Daftar ini supaya Anda tidak mulai dari nol nanti.";
  } else if (skMismatch) {
    headline = `Sebelum mengejar ${nextLabel}, rapikan dulu selisih SK dan masa pangkat.`;
    summary = "Selisih tahun SK dan lama di golongan adalah alasan balik yang lebih sering daripada kurangnya satu sertifikat.";
  }

  const note = isPuncak
    ? "Tidak ada yang harus dikejar bulan ini untuk golongan baru. Simpan energi untuk jabatan, kalau itu yang sebenarnya Anda tunggu."
    : input.status === "pppk"
      ? "Rasa terdesak ini wajar, karena formulir PNS beredar di grup yang sama. Untuk PPPK, abaikan kalender April dan Oktober."
      : skMismatch
        ? "Yang bikin bolak-balik sering bukan masa bakti Anda, melainkan satu tanggal yang tidak ketemu di antara SK."
        : yearsReady
          ? "Masa pangkat secara umum sudah masuk patokan. Yang tersisa biasanya lembar yang tertinggal di map lama."
          : "Anda tidak terlambat. Usul yang dipaksakan sebelum waktunya justru yang biasanya kembali dari BKD.";

  return {
    headline,
    summary,
    note,
    profileLabel: profileLabel(input),
    nextLabel,
    items: buildItems(input),
    rejections: buildRejections(input, skMismatch, yearsReady),
    timeline: buildTimeline(input, now, yearsReady, isPuncak),
  };
}

export function validateInput(raw: unknown): { ok: true; value: FormInput } | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") return { ok: false, error: "Data formulir tidak terbaca." };
  const body = raw as Record<string, unknown>;
  const status = body.status;
  if (status !== "pns" && status !== "pppk") return { ok: false, error: "Pilih PNS atau PPPK." };

  const golongan = typeof body.golongan === "string" ? body.golongan.trim() : "";
  const allowed: readonly string[] =
    status === "pns" ? PNS_RANKS.map((rank) => rank.code) : PPPK_GRADES;
  if (!allowed.includes(golongan)) {
    return { ok: false, error: "Golongan tidak dikenali." };
  }

  const years = typeof body.yearsInGrade === "number" ? body.yearsInGrade : Number(body.yearsInGrade);
  if (!Number.isInteger(years) || years < 0 || years > 45) {
    return { ok: false, error: "Lama di golongan diisi 0 sampai 45 tahun." };
  }

  const jabatan = body.jabatan;
  if (!JABATAN_OPTIONS.some((option) => option.value === jabatan)) {
    return { ok: false, error: "Pilih jenis jabatan." };
  }

  const year = typeof body.lastSkYear === "number" ? body.lastSkYear : Number(body.lastSkYear);
  const maxYear = new Date().getUTCFullYear();
  if (!Number.isInteger(year) || year < 1970 || year > maxYear) {
    return { ok: false, error: "Tahun SK terakhir tidak masuk akal." };
  }

  return {
    ok: true,
    value: {
      status,
      golongan,
      yearsInGrade: years,
      jabatan: jabatan as Jabatan,
      lastSkYear: year,
    },
  };
}

export const SAMPLE_NOW = new Date(Date.UTC(2026, 10, 11));

export const SAMPLE_INPUT: FormInput = {
  status: "pns",
  golongan: "III/b",
  yearsInGrade: 5,
  jabatan: "guru",
  lastSkYear: 2021,
};

export const SAMPLE_UNLOCK = buildUnlock(SAMPLE_INPUT, SAMPLE_NOW);
