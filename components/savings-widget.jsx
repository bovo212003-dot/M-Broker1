"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, TrendingDown } from "lucide-react";
import { products, bankById } from "@/lib/data";
import { lichTraNo } from "@/lib/loan";
import { dinhDangDong, dinhDangTien } from "@/lib/format";

export default function SavingsWidget() {
  const [loai, setLoai] = useState("the-chap");
  const [soTien, setSoTien] = useState(2000);
  const [thoiHan, setThoiHan] = useState(240);

  const laTheChap = loai === "the-chap";
  const gioiHan = laTheChap
    ? { min: 300, max: 8000, buoc: 100, hanMax: 300 }
    : { min: 20, max: 500, buoc: 10, hanMax: 60 };

  const kq = useMemo(() => {
    const tien = Math.min(soTien, gioiHan.max);
    const han = Math.min(thoiHan, gioiHan.hanMax);
    const tinh = products
      .filter((p) => p.loai === loai && tien >= p.han_muc_min && tien <= p.han_muc_max)
      .map((p) => ({
        p,
        kq: lichTraNo({
          goc_trieu: tien,
          thang: Math.min(han, p.thoi_han_max),
          lai_uu_dai: p.lai_suat_uu_dai,
          thang_uu_dai: p.thang_uu_dai,
          lai_sau_uu_dai: p.lai_suat_co_so + p.bien_do,
        }),
      }))
      .sort((a, b) => a.kq.tong_lai - b.kq.tong_lai);
    if (tinh.length < 2) return null;
    const re = tinh[0];
    const dat = tinh[tinh.length - 1];
    return { re, dat, chenh: dat.kq.tong_lai - re.kq.tong_lai, so_goi: tinh.length };
  }, [loai, soTien, thoiHan, gioiHan.max, gioiHan.hanMax]);

  const doiLoai = (l) => {
    setLoai(l);
    if (l === "tin-chap") { setSoTien(150); setThoiHan(48); }
    else { setSoTien(2000); setThoiHan(240); }
  };

  return (
    <div className="overflow-hidden rounded-card border border-steel-200 bg-white shadow-lift">
      <div className="border-b border-steel-200 bg-steel-50 px-5 py-3.5">
        <p className="text-[13px] font-semibold text-steel">
          Chọn sai ngân hàng, bạn mất bao nhiêu?
        </p>
      </div>

      <div className="space-y-5 p-5">
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "the-chap", label: "Vay thế chấp" },
            { id: "tin-chap", label: "Vay tín chấp" },
          ].map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => doiLoai(o.id)}
              aria-pressed={loai === o.id}
              className={`rounded-lg border px-3 py-2.5 text-[13px] font-semibold transition ${
                loai === o.id
                  ? "border-brand bg-brand text-white"
                  : "border-steel-200 text-steel-500 hover:border-brand hover:text-brand"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="sw-tien" className="text-[13px] text-steel-500">Số tiền vay</label>
            <span className="num text-[17px] font-bold text-steel">{dinhDangTien(soTien)}</span>
          </div>
          <input
            id="sw-tien"
            type="range"
            className="mt-2.5 w-full"
            min={gioiHan.min}
            max={gioiHan.max}
            step={gioiHan.buoc}
            value={Math.min(soTien, gioiHan.max)}
            onChange={(e) => setSoTien(Number(e.target.value))}
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="sw-han" className="text-[13px] text-steel-500">Thời hạn</label>
            <span className="num text-[17px] font-bold text-steel">
              {Math.min(thoiHan, gioiHan.hanMax) / 12} năm
            </span>
          </div>
          <input
            id="sw-han"
            type="range"
            className="mt-2.5 w-full"
            min={12}
            max={gioiHan.hanMax}
            step={12}
            value={Math.min(thoiHan, gioiHan.hanMax)}
            onChange={(e) => setThoiHan(Number(e.target.value))}
          />
        </div>

        {kq ? (
          <div className="rounded-card bg-steel p-5 text-white">
            <p className="flex items-center gap-2 text-2xs font-semibold uppercase tracking-eyebrow text-steel-300">
              <TrendingDown size={13} aria-hidden="true" />
              Chênh lệch tổng lãi phải trả
            </p>
            <p className="num mt-2 text-[30px] font-bold leading-none tracking-tight text-signal-bright">
              {dinhDangDong(kq.chenh)}
            </p>
            <dl className="mt-4 space-y-2.5 border-t border-white/10 pt-4">
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-[13px] text-steel-300">
                  Rẻ nhất — {bankById(kq.re.p.bankId).name}
                </dt>
                <dd className="num text-sm font-semibold text-brand-mid">
                  {dinhDangDong(kq.re.kq.trung_binh)}/tháng
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-[13px] text-steel-300">
                  Đắt nhất — {bankById(kq.dat.p.bankId).name}
                </dt>
                <dd className="num text-sm font-semibold text-white">
                  {dinhDangDong(kq.dat.kq.trung_binh)}/tháng
                </dd>
              </div>
            </dl>
          </div>
        ) : (
          <div className="rounded-card bg-steel-50 p-5 text-center text-sm text-steel-500">
            Chưa đủ gói vay trong khoảng này để so sánh. Thử điều chỉnh số tiền.
          </div>
        )}

        <Link
          href={`/dang-ky?loai=${loai}&so_tien=${Math.min(soTien, gioiHan.max)}&thoi_han=${Math.min(thoiHan, gioiHan.hanMax)}`}
          className="btn-primary w-full"
        >
          Xem gói rẻ nhất cho hồ sơ của tôi
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <p className="text-xs leading-relaxed text-steel-400">
          Tính trên {kq?.so_goi ?? 0} gói vay đang theo dõi, theo dư nợ giảm dần và có tính giai đoạn
          lãi suất thả nổi. Số liệu tham khảo.
        </p>
      </div>
    </div>
  );
}
