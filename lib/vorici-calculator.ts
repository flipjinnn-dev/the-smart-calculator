export type CraftingMethod = "spam" | "vorici" | "hybrid" | "auto";

export type SocketColor = "red" | "green" | "blue";

export interface VoriciInput {
  strength: number;
  dexterity: number;
  intelligence: number;
  redSockets: number;
  greenSockets: number;
  blueSockets: number;
  totalSockets: number;
  craftingMethod: CraftingMethod;
  budget?: number;
}

export interface ColorProbabilities {
  red: number;
  green: number;
  blue: number;
}

export interface MethodBreakdown {
  id: string;
  name: string;
  expectedChromatics: number;
  successRate: number;
  averageAttempts: number;
  voriciChromatics?: number;
  spamChromatics?: number;
}

export interface VoriciResult {
  probabilities: ColorProbabilities;
  successProbability: number;
  expectedChromatics: number;
  expectedChromaticsLow: number;
  expectedChromaticsHigh: number;
  averageAttempts: number;
  successRatePercent: number;
  recommendedMethod: MethodBreakdown;
  selectedMethod: MethodBreakdown;
  allMethods: MethodBreakdown[];
  budgetFeasible: boolean | null;
  budgetMessage: string;
  summary: string;
}

const VORICI_BENCH_COST: Record<1 | 2 | 3, number> = {
  1: 15,
  2: 100,
  3: 150,
};

function factorial(n: number): number {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i += 1) result *= i;
  return result;
}

export function getColorProbabilities(
  strength: number,
  dexterity: number,
  intelligence: number
): ColorProbabilities {
  const total = strength + dexterity + intelligence;
  if (total <= 0) {
    return { red: 1 / 3, green: 1 / 3, blue: 1 / 3 };
  }
  return {
    red: strength / total,
    green: dexterity / total,
    blue: intelligence / total,
  };
}

/** Multinomial probability for exact r/g/b socket counts on n rolls. */
export function socketSuccessProbability(
  red: number,
  green: number,
  blue: number,
  probs: ColorProbabilities
): number {
  const n = red + green + blue;
  if (n === 0) return 1;

  const coefficient =
    factorial(n) / (factorial(red) * factorial(green) * factorial(blue));

  return (
    coefficient *
    Math.pow(probs.red, red) *
    Math.pow(probs.green, green) *
    Math.pow(probs.blue, blue)
  );
}

function methodFromProbability(
  id: string,
  name: string,
  probability: number,
  fixedChromatics = 0
): MethodBreakdown {
  const clampedP = Math.min(Math.max(probability, 1e-12), 1);
  const spamExpected = 1 / clampedP;
  const expectedChromatics = fixedChromatics + spamExpected;

  return {
    id,
    name,
    expectedChromatics: Math.round(expectedChromatics * 10) / 10,
    successRate: clampedP * 100,
    averageAttempts: Math.round(spamExpected * 10) / 10,
    voriciChromatics: fixedChromatics > 0 ? fixedChromatics : undefined,
    spamChromatics: Math.round(spamExpected * 10) / 10,
  };
}

function evaluateHybridMethods(
  red: number,
  green: number,
  blue: number,
  totalSockets: number,
  probs: ColorProbabilities
): MethodBreakdown[] {
  const methods: MethodBreakdown[] = [];

  const spamP = socketSuccessProbability(red, green, blue, probs);
  methods.push(
    methodFromProbability("spam", "Standard Chromatic Orb Spam", spamP)
  );

  const colorNeeds: { key: SocketColor; count: number; label: string }[] = [
    { key: "red", count: red, label: "Red" },
    { key: "green", count: green, label: "Green" },
    { key: "blue", count: blue, label: "Blue" },
  ];

  for (const { key, count, label } of colorNeeds) {
    for (const tier of [1, 2, 3] as const) {
      if (tier > count || tier > totalSockets) continue;

      const remainRed = key === "red" ? red - tier : red;
      const remainGreen = key === "green" ? green - tier : green;
      const remainBlue = key === "blue" ? blue - tier : blue;
      const remainSockets = totalSockets - tier;

      if (remainSockets === 0) {
        if (remainRed === 0 && remainGreen === 0 && remainBlue === 0) {
          methods.push({
            id: `vorici-${key}-${tier}`,
            name: `Vorici Bench — ${tier} ${label} socket${tier > 1 ? "s" : ""}`,
            expectedChromatics: VORICI_BENCH_COST[tier],
            successRate: 100,
            averageAttempts: 1,
            voriciChromatics: VORICI_BENCH_COST[tier],
            spamChromatics: 0,
          });
        }
        continue;
      }

      const remainP = socketSuccessProbability(
        remainRed,
        remainGreen,
        remainBlue,
        probs
      );
      methods.push(
        methodFromProbability(
          `hybrid-${key}-${tier}`,
          `Hybrid — Vorici ${tier} ${label} + Chromatic spam`,
          remainP,
          VORICI_BENCH_COST[tier]
        )
      );
    }
  }

  return methods;
}

function pickBestMethod(methods: MethodBreakdown[]): MethodBreakdown {
  return methods.reduce((best, current) =>
    current.expectedChromatics < best.expectedChromatics ? current : best
  );
}

function filterByCraftingMethod(
  methods: MethodBreakdown[],
  craftingMethod: CraftingMethod
): MethodBreakdown[] {
  switch (craftingMethod) {
    case "spam":
      return methods.filter((m) => m.id === "spam");
    case "vorici":
      return methods.filter((m) => m.id.startsWith("vorici-"));
    case "hybrid":
      return methods.filter((m) => m.id.startsWith("hybrid-") || m.id.startsWith("vorici-"));
    case "auto":
    default:
      return methods;
  }
}

export function calculateVorici(input: VoriciInput): VoriciResult | null {
  const {
    strength,
    dexterity,
    intelligence,
    redSockets,
    greenSockets,
    blueSockets,
    totalSockets,
    craftingMethod,
    budget,
  } = input;

  if (
    !Number.isFinite(strength) ||
    !Number.isFinite(dexterity) ||
    !Number.isFinite(intelligence) ||
    strength < 0 ||
    dexterity < 0 ||
    intelligence < 0
  ) {
    return null;
  }

  if (totalSockets < 1 || totalSockets > 6) return null;

  const colorSum = redSockets + greenSockets + blueSockets;
  if (colorSum !== totalSockets) return null;
  if (redSockets < 0 || greenSockets < 0 || blueSockets < 0) return null;

  const probs = getColorProbabilities(strength, dexterity, intelligence);
  const allMethods = evaluateHybridMethods(
    redSockets,
    greenSockets,
    blueSockets,
    totalSockets,
    probs
  );

  const eligible = filterByCraftingMethod(allMethods, craftingMethod);
  if (eligible.length === 0) return null;

  const recommendedMethod = pickBestMethod(allMethods);
  const selectedMethod =
    craftingMethod === "auto"
      ? recommendedMethod
      : pickBestMethod(eligible);

  const successProbability = selectedMethod.successRate / 100;
  const expectedChromatics = selectedMethod.expectedChromatics;
  const low = Math.max(1, Math.round(expectedChromatics * 0.75));
  const high = Math.round(expectedChromatics * 1.35);

  let budgetFeasible: boolean | null = null;
  let budgetMessage = "Enter a budget to check if your Chromatic Orb stash is likely sufficient.";

  if (budget !== undefined && Number.isFinite(budget) && budget > 0) {
    if (budget >= expectedChromatics) {
      budgetFeasible = true;
      budgetMessage = `Your budget of ${Math.round(budget)} Chromatic Orbs covers the estimated average cost (~${Math.round(expectedChromatics)} orbs).`;
    } else {
      const successWithinBudget =
        1 - Math.pow(1 - Math.min(successProbability, 0.999999), budget);
      budgetFeasible = successWithinBudget >= 0.5;
      budgetMessage = `Budget of ${Math.round(budget)} orbs is below the average (~${Math.round(expectedChromatics)}). Estimated ${(successWithinBudget * 100).toFixed(1)}% chance to succeed within budget.`;
    }
  }

  const summary = `Based on your item attributes, the most efficient method is ${recommendedMethod.name} with an estimated average cost of ${low}–${high} Chromatic Orbs for your desired socket setup.`;

  return {
    probabilities: probs,
    successProbability,
    expectedChromatics,
    expectedChromaticsLow: low,
    expectedChromaticsHigh: high,
    averageAttempts: selectedMethod.averageAttempts,
    successRatePercent: Math.round(selectedMethod.successRate * 1000) / 10,
    recommendedMethod,
    selectedMethod,
    allMethods,
    budgetFeasible,
    budgetMessage,
    summary,
  };
}
