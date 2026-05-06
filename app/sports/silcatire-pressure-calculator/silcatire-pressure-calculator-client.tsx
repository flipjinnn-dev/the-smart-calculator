"use client";

import { useMemo, useState, useRef, type MouseEvent } from "react";
import { Gauge, AlertTriangle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  "h-12 w-full rounded-xl border-gray-200 bg-white text-gray-900 shadow-sm focus:border-cyan-400 focus:ring-cyan-200";

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

  const scrollToGuide = (e: MouseEvent) => {
    e.preventDefault();
    document.getElementById("silca-guide")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-6xl">
          <header className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Gauge className="w-8 h-8 text-white" aria-hidden />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {content?.pageTitle || "SILCA Tire Pressure Calculator"}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{content?.pageDescription}</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 bg-white p-0 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-t-lg border-b border-cyan-100 px-6 sm:px-8 py-6">
                  <CardTitle className="flex items-center gap-3 text-2xl text-gray-900">
                    <Gauge className="w-6 h-6 text-cyan-600 shrink-0" aria-hidden />
                    <span>{f.cardHeading || "Tire pressure inputs"}</span>
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600">
                    Total system weight, surface, tire width, wheel size, casing type, riding speed, and front/rear weight split —
                    same inputs as a typical SILCA-style calculator. Results show PSI and bar.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 sm:p-8 space-y-8 sm:space-y-10">
                  {/* Total weight — same fields as SilPSI */}
                  <div className="max-w-lg mx-auto text-center space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{f.weightHeading || "Enter total system weight"}</p>
                      <p className="text-sm text-gray-500 italic mt-1">{f.weightSub || "(Rider + Bike + Gear)"}</p>
                    </div>
                    <Input
                      className="h-12 text-center text-lg rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-200 shadow-sm"
                      type="number"
                      inputMode="decimal"
                      placeholder={f.weightPlaceholder || "Enter weight"}
                      value={systemWeight}
                      onChange={(e) => setSystemWeight(e.target.value)}
                      aria-label="Total system weight"
                    />
                    <div className="flex justify-center max-w-[220px] mx-auto rounded-xl border border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50 p-1.5 shadow-sm gap-1">
                      <button
                        type="button"
                        onClick={() => setWeightUnit("lbs")}
                        className={cn(
                          "flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200",
                          weightUnit === "lbs"
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                            : "text-gray-700 hover:bg-white/80"
                        )}
                      >
                        lbs
                      </button>
                      <button
                        type="button"
                        onClick={() => setWeightUnit("kg")}
                        className={cn(
                          "flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200",
                          weightUnit === "kg"
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                            : "text-gray-700 hover:bg-white/80"
                        )}
                      >
                        kg
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 md:gap-y-10">
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
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  <button type="button" onClick={scrollToGuide} className="text-cyan-600 hover:text-cyan-700 underline font-medium">
                    {f.surfaceGuide || "Surface guide"}
                  </button>
                  <button type="button" onClick={scrollToGuide} className="text-cyan-600 hover:text-cyan-700 underline font-medium">
                    {f.learnMore || "Learn more"}
                  </button>
                </div>
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
                <button type="button" onClick={scrollToGuide} className="text-sm text-cyan-600 hover:text-cyan-700 underline font-medium">
                  {f.measuringGuide || "Measuring guide"}
                </button>
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
                <button type="button" onClick={scrollToGuide} className="text-sm text-cyan-600 hover:text-cyan-700 underline font-medium">
                  {f.tireTypeHelp || "How does this change my tire pressure?"}
                </button>
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

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
              <div className="flex gap-3 items-start">
                <Checkbox
                  id="silca-hookless"
                  checked={hookless}
                  onCheckedChange={(v) => setHookless(Boolean(v))}
                  className="mt-1"
                />
                <Label htmlFor="silca-hookless" className="text-sm text-gray-700 leading-relaxed cursor-pointer font-normal">
                  {f.hooklessLabel || "Hookless rim (cap at 73 PSI)"}
                </Label>
              </div>
            </div>

            <Button
              type="button"
              className="w-full h-12 text-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-md"
              onClick={() => scrollToResults()}
            >
              {f.calculate || "Calculate"}
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card
                ref={resultsRef}
                id="silca-tire-results"
                className="shadow-2xl border-0 bg-gradient-to-br from-cyan-50 to-blue-100 h-full min-h-[320px] flex flex-col scroll-mt-24"
              >
                <CardHeader className="w-full flex flex-col items-center justify-center pb-2 pt-8 px-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-3 shadow-lg">
                    <Gauge className="w-6 h-6 text-white" aria-hidden />
                  </div>
                  <CardTitle className="text-2xl font-bold text-cyan-800 tracking-tight text-center">
                    {f.resultsHeading || "Recommended pressure"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col px-6 pb-8 pt-2 w-full">
                  {result && "error" in result && result.error === "complete_fields" ? (
                    <div className="flex flex-col items-center justify-center text-center flex-1">
                      <Gauge className="w-8 h-8 text-cyan-300 mb-2" aria-hidden />
                      <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                        Enter total weight, tire width, and every option, then tap{" "}
                        <span className="font-semibold text-cyan-700">{f.calculate || "Calculate"}</span> for front & rear PSI and bar.
                      </p>
                    </div>
                  ) : result && "error" in result && result.error !== "complete_fields" ? (
                    <p className="text-red-600 font-medium text-center py-4">{result.error}</p>
                  ) : result && "front" in result ? (
                    <div className="space-y-5 w-full">
                      <div className="grid grid-cols-1 gap-3">
                        <div className="rounded-xl border border-white bg-white p-4 shadow-sm text-center">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Front</p>
                          <p className="text-3xl font-bold tabular-nums text-gray-900">{result.front.toFixed(1)} PSI</p>
                          <p className="text-base text-cyan-700 font-semibold tabular-nums mt-1">{result.frontBar.toFixed(2)} bar</p>
                        </div>
                        <div className="rounded-xl border border-white bg-white p-4 shadow-sm text-center">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Rear</p>
                          <p className="text-3xl font-bold tabular-nums text-gray-900">{result.rear.toFixed(1)} PSI</p>
                          <p className="text-base text-cyan-700 font-semibold tabular-nums mt-1">{result.rearBar.toFixed(2)} bar</p>
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

                      <div className="rounded-xl border border-cyan-100 bg-white p-4">
                        <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                          <Gauge className="h-4 w-4 text-cyan-600 shrink-0" aria-hidden />
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
                </CardContent>
              </Card>
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
              data={
                {
                  color: "teal",
                  sections: [],
                  faq: [],
                  ...guideData,
                } as CalculatorGuideData
              }
            />
          </div>
        </div>
    </div>
  );
}
