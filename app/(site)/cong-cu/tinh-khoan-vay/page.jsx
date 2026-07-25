import LoanCalculator from "@/components/loan-calculator";
import { Section, Note } from "@/components/ui";

export const metadata = {
  title: "Công cụ tính lịch trả nợ vay | M-Broker",
  description: "Tính khoản trả hàng tháng theo dư nợ giảm dần hoặc trả đều, có tính cả lãi suất thả nổi sau kỳ ưu đãi.",
};

export default function TinhKhoanVay() {
  return (
    <>
      <section className="border-b border-steel-200 bg-white">
        <div className="shell py-10">
          <h1 className="max-w-2xl text-2xl font-bold leading-tight tracking-tight text-steel sm:text-3xl">
            Tính lịch trả nợ, gồm cả phần sau khi hết ưu đãi
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-steel-500">
            Hầu hết công cụ trên mạng chỉ tính theo một mức lãi suất cố định. Công cụ này tách riêng kỳ
            ưu đãi và kỳ thả nổi để bạn thấy khoản trả thật sự thay đổi thế nào.
          </p>
        </div>
      </section>
      <Section className="bg-steel-50">
        <LoanCalculator />
        <div className="mt-8 max-w-2xl">
          <Note tone="signal" title="Vì sao khoản trả tháng 13 cao hơn tháng 12">
            Với phương thức dư nợ giảm dần, phần gốc trả hàng tháng cố định còn phần lãi giảm dần theo
            dư nợ. Nhưng khi hết kỳ ưu đãi, lãi suất áp dụng nhảy từ mức ưu đãi lên mức thả nổi, nên
            phần lãi tăng vọt và tổng khoản trả tăng theo. Đây là thời điểm nhiều người vay bị bất ngờ.
          </Note>
        </div>
      </Section>
    </>
  );
}
