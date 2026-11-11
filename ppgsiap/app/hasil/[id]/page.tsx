import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResultBoard } from "@/components/ResultBoard";
import { Container } from "@/components/ui";
import { getOrder, isOrderId } from "@/lib/orders";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = pageMetadata({
  title: "Lembar kesiapan PPG",
  description: "Skor, berkas yang masih bolong, dan rencana 30 hari untuk satu isian.",
  path: "/hasil",
  noindex: true,
});

export default async function HasilPage({ params }: { params: { id: string } }) {
  if (!isOrderId(params.id)) notFound();
  const order = await getOrder(params.id);
  if (!order) notFound();

  return (
    <Container className="py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-seal">Hasil</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink">Lembar kesiapanmu</h1>
      <div className="mt-8">
        <ResultBoard order={order} />
      </div>
    </Container>
  );
}
