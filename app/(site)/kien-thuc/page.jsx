import Link from "next/link";
import { Section, SectionHead } from "@/components/ui";
import { articles } from "@/lib/data";

export const metadata = { title: "Kiến thức vay vốn | M-Broker" };

const chuyenMuc = [...new Set(articles.map((a) => a.chuyen_muc))];

export default function KienThuc() {
  const [noiBat, ...conLai] = articles;
  return (
    <Section className="bg-steel-50">
      <SectionHead
        eyebrow="Kiến thức"
        title="Đọc trước khi ký hợp đồng vay"
        desc="Bài viết do chuyên viên tín dụng biên soạn và được kiểm duyệt độc lập. Chúng tôi không nhận tiền để viết bài khen sản phẩm."
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {["Tất cả", ...chuyenMuc].map((c, i) => (
          <span
            key={c}
            className={`rounded-lg px-3.5 py-2 text-[13px] font-semibold ${
              i === 0 ? "bg-steel text-white" : "bg-white text-steel-500 ring-1 ring-steel-200"
            }`}
          >
            {c}
          </span>
        ))}
      </div>

      <Link href={`/kien-thuc/${noiBat.slug}`} className="card mt-8 block p-6 transition hover:border-brand sm:p-8">
        <span className="chip bg-brand-light text-brand-dark">{noiBat.chuyen_muc}</span>
        <h2 className="mt-4 max-w-2xl text-xl font-bold leading-snug text-steel sm:text-2xl">
          {noiBat.tieu_de}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-steel-500">{noiBat.mo_ta}</p>
        <p className="num mt-5 text-xs text-steel-400">
          {noiBat.tac_gia} · kiểm duyệt bởi {noiBat.kiem_duyet} · {noiBat.ngay} · {noiBat.doc_phut} phút đọc
        </p>
      </Link>

      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {conLai.map((a) => (
          <Link key={a.slug} href={`/kien-thuc/${a.slug}`} className="card group p-5 transition hover:border-brand">
            <span className="chip bg-steel-50 text-steel-500">{a.chuyen_muc}</span>
            <h3 className="mt-3 text-[15px] font-bold leading-snug text-steel group-hover:text-brand">
              {a.tieu_de}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-steel-500">{a.mo_ta}</p>
            <p className="num mt-4 border-t border-steel-100 pt-3 text-2xs text-steel-400">
              {a.tac_gia} · {a.ngay} · {a.doc_phut} phút đọc
            </p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
