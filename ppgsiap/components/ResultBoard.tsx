import { ATTEMPTS, EDUCATION, EMPLOYMENT } from "@/lib/types";
import { labelOf } from "@/lib/intake";
import type { Readiness, StoredOrder } from "@/lib/types";
import { PayPanel } from "@/components/PayPanel";

function LockedBlock({ title }: { title: string }) {
  return (
    <section className="rounded-3xl border border-line bg-white p-5">
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      <div className="mt-4 space-y-2">
        <p className="locked-line text-sm text-mist">Prioritas berkas dan urutan minggu disimpan di balik pembayaran.</p>
        <p className="locked-line text-sm text-mist">Angka skor dan pita keputusan tidak ditampilkan sebelum lunas.</p>
      </div>
    </section>
  );
}

function OpenBoard({ result }: { result: Readiness }) {
  return (
    <div className="grid gap-5">
      <section className="rounded-[28px] bg-ink p-6 text-card">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Skor kesiapan</p>
        <div className="mt-3 flex flex-wrap items-end gap-4">
          <p className="text-6xl font-extrabold tracking-tight">{result.score}</p>
          <p className="mb-2 text-sm font-semibold text-white/75">/ 100 · {result.bandLabel}</p>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85">{result.ringkas}</p>
      </section>

      <section className="rounded-3xl border border-line bg-white p-5">
        <h2 className="text-lg font-bold text-ink">Kenapa angkanya begini</h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-mist">
          {result.reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl border border-line bg-white p-5">
          <h2 className="text-lg font-bold text-ink">Masih bolong</h2>
          {result.missing.length === 0 ? (
            <p className="mt-3 text-sm text-mist">Tidak ada berkas yang kamu tandai kosong.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {result.missing.map((doc) => (
                <li key={doc.id} className="flex items-center justify-between gap-3 rounded-2xl bg-paper px-3 py-2">
                  <span className="text-ink">{doc.label}</span>
                  <span className={doc.critical ? "text-xs font-bold text-stamp" : "text-xs font-semibold text-mist"}>
                    {doc.critical ? "Kunci" : "Pelengkap"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-3xl border border-line bg-white p-5">
          <h2 className="text-lg font-bold text-ink">Sudah ada</h2>
          {result.readyDocs.length === 0 ? (
            <p className="mt-3 text-sm text-mist">Belum ada yang dicentang.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm text-ink">
              {result.readyDocs.map((label) => (
                <li key={label} className="rounded-2xl bg-paper px-3 py-2">
                  {label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-line bg-white p-5">
        <h2 className="text-lg font-bold text-ink">Rencana 30 hari</h2>
        <ol className="mt-4 grid gap-4 md:grid-cols-2">
          {result.weeks.map((week) => (
            <li key={week.rentang} className="rounded-3xl bg-paper p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-seal">{week.rentang}</p>
              <h3 className="mt-1 font-bold text-ink">{week.judul}</h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-mist">
                {week.tugas.map((task) => (
                  <li key={task}>{task}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-3xl border border-dashed border-stamp/40 bg-white p-5">
        <h2 className="text-lg font-bold text-ink">Yang tidak boleh ditafsirkan</h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-mist">
          {result.cautions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function ResultBoard({ order }: { order: StoredOrder }) {
  const paid = order.status === "paid";
  return (
    <div className="grid gap-5">
      <p className="text-sm text-mist">
        {labelOf(EMPLOYMENT, order.input.employment)} · {order.input.years} tahun · {labelOf(EDUCATION, order.input.education)} ·{" "}
        {labelOf(ATTEMPTS, order.input.attempts)}
      </p>
      {paid ? <OpenBoard result={order.result} /> : (
        <>
          <LockedBlock title="Skor dan pita keputusan" />
          <LockedBlock title="Daftar berkas yang bolong" />
          <LockedBlock title="Rencana 30 hari" />
          <PayPanel orderId={order.id} status={order.status} />
        </>
      )}
    </div>
  );
}
