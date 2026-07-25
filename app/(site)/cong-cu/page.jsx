import Link from "next/link";
import { Calculator, Wallet, Home, ArrowRight } from "lucide-react";
import { Section, SectionHead } from "@/components/ui";

export const metadata = { title: "Công cụ tính khoản vay | M-Broker" };

const congCu = [
  {
    href: "/cong-cu/tinh-khoan-vay",
    icon: Calculator,
    ten: "Tính lịch trả nợ",
    mo_ta: "Xem khoản trả từng tháng theo dư nợ giảm dần hoặc trả đều, gồm cả giai đoạn lãi suất thả nổi.",
    san_sang: true,
  },
  {
    href: "/cong-cu/tinh-khoan-vay",
    icon: Wallet,
    ten: "Tính hạn mức vay tối đa",
    mo_ta: "Nhập thu nhập để biết ngân hàng có thể duyệt tối đa bao nhiêu theo quy tắc 40% thu nhập.",
    san_sang: false,
  },
  {
    href: "/cong-cu/tinh-khoan-vay",
    icon: Home,
    ten: "So sánh mua nhà và thuê nhà",
    mo_ta: "Đối chiếu tổng chi phí sở hữu và chi phí thuê trong cùng một khoảng thời gian.",
    san_sang: false,
  },
];

export default function CongCu() {
  return (
    <Section className="bg-steel-50">
      <SectionHead
        eyebrow="Công cụ"
        title="Tính trước, quyết định sau"
        desc="Các công cụ chạy hoàn toàn trên trình duyệt của bạn. Không có dữ liệu nào được gửi đi khi bạn chỉ tính toán."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {congCu.map((c) => (
          <Link key={c.ten} href={c.href} className="card group p-6 transition hover:border-brand">
            <c.icon size={24} className="text-brand" aria-hidden="true" />
            <h2 className="mt-4 text-[17px] font-bold text-steel group-hover:text-brand">{c.ten}</h2>
            <p className="mt-2 text-sm leading-relaxed text-steel-500">{c.mo_ta}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-steel-600 group-hover:text-brand">
              {c.san_sang ? "Mở công cụ" : "Sắp ra mắt"}
              <ArrowRight size={14} aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
