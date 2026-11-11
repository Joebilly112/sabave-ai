import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResultView } from "@/components/ResultView";
import { getCek } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hasil pita risiko",
  robots: { index: false, follow: false },
};

export default async function HasilPage({ params }: { params: { id: string } }) {
  const record = await getCek(params.id);
  if (!record) notFound();
  const paid = record.status === "paid";
  return <ResultView id={record.id} paid={paid} input={record.input} result={paid ? record.result : null} />;
}
