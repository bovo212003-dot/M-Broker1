import Link from "next/link";
import { ArrowRight, AlertTriangle, Clock, ShieldCheck } from "lucide-react";
import QuickCheck from "@/components/quick-check";
import ProfileGroups from "@/components/profile-groups";
import Faq from "@/components/faq";
import { Section, SectionHead, Eyebrow, Note, Disclosure } from "@/components/ui";
import { products } from "@/lib/data";
import { dinhDangPhanTram } from "@/lib/format";

export const metadata = {
  title: "Vay tín chấp 2026 — Kiểm tra điều kiện trong 60 giây | M-Broker",
  description:
    "So sánh gói vay tín chấp theo lương chuyển khoản, lương tiền mặt, bảo hiểm nhân thọ và hóa đơn điện nước. Không cần tài sản đảm bảo.",
};

const tinChap = products.filter((p) => p.loai === "tin-chap");
const thapNhat = Math.min(...tinChap.map((p) => p.lai_suat_uu_dai));

const dauHieuLuaDao = [
  "Yêu cầu chuyển phí bảo hiểm, phí hồ sơ hoặc phí giải ngân trước khi nhận tiền",
  "Cam kết duyệt 100%, không cần chứng minh thu nhập, không cần giấy tờ",
  "Ép cài ứng dụng qua đường link ngoài kho ứng dụng chính thức",
  "Đòi quyền truy cập danh bạ, tin nhắn hoặc thư viện ảnh trên điện thoại",
  "Giục ký hợp đồng gấp, không cho đọc kỹ điều khoản",
  "Không có địa chỉ văn phòng và mã số doanh nghiệp rõ ràng",
];

const faq = [
  {
    hoi: "Tôi từng trễ hạn thẻ tín dụng, còn vay được không?",
    dap: "Còn tùy nhóm nợ. Nhóm 1 là nợ đủ tiêu chuẩn, trễ dưới 10 ngày, gần như không ảnh hưởng. Nhóm 2 là nợ cần chú ý, trễ 10 đến 90 ngày, vẫn có một số ngân hàng và công ty tài chính xét duyệt nhưng lãi suất cao hơn. Từ nhóm 3 trở lên thì hầu hết tổ chức tín dụng sẽ từ chối cho tới khi lịch sử được làm sạch.",
  },
  {
    hoi: "Lịch sử nợ xấu lưu trên CIC bao lâu?",
    dap: "Thông tin về dư nợ và tình trạng trả nợ thường được lưu trữ và hiển thị trong khoảng 5 năm gần nhất, riêng nhóm nợ xấu thường được các tổ chức tín dụng tham chiếu trong vòng 3 đến 5 năm kể từ khi tất toán. Bạn nên tự tra cứu qua ứng dụng hoặc cổng thông tin chính thức của CIC để biết chính xác tình trạng của mình.",
  },
  {
    hoi: "M-Broker có tra cứu điểm tín dụng giúp tôi được không?",
    dap: "Không. Chúng tôi không tra cứu, không chấm điểm và không đánh giá mức độ tín nhiệm của bạn. Việc sử dụng thông tin tín dụng để chấm điểm phải tuân thủ quy định pháp luật và cần sự đồng ý của chính chủ thể dữ liệu. Bạn tự tra cứu CIC, chúng tôi chỉ giúp đối chiếu hồ sơ với điều kiện công bố của các ngân hàng.",
  },
  {
    hoi: "Nhận lương tiền mặt thì chứng minh thu nhập bằng gì?",
    dap: "Có bốn cách phổ biến: bảng lương có dấu của công ty, sổ bảo hiểm xã hội hoặc ứng dụng VssID, hợp đồng bảo hiểm nhân thọ đang đóng phí, và hóa đơn điện nước đứng tên bạn. Mỗi cách tương ứng với một nhóm sản phẩm khác nhau và hạn mức khác nhau.",
  },
  {
    hoi: "Vay tín chấp bao lâu thì nhận được tiền?",
    dap: "Với hồ sơ lương chuyển khoản đầy đủ giấy tờ, nhanh nhất là trong ngày làm việc. Các nhóm hồ sơ cần thẩm định thêm thường mất 2 đến 3 ngày làm việc.",
  },
];

export default function VayTinChap() {
  return (
    <>
      <section className="border-b border-steel-200 bg-white">
        <div className="shell grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:py-14">
          <div className="max-w-xl">
            <Eyebrow>Vay tín chấp</Eyebrow>
            <h1 className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-steel sm:text-[2.4rem]">
              Xem bạn có đủ điều kiện vay không, trước khi nộp hồ sơ ở đâu
            </h1>
            <p className="mt-5 text-[15px] leading-relaxed text-steel-500">
              Không cần tài sản đảm bảo. Trả lời {" "}
              <span className="num font-semibold text-steel">3</span> câu hỏi bên dưới để biết ngay có
              bao nhiêu ngân hàng nhận hồ sơ của bạn — không cần để lại số điện thoại.
            </p>
            <div className="num mt-8 grid grid-cols-3 gap-4 border-t border-steel-200 pt-6">
              <div>
                <dt className="text-2xs uppercase tracking-eyebrow text-steel-400">Lãi suất từ</dt>
                <dd className="mt-1 text-lg font-bold text-brand">{dinhDangPhanTram(thapNhat)}</dd>
              </div>
              <div>
                <dt className="text-2xs uppercase tracking-eyebrow text-steel-400">Hạn mức</dt>
                <dd className="mt-1 text-lg font-bold text-steel">tới 500 tr</dd>
              </div>
              <div>
                <dt className="text-2xs uppercase tracking-eyebrow text-steel-400">Giải ngân</dt>
                <dd className="mt-1 text-lg font-bold text-steel">từ 24 giờ</dd>
              </div>
            </div>
          </div>
          <div>
            <QuickCheck />
          </div>
        </div>
      </section>

      <Section className="bg-steel-50">
        <SectionHead
          eyebrow="Bước 3 — Phân loại hồ sơ"
          title="Bạn thuộc nhóm nào?"
          desc="Ở Việt Nam, cách bạn chứng minh thu nhập quan trọng hơn điểm tín dụng. Chọn nhóm của bạn để xem đúng gói vay và đúng danh sách giấy tờ."
        />
        <div className="mt-8">
          <ProfileGroups />
        </div>
        <Disclosure>
          Hạn mức và lãi suất hiển thị là mức công bố tham khảo. Hạn mức thực tế phụ thuộc vào kết quả
          thẩm định của tổ chức tín dụng. M-Broker nhận phí giới thiệu từ các tổ chức tín dụng đối tác.
        </Disclosure>
      </Section>

      <Section className="bg-white">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <SectionHead eyebrow="Bước 5 — Cảnh báo" title="Sáu dấu hiệu của một bên cho vay lừa đảo" />
            <div className="mt-6 rounded-card border border-alert/25 bg-alert-light p-5 sm:p-6">
              <p className="flex items-center gap-2 text-sm font-bold text-alert">
                <AlertTriangle size={17} aria-hidden="true" />
                Nếu gặp bất kỳ dấu hiệu nào dưới đây, hãy dừng lại
              </p>
              <ul className="mt-4 space-y-3">
                {dauHieuLuaDao.map((d, i) => (
                  <li key={d} className="flex items-start gap-3 text-sm leading-relaxed text-steel-600">
                    <span className="num mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-white text-2xs font-bold text-alert">
                      {i + 1}
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Note tone="brand" title="Cam kết của M-Broker">
              <ul className="mt-2 space-y-2.5">
                {[
                  "Chúng tôi không bao giờ yêu cầu bạn chuyển bất kỳ khoản phí nào trước khi giải ngân.",
                  "Không có tổ chức tín dụng hợp pháp nào duyệt vay 100% mà không cần giấy tờ.",
                  "Bạn có quyền từ chối bất kỳ ngân hàng nào và yêu cầu xóa dữ liệu bất cứ lúc nào.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm leading-relaxed">
                    <ShieldCheck size={15} className="mt-0.5 flex-none text-brand" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </Note>
            <div className="card mt-4 p-5">
              <p className="flex items-center gap-2 text-[13px] font-bold text-steel">
                <Clock size={15} className="text-brand" aria-hidden="true" />
                Sau khi bạn gửi hồ sơ
              </p>
              <ol className="mt-3 space-y-2.5 text-xs leading-relaxed text-steel-500">
                <li>Chuyên viên gọi lại trong 2 giờ làm việc, từ số 1900 1234.</li>
                <li>Bạn chọn ngân hàng muốn nộp hồ sơ.</li>
                <li>Chúng tôi hỗ trợ hoàn thiện giấy tờ và theo dõi tới khi có kết quả.</li>
              </ol>
            </div>
          </aside>
        </div>
      </Section>

      <Section className="bg-steel-50">
        <SectionHead
          eyebrow="Bước 7 — Hỏi đáp"
          title="Nợ xấu CIC và những câu hỏi hay gặp nhất"
          desc="M-Broker chỉ giải thích khái niệm. Chúng tôi không tra cứu và không chấm điểm tín dụng của bạn."
        />
        <div className="mt-8 max-w-3xl">
          <Faq items={faq} />
        </div>
      </Section>

      <section className="bg-steel py-14">
        <div className="shell flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-lg">
            <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
              Kiểm tra khả năng duyệt của bạn
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-steel-300">
              Mất khoảng 60 giây. Không ảnh hưởng tới lịch sử tín dụng, không mất phí.
            </p>
          </div>
          <Link href="/dang-ky?loai=tin-chap" className="btn bg-white px-6 text-steel hover:bg-steel-100">
            Kiểm tra khả năng duyệt
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
