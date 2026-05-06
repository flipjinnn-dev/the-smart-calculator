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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{content?.pageTitle || "Mixed Fraction Calculator"}</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {content?.pageDescription ||
              "Solve mixed numbers instantly with step-by-step answers. Add, subtract, multiply, divide, simplify, and convert fractions to decimals easily online."}
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-600" />
              Mixed Numbers Solver
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
              <div className="grid grid-cols-3 gap-2">
                <Input className="bg-white" value={aWhole} onChange={(e) => setAWhole(e.target.value)} placeholder="Whole" type="number" />
                <Input className="bg-white" value={aNum} onChange={(e) => setANum(e.target.value)} placeholder="Num" type="number" />
                <Input className="bg-white" value={aDen} onChange={(e) => setADen(e.target.value)} placeholder="Den" type="number" />
              </div>

              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value as Operation)}
                className="h-10 rounded-md border px-3 bg-white"
              >
                <option value="add">+</option>
                <option value="subtract">-</option>
                <option value="multiply">×</option>
                <option value="divide">÷</option>
              </select>

              <div className="grid grid-cols-3 gap-2">
                <Input className="bg-white" value={bWhole} onChange={(e) => setBWhole(e.target.value)} placeholder="Whole" type="number" />
                <Input className="bg-white" value={bNum} onChange={(e) => setBNum(e.target.value)} placeholder="Num" type="number" />
                <Input className="bg-white" value={bDen} onChange={(e) => setBDen(e.target.value)} placeholder="Den" type="number" />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-gray-600">Output format:</span>
              <Button
                variant="outline"
                className={outputFormat === "mixed" ? "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 hover:text-white" : "bg-white"}
                onClick={() => setOutputFormat("mixed")}
              >
                Mixed
              </Button>
              <Button
                variant="outline"
                className={outputFormat === "improper" ? "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 hover:text-white" : "bg-white"}
                onClick={() => setOutputFormat("improper")}
              >
                Improper
              </Button>
              <Button
                variant="outline"
                className={outputFormat === "decimal" ? "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 hover:text-white" : "bg-white"}
                onClick={() => setOutputFormat("decimal")}
              >
                Decimal
              </Button>
            </div>

            <Card className="bg-indigo-50 border-indigo-200">
              <CardContent className="pt-6">
                {"error" in parsed ? (
                  <p className="text-red-600 font-medium">{parsed.error}</p>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                      <Sigma className="w-5 h-5 text-indigo-600" />
                      <span>Result: {resultText}</span>
                      <Equal className="w-5 h-5 text-indigo-600" />
                    </div>

                    <div className="bg-white rounded-lg p-4 border">
                      <p className="font-semibold text-sm mb-2">Step-by-step</p>
                      <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
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

        <div className="mt-10">
          <RatingProfileSection
            entityId="mixed-fraction-calculator"
            entityType="calculator"
            creatorSlug="felix-yacoub"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
        </div>

        <div className="mt-10">
          <CalculatorGuide data={guideContent || { color: "blue", sections: [], faq: [] }} />
        </div>
      </main>
    </div>
  );
}
