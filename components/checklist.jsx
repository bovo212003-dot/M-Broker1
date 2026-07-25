"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

export default function Checklist({ items, cta = "/dang-ky" }) {
  const [tick, setTick] = useState([]);
  const du = tick.length === items.length;

  return (
    <div className="card p-5 sm:p-6">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[15px] font-bold text-steel">Bạn có đáp ứng đủ không?</p>
        <span className="num text-xs font-semibold text-steel-400">
          {tick.length}/{items.length}
        </span>
      </div>
      <ul className="mt-4 space-y-2.5">
        {items.map((it, i) => {
          const on = tick.includes(i);
          return (
            <li key={it}>
              <button
                type="button"
                onClick={() => setTick((t) => (on ? t.filter((x) => x !== i) : [...t, i]))}
                aria-pressed={on}
                className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left transition ${
                  on ? "border-brand bg-brand-light" : "border-steel-200 bg-white hover:border-steel-400"
                }`}
              >
                <span
                  className={`mt-0.5 grid h-5 w-5 flex-none place-items-center rounded border transition ${
                    on ? "border-brand bg-brand text-white" : "border-steel-300 bg-white"
                  }`}
                  aria-hidden="true"
                >
                  {on && <Check size={13} strokeWidth={3} />}
                </span>
                <span className={`text-sm leading-snug ${on ? "text-brand-dark" : "text-steel-600"}`}>{it}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {du && (
        <div className="mt-5 animate-fade-up rounded-lg bg-brand-light p-4">
          <p className="text-sm font-bold text-brand-dark">Bạn đáp ứng các điều kiện cơ bản</p>
          <p className="mt-1.5 text-xs leading-relaxed text-steel-600">
            Bước tiếp theo là đối chiếu hồ sơ với từng ngân hàng để biết hạn mức và lãi suất cụ thể.
          </p>
          <Link href={cta} className="btn-primary mt-3 w-full py-2.5 text-[13px]">
            Xem gói vay phù hợp <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
}
