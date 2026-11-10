import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Disclaimer",
  description: "Batasan hasil audit CVtolak.",
  path: "/disclaimer",
  noindex: true,
});

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updated="10 November 2026">
      <p>
        Bacaan CVtolak adalah alat bantu editorial. Ia mencocokkan frasa di CV dengan peran yang kamu tulis dan menandai
        pola format yang sering hilang di saringan otomatis. Ia tidak tahu kebijakan perusahaan yang kamu lamar, tidak
        melihat lowongan aslinya, dan tidak mengukur kemampuan kerjamu.
      </p>
      <p>
        Skor keterlihatan bukan nilai kelulusan. Dua pelamar dengan skor sama bisa mendapat nasib berbeda. Menambahkan
        kata kunci yang tidak kamu kuasai bisa memperburuk wawancara.
      </p>
      <p>
        Artikel di situs ini adalah catatan umum, bukan nasihat hukum, karier berlisensi, atau janji hasil. Keputusan
        mengirim CV tetap ada pada kamu.
      </p>
    </LegalPage>
  );
}
