"use client";

import { useSearchParams } from "next/navigation";

export default function MaHoSo() {
  const sp = useSearchParams();
  const id = sp.get("id");
  const quanTam = (sp.get("quan_tam") || "").split(",").filter(Boolean);

  return (
    <p className="mt-4 text-[15px] leading-relaxed text-steel-500">
      Mã hồ sơ của bạn là{" "}
      <span className="num rounded-md bg-steel px-2.5 py-1 font-bold text-white">{id || "MB-24072"}</span>
      {quanTam.length > 0 && (
        <>
          {" "}· bạn đã đánh dấu quan tâm{" "}
          <span className="num font-semibold text-steel">{quanTam.length} gói vay</span>
        </>
      )}
      . Hãy lưu mã này để tra cứu trạng thái.
    </p>
  );
}
