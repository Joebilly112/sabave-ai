import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function Button({
  children,
  variant = "solid",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "ghost" | "clay";
  children: ReactNode;
}) {
  return (
    <button
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        variant === "solid" && "bg-pine text-cream hover:bg-ink",
        variant === "clay" && "bg-clay text-cream hover:bg-pine",
        variant === "ghost" && "bg-transparent text-pine hover:bg-cream",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-pine">{label}</span>
      {children}
      {hint ? <span className="mt-1.5 block text-xs leading-relaxed text-mute">{hint}</span> : null}
    </label>
  );
}

const control =
  "w-full rounded-lg border border-line bg-white px-3 py-3 text-sm text-ink outline-none transition placeholder:text-mute/70 focus:border-clay";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={control} {...props} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cx(control, "min-h-36 resize-y leading-relaxed")} {...props} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={control} {...props} />;
}

export function Lamp({
  tone,
  lit = false,
  label,
}: {
  tone: "merah" | "kuning" | "hijau";
  lit?: boolean;
  label: string;
}) {
  const color = tone === "merah" ? "bg-ember" : tone === "kuning" ? "bg-amber" : "bg-moss";
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-pine">
      <span className={cx("h-3.5 w-3.5 rounded-full", color, lit ? "ring-4 ring-amber/30" : "opacity-40")} />
      {label}
    </span>
  );
}
