import AngleWeightCalculatorClient from "./angle-weight-calculator-client";

export default async function AngleWeightCalculator() {
  let content = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/angle-weight-calculator/en.json`)).default;
  } catch {
    content = null;
  }

  return <AngleWeightCalculatorClient content={content} guideContent={null} />;
}
