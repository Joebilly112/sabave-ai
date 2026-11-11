import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResultView } from "@/components/ResultView";
import { getCek } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hasil kesiapan",
  robots: { index: false, follow: false },
};

export default async function HasilPage({ params }: { params: { id: string } }) {
  const record = await getCek(params.id);
  if (!record) notFound();
  return <ResultView record={record} />;
}
