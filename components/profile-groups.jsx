"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { NHOM_HO_SO, products, bankById } from "@/lib/data";
import { dinhDangPhanTram, dinhDangTien, dinhDangThoiHan } from "@/lib/format";
import { BankMark, Rating } from "./ui";

export default function ProfileGroups() {
  const [nhom, setNhom] = useState("chuyen-khoan");
  const chon = NHOM_HO_SO.find((n) => n.id === nhom);
  const goi = products.filter((p) => p.loai === "tin-chap" && p.nhom?.includes(nhom));

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {NHOM_HO_SO.map((n) => {
          const on = n.id === nhom;
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => setNhom(n.id)}
              aria-pressed={on}
              className={`rounded-card border p-5 text-left transition ${
                on ? "border-brand bg-brand-light" : "border-steel-200 bg-white hover:border-brand"
              }`}
            >
              <p className={`text-[15px] font-bold leading-snug ${on ? "text-brand-dark" : "text-steel"}`}>
                {n.label}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-steel-500">{n.mo_ta}</p>
              <dl className="num mt-4 space-y-1.5 border-t border-steel-200/70 pt-3 text-xs">
                <div className="flex justify-between gap-2">
                  <dt className="text-steel-400">Hạn mức</dt>
                  <dd className="text-right font-semibold text-steel">{n.han_muc}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-steel-400">Lãi suất</dt>
                  <dd className="text-right font-semibold text-steel">{n.lai_suat}</dd>
                </div>
              </dl>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-3">
          {goi.map((p) => {
            const bank = bankById(p.bankId);
            return (
              <div key={p.slug} className="card p-5">
                <div className="flex flex-wrap items-start gap-4">
                  <BankMark bank={bank} size={44} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link href={`/goi-vay/${p.slug}`} className="text-[15px] font-bold text-steel hover:text-brand">
                        {bank.name}
                      </Link>
                      <span className="chip bg-brand-light text-brand-dark">Phù hợp với hồ sơ của bạn</span>
                    </div>
                    <p className="mt-0.5 text-sm text-steel-400">{p.ten}</p>
                    <div className="mt-2"><Rating value={p.diem} /></div>
                  </div>
                  <div className="text-right">
                    <p className="num text-xl font-bold leading-none text-brand">
                      {dinhDangPhanTram(p.lai_suat_uu_dai)}
                    </p>
                    <p className="text-2xs text-steel-400">mỗi năm</p>
                  </div>
                </div>

                <dl className="num mt-4 grid grid-cols-3 gap-3 border-t border-steel-100 pt-4">
                  <div>
                    <dt className="text-2xs text-steel-400">Hạn mức tối đa</dt>
                    <dd className="text-sm font-semibold text-steel">{dinhDangTien(p.han_muc_max)}</dd>
                  </div>
                  <div>
                    <dt className="text-2xs text-steel-400">Thời hạn</dt>
                    <dd className="text-sm font-semibold text-steel">{dinhDangThoiHan(p.thoi_han_max)}</dd>
                  </div>
                  <div>
                    <dt className="text-2xs text-steel-400">Giải ngân</dt>
                    <dd className="text-sm font-semibold text-steel">{p.giai_ngan_ngay} ngày</dd>
                  </div>
                </dl>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href={`/dang-ky?loai=tin-chap&goi=${p.slug}`} className="btn-primary flex-1 py-2.5 text-[13px] sm:flex-none">
                    Kiểm tra khả năng duyệt
                  </Link>
                  <Link href={`/goi-vay/${p.slug}`} className="btn-ghost flex-1 py-2.5 text-[13px] sm:flex-none">
                    Điều kiện chi tiết
                  </Link>
                </div>
              </div>
            );
          })}
          {goi.length === 0 && (
            <div className="card p-8 text-center text-sm text-steel-500">
              Nhóm hồ sơ này hiện chưa có gói vay trong hệ thống demo.
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-5">
            <p className="flex items-center gap-2 text-[13px] font-bold text-steel">
              <FileText size={15} className="text-brand" aria-hidden="true" />
              Giấy tờ cần chuẩn bị
            </p>
            <p className="mt-1 text-xs text-steel-400">Cho nhóm: {chon.label.toLowerCase()}</p>
            <ul className="mt-4 space-y-2.5">
              {chon.giay_to.map((g, i) => (
                <li key={g} className="flex items-start gap-2.5 text-sm text-steel-600">
                  <span className="num mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-steel-50 text-2xs font-bold text-steel-500">
                    {i + 1}
                  </span>
                  {g}
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-steel-200 pt-3 text-xs leading-relaxed text-steel-400">
              Chỉ cần {chon.giay_to.length} loại giấy tờ. Không cần công chứng, không cần người bảo lãnh.
            </p>
            <Link href="/dang-ky?loai=tin-chap" className="btn-dark mt-4 w-full py-2.5 text-[13px]">
              Bắt đầu hồ sơ <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
