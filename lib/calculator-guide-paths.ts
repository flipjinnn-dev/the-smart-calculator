import { calculators, getCalculatorFileName } from "@/lib/calculator-data";

function resolveRegistryId(calculatorId: string): string {
  if (calculators.some((c) => c.id === calculatorId)) {
    return calculatorId;
  }
  const byStorage = calculators.find(
    (c) => getCalculatorFileName(c.id) === calculatorId
  );
  return byStorage?.id ?? calculatorId;
}

/**
 * Guide JSON folders under app/content/calculator-guide/ sometimes use legacy
 * or misspelled names that differ from getCalculatorFileName() / calculator-ui.
 */
const GUIDE_FOLDER_BY_CALCULATOR_ID: Record<string, string> = {
  "sales-tax-calculator": "sales-tax-calulcator",
  "overweight-calculator": "overwieght-calculator",
  "fat-intake-calculator": "protien-intake-calculator",
  "body-surface-area-calculator": "bsa-calculator",
  "weight-watchers-points-calculator": "weight-watcher-calculator",
  "implant-size-calculator": "breast-implant-size-calculator",
  "calories-burned-calculator": "calorie-burned-calculator",
  "due-date-calculator": "pregnancy-due-date",
  "one-rep-max-calculator": "one-rap-calculator",
};

/** Ordered folder names to try when loading calculator-guide JSON. */
export function getGuideFolderCandidates(calculatorId: string): string[] {
  const registryId = resolveRegistryId(calculatorId);
  const storageId = getCalculatorFileName(registryId);
  const legacy = GUIDE_FOLDER_BY_CALCULATOR_ID[registryId];

  const candidates = [
    legacy,
    storageId,
    registryId,
    registryId.endsWith("-calculator")
      ? registryId
      : `${registryId}-calculator`,
  ].filter((value): value is string => Boolean(value?.trim()));

  return [...new Set(candidates)];
}
