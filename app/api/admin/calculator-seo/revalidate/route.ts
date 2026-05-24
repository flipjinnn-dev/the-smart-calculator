import { NextResponse } from "next/server";
import { isAdminCalculatorId } from "@/lib/calculator-seo";
import { getAdminSession } from "@/lib/calculator-seo-admin-auth";
import { revalidateCalculatorCache } from "@/lib/calculator-seo-revalidate";

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const calculatorId = body.calculatorId as string;

    if (!calculatorId || !isAdminCalculatorId(calculatorId)) {
      return NextResponse.json({ error: "Invalid calculator" }, { status: 400 });
    }

    const paths = await revalidateCalculatorCache(
      calculatorId,
      typeof body.canonical === "string" ? body.canonical : undefined
    );

    return NextResponse.json({
      ok: true,
      paths,
      message:
        paths.length > 0
          ? `Cache cleared for: ${paths.join(", ")}`
          : "No paths found to revalidate.",
    });
  } catch (e) {
    console.error("calculator-seo revalidate error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Revalidate failed" },
      { status: 500 }
    );
  }
}
