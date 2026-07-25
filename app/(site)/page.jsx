import Link from "next/link";
import {
  ArrowRight, Building2, Wallet, Calculator, ShieldCheck, ScrollText, Check,
} from "lucide-react";
import SavingsWidget from "@/components/savings-widget";
import RateTicker from "@/components/rate-ticker";
import RateBoard from "@/components/rate-board";
import Testimonials from "@/components/testimonials";
import { Section, SectionHead, Eyebrow } from "@/components/ui";
import { products, articles, banks } from "@/lib/data";
import { dinhDangPhanTram } from "@/lib/format";

const theoLai = [...products].sort((a, b) => a.lai_suat_uu_dai - b.lai_suat_uu_dai);
const tickerItems = theoLai.slice(0, 10);
const boardItems = theoLai.filter((p) => p.loai === "the-chap").slice(0, 6);

const nhanhVay = [
  {
    href: "/vay-the-chap",
    icon: Building2,
    ten: "Vay thế chấp",
    mo_ta: "Có sổ đỏ, sổ hồng, căn hộ hoặc ô tô. Số tiền lớn, lãi suất thấp, thời hạn dài.",
    so: dinhDangPhanTram(Math.min(...products.filter((p) => p.loai === "the-chap").map((p) => p.lai_suat_uu_dai))),
    diem: ["Hạn mức tới 30 tỷ", "Thời hạn tới 35 năm", "Vay tới 85% giá trị tài sản"],
  },
  {
    href: "/vay-tin-chap",
    icon: Wallet,
    ten: "Vay tín chấp",
    mo_ta: "Không cần tài sản đảm bảo. Xét duyệt theo thu nhập, hồ sơ gọn nhẹ.",
    so: dinhDangPhanTram(Math.min(...products.filter((p) => p.loai === "tin-chap").map((p) => p.lai_suat_uu_dai))),
    diem: ["Hạn mức tới 500 triệu", "Giải ngân từ 24 giờ", "Chỉ cần 3 loại giấy tờ"],
  },
];

const quyTrinh = [
  { so: "01", ten: "Trả lời vài câu hỏi", mo_ta: "Khoảng 2 phút. Chưa cần giấy tờ, chưa cần số điện thoại cho tới bước cuối." },
  { so: "02", ten: "Nhận danh sách gói phù hợp", mo_ta: "Hồ sơ của bạn được đối chiếu với điều kiện của 24 gói vay và xếp theo mức độ phù hợp." },
  { so: "03", ten: "Chuyên viên gọi lại", mo_ta: "Bạn chọn ngân hàng muốn nộp. Chúng tôi hỗ trợ chuẩn bị giấy tờ tới khi giải ngân." },
];

const soLieu = [
  { so: "24", nhan: "gói vay đang so sánh" },
  { so: String(banks.length), nhan: "ngân hàng đối tác" },
  { so: "1.100", nhan: "hồ sơ kết nối tháng 7" },
  { so: "0 đ", nhan: "phí người vay trả" },
];

export default function TrangChu() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-steel-200 bg-white">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-brand-light"
          aria-hidden="true"
        />
        <div className="shell relative grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_400px] lg:py-20">
          <div className="max-w-xl animate-fade-up">
            <Eyebrow>Nền tảng so sánh vay vốn</Eyebrow>
            <h1 className="mt-4 text-[2.1rem] font-bold leading-[1.1] tracking-tighter text-steel sm:text-[3rem]">
              Cùng một khoản vay, hai ngân hàng có thể chênh nhau{" "}
              <span className="text-brand">hàng trăm triệu</span>
            </h1>
            <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-steel-500">
              M-Broker đặt điều kiện thật của {banks.length} ngân hàng cạnh nhau — gồm cả lãi suất sau
              kỳ ưu đãi mà quảng cáo thường không nhắc tới. Kéo thanh trượt bên cạnh để thấy khoảng
              cách đó lớn thế nào với khoản vay của bạn.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dang-ky" className="btn-primary px-6">
                Kiểm tra hồ sơ của tôi
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/so-sanh" className="btn-ghost px-6">Xem bảng so sánh</Link>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-steel-100 pt-6 text-[13px] text-steel-500">
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-brand" aria-hidden="true" />
                Miễn phí cho người vay
              </span>
              <span className="flex items-center gap-2">
                <ScrollText size={16} className="text-brand" aria-hidden="true" />
                Không thu phí trước giải ngân
              </span>
              <span className="flex items-center gap-2">
                <Check size={16} className="text-brand" aria-hidden="true" />
                Không ảnh hưởng lịch sử tín dụng
              </span>
            </div>
          </div>

          <div className="animate-fade-up lg:pt-2" style={{ animationDelay: "120ms" }}>
            <SavingsWidget />
          </div>
        </div>
      </section>

      <RateTicker items={tickerItems} />

      <Section className="bg-white">
        <div className="grid gap-5 lg:grid-cols-2">
          {nhanhVay.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="group relative overflow-hidden rounded-card border border-steel-200 bg-white p-7 transition hover:border-brand hover:shadow-lift"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-light text-brand">
                  <n.icon size={22} aria-hidden="true" />
                </span>
                <span className="text-right">
                  <span className="num block text-2xl font-bold leading-none text-brand">{n.so}</span>
                  <span className="block text-2xs text-steel-400">mỗi năm, từ</span>
                </span>
              </div>
              <h2 className="mt-5 text-xl font-bold text-steel">{n.ten}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-steel-500">{n.mo_ta}</p>
              <ul className="mt-5 space-y-2 border-t border-steel-100 pt-4">
                {n.diem.map((d) => (
                  <li key={d} className="flex items-center gap-2.5 text-[13px] text-steel-600">
                    <Check size={14} className="flex-none text-brand" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                Xem chi tiết
                <ArrowRight size={15} className="transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <section className="bg-steel py-14">
        <div className="shell grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {soLieu.map((s) => (
            <div key={s.nhan} className="border-l-2 border-brand pl-4">
              <p className="num font-display text-[2rem] font-bold leading-none text-white">{s.so}</p>
              <p className="mt-2 text-[13px] text-steel-300">{s.nhan}</p>
            </div>
          ))}
        </div>
      </section>

      <Section className="bg-white">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
          <div>
            <SectionHead
              eyebrow="Cách hoạt động"
              title="Ba bước, và bạn giữ quyền quyết định ở cả ba"
              desc="Chúng tôi nhận phí giới thiệu từ ngân hàng khi khoản vay được giải ngân. Bạn không trả gì cả, và không bị ràng buộc phải chọn ngân hàng nào."
            />
            <ol className="mt-9 space-y-6">
              {quyTrinh.map((q) => (
                <li key={q.so} className="flex gap-5">
                  <span className="num grid h-11 w-11 flex-none place-items-center rounded-xl bg-brand-light font-display text-sm font-bold text-brand-dark">
                    {q.so}
                  </span>
                  <div>
                    <h3 className="text-[17px] font-bold text-steel">{q.ten}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-steel-500">{q.mo_ta}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link href="/dang-ky" className="btn-primary mt-9 px-6">
              Bắt đầu — mất khoảng 2 phút
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <RateBoard items={boardItems} />
        </div>
      </Section>

      <Section className="bg-steel-50">
        <SectionHead
          eyebrow="Người vay nói gì"
          title="Điều họ tiếc nhất là không so sánh sớm hơn"
          align="center"
        />
        <div className="mt-10">
          <Testimonials />
        </div>
      </Section>

      <Section className="bg-white">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-center">
          <div>
            <SectionHead
              eyebrow="Công cụ"
              title="Tính trước khoản trả, cả sau khi hết ưu đãi"
              desc="Phần lớn người vay chỉ nhìn con số ưu đãi năm đầu. Công cụ này cho bạn thấy khoản trả thay đổi thế nào khi lãi suất chuyển sang thả nổi."
            />
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/cong-cu/tinh-khoan-vay" className="btn-dark px-6">
                <Calculator size={16} aria-hidden="true" /> Mở công cụ tính
              </Link>
              <Link href="/cong-cu" className="btn-ghost px-6">Xem tất cả công cụ</Link>
            </div>
          </div>
          <div className="card p-6">
            <p className="eyebrow">Ví dụ có thật</p>
            <p className="num mt-3 text-[15px] leading-relaxed text-steel-500">
              Vay <span className="font-semibold text-steel">2 tỷ</span> trong{" "}
              <span className="font-semibold text-steel">20 năm</span>, ưu đãi{" "}
              <span className="font-semibold text-brand">5,9%</span> trong 12 tháng đầu:
            </p>
            <dl className="num mt-5 space-y-3 border-t border-steel-200 pt-4 text-sm">
              <div className="flex items-baseline justify-between">
                <dt className="text-steel-500">Trả tháng đầu</dt>
                <dd className="text-lg font-bold text-brand">18.166.667 đ</dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-steel-500">Trả tháng thứ 13</dt>
                <dd className="text-lg font-bold text-alert">22.033.333 đ</dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-dashed border-steel-200 pt-3">
                <dt className="text-steel-500">Chênh lệch</dt>
                <dd className="font-bold text-steel">+3.866.666 đ mỗi tháng</dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>

      <Section className="bg-steel-50">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead eyebrow="Kiến thức" title="Đọc trước khi ký hợp đồng vay" />
          <Link href="/kien-thuc" className="text-sm font-semibold text-brand hover:text-brand-dark">
            Tất cả bài viết →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {articles.slice(0, 3).map((a) => (
            <Link
              key={a.slug}
              href={`/kien-thuc/${a.slug}`}
              className="group card p-6 transition hover:border-brand hover:shadow-lift"
            >
              <span className="chip bg-brand-light text-brand-dark">{a.chuyen_muc}</span>
              <h3 className="mt-4 text-[16px] font-bold leading-snug text-steel group-hover:text-brand">
                {a.tieu_de}
              </h3>
              <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-steel-500">{a.mo_ta}</p>
              <p className="num mt-5 border-t border-steel-100 pt-4 text-2xs text-steel-400">
                {a.tac_gia} · {a.ngay} · {a.doc_phut} phút đọc
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <section className="relative overflow-hidden bg-brand-deep py-16">
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/5"
          aria-hidden="true"
        />
        <div className="shell relative flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-lg">
            <h2 className="text-[1.75rem] font-bold leading-tight text-white sm:text-4xl">
              Xem bạn được duyệt bao nhiêu trước khi nộp hồ sơ
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-brand-soft">
              Không cần giấy tờ, không ảnh hưởng tới lịch sử tín dụng. Số điện thoại chỉ được hỏi ở
              bước cuối cùng, sau khi bạn đã thấy kết quả.
            </p>
          </div>
          <Link href="/dang-ky" className="btn bg-white px-7 py-4 text-steel hover:bg-brand-light">
            Kiểm tra hồ sơ của tôi
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
