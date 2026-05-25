import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import CrushedStoneCalculatorClient from "./crushed-stone-calculator-client";

export const metadata: Metadata = {
  title: "Crushed Stone Calculator – Yards & Tons Estimate",
  description:
    "Calculate crushed stone in cubic yards and tons instantly. Estimate material for driveways, patios, drainage, and shed bases fast.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/construction/crushed-stone-calculator",
  },
};

export default async function CrushedStoneCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent("crushed-stone-calculator", language);
  const guideContent = await loadCalculatorGuideContent("crushed-stone-calculator", language);

  return <CrushedStoneCalculatorClient content={content} guideContent={guideContent} />;
}
