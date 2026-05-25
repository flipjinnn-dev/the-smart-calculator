import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import SquareRootCurveCalculatorClient from "./square-root-curve-calculator-client";

export default async function SquareRootCurveCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent("square-root-curve-calculator", language);
  const guideContent = await loadCalculatorGuideContent("square-root-curve-calculator", language);

  return (
    <SquareRootCurveCalculatorClient content={content} guideContent={guideContent} />
  );
}
