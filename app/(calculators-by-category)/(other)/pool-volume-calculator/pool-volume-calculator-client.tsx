"use client";

import { useCallback, useMemo, useRef, useState } from "react";
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
  Circle,
  Droplets,
  Info,
  Lightbulb,
  RotateCcw,
  Shapes,
  Square,
  Waves,
} from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide, { type CalculatorGuideData } from "@/components/calculator-guide";
import { RatingProfileSection } from "@/components/rating-profile-section";

type PoolShape = "rectangular" | "round" | "oval" | "kidney";
type MeasureUnit = "feet" | "meters";

interface PoolVolumeResult {
  shape: PoolShape;
  unit: MeasureUnit;
  avgDepth: number;
  usGallons: number;
  ukGallons: number;
  litres: number;
  cubicMeters: number;
  waterWeightLbs: number;
  waterWeightKg: number;
  formulaNote: string;
}

const GAL_PER_FT3 = 7.48052;
const L_PER_FT3 = 28.3168;
const M3_PER_FT3 = 0.0283168;
const L_PER_M3 = 1000;
const US_GAL_PER_M3 = 264.172052;
const LBS_PER_US_GAL = 8.34;
const UK_GAL_PER_L = 1 / 4.54609;

function parsePositive(value: string): number | null {
  const n = Number.parseFloat(value);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

function computeVolume(
  shape: PoolShape,
  unit: MeasureUnit,
  length: number,
  width: number,
  widthB: number,
  avgDepth: number
): { cubicFeet: number; cubicMeters: number; formulaNote: string } {
  let cubicFeet = 0;
  let cubicMeters = 0;
  let formulaNote = "";

  if (unit === "feet") {
    switch (shape) {
      case "rectangular":
        cubicFeet = length * width * avgDepth;
        formulaNote = "Length × Width × Avg Depth × 7.48 (US gal)";
        break;
      case "round": {
        const r = width / 2;
        cubicFeet = Math.PI * r * r * avgDepth;
        formulaNote = "π × Radius² × Avg Depth × 7.48";
        break;
      }
      case "oval":
        cubicFeet = Math.PI * (length / 2) * (width / 2) * avgDepth;
        formulaNote = "π × (L/2) × (W/2) × Avg Depth × 7.48";
        break;
      case "kidney":
        cubicFeet = (width + widthB) * length * 0.45 * avgDepth;
        formulaNote = "(Width A + Width B) × Length × 0.45 × Avg Depth × 7.48";
        break;
    }
    cubicMeters = cubicFeet * M3_PER_FT3;
  } else {
    switch (shape) {
      case "rectangular":
        cubicMeters = length * width * avgDepth;
        formulaNote = "Length × Width × Avg Depth (m³)";
        break;
      case "round": {
        const r = width / 2;
        cubicMeters = Math.PI * r * r * avgDepth;
        formulaNote = "π × Radius² × Avg Depth (m³)";
        break;
      }
      case "oval":
        cubicMeters = Math.PI * (length / 2) * (width / 2) * avgDepth;
        formulaNote = "π × (L/2) × (W/2) × Avg Depth (m³)";
        break;
      case "kidney":
        cubicMeters = (width + widthB) * length * 0.45 * avgDepth;
        formulaNote = "(Width A + Width B) × Length × 0.45 × Avg Depth (m³)";
        break;
    }
    cubicFeet = cubicMeters / M3_PER_FT3;
  }

  return { cubicFeet, cubicMeters, formulaNote };
}

interface ContentShape {
  pageTitle?: string;
  pageDescription?: string;
  sectionShape?: string;
  sectionDimensions?: string;
  labelShape?: string;
  shapeRect?: string;
  shapeRound?: string;
  shapeOval?: string;
  shapeKidney?: string;
  labelUnit?: string;
  unitFeet?: string;
  unitMeters?: string;
  labelLength?: string;
  labelWidth?: string;
  labelDiameter?: string;
  labelWidthA?: string;
  labelWidthB?: string;
  labelShallow?: string;
  labelDeep?: string;
  labelAvgDepth?: string;
  importantTitle?: string;
  importantBody?: string;
  btnCalculate?: string;
  btnReset?: string;
  resultsTitle?: string;
  resultsSubtitle?: string;
  emptyTitle?: string;
  emptyHint?: string;
  metricGallons?: string;
  metricLitres?: string;
  metricM3?: string;
  metricUkGal?: string;
  metricWeight?: string;
  formulaUsed?: string;
  exampleNote?: string;
  proTipsTitle?: string;
  proTip1?: string;
  proTip2?: string;
  proTip3?: string;
  proTip4?: string;
  proTip5?: string;
  errLength?: string;
  errWidth?: string;
  errDepth?: string;
}

const defaultContent: ContentShape = {
  pageTitle: "Pool Volume Calculator",
  pageDescription:
    "Multiply Length × Width × Average Depth × Shape Factor to get your pool volume. A standard 12 ft × 24 ft pool at 5 ft depth holds 10,771 gallons. Use the calculator above for your exact result in seconds.",
};

const shapeIcons: Record<PoolShape, typeof Square> = {
  rectangular: Square,
  round: Circle,
  oval: Shapes,
  kidney: Waves,
};

export default function PoolVolumeCalculatorClient({
  content,
  guideContent,
}: {
  content: ContentShape | null;
  guideContent: CalculatorGuideData | null;
}) {
  const c = { ...defaultContent, ...content };
  const guideData: CalculatorGuideData = guideContent ?? {
    color: "blue",
    sections: [],
    faq: [],
  };

  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();

  const [shape, setShape] = useState<PoolShape>("rectangular");
  const [unit, setUnit] = useState<MeasureUnit>("feet");
  const [length, setLength] = useState("24");
  const [width, setWidth] = useState("12");
  const [widthB, setWidthB] = useState("10");
  const [shallow, setShallow] = useState("4");
  const [deep, setDeep] = useState("6");
  const [result, setResult] = useState<PoolVolumeResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const avgDepth = useMemo(() => {
    const s = Number.parseFloat(shallow);
    const d = Number.parseFloat(deep);
    if (!Number.isFinite(s) || !Number.isFinite(d)) return null;
    return (s + d) / 2;
  }, [shallow, deep]);

  const unitLabel = unit === "feet" ? "ft" : "m";

  const compute = useCallback(() => {
    const nextErr: Record<string, string> = {};
    const l = shape === "round" ? parsePositive(width) : parsePositive(length);
    const w = parsePositive(width);
    const wb = shape === "kidney" ? parsePositive(widthB) : w;
    const sh = parsePositive(shallow);
    const dp = parsePositive(deep);

    if (shape !== "round" && l === null) nextErr.length = c.errLength;
    if (w === null) nextErr.width = c.errWidth;
    if (shape === "kidney" && parsePositive(widthB) === null) nextErr.width = c.errWidth;
    if (sh === null || dp === null) nextErr.depth = c.errDepth;

    setErrors(nextErr);
    if (Object.keys(nextErr).length > 0 || l === null || w === null || wb === null || !avgDepth) {
      setResult(null);
      return;
    }

    const len = shape === "round" ? w! : l!;
    const { cubicFeet, cubicMeters, formulaNote } = computeVolume(
      shape,
      unit,
      len,
      w!,
      shape === "kidney" ? parsePositive(widthB)! : w!,
      avgDepth
    );

    const usGallons = unit === "feet" ? cubicFeet * GAL_PER_FT3 : cubicMeters * US_GAL_PER_M3;
    const litres = unit === "feet" ? cubicFeet * L_PER_FT3 : cubicMeters * L_PER_M3;
    const ukGallons = litres * UK_GAL_PER_L;

    setResult({
      shape,
      unit,
      avgDepth: Math.round(avgDepth * 100) / 100,
      usGallons: Math.round(usGallons),
      ukGallons: Math.round(ukGallons),
      litres: Math.round(litres),
      cubicMeters: Math.round(cubicMeters * 100) / 100,
      waterWeightLbs: Math.round(usGallons * LBS_PER_US_GAL),
      waterWeightKg: Math.round(litres),
      formulaNote,
    });
    scrollToRef(resultsRef);
  }, [shape, unit, length, width, widthB, shallow, deep, avgDepth, scrollToRef, c]);

  const reset = useCallback(() => {
    setShape("rectangular");
    setUnit("feet");
    setLength("24");
    setWidth("12");
    setWidthB("10");
    setShallow("4");
    setDeep("6");
    setResult(null);
    setErrors({});
  }, []);

  const sectionIcon = "text-sky-600 flex-shrink-0 mt-0.5";

  const dimensionFields = (
    <div className="space-y-4 transition-all duration-300" key={shape}>
      {shape !== "round" && (
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-600">{c.labelLength}</Label>
          <Input
            type="number"
            min={0.1}
            step={0.1}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="h-11 rounded-xl"
            aria-invalid={!!errors.length}
          />
        </div>
      )}
      <div className="space-y-2">
        <Label className="text-xs font-medium text-gray-600">
          {shape === "round" ? c.labelDiameter : shape === "kidney" ? c.labelWidthA : c.labelWidth}
        </Label>
        <Input
          type="number"
          min={0.1}
          step={0.1}
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          className="h-11 rounded-xl"
          aria-invalid={!!errors.width}
        />
      </div>
      {shape === "kidney" && (
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-600">{c.labelWidthB}</Label>
          <Input
            type="number"
            min={0.1}
            step={0.1}
            value={widthB}
            onChange={(e) => setWidthB(e.target.value)}
            className="h-11 rounded-xl"
          />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-600">{c.labelShallow}</Label>
          <Input
            type="number"
            min={0.1}
            step={0.1}
            value={shallow}
            onChange={(e) => setShallow(e.target.value)}
            className="h-11 rounded-xl"
            aria-invalid={!!errors.depth}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-600">{c.labelDeep}</Label>
          <Input
            type="number"
            min={0.1}
            step={0.1}
            value={deep}
            onChange={(e) => setDeep(e.target.value)}
            className="h-11 rounded-xl"
            aria-invalid={!!errors.depth}
          />
        </div>
      </div>
      {avgDepth !== null ? (
        <p className="text-sm text-sky-800 bg-sky-50 rounded-lg px-3 py-2 border border-sky-100">
          {c.labelAvgDepth}: <strong>{avgDepth.toFixed(2)} {unitLabel}</strong>
        </p>
      ) : null}
      {errors.length || errors.width || errors.depth ? (
        <p className="text-sm text-red-600">{errors.length || errors.width || errors.depth}</p>
      ) : null}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Droplets className="w-8 h-8 text-white" />
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
            <div className="space-y-6">
              <Card className="shadow-lg border border-gray-200/80 bg-white">
                <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50 border-b border-sky-100/80 py-5 px-6">
                  <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 text-gray-900">
                    <Calculator className="w-6 h-6 text-sky-600" />
                    Inputs
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600">
                    Select pool shape and enter dimensions. Average depth is calculated from shallow
                    and deep ends.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-8">
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-800">{c.sectionShape}</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(Object.keys(shapeIcons) as PoolShape[]).map((s) => {
                        const Icon = shapeIcons[s];
                        const active = shape === s;
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setShape(s)}
                            className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 ${
                              active
                                ? "border-sky-500 bg-sky-50 text-sky-800 shadow-sm"
                                : "border-gray-200 hover:border-sky-300 text-gray-600"
                            }`}
                          >
                            <Icon className="w-6 h-6" />
                            <span className="text-xs font-medium text-center leading-tight">
                              {s === "rectangular"
                                ? c.shapeRect
                                : s === "round"
                                  ? c.shapeRound
                                  : s === "oval"
                                    ? c.shapeOval
                                    : c.shapeKidney}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Shapes className={`w-5 h-5 ${sectionIcon}`} />
                    <div className="flex-1 space-y-4">
                      <Label className="text-sm font-semibold text-gray-800">
                        {c.sectionDimensions}
                      </Label>
                      <div className="space-y-2 max-w-[200px]">
                        <Label className="text-xs font-medium text-gray-600">{c.labelUnit}</Label>
                        <Select value={unit} onValueChange={(v) => setUnit(v as MeasureUnit)}>
                          <SelectTrigger className="h-11 rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="feet">{c.unitFeet}</SelectItem>
                            <SelectItem value="meters">{c.unitMeters}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {dimensionFields}
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
                      className="flex-1 h-12 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow-md"
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
            </div>

            <div ref={resultsRef} className="space-y-6">
              <Card className="shadow-lg border border-gray-200/80 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-sky-50/50 border-b py-5 px-6">
                  <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 text-gray-900">
                    <BarChart3 className="w-6 h-6 text-sky-600" />
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
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-xl border-2 border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50 p-4 sm:col-span-2">
                          <p className="text-xs font-medium text-sky-900 uppercase tracking-wide">
                            {c.metricGallons}
                          </p>
                          <p className="text-3xl font-bold text-sky-900 tabular-nums">
                            {result.usGallons.toLocaleString()}{" "}
                            <span className="text-lg font-semibold">US gal</span>
                          </p>
                        </div>
                        <div className="rounded-xl border border-sky-100 bg-sky-50/40 p-4">
                          <p className="text-xs font-medium text-sky-800 uppercase tracking-wide">
                            {c.metricLitres}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {result.litres.toLocaleString()} L
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                          <p className="text-xs font-medium text-slate-700 uppercase tracking-wide">
                            {c.metricM3}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {result.cubicMeters.toLocaleString()} m³
                          </p>
                        </div>
                        <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                          <p className="text-xs font-medium text-blue-800 uppercase tracking-wide">
                            {c.metricUkGal}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {result.ukGallons.toLocaleString()} imp. gal
                          </p>
                        </div>
                        <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
                          <p className="text-xs font-medium text-indigo-900 uppercase tracking-wide">
                            {c.metricWeight}
                          </p>
                          <p className="text-xl font-bold text-gray-900 tabular-nums">
                            {result.waterWeightLbs.toLocaleString()} lbs
                          </p>
                          <p className="text-sm text-indigo-800 mt-1">
                            ≈ {result.waterWeightKg.toLocaleString()} kg
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                        <span className="font-medium text-gray-800">{c.formulaUsed}:</span>{" "}
                        {result.formulaNote}
                      </p>
                      <p className="text-sm text-sky-800 italic">{c.exampleNote}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="rounded-xl border-l-4 border-sky-400 bg-sky-50/90 p-5 shadow-sm">
                <p className="font-semibold text-sky-950 flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5" />
                  {c.proTipsTitle}
                </p>
                <ul className="space-y-2 text-sm text-sky-950/90 list-disc pl-5">
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
            entityId="pool-volume-calculator"
            entityType="calculator"
            creatorSlug="aiden-asher"
            initialRatingTotal={0}
            initialRatingCount={0}
          />

          <CalculatorGuide data={guideData} layout="article" />

          <SimilarCalculators
            calculators={[
              {
                calculatorName: "Gallons per square foot calculator",
                calculatorHref: "/construction/gallons-per-square-foot-calculator",
                calculatorDescription: "Convert area and depth to volume in gallons for tanks and coatings.",
              },
              {
                calculatorName: "Volume calculator",
                calculatorHref: "/maths/volume-calculator",
                calculatorDescription: "Calculate volume for common geometric shapes.",
              },
              {
                calculatorName: "Cubic yard calculator",
                calculatorHref: "/construction/cubic-yard-calculator",
                calculatorDescription: "Estimate cubic yards of fill, concrete, or gravel.",
              },
            ]}
            color="blue"
            title="Related calculators"
          />
        </div>
      </main>
    </div>
  );
}
