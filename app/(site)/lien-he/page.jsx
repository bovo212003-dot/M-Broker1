import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Section, SectionHead } from "@/components/ui";

export const metadata = { title: "Liên hệ | M-Broker" };

const kenh = [
  { icon: Phone, ten: "Hotline", gt: "1900 1234", phu: "8h – 21h mỗi ngày, kể cả cuối tuần" },
  { icon: MessageCircle, ten: "Zalo OA", gt: "M-Broker", phu: "Phản hồi trong giờ hành chính" },
  { icon: Mail, ten: "Email", gt: "hotro@m-broker.vn", phu: "Phản hồi trong 24 giờ làm việc" },
  { icon: MapPin, ten: "Văn phòng", gt: "Quận 1, TP. Hồ Chí Minh", phu: "Tiếp khách theo lịch hẹn trước" },
];

export default function LienHe() {
  return (
    <Section className="bg-steel-50">
      <SectionHead
        eyebrow="Liên hệ"
        title="Cần hỏi gì, cứ gọi"
        desc="Chúng tôi không thu phí tư vấn. Nếu ai đó nhân danh M-Broker yêu cầu bạn chuyển tiền, hãy báo ngay qua hotline."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="card p-6 sm:p-8">
          <p className="text-[15px] font-bold text-steel">Gửi câu hỏi cho chúng tôi</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="lh-ten" className="text-[13px] font-medium text-steel-600">Họ và tên</label>
              <input id="lh-ten" className="field mt-2" placeholder="Nguyễn Văn A" />
            </div>
            <div>
              <label htmlFor="lh-sdt" className="text-[13px] font-medium text-steel-600">Số điện thoại</label>
              <input id="lh-sdt" className="field num mt-2" inputMode="tel" placeholder="0901234567" />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="lh-chu-de" className="text-[13px] font-medium text-steel-600">Chủ đề</label>
            <select id="lh-chu-de" className="field mt-2" defaultValue="tu-van">
              <option value="tu-van">Tư vấn khoản vay</option>
              <option value="ho-so">Hỏi về hồ sơ đang xử lý</option>
              <option value="du-lieu">Yêu cầu về dữ liệu cá nhân</option>
              <option value="hop-tac">Hợp tác kinh doanh</option>
              <option value="khac">Vấn đề khác</option>
            </select>
          </div>
          <div className="mt-4">
            <label htmlFor="lh-noi-dung" className="text-[13px] font-medium text-steel-600">Nội dung</label>
            <textarea id="lh-noi-dung" rows={5} className="field mt-2" placeholder="Mô tả ngắn gọn điều bạn cần hỗ trợ" />
          </div>
          <button type="button" className="btn-primary mt-5">Gửi câu hỏi</button>
          <p className="mt-3 text-xs text-steel-400">
            Biểu mẫu trong bản demo chưa gửi dữ liệu đi đâu cả.
          </p>
        </div>

        <div className="space-y-3">
          {kenh.map((k) => (
            <div key={k.ten} className="card flex items-start gap-4 p-5">
              <k.icon size={20} className="mt-0.5 flex-none text-brand" aria-hidden="true" />
              <div>
                <p className="text-2xs font-semibold uppercase tracking-eyebrow text-steel-400">{k.ten}</p>
                <p className="num mt-1 text-[15px] font-bold text-steel">{k.gt}</p>
                <p className="mt-0.5 text-xs text-steel-400">{k.phu}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
