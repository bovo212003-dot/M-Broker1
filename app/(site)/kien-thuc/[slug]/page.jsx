import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { articles, articleBySlug } from "@/lib/data";
import { Note } from "@/components/ui";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }) {
  const a = articleBySlug(params.slug);
  return a ? { title: `${a.tieu_de} | M-Broker`, description: a.mo_ta } : { title: "Không tìm thấy bài viết" };
}

const MUC_LUC = [
  "Vấn đề nằm ở đâu",
  "Con số thực tế",
  "Cách kiểm tra hồ sơ của bạn",
  "Nên làm gì tiếp theo",
];

export default function BaiViet({ params }) {
  const a = articleBySlug(params.slug);
  if (!a) notFound();
  const khac = articles.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <div className="shell grid gap-10 py-10 lg:grid-cols-[220px_minmax(0,1fr)_260px] lg:py-14">
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <p className="eyebrow">Mục lục</p>
          <ul className="mt-4 space-y-2.5">
            {MUC_LUC.map((m, i) => (
              <li key={m}>
                <span className={`text-[13px] leading-snug ${i === 0 ? "font-semibold text-brand" : "text-steel-500"}`}>
                  {m}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <article>
        <nav className="flex flex-wrap items-center gap-2 text-xs text-steel-400" aria-label="Đường dẫn">
          <Link href="/" className="hover:text-brand">Trang chủ</Link>
          <span aria-hidden="true">/</span>
          <Link href="/kien-thuc" className="hover:text-brand">Kiến thức</Link>
          <span aria-hidden="true">/</span>
          <span className="text-steel-500">{a.chuyen_muc}</span>
        </nav>

        <h1 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-steel sm:text-[2rem]">
          {a.tieu_de}
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-steel-500">{a.mo_ta}</p>

        <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-steel-200 py-4">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-steel font-display text-xs font-bold text-white">
            {a.tac_gia.split(" ").slice(-1)[0].slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-steel">{a.tac_gia}</p>
            <p className="text-xs text-steel-400">{a.chuc_danh}</p>
          </div>
          <div className="num ml-auto text-right text-xs text-steel-400">
            <p>Kiểm duyệt: {a.kiem_duyet}</p>
            <p className="mt-0.5">Cập nhật {a.ngay} · {a.doc_phut} phút đọc</p>
          </div>
        </div>

        <div className="mt-8 space-y-5 text-[15px] leading-[1.8] text-steel-600">
          <h2 className="text-xl font-bold text-steel">Vấn đề nằm ở đâu</h2>
          <p>
            Đây là bài viết mẫu trong bản demo giao diện. Trong dự án thật, phần nội dung này do đội
            biên tập soạn và quản lý qua hệ thống quản trị nội dung, với đầy đủ tiêu đề phụ, bảng số
            liệu, hình minh họa và các khối trích dẫn.
          </p>
          <p>
            Bố cục được thiết kế cho bài dài: mục lục cố định bên trái để người đọc nhảy nhanh giữa các
            phần, thông tin tác giả và người kiểm duyệt đặt ngay dưới tiêu đề, và khối kêu gọi hành
            động chèn giữa bài thay vì chỉ nằm ở cuối.
          </p>

          <div className="my-8">
            <Note tone="signal" title="Điểm cần nhớ">
              Với lĩnh vực tài chính, việc hiển thị rõ tên tác giả, chức danh, kinh nghiệm và người
              kiểm duyệt là yếu tố then chốt để nội dung được đánh giá cao về độ tin cậy.
            </Note>
          </div>

          <h2 className="text-xl font-bold text-steel">Con số thực tế</h2>
          <p>
            Trong bài viết thật, đây là nơi đặt bảng so sánh số liệu giữa các ngân hàng, biểu đồ diễn
            biến lãi suất, hoặc ví dụ tính toán cụ thể theo một hồ sơ giả định.
          </p>

          <div className="my-8 rounded-card bg-steel p-6 text-white">
            <p className="text-[17px] font-bold">Bạn đang cân nhắc một khoản vay?</p>
            <p className="mt-2 text-sm leading-relaxed text-steel-300">
              So sánh 24 gói vay từ 12 ngân hàng và xem khoản trả hàng tháng trước khi quyết định.
            </p>
            <Link href="/so-sanh" className="btn mt-4 bg-white px-5 text-steel hover:bg-steel-100">
              Mở bảng so sánh <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <h2 className="text-xl font-bold text-steel">Nên làm gì tiếp theo</h2>
          <p>
            Kết bài thường dẫn người đọc sang công cụ tính toán hoặc trang danh mục sản phẩm tương ứng,
            thay vì kết thúc bằng một lời kêu gọi chung chung.
          </p>
        </div>

        <div className="mt-10 border-t border-steel-200 pt-6">
          <p className="eyebrow">Bài viết liên quan</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {khac.map((k) => (
              <Link key={k.slug} href={`/kien-thuc/${k.slug}`} className="card p-4 transition hover:border-brand">
                <span className="chip bg-steel-50 text-steel-500">{k.chuyen_muc}</span>
                <p className="mt-2.5 text-[13px] font-bold leading-snug text-steel">{k.tieu_de}</p>
              </Link>
            ))}
          </div>
        </div>
      </article>

      <aside className="hidden lg:block">
        <div className="sticky top-24 space-y-4">
          <div className="card p-5">
            <p className="text-[13px] font-bold text-steel">Kiểm tra hồ sơ của bạn</p>
            <p className="mt-2 text-xs leading-relaxed text-steel-500">
              Mất 2 phút, chưa cần số điện thoại cho tới bước cuối.
            </p>
            <Link href="/dang-ky" className="btn-primary mt-4 w-full py-2.5 text-[13px]">
              Bắt đầu
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
