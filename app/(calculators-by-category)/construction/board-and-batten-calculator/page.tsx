import BoardAndBattenCalculatorClient from "./board-and-batten-calculator-client";

export default async function BoardAndBattenCalculator() {
  let content = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/board-and-batten-calculator/en.json`)).default;
  } catch {
    content = null;
  }

  return <BoardAndBattenCalculatorClient content={content} />;
}
