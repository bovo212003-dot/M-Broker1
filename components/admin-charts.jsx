"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line, Legend,
} from "recharts";
import { bieu_do_pheu, bieu_do_nguon, bieu_do_thang } from "@/lib/data";

const truc = { fontSize: 11, fill: "#6E7C8C" };
const hopThoai = {
  borderRadius: 10,
  border: "1px solid #D5DCE4",
  fontSize: 12,
  fontFamily: "var(--font-sans)",
};

export default function FunnelChart() {
  const dinh = bieu_do_pheu[0].so_nguoi;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card p-5">
        <p className="text-sm font-bold text-steel">Rơi rụng theo từng bước của biểu mẫu</p>
        <p className="mt-1 text-xs leading-relaxed text-steel-400">
          Bước 3 mất nhiều người nhất — đây là chỗ cần thử rút gọn câu hỏi trước tiên.
        </p>
        <div className="mt-5 space-y-3">
          {bieu_do_pheu.map((b, i) => {
            const ty_le = (b.so_nguoi / dinh) * 100;
            const roi = i > 0 ? ((bieu_do_pheu[i - 1].so_nguoi - b.so_nguoi) / bieu_do_pheu[i - 1].so_nguoi) * 100 : 0;
            return (
              <div key={b.buoc}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-xs font-medium text-steel-600">{b.buoc}</span>
                  <span className="num text-xs text-steel-400">
                    {b.so_nguoi.toLocaleString("vi-VN")}
                    {i > 0 && <span className="ml-2 font-semibold text-alert">-{Math.round(roi)}%</span>}
                  </span>
                </div>
                <div className="mt-1.5 h-6 overflow-hidden rounded-md bg-steel-100">
                  <div
                    className="flex h-full items-center justify-end rounded-md bg-brand px-2"
                    style={{ width: `${ty_le}%` }}
                  >
                    <span className="num text-2xs font-bold text-white">{Math.round(ty_le)}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card p-5">
        <p className="text-sm font-bold text-steel">Lead và khoản giải ngân theo tháng</p>
        <div className="mt-5 h-[232px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={bieu_do_thang} margin={{ top: 4, right: 8, bottom: 0, left: -18 }}>
              <CartesianGrid strokeDasharray="2 4" stroke="#E8ECF1" vertical={false} />
              <XAxis dataKey="thang" tick={truc} tickLine={false} axisLine={false} />
              <YAxis yAxisId="l" tick={truc} tickLine={false} axisLine={false} />
              <YAxis yAxisId="r" orientation="right" tick={truc} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={hopThoai} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line yAxisId="l" type="monotone" dataKey="lead" name="Lead" stroke="#2E6DB4" strokeWidth={2} dot={false} />
              <Line yAxisId="r" type="monotone" dataKey="giai_ngan" name="Giải ngân" stroke="#E09B2D" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card p-5 lg:col-span-2">
        <p className="text-sm font-bold text-steel">Hiệu quả theo nguồn traffic</p>
        <div className="mt-5 h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bieu_do_nguon} margin={{ top: 4, right: 8, bottom: 0, left: -18 }}>
              <CartesianGrid strokeDasharray="2 4" stroke="#E8ECF1" vertical={false} />
              <XAxis dataKey="nguon" tick={truc} tickLine={false} axisLine={false} />
              <YAxis tick={truc} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={hopThoai} cursor={{ fill: "#F2F5F7" }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="lead" name="Lead" fill="#2E6DB4" radius={[4, 4, 0, 0]} maxBarSize={44} />
              <Bar dataKey="giai_ngan" name="Giải ngân" fill="#E09B2D" radius={[4, 4, 0, 0]} maxBarSize={44} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
