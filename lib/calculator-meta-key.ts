import { calculatorsMeta } from "@/meta/calculators";
import { getCalculatorFileName } from "@/lib/calculator-data";

/** Layout/page IDs (e.g. `percent-error`) vs meta keys (`percent-error-calculator`). */
export function resolveCalculatorMetaKey(calculatorId: string): string {
  if (calculatorsMeta[calculatorId]) {
    return calculatorId;
  }
  const storageId = getCalculatorFileName(calculatorId);
  if (calculatorsMeta[storageId]) {
    return storageId;
  }
  return storageId;
}

export function getCalculatorMetaEntry(calculatorId: string, language: string) {
  const metaKey = resolveCalculatorMetaKey(calculatorId);
  const calculator = calculatorsMeta[metaKey];
  if (!calculator) return undefined;
  return calculator[language as keyof typeof calculator] ?? calculator.en;
}
