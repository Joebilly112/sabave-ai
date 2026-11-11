import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privasi",
  robots: { index: false, follow: false },
};

export default function PrivasiPage() {
  return (
    <LegalPage title="Kebijakan privasi" updated="11 November 2026">
      <p>
        AkunSuspend menyimpan isian yang kamu kirim: platform, jenis suspend, alasan singkat, sisa hari, jumlah
        peringatan, serta berkas hasil yang terkunci sampai pembayaran lunas.
      </p>
      <p>
        Data itu dipakai untuk menyusun pita banding dan memverifikasi pembayaran Midtrans. Kami tidak meminta kata
        sandi aplikasi, OTP, foto KTP, atau data pelanggan.
      </p>
      <p>
        Jika Firebase Admin dikonfigurasi, berkas disimpan di Firestore bernama akunsuspend pada proyek skoolnow-ea6ff.
        Tanpa kredensial itu, berkas hanya ada di berkas lokal server.
      </p>
      <p>Permintaan hapus bisa dikirim lewat kanal yang tercantum saat situs ini tayang. Jangan menyertakan data pelanggan.</p>
    </LegalPage>
  );
}
