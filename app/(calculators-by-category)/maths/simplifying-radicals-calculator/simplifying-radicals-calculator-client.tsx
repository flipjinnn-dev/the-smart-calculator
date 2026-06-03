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
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calculator,
  FunctionSquare,
  Info,
  Lightbulb,
  ListOrdered,
  RotateCcw,
  Sigma,
} from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide, {
  type CalculatorGuideData,
} from "@/components/calculator-guide";
import { RatingProfileSection } from "@/components/rating-profile-section";
import {
  parseRadicandInput,
  simplifyRadical,
  simplifyRadicalSum,
  type ExpressionType,
  type SimplifyRadicalResult,
} from "@/lib/simplifying-radicals-calculator";

type RootPreset = "2" | "3" | "custom";

interface ContentShape {
  pageTitle?: string;
  pageDescriptionBefore?: string;
  pageDescriptionBold?: string;
  pageDescriptionAfter?: string;
  sectionInput?: string;
  labelRadicand?: string;
  placeholderRadicand?: string;
  labelRadicandB?: string;
  placeholderRadicandB?: string;
  labelRootOrder?: string;
  rootSquare?: string;
  rootCube?: string;
  rootCustom?: string;
  labelCustomN?: string;
  labelExpressionType?: string;
  exprSingle?: string;
  exprSum?: string;
  exprProduct?: string;
  exprQuotient?: string;
  labelShowSteps?: string;
  showStepsHint?: string;
  importantTitle?: string;
  importantBody?: string;
  btnCalculate?: string;
  btnReset?: string;
  resultsTitle?: string;
  resultsSubtitle?: string;
  emptyTitle?: string;
  emptyHint?: string;
  metricSimplified?: string;
  metricInput?: string;
  metricFactorization?: string;
  stepsTitle?: string;
  alreadySimple?: string;
  errRadicand?: string;
  errSecond?: string;
  errQuotient?: string;
  errCustomN?: string;
}

const defaultContent: ContentShape = {
  pageTitle: "Simplifying Radicals Calculator",
  pageDescriptionBefore: "Simplify radicals ",
  pageDescriptionBold: "with step-by-step prime factorization.",
  pageDescriptionAfter: " Enter a radicand and root order for instant simplest form.",
};

export default function SimplifyingRadicalsCalculatorClient({
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

  const [radicand, setRadicand] = useState("72");
  const [radicandB, setRadicandB] = useState("18");
  const [rootPreset, setRootPreset] = useState<RootPreset>("2");
  const [customN, setCustomN] = useState("4");
  const [exprType, setExprType] = useState<ExpressionType>("single");
  const [showSteps, setShowSteps] = useState(true);
  const [result, setResult] = useState<SimplifyRadicalResult | null>(null);
  const [errors, setErrors] = useState<{
    radicand?: string;
    second?: string;
    customN?: string;
  }>({});

  const getRootIndex = useCallback((): number => {
    if (rootPreset === "2") return 2;
    if (rootPreset === "3") return 3;
    const n = parseInt(customN, 10);
    return Number.isFinite(n) && n >= 2 ? n : 0;
  }, [rootPreset, customN]);

  const compute = useCallback(() => {
    const nextErr: typeof errors = {};
    const a = parseRadicandInput(radicand);
    if (a == null) nextErr.radicand = c.errRadicand;

    const rootIndex = getRootIndex();
    if (rootIndex < 2) nextErr.customN = c.errCustomN;

    let b: number | null = null;
    if (exprType !== "single") {
      b = parseRadicandInput(radicandB);
      if (b == null) nextErr.second = c.errSecond;
    }

    setErrors(nextErr);
    if (Object.keys(nextErr).length > 0 || a == null || rootIndex < 2) {
      setResult(null);
      return;
    }

    let computed: SimplifyRadicalResult | null = null;

    if (exprType === "sum" && b != null) {
      computed = simplifyRadicalSum(a, b, rootIndex);
    } else if (exprType === "single") {
      computed = simplifyRadical({
        radicand: a,
        rootIndex,
        expressionType: "single",
      });
    } else if (exprType === "product" && b != null) {
      computed = simplifyRadical({
        radicand: a,
        rootIndex,
        expressionType: "product",
        secondRadicand: b,
      });
    } else if (exprType === "quotient" && b != null) {
      if (b === 0) {
        nextErr.second = c.errQuotient;
        setErrors(nextErr);
        setResult(null);
        return;
      }
      computed = simplifyRadical({
        radicand: a,
        rootIndex,
        expressionType: "quotient",
        secondRadicand: b,
      });
      if (!computed) {
        nextErr.second = c.errQuotient;
        setErrors(nextErr);
        setResult(null);
        return;
      }
    }

    setResult(computed);
    scrollToRef(resultsRef);
  }, [
    radicand,
    radicandB,
    exprType,
    getRootIndex,
    scrollToRef,
    c.errRadicand,
    c.errSecond,
    c.errQuotient,
    c.errCustomN,
  ]);

  const reset = useCallback(() => {
    setRadicand("72");
    setRadicandB("18");
    setRootPreset("2");
    setCustomN("4");
    setExprType("single");
    setShowSteps(true);
    setResult(null);
    setErrors({});
  }, []);

  const sectionIconClass = "text-purple-600 flex-shrink-0 mt-0.5";

  const formCard = (
    <Card className="shadow-lg border border-gray-200/80 bg-white">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 border-b border-purple-100/80 py-5 px-6">
        <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 text-gray-900">
          <Calculator className="w-6 h-6 text-purple-600" />
          {c.sectionInput}
        </CardTitle>
        <CardDescription className="text-base text-gray-600">
          Enter the value under the radical and choose the root order.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        <div className="flex items-start gap-2">
          <Sigma className={`w-5 h-5 ${sectionIconClass}`} />
          <div className="flex-1 space-y-4">
            <Label className="text-sm font-semibold text-gray-800">
              {c.labelExpressionType}
            </Label>
            <Select
              value={exprType}
              onValueChange={(v) => setExprType(v as ExpressionType)}
            >
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">{c.exprSingle}</SelectItem>
                <SelectItem value="sum">{c.exprSum}</SelectItem>
                <SelectItem value="product">{c.exprProduct}</SelectItem>
                <SelectItem value="quotient">{c.exprQuotient}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <FunctionSquare className={`w-5 h-5 ${sectionIconClass}`} />
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-gray-600">
                {c.labelRadicand}
              </Label>
              <Input
                type="text"
                inputMode="decimal"
                value={radicand}
                onChange={(e) => setRadicand(e.target.value)}
                placeholder={c.placeholderRadicand}
                className="h-11 rounded-xl"
                aria-invalid={!!errors.radicand}
              />
              {errors.radicand ? (
                <p className="text-sm text-red-600">{errors.radicand}</p>
              ) : null}
            </div>
            {exprType !== "single" ? (
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">
                  {c.labelRadicandB}
                </Label>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={radicandB}
                  onChange={(e) => setRadicandB(e.target.value)}
                  placeholder={c.placeholderRadicandB}
                  className="h-11 rounded-xl"
                  aria-invalid={!!errors.second}
                />
                {errors.second ? (
                  <p className="text-sm text-red-600">{errors.second}</p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <ListOrdered className={`w-5 h-5 ${sectionIconClass}`} />
          <div className="flex-1 space-y-4">
            <Label className="text-sm font-semibold text-gray-800">
              {c.labelRootOrder}
            </Label>
            <Select
              value={rootPreset}
              onValueChange={(v) => setRootPreset(v as RootPreset)}
            >
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">{c.rootSquare}</SelectItem>
                <SelectItem value="3">{c.rootCube}</SelectItem>
                <SelectItem value="custom">{c.rootCustom}</SelectItem>
              </SelectContent>
            </Select>
            {rootPreset === "custom" ? (
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">
                  {c.labelCustomN}
                </Label>
                <Input
                  type="number"
                  min={2}
                  max={12}
                  step={1}
                  value={customN}
                  onChange={(e) => setCustomN(e.target.value)}
                  className="h-11 rounded-xl w-32"
                  aria-invalid={!!errors.customN}
                />
                {errors.customN ? (
                  <p className="text-sm text-red-600">{errors.customN}</p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-purple-100 bg-purple-50/50 px-4 py-3">
          <div>
            <Label htmlFor="show-steps" className="font-medium text-gray-900">
              {c.labelShowSteps}
            </Label>
            <p className="text-sm text-gray-600">{c.showStepsHint}</p>
          </div>
          <Switch
            id="show-steps"
            checked={showSteps}
            onCheckedChange={setShowSteps}
          />
        </div>

        <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50/90 p-4 flex gap-3">
          <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900 text-sm mb-1">
              {c.importantTitle}
            </p>
            <p className="text-sm text-amber-950/90 leading-relaxed">
              {c.importantBody}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            onClick={compute}
            className="flex-1 h-12 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md"
          >
            <Calculator className="w-4 h-4 mr-2" />
            {c.btnCalculate}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={reset}
            className="h-12 rounded-xl border-gray-300"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            {c.btnReset}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg">
                <Sigma className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              {c.pageTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {c.pageDescriptionBefore}
              <strong className="font-semibold text-gray-900">
                {c.pageDescriptionBold}
              </strong>
              {c.pageDescriptionAfter}
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>{formCard}</div>

            <div ref={resultsRef} className="space-y-6">
              <Card className="shadow-lg border border-gray-200/80 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-purple-50/50 border-b py-5 px-6">
                  <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 text-gray-900">
                    <FunctionSquare className="w-6 h-6 text-purple-600" />
                    {c.resultsTitle}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {c.resultsSubtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {!result ? (
                    <div className="rounded-xl border border-dashed border-gray-200 bg-slate-50/50 py-14 px-6 text-center">
                      <Sigma className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-lg font-semibold text-gray-800 mb-2">
                        {c.emptyTitle}
                      </p>
                      <p className="text-gray-600 max-w-md mx-auto">
                        {c.emptyHint}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50 p-5 text-center">
                        <p className="text-xs font-medium text-purple-900 uppercase tracking-wide mb-1">
                          {c.metricSimplified}
                        </p>
                        <p className="text-3xl sm:text-4xl font-bold text-purple-900 font-mono">
                          {result.simplified}
                        </p>
                        {result.isAlreadySimple ? (
                          <p className="text-sm text-purple-700 mt-2">
                            {c.alreadySimple}
                          </p>
                        ) : null}
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                          <p className="text-xs font-medium text-slate-700 uppercase tracking-wide">
                            {c.metricInput}
                          </p>
                          <p className="text-xl font-bold text-gray-900 font-mono mt-1">
                            {result.inputLabel}
                          </p>
                        </div>
                        <div className="rounded-xl border border-purple-100 bg-purple-50/40 p-4">
                          <p className="text-xs font-medium text-purple-800 uppercase tracking-wide">
                            {c.metricFactorization}
                          </p>
                          <p className="text-base font-mono text-gray-900 mt-1 break-all">
                            {result.primeFactorization}
                          </p>
                        </div>
                      </div>

                      {showSteps && result.steps.length > 0 ? (
                        <div className="rounded-xl border border-violet-100 bg-violet-50/30 p-4">
                          <p className="font-semibold text-violet-950 flex items-center gap-2 mb-3">
                            <ListOrdered className="w-4 h-4" />
                            {c.stepsTitle}
                          </p>
                          <ol className="space-y-3 list-decimal pl-5 text-sm text-gray-800">
                            {result.steps.map((step, i) => (
                              <li key={i} className="leading-relaxed">
                                <span className="font-semibold">{step.title}</span>
                                <span className="block whitespace-pre-line text-gray-600 mt-0.5">
                                  {step.body}
                                </span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      ) : null}
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50/90 p-5 shadow-sm">
                <p className="font-semibold text-amber-950 flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5" />
                  Quick tip
                </p>
                <p className="text-sm text-amber-950/90 leading-relaxed">
                  For square roots, look for pairs in the prime factorization. For
                  cube roots, look for triples. Example: √288 = 12√2.
                </p>
              </div>
            </div>
          </div>

          <RatingProfileSection
            entityId="simplifying-radicals-calculator"
            entityType="calculator"
            creatorSlug="simon-stephen"
            initialRatingTotal={0}
            initialRatingCount={0}
          />

          <CalculatorGuide data={guideData} layout="article" />

          <SimilarCalculators
            calculators={[
              {
                calculatorName: "Square root curve calculator",
                calculatorHref: "/maths/square-root-curve-calculator",
                calculatorDescription:
                  "Map raw scores to curved grades using square root scaling",
              },
              {
                calculatorName: "Scientific calculator",
                calculatorHref: "/maths/scientific-calculator",
                calculatorDescription:
                  "Advanced math operations including roots and exponents",
              },
              {
                calculatorName: "Percentage calculator",
                calculatorHref: "/maths/percentage-calculator",
                calculatorDescription:
                  "Calculate percentages, increases, and decreases",
              },
            ]}
            color="purple"
            title="Related maths calculators"
          />
        </div>
      </main>
    </div>
  );
}
