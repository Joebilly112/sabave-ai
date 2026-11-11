import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Syarat",
  robots: { index: false, follow: false },
};

export default function SyaratPage() {
  return (
    <LegalPage title="Syarat penggunaan" updated="11 November 2026">
      <p>
        Dengan mengisi formulir, kamu menyatakan isian itu gambaran umum, bukan identitas anak. Laporan dibuka sekali
        seharga Rp14.900. Tidak ada langganan.
      </p>
      <p>
        Hasil adalah bacaan dari pola yang kamu pilih. Kamu tetap yang memutuskan kapan menelepon dan bagaimana bicara
        dengan pengasuh. Kami dapat menolak transaksi yang gagal diverifikasi pembayaran.
      </p>
      <p>Jangan memakai situs ini untuk menekan anak atau pengasuh. Naskah yang tersedia bersifat sopan dan singkat.</p>
    </LegalPage>
  );
}
