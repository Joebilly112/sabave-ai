import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Syarat",
  robots: { index: false, follow: false },
};

export default function SyaratPage() {
  return (
    <LegalPage title="Syarat" updated="11 November 2026">
      <p>
        Dengan mengisi formulir kamu menyatakan data itu tentang pengalamanmu sendiri sebagai mitra, bukan tentang
        penumpang tertentu. Hasil dibuka sekali seharga Rp14.900 lewat QRIS. Tidak ada langganan.
      </p>
      <p>
        Kamu memakai pita risiko dan naskah sebagai bahan kerja, bukan sebagai izin untuk menekan penumpang, membeli
        ulasan, atau melanggar aturan platform tempat kamu narik.
      </p>
      <p>
        Jika pembayaran sudah lunas tetapi halaman masih terkunci, buka kembali tautan hasil yang sama. Status
        ditarik dari Midtrans. Pengembalian dana mengikuti kebijakan merchant, bukan janji di halaman ini.
      </p>
    </LegalPage>
  );
}
