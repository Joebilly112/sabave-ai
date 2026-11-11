import { choiceLabel } from "@/lib/labels";
import { formatRupiah } from "@/lib/price";
import type { CommuteInput, CommuteResult } from "@/lib/types";

export function ResultView({ input, result }: { input: CommuteInput; result: CommuteResult }) {
  return (
    <article className="space-y-6">
      <header className="rounded-[28px] border border-mist bg-white p-6 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ember">Putusan</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-soot">{result.headline}</h1>
        <p className="mt-3 text-sm font-medium text-rail">
          {input.homeArea} → {input.officeArea} · {choiceLabel[result.choice]}
        </p>
        <p className="mt-4 text-[15px] leading-7 text-ink">{result.summary}</p>
      </header>
      <div className="grid gap-4 lg:grid-cols-3">
        {result.sides.map((side) => {
          const chosen = side.choice === result.choice;
          return (
            <section
              key={side.choice}
              className={`rounded-[24px] border p-5 ${chosen ? "border-soot bg-soot text-ticket" : "border-mist bg-white text-ink"}`}
            >
              <h2 className="text-lg font-semibold">{side.title}</h2>
              <p className={`mt-2 text-2xl font-semibold ${chosen ? "text-dawn" : "text-soot"}`}>{formatRupiah(side.cash)}</p>
              <p className={`text-xs ${chosen ? "text-ticket/70" : "text-mute"}`}>per bulan, menurut asumsi di bawah</p>
              <p className="mt-3 text-sm">
                {side.hoursYear.toLocaleString("id-ID")} jam di jalan / tahun
                <br />
                {side.sleepHoursYear.toLocaleString("id-ID")} jam tidur pagi kembali / tahun
              </p>
              <ul className="mt-4 space-y-1 text-sm">
                {side.lines.map((item) => (
                  <li key={item.label} className="flex justify-between gap-3">
                    <span className={chosen ? "text-ticket/80" : "text-mute"}>{item.label}</span>
                    <span>{formatRupiah(item.amount)}</span>
                  </li>
                ))}
              </ul>
              <p className={`mt-4 text-xs leading-5 ${chosen ? "text-ticket/80" : "text-mute"}`}>{side.note}</p>
            </section>
          );
        })}
      </div>
      <section className="rounded-[24px] border border-mist bg-ticket p-6">
        <h2 className="text-lg font-semibold text-soot">Harga kos yang impas</h2>
        <p className="mt-2 text-sm leading-7 text-ink">
          {result.breakEvenKos > 0
            ? `Sewa sekitar ${formatRupiah(result.breakEvenKos)} per bulan membuat pola ngekos penuh setara dengan ongkos pulang-pergi, setelah makan, cucian, jalan pendek, dan kunjungan. Anggaranmu ${formatRupiah(input.kosBudget)}.`
            : "Biaya pengganti makan, cucian, atau kunjungan sudah lebih besar daripada ongkos pulang-pergi. Sewa impas jatuh di bawah nol: kamar gratis pun belum tentu lebih ringan."}
        </p>
        <p className="mt-3 text-sm leading-7 text-ink">{result.hybridNote}</p>
        <p className="mt-3 text-sm leading-7 text-ink">{result.twentyNote}</p>
      </section>
      <section className="rounded-[24px] border border-mist bg-white p-6">
        <h2 className="text-lg font-semibold text-soot">Sebelum pindah</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-ink">
          {result.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-mute">Asumsi yang dipakai</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-mute">
          {result.assumptions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}
