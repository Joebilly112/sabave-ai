import { bandLabel, dayOffLabel, debtLabel, moodLabel, passportLabel, sectorLabel, wageLabel } from "@/lib/labels";
import type { Factor, StayInput, StayResult } from "@/lib/types";

function isDarurat(input: StayInput): boolean {
  if (input.abuse === "fisik" || input.abuse === "keduanya") return true;
  if (input.passport === "tidak") return true;
  if (input.wage === "tidak") return true;
  if (input.mood === "takut") return true;
  if (input.dayOff === "0" && (input.abuse === "verbal" || input.wage === "telat")) return true;
  return false;
}

function isBantuan(input: StayInput): boolean {
  if (input.abuse === "verbal") return true;
  if (input.wage === "telat") return true;
  if (input.dayOff === "0") return true;
  if (input.passport === "tidak_tahu") return true;
  if (input.mood === "sedih") return true;
  if (input.debt === "besar" && input.monthsLeft > 6) return true;
  return false;
}

function factorsFor(input: StayInput): Factor[] {
  const items: Factor[] = [
    {
      title: wageLabel[input.wage],
      detail:
        input.wage === "ya"
          ? "Gaji yang masuk sesuai janji mengurangi alasan untuk buru-buru pergi, selama syarat lain juga aman."
          : input.wage === "telat"
            ? "Keterlambatan yang berulang perlu dicatat tanggalnya dan ditanyakan lewat jalur resmi, bukan ditanggung sendiri."
            : "Gaji yang tidak dibayar adalah alasan untuk menghubungi bantuan sekarang. Jangan menunggu kontrak habis untuk itu.",
    },
    {
      title: passportLabel[input.passport],
      detail:
        input.passport === "ya"
          ? "Paspor di tangan sendiri membuat pilihan pulang atau pindah tetap terbuka."
          : input.passport === "tidak"
            ? "Paspor yang dipegang majikan, agensi, atau orang lain adalah tanda darurat. Minta bantuan resmi, jangan merebutnya dengan paksa sendirian."
            : "Kalau kamu tidak tahu paspor ada di mana, anggap dokumen itu belum aman sampai kamu melihatnya sendiri.",
    },
    {
      title: dayOffLabel[input.dayOff],
      detail:
        input.dayOff === "0"
          ? "Tanpa hari libur, tubuh dan pikiran tidak sempat pulih. Ini cukup untuk mencari bantuan, terutama jika digabung dengan gaji telat atau kata-kata yang menyakitkan."
          : "Hari libur yang benar-benar kamu pakai adalah bagian dari rencana bertahan, bukan hadiah.",
    },
    {
      title: input.abuse === "tidak" ? "Tidak melaporkan kekerasan" : "Ada kekerasan",
      detail:
        input.abuse === "tidak"
          ? "Kamu menandai tidak ada kekerasan. Jika nanti ada bentakan, ancaman, atau pukulan, ulangi cek ini — jangan dianggap biasa."
          : input.abuse === "verbal"
            ? "Hinaan, ancaman, dan teriakan tetap alasan untuk minta bantuan. Kamu tidak harus menunggu sampai ada luka."
            : "Kekerasan fisik tidak diselesaikan dengan bertahan sampai kontrak habis. Hubungi jalur resmi hari ini.",
    },
  ];

  if (input.mood !== "stabil") {
    items.push({
      title: moodLabel[input.mood],
      detail:
        input.mood === "takut"
          ? "Rasa takut adalah sinyal untuk menjauh dari bahaya dan menghubungi orang yang bisa menolong, bukan untuk dinilai sendiri."
          : input.mood === "sedih"
            ? "Sedih yang tidak reda sering berarti kamu butuh teman bicara di luar rumah kerja, termasuk keluarga dan layanan resmi."
            : "Kurang tidur menurunkan kemampuan menilai. Masukkan istirahat ke rencana minggu ini.",
    });
  }

  if (input.debt !== "lunas") {
    items.push({
      title: debtLabel[input.debt],
      detail:
        "Utang ke agensi bukan borgol. Biaya yang sudah dibayar tidak mewajibkan kamu diam saat gaji, paspor, atau keselamatan tertahan.",
    });
  }

  return items;
}

function evidenceFor(input: StayInput): string[] {
  const lines = [
    "Catat tanggal, jam, dan apa yang terjadi dalam buku atau catatan di ponsel yang majikan tidak bisa buka.",
    "Simpan foto slip, transfer, atau pesan soal gaji hanya jika mengambil foto itu aman.",
    "Foto kontrak dan halaman paspor (kalau dokumen ada di tanganmu) lalu kirim salinannya ke keluarga.",
    "Jangan hapus pesan ancaman. Salin ke tempat lain sebelum percakapan ditutup.",
  ];
  if (input.abuse === "fisik" || input.abuse === "keduanya") {
    lines.push("Foto luka hanya jika kamu bisa melakukannya tanpa ketahuan dan tanpa memperbesar bahaya.");
  }
  if (input.passport !== "ya") {
    lines.push("Tuliskan siapa yang terakhir memegang paspor dan kapan kamu melihatnya.");
  }
  return lines;
}

function planFor(input: StayInput, band: StayResult["band"]): string[] {
  if (band === "darurat") {
    return [
      "Jika ada bahaya yang sedang terjadi, hubungi polisi atau nomor darurat di negara tempat kamu berada, lalu KBRI atau KJRI.",
      "Kirim pesan ke WhatsApp pengaduan KP2MI dan telepon call center dari luar negeri. Sebut negara, kota, dan bahwa kamu butuh perlindungan.",
      "Jangan beri tahu majikan bahwa kamu akan melapor jika itu bisa membuatmu lebih tidak aman.",
      "Hubungi satu orang keluarga dan minta mereka ikut menghubungi perwakilan RI jika kamu tidak bisa menelepon lama.",
      `Sisa kontrak ${input.monthsLeft} bulan tidak mengubah langkah ini. Keselamatan didahulukan.`,
    ];
  }

  if (band === "bantuan") {
    return [
      "Hubungi KP2MI atau perwakilan RI sebelum memutuskan pulang atau pindah majikan. Bawa kronologi singkat, bukan hanya perasaan.",
      "Tulis tiga fakta: gaji terakhir kapan masuk, paspor ada di siapa, dan apa yang berubah dalam dua minggu terakhir.",
      "Jangan menandatangani kertas baru yang tidak kamu pahami, termasuk potongan gaji atau perpanjangan, sebelum ada yang membantu membacanya.",
      "Jaga satu jalur kabar mingguan dengan keluarga di luar rumah kerja.",
      "Jika besok kondisinya memburuk — paspor diambil, gaji berhenti, atau kamu takut — anggap situasinya darurat dan hubungi nomor resmi hari itu juga.",
    ];
  }

  return [
    `Tulis tanggal perkiraan kontrak habis. Kamu sudah bekerja ${input.monthsWorked} bulan di ${input.country} sebagai ${sectorLabel[input.sector].toLowerCase()}, sisa sekitar ${input.monthsLeft} bulan.`,
    "Catat setiap gaji: tanggal, jumlah, dan cara bayar. Satu bulan yang meleset adalah alasan untuk cek ulang.",
    "Pakai hari libur untuk istirahat dan satu percakapan dengan keluarga, bukan hanya untuk pekerjaan tambahan.",
    "Simpan salinan kontrak di luar rumah kerja. Paspor tetap di tanganmu.",
    "Ulangi cek ini jika muncul bentakan yang menakutkan, libur dihilangkan, atau ada yang meminta paspor.",
  ];
}

export function decideStay(input: StayInput): StayResult {
  const band = isDarurat(input) ? "darurat" : isBantuan(input) ? "bantuan" : "bertahan";
  const headline =
    band === "darurat"
      ? "Ini pita darurat. Bantuan resmi dibuka sekarang, tanpa bayar."
      : band === "bantuan"
        ? "Lebih aman mencari bantuan sekarang daripada menunggu kontrak habis."
        : "Kamu bisa bertahan dengan rencana, selama syarat aman ini tidak berubah.";

  const summary =
    band === "darurat"
      ? "Ada tanda yang tidak boleh ditunda: kekerasan fisik, paspor tidak di tanganmu, gaji tidak dibayar, rasa takut, atau libur hilang bersamaan dengan tekanan lain. Ini bukan penilaian hukum dan bukan perintah pulang. Ini tanda untuk menghubungi orang yang bertugas menolong."
      : band === "bantuan"
        ? "Belum tentu darurat medis atau polisi hari ini, tetapi ada yang perlu ditangani sebelum kamu memutuskan diam sampai kontrak selesai. Utang agensi dan biaya yang sudah keluar tidak menghapus langkah minta bantuan."
        : "Dari isian ini, gaji, paspor, libur, dan rasa aman masih cukup untuk menyusun rencana sampai kontrak habis. Rencana itu berisi catatan, istirahat, dan batas yang membuatmu menghubungi bantuan jika sesuatu berubah.";

  return {
    band,
    helpFree: band === "darurat",
    headline,
    summary,
    factors: factorsFor(input),
    evidence: evidenceFor(input),
    plan: planFor(input, band),
  };
}

export function bandName(band: StayResult["band"]): string {
  return bandLabel[band];
}
