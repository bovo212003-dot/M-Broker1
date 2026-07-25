import CompareTable from "@/components/compare-table";
import { Section, SectionHead, Disclosure } from "@/components/ui";
import { products, CAP_NHAT, banks } from "@/lib/data";

export const metadata = {
  title: "So sánh lãi suất vay 2026 — 24 gói từ 12 ngân hàng | M-Broker",
  description:
    "Bảng so sánh đầy đủ lãi suất vay thế chấp và tín chấp, gồm cả lãi suất sau kỳ ưu đãi, hạn mức và thời hạn tối đa.",
};

const tieuChi = [
  { ten: "Khả năng được duyệt", ty_le: "30%", mo_ta: "Điều kiện thu nhập, hồ sơ, khu vực nhận" },
  { ten: "Chi phí vay thực tế", ty_le: "35%", mo_ta: "Lãi suất ưu đãi, biên độ, biểu phí" },
  { ten: "Điều khoản khoản vay", ty_le: "20%", mo_ta: "Hạn mức, thời hạn, tỷ lệ vay tối đa" },
  { ten: "Hỗ trợ khi trả nợ", ty_le: "15%", mo_ta: "Phí trả trước hạn, cơ cấu nợ, chăm sóc khách" },
];

export default function SoSanh() {
  return (
    <>
      <section className="border-b border-steel-200 bg-white">
        <div className="shell py-12">
          <p className="eyebrow flex items-center gap-2">
            <span className="inline-block h-px w-6 bg-brand" aria-hidden="true" />
            Cập nhật {CAP_NHAT}
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-[1.15] tracking-tight text-steel sm:text-[2.4rem]">
            Bảng so sánh <span className="num">{products.length}</span> gói vay từ{" "}
            <span className="num">{banks.length}</span> ngân hàng
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-steel-500">
            Chúng tôi hiển thị cả lãi suất sau kỳ ưu đãi vì đó là con số bạn trả trong phần lớn thời
            gian vay. Tick tối đa 3 gói để đặt cạnh nhau và xem tổng chi phí.
          </p>
        </div>
      </section>

      <Section className="bg-steel-50">
        <CompareTable danhSach={products} tieuDe="Bảng so sánh toàn bộ gói vay" />
        <Disclosure>
          Thứ tự mặc định sắp xếp theo lãi suất ưu đãi từ thấp đến cao và không phản ánh mức phí giới
          thiệu mà tổ chức tín dụng trả cho M-Broker. Chúng tôi không hiển thị toàn bộ sản phẩm có
          trên thị trường.
        </Disclosure>
      </Section>

      <Section className="bg-white">
        <SectionHead
          eyebrow="Phương pháp"
          title="Chúng tôi chấm điểm gói vay như thế nào"
          desc="Điểm đánh giá hiển thị bên cạnh mỗi ngân hàng được tính theo bốn nhóm tiêu chí dưới đây. Đội ngũ biên tập chấm điểm độc lập với bộ phận hợp tác kinh doanh."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tieuChi.map((t) => (
            <div key={t.ten} className="rounded-card border-t-2 border-brand bg-white p-5 ring-1 ring-steel-200">
              <p className="num text-2xl font-bold text-brand">{t.ty_le}</p>
              <h3 className="mt-2 text-sm font-bold text-steel">{t.ten}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-steel-500">{t.mo_ta}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
