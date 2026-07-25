import Link from "next/link";
import { bankById, CAP_NHAT } from "@/lib/data";
import { dinhDangPhanTram } from "@/lib/format";

export default function RateTicker({ items }) {
  const day = [...items, ...items];

  return (
    <section className="border-y border-brand-deep bg-brand-deep" aria-label="Bảng lãi suất mới nhất">
      <div className="flex items-center">
        <div className="hidden flex-none items-center gap-2.5 border-r border-white/15 px-6 py-3.5 sm:flex">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-mid opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-mid" />
          </span>
          <span className="text-2xs font-semibold uppercase tracking-eyebrow text-white">
            Lãi suất {CAP_NHAT}
          </span>
        </div>

        <div className="min-w-0 flex-1 overflow-hidden py-3.5">
          <div className="flex w-max animate-ticker gap-8">
            {day.map((p, i) => {
              const bank = bankById(p.bankId);
              return (
                <Link
                  key={`${p.slug}-${i}`}
                  href={`/goi-vay/${p.slug}`}
                  className="flex flex-none items-baseline gap-2.5 text-sm transition hover:opacity-80"
                >
                  <span className="font-semibold text-white">{bank.name}</span>
                  <span className="num font-bold text-signal-bright">
                    {dinhDangPhanTram(p.lai_suat_uu_dai)}
                  </span>
                  <span className="num text-2xs text-brand-soft">
                    {p.thang_uu_dai > 0 ? `${p.thang_uu_dai} tháng đầu` : "cố định"}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
