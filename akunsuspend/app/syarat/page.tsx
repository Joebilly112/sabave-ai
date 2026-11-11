import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

export const metadata: Metadata = {
  title: "Syarat",
  robots: { index: false, follow: false },
};

export default function SyaratPage() {
  return (
    <LegalPage title="Syarat penggunaan" updated="11 November 2026">
      <p>
        Dengan mengisi formulir kamu menyatakan isian itu dari akunmu sendiri. AkunSuspend menjual sekali buka berkas
        seharga {formatRupiah(UNLOCK_PRICE_IDR)}, bukan langganan dan bukan jasa hukum.
      </p>
      <p>
        Kamu tidak memakai hasil ini untuk membuka akun kedua, memalsukan lokasi, atau menghubungi pelanggan di luar
        aplikasi. Pelanggaran aturan platform tetap menjadi tanggung jawabmu.
      </p>
      <p>Pembayaran diproses Midtrans. Akses berkas terbuka setelah status pembayaran terverifikasi lunas.</p>
    </LegalPage>
  );
}
