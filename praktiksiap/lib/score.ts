import { gearLabel, ibiLabel, placeLabel, sipbLabel, strbLabel, wasteLabel, workplaceLabel } from "@/lib/labels";
import type { BandId, CekInput, CekResult, GapItem, PrepWeek, ScorePart } from "@/lib/types";

const bandLabel: Record<BandId, string> = {
  hijau: "Hijau — berkas inti sudah kelihatan",
  kuning: "Kuning — masih ada yang harus dilengkapi",
  merah: "Merah — jangan janji dinas dulu",
};

function bandFor(score: number, input: CekInput): BandId {
  if (input.strb === "belum" || (input.place === "belum" && input.gear === "belum")) return "merah";
  if (score >= 80) return "hijau";
  if (score >= 52) return "kuning";
  return "merah";
}

function gapsFor(input: CekInput): GapItem[] {
  const strb: GapItem = {
    id: "strb",
    title: "STRB",
    state: input.strb === "aktif" ? "siap" : input.strb === "proses" ? "proses" : "kurang",
    note:
      input.strb === "aktif"
        ? "Simpan salinan yang masih berlaku. Dinas biasanya minta melihat masa berlakunya, bukan hanya nomornya."
        : input.strb === "proses"
          ? "Catat tanggal pengajuan dan simpan bukti proses. Jangan anggap proses sama dengan STRB yang sudah terbit."
          : "Tanpa STRB yang berlaku, map praktik mandiri biasanya belum layak diantar ke loket.",
  };

  const sipb: GapItem = {
    id: "sipb",
    title: "SIPB untuk alamat baru",
    state: input.sipb === "habis" ? "kurang" : "proses",
    note:
      input.sipb === "aktif_lain"
        ? `${sipbLabel.aktif_lain}. Praktik di alamat baru tetap butuh izin untuk tempat itu, bukan cukup menempelkan SIPB lama.`
        : input.sipb === "habis"
          ? "SIPB yang sudah habis tidak bisa dipakai sebagai bukti tempat praktik yang baru."
          : "Belum punya SIPB itu wajar kalau tempatnya memang baru. Yang disiapkan adalah syarat untuk mengajukan, bukan fotokopi izin lama.",
  };

  const place: GapItem = {
    id: "tempat",
    title: "Tempat praktik",
    state: input.place === "milik" ? "siap" : input.place === "sewa" ? "proses" : "kurang",
    note:
      input.place === "milik"
        ? "Alamat sudah ada. Siapkan bukti penguasaan tempat yang diminta loket setempat."
        : input.place === "sewa"
          ? "Sewa cukup sebagai alamat, asal kontrak atau surat pemilik menyebut fungsi praktik dan jangka waktunya."
          : "Tanpa alamat, denah dan jarak ke fasilitas rujukan belum bisa ditulis.",
  };

  const gear: GapItem = {
    id: "alat",
    title: "Daftar alat",
    state: input.gear === "lengkap" ? "siap" : input.gear === "sebagian" ? "proses" : "kurang",
    note:
      input.gear === "lengkap"
        ? "Centang ulang daftar itu dengan ruangan yang benar-benar ada, bukan dengan wishlist."
        : input.gear === "sebagian"
          ? "Pisahkan alat yang sudah di ruangan dan alat yang masih rencana beli."
          : "Susun daftar minimum untuk layanan yang mau dibuka dulu. Jangan mulai dari katalog lengkap.",
  };

  const waste: GapItem = {
    id: "limbah",
    title: "Limbah medis",
    state: input.waste === "ada" ? "siap" : "kurang",
    note:
      input.waste === "ada"
        ? "Simpan alur: pemilahan, wadah, dan siapa yang mengangkut. Satu kalimat di map sering ditanya ulang."
        : "Rencana limbah yang kosong sering jadi alasan map dikembalikan, meski alat lain sudah ada.",
  };

  const ibi: GapItem = {
    id: "ibi",
    title: "Rekomendasi organisasi profesi",
    state: input.ibi === "ada" ? "siap" : input.ibi === "proses" ? "proses" : "kurang",
    note:
      input.ibi === "ada"
        ? `${ibiLabel.ada}. Cek apakah surat itu menyebut alamat praktik yang sama.`
        : input.ibi === "proses"
          ? "Tanyakan berkas apa yang masih ditahan cabang, lalu tulis tanggal janji berikutnya."
          : "Banyak dinas meminta rekomendasi IBI sebelum SIPB mandiri diproses. Minta daftar berkas cabangmu, jangan menyalin dari kota lain.",
  };

  return [strb, sipb, place, gear, waste, ibi];
}

function planFor(input: CekInput, gaps: GapItem[]): PrepWeek[] {
  const weeks: PrepWeek[] = [
    {
      title: "Minggu 1 · identitas profesi",
      window: "Hari 1–7",
      tasks: [
        input.strb === "aktif"
          ? "Fotokopi STRB yang masih berlaku dan tulis tanggal habisnya di sampul map."
          : input.strb === "proses"
            ? "Kejar bukti proses STRB. Jangan pindah ke janji dinas sebelum ada tanggal terbit."
            : "Urus STRB lebih dulu. Map yang lain boleh disusun, tapi loket belum jadi tujuan minggu ini.",
        `Catat tempat kerja sekarang: ${workplaceLabel[input.workplace]}. Kalau masih praktik di sana, minta surat keterangan kerja yang menyebut jabatan bidan.`,
        input.years < 2
          ? `Pengalaman ${input.years} tahun masih pendek. Tulis layanan apa yang sudah kamu lakukan sendiri, dan layanan mana yang akan kamu rujuk.`
          : `Pengalaman ${input.years} tahun cukup untuk diceritakan. Ringkas jadi satu halaman: layanan yang sudah biasa, bukan seluruh riwayat dinas.`,
      ],
    },
    {
      title: "Minggu 2 · alamat",
      window: "Hari 8–14",
      tasks: [
        input.place === "belum"
          ? "Putuskan satu alamat sebelum membeli alat tambahan. Tanpa alamat, denah hanya gambar."
          : input.place === "sewa"
            ? "Minta kontrak atau surat pemilik yang menyebut alamat lengkap dan izin dipakai untuk praktik."
            : "Siapkan bukti tempat milik dan cek apakah alamat di surat sama dengan alamat yang akan ditulis di permohonan.",
        "Ukur ruang periksa, ruang tunggu, dan tempat cuci tangan. Foto dalam cahaya siang, bukan foto katalog.",
        "Tulis fasilitas rujukan terdekat dan perkiraan waktu tempuh dari alamat itu.",
      ],
    },
    {
      title: "Minggu 3 · alat dan limbah",
      window: "Hari 15–21",
      tasks: [
        input.gear === "lengkap"
          ? "Cocokkan daftar alat dengan isi lemari. Yang belum di ruangan, keluar dari daftar “sudah ada”."
          : input.gear === "sebagian"
            ? "Beli atau pinjamkan hanya item yang menghalangi layanan pertama. Tandai sisanya sebagai tahap dua."
            : "Buat daftar alat untuk satu jenis layanan dulu, lalu hargai. Jangan mengisi ruangan dari brosur.",
        input.waste === "ada"
          ? "Tulis alur limbah di setengah halaman: pilah, wadah, penyimpanan sementara, pengangkut."
          : "Hubungi pengangkut limbah atau puskesmas pembina. Satu nama dan satu nomor lebih berguna daripada paragraf umum.",
        "Sediakan wadah benda tajam dan tandanya sebelum alat lain ditata.",
      ],
    },
    {
      title: "Minggu 4 · organisasi dan loket",
      window: "Hari 22–30",
      tasks: [
        input.ibi === "ada"
          ? "Cek surat rekomendasi: nama, alamat praktik, dan masa berlaku. Kalau alamatnya beda, minta perbaikan sebelum ke dinas."
          : input.ibi === "proses"
            ? "Selesaikan rekomendasi IBI minggu ini. Bawa daftar kekurangan dari cabang, bukan cerita lisan."
            : "Datang ke cabang IBI dengan draf alamat dan daftar layanan. Minta daftar berkas tertulis.",
        input.sipb === "habis"
          ? "SIPB lama yang habis hanya jadi arsip. Permohonan baru mengikuti alamat yang sudah kamu kunci."
          : "Siapkan map SIPB untuk alamat baru. SIPB di tempat kerja lama tidak otomatis pindah.",
        "Buat janji loket hanya jika STRB, alamat, dan rencana limbah sudah punya bukti. Bawa salinan, simpan asli di rumah.",
      ],
    },
  ];

  const missing = gaps.filter((gap) => gap.state === "kurang").map((gap) => gap.title);
  if (missing.length === 0) {
    weeks[3].tasks[2] = "Map sudah rapat. Tetap baca ulang persyaratan dinas kabupatenmu minggu ini, karena daftar lokal bisa lebih rinci daripada tema umum.";
  }
  return weeks;
}

function loketNoteFor(input: CekInput, band: BandId): string {
  const hold =
    band === "merah"
      ? "Saya belum meminta jadwal loket. Saya sedang melengkapi berkas yang masih kosong."
      : "Saya ingin memastikan map saya lengkap sebelum menyerahkan permohonan SIPB di alamat praktik.";
  return `Kepada petugas perizinan. Saya bidan dengan pengalaman ${input.years} tahun, saat ini ${workplaceLabel[input.workplace].toLowerCase()}. ${hold} Yang saya bawa adalah salinan STRB, bukti tempat, daftar alat, dan catatan limbah. Mohon ditunjukkan syarat yang masih kurang untuk alamat ini. Ini catatan persiapan, bukan pernyataan bahwa izin sudah layak terbit.`;
}

function headlineFor(band: BandId, gaps: GapItem[]): string {
  const missing = gaps.filter((gap) => gap.state === "kurang");
  if (band === "hijau") {
    return "Lampu hijau berarti tema besar sudah ada bukti. Tetap cocokkan dengan daftar dinas kabupatenmu sebelum mengantar map.";
  }
  if (band === "kuning") {
    const name = missing[0]?.title ?? "beberapa berkas";
    return `Masih kuning karena ${name.toLowerCase()} belum rapat. Lengkapi itu dulu, baru buat janji loket.`;
  }
  const names = missing.map((gap) => gap.title.toLowerCase()).slice(0, 3);
  const list = names.length > 0 ? names.join(", ") : "berkas inti";
  return `Lampu merah: ${list} belum siap. Mengantar map sekarang lebih sering berakhir dengan pengembalian.`;
}

export function decideCek(input: CekInput): CekResult {
  const parts: ScorePart[] = [
    {
      id: "pengalaman",
      label: "Lama praktik",
      points: input.years >= 3 ? 0 : input.years >= 1 ? 10 : 22,
    },
    {
      id: "basis",
      label: "Tempat kerja sekarang",
      points: input.workplace === "belum" ? 8 : 0,
    },
    {
      id: "strb",
      label: "STRB",
      points: input.strb === "aktif" ? 0 : input.strb === "proses" ? 14 : 28,
    },
    {
      id: "sipb",
      label: "SIPB",
      points: input.sipb === "aktif_lain" ? 8 : input.sipb === "belum" ? 10 : 18,
    },
    {
      id: "tempat",
      label: "Tempat",
      points: input.place === "milik" ? 0 : input.place === "sewa" ? 6 : 24,
    },
    {
      id: "alat",
      label: "Alat",
      points: input.gear === "lengkap" ? 0 : input.gear === "sebagian" ? 12 : 22,
    },
    {
      id: "limbah",
      label: "Limbah medis",
      points: input.waste === "ada" ? 0 : 16,
    },
    {
      id: "ibi",
      label: "Rekomendasi IBI",
      points: input.ibi === "ada" ? 0 : input.ibi === "proses" ? 6 : 14,
    },
  ];

  const deducted = parts.reduce((sum, part) => sum + part.points, 0);
  const score = Math.max(0, Math.min(100, 100 - deducted));
  const band = bandFor(score, input);
  const gaps = gapsFor(input);
  const assumptions = [
    "Skor membaca isianmu terhadap tema yang sering muncul saat bidan menyiapkan praktik mandiri: STRB, SIPB di alamat baru, tempat, alat, limbah, dan rekomendasi organisasi profesi.",
    "Daftar resmi ada di dinas kesehatan kabupaten atau kota dan peraturan yang sedang berlaku. PraktikSiap tidak menerbitkan izin dan tidak menyalin lampiran Permenkes.",
    `Status yang kamu pilih: ${strbLabel[input.strb]}, ${sipbLabel[input.sipb]}, ${placeLabel[input.place]}, ${gearLabel[input.gear]}, ${wasteLabel[input.waste]}, ${ibiLabel[input.ibi]}.`,
  ];

  return {
    score,
    band,
    bandLabel: bandLabel[band],
    headline: headlineFor(band, gaps),
    parts,
    gaps,
    plan: planFor(input, gaps),
    loketNote: loketNoteFor(input, band),
    assumptions,
  };
}
