import { NextResponse } from "next/server";
import { layDanhSach, themLead } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ items: layDanhSach() });
}

export async function POST(request) {
  const body = await request.json();
  if (!body.ho_ten || !body.dien_thoai) {
    return NextResponse.json({ loi: "Thiếu họ tên hoặc số điện thoại" }, { status: 400 });
  }
  const lead = themLead(body);
  return NextResponse.json(lead, { status: 201 });
}
