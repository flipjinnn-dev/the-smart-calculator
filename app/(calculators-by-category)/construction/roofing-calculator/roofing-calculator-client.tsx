"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  Home,
  Info,
  Lightbulb,
  RotateCcw,
  Ruler,
  Triangle,
  Warehouse,
  Layers,
  HelpCircle,
} from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide, { type CalculatorGuideData } from "@/components/calculator-guide";
import { RatingProfileSection } from "@/components/rating-profile-section";

type RoofType = "gable" | "hip" | "flat" | "shed";
type MeasureUnit = "feet" | "meters";
type MaterialType = "asphalt" | "metal" | "clay" | "slate";

const SQFT_PER_SQM = 10.763910416709;
const SQFT_PER_SQUARE = 100;

const ROOF_TYPE_FACTOR: Record<RoofType, number> = {
  gable: 1,
  hip: 1.12,
  flat: 1,
  shed: 1.02,
};

const MATERIAL_DEFAULT_COST: Record<MaterialType, number> = {
  asphalt: 120,
  metal: 380,
  clay: 500,
  slate: 950,
};

interface RoofingResult {
  roofType: RoofType;
  unit: MeasureUnit;
  pitchRise: number;
  pitchMultiplier: number;
  baseArea: number;
  adjustedArea: number;
  squares: number;
  wastePercent: number;
  wasteIncludedArea: number;
  squaresWithWaste: number;
  materialCost: number;
  laborCost: number;
  totalCost: number;
  formulaNote: string;
}

function parsePositive(value: string): number | null {
  const n = Number.parseFloat(value);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

function parseNonNegative(value: string): number | null {
  const n = Number.parseFloat(value);
  if (!Number.isFinite(n) || n < 0) return null;
  return n;
}

function parsePitchRise(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const colon = trimmed.split(":");
  const rise = Number.parseFloat(colon[0]);
  if (!Number.isFinite(rise) || rise < 0 || rise > 24) return null;
  return rise;
}

function pitchMultiplier(rise: number): number {
  return Math.sqrt(1 + Math.pow(rise / 12, 2));
}

function toDisplayArea(areaInInputUnitSq: number, unit: MeasureUnit): {
  primary: number;
  primaryLabel: string;
  secondary?: string;
} {
  if (unit === "feet") {
    const sqft = areaInInputUnitSq;
    return {
      primary: Math.round(sqft),
      primaryLabel: "sq ft",
      secondary: `${(sqft / SQFT_PER_SQM).toFixed(1)} m²`,
    };
  }
  const sqm = areaInInputUnitSq;
  const sqft = sqm * SQFT_PER_SQM;
  return {
    primary: Math.round(sqm * 10) / 10,
    primaryLabel: "m²",
    secondary: `${Math.round(sqft).toLocaleString()} sq ft`,
  };
}

function areaToSquares(areaInInputUnitSq: number, unit: MeasureUnit): number {
  const sqft = unit === "feet" ? areaInInputUnitSq : areaInInputUnitSq * SQFT_PER_SQM;
  return sqft / SQFT_PER_SQUARE;
}

function computeRoofing(
  roofType: RoofType,
  unit: MeasureUnit,
  length: number,
  width: number,
  pitchRise: number,
  wastePercent: number,
  materialCostPerSquare: number,
  laborCost: number
): RoofingResult {
  const baseArea = length * width;
  const pMult = pitchMultiplier(pitchRise);
  const typeFactor = ROOF_TYPE_FACTOR[roofType];
  const adjustedArea = baseArea * pMult * typeFactor;
  const wasteFactor = 1 + wastePercent / 100;
  const wasteIncludedArea = adjustedArea * wasteFactor;
  const squares = areaToSquares(adjustedArea, unit);
  const squaresWithWaste = areaToSquares(wasteIncludedArea, unit);
  const materialCost = squaresWithWaste * materialCostPerSquare;
  const totalCost = materialCost + laborCost;

  const formulaNote =
    unit === "feet"
      ? `L×W×√(1+(rise/12)²)×${typeFactor} type factor; squares = adj. area÷100; cost = squares×$${materialCostPerSquare}+labor`
      : `L×W×√(1+(rise/12)²)×${typeFactor}; squares from m²→sq ft÷100`;

  return {
    roofType,
    unit,
    pitchRise,
    pitchMultiplier: Math.round(pMult * 1000) / 1000,
    baseArea: Math.round(baseArea * 10) / 10,
    adjustedArea: Math.round(adjustedArea * 10) / 10,
    squares: Math.round(squares * 100) / 100,
    wastePercent,
    wasteIncludedArea: Math.round(wasteIncludedArea * 10) / 10,
    squaresWithWaste: Math.round(squaresWithWaste * 100) / 100,
    materialCost: Math.round(materialCost),
    laborCost: Math.round(laborCost),
    totalCost: Math.round(totalCost),
    formulaNote,
  };
}

interface ContentShape {
  pageTitle?: string;
  pageDescription?: string;
  sectionRoofType?: string;
  roofGable?: string;
  roofHip?: string;
  roofFlat?: string;
  roofShed?: string;
  sectionDimensions?: string;
  labelUnit?: string;
  unitFeet?: string;
  unitMeters?: string;
  labelLength?: string;
  labelWidth?: string;
  labelPitch?: string;
  pitchHint?: string;
  pitchTooltipTitle?: string;
  pitchTooltipBody?: string;
  labelWaste?: string;
  labelMaterial?: string;
  materialAsphalt?: string;
  materialMetal?: string;
  materialClay?: string;
  materialSlate?: string;
  labelMaterialCost?: string;
  labelLabor?: string;
  suffixPerSquare?: string;
  importantTitle?: string;
  importantBody?: string;
  btnCalculate?: string;
  btnReset?: string;
  resultsTitle?: string;
  resultsSubtitle?: string;
  emptyTitle?: string;
  emptyHint?: string;
  metricBaseArea?: string;
  metricAdjustedArea?: string;
  metricSquares?: string;
  metricWasteArea?: string;
  metricMaterialCost?: string;
  metricLaborCost?: string;
  metricTotalCost?: string;
  formulaUsed?: string;
  livePreview?: string;
  proTipsTitle?: string;
  proTip1?: string;
  proTip2?: string;
  proTip3?: string;
  proTip4?: string;
  proTip5?: string;
  errLength?: string;
  errWidth?: string;
  errPitch?: string;
  errWaste?: string;
  errMaterialCost?: string;
}

const defaultContent: ContentShape = {
  pageTitle: "Roofing Calculator",
  pageDescription:
    "Estimate roof area, pitch, materials, and cost instantly. Enter length, width, and pitch to get roof squares, waste allowance, and a full replacement cost estimate.",
};

const roofIcons: Record<RoofType, typeof Home> = {
  gable: Home,
  hip: Layers,
  flat: Warehouse,
  shed: Triangle,
};

export default function RoofingCalculatorClient({
  content,
  guideContent,
}: {
  content: ContentShape | null;
  guideContent: CalculatorGuideData | null;
}) {
  const c = { ...defaultContent, ...content };
  const guideData: CalculatorGuideData = guideContent ?? {
    color: "orange",
    sections: [],
    faq: [],
  };

  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();

  const [roofType, setRoofType] = useState<RoofType>("gable");
  const [unit, setUnit] = useState<MeasureUnit>("feet");
  const [length, setLength] = useState("40");
  const [width, setWidth] = useState("30");
  const [pitchRise, setPitchRise] = useState("6");
  const [waste, setWaste] = useState("10");
  const [material, setMaterial] = useState<MaterialType>("asphalt");
  const [materialCost, setMaterialCost] = useState(String(MATERIAL_DEFAULT_COST.asphalt));
  const [laborCost, setLaborCost] = useState("");
  const [result, setResult] = useState<RoofingResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPitchTip, setShowPitchTip] = useState(false);

  const pitchMultiplierLive = useMemo(() => {
    const rise = parsePitchRise(pitchRise);
    return rise !== null ? pitchMultiplier(rise) : null;
  }, [pitchRise]);

  const parseInputs = useCallback(() => {
    const l = parsePositive(length);
    const w = parsePositive(width);
    const rise = parsePitchRise(pitchRise);
    const wasteN = parseNonNegative(waste);
    const matCost = parsePositive(materialCost);
    const labor = parseNonNegative(laborCost) ?? 0;
    const ok =
      l !== null &&
      w !== null &&
      rise !== null &&
      wasteN !== null &&
      wasteN <= 50 &&
      matCost !== null;
    return { ok, l, w, rise, wasteN, matCost, labor };
  }, [length, width, pitchRise, waste, materialCost, laborCost]);

  const validate = useCallback(() => {
    const nextErr: Record<string, string> = {};
    const l = parsePositive(length);
    const w = parsePositive(width);
    const rise = parsePitchRise(pitchRise);
    const wasteN = parseNonNegative(waste);
    const matCost = parsePositive(materialCost);

    if (l === null) nextErr.length = c.errLength ?? "Invalid length";
    if (w === null) nextErr.width = c.errWidth ?? "Invalid width";
    if (rise === null) nextErr.pitch = c.errPitch ?? "Invalid pitch";
    if (wasteN === null || wasteN > 50) nextErr.waste = c.errWaste ?? "Invalid waste";
    if (matCost === null) nextErr.materialCost = c.errMaterialCost ?? "Invalid material cost";

    setErrors(nextErr);
    return parseInputs();
  }, [length, width, pitchRise, waste, materialCost, laborCost, c, parseInputs]);

  const runCompute = useCallback(
    (scroll: boolean) => {
      const v = validate();
      if (!v.ok || v.l === null || v.w === null || v.rise === null || v.wasteN === null || v.matCost === null) {
        setResult(null);
        return;
      }
      setResult(
        computeRoofing(roofType, unit, v.l, v.w, v.rise, v.wasteN, v.matCost, v.labor)
      );
      if (scroll) scrollToRef(resultsRef);
    },
    [validate, roofType, unit, scrollToRef]
  );

  useEffect(() => {
    const v = parseInputs();
    if (
      v.ok &&
      v.l !== null &&
      v.w !== null &&
      v.rise !== null &&
      v.wasteN !== null &&
      v.matCost !== null
    ) {
      setResult(
        computeRoofing(roofType, unit, v.l, v.w, v.rise, v.wasteN, v.matCost, v.labor)
      );
    } else {
      setResult(null);
    }
  }, [roofType, unit, length, width, pitchRise, waste, materialCost, laborCost, parseInputs]);

  const handleMaterialChange = (m: MaterialType) => {
    setMaterial(m);
    setMaterialCost(String(MATERIAL_DEFAULT_COST[m]));
  };

  const reset = useCallback(() => {
    setRoofType("gable");
    setUnit("feet");
    setLength("40");
    setWidth("30");
    setPitchRise("6");
    setWaste("10");
    setMaterial("asphalt");
    setMaterialCost(String(MATERIAL_DEFAULT_COST.asphalt));
    setLaborCost("");
    setErrors({});
    setShowPitchTip(false);
  }, []);

  const unitLabel = unit === "feet" ? "ft" : "m";
  const sectionIcon = "text-orange-600 flex-shrink-0 mt-0.5";

  const formatMoney = (n: number) =>
    n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg">
                <Home className="w-8 h-8 text-white" />
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
              <Card className="shadow-lg border border-gray-200/80 bg-white transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100/80 py-5 px-6">
                  <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 text-gray-900">
                    <Calculator className="w-6 h-6 text-orange-600" />
                    Inputs
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600">
                    Results update automatically as you change values.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-8">
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-800">{c.sectionRoofType}</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(Object.keys(roofIcons) as RoofType[]).map((t) => {
                        const Icon = roofIcons[t];
                        const active = roofType === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setRoofType(t)}
                            className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 ${
                              active
                                ? "border-orange-500 bg-orange-50 text-orange-900 shadow-sm"
                                : "border-gray-200 hover:border-orange-300 text-gray-600"
                            }`}
                          >
                            <Icon className="w-6 h-6" />
                            <span className="text-xs font-medium text-center leading-tight">
                              {t === "gable"
                                ? c.roofGable
                                : t === "hip"
                                  ? c.roofHip
                                  : t === "flat"
                                    ? c.roofFlat
                                    : c.roofShed}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Ruler className={`w-5 h-5 ${sectionIcon}`} />
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs font-medium text-gray-600">
                            {c.labelLength} ({unitLabel})
                          </Label>
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
                        <div className="space-y-2">
                          <Label className="text-xs font-medium text-gray-600">
                            {c.labelWidth} ({unitLabel})
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
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm font-semibold text-gray-800">{c.labelPitch}</Label>
                      <button
                        type="button"
                        onClick={() => setShowPitchTip((s) => !s)}
                        className="text-orange-600 hover:text-orange-800"
                        aria-label={c.pitchTooltipTitle}
                      >
                        <HelpCircle className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 max-w-xs">
                      <Input
                        type="number"
                        min={0}
                        max={24}
                        step={0.5}
                        value={pitchRise}
                        onChange={(e) => setPitchRise(e.target.value)}
                        className="h-11 rounded-xl"
                        aria-invalid={!!errors.pitch}
                      />
                      <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
                        : 12
                      </span>
                    </div>
                    {pitchMultiplierLive !== null ? (
                      <p className="text-sm text-orange-800 bg-orange-50 rounded-lg px-3 py-2 border border-orange-100">
                        Pitch multiplier: <strong>{pitchMultiplierLive.toFixed(3)}</strong>
                      </p>
                    ) : null}
                    {showPitchTip ? (
                      <div className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <p className="font-semibold text-gray-900 mb-1">{c.pitchTooltipTitle}</p>
                        <p>{c.pitchTooltipBody}</p>
                      </div>
                    ) : null}
                    <p className="text-xs text-gray-500">{c.pitchHint}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-gray-600">{c.labelWaste}</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min={0}
                          max={50}
                          step={1}
                          value={waste}
                          onChange={(e) => setWaste(e.target.value)}
                          className="h-11 rounded-xl"
                          aria-invalid={!!errors.waste}
                        />
                        <span className="text-sm text-gray-600">%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-gray-600">{c.labelMaterial}</Label>
                      <Select
                        value={material}
                        onValueChange={(v) => handleMaterialChange(v as MaterialType)}
                      >
                        <SelectTrigger className="h-11 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asphalt">{c.materialAsphalt}</SelectItem>
                          <SelectItem value="metal">{c.materialMetal}</SelectItem>
                          <SelectItem value="clay">{c.materialClay}</SelectItem>
                          <SelectItem value="slate">{c.materialSlate}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-gray-600">
                        {c.labelMaterialCost} {c.suffixPerSquare}
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          type="number"
                          min={1}
                          step={1}
                          value={materialCost}
                          onChange={(e) => setMaterialCost(e.target.value)}
                          className="h-11 rounded-xl pl-7"
                          aria-invalid={!!errors.materialCost}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-gray-600">{c.labelLabor}</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          type="number"
                          min={0}
                          step={100}
                          value={laborCost}
                          onChange={(e) => setLaborCost(e.target.value)}
                          placeholder="0"
                          className="h-11 rounded-xl pl-7"
                        />
                      </div>
                    </div>
                  </div>

                  {(errors.length || errors.width || errors.pitch || errors.waste || errors.materialCost) && (
                    <p className="text-sm text-red-600">
                      {errors.length || errors.width || errors.pitch || errors.waste || errors.materialCost}
                    </p>
                  )}

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
                      onClick={() => runCompute(true)}
                      className="flex-1 h-12 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-md"
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
              <Card className="shadow-lg border border-gray-200/80 bg-white overflow-hidden transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-orange-50/50 border-b py-5 px-6">
                  <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 text-gray-900">
                    <BarChart3 className="w-6 h-6 text-orange-600" />
                    {c.resultsTitle}
                  </CardTitle>
                  <CardDescription className="text-base">{c.resultsSubtitle}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {!result ? (
                    <div className="rounded-xl border border-dashed border-gray-200 bg-slate-50/50 py-14 px-6 text-center">
                      <Home className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-lg font-semibold text-gray-800 mb-2">{c.emptyTitle}</p>
                      <p className="text-gray-600 max-w-md mx-auto">{c.emptyHint}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {(() => {
                        const base = toDisplayArea(result.baseArea, result.unit);
                        const adj = toDisplayArea(result.adjustedArea, result.unit);
                        const wasteA = toDisplayArea(result.wasteIncludedArea, result.unit);
                        return (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-4">
                              <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                                {c.metricBaseArea}
                              </p>
                              <p className="text-2xl font-bold text-gray-900 tabular-nums">
                                {base.primary.toLocaleString()} {base.primaryLabel}
                              </p>
                              {base.secondary ? (
                                <p className="text-sm text-gray-500 mt-1">≈ {base.secondary}</p>
                              ) : null}
                            </div>
                            <div className="rounded-xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-4 sm:col-span-2">
                              <p className="text-xs font-medium text-orange-900 uppercase tracking-wide">
                                {c.metricAdjustedArea}
                              </p>
                              <p className="text-3xl font-bold text-orange-950 tabular-nums">
                                {adj.primary.toLocaleString()} {adj.primaryLabel}
                              </p>
                              {adj.secondary ? (
                                <p className="text-sm text-orange-800 mt-1">≈ {adj.secondary}</p>
                              ) : null}
                              <p className="text-xs text-orange-700 mt-2">
                                Pitch ×{result.pitchMultiplier.toFixed(3)} ({result.pitchRise}:12)
                              </p>
                            </div>
                            <div className="rounded-xl border border-orange-100 bg-orange-50/40 p-4">
                              <p className="text-xs font-medium text-orange-800 uppercase tracking-wide">
                                {c.metricSquares}
                              </p>
                              <p className="text-2xl font-bold text-gray-900 tabular-nums">
                                {result.squares.toLocaleString()}
                              </p>
                              <p className="text-xs text-gray-600 mt-1">before waste</p>
                            </div>
                            <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-4">
                              <p className="text-xs font-medium text-amber-900 uppercase tracking-wide">
                                {c.metricWasteArea}
                              </p>
                              <p className="text-2xl font-bold text-gray-900 tabular-nums">
                                {wasteA.primary.toLocaleString()} {wasteA.primaryLabel}
                              </p>
                              <p className="text-xs text-amber-800 mt-1">
                                +{result.wastePercent}% waste → {result.squaresWithWaste} squares
                              </p>
                            </div>
                            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                              <p className="text-xs font-medium text-blue-800 uppercase tracking-wide">
                                {c.metricMaterialCost}
                              </p>
                              <p className="text-2xl font-bold text-gray-900 tabular-nums">
                                {formatMoney(result.materialCost)}
                              </p>
                            </div>
                            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                              <p className="text-xs font-medium text-slate-700 uppercase tracking-wide">
                                {c.metricLaborCost}
                              </p>
                              <p className="text-2xl font-bold text-gray-900 tabular-nums">
                                {formatMoney(result.laborCost)}
                              </p>
                            </div>
                            <div className="rounded-xl border-2 border-orange-300 bg-gradient-to-br from-orange-100 to-amber-100 p-4 sm:col-span-2">
                              <p className="text-xs font-medium text-orange-950 uppercase tracking-wide">
                                {c.metricTotalCost}
                              </p>
                              <p className="text-3xl font-bold text-orange-950 tabular-nums">
                                {formatMoney(result.totalCost)}
                              </p>
                            </div>
                          </div>
                        );
                      })()}
                      <p className="text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                        <span className="font-medium text-gray-800">{c.formulaUsed}:</span>{" "}
                        {result.formulaNote}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="rounded-xl border-l-4 border-orange-400 bg-orange-50/90 p-5 shadow-sm">
                <p className="font-semibold text-orange-950 flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5" />
                  {c.proTipsTitle}
                </p>
                <ul className="space-y-2 text-sm text-orange-950/90 list-disc pl-5">
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
            entityId="roofing-calculator"
            entityType="calculator"
            creatorSlug="aiden-asher"
            initialRatingTotal={0}
            initialRatingCount={0}
          />

          <CalculatorGuide data={guideData} layout="article" />

          <SimilarCalculators
            calculators={[
              {
                calculatorName: "Soffit Calculator",
                calculatorHref: "/construction/soffit-calculator",
                calculatorDescription:
                  "Calculate soffit area, vents, fascia, and replacement cost for roofing projects.",
              },
              {
                calculatorName: "Loft Conversion Cost Calculator",
                calculatorHref: "/construction/loft-conversion-cost-calculator",
                calculatorDescription: "Estimate loft conversion costs for UK home improvement projects.",
              },
              {
                calculatorName: "Gallons per Square Foot Calculator",
                calculatorHref: "/construction/gallons-per-square-foot-calculator",
                calculatorDescription: "Convert area and depth to volume in gallons for coatings and tanks.",
              },
            ]}
            color="orange"
            title="Related calculators"
          />
        </div>
      </main>
    </div>
  );
}
