import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer",
  robots: { index: false, follow: false },
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updated="11 November 2026">
      <p>BertahanGak adalah alat informasi. Ia tidak menggantikan pengacara, dokter, konselor, polisi, KP2MI, atau perwakilan Republik Indonesia.</p>
      <p>Pita darurat berarti isianmu memuat tanda yang kami anggap tidak boleh ditunda. Pita itu bukan penetapan hukum bahwa suatu tindak pidana telah terjadi.</p>
      <p>Nomor yang kami tampilkan adalah kanal publik yang diumumkan KP2MI. Jika suatu nomor berubah di situs resmi, ikuti situs resmi.</p>
      <p>Kami tidak menjanjikan pemulangan, pemindahan majikan, atau pengembalian biaya penempatan.</p>
    </LegalPage>
  );
}
