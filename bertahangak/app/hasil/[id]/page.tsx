import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HelpPanel } from "@/components/HelpPanel";
import { ResultView } from "@/components/ResultView";
import { SyncPayment } from "@/components/SyncPayment";
import { UnlockButton } from "@/components/UnlockButton";
import { sectorLabel } from "@/lib/labels";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";
import { getCheck } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pita situasi",
  robots: { index: false, follow: false },
};

export default async function HasilPage({ params }: { params: { id: string } }) {
  const record = await getCheck(params.id);
  if (!record) notFound();

  const open = record.result.helpFree || record.status === "paid";

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[1.15fr_0.85fr]">
      <div>
        {open ? (
          <ResultView result={record.result} />
        ) : (
          <section className="rounded-[28px] border border-line bg-white p-6 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tide">Laporan terkunci</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-sea">Pita situasimu sudah tersusun</h1>
            <p className="mt-4 text-sm leading-7 text-ink">
              {sectorLabel[record.input.sector]} di {record.input.country}. Sudah {record.input.monthsWorked} bulan, sisa sekitar {record.input.monthsLeft} bulan. Faktor, catatan bukti, dan rencananya terbuka setelah {formatRupiah(UNLOCK_PRICE_IDR)}.
            </p>
            <p className="mt-3 text-sm leading-6 text-mute">
              Nomor bantuan di samping tidak ikut terkunci. Jika kamu merasa tidak aman, hubungi mereka sekarang dan abaikan pembayaran.
            </p>
            <UnlockButton id={record.id} />
            <SyncPayment id={record.id} />
          </section>
        )}
        <p className="mt-6 text-xs leading-5 text-mute">
          Informasi ini disusun dari isianmu. Ini bukan nasihat hukum, bukan diagnosis, dan bukan keputusan perwakilan RI.
        </p>
      </div>
      <HelpPanel compact />
    </div>
  );
}
