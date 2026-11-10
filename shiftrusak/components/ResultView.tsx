import { PayBox } from "@/components/PayBox";
import { BandPill, Panel } from "@/components/ui";
import { countFlips, countNights } from "@/lib/score";
import { shiftLabel } from "@/lib/symptoms";
import type { StoredCek } from "@/lib/types";

export function ResultView({ record }: { record: StoredCek }) {
  const paid = record.status === "paid";
  const nights = countNights(record.input.shifts);
  const flips = countFlips(record.input.shifts);

  return (
    <div className="mx-auto grid max-w-5xl gap-6 px-5 py-12 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <Panel className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-night">Hasil dinas 14 hari</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ward">
            {nights} malam, {flips.pagiMalam} flip ke pagi
          </h1>
          <p className="mt-3 text-sm leading-6 text-mute">
            Commute {record.input.commuteMinutes} menit, tidur {record.input.sleepHours.toLocaleString("id-ID")} jam,
            kafein {record.input.caffeine} gelas. Angka ritme terbuka setelah pembayaran.
          </p>
          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs text-mute">Skor gangguan ritme</p>
              <p className={`text-5xl font-semibold ${paid ? "text-ward" : "text-line blur-sm select-none"}`}>
                {paid ? record.result.score : 88}
              </p>
            </div>
            {paid ? <BandPill band={record.result.band}>{record.result.bandLabel}</BandPill> : <BandPill band="kunci">Terkunci</BandPill>}
          </div>
          <p className="mt-4 text-sm leading-6 text-ink">{paid ? record.result.headline : "Pola dinas sudah tersimpan. Skor, slot yang dilindungi, dan naskah ada di balik pembayaran."}</p>
        </Panel>

        <Panel className="p-6">
          <h2 className="text-xl font-semibold text-ward">Malam yang dilindungi</h2>
          {paid ? (
            record.result.protectedNights.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {record.result.protectedNights.map((night) => (
                  <li key={night.label} className="rounded-2xl bg-mist px-4 py-3">
                    <p className="font-semibold text-ward">{night.label}</p>
                    <p className="mt-1 text-sm leading-6 text-mute">{night.reason}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm leading-6 text-mute">
                Tidak ada malam yang wajib dikunci pada tujuh hari ini. Tetap jangan tempelkan pagi langsung setelah malam.
              </p>
            )
          ) : (
            <p className="mt-3 text-sm leading-6 text-mute">Daftar slot roster berikutnya terbuka setelah pembayaran.</p>
          )}
          {paid ? (
            <ol className="mt-5 space-y-2">
              {record.result.roster.map((day) => (
                <li key={day.label} className="flex items-start justify-between gap-3 text-sm">
                  <span className="font-medium text-ink">
                    {day.label}
                    {day.protect ? " · dilindungi" : ""}
                  </span>
                  <span className="text-mute">{shiftLabel[day.shift]}</span>
                </li>
              ))}
            </ol>
          ) : null}
        </Panel>

        <Panel className="p-6">
          <h2 className="text-xl font-semibold text-ward">Naskah ke kepala ruangan</h2>
          {paid ? (
            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-ink">{record.result.script}</p>
          ) : (
            <p className="mt-3 text-sm leading-6 text-mute">
              Naskah meminta jeda setelah malam dan batas blok malam. Tidak membahas gaji.
            </p>
          )}
        </Panel>
      </div>
      <div className="space-y-6">
        <PayBox id={record.id} paid={paid} />
        {paid ? (
          <Panel className="p-5">
            <h2 className="text-lg font-semibold text-ward">Yang menggerakkan skor</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {record.result.parts.map((part) => (
                <li key={part.id} className="flex items-center justify-between gap-3">
                  <span className={part.id === record.result.driver ? "font-semibold text-ward" : "text-mute"}>{part.label}</span>
                  <span className="text-ink">{part.points}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-4 space-y-2 text-xs leading-5 text-mute">
              {record.result.assumptions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Panel>
        ) : (
          <Panel className="p-5 text-sm leading-6 text-mute">
            Pembayaran membuka tiga hal saja: skor 0–100, usulan tujuh hari beserta malam yang dilindungi, dan naskah
            yang bisa kamu edit sebelum diucapkan.
          </Panel>
        )}
      </div>
    </div>
  );
}
