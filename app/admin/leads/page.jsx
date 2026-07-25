"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Loader2, Download, Flame } from "lucide-react";
import { TRANG_THAI, bankById, TINH_THANH } from "@/lib/data";
import { dinhDangTien } from "@/lib/format";

const NHAN_VIEN = ["Trần Thu Hà", "Lê Hoàng Nam", "Phạm Thị Quỳnh"];

export default function DanhSachLead() {
  const [leads, setLeads] = useState([]);
  const [dangTai, setDangTai] = useState(true);
  const [tim, setTim] = useState("");
  const [trangThai, setTrangThai] = useState("");
  const [loai, setLoai] = useState("");
  const [tinh, setTinh] = useState("");
  const [chon, setChon] = useState([]);

  const taiLai = () => {
    setDangTai(true);
    fetch("/api/leads")
      .then((r) => r.json())
      .then((d) => setLeads(d.items || []))
      .finally(() => setDangTai(false));
  };

  useEffect(taiLai, []);

  const ketQua = useMemo(
    () =>
      leads
        .filter((l) => (trangThai ? l.trang_thai === trangThai : true))
        .filter((l) => (loai ? l.loai === loai : true))
        .filter((l) => (tinh ? l.tinh === tinh : true))
        .filter((l) =>
          tim
            ? `${l.id} ${l.ho_ten} ${l.dien_thoai}`.toLowerCase().includes(tim.toLowerCase())
            : true
        ),
    [leads, trangThai, loai, tinh, tim]
  );

  const phanCong = async (nguoi) => {
    await Promise.all(
      chon.map((id) =>
        fetch(`/api/leads/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phu_trach: nguoi, trang_thai: "dang-tu-van" }),
        })
      )
    );
    setChon([]);
    taiLai();
  };

  const nong = (l) => l.so_tien >= 1000 || (l.loai === "tin-chap" && l.thu_nhap >= 20);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-steel">Danh sách lead</h1>
          <p className="num mt-1 text-sm text-steel-500">{ketQua.length} hồ sơ khớp bộ lọc</p>
        </div>
        <button type="button" className="btn-ghost px-4 py-2.5 text-[13px]">
          <Download size={14} aria-hidden="true" /> Xuất Excel
        </button>
      </div>

      <div className="card p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-400" aria-hidden="true" />
            <input
              className="field pl-9"
              placeholder="Tìm mã, tên, số điện thoại"
              value={tim}
              onChange={(e) => setTim(e.target.value)}
              aria-label="Tìm kiếm lead"
            />
          </div>
          <select className="field" value={trangThai} onChange={(e) => setTrangThai(e.target.value)} aria-label="Lọc theo trạng thái">
            <option value="">Mọi trạng thái</option>
            {Object.entries(TRANG_THAI).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
          <select className="field" value={loai} onChange={(e) => setLoai(e.target.value)} aria-label="Lọc theo loại vay">
            <option value="">Mọi loại vay</option>
            <option value="the-chap">Vay thế chấp</option>
            <option value="tin-chap">Vay tín chấp</option>
          </select>
          <select className="field" value={tinh} onChange={(e) => setTinh(e.target.value)} aria-label="Lọc theo tỉnh thành">
            <option value="">Mọi khu vực</option>
            {TINH_THANH.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {chon.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 rounded-card bg-steel px-4 py-3 text-white">
          <p className="num text-sm font-semibold">Đã chọn {chon.length} hồ sơ</p>
          <div className="flex flex-wrap gap-2">
            {NHAN_VIEN.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => phanCong(n)}
                className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/20"
              >
                Giao cho {n.split(" ").slice(-1)[0]}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setChon([])} className="ml-auto text-xs text-steel-300 hover:text-white">
            Bỏ chọn
          </button>
        </div>
      )}

      <div className="card overflow-hidden">
        {dangTai ? (
          <div className="p-12 text-center">
            <Loader2 size={22} className="mx-auto animate-spin text-brand" aria-hidden="true" />
            <p className="mt-3 text-sm text-steel-400">Đang tải danh sách…</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-sm">
              <thead className="bg-steel-50 text-2xs uppercase tracking-eyebrow text-steel-400">
                <tr>
                  <th scope="col" className="w-10 px-4 py-2.5">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-brand"
                      checked={chon.length > 0 && chon.length === ketQua.length}
                      onChange={(e) => setChon(e.target.checked ? ketQua.map((l) => l.id) : [])}
                      aria-label="Chọn tất cả"
                    />
                  </th>
                  <th scope="col" className="px-4 py-2.5 text-left font-semibold">Mã</th>
                  <th scope="col" className="px-4 py-2.5 text-left font-semibold">Khách hàng</th>
                  <th scope="col" className="px-4 py-2.5 text-left font-semibold">Nhu cầu</th>
                  <th scope="col" className="px-4 py-2.5 text-left font-semibold">Khu vực</th>
                  <th scope="col" className="px-4 py-2.5 text-left font-semibold">Nguồn</th>
                  <th scope="col" className="px-4 py-2.5 text-left font-semibold">Phụ trách</th>
                  <th scope="col" className="px-4 py-2.5 text-left font-semibold">Trạng thái</th>
                  <th scope="col" className="px-4 py-2.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-steel-100">
                {ketQua.map((l) => (
                  <tr key={l.id} className="hover:bg-steel-50/60">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-brand"
                        checked={chon.includes(l.id)}
                        onChange={() =>
                          setChon((c) => (c.includes(l.id) ? c.filter((x) => x !== l.id) : [...c, l.id]))
                        }
                        aria-label={`Chọn hồ sơ ${l.id}`}
                      />
                    </td>
                    <td className="num px-4 py-3">
                      <span className="flex items-center gap-1.5 font-semibold text-steel">
                        {l.id}
                        {nong(l) && <Flame size={13} className="text-alert" aria-label="Lead giá trị cao" />}
                      </span>
                      <span className="num block text-2xs text-steel-400">{l.tao_luc}</span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-steel">{l.ho_ten}</p>
                      <p className="num text-2xs text-steel-400">{l.dien_thoai}</p>
                    </td>
                    <td className="num px-4 py-3 text-steel-600">
                      <p>{l.loai === "the-chap" ? "Thế chấp" : "Tín chấp"}</p>
                      <p className="text-2xs text-steel-400">{dinhDangTien(l.so_tien)} · {l.thoi_han / 12} năm</p>
                    </td>
                    <td className="px-4 py-3 text-steel-600">{l.tinh}</td>
                    <td className="px-4 py-3 text-2xs text-steel-500">{l.nguon}</td>
                    <td className="px-4 py-3 text-steel-600">
                      {l.phu_trach || <span className="text-2xs text-alert">Chưa giao</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`chip ${TRANG_THAI[l.trang_thai]?.mau}`}>
                        {TRANG_THAI[l.trang_thai]?.label}
                      </span>
                      {l.ngan_hang && (
                        <span className="ml-1.5 text-2xs text-steel-400">{bankById(l.ngan_hang)?.short}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/leads/${l.id}`} className="text-xs font-semibold text-brand hover:text-brand-dark">
                        Mở
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {ketQua.length === 0 && (
              <p className="p-12 text-center text-sm text-steel-400">Không có hồ sơ nào khớp bộ lọc.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
