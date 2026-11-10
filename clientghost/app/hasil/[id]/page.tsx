import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResultView } from "@/components/ResultView";
import { getKasus } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hasil brief",
  robots: { index: false, follow: false },
};

export default async function HasilPage({ params }: { params: { id: string } }) {
  const record = await getKasus(params.id);
  if (!record) notFound();
  return (
    <ResultView
      id={record.id}
      status={record.status}
      input={record.input}
      unlock={record.status === "paid" ? record.result : null}
    />
  );
}
