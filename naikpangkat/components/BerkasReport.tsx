import { Lock } from "lucide-react";
import type { Unlock } from "@/lib/berkas";
import { FolderFrame, Pill } from "./ui";

const toneLabel: Record<Unlock["timeline"]["tone"], string> = {
  siap: "Jendela terbuka",
  siapkan: "Masih ada waktu",
  sempit: "Sudah sempit",
  belum: "Belum waktunya",
  puncak: "Pangkat puncak",
  pppk: "Bukan siklus PNS",
};

export function BerkasReport({
  unlock,
  locked = false,
  sample = false,
}: {
  unlock: Unlock;
  locked?: boolean;
  sample?: boolean;
}) {
  const items = locked ? unlock.items.slice(0, 3) : unlock.items;
  const hidden = unlock.items.length - items.length;

  return (
    <FolderFrame tab={unlock.profileLabel} stamp={locked ? `${hidden} terkunci` : undefined}>
      {sample ? (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/45">Contoh tampilan, bukan data Anda</p>
      ) : null}
      <p className="max-w-[34rem] pr-16 text-lg font-extrabold leading-snug text-ink">{unlock.headline}</p>
      <p className="mt-2 text-sm leading-6 text-ink/70">{unlock.summary}</p>
      <ol className="mt-4 space-y-2">
        {items.map((item, index) => (
          <li key={item.id} className="rounded-2xl bg-white/75 px-3 py-3">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold text-ink">
                <span className="mr-2 text-ink/35">{String(index + 1).padStart(2, "0")}</span>
                {item.title}
              </p>
              <Pill tone={item.tag === "wajib" ? "stamp" : item.tag === "khusus" ? "pine" : "brass"}>{item.tag}</Pill>
            </div>
            {locked ? null : <p className="mt-1 pl-7 text-sm leading-6 text-ink/65">{item.detail}</p>}
          </li>
        ))}
      </ol>
      {locked ? (
        <div className="mt-3 flex items-center gap-3 rounded-2xl border border-dashed border-ink/15 bg-white/50 px-3 py-4 text-sm text-ink/70">
          <Lock className="h-4 w-4 text-stamp" aria-hidden />
          <span>
            {hidden} berkas lagi, plus alasan penolakan dan jendela setor, terbuka setelah pembayaran.
          </span>
        </div>
      ) : (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <section className="rounded-2xl bg-white/80 p-4">
            <h3 className="text-sm font-extrabold text-ink">Yang sering bikin balik</h3>
            <ul className="mt-3 space-y-3">
              {unlock.rejections.map((reason) => (
                <li key={reason.title}>
                  <p className="text-sm font-semibold text-ink">{reason.title}</p>
                  <p className="mt-1 text-sm leading-6 text-ink/65">{reason.detail}</p>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl bg-ink p-4 text-paper">
            <Pill tone="brass">{toneLabel[unlock.timeline.tone]}</Pill>
            <h3 className="mt-3 text-sm font-extrabold">{unlock.timeline.title}</h3>
            <p className="mt-2 text-sm leading-6 text-paper/75">{unlock.timeline.window}</p>
            <dl className="mt-4 space-y-2">
              {unlock.timeline.rows.map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-3 text-sm">
                  <dt className="text-paper/55">{row.label}</dt>
                  <dd className="text-right font-semibold">{row.value}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-paper/75">
              {unlock.timeline.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
        </div>
      )}
      {!locked ? <p className="mt-4 text-sm leading-6 text-ink/70">{unlock.note}</p> : null}
    </FolderFrame>
  );
}
