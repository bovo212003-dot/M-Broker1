export function lichTraNo({ goc_trieu, thang, lai_uu_dai, thang_uu_dai = 0, lai_sau_uu_dai, kieu = "giam-dan" }) {
  const goc = goc_trieu * 1_000_000;
  const laiSau = lai_sau_uu_dai ?? lai_uu_dai;
  const rows = [];
  let du_no = goc;

  if (kieu === "tra-deu") {
    const r = lai_uu_dai / 100 / 12;
    const pmt = r === 0 ? goc / thang : (goc * r) / (1 - Math.pow(1 + r, -thang));
    for (let i = 1; i <= thang; i++) {
      const lai = du_no * r;
      const tra_goc = pmt - lai;
      du_no = Math.max(0, du_no - tra_goc);
      rows.push({ ky: i, goc: tra_goc, lai, tong: pmt, du_no });
    }
  } else {
    const tra_goc = goc / thang;
    for (let i = 1; i <= thang; i++) {
      const ls = i <= thang_uu_dai ? lai_uu_dai : laiSau;
      const lai = (du_no * (ls / 100)) / 12;
      rows.push({ ky: i, goc: tra_goc, lai, tong: tra_goc + lai, du_no: du_no - tra_goc, lai_suat: ls });
      du_no -= tra_goc;
    }
  }

  const tong_lai = rows.reduce((s, r) => s + r.lai, 0);
  return {
    rows,
    tong_lai,
    tong_tra: goc + tong_lai,
    thang_dau: rows[0]?.tong ?? 0,
    thang_cao_nhat: Math.max(...rows.map((r) => r.tong)),
    trung_binh: (goc + tong_lai) / thang,
    goc,
  };
}

export function hanMucToiDa({ thu_nhap_trieu, thoi_han_thang, lai_suat, ty_le = 0.4 }) {
  const kha_nang = thu_nhap_trieu * 1_000_000 * ty_le;
  const r = lai_suat / 100 / 12;
  const goc = (kha_nang * (1 - Math.pow(1 + r, -thoi_han_thang))) / r;
  return goc / 1_000_000;
}

export function locGoiVay(products, ho_so) {
  return products
    .map((p) => {
      let diem = 0;
      const ly_do = [];

      if (ho_so.loai && p.loai !== ho_so.loai) return null;

      if (ho_so.so_tien) {
        if (ho_so.so_tien < p.han_muc_min || ho_so.so_tien > p.han_muc_max) return null;
        diem += 20;
      }
      if (ho_so.thoi_han && ho_so.thoi_han > p.thoi_han_max) return null;

      if (ho_so.muc_dich && p.muc_dich) {
        if (!p.muc_dich.includes(ho_so.muc_dich)) return null;
        diem += 15;
        ly_do.push("Đúng mục đích vay");
      }
      if (ho_so.tsdb && p.tsdb) {
        if (!p.tsdb.includes(ho_so.tsdb)) return null;
        diem += 15;
        ly_do.push("Nhận loại tài sản của bạn");
      }
      if (ho_so.nhom && p.nhom) {
        if (!p.nhom.includes(ho_so.nhom)) return null;
        diem += 20;
        ly_do.push("Chấp nhận hình thức thu nhập của bạn");
      }
      if (ho_so.thu_nhap) {
        if (ho_so.thu_nhap < p.thu_nhap_min) return null;
        diem += 15;
        if (ho_so.thu_nhap >= p.thu_nhap_min * 1.5) ly_do.push("Thu nhập vượt mức yêu cầu");
      }
      if (ho_so.bhxh !== undefined && p.bhxh_thang) {
        if (ho_so.bhxh < p.bhxh_thang) return null;
        diem += 10;
      }
      if (ho_so.gia_tri_tsdb && ho_so.so_tien && p.ltv) {
        const ltv = (ho_so.so_tien / ho_so.gia_tri_tsdb) * 100;
        if (ltv > p.ltv) return null;
        diem += 15;
        ly_do.push(`Tỷ lệ vay ${Math.round(ltv)}% nằm trong hạn mức ${p.ltv}%`);
      }

      diem += (5 - p.lai_suat_uu_dai / 10) * 2;
      return { ...p, diem_phu_hop: Math.min(99, Math.round(60 + diem / 2)), ly_do };
    })
    .filter(Boolean)
    .sort((a, b) => b.diem_phu_hop - a.diem_phu_hop || a.lai_suat_uu_dai - b.lai_suat_uu_dai);
}
