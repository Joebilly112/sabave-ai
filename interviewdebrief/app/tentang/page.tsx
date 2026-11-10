import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tentang",
  description: "InterviewDebrief menjawab satu rasa: spiral setelah wawancara selesai.",
  path: "/tentang",
});

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber">Tentang</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Satu rasa, satu debrief.</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink/90">
        <p>
          InterviewDebrief dibuat untuk jam-jam setelah wawancara, saat satu jawaban canggung membesar jadi keyakinan bahwa semuanya gagal. Produk ini tidak melatihmu sebelum interview dan tidak menghitung gaji.
        </p>
        <p>
          Kamu mengisi peran, format (HR, user, atau case), apa yang ditanya, durasi, dan rasa di perut. Setelah pembayaran Rp19.900, kamu mendapat skor, tiga momen terlemah, dan draf pesan tindak lanjut dalam 48 jam.
        </p>
        <p>
          Skor disusun dari catatan yang kamu tulis. Ia bisa dibantu model bahasa bila kunci DeepSeek terpasang di server. Ia tetap bukan keputusan rekruter, dan tautan hasil adalah aksesmu — simpan tautan itu.
        </p>
        <p>InterviewDebrief adalah produk PT. Think Era Labs untuk pencari kerja dan lulusan baru di Indonesia.</p>
      </div>
    </article>
  );
}
