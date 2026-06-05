"use client";

import { useCallback, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  Calculator,
  Coins,
  Gem,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Target,
  Wand2,
} from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide, { type CalculatorGuideData } from "@/components/calculator-guide";
import { RatingProfileSection } from "@/components/rating-profile-section";
import {
  calculateVorici,
  type CraftingMethod,
  type VoriciResult,
} from "@/lib/vorici-calculator";

interface ContentShape {
  pageTitle?: string;
  pageDescription?: string;
  labelAttributes?: string;
  labelStrength?: string;
  labelDexterity?: string;
  labelIntelligence?: string;
  labelDesiredColors?: string;
  labelRed?: string;
  labelGreen?: string;
  labelBlue?: string;
  labelTotalSockets?: string;
  labelCraftingMethod?: string;
  labelBudget?: string;
  labelBudgetHint?: string;
  methodAuto?: string;
  methodSpam?: string;
  methodVorici?: string;
  methodHybrid?: string;
  btnCalculate?: string;
  btnReset?: string;
  resultsTitle?: string;
  resultsSubtitle?: string;
  emptyTitle?: string;
  emptyHint?: string;
  metricProbabilities?: string;
  metricExpectedCost?: string;
  metricAttempts?: string;
  metricSuccessRate?: string;
  metricMethod?: string;
  metricBudget?: string;
  metricSummary?: string;
  errAttributes?: string;
  errColors?: string;
  errSockets?: string;
}

const defaultContent: ContentShape = {
  pageTitle: "Vorici Calculator (PoE) – Chromatic Orb Cost Calculator",
  pageDescription:
    "Calculate Chromatic Orb costs, socket color probability, success chance, and the best crafting method for any Path of Exile item using our Vorici Calculator.",
};

function pct(value: number): string {
  return `${(value * 100).toFixed(2)}%`;
}

export default function VoriciCalculatorClient({
  content,
  guideContent,
}: {
  content: ContentShape | null;
  guideContent: CalculatorGuideData | null;
}) {
  const c = { ...defaultContent, ...content };
  const guideData: CalculatorGuideData = guideContent ?? {
    color: "purple",
    sections: [],
    faq: [],
  };

  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();

  const [strength, setStrength] = useState("50");
  const [dexterity, setDexterity] = useState("0");
  const [intelligence, setIntelligence] = useState("0");
  const [redSockets, setRedSockets] = useState("1");
  const [greenSockets, setGreenSockets] = useState("0");
  const [blueSockets, setBlueSockets] = useState("0");
  const [totalSockets, setTotalSockets] = useState("1");
  const [craftingMethod, setCraftingMethod] = useState<CraftingMethod>("auto");
  const [budget, setBudget] = useState("");
  const [result, setResult] = useState<VoriciResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const syncColorsToTotal = useCallback((total: number, r: number, g: number, b: number) => {
    if (r + g + b !== total) {
      setRedSockets(String(Math.max(0, total - g - b)));
    }
  }, []);

  const compute = useCallback(() => {
    const str = Number.parseFloat(strength);
    const dex = Number.parseFloat(dexterity);
    const intl = Number.parseFloat(intelligence);
    const red = Number.parseInt(redSockets, 10);
    const green = Number.parseInt(greenSockets, 10);
    const blue = Number.parseInt(blueSockets, 10);
    const total = Number.parseInt(totalSockets, 10);
    const budgetVal = budget.trim() === "" ? undefined : Number.parseFloat(budget);

    const nextErr: Record<string, string> = {};

    if (
      !Number.isFinite(str) ||
      !Number.isFinite(dex) ||
      !Number.isFinite(intl) ||
      str < 0 ||
      dex < 0 ||
      intl < 0
    ) {
      nextErr.attributes = c.errAttributes;
    }

    if (!Number.isFinite(total) || total < 1 || total > 6) {
      nextErr.sockets = c.errSockets;
    }

    if (
      !Number.isFinite(red) ||
      !Number.isFinite(green) ||
      !Number.isFinite(blue) ||
      red < 0 ||
      green < 0 ||
      blue < 0 ||
      red + green + blue !== total
    ) {
      nextErr.colors = c.errColors;
    }

    setErrors(nextErr);
    if (Object.keys(nextErr).length > 0) {
      setResult(null);
      return;
    }

    const out = calculateVorici({
      strength: str,
      dexterity: dex,
      intelligence: intl,
      redSockets: red,
      greenSockets: green,
      blueSockets: blue,
      totalSockets: total,
      craftingMethod,
      budget: budgetVal,
    });

    setResult(out);
    if (out) scrollToRef(resultsRef);
  }, [
    strength,
    dexterity,
    intelligence,
    redSockets,
    greenSockets,
    blueSockets,
    totalSockets,
    craftingMethod,
    budget,
    scrollToRef,
    c.errAttributes,
    c.errColors,
    c.errSockets,
  ]);

  const reset = useCallback(() => {
    setStrength("50");
    setDexterity("0");
    setIntelligence("0");
    setRedSockets("1");
    setGreenSockets("0");
    setBlueSockets("0");
    setTotalSockets("1");
    setCraftingMethod("auto");
    setBudget("");
    setResult(null);
    setErrors({});
  }, []);

  const sectionIcon = "text-purple-600 flex-shrink-0 mt-0.5";

  const formCard = (
    <Card className="shadow-lg border border-gray-200/80 bg-white">
      <CardContent className="p-6 space-y-8">
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <Gem className={`w-5 h-5 ${sectionIcon}`} />
            <div className="flex-1 space-y-4">
              <Label className="text-sm font-semibold text-gray-800">{c.labelAttributes}</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-red-700">{c.labelStrength}</Label>
                  <Input
                    type="number"
                    min={0}
                    value={strength}
                    onChange={(e) => setStrength(e.target.value)}
                    className={errors.attributes ? "border-red-500" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-green-700">{c.labelDexterity}</Label>
                  <Input
                    type="number"
                    min={0}
                    value={dexterity}
                    onChange={(e) => setDexterity(e.target.value)}
                    className={errors.attributes ? "border-red-500" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-blue-700">{c.labelIntelligence}</Label>
                  <Input
                    type="number"
                    min={0}
                    value={intelligence}
                    onChange={(e) => setIntelligence(e.target.value)}
                    className={errors.attributes ? "border-red-500" : ""}
                  />
                </div>
              </div>
              {errors.attributes && (
                <p className="text-sm text-red-600">{errors.attributes}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <Sparkles className={`w-5 h-5 ${sectionIcon}`} />
            <div className="flex-1 space-y-4">
              <Label className="text-sm font-semibold text-gray-800">{c.labelDesiredColors}</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-red-700">{c.labelRed}</Label>
                  <Input
                    type="number"
                    min={0}
                    max={6}
                    value={redSockets}
                    onChange={(e) => setRedSockets(e.target.value)}
                    className={errors.colors ? "border-red-500" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-green-700">{c.labelGreen}</Label>
                  <Input
                    type="number"
                    min={0}
                    max={6}
                    value={greenSockets}
                    onChange={(e) => setGreenSockets(e.target.value)}
                    className={errors.colors ? "border-red-500" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-blue-700">{c.labelBlue}</Label>
                  <Input
                    type="number"
                    min={0}
                    max={6}
                    value={blueSockets}
                    onChange={(e) => setBlueSockets(e.target.value)}
                    className={errors.colors ? "border-red-500" : ""}
                  />
                </div>
              </div>
              {errors.colors && <p className="text-sm text-red-600">{errors.colors}</p>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{c.labelTotalSockets}</Label>
            <Select
              value={totalSockets}
              onValueChange={(v) => {
                setTotalSockets(v);
                const t = Number.parseInt(v, 10);
                syncColorsToTotal(
                  t,
                  Number.parseInt(redSockets, 10) || 0,
                  Number.parseInt(greenSockets, 10) || 0,
                  Number.parseInt(blueSockets, 10) || 0
                );
              }}
            >
              <SelectTrigger className={errors.sockets ? "border-red-500" : ""}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n} socket{n > 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.sockets && <p className="text-sm text-red-600">{errors.sockets}</p>}
          </div>

          <div className="space-y-2">
            <Label>{c.labelCraftingMethod}</Label>
            <Select
              value={craftingMethod}
              onValueChange={(v) => setCraftingMethod(v as CraftingMethod)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">{c.methodAuto}</SelectItem>
                <SelectItem value="spam">{c.methodSpam}</SelectItem>
                <SelectItem value="vorici">{c.methodVorici}</SelectItem>
                <SelectItem value="hybrid">{c.methodHybrid}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>{c.labelBudget}</Label>
          <Input
            type="number"
            min={0}
            placeholder={c.labelBudgetHint}
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            onClick={compute}
            className="flex-1 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white"
          >
            <Calculator className="w-4 h-4 mr-2" />
            {c.btnCalculate}
          </Button>
          <Button type="button" variant="outline" onClick={reset} className="flex-1 sm:flex-none">
            <RotateCcw className="w-4 h-4 mr-2" />
            {c.btnReset}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50">
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-violet-600 flex items-center justify-center shadow-lg">
                <Wand2 className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              {c.pageTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {c.pageDescription}
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>{formCard}</div>

            <div ref={resultsRef} className="space-y-6">
              <Card className="shadow-lg border border-gray-200/80 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-purple-50/50 border-b py-5 px-6">
                  <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 text-gray-900">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                    {c.resultsTitle}
                  </CardTitle>
                  <CardDescription className="text-base">{c.resultsSubtitle}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {!result ? (
                    <div className="rounded-xl border border-dashed border-gray-200 bg-slate-50/50 py-14 px-6 text-center">
                      <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-lg font-semibold text-gray-800 mb-2">{c.emptyTitle}</p>
                      <p className="text-gray-600 max-w-md mx-auto">{c.emptyHint}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="rounded-xl border border-violet-100 bg-violet-50/50 p-4">
                        <p className="text-xs font-medium text-violet-900 uppercase tracking-wide mb-2">
                          {c.metricProbabilities}
                        </p>
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div className="rounded-lg bg-red-50 border border-red-100 p-3">
                            <p className="text-xs text-red-800 font-medium">Red</p>
                            <p className="text-lg font-bold text-red-900">
                              {pct(result.probabilities.red)}
                            </p>
                          </div>
                          <div className="rounded-lg bg-green-50 border border-green-100 p-3">
                            <p className="text-xs text-green-800 font-medium">Green</p>
                            <p className="text-lg font-bold text-green-900">
                              {pct(result.probabilities.green)}
                            </p>
                          </div>
                          <div className="rounded-lg bg-blue-50 border border-blue-100 p-3">
                            <p className="text-xs text-blue-800 font-medium">Blue</p>
                            <p className="text-lg font-bold text-blue-900">
                              {pct(result.probabilities.blue)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50 p-5">
                        <p className="text-xs font-medium text-purple-900 uppercase tracking-wide">
                          {c.metricExpectedCost}
                        </p>
                        <p className="text-4xl font-bold text-purple-950 tabular-nums">
                          {result.expectedChromaticsLow}–{result.expectedChromaticsHigh}
                          <span className="text-xl font-semibold ml-2">orbs</span>
                        </p>
                        <p className="text-sm text-purple-800 mt-1">
                          Average: {result.expectedChromatics.toFixed(1)} Chromatic Orbs
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                          <p className="text-xs font-medium text-slate-700 uppercase tracking-wide">
                            {c.metricAttempts}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {result.averageAttempts.toFixed(1)}
                          </p>
                        </div>
                        <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
                          <p className="text-xs font-medium text-indigo-900 uppercase tracking-wide">
                            {c.metricSuccessRate}
                          </p>
                          <p className="text-2xl font-bold text-indigo-950 tabular-nums">
                            {result.successRatePercent}%
                          </p>
                        </div>
                      </div>

                      <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-4">
                        <p className="text-xs font-medium text-purple-900 uppercase tracking-wide mb-1">
                          {c.metricMethod}
                        </p>
                        <p className="text-sm font-semibold text-purple-950">
                          {result.recommendedMethod.name}
                        </p>
                        {craftingMethod !== "auto" && (
                          <p className="text-xs text-purple-800 mt-2">
                            Selected method: {result.selectedMethod.name}
                          </p>
                        )}
                      </div>

                      <div
                        className={`rounded-xl border p-4 ${
                          result.budgetFeasible === true
                            ? "border-green-200 bg-green-50/60"
                            : result.budgetFeasible === false
                              ? "border-amber-200 bg-amber-50/60"
                              : "border-gray-200 bg-gray-50/60"
                        }`}
                      >
                        <p className="text-xs font-medium uppercase tracking-wide mb-1 flex items-center gap-1">
                          <Coins className="w-3.5 h-3.5" />
                          {c.metricBudget}
                        </p>
                        <p className="text-sm leading-relaxed">{result.budgetMessage}</p>
                      </div>

                      <div className="rounded-xl border border-green-100 bg-green-50/60 p-4">
                        <p className="text-sm font-semibold text-green-950 mb-2 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          {c.metricSummary}
                        </p>
                        <p className="text-sm text-green-950/90 leading-relaxed">
                          {result.summary}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="rounded-xl border-l-4 border-purple-400 bg-purple-50/90 p-5 shadow-sm">
                <p className="font-semibold text-purple-950 flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5" />
                  Tips
                </p>
                <ul className="space-y-2 text-sm text-purple-950/90 list-disc pl-5">
                  <li>Off-color sockets on high STR items are expensive — compare hybrid Vorici crafts.</li>
                  <li>Desired colors must sum to your total socket count.</li>
                  <li>Auto mode picks the lowest expected chromatic cost across all methods.</li>
                </ul>
              </div>
            </div>
          </div>

          <RatingProfileSection
            entityId="vorici-calculator"
            entityType="calculator"
            creatorSlug="antonio-ares"
            initialRatingTotal={0}
            initialRatingCount={0}
          />

          <CalculatorGuide data={guideData} layout="article" />

          <SimilarCalculators
            calculators={[
              {
                calculatorName: "Blox Fruits Wheel",
                calculatorHref: "/games/blox-fruits-wheel",
                calculatorDescription: "Spin the Blox Fruits wheel for random fruit outcomes.",
              },
              {
                calculatorName: "Chaturbate Token Calculator",
                calculatorHref: "/chaturbate-token-calculator",
                calculatorDescription: "Convert tokens to USD and estimate earnings.",
              },
              {
                calculatorName: "Whatnot Fee Calculator",
                calculatorHref: "/whatnot-fee-calculator",
                calculatorDescription: "Calculate Whatnot seller fees and net payout.",
              },
            ]}
            color="purple"
            title="Related calculators"
          />
        </div>
      </main>
    </div>
  );
}
