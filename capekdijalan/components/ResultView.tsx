import { LockKeyhole } from "lucide-react";
import { DayRibbon } from "@/components/DayRibbon";
import { StrainRing } from "@/components/StrainRing";
import { SyncPayment } from "@/components/SyncPayment";
import { UnlockButton } from "@/components/UnlockButton";
import { formatClock } from "@/lib/clock";
import { bandLabel, modeLabel, moodLabel, postureLabel, recoveryLabel } from "@/lib/labels";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";
import type { StoredCheck } from "@/lib/types";

export function ResultView({ record }: { record: StoredCheck }) {
  const paid = record.status === "paid";
  const { input } = record;
  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <SyncPayment id={record.id} status={record.status} />
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral">Hasil cek</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-night">
        {paid ? record.result.headline : "Isianmu tersimpan. Skornya masih terkunci."}
      </h1>
      <p className="mt-4 text-sm leading-6 text-mute">
        {input.minutesOneWay} menit sekali jalan naik {modeLabel[input.mode]}, {postureLabel[input.posture].toLowerCase()}, {input.transfers} kali ganti, berangkat {formatClock(input.depart)}, sampai rumah {formatClock(input.returnAt)}. {moodLabel[input.mood]}. {recoveryLabel[input.recovery]}.
      </p>
      <div className="mt-6">
        <DayRibbon depart={input.depart} returnAt={input.returnAt} />
      </div>

      {paid ? (
        <div className="mt-8 space-y-6">
          <section className="flex flex-col items-start gap-4 rounded-[28px] border border-mist bg-paper p-6 sm:flex-row sm:items-center">
            <StrainRing score={record.result.score} band={record.result.band} />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-mute">Pita {bandLabel[record.result.band]}</p>
              <p className="mt-2 text-2xl font-semibold text-night">
                {record.result.hoursYear.toLocaleString("id-ID")} jam setahun di jalan
              </p>
              <p className="mt-3 text-sm leading-6 text-ink/85">{record.result.summary}</p>
            </div>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-night">Tiga beban terbesar</h2>
            <ol className="mt-4 space-y-3">
              {record.result.drains.map((drain, index) => (
                <li key={`${drain.title}-${index}`} className="rounded-3xl border border-mist bg-paper px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo">
                    {index + 1} · {drain.points} poin
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-night">{drain.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/85">{drain.detail}</p>
                </li>
              ))}
            </ol>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-night">Rencana 14 hari</h2>
            <ol className="mt-4 space-y-3">
              {record.result.plan.map((step) => (
                <li key={step.title} className="rounded-3xl bg-night px-5 py-4 text-bone">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bone/60">{step.label}</p>
                  <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-bone/85">{step.detail}</p>
                </li>
              ))}
            </ol>
          </section>
          <section className="rounded-3xl border border-mist bg-paper px-5 py-4">
            <h2 className="text-lg font-semibold text-night">Asumsi</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-ink/85">
              {record.result.assumptions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      ) : (
        <section className="mt-8 rounded-[28px] border border-dashed border-indigo/30 bg-paper p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-night">
            <LockKeyhole className="h-4 w-4" />
            Yang terbuka setelah {formatRupiah(UNLOCK_PRICE_IDR)}
          </div>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-ink/85">
            <li>Skor dan pita: ringan, berat, atau bahaya.</li>
            <li>Jam setahun yang habis di perjalanan.</li>
            <li>Tiga beban terbesar pada isian ini.</li>
            <li>Rencana 14 hari: jam berangkat, strategi duduk atau berhenti, tidur, dan satu permintaan ke kantor.</li>
          </ul>
          <div className="mt-6">
            <UnlockButton id={record.id} />
          </div>
          <p className="mt-4 text-xs leading-5 text-mute">
            Pembayaran sekali lewat QRIS atau dompet digital. Hasil tetap di tautan ini. Ini informasi kesejahteraan, bukan diagnosis.
          </p>
        </section>
      )}
    </article>
  );
}
