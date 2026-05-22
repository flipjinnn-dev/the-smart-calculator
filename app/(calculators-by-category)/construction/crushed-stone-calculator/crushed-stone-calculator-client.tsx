"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  Car,
  Circle,
  Droplets,
  Footprints,
  Home,
  Info,
  Lightbulb,
  Mountain,
  RotateCcw,
  Ruler,
  Shapes,
  Square,
  Triangle,
  Warehouse,
} from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide, { type CalculatorGuideData } from "@/components/calculator-guide";
import { RatingProfileSection } from "@/components/rating-profile-section";

type ProjectType = "driveway" | "patio" | "walkway" | "drainage" | "shed" | "custom";
type AreaShape = "rectangle" | "circle" | "triangle";
type MeasureUnit = "feet" | "inches" | "meters";
type MaterialType = "crushed_stone" | "gravel" | "limestone" | "granite" | "river_rock";

const CF_PER_CY = 27;
const FT_PER_M = 3.280839895;
const CF_PER_CUM = 35.3146667215;

const MATERIAL_DENSITY: Record<MaterialType, number> = {
  crushed_stone: 1.5,
  gravel: 1.4,
  limestone: 1.5,
  granite: 1.6,
  river_rock: 1.35,
};

interface StoneResult {
  projectType: ProjectType;
  shape: AreaShape;
  unit: MeasureUnit;
  cubicFeet: number;
  cubicYards: number;
  tons: number;
  density: number;
  coverageArea: number;
  coverageLabel: string;
  formulaNote: string;
}

function parsePositive(value: string): number | null {
  const n = Number.parseFloat(value);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

function toFeet(value: number, unit: MeasureUnit): number {
  if (unit === "feet") return value;
  if (unit === "inches") return value / 12;
  return value * FT_PER_M;
}

function computeVolume(
  shape: AreaShape,
  unit: MeasureUnit,
  length: number,
  width: number,
  depth: number
): { cubicFeet: number; coverageArea: number; coverageLabel: string; formulaNote: string } {
  const dFt = toFeet(depth, unit);

  if (unit === "meters") {
    const depthM = depth;
    let volumeM3 = 0;
    let coverageM2 = 0;
    if (shape === "rectangle") {
      volumeM3 = length * width * depthM;
      coverageM2 = length * width;
    } else if (shape === "circle") {
      const r = length / 2;
      volumeM3 = Math.PI * r * r * depthM;
      coverageM2 = Math.PI * r * r;
    } else {
      volumeM3 = 0.5 * length * width * depthM;
      coverageM2 = 0.5 * length * width;
    }
    const cf = volumeM3 * CF_PER_CUM;
    return {
      cubicFeet: cf,
      coverageArea: coverageM2,
      coverageLabel: "m²",
      formulaNote:
        shape === "rectangle"
          ? "L × W × D (m³) → ft³"
          : shape === "circle"
            ? "π × r² × D (m³) → ft³"
            : "½ × B × H × D (m³) → ft³",
    };
  }

  const lFt = toFeet(length, unit);
  const wFt = toFeet(width, unit);

  if (shape === "rectangle") {
    const cf = lFt * wFt * dFt;
    return {
      cubicFeet: cf,
      coverageArea: lFt * wFt,
      coverageLabel: "sq ft",
      formulaNote: "Length × Width × Depth",
    };
  }
  if (shape === "circle") {
    const r = lFt / 2;
    const cf = Math.PI * r * r * dFt;
    return {
      cubicFeet: cf,
      coverageArea: Math.PI * r * r,
      coverageLabel: "sq ft",
      formulaNote: "π × (Diameter/2)² × Depth",
    };
  }
  const cf = 0.5 * lFt * wFt * dFt;
  return {
    cubicFeet: cf,
    coverageArea: 0.5 * lFt * wFt,
    coverageLabel: "sq ft",
    formulaNote: "½ × Base × Height × Depth",
  };
}

function computeStone(
  projectType: ProjectType,
  shape: AreaShape,
  unit: MeasureUnit,
  dim1: number,
  dim2: number,
  depth: number,
  density: number
): StoneResult {
  const { cubicFeet, coverageArea, coverageLabel, formulaNote } = computeVolume(
    shape,
    unit,
    dim1,
    dim2,
    depth
  );
  const cubicYards = cubicFeet / CF_PER_CY;
  const tons = cubicYards * density;

  return {
    projectType,
    shape,
    unit,
    cubicFeet: Math.round(cubicFeet * 100) / 100,
    cubicYards: Math.round(cubicYards * 100) / 100,
    tons: Math.round(tons * 100) / 100,
    density,
    coverageArea: Math.round(coverageArea * 100) / 100,
    coverageLabel,
    formulaNote: `${formulaNote}; yd³ = ft³ ÷ 27; tons = yd³ × ${density}`,
  };
}

interface ContentShape {
  pageTitle?: string;
  pageDescription?: string;
  sectionProject?: string;
  projectDriveway?: string;
  projectPatio?: string;
  projectWalkway?: string;
  projectDrainage?: string;
  projectShed?: string;
  projectCustom?: string;
  sectionShape?: string;
  shapeRect?: string;
  shapeCircle?: string;
  shapeTriangle?: string;
  sectionDimensions?: string;
  labelUnit?: string;
  unitFeet?: string;
  unitInches?: string;
  unitMeters?: string;
  labelLength?: string;
  labelWidth?: string;
  labelDiameter?: string;
  labelBase?: string;
  labelHeight?: string;
  labelDepth?: string;
  labelMaterial?: string;
  materialCrushed?: string;
  materialGravel?: string;
  materialLimestone?: string;
  materialGranite?: string;
  materialRiver?: string;
  labelDensity?: string;
  densityHint?: string;
  importantTitle?: string;
  importantBody?: string;
  btnCalculate?: string;
  btnReset?: string;
  resultsTitle?: string;
  resultsSubtitle?: string;
  emptyTitle?: string;
  emptyHint?: string;
  metricCubicFeet?: string;
  metricCubicYards?: string;
  metricTons?: string;
  metricDensity?: string;
  metricCoverage?: string;
  formulaUsed?: string;
  proTipsTitle?: string;
  proTip1?: string;
  proTip2?: string;
  proTip3?: string;
  proTip4?: string;
  proTip5?: string;
  errDimension?: string;
  errDepth?: string;
  errDensity?: string;
}

const defaultContent: ContentShape = {
  pageTitle: "Crushed Stone Calculator",
  pageDescription:
    "A 10 ft × 10 ft area at 3 inches deep needs about 0.93 cubic yards or 1.4 US tons with 10% waste. Enter your dimensions below for instant cubic yards and tons.",
};

const projectIcons: Record<ProjectType, typeof Car> = {
  driveway: Car,
  patio: Home,
  walkway: Footprints,
  drainage: Droplets,
  shed: Warehouse,
  custom: Shapes,
};

const shapeIcons: Record<AreaShape, typeof Square> = {
  rectangle: Square,
  circle: Circle,
  triangle: Triangle,
};

export default function CrushedStoneCalculatorClient({
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

  const [projectType, setProjectType] = useState<ProjectType>("driveway");
  const [shape, setShape] = useState<AreaShape>("rectangle");
  const [unit, setUnit] = useState<MeasureUnit>("feet");
  const [length, setLength] = useState("20");
  const [width, setWidth] = useState("10");
  const [depth, setDepth] = useState("0.5");
  const [material, setMaterial] = useState<MaterialType>("crushed_stone");
  const [density, setDensity] = useState(String(MATERIAL_DENSITY.crushed_stone));
  const [result, setResult] = useState<StoneResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const parseInputs = useCallback(() => {
    const d = parsePositive(depth);
    const dens = parsePositive(density);
    const densOk = dens !== null && dens >= 0.5 && dens <= 3;
    let dim1: number | null = null;
    let dim2: number | null = null;

    if (shape === "rectangle") {
      dim1 = parsePositive(length);
      dim2 = parsePositive(width);
    } else if (shape === "circle") {
      dim1 = parsePositive(length);
      dim2 = dim1;
    } else {
      dim1 = parsePositive(length);
      dim2 = parsePositive(width);
    }

    const ok = dim1 !== null && dim2 !== null && d !== null && densOk;
    return { ok, dim1, dim2, depth: d, density: dens!, densOk };
  }, [shape, length, width, depth, density]);

  const runCompute = useCallback(
    (scroll: boolean) => {
      const nextErr: Record<string, string> = {};
      const v = parseInputs();
      if (!v.ok) {
        if (!v.dim1 || !v.dim2) nextErr.dimension = c.errDimension ?? "Invalid dimensions";
        if (!v.depth) nextErr.depth = c.errDepth ?? "Invalid depth";
        if (!v.densOk) nextErr.density = c.errDensity ?? "Invalid density";
        setErrors(nextErr);
        setResult(null);
        return;
      }
      setErrors({});
      setResult(
        computeStone(
          projectType,
          shape,
          unit,
          v.dim1!,
          v.dim2!,
          v.depth!,
          v.density
        )
      );
      if (scroll) scrollToRef(resultsRef);
    },
    [parseInputs, projectType, shape, unit, scrollToRef, c]
  );

  useEffect(() => {
    const v = parseInputs();
    if (v.ok && v.dim1 !== null && v.dim2 !== null && v.depth !== null) {
      setResult(
        computeStone(projectType, shape, unit, v.dim1, v.dim2, v.depth, v.density)
      );
    } else {
      setResult(null);
    }
  }, [projectType, shape, unit, length, width, depth, density, parseInputs]);

  const handleMaterialChange = (m: MaterialType) => {
    setMaterial(m);
    setDensity(String(MATERIAL_DENSITY[m]));
  };

  const reset = useCallback(() => {
    setProjectType("driveway");
    setShape("rectangle");
    setUnit("feet");
    setLength("20");
    setWidth("10");
    setDepth("0.5");
    setMaterial("crushed_stone");
    setDensity(String(MATERIAL_DENSITY.crushed_stone));
    setErrors({});
  }, []);

  const unitLen = unit === "meters" ? "m" : unit === "inches" ? "in" : "ft";
  const sectionIcon = "text-stone-600 flex-shrink-0 mt-0.5";

  const dimensionFields = (
    <div className="space-y-4 transition-all duration-300" key={shape}>
      {shape === "rectangle" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-600">
              {c.labelLength} ({unitLen})
            </Label>
            <Input
              type="number"
              min={0.1}
              step={0.1}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="h-11 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-600">
              {c.labelWidth} ({unitLen})
            </Label>
            <Input
              type="number"
              min={0.1}
              step={0.1}
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="h-11 rounded-xl"
            />
          </div>
        </div>
      )}
      {shape === "circle" && (
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-600">
            {c.labelDiameter} ({unitLen})
          </Label>
          <Input
            type="number"
            min={0.1}
            step={0.1}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="h-11 rounded-xl"
          />
        </div>
      )}
      {shape === "triangle" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-600">
              {c.labelBase} ({unitLen})
            </Label>
            <Input
              type="number"
              min={0.1}
              step={0.1}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="h-11 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-600">
              {c.labelHeight} ({unitLen})
            </Label>
            <Input
              type="number"
              min={0.1}
              step={0.1}
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="h-11 rounded-xl"
            />
          </div>
        </div>
      )}
      <div className="space-y-2">
        <Label className="text-xs font-medium text-gray-600">
          {c.labelDepth} ({unitLen})
        </Label>
        <Input
          type="number"
          min={0.1}
          step={0.1}
          value={depth}
          onChange={(e) => setDepth(e.target.value)}
          className="h-11 rounded-xl"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-stone-600 to-amber-700 flex items-center justify-center shadow-lg">
                <Mountain className="w-8 h-8 text-white" />
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
                <CardHeader className="bg-gradient-to-r from-stone-50 to-amber-50 border-b border-stone-100/80 py-5 px-6">
                  <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 text-gray-900">
                    <Calculator className="w-6 h-6 text-stone-700" />
                    Inputs
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600">
                    Results update as you type. Depth is the thickness of stone to install.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-8">
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-800">{c.sectionProject}</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {(Object.keys(projectIcons) as ProjectType[]).map((p) => {
                        const Icon = projectIcons[p];
                        const active = projectType === p;
                        const labels: Record<ProjectType, string | undefined> = {
                          driveway: c.projectDriveway,
                          patio: c.projectPatio,
                          walkway: c.projectWalkway,
                          drainage: c.projectDrainage,
                          shed: c.projectShed,
                          custom: c.projectCustom,
                        };
                        return (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setProjectType(p)}
                            className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all duration-200 ${
                              active
                                ? "border-amber-600 bg-amber-50 text-amber-950 shadow-sm"
                                : "border-gray-200 hover:border-stone-400 text-gray-600"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="text-[11px] font-medium text-center leading-tight">
                              {labels[p]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-800">{c.sectionShape}</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {(Object.keys(shapeIcons) as AreaShape[]).map((s) => {
                        const Icon = shapeIcons[s];
                        const active = shape === s;
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setShape(s)}
                            className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 ${
                              active
                                ? "border-stone-600 bg-stone-50 text-stone-900 shadow-sm"
                                : "border-gray-200 hover:border-stone-400 text-gray-600"
                            }`}
                          >
                            <Icon className="w-6 h-6" />
                            <span className="text-xs font-medium">
                              {s === "rectangle"
                                ? c.shapeRect
                                : s === "circle"
                                  ? c.shapeCircle
                                  : c.shapeTriangle}
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
                      <div className="space-y-2 max-w-[220px]">
                        <Label className="text-xs font-medium text-gray-600">{c.labelUnit}</Label>
                        <Select value={unit} onValueChange={(v) => setUnit(v as MeasureUnit)}>
                          <SelectTrigger className="h-11 rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="feet">{c.unitFeet}</SelectItem>
                            <SelectItem value="inches">{c.unitInches}</SelectItem>
                            <SelectItem value="meters">{c.unitMeters}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {dimensionFields}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          <SelectItem value="crushed_stone">{c.materialCrushed}</SelectItem>
                          <SelectItem value="gravel">{c.materialGravel}</SelectItem>
                          <SelectItem value="limestone">{c.materialLimestone}</SelectItem>
                          <SelectItem value="granite">{c.materialGranite}</SelectItem>
                          <SelectItem value="river_rock">{c.materialRiver}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-gray-600">{c.labelDensity}</Label>
                      <Input
                        type="number"
                        min={0.5}
                        max={3}
                        step={0.05}
                        value={density}
                        onChange={(e) => setDensity(e.target.value)}
                        className="h-11 rounded-xl"
                      />
                      <p className="text-xs text-gray-500">{c.densityHint}</p>
                    </div>
                  </div>

                  {(errors.dimension || errors.depth || errors.density) && (
                    <p className="text-sm text-red-600">
                      {errors.dimension || errors.depth || errors.density}
                    </p>
                  )}

                  <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50/90 p-4 flex gap-3">
                    <Info className="w-5 h-5 text-amber-800 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-950 text-sm mb-1">{c.importantTitle}</p>
                      <p className="text-sm text-amber-950/90 leading-relaxed">{c.importantBody}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      onClick={() => runCompute(true)}
                      className="flex-1 h-12 rounded-xl bg-stone-700 hover:bg-stone-800 text-white font-semibold shadow-md"
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
                <CardHeader className="bg-gradient-to-r from-slate-50 to-stone-50 border-b py-5 px-6">
                  <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 text-gray-900">
                    <BarChart3 className="w-6 h-6 text-stone-700" />
                    {c.resultsTitle}
                  </CardTitle>
                  <CardDescription className="text-base">{c.resultsSubtitle}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {!result ? (
                    <div className="rounded-xl border border-dashed border-gray-200 bg-slate-50/50 py-14 px-6 text-center">
                      <Mountain className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-lg font-semibold text-gray-800 mb-2">{c.emptyTitle}</p>
                      <p className="text-gray-600 max-w-md mx-auto">{c.emptyHint}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-4">
                          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                            {c.metricCubicFeet}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {result.cubicFeet.toLocaleString()} ft³
                          </p>
                        </div>
                        <div className="rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-stone-50 p-4 sm:col-span-2">
                          <p className="text-xs font-medium text-amber-900 uppercase tracking-wide">
                            {c.metricCubicYards}
                          </p>
                          <p className="text-3xl font-bold text-amber-950 tabular-nums">
                            {result.cubicYards.toLocaleString()} yd³
                          </p>
                        </div>
                        <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-4">
                          <p className="text-xs font-medium text-stone-800 uppercase tracking-wide">
                            {c.metricTons}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {result.tons.toLocaleString()} tons
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                          <p className="text-xs font-medium text-slate-700 uppercase tracking-wide">
                            {c.metricDensity}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {result.density} tons/yd³
                          </p>
                        </div>
                        <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 sm:col-span-2">
                          <p className="text-xs font-medium text-blue-800 uppercase tracking-wide">
                            {c.metricCoverage}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {result.coverageArea.toLocaleString()} {result.coverageLabel}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                        <span className="font-medium text-gray-800">{c.formulaUsed}:</span>{" "}
                        {result.formulaNote}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="rounded-xl border-l-4 border-stone-500 bg-stone-50/90 p-5 shadow-sm">
                <p className="font-semibold text-stone-950 flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5" />
                  {c.proTipsTitle}
                </p>
                <ul className="space-y-2 text-sm text-stone-950/90 list-disc pl-5">
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
            entityId="crushed-stone-calculator"
            entityType="calculator"
            creatorSlug="aiden-asher"
            initialRatingTotal={0}
            initialRatingCount={0}
          />

          <CalculatorGuide data={guideData} layout="article" />

          <SimilarCalculators
            calculators={[
              {
                calculatorName: "Cubic Yard Calculator",
                calculatorHref: "/construction/cubic-yard-calculator",
                calculatorDescription: "Convert dimensions to cubic yards for fill, gravel, and concrete.",
              },
              {
                calculatorName: "Rip Rap Calculator",
                calculatorHref: "/construction/rip-rap-calculator",
                calculatorDescription: "Calculate rip rap tons, cubic yards, and coverage for erosion control.",
              },
              {
                calculatorName: "Paver Base Calculator",
                calculatorHref: "/construction/paver-base-calculator",
                calculatorDescription: "Estimate paver base gravel volume and weight for patio projects.",
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
