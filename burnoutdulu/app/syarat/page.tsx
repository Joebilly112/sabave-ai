import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

export const metadata: Metadata = {
  title: "Syarat",
  robots: { index: false, follow: false },
};

export default function SyaratPage() {
  return (
    <LegalPage title="Syarat pemakaian" updated="10 November 2026">
      <p>
        BurnoutDulu menjual satu kali buka hasil seharga {formatRupiah(UNLOCK_PRICE_IDR)}. Yang kamu beli adalah pita
        hijau, amber, atau merah, rencana 14 hari, dan satu naskah klien yang disusun dari isianmu.
      </p>
      <p>
        Kamu bertanggung jawab atas angka yang diisi. Jangan memakai hasil ini untuk menekan klien, dan jangan
        mengirimnya sebagai surat dokter. Naskah boleh diedit sebelum dikirim.
      </p>
      <p>
        Pembayaran yang sudah membuka halaman hasil tidak dikembalikan, kecuali diwajibkan hukum yang berlaku. Layanan
        dapat berhenti sementara jika penyedia pembayaran atau basis data tidak tersedia.
      </p>
    </LegalPage>
  );
}
