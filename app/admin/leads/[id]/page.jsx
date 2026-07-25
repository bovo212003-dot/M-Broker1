"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Phone, Send, MousePointerClick } from "lucide-react";
import { TRANG_THAI, banks, bankById, NHOM_HO_SO, MUC_DICH, TSDB } from "@/lib/data";
import { dinhDangTien } from "@/lib/format";

const NHAN_VIEN = ["Trần Thu Hà", "Lê Hoàng Nam", "Phạm Thị Quỳnh"];

function Dong({ nhan, gt }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-steel-100 py-2.5 last:border-0">
      <dt className="text-xs text-steel-400">{nhan}</dt>
      <dd className="num text-right text-[13px] font-medium text-steel">{gt}</dd>
    </div>
  );
}

export default function ChiTietLead() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [loi, setLoi] = useState(false);
  const [ghiChu, setGhiChu] = useState("");
  const [dangLuu, setDangLuu] = useState(false);

  const tai = () =>
    fetch(`/api/leads/${id}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setLead)
      .catch(() => setLoi(true));

  useEffect(() => { tai(); }, [id]);

  const capNhat = async (patch) => {
    setDangLuu(true);
    const res = await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (res.ok) setLead(await res.json());
    setDangLuu(false);
  };

  if (loi) {
    return (
      <div className="card p-12 text-center">
        <p className="text-sm font-semibold text-steel">Không tìm thấy hồ sơ</p>
        <Link href="/admin/leads" className="btn-ghost mt-4">Về danh sách</Link>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="card p-12 text-center">
        <Loader2 size={22} className="mx-auto animate-spin text-brand" aria-hidden="true" />
      </div>
    );
  }

  const nhom = NHOM_HO_SO.find((n) => n.id === lead.nhom);
  const mucDich = MUC_DICH.find((m) => m.id === lead.muc_dich);
  const tsdb = TSDB.find((t) => t.id === lead.tsdb);

  return (
    <div className="space-y-4">
      <Link href="/admin/leads" className="inline-flex items-center gap-2 text-sm font-semibold text-steel-500 hover:text-brand">
        <ArrowLeft size={15} aria-hidden="true" /> Về danh sách lead
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-bold text-steel">{lead.ho_ten}</h1>
            <span className={`chip ${TRANG_THAI[lead.trang_thai]?.mau}`}>
              {TRANG_THAI[lead.trang_thai]?.label}
            </span>
          </div>
          <p className="num mt-1 text-sm text-steel-500">
            {lead.id} · {lead.dien_thoai} · tạo lúc {lead.tao_luc}
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn-ghost px-4 py-2.5 text-[13px]">
            <Phone size={14} aria-hidden="true" /> Gọi
          </button>
          <button type="button" className="btn-dark px-4 py-2.5 text-[13px]">
            <Send size={14} aria-hidden="true" /> Nhắn Zalo
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card p-5">
          <p className="eyebrow">Hồ sơ khách hàng</p>
          <dl className="mt-3">
            <Dong nhan="Loại vay" gt={lead.loai === "the-chap" ? "Vay thế chấp" : "Vay tín chấp"} />
            <Dong nhan="Số tiền" gt={dinhDangTien(lead.so_tien)} />
            <Dong nhan="Thời hạn" gt={`${lead.thoi_han / 12} năm`} />
            {mucDich && <Dong nhan="Mục đích" gt={mucDich.label} />}
            {tsdb && <Dong nhan="Tài sản đảm bảo" gt={tsdb.label} />}
            {lead.gia_tri_tsdb && (
              <>
                <Dong nhan="Giá trị tài sản" gt={dinhDangTien(lead.gia_tri_tsdb)} />
                <Dong nhan="Tỷ lệ vay" gt={`${Math.round((lead.so_tien / lead.gia_tri_tsdb) * 100)}%`} />
              </>
            )}
            {nhom && <Dong nhan="Nhóm hồ sơ" gt={nhom.label} />}
            <Dong nhan="Thu nhập" gt={`${lead.thu_nhap} triệu/tháng`} />
            <Dong
              nhan="Hình thức lương"
              gt={
                { "chuyen-khoan": "Chuyển khoản", "tien-mat": "Tiền mặt", "tu-kinh-doanh": "Tự kinh doanh" }[
                  lead.hinh_thuc_luong
                ] || "—"
              }
            />
            <Dong nhan="Đóng BHXH" gt={lead.bhxh ? `${lead.bhxh} tháng` : "Chưa đóng"} />
            <Dong nhan="Khu vực" gt={lead.tinh} />
            <Dong nhan="Năm sinh" gt={lead.nam_sinh} />
            <Dong nhan="Khoản vay khác" gt={lead.no_hien_tai ? "Đang có" : "Không có"} />
          </dl>
        </div>

        <div className="card p-5">
          <p className="eyebrow">Dòng thời gian</p>
          <ol className="mt-4 space-y-4">
            {lead.lich_su?.map((h, i) => (
              <li key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={`mt-1 h-2 w-2 flex-none rounded-full ${
                      h.loai === "goi" ? "bg-signal" : h.loai === "chuyen" ? "bg-brand" : "bg-steel-300"
                    }`}
                    aria-hidden="true"
                  />
                  {i < lead.lich_su.length - 1 && <span className="w-px flex-1 bg-steel-200" />}
                </div>
                <div className="pb-1">
                  <p className="num text-2xs text-steel-400">{h.luc}</p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-steel-600">{h.noi_dung}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-5 border-t border-steel-200 pt-4">
            <label htmlFor="ghi-chu" className="text-xs font-medium text-steel-600">Thêm ghi chú</label>
            <textarea
              id="ghi-chu"
              rows={3}
              className="field mt-2 text-[13px]"
              placeholder="Gọi lần 2 — khách hẹn gọi lại sau 18h"
              value={ghiChu}
              onChange={(e) => setGhiChu(e.target.value)}
            />
            <button
              type="button"
              disabled={!ghiChu.trim() || dangLuu}
              onClick={async () => { await capNhat({ ghi_chu: ghiChu }); setGhiChu(""); }}
              className="btn-primary mt-2 w-full py-2.5 text-[13px] disabled:opacity-40"
            >
              Lưu ghi chú
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <p className="eyebrow">Hành động</p>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="tt" className="text-xs font-medium text-steel-600">Trạng thái hồ sơ</label>
                <select
                  id="tt"
                  className="field mt-2 text-[13px]"
                  value={lead.trang_thai}
                  onChange={(e) => capNhat({ trang_thai: e.target.value })}
                >
                  {Object.entries(TRANG_THAI).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="nh" className="text-xs font-medium text-steel-600">Ngân hàng tiếp nhận</label>
                <select
                  id="nh"
                  className="field mt-2 text-[13px]"
                  value={lead.ngan_hang || ""}
                  onChange={(e) => capNhat({ ngan_hang: e.target.value || null })}
                >
                  <option value="">Chưa chuyển</option>
                  {banks.map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="pt" className="text-xs font-medium text-steel-600">Chuyên viên phụ trách</label>
                <select
                  id="pt"
                  className="field mt-2 text-[13px]"
                  value={lead.phu_trach || ""}
                  onChange={(e) => capNhat({ phu_trach: e.target.value || null })}
                >
                  <option value="">Chưa phân công</option>
                  {NHAN_VIEN.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              {dangLuu && (
                <p className="flex items-center gap-2 text-xs text-steel-400">
                  <Loader2 size={13} className="animate-spin" aria-hidden="true" /> Đang lưu…
                </p>
              )}
            </div>
          </div>

          <div className="card p-5">
            <p className="eyebrow flex items-center gap-2">
              <MousePointerClick size={13} aria-hidden="true" /> Nguồn lead
            </p>
            <dl className="mt-3">
              <Dong nhan="Kênh" gt={lead.nguon} />
              <Dong nhan="Trang vào" gt={lead.trang_vao} />
              {lead.ngan_hang && <Dong nhan="Đã chuyển tới" gt={bankById(lead.ngan_hang)?.name} />}
            </dl>
            <p className="mt-3 text-2xs leading-relaxed text-steel-400">
              Biết khách đến từ trang nào giúp mở đầu cuộc gọi đúng trọng tâm thay vì hỏi lại từ đầu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
