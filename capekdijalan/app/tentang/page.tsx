import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang",
  description: "Capek di Jalan membaca beban perjalanan komuter dan menyusun rencana 14 hari. Bukan diagnosis dan bukan alat gaji.",
};

export default function TentangPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral">Tentang</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-night">Untuk yang sampai di rumah sudah habis</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink/90">
        <p>
          Capek di Jalan menjawab satu pertanyaan: apakah perjalanan ke kantor ini pelan-pelan menguras badan. Kamu mengisi menit pintu-ke-pintu, moda, jam berangkat dan pulang, berdiri atau duduk, jumlah ganti, tidur, nyeri yang terasa, suasana saat sampai, dan apakah akhir pekan memulihkan.
        </p>
        <p>
          Setelah pembayaran sekali, kamu mendapat pita ringan, berat, atau bahaya, perkiraan jam setahun di jalan, tiga beban yang paling menaikkan skor, dan rencana 14 hari. Rencana itu mengatur jam berangkat, cara duduk atau berhenti, tidur, dan satu permintaan ke kantor.
        </p>
        <p>
          Alat ini tidak menanyakan gaji, tidak membandingkan penghasilan, dan tidak menyarankan pindah rumah. Nyeri yang kamu centang adalah laporan rasa, bukan diagnosis. Kalau keluhan menetap atau memburuk, temui tenaga kesehatan.
        </p>
        <p>Hasil tersimpan di tautannya. Tidak ada akun dan tidak ada langganan.</p>
      </div>
    </article>
  );
}
