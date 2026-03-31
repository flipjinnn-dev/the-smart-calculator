import ReverseSalesTaxCalculatorClient from "./reverse-sales-tax-calculator-client";
import content from "@/app/content/calculator-ui/reverse-sales-tax-calculator/en.json";
import guideContent from "@/app/content/calculator-guide/reverse-sales-tax-calculator/en.json";

export default async function ReverseSalesTaxCalculator() {
  return <ReverseSalesTaxCalculatorClient content={content} guideContent={guideContent} />;
}
