import Link from "next/link";
import AdminNav from "@/components/admin-nav";
import Logo from "@/components/logo";

export const metadata = { title: "Quản trị | M-Broker" };

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-steel-50">
      <header className="sticky top-0 z-40 border-b border-steel-200 bg-white">
        <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Logo size={30} />
            </Link>
            <span className="chip bg-steel-100 text-steel-500">Quản trị</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs font-semibold text-steel-400 hover:text-brand">
              Xem trang công khai
            </Link>
            <div className="flex items-center gap-2 border-l border-steel-200 pl-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-brand font-display text-2xs font-bold text-white">
                TH
              </span>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold leading-tight text-steel">Trần Thu Hà</p>
                <p className="text-2xs leading-tight text-steel-400">Quản trị viên</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <AdminNav />
        <main className="min-w-0 flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
