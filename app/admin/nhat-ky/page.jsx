import { ShieldCheck } from "lucide-react";
import { layDanhSach } from "@/lib/store";
import { bankById } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata = { title: "Nhật ký đồng ý | Quản trị M-Broker" };

const PHIEN_BAN = "v2.1 (01/07/2026)";

export default function NhatKy() {
  const leads = layDanhSach();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-steel">Nhật ký đồng ý và truy cập</h1>
        <p className="mt-1 text-sm text-steel-500">
          Lưu vết ai đồng ý điều gì, lúc nào, và hồ sơ đã được chuyển đi đâu.
        </p>
      </div>

      <div className="rounded-card border border-brand/25 bg-brand-light p-5">
        <p className="flex items-center gap-2 text-sm font-bold text-brand-dark">
          <ShieldCheck size={16} aria-hidden="true" /> Vì sao màn hình này tồn tại
        </p>
        <p className="mt-2 text-sm leading-relaxed text-steel-600">
          Khi khách hàng khiếu nại rằng một ngân hàng có số điện thoại của họ, đây là bằng chứng duy
          nhất bảo vệ doanh nghiệp. Nhật ký cần ghi thời điểm đồng ý, địa chỉ IP, phiên bản điều khoản
          đã hiển thị, và mọi lần nhân viên mở hồ sơ.
        </p>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead className="bg-steel-50 text-2xs uppercase tracking-eyebrow text-steel-400">
              <tr>
                <th scope="col" className="px-4 py-2.5 text-left font-semibold">Hồ sơ</th>
                <th scope="col" className="px-4 py-2.5 text-left font-semibold">Thời điểm đồng ý</th>
                <th scope="col" className="px-4 py-2.5 text-center font-semibold">Xử lý hồ sơ</th>
                <th scope="col" className="px-4 py-2.5 text-center font-semibold">Chuyển bên thứ ba</th>
                <th scope="col" className="px-4 py-2.5 text-center font-semibold">Nhận tiếp thị</th>
                <th scope="col" className="px-4 py-2.5 text-left font-semibold">Đã chuyển tới</th>
                <th scope="col" className="px-4 py-2.5 text-left font-semibold">Người xem gần nhất</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel-100">
              {leads.map((l, i) => (
                <tr key={l.id} className="hover:bg-steel-50/60">
                  <td className="px-4 py-3">
                    <p className="num font-semibold text-steel">{l.id}</p>
                    <p className="text-2xs text-steel-400">{l.ho_ten}</p>
                  </td>
                  <td className="num px-4 py-3 text-steel-600">
                    <p>{l.tao_luc}</p>
                    <p className="text-2xs text-steel-400">
                      IP 113.161.{40 + i}.{12 + i * 3} · {PHIEN_BAN}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="chip bg-brand-light text-brand-dark">Có</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="chip bg-brand-light text-brand-dark">Có</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`chip ${i % 3 === 0 ? "bg-steel-100 text-steel-500" : "bg-brand-light text-brand-dark"}`}>
                      {i % 3 === 0 ? "Không" : "Có"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-steel-600">
                    {l.ngan_hang ? bankById(l.ngan_hang)?.name : <span className="text-2xs text-steel-400">Chưa chuyển</span>}
                  </td>
                  <td className="px-4 py-3 text-steel-600">
                    {l.phu_trach || <span className="text-2xs text-steel-400">Chưa ai mở</span>}
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
