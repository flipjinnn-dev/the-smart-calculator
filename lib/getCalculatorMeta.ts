import { calculatorsMeta } from "@/meta/calculators";

/**
 * Get calculator metadata for a specific calculator and language
 * @param calculatorId - The ID of the calculator (e.g., 'bmi-calculator')
 * @param language - The language code (e.g., 'en', 'br', 'pl', 'de')
 * @returns Metadata object with title, description, slug, and keywords
 */
export function getCalculatorMeta(calculatorId: string, language: string = "en") {
  const calculator = calculatorsMeta[calculatorId];
  
  if (!calculator) {
    console.warn(`No metadata found for calculator: ${calculatorId}`);
    return null;
  }
  
  const meta = calculator[language] || calculator["en"];
  
  if (!meta) {
    console.warn(`No metadata found for calculator: ${calculatorId} in language: ${language}`);
    return null;
  }
  
  return meta;
}