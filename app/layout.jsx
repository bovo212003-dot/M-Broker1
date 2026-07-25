import "./globals.css";

export const metadata = {
  title: "M-Broker — So sánh vay thế chấp và tín chấp",
  description:
    "So sánh 24 gói vay từ 12 ngân hàng. Miễn phí cho người vay, không thu bất kỳ khoản phí nào trước giải ngân.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Archivo:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
