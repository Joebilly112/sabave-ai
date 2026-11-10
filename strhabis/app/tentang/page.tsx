import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang",
  description: "STRHabis membantu perawat mengurutkan persiapan perpanjangan STR sebelum tanggal di kartu habis.",
};

export default function TentangPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-wax">Tentang</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-seal">Paniknya satu: STR diminta, tanggalnya tidak kamu ingat.</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink/90">
        <p>
          STRHabis untuk perawat yang baru ditanya SDM atau rumah sakit soal Surat Tanda Registrasi yang mau habis.
          Kamu memasukkan tanggal di kartu, status SIP, tempat praktik, dan kredit SKP yang benar-benar sudah ada.
        </p>
        <p>
          Yang terbuka setelah pembayaran adalah hitungan hari menurut kalender Jakarta, daftar dokumen yang perlu
          disiapkan, dan urutan kerja per minggu. Tidak ada perbandingan gaji, tidak ada janji bahwa pengajuan lolos.
        </p>
        <p>
          Aturan, biaya resmi, dan penerimaan berkas ada di portal Konsil serta Kemenkes pada hari kamu mengajukan.
          Angka kredit di rencana hanya isyarat supaya portofolio tidak dibiarkan sampai minggu terakhir.
        </p>
      </div>
    </article>
  );
}
