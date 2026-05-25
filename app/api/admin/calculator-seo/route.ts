import { NextResponse } from "next/server";
import {
  loadOrBuildCalculatorSeo,
  saveCalculatorSeo,
  syncCalculatorUiFromSeo,
  isAdminCalculatorId,
  type CalculatorSeoData,
} from "@/lib/calculator-seo";
import { getAdminSession } from "@/lib/calculator-seo-admin-auth";
import { revalidateCalculatorCache } from "@/lib/calculator-seo-revalidate";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const calculatorId = searchParams.get("calculatorId");
  const language = searchParams.get("language") || "en";

  if (!calculatorId || !isAdminCalculatorId(calculatorId)) {
    return NextResponse.json({ error: "Invalid calculator" }, { status: 400 });
  }

  const data = await loadOrBuildCalculatorSeo(calculatorId, language);
  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const calculatorId = body.calculatorId as string;
    const language = (body.language as string) || "en";

    if (!calculatorId || !isAdminCalculatorId(calculatorId)) {
      return NextResponse.json({ error: "Invalid calculator" }, { status: 400 });
    }

    if (language !== "en") {
      return NextResponse.json(
        { error: "Admin SEO editor supports English (en) only" },
        { status: 400 }
      );
    }

    let schema: Record<string, unknown>;
    try {
      schema =
        typeof body.schema === "string"
          ? JSON.parse(body.schema)
          : body.schema;
    } catch {
      return NextResponse.json({ error: "Invalid schema JSON" }, { status: 400 });
    }

    const data: CalculatorSeoData = {
      metaTitle: String(body.metaTitle ?? "").trim(),
      metaDescription: String(body.metaDescription ?? "").trim(),
      keywords: String(body.keywords ?? "").trim(),
      pageTitle: String(body.pageTitle ?? "").trim(),
      pageDescription: String(body.pageDescription ?? "").trim(),
      canonical: String(body.canonical ?? "").trim(),
      openGraph: {
        title: String(body.openGraph?.title ?? body.metaTitle ?? "").trim(),
        description: String(
          body.openGraph?.description ?? body.metaDescription ?? ""
        ).trim(),
        image: String(body.openGraph?.image ?? "/og-image.png").trim(),
        siteName: String(body.openGraph?.siteName ?? "Smart Calculator").trim(),
      },
      twitter: {
        card:
          body.twitter?.card === "summary"
            ? "summary"
            : "summary_large_image",
        title: String(body.twitter?.title ?? body.metaTitle ?? "").trim(),
        description: String(
          body.twitter?.description ?? body.metaDescription ?? ""
        ).trim(),
        image: String(body.twitter?.image ?? "/og-image.png").trim(),
      },
      schema,
    };

    await saveCalculatorSeo(calculatorId, language, data);
    await syncCalculatorUiFromSeo(
      calculatorId,
      data.pageTitle,
      data.pageDescription
    );

    const revalidatedPaths = await revalidateCalculatorCache(
      calculatorId,
      data.canonical
    );

    return NextResponse.json({ ok: true, revalidatedPaths, storage: "filesystem" });
  } catch (e) {
    console.error("calculator-seo save error:", e);
    const message = e instanceof Error ? e.message : "Save failed";
    const readOnly =
      message.includes("read-only") || message.includes("localhost");
    return NextResponse.json({ error: message }, { status: readOnly ? 503 : 500 });
  }
}
