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
        AkunSuspend memberi informasi umum untuk menyusun banding. Ini bukan keputusan Gojek, Grab, atau platform lain,
        dan bukan jaminan akun akan aktif kembali.
      </p>
      <p>
        Pita keparahan dihitung dari isianmu. Kami tidak melihat riwayat internal mitra. Jika ada kecelakaan, kekerasan,
        atau laporan keselamatan, urus pihak yang berwenang lebih dulu.
      </p>
      <p>Jangan mengirim OTP, kata sandi, atau data pelanggan kepada siapa pun yang menjanjikan akun nyala.</p>
    </LegalPage>
  );
}
