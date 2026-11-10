import type { Metadata } from "next";
import { ResultView } from "@/components/ResultView";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  return buildMetadata({
    title: "Hasil nilai magang",
    description: "Lampu nilai karier, permintaan minggu pertama, dan skrip ke pembimbing.",
    path: `/hasil/${params.id}`,
    noindex: true,
  });
}

export default function HasilPage({ params }: { params: { id: string } }) {
  return <ResultView id={params.id} />;
}
