import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { products, banks, bankById, CAP_NHAT } from "@/lib/data";
import { dinhDangPhanTram, dinhDangTien, dinhDangThoiHan } from "@/lib/format";
import { BankMark } from "@/components/ui";

export const metadata = { title: "Ngân hàng và gói vay | Quản trị M-Broker" };

export default function QuanLySanPham() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-steel">Ngân hàng và gói vay</h1>
          <p className="num mt-1 text-sm text-steel-500">
            {products.length} gói · {banks.length} ngân hàng · cập nhật {CAP_NHAT}
          </p>
        </div>
        <button type="button" className="btn-primary px-4 py-2.5 text-[13px]">
          <Plus size={14} aria-hidden="true" /> Thêm gói vay
        </button>
      </div>

      <div className="card p-4">
        <p className="eyebrow">Ngân hàng đối tác</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {banks.map((b) => (
            <span key={b.id} className="flex items-center gap-2 rounded-lg bg-steel-50 px-2.5 py-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: b.color }} aria-hidden="true" />
              <span className="text-xs font-medium text-steel-600">{b.name}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-steel-50 text-2xs uppercase tracking-eyebrow text-steel-400">
              <tr>
                <th scope="col" className="px-4 py-2.5 text-left font-semibold">Gói vay</th>
                <th scope="col" className="px-4 py-2.5 text-left font-semibold">Loại</th>
                <th scope="col" className="px-4 py-2.5 text-right font-semibold">Ưu đãi</th>
                <th scope="col" className="px-4 py-2.5 text-right font-semibold">Kỳ ưu đãi</th>
                <th scope="col" className="px-4 py-2.5 text-right font-semibold">Biên độ</th>
                <th scope="col" className="px-4 py-2.5 text-right font-semibold">Hạn mức</th>
                <th scope="col" className="px-4 py-2.5 text-right font-semibold">Thời hạn</th>
                <th scope="col" className="px-4 py-2.5 text-center font-semibold">Hiển thị</th>
                <th scope="col" className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-steel-100">
              {products.map((p) => {
                const bank = bankById(p.bankId);
                return (
                  <tr key={p.slug} className="hover:bg-steel-50/60">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <BankMark bank={bank} size={34} />
                        <div className="min-w-0">
                          <p className="font-medium text-steel">{bank.name}</p>
                          <p className="truncate text-2xs text-steel-400">{p.ten}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-steel-600">
                      {p.loai === "the-chap" ? "Thế chấp" : "Tín chấp"}
                    </td>
                    <td className="num px-4 py-3 text-right font-semibold text-brand">
                      {dinhDangPhanTram(p.lai_suat_uu_dai)}
                    </td>
                    <td className="num px-4 py-3 text-right text-steel-600">
                      {p.thang_uu_dai ? `${p.thang_uu_dai} tháng` : "—"}
                    </td>
                    <td className="num px-4 py-3 text-right text-steel-600">
                      {p.bien_do ? `+${dinhDangPhanTram(p.bien_do)}` : "—"}
                    </td>
                    <td className="num px-4 py-3 text-right text-steel-600">{dinhDangTien(p.han_muc_max)}</td>
                    <td className="num px-4 py-3 text-right text-steel-600">{dinhDangThoiHan(p.thoi_han_max)}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="chip bg-brand-light text-brand-dark">Bật</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/goi-vay/${p.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:text-brand-dark"
                      >
                        <Pencil size={12} aria-hidden="true" /> Sửa
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs leading-relaxed text-steel-400">
        Đây là nguồn dữ liệu nuôi trang so sánh, trang chi tiết gói vay và thuật toán gợi ý ở màn kết
        quả sơ bộ. Trong bản demo, dữ liệu đọc từ tệp lib/data.js và chưa có chức năng ghi.
      </p>
    </div>
  );
}
