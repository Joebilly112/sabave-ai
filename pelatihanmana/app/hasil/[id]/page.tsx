import type { Metadata } from "next";
import Link from "next/link";
import { RankList } from "@/components/RankList";
import { ReloadButton } from "@/components/ReloadButton";
import { Container, Panel } from "@/components/ui";
import { GOALS, UNITS, YEARS } from "@/lib/types";
import { getOrder } from "@/lib/orders";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Hasil pelatihanmu",
  description: "Urutan pelatihan yang sudah kamu buka.",
  path: "/hasil",
  noindex: true,
});

function label(list: readonly { id: string; label: string }[], id: string) {
  return list.find((item) => item.id === id)?.label ?? id;
}

export default async function HasilPage({ params }: { params: { id: string } }) {
  const order = await getOrder(params.id);

  return (
    <Container className="py-16">
      {!order ? (
        <Panel className="p-6">
          <h1 className="text-3xl font-extrabold text-paper">Hasil tidak ditemukan</h1>
          <p className="mt-3 text-mist">
            Tautan ini belum ada, atau server hasil belum terhubung ke basis data. Kalau kamu baru saja membayar, muat ulang sebentar lagi.
          </p>
          <div className="mt-5">
            <ReloadButton />
          </div>
        </Panel>
      ) : order.status !== "paid" ? (
        <Panel className="p-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime">Menunggu pembayaran</p>
          <h1 className="mt-3 text-3xl font-extrabold text-paper">Tiga pelatihanmu masih terkunci</h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-mist">
            {order.input.nickname ? `${order.input.nickname}, ` : ""}
            jawabanmu untuk {label(UNITS, order.input.unit)} · {label(YEARS, order.input.years)} · tujuan {label(GOALS, order.input.goal)} sudah tersimpan. Urutan, alasan, biaya waktu, dan yang ditunda baru terbuka setelah pembayaran Rp19.900 terkonfirmasi.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <ReloadButton />
            <Link href="/#pilih" className="inline-flex items-center text-sm font-semibold text-lime">
              Kembali ke formulir
            </Link>
          </div>
        </Panel>
      ) : (
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime">Hasil terbuka</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-paper">
            {order.input.nickname ? `${order.input.nickname}, ini giliranmu.` : "Ini giliranmu."}
          </h1>
          <p className="mt-3 text-mist">
            {label(UNITS, order.input.unit)} · {label(YEARS, order.input.years)} · {label(GOALS, order.input.goal)}
          </p>
          <p className="mt-4 text-paper/90">{order.result.summary}</p>
          <div className="mt-6">
            <RankList next={order.result.next} skip={order.result.skip} />
          </div>
          <p className="mt-6 text-sm text-mist">
            Ini bantuan memutuskan, bukan penempatan resmi dan bukan jaminan kompetensi. Sesuaikan dengan aturan rumah sakit atau dinasmu.
          </p>
        </div>
      )}
    </Container>
  );
}
