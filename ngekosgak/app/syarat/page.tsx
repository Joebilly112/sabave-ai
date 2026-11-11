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
        Dengan mengisi formulir kamu meminta satu putusan untuk perjalanan itu. Membuka laporan lengkap adalah pembelian
        sekali, Rp14.900, untuk identifikasi hasil tersebut. Bukan langganan.
      </p>
      <p>
        Kamu bertanggung jawab atas angka yang diketik. Jika menit atau ongkos yang diisi bukan perjalanan yang nyata,
        putusannya ikut meleset.
      </p>
      <p>
        Layanan boleh ditolak jika pembayaran tidak terverifikasi. Gangguan sementara pada penyedia pembayaran tidak
        mengubah harga dan tidak membuka laporan secara otomatis.
      </p>
    </LegalPage>
  );
}
