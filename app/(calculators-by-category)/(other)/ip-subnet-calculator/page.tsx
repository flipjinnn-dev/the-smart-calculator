import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import IpSubnetCalculatorClient from "./ip-subnet-calculator-client";

export default async function IpSubnetCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("ip-subnet-calculator", language);
  const guideContent = await loadCalculatorGuideContent("ip-subnet-calculator", language);

  return <IpSubnetCalculatorClient content={content} guideContent={guideContent} />;
}
