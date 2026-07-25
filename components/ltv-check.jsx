"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import { dinhDangTien } from "@/lib/format";

function ONhap({ id, label, value, onChange, goi_y }) {
  return (
    <div>
      <label htmlFor={id} className="text-[13px] font-medium text-steel-600">{label}</label>
      <div className="relative mt-2">
        <input
          id={id}
          type="number"
          inputMode="numeric"
          className="field num pr-16 text-base font-semibold"
          value={value}
          min={0}
          step={100}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-steel-400">
          triệu
        </span>
      </div>
      {goi_y && <p className="num mt-1.5 text-2xs text-steel-400">{goi_y}</p>}
    </div>
  );
}

export default function LtvCheck() {
  const [soTien, setSoTien] = useState(2000);
  const [giaTri, setGiaTri] = useState(3000);

  const ltv = giaTri > 0 ? (soTien / giaTri) * 100 : 0;
  const theChap = products.filter((p) => p.loai === "the-chap");
  const nhan = theChap.filter((p) => ltv <= p.ltv && soTien >= p.han_muc_min && soTien <= p.han_muc_max);
  const hopLe = giaTri > 0 && soTien > 0;

  return (
    <div className="rounded-card bg-white p-5 ring-1 ring-steel-200 sm:p-6">
      <p className="text-[15px] font-bold text-steel">Bạn vay được bao nhiêu?</p>
      <p className="mt-1 text-xs text-steel-400">Nhập 2 con số, không cần để lại thông tin liên hệ.</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <ONhap id="so-tien" label="Bạn cần vay" value={soTien} onChange={setSoTien} goi_y={dinhDangTien(soTien)} />
        <ONhap
          id="gia-tri"
          label="Giá trị tài sản thế chấp"
          value={giaTri}
          onChange={setGiaTri}
          goi_y={dinhDangTien(giaTri)}
        />
      </div>

      {hopLe && (
        <div className="mt-5 animate-fade-up rounded-lg bg-steel p-4 text-white">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[13px] text-steel-300">Tỷ lệ vay trên giá trị tài sản</p>
            <p className="num text-2xl font-bold leading-none text-brand-mid">{Math.round(ltv)}%</p>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10" role="presentation">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                ltv <= 70 ? "bg-brand-mid" : ltv <= 85 ? "bg-signal-bright" : "bg-alert"
              }`}
              style={{ width: `${Math.min(100, ltv)}%` }}
            />
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-steel-200">
            {nhan.length > 0 ? (
              <>
                Nằm trong hạn mức của{" "}
                <span className="num font-bold text-white">
                  {nhan.length}/{theChap.length}
                </span>{" "}
                gói vay thế chấp trên hệ thống.
              </>
            ) : (
              <>
                Tỷ lệ này vượt hạn mức của các gói hiện có. Hãy giảm số tiền vay hoặc bổ sung tài sản
                đảm bảo thứ hai.
              </>
            )}
          </p>
        </div>
      )}

      <Link
        href={`/so-sanh?loai=the-chap&so_tien=${soTien}`}
        className="btn-primary mt-4 w-full"
      >
        So sánh {nhan.length || theChap.length} gói vay thế chấp
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </div>
  );
}
