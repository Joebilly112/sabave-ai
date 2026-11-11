import type { ButtonHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import type { BandId, GapState } from "@/lib/types";

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full bg-clay px-5 py-3 text-sm font-semibold text-paper shadow-lamp transition hover:bg-grove disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    />
  );
}

export function Panel({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`rounded-[28px] border border-line bg-paper shadow-desk ${className}`}>{children}</div>;
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      {hint ? <span className="mt-1 block text-xs leading-5 text-mute">{hint}</span> : null}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

export function SelectInput({ className = "", ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full rounded-2xl border border-line bg-sand px-4 py-3 text-sm text-ink outline-none ring-leaf/30 focus:ring-2 ${className}`}
      {...props}
    />
  );
}

export function BandPill({ band, children }: { band: BandId | "kunci"; children: ReactNode }) {
  const tone =
    band === "hijau"
      ? "bg-sprout text-grove"
      : band === "kuning"
        ? "bg-[#f8e7c4] text-[#7a4b12]"
        : band === "merah"
          ? "bg-[#fde4dc] text-clay"
          : "bg-sand text-mute";
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>{children}</span>;
}

export function GapMark({ state }: { state: GapState }) {
  const tone = state === "siap" ? "bg-leaf" : state === "proses" ? "bg-[#e0a100]" : "bg-clay";
  const label = state === "siap" ? "Siap" : state === "proses" ? "Proses" : "Kurang";
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-mute">
      <span className={`h-2.5 w-2.5 rounded-full ${tone}`} />
      {label}
    </span>
  );
}
