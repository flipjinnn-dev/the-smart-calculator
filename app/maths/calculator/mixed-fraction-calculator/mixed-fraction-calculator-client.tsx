"use client";

import { useMemo, useState } from "react";
import { Calculator, Equal, Sigma } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CalculatorGuide from "@/components/calculator-guide";
import { RatingProfileSection } from "@/components/rating-profile-section";

type Operation = "add" | "subtract" | "multiply" | "divide";
type OutputFormat = "mixed" | "improper" | "decimal";

interface Props {
  content: any;
  guideContent: any;
}

interface Fraction {
  n: number;
  d: number;
}

const gcd = (a: number, b: number): number => {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x || 1;
};

const simplify = (f: Fraction): Fraction => {
  if (f.d === 0) return f;
  const sign = f.d < 0 ? -1 : 1;
  const g = gcd(f.n, f.d);
  return { n: (f.n / g) * sign, d: Math.abs(f.d / g) };
};

const toImproper = (whole: number, numerator: number, denominator: number): Fraction => {
  const absWhole = Math.abs(whole);
  const sign = whole < 0 ? -1 : 1;
  return simplify({
    n: sign * (absWhole * denominator + numerator),
    d: denominator,
  });
};

const toMixedText = (f: Fraction): string => {
  const s = simplify(f);
  if (s.d === 0) return "Undefined";
  const sign = s.n < 0 ? "-" : "";
  const absN = Math.abs(s.n);
  const w = Math.floor(absN / s.d);
  const r = absN % s.d;
  if (r === 0) return `${sign}${w}`;
  if (w === 0) return `${sign}${r}/${s.d}`;
  return `${sign}${w} ${r}/${s.d}`;
};

const toImproperText = (f: Fraction): string => {
  const s = simplify(f);
  if (s.d === 0) return "Undefined";
  return `${s.n}/${s.d}`;
};

const operate = (a: Fraction, b: Fraction, op: Operation): Fraction => {
  switch (op) {
    case "add":
      return simplify({ n: a.n * b.d + b.n * a.d, d: a.d * b.d });
    case "subtract":
      return simplify({ n: a.n * b.d - b.n * a.d, d: a.d * b.d });
    case "multiply":
      return simplify({ n: a.n * b.n, d: a.d * b.d });
    case "divide":
      return simplify({ n: a.n * b.d, d: a.d * b.n });
  }
};

export default function MixedFractionCalculatorClient({ content, guideContent }: Props) {
  const [aWhole, setAWhole] = useState("2");
  const [aNum, setANum] = useState("1");
  const [aDen, setADen] = useState("2");
  const [bWhole, setBWhole] = useState("3");
  const [bNum, setBNum] = useState("1");
  const [bDen, setBDen] = useState("4");
  const [operation, setOperation] = useState<Operation>("add");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("mixed");

  const parsed = useMemo(() => {
    const aw = Number(aWhole);
    const an = Number(aNum);
    const ad = Number(aDen);
    const bw = Number(bWhole);
    const bn = Number(bNum);
    const bd = Number(bDen);

    if ([aw, an, ad, bw, bn, bd].some((v) => !Number.isFinite(v))) {
      return { error: "Please enter valid numbers." };
    }
    if (ad === 0 || bd === 0) {
      return { error: "Denominator cannot be zero." };
    }
    if (an < 0 || bn < 0 || ad < 0 || bd < 0) {
      return { error: "Use positive numerator/denominator values." };
    }

    const a = toImproper(aw, an, ad);
    const b = toImproper(bw, bn, bd);
    if (operation === "divide" && b.n === 0) {
      return { error: "Cannot divide by zero." };
    }

    const res = operate(a, b, operation);
    if (res.d === 0) return { error: "Undefined operation." };

    const symbol = operation === "add" ? "+" : operation === "subtract" ? "-" : operation === "multiply" ? "×" : "÷";

    return {
      a,
      b,
      res,
      symbol,
      decimal: (res.n / res.d).toFixed(8).replace(/\.?0+$/, ""),
      steps: [
        `Convert first mixed number to improper fraction: ${aWhole} ${aNum}/${aDen} = ${toImproperText(a)}`,
        `Convert second mixed number to improper fraction: ${bWhole} ${bNum}/${bDen} = ${toImproperText(b)}`,
        `Apply operation: ${toImproperText(a)} ${symbol} ${toImproperText(b)}`,
        `Simplify result using GCF: ${toImproperText(res)}`,
      ],
    };
  }, [aWhole, aNum, aDen, bWhole, bNum, bDen, operation]);

  const resultText = useMemo(() => {
    if (!("res" in parsed)) return "";
    const p = parsed as { res: Fraction; decimal: string };
    if (outputFormat === "decimal") return p.decimal;
    if (outputFormat === "improper") return toImproperText(p.res);
    return toMixedText(p.res);
  }, [parsed, outputFormat]);

  const inputClass =
    "h-11 bg-white rounded-xl border-2 border-gray-200 shadow-sm focus-visible:border-purple-400 focus-visible:ring-purple-200";

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {content?.pageTitle || "Mixed Fraction Calculator"}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {content?.pageDescription ||
              "Solve mixed numbers instantly with step-by-step answers. Add, subtract, multiply, divide, simplify, and convert fractions to decimals easily online."}
          </p>
        </div>

        <div className="mb-12">
          <Card className="border-2 border-purple-200 shadow-xl overflow-hidden">
            <CardHeader className="py-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <CardTitle className="text-2xl sm:text-3xl flex items-center gap-3">
                <Calculator className="w-8 h-8 shrink-0" aria-hidden />
                {content?.pageTitle || "Mixed Fraction Calculator"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-5 items-end">
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <Input className={inputClass} value={aWhole} onChange={(e) => setAWhole(e.target.value)} placeholder="Whole" type="number" />
                  <Input className={inputClass} value={aNum} onChange={(e) => setANum(e.target.value)} placeholder="Num" type="number" />
                  <Input className={inputClass} value={aDen} onChange={(e) => setADen(e.target.value)} placeholder="Den" type="number" />
                </div>

                <select
                  value={operation}
                  onChange={(e) => setOperation(e.target.value as Operation)}
                  className="h-11 w-full md:w-auto min-w-[3.5rem] rounded-xl border-2 border-purple-200 bg-white px-3 text-center text-lg font-semibold text-gray-900 shadow-sm focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200"
                  aria-label="Operation"
                >
                  <option value="add">+</option>
                  <option value="subtract">−</option>
                  <option value="multiply">×</option>
                  <option value="divide">÷</option>
                </select>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <Input className={inputClass} value={bWhole} onChange={(e) => setBWhole(e.target.value)} placeholder="Whole" type="number" />
                  <Input className={inputClass} value={bNum} onChange={(e) => setBNum(e.target.value)} placeholder="Num" type="number" />
                  <Input className={inputClass} value={bDen} onChange={(e) => setBDen(e.target.value)} placeholder="Den" type="number" />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-sm font-medium text-gray-700 w-full sm:w-auto">Output format:</span>
                <Button
                  type="button"
                  variant="outline"
                  className={
                    outputFormat === "mixed"
                      ? "rounded-xl border-purple-600 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 hover:text-white"
                      : "rounded-xl border-gray-200 bg-white hover:bg-purple-50"
                  }
                  onClick={() => setOutputFormat("mixed")}
                >
                  Mixed
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className={
                    outputFormat === "improper"
                      ? "rounded-xl border-purple-600 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 hover:text-white"
                      : "rounded-xl border-gray-200 bg-white hover:bg-purple-50"
                  }
                  onClick={() => setOutputFormat("improper")}
                >
                  Improper
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className={
                    outputFormat === "decimal"
                      ? "rounded-xl border-purple-600 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 hover:text-white"
                      : "rounded-xl border-gray-200 bg-white hover:bg-purple-50"
                  }
                  onClick={() => setOutputFormat("decimal")}
                >
                  Decimal
                </Button>
              </div>

              <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-100 shadow-md">
                <CardContent className="pt-6 sm:pt-8">
                  {"error" in parsed ? (
                    <p className="text-red-600 font-medium">{parsed.error}</p>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3 text-xl sm:text-2xl font-bold text-gray-900">
                        <Sigma className="w-6 h-6 text-purple-600 shrink-0" aria-hidden />
                        <span>
                          Result: <span className="text-purple-800">{resultText}</span>
                        </span>
                        <Equal className="w-6 h-6 text-purple-600 shrink-0" aria-hidden />
                      </div>

                      <div className="bg-white rounded-xl p-4 sm:p-5 border-2 border-gray-200 shadow-sm">
                        <p className="font-semibold text-gray-900 mb-2">Step-by-step</p>
                        <ol className="list-decimal pl-5 space-y-1.5 text-sm text-gray-700 leading-relaxed">
                          {parsed.steps.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10">
          <RatingProfileSection
            entityId="mixed-fraction-calculator"
            entityType="calculator"
            creatorSlug="felix-yacoub"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
        </div>

        <div id="mixed-fraction-guide" className="mt-12 scroll-mt-20">
          <CalculatorGuide
            layout="article"
            data={{
              sections: [],
              faq: [],
              ...guideContent,
              color: "purple",
            }}
          />
        </div>
      </div>
    </div>
  );
}
