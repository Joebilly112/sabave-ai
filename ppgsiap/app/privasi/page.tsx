import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privasi",
  path: "/privasi",
  noindex: true,
});

export default function PrivasiPage() {
  return (
    <LegalPage title="Privasi">
      <p>Isian status, lama mengajar, pendidikan, riwayat percobaan, dan centang berkas disimpan untuk menyusun lembar kesiapan milikmu.</p>
      <p>Pembayaran diproses oleh Midtrans. PPG Siap tidak meminta nomor rekening di halaman ini.</p>
      <p>Jika analitik server aktif, yang tercatat hanya nama peristiwa dan jalur halaman, tanpa isi berkas.</p>
      <p>Lembar hasil tidak dimaksudkan untuk diindeks mesin pencari. Jangan meneruskan tautan hasil kepada orang yang tidak perlu melihat isianmu.</p>
    </LegalPage>
  );
}
