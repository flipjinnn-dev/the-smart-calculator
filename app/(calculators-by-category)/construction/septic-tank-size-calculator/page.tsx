import { headers } from "next/headers";
import type { Metadata } from "next";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
  generateCalculatorMetadata,
} from "@/lib/calculator-page-runtime";
import SepticTankSizeCalculatorClient from "./septic-tank-size-calculator-client";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("septic-tank-size-calculator");
}

export default async function SepticTankSizeCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent(
    "septic-tank-size-calculator",
    language
  );
  const guideContent = await loadCalculatorGuideContent(
    "septic-tank-size-calculator",
    language
  );

  return (
    <SepticTankSizeCalculatorClient
      content={content}
      guideContent={guideContent}
    />
  );
}
