import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle2, Phone, MessageCircle, FileText } from "lucide-react";
import { Note } from "@/components/ui";
import MaHoSo from "./ma-ho-so";

export const metadata = { title: "Đã tiếp nhận hồ sơ | M-Broker" };

const giayTo = [
  "CCCD hoặc hộ chiếu còn hiệu lực",
  "Giấy tờ chứng minh thu nhập 3 tháng gần nhất",
  "Giấy tờ tài sản đảm bảo (nếu vay thế chấp)",
  "Giấy tờ chứng minh nơi ở hiện tại",
];

export default function HoanTat() {
  return (
    <div className="shell py-14 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <CheckCircle2 size={44} className="mx-auto text-brand" aria-hidden="true" />
        <h1 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-steel sm:text-3xl">
          Đã tiếp nhận hồ sơ của bạn
        </h1>
        <Suspense fallback={null}>
          <MaHoSo />
        </Suspense>
      </div>

      <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
        <div className="card p-5">
          <Phone size={20} className="text-brand" aria-hidden="true" />
          <p className="mt-3 text-[15px] font-bold text-steel">Chuyên viên sẽ gọi trong 2 giờ làm việc</p>
          <p className="mt-2 text-sm leading-relaxed text-steel-500">
            Cuộc gọi đến từ số <span className="num font-semibold text-steel">1900 1234</span>. Hãy lưu số
            này để không bỏ lỡ.
          </p>
        </div>
        <div className="card p-5">
          <MessageCircle size={20} className="text-brand" aria-hidden="true" />
          <p className="mt-3 text-[15px] font-bold text-steel">Nhận cập nhật qua Zalo</p>
          <p className="mt-2 text-sm leading-relaxed text-steel-500">
            Kết nối Zalo OA để theo dõi trạng thái hồ sơ mà không cần chờ điện thoại.
          </p>
          <button type="button" className="btn-ghost mt-4 w-full py-2.5 text-[13px]">
            Thêm Zalo M-Broker
          </button>
        </div>
      </div>

      <div className="mx-auto mt-4 max-w-3xl">
        <div className="card p-5">
          <p className="flex items-center gap-2 text-[15px] font-bold text-steel">
            <FileText size={17} className="text-brand" aria-hidden="true" />
            Chuẩn bị sẵn để rút ngắn thời gian xử lý
          </p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {giayTo.map((g, i) => (
              <li key={g} className="flex items-start gap-2.5 text-sm leading-relaxed text-steel-600">
                <span className="num mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-steel-50 text-2xs font-bold text-steel-500">
                  {i + 1}
                </span>
                {g}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <Note tone="brand" title="Nhắc lại cam kết">
            M-Broker không thu bất kỳ khoản phí nào từ bạn. Nếu có ai nhân danh chúng tôi yêu cầu
            chuyển tiền trước khi giải ngân, đó là lừa đảo — hãy báo ngay qua hotline.
          </Note>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/tra-cuu" className="btn-dark">Tra cứu trạng thái hồ sơ</Link>
          <Link href="/kien-thuc" className="btn-ghost">Đọc kiến thức vay vốn</Link>
        </div>
      </div>
    </div>
  );
}
