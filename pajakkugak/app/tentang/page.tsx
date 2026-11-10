import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang",
  description: "PajakKuGak menjawab satu rasa: panik musim lapor freelancer yang belum pernah menyampaikan SPT.",
};

export default function TentangPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brass">Tentang</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-pine">Satu rasa panik, satu slip</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink/90">
        <p>
          PajakKuGak dibuat PT. Think Era Labs untuk freelancer yang setiap Maret bertanya, diam-diam, apakah mereka
          ilegal karena belum pernah lapor. Produk ini tidak membandingkan tarif jasa, tidak menghitung gaji, dan tidak
          terhubung ke produk lain.
        </p>
        <p>
          Kamu memasukkan omzet bruto dari klien, status NPWP, ada tidaknya pemotongan PPh 23/21, dan pita omzet terhadap
          Rp500 juta serta Rp4,8 miliar. Setelah Rp24.900, slip menampilkan putusan wajib lapor, mungkin, atau belum tentu,
          jalur formulir yang perlu dibaca, dan checklist dokumen.
        </p>
        <p>
          Angka PTKP yang dipakai adalah TK/0 Rp54 juta, batas paling kecil. Ambang UMKM mengikuti bagian Rp500 juta dan
          plafon Rp4,8 miliar yang disebut di materi DJP untuk orang pribadi. Ini peta baca, bukan pengisian SPT dan bukan
          layanan Direktorat Jenderal Pajak.
        </p>
        <p>
          Kalau penghasilanmu bercampur gaji, warisan, atau usaha lain yang tidak muat di empat isian ini, berhenti di
          slip dan lanjutkan ke konsultan atau ke pertanyaan resmi di DJP Online.
        </p>
      </div>
    </article>
  );
}
