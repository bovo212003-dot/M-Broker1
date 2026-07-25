"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Loader2, ShieldCheck } from "lucide-react";
import { products, MUC_DICH, TSDB, TINH_THANH, NHOM_HO_SO, bankById } from "@/lib/data";
import { locGoiVay } from "@/lib/loan";
import { dinhDangTien } from "@/lib/format";

const BUOC = [
  { id: 1, ten: "Nhu cầu" },
  { id: 2, ten: "Tài sản" },
  { id: 3, ten: "Thu nhập" },
  { id: 4, ten: "Khu vực" },
  { id: 5, ten: "Liên hệ" },
];

function Nhom({ label, mo_ta, children }) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="text-lg font-bold leading-snug text-steel sm:text-xl">{label}</legend>
      {mo_ta && <p className="mt-1.5 text-sm text-steel-500">{mo_ta}</p>}
      <div className="mt-5">{children}</div>
    </fieldset>
  );
}

function Nut({ chon, onClick, children, phu }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={chon}
      className={`rounded-lg border px-4 py-3.5 text-left transition ${
        chon ? "border-brand bg-brand-light" : "border-steel-200 bg-white hover:border-brand"
      }`}
    >
      <span className={`block text-sm font-semibold ${chon ? "text-brand-dark" : "text-steel"}`}>{children}</span>
      {phu && <span className="mt-0.5 block text-xs text-steel-400">{phu}</span>}
    </button>
  );
}

function ThanhTruot({ label, value, min, max, step, onChange, hienThi }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-[13px] font-medium text-steel-600">{label}</span>
        <span className="num text-lg font-bold text-steel">{hienThi}</span>
      </div>
      <input
        type="range"
        className="mt-3 w-full"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
      />
    </div>
  );
}

export default function FunnelForm() {
  const router = useRouter();
  const sp = useSearchParams();

  const [buoc, setBuoc] = useState(1);
  const [dangGui, setDangGui] = useState(false);
  const [ho_so, setHoSo] = useState({
    loai: "the-chap",
    so_tien: 2000,
    thoi_han: 240,
    muc_dich: "mua-nha",
    co_tsdb: true,
    tsdb: "can-ho",
    gia_tri_tsdb: 3000,
    nhom: "chuyen-khoan",
    thu_nhap: 30,
    hinh_thuc_luong: "chuyen-khoan",
    nghe: "nhan-vien",
    bhxh: 24,
    tinh: "TP. Hồ Chí Minh",
    nam_sinh: 1990,
    no_hien_tai: false,
    ho_ten: "",
    dien_thoai: "",
    dong_y_xu_ly: false,
    dong_y_chuyen: false,
    dong_y_marketing: false,
  });

  const dat = (patch) => setHoSo((h) => ({ ...h, ...patch }));

  useEffect(() => {
    const luu = typeof window !== "undefined" ? window.localStorage.getItem("mbroker-draft") : null;
    if (luu) {
      try { setHoSo((h) => ({ ...h, ...JSON.parse(luu) })); } catch {}
    }
    const q = {};
    if (sp.get("loai")) q.loai = sp.get("loai");
    if (sp.get("so_tien")) q.so_tien = Number(sp.get("so_tien"));
    if (sp.get("thoi_han")) q.thoi_han = Number(sp.get("thoi_han"));
    if (sp.get("nhom")) q.nhom = sp.get("nhom");
    if (sp.get("thu_nhap")) q.thu_nhap = Number(sp.get("thu_nhap"));
    if (sp.get("goi")) {
      const p = products.find((x) => x.slug === sp.get("goi"));
      if (p) { q.loai = p.loai; q.goi_quan_tam = p.slug; }
    }
    if (Object.keys(q).length) setHoSo((h) => ({ ...h, ...q }));
    if (sp.get("buoc")) setBuoc(Number(sp.get("buoc")));
  }, [sp]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("mbroker-draft", JSON.stringify(ho_so));
    }
  }, [ho_so]);

  const phuHop = useMemo(
    () =>
      locGoiVay(products, {
        loai: ho_so.loai,
        so_tien: buoc >= 1 ? ho_so.so_tien : undefined,
        thoi_han: buoc >= 1 ? ho_so.thoi_han : undefined,
        muc_dich: ho_so.loai === "the-chap" && buoc >= 2 ? ho_so.muc_dich : undefined,
        tsdb: ho_so.loai === "the-chap" && buoc >= 2 ? ho_so.tsdb : undefined,
        gia_tri_tsdb: ho_so.loai === "the-chap" && buoc >= 2 ? ho_so.gia_tri_tsdb : undefined,
        nhom: ho_so.loai === "tin-chap" && buoc >= 2 ? ho_so.nhom : undefined,
        thu_nhap: buoc >= 3 ? ho_so.thu_nhap : undefined,
        bhxh: buoc >= 3 ? ho_so.bhxh : undefined,
      }),
    [ho_so, buoc]
  );

  const hopLe = () => {
    if (buoc === 5) {
      return (
        ho_so.ho_ten.trim().length > 2 &&
        /^0\d{8,10}$/.test(ho_so.dien_thoai.replace(/\s/g, "")) &&
        ho_so.dong_y_xu_ly &&
        ho_so.dong_y_chuyen
      );
    }
    return true;
  };

  const guiHoSo = async () => {
    setDangGui(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...ho_so, goi_phu_hop: phuHop.slice(0, 5).map((p) => p.slug) }),
      });
      const data = await res.json();
      window.localStorage.removeItem("mbroker-draft");
      router.push(`/dang-ky/ket-qua?id=${data.id}`);
    } catch {
      setDangGui(false);
    }
  };

  const tien = () => (buoc === 5 ? guiHoSo() : setBuoc((b) => Math.min(5, b + 1)));

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="card p-5 sm:p-8">
        <div className="flex items-center gap-1.5">
          {BUOC.map((b) => (
            <div key={b.id} className="flex-1">
              <div
                className={`h-1 rounded-full transition-all ${
                  b.id <= buoc ? "bg-brand" : "bg-steel-200"
                }`}
              />
              <p
                className={`mt-2 hidden text-2xs font-semibold sm:block ${
                  b.id === buoc ? "text-brand" : "text-steel-400"
                }`}
              >
                {b.id}. {b.ten}
              </p>
            </div>
          ))}
        </div>
        <p className="num mt-3 text-xs text-steel-400 sm:hidden">Bước {buoc} trên 5 — {BUOC[buoc - 1].ten}</p>

        <div className="mt-8 min-h-[340px]">
          {buoc === 1 && (
            <Nhom label="Bạn cần vay khoản gì?" mo_ta="Chọn loại vay và số tiền mong muốn.">
              <div className="grid gap-3 sm:grid-cols-2">
                <Nut chon={ho_so.loai === "the-chap"} onClick={() => dat({ loai: "the-chap" })} phu="Có tài sản đảm bảo, lãi suất thấp">
                  Vay thế chấp
                </Nut>
                <Nut chon={ho_so.loai === "tin-chap"} onClick={() => dat({ loai: "tin-chap", so_tien: Math.min(ho_so.so_tien, 300) })} phu="Không cần tài sản, duyệt nhanh">
                  Vay tín chấp
                </Nut>
              </div>
              <div className="mt-7 space-y-7">
                <ThanhTruot
                  label="Số tiền cần vay"
                  value={ho_so.so_tien}
                  min={ho_so.loai === "tin-chap" ? 10 : 100}
                  max={ho_so.loai === "tin-chap" ? 500 : 10000}
                  step={ho_so.loai === "tin-chap" ? 10 : 100}
                  onChange={(v) => dat({ so_tien: v })}
                  hienThi={dinhDangTien(ho_so.so_tien)}
                />
                <ThanhTruot
                  label="Thời hạn vay"
                  value={ho_so.thoi_han}
                  min={12}
                  max={ho_so.loai === "tin-chap" ? 60 : 300}
                  step={12}
                  onChange={(v) => dat({ thoi_han: v })}
                  hienThi={`${ho_so.thoi_han / 12} năm`}
                />
              </div>
            </Nhom>
          )}

          {buoc === 2 && ho_so.loai === "the-chap" && (
            <Nhom label="Tài sản đảm bảo của bạn" mo_ta="Thông tin này quyết định hạn mức bạn được duyệt.">
              <p className="text-[13px] font-medium text-steel-600">Loại tài sản</p>
              <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
                {TSDB.map((t) => (
                  <Nut key={t.id} chon={ho_so.tsdb === t.id} onClick={() => dat({ tsdb: t.id })}>
                    {t.label}
                  </Nut>
                ))}
              </div>
              <div className="mt-6">
                <ThanhTruot
                  label="Giá trị tài sản ước tính"
                  value={ho_so.gia_tri_tsdb}
                  min={200}
                  max={20000}
                  step={100}
                  onChange={(v) => dat({ gia_tri_tsdb: v })}
                  hienThi={dinhDangTien(ho_so.gia_tri_tsdb)}
                />
                <p className="num mt-2 text-xs text-steel-400">
                  Tỷ lệ vay: {Math.round((ho_so.so_tien / ho_so.gia_tri_tsdb) * 100)}%
                </p>
              </div>
              <div className="mt-6">
                <label htmlFor="muc-dich" className="text-[13px] font-medium text-steel-600">Mục đích vay</label>
                <select
                  id="muc-dich"
                  className="field mt-2"
                  value={ho_so.muc_dich}
                  onChange={(e) => dat({ muc_dich: e.target.value })}
                >
                  {MUC_DICH.map((m) => (
                    <option key={m.id} value={m.id}>{m.label}</option>
                  ))}
                </select>
              </div>
            </Nhom>
          )}

          {buoc === 2 && ho_so.loai === "tin-chap" && (
            <Nhom label="Bạn chứng minh thu nhập bằng gì?" mo_ta="Đây là yếu tố phân loại quan trọng nhất với vay tín chấp.">
              <div className="grid gap-2.5">
                {NHOM_HO_SO.map((n) => (
                  <Nut key={n.id} chon={ho_so.nhom === n.id} onClick={() => dat({ nhom: n.id })} phu={n.mo_ta}>
                    {n.label}
                  </Nut>
                ))}
              </div>
            </Nhom>
          )}

          {buoc === 3 && (
            <Nhom label="Thu nhập của bạn" mo_ta="Ngân hàng dùng thông tin này để tính hạn mức tối đa.">
              <ThanhTruot
                label="Thu nhập hàng tháng"
                value={ho_so.thu_nhap}
                min={5}
                max={200}
                step={1}
                onChange={(v) => dat({ thu_nhap: v })}
                hienThi={`${ho_so.thu_nhap} triệu`}
              />
              <div className="mt-6">
                <p className="text-[13px] font-medium text-steel-600">Hình thức nhận lương</p>
                <div className="mt-2.5 grid gap-2.5 sm:grid-cols-3">
                  {[
                    { id: "chuyen-khoan", label: "Chuyển khoản" },
                    { id: "tien-mat", label: "Tiền mặt" },
                    { id: "tu-kinh-doanh", label: "Tự kinh doanh" },
                  ].map((o) => (
                    <Nut key={o.id} chon={ho_so.hinh_thuc_luong === o.id} onClick={() => dat({ hinh_thuc_luong: o.id })}>
                      {o.label}
                    </Nut>
                  ))}
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="nghe" className="text-[13px] font-medium text-steel-600">Loại hình công việc</label>
                  <select id="nghe" className="field mt-2" value={ho_so.nghe} onChange={(e) => dat({ nghe: e.target.value })}>
                    <option value="nhan-vien">Nhân viên có hợp đồng</option>
                    <option value="quan-ly">Quản lý, điều hành</option>
                    <option value="ho-kinh-doanh">Hộ kinh doanh cá thể</option>
                    <option value="tu-do">Lao động tự do</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="bhxh" className="text-[13px] font-medium text-steel-600">Thời gian đóng BHXH</label>
                  <select id="bhxh" className="field mt-2" value={ho_so.bhxh} onChange={(e) => dat({ bhxh: Number(e.target.value) })}>
                    <option value={0}>Chưa đóng</option>
                    <option value={3}>Dưới 6 tháng</option>
                    <option value={6}>6 – 12 tháng</option>
                    <option value={24}>1 – 3 năm</option>
                    <option value={60}>Trên 3 năm</option>
                  </select>
                </div>
              </div>
            </Nhom>
          )}

          {buoc === 4 && (
            <Nhom label="Khu vực và tình trạng nợ" mo_ta="Ngân hàng phân công chuyên viên theo khu vực của bạn.">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="tinh" className="text-[13px] font-medium text-steel-600">Tỉnh, thành phố</label>
                  <select id="tinh" className="field mt-2" value={ho_so.tinh} onChange={(e) => dat({ tinh: e.target.value })}>
                    {TINH_THANH.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="nam-sinh" className="text-[13px] font-medium text-steel-600">Năm sinh</label>
                  <input
                    id="nam-sinh"
                    type="number"
                    className="field num mt-2"
                    value={ho_so.nam_sinh}
                    min={1955}
                    max={2008}
                    onChange={(e) => dat({ nam_sinh: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="mt-6">
                <p className="text-[13px] font-medium text-steel-600">Bạn đang có khoản vay nào khác không?</p>
                <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
                  <Nut chon={ho_so.no_hien_tai === false} onClick={() => dat({ no_hien_tai: false })}>
                    Không có
                  </Nut>
                  <Nut chon={ho_so.no_hien_tai === true} onClick={() => dat({ no_hien_tai: true })}>
                    Đang có khoản vay
                  </Nut>
                </div>
              </div>
            </Nhom>
          )}

          {buoc === 5 && (
            <Nhom label="Thông tin liên hệ" mo_ta="Chuyên viên sẽ gọi lại trong 2 giờ làm việc từ số 1900 1234.">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="ho-ten" className="text-[13px] font-medium text-steel-600">Họ và tên</label>
                  <input
                    id="ho-ten"
                    className="field mt-2"
                    placeholder="Nguyễn Văn A"
                    value={ho_so.ho_ten}
                    onChange={(e) => dat({ ho_ten: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="dien-thoai" className="text-[13px] font-medium text-steel-600">Số điện thoại</label>
                  <input
                    id="dien-thoai"
                    className="field num mt-2"
                    inputMode="tel"
                    placeholder="0901234567"
                    value={ho_so.dien_thoai}
                    onChange={(e) => dat({ dien_thoai: e.target.value })}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-3 rounded-card bg-steel-50 p-4">
                {[
                  {
                    key: "dong_y_xu_ly",
                    text: "Tôi đồng ý để M-Broker xử lý thông tin nêu trên nhằm mục đích tư vấn khoản vay.",
                    bat_buoc: true,
                  },
                  {
                    key: "dong_y_chuyen",
                    text: "Tôi đồng ý để M-Broker chuyển thông tin của tôi cho các tổ chức tín dụng đối tác được liệt kê tại trang Chính sách bảo mật.",
                    bat_buoc: true,
                  },
                  {
                    key: "dong_y_marketing",
                    text: "Tôi đồng ý nhận thông tin về sản phẩm và ưu đãi mới qua tin nhắn và email.",
                    bat_buoc: false,
                  },
                ].map((c) => (
                  <label key={c.key} className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 flex-none accent-brand"
                      checked={ho_so[c.key]}
                      onChange={(e) => dat({ [c.key]: e.target.checked })}
                    />
                    <span className="text-xs leading-relaxed text-steel-600">
                      {c.text}{" "}
                      {c.bat_buoc && <span className="font-semibold text-alert">(bắt buộc)</span>}
                    </span>
                  </label>
                ))}
              </div>
              <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-steel-400">
                <ShieldCheck size={15} className="mt-px flex-none text-brand" aria-hidden="true" />
                M-Broker không thu bất kỳ khoản phí nào từ người vay. Bạn có thể yêu cầu xóa dữ liệu bất
                cứ lúc nào tại trang Yêu cầu xóa dữ liệu.
              </p>
            </Nhom>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-steel-200 pt-6">
          <button
            type="button"
            onClick={() => setBuoc((b) => Math.max(1, b - 1))}
            disabled={buoc === 1}
            className="btn-ghost px-4 py-2.5 text-[13px] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft size={15} aria-hidden="true" /> Quay lại
          </button>
          <button
            type="button"
            onClick={tien}
            disabled={!hopLe() || dangGui}
            className="btn-primary px-6 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {dangGui ? (
              <><Loader2 size={16} className="animate-spin" aria-hidden="true" /> Đang gửi</>
            ) : buoc === 5 ? (
              <>Xem kết quả <ArrowRight size={16} aria-hidden="true" /></>
            ) : (
              <>Tiếp tục <ArrowRight size={16} aria-hidden="true" /></>
            )}
          </button>
        </div>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-card bg-steel p-5 text-white">
          <p className="text-2xs font-semibold uppercase tracking-eyebrow text-steel-400">
            Cập nhật theo hồ sơ của bạn
          </p>
          <p className="mt-3 flex items-baseline gap-2">
            <span className="num text-4xl font-bold leading-none text-brand-mid">{phuHop.length}</span>
            <span className="text-sm text-steel-200">ngân hàng phù hợp</span>
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {phuHop.slice(0, 8).map((p) => (
              <span key={p.slug} className="rounded-md bg-white/10 px-2 py-1 font-display text-2xs font-bold">
                {bankById(p.bankId).short}
              </span>
            ))}
          </div>
          {phuHop.length > 0 && (
            <dl className="num mt-5 space-y-2.5 border-t border-white/10 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-steel-300">Lãi suất từ</dt>
                <dd className="font-bold text-white">
                  {Math.min(...phuHop.map((p) => p.lai_suat_uu_dai)).toFixed(1).replace(".", ",")}%
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-steel-300">Giải ngân nhanh nhất</dt>
                <dd className="font-bold text-white">
                  {Math.min(...phuHop.map((p) => p.giai_ngan_ngay))} ngày
                </dd>
              </div>
            </dl>
          )}
        </div>

        <ul className="mt-4 space-y-2.5">
          {[
            "Miễn phí hoàn toàn cho người vay",
            "Không thu phí trước giải ngân",
            "Bạn chọn ngân hàng, không bị ép",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2.5 text-[13px] text-steel-500">
              <Check size={15} className="mt-0.5 flex-none text-brand" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
