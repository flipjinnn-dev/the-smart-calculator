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
  Dog,
  Lightbulb,
  RotateCcw,
  Scale,
  Timer,
  TrendingUp,
} from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide, { type CalculatorGuideData } from "@/components/calculator-guide";
import { RatingProfileSection } from "@/components/rating-profile-section";
import {
  calculatePuppyWeight,
  formatWeight,
  type AgeUnit,
  type BreedSize,
  type BreedType,
  type Gender,
  type PuppyWeightResult,
  type WeightUnit,
} from "@/lib/puppy-weight-calculator";

interface ContentShape {
  pageTitle?: string;
  pageDescriptionBefore?: string;
  pageDescriptionBold?: string;
  pageDescriptionAfter?: string;
  sectionPuppy?: string;
  labelAge?: string;
  ageWeeks?: string;
  ageMonths?: string;
  hintAge?: string;
  labelWeight?: string;
  weightKg?: string;
  weightLbs?: string;
  hintWeight?: string;
  labelBreedSize?: string;
  placeholderBreedSize?: string;
  breedToy?: string;
  breedSmall?: string;
  breedMedium?: string;
  breedLarge?: string;
  breedGiant?: string;
  hintBreedSize?: string;
  sectionOptional?: string;
  labelBreedType?: string;
  breedTypeMixed?: string;
  breedTypePure?: string;
  labelPureBreed?: string;
  placeholderPureBreed?: string;
  hintPureBreed?: string;
  labelGender?: string;
  genderNone?: string;
  genderMale?: string;
  genderFemale?: string;
  hintGender?: string;
  btnCalculate?: string;
  btnReset?: string;
  resultsTitle?: string;
  resultsSubtitle?: string;
  emptyTitle?: string;
  emptyHint?: string;
  metricAdultWeight?: string;
  metricWeightRange?: string;
  metricGrowthFactor?: string;
  metricGrowthStage?: string;
  metricBreedCategory?: string;
  metricSizeClass?: string;
  metricFullGrowth?: string;
  metricBreakdown?: string;
  breakdownAge?: string;
  breakdownWeight?: string;
  proTipsTitle?: string;
  proTip1?: string;
  proTip2?: string;
  proTip3?: string;
  proTip4?: string;
  proTip5?: string;
  errBreedSize?: string;
  errAge?: string;
  errWeight?: string;
}

const defaultContent: ContentShape = {
  pageTitle: "Puppy Weight Calculator",
  pageDescriptionBefore:
    "Predict how big your puppy will get as an adult. Enter age, weight, and breed size for an ",
  pageDescriptionBold: "instant adult weight estimate",
  pageDescriptionAfter:
    " — a complete puppy growth calculator for all breeds including mixed breeds.",
  btnCalculate: "Calculate",
  emptyTitle: "No calculation yet",
  emptyHint: "Enter your puppy's details and click Calculate to see adult weight estimates here.",
  proTipsTitle: "Pro tips for tracking puppy growth",
  proTip1: "Re-weigh every 4 weeks and re-run the calculator to track progress.",
  proTip2: "Use the dominant parent breed size when estimating mixed breeds.",
  proTip3: "Large and giant breeds take 15–24 months to reach full size—be patient.",
  proTip4: "Choose crate and food formulas based on expected adult size, not current puppy size.",
  proTip5: "Sudden weight changes after illness—re-weigh after two stable weeks before estimating.",
};

export default function PuppyWeightCalculatorClient({
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

  const [breedSize, setBreedSize] = useState<BreedSize | "">("");
  const [age, setAge] = useState("10");
  const [ageUnit, setAgeUnit] = useState<AgeUnit>("weeks");
  const [weight, setWeight] = useState("6.5");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");
  const [breedType, setBreedType] = useState<BreedType>("pure");
  const [pureBreedName, setPureBreedName] = useState("");
  const [gender, setGender] = useState<Gender>("none");
  const [result, setResult] = useState<PuppyWeightResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sectionIconClass = "text-emerald-600 flex-shrink-0 mt-0.5";

  const compute = useCallback(() => {
    const nextErr: Record<string, string> = {};
    if (!breedSize) nextErr.breedSize = c.errBreedSize ?? "Select breed size.";

    const ageNum = Number.parseFloat(age);
    const weightNum = Number.parseFloat(weight);

    if (!Number.isFinite(ageNum) || ageNum <= 0) {
      nextErr.age = c.errAge ?? "Invalid age.";
    }

    if (!Number.isFinite(weightNum) || weightNum <= 0) {
      nextErr.weight = c.errWeight ?? "Invalid weight.";
    }

    setErrors(nextErr);
    if (Object.keys(nextErr).length > 0 || !breedSize) {
      setResult(null);
      return;
    }

    const out = calculatePuppyWeight({
      breedSize,
      age: ageNum,
      ageUnit,
      currentWeight: weightNum,
      weightUnit,
      breedType,
      pureBreedName: pureBreedName.trim() || undefined,
      gender,
    });

    if (!out) {
      setErrors({ age: c.errAge ?? "Age must be between 4 and 52 weeks equivalent." });
      setResult(null);
      return;
    }

    setResult(out);
    scrollToRef(resultsRef);
  }, [
    breedSize,
    age,
    ageUnit,
    weight,
    weightUnit,
    breedType,
    pureBreedName,
    gender,
    scrollToRef,
    c.errBreedSize,
    c.errAge,
    c.errWeight,
  ]);

  const reset = useCallback(() => {
    setBreedSize("");
    setAge("10");
    setAgeUnit("weeks");
    setWeight("6.5");
    setWeightUnit("kg");
    setBreedType("pure");
    setPureBreedName("");
    setGender("none");
    setResult(null);
    setErrors({});
  }, []);

  const formCard = (
    <Card className="shadow-lg border border-gray-200/80 bg-white">
      <CardContent className="p-6 space-y-8">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Dog className={`w-5 h-5 ${sectionIconClass}`} />
            <div className="flex-1 space-y-4">
              <Label className="text-sm font-semibold text-gray-800">{c.sectionPuppy}</Label>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">{c.labelAge}</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    type="number"
                    min={0.5}
                    step={0.5}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="10"
                    className="h-11 rounded-xl"
                    aria-invalid={!!errors.age}
                  />
                  <Select value={ageUnit} onValueChange={(v) => setAgeUnit(v as AgeUnit)}>
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weeks">{c.ageWeeks}</SelectItem>
                      <SelectItem value="months">{c.ageMonths}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {c.hintAge ? (
                  <p className="text-sm text-gray-500 leading-relaxed">{c.hintAge}</p>
                ) : null}
                {errors.age ? <p className="text-sm text-red-600">{errors.age}</p> : null}
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">{c.labelWeight}</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    type="number"
                    min={0.1}
                    step={0.1}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="6.5"
                    className="h-11 rounded-xl"
                    aria-invalid={!!errors.weight}
                  />
                  <Select value={weightUnit} onValueChange={(v) => setWeightUnit(v as WeightUnit)}>
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">{c.weightKg}</SelectItem>
                      <SelectItem value="lbs">{c.weightLbs}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {c.hintWeight ? (
                  <p className="text-sm text-gray-500 italic">{c.hintWeight}</p>
                ) : null}
                {errors.weight ? <p className="text-sm text-red-600">{errors.weight}</p> : null}
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">{c.labelBreedSize}</Label>
                <Select
                  value={breedSize || undefined}
                  onValueChange={(v) => setBreedSize(v as BreedSize)}
                >
                  <SelectTrigger className="h-11 rounded-xl" aria-invalid={!!errors.breedSize}>
                    <SelectValue placeholder={c.placeholderBreedSize} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toy">{c.breedToy}</SelectItem>
                    <SelectItem value="small">{c.breedSmall}</SelectItem>
                    <SelectItem value="medium">{c.breedMedium}</SelectItem>
                    <SelectItem value="large">{c.breedLarge}</SelectItem>
                    <SelectItem value="giant">{c.breedGiant}</SelectItem>
                  </SelectContent>
                </Select>
                {c.hintBreedSize ? (
                  <p className="text-sm text-gray-500 leading-relaxed">{c.hintBreedSize}</p>
                ) : null}
                {errors.breedSize ? (
                  <p className="text-sm text-red-600">{errors.breedSize}</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Scale className={`w-5 h-5 ${sectionIconClass}`} />
            <div className="flex-1 space-y-4">
              <Label className="text-sm font-semibold text-gray-800">{c.sectionOptional}</Label>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">{c.labelBreedType}</Label>
                <Select value={breedType} onValueChange={(v) => setBreedType(v as BreedType)}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mixed">{c.breedTypeMixed}</SelectItem>
                    <SelectItem value="pure">{c.breedTypePure}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {breedType === "pure" ? (
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">{c.labelPureBreed}</Label>
                  <Input
                    type="text"
                    value={pureBreedName}
                    onChange={(e) => setPureBreedName(e.target.value)}
                    placeholder={c.placeholderPureBreed}
                    className="h-11 rounded-xl"
                  />
                  {c.hintPureBreed ? (
                    <p className="text-sm text-gray-500 italic">{c.hintPureBreed}</p>
                  ) : null}
                </div>
              ) : null}

              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">{c.labelGender}</Label>
                <Select value={gender} onValueChange={(v) => setGender(v as Gender)}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">{c.genderNone}</SelectItem>
                    <SelectItem value="male">{c.genderMale}</SelectItem>
                    <SelectItem value="female">{c.genderFemale}</SelectItem>
                  </SelectContent>
                </Select>
                {c.hintGender ? (
                  <p className="text-sm text-gray-500 leading-relaxed">{c.hintGender}</p>
                ) : null}
              </div>
            </div>
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

  const displayUnit = result?.weightUnit ?? weightUnit;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                <Dog className="w-8 h-8 text-white" />
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
                      <Dog className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-lg font-semibold text-gray-800 mb-2">{c.emptyTitle}</p>
                      <p className="text-gray-600 max-w-md mx-auto">{c.emptyHint}</p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                        <p className="text-sm text-emerald-950/90 leading-relaxed flex items-start gap-2">
                          <TrendingUp className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          {result.summary}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 sm:col-span-2">
                          <p className="text-xs font-medium text-emerald-900 uppercase tracking-wide flex items-center gap-1">
                            <Scale className="w-3.5 h-3.5" />
                            {c.metricAdultWeight}
                          </p>
                          <p className="text-3xl font-bold text-emerald-900 tabular-nums">
                            {formatWeight(result.estimatedAdultWeightKg, displayUnit)}
                          </p>
                        </div>
                        <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4 sm:col-span-2">
                          <p className="text-xs font-medium text-blue-800 uppercase tracking-wide">
                            {c.metricWeightRange}
                          </p>
                          <p className="text-2xl font-bold text-blue-700 tabular-nums">
                            {formatWeight(result.minWeightKg, displayUnit)} –{" "}
                            {formatWeight(result.maxWeightKg, displayUnit)}
                          </p>
                        </div>
                        <div className="rounded-xl border border-violet-100 bg-violet-50/40 p-4">
                          <p className="text-xs font-medium text-violet-800 uppercase tracking-wide">
                            {c.metricGrowthFactor}
                          </p>
                          <p className="text-2xl font-bold text-violet-700 tabular-nums">
                            ×{result.growthFactor}
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                          <p className="text-xs font-medium text-slate-700 uppercase tracking-wide">
                            {c.metricGrowthStage}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {result.growthCompletionPct.toFixed(0)}%
                          </p>
                        </div>
                        <div className="rounded-xl border border-teal-100 bg-teal-50/40 p-4">
                          <p className="text-xs font-medium text-teal-800 uppercase tracking-wide">
                            {c.metricBreedCategory}
                          </p>
                          <p className="text-2xl font-bold text-teal-700">
                            {result.breedSizeCategory}
                          </p>
                        </div>
                        <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-4">
                          <p className="text-xs font-medium text-amber-800 uppercase tracking-wide">
                            {c.metricSizeClass}
                          </p>
                          <p className="text-2xl font-bold text-amber-700">
                            {result.predictedSizeClassification}
                          </p>
                        </div>
                        <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4 sm:col-span-2">
                          <p className="text-xs font-medium text-indigo-800 uppercase tracking-wide flex items-center gap-1">
                            <Timer className="w-3.5 h-3.5" />
                            {c.metricFullGrowth}
                          </p>
                          <p className="text-xl font-bold text-indigo-700">{result.fullGrowthMonths}</p>
                        </div>
                      </div>

                      {result.milestones.length > 0 ? (
                        <div className="rounded-xl border border-gray-200 overflow-hidden">
                          <div className="bg-slate-50 px-4 py-3 border-b">
                            <p className="text-sm font-semibold text-gray-800">{c.metricBreakdown}</p>
                          </div>
                          <div className="max-h-48 overflow-y-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-white sticky top-0">
                                <tr className="text-left text-gray-500 border-b">
                                  <th className="px-4 py-2 font-medium">{c.breakdownAge}</th>
                                  <th className="px-4 py-2 font-medium">{c.breakdownWeight}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {result.milestones.map((row) => (
                                  <tr key={row.label} className="border-b border-gray-100 last:border-0">
                                    <td className="px-4 py-2 font-medium text-gray-800">{row.label}</td>
                                    <td className="px-4 py-2 tabular-nums text-emerald-700">
                                      {formatWeight(row.weightKg, displayUnit)}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : null}
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
            entityId="puppy-weight-calculator"
            entityType="calculator"
            creatorSlug="neo-nicholas"
            initialRatingTotal={0}
            initialRatingCount={0}
          />

          <CalculatorGuide data={guideData} layout="article" />

          <SimilarCalculators
            calculators={[
              {
                calculatorName: "Healthy Weight Calculator",
                calculatorHref: "/health/healthy-weight-calculator",
                calculatorDescription:
                  "Calculate ideal body weight ranges based on height, gender, and frame size.",
              },
              {
                calculatorName: "Calorie Calculator",
                calculatorHref: "/health/calorie-calculator",
                calculatorDescription:
                  "Estimate daily calorie needs based on activity level and goals.",
              },
              {
                calculatorName: "BMI Calculator",
                calculatorHref: "/health/bmi-calculator",
                calculatorDescription: "Calculate body mass index for health and fitness tracking.",
              },
            ]}
          />
        </div>
      </main>
    </div>
  );
}
