"use client";

import { useCallback, useRef, useState } from "react";
import {
  ArrowRightLeft,
  BarChart3,
  Calculator,
  Copy,
  Hash,
  Info,
  Lightbulb,
  RotateCcw,
  Ruler,
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
  convertTenthsToInches,
  type TenthsConversionResult,
  type TenthsDirection,
} from "@/lib/tenths-to-inches-converter";

interface ContentShape {
  pageTitle?: string;
  pageDescriptionBefore?: string;
  pageDescriptionBold?: string;
  pageDescriptionAfter?: string;
  sectionDirection?: string;
  sectionValue?: string;
  sectionPrecision?: string;
  placeholderDirection?: string;
  directionFeetToInches?: string;
  directionInchesToFeet?: string;
  hintDirection?: string;
  labelValue?: string;
  placeholderFeet?: string;
  placeholderInches?: string;
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
  formulaFeetToInches?: string;
  formulaInchesToFeet?: string;
  proTipsTitle?: string;
  proTip1?: string;
  proTip2?: string;
  proTip3?: string;
  proTip4?: string;
  proTip5?: string;
  errValue?: string;
}

const defaultContent: ContentShape = {
  pageTitle: "Tenths to Inches Calculator",
  pageDescriptionBefore: "Convert decimal feet instantly — ",
  pageDescriptionBold: "0.1 ft = 1.2 inches.",
  pageDescriptionAfter:
    " Free tenths-to-inches converter for surveying, construction, and engineering measurements.",
};

const PRECISION_KEYS = ["0", "1", "2", "3", "4"] as const;

export default function TenthsToInchesConverterClient({
  content,
  guideContent,
}: {
  content: ContentShape | null;
  guideContent: CalculatorGuideData | null;
}) {
  const c = { ...defaultContent, ...content };
  const guideData: CalculatorGuideData = guideContent ?? {
    color: "teal",
    sections: [],
    faq: [],
  };

  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();

  const [direction, setDirection] =
    useState<TenthsDirection>("feet-to-inches");
  const [value, setValue] = useState("3.7");
  const [precision, setPrecision] = useState("1");
  const [result, setResult] = useState<TenthsConversionResult | null>(null);
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

    const converted = convertTenthsToInches({
      value: num,
      direction,
      precision: parseInt(precision, 10) || 0,
    });
    setResult(converted);
    scrollToRef(resultsRef);
  }, [value, direction, precision, scrollToRef, c.errValue]);

  const swapDirection = useCallback(() => {
    setDirection((d) =>
      d === "feet-to-inches" ? "inches-to-feet" : "feet-to-inches"
    );
    setResult(null);
    setErrors({});
  }, []);

  const reset = useCallback(() => {
    setDirection("feet-to-inches");
    setValue("3.7");
    setPrecision("1");
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

  const inputPlaceholder =
    direction === "feet-to-inches" ? c.placeholderFeet : c.placeholderInches;
  const inputSuffix = direction === "feet-to-inches" ? "ft" : "in";

  const sectionIconClass = "text-teal-600 flex-shrink-0 mt-0.5";

  const formCard = (
    <Card className="shadow-lg border border-gray-200/80 bg-white">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-teal-100/80 py-5 px-6">
        <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 text-gray-900">
          <Calculator className="w-6 h-6 text-teal-600" />
          Inputs
        </CardTitle>
        <CardDescription className="text-base text-gray-600">
          Enter your measurement and conversion direction; defaults use common
          field survey values.
        </CardDescription>
      </CardHeader>
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
                onValueChange={(v) => setDirection(v as TenthsDirection)}
              >
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue placeholder={c.placeholderDirection} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feet-to-inches">
                    {c.directionFeetToInches}
                  </SelectItem>
                  <SelectItem value="inches-to-feet">
                    {c.directionInchesToFeet}
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={swapDirection}
                className="rounded-xl gap-2 border-teal-200 text-teal-700 hover:bg-teal-50"
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
            <Ruler className={`w-5 h-5 ${sectionIconClass}`} />
            <div className="flex-1 space-y-2">
              <Label className="text-sm font-semibold text-gray-800">
                {c.sectionValue}
              </Label>
              <div className="flex gap-2">
                <Input
                  id="tenths-value"
                  type="number"
                  min={0}
                  step="any"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={inputPlaceholder}
                  className="h-11 rounded-xl flex-1 text-lg tabular-nums"
                  aria-invalid={!!errors.value}
                />
                <span className="flex items-center text-sm font-medium text-gray-600 tabular-nums whitespace-nowrap px-1">
                  {inputSuffix}
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
            className="flex-1 h-12 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-md"
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
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                <Ruler className="w-8 h-8 text-white" />
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
                <CardHeader className="bg-gradient-to-r from-slate-50 to-teal-50/50 border-b py-5 px-6">
                  <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 text-gray-900">
                    <BarChart3 className="w-6 h-6 text-teal-600" />
                    {c.resultsTitle}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {c.resultsSubtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {!result ? (
                    <div className="rounded-xl border border-dashed border-gray-200 bg-slate-50/50 py-14 px-6 text-center">
                      <Ruler className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-lg font-semibold text-gray-800 mb-2">
                        {c.emptyTitle}
                      </p>
                      <p className="text-gray-600 max-w-md mx-auto">
                        {c.emptyHint}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div className="rounded-xl border-2 border-teal-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5 text-center">
                        <p className="text-xs font-medium text-teal-900 uppercase tracking-wide mb-1">
                          {c.metricConverted}
                        </p>
                        <p className="text-4xl font-bold text-teal-900 tabular-nums">
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
                        <div className="rounded-xl border border-teal-100 bg-teal-50/40 p-4">
                          <p className="text-xs font-medium text-teal-800 uppercase tracking-wide">
                            {c.metricPrecision}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {result.precision}{" "}
                            <span className="text-base font-semibold text-teal-700">
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
                        className="w-full h-11 rounded-xl border-teal-200 text-teal-700 hover:bg-teal-50"
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
                          <li>{c.formulaFeetToInches}</li>
                          <li>{c.formulaInchesToFeet}</li>
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
            entityId="tenths-to-inches-converter"
            entityType="calculator"
            creatorSlug="simon-stephen"
            initialRatingTotal={0}
            initialRatingCount={0}
          />

          <CalculatorGuide data={guideData} layout="article" />

          <SimilarCalculators
            calculators={[
              {
                calculatorName: "Nm to Ft-Lbs Converter",
                calculatorHref: "/nm-to-ft-lbs-converter",
                calculatorDescription:
                  "Convert Newton meters to foot-pounds for torque specs",
              },
              {
                calculatorName: "Height Calculator",
                calculatorHref: "/height-calculator",
                calculatorDescription:
                  "Convert height between cm, feet, inches, and meters",
              },
              {
                calculatorName: "Square Feet to Cubic Yards",
                calculatorHref: "/construction/square-feet-to-cubic-yards-calculator",
                calculatorDescription:
                  "Convert area and depth to volume in cubic yards",
              },
            ]}
            color="teal"
            title="Related calculators"
          />
        </div>
      </main>
    </div>
  );
}
