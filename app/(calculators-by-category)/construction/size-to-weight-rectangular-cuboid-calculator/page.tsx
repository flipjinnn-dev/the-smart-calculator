import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import SizeToWeightRectangularCuboidCalculatorClient from "./size-to-weight-rectangular-cuboid-calculator-client";

export default async function SizeToWeightRectangularCuboidCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("size-to-weight-rectangular-cuboid", language);
  const guideContent = await loadCalculatorGuideContent("size-to-weight-rectangular-cuboid", language);

  return <SizeToWeightRectangularCuboidCalculatorClient content={content} guideContent={guideContent} />;
}
