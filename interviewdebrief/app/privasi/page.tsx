import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privasi · InterviewDebrief",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Kebijakan privasi" updated="10 November 2026">
      <p>
        InterviewDebrief menyimpan catatan yang kamu kirim: peran, format wawancara, isi jawaban yang kamu tulis, durasi, dan rasa setelah sesi. Data itu dipakai untuk menyusun debrief dan menagihkan pembayaran sekali.
      </p>
      <p>
        Pembayaran diproses Midtrans. Kami tidak menyimpan nomor kartu atau saldo e-wallet. Status transaksi disimpan bersama debrief agar halaman hasil tahu apakah sudah terbuka.
      </p>
      <p>
        Tautan /hasil/… adalah kunci akses catatanmu. Jangan dibagikan. Server memakai Firebase (proyek skoolnow-ea6ff, basis data interviewdebrief) bila kredensial admin terpasang.
      </p>
      <p>
        Analitik internal hanya mencatat nama peristiwa dan jalur halaman, tanpa profil iklan. Kamu bisa meminta penghapusan catatan dengan menyebut tautan hasil ke pengelola PT. Think Era Labs.
      </p>
    </LegalPage>
  );
}
