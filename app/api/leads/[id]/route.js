import { NextResponse } from "next/server";
import { layTheoId, capNhatLead } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const lead = layTheoId(params.id);
  if (!lead) return NextResponse.json({ loi: "Không tìm thấy hồ sơ" }, { status: 404 });
  return NextResponse.json(lead);
}

export async function PATCH(request, { params }) {
  const patch = await request.json();
  const lead = capNhatLead(params.id, patch);
  if (!lead) return NextResponse.json({ loi: "Không tìm thấy hồ sơ" }, { status: 404 });
  return NextResponse.json(lead);
}
