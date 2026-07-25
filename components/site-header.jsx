"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import Logo from "./logo";

const nav = [
  { href: "/vay-the-chap", label: "Vay thế chấp" },
  { href: "/vay-tin-chap", label: "Vay tín chấp" },
  { href: "/so-sanh", label: "So sánh lãi suất" },
  { href: "/cong-cu", label: "Công cụ" },
  { href: "/kien-thuc", label: "Kiến thức" },
];

export default function SiteHeader() {
  const [mo, setMo] = useState(false);
  const path = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-steel-200 bg-white/95 backdrop-blur">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="M-Broker, về trang chủ">
          <Logo size={34} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Điều hướng chính">
          {nav.map((n) => {
            const active = path === n.href || path.startsWith(n.href + "/");
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active ? "bg-brand-light text-brand-dark" : "text-steel-600 hover:bg-steel-50 hover:text-steel"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:19001234"
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-steel-600 hover:text-brand sm:flex"
          >
            <Phone size={15} aria-hidden="true" />
            <span className="num">1900 1234</span>
          </a>
          <Link href="/dang-ky" className="btn-primary px-4 py-2.5 text-[13px]">
            Nhận tư vấn
          </Link>
          <button
            type="button"
            onClick={() => setMo((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-steel-200 lg:hidden"
            aria-label={mo ? "Đóng menu" : "Mở menu"}
            aria-expanded={mo}
          >
            {mo ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mo && (
        <nav className="border-t border-steel-200 bg-white px-5 py-3 lg:hidden" aria-label="Điều hướng di động">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setMo(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-steel-600 hover:bg-steel-50"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/tra-cuu"
            onClick={() => setMo(false)}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-steel-600 hover:bg-steel-50"
          >
            Tra cứu hồ sơ
          </Link>
        </nav>
      )}
    </header>
  );
}
