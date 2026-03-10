import UIFCalculatorClient from "./uif-calculator-client";


export default async function UIFCalculator() {
  let content = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/uif-calculator/en.json`)).default;
  } catch {
    content = null;
  }

  return <UIFCalculatorClient content={content} />;
}
