import { Ban, Clock3 } from "lucide-react";
import type { RankedTraining, SkipTraining } from "@/lib/types";

export function RankList({
  next,
  skip,
}: {
  next: RankedTraining[];
  skip: SkipTraining[];
}) {
  return (
    <div className="space-y-3">
      {next.map((item) => (
        <article key={item.id} className="rounded-2xl border border-line bg-ink/80 p-4">
          <div className="flex items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-lime text-sm font-extrabold text-ink">
              {item.rank}
            </span>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-paper">{item.name}</h3>
              <p className="mt-1 flex items-start gap-2 text-sm text-mist">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden />
                <span>{item.timeCost}</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-paper/90">{item.why}</p>
            </div>
          </div>
        </article>
      ))}
      {skip.length > 0 ? (
        <div className="rounded-2xl border border-dashed border-coral/50 bg-coral/10 p-4">
          <p className="mb-2 flex items-center gap-2 text-sm font-bold text-coral">
            <Ban className="h-4 w-4" aria-hidden />
            Tunda dulu
          </p>
          <ul className="space-y-2">
            {skip.map((item) => (
              <li key={item.id} className="text-sm leading-relaxed text-paper/90">
                <span className="font-semibold text-paper">{item.name}. </span>
                {item.reason}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
