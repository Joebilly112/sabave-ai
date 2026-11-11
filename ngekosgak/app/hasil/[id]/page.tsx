import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResultView } from "@/components/ResultView";
import { SyncPayment } from "@/components/SyncPayment";
import { UnlockButton } from "@/components/UnlockButton";
import { modeLabel } from "@/lib/labels";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";
import { getCheck } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Putusan perjalanan",
  robots: { index: false, follow: false },
};

export default async function HasilPage({ params }: { params: { id: string } }) {
  const record = await getCheck(params.id);
  if (!record) notFound();

  const open = record.status === "paid";

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      {open ? (
        <ResultView input={record.input} result={record.result} />
      ) : (
        <section className="mx-auto max-w-2xl rounded-[28px] border border-mist bg-white p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ember">Putusan terkunci</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-soot">Perbandinganmu sudah tersusun</h1>
          <p className="mt-4 text-sm leading-7 text-ink">
            {record.input.homeArea} ke {record.input.officeArea}, {modeLabel[record.input.mode]}, {record.input.minutesOneWay} menit
            sekali jalan, {record.input.officeDays} hari seminggu. Uang sebulan, jam setahun, tidur yang kembali, harga kos
            yang impas, dan daftar sebelum pindah terbuka setelah {formatRupiah(UNLOCK_PRICE_IDR)}.
          </p>
          <UnlockButton id={record.id} />
          <SyncPayment id={record.id} />
        </section>
      )}
      <p className="mx-auto mt-6 max-w-2xl text-xs leading-5 text-mute">
        Angka disusun dari isianmu dan asumsi yang tercantum setelah terbuka. Ini bukan saran keuangan, kesehatan, atau
        ajakan menandatangani sewa.
      </p>
    </div>
  );
}
