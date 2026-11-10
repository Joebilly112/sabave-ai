import type { ChecklistItem, KasusInput, KasusResult, RiskBand } from "@/lib/types";

function clamp(score: number): number {
  return Math.max(4, Math.min(96, Math.round(score)));
}

function bandOf(score: number): RiskBand {
  if (score >= 67) return "tinggi";
  if (score >= 34) return "waspada";
  return "rendah";
}

function askDp(dpPercent: number): number {
  if (dpPercent >= 40) return dpPercent;
  if (dpPercent >= 30) return 40;
  return 50;
}

function headline(band: RiskBand): string {
  if (band === "tinggi") {
    return "Risiko hantu tinggi. Jangan mulai produksi sebelum DP dan batas kerja tertulis.";
  }
  if (band === "waspada") {
    return "Pola ini sering jadi kerja dulu, bayar nanti — atau tidak sama sekali.";
  }
  return "Sinyal kabur tidak dominan, tapi tetap kunci DP sebelum produksi.";
}

function buildMessage(input: KasusInput, band: RiskBand): string {
  const ask = askDp(input.dpPercent);
  if (band === "tinggi") {
    return `Halo, saya senang bisa lanjut, dan saya ingin merapikan kerangkanya dulu. Saya mulai setelah DP ${ask}% masuk dan kita sepakat batas revisi plus jadwal bayar. Sebelum itu saya belum mengerjakan produksi, supaya brief-nya tidak menggantung.`;
  }
  if (band === "waspada") {
    return `Halo, terima kasih untuk brief-nya. Biar aman untuk kita berdua, saya butuh DP ${ask}% sebelum kickoff, revisi yang dibatasi, dan pembayaran per tahap. Kalau bagian itu belum tertulis, kita selesaikan dulu — saya belum mulai produksi.`;
  }
  return `Halo, kerangkanya sudah cukup jelas. Saya konfirmasi DP ${ask}% sebelum kickoff dan saya susulkan satu halaman lingkup kerja. Begitu DP masuk, saya mulai.`;
}

function checklist(input: KasusInput): ChecklistItem[] {
  const items: ChecklistItem[] = [
    {
      title: "DP tertulis sebelum kickoff",
      detail:
        input.dpPercent >= 30
          ? `DP ${input.dpPercent}% sudah disebut. Kunci angkanya di chat yang bisa di-screenshot, lalu tunggu dana masuk.`
          : "Minta minimal 40–50% sebelum file kerja pertama. Tanpa DP, brief masih bisa menguap.",
      state: input.dpPercent >= 30 && !input.flags.includes("tunda-dp") ? "sudah" : "wajib",
    },
    {
      title: "Satu halaman lingkup kerja",
      detail: input.hasContract
        ? "Kontrak sudah ada. Pastikan isinya menyebut hasil, batas revisi, dan kapan dianggap selesai."
        : "Tanpa kontrak, tulis surat pesanan singkat: hasil akhir, yang tidak termasuk, dan cara berhenti.",
      state: input.hasContract ? "sudah" : "wajib",
    },
    {
      title: "Batas revisi",
      detail:
        input.revision === "terbatas"
          ? "Revisi sudah dibatasi. Cantumkan jumlah putaran dan bahwa brief baru dihitung pekerjaan terpisah."
          : "Tanpa batas revisi, klien bisa menggeser arah tanpa akhir. Kunci dua putaran di lingkup yang sama.",
      state: input.revision === "terbatas" ? "sudah" : "wajib",
    },
    {
      title: "Jadwal bayar per tahap",
      detail:
        input.payment === "bertahap"
          ? "Pembayaran bertahap sudah ada. Tulis persentase tiap tahap dan apa yang memicu transfer berikutnya."
          : "Jangan menunggu pelunasan setelah klien melihat hasil. Pecah jadi DP, tengah, dan sisa sebelum file final.",
      state: input.payment === "bertahap" ? "sudah" : "wajib",
    },
    {
      title: "Hak berhenti bila bayaran telat",
      detail: "Sebutkan bahwa produksi jeda jika transfer melewati tanggal yang disepakati, tanpa denda untuk kamu.",
      state: "tambahkan",
    },
  ];

  if (input.flags.includes("sampel-gratis") || input.flags.includes("bayar-exposure")) {
    items.push({
      title: "Sampel dan eksposur bukan upah",
      detail: "Tolak trial gratis dan janji ‘nanti viral’. Setiap uji arah yang memakan waktu tetap berbayar.",
      state: "wajib",
    });
  }

  if (input.flags.includes("tengah-malam")) {
    items.push({
      title: "Jam balas yang wajar",
      detail: "Tulis jendela komunikasi, misalnya 09.00–18.00. Chat lewat tengah malam tidak mengubah deadline.",
      state: "tambahkan",
    });
  }

  return items;
}

export function scoreKasus(input: KasusInput): KasusResult {
  let score = 16;
  const reasons: string[] = [];

  const sourceScore: Record<KasusInput["foundVia"], number> = {
    rekomendasi: -8,
    marketplace: 4,
    instagram: 11,
    "dm-dingin": 22,
    lowongan: 8,
    lainnya: 10,
  };
  score += sourceScore[input.foundVia];
  if (input.foundVia === "dm-dingin") {
    reasons.push("Klien datang dari DM dingin, jadi belum ada riwayat kerja yang bisa kamu pegang.");
  } else if (input.foundVia === "rekomendasi") {
    reasons.push("Jalur rekomendasi sedikit menahan risiko, selama DP tetap masuk sebelum kerja.");
  } else if (input.foundVia === "instagram") {
    reasons.push("Percakapan dari Instagram mudah menguap kalau belum ada pesanan tertulis.");
  }

  if (input.dpPercent <= 0) {
    score += 30;
    reasons.push("Tidak ada DP. Ini pola paling sering berakhir sebagai kerja gratis.");
  } else if (input.dpPercent < 20) {
    score += 20;
    reasons.push(`DP ${input.dpPercent}% terlalu tipis untuk menahan klien tetap di meja.`);
  } else if (input.dpPercent < 30) {
    score += 12;
    reasons.push(`DP ${input.dpPercent}% belum cukup untuk memulai produksi.`);
  } else if (input.dpPercent < 40) {
    score += 4;
    reasons.push(`DP ${input.dpPercent}% sudah disebut. Pastikan dananya benar-benar masuk.`);
  } else {
    score -= 6;
    reasons.push(`DP ${input.dpPercent}% cukup sebagai kunci, asal tidak digeser lagi.`);
  }

  if (input.hasContract) {
    score -= 10;
    reasons.push("Ada kontrak. Periksa apakah DP, revisi, dan pelunasan tertulis di dalamnya.");
  } else {
    score += 18;
    reasons.push("Belum ada kontrak. Janji di chat sulit ditagih kalau klien menghilang.");
  }

  if (input.revision === "tanpa-batas") {
    score += 16;
    reasons.push("Revisi tanpa batas membuat proyek tidak pernah selesai, dan sisa bayaran ikut menggantung.");
  } else if (input.revision === "tidak-dibahas") {
    score += 12;
    reasons.push("Revisi belum dibahas. Celah ini biasa dipakai untuk menambah pekerjaan diam-diam.");
  } else if (input.revision === "tidak-ada") {
    score += 8;
    reasons.push("Tidak ada kesepakatan revisi. Saat hasil datang, aturan bisa dibuat sepihak.");
  } else {
    score -= 4;
  }

  if (input.payment === "tidak-ada") {
    score += 14;
    reasons.push("Belum ada janji bayar. Jangan membuka file kerja.");
  } else if (input.payment === "di-akhir") {
    score += 12;
    reasons.push("Pelunasan di akhir memberi klien ruang untuk menghilang setelah melihat hasil.");
  } else if (input.payment === "belum-jelas") {
    score += 10;
    reasons.push("Jadwal bayar masih mengambang, jadi tidak ada tanggal yang bisa kamu tagih.");
  } else {
    score -= 8;
  }

  const flagWeight = Math.min(24, input.flags.length * 5);
  score += flagWeight;
  if (input.flags.includes("tunda-dp")) reasons.push("DP yang terus ditunda adalah sinyal kabur, bukan kesibukan semata.");
  if (input.flags.includes("kontrak-nanti")) reasons.push("Kalimat ‘kontrak menyusul’ sering berarti kontrak tidak pernah datang.");
  if (input.flags.includes("bayar-exposure")) reasons.push("Janji eksposur tidak mengganti transfer.");
  if (input.flags.includes("sampel-gratis")) reasons.push("Sampel gratis adalah pekerjaan yang belum dibayar.");
  if (input.flags.includes("brief-berubah")) reasons.push("Brief yang berubah tanpa catatan membuat tagihan sulit dipertahankan.");
  if (input.flags.includes("tengah-malam")) reasons.push("Chat yang hanya hidup tengah malam menyulitkan batas kerja yang sehat.");
  if (input.flags.includes("baru-tanpa-jejak")) reasons.push("Klien tanpa jejak usaha lebih mudah menghilang setelah menerima file.");

  const next = clamp(score);
  const band = bandOf(next);
  return {
    score: next,
    band,
    headline: headline(band),
    reasons: reasons.slice(0, 5),
    checklist: checklist(input),
    message: buildMessage(input, band),
  };
}
