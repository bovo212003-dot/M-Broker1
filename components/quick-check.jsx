"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { products, bankById } from "@/lib/data";
import { dinhDangPhanTram, dinhDangTien } from "@/lib/format";

const CAU_HOI = [
  {
    id: "so_tien",
    hoi: "Bạn cần vay bao nhiêu?",
    dap_an: [
      { id: 40, label: "Dưới 50 triệu" },
      { id: 80, label: "50 – 100 triệu" },
      { id: 200, label: "100 – 300 triệu" },
      { id: 400, label: "Trên 300 triệu" },
    ],
  },
  {
    id: "nhom",
    hoi: "Bạn chứng minh thu nhập bằng gì?",
    dap_an: [
      { id: "chuyen-khoan", label: "Sao kê lương" },
      { id: "tien-mat", label: "Bảng lương tiền mặt" },
      { id: "bao-hiem", label: "Bảo hiểm nhân thọ" },
      { id: "hoa-don", label: "Hóa đơn điện nước" },
    ],
  },
  {
    id: "thu_nhap",
    hoi: "Thu nhập hàng tháng?",
    dap_an: [
      { id: 6, label: "Dưới 8 triệu" },
      { id: 12, label: "8 – 15 triệu" },
      { id: 20, label: "15 – 25 triệu" },
      { id: 35, label: "Trên 25 triệu" },
    ],
  },
];

export default function QuickCheck() {
  const [tra_loi, setTraLoi] = useState({});
  const xong = CAU_HOI.every((c) => tra_loi[c.id] !== undefined);

  const phu_hop = xong
    ? products.filter(
        (p) =>
          p.loai === "tin-chap" &&
          p.nhom?.includes(tra_loi.nhom) &&
          tra_loi.so_tien <= p.han_muc_max &&
          tra_loi.thu_nhap >= p.thu_nhap_min
      )
    : [];

  const han_muc_min = phu_hop.length ? Math.min(...phu_hop.map((p) => Math.min(p.han_muc_max, tra_loi.thu_nhap * 8))) : 0;
  const han_muc_max = phu_hop.length ? Math.min(...phu_hop.map((p) => p.han_muc_max)) : 0;
  const lai_thap = phu_hop.length ? Math.min(...phu_hop.map((p) => p.lai_suat_uu_dai)) : 0;

  return (
    <div className="rounded-card bg-white p-5 ring-1 ring-steel-200 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[15px] font-bold text-steel">Kiểm tra điều kiện trong 60 giây</p>
        <span className="num text-2xs font-semibold text-steel-400">
          {Object.keys(tra_loi).length}/3
        </span>
      </div>
      <p className="mt-1 text-xs text-steel-400">Không cần số điện thoại, không cần giấy tờ.</p>

      <div className="mt-5 space-y-5">
        {CAU_HOI.map((c, i) => (
          <fieldset key={c.id}>
            <legend className="flex items-center gap-2 text-[13px] font-semibold text-steel">
              <span
                className={`num grid h-5 w-5 flex-none place-items-center rounded-full text-2xs font-bold ${
                  tra_loi[c.id] !== undefined ? "bg-brand text-white" : "bg-steel-100 text-steel-400"
                }`}
              >
                {tra_loi[c.id] !== undefined ? <Check size={11} strokeWidth={3} /> : i + 1}
              </span>
              {c.hoi}
            </legend>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {c.dap_an.map((d) => {
                const chon = tra_loi[c.id] === d.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setTraLoi((t) => ({ ...t, [c.id]: d.id }))}
                    className={`rounded-lg border px-3.5 py-2.5 text-[13px] font-medium transition ${
                      chon
                        ? "border-brand bg-brand text-white"
                        : "border-steel-200 bg-white text-steel-600 hover:border-brand hover:text-brand"
                    }`}
                    aria-pressed={chon}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      {xong && (
        <div className="mt-6 animate-fade-up border-t border-steel-200 pt-5">
          {phu_hop.length > 0 ? (
            <>
              <p className="text-sm text-steel-600">
                Với hồ sơ của bạn, có{" "}
                <span className="num text-lg font-bold text-brand">{phu_hop.length} ngân hàng</span> phù hợp.
              </p>
              <dl className="num mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-brand-light p-3">
                  <dt className="text-2xs font-semibold uppercase tracking-eyebrow text-brand-dark">
                    Hạn mức ước tính
                  </dt>
                  <dd className="mt-1 text-base font-bold text-brand-dark">
                    {dinhDangTien(han_muc_min)} – {dinhDangTien(han_muc_max)}
                  </dd>
                </div>
                <div className="rounded-lg bg-steel-50 p-3">
                  <dt className="text-2xs font-semibold uppercase tracking-eyebrow text-steel-400">
                    Lãi suất từ
                  </dt>
                  <dd className="mt-1 text-base font-bold text-steel">{dinhDangPhanTram(lai_thap)}/năm</dd>
                </div>
              </dl>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {phu_hop.slice(0, 6).map((p) => (
                  <span key={p.slug} className="rounded-md bg-steel-50 px-2 py-1 font-display text-2xs font-bold text-steel-500">
                    {bankById(p.bankId).short}
                  </span>
                ))}
              </div>
              <Link
                href={`/dang-ky?loai=tin-chap&so_tien=${tra_loi.so_tien}&nhom=${tra_loi.nhom}&thu_nhap=${tra_loi.thu_nhap}&buoc=3`}
                className="btn-primary mt-4 w-full"
              >
                Xem chi tiết {phu_hop.length} gói vay
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <p className="mt-3 text-xs leading-relaxed text-steel-400">
                Đây là kết quả tham khảo dựa trên thông tin bạn cung cấp. Hạn mức và lãi suất chính thức
                do ngân hàng quyết định sau khi thẩm định.
              </p>
            </>
          ) : (
            <div className="rounded-lg bg-signal-light p-4">
              <p className="text-sm font-semibold text-steel">Chưa có gói nào khớp hoàn toàn</p>
              <p className="mt-1.5 text-xs leading-relaxed text-steel-600">
                Hồ sơ của bạn cần thêm giấy tờ chứng minh. Chuyên viên có thể tư vấn phương án khác —
                để lại thông tin và chúng tôi gọi lại trong 2 giờ làm việc.
              </p>
              <Link href="/dang-ky?loai=tin-chap" className="btn-dark mt-3 w-full py-2.5 text-xs">
                Nhận tư vấn riêng
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
