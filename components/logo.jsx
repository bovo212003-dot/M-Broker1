export default function Logo({ size = 36, tone = "light" }) {
  const chu = tone === "light" ? "text-steel" : "text-white";
  return (
    <span className="flex items-center gap-2.5">
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="flex-none"
      >
        <rect width="40" height="40" rx="10" fill="#2E6DB4" />
        <path
          d="M20 9.5 L29.5 17 V29 a1.5 1.5 0 0 1-1.5 1.5H12A1.5 1.5 0 0 1 10.5 29V17Z"
          fill="none"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path d="M17.2 30.5v-6.3h5.6v6.3" stroke="#A8B3C0" strokeWidth="2.2" strokeLinejoin="round" />
      </svg>
      <span className={`font-display text-[17px] font-bold tracking-tight ${chu}`}>
        M<span className="text-brand">·</span>Broker
      </span>
    </span>
  );
}
