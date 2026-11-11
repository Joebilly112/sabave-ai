import { PayBox } from "@/components/PayBox";
import { BandPill, Panel } from "@/components/ui";
import { cancelLabel, complaintLabel, formatRating, platformLabel } from "@/lib/labels";
import type { CekInput, CekResult } from "@/lib/types";

export function ResultView({
  id,
  paid,
  input,
  result,
}: {
  id: string;
  paid: boolean;
  input: CekInput;
  result: CekResult | null;
}) {
  const complaintText =
    input.complaints.length === 0 ? "tidak ada yang berulang" : input.complaints.map(complaintLabel).join(", ");

  return (
    <section className="mx-auto grid w-full max-w-3xl gap-6 px-5 py-12">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-road">Hasil isian</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-asphalt">Pita risiko rating</h1>
        <p className="mt-3 text-sm leading-6 text-mute">
          {platformLabel(input.platform)} · rating {formatRating(input.rating)} · {cancelLabel(input.cancel)} ·{" "}
          {input.trips} order selesai · keluhan: {complaintText}.
        </p>
      </div>

      {paid && result ? (
        <>
          <Panel className="p-6">
            <BandPill band={result.band}>{result.bandLabel}</BandPill>
            <p className="mt-4 text-3xl font-semibold tracking-tight text-asphalt">{result.score}/100</p>
            <p className="mt-3 text-base leading-7 text-ink">{result.headline}</p>
            <p className="mt-3 text-sm text-mute">Pendorong terbesar: {result.driverLabel}.</p>
            <ul className="mt-5 space-y-2">
              {result.parts.map((part) => (
                <li key={part.id} className="flex items-center justify-between text-sm">
                  <span>{part.label}</span>
                  <span className="font-semibold text-road">{part.points}</span>
                </li>
              ))}
            </ul>
          </Panel>
          <div className="grid gap-3">
            <h2 className="text-xl font-semibold text-asphalt">20 order berikutnya</h2>
            {result.plan.map((block) => (
              <Panel key={block.range} className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-road">{block.range}</p>
                <h3 className="mt-1 text-lg font-semibold text-asphalt">{block.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/90">{block.detail}</p>
              </Panel>
            ))}
          </div>
          <div className="grid gap-3">
            <h2 className="text-xl font-semibold text-asphalt">Naskah penumpang</h2>
            {result.scripts.map((script) => (
              <Panel key={script.situation} className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-road">{script.situation}</p>
                <p className="mt-2 text-sm leading-6 text-ink">{script.text}</p>
              </Panel>
            ))}
          </div>
          <ul className="space-y-2 text-sm leading-6 text-mute">
            {result.assumptions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      ) : (
        <Panel className="p-6">
          <BandPill band="kunci">Terkunci</BandPill>
          <p className="mt-4 text-base leading-7 text-ink">
            Pita risiko, rencana dua puluh order, dan naskah penumpang sudah tersusun dari isianmu. Angkanya tidak
            ditampilkan sebelum pembayaran, supaya hasilnya tidak terbaca sebagai jaminan platform.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-mute">
            <li>Pita aman, waspada, atau kritis</li>
            <li>Empat blok kerja untuk 20 order berikut</li>
            <li>Tiga kalimat singkat untuk di motor</li>
          </ul>
        </Panel>
      )}

      <PayBox id={id} paid={paid} />
    </section>
  );
}
