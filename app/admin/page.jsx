import Link from "next/link";
import { ArrowRight, TrendingUp, Users, CheckCircle2, Percent } from "lucide-react";
import FunnelChart from "@/components/admin-charts";
import { layDanhSach } from "@/lib/store";
import { TRANG_THAI, bankById } from "@/lib/data";
import { dinhDangTien } from "@/lib/format";

export const dynamic = "force-dynamic";

const CHI_SO = [
  { label: "Lead trong tháng", value: "1.100", delta: "+7,4%", icon: Users },
  { label: "Đã chuyển ngân hàng", value: "412", delta: "+11,2%", icon: ArrowRight },
  { label: "Đã giải ngân", value: "86", delta: "+9,8%", icon: CheckCircle2 },
  { label: "Tỷ lệ chuyển đổi", value: "7,8%", delta: "+0,4đ", icon: Percent },
];

export default function AdminDashboard() {
  const leads = layDanhSach();
  const moi = leads.filter((l) => l.trang_thai === "moi");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-steel">Tổng quan</h1>
          <p className="mt-1 text-sm text-steel-500">Số liệu tháng 7/2026 · cập nhật theo thời gian thực</p>
        </div>
        <Link href="/admin/leads" className="btn-dark px-4 py-2.5 text-[13px]">
          Mở danh sách lead <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {CHI_SO.map((c) => (
          <div key={c.label} className="card p-4">
            <div className="flex items-start justify-between">
              <p className="text-2xs font-semibold uppercase tracking-eyebrow text-steel-400">{c.label}</p>
              <c.icon size={16} className="text-steel-300" aria-hidden="true" />
            </div>
            <p className="num mt-2.5 text-2xl font-bold leading-none text-steel">{c.value}</p>
            <p className="num mt-2 flex items-center gap-1 text-xs font-semibold text-brand">
              <TrendingUp size={12} aria-hidden="true" /> {c.delta} so với tháng trước
            </p>
          </div>
        ))}
      </div>

      <FunnelChart />

      <div className="card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-steel-200 px-5 py-3.5">
          <div>
            <p className="text-sm font-bold text-steel">Lead mới chưa phân công</p>
            <p className="num mt-0.5 text-xs text-steel-400">{moi.length} hồ sơ đang chờ</p>
          </div>
          <Link href="/admin/leads" className="text-xs font-semibold text-brand hover:text-brand-dark">
            Xem tất cả →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-steel-50 text-2xs uppercase tracking-eyebrow text-steel-400">
              <tr>
                <th scope="col" className="px-5 py-2.5 text-left font-semibold">Mã</th>
                <th scope="col" className="px-5 py-2.5 text-left font-semibold">Khách hàng</th>
                <th scope="col" className="px-5 py-2.5 text-left font-semibold">Nhu cầu</th>
                <th scope="col" className="px-5 py-2.5 text-left font-semibold">Khu vực</th>
                <th scope="col" className="px-5 py-2.5 text-left font-semibold">Trạng thái</th>
                <th scope="col" className="px-5 py-2.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-steel-100">
              {leads.slice(0, 6).map((l) => (
                <tr key={l.id} className="hover:bg-steel-50/60">
                  <td className="num px-5 py-3 font-semibold text-steel">{l.id}</td>
                  <td className="px-5 py-3">
                    <p className="font-medium text-steel">{l.ho_ten}</p>
                    <p className="num text-2xs text-steel-400">{l.dien_thoai}</p>
                  </td>
                  <td className="num px-5 py-3 text-steel-600">
                    {l.loai === "the-chap" ? "Thế chấp" : "Tín chấp"} · {dinhDangTien(l.so_tien)}
                  </td>
                  <td className="px-5 py-3 text-steel-600">{l.tinh}</td>
                  <td className="px-5 py-3">
                    <span className={`chip ${TRANG_THAI[l.trang_thai]?.mau}`}>
                      {TRANG_THAI[l.trang_thai]?.label}
                    </span>
                    {l.ngan_hang && (
                      <span className="ml-2 text-2xs text-steel-400">{bankById(l.ngan_hang)?.short}</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link href={`/admin/leads/${l.id}`} className="text-xs font-semibold text-brand hover:text-brand-dark">
                      Mở
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
