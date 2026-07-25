import { Quote } from "lucide-react";

const y_kien = [
  {
    noi_dung:
      "Tôi định vay ngân hàng đang gửi lương vì tiện. Xem bảng biên độ mới biết gói đó cộng thêm 4% sau ưu đãi, chuyển sang ngân hàng khác đỡ được gần 200 triệu tiền lãi.",
    ten: "Anh Hùng",
    mo_ta: "Vay 2 tỷ mua căn hộ · TP. Hồ Chí Minh",
  },
  {
    noi_dung:
      "Nhận lương tiền mặt nên chỗ nào cũng lắc đầu. Ở đây có mục riêng cho nhóm của tôi, nói rõ cần bảng lương có dấu và sổ bảo hiểm. Ba ngày sau là xong.",
    ten: "Chị Lan",
    mo_ta: "Vay tín chấp 80 triệu · Bình Dương",
  },
  {
    noi_dung:
      "Điều tôi thích là không ai giục. Điền xong thì hiện luôn 5 gói, tôi tự đọc rồi mới bấm nhận tư vấn. Không bị gọi làm phiền trước khi mình sẵn sàng.",
    ten: "Anh Bảo",
    mo_ta: "Vay kinh doanh 800 triệu · Đồng Nai",
  },
];

export default function Testimonials() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {y_kien.map((y) => (
        <figure key={y.ten} className="card flex flex-col p-6">
          <Quote size={20} className="text-brand-soft" aria-hidden="true" />
          <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-steel-600">
            {y.noi_dung}
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3 border-t border-steel-100 pt-4">
            <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-brand-light font-display text-xs font-bold text-brand-dark">
              {y.ten.split(" ").slice(-1)[0].slice(0, 2).toUpperCase()}
            </span>
            <span>
              <span className="block text-sm font-semibold text-steel">{y.ten}</span>
              <span className="block text-xs text-steel-400">{y.mo_ta}</span>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
