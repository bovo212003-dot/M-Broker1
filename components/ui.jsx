import { Star } from "lucide-react";

export function Eyebrow({ children, className = "" }) {
  return (
    <p className={`eyebrow flex items-center gap-2 ${className}`}>
      <span className="inline-block h-px w-6 bg-brand" aria-hidden="true" />
      {children}
    </p>
  );
}

export function Section({ children, className = "", id }) {
  return (
    <section id={id} className={`py-14 sm:py-20 ${className}`}>
      <div className="shell">{children}</div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, desc, align = "left" }) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow className={align === "center" ? "justify-center" : ""}>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-steel sm:text-[2rem]">{title}</h2>
      {desc && <p className="mt-4 text-[15px] leading-relaxed text-steel-500">{desc}</p>}
    </div>
  );
}

export function BankMark({ bank, size = 40 }) {
  if (!bank) return null;
  return (
    <span
      className="inline-flex flex-none items-center justify-center rounded-lg font-display text-[11px] font-bold text-white"
      style={{ background: bank.color, width: size, height: size }}
      aria-hidden="true"
    >
      {bank.short}
    </span>
  );
}

export function Rating({ value }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-steel-500">
      <Star size={13} className="fill-signal text-signal" aria-hidden="true" />
      <span className="num font-semibold text-steel">{value.toFixed(1)}</span>
    </span>
  );
}

export function Stat({ label, value, sub, tone = "default" }) {
  const tones = {
    default: "text-steel",
    brand: "text-brand",
    alert: "text-alert",
    signal: "text-signal",
  };
  return (
    <div className="rounded-card bg-white p-4 ring-1 ring-steel-200/60">
      <p className="text-2xs font-semibold uppercase tracking-eyebrow text-steel-400">{label}</p>
      <p className={`num mt-2 text-2xl font-bold leading-none ${tones[tone]}`}>{value}</p>
      {sub && <p className="mt-1.5 text-xs text-steel-400">{sub}</p>}
    </div>
  );
}

export function Note({ tone = "signal", title, children }) {
  const map = {
    signal: "border-signal/30 bg-signal-light",
    alert: "border-alert/25 bg-alert-light",
    brand: "border-brand/25 bg-brand-light",
  };
  return (
    <div className={`rounded-card border p-5 ${map[tone]}`}>
      {title && <p className="text-sm font-bold text-steel">{title}</p>}
      <div className="mt-1.5 text-sm leading-relaxed text-steel-600">{children}</div>
    </div>
  );
}

export function Disclosure({ children }) {
  return (
    <p className="mt-4 border-t border-dashed border-steel-200 pt-4 text-xs leading-relaxed text-steel-400">
      {children}
    </p>
  );
}
