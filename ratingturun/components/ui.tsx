import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import type { BandId } from "@/lib/types";

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full bg-star px-5 py-3 text-sm font-semibold text-asphalt shadow-star transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    />
  );
}

export function Panel({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`rounded-[28px] border border-line bg-paper shadow-road ${className}`}>{children}</div>;
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

export function TextInput({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-2xl border border-line bg-sand px-4 py-3 text-sm text-ink outline-none ring-star/50 focus:ring-2 ${className}`}
      {...props}
    />
  );
}

export function SelectInput({ className = "", ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full rounded-2xl border border-line bg-sand px-4 py-3 text-sm text-ink outline-none ring-star/50 focus:ring-2 ${className}`}
      {...props}
    />
  );
}

export function BandPill({ band, children }: { band: BandId | "kunci"; children: ReactNode }) {
  const tone =
    band === "aman"
      ? "bg-moss/15 text-moss"
      : band === "waspada"
        ? "bg-star/25 text-asphalt"
        : band === "kritis"
          ? "bg-ember/15 text-ember"
          : "bg-sand text-mute";
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>{children}</span>;
}
