import InflectionPointCalculatorClient from "./inflection-point-calculator-client";


export default async function InflectionPointCalculator() {
  let content = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/inflection-point-calculator/en.json`)).default;
  } catch {
    content = null;
  }


  return <InflectionPointCalculatorClient content={content} guideContent={null} />;
}
