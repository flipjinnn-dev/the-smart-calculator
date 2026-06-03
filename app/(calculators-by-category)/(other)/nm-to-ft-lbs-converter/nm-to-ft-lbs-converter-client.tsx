"use client";

import { useCallback, useRef, useState } from "react";
import {
  ArrowRightLeft,
  BarChart3,
  Calculator,
  Copy,
  Gauge,
  Hash,
  Info,
  Lightbulb,
  RotateCcw,
  Wrench,
} from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide, {
  type CalculatorGuideData,
} from "@/components/calculator-guide";
import { RatingProfileSection } from "@/components/rating-profile-section";
import {
  convertTorque,
  type ConversionDirection,
  type TorqueConversionResult,
} from "@/lib/nm-to-ft-lbs-converter";

interface ContentShape {
  pageTitle?: string;
  pageDescriptionBefore?: string;
  pageDescriptionBold?: string;
  pageDescriptionAfter?: string;
  sectionDirection?: string;
  sectionValue?: string;
  sectionPrecision?: string;
  labelDirection?: string;
  placeholderDirection?: string;
  directionNmToFtLbs?: string;
  directionFtLbsToNm?: string;
  hintDirection?: string;
  labelValue?: string;
  placeholderValue?: string;
  hintValue?: string;
  labelPrecision?: string;
  precision0?: string;
  precision1?: string;
  precision2?: string;
  precision3?: string;
  precision4?: string;
  hintPrecision?: string;
  importantTitle?: string;
  importantBody?: string;
  btnCalculate?: string;
  btnSwap?: string;
  btnReset?: string;
  btnCopy?: string;
  copied?: string;
  resultsTitle?: string;
  resultsSubtitle?: string;
  emptyTitle?: string;
  emptyHint?: string;
  metricConverted?: string;
  metricOriginal?: string;
  metricFormula?: string;
  metricPrecision?: string;
  formulaRefTitle?: string;
  formulaRefNote?: string;
  formulaNmToFtLbs?: string;
  formulaFtLbsToNm?: string;
  proTipsTitle?: string;
  proTip1?: string;
  proTip2?: string;
  proTip3?: string;
  proTip4?: string;
  proTip5?: string;
  errValue?: string;
}

const defaultContent: ContentShape = {
  pageTitle: "Nm to Ft-Lbs Converter",
  pageDescriptionBefore: "Convert torque instantly — ",
  pageDescriptionBold: "100 Nm = 73.76 ft-lbs.",
  pageDescriptionAfter:
    " Use our free Newton meter to foot-pound converter with formula and precision control.",
};

const PRECISION_KEYS = ["0", "1", "2", "3", "4"] as const;

export default function NmToFtLbsConverterClient({
  content,
  guideContent,
}: {
  content: ContentShape | null;
  guideContent: CalculatorGuideData | null;
}) {
  const c = { ...defaultContent, ...content };
  const guideData: CalculatorGuideData = guideContent ?? {
    color: "indigo",
    sections: [],
    faq: [],
  };

  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();

  const [direction, setDirection] =
    useState<ConversionDirection>("nm-to-ft-lbs");
  const [value, setValue] = useState("100");
  const [precision, setPrecision] = useState("2");
  const [result, setResult] = useState<TorqueConversionResult | null>(null);
  const [errors, setErrors] = useState<{ value?: string }>({});
  const [copied, setCopied] = useState(false);

  const precisionLabel = (p: string) => {
    const map: Record<string, string | undefined> = {
      "0": c.precision0,
      "1": c.precision1,
      "2": c.precision2,
      "3": c.precision3,
      "4": c.precision4,
    };
    return map[p] ?? `${p} decimals`;
  };

  const compute = useCallback(() => {
    const num = parseFloat(value);
    const nextErr: typeof errors = {};
    if (value.trim() === "" || Number.isNaN(num) || num < 0) {
      nextErr.value = c.errValue;
    }
    setErrors(nextErr);
    if (Object.keys(nextErr).length > 0) {
      setResult(null);
      return;
    }

    const converted = convertTorque({
      value: num,
      direction,
      precision: parseInt(precision, 10) || 0,
    });
    setResult(converted);
    scrollToRef(resultsRef);
  }, [value, direction, precision, scrollToRef, c.errValue]);

  const swapDirection = useCallback(() => {
    setDirection((d) =>
      d === "nm-to-ft-lbs" ? "ft-lbs-to-nm" : "nm-to-ft-lbs"
    );
    setResult(null);
    setErrors({});
  }, []);

  const reset = useCallback(() => {
    setDirection("nm-to-ft-lbs");
    setValue("100");
    setPrecision("2");
    setResult(null);
    setErrors({});
    setCopied(false);
  }, []);

  const copyResult = async () => {
    if (!result) return;
    const text = `${result.outputValue} ${result.outputUnit}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const inputUnitLabel =
    direction === "nm-to-ft-lbs" ? "Nm" : "ft-lbs";

  const sectionIconClass = "text-indigo-600 flex-shrink-0 mt-0.5";

  const formCard = (
    <Card className="shadow-lg border border-gray-200/80 bg-white">
      <CardContent className="p-6 space-y-8">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <ArrowRightLeft className={`w-5 h-5 ${sectionIconClass}`} />
            <div className="flex-1 space-y-3">
              <Label className="text-sm font-semibold text-gray-800">
                {c.sectionDirection}
              </Label>
              <Select
                value={direction}
                onValueChange={(v) =>
                  setDirection(v as ConversionDirection)
                }
              >
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue placeholder={c.placeholderDirection} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nm-to-ft-lbs">
                    {c.directionNmToFtLbs}
                  </SelectItem>
                  <SelectItem value="ft-lbs-to-nm">
                    {c.directionFtLbsToNm}
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={swapDirection}
                className="rounded-xl gap-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
              >
                <ArrowRightLeft className="w-4 h-4" />
                {c.btnSwap}
              </Button>
              <p className="text-sm text-gray-500 italic">{c.hintDirection}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Gauge className={`w-5 h-5 ${sectionIconClass}`} />
            <div className="flex-1 space-y-2">
              <Label className="text-sm font-semibold text-gray-800">
                {c.sectionValue}
              </Label>
              <div className="flex gap-2">
                <Input
                  id="torque-value"
                  type="number"
                  min={0}
                  step="any"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={c.placeholderValue}
                  className="h-11 rounded-xl flex-1 text-lg tabular-nums"
                  aria-invalid={!!errors.value}
                />
                <span className="flex items-center text-sm font-medium text-gray-600 tabular-nums whitespace-nowrap px-1">
                  {inputUnitLabel}
                </span>
              </div>
              <p className="text-sm text-gray-500 italic">{c.hintValue}</p>
              {errors.value ? (
                <p className="text-sm text-red-600">{errors.value}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Hash className={`w-5 h-5 ${sectionIconClass}`} />
            <div className="flex-1 space-y-2">
              <Label className="text-sm font-semibold text-gray-800">
                {c.sectionPrecision}
              </Label>
              <Select value={precision} onValueChange={setPrecision}>
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRECISION_KEYS.map((p) => (
                    <SelectItem key={p} value={p}>
                      {precisionLabel(p)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 italic">{c.hintPrecision}</p>
            </div>
          </div>
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
            className="flex-1 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md"
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
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg">
                <Wrench className="w-8 h-8 text-white" />
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
                <CardHeader className="bg-gradient-to-r from-slate-50 to-indigo-50/50 border-b py-5 px-6">
                  <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 text-gray-900">
                    <BarChart3 className="w-6 h-6 text-indigo-600" />
                    {c.resultsTitle}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {c.resultsSubtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {!result ? (
                    <div className="rounded-xl border border-dashed border-gray-200 bg-slate-50/50 py-14 px-6 text-center">
                      <Gauge className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-lg font-semibold text-gray-800 mb-2">
                        {c.emptyTitle}
                      </p>
                      <p className="text-gray-600 max-w-md mx-auto">
                        {c.emptyHint}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div className="rounded-xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50 p-5 text-center">
                        <p className="text-xs font-medium text-indigo-900 uppercase tracking-wide mb-1">
                          {c.metricConverted}
                        </p>
                        <p className="text-4xl font-bold text-indigo-900 tabular-nums">
                          {result.outputValue}{" "}
                          <span className="text-2xl font-semibold">
                            {result.outputUnit}
                          </span>
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                          <p className="text-xs font-medium text-slate-700 uppercase tracking-wide">
                            {c.metricOriginal}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {result.inputValue}{" "}
                            <span className="text-base font-semibold text-slate-600">
                              {result.inputUnit}
                            </span>
                          </p>
                        </div>
                        <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4">
                          <p className="text-xs font-medium text-indigo-800 uppercase tracking-wide">
                            {c.metricPrecision}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {result.precision}{" "}
                            <span className="text-base font-semibold text-indigo-700">
                              decimal{result.precision === 1 ? "" : "s"}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">
                          {c.metricFormula}
                        </p>
                        <p className="text-sm font-mono text-gray-800 break-all leading-relaxed">
                          {result.formula}
                        </p>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={copyResult}
                        className="w-full h-11 rounded-xl border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        {copied ? c.copied : c.btnCopy}
                      </Button>

                      <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-4">
                        <p className="font-semibold text-amber-950 flex items-center gap-2 mb-2">
                          <Lightbulb className="w-4 h-4" />
                          {c.formulaRefTitle}
                        </p>
                        <p className="text-sm text-amber-950/85 mb-2">
                          {c.formulaRefNote}
                        </p>
                        <ul className="text-sm text-amber-950/90 space-y-1 font-mono">
                          <li>{c.formulaNmToFtLbs}</li>
                          <li>{c.formulaFtLbsToNm}</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50/90 p-5 shadow-sm">
                <p className="font-semibold text-amber-950 flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5" />
                  {c.proTipsTitle}
                </p>
                <ul className="space-y-2 text-sm text-amber-950/90 list-disc pl-5">
                  <li>{c.proTip1}</li>
                  <li>{c.proTip2}</li>
                  <li>{c.proTip3}</li>
                  <li>{c.proTip4}</li>
                  <li>{c.proTip5}</li>
                </ul>
              </div>
            </div>
          </div>

          <RatingProfileSection
            entityId="nm-to-ft-lbs-converter"
            entityType="calculator"
            creatorSlug="simon-stephen"
            initialRatingTotal={0}
            initialRatingCount={0}
          />

          <CalculatorGuide data={guideData} layout="article" />

          <SimilarCalculators
            calculators={[
              {
                calculatorName: "Height Calculator",
                calculatorHref: "/height-calculator",
                calculatorDescription:
                  "Convert height between cm, feet, inches, and meters",
              },
              {
                calculatorName: "Tenths to Inches Calculator",
                calculatorHref: "/tenths-to-inches-converter",
                calculatorDescription:
                  "Convert decimal feet to inches for surveying and construction",
              },
              {
                calculatorName: "Scientific Calculator",
                calculatorHref: "/maths/scientific-calculator",
                calculatorDescription:
                  "Advanced math operations including roots and exponents",
              },
            ]}
            color="indigo"
            title="Related calculators"
          />
        </div>
      </main>
    </div>
  );
}
