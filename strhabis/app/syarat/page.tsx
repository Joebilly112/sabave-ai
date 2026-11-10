import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Syarat",
  robots: { index: false, follow: false },
};

export default function SyaratPage() {
  return (
    <LegalPage title="Syarat penggunaan" updated="10 November 2026">
      <p>
        Dengan mengisi formulir, kamu menyatakan bahwa tanggal dan jumlah kredit adalah catatamu sendiri. STRHabis
        menyusun rencana persiapan sekali bayar sebesar Rp19.900.
      </p>
      <p>
        Hasil bukan surat keterangan, bukan perpanjangan STR, dan bukan izin praktik. Kamu tetap membaca syarat di
        portal resmi sebelum mengunggah berkas.
      </p>
      <p>
        Pembayaran yang sudah lunas membuka halaman hasil untuk isian tersebut. Kami dapat menolak transaksi yang
        gagal diverifikasi oleh penyedia pembayaran.
      </p>
    </LegalPage>
  );
}
