import { minutesOf, spanMinutes } from "@/lib/clock";

export function DayRibbon({ depart, returnAt }: { depart: string; returnAt: string }) {
  const start = (minutesOf(depart) / (24 * 60)) * 100;
  const span = (spanMinutes(depart, returnAt) / (24 * 60)) * 100;
  const wraps = start + span > 100;
  return (
    <div>
      <div className="relative h-3 overflow-hidden rounded-full bg-mist">
        <span
          className="absolute inset-y-0 rounded-full bg-indigo"
          style={{ left: `${start}%`, width: `${Math.min(span, 100 - start)}%` }}
        />
        {wraps ? (
          <span className="absolute inset-y-0 left-0 rounded-full bg-indigo" style={{ width: `${start + span - 100}%` }} />
        ) : null}
      </div>
      <div className="mt-2 flex justify-between text-[11px] font-medium text-mute">
        <span>00.00</span>
        <span>12.00</span>
        <span>24.00</span>
      </div>
    </div>
  );
}
