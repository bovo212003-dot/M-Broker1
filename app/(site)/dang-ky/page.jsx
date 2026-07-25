import { Suspense } from "react";
import FunnelForm from "@/components/funnel-form";

export const metadata = {
  title: "Đăng ký tư vấn khoản vay | M-Broker",
  description: "Trả lời vài câu hỏi để xem gói vay phù hợp. Miễn phí, không ảnh hưởng lịch sử tín dụng.",
};

export default function DangKy() {
  return (
    <div className="shell py-10 sm:py-14">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-steel sm:text-3xl">
          Xem gói vay phù hợp với hồ sơ của bạn
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-steel-500">
          Mất khoảng 2 phút. Chúng tôi chỉ hỏi số điện thoại ở bước cuối cùng, sau khi đã cho bạn thấy
          kết quả.
        </p>
      </div>
      <div className="mt-8">
        <Suspense fallback={<div className="card p-10 text-center text-sm text-steel-400">Đang tải biểu mẫu…</div>}>
          <FunnelForm />
        </Suspense>
      </div>
    </div>
  );
}
