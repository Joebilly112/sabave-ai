import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer",
  robots: { index: false, follow: false },
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updated="10 November 2026">
      <p>
        PajakKuGak bukan Direktorat Jenderal Pajak, bukan mitra resmi DJP, dan bukan konsultan pajak berizin. Putusan
        “wajib lapor”, “mungkin”, dan “belum tentu” adalah peta baca dari empat isian, bukan opini hukum atas SPT-mu.
      </p>
      <p>
        Aturan PPh final UMKM, PTKP, dan formulir dapat diperbarui. Cocokkan slip dengan pertanyaan yang tampil di DJP
        Online dan dengan sumber di pajak.go.id sebelum menyetor atau menyampaikan apa pun.
      </p>
      <p>
        Kami tidak menghitung kurang bayar, tidak membuat faktur pajak, dan tidak menjamin bahwa checklist menutup semua
        dokumen untuk kasus yang bercampur dengan gaji, harta, atau usaha lain.
      </p>
    </LegalPage>
  );
}
