import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import type { BandId } from "@/lib/types";

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full bg-night px-5 py-3 text-sm font-semibold text-linen shadow-lamp transition hover:bg-clay disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    />
  );
}

export function Panel({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`rounded-[28px] border border-line bg-card shadow-card ${className}`}>{children}</div>;
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-night">{label}</span>
      {hint ? <span className="mt-1 block text-xs leading-5 text-mist">{hint}</span> : null}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

export function TextInput({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-2xl border border-line bg-linen px-4 py-3 text-sm text-ink outline-none ring-lamp/40 focus:ring-2 ${className}`}
      {...props}
    />
  );
}

export function SelectInput({ className = "", ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full rounded-2xl border border-line bg-linen px-4 py-3 text-sm text-ink outline-none ring-lamp/40 focus:ring-2 ${className}`}
      {...props}
    />
  );
}

export function BandPill({ band, children }: { band: BandId | "kunci"; children: ReactNode }) {
  const tone =
    band === "aman"
      ? "bg-tide/15 text-tide"
      : band === "waspada"
        ? "bg-lamp/25 text-clay"
        : band === "kritis"
          ? "bg-rose/15 text-rose"
          : "bg-line text-mist";
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>{children}</span>;
}
