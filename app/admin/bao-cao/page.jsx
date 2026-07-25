import { banks, bieu_do_nguon, products } from "@/lib/data";
import { dinhDangSo } from "@/lib/format";

export const metadata = { title: "Báo cáo | Quản trị M-Broker" };

const doanhThu = banks.slice(0, 8).map((b, i) => {
  const lead = 180 - i * 17;
  const giai_ngan = Math.round(lead * (0.09 - i * 0.004));
  return { ...b, lead, giai_ngan, phi: giai_ngan * (12 + i) };
});

export default function BaoCao() {
  const tongLead = doanhThu.reduce((s, d) => s + d.lead, 0);
  const tongGiaiNgan = doanhThu.reduce((s, d) => s + d.giai_ngan, 0);
  const tongPhi = doanhThu.reduce((s, d) => s + d.phi, 0);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-steel">Báo cáo</h1>
        <p className="mt-1 text-sm text-steel-500">Đối soát theo ngân hàng và theo nguồn · tháng 7/2026</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Lead đã chuyển", value: dinhDangSo(tongLead) },
          { label: "Khoản đã giải ngân", value: dinhDangSo(tongGiaiNgan) },
          { label: "Phí giới thiệu ước tính", value: `${dinhDangSo(tongPhi)} triệu` },
        ].map((c) => (
          <div key={c.label} className="card p-4">
            <p className="text-2xs font-semibold uppercase tracking-eyebrow text-steel-400">{c.label}</p>
            <p className="num mt-2 text-2xl font-bold leading-none text-steel">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="border-b border-steel-200 px-5 py-3.5">
          <p className="text-sm font-bold text-steel">Đối soát theo ngân hàng</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-sm">
            <thead className="bg-steel-50 text-2xs uppercase tracking-eyebrow text-steel-400">
              <tr>
                <th scope="col" className="px-5 py-2.5 text-left font-semibold">Ngân hàng</th>
                <th scope="col" className="px-5 py-2.5 text-right font-semibold">Lead chuyển</th>
                <th scope="col" className="px-5 py-2.5 text-right font-semibold">Giải ngân</th>
                <th scope="col" className="px-5 py-2.5 text-right font-semibold">Tỷ lệ</th>
                <th scope="col" className="px-5 py-2.5 text-right font-semibold">Phí ước tính</th>
              </tr>
            </thead>
            <tbody className="num divide-y divide-steel-100">
              {doanhThu.map((d) => (
                <tr key={d.id} className="hover:bg-steel-50/60">
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-2.5">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} aria-hidden="true" />
                      <span className="font-medium text-steel">{d.name}</span>
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right text-steel-600">{d.lead}</td>
                  <td className="px-5 py-3 text-right text-steel-600">{d.giai_ngan}</td>
                  <td className="px-5 py-3 text-right font-semibold text-brand">
                    {((d.giai_ngan / d.lead) * 100).toFixed(1).replace(".", ",")}%
                  </td>
                  <td className="px-5 py-3 text-right font-semibold text-steel">{d.phi} triệu</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="border-b border-steel-200 px-5 py-3.5">
          <p className="text-sm font-bold text-steel">Hiệu quả theo nguồn</p>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-steel-50 text-2xs uppercase tracking-eyebrow text-steel-400">
            <tr>
              <th scope="col" className="px-5 py-2.5 text-left font-semibold">Nguồn</th>
              <th scope="col" className="px-5 py-2.5 text-right font-semibold">Lead</th>
              <th scope="col" className="px-5 py-2.5 text-right font-semibold">Giải ngân</th>
              <th scope="col" className="px-5 py-2.5 text-right font-semibold">Tỷ lệ</th>
            </tr>
          </thead>
          <tbody className="num divide-y divide-steel-100">
            {bieu_do_nguon.map((n) => (
              <tr key={n.nguon} className="hover:bg-steel-50/60">
                <td className="px-5 py-3 font-medium text-steel">{n.nguon}</td>
                <td className="px-5 py-3 text-right text-steel-600">{n.lead}</td>
                <td className="px-5 py-3 text-right text-steel-600">{n.giai_ngan}</td>
                <td className="px-5 py-3 text-right font-semibold text-brand">
                  {((n.giai_ngan / n.lead) * 100).toFixed(1).replace(".", ",")}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs leading-relaxed text-steel-400">
        Số liệu trong bản demo là giả lập. Trong hệ thống thật, cột giải ngân phải được đối chiếu với
        xác nhận từ ngân hàng — đây là chỗ hay phát sinh tranh chấp nhất khi tính phí giới thiệu.
      </p>
    </div>
  );
}
