"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { X, SlidersHorizontal } from "lucide-react";
import { banks, bankById, MUC_DICH, TSDB, TINH_THANH } from "@/lib/data";
import { dinhDangPhanTram, dinhDangTien, dinhDangThoiHan } from "@/lib/format";
import { BankMark, Rating } from "./ui";

const LOAI = [
  { id: "tat-ca", label: "Tất cả" },
  { id: "the-chap", label: "Thế chấp" },
  { id: "tin-chap", label: "Tín chấp" },
];

export default function CompareTable({ danhSach, loaiMacDinh = "tat-ca", tieuDe = "So sánh gói vay" }) {
  const [loai, setLoai] = useState(loaiMacDinh);
  const [mucDich, setMucDich] = useState("");
  const [tsdb, setTsdb] = useState("");
  const [tinh, setTinh] = useState("");
  const [laiMax, setLaiMax] = useState(30);
  const [chon, setChon] = useState([]);
  const [moLoc, setMoLoc] = useState(false);

  const ketQua = useMemo(
    () =>
      danhSach
        .filter((p) => (loai === "tat-ca" ? true : p.loai === loai))
        .filter((p) => (mucDich ? p.muc_dich?.includes(mucDich) : true))
        .filter((p) => (tsdb ? p.tsdb?.includes(tsdb) : true))
        .filter((p) => p.lai_suat_uu_dai <= laiMax)
        .sort((a, b) => a.lai_suat_uu_dai - b.lai_suat_uu_dai),
    [danhSach, loai, mucDich, tsdb, laiMax]
  );

  const toggle = (slug) =>
    setChon((c) => (c.includes(slug) ? c.filter((s) => s !== slug) : c.length < 3 ? [...c, slug] : c));

  const daChon = chon.map((s) => danhSach.find((p) => p.slug === s)).filter(Boolean);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {LOAI.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setLoai(l.id)}
              className={`rounded-lg px-4 py-2 text-[13px] font-semibold transition ${
                loai === l.id ? "bg-steel text-white" : "bg-white text-steel-500 ring-1 ring-steel-200 hover:ring-steel-400"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <p className="num text-xs text-steel-400">{ketQua.length} gói</p>
          <button
            type="button"
            onClick={() => setMoLoc((v) => !v)}
            className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-[13px] font-semibold text-steel-600 ring-1 ring-steel-200 lg:hidden"
            aria-expanded={moLoc}
          >
            <SlidersHorizontal size={14} aria-hidden="true" /> Bộ lọc
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className={`${moLoc ? "block" : "hidden"} lg:block`}>
          <div className="card space-y-5 p-5">
            <p className="eyebrow">Bộ lọc</p>

            <div>
              <label className="text-[13px] font-medium text-steel-600" htmlFor="f-mucdich">
                Mục đích vay
              </label>
              <select id="f-mucdich" className="field mt-2" value={mucDich} onChange={(e) => setMucDich(e.target.value)}>
                <option value="">Tất cả mục đích</option>
                {MUC_DICH.map((m) => (
                  <option key={m.id} value={m.id}>{m.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[13px] font-medium text-steel-600" htmlFor="f-tsdb">
                Tài sản đảm bảo
              </label>
              <select id="f-tsdb" className="field mt-2" value={tsdb} onChange={(e) => setTsdb(e.target.value)}>
                <option value="">Tất cả loại tài sản</option>
                {TSDB.map((t) => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[13px] font-medium text-steel-600" htmlFor="f-tinh">
                Tỉnh, thành phố
              </label>
              <select id="f-tinh" className="field mt-2" value={tinh} onChange={(e) => setTinh(e.target.value)}>
                <option value="">Toàn quốc</option>
                {TINH_THANH.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <label className="text-[13px] font-medium text-steel-600" htmlFor="f-lai">
                  Lãi suất tối đa
                </label>
                <span className="num text-sm font-bold text-steel">{dinhDangPhanTram(laiMax)}</span>
              </div>
              <input
                id="f-lai"
                type="range"
                className="mt-3 w-full"
                min={5}
                max={30}
                step={0.5}
                value={laiMax}
                onChange={(e) => setLaiMax(Number(e.target.value))}
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setMucDich(""); setTsdb(""); setTinh(""); setLaiMax(30);
              }}
              className="w-full rounded-lg border border-steel-200 py-2 text-xs font-semibold text-steel-500 hover:border-steel-400"
            >
              Xóa bộ lọc
            </button>
          </div>

          <div className="card mt-4 p-5">
            <p className="eyebrow">Ngân hàng đối tác</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {banks.map((b) => (
                <span key={b.id} className="rounded-md bg-steel-50 px-2 py-1 font-display text-2xs font-bold text-steel-500">
                  {b.short}
                </span>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="hidden overflow-hidden rounded-card border border-steel-200 bg-white md:block">
            <table className="w-full">
              <caption className="sr-only">{tieuDe}</caption>
              <thead className="bg-steel text-white">
                <tr className="text-2xs uppercase tracking-eyebrow">
                  <th scope="col" className="px-4 py-3 text-left font-semibold">Ngân hàng và gói vay</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Ưu đãi</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Sau ưu đãi</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Hạn mức</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Thời hạn</th>
                  <th scope="col" className="px-4 py-3 text-center font-semibold">So sánh</th>
                  <th scope="col" className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-steel-100">
                {ketQua.map((p) => {
                  const bank = bankById(p.bankId);
                  const sau = p.loai === "the-chap" ? p.lai_suat_co_so + p.bien_do : p.lai_suat_co_so;
                  return (
                    <tr key={p.slug} className="transition hover:bg-steel-50/60">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <BankMark bank={bank} size={38} />
                          <div className="min-w-0">
                            <Link href={`/goi-vay/${p.slug}`} className="block text-sm font-semibold text-steel hover:text-brand">
                              {bank.name}
                            </Link>
                            <p className="truncate text-xs text-steel-400">{p.ten}</p>
                            <div className="mt-1"><Rating value={p.diem} /></div>
                          </div>
                        </div>
                      </td>
                      <td className="num px-4 py-3.5 text-right">
                        <span className="block text-base font-bold text-brand">{dinhDangPhanTram(p.lai_suat_uu_dai)}</span>
                        <span className="block text-2xs text-steel-400">
                          {p.thang_uu_dai > 0 ? `${p.thang_uu_dai} tháng` : "cố định"}
                        </span>
                      </td>
                      <td className="num px-4 py-3.5 text-right">
                        <span className="block text-sm font-semibold text-steel-600">{dinhDangPhanTram(sau)}</span>
                        {p.bien_do > 0 && (
                          <span className="block text-2xs text-steel-400">cơ sở + {dinhDangPhanTram(p.bien_do)}</span>
                        )}
                      </td>
                      <td className="num px-4 py-3.5 text-right text-sm text-steel-600">{dinhDangTien(p.han_muc_max)}</td>
                      <td className="num px-4 py-3.5 text-right text-sm text-steel-600">{dinhDangThoiHan(p.thoi_han_max)}</td>
                      <td className="px-4 py-3.5 text-center">
                        <input
                          type="checkbox"
                          checked={chon.includes(p.slug)}
                          onChange={() => toggle(p.slug)}
                          className="h-4 w-4 accent-brand"
                          aria-label={`So sánh gói ${p.ten} của ${bank.name}`}
                        />
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <Link
                          href={`/dang-ky?goi=${p.slug}`}
                          className="inline-flex rounded-lg bg-brand px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-brand-dark"
                        >
                          Đăng ký
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {ketQua.map((p) => {
              const bank = bankById(p.bankId);
              return (
                <div key={p.slug} className="card p-4">
                  <div className="flex items-start gap-3">
                    <BankMark bank={bank} size={40} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-steel">{bank.name}</p>
                      <p className="truncate text-xs text-steel-400">{p.ten}</p>
                    </div>
                    <span className="num text-lg font-bold text-brand">{dinhDangPhanTram(p.lai_suat_uu_dai)}</span>
                  </div>
                  <dl className="num mt-3 grid grid-cols-3 gap-2 border-t border-steel-100 pt-3 text-center">
                    <div>
                      <dt className="text-2xs text-steel-400">Hạn mức</dt>
                      <dd className="text-xs font-semibold text-steel">{dinhDangTien(p.han_muc_max)}</dd>
                    </div>
                    <div>
                      <dt className="text-2xs text-steel-400">Thời hạn</dt>
                      <dd className="text-xs font-semibold text-steel">{dinhDangThoiHan(p.thoi_han_max)}</dd>
                    </div>
                    <div>
                      <dt className="text-2xs text-steel-400">Giải ngân</dt>
                      <dd className="text-xs font-semibold text-steel">{p.giai_ngan_ngay} ngày</dd>
                    </div>
                  </dl>
                  <div className="mt-3 flex gap-2">
                    <Link href={`/goi-vay/${p.slug}`} className="btn-ghost flex-1 py-2.5 text-xs">Chi tiết</Link>
                    <Link href={`/dang-ky?goi=${p.slug}`} className="btn-primary flex-1 py-2.5 text-xs">Đăng ký</Link>
                  </div>
                </div>
              );
            })}
          </div>

          {ketQua.length === 0 && (
            <div className="card p-10 text-center">
              <p className="text-sm font-semibold text-steel">Không có gói nào khớp bộ lọc</p>
              <p className="mt-1.5 text-sm text-steel-500">Thử nới lãi suất tối đa hoặc bỏ bớt điều kiện.</p>
            </div>
          )}
        </div>
      </div>

      {daChon.length > 0 && (
        <div className="sticky bottom-4 z-30 mt-6">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-3 rounded-card bg-steel px-4 py-3 text-white shadow-lg">
            <p className="text-xs font-semibold text-steel-300">Đang so sánh</p>
            <div className="flex flex-1 flex-wrap gap-2">
              {daChon.map((p) => (
                <span key={p.slug} className="flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-xs">
                  {bankById(p.bankId).short}
                  <button type="button" onClick={() => toggle(p.slug)} aria-label={`Bỏ ${p.ten}`}>
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <Link
              href={`/so-sanh/chi-tiet?goi=${chon.join(",")}`}
              className="rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white hover:bg-brand-dark"
            >
              So sánh {daChon.length} gói
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
