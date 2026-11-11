import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Syarat",
  description: "Syarat pakai Pelatihan Mana.",
  path: "/syarat",
  noindex: true,
});

export default function SyaratPage() {
  return (
    <LegalPage title="Syarat">
      <p>
        Dengan membayar Rp19.900 kamu membuka satu hasil untuk jawaban yang kamu kirim: tiga pelatihan terurut, alasan, perkiraan biaya waktu, dan yang ditunda. Hasil tertaut pada satu kode pesanan.
      </p>
      <p>
        Kamu bertanggung jawab atas kebenaran isian. Produk ini tidak mendaftarkan kamu ke lembaga pelatihan mana pun dan tidak berhubungan dengan penempatan kerja.
      </p>
      <p>Pembayaran yang sudah membuka hasil tidak dikembalikan, kecuali diwajibkan oleh aturan yang berlaku.</p>
    </LegalPage>
  );
}
