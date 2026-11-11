import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { PRODUCT } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Syarat",
  path: "/syarat",
  noindex: true,
});

export default function SyaratPage() {
  return (
    <LegalPage title="Syarat">
      <p>Dengan membayar {PRODUCT.priceLabel}, kamu membuka satu lembar kesiapan untuk isian yang baru saja dikirim.</p>
      <p>Harga sekali bayar. Tidak ada langganan dan tidak ada unggahan berkas asli di situs ini — kamu hanya mencentang apa yang sudah kamu pegang.</p>
      <p>Kamu bertanggung jawab atas kejujuran centang. Angka yang disusun dari isian yang dibesar-besarkan tidak berguna di depan portal.</p>
    </LegalPage>
  );
}
