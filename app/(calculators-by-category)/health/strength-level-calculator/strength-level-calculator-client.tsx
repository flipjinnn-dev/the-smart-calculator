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
  Dumbbell,
  Info,
  Lightbulb,
  RotateCcw,
  Target,
  TrendingUp,
  User,
} from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide, { type CalculatorGuideData } from "@/components/calculator-guide";
import { RatingProfileSection } from "@/components/rating-profile-section";

type Exercise = "bench" | "squat" | "deadlift" | "ohp";
type Gender = "male" | "female";
type Unit = "kg" | "lbs";
type StrengthLevel = "Beginner" | "Novice" | "Intermediate" | "Advanced" | "Elite";

const LEVELS: StrengthLevel[] = ["Beginner", "Novice", "Intermediate", "Advanced", "Elite"];

const LEVEL_PERCENTILE: Record<StrengthLevel, number> = {
  Beginner: 20,
  Novice: 45,
  Intermediate: 65,
  Advanced: 88,
  Elite: 98,
};

/** Male bodyweight-relative 1RM/BW upper bounds per level (Elite = above Advanced). */
const RATIO_THRESHOLDS: Record<
  Exercise,
  { beginner: number; novice: number; intermediate: number; advanced: number }
> = {
  bench: { beginner: 0.5, novice: 0.75, intermediate: 1.0, advanced: 1.25 },
  squat: { beginner: 0.75, novice: 1.0, intermediate: 1.25, advanced: 1.5 },
  deadlift: { beginner: 1.0, novice: 1.25, intermediate: 1.5, advanced: 1.75 },
  ohp: { beginner: 0.35, novice: 0.5, intermediate: 0.65, advanced: 0.8 },
};

const FEMALE_FACTOR = 0.68;

const EXERCISE_LABEL: Record<Exercise, string> = {
  bench: "Bench Press",
  squat: "Squat",
  deadlift: "Deadlift",
  ohp: "Overhead Press",
};

function epley1RM(weight: number, reps: number): number {
  return weight * (1 + reps / 30);
}

function classifyStrength(
  ratio: number,
  exercise: Exercise,
  gender: Gender
): StrengthLevel {
  const t = RATIO_THRESHOLDS[exercise];
  const m = gender === "female" ? FEMALE_FACTOR : 1;
  if (ratio < t.beginner * m) return "Beginner";
  if (ratio < t.novice * m) return "Novice";
  if (ratio < t.intermediate * m) return "Intermediate";
  if (ratio < t.advanced * m) return "Advanced";
  return "Elite";
}

function getThresholds(exercise: Exercise, gender: Gender) {
  const t = RATIO_THRESHOLDS[exercise];
  const m = gender === "female" ? FEMALE_FACTOR : 1;
  return {
    beginner: t.beginner * m,
    novice: t.novice * m,
    intermediate: t.intermediate * m,
    advanced: t.advanced * m,
  };
}

function nextLevelTarget(
  level: StrengthLevel,
  exercise: Exercise,
  gender: Gender,
  bodyWeight: number
): { nextLevel: StrengthLevel | null; target1RM: number | null } {
  if (level === "Elite") return { nextLevel: null, target1RM: null };
  const idx = LEVELS.indexOf(level);
  const nextLevel = LEVELS[idx + 1];
  const th = getThresholds(exercise, gender);
  const ratioTarget =
    nextLevel === "Novice"
      ? th.beginner
      : nextLevel === "Intermediate"
        ? th.novice
        : nextLevel === "Advanced"
          ? th.intermediate
          : th.advanced;
  return { nextLevel, target1RM: Math.round(ratioTarget * bodyWeight * 10) / 10 };
}

interface StrengthResult {
  oneRepMax: number;
  relativeStrength: number;
  level: StrengthLevel;
  percentile: number;
  unit: Unit;
  exerciseLabel: string;
  comparisonMessage: string;
  nextGoalMessage: string;
  levelIndex: number;
}

interface ContentShape {
  pageTitle?: string;
  pageDescription?: string;
  sectionProfile?: string;
  sectionLift?: string;
  labelGender?: string;
  genderMale?: string;
  genderFemale?: string;
  labelAge?: string;
  labelBodyWeight?: string;
  labelExercise?: string;
  exerciseBench?: string;
  exerciseSquat?: string;
  exerciseDeadlift?: string;
  exerciseOhp?: string;
  labelWeightLifted?: string;
  labelReps?: string;
  labelUnit?: string;
  unitKg?: string;
  unitLbs?: string;
  importantTitle?: string;
  importantBody?: string;
  btnCalculate?: string;
  btnReset?: string;
  resultsTitle?: string;
  resultsSubtitle?: string;
  emptyTitle?: string;
  emptyHint?: string;
  metric1RM?: string;
  metricRelative?: string;
  metricLevel?: string;
  metricPercentile?: string;
  progressTitle?: string;
  nextGoalTitle?: string;
  proTipsTitle?: string;
  proTip1?: string;
  proTip2?: string;
  proTip3?: string;
  proTip4?: string;
  proTip5?: string;
  errBodyWeight?: string;
  errWeight?: string;
  errReps?: string;
  errAge?: string;
}

const defaultContent: ContentShape = {
  pageTitle: "Strength Level Calculator",
  pageDescription:
    "Calculate your estimated 1RM, compare against strength standards, and see your bench, squat, deadlift, or overhead press level.",
};

export default function StrengthLevelCalculatorClient({
  content,
  guideContent,
}: {
  content: ContentShape | null;
  guideContent: CalculatorGuideData | null;
}) {
  const c = { ...defaultContent, ...content };
  const guideData: CalculatorGuideData = guideContent ?? {
    color: "green",
    sections: [],
    faq: [],
  };

  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();

  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState("25");
  const [bodyWeight, setBodyWeight] = useState("80");
  const [unit, setUnit] = useState<Unit>("kg");
  const [exercise, setExercise] = useState<Exercise>("bench");
  const [weightLifted, setWeightLifted] = useState("80");
  const [reps, setReps] = useState("5");
  const [result, setResult] = useState<StrengthResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const compute = useCallback(() => {
    const nextErr: Record<string, string> = {};
    const bw = Number.parseFloat(bodyWeight);
    const w = Number.parseFloat(weightLifted);
    const r = Number.parseInt(reps, 10);
    const a = Number.parseInt(age, 10);

    if (!Number.isFinite(bw) || bw <= 0) nextErr.bodyWeight = c.errBodyWeight;
    if (!Number.isFinite(w) || w <= 0) nextErr.weight = c.errWeight;
    if (!Number.isFinite(r) || r < 1 || r > 15) nextErr.reps = c.errReps;
    if (!Number.isFinite(a) || a < 13 || a > 100) nextErr.age = c.errAge;

    setErrors(nextErr);
    if (Object.keys(nextErr).length > 0) {
      setResult(null);
      return;
    }

    const oneRepMax = Math.round(epley1RM(w, r) * 10) / 10;
    const relativeStrength = Math.round((oneRepMax / bw) * 100) / 100;
    const level = classifyStrength(relativeStrength, exercise, gender);
    const levelIndex = LEVELS.indexOf(level);
    const exerciseLabel = EXERCISE_LABEL[exercise];
    const { nextLevel, target1RM } = nextLevelTarget(level, exercise, gender, bw);

    const comparisonMessage = `You are currently at **${level}** level for ${exerciseLabel} based on your body weight and gender.`;
    let nextGoalMessage =
      "You are at Elite level — maintain periodized training, recovery, and technique to keep progressing.";
    if (nextLevel && target1RM !== null) {
      nextGoalMessage = `Reach **${nextLevel}** by building toward an estimated **${target1RM} ${unit}** 1RM (${(target1RM / bw).toFixed(2)}× bodyweight).`;
    }

    setResult({
      oneRepMax,
      relativeStrength,
      level,
      percentile: LEVEL_PERCENTILE[level],
      unit,
      exerciseLabel,
      comparisonMessage: comparisonMessage.replace(/\*\*/g, ""),
      nextGoalMessage: nextGoalMessage.replace(/\*\*/g, ""),
      levelIndex,
    });
    scrollToRef(resultsRef);
  }, [
    bodyWeight,
    weightLifted,
    reps,
    age,
    exercise,
    gender,
    unit,
    scrollToRef,
    c.errBodyWeight,
    c.errWeight,
    c.errReps,
    c.errAge,
  ]);

  const reset = useCallback(() => {
    setGender("male");
    setAge("25");
    setBodyWeight("80");
    setUnit("kg");
    setExercise("bench");
    setWeightLifted("80");
    setReps("5");
    setResult(null);
    setErrors({});
  }, []);

  const sectionIcon = "text-emerald-600 flex-shrink-0 mt-0.5";

  const formCard = (
    <Card className="shadow-lg border border-gray-200/80 bg-white">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-100/80 py-5 px-6">
        <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 text-gray-900">
          <Calculator className="w-6 h-6 text-emerald-600" />
          Inputs
        </CardTitle>
        <CardDescription className="text-base text-gray-600">
          Enter your profile and lift details. We estimate 1RM with the Epley formula, then compare to
          strength standards.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <User className={`w-5 h-5 ${sectionIcon}`} />
            <div className="flex-1 space-y-4">
              <Label className="text-sm font-semibold text-gray-800">{c.sectionProfile}</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">{c.labelGender}</Label>
                  <RadioGroup
                    value={gender}
                    onValueChange={(v) => setGender(v as Gender)}
                    className="flex gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="male" id="gender-male" />
                      <Label htmlFor="gender-male" className="font-normal cursor-pointer">
                        {c.genderMale}
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="female" id="gender-female" />
                      <Label htmlFor="gender-female" className="font-normal cursor-pointer">
                        {c.genderFemale}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">{c.labelAge}</Label>
                  <Input
                    type="number"
                    min={13}
                    max={100}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="h-11 rounded-xl"
                    aria-invalid={!!errors.age}
                  />
                  {errors.age ? <p className="text-sm text-emerald-600">{errors.age}</p> : null}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">{c.labelBodyWeight}</Label>
                  <Input
                    type="number"
                    min={0.1}
                    step={0.1}
                    value={bodyWeight}
                    onChange={(e) => setBodyWeight(e.target.value)}
                    className="h-11 rounded-xl"
                    aria-invalid={!!errors.bodyWeight}
                  />
                  {errors.bodyWeight ? (
                    <p className="text-sm text-emerald-600">{errors.bodyWeight}</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">{c.labelUnit}</Label>
                  <Select value={unit} onValueChange={(v) => setUnit(v as Unit)}>
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">{c.unitKg}</SelectItem>
                      <SelectItem value="lbs">{c.unitLbs}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <Dumbbell className={`w-5 h-5 ${sectionIcon}`} />
            <div className="flex-1 space-y-4">
              <Label className="text-sm font-semibold text-gray-800">{c.sectionLift}</Label>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">{c.labelExercise}</Label>
                <Select value={exercise} onValueChange={(v) => setExercise(v as Exercise)}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bench">{c.exerciseBench}</SelectItem>
                    <SelectItem value="squat">{c.exerciseSquat}</SelectItem>
                    <SelectItem value="deadlift">{c.exerciseDeadlift}</SelectItem>
                    <SelectItem value="ohp">{c.exerciseOhp}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">{c.labelWeightLifted}</Label>
                  <Input
                    type="number"
                    min={0.1}
                    step={0.1}
                    value={weightLifted}
                    onChange={(e) => setWeightLifted(e.target.value)}
                    className="h-11 rounded-xl"
                    aria-invalid={!!errors.weight}
                  />
                  {errors.weight ? <p className="text-sm text-emerald-600">{errors.weight}</p> : null}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">{c.labelReps}</Label>
                  <Input
                    type="number"
                    min={1}
                    max={15}
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    className="h-11 rounded-xl"
                    aria-invalid={!!errors.reps}
                  />
                  {errors.reps ? <p className="text-sm text-emerald-600">{errors.reps}</p> : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/90 p-4 flex gap-3">
          <Info className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-emerald-900 text-sm mb-1">{c.importantTitle}</p>
            <p className="text-sm text-emerald-950/90 leading-relaxed">{c.importantBody}</p>
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 flex items-center justify-center shadow-lg">
                <Dumbbell className="w-8 h-8 text-white" />
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
                      <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-lg font-semibold text-gray-800 mb-2">{c.emptyTitle}</p>
                      <p className="text-gray-600 max-w-md mx-auto">{c.emptyHint}</p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
                          <p className="text-xs font-medium text-emerald-800 uppercase tracking-wide">
                            {c.metric1RM}
                          </p>
                          <p className="text-3xl font-bold text-gray-900 tabular-nums">
                            {result.oneRepMax}{" "}
                            <span className="text-lg font-semibold text-emerald-700">{result.unit}</span>
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                          <p className="text-xs font-medium text-slate-700 uppercase tracking-wide">
                            {c.metricRelative}
                          </p>
                          <p className="text-3xl font-bold text-gray-900 tabular-nums">
                            {result.relativeStrength}
                            <span className="text-lg font-semibold text-slate-600">× BW</span>
                          </p>
                        </div>
                      </div>

                      <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 p-4">
                        <p className="text-xs font-medium text-emerald-900 uppercase tracking-wide">
                          {c.metricLevel}
                        </p>
                        <p className="text-3xl font-bold text-emerald-900">{result.level}</p>
                        <p className="text-sm text-emerald-800/90 mt-2">{result.comparisonMessage}</p>
                      </div>

                      <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 flex gap-3">
                        <TrendingUp className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-emerald-900 uppercase tracking-wide">
                            {c.metricPercentile}
                          </p>
                          <p className="text-xl font-bold text-emerald-950">
                            ~{result.percentile}th percentile (estimate)
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-800">{c.progressTitle}</p>
                        <div className="relative h-10 rounded-full overflow-hidden flex border border-gray-200">
                          {LEVELS.map((lvl, i) => (
                            <div
                              key={lvl}
                              className={`flex-1 flex items-center justify-center text-[10px] sm:text-xs font-semibold border-r border-white/40 last:border-r-0 ${
                                i === 0
                                  ? "bg-slate-200 text-slate-700"
                                  : i === 1
                                    ? "bg-green-100 text-green-800"
                                    : i === 2
                                      ? "bg-emerald-100 text-emerald-800"
                                      : i === 3
                                        ? "bg-green-100 text-green-900"
                                        : "bg-green-200 text-green-900"
                              } ${result.levelIndex === i ? "ring-2 ring-emerald-600 ring-inset z-10" : ""}`}
                            >
                              {lvl}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-xl border border-green-100 bg-green-50/60 p-4">
                        <p className="text-sm font-semibold text-green-950 mb-1">{c.nextGoalTitle}</p>
                        <p className="text-sm text-green-950/90 leading-relaxed">
                          {result.nextGoalMessage}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/90 p-5 shadow-sm">
                <p className="font-semibold text-emerald-950 flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5" />
                  {c.proTipsTitle}
                </p>
                <ul className="space-y-2 text-sm text-emerald-950/90 list-disc pl-5">
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
            entityId="strength-level-calculator"
            entityType="calculator"
            creatorSlug="simon-stephen"
            initialRatingTotal={0}
            initialRatingCount={0}
          />

          <CalculatorGuide data={guideData} layout="article" />

          <SimilarCalculators
            calculators={[
              {
                calculatorName: "One Rep Max Calculator",
                calculatorHref: "/health/one-rep-max-calculator",
                calculatorDescription:
                  "Estimate your 1RM using Epley, Brzycki, or Lombardi formulas.",
              },
              {
                calculatorName: "BMI Calculator",
                calculatorHref: "/health/bmi-calculator",
                calculatorDescription: "Check body mass index and weight category.",
              },
              {
                calculatorName: "Macro Calculator",
                calculatorHref: "/health/macro-calculator",
                calculatorDescription: "Plan protein, carbs, and fats for your training goals.",
              },
            ]}
            color="green"
            title="Related health & fitness calculators"
          />
        </div>
      </main>
    </div>
  );
}
