import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { bankById, CAP_NHAT } from "@/lib/data";
import { dinhDangPhanTram, dinhDangTien } from "@/lib/format";

export default function RateBoard({ items, title = "Bảng lãi suất hôm nay", href = "/so-sanh" }) {
  const thap_nhat = Math.min(...items.map((i) => i.lai_suat_uu_dai));

  return (
    <div className="overflow-hidden rounded-card bg-steel text-white ring-1 ring-steel-700">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-brand-mid opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-mid" />
          </span>
          <p className="text-[13px] font-semibold text-white">{title}</p>
        </div>
        <p className="num text-2xs text-steel-400">CẬP NHẬT {CAP_NHAT}</p>
      </div>

      <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-b border-white/10 px-5 py-2 text-2xs font-semibold uppercase tracking-eyebrow text-steel-400">
        <span>Ngân hàng</span>
        <span className="text-right">Ưu đãi</span>
        <span className="text-right">Hạn mức</span>
      </div>

      <ul>
        {items.map((p, i) => {
          const bank = bankById(p.bankId);
          const la_thap_nhat = p.lai_suat_uu_dai === thap_nhat;
          return (
            <li
              key={p.slug}
              className="animate-board-in border-b border-white/5 last:border-0"
              style={{ animationDelay: `${i * 55}ms` }}
            >
              <Link
                href={`/goi-vay/${p.slug}`}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 px-5 py-3 transition hover:bg-white/5"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-white">{bank.name}</span>
                  <span className="block truncate text-xs text-steel-400">{p.ten}</span>
                </span>
                <span className="text-right">
                  <span
                    className={`num block text-base font-bold leading-tight ${
                      la_thap_nhat ? "text-brand-mid" : "text-signal-bright"
                    }`}
                  >
                    {dinhDangPhanTram(p.lai_suat_uu_dai)}
                  </span>
                  <span className="num block text-2xs text-steel-400">
                    {p.thang_uu_dai > 0 ? `${p.thang_uu_dai} tháng đầu` : "cố định"}
                  </span>
                </span>
                <span className="num text-right text-xs text-steel-300">
                  {dinhDangTien(p.han_muc_max)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <Link
        href={href}
        className="flex items-center justify-center gap-1.5 bg-white/5 px-5 py-3 text-[13px] font-semibold text-white transition hover:bg-white/10"
      >
        Xem toàn bộ bảng so sánh
        <ArrowUpRight size={15} aria-hidden="true" />
      </Link>
    </div>
  );
}
