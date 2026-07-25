import Link from "next/link";
import { CAP_NHAT } from "@/lib/data";
import Logo from "./logo";

const cot = [
  {
    tieu_de: "Sản phẩm vay",
    links: [
      { href: "/vay-the-chap", label: "Vay thế chấp" },
      { href: "/vay-tin-chap", label: "Vay tín chấp" },
      { href: "/so-sanh", label: "So sánh lãi suất" },
    ],
  },
  {
    tieu_de: "Công cụ",
    links: [
      { href: "/cong-cu/tinh-khoan-vay", label: "Tính lịch trả nợ" },
      { href: "/cong-cu", label: "Tất cả công cụ" },
      { href: "/tra-cuu", label: "Tra cứu hồ sơ" },
    ],
  },
  {
    tieu_de: "Về M-Broker",
    links: [
      { href: "/ve-chung-toi", label: "Giới thiệu" },
      { href: "/kien-thuc", label: "Kiến thức vay vốn" },
      { href: "/lien-he", label: "Liên hệ" },
      { href: "/admin", label: "Trang quản trị (demo)" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-steel-200 bg-white">
      <div className="shell py-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo size={36} />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-steel-500">
              Nền tảng so sánh và kết nối vay vốn. Chúng tôi nhận phí giới thiệu từ tổ chức tín dụng
              và không thu bất kỳ khoản nào từ người vay.
            </p>
            <div className="mt-5 rounded-lg bg-brand-light px-4 py-3">
              <p className="text-xs font-semibold text-brand-dark">
                M-Broker không phải tổ chức tín dụng và không trực tiếp cho vay.
              </p>
            </div>
          </div>

          {cot.map((c) => (
            <div key={c.tieu_de}>
              <p className="eyebrow">{c.tieu_de}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-steel-500 transition hover:text-brand">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-steel-200 pt-6">
          <p className="text-xs leading-relaxed text-steel-400">
            <span className="font-semibold text-steel-500">Công bố quảng cáo.</span> Các tổ chức tín dụng
            xuất hiện trên M-Broker trả phí giới thiệu cho chúng tôi. Điều này ảnh hưởng đến thứ tự và
            vị trí hiển thị của sản phẩm, nhưng không ảnh hưởng đến nội dung đánh giá và phân tích của
            đội ngũ biên tập. Chúng tôi không hiển thị toàn bộ sản phẩm có trên thị trường.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-steel-400">
            Lãi suất và điều kiện được cập nhật thủ công ngày <span className="num">{CAP_NHAT}</span> và
            chỉ mang tính tham khảo. Lãi suất, hạn mức và thời hạn chính thức do tổ chức tín dụng quyết
            định sau khi thẩm định hồ sơ.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-steel-200 pt-6">
            <p className="text-xs text-steel-400">
              © 2026 M-Broker. Dự án demo giao diện — dữ liệu là giả lập.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-steel-400">
              <Link href="/phap-ly/bao-mat" className="hover:text-brand">Chính sách bảo mật</Link>
              <Link href="/phap-ly/dieu-khoan" className="hover:text-brand">Điều khoản sử dụng</Link>
              <Link href="/phap-ly/xoa-du-lieu" className="hover:text-brand">Yêu cầu xóa dữ liệu</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
