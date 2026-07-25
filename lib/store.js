import { seedLeads } from "./data";

const g = globalThis;
if (!g.__mbroker_leads) g.__mbroker_leads = [...seedLeads];

export const layDanhSach = () => g.__mbroker_leads;

export const layTheoId = (id) => g.__mbroker_leads.find((l) => l.id === id);

export const themLead = (payload) => {
  const so = 24072 + g.__mbroker_leads.length;
  const lead = {
    id: `MB-${so}`,
    trang_thai: "moi",
    phu_trach: null,
    ngan_hang: null,
    nguon: "trực tiếp / demo",
    trang_vao: payload.trang_vao || "/dang-ky",
    tao_luc: new Date().toLocaleString("vi-VN"),
    lich_su: [{ luc: "vừa xong", noi_dung: "Lead được tạo từ biểu mẫu đăng ký", loai: "he-thong" }],
    ...payload,
  };
  g.__mbroker_leads = [lead, ...g.__mbroker_leads];
  return lead;
};

export const capNhatLead = (id, patch) => {
  const i = g.__mbroker_leads.findIndex((l) => l.id === id);
  if (i === -1) return null;
  const cu = g.__mbroker_leads[i];
  const moi = { ...cu, ...patch };
  if (patch.trang_thai && patch.trang_thai !== cu.trang_thai) {
    moi.lich_su = [
      ...(cu.lich_su || []),
      { luc: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }), noi_dung: `Đổi trạng thái sang: ${patch.trang_thai}`, loai: "he-thong" },
    ];
  }
  if (patch.ghi_chu) {
    moi.lich_su = [
      ...(moi.lich_su || []),
      { luc: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }), noi_dung: patch.ghi_chu, loai: "ghi-chu" },
    ];
    delete moi.ghi_chu;
  }
  g.__mbroker_leads[i] = moi;
  return moi;
};
