import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cookie",
  description: "Cookie dan penyimpanan lokal di CVtolak.",
  path: "/cookie",
  noindex: true,
});

export default function CookiePage() {
  return (
    <LegalPage title="Cookie" updated="10 November 2026">
      <p>
        CVtolak tidak memasang cookie iklan dan tidak mengikuti kamu ke situs lain. Halaman dapat memakai penyimpanan
        teknis yang dibutuhkan Next.js untuk memuat aplikasi.
      </p>
      <p>
        Kunjungan dicatat sebagai peristiwa terpisah: halaman dibuka, audit dikirim, atau pembayaran tercatat. Catatan
        itu berisi jalur, bukan isi CV dan bukan nama.
      </p>
      <p>
        Midtrans dapat menulis cookie sendiri saat kamu membuka halaman pembayaran mereka. Kebijakan itu mengikuti
        Midtrans, di luar situs ini. Kamu bisa menutup laman itu tanpa menyelesaikan bayar; hasil tetap terkunci.
      </p>
    </LegalPage>
  );
}
