import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer",
  robots: { index: false, follow: false },
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updated="11 November 2026">
      <p>
        TawaranAman bukan KP2MI, bukan kepolisian, dan bukan kantor hukum. Pita aman, waspada, atau bahaya hanya
        membaca isianmu. Status badan usaha dan lowongan yang sah ada pada instansi yang berwenang.
      </p>
      <p>
        Situs resmi yang kami tautkan, termasuk Migran Aman dan SISKOP2MI, dikelola pemerintah. Kami tidak menjamin
        isi atau ketersediaan situs itu.
      </p>
      <p>
        Jika kamu dalam bahaya, dokumenmu ditahan, atau kamu tidak bisa pergi, hubungi 112 atau polisi setempat. Jangan
        menunggu laporan berbayar.
      </p>
    </LegalPage>
  );
}
