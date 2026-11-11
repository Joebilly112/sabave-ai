import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMeta({
  title: "Kontak",
  description: "Cara menghubungi NaikPangkat.",
  path: "/kontak",
  noindex: true,
});

export default function KontakPage() {
  return (
    <LegalPage title="Kontak" updated="11 November 2026">
      <p>
        Untuk pembayaran yang sudah berhasil tetapi halaman hasil masih terkunci, kirim tautan hasil Anda ke{" "}
        {SITE.contactEmail}. Sertakan waktu pembayaran. Jangan mengirim NIP, SK, atau foto berkas.
      </p>
      <p>
        NaikPangkat dioperasikan oleh PT. Think Era Labs. Situs ini berdiri sendiri di {SITE.domain}. Kami tidak
        menerima pengurusan berkas secara titipan.
      </p>
    </LegalPage>
  );
}
