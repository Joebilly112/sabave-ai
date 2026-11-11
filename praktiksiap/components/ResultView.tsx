import { BandPill, GapMark, Panel } from "@/components/ui";
import { PayBox } from "@/components/PayBox";
import { workplaceLabel } from "@/lib/labels";
import type { StoredCek } from "@/lib/types";

export function ResultView({ record }: { record: StoredCek }) {
  const paid = record.status === "paid";

  return (
    <section className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-moss">Hasil map</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-grove">Papan kesiapanmu</h1>
      <p className="mt-3 text-sm leading-6 text-mute">
        {record.input.years} tahun praktik · {workplaceLabel[record.input.workplace]}. Angka ini membaca isianmu, bukan
        berkas yang sudah diperiksa petugas.
      </p>

      {paid ? (
        <div className="mt-8 space-y-5">
          <Panel className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <BandPill band={record.result.band}>{record.result.bandLabel}</BandPill>
              <p className="text-4xl font-semibold text-grove">{record.result.score}</p>
            </div>
            <p className="mt-4 text-base leading-7 text-ink">{record.result.headline}</p>
          </Panel>

          <Panel className="p-6">
            <h2 className="text-lg font-semibold text-grove">Yang masih kurang</h2>
            <ul className="mt-4 space-y-4">
              {record.result.gaps.map((gap) => (
                <li key={gap.id} className="border-b border-line pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-ink">{gap.title}</p>
                    <GapMark state={gap.state} />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-mute">{gap.note}</p>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel className="p-6">
            <h2 className="text-lg font-semibold text-grove">Rencana 30 hari</h2>
            <ol className="mt-4 space-y-5">
              {record.result.plan.map((week) => (
                <li key={week.title}>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-moss">{week.window}</p>
                  <p className="mt-1 font-semibold text-ink">{week.title}</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-mute">
                    {week.tasks.map((task) => (
                      <li key={task}>{task}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Panel>

          <Panel className="p-6">
            <h2 className="text-lg font-semibold text-grove">Catatan untuk loket</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-ink">{record.result.loketNote}</p>
          </Panel>

          <div className="space-y-2 text-sm leading-6 text-mute">
            {record.result.assumptions.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p>
              Potongan skor:{" "}
              {record.result.parts
                .filter((part) => part.points > 0)
                .map((part) => `${part.label} −${part.points}`)
                .join(", ") || "tidak ada potongan"}
              .
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-5">
          <Panel className="p-6">
            <BandPill band="kunci">Lampu terkunci</BandPill>
            <p className="mt-4 text-base leading-7 text-ink">
              Isianmu sudah tersimpan. Hijau, kuning, atau merah, daftar kekurangan, dan urutan 30 hari baru terbuka
              setelah pembayaran.
            </p>
          </Panel>
          <PayBox id={record.id} paid={false} />
        </div>
      )}
    </section>
  );
}
