import Link from "next/link";
import { notFound } from "next/navigation";
import { banks } from "@/lib/data";
import { Note } from "@/components/ui";

const TRANG = {
  "bao-mat": {
    tieu_de: "Chính sách bảo mật dữ liệu cá nhân",
    mo_ta: "Cách M-Broker thu thập, sử dụng, lưu trữ và chuyển giao thông tin của bạn.",
    muc: [
      {
        h: "Dữ liệu chúng tôi thu thập",
        p: "Thông tin nhận dạng (họ tên, số điện thoại), thông tin tài chính (thu nhập, hình thức nhận lương, tình trạng nợ hiện tại), thông tin về tài sản đảm bảo và khu vực sinh sống. Chúng tôi không yêu cầu bạn tải lên ảnh giấy tờ tùy thân ở giai đoạn đăng ký tư vấn.",
      },
      {
        h: "Mục đích sử dụng",
        p: "Đối chiếu hồ sơ của bạn với điều kiện công bố của các tổ chức tín dụng, liên hệ tư vấn qua điện thoại, và chuyển hồ sơ sang tổ chức tín dụng mà bạn đồng ý. Mỗi mục đích được xin đồng ý riêng biệt, không gộp chung.",
      },
      {
        h: "Bên thứ ba nhận dữ liệu",
        p: `Chúng tôi chỉ chuyển thông tin của bạn cho những tổ chức tín dụng bạn đã đồng ý, trong danh sách sau: ${banks.map((b) => b.name).join(", ")}.`,
      },
      {
        h: "Quyền của bạn",
        p: "Bạn có quyền được biết, quyền đồng ý và rút lại sự đồng ý, quyền truy cập, chỉnh sửa, yêu cầu xóa dữ liệu, quyền hạn chế và phản đối việc xử lý, quyền khiếu nại và yêu cầu bồi thường thiệt hại theo quy định pháp luật.",
      },
      {
        h: "Thời gian lưu trữ",
        p: "Dữ liệu hồ sơ vay được lưu tối đa 24 tháng kể từ lần tương tác cuối, sau đó được xóa hoặc ẩn danh, trừ trường hợp pháp luật yêu cầu lưu lâu hơn.",
      },
    ],
  },
  "dieu-khoan": {
    tieu_de: "Điều khoản sử dụng",
    mo_ta: "Quy định khi bạn sử dụng website và dịch vụ của M-Broker.",
    muc: [
      {
        h: "Vai trò của M-Broker",
        p: "M-Broker là nền tảng so sánh và giới thiệu khách hàng. Chúng tôi không phải tổ chức tín dụng, không trực tiếp cho vay, không quyết định việc phê duyệt khoản vay và không chịu rủi ro tín dụng.",
      },
      {
        h: "Tính chất thông tin",
        p: "Toàn bộ lãi suất, hạn mức và điều kiện hiển thị trên website là thông tin tham khảo được cập nhật thủ công. Điều kiện chính thức do tổ chức tín dụng quyết định sau khi thẩm định hồ sơ.",
      },
      {
        h: "Chi phí",
        p: "Dịch vụ hoàn toàn miễn phí với người vay. M-Broker nhận phí giới thiệu từ tổ chức tín dụng. Chúng tôi không bao giờ yêu cầu người vay chuyển tiền ở bất kỳ thời điểm nào.",
      },
    ],
  },
  "xoa-du-lieu": {
    tieu_de: "Yêu cầu xóa dữ liệu cá nhân",
    mo_ta: "Gửi yêu cầu xóa toàn bộ dữ liệu của bạn khỏi hệ thống M-Broker.",
    muc: [
      {
        h: "Cách thực hiện",
        p: "Nhập số điện thoại đã dùng khi đăng ký, xác thực bằng mã gửi qua tin nhắn, sau đó xác nhận yêu cầu. Chúng tôi xử lý trong vòng 72 giờ làm việc và gửi thông báo khi hoàn tất.",
      },
      {
        h: "Điều gì sẽ bị xóa",
        p: "Toàn bộ thông tin nhận dạng và thông tin tài chính của bạn. Dữ liệu thống kê đã được ẩn danh và nhật ký đồng ý được giữ lại theo yêu cầu pháp lý về lưu vết.",
      },
      {
        h: "Lưu ý",
        p: "Nếu hồ sơ của bạn đã được chuyển sang tổ chức tín dụng, bạn cần gửi yêu cầu xóa riêng tới tổ chức đó, vì họ trở thành bên kiểm soát dữ liệu độc lập kể từ thời điểm tiếp nhận.",
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(TRANG).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const t = TRANG[params.slug];
  return t ? { title: `${t.tieu_de} | M-Broker`, description: t.mo_ta } : { title: "Không tìm thấy trang" };
}

export default function PhapLy({ params }) {
  const t = TRANG[params.slug];
  if (!t) notFound();

  return (
    <div className="shell py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-steel sm:text-3xl">{t.tieu_de}</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-steel-500">{t.mo_ta}</p>

        <div className="mt-10 space-y-8">
          {t.muc.map((m, i) => (
            <section key={m.h}>
              <h2 className="text-[17px] font-bold text-steel">
                <span className="num mr-2 text-brand">{String(i + 1).padStart(2, "0")}</span>
                {m.h}
              </h2>
              <p className="mt-2.5 text-[15px] leading-[1.8] text-steel-600">{m.p}</p>
            </section>
          ))}
        </div>

        {params.slug === "xoa-du-lieu" && (
          <div className="card mt-10 p-6">
            <label htmlFor="xd-sdt" className="text-[13px] font-medium text-steel-600">
              Số điện thoại đã dùng khi đăng ký
            </label>
            <input id="xd-sdt" className="field num mt-2" inputMode="tel" placeholder="0901234567" />
            <button type="button" className="btn-primary mt-4 w-full">Gửi mã xác thực</button>
            <p className="mt-3 text-xs text-steel-400">Biểu mẫu trong bản demo chưa gửi dữ liệu đi đâu cả.</p>
          </div>
        )}

        <div className="mt-10">
          <Note tone="brand" title="Cần hỗ trợ thêm?">
            Gọi hotline 1900 1234 hoặc gửi email tới hotro@m-broker.vn. Bạn cũng có thể xem{" "}
            <Link href="/ve-chung-toi" className="font-semibold underline">nguyên tắc biên tập</Link> của chúng tôi.
          </Note>
        </div>
      </div>
    </div>
  );
}
