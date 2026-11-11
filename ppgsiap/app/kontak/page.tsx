import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kontak",
  path: "/kontak",
  noindex: true,
});

export default function KontakPage() {
  return (
    <LegalPage title="Kontak">
      <p>Pertanyaan tentang lembar hasil atau pembayaran dikirim ke kontak@ppgsiap.id.</p>
      <p>Sertakan kode hasil yang ada di tautan halamanmu. Jangan mengirim pindaian ijazah, KTP, atau berkas sekolah.</p>
    </LegalPage>
  );
}
