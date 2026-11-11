import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Lock } from "lucide-react";
import { OutlineSheet } from "@/components/OutlineSheet";
import { PayPanel } from "@/components/PayPanel";
import { Container } from "@/components/ui";
import { getOrder, isOrderId } from "@/lib/orders";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export function generateMetadata(): Metadata {
  return pageMetadata({
    title: "Kerangka RPP",
    description: "Halaman hasil pribadi.",
    path: "/hasil",
    noindex: true,
  });
}

export default async function HasilPage({ params }: { params: { id: string } }) {
  if (!isOrderId(params.id)) notFound();
  const order = await getOrder(params.id);
  if (!order) {
    return (
      <Container className="py-16">
        <h1 className="text-3xl font-extrabold">Kerangka ini belum tersimpan.</h1>
        <p className="mt-3 max-w-xl text-mist">
          Server belum terhubung ke basis data, atau tautannya belum pernah dibuat. Coba lagi dari beranda setelah pembayaran dipasang.
        </p>
      </Container>
    );
  }

  if (order.status === "paid") {
    return (
      <Container className="py-12">
        <OutlineSheet outline={order.result} />
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <article className="max-w-2xl rounded-[28px] border border-line bg-sheet p-6 shadow-sheet sm:p-8">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-clay">
          <Lock className="h-3.5 w-3.5" />
          Masih terkunci
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight">{order.input.mapel}</h1>
        <p className="mt-2 text-mist">
          {order.input.jenjang} · {order.input.topik} · {order.input.jumlahSiswa} siswa · Kurikulum {order.input.kurikulum} ·{" "}
          {order.input.menitTersedia} menit tersisa
        </p>
        <ul className="mt-6 space-y-2 text-sm text-mist">
          <li>{order.result.tujuan.length} tujuan tersimpan</li>
          <li>{order.result.langkah.length} langkah dengan alokasi menit</li>
          <li>{order.result.asesmen.length} cara asesmen</li>
          <li>Checklist {order.result.checklist.reduce((sum, item) => sum + item.menit, 0)} menit</li>
          <li>{order.result.redFlags.length} lampu merah</li>
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-mist">
          Status sekarang: {order.status}. Isi kerangka terbuka setelah pembayaran terkonfirmasi.
        </p>
        <PayPanel orderId={order.id} />
      </article>
    </Container>
  );
}
