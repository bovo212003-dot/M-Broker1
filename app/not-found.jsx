import Link from "next/link";

const goiY = [
  { href: "/vay-the-chap", label: "Vay thế chấp" },
  { href: "/vay-tin-chap", label: "Vay tín chấp" },
  { href: "/so-sanh", label: "So sánh lãi suất" },
  { href: "/cong-cu/tinh-khoan-vay", label: "Tính lịch trả nợ" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-steel-50 px-5">
      <div className="w-full max-w-lg text-center">
        <p className="num text-5xl font-bold text-brand">404</p>
        <h1 className="mt-4 text-2xl font-bold text-steel">Không tìm thấy trang này</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-steel-500">
          Đường dẫn có thể đã thay đổi. Dưới đây là những trang được xem nhiều nhất.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-2">
          {goiY.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="rounded-lg bg-white px-4 py-2.5 text-[13px] font-semibold text-steel-600 ring-1 ring-steel-200 transition hover:text-brand hover:ring-brand"
            >
              {g.label}
            </Link>
          ))}
        </div>
        <Link href="/" className="btn-primary mt-6">Về trang chủ</Link>
      </div>
    </div>
  );
}
