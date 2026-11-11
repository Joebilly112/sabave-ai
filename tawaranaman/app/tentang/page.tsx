import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang",
  description: "TawaranAman membantu keluarga membaca tawaran kerja ke luar negeri sebelum menjawab ya.",
};

export default function TentangPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sea">Tentang</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-deep">Satu pertanyaan, satu laporan</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink/90">
        <p>
          TawaranAman dibuat PT. Think Era Labs untuk keluarga yang mendapat tawaran kerja ke luar negeri dari P3MI,
          LPK, orang perorangan, atau iklan. Yang ditimbang adalah rasa harap yang bercampur takut: apakah tawaran ini
          layak dijawab ya, atau ditahan dulu.
        </p>
        <p>
          Kamu mengisi pola tawarannya. Setelah membayar Rp9.900 sekali, kamu melihat pita aman, waspada, atau bahaya,
          tanda yang muncul dari isian itu, langkah cek di Migran Aman dan SISKOP2MI, serta naskah singkat untuk
          menolak dengan sopan.
        </p>
        <p>
          Situs ini tidak menetapkan seseorang bersalah, tidak menggantikan KP2MI, dan tidak menghitung gaji. Jika
          kamu dalam keadaan mendesak, hubungi 112 atau polisi setempat sebelum membuka laporan.
        </p>
      </div>
    </article>
  );
}
