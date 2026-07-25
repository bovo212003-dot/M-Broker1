"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, Loader2, ArrowRight } from "lucide-react";
import { products, bankById } from "@/lib/data";
import { locGoiVay, lichTraNo } from "@/lib/loan";
import { dinhDangDong, dinhDangPhanTram, dinhDangTien } from "@/lib/format";
import { BankMark, Rating, Note } from "@/components/ui";

export default function KetQuaClient() {
  const sp = useSearchParams();
  const router = useRouter();
  const id = sp.get("id");
  const [lead, setLead] = useState(null);
  const [loi, setLoi] = useState(false);
  const [quanTam, setQuanTam] = useState([]);

  useEffect(() => {
    if (!id) return setLoi(true);
    fetch(`/api/leads/${id}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setLead)
      .catch(() => setLoi(true));
  }, [id]);

  if (loi) {
    return (
      <div className="shell py-24 text-center">
        <h1 className="text-2xl font-bold text-steel">Không tìm thấy hồ sơ này</h1>
        <p className="mt-3 text-sm text-steel-500">Hồ sơ có thể đã hết hạn hoặc máy chủ demo vừa khởi động lại.</p>
        <Link href="/dang-ky" className="btn-primary mt-6">Tạo hồ sơ mới</Link>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="shell py-24 text-center">
        <Loader2 size={28} className="mx-auto animate-spin text-brand" aria-hidden="true" />
        <p className="mt-4 text-sm text-steel-500">Đang đối chiếu hồ sơ với 24 gói vay…</p>
      </div>
    );
  }

  const phuHop = locGoiVay(products, {
    loai: lead.loai,
    so_tien: lead.so_tien,
    thoi_han: lead.thoi_han,
    muc_dich: lead.loai === "the-chap" ? lead.muc_dich : undefined,
    tsdb: lead.loai === "the-chap" ? lead.tsdb : undefined,
    gia_tri_tsdb: lead.loai === "the-chap" ? lead.gia_tri_tsdb : undefined,
    nhom: lead.loai === "tin-chap" ? lead.nhom : undefined,
    thu_nhap: lead.thu_nhap,
    bhxh: lead.bhxh,
  }).slice(0, 5);

  const toggle = (slug) =>
    setQuanTam((q) => (q.includes(slug) ? q.filter((s) => s !== slug) : [...q, slug]));

  return (
    <div className="shell py-10 sm:py-14">
      <div className="max-w-2xl">
        <span className="chip bg-brand-light text-brand-dark">Mã hồ sơ {lead.id}</span>
        <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-steel sm:text-3xl">
          {phuHop.length > 0 ? (
            <>
              Có <span className="num text-brand">{phuHop.length} gói vay</span> phù hợp với hồ sơ của{" "}
              {lead.ho_ten.split(" ").slice(-1)[0]}
            </>
          ) : (
            <>Hồ sơ của bạn cần tư vấn riêng</>
          )}
        </h1>
        <p className="num mt-3 text-[15px] leading-relaxed text-steel-500">
          {lead.loai === "the-chap" ? "Vay thế chấp" : "Vay tín chấp"} {dinhDangTien(lead.so_tien)} trong{" "}
          {lead.thoi_han / 12} năm · thu nhập {lead.thu_nhap} triệu/tháng · {lead.tinh}
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          {phuHop.map((p, i) => {
            const bank = bankById(p.bankId);
            const kq = lichTraNo({
              goc_trieu: Math.min(lead.so_tien, p.han_muc_max),
              thang: Math.min(lead.thoi_han, p.thoi_han_max),
              lai_uu_dai: p.lai_suat_uu_dai,
              thang_uu_dai: p.thang_uu_dai,
              lai_sau_uu_dai: p.lai_suat_co_so + p.bien_do,
            });
            const chon = quanTam.includes(p.slug);
            return (
              <article
                key={p.slug}
                className={`card animate-fade-up p-5 transition ${chon ? "border-brand ring-1 ring-brand" : ""}`}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="flex flex-wrap items-start gap-4">
                  <BankMark bank={bank} size={48} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-[16px] font-bold text-steel">{bank.name}</h2>
                      {i === 0 && <span className="chip bg-brand text-white">Phù hợp nhất</span>}
                    </div>
                    <p className="text-sm text-steel-400">{p.ten}</p>
                    <div className="mt-1.5"><Rating value={p.diem} /></div>
                  </div>
                  <div className="text-right">
                    <p className="num text-2xl font-bold leading-none text-brand">
                      {dinhDangPhanTram(p.lai_suat_uu_dai)}
                    </p>
                    <p className="num mt-1 text-2xs text-steel-400">phù hợp {p.diem_phu_hop}%</p>
                  </div>
                </div>

                <dl className="num mt-4 grid grid-cols-2 gap-3 border-t border-steel-100 pt-4 sm:grid-cols-3">
                  <div>
                    <dt className="text-2xs text-steel-400">Trả tháng đầu</dt>
                    <dd className="text-sm font-bold text-steel">{dinhDangDong(kq.thang_dau)}</dd>
                  </div>
                  <div>
                    <dt className="text-2xs text-steel-400">Tổng lãi ước tính</dt>
                    <dd className="text-sm font-bold text-alert">{dinhDangDong(kq.tong_lai)}</dd>
                  </div>
                  <div>
                    <dt className="text-2xs text-steel-400">Giải ngân</dt>
                    <dd className="text-sm font-bold text-steel">{p.giai_ngan_ngay} ngày</dd>
                  </div>
                </dl>

                {p.ly_do.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.ly_do.map((l) => (
                      <li key={l} className="flex items-center gap-1.5 rounded-md bg-brand-light px-2.5 py-1 text-2xs font-medium text-brand-dark">
                        <Check size={11} strokeWidth={3} aria-hidden="true" /> {l}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => toggle(p.slug)}
                    aria-pressed={chon}
                    className={chon ? "btn-primary flex-1 py-2.5 text-[13px]" : "btn-ghost flex-1 py-2.5 text-[13px]"}
                  >
                    {chon ? (<><Check size={14} aria-hidden="true" /> Đã chọn quan tâm</>) : "Tôi quan tâm gói này"}
                  </button>
                  <Link href={`/goi-vay/${p.slug}`} className="btn-ghost flex-1 py-2.5 text-[13px]">
                    Điều kiện chi tiết
                  </Link>
                </div>
              </article>
            );
          })}

          {phuHop.length === 0 && (
            <Note tone="signal" title="Chưa có gói nào khớp hoàn toàn với hồ sơ">
              Điều này không có nghĩa là bạn không vay được. Chuyên viên sẽ liên hệ để tư vấn phương án
              phù hợp, ví dụ bổ sung giấy tờ chứng minh thu nhập hoặc điều chỉnh số tiền vay.
            </Note>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-5">
            <p className="text-[15px] font-bold text-steel">Bước tiếp theo</p>
            <ol className="mt-4 space-y-3">
              {[
                "Chuyên viên gọi lại trong 2 giờ làm việc từ số 1900 1234",
                "Bạn xác nhận ngân hàng muốn nộp hồ sơ",
                "Chúng tôi hỗ trợ chuẩn bị giấy tờ và theo dõi tới khi có kết quả",
              ].map((t, i) => (
                <li key={t} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-steel-600">
                  <span className="num mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-brand text-2xs font-bold text-white">
                    {i + 1}
                  </span>
                  {t}
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={() => router.push(`/dang-ky/hoan-tat?id=${lead.id}&quan_tam=${quanTam.join(",")}`)}
              className="btn-primary mt-5 w-full"
            >
              Xác nhận {quanTam.length > 0 ? `${quanTam.length} gói đã chọn` : "và chờ tư vấn"}
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-steel-400">
            Đây là kết quả tham khảo dựa trên thông tin bạn cung cấp và điều kiện công bố của các ngân
            hàng. Lãi suất, hạn mức và thời hạn chính thức do tổ chức tín dụng quyết định sau khi thẩm
            định hồ sơ.
          </p>
        </aside>
      </div>
    </div>
  );
}
