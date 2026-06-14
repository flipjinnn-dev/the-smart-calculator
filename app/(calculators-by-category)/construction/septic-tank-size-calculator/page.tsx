import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";
import SepticTankSizeCalculatorClient from "./septic-tank-size-calculator-client";




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
