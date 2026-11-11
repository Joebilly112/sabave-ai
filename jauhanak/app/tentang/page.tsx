import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang",
  description: "JauhAnak membantu orang tua yang kerja jauh membaca jarak dengan anak lewat irama panggilan.",
};

export default function TentangPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-dusk">Tentang</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-night">Satu rindu, satu laporan</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink/90">
        <p>
          JauhAnak dibuat PT. Think Era Labs untuk orang tua yang sudah bertahun-tahun kerja jauh dari anak. Yang
          ditimbang adalah rasa bersalah dan kangen: apakah anak masih dekat, atau panggilan sudah terasa asing.
        </p>
        <p>
          Kamu mengisi usia, lama terpisah, siapa yang merawat, seberapa sering dan seberapa lama kalian bicara, isi
          obrolan, tanda terakhir, dan sisa kontrak. Setelah membayar Rp14.900 sekali, kamu melihat pita dekat,
          renggang, atau perlu perhatian, tiga kebiasaan, rencana panggilan sesuai usia, dan naskah untuk pengasuh.
        </p>
        <p>
          Situs ini tidak mendiagnosis anak, tidak menyalahkan nenek, pasangan, atau saudara, dan tidak menghitung
          penghasilan. Jika anak dalam keadaan tidak aman, hubungi pengasuh dan layanan darurat setempat lebih dulu.
        </p>
      </div>
    </article>
  );
}
