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
  Footprints,
  Lightbulb,
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
  calculateSnowboardSize,
  type BootSizeSystem,
  type GenderOption,
  type HeightUnit,
  type RidingStyle,
  type SkillLevel,
  type SnowboardSizeResult,
  type WeightUnit,
} from "@/lib/snowboard-size-calculator";

interface ContentShape {
  pageTitle?: string;
  pageDescription?: string;
  labelHeight?: string;
  labelWeight?: string;
  labelBootSize?: string;
  labelSkill?: string;
  labelRidingStyle?: string;
  labelGender?: string;
  heightImperial?: string;
  heightMetric?: string;
  weightLbs?: string;
  weightKg?: string;
  bootUs?: string;
  bootUk?: string;
  bootEu?: string;
  skillBeginner?: string;
  skillIntermediate?: string;
  skillAdvanced?: string;
  skillExpert?: string;
  styleAllMountain?: string;
  styleFreestyle?: string;
  stylePowder?: string;
  styleFreeride?: string;
  genderMale?: string;
  genderFemale?: string;
  genderUnisex?: string;
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
  metricStyleAdj?: string;
  metricPersonal?: string;
  errHeight?: string;
  errWeight?: string;
  errBoot?: string;
}

const defaultContent: ContentShape = {
  pageTitle: "Snowboard Size Calculator — Length, Width & Chart",
  pageDescription:
    "Find your perfect snowboard size in seconds by height, weight, boot size, and riding style.",
};

export default function SnowboardSizeCalculatorClient({
  content,
  guideContent,
}: {
  content: ContentShape | null;
  guideContent: CalculatorGuideData | null;
}) {
  const c = { ...defaultContent, ...content };
  const guideData: CalculatorGuideData = guideContent ?? {
    color: "cyan",
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
  const [bootSystem, setBootSystem] = useState<BootSizeSystem>("us");
  const [bootSize, setBootSize] = useState("10");
  const [skillLevel, setSkillLevel] = useState<SkillLevel>("intermediate");
  const [ridingStyle, setRidingStyle] = useState<RidingStyle>("all-mountain");
  const [gender, setGender] = useState<GenderOption>("unisex");
  const [result, setResult] = useState<SnowboardSizeResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const compute = useCallback(() => {
    const w = Number.parseFloat(weight);
    const boot = Number.parseFloat(bootSize);
    const nextErr: Record<string, string> = {};

    let cm = 0;
    if (heightUnit === "metric") {
      cm = Number.parseFloat(heightCm);
      if (!Number.isFinite(cm) || cm < 120 || cm > 220) nextErr.height = c.errHeight;
    } else {
      const ft = Number.parseFloat(heightFt);
      const inches = Number.parseFloat(heightIn);
      if (!Number.isFinite(ft) || ft < 4 || ft > 7) nextErr.height = c.errHeight;
      if (!Number.isFinite(inches) || inches < 0 || inches >= 12)
        nextErr.height = c.errHeight;
      cm = (ft || 0) * 30.48 + (inches || 0) * 2.54;
      if (cm < 120 || cm > 220) nextErr.height = c.errHeight;
    }

    if (!Number.isFinite(w) || w <= 0) nextErr.weight = c.errWeight;
    const weightKg = weightUnit === "kg" ? w : w * 0.453592;
    if (weightKg < 25 || weightKg > 150) nextErr.weight = c.errWeight;

    if (!Number.isFinite(boot) || boot <= 0) nextErr.boot = c.errBoot;

    setErrors(nextErr);
    if (Object.keys(nextErr).length > 0) {
      setResult(null);
      return;
    }

    const out = calculateSnowboardSize({
      heightUnit,
      heightCm: heightUnit === "metric" ? cm : undefined,
      heightFt: heightUnit === "imperial" ? Number.parseFloat(heightFt) : undefined,
      heightIn: heightUnit === "imperial" ? Number.parseFloat(heightIn) : undefined,
      weight: w,
      weightUnit,
      bootSize: boot,
      bootSystem,
      skillLevel,
      ridingStyle,
      gender,
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
    bootSize,
    bootSystem,
    skillLevel,
    ridingStyle,
    gender,
    scrollToRef,
    c.errHeight,
    c.errWeight,
    c.errBoot,
  ]);

  const reset = useCallback(() => {
    setHeightUnit("imperial");
    setHeightFt("5");
    setHeightIn("10");
    setHeightCm("178");
    setWeightUnit("lbs");
    setWeight("170");
    setBootSystem("us");
    setBootSize("10");
    setSkillLevel("intermediate");
    setRidingStyle("all-mountain");
    setGender("unisex");
    setResult(null);
    setErrors({});
  }, []);

  const sectionIcon = "text-cyan-600 flex-shrink-0 mt-0.5";

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
                      min={4}
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
                    min={120}
                    max={220}
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

        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <Footprints className={`w-5 h-5 ${sectionIcon}`} />
            <div className="flex-1 space-y-4">
              <Label className="text-sm font-semibold text-gray-800">{c.labelBootSize}</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  value={bootSystem}
                  onValueChange={(v) => setBootSystem(v as BootSizeSystem)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">{c.bootUs}</SelectItem>
                    <SelectItem value="uk">{c.bootUk}</SelectItem>
                    <SelectItem value="eu">{c.bootEu}</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  min={1}
                  step={0.5}
                  value={bootSize}
                  onChange={(e) => setBootSize(e.target.value)}
                  className={errors.boot ? "border-red-500" : ""}
                />
              </div>
              {errors.boot && <p className="text-sm text-red-600">{errors.boot}</p>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <Label>{c.labelRidingStyle}</Label>
            <Select
              value={ridingStyle}
              onValueChange={(v) => setRidingStyle(v as RidingStyle)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-mountain">{c.styleAllMountain}</SelectItem>
                <SelectItem value="freestyle">{c.styleFreestyle}</SelectItem>
                <SelectItem value="powder">{c.stylePowder}</SelectItem>
                <SelectItem value="freeride">{c.styleFreeride}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>{c.labelGender}</Label>
            <Select value={gender} onValueChange={(v) => setGender(v as GenderOption)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">{c.genderMale}</SelectItem>
                <SelectItem value="female">{c.genderFemale}</SelectItem>
                <SelectItem value="unisex">{c.genderUnisex}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            onClick={compute}
            className="flex-1 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white"
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50">
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-600 to-teal-600 flex items-center justify-center shadow-lg">
                <Snowflake className="w-8 h-8 text-white" />
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
                <CardHeader className="bg-gradient-to-r from-slate-50 to-cyan-50/50 border-b py-5 px-6">
                  <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 text-gray-900">
                    <BarChart3 className="w-6 h-6 text-cyan-600" />
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
                      <div className="rounded-xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-teal-50 p-5">
                        <p className="text-xs font-medium text-cyan-900 uppercase tracking-wide">
                          {c.metricRecommended}
                        </p>
                        <p className="text-4xl font-bold text-cyan-950 tabular-nums">
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
                        <p className="text-2xl font-bold text-violet-950">{result.width}</p>
                        <p className="text-sm text-violet-950/90 leading-relaxed mt-2">
                          {result.widthNote}
                        </p>
                      </div>

                      <div className="rounded-xl border border-cyan-100 bg-cyan-50/50 p-4">
                        <p className="text-xs font-medium text-cyan-900 uppercase tracking-wide mb-1">
                          {c.metricSkillAdj}
                        </p>
                        <p className="text-sm text-cyan-950/90 leading-relaxed">
                          {result.skillNote}
                        </p>
                      </div>

                      <div className="rounded-xl border border-teal-100 bg-teal-50/50 p-4">
                        <p className="text-xs font-medium text-teal-900 uppercase tracking-wide mb-1">
                          {c.metricStyleAdj}
                        </p>
                        <p className="text-sm text-teal-950/90 leading-relaxed">
                          {result.styleNote}
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

              <div className="rounded-xl border-l-4 border-cyan-400 bg-cyan-50/90 p-5 shadow-sm">
                <p className="font-semibold text-cyan-950 flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5" />
                  Tips
                </p>
                <ul className="space-y-2 text-sm text-cyan-950/90 list-disc pl-5">
                  <li>Shorter boards turn easier; longer boards add stability and powder float.</li>
                  <li>Park riders size down; powder and freeride riders size up.</li>
                  <li>When between sizes, beginners should size down; experts may size up.</li>
                </ul>
              </div>
            </div>
          </div>

          <RatingProfileSection
            entityId="snowboard-size-calculator"
            entityType="calculator"
            creatorSlug="antonio-ares"
            initialRatingTotal={0}
            initialRatingCount={0}
          />

          <CalculatorGuide data={guideData} layout="article" />

          <SimilarCalculators
            calculators={[
              {
                calculatorName: "Ski Size Calculator",
                calculatorHref: "/ski-size-calculator",
                calculatorDescription:
                  "Find your perfect ski length by height, weight, and skill level.",
              },
              {
                calculatorName: "Kite Size Calculator",
                calculatorHref: "/sports/kite-size-calculator",
                calculatorDescription:
                  "Find ideal kite size for kitesurfing by weight and wind.",
              },
              {
                calculatorName: "Strength Level Calculator",
                calculatorHref: "/health/strength-level-calculator",
                calculatorDescription:
                  "Compare lifting strength with 1RM standards.",
              },
            ]}
            color="cyan"
            title="Related calculators"
          />
        </div>
      </main>
    </div>
  );
}
