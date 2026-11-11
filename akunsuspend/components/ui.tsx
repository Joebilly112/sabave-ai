import type { ButtonHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-hazard px-5 py-3 text-sm font-semibold text-night shadow-glow transition hover:bg-flare hover:text-white disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    />
  );
}

export function Panel({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`rounded-[28px] border border-line bg-paper shadow-phone ${className}`}>{children}</div>;
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      {hint ? <span className="mt-1 block text-xs leading-5 text-mist">{hint}</span> : null}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

export function TextArea({ className = "", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full rounded-2xl border border-line bg-foam px-4 py-3 text-sm text-ink outline-none ring-hazard/40 placeholder:text-mist/70 focus:ring-2 ${className}`}
      {...props}
    />
  );
}

export function BandPill({ band, children }: { band: "longgar" | "sempit" | "kritis" | "kunci"; children: ReactNode }) {
  const tone =
    band === "longgar"
      ? "bg-emerald-100 text-ok"
      : band === "sempit"
        ? "bg-amber-100 text-amber-800"
        : band === "kritis"
          ? "bg-red-100 text-red-700"
          : "bg-foam text-mist";
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>{children}</span>;
}
