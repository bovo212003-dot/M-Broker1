import Link from "next/link";
import { Lock } from "lucide-react";
import Logo from "@/components/logo";

export const metadata = { title: "Đăng nhập quản trị | M-Broker" };

export default function DangNhap() {
  return (
    <div className="mx-auto max-w-sm py-10">
      <div className="card p-6 sm:p-8">
        <Logo size={40} />
        <h1 className="mt-5 text-xl font-bold text-steel">Đăng nhập hệ thống quản trị</h1>
        <p className="mt-1.5 text-sm text-steel-500">Dành cho nhân viên M-Broker.</p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="text-[13px] font-medium text-steel-600">Email công ty</label>
            <input id="email" type="email" className="field mt-2" placeholder="ten@m-broker.vn" />
          </div>
          <div>
            <label htmlFor="mk" className="text-[13px] font-medium text-steel-600">Mật khẩu</label>
            <input id="mk" type="password" className="field mt-2" placeholder="••••••••" />
          </div>
          <div>
            <label htmlFor="otp" className="text-[13px] font-medium text-steel-600">Mã xác thực hai lớp</label>
            <input id="otp" inputMode="numeric" maxLength={6} className="field num mt-2 text-center tracking-[0.4em]" placeholder="000000" />
          </div>
        </div>

        <Link href="/admin" className="btn-primary mt-6 w-full">
          <Lock size={15} aria-hidden="true" /> Đăng nhập
        </Link>

        <p className="mt-4 text-xs leading-relaxed text-steel-400">
          Hệ thống chứa dữ liệu tài chính cá nhân nên xác thực hai lớp là bắt buộc. Bản demo không kiểm
          tra thông tin đăng nhập.
        </p>
      </div>
    </div>
  );
}
