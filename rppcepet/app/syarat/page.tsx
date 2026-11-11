import { LegalPage } from "@/components/LegalPage";
import { PRODUCT } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Syarat penggunaan",
  path: "/syarat",
  noindex: true,
});

export default function SyaratPage() {
  return (
    <LegalPage title="Syarat penggunaan">
      <p>
        Dengan membayar {PRODUCT.priceLabel}, kamu membeli satu kali buka kerangka untuk isian yang kamu kirim. Ini
        barang digital. Setelah kerangka terbuka, pembayaran tidak diubah menjadi langganan.
      </p>
      <p>
        Kamu boleh menyalin kerangka ke dokumen sekolahmu untuk kelasmu sendiri. Kamu tidak memperoleh hak untuk
        menjual ulang teks itu sebagai jasa penyusunan RPP.
      </p>
      <p>
        Layanan bergantung pada penyedia pembayaran dan basis data. Jika token pembayaran gagal dibuat, pesanan yang
        sudah tersimpan tetap bisa dibuka dari tautan hasil setelah pembayaran berhasil.
      </p>
    </LegalPage>
  );
}
