import type { CalculatorGuideData } from "@/components/calculator-guide";
import { getGuideFolderCandidates } from "@/lib/calculator-guide-paths";
import { calculatorGuideToHtml } from "@/lib/calculator-guide-html";

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

async function importGuideJson(
  folder: string,
  language: string
): Promise<CalculatorGuideData | null> {
  try {
    const raw = (
      await import(
        `@/app/content/calculator-guide/${folder}/${language}.json`
      )
    ).default as CalculatorGuideData & { faq?: RawFaqItem[] };
    return normalizeGuideData(raw);
  } catch {
    if (language === "en") return null;
    try {
      const raw = (
        await import(`@/app/content/calculator-guide/${folder}/en.json`)
      ).default as CalculatorGuideData & { faq?: RawFaqItem[] };
      return normalizeGuideData(raw);
    } catch {
      return null;
    }
  }
}

export async function loadRawCalculatorGuideContent(
  calculatorId: string,
  language: string
): Promise<CalculatorGuideData> {
  const fallback: CalculatorGuideData = { color: "blue", sections: [], faq: [] };
  const folders = getGuideFolderCandidates(calculatorId);

  for (const folder of folders) {
    const guide = await importGuideJson(folder, language);
    if (
      guide &&
      ((guide.sections?.length ?? 0) > 0 ||
        (guide.sectionsAfterFaq?.length ?? 0) > 0 ||
        (guide.faq?.length ?? 0) > 0)
    ) {
      return guide;
    }
  }

  for (const folder of folders) {
    const guide = await importGuideJson(folder, language);
    if (guide) return guide;
  }

  return fallback;
}

/** Build default guide HTML from calculator-guide JSON (with legacy folder aliases). */
export async function resolveGuideHtmlFromJson(
  calculatorId: string,
  language: string = "en"
): Promise<string> {
  const guide = await loadRawCalculatorGuideContent(calculatorId, language);
  if (
    (guide.sections?.length ?? 0) > 0 ||
    (guide.sectionsAfterFaq?.length ?? 0) > 0 ||
    (guide.faq?.length ?? 0) > 0
  ) {
    return calculatorGuideToHtml(guide);
  }
  return "";
}
