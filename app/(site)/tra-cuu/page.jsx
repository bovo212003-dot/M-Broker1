"use client";

import { useState } from "react";
import { Loader2, Search, ShieldCheck } from "lucide-react";
import { TRANG_THAI, bankById } from "@/lib/data";
import { dinhDangTien } from "@/lib/format";

const MOC = [
  { id: "moi", ten: "Đã tiếp nhận" },
  { id: "dang-tu-van", ten: "Đang tư vấn" },
  { id: "da-chuyen-nh", ten: "Đã chuyển ngân hàng" },
  { id: "tham-dinh", ten: "Đang thẩm định" },
  { id: "da-giai-ngan", ten: "Có kết quả" },
];

const THU_TU = ["moi", "dang-tu-van", "da-chuyen-nh", "tham-dinh", "da-giai-ngan"];

export default function TraCuu() {
  const [buoc, setBuoc] = useState("nhap");
  const [ma, setMa] = useState("MB-24071");
  const [otp, setOtp] = useState("");
  const [dangTai, setDangTai] = useState(false);
  const [lead, setLead] = useState(null);
  const [loi, setLoi] = useState("");

  const guiOtp = (e) => {
    e.preventDefault();
    setLoi("");
    setBuoc("otp");
  };

  const xacThuc = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) return setLoi("Mã xác thực gồm 6 chữ số. Trong bản demo, nhập bất kỳ 6 số nào.");
    setDangTai(true);
    setLoi("");
    try {
      const res = await fetch(`/api/leads/${ma.trim().toUpperCase()}`);
      if (!res.ok) throw new Error();
      setLead(await res.json());
      setBuoc("ket-qua");
    } catch {
      setLoi("Không tìm thấy hồ sơ với mã này. Thử mã MB-24071 hoặc MB-24069.");
    } finally {
      setDangTai(false);
    }
  };

  const viTri = lead ? Math.max(0, THU_TU.indexOf(lead.trang_thai === "tu-choi" ? "da-giai-ngan" : lead.trang_thai)) : 0;

  return (
    <div className="shell py-14 sm:py-20">
      <div className="mx-auto max-w-xl">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-steel sm:text-3xl">
          Tra cứu trạng thái hồ sơ
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-steel-500">
          Nhập mã hồ sơ và xác thực bằng mã gửi tới số điện thoại bạn đã đăng ký.
        </p>

        {buoc === "nhap" && (
          <form onSubmit={guiOtp} className="card mt-8 p-6">
            <label htmlFor="ma" className="text-[13px] font-medium text-steel-600">Mã hồ sơ</label>
            <input
              id="ma"
              className="field num mt-2 uppercase"
              value={ma}
              onChange={(e) => setMa(e.target.value)}
              placeholder="MB-24071"
              required
            />
            <p className="mt-2 text-xs text-steel-400">
              Bản demo: thử <span className="num font-semibold">MB-24071</span>,{" "}
              <span className="num font-semibold">MB-24069</span> hoặc{" "}
              <span className="num font-semibold">MB-24067</span>.
            </p>
            <button type="submit" className="btn-primary mt-5 w-full">
              <Search size={16} aria-hidden="true" /> Gửi mã xác thực
            </button>
          </form>
        )}

        {buoc === "otp" && (
          <form onSubmit={xacThuc} className="card mt-8 p-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-steel">
              <ShieldCheck size={16} className="text-brand" aria-hidden="true" />
              Đã gửi mã tới số điện thoại đăng ký
            </p>
            <label htmlFor="otp" className="mt-5 block text-[13px] font-medium text-steel-600">
              Mã xác thực gồm 6 chữ số
            </label>
            <input
              id="otp"
              inputMode="numeric"
              maxLength={6}
              className="field num mt-2 text-center text-lg tracking-[0.5em]"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
            />
            {loi && <p className="mt-2 text-xs text-alert">{loi}</p>}
            <button type="submit" disabled={dangTai} className="btn-primary mt-5 w-full disabled:opacity-50">
              {dangTai ? <><Loader2 size={16} className="animate-spin" aria-hidden="true" /> Đang kiểm tra</> : "Xem trạng thái hồ sơ"}
            </button>
            <button
              type="button"
              onClick={() => { setBuoc("nhap"); setOtp(""); setLoi(""); }}
              className="mt-3 w-full text-xs font-semibold text-steel-400 hover:text-steel"
            >
              Đổi mã hồ sơ khác
            </button>
          </form>
        )}

        {buoc === "ket-qua" && lead && (
          <div className="card mt-8 p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="num text-sm text-steel-400">Hồ sơ {lead.id}</p>
                <p className="mt-1 text-lg font-bold text-steel">{lead.ho_ten}</p>
                <p className="num mt-0.5 text-sm text-steel-500">
                  {lead.loai === "the-chap" ? "Vay thế chấp" : "Vay tín chấp"} · {dinhDangTien(lead.so_tien)}
                </p>
              </div>
              <span className={`chip ${TRANG_THAI[lead.trang_thai]?.mau}`}>
                {TRANG_THAI[lead.trang_thai]?.label}
              </span>
            </div>

            <ol className="mt-7 space-y-0">
              {MOC.map((m, i) => {
                const xong = i <= viTri;
                const cuoi = i === MOC.length - 1;
                return (
                  <li key={m.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className={`grid h-6 w-6 flex-none place-items-center rounded-full text-2xs font-bold ${
                          xong ? "bg-brand text-white" : "bg-steel-100 text-steel-400"
                        }`}
                      >
                        {i + 1}
                      </span>
                      {!cuoi && <span className={`w-px flex-1 ${xong ? "bg-brand" : "bg-steel-200"}`} />}
                    </div>
                    <div className={cuoi ? "pb-0" : "pb-6"}>
                      <p className={`text-sm font-semibold ${xong ? "text-steel" : "text-steel-400"}`}>{m.ten}</p>
                      {i === viTri && lead.ngan_hang && (
                        <p className="mt-1 text-xs text-steel-500">
                          Ngân hàng tiếp nhận: {bankById(lead.ngan_hang)?.name}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="mt-6 border-t border-steel-200 pt-5">
              <p className="eyebrow">Nhật ký xử lý</p>
              <ul className="mt-3 space-y-2.5">
                {lead.lich_su?.map((h, i) => (
                  <li key={i} className="flex gap-3 text-xs leading-relaxed">
                    <span className="num flex-none text-steel-400">{h.luc}</span>
                    <span className="text-steel-600">{h.noi_dung}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => { setBuoc("nhap"); setLead(null); setOtp(""); }}
              className="btn-ghost mt-6 w-full py-2.5 text-[13px]"
            >
              Tra cứu hồ sơ khác
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
