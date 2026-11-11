import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMeta({
  title: "Kebijakan Privasi",
  description: "Data yang disimpan NaikPangkat untuk menyusun daftar berkas.",
  path: "/privasi",
  noindex: true,
});

export default function PrivasiPage() {
  return (
    <LegalPage title="Kebijakan Privasi" updated="11 November 2026">
      <p>
        NaikPangkat hanya meminta status kepegawaian, golongan, lama di golongan, jenis jabatan, dan tahun SK.
        Formulir tidak meminta nama, NIP, atau unggahan dokumen.
      </p>
      <p>
        Jawaban itu disimpan di Firestore database {SITE.firestoreDatabase} pada proyek {SITE.firebaseProject} supaya
        halaman hasil bisa dibuka lagi setelah pembayaran. Pembayaran diproses oleh Midtrans. Kami tidak menyimpan
        nomor rekening atau saldo dompet Anda.
      </p>
      <p>
        Jika kunci DeepSeek terpasang di server, ringkasan profil tanpa nama dapat dikirim untuk merapikan satu
        paragraf catatan. Kalau kunci itu tidak ada, catatan disusun di server kami sendiri.
      </p>
      <p>
        Catatan kunjungan yang disimpan hanya jenis peristiwa dan jalur halaman, bukan isi formulir. Untuk meminta
        penghapusan hasil, tulis ke {SITE.contactEmail} dengan tautan halaman hasil Anda.
      </p>
    </LegalPage>
  );
}
