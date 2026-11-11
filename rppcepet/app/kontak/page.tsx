import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Kontak",
  path: "/kontak",
  noindex: true,
});

export default function KontakPage() {
  return (
    <LegalPage title="Kontak">
      <p>
        Pertanyaan tentang pesanan RPP Cepet dapat dikirim ke kontak@rppcepet.id. Sertakan kode hasil yang diawali rc_
        bila pembayaran sudah dibuat.
      </p>
      <p>Alamat situs publik: https://rppcepet.web.app. Domain rppcepet.id menyusul bila DNS sudah diarahkan.</p>
    </LegalPage>
  );
}
