import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

export const metadata: Metadata = {
  title: "Syarat",
  robots: { index: false, follow: false },
};

export default function SyaratPage() {
  return (
    <LegalPage title="Syarat" updated="10 November 2026">
      <p>
        ShiftRusak adalah alat sekali bayar sebesar {formatRupiah(UNLOCK_PRICE_IDR)} untuk membaca pola dinas yang
        kamu isi sendiri. Dengan mengirim formulir, kamu menyatakan isian itu menggambarkan dinasmu, bukan dinas
        orang lain.
      </p>
      <p>
        Pembayaran yang sudah lunas membuka skor, usulan roster, dan naskah pada tautan hasil yang sama. Tidak ada
        langganan. Akses bergantung pada tautan itu tetap tersimpan.
      </p>
      <p>
        Kamu memakai naskah sebagai bahan bicara dan tetap mengikuti aturan rumah sakit. Kami tidak menjamin kepala
        ruangan mengubah roster.
      </p>
    </LegalPage>
  );
}
