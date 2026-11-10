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
        Dengan memakai PajakKuGak kamu setuju bahwa slip musim lapor adalah informasi sekali bayar sebesar Rp24.900, bukan
        kontrak jasa konsultan pajak dan bukan pengisian SPT.
      </p>
      <p>
        Kamu bertanggung jawab atas angka yang diketik. Peta memakai PTKP TK/0 dan ambang UMKM yang disebut di halaman
        tentang. Status kawin, tanggungan, gaji, dan penghasilan lain di luar omzet klien dapat mengubah kewajibanmu.
      </p>
      <p>
        Jangan menggunakan situs ini untuk meminta kami menghubungi DJP, memotong pajak klien, atau menyimpan kredensial
        akun pajak. Pembayaran yang sudah membuka slip tidak dibatalkan hanya karena putusannya bukan yang diharapkan.
      </p>
    </LegalPage>
  );
}
