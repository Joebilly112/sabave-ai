export const FORMATS = ["hr", "user", "case"] as const;
export const GUTS = ["yakin", "campur", "kacau"] as const;

export type InterviewFormat = (typeof FORMATS)[number];
export type GutFeeling = (typeof GUTS)[number];

export type DebriefInput = {
  role: string;
  format: InterviewFormat;
  asked: string;
  durationMinutes: number;
  gut: GutFeeling;
};

export type ScoreKey = "struktur" | "kejelasan" | "contoh" | "pertanyaanBalik";

export type WeakMoment = {
  title: string;
  detail: string;
  fix: string;
};

export type DebriefResult = {
  scores: Record<ScoreKey, number>;
  notes: Record<ScoreKey, string>;
  overall: number;
  verdict: string;
  weakest: WeakMoment[];
  followUp: string;
  signals: string[];
};

export const FORMAT_LABEL: Record<InterviewFormat, string> = {
  hr: "HR",
  user: "user",
  case: "case",
};

export const GUT_LABEL: Record<GutFeeling, string> = {
  yakin: "cukup yakin",
  campur: "campur",
  kacau: "kacau",
};

export const SCORE_LABEL: Record<ScoreKey, string> = {
  struktur: "Struktur",
  kejelasan: "Kejelasan",
  contoh: "Contoh",
  pertanyaanBalik: "Pertanyaan balik",
};

const SCORE_ORDER: ScoreKey[] = ["struktur", "kejelasan", "contoh", "pertanyaanBalik"];

function clamp(n: number, min = 28, max = 92): number {
  return Math.max(min, Math.min(max, Math.round(n)));
}

function countHits(text: string, pattern: RegExp): number {
  return text.match(pattern)?.length ?? 0;
}

export function parseDebriefInput(body: unknown): DebriefInput | string {
  if (!body || typeof body !== "object") return "Isi formulir belum lengkap.";
  const raw = body as Record<string, unknown>;
  const role = String(raw.role ?? "").replace(/\s+/g, " ").trim();
  const asked = String(raw.asked ?? "").replace(/\r/g, "").trim();
  const format = String(raw.format ?? "");
  const gut = String(raw.gut ?? "");
  const duration = Number(raw.durationMinutes);

  if (role.length < 2 || role.length > 80) return "Tulis peran yang dilamar, singkat saja.";
  if (!FORMATS.includes(format as InterviewFormat)) return "Pilih format interview.";
  if (asked.length < 40 || asked.length > 2500) {
    return "Ceritakan apa yang ditanya, minimal beberapa kalimat.";
  }
  if (!Number.isFinite(duration) || duration < 5 || duration > 180) {
    return "Durasi diisi dalam menit, antara 5 dan 180.";
  }
  if (!GUTS.includes(gut as GutFeeling)) return "Pilih rasa di perut setelah interview.";

  return {
    role,
    format: format as InterviewFormat,
    asked,
    durationMinutes: Math.round(duration),
    gut: gut as GutFeeling,
  };
}

export function buildDebrief(input: DebriefInput): DebriefResult {
  const text = input.asked.toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const hasNumber = /\d/.test(text);
  const exampleHits = countHits(
    text,
    /contoh|saat itu|waktu itu|hasilnya|angka|persen|%|naik|turun|berhasil|gagal|proyek|pelanggan|user|revenue|konversi|bug|deadline/g,
  );
  const structureHits = countHits(
    text,
    /pertama|kedua|ketiga|lalu|kemudian|akhirnya|situasi|tugas|aksi|hasil|star|awal|tengah|akhir/g,
  );
  const vagueHits = countHits(
    text,
    /nggak tahu|tidak tahu|gak tahu|ga tahu|blank|lupa|gugup|diam|bingung|nggak jawab|tidak jawab|kosong/g,
  );
  const askedBack =
    /saya (tanya|bertanya|balik)|pertanyaan balik|saya tanyakan|aku tanya/.test(text) ||
    (text.includes("?") && /tanya|bertanya/.test(text));

  let struktur = 46 + Math.min(wordCount, 160) / 9 + structureHits * 6 - vagueHits * 7;
  let kejelasan = 52 + Math.min(wordCount, 100) / 12 - vagueHits * 8;
  if (wordCount < 35) kejelasan -= 10;
  if (wordCount > 260) kejelasan -= 8;
  let contoh = 34 + exampleHits * 8 + (hasNumber ? 14 : 0);
  if (wordCount < 45) contoh -= 6;
  let pertanyaanBalik = askedBack ? 64 + (text.includes("?") ? 6 : 0) : 33;

  if (input.durationMinutes < 12) {
    struktur -= 6;
    pertanyaanBalik -= 6;
  } else if (input.durationMinutes >= 20 && input.durationMinutes <= 45) {
    struktur += 4;
  } else if (input.durationMinutes > 70) {
    kejelasan -= 5;
  }

  if (input.format === "case") {
    struktur += 3;
    if (!hasNumber) contoh -= 12;
    else contoh += 4;
  }
  if (input.format === "hr" && exampleHits === 0) contoh -= 6;
  if (input.format === "user" && structureHits < 2) struktur -= 6;

  const scores: Record<ScoreKey, number> = {
    struktur: clamp(struktur),
    kejelasan: clamp(kejelasan),
    contoh: clamp(contoh),
    pertanyaanBalik: clamp(pertanyaanBalik),
  };

  const overall = clamp(
    (scores.struktur + scores.kejelasan + scores.contoh + scores.pertanyaanBalik) / 4,
    30,
    90,
  );

  const formatLabel = FORMAT_LABEL[input.format];
  const notes: Record<ScoreKey, string> = {
    struktur:
      structureHits >= 2
        ? `Ada urutan yang kebaca di catatan ${formatLabel}. Itu cukup untuk ditata ulang jadi satu alur, bukan diulang mentah.`
        : `Catatan untuk peran ${input.role} masih meloncat. Pewawancara ${formatLabel} butuh situasi, tindakan, lalu hasil — berurutan.`,
    kejelasan:
      vagueHits > 0
        ? "Ada jeda yang kamu sendiri tandai: lupa, blank, atau tidak jawab. Itu yang mengurangi kejelasan, bukan seluruh interview."
        : wordCount > 220
          ? "Catatannya panjang. Panjang belum tentu jelas — satu kalimat hasil sering lebih terdengar daripada tiga paragraf latar."
          : "Bahasanya cukup lurus. Yang masih bisa dipotong adalah pengantar sebelum jawaban inti.",
    contoh: hasNumber
      ? "Ada angka di catatanmu. Simpan satu saja yang paling dekat dengan peran ini, lalu sebut sebelum-sesudahnya."
      : "Hampir tidak ada bukti terukur. Kesan 'saya berusaha' kalah dari satu contoh dengan hasil yang kelihatan.",
    pertanyaanBalik: askedBack
      ? "Kamu sempat bertanya balik. Pastikan pertanyaannya tentang kerja tim itu, bukan hanya 'kapan kabarnya?'."
      : "Menit terakhir tidak dipakai untuk bertanya. Itu sering dibaca sebagai minat yang sudah habis, padahal kamu hanya kehabisan napas.",
  };

  const ranked = [...SCORE_ORDER].sort((a, b) => scores[a] - scores[b] || SCORE_ORDER.indexOf(a) - SCORE_ORDER.indexOf(b));
  const weakest = ranked.slice(0, 3).map((key) => momentFor(key, input, { askedBack, hasNumber }));

  const verdict = verdictFor(input.gut, overall);
  const signals = [
    input.gut === "kacau"
      ? "Rasa kacau di jam pertama biasa muncul, termasuk saat jawaban tidak serendah yang dibayangkan."
      : input.gut === "yakin"
        ? "Rasa yakin dicatat terpisah dari skor, supaya debrief tidak hanya membenarkan perut."
        : "Rasa campur dicatat sebagai konteks, bukan sebagai nilai.",
    input.durationMinutes < 15
      ? `Sesi ${input.durationMinutes} menit tergolong pendek untuk format ${formatLabel}.`
      : `Sesi berjalan ${input.durationMinutes} menit — cukup untuk menilai alur, bukan seluruh karier.`,
    askedBack
      ? "Catatanmu memuat pertanyaan balik. Itu sinyal yang sering hilang saat orang panik."
      : "Tidak ada pertanyaan balik di catatan. Itu salah satu dari tiga titik yang paling murah diperbaiki.",
  ];

  return {
    scores,
    notes,
    overall,
    verdict,
    weakest,
    followUp: followUpFor(input, weakest[0]),
    signals,
  };
}

function verdictFor(gut: GutFeeling, overall: number): string {
  if (gut === "kacau" && overall >= 62) {
    return "Perutmu bilang hancur. Catatan jawaban tidak mendukung spiral itu. Ada yang lemah, dan itu terbatas.";
  }
  if (gut === "kacau" && overall < 55) {
    return "Rasa kacau kali ini sejalan dengan beberapa jawaban yang memang tipis. Bukan semuanya gagal — tiga titik di bawah yang paling mahal.";
  }
  if (gut === "yakin" && overall < 58) {
    return "Rasa yakin belum ketemu bukti di catatan. Masih ada ruang, asal tiga momen ini tidak diulang di tahap berikutnya.";
  }
  if (overall >= 72) {
    return "Ini bukan interview yang hancur. Yang tersisa adalah mengunci bukti dan follow-up, bukan mengulang seluruh jawaban di kepala.";
  }
  return "Campur aduk di jam pertama itu wajar. Yang lemah hanya sebagian, dan bagian itu yang dikerjakan dalam 48 jam.";
}

function momentFor(
  key: ScoreKey,
  input: DebriefInput,
  flags: { askedBack: boolean; hasNumber: boolean },
): WeakMoment {
  const role = input.role;
  if (key === "struktur") {
    return {
      title: "Alur jawaban belum jadi satu cerita",
      detail: `Untuk ${role}, jawaban masih terasa seperti kilas balik, bukan urutan. Pewawancara harus merakitnya sendiri.`,
      fix: "Tulis ulang satu jawaban dalam tiga baris: konteks satu kalimat, tindakanmu, hasil yang kelihatan. Hafalkan kerangka itu, bukan naskahnya.",
    };
  }
  if (key === "kejelasan") {
    return {
      title: "Inti jawaban datang terlambat",
      detail: `Di format ${FORMAT_LABEL[input.format]}, kalimat pertama yang terdengar adalah kalimat yang diingat. Catatanmu masih membuka dengan suasana.`,
      fix: "Mulai jawaban berikutnya dengan hasil atau keputusan, baru latarnya. Maksimal dua napas sebelum sampai ke apa yang kamu lakukan.",
    };
  }
  if (key === "contoh") {
    return {
      title: flags.hasNumber ? "Angkanya belum diikat ke keputusan" : "Contoh masih berupa kesan",
      detail: flags.hasNumber
        ? `Ada bilangan, tapi belum jelas apa yang berubah karena tindakanmu di peran ${role}.`
        : `Tidak ada ukuran di cerita ${role}. 'Cukup lancar' tidak bisa dibandingkan oleh orang yang baru kenal kamu 30 menit.`,
      fix: "Pilih satu cerita. Tambahkan sebelum dan sesudah: waktu, jumlah, atau kualitas yang berubah. Satu angka jujur lebih kuat dari tiga cerita samar.",
    };
  }
  return {
    title: "Menit terakhir tidak ditutup dengan pertanyaan",
    detail: flags.askedBack
      ? "Pertanyaan balik ada, tetapi belum menunjukkan bahwa kamu membaca kerja tim itu."
      : "Kamu menutup dengan terima kasih. Itu sopan, dan itu juga membuang kesempatan terakhir untuk kelihatan spesifik.",
    fix: `Siapkan dua pertanyaan tentang kerja ${role}: bagaimana keberhasilan diukur di 90 hari pertama, dan apa yang biasanya bikin orang baru tersangkut. Jangan tanya gaji di follow-up ini.`,
  };
}

function followUpFor(input: DebriefInput, lead: WeakMoment | undefined): string {
  const hole = lead?.title.toLowerCase() ?? "contoh yang masih samar";
  return [
    "Halo tim rekrutmen,",
    "",
    `Terima kasih untuk wawancara ${input.role} tadi (${FORMAT_LABEL[input.format]}, sekitar ${input.durationMinutes} menit). Saya menghargai waktunya.`,
    "",
    `Satu hal yang ingin saya rapikan: ${hole}. Jika membantu, saya bisa mengirim contoh yang lebih singkat dan terukur besok.`,
    "",
    "Saya tetap tertarik pada peran ini dan siap lanjut ke tahap berikutnya.",
    "",
    "Salam,",
    "[Nama kamu]",
  ].join("\n");
}
