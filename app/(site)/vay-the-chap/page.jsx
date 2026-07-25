import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import LtvCheck from "@/components/ltv-check";
import LoanCalculator from "@/components/loan-calculator";
import CompareTable from "@/components/compare-table";
import Checklist from "@/components/checklist";
import Faq from "@/components/faq";
import { Section, SectionHead, Eyebrow, Note, Disclosure } from "@/components/ui";
import { products, banks, bankById } from "@/lib/data";
import { dinhDangPhanTram } from "@/lib/format";

export const metadata = {
  title: "Vay thế chấp 2026 — So sánh lãi suất 8 ngân hàng | M-Broker",
  description:
    "So sánh lãi suất vay thế chấp sổ đỏ, sổ hồng, căn hộ và ô tô. Xem cả lãi suất sau kỳ ưu đãi và biên độ thả nổi của từng ngân hàng.",
};

const theChap = products.filter((p) => p.loai === "the-chap");
const thapNhat = Math.min(...theChap.map((p) => p.lai_suat_uu_dai));

const dieuKien = [
  "Từ 20 đến 65 tuổi tại thời điểm kết thúc khoản vay",
  "Có thu nhập ổn định và chứng minh được bằng giấy tờ",
  "Tài sản đảm bảo có giấy chứng nhận quyền sở hữu hợp lệ",
  "Không có nợ xấu nhóm 3 trở lên trong 24 tháng gần nhất",
  "Tài sản không đang tranh chấp và không bị kê biên",
];

const quyTrinh = [
  { ten: "Nộp hồ sơ", thoi_gian: "1 ngày", mo_ta: "Chuyên viên kiểm tra sơ bộ và hướng dẫn bổ sung giấy tờ còn thiếu." },
  { ten: "Thẩm định tài sản", thoi_gian: "3 – 5 ngày", mo_ta: "Ngân hàng cử đơn vị định giá xuống thực địa và ra chứng thư." },
  { ten: "Phê duyệt khoản vay", thoi_gian: "5 – 7 ngày", mo_ta: "Bộ phận tái thẩm định xét hạn mức, lãi suất và thời hạn cuối cùng." },
  { ten: "Công chứng và đăng ký", thoi_gian: "2 – 3 ngày", mo_ta: "Ký hợp đồng thế chấp tại phòng công chứng và đăng ký giao dịch bảo đảm." },
  { ten: "Giải ngân", thoi_gian: "1 ngày", mo_ta: "Tiền chuyển vào tài khoản bạn hoặc chuyển thẳng cho bên bán." },
];

const faq = [
  {
    hoi: "Tôi vay được tối đa bao nhiêu phần trăm giá trị căn nhà?",
    dap: "Phổ biến là 70 – 80% giá trị định giá của ngân hàng, không phải giá bạn mua. Ngân hàng thường định giá thấp hơn giá thị trường khoảng 10 – 15%, nên nếu mua căn hộ 3 tỷ, ngân hàng có thể chỉ định giá 2,7 tỷ và cho vay 70% của con số đó.",
  },
  {
    hoi: "Sổ đỏ đứng tên bố mẹ, tôi có vay được không?",
    dap: "Được, dưới hình thức bên thứ ba bảo lãnh bằng tài sản. Bố mẹ bạn sẽ ký với tư cách bên bảo lãnh và cùng ra phòng công chứng. Một số ngân hàng yêu cầu thêm chữ ký của tất cả đồng sở hữu có tên trên sổ.",
  },
  {
    hoi: "Trả nợ trước hạn có bị phạt không?",
    dap: "Có, hầu hết ngân hàng thu 1 – 3% trên số tiền trả trước, áp dụng trong 2 – 5 năm đầu và giảm dần theo năm. Nếu bạn dự định trả sớm, hãy so sánh biểu phí này thay vì chỉ nhìn lãi suất ưu đãi.",
  },
  {
    hoi: "Vì sao khoản trả hàng tháng của tôi tăng sau năm đầu?",
    dap: "Vì lãi suất ưu đãi chỉ áp dụng trong kỳ đầu, thường 6 – 24 tháng. Sau đó lãi suất chuyển sang thả nổi, tính bằng lãi suất cơ sở của ngân hàng cộng biên độ cố định ghi trong hợp đồng. Biên độ mới là con số bạn cần đàm phán, không phải lãi suất ưu đãi.",
  },
];

export default function VayTheChap() {
  return (
    <>
      <section className="border-b border-steel-200 bg-white">
        <div className="shell grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:py-16">
          <div className="max-w-xl">
            <Eyebrow>Vay thế chấp</Eyebrow>
            <h1 className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-steel sm:text-[2.4rem]">
              Vay thế chấp: {theChap.length} gói từ {new Set(theChap.map((p) => p.bankId)).size} ngân
              hàng, lãi suất từ{" "}
              <span className="num text-brand">{dinhDangPhanTram(thapNhat)}</span>
            </h1>
            <p className="mt-5 text-[15px] leading-relaxed text-steel-500">
              Bảng dưới đây hiển thị cả lãi suất ưu đãi lẫn lãi suất sau ưu đãi. Con số thứ hai mới là
              thứ bạn trả trong phần lớn thời gian vay.
            </p>
            <dl className="num mt-8 grid grid-cols-3 gap-4 border-t border-steel-200 pt-6">
              <div>
                <dt className="text-2xs uppercase tracking-eyebrow text-steel-400">Hạn mức</dt>
                <dd className="mt-1 text-lg font-bold text-steel">tới 30 tỷ</dd>
              </div>
              <div>
                <dt className="text-2xs uppercase tracking-eyebrow text-steel-400">Thời hạn</dt>
                <dd className="mt-1 text-lg font-bold text-steel">tới 35 năm</dd>
              </div>
              <div>
                <dt className="text-2xs uppercase tracking-eyebrow text-steel-400">Tỷ lệ vay</dt>
                <dd className="mt-1 text-lg font-bold text-steel">tới 85%</dd>
              </div>
            </dl>
          </div>
          <div className="lg:pt-4">
            <LtvCheck />
          </div>
        </div>
      </section>

      <Section className="bg-steel-50" id="tinh-toan">
        <SectionHead
          eyebrow="Bước 2 — Tính toán"
          title="Khoản trả hàng tháng của bạn sẽ là bao nhiêu"
          desc="Kéo các thanh trượt để thấy khoản trả thay đổi. Biểu đồ tách riêng phần gốc và phần lãi theo từng kỳ."
        />
        <div className="mt-8">
          <LoanCalculator macDinh={{ so_tien: 2000, thoi_han: 240, lai: 5.9, thang_uu_dai: 12, bien_do: 3.5 }} />
        </div>
      </Section>

      <Section className="bg-white" id="so-sanh">
        <SectionHead
          eyebrow="Bước 3 — So sánh"
          title={`${theChap.length} gói vay thế chấp đang có trên thị trường`}
          desc="Lọc theo mục đích vay và loại tài sản. Tick tối đa 3 gói để đặt cạnh nhau."
        />
        <div className="mt-8">
          <CompareTable danhSach={theChap} loaiMacDinh="the-chap" tieuDe="Bảng so sánh gói vay thế chấp" />
        </div>
        <Disclosure>
          Thứ tự hiển thị mặc định sắp xếp theo lãi suất ưu đãi từ thấp đến cao. Các tổ chức tín dụng
          trả phí giới thiệu cho M-Broker; điều này ảnh hưởng tới việc sản phẩm nào xuất hiện trên nền
          tảng, nhưng không ảnh hưởng tới số liệu và nhận xét trong bảng.
        </Disclosure>
      </Section>

      <Section className="bg-steel-50">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <SectionHead
              eyebrow="Bước 4 — Điều cần biết"
              title="Lãi suất 5,5% chỉ tồn tại trong 12 tháng đầu"
            />
            <div className="mt-6 space-y-4">
              <Note tone="signal" title="Sau kỳ ưu đãi, lãi suất được tính lại theo công thức trong hợp đồng">
                Lãi suất thả nổi = lãi suất cơ sở của ngân hàng + biên độ cố định. Lãi suất cơ sở thay
                đổi theo thị trường, còn biên độ được ghi cứng trong hợp đồng và không đổi suốt thời
                gian vay. Vì vậy biên độ mới là con số quyết định, không phải lãi suất quảng cáo.
              </Note>
              <div className="card overflow-hidden">
                <div className="border-b border-steel-200 px-5 py-3">
                  <p className="flex items-center gap-2 text-[13px] font-bold text-steel">
                    <TrendingUp size={15} className="text-alert" aria-hidden="true" />
                    Biên độ cộng thêm của từng ngân hàng
                  </p>
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-steel-50 text-2xs uppercase tracking-eyebrow text-steel-400">
                    <tr>
                      <th scope="col" className="px-5 py-2.5 text-left font-semibold">Ngân hàng</th>
                      <th scope="col" className="px-5 py-2.5 text-right font-semibold">Ưu đãi</th>
                      <th scope="col" className="px-5 py-2.5 text-right font-semibold">Biên độ</th>
                      <th scope="col" className="px-5 py-2.5 text-right font-semibold">Ước tính sau ưu đãi</th>
                    </tr>
                  </thead>
                  <tbody className="num divide-y divide-steel-100">
                    {theChap
                      .slice()
                      .sort((a, b) => a.bien_do - b.bien_do)
                      .map((p) => (
                        <tr key={p.slug}>
                          <td className="px-5 py-2.5 font-medium text-steel">{bankById(p.bankId).name}</td>
                          <td className="px-5 py-2.5 text-right text-brand">{dinhDangPhanTram(p.lai_suat_uu_dai)}</td>
                          <td className="px-5 py-2.5 text-right text-steel-500">+{dinhDangPhanTram(p.bien_do)}</td>
                          <td className="px-5 py-2.5 text-right font-semibold text-alert">
                            {dinhDangPhanTram(p.lai_suat_co_so + p.bien_do)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs leading-relaxed text-steel-400">
                Lãi suất cơ sở dùng để ước tính là số liệu công bố gần nhất của từng ngân hàng và sẽ
                thay đổi theo thị trường. Bảng này chỉ nhằm so sánh tương đối giữa các ngân hàng.
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <Checklist items={dieuKien} cta="/dang-ky?loai=the-chap" />
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <SectionHead
          eyebrow="Bước 5 — Quy trình"
          title="Từ lúc nộp hồ sơ đến khi nhận tiền mất khoảng 2 đến 3 tuần"
        />
        <ol className="mt-8 grid gap-4 md:grid-cols-5">
          {quyTrinh.map((q, i) => (
            <li key={q.ten} className="rounded-card border border-steel-200 bg-white p-4">
              <div className="flex items-baseline justify-between">
                <span className="num text-xl font-bold text-brand">{String(i + 1).padStart(2, "0")}</span>
                <span className="num chip bg-steel-50 text-steel-500">{q.thoi_gian}</span>
              </div>
              <h3 className="mt-3 text-sm font-bold text-steel">{q.ten}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-steel-500">{q.mo_ta}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="bg-steel-50">
        <SectionHead eyebrow="Bước 6 — Hỏi đáp" title="Câu hỏi thường gặp về vay thế chấp" />
        <div className="mt-8 max-w-3xl">
          <Faq items={faq} />
        </div>
      </Section>

      <section className="bg-steel py-16">
        <div className="shell flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-lg">
            <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
              Nhận tư vấn miễn phí về khoản vay thế chấp
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-steel-300">
              Chuyên viên sẽ đối chiếu hồ sơ của bạn với điều kiện thật của từng ngân hàng và nói rõ
              khả năng được duyệt trước khi bạn nộp bất kỳ giấy tờ nào.
            </p>
          </div>
          <Link href="/dang-ky?loai=the-chap" className="btn bg-white px-6 text-steel hover:bg-steel-100">
            Nhận tư vấn miễn phí
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
