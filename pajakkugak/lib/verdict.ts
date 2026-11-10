import { bandLabel, verdictLabel } from "@/lib/labels";
import type { CekInput, CekResult, OmzetBand, Withheld } from "@/lib/types";

/** PTKP TK/0 sejak UU HPP. Angka paling kecil — status kawin dan tanggungan menaikkan PTKP. */
export const PTKP_TK0 = 54_000_000;
const FIVE_HUNDRED = 500_000_000;
const UMKM_CAP = 4_800_000_000;

const RANK: Record<OmzetBand, number> = {
  bawah_500: 0,
  "500_sampai_48": 1,
  atas_48: 2,
};

function bandFromGross(gross: number): OmzetBand {
  if (gross > UMKM_CAP) return "atas_48";
  if (gross > FIVE_HUNDRED) return "500_sampai_48";
  return "bawah_500";
}

function withheldIsReal(withheld: Withheld): boolean {
  return withheld === "pph23" || withheld === "pph21" || withheld === "keduanya";
}

function formPath(band: OmzetBand): string {
  if (band === "atas_48") {
    return "Jalur baca: SPT Tahunan orang pribadi formulir 1770 dengan tarif umum, bukan PPh final UMKM 0,5%. Omzet di atas Rp4,8 miliar keluar dari skema final. DJP Online tetap menanyakan pembukuan atau norma — ikuti pertanyaan itu, jangan memaksa skema 0,5%.";
  }
  if (band === "500_sampai_48") {
    return "Jalur baca: SPT 1770 untuk pekerjaan bebas atau usaha. Kalau kamu masuk syarat UMKM orang pribadi, PPh final 0,5% biasanya hanya menyentuh bagian omzet di atas Rp500 juta sampai Rp4,8 miliar. Bagian sampai Rp500 juta umumnya tidak dikenai PPh final. Simpan bukti setor untuk bagian yang terutang.";
  }
  return "Jalur baca: SPT 1770 (pekerjaan bebas), bukan 1770 SS yang dipakai karyawan satu pemberi kerja. Untuk UMKM orang pribadi, bagian omzet sampai Rp500 juta umumnya tidak dikenai PPh final. NPWP yang sudah terbit tetap menyampaikan SPT — seringnya nihil bila tidak ada penghasilan lain yang terutang.";
}

function checklist(input: CekInput, band: OmzetBand, verdict: CekResult["verdict"]): string[] {
  const rows = [
    "Rekap omzet bruto per bulan: nama klien, nomor invoice, tanggal dana masuk. Jangan mengirim password DJP ke alat ini atau ke siapa pun.",
    "Simpan invoice dan bukti transfer yang cocok dengan rekap. Selisih kecil dicatat, jangan dihapus diam-diam.",
  ];

  if (verdict === "belum") {
    rows.push("Belum perlu formulir. Tetap catat omzet. Status berubah begitu NPWP terbit, klien memotong pajak, atau penghasilan melewati PTKP.");
    rows.push("Kalau tahun depan klien mulai memotong, minta bukti potong di bulan yang sama, jangan menunggu Maret.");
    return rows;
  }

  rows.push(
    input.hasNpwp === "punya"
      ? "Siapkan NPWP dan akses DJP Online. Jangan membagikan kata sandi; cukup catat bahwa akunnya aktif."
      : "Urus NPWP sebelum mengisi SPT. Status “sedang diurus” tetap dihitung sebagai jalur lapor, bukan alasan menunda catatan.",
  );

  if (withheldIsReal(input.withheld) || input.withheld === "tidak_tahu") {
    rows.push("Kumpulkan bukti potong PPh 23 dan/atau PPh 21. Kalau belum pegang PDF-nya, minta ke klien sebelum batas lapor.");
  } else {
    rows.push("Catat bahwa tidak ada bukti potong. Kalau ingatanmu berubah, geser jawaban dan hitung ulang.");
  }

  if (band === "500_sampai_48") {
    rows.push("Siapkan bukti setor PPh final untuk bagian omzet di atas Rp500 juta, plus rekap yang memisahkan bagian di bawah dan di atas batas itu.");
  }

  if (band === "atas_48") {
    rows.push("Siapkan pembukuan atau pencatatan norma: rekap biaya yang ada bukti, bukan skema setor 0,5%.");
    rows.push("Pisahkan rekening usaha dan pribadi sebisa mungkin sebelum angka laba dibaca.");
  }

  rows.push("Baca ulang pertanyaan di DJP Online. Peta formulir ini tidak menggantikan pilihan yang ditampilkan akunmu.");
  return rows;
}

function clientNote(input: CekInput, verdict: CekResult["verdict"]): string {
  if (verdict === "belum") {
    return "Catatan untuk diri sendiri: omzet tahun ini masih di bawah garis PTKP TK/0 dan belum ada NPWP atau bukti potong. Simpan rekap invoice. Jangan mengirim pesan panik ke klien hanya karena linimasa Maret.";
  }
  if (input.withheld === "tidak") {
    return "Halo, saya sedang membereskan catatan pajak freelancer tahun ini. Dari invoice kita, saya belum menerima bukti potong. Kalau memang tidak ada pemotongan, tolong dibalas singkat supaya catatan saya tertutup. Terima kasih.";
  }
  return "Halo, saya sedang menyusun catatan SPT freelancer. Boleh minta bukti potong PPh untuk invoice tahun ini (PDF e-Bupot atau nomor bukti)? Saya cocokkan dengan daftar invoice, tidak perlu data lain. Terima kasih.";
}

function headline(input: CekInput, band: OmzetBand, verdict: CekResult["verdict"]): string {
  if (verdict === "belum") {
    return "Dari isian ini kamu belum tentu wajib menyampaikan SPT tahun ini. Penghasilan masih di bawah PTKP TK/0, belum ada NPWP, dan tidak ada bukti potong.";
  }
  if (verdict === "mungkin") {
    return "Ada satu lubang sebelum putusan mengeras: kamu belum yakin ada bukti potong, atau omzet tepat menyentuh garis PTKP TK/0. Cek itu dulu, jangan mengisi formulir dalam keadaan panik.";
  }
  if (band === "atas_48") {
    return "Omzet di atas plafon UMKM. Ini jalur lapor tarif umum, bukan setor final 0,5%.";
  }
  if (input.hasNpwp !== "belum" && input.annualGross <= PTKP_TK0 && band === "bawah_500" && !withheldIsReal(input.withheld)) {
    return "NPWP yang sudah atau sedang terbit berarti SPT tetap disampaikan. Dengan omzet di bawah Rp500 juta dan di bawah PTKP TK/0, PPh-nya sering nihil — tetap lapor, bukan menghilang.";
  }
  if (withheldIsReal(input.withheld)) {
    return "Ada pajak yang sudah dipotong klien. Bukti potong itu dilaporkan, dan NPWP perlu ada supaya potongan tidak menggantung.";
  }
  if (input.annualGross > PTKP_TK0) {
    return "Omzet klien melewati PTKP TK/0 Rp54 juta. Itu batas paling kecil; status kawin atau tanggungan menaikkan PTKP, tapi garis ini sudah cukup untuk mengurus NPWP dan lapor.";
  }
  return "Jawabanmu masuk jalur wajib lapor. Baca peta formulir di bawah, lalu cocokkan dengan pertanyaan di DJP Online.";
}

export function decideCek(input: CekInput): CekResult {
  const fromGross = bandFromGross(input.annualGross);
  const bandUsed: OmzetBand = RANK[input.omzetBand] > RANK[fromGross] ? input.omzetBand : fromGross;
  const bandMismatch = input.omzetBand !== fromGross;
  const abovePtkp = input.annualGross > PTKP_TK0;
  const onPtkpLine = input.annualGross === PTKP_TK0;

  let verdict: CekResult["verdict"] = "belum";
  if (bandUsed !== "bawah_500" || input.hasNpwp !== "belum" || withheldIsReal(input.withheld) || abovePtkp) {
    verdict = "wajib";
  } else if (input.withheld === "tidak_tahu" || onPtkpLine) {
    verdict = "mungkin";
  }

  const assumptions = [
    "PTKP yang dipakai adalah TK/0 Rp54 juta. Kawin atau tanggungan membuat PTKP lebih tinggi, jadi garis “melewati PTKP” di sini sengaja ketat.",
    "Ambang UMKM yang dipakai: bagian sampai Rp500 juta untuk orang pribadi, plafon skema final Rp4,8 miliar. Di atas plafon, jalur beralih ke tarif umum.",
    "Ini peta baca musim lapor, bukan nasihat pajak, bukan pengisian SPT, dan bukan layanan DJP.",
  ];
  if (bandMismatch) {
    assumptions.unshift(
      `Angka omzet dan pilihan pita tidak sama. Peta memakai pita yang lebih hati-hati (${bandLabel[bandUsed]}), lalu angka rupiah tetap disimpan.`,
    );
  }

  return {
    verdict,
    verdictLabel: verdictLabel[verdict],
    headline: headline(input, bandUsed, verdict),
    formPath: verdict === "belum" ? "Belum ada jalur formulir. Jangan membuka 1770 SS hanya karena teman kantoran memakai formulir itu." : formPath(bandUsed),
    checklist: checklist(input, bandUsed, verdict),
    clientNote: clientNote(input, verdict),
    assumptions,
    bandUsed,
    bandMismatch,
  };
}
