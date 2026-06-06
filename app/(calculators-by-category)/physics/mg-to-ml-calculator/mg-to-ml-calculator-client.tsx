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
  ArrowLeftRight,
  BarChart3,
  Beaker,
  Calculator,
  Droplets,
  FlaskConical,
  Info,
  Lightbulb,
  RotateCcw,
  Syringe,
} from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide, { type CalculatorGuideData } from "@/components/calculator-guide";
import { RatingProfileSection } from "@/components/rating-profile-section";

type LiquidKey = "water" | "milk" | "cooking_oil" | "ethanol" | "honey" | "custom";
type ConversionType = "mg-to-ml" | "ml-to-mg";

const LIQUID_DENSITY: Record<Exclude<LiquidKey, "custom">, number> = {
  water: 1000,
  milk: 1032,
  cooking_oil: 915,
  ethanol: 789,
  honey: 1420,
};

interface MgToMlResult {
  mgValue: number;
  mlValue: number;
  density: number;
  liquidLabel: string;
  conversionType: ConversionType;
  formula: string;
  usedMedication: boolean;
}

interface ContentShape {
  pageTitle?: string;
  pageDescriptionBefore?: string;
  pageDescriptionBold?: string;
  pageDescriptionAfter?: string;
  inputsTitle?: string;
  inputsSubtitle?: string;
  sectionConversion?: string;
  labelConversionType?: string;
  conversionMgToMl?: string;
  conversionMlToMg?: string;
  sectionAmount?: string;
  labelMg?: string;
  labelMl?: string;
  placeholderMg?: string;
  placeholderMl?: string;
  hintAmount?: string;
  sectionLiquid?: string;
  labelLiquidType?: string;
  liquidWater?: string;
  liquidMilk?: string;
  liquidOil?: string;
  liquidEthanol?: string;
  liquidHoney?: string;
  liquidCustom?: string;
  labelCustomDensity?: string;
  suffixDensity?: string;
  hintCustomDensity?: string;
  sectionMedication?: string;
  labelMedication?: string;
  placeholderMedication?: string;
  hintMedication?: string;
  importantTitle?: string;
  importantBody?: string;
  btnCalculate?: string;
  btnReset?: string;
  resultsTitle?: string;
  resultsSubtitle?: string;
  emptyTitle?: string;
  emptyHint?: string;
  metricResult?: string;
  metricMg?: string;
  metricMl?: string;
  metricDensity?: string;
  metricLiquid?: string;
  suffixMg?: string;
  suffixMl?: string;
  chartTitle?: string;
  chartNote?: string;
  chart100mg?: string;
  chart500mg?: string;
  chart1000mg?: string;
  formulaTitle?: string;
  proTipsTitle?: string;
  proTip1?: string;
  proTip2?: string;
  proTip3?: string;
  proTip4?: string;
  proTip5?: string;
  errAmount?: string;
  errDensity?: string;
  errMedication?: string;
}

const defaultContent: ContentShape = {
  pageTitle: "mg to mL Calculator",
  pageDescriptionBefore: "For water, ",
  pageDescriptionBold: "1,000 mg = 1 mL.",
  pageDescriptionAfter:
    " Use our calculator to convert milligrams to milliliters by density or medication concentration.",
};

function parseConcentration(input: string): number | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const ratioMatch = trimmed.match(/([\d.]+)\s*mg\s*\/\s*([\d.]+)\s*m?l/i);
  if (ratioMatch) {
    const mg = Number.parseFloat(ratioMatch[1]);
    const ml = Number.parseFloat(ratioMatch[2]);
    if (Number.isFinite(mg) && Number.isFinite(ml) && mg > 0 && ml > 0) {
      return mg / ml;
    }
  }

  const directMatch = trimmed.match(/([\d.]+)\s*mg\s*\/\s*m?l/i);
  if (directMatch) {
    const val = Number.parseFloat(directMatch[1]);
    if (Number.isFinite(val) && val > 0) return val;
  }

  const num = Number.parseFloat(trimmed);
  if (Number.isFinite(num) && num > 0) return num;
  return null;
}

function formatMl(value: number): string {
  if (value >= 1) return value.toFixed(3).replace(/\.?0+$/, "");
  return value.toFixed(4).replace(/\.?0+$/, "");
}

function formatMg(value: number): string {
  return value.toFixed(2).replace(/\.?0+$/, "");
}

export default function MgToMlCalculatorClient({
  content,
  guideContent,
}: {
  content: ContentShape | null;
  guideContent: CalculatorGuideData | null;
}) {
  const c = { ...defaultContent, ...content };
  const guideData: CalculatorGuideData = guideContent ?? {
    color: "emerald",
    sections: [],
    faq: [],
  };

  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();

  const [conversionType, setConversionType] = useState<ConversionType>("mg-to-ml");
  const [amount, setAmount] = useState("");
  const [liquid, setLiquid] = useState<LiquidKey>("water");
  const [customDensity, setCustomDensity] = useState("");
  const [medicationConcentration, setMedicationConcentration] = useState("");
  const [result, setResult] = useState<MgToMlResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sectionIconClass = "text-emerald-600 flex-shrink-0 mt-0.5";

  const resolveDensity = useCallback((): { density: number; label: string; usedMedication: boolean } | null => {
    const medDensity = parseConcentration(medicationConcentration);
    if (medicationConcentration.trim() && medDensity == null) {
      return null;
    }
    if (medDensity != null) {
      return { density: medDensity, label: "Medication concentration", usedMedication: true };
    }
    if (liquid === "custom") {
      const d = Number.parseFloat(customDensity);
      if (!Number.isFinite(d) || d <= 0) return null;
      return { density: d, label: "Custom liquid", usedMedication: false };
    }
    const density = LIQUID_DENSITY[liquid];
    const labels: Record<Exclude<LiquidKey, "custom">, string> = {
      water: c.liquidWater ?? "Water",
      milk: c.liquidMilk ?? "Whole milk",
      cooking_oil: c.liquidOil ?? "Cooking oil",
      ethanol: c.liquidEthanol ?? "Ethanol",
      honey: c.liquidHoney ?? "Honey",
    };
    return { density, label: labels[liquid], usedMedication: false };
  }, [
    medicationConcentration,
    liquid,
    customDensity,
    c.liquidWater,
    c.liquidMilk,
    c.liquidOil,
    c.liquidEthanol,
    c.liquidHoney,
  ]);

  const compute = useCallback(() => {
    const nextErr: Record<string, string> = {};
    const val = Number.parseFloat(amount);
    if (!Number.isFinite(val) || val <= 0) {
      nextErr.amount = c.errAmount ?? "Enter a valid amount.";
    }

    const densityInfo = resolveDensity();
    if (!densityInfo) {
      if (medicationConcentration.trim()) {
        nextErr.medication = c.errMedication ?? "Invalid concentration.";
      } else if (liquid === "custom") {
        nextErr.density = c.errDensity ?? "Invalid density.";
      }
    }

    setErrors(nextErr);
    if (Object.keys(nextErr).length > 0 || !densityInfo) {
      setResult(null);
      return;
    }

    const { density, label, usedMedication } = densityInfo;

    let mgValue: number;
    let mlValue: number;
    let formula: string;

    if (conversionType === "mg-to-ml") {
      mgValue = val;
      mlValue = mgValue / density;
      formula = `mL = mg ÷ density (${density} mg/mL)`;
    } else {
      mlValue = val;
      mgValue = mlValue * density;
      formula = `mg = mL × density (${density} mg/mL)`;
    }

    setResult({
      mgValue,
      mlValue,
      density,
      liquidLabel: label,
      conversionType,
      formula,
      usedMedication,
    });
    scrollToRef(resultsRef);
  }, [
    amount,
    conversionType,
    resolveDensity,
    medicationConcentration,
    liquid,
    scrollToRef,
    c.errAmount,
    c.errDensity,
    c.errMedication,
  ]);

  const reset = useCallback(() => {
    setConversionType("mg-to-ml");
    setAmount("");
    setLiquid("water");
    setCustomDensity("");
    setMedicationConcentration("");
    setResult(null);
    setErrors({});
  }, []);

  const quickRef = result
    ? [
        { label: c.chart100mg ?? "100 mg", ml: 100 / result.density },
        { label: c.chart500mg ?? "500 mg", ml: 500 / result.density },
        { label: c.chart1000mg ?? "1000 mg", ml: 1000 / result.density },
      ]
    : [];

  const formCard = (
    <Card className="shadow-lg border border-gray-200/80 bg-white">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100/80 py-5 px-6">
        <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 text-gray-900">
          <Calculator className="w-6 h-6 text-emerald-600" />
          {c.inputsTitle}
        </CardTitle>
        <CardDescription className="text-base text-gray-600">{c.inputsSubtitle}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <ArrowLeftRight className={`w-5 h-5 ${sectionIconClass}`} />
            <div className="flex-1 space-y-2">
              <Label className="text-sm font-semibold text-gray-800">{c.sectionConversion}</Label>
              <Select
                value={conversionType}
                onValueChange={(v) => setConversionType(v as ConversionType)}
              >
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mg-to-ml">{c.conversionMgToMl}</SelectItem>
                  <SelectItem value="ml-to-mg">{c.conversionMlToMg}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2">
            {conversionType === "mg-to-ml" ? (
              <FlaskConical className={`w-5 h-5 ${sectionIconClass}`} />
            ) : (
              <Beaker className={`w-5 h-5 ${sectionIconClass}`} />
            )}
            <div className="flex-1 space-y-2">
              <Label className="text-sm font-semibold text-gray-800">{c.sectionAmount}</Label>
              <Label className="text-xs font-medium text-gray-600">
                {conversionType === "mg-to-ml" ? c.labelMg : c.labelMl}
              </Label>
              <Input
                type="number"
                min={0}
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={conversionType === "mg-to-ml" ? c.placeholderMg : c.placeholderMl}
                className="h-11 rounded-xl"
                aria-invalid={!!errors.amount}
              />
              {c.hintAmount ? (
                <p className="text-sm text-gray-500 italic">{c.hintAmount}</p>
              ) : null}
              {errors.amount ? <p className="text-sm text-red-600">{errors.amount}</p> : null}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Droplets className={`w-5 h-5 ${sectionIconClass}`} />
            <div className="flex-1 space-y-4">
              <Label className="text-sm font-semibold text-gray-800">{c.sectionLiquid}</Label>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">{c.labelLiquidType}</Label>
                <Select value={liquid} onValueChange={(v) => setLiquid(v as LiquidKey)}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="water">{c.liquidWater}</SelectItem>
                    <SelectItem value="milk">{c.liquidMilk}</SelectItem>
                    <SelectItem value="cooking_oil">{c.liquidOil}</SelectItem>
                    <SelectItem value="ethanol">{c.liquidEthanol}</SelectItem>
                    <SelectItem value="honey">{c.liquidHoney}</SelectItem>
                    <SelectItem value="custom">{c.liquidCustom}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {liquid === "custom" ? (
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">{c.labelCustomDensity}</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min={0}
                      step="any"
                      value={customDensity}
                      onChange={(e) => setCustomDensity(e.target.value)}
                      className="h-11 rounded-xl flex-1"
                      aria-invalid={!!errors.density}
                    />
                    <span className="flex items-center text-sm text-gray-500 tabular-nums whitespace-nowrap">
                      {c.suffixDensity}
                    </span>
                  </div>
                  {c.hintCustomDensity ? (
                    <p className="text-sm text-gray-500 italic">{c.hintCustomDensity}</p>
                  ) : null}
                  {errors.density ? (
                    <p className="text-sm text-red-600">{errors.density}</p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Syringe className={`w-5 h-5 ${sectionIconClass}`} />
            <div className="flex-1 space-y-2">
              <Label className="text-sm font-semibold text-gray-800">{c.sectionMedication}</Label>
              <Label className="text-xs font-medium text-gray-600">{c.labelMedication}</Label>
              <Input
                type="text"
                value={medicationConcentration}
                onChange={(e) => setMedicationConcentration(e.target.value)}
                placeholder={c.placeholderMedication}
                className="h-11 rounded-xl"
                aria-invalid={!!errors.medication}
              />
              {c.hintMedication ? (
                <p className="text-sm text-gray-500 italic">{c.hintMedication}</p>
              ) : null}
              {errors.medication ? (
                <p className="text-sm text-red-600">{errors.medication}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50/90 p-4 flex gap-3">
          <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900 text-sm mb-1">{c.importantTitle}</p>
            <p className="text-sm text-amber-950/90 leading-relaxed">{c.importantBody}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            onClick={compute}
            className="flex-1 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md"
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
                <Droplets className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              {c.pageTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {c.pageDescriptionBefore}
              <strong className="font-semibold text-gray-900">{c.pageDescriptionBold}</strong>
              {c.pageDescriptionAfter}
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>{formCard}</div>

            <div ref={resultsRef} className="space-y-6">
              <Card className="shadow-lg border border-gray-200/80 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-emerald-50/50 border-b py-5 px-6">
                  <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 text-gray-900">
                    <BarChart3 className="w-6 h-6 text-emerald-600" />
                    {c.resultsTitle}
                  </CardTitle>
                  <CardDescription className="text-base">{c.resultsSubtitle}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {!result ? (
                    <div className="rounded-xl border border-dashed border-gray-200 bg-slate-50/50 py-14 px-6 text-center">
                      <Droplets className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-lg font-semibold text-gray-800 mb-2">{c.emptyTitle}</p>
                      <p className="text-gray-600 max-w-md mx-auto">{c.emptyHint}</p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 sm:col-span-2">
                          <p className="text-xs font-medium text-emerald-900 uppercase tracking-wide">
                            {c.metricResult}
                          </p>
                          <p className="text-3xl font-bold text-emerald-900 tabular-nums">
                            {result.conversionType === "mg-to-ml"
                              ? `${formatMl(result.mlValue)} ${c.suffixMl}`
                              : `${formatMg(result.mgValue)} ${c.suffixMg}`}
                          </p>
                          <p className="text-sm text-emerald-800/80 mt-1">
                            {result.conversionType === "mg-to-ml"
                              ? `${formatMg(result.mgValue)} ${c.suffixMg} → ${formatMl(result.mlValue)} ${c.suffixMl}`
                              : `${formatMl(result.mlValue)} ${c.suffixMl} → ${formatMg(result.mgValue)} ${c.suffixMg}`}
                          </p>
                        </div>
                        <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
                          <p className="text-xs font-medium text-emerald-800 uppercase tracking-wide">
                            {c.metricMg}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {formatMg(result.mgValue)}{" "}
                            <span className="text-base font-semibold text-emerald-700">{c.suffixMg}</span>
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                          <p className="text-xs font-medium text-slate-700 uppercase tracking-wide">
                            {c.metricMl}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {formatMl(result.mlValue)}{" "}
                            <span className="text-base font-semibold text-slate-600">{c.suffixMl}</span>
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                            {c.metricDensity}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {result.density}{" "}
                            <span className="text-base font-semibold text-gray-600">{c.suffixDensity}</span>
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                          <p className="text-xs font-medium text-slate-700 uppercase tracking-wide">
                            {c.metricLiquid}
                          </p>
                          <p className="text-lg font-bold text-gray-900">{result.liquidLabel}</p>
                        </div>
                      </div>

                      <div className="rounded-xl border border-gray-200 bg-slate-50/60 p-4">
                        <p className="text-sm font-semibold text-gray-800 mb-1">{c.formulaTitle}</p>
                        <code className="text-sm font-mono text-gray-700">{result.formula}</code>
                      </div>

                      <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-4">
                        <p className="font-semibold text-amber-950 flex items-center gap-2 mb-2">
                          <Lightbulb className="w-4 h-4" />
                          {c.chartTitle}
                        </p>
                        <p className="text-sm text-amber-950/85 mb-3">{c.chartNote}</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                          {quickRef.map((row) => (
                            <li
                              key={row.label}
                              className="rounded-lg bg-white/80 border border-amber-100 px-3 py-2"
                            >
                              <span className="text-gray-500 block text-xs">{row.label}</span>
                              <span className="font-bold text-gray-900 tabular-nums">
                                {formatMl(row.ml)} {c.suffixMl}
                              </span>
                            </li>
                          ))}
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
            entityId="mg-to-ml-calculator"
            entityType="calculator"
            creatorSlug="simon-stephen"
            initialRatingTotal={0}
            initialRatingCount={0}
          />

          <CalculatorGuide data={guideData} layout="article" />

          <SimilarCalculators
            calculators={[
              {
                calculatorName: "Volume Calculator",
                calculatorHref: "/maths/volume-calculator",
                calculatorDescription:
                  "Calculate volume of cubes, cylinders, spheres, and other 3D shapes.",
              },
              {
                calculatorName: "Size to Weight Calculator",
                calculatorHref: "/construction/size-to-weight-rectangular-cuboid-calculator",
                calculatorDescription:
                  "Estimate weight from dimensions and material density for rectangular blocks.",
              },
              {
                calculatorName: "Vancomycin Calculator",
                calculatorHref: "/health/vancomycin-calculator",
                calculatorDescription:
                  "Calculate vancomycin dosing and infusion rates for clinical use.",
              },
            ]}
            color="teal"
            title="Related physics & health calculators"
          />
        </div>
      </main>
    </div>
  );
}
