import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResultView } from "@/components/ResultView";
import { getCheck } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hasil cek beban perjalanan",
  robots: { index: false, follow: false },
};

export default async function HasilPage({ params }: { params: { id: string } }) {
  const record = await getCheck(params.id);
  if (!record) notFound();
  return <ResultView record={record} />;
}
