import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";
import { products, bankById } from "@/lib/data";
import { dinhDangDong, dinhDangPhanTram, dinhDangTien, dinhDangThoiHan } from "@/lib/format";
import { lichTraNo } from "@/lib/loan";
import { BankMark, Rating } from "@/components/ui";

export const metadata = { title: "So sánh song song gói vay | M-Broker" };

const HANG = [
  { key: "lai_suat_uu_dai", nhan: "Lãi suất ưu đãi", fmt: (p) => dinhDangPhanTram(p.lai_suat_uu_dai), nhan_manh: true },
  { key: "thang_uu_dai", nhan: "Thời gian ưu đãi", fmt: (p) => (p.thang_uu_dai ? `${p.thang_uu_dai} tháng` : "Cố định toàn kỳ") },
  { key: "sau", nhan: "Lãi suất sau ưu đãi", fmt: (p) => dinhDangPhanTram(p.lai_suat_co_so + p.bien_do) },
  { key: "han_muc_max", nhan: "Hạn mức tối đa", fmt: (p) => dinhDangTien(p.han_muc_max) },
  { key: "thoi_han_max", nhan: "Thời hạn tối đa", fmt: (p) => dinhDangThoiHan(p.thoi_han_max) },
  { key: "ltv", nhan: "Tỷ lệ vay tối đa", fmt: (p) => (p.ltv ? `${p.ltv}%` : "Không áp dụng") },
  { key: "thu_nhap_min", nhan: "Thu nhập tối thiểu", fmt: (p) => `${p.thu_nhap_min} triệu/tháng` },
  { key: "giai_ngan_ngay", nhan: "Thời gian giải ngân", fmt: (p) => `${p.giai_ngan_ngay} ngày` },
  { key: "phi_tra_truoc_han", nhan: "Phí trả nợ trước hạn", fmt: (p) => p.phi_tra_truoc_han },
  { key: "phi_tham_dinh", nhan: "Phí thẩm định", fmt: (p) => p.phi_tham_dinh },
];

export default function SoSanhChiTiet({ searchParams }) {
  const slugs = (searchParams?.goi || "").split(",").filter(Boolean).slice(0, 3);
  const chon = slugs.map((s) => products.find((p) => p.slug === s)).filter(Boolean);

  if (chon.length === 0) {
    return (
      <div className="shell py-24 text-center">
        <h1 className="text-2xl font-bold text-steel">Chưa chọn gói nào để so sánh</h1>
        <p className="mt-3 text-sm text-steel-500">
          Quay lại bảng so sánh và tick tối đa 3 gói bạn quan tâm.
        </p>
        <Link href="/so-sanh" className="btn-primary mt-6">Về bảng so sánh</Link>
      </div>
    );
  }

  const soTien = 2000;
  const thoiHan = 240;
  const tinh = chon.map((p) => ({
    ...p,
    kq: lichTraNo({
      goc_trieu: Math.min(soTien, p.han_muc_max),
      thang: Math.min(thoiHan, p.thoi_han_max),
      lai_uu_dai: p.lai_suat_uu_dai,
      thang_uu_dai: p.thang_uu_dai,
      lai_sau_uu_dai: p.lai_suat_co_so + p.bien_do,
    }),
  }));
  const laiThapNhat = Math.min(...tinh.map((p) => p.kq.tong_lai));

  return (
    <div className="shell py-10">
      <Link href="/so-sanh" className="inline-flex items-center gap-2 text-sm font-semibold text-steel-500 hover:text-brand">
        <ArrowLeft size={15} aria-hidden="true" /> Về bảng so sánh
      </Link>

      <h1 className="mt-5 text-2xl font-bold tracking-tight text-steel sm:text-3xl">
        So sánh <span className="num">{chon.length}</span> gói vay bạn đã chọn
      </h1>
      <p className="num mt-2 text-sm text-steel-500">
        Giả định khoản vay {dinhDangTien(soTien)} trong {thoiHan / 12} năm, trả theo dư nợ giảm dần.
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[640px] border-separate border-spacing-0">
          <thead>
            <tr>
              <th scope="col" className="w-44 border-b border-steel-200 p-3 text-left" />
              {tinh.map((p) => {
                const bank = bankById(p.bankId);
                const tot_nhat = p.kq.tong_lai === laiThapNhat;
                return (
                  <th
                    key={p.slug}
                    scope="col"
                    className={`border-b border-steel-200 p-4 text-left align-top ${
                      tot_nhat ? "rounded-t-card border-2 border-b-0 border-brand bg-brand-light" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <BankMark bank={bank} size={40} />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-steel">{bank.name}</p>
                        <p className="truncate text-xs font-normal text-steel-400">{p.ten}</p>
                      </div>
                    </div>
                    <div className="mt-2"><Rating value={p.diem} /></div>
                    {tot_nhat && (
                      <span className="chip mt-2 bg-brand text-white">Tổng lãi thấp nhất</span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {HANG.map((h) => (
              <tr key={h.key}>
                <th scope="row" className="border-b border-steel-100 p-3 text-left text-xs font-semibold text-steel-500">
                  {h.nhan}
                </th>
                {tinh.map((p) => (
                  <td
                    key={p.slug}
                    className={`num border-b border-steel-100 p-3 text-sm ${
                      h.nhan_manh ? "text-base font-bold text-brand" : "text-steel-600"
                    }`}
                  >
                    {h.fmt(p)}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th scope="row" className="border-b border-steel-100 bg-steel-50 p-3 text-left text-xs font-semibold text-steel-500">
                Trả tháng đầu
              </th>
              {tinh.map((p) => (
                <td key={p.slug} className="num border-b border-steel-100 bg-steel-50 p-3 text-sm font-semibold text-steel">
                  {dinhDangDong(p.kq.thang_dau)}
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="border-b border-steel-100 bg-steel-50 p-3 text-left text-xs font-semibold text-steel-500">
                Tổng lãi phải trả
              </th>
              {tinh.map((p) => (
                <td
                  key={p.slug}
                  className={`num border-b border-steel-100 bg-steel-50 p-3 text-base font-bold ${
                    p.kq.tong_lai === laiThapNhat ? "text-brand" : "text-alert"
                  }`}
                >
                  {dinhDangDong(p.kq.tong_lai)}
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="p-3 text-left align-top text-xs font-semibold text-steel-500">
                Ưu và nhược điểm
              </th>
              {tinh.map((p) => (
                <td key={p.slug} className="p-3 align-top">
                  <ul className="space-y-1.5">
                    {p.uu_diem.map((u) => (
                      <li key={u} className="flex items-start gap-2 text-xs leading-snug text-steel-600">
                        <Check size={13} className="mt-0.5 flex-none text-brand" aria-hidden="true" />
                        {u}
                      </li>
                    ))}
                    {p.nhuoc_diem.map((n) => (
                      <li key={n} className="flex items-start gap-2 text-xs leading-snug text-steel-400">
                        <X size={13} className="mt-0.5 flex-none text-alert" aria-hidden="true" />
                        {n}
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3" />
              {tinh.map((p) => (
                <td key={p.slug} className="p-3">
                  <Link href={`/dang-ky?goi=${p.slug}`} className="btn-primary w-full py-2.5 text-[13px]">
                    Đăng ký gói này
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-6 max-w-3xl text-xs leading-relaxed text-steel-400">
        Tổng lãi được tính theo phương thức dư nợ giảm dần, áp dụng lãi suất ưu đãi trong kỳ đầu và
        lãi suất thả nổi ước tính cho phần còn lại. Lãi suất thả nổi thực tế thay đổi theo lãi suất
        cơ sở của từng ngân hàng nên số liệu chỉ mang tính so sánh tương đối.
      </p>
    </div>
  );
}
