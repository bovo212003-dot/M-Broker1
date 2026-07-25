"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Package, BarChart3, ShieldCheck } from "lucide-react";

const muc = [
  { href: "/admin", label: "Tổng quan", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Danh sách lead", icon: Users },
  { href: "/admin/san-pham", label: "Ngân hàng & gói vay", icon: Package },
  { href: "/admin/bao-cao", label: "Báo cáo", icon: BarChart3 },
  { href: "/admin/nhat-ky", label: "Nhật ký đồng ý", icon: ShieldCheck },
];

export default function AdminNav() {
  const path = usePathname();
  return (
    <nav
      className="hidden w-56 flex-none border-r border-steel-200 bg-white p-3 md:block"
      aria-label="Điều hướng quản trị"
    >
      <ul className="space-y-1">
        {muc.map((m) => {
          const active = m.href === "/admin" ? path === "/admin" : path.startsWith(m.href);
          return (
            <li key={m.href}>
              <Link
                href={m.href}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium transition ${
                  active ? "bg-brand-light text-brand-dark" : "text-steel-500 hover:bg-steel-50 hover:text-steel"
                }`}
              >
                <m.icon size={16} aria-hidden="true" />
                {m.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 rounded-lg bg-steel-50 p-3">
        <p className="text-2xs font-semibold uppercase tracking-eyebrow text-steel-400">Bản demo</p>
        <p className="mt-1.5 text-xs leading-relaxed text-steel-500">
          Dữ liệu lưu trong bộ nhớ máy chủ và sẽ mất khi khởi động lại.
        </p>
      </div>
    </nav>
  );
}
