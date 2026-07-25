import { Suspense } from "react";
import KetQuaClient from "./ket-qua-client";

export const metadata = { title: "Kết quả sơ bộ | M-Broker" };

export default function KetQua() {
  return (
    <Suspense fallback={<div className="shell py-24 text-center text-sm text-steel-400">Đang đối chiếu hồ sơ…</div>}>
      <KetQuaClient />
    </Suspense>
  );
}
