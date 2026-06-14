import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import AnnuityPayoutCalculatorClient from "./annuity-payout-calculator-client";


export default async function AnnuityPayoutCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("annuity-payout-calculator", language);
  const guideContent = await loadCalculatorGuideContent("annuity-payout-calculator", language);

  return <AnnuityPayoutCalculatorClient content={content} guideContent={guideContent} />;
}
