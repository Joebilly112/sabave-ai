import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kontak",
  description: "Kontak Pelatihan Mana.",
  path: "/kontak",
  noindex: true,
});

export default function KontakPage() {
  return (
    <LegalPage title="Kontak">
      <p>
        Pertanyaan tentang pesanan atau hasil bisa dikirim ke{" "}
        <a className="text-lime" href="mailto:kontak@pelatihanmana.id">
          kontak@pelatihanmana.id
        </a>
        . Sertakan kode pesanan yang ada di tautan hasilmu.
      </p>
      <p>Kami tidak menerima lamaran pelatihan, iklan lembaga, atau data pasien lewat email ini.</p>
    </LegalPage>
  );
}
