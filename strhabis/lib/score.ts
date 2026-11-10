import { jakartaToday, parseIsoDate } from "@/lib/parse";
import { PLACE_LABEL, SIP_LABEL, type CekInput, type CekResult, type DocItem, type WeekStep } from "@/lib/types";

function daysBetween(later: Date, earlier: Date): number {
  return Math.round((later.getTime() - earlier.getTime()) / 86400000);
}

function workplaceLetter(input: CekInput): DocItem {
  const who: Record<CekInput["place"], string> = {
    rs_pemerintah: "direktur atau SDM rumah sakit",
    rs_swasta: "direktur atau SDM rumah sakit",
    klinik: "penanggung jawab klinik",
    puskesmas: "kepala puskesmas",
    mandiri: "organisasi profesi setempat, plus bukti alamat praktik",
  };
  return {
    title: `Surat dari ${PLACE_LABEL[input.place].toLowerCase()}`,
    detail: `Minta surat keterangan masih bertugas atau keterangan tempat praktik ke ${who[input.place]}. Simpan versi yang ditandatangani, bukan hanya chat.`,
    tone: "cek",
  };
}

function documents(input: CekInput): DocItem[] {
  const skpTone = input.skp >= 15 ? "siap" : input.skp > 0 ? "cek" : "kosong";
  const sipTone = input.sip === "aktif" ? "siap" : input.sip === "proses" ? "cek" : "kosong";
  return [
    {
      title: "Scan STR yang sekarang",
      detail: "Satu berkas jelas: nama, nomor, tanggal terbit, dan tanggal habis terbaca. Jangan kirim foto buram dari grup.",
      tone: "cek",
    },
    {
      title: "KTP dan pas foto terbaru",
      detail: "Cocokkan ukuran dan latar pas foto dengan ketentuan yang tertulis di portal saat kamu unggah, bukan dari ingatan tahun lalu.",
      tone: "cek",
    },
    {
      title: `Bukti SKP yang sudah ada (${input.skp})`,
      detail:
        input.skp === 0
          ? "Belum ada kredit yang kamu catat. Kumpulkan sertifikat dulu, lalu bandingkan jumlahnya dengan syarat di portal resmi."
          : "Rapikan sertifikat sesuai urutan tanggal. Angka ini catatanmu sendiri, bukan konfirmasi bahwa syarat resmi sudah terpenuhi.",
      tone: skpTone,
    },
    workplaceLetter(input),
    {
      title: `Status SIP: ${SIP_LABEL[input.sip].toLowerCase()}`,
      detail:
        input.sip === "aktif"
          ? "SIP yang aktif tidak menggantikan STR. Setelah STR baru terbit, cek apakah SIP juga perlu diperpanjang."
          : input.sip === "proses"
            ? "Proses SIP bukan bukti STR sudah diperpanjang. Simpan nomor antrean, lalu tetap siapkan berkas STR."
            : "Cari dulu apakah SIP-mu ada. Jangan mengarang status saat SDM menanyakan.",
      tone: sipTone,
    },
    {
      title: "Cek syarat resmi sebelum unggah",
      detail:
        "Buka portal Konsil atau Kemenkes di hari pengajuan. Daftar di sini hanya persiapan, bukan keputusan bahwa berkasmu diterima.",
      tone: "cek",
    },
  ];
}

function weeks(input: CekInput, daysLeft: number): WeekStep[] {
  const thinSkp = input.skp < 15;
  if (daysLeft < 0) {
    return [
      {
        label: "Hari ini",
        title: "Beri tahu atasan bahwa STR sudah lewat tanggal",
        detail:
          "Sampaikan ke SDM atau kepala ruangan bahwa tanggal di STR sudah terlewati dan kamu sedang menyiapkan perpanjangan. Jangan meminta STRHabis memutuskan apakah kamu boleh praktik.",
      },
      {
        label: "Hari 2",
        title: "Kumpulkan identitas dan STR lama",
        detail: "Scan STR, KTP, dan pas foto dalam satu map. Beri nama berkas yang bisa dicari, misalnya STR-lama.",
      },
      {
        label: "Hari 3–4",
        title: thinSkp ? "Kejar bukti SKP yang masih kurang" : "Rapikan sertifikat SKP",
        detail: thinSkp
          ? "Minta salinan sertifikat yang pernah kamu ikuti. Catat judul dan tanggal, lalu cocokkan dengan angka di portal."
          : "Urutkan sertifikat. Siapkan cadangan jika satu berkas ditolak karena buram.",
      },
      {
        label: "Hari 5",
        title: "Minta surat tempat praktik",
        detail: workplaceLetter(input).detail,
      },
      {
        label: "Hari 6",
        title: "Ajukan di portal resmi",
        detail: "Unggah hanya setelah kamu membaca daftar dokumen hari itu. Simpan bukti unggah dan nomor permohonan.",
      },
      {
        label: "Setelah terbit",
        title: "Cocokkan STR baru dengan SIP",
        detail: "Begitu STR baru ada, cek masa berlaku SIP. Jangan anggap satu dokumen memperbarui dokumen yang lain.",
      },
    ];
  }

  if (daysLeft <= 45) {
    return [
      {
        label: "Minggu ini",
        title: "Hitung mundur dan kabari SDM",
        detail: `Sisa ${daysLeft} hari menurut tanggal yang kamu isi. Beri tahu SDM sebelum mereka yang menanyakan di koridor.`,
      },
      {
        label: "Minggu 1",
        title: "Berkas identitas selesai",
        detail: "STR lama, KTP, dan pas foto sudah dalam satu folder sebelum akhir minggu.",
      },
      {
        label: "Minggu 2",
        title: thinSkp ? "Isi celah SKP yang kentara" : "Audit sertifikat SKP",
        detail: thinSkp
          ? "Dengan kredit tercatat masih tipis dan tanggal sudah dekat, prioritaskan bukti yang benar-benar kamu miliki. Cek angka minimum di portal, jangan menebak."
          : "Coret sertifikat yang tidak relevan dan siapkan yang paling jelas tanggalnya.",
      },
      {
        label: "Minggu 3",
        title: "Surat tempat kerja",
        detail: "Ajukan surat sekarang. Antrean tanda tangan sering lebih lama daripada unggah berkas.",
      },
      {
        label: "Minggu 4",
        title: "Baca portal lalu unggah",
        detail: "Bandingkan daftar ini dengan halaman resmi pada hari yang sama. Simpan tangkapan bukti kirim.",
      },
      {
        label: "Sampai terbit",
        title: "Jangan biarkan SIP tertinggal",
        detail:
          input.sip === "aktif"
            ? "Tandai tanggal SIP di kalender terpisah supaya perpanjangannya tidak menyusul diam-diam."
            : "Selagi menunggu STR, kumpulkan juga apa yang diminta untuk SIP.",
      },
    ];
  }

  const spread = daysLeft <= 120;
  return [
    {
      label: spread ? "Minggu 1" : "Bulan ini",
      title: "Tulis tanggal di kalender yang terlihat",
      detail: `STR yang kamu catat habis ${input.expiresOn}. Tempel tanggal itu di catatan dinas, bukan hanya di galeri foto.`,
    },
    {
      label: spread ? "Minggu 2" : "Bulan 2",
      title: "Cari SIP dan tempat praktik",
      detail: `${SIP_LABEL[input.sip]}. Tempat praktik: ${PLACE_LABEL[input.place]}. Simpan keduanya di map yang sama dengan STR.`,
    },
    {
      label: spread ? "Minggu 3–4" : "Bulan 3",
      title: thinSkp ? "Tambah bukti SKP pelan-pelan" : "Rapikan portofolio SKP",
      detail: thinSkp
        ? "Kredit tercatat masih di bawah isyarat siaga 15. Itu bukan syarat resmi. Pakai waktu yang tersisa untuk mengumpulkan sertifikat, lalu cocokkan dengan portal."
        : "Kredit tercatat sudah punya bahan. Urutkan dan buang duplikat.",
    },
    {
      label: spread ? "Minggu 5" : "Dua bulan sebelum habis",
      title: "Minta surat tempat kerja",
      detail: workplaceLetter(input).detail,
    },
    {
      label: spread ? "Minggu 6" : "Enam minggu sebelum habis",
      title: "Bandingkan dengan portal",
      detail: "Baca daftar dokumen resmi sekali lagi. Coreti yang tidak diminta, tambah yang baru muncul.",
    },
    {
      label: "Minggu unggah",
      title: "Ajukan, lalu pantau",
      detail: "Setelah kirim, catat nomor permohonan. Jangan menunggu SDM mengingatkan untuk kedua kali.",
    },
  ];
}

export function decideCek(input: CekInput): CekResult {
  const expires = parseIsoDate(input.expiresOn);
  if (!expires) {
    throw new Error("Tanggal habis tidak valid.");
  }
  const daysLeft = daysBetween(expires, jakartaToday());
  const band = daysLeft < 0 ? "lewat" : daysLeft <= 45 ? "mepet" : daysLeft <= 120 ? "siaga" : "longgar";
  const bandLabel =
    band === "lewat" ? "Sudah lewat" : band === "mepet" ? "Mepet" : band === "siaga" ? "Siaga" : "Masih longgar";
  const countdownLabel =
    daysLeft < 0
      ? `${Math.abs(daysLeft)} hari setelah tanggal habis`
      : daysLeft === 0
        ? "Habis hari ini"
        : `${daysLeft} hari lagi`;
  const headline =
    band === "lewat"
      ? "Tanggal di STR sudah terlewati. Siapkan berkas sebelum SDM menanyakan lagi."
      : band === "mepet"
        ? "Jendela perpanjangannya sudah sempit. Urutkan dokumen minggu ini."
        : band === "siaga"
          ? "Masih ada waktu, asal surat dan SKP tidak menyusul di minggu terakhir."
          : "Tanggalnya masih jauh. Pakai waktu ini untuk merapikan, bukan untuk menunda.";

  const note =
    band === "lewat"
      ? `STR yang kamu isi habis pada ${input.expiresOn}. Rencana di bawah ini mengurutkan berkas supaya kamu tidak diam saat SDM bertanya. STRHabis tidak menyatakan bahwa kamu boleh atau tidak boleh praktik.`
      : `Menurut tanggal ${input.expiresOn}, sisa waktu ${countdownLabel.toLowerCase()}. Status SIP: ${SIP_LABEL[input.sip].toLowerCase()}. Kredit SKP yang kamu catat: ${input.skp}. Cocokkan semuanya dengan portal resmi sebelum unggah.`;

  return {
    daysLeft,
    band,
    bandLabel,
    headline,
    countdownLabel,
    documents: documents(input),
    weeks: weeks(input, daysLeft),
    note,
    assumptions: [
      "Hitungan hari memakai tanggal habis yang kamu ketik, pada kalender Asia/Jakarta.",
      "Angka 15 kredit hanya isyarat supaya rencana tidak menunda portofolio. Bukan syarat Konsil atau Kemenkes.",
      "Daftar dokumen final, biaya resmi, dan keputusan penerimaan ada di portal saat kamu mengajukan.",
    ],
  };
}
