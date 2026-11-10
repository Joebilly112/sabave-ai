import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie",
  robots: { index: false, follow: false },
};

export default function CookiePage() {
  return (
    <LegalPage title="Cookie" updated="10 November 2026">
      <p>
        PajakKuGak tidak memasang iklan dan tidak menjual data penjelajahan. Halaman mengirim peristiwa sederhana ke
        server kami: tampilan halaman, formulir terkirim, dan slip yang sudah dibayar. Peristiwa itu mencatat nama
        peristiwa dan jalur, bukan nama kamu.
      </p>
      <p>
        Pembayaran Midtrans dapat menyimpan cookie di domain mereka saat kamu membuka halaman bayar. Cookie itu mengikuti
        kebijakan Midtrans, bukan disetel untuk melacakmu kembali ke artikel PajakKuGak.
      </p>
    </LegalPage>
  );
}
