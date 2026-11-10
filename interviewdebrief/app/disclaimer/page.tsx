import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer · InterviewDebrief",
  robots: { index: false, follow: false },
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updated="10 November 2026">
      <p>
        Skor disusun dari catatan yang kamu tulis, dengan aturan tetap di server dan, bila dikonfigurasi, bantuan model bahasa. Ini bukan penilaian resmi HR, bukan tes psikologi, dan bukan nasihat karier berlisensi.
      </p>
      <p>
        Perasaan setelah wawancara sering lebih keras daripada catatannya. Debrief memisahkan keduanya. Ia tidak tahu apa yang dipikirkan pewawancara, dan tidak boleh dipakai untuk menekan siapa pun.
      </p>
    </LegalPage>
  );
}
