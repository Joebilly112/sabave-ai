import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import type { BandId } from "@/lib/types";

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full bg-night px-5 py-3 text-sm font-semibold text-paper shadow-glow transition hover:bg-dusk disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    />
  );
}

export function Panel({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`rounded-[28px] border border-line bg-paper shadow-card ${className}`}>{children}</div>;
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

const control =
  "w-full rounded-2xl border border-line bg-mist/60 px-4 py-3 text-sm text-ink outline-none ring-dusk/30 focus:ring-2";

export function TextInput({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${control} ${className}`} {...props} />;
}

export function SelectInput({ className = "", children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={`${control} ${className}`} {...props}>
      {children}
    </select>
  );
}

export function BandPill({ band, children }: { band: BandId | "kunci"; children: ReactNode }) {
  const tone =
    band === "dekat"
      ? "bg-emerald-50 text-leaf"
      : band === "renggang"
        ? "bg-amber-50 text-amber-800"
        : band === "perlu-perhatian"
          ? "bg-rose-50 text-rose"
          : "bg-mist text-mute";
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>{children}</span>;
}
