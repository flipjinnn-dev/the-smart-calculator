import { headers } from "next/headers";
import {loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";
import SnowboardSizeCalculatorClient from "./snowboard-size-calculator-client";


export default async function SnowboardSizeCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent("snowboard-size-calculator", language);
  const guideContent = await loadCalculatorGuideContent(
    "snowboard-size-calculator",
    language
  );

  return (
    <SnowboardSizeCalculatorClient content={content} guideContent={guideContent} />
  );
}
