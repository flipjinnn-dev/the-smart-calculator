import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
  generateCalculatorMetadata,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("crushed-stone-calculator");
}

import CrushedStoneCalculatorClient from "./crushed-stone-calculator-client";

export default async function CrushedStoneCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent("crushed-stone-calculator", language);
  const guideContent = await loadCalculatorGuideContent("crushed-stone-calculator", language);

  return <CrushedStoneCalculatorClient content={content} guideContent={guideContent} />;
}
