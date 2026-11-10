import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full bg-ember px-5 py-3 text-sm font-semibold text-dusk shadow-glow transition hover:bg-clay hover:text-white disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    />
  );
}

export function Panel({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`rounded-3xl border border-line bg-paper shadow-desk ${className}`}>{children}</div>;
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
      className={`w-full rounded-2xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none ring-ember/30 focus:ring-2 ${className}`}
      {...props}
    />
  );
}

export function BandPill({ band, children }: { band: "hijau" | "amber" | "merah" | "kunci"; children: ReactNode }) {
  const tone =
    band === "hijau"
      ? "bg-sage text-rest"
      : band === "amber"
        ? "bg-amberwash text-clay"
        : band === "merah"
          ? "bg-redwash text-clay"
          : "bg-cream text-mute";
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>{children}</span>;
}
