# M-Broker

Demo giao diện nền tảng môi giới vay thế chấp và tín chấp cho thị trường Việt Nam.
Toàn bộ dữ liệu là giả lập, không có cơ sở dữ liệu.

## Chạy dự án

Yêu cầu Node.js 18.17 trở lên.

```bash
npm install
npm run dev
```

Mở http://localhost:3000

Trang quản trị: http://localhost:3000/admin

Build bản production:

```bash
npm run build
npm start
```

## Công nghệ

| Thành phần | Lựa chọn | Lý do |
|---|---|---|
| Framework | Next.js 14 (App Router) | Render tĩnh cho trang SEO, route handler cho vài tác vụ backend nhỏ |
| Ngôn ngữ | JavaScript (JSX) | Ưu tiên dễ đọc, dễ sửa khi demo với khách |
| CSS | Tailwind CSS 3.4 | Bảng màu và font tuỳ biến khai báo trong `tailwind.config.js` |
| Biểu đồ | Recharts | Biểu đồ trả nợ và biểu đồ quản trị |
| Icon | lucide-react | |

Không dùng cơ sở dữ liệu. Lead lưu trong bộ nhớ tiến trình Node (`lib/store.js`)
và sẽ mất khi khởi động lại server — đủ để demo trọn luồng từ đăng ký đến quản trị.

## Bản đồ màn hình

### Trang công khai (12 màn)

| Đường dẫn | Màn hình |
|---|---|
| `/` | Trang chủ — hero, bảng lãi suất, phân luồng sản phẩm |
| `/vay-the-chap` | Danh mục vay thế chấp — 8 khối, mở đầu bằng công cụ tính |
| `/vay-tin-chap` | Danh mục vay tín chấp — mobile-first, mở đầu bằng kiểm tra 60 giây |
| `/so-sanh` | Bảng so sánh toàn bộ gói vay, có bộ lọc |
| `/so-sanh/chi-tiet?goi=a,b,c` | So sánh song song tối đa 3 gói |
| `/goi-vay/[slug]` | Chi tiết một gói vay (16 trang tự sinh) |
| `/cong-cu` | Danh sách công cụ |
| `/cong-cu/tinh-khoan-vay` | Công cụ tính lịch trả nợ |
| `/kien-thuc` | Danh sách bài viết |
| `/kien-thuc/[slug]` | Chi tiết bài viết (6 trang tự sinh) |
| `/ve-chung-toi` | Giới thiệu, nguyên tắc biên tập, đội ngũ |
| `/lien-he` | Liên hệ |
| `/phap-ly/[slug]` | Bảo mật, điều khoản, yêu cầu xóa dữ liệu |

### Phễu chuyển đổi (4 màn)

| Đường dẫn | Màn hình |
|---|---|
| `/dang-ky` | Biểu mẫu 5 bước, lưu nháp vào localStorage |
| `/dang-ky/ket-qua?id=` | Kết quả sơ bộ, chọn gói quan tâm |
| `/dang-ky/hoan-tat?id=` | Xác nhận, mã hồ sơ, checklist giấy tờ |
| `/tra-cuu` | Tra cứu trạng thái bằng mã hồ sơ và OTP giả lập |

### Quản trị (8 màn)

| Đường dẫn | Màn hình |
|---|---|
| `/admin/dang-nhap` | Đăng nhập có xác thực hai lớp (giao diện) |
| `/admin` | Tổng quan, biểu đồ rơi rụng theo bước |
| `/admin/leads` | Danh sách lead, lọc, phân công hàng loạt |
| `/admin/leads/[id]` | Chi tiết lead, dòng thời gian, đổi trạng thái |
| `/admin/san-pham` | Quản lý ngân hàng và gói vay |
| `/admin/bao-cao` | Đối soát theo ngân hàng và theo nguồn |
| `/admin/nhat-ky` | Nhật ký đồng ý và truy cập |

Thêm 2 màn hệ thống: trang 404 và trang kết quả tìm kiếm nội bộ (chưa dựng).

## Backend nhỏ

| Endpoint | Chức năng |
|---|---|
| `POST /api/leads` | Tạo lead từ biểu mẫu đăng ký |
| `GET /api/leads` | Danh sách lead cho trang quản trị |
| `GET /api/leads/:id` | Chi tiết một lead |
| `PATCH /api/leads/:id` | Đổi trạng thái, gán ngân hàng, gán người phụ trách, thêm ghi chú |

## Luồng demo gợi ý

1. Vào `/vay-the-chap`, nhập số tiền và giá trị tài sản ở hero để thấy tỷ lệ vay tính tức thì.
2. Kéo thanh trượt trong công cụ tính, mở bảng chi tiết từng kỳ.
3. Tick 3 gói trong bảng so sánh rồi bấm "So sánh 3 gói".
4. Bấm CTA để vào `/dang-ky` — chú ý các trường đã được điền sẵn.
5. Hoàn tất 5 bước, xem màn kết quả sơ bộ và trang cảm ơn (ghi lại mã hồ sơ).
6. Mở `/admin/leads` — lead vừa tạo nằm ở đầu danh sách.
7. Mở chi tiết lead, đổi trạng thái và gán ngân hàng.
8. Quay lại `/tra-cuu`, nhập mã hồ sơ để thấy trạng thái vừa cập nhật.

Vào `/vay-tin-chap` để thấy bố cục khác hẳn: nút to, kiểm tra 3 câu ngay hero, kết quả trong 60 giây.

## Hệ thống thiết kế

Bảng màu lấy trực tiếp từ logo Automation Land, khai báo tập trung trong `tailwind.config.js`:

| Token | Mã màu | Dùng ở đâu |
|---|---|---|
| `brand` | `#2E6DB4` | Xanh dương của logo — mọi nút chính, liên kết, số liệu nổi bật |
| `brand-dark` | `#21568F` | Trạng thái hover |
| `brand-deep` | `#16406B` | Dải lãi suất chạy, khối kêu gọi hành động cuối trang |
| `brand-light` | `#EAF2FB` | Nền nhạt, thẻ chuyên mục, vòng tròn trang trí |
| `steel` | `#16202B` | Chữ chính và các panel tối |
| `steel-400` | `#6E7C8C` | Chữ phụ — đã chỉnh đủ tương phản AA trên nền trắng |
| `signal` | `#B8760F` | Cảnh báo lãi suất thả nổi |
| `alert` | `#B5342A` | Chi phí, cảnh báo lừa đảo, trạng thái từ chối |

Màu riêng của từng ngân hàng vẫn giữ trong `lib/data.js` vì đó là nhận diện của họ.

### Chữ

| Vai trò | Font | Lý do |
|---|---|---|
| Tiêu đề | Archivo 600–700 | Grotesque công nghiệp, hợp với chữ đậm hình học trong logo |
| Nội dung, giao diện | Inter 400–600 | Dễ đọc nhất ở cỡ nhỏ, hỗ trợ đầy đủ dấu tiếng Việt |
| Con số | Inter + `tabular-nums` | Số thẳng cột mà không cần font đơn cách |

Bản trước dùng JetBrains Mono cho mọi con số. Font này không có bộ ký tự tiếng Việt
nên mọi chữ nằm chung thẻ số đều rơi về font dự phòng và mất dấu — đó là chỗ khó đọc.
Nay lớp `.num` chỉ bật thuộc tính chữ số thẳng cột của Inter, giữ nguyên độ dễ đọc.

Ngoài ra đã chỉnh: cỡ chữ nhỏ nhất từ 11px lên 12px, giãn chữ của nhãn viết hoa từ
0.14em xuống 0.08em, và làm đậm màu chữ phụ để đạt chuẩn tương phản.

### Thành phần nhận diện

- `components/savings-widget.jsx` — ô tương tác ở hero, kéo thanh trượt để thấy khoản chênh
  lệch tổng lãi giữa gói rẻ nhất và đắt nhất. Đây là móc câu chính của trang chủ.
- `components/rate-ticker.jsx` — dải lãi suất chạy ngang nền xanh đậm, ngay dưới hero.
- `components/rate-board.jsx` — bảng lãi suất nền tối kiểu bảng điện tử trong sảnh ngân hàng.

## Lưu ý khi chuyển sang sản phẩm thật

- Bảng lãi suất phải cập nhật thủ công qua CMS, không hứa "so sánh real-time"
  vì ngân hàng Việt Nam gần như không mở API báo giá cho bên thứ ba.
- Ba ô đồng ý ở bước 5 phải tách riêng, không tick sẵn, và cần lưu log thời điểm,
  IP, phiên bản điều khoản — màn `/admin/nhat-ky` mô phỏng đúng yêu cầu này.
- Không xây chức năng tra cứu CIC hay chấm điểm tín dụng tự động trên website.
- Không thu bất kỳ khoản phí nào từ người vay, và nói rõ điều đó ở nhiều nơi.
