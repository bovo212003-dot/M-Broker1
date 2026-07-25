import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, X, ArrowRight, FileText } from "lucide-react";
import LoanCalculator from "@/components/loan-calculator";
import { BankMark, Rating, Note, Disclosure, SectionHead } from "@/components/ui";
import { products, productBySlug, bankById, CAP_NHAT } from "@/lib/data";
import { dinhDangPhanTram, dinhDangTien, dinhDangThoiHan } from "@/lib/format";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = productBySlug(params.slug);
  if (!p) return { title: "Không tìm thấy gói vay" };
  const bank = bankById(p.bankId);
  return {
    title: `${p.ten} — ${bank.name}: lãi suất ${dinhDangPhanTram(p.lai_suat_uu_dai)} | M-Broker`,
    description: `Điều kiện, hạn mức, biểu phí và hồ sơ cần chuẩn bị cho gói ${p.ten} của ${bank.name}.`,
  };
}

const GIAY_TO_THE_CHAP = [
  "CCCD hoặc hộ chiếu còn hiệu lực của người vay và vợ hoặc chồng",
  "Giấy đăng ký kết hôn hoặc giấy xác nhận tình trạng hôn nhân",
  "Giấy chứng nhận quyền sở hữu tài sản đảm bảo (bản gốc)",
  "Hợp đồng lao động và sao kê lương 3 đến 6 tháng gần nhất",
  "Hợp đồng mua bán hoặc giấy tờ chứng minh mục đích sử dụng vốn",
];

const GIAY_TO_TIN_CHAP = [
  "CCCD hoặc hộ chiếu còn hiệu lực",
  "Giấy tờ chứng minh thu nhập theo nhóm hồ sơ của bạn",
  "Giấy tờ chứng minh nơi ở hiện tại",
];

export default function ChiTietGoiVay({ params }) {
  const p = productBySlug(params.slug);
  if (!p) notFound();

  const bank = bankById(p.bankId);
  const laTheChap = p.loai === "the-chap";
  const sauUuDai = p.lai_suat_co_so + p.bien_do;
  const tuongTu = products
    .filter((x) => x.loai === p.loai && x.slug !== p.slug)
    .sort((a, b) => a.lai_suat_uu_dai - b.lai_suat_uu_dai)
    .slice(0, 3);

  return (
    <>
      <section className="border-b border-steel-200 bg-white">
        <div className="shell py-10">
          <nav className="flex flex-wrap items-center gap-2 text-xs text-steel-400" aria-label="Đường dẫn">
            <Link href="/" className="hover:text-brand">Trang chủ</Link>
            <span aria-hidden="true">/</span>
            <Link href={laTheChap ? "/vay-the-chap" : "/vay-tin-chap"} className="hover:text-brand">
              {laTheChap ? "Vay thế chấp" : "Vay tín chấp"}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-steel-500">{bank.name}</span>
          </nav>

          <div className="mt-6 flex flex-wrap items-start gap-5">
            <BankMark bank={bank} size={64} />
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-steel sm:text-3xl">
                {p.ten}
              </h1>
              <p className="mt-1.5 text-sm text-steel-500">
                {bank.name} · {laTheChap ? "Vay thế chấp" : "Vay tín chấp"}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <Rating value={p.diem} />
                <span className="num text-xs text-steel-400">Cập nhật {CAP_NHAT}</span>
              </div>
            </div>
            <Link href={`/dang-ky?goi=${p.slug}`} className="btn-primary">
              Đăng ký gói này <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <dl className="num mt-8 grid gap-4 border-t border-steel-200 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-2xs uppercase tracking-eyebrow text-steel-400">Lãi suất ưu đãi</dt>
              <dd className="mt-1 text-2xl font-bold text-brand">{dinhDangPhanTram(p.lai_suat_uu_dai)}</dd>
              <dd className="mt-0.5 text-xs text-steel-400">
                {p.thang_uu_dai > 0 ? `trong ${p.thang_uu_dai} tháng đầu` : "cố định toàn kỳ"}
              </dd>
            </div>
            {laTheChap && (
              <div>
                <dt className="text-2xs uppercase tracking-eyebrow text-steel-400">Sau kỳ ưu đãi</dt>
                <dd className="mt-1 text-2xl font-bold text-alert">{dinhDangPhanTram(sauUuDai)}</dd>
                <dd className="mt-0.5 text-xs text-steel-400">
                  cơ sở {dinhDangPhanTram(p.lai_suat_co_so)} + biên độ {dinhDangPhanTram(p.bien_do)}
                </dd>
              </div>
            )}
            <div>
              <dt className="text-2xs uppercase tracking-eyebrow text-steel-400">Hạn mức</dt>
              <dd className="mt-1 text-2xl font-bold text-steel">{dinhDangTien(p.han_muc_max)}</dd>
              <dd className="mt-0.5 text-xs text-steel-400">tối thiểu {dinhDangTien(p.han_muc_min)}</dd>
            </div>
            <div>
              <dt className="text-2xs uppercase tracking-eyebrow text-steel-400">Thời hạn tối đa</dt>
              <dd className="mt-1 text-2xl font-bold text-steel">{dinhDangThoiHan(p.thoi_han_max)}</dd>
              <dd className="mt-0.5 text-xs text-steel-400">giải ngân trong {p.giai_ngan_ngay} ngày</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="shell grid gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-10">
          <section>
            <SectionHead eyebrow="Đánh giá" title="Ưu điểm và hạn chế" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="card p-5">
                <p className="text-[13px] font-bold text-brand">Điểm mạnh</p>
                <ul className="mt-3 space-y-2.5">
                  {p.uu_diem.map((u) => (
                    <li key={u} className="flex items-start gap-2.5 text-sm leading-relaxed text-steel-600">
                      <Check size={15} className="mt-0.5 flex-none text-brand" aria-hidden="true" />
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card p-5">
                <p className="text-[13px] font-bold text-alert">Điểm cần cân nhắc</p>
                <ul className="mt-3 space-y-2.5">
                  {p.nhuoc_diem.map((n) => (
                    <li key={n} className="flex items-start gap-2.5 text-sm leading-relaxed text-steel-600">
                      <X size={15} className="mt-0.5 flex-none text-alert" aria-hidden="true" />
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <SectionHead eyebrow="Biểu phí" title="Các khoản phí bạn cần biết trước khi ký" />
            <div className="card mt-6 divide-y divide-steel-100">
              {[
                { ten: "Phí trả nợ trước hạn", gt: p.phi_tra_truoc_han },
                { ten: "Phí thẩm định tài sản", gt: p.phi_tham_dinh },
                { ten: "Thu nhập tối thiểu", gt: `${p.thu_nhap_min} triệu đồng mỗi tháng` },
                ...(p.ltv ? [{ ten: "Tỷ lệ vay tối đa", gt: `${p.ltv}% giá trị định giá` }] : []),
                ...(p.bhxh_thang ? [{ ten: "Thời gian đóng BHXH tối thiểu", gt: `${p.bhxh_thang} tháng` }] : []),
              ].map((r) => (
                <div key={r.ten} className="flex flex-wrap items-baseline justify-between gap-3 px-5 py-3.5">
                  <span className="text-sm text-steel-500">{r.ten}</span>
                  <span className="num text-sm font-semibold text-steel">{r.gt}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHead eyebrow="Công cụ" title="Tính khoản trả cho chính gói này" />
            <div className="mt-6">
              <LoanCalculator
                rutGon
                macDinh={{
                  so_tien: Math.min(2000, p.han_muc_max),
                  thoi_han: Math.min(240, p.thoi_han_max),
                  lai: p.lai_suat_uu_dai,
                  thang_uu_dai: p.thang_uu_dai,
                  bien_do: p.bien_do,
                }}
              />
            </div>
          </section>

          <section>
            <SectionHead eyebrow="Gói tương tự" title="Các lựa chọn khác cùng nhóm" />
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {tuongTu.map((t) => {
                const b = bankById(t.bankId);
                return (
                  <Link key={t.slug} href={`/goi-vay/${t.slug}`} className="card p-4 transition hover:border-brand">
                    <BankMark bank={b} size={36} />
                    <p className="mt-3 text-sm font-bold text-steel">{b.name}</p>
                    <p className="truncate text-xs text-steel-400">{t.ten}</p>
                    <p className="num mt-2 text-base font-bold text-brand">
                      {dinhDangPhanTram(t.lai_suat_uu_dai)}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-5">
            <p className="flex items-center gap-2 text-[13px] font-bold text-steel">
              <FileText size={15} className="text-brand" aria-hidden="true" />
              Hồ sơ cần chuẩn bị
            </p>
            <ul className="mt-4 space-y-2.5">
              {(laTheChap ? GIAY_TO_THE_CHAP : GIAY_TO_TIN_CHAP).map((g, i) => (
                <li key={g} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-steel-600">
                  <span className="num mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-steel-50 text-2xs font-bold text-steel-500">
                    {i + 1}
                  </span>
                  {g}
                </li>
              ))}
            </ul>
            <Link href={`/dang-ky?goi=${p.slug}`} className="btn-primary mt-5 w-full">
              Nhận tư vấn về gói này
            </Link>
            <p className="mt-3 text-center text-xs text-steel-400">
              Miễn phí. Chuyên viên gọi lại trong 2 giờ làm việc.
            </p>
          </div>

          {laTheChap && (
            <Note tone="signal" title="Lưu ý về lãi suất">
              Sau {p.thang_uu_dai} tháng ưu đãi, lãi suất chuyển sang thả nổi và ước tính khoảng{" "}
              {dinhDangPhanTram(sauUuDai)}. Biên độ {dinhDangPhanTram(p.bien_do)} là phần cố định ghi
              trong hợp đồng — hãy đàm phán con số này thay vì chỉ nhìn lãi suất năm đầu.
            </Note>
          )}
        </aside>
      </div>

      <div className="shell pb-12">
        <Disclosure>
          Thông tin trên trang này do M-Broker tổng hợp từ công bố của {bank.name} và được cập nhật
          thủ công ngày {CAP_NHAT}. {bank.name} trả phí giới thiệu cho M-Broker khi khoản vay được
          giải ngân. Lãi suất, hạn mức và điều kiện chính thức do ngân hàng quyết định sau thẩm định.
        </Disclosure>
      </div>
    </>
  );
}
