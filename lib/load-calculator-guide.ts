import type { CalculatorGuideData } from "@/components/calculator-guide";
import { getCalculatorFileName } from "@/lib/calculator-data";

type RawFaqItem = {
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
};

function normalizeGuideData(
  raw: CalculatorGuideData & { faq?: RawFaqItem[] }
): CalculatorGuideData {
  return {
    ...raw,
    faq: (raw.faq ?? []).map((item) => ({
      question: item.question ?? item.q ?? "",
      answer: item.answer ?? item.a ?? "",
    })),
  };
}

export async function loadRawCalculatorGuideContent(
  calculatorId: string,
  language: string
): Promise<CalculatorGuideData> {
  const storageId = getCalculatorFileName(calculatorId);
  const fallback: CalculatorGuideData = { color: "blue", sections: [], faq: [] };

  try {
    const raw = (
      await import(
        `@/app/content/calculator-guide/${storageId}/${language}.json`
      )
    ).default as CalculatorGuideData & { faq?: RawFaqItem[] };
    return normalizeGuideData(raw);
  } catch {
    try {
      const raw = (
        await import(`@/app/content/calculator-guide/${storageId}/en.json`)
      ).default as CalculatorGuideData & { faq?: RawFaqItem[] };
      return normalizeGuideData(raw);
    } catch {
      return fallback;
    }
  }
}
