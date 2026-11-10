import type { Metadata } from "next";
import { ResultView } from "@/components/ResultView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hasil debrief",
  robots: { index: false, follow: false },
};

export default function ResultPage({ params }: { params: { id: string } }) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <ResultView id={params.id} />
    </section>
  );
}
