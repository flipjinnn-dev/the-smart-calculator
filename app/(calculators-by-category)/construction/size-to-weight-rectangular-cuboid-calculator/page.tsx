import { headers } from "next/headers";
import SizeToWeightRectangularCuboidCalculatorClient from "./size-to-weight-rectangular-cuboid-calculator-client";

export default async function SizeToWeightRectangularCuboidCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/size-to-weight-rectangular-cuboid-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/size-to-weight-rectangular-cuboid-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/size-to-weight-rectangular-cuboid-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/size-to-weight-rectangular-cuboid-calculator/en.json`)).default;
  }

  return <SizeToWeightRectangularCuboidCalculatorClient content={content} guideContent={guideContent} />;
}
