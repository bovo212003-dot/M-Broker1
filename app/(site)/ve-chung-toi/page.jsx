import Link from "next/link";
import { Section, SectionHead, Stat, Note } from "@/components/ui";
import { banks } from "@/lib/data";

export const metadata = { title: "Về M-Broker" };

const doiNgu = [
  { ten: "Trần Thu Hà, CFA", vai_tro: "Trưởng ban biên tập", kinh_nghiem: "14 năm trong ngành ngân hàng bán lẻ, từng phụ trách khối tín dụng cá nhân." },
  { ten: "Nguyễn Minh Đức", vai_tro: "Chuyên viên phân tích tín dụng", kinh_nghiem: "11 năm thẩm định hồ sơ vay thế chấp tại hai ngân hàng thương mại." },
  { ten: "Lê Hoàng Nam", vai_tro: "Chuyên viên nội dung", kinh_nghiem: "9 năm làm thẩm định tín dụng, chuyên mảng vay tín chấp và thẻ." },
];

const nguyenTac = [
  { ten: "Đối tác không mua được nội dung", mo_ta: "Tổ chức tín dụng trả phí giới thiệu, nhưng không thể trả tiền để được khen trong bài viết hoặc để được chấm điểm cao hơn." },
  { ten: "Công bố mọi xung đột lợi ích", mo_ta: "Mọi trang có sản phẩm của đối tác đều hiển thị dòng công bố quảng cáo ở cuối trang." },
  { ten: "Nói cả điều bất lợi", mo_ta: "Chúng tôi hiển thị lãi suất sau kỳ ưu đãi và biểu phí trả nợ trước hạn, kể cả khi điều đó khiến sản phẩm kém hấp dẫn hơn." },
  { ten: "Không thu phí người vay", mo_ta: "Chúng tôi không bao giờ yêu cầu người vay chuyển bất kỳ khoản nào, ở bất kỳ thời điểm nào." },
];

export default function VeChungToi() {
  return (
    <>
      <section className="border-b border-steel-200 bg-white">
        <div className="shell py-14">
          <h1 className="max-w-3xl text-3xl font-bold leading-[1.15] tracking-tight text-steel sm:text-[2.4rem]">
            Chúng tôi kiếm tiền từ ngân hàng, không phải từ bạn — và nói rõ điều đó
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-steel-500">
            M-Broker là nền tảng so sánh và kết nối vay vốn. Chúng tôi không phải tổ chức tín dụng,
            không trực tiếp cho vay và không chịu rủi ro tín dụng. Khi một khoản vay được giải ngân
            qua giới thiệu của chúng tôi, ngân hàng trả cho chúng tôi một khoản phí.
          </p>
        </div>
      </section>

      <Section className="bg-steel-50">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Ngân hàng đối tác" value={String(banks.length)} />
          <Stat label="Gói vay theo dõi" value="24" />
          <Stat label="Hồ sơ đã kết nối" value="1.100" tone="brand" />
          <Stat label="Phí người vay trả" value="0 đ" tone="brand" />
        </div>
      </Section>

      <Section className="bg-white">
        <SectionHead eyebrow="Nguyên tắc biên tập" title="Bốn cam kết chúng tôi tự ràng buộc" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {nguyenTac.map((n) => (
            <div key={n.ten} className="border-t-2 border-brand pt-5">
              <h3 className="text-[17px] font-bold text-steel">{n.ten}</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-500">{n.mo_ta}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-steel-50">
        <SectionHead eyebrow="Đội ngũ" title="Người viết và người kiểm duyệt nội dung" />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {doiNgu.map((d) => (
            <div key={d.ten} className="card p-5">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-steel font-display text-sm font-bold text-white">
                {d.ten.split(" ").slice(-1)[0].slice(0, 2).toUpperCase()}
              </div>
              <p className="mt-4 text-[15px] font-bold text-steel">{d.ten}</p>
              <p className="text-xs font-semibold text-brand">{d.vai_tro}</p>
              <p className="mt-2 text-sm leading-relaxed text-steel-500">{d.kinh_nghiem}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="max-w-3xl">
          <Note tone="brand" title="Cam kết về dữ liệu cá nhân">
            Chúng tôi chỉ chuyển thông tin của bạn cho những tổ chức tín dụng được liệt kê đích danh
            trong phần đồng ý mà bạn đã tick. Bạn có thể rút lại sự đồng ý và yêu cầu xóa dữ liệu bất
            cứ lúc nào tại trang Yêu cầu xóa dữ liệu.
          </Note>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/phap-ly/bao-mat" className="btn-ghost">Đọc chính sách bảo mật</Link>
            <Link href="/lien-he" className="btn-dark">Liên hệ với chúng tôi</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
