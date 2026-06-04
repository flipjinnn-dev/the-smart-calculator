import { NextResponse } from "next/server";
import { deleteBlog } from "@/lib/actions/blog-actions";
import { getAdminSession } from "@/lib/calculator-seo-admin-auth";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!id?.trim()) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const result = await deleteBlog(id);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error || "Delete failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
