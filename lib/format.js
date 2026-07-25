export const dinhDangTien = (trieu) => {
  if (trieu === null || trieu === undefined || Number.isNaN(trieu)) return "—";
  if (trieu >= 1000) {
    const ty = trieu / 1000;
    return `${ty % 1 === 0 ? ty : ty.toFixed(2).replace(/\.?0+$/, "")} tỷ`;
  }
  return `${Math.round(trieu).toLocaleString("vi-VN")} triệu`;
};

export const dinhDangDong = (dong) =>
  `${Math.round(dong).toLocaleString("vi-VN")} đ`;

export const dinhDangPhanTram = (n, so_le = 1) =>
  `${Number(n).toFixed(so_le).replace(".", ",")}%`;

export const dinhDangThoiHan = (thang) => {
  if (thang % 12 === 0) return `${thang / 12} năm`;
  return `${thang} tháng`;
};

export const dinhDangSo = (n) => Math.round(n).toLocaleString("vi-VN");
