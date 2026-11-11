import { DocMark, Panel, UrgencyPill } from "@/components/ui";
import { PayBox } from "@/components/PayBox";
import { formatId } from "@/lib/dates";
import { workplaceLabel } from "@/lib/labels";
import type { StoredCek } from "@/lib/types";

export function ResultView({ record }: { record: StoredCek }) {
  const paid = record.status === "paid";
  const days = record.result.daysLeft;

  return (
    <section className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tide">Hitung mundur</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-night">Lembar masa berlaku</h1>
      <p className="mt-3 text-sm leading-6 text-mute">
        STRB {formatId(record.input.strbIssued)} – {formatId(record.input.strbExpiry)} · {record.input.sipbCount} SIPB ·{" "}
        {workplaceLabel[record.input.workplace]}. Angka ini membaca isianmu, bukan data dinas.
      </p>

      {paid ? (
        <div className="mt-8 space-y-5">
          <Panel className="overflow-hidden p-0">
            <div className="grid gap-0 sm:grid-cols-[0.8fr_1.2fr]">
              <div className="bg-night px-6 py-6 text-mist">
                <p className="text-xs uppercase tracking-[0.14em] text-gold">Sisa hari</p>
                <p className="mt-2 text-6xl font-semibold leading-none">{days}</p>
                <p className="mt-2 text-sm text-mist/75">{days < 0 ? "sudah lewat" : "menuju tanggal habis"}</p>
              </div>
              <div className="px-6 py-6">
                <UrgencyPill urgency={record.result.urgency}>{record.result.urgencyLabel}</UrgencyPill>
                <p className="mt-4 text-base leading-7 text-ink">{record.result.headline}</p>
              </div>
            </div>
          </Panel>

          <Panel className="p-6">
            <h2 className="text-lg font-semibold text-night">Berkas yang sering disiapkan</h2>
            <ul className="mt-4 space-y-4">
              {record.result.docs.map((doc) => (
                <li key={doc.id} className="border-b border-line pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-ink">{doc.title}</p>
                    <DocMark state={doc.state} />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-mute">{doc.note}</p>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel className="p-6">
            <h2 className="text-lg font-semibold text-night">Rencana minggu demi minggu</h2>
            <ol className="mt-4 space-y-5">
              {record.result.plan.map((week) => (
                <li key={week.title}>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">{week.window}</p>
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
            <h2 className="text-lg font-semibold text-night">Pengingat di kalender</h2>
            <ul className="mt-4 space-y-3">
              {record.result.reminders.map((reminder) => (
                <li key={reminder.label} className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-ink">{reminder.label}</span>
                  <span className={reminder.passed ? "text-stamp" : "text-mute"}>
                    {formatId(reminder.date)}
                    {reminder.passed ? " · sudah lewat" : ""}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-6 text-mute">
              Patokan kredit: {record.input.skp} terkumpul, kekurangan {record.result.skpGap} dari{" "}
              {record.result.skpBenchmark}. Patokan ini alat perencanaan, bukan kuota resmi.
            </p>
          </Panel>

          <Panel className="p-6">
            <h2 className="text-lg font-semibold text-night">Pesan untuk HRD atau loket</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-ink">{record.result.pesan}</p>
          </Panel>

          <div className="space-y-2 text-sm leading-6 text-mute">
            {record.result.assumptions.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-5">
          <Panel className="p-6">
            <UrgencyPill urgency="kunci">Hitungan terkunci</UrgencyPill>
            <p className="mt-4 text-base leading-7 text-ink">
              Tanggalmu sudah tersimpan. Sisa hari, daftar berkas, dan urutan minggu baru terbuka setelah pembayaran.
            </p>
          </Panel>
          <PayBox id={record.id} paid={false} />
        </div>
      )}
    </section>
  );
}
