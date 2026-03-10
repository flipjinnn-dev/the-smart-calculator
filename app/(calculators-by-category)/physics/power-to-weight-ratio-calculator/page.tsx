import PowerToWeightRatioCalculatorClient from "./power-to-weight-ratio-calculator-client";

export default async function PowerToWeightRatioCalculator() {
  let content = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/power-to-weight-ratio-calculator/en.json`)).default;
  } catch {
    content = null;
  }

  return <PowerToWeightRatioCalculatorClient content={content} />;
}
