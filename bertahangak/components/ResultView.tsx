import { bandLabel } from "@/lib/labels";
import type { StayResult } from "@/lib/types";

const tone: Record<StayResult["band"], string> = {
  bertahan: "bg-foam text-leaf",
  bantuan: "bg-sand text-lantern",
  darurat: "bg-clay text-sand",
};

export function ResultView({ result }: { result: StayResult }) {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-line bg-white p-6 shadow-card">
        <p className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tone[result.band]}`}>{bandLabel[result.band]}</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-sea">{result.headline}</h1>
        <p className="mt-4 text-[15px] leading-7 text-ink">{result.summary}</p>
        {result.helpFree ? (
          <p className="mt-4 text-sm font-semibold text-clay">Pita ini gratis karena ada tanda darurat. Kamu tidak diminta membayar untuk membaca langkahnya.</p>
        ) : null}
      </div>
      <section className="rounded-[28px] border border-line bg-white p-6">
        <h2 className="text-xl font-semibold text-sea">Yang mendorong pita ini</h2>
        <ul className="mt-4 space-y-4">
          {result.factors.map((factor) => (
            <li key={factor.title}>
              <p className="font-semibold text-ink">{factor.title}</p>
              <p className="mt-1 text-sm leading-6 text-mute">{factor.detail}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-[28px] border border-line bg-white p-6">
        <h2 className="text-xl font-semibold text-sea">Bukti yang aman disimpan</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink">
          {result.evidence.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>
      <section className="rounded-[28px] border border-line bg-white p-6">
        <h2 className="text-xl font-semibold text-sea">{result.band === "bertahan" ? "Rencana bertahan" : "Langkah yang bisa dilakukan"}</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-ink">
          {result.plan.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
