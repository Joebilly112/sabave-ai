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
        SipbHabis memberi informasi persiapan. Keputusan perpanjangan STRB dan SIPB ada pada dinas kesehatan, konsil,
        dan peraturan yang sedang berlaku. Permenkes Nomor 28 Tahun 2017 sering disebut karena membingkai STRB dalam
        siklus lima tahun; ketentuan hari ini dapat berbeda. Daftar di hasil adalah berkas yang sering disiapkan bidan,
        bukan lampiran resmi dan bukan jaminan permohonan diterima.
      </p>
      <p>
        Patokan 25 kredit adalah alat perencanaan di situs ini, bukan kuota yang kami tetapkan. Alat ini bukan nasihat
        hukum, bukan pemeriksaan sarana, dan bukan layanan klinis. Untuk syarat terbaru, tanyakan langsung ke dinas
        kabupaten atau kota dan ke organisasi profesi setempat.
      </p>
      <p>Jangan memakai hasil ini untuk menentukan tarif layanan atau membandingkan penghasilan. Produk ini tidak membahas gaji.</p>
    </LegalPage>
  );
}
