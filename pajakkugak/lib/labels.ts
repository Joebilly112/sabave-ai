import type { NpwpStatus, OmzetBand, VerdictId, Withheld } from "@/lib/types";

export const npwpLabel: Record<NpwpStatus, string> = {
  punya: "Sudah punya NPWP",
  belum: "Belum punya NPWP",
  proses: "NPWP sedang diurus",
};

export const withheldLabel: Record<Withheld, string> = {
  tidak: "Tidak ada pemotongan",
  pph23: "Ada PPh 23",
  pph21: "Ada PPh 21",
  keduanya: "Ada PPh 23 dan 21",
  tidak_tahu: "Tidak tahu ada potongan atau tidak",
};

export const bandLabel: Record<OmzetBand, string> = {
  bawah_500: "Di bawah Rp500 juta",
  "500_sampai_48": "Rp500 juta sampai Rp4,8 miliar",
  atas_48: "Di atas Rp4,8 miliar",
};

export const verdictLabel: Record<VerdictId, string> = {
  wajib: "Wajib lapor",
  mungkin: "Mungkin — cek dulu",
  belum: "Belum tentu",
};
