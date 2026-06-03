export type ExpressionType = "single" | "sum" | "product" | "quotient";

export interface SimplifyRadicalInput {
  radicand: number;
  rootIndex: number;
  expressionType: ExpressionType;
  secondRadicand?: number;
}

export interface SimplifyStep {
  title: string;
  body: string;
}

export interface SimplifyRadicalResult {
  inputLabel: string;
  simplified: string;
  coefficient: number;
  radicandInside: number;
  rootIndex: number;
  primeFactorization: string;
  steps: SimplifyStep[];
  isAlreadySimple: boolean;
}

function primeFactorize(n: number): Map<number, number> {
  const factors = new Map<number, number>();
  let x = Math.floor(n);
  if (x < 2) return factors;

  for (let p = 2; p * p <= x; p++) {
    while (x % p === 0) {
      factors.set(p, (factors.get(p) || 0) + 1);
      x = Math.floor(x / p);
    }
  }
  if (x > 1) {
    factors.set(x, (factors.get(x) || 0) + 1);
  }
  return factors;
}

function formatFactorization(factors: Map<number, number>): string {
  if (factors.size === 0) return "1";
  const parts: string[] = [];
  for (const [p, e] of [...factors.entries()].sort((a, b) => a[0] - b[0])) {
    parts.push(e === 1 ? `${p}` : `${p}^${e}`);
  }
  return parts.join(" × ");
}

function formatFactorizationExpanded(n: number): string {
  if (n <= 1) return String(n);
  const factors = primeFactorize(n);
  const primes: number[] = [];
  for (const [p, e] of factors) {
    for (let i = 0; i < e; i++) primes.push(p);
  }
  if (primes.length === 0) return String(n);
  return primes.join(" × ");
}

export function formatRootSymbol(rootIndex: number, inside: number): string {
  if (inside === 1) return "";
  if (rootIndex === 2) return `√${inside}`;
  if (rootIndex === 3) return `∛${inside}`;
  return `⁽${rootIndex}⁾√${inside}`;
}

export function formatInputLabel(
  radicand: number,
  rootIndex: number
): string {
  return formatRootSymbol(rootIndex, radicand) || String(radicand);
}

export function simplifyRadical(
  input: SimplifyRadicalInput
): SimplifyRadicalResult | null {
  const rootIndex = Math.max(2, Math.floor(input.rootIndex) || 2);
  let radicand = input.radicand;

  if (input.expressionType === "product" && input.secondRadicand != null) {
    radicand = input.radicand * input.secondRadicand;
  } else if (input.expressionType === "quotient" && input.secondRadicand != null) {
    if (input.secondRadicand === 0) return null;
    radicand = input.radicand / input.secondRadicand;
    if (!Number.isInteger(radicand) || radicand < 0) return null;
  }

  if (!Number.isFinite(radicand) || radicand < 0) return null;

  const n = Math.floor(radicand);
  if (n === 0) {
    return {
      inputLabel: formatInputLabel(0, rootIndex),
      simplified: "0",
      coefficient: 0,
      radicandInside: 0,
      rootIndex,
      primeFactorization: "0",
      steps: [{ title: "Result", body: "√0 = 0" }],
      isAlreadySimple: true,
    };
  }

  const factors = primeFactorize(n);
  let coefficient = 1;
  let inside = 1;
  const steps: SimplifyStep[] = [];

  steps.push({
    title: "Prime factorization",
    body: `${n} = ${formatFactorizationExpanded(n)} = ${formatFactorization(factors)}`,
  });

  const pullNotes: string[] = [];
  for (const [prime, exp] of [...factors.entries()].sort((a, b) => a[0] - b[0])) {
    const groups = Math.floor(exp / rootIndex);
    const remainder = exp % rootIndex;
    if (groups > 0) {
      coefficient *= Math.pow(prime, groups);
      pullNotes.push(
        `${groups} group(s) of ${prime}${rootIndex > 2 ? ` (×${rootIndex})` : " (pair)"} → ${prime}^${groups} outside`
      );
    }
    if (remainder > 0) {
      inside *= Math.pow(prime, remainder);
    }
  }

  if (pullNotes.length > 0) {
    steps.push({
      title: `Extract perfect ${rootIndex === 2 ? "square" : rootIndex === 3 ? "cube" : `${rootIndex}th`} power factors`,
      body: pullNotes.join("\n"),
    });
  } else {
    steps.push({
      title: "No perfect power factors",
      body: `No factor of ${n} can be grouped in sets of ${rootIndex}. The expression is already in simplest radical form.`,
    });
  }

  const radicalPart = formatRootSymbol(rootIndex, inside);
  let simplified: string;
  if (inside === 1) {
    simplified = String(coefficient);
  } else if (coefficient === 1) {
    simplified = radicalPart;
  } else {
    simplified = `${coefficient}${radicalPart}`;
  }

  steps.push({
    title: "Simplified form",
    body: `${formatInputLabel(n, rootIndex)} = ${simplified}`,
  });

  const isAlreadySimple =
    coefficient === 1 && inside === n && pullNotes.length === 0;

  return {
    inputLabel: formatInputLabel(n, rootIndex),
    simplified,
    coefficient,
    radicandInside: inside,
    rootIndex,
    primeFactorization: formatFactorization(factors),
    steps,
    isAlreadySimple,
  };
}

export function simplifyRadicalSum(
  a: number,
  b: number,
  rootIndex: number
): SimplifyRadicalResult | null {
  const first = simplifyRadical({
    radicand: a,
    rootIndex,
    expressionType: "single",
  });
  const second = simplifyRadical({
    radicand: b,
    rootIndex,
    expressionType: "single",
  });
  if (!first || !second) return null;

  const inputLabel = `${formatInputLabel(a, rootIndex)} + ${formatInputLabel(b, rootIndex)}`;

  if (
    first.radicandInside === second.radicandInside &&
    first.rootIndex === second.rootIndex
  ) {
    const coeff = first.coefficient + second.coefficient;
    const inside = first.radicandInside;
    const radicalPart = formatRootSymbol(rootIndex, inside);
    const simplified =
      inside === 1
        ? String(coeff)
        : coeff === 1
          ? radicalPart
          : `${coeff}${radicalPart}`;

    return {
      inputLabel,
      simplified,
      coefficient: coeff,
      radicandInside: inside,
      rootIndex,
      primeFactorization: `${first.primeFactorization} + ${second.primeFactorization}`,
      steps: [
        {
          title: "Simplify each radical",
          body: `${formatInputLabel(a, rootIndex)} = ${first.simplified}\n${formatInputLabel(b, rootIndex)} = ${second.simplified}`,
        },
        {
          title: "Combine like radicals",
          body: `Same radicand (${radicalPart || inside}): (${first.coefficient} + ${second.coefficient})${radicalPart} = ${simplified}`,
        },
      ],
      isAlreadySimple: false,
    };
  }

  return {
    inputLabel,
    simplified: `${first.simplified} + ${second.simplified}`,
    coefficient: first.coefficient,
    radicandInside: first.radicandInside,
    rootIndex,
    primeFactorization: `${first.simplified} + ${second.simplified}`,
    steps: [
      {
        title: "Simplify each term",
        body: `${formatInputLabel(a, rootIndex)} = ${first.simplified}\n${formatInputLabel(b, rootIndex)} = ${second.simplified}`,
      },
      {
        title: "Unlike radicals",
        body: "These terms cannot be combined further because the values under the root differ after simplification.",
      },
    ],
    isAlreadySimple: false,
  };
}

export function parseRadicandInput(raw: string): number | null {
  const cleaned = raw
    .trim()
    .replace(/√/g, "")
    .replace(/∛/g, "")
    .replace(/⁽\d+⁾√/g, "")
    .replace(/[^\d.]/g, "");
  if (!cleaned) return null;
  const num = parseFloat(cleaned);
  if (!Number.isFinite(num) || num < 0) return null;
  return num;
}

export const QUICK_REFERENCE_TABLE = [
  { original: "√72", factors: "2³ × 3²", simplified: "6√2", rootType: "Square root" },
  { original: "√200", factors: "2³ × 5²", simplified: "10√2", rootType: "Square root" },
  { original: "√48", factors: "2⁴ × 3", simplified: "4√3", rootType: "Square root" },
  { original: "√288", factors: "2⁵ × 3²", simplified: "12√2", rootType: "Square root" },
  { original: "³√54", factors: "2 × 3³", simplified: "3∛2", rootType: "Cube root" },
  { original: "³√128", factors: "2⁷", simplified: "4∛2", rootType: "Cube root" },
];
