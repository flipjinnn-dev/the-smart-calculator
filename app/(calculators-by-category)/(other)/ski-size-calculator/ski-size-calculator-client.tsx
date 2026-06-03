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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  Info,
  Lightbulb,
  Mountain,
  RotateCcw,
  Ruler,
  Snowflake,
  Target,
  User,
} from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide, { type CalculatorGuideData } from "@/components/calculator-guide";
import { RatingProfileSection } from "@/components/rating-profile-section";
import {
  calculateSkiSize,
  type Gender,
  type HeightUnit,
  type SkierType,
  type SkiSizeResult,
  type SkiType,
  type SkillLevel,
  type WeightUnit,
} from "@/lib/ski-size-calculator";

interface ContentShape {
  pageTitle?: string;
  pageDescription?: string;
  sectionBody?: string;
  labelHeight?: string;
  labelWeight?: string;
  labelSkierType?: string;
  labelGender?: string;
  labelSkill?: string;
  labelSkiType?: string;
  heightImperial?: string;
  heightMetric?: string;
  weightLbs?: string;
  weightKg?: string;
  skierAdult?: string;
  skierJunior?: string;
  genderMale?: string;
  genderFemale?: string;
  skillBeginner?: string;
  skillIntermediate?: string;
  skillAdvanced?: string;
  skillExpert?: string;
  skiAllMountain?: string;
  skiPowder?: string;
  skiFreestyle?: string;
  skiSlalom?: string;
  skiTouring?: string;
  skiCarving?: string;
  skiCrossCountry?: string;
  importantTitle?: string;
  importantBody?: string;
  btnCalculate?: string;
  btnReset?: string;
  resultsTitle?: string;
  resultsSubtitle?: string;
  emptyTitle?: string;
  emptyHint?: string;
  metricRecommended?: string;
  metricRange?: string;
  metricWidth?: string;
  metricSkillAdj?: string;
  metricTypeAdj?: string;
  metricPersonal?: string;
  metricQuick?: string;
  errHeight?: string;
  errWeight?: string;
}

const defaultContent: ContentShape = {
  pageTitle: "Ski Size Calculator",
  pageDescription:
    "Find your perfect ski length by height, weight, skill level, and ski type with instant personalized recommendations.",
};

export default function SkiSizeCalculatorClient({
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

  const [heightUnit, setHeightUnit] = useState<HeightUnit>("imperial");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("10");
  const [heightCm, setHeightCm] = useState("178");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("lbs");
  const [weight, setWeight] = useState("170");
  const [skierType, setSkierType] = useState<SkierType>("adult");
  const [gender, setGender] = useState<Gender>("male");
  const [skillLevel, setSkillLevel] = useState<SkillLevel>("intermediate");
  const [skiType, setSkiType] = useState<SkiType>("all-mountain");
  const [result, setResult] = useState<SkiSizeResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const compute = useCallback(() => {
    const w = Number.parseFloat(weight);
    const nextErr: Record<string, string> = {};

    let cm = 0;
    const minH = skierType === "junior" ? 100 : 130;
    const maxH = skierType === "junior" ? 180 : 230;

    if (heightUnit === "metric") {
      cm = Number.parseFloat(heightCm);
      if (!Number.isFinite(cm) || cm < minH || cm > maxH) nextErr.height = c.errHeight;
    } else {
      const ft = Number.parseFloat(heightFt);
      const inches = Number.parseFloat(heightIn);
      if (!Number.isFinite(ft) || ft < 3 || ft > 7) nextErr.height = c.errHeight;
      if (!Number.isFinite(inches) || inches < 0 || inches >= 12)
        nextErr.height = c.errHeight;
      cm = (ft || 0) * 30.48 + (inches || 0) * 2.54;
      if (cm < minH || cm > maxH) nextErr.height = c.errHeight;
    }

    if (!Number.isFinite(w) || w <= 0) nextErr.weight = c.errWeight;
    const weightKg = weightUnit === "kg" ? w : w * 0.453592;
    if (weightKg < 15 || weightKg > 200) nextErr.weight = c.errWeight;

    setErrors(nextErr);
    if (Object.keys(nextErr).length > 0) {
      setResult(null);
      return;
    }

    const out = calculateSkiSize({
      heightUnit,
      heightCm: heightUnit === "metric" ? cm : undefined,
      heightFt: heightUnit === "imperial" ? Number.parseFloat(heightFt) : undefined,
      heightIn: heightUnit === "imperial" ? Number.parseFloat(heightIn) : undefined,
      weight: w,
      weightUnit,
      skierType,
      gender,
      skillLevel,
      skiType,
    });

    setResult(out);
    if (out) scrollToRef(resultsRef);
  }, [
    heightUnit,
    heightFt,
    heightIn,
    heightCm,
    weight,
    weightUnit,
    skierType,
    gender,
    skillLevel,
    skiType,
    scrollToRef,
    c.errHeight,
    c.errWeight,
  ]);

  const reset = useCallback(() => {
    setHeightUnit("imperial");
    setHeightFt("5");
    setHeightIn("10");
    setHeightCm("178");
    setWeightUnit("lbs");
    setWeight("170");
    setSkierType("adult");
    setGender("male");
    setSkillLevel("intermediate");
    setSkiType("all-mountain");
    setResult(null);
    setErrors({});
  }, []);

  const sectionIcon = "text-sky-600 flex-shrink-0 mt-0.5";

  const formCard = (
    <Card className="shadow-lg border border-gray-200/80 bg-white">
      <CardContent className="p-6 space-y-8">
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <Ruler className={`w-5 h-5 ${sectionIcon}`} />
            <div className="flex-1 space-y-4">
              <Label className="text-sm font-semibold text-gray-800">{c.labelHeight}</Label>
              <RadioGroup
                value={heightUnit}
                onValueChange={(v) => setHeightUnit(v as HeightUnit)}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="imperial" id="h-imp" />
                  <Label htmlFor="h-imp" className="font-normal cursor-pointer">
                    {c.heightImperial}
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="metric" id="h-met" />
                  <Label htmlFor="h-met" className="font-normal cursor-pointer">
                    {c.heightMetric}
                  </Label>
                </div>
              </RadioGroup>
              {heightUnit === "imperial" ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-600">Feet</Label>
                    <Input
                      type="number"
                      min={3}
                      max={7}
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      className={errors.height ? "border-red-500" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-600">Inches</Label>
                    <Input
                      type="number"
                      min={0}
                      max={11}
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      className={errors.height ? "border-red-500" : ""}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label className="text-xs text-gray-600">Centimeters</Label>
                  <Input
                    type="number"
                    min={100}
                    max={230}
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className={errors.height ? "border-red-500" : ""}
                  />
                </div>
              )}
              {errors.height && (
                <p className="text-sm text-red-600">{errors.height}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <User className={`w-5 h-5 ${sectionIcon}`} />
            <div className="flex-1 space-y-4">
              <Label className="text-sm font-semibold text-gray-800">{c.labelWeight}</Label>
              <RadioGroup
                value={weightUnit}
                onValueChange={(v) => setWeightUnit(v as WeightUnit)}
                className="flex gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="lbs" id="w-lbs" />
                  <Label htmlFor="w-lbs" className="font-normal cursor-pointer">
                    {c.weightLbs}
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="kg" id="w-kg" />
                  <Label htmlFor="w-kg" className="font-normal cursor-pointer">
                    {c.weightKg}
                  </Label>
                </div>
              </RadioGroup>
              <Input
                type="number"
                min={1}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className={errors.weight ? "border-red-500" : ""}
              />
              {errors.weight && <p className="text-sm text-red-600">{errors.weight}</p>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{c.labelSkierType}</Label>
            <Select value={skierType} onValueChange={(v) => setSkierType(v as SkierType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="adult">{c.skierAdult}</SelectItem>
                <SelectItem value="junior">{c.skierJunior}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{c.labelGender}</Label>
            <Select value={gender} onValueChange={(v) => setGender(v as Gender)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">{c.genderMale}</SelectItem>
                <SelectItem value="female">{c.genderFemale}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{c.labelSkill}</Label>
            <Select value={skillLevel} onValueChange={(v) => setSkillLevel(v as SkillLevel)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">{c.skillBeginner}</SelectItem>
                <SelectItem value="intermediate">{c.skillIntermediate}</SelectItem>
                <SelectItem value="advanced">{c.skillAdvanced}</SelectItem>
                <SelectItem value="expert">{c.skillExpert}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{c.labelSkiType}</Label>
            <Select value={skiType} onValueChange={(v) => setSkiType(v as SkiType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-mountain">{c.skiAllMountain}</SelectItem>
                <SelectItem value="carving">{c.skiCarving}</SelectItem>
                <SelectItem value="slalom">{c.skiSlalom}</SelectItem>
                <SelectItem value="powder">{c.skiPowder}</SelectItem>
                <SelectItem value="freestyle">{c.skiFreestyle}</SelectItem>
                <SelectItem value="touring">{c.skiTouring}</SelectItem>
                <SelectItem value="cross-country">{c.skiCrossCountry}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-lg border border-sky-200 bg-sky-50/80 p-4 flex gap-3">
          <Info className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sky-950 text-sm">{c.importantTitle}</p>
            <p className="text-sm text-sky-900/90 mt-1 leading-relaxed">{c.importantBody}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            onClick={compute}
            className="flex-1 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white"
          >
            <Snowflake className="w-4 h-4 mr-2" />
            {c.btnCalculate}
          </Button>
          <Button type="button" variant="outline" onClick={reset} className="flex-1 sm:flex-none">
            <RotateCcw className="w-4 h-4 mr-2" />
            {c.btnReset}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 flex items-center justify-center shadow-lg">
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
            <div>{formCard}</div>

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
                      <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-lg font-semibold text-gray-800 mb-2">{c.emptyTitle}</p>
                      <p className="text-gray-600 max-w-md mx-auto">{c.emptyHint}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="rounded-xl border border-indigo-200 bg-indigo-50/70 p-4">
                        <p className="text-xs font-medium text-indigo-900 uppercase tracking-wide mb-1">
                          {c.metricQuick}
                        </p>
                        <p className="text-sm text-indigo-950/90 leading-relaxed">
                          {result.quickTip}
                        </p>
                      </div>

                      <div className="rounded-xl border-2 border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50 p-5">
                        <p className="text-xs font-medium text-sky-900 uppercase tracking-wide">
                          {c.metricRecommended}
                        </p>
                        <p className="text-4xl font-bold text-sky-950 tabular-nums">
                          {result.recommendedCm}{" "}
                          <span className="text-xl font-semibold">cm</span>
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                        <p className="text-xs font-medium text-slate-700 uppercase tracking-wide">
                          {c.metricRange}
                        </p>
                        <p className="text-2xl font-bold text-gray-900 tabular-nums">
                          {result.rangeMin}–{result.rangeMax} cm
                        </p>
                      </div>

                      <div className="rounded-xl border border-violet-100 bg-violet-50/50 p-4">
                        <p className="text-xs font-medium text-violet-900 uppercase tracking-wide mb-1">
                          {c.metricWidth}
                        </p>
                        <p className="text-sm text-violet-950/90 leading-relaxed">
                          {result.widthNote}
                        </p>
                      </div>

                      <div className="rounded-xl border border-sky-100 bg-sky-50/50 p-4">
                        <p className="text-xs font-medium text-sky-900 uppercase tracking-wide mb-1">
                          {c.metricSkillAdj}
                        </p>
                        <p className="text-sm text-sky-950/90 leading-relaxed">
                          {result.skillNote}
                        </p>
                      </div>

                      <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                        <p className="text-xs font-medium text-blue-900 uppercase tracking-wide mb-1">
                          {c.metricTypeAdj}
                        </p>
                        <p className="text-sm text-blue-950/90 leading-relaxed">
                          {result.skiTypeNote}
                        </p>
                      </div>

                      <div className="rounded-xl border border-green-100 bg-green-50/60 p-4">
                        <p className="text-sm font-semibold text-green-950 mb-2 flex items-center gap-2">
                          <Snowflake className="w-4 h-4" />
                          {c.metricPersonal}
                        </p>
                        <p className="text-sm text-green-950/90 leading-relaxed">
                          {result.recommendation}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="rounded-xl border-l-4 border-sky-400 bg-sky-50/90 p-5 shadow-sm">
                <p className="font-semibold text-sky-950 flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5" />
                  Tips
                </p>
                <ul className="space-y-2 text-sm text-sky-950/90 list-disc pl-5">
                  <li>Shorter skis are easier to turn; longer skis add stability at speed.</li>
                  <li>Powder and racing setups often run longer; park skis are usually shorter.</li>
                  <li>When between sizes, beginners should size down; experts may size up.</li>
                </ul>
              </div>
            </div>
          </div>

          <RatingProfileSection
            entityId="ski-size-calculator"
            entityType="calculator"
            creatorSlug="antonio-ares"
            initialRatingTotal={0}
            initialRatingCount={0}
          />

          <CalculatorGuide data={guideData} layout="article" />

          <SimilarCalculators
            calculators={[
              {
                calculatorName: "Kite Size Calculator",
                calculatorHref: "/sports/kite-size-calculator",
                calculatorDescription:
                  "Find ideal kite size for kitesurfing by weight and wind.",
              },
              {
                calculatorName: "SILCA Tire Pressure Calculator",
                calculatorHref: "/sports/silcatire-pressure-calculator",
                calculatorDescription:
                  "Optimize bike tire PSI for road, gravel, and MTB.",
              },
              {
                calculatorName: "Strength Level Calculator",
                calculatorHref: "/health/strength-level-calculator",
                calculatorDescription:
                  "Compare lifting strength with 1RM standards.",
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
