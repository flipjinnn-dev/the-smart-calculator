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
  Droplets,
  Home,
  Info,
  Lightbulb,
  Mountain,
  RotateCcw,
  Users,
  Waves,
} from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide, {
  type CalculatorGuideData,
} from "@/components/calculator-guide";
import { RatingProfileSection } from "@/components/rating-profile-section";

type HouseholdKey = "" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type SoilKey = "" | "fast" | "moderate" | "slow" | "very_slow";
type UsageKey = "low" | "normal" | "high" | "very_high";
type WasherKey = "low" | "med" | "high";

const HOUSEHOLD: Record<
  Exclude<HouseholdKey, "">,
  { occupants: number; codeMinGal: number }
> = {
  h1: { occupants: 2, codeMinGal: 750 },
  h2: { occupants: 4, codeMinGal: 1000 },
  h3: { occupants: 6, codeMinGal: 1250 },
  h4: { occupants: 8, codeMinGal: 1500 },
  h5: { occupants: 10, codeMinGal: 1500 },
  h6: { occupants: 12, codeMinGal: 2000 },
};

const USAGE_GPP: Record<UsageKey, number> = {
  low: 45,
  normal: 70,
  high: 105,
  very_high: 135,
};

const SOIL: Record<
  Exclude<SoilKey, "">,
  { retentionDays: number; volumeFactor: number }
> = {
  fast: { retentionDays: 2, volumeFactor: 1 },
  moderate: { retentionDays: 2.35, volumeFactor: 1.06 },
  slow: { retentionDays: 2.65, volumeFactor: 1.14 },
  very_slow: { retentionDays: 3, volumeFactor: 1.22 },
};

const STANDARD_SIZES = [750, 1000, 1250, 1500, 2000, 2500, 3000] as const;

function roundUpStep(gal: number, step: number): number {
  return Math.ceil(gal / step) * step;
}

function disposalMultiplier(withDisposal: boolean): number {
  return withDisposal ? 1.15 : 1;
}

function washerMultiplier(w: WasherKey): number {
  if (w === "low") return 1;
  if (w === "med") return 1.08;
  return 1.15;
}

function pickStandardSizes(recommended: number): {
  nominal: number;
  comfort: number;
  conservative: number;
} {
  const nominal =
    STANDARD_SIZES.find((s) => s >= recommended) ??
    roundUpStep(recommended, 250);
  const comfort =
    STANDARD_SIZES.find((s) => s > nominal) ?? roundUpStep(nominal * 1.12, 250);
  const conservative =
    STANDARD_SIZES.find((s) => s > comfort) ??
    roundUpStep(nominal * 1.25, 250);
  return { nominal, comfort, conservative };
}

interface SepticResult {
  dailyFlow: number;
  retentionHours: number;
  minimumTankGal: number;
  recommendedGal: number;
  codeMinGal: number;
  options: ReturnType<typeof pickStandardSizes>;
}

interface ContentShape {
  pageTitle?: string;
  pageDescriptionBefore?: string;
  pageDescriptionBold?: string;
  pageDescriptionAfter?: string;
  sectionHousehold?: string;
  sectionWater?: string;
  sectionSoil?: string;
  sectionExtra?: string;
  labelHousehold?: string;
  placeholderHousehold?: string;
  labelGpp?: string;
  suffixGal?: string;
  labelUsageType?: string;
  usageLow?: string;
  usageNormal?: string;
  usageHigh?: string;
  usageVeryHigh?: string;
  hintWater?: string;
  labelSoil?: string;
  placeholderSoil?: string;
  soilFast?: string;
  soilModerate?: string;
  soilSlow?: string;
  soilVerySlow?: string;
  labelDisposal?: string;
  disposalNo?: string;
  disposalYes?: string;
  labelWasher?: string;
  washerLow?: string;
  washerMed?: string;
  washerHigh?: string;
  hintExtra?: string;
  importantTitle?: string;
  importantBody?: string;
  btnCalculate?: string;
  btnReset?: string;
  resultsTitle?: string;
  resultsSubtitle?: string;
  emptyTitle?: string;
  emptyHint?: string;
  metricDailyFlow?: string;
  metricRetention?: string;
  metricMinimum?: string;
  metricRecommended?: string;
  suffixGpd?: string;
  suffixHours?: string;
  suffixGallons?: string;
  tankOptionsTitle?: string;
  tankOptionsNote?: string;
  optionMinimum?: string;
  optionComfort?: string;
  optionConservative?: string;
  proTipsTitle?: string;
  proTip1?: string;
  proTip2?: string;
  proTip3?: string;
  proTip4?: string;
  proTip5?: string;
  errHousehold?: string;
  errSoil?: string;
  errGpp?: string;
}

const defaultContent: ContentShape = {
  pageTitle: "Septic Tank Size Calculator",
  pageDescriptionBefore: "Most homes need a ",
  pageDescriptionBold: "1,000-gallon septic tank.",
  pageDescriptionAfter:
    " Use our calculator for exact size based on bedrooms, usage, and soil type.",
};

export default function SepticTankSizeCalculatorClient({
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

  const [household, setHousehold] = useState<HouseholdKey>("");
  const [soil, setSoil] = useState<SoilKey>("");
  const [usageType, setUsageType] = useState<UsageKey>("normal");
  const [gpp, setGpp] = useState("70");
  const [withDisposal, setWithDisposal] = useState(true);
  const [washer, setWasher] = useState<WasherKey>("med");
  const [result, setResult] = useState<SepticResult | null>(null);
  const [errors, setErrors] = useState<{ household?: string; soil?: string; gpp?: string }>({});

  const onUsageChange = useCallback((v: UsageKey) => {
    setUsageType(v);
    setGpp(String(USAGE_GPP[v]));
  }, []);

  const compute = useCallback(() => {
    const nextErr: typeof errors = {};
    if (!household) nextErr.household = c.errHousehold;
    if (!soil) nextErr.soil = c.errSoil;
    const gppNum = Number.parseFloat(gpp);
    if (!Number.isFinite(gppNum) || gppNum < 40 || gppNum > 150) {
      nextErr.gpp = c.errGpp;
    }
    setErrors(nextErr);
    if (Object.keys(nextErr).length > 0) {
      setResult(null);
      return;
    }

    const h = HOUSEHOLD[household as Exclude<HouseholdKey, "">];
    const s = SOIL[soil as Exclude<SoilKey, "">];
    const dailyBase = h.occupants * gppNum;
    const dailyFlow = dailyBase * disposalMultiplier(withDisposal) * washerMultiplier(washer);
    const retentionHours = s.retentionDays * 24;

    const twoDay = dailyFlow * 2;
    const sized = dailyFlow * s.retentionDays * s.volumeFactor;
    const minimumTankGal = Math.max(h.codeMinGal, roundUpStep(twoDay, 50));
    const recommendedGal = Math.max(
      h.codeMinGal,
      roundUpStep(sized, 50),
      minimumTankGal
    );

    setResult({
      dailyFlow,
      retentionHours,
      minimumTankGal,
      recommendedGal,
      codeMinGal: h.codeMinGal,
      options: pickStandardSizes(recommendedGal),
    });
    scrollToRef(resultsRef);
  }, [
    household,
    soil,
    gpp,
    withDisposal,
    washer,
    scrollToRef,
    c.errHousehold,
    c.errSoil,
    c.errGpp,
  ]);

  const reset = useCallback(() => {
    setHousehold("");
    setSoil("");
    setUsageType("normal");
    setGpp("70");
    setWithDisposal(true);
    setWasher("med");
    setResult(null);
    setErrors({});
  }, []);

  const sectionIconClass = "text-emerald-600 flex-shrink-0 mt-0.5";

  const formCard = (
      <Card className="shadow-lg border border-gray-200/80 bg-white">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100/80 py-5 px-6">
          <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 text-gray-900">
            <Calculator className="w-6 h-6 text-emerald-600" />
            Inputs
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            Adjust values to match your home; defaults follow typical residential assumptions.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Users className={`w-5 h-5 ${sectionIconClass}`} />
              <div className="flex-1 space-y-2">
                <Label className="text-sm font-semibold text-gray-800">{c.sectionHousehold}</Label>
                <Select
                  value={household || undefined}
                  onValueChange={(v) => setHousehold(v as HouseholdKey)}
                >
                  <SelectTrigger
                    className="h-11 rounded-xl"
                    aria-invalid={!!errors.household}
                  >
                    <SelectValue placeholder={c.placeholderHousehold} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="h1">1–2 people / 1 bedroom</SelectItem>
                    <SelectItem value="h2">3–4 people / 2 bedrooms</SelectItem>
                    <SelectItem value="h3">5–6 people / 3 bedrooms</SelectItem>
                    <SelectItem value="h4">7–8 people / 4 bedrooms</SelectItem>
                    <SelectItem value="h5">9–10 people / 5 bedrooms</SelectItem>
                    <SelectItem value="h6">11+ people / 6+ bedrooms</SelectItem>
                  </SelectContent>
                </Select>
                {errors.household ? (
                  <p className="text-sm text-red-600">{errors.household}</p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Droplets className={`w-5 h-5 ${sectionIconClass}`} />
              <div className="flex-1 space-y-4">
                <Label className="text-sm font-semibold text-gray-800">{c.sectionWater}</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-gray-600">{c.labelGpp}</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        min={40}
                        max={150}
                        step={1}
                        value={gpp}
                        onChange={(e) => setGpp(e.target.value)}
                        className="h-11 rounded-xl flex-1"
                        aria-invalid={!!errors.gpp}
                      />
                      <span className="flex items-center text-sm text-gray-500 tabular-nums whitespace-nowrap">
                        {c.suffixGal}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-gray-600">{c.labelUsageType}</Label>
                    <Select value={usageType} onValueChange={(v) => onUsageChange(v as UsageKey)}>
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">{c.usageLow}</SelectItem>
                        <SelectItem value="normal">{c.usageNormal}</SelectItem>
                        <SelectItem value="high">{c.usageHigh}</SelectItem>
                        <SelectItem value="very_high">{c.usageVeryHigh}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <p className="text-sm text-gray-500 italic">{c.hintWater}</p>
                {errors.gpp ? <p className="text-sm text-red-600">{errors.gpp}</p> : null}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Mountain className={`w-5 h-5 ${sectionIconClass}`} />
              <div className="flex-1 space-y-2">
                <Label className="text-sm font-semibold text-gray-800">{c.sectionSoil}</Label>
                <Select value={soil || undefined} onValueChange={(v) => setSoil(v as SoilKey)}>
                  <SelectTrigger className="h-11 rounded-xl" aria-invalid={!!errors.soil}>
                    <SelectValue placeholder={c.placeholderSoil} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fast">{c.soilFast}</SelectItem>
                    <SelectItem value="moderate">{c.soilModerate}</SelectItem>
                    <SelectItem value="slow">{c.soilSlow}</SelectItem>
                    <SelectItem value="very_slow">{c.soilVerySlow}</SelectItem>
                  </SelectContent>
                </Select>
                {errors.soil ? <p className="text-sm text-red-600">{errors.soil}</p> : null}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Home className={`w-5 h-5 ${sectionIconClass}`} />
              <div className="flex-1 space-y-4">
                <Label className="text-sm font-semibold text-gray-800">{c.sectionExtra}</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-gray-600">{c.labelDisposal}</Label>
                    <Select
                      value={withDisposal ? "yes" : "no"}
                      onValueChange={(v) => setWithDisposal(v === "yes")}
                    >
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">{c.disposalNo}</SelectItem>
                        <SelectItem value="yes">{c.disposalYes}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-gray-600">{c.labelWasher}</Label>
                    <Select value={washer} onValueChange={(v) => setWasher(v as WasherKey)}>
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">{c.washerLow}</SelectItem>
                        <SelectItem value="med">{c.washerMed}</SelectItem>
                        <SelectItem value="high">{c.washerHigh}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <p className="text-sm text-gray-500 italic">{c.hintExtra}</p>
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
                <Waves className="w-8 h-8 text-white" />
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
                      <Waves className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-lg font-semibold text-gray-800 mb-2">{c.emptyTitle}</p>
                      <p className="text-gray-600 max-w-md mx-auto">{c.emptyHint}</p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
                          <p className="text-xs font-medium text-emerald-800 uppercase tracking-wide">
                            {c.metricDailyFlow}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {Math.round(result.dailyFlow).toLocaleString()}{" "}
                            <span className="text-base font-semibold text-emerald-700">
                              {c.suffixGpd}
                            </span>
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                          <p className="text-xs font-medium text-slate-700 uppercase tracking-wide">
                            {c.metricRetention}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {Math.round(result.retentionHours)}{" "}
                            <span className="text-base font-semibold text-slate-600">
                              {c.suffixHours}
                            </span>
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                            {c.metricMinimum}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {result.minimumTankGal.toLocaleString()}{" "}
                            <span className="text-base font-semibold text-gray-600">
                              {c.suffixGallons}
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Code-style floor: {result.codeMinGal.toLocaleString()} {c.suffixGallons}{" "}
                            min. for this household tier (typical rule-of-thumb).
                          </p>
                        </div>
                        <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
                          <p className="text-xs font-medium text-emerald-900 uppercase tracking-wide">
                            {c.metricRecommended}
                          </p>
                          <p className="text-3xl font-bold text-emerald-900 tabular-nums">
                            {result.recommendedGal.toLocaleString()}{" "}
                            <span className="text-lg font-semibold">{c.suffixGallons}</span>
                          </p>
                        </div>
                      </div>

                      <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-4">
                        <p className="font-semibold text-amber-950 flex items-center gap-2 mb-2">
                          <Lightbulb className="w-4 h-4" />
                          {c.tankOptionsTitle}
                        </p>
                        <p className="text-sm text-amber-950/85 mb-3">{c.tankOptionsNote}</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                          <li className="rounded-lg bg-white/80 border border-amber-100 px-3 py-2">
                            <span className="text-gray-500 block text-xs">{c.optionMinimum}</span>
                            <span className="font-bold text-gray-900 tabular-nums">
                              {result.options.nominal.toLocaleString()} {c.suffixGallons}
                            </span>
                          </li>
                          <li className="rounded-lg bg-white/80 border border-amber-100 px-3 py-2">
                            <span className="text-gray-500 block text-xs">{c.optionComfort}</span>
                            <span className="font-bold text-gray-900 tabular-nums">
                              {result.options.comfort.toLocaleString()} {c.suffixGallons}
                            </span>
                          </li>
                          <li className="rounded-lg bg-white/80 border border-amber-100 px-3 py-2">
                            <span className="text-gray-500 block text-xs">{c.optionConservative}</span>
                            <span className="font-bold text-gray-900 tabular-nums">
                              {result.options.conservative.toLocaleString()} {c.suffixGallons}
                            </span>
                          </li>
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
            entityId="septic-tank-size-calculator"
            entityType="calculator"
            creatorSlug="hudson-hale"
            initialRatingTotal={0}
            initialRatingCount={0}
          />

          <CalculatorGuide data={guideData} layout="article" />

          <SimilarCalculators
            calculators={[
              {
                calculatorName: "Gallons per square foot",
                calculatorHref: "/construction/gallons-per-square-foot-calculator",
                calculatorDescription:
                  "Convert area and depth to volume in gallons for tanks, pools, and coatings.",
              },
              {
                calculatorName: "Cubic yard calculator",
                calculatorHref: "/construction/cubic-yard-calculator",
                calculatorDescription:
                  "Estimate cubic yards of concrete, gravel, or fill for slabs and footings.",
              },
              {
                calculatorName: "Paver base calculator",
                calculatorHref: "/construction/paver-base-calculator",
                calculatorDescription:
                  "Estimate gravel base depth and volume for patios, walks, and driveways.",
              },
            ]}
            color="teal"
            title="Related construction calculators"
          />
        </div>
      </main>
    </div>
  );
}
