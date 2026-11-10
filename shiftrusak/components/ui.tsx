import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import type { BandId } from "@/lib/types";

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full bg-lamp px-5 py-3 text-sm font-semibold text-ward shadow-lamp transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    />
  );
}

export function Panel({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`rounded-3xl border border-line bg-paper shadow-ward ${className}`}>{children}</div>;
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
      className={`w-full rounded-2xl border border-line bg-mist px-4 py-3 text-sm text-ink outline-none ring-lamp/40 focus:ring-2 ${className}`}
      {...props}
    />
  );
}

export function BandPill({ band, children }: { band: BandId | "kunci"; children: ReactNode }) {
  const tone =
    band === "jaga"
      ? "bg-tide/20 text-ward"
      : band === "goyah"
        ? "bg-lamp/25 text-ward"
        : band === "rusak"
          ? "bg-pulse/15 text-pulse"
          : "bg-mist text-mute";
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>{children}</span>;
}
