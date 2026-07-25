"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { ArrowRight, ChevronDown } from "lucide-react";
import { lichTraNo } from "@/lib/loan";
import { dinhDangDong, dinhDangTien, dinhDangPhanTram } from "@/lib/format";

function Slider({ label, value, min, max, step, onChange, hienThi }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-[13px] font-medium text-steel-600">{label}</label>
        <span className="num text-[15px] font-bold text-steel">{hienThi}</span>
      </div>
      <input
        type="range"
        className="mt-2.5 w-full"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
      />
      <div className="num mt-1 flex justify-between text-2xs text-steel-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export default function LoanCalculator({ macDinh = {}, rutGon = false }) {
  const [soTien, setSoTien] = useState(macDinh.so_tien ?? 2000);
  const [thoiHan, setThoiHan] = useState(macDinh.thoi_han ?? 240);
  const [laiUuDai, setLaiUuDai] = useState(macDinh.lai ?? 5.9);
  const [thangUuDai, setThangUuDai] = useState(macDinh.thang_uu_dai ?? 12);
  const [bienDo, setBienDo] = useState(macDinh.bien_do ?? 3.5);
  const [kieu, setKieu] = useState("giam-dan");
  const [moBang, setMoBang] = useState(false);

  const laiSau = 5.4 + bienDo;

  const kq = useMemo(
    () =>
      lichTraNo({
        goc_trieu: soTien,
        thang: thoiHan,
        lai_uu_dai: laiUuDai,
        thang_uu_dai: kieu === "tra-deu" ? 0 : thangUuDai,
        lai_sau_uu_dai: laiSau,
        kieu,
      }),
    [soTien, thoiHan, laiUuDai, thangUuDai, laiSau, kieu]
  );

  const duLieuBieuDo = useMemo(
    () =>
      kq.rows
        .filter((_, i) => i % Math.max(1, Math.floor(thoiHan / 60)) === 0)
        .map((r) => ({
          ky: r.ky,
          nhan: `Tháng ${r.ky}`,
          goc: Math.round(r.goc),
          lai: Math.round(r.lai),
        })),
    [kq, thoiHan]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
      <div className="card p-5">
        <p className="eyebrow">Thông số khoản vay</p>
        <div className="mt-5 space-y-6">
          <Slider
            label="Số tiền vay"
            value={soTien}
            min={50}
            max={10000}
            step={50}
            onChange={setSoTien}
            hienThi={dinhDangTien(soTien)}
          />
          <Slider
            label="Thời hạn vay"
            value={thoiHan}
            min={12}
            max={360}
            step={12}
            onChange={setThoiHan}
            hienThi={`${thoiHan / 12} năm`}
          />
          <Slider
            label="Lãi suất ưu đãi"
            value={laiUuDai}
            min={5}
            max={30}
            step={0.1}
            onChange={setLaiUuDai}
            hienThi={dinhDangPhanTram(laiUuDai)}
          />
          {kieu === "giam-dan" && (
            <>
              <Slider
                label="Thời gian ưu đãi"
                value={thangUuDai}
                min={0}
                max={36}
                step={6}
                onChange={setThangUuDai}
                hienThi={`${thangUuDai} tháng`}
              />
              <Slider
                label="Biên độ sau ưu đãi"
                value={bienDo}
                min={0}
                max={6}
                step={0.1}
                onChange={setBienDo}
                hienThi={`+${dinhDangPhanTram(bienDo)}`}
              />
            </>
          )}
        </div>

        <div className="mt-6 border-t border-steel-200 pt-4">
          <p className="text-[13px] font-medium text-steel-600">Phương thức trả</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {[
              { id: "giam-dan", label: "Dư nợ giảm dần" },
              { id: "tra-deu", label: "Trả đều hàng tháng" },
            ].map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setKieu(o.id)}
                className={`rounded-lg border px-3 py-2.5 text-xs font-semibold transition ${
                  kieu === o.id
                    ? "border-brand bg-brand-light text-brand-dark"
                    : "border-steel-200 text-steel-500 hover:border-steel-400"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-card bg-steel p-4 text-white">
            <p className="text-2xs font-semibold uppercase tracking-eyebrow text-steel-400">
              Trả tháng đầu
            </p>
            <p className="num mt-2 text-xl font-bold leading-none text-brand-mid">
              {dinhDangDong(kq.thang_dau)}
            </p>
          </div>
          <div className="rounded-card bg-white p-4 ring-1 ring-steel-200">
            <p className="text-2xs font-semibold uppercase tracking-eyebrow text-steel-400">
              Trả cao nhất
            </p>
            <p className="num mt-2 text-xl font-bold leading-none text-steel">
              {dinhDangDong(kq.thang_cao_nhat)}
            </p>
          </div>
          <div className="rounded-card bg-white p-4 ring-1 ring-steel-200">
            <p className="text-2xs font-semibold uppercase tracking-eyebrow text-steel-400">
              Tổng lãi phải trả
            </p>
            <p className="num mt-2 text-xl font-bold leading-none text-alert">
              {dinhDangDong(kq.tong_lai)}
            </p>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[13px] font-semibold text-steel">Cơ cấu khoản trả theo thời gian</p>
            <div className="flex items-center gap-4 text-2xs text-steel-500">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm bg-brand" aria-hidden="true" /> Gốc
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm bg-signal" aria-hidden="true" /> Lãi
              </span>
            </div>
          </div>
          <div className="mt-4 h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={duLieuBieuDo} margin={{ top: 4, right: 4, bottom: 0, left: -12 }}>
                <CartesianGrid strokeDasharray="2 4" stroke="#E8ECF1" vertical={false} />
                <XAxis
                  dataKey="ky"
                  tick={{ fontSize: 11, fill: "#6E7C8C" }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `T${v}`}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#6E7C8C" }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${Math.round(v / 1_000_000)}tr`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid #D5DCE4",
                    fontSize: 12,
                    fontFamily: "var(--font-sans)",
                  }}
                  formatter={(v, n) => [dinhDangDong(v), n === "goc" ? "Gốc" : "Lãi"]}
                  labelFormatter={(v) => `Tháng ${v}`}
                />
                <Area type="monotone" dataKey="goc" stackId="1" stroke="#2E6DB4" fill="#2E6DB4" fillOpacity={0.85} />
                <Area type="monotone" dataKey="lai" stackId="1" stroke="#E09B2D" fill="#E09B2D" fillOpacity={0.85} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {!rutGon && (
          <div className="card overflow-hidden">
            <button
              type="button"
              onClick={() => setMoBang((v) => !v)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              aria-expanded={moBang}
            >
              <span className="text-[13px] font-semibold text-steel">
                Bảng chi tiết {moBang ? `${kq.rows.length} kỳ` : "từng kỳ trả nợ"}
              </span>
              <ChevronDown
                size={16}
                className={`text-steel-400 transition ${moBang ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {moBang && (
              <div className="max-h-80 overflow-auto border-t border-steel-200">
                <table className="w-full text-right text-xs">
                  <thead className="sticky top-0 bg-steel-50 text-2xs uppercase tracking-wide text-steel-400">
                    <tr>
                      <th className="px-4 py-2.5 text-left font-semibold">Kỳ</th>
                      <th className="px-4 py-2.5 font-semibold">Gốc</th>
                      <th className="px-4 py-2.5 font-semibold">Lãi</th>
                      <th className="px-4 py-2.5 font-semibold">Tổng trả</th>
                      <th className="px-4 py-2.5 font-semibold">Dư nợ</th>
                    </tr>
                  </thead>
                  <tbody className="num divide-y divide-steel-100">
                    {kq.rows.slice(0, 120).map((r) => (
                      <tr key={r.ky} className={r.ky === (thangUuDai || 0) + 1 ? "bg-signal-light" : ""}>
                        <td className="px-4 py-2 text-left text-steel-500">{r.ky}</td>
                        <td className="px-4 py-2 text-steel-600">{dinhDangDong(r.goc)}</td>
                        <td className="px-4 py-2 text-steel-600">{dinhDangDong(r.lai)}</td>
                        <td className="px-4 py-2 font-semibold text-steel">{dinhDangDong(r.tong)}</td>
                        <td className="px-4 py-2 text-steel-400">{dinhDangDong(Math.max(0, r.du_no))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        <Link
          href={`/dang-ky?so_tien=${soTien}&thoi_han=${thoiHan}`}
          className="btn-primary w-full sm:w-auto"
        >
          Xem gói vay phù hợp với {dinhDangTien(soTien)}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <p className="text-xs leading-relaxed text-steel-400">
          Kết quả mang tính tham khảo, chưa bao gồm phí bảo hiểm khoản vay, phí công chứng và phí đăng
          ký giao dịch bảo đảm.
        </p>
      </div>
    </div>
  );
}
