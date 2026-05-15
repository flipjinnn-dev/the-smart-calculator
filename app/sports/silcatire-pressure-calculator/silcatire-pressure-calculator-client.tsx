"use client";

import { useMemo, useState, useRef } from "react";
import { Gauge, AlertTriangle, ArrowRight, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CalculatorGuide, { type CalculatorGuideData } from "@/components/calculator-guide";
import { RatingProfileSection } from "@/components/rating-profile-section";
import { cn } from "@/lib/utils";

interface Props {
  content: any;
  guideContent: any;
}

type WeightUnit = "kg" | "lbs";

/** SilPSI-style surface keys */
type SilcaSurface =
  | "track_indoor_wood"
  | "track_outdoor_concrete"
  | "new_pavement"
  | "worn_pavement"
  | "cat1_gravel"
  | "poor_pavement"
  | "cat2_gravel"
  | "cobblestone"
  | "cat3_gravel"
  | "cat4_gravel";

type SilcaTire =
  | "hp_tubeless_latex"
  | "mid_tubeless_latex"
  | "mid_butyl"
  | "puncture_tubeless_latex";

type SilcaWheel = "700c_29" | "650c" | "650b_275" | "26";

type SilcaSpeed =
  | "recreational"
  | "fast_single_track"
  | "moderate_group"
  | "fast_group"
  | "cat_racing"
  | "pro_tour";

type SilcaDistribution = "tt_5050" | "road_4852" | "gravel_4753" | "mtb_4653";

type SilcaCalcResult =
  | { error: "complete_fields" }
  | { error: string }
  | {
      front: number;
      rear: number;
      frontBar: number;
      rearBar: number;
      totalKg: number;
      hooklessCapped: boolean;
      steps: string[];
    };

const surfaceCoef: Record<SilcaSurface, number> = {
  track_indoor_wood: 0.88,
  track_outdoor_concrete: 0.93,
  new_pavement: 1.0,
  worn_pavement: 1.12,
  cat1_gravel: 1.35,
  poor_pavement: 1.22,
  cat2_gravel: 1.55,
  cobblestone: 1.35,
  cat3_gravel: 1.85,
  cat4_gravel: 2.1,
};

const tireAdj: Record<SilcaTire, number> = {
  hp_tubeless_latex: -7,
  mid_tubeless_latex: -5,
  mid_butyl: 0,
  puncture_tubeless_latex: 4,
};

const wheelFactor: Record<SilcaWheel, number> = {
  "700c_29": 1.0,
  "650c": 1.03,
  "650b_275": 0.97,
  "26": 1.05,
};

const speedFactor: Record<SilcaSpeed, number> = {
  recreational: 0.96,
  fast_single_track: 1.02,
  moderate_group: 1.0,
  fast_group: 1.04,
  cat_racing: 1.04,
  pro_tour: 1.08,
};

const distributionPreset: Record<SilcaDistribution, { front: number; rear: number }> = {
  tt_5050: { front: 0.5, rear: 0.5 },
  road_4852: { front: 0.48, rear: 0.52 },
  gravel_4753: { front: 0.47, rear: 0.53 },
  mtb_4653: { front: 0.465, rear: 0.535 },
};

const TIRE_WIDTH_MM = Array.from({ length: 46 }, (_, i) => String(20 + i));

const PSI_TO_BAR = 0.0689475729;

const selectTriggerClass =
  "h-12 w-full rounded-xl border-2 border-gray-200 bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-200";

export default function SilcaTirePressureCalculatorClient({ content, guideContent }: Props) {
  const resultsRef = useRef<HTMLDivElement>(null);
  const f = content?.form || {};

  const [systemWeight, setSystemWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("lbs");
  const [tireWidthMm, setTireWidthMm] = useState<string>("");
  const [surface, setSurface] = useState<SilcaSurface | "">("");
  const [tireType, setTireType] = useState<SilcaTire | "">("");
  const [wheelSize, setWheelSize] = useState<SilcaWheel | "">("");
  const [speed, setSpeed] = useState<SilcaSpeed | "">("");
  const [distribution, setDistribution] = useState<SilcaDistribution | "">("");
  const [hookless, setHookless] = useState(false);

  const result = useMemo((): SilcaCalcResult => {
    const w = Number(systemWeight);
    const tw = Number(tireWidthMm);

    if (
      !systemWeight.trim() ||
      !tireWidthMm ||
      !surface ||
      !tireType ||
      !wheelSize ||
      !speed ||
      !distribution
    ) {
      return { error: "complete_fields" as const };
    }

    if (!Number.isFinite(w) || w <= 0 || !Number.isFinite(tw) || tw <= 0) {
      return { error: "Enter a valid total system weight and tire width." };
    }

    const totalKg = weightUnit === "kg" ? w : w * 0.45359237;
    const totalLbs = totalKg * 2.2046226218;
    const basePsi = totalLbs / (tw * 0.09);

    const dist = distributionPreset[distribution as SilcaDistribution];
    const frontBias = dist.front / 0.5;
    const rearBias = dist.rear / 0.5;

    let front =
      (basePsi * frontBias * speedFactor[speed as SilcaSpeed] * wheelFactor[wheelSize as SilcaWheel]) /
        surfaceCoef[surface as SilcaSurface] +
      tireAdj[tireType as SilcaTire];
    let rear =
      (basePsi * rearBias * speedFactor[speed as SilcaSpeed] * wheelFactor[wheelSize as SilcaWheel]) /
        surfaceCoef[surface as SilcaSurface] +
      tireAdj[tireType as SilcaTire];

    front = Math.max(12, Math.min(120, front));
    rear = Math.max(12, Math.min(120, rear));

    const hooklessCapped = hookless && (front > 73 || rear > 73);
    if (hooklessCapped) {
      front = Math.min(front, 73);
      rear = Math.min(rear, 73);
    }

    return {
      front,
      rear,
      frontBar: front * PSI_TO_BAR,
      rearBar: rear * PSI_TO_BAR,
      totalKg,
      hooklessCapped,
      steps: [
        `Total system weight ≈ ${totalKg.toFixed(2)} kg (${totalLbs.toFixed(1)} lb)`,
        `Base PSI = total lb ÷ (measured width mm × 0.09) ≈ ${basePsi.toFixed(2)}`,
        `Applied ${(dist.front * 100).toFixed(0)}/${(dist.rear * 100).toFixed(0)} distribution, surface, tire casing, wheel diameter & speed`,
        `Front / rear rounded; hookless cap at 73 PSI if enabled`,
      ],
    };
  }, [systemWeight, tireWidthMm, weightUnit, surface, tireType, wheelSize, speed, distribution, hookless]);

  const scrollToResults = () => {
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const guideData =
    (typeof guideContent === "object" && guideContent !== null ? guideContent : {}) as Partial<CalculatorGuideData>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
            {content?.pageTitle || "SILCA Tire Pressure Calculator"}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">{content?.pageDescription}</p>
        </div>

        <div className="mb-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {/* Left: inputs (ERA-style white card) */}
            <div className="rounded-2xl border-2 border-gray-200/90 bg-white p-6 sm:p-8 shadow-lg shadow-gray-200/40">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2.5 mb-1">
                <Activity className="w-6 h-6 text-blue-600 shrink-0" aria-hidden />
                {f.cardHeading || "Tire pressure inputs"}
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Enter your setup below for front and rear PSI and bar. Always stay within rim and tire pressure limits.
              </p>

              <div className="space-y-5 mb-6">
                <div>
                  <Label className="text-sm font-medium text-gray-800">
                    {f.weightHeading || "Enter total system weight"}{" "}
                    <span className="text-gray-500 font-normal italic">{f.weightSub || "(Rider + Bike + Gear)"}</span>
                  </Label>
                  <div className="mt-2 flex flex-col sm:flex-row gap-3 sm:items-center">
                    <div className="relative flex-1">
                      <Gauge
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                        aria-hidden
                      />
                      <Input
                        className="h-12 pl-10 text-base rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                        type="number"
                        inputMode="decimal"
                        placeholder={f.weightPlaceholder || "Enter weight"}
                        value={systemWeight}
                        onChange={(e) => setSystemWeight(e.target.value)}
                        aria-label="Total system weight"
                      />
                    </div>
                    <div className="flex rounded-xl border-2 border-gray-200 bg-gray-50/80 p-1 gap-1 shrink-0 sm:w-[200px]">
                      <button
                        type="button"
                        onClick={() => setWeightUnit("lbs")}
                        className={cn(
                          "flex-1 py-2.5 text-sm font-semibold rounded-lg",
                          weightUnit === "lbs" ? "bg-blue-600 text-white shadow-sm" : "text-gray-700 hover:bg-white"
                        )}
                      >
                        lbs
                      </button>
                      <button
                        type="button"
                        onClick={() => setWeightUnit("kg")}
                        className={cn(
                          "flex-1 py-2.5 text-sm font-semibold rounded-lg",
                          weightUnit === "kg" ? "bg-blue-600 text-white shadow-sm" : "text-gray-700 hover:bg-white"
                        )}
                      >
                        kg
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-5 md:gap-y-6">
              {/* Surface */}
              <div className="space-y-2.5">
                <Label className="text-sm font-medium text-gray-700 block">
                  {f.surfaceLabel || "Surface condition"}
                </Label>
                <Select
                  value={surface || undefined}
                  onValueChange={(v) => setSurface(v as SilcaSurface)}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder={f.placeholders?.surface || "— Select surface condition —"} />
                  </SelectTrigger>
                  <SelectContent className="max-h-72">
                    <SelectItem value="track_indoor_wood">Track (Indoor Wood)</SelectItem>
                    <SelectItem value="track_outdoor_concrete">Track (Outdoor Concrete)</SelectItem>
                    <SelectItem value="new_pavement">New Pavement</SelectItem>
                    <SelectItem value="worn_pavement">Worn Pavement / Some Cracks</SelectItem>
                    <SelectItem value="cat1_gravel">Category 1 Gravel</SelectItem>
                    <SelectItem value="poor_pavement">Poor Pavement / Chipseal</SelectItem>
                    <SelectItem value="cat2_gravel">Category 2 Gravel</SelectItem>
                    <SelectItem value="cobblestone">Cobblestone</SelectItem>
                    <SelectItem value="cat3_gravel">Category 3 Gravel</SelectItem>
                    <SelectItem value="cat4_gravel">Category 4 Gravel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tire width */}
              <div className="space-y-2.5">
                <Label className="text-sm font-medium text-gray-700 block">
                  {f.widthLabel || "Measured tire width"}
                </Label>
                <Select value={tireWidthMm || undefined} onValueChange={setTireWidthMm}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder={f.placeholders?.width || "— Select measured tire width —"} />
                  </SelectTrigger>
                  <SelectContent className="max-h-72">
                    {TIRE_WIDTH_MM.map((mm) => (
                      <SelectItem key={mm} value={mm}>
                        {mm} mm
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Wheel */}
              <div className="space-y-2.5">
                <Label className="text-sm font-medium text-gray-700 block">
                  {f.wheelLabel || "Wheel diameter"}
                </Label>
                <Select value={wheelSize || undefined} onValueChange={(v) => setWheelSize(v as SilcaWheel)}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder={f.placeholders?.wheel || "— Select wheel diameter —"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="700c_29">700C / 29&quot;</SelectItem>
                    <SelectItem value="650c">650C</SelectItem>
                    <SelectItem value="650b_275">650B / 27.5&quot;</SelectItem>
                    <SelectItem value="26">26&quot;</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tire type */}
              <div className="space-y-2.5">
                <Label className="text-sm font-medium text-gray-700 block">
                  {f.tireTypeLabel || "Tire type"}
                </Label>
                <Select value={tireType || undefined} onValueChange={(v) => setTireType(v as SilcaTire)}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder={f.placeholders?.tireType || "— Select tire type —"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hp_tubeless_latex">High performance tire tubeless / latex tube</SelectItem>
                    <SelectItem value="mid_tubeless_latex">Mid range casing tubeless / latex tube</SelectItem>
                    <SelectItem value="mid_butyl">Mid-range casing butyl tube</SelectItem>
                    <SelectItem value="puncture_tubeless_latex">Puncture resistant tire tubeless / latex tube</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Speed */}
              <div className="space-y-2.5">
                <Label className="text-sm font-medium text-gray-700 block">
                  {f.speedLabel || "Average speed"}
                </Label>
                <Select value={speed || undefined} onValueChange={(v) => setSpeed(v as SilcaSpeed)}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder={f.placeholders?.speed || "— Select average speed —"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recreational">Recreational</SelectItem>
                    <SelectItem value="fast_single_track">Fast Single Track</SelectItem>
                    <SelectItem value="moderate_group">Moderate Group Ride</SelectItem>
                    <SelectItem value="fast_group">Fast Group Ride</SelectItem>
                    <SelectItem value="cat_racing">Cat. 1 / Cat. 2 / Cat. 3 Racing</SelectItem>
                    <SelectItem value="pro_tour">Pro Tour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Distribution */}
              <div className="space-y-2.5">
                <Label className="text-sm font-medium text-gray-700 block">
                  {f.distributionLabel || "Weight distribution"}
                </Label>
                <Select
                  value={distribution || undefined}
                  onValueChange={(v) => setDistribution(v as SilcaDistribution)}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder={f.placeholders?.distribution || "— Select weight distribution —"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tt_5050">50/50 (Triathlon / TT / Track Bikes)</SelectItem>
                    <SelectItem value="road_4852">48/52 (Road Bikes)</SelectItem>
                    <SelectItem value="gravel_4753">47/53 (Gravel Bikes)</SelectItem>
                    <SelectItem value="mtb_4653">46.5/53.5 (Mountain Bikes)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

              <div className="flex gap-3 items-start pt-1">
                <Checkbox
                  id="silca-hookless"
                  checked={hookless}
                  onCheckedChange={(v) => setHookless(Boolean(v))}
                  className="mt-1 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label htmlFor="silca-hookless" className="text-sm text-gray-700 leading-relaxed cursor-pointer font-normal">
                  {f.hooklessLabel || "Hookless rim (cap at 73 PSI)"}
                </Label>
              </div>

              <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/90 px-4 py-3.5 text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold text-gray-800">Core idea: </span>
                Base PSI ≈ total weight (lb) ÷ (tire width mm × 0.09), then adjusted for surface, casing, wheel size, speed, and
                front/rear split.
              </div>

              <Button
                type="button"
                className="w-full mt-6 h-14 text-base font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 flex items-center justify-center gap-2"
                onClick={() => scrollToResults()}
              >
                {f.calculate || "Calculate"}
                <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
              </Button>
            </div>

            {/* Right: results (light blue card) */}
            <div
              ref={resultsRef}
              id="silca-tire-results"
              className="rounded-2xl border-2 border-blue-100 bg-gradient-to-b from-sky-50/90 to-blue-50/60 shadow-lg shadow-blue-100/50 min-h-[380px] flex flex-col scroll-mt-24 overflow-hidden"
            >
              <div className="w-full flex flex-col items-center pb-3 pt-8 px-6">
                <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center mb-4 shadow-md shadow-blue-600/25">
                  <Gauge className="w-7 h-7 text-white" aria-hidden />
                </div>
                <p className="text-xl sm:text-2xl font-bold text-blue-800 tracking-tight text-center">
                  {f.resultsHeading || "Recommended pressure"}
                </p>
              </div>
              <div className="flex-1 flex flex-col px-6 pb-8 pt-2 w-full">
                {result && "error" in result && result.error === "complete_fields" ? (
                  <div className="flex flex-col items-center justify-center text-center flex-1 min-h-[200px]">
                    <Gauge className="w-12 h-12 text-blue-200 mb-4 stroke-[1.25]" aria-hidden />
                    <p className="text-gray-600 text-sm leading-relaxed max-w-[260px]">
                      Enter total weight, tire width, and every option, then click{" "}
                      <span className="font-semibold text-blue-600">{f.calculate || "Calculate"}</span> for front & rear PSI and bar.
                    </p>
                  </div>
                ) : result && "error" in result && result.error !== "complete_fields" ? (
                  <p className="text-red-600 font-medium text-center py-4">{result.error}</p>
                ) : result && "front" in result ? (
                  <div className="space-y-5 w-full">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="rounded-xl border-2 border-blue-100 bg-white/95 p-4 shadow-sm text-center">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Front</p>
                        <p className="text-3xl font-bold tabular-nums text-slate-900">{result.front.toFixed(1)} PSI</p>
                        <p className="text-base text-blue-700 font-semibold tabular-nums mt-1">{result.frontBar.toFixed(2)} bar</p>
                      </div>
                      <div className="rounded-xl border-2 border-blue-100 bg-white/95 p-4 shadow-sm text-center">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Rear</p>
                        <p className="text-3xl font-bold tabular-nums text-slate-900">{result.rear.toFixed(1)} PSI</p>
                        <p className="text-base text-blue-700 font-semibold tabular-nums mt-1">{result.rearBar.toFixed(2)} bar</p>
                      </div>
                    </div>

                    {result.hooklessCapped && (
                      <div
                        className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900 text-sm"
                        role="status"
                      >
                        <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" aria-hidden />
                        <span>Hookless safety cap: values limited to max 73 PSI (5 bar).</span>
                      </div>
                    )}

                    <div className="rounded-xl border-2 border-blue-100 bg-white/95 p-4 shadow-sm">
                      <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                        <Gauge className="h-4 w-4 text-blue-600 shrink-0" aria-hidden />
                        Step-by-step
                      </p>
                      <ol className="list-decimal pl-5 space-y-1.5 text-xs text-gray-700 leading-relaxed">
                        {result.steps.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <RatingProfileSection
            entityId="silcatire-pressure-calculator"
            entityType="calculator"
            creatorSlug="felix-yacoub"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
        </div>

        <div id="silca-guide" className="mt-12 scroll-mt-20">
          <CalculatorGuide
            layout="article"
            data={
              {
                sections: [],
                faq: [],
                ...guideData,
                color: "purple",
              } as CalculatorGuideData
            }
          />
        </div>
      </div>
    </div>
  );
}
