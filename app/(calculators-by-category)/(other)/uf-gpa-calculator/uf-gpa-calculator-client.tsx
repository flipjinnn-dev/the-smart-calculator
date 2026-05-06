"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Plus, X, Calculator, Sparkles } from "lucide-react";
import CalculatorGuide, { type CalculatorGuideData } from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from "@/components/rating-profile-section";
import { cn } from "@/lib/utils";

const UF_GRADE_ORDER = [
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "D+",
  "D",
  "D-",
  "F",
] as const;

const UF_GRADE_POINTS: Record<(typeof UF_GRADE_ORDER)[number], number> = {
  A: 4,
  "A-": 3.67,
  "B+": 3.33,
  B: 3,
  "B-": 2.67,
  "C+": 2.33,
  C: 2,
  "C-": 1.67,
  "D+": 1.33,
  D: 1,
  "D-": 0.67,
  F: 0,
};

type UfGrade = (typeof UF_GRADE_ORDER)[number];

interface CourseRow {
  id: string;
  name: string;
  grade: UfGrade | "";
  credits: string;
}

function newRow(): CourseRow {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    name: "",
    grade: "",
    credits: "",
  };
}

interface Props {
  content: Record<string, unknown>;
  guideContent: Record<string, unknown>;
}

export default function UfGpaCalculatorClient({ content, guideContent }: Props) {
  const c = content as {
    pageTitle?: string;
    pageSubtitle?: string;
    form?: Record<string, unknown>;
    results?: Record<string, unknown>;
    errors?: Record<string, unknown>;
  };

  const form = (c.form || {}) as {
    headers?: { course?: string; grade?: string; credits?: string };
    placeholders?: { course?: string; credits?: string };
    gradePlaceholder?: string;
    addRow?: string;
    calculate?: string;
    reset?: string;
    priorSectionTitle?: string;
    priorSectionHint?: string;
    priorGpaLabel?: string;
    priorCreditsLabel?: string;
    includePrior?: string;
  };

  const results = (c.results || {}) as {
    title?: string;
    gpa?: string;
    semesterGpa?: string;
    gradePoints?: string;
    credits?: string;
    dpc?: string;
    dpcHint?: string;
  };

  const errors = (c.errors || {}) as {
    needRow?: string;
    invalidCredits?: string;
    invalidPrior?: string;
  };

  const [rows, setRows] = useState<CourseRow[]>(() => [newRow(), newRow(), newRow(), newRow()]);
  const [includePrior, setIncludePrior] = useState(false);
  const [priorGpa, setPriorGpa] = useState("");
  const [priorCredits, setPriorCredits] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [computed, setComputed] = useState<{
    cumulativeGpa: number;
    semesterGpa: number;
    totalPoints: number;
    totalCredits: number;
    dpc: number;
  } | null>(null);

  const gradeOptions = useMemo(
    () =>
      UF_GRADE_ORDER.map((g) => ({
        value: g,
        label: `${g} (${UF_GRADE_POINTS[g].toFixed(2)})`,
      })),
    []
  );

  const updateRow = (id: string, patch: Partial<CourseRow>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const removeRow = (id: string) => {
    setRows((prev) => (prev.length <= 1 ? prev : prev.filter((r) => r.id !== id)));
  };

  const addRow = () => setRows((prev) => [...prev, newRow()]);

  const resetAll = () => {
    setRows([newRow(), newRow(), newRow(), newRow()]);
    setIncludePrior(false);
    setPriorGpa("");
    setPriorCredits("");
    setError(null);
    setComputed(null);
  };

  const calculate = () => {
    setError(null);

    let termPoints = 0;
    let termCredits = 0;
    let filled = 0;

    for (const r of rows) {
      const cred = Number.parseFloat(r.credits);
      if (!r.grade && (!r.credits || r.credits.trim() === "")) continue;
      if (!r.grade || !Number.isFinite(cred) || cred <= 0) {
        if (r.grade || (r.credits && r.credits.trim() !== "")) {
          setError(errors.invalidCredits || "Check each row: select a grade and enter credits > 0.");
          return;
        }
        continue;
      }
      const pts = UF_GRADE_POINTS[r.grade as UfGrade];
      termPoints += pts * cred;
      termCredits += cred;
      filled++;
    }

    if (filled === 0) {
      setError(errors.needRow || "Add at least one course with credits and a grade.");
      return;
    }

    let priorPts = 0;
    let priorCred = 0;
    if (includePrior) {
      const pg = Number.parseFloat(priorGpa);
      const pc = Number.parseFloat(priorCredits);
      if (!Number.isFinite(pg) || pg < 0 || pg > 4 || !Number.isFinite(pc) || pc <= 0) {
        setError(errors.invalidPrior || "Prior GPA and credits must be valid.");
        return;
      }
      priorPts = pg * pc;
      priorCred = pc;
    }

    const totalPoints = termPoints + priorPts;
    const totalCredits = termCredits + priorCred;
    const cumulativeGpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    const semesterGpa = termCredits > 0 ? termPoints / termCredits : 0;
    const rawDpc = totalCredits * 2 - totalPoints;
    const dpc = cumulativeGpa >= 2 ? 0 : Math.max(0, rawDpc);

    setComputed({
      cumulativeGpa,
      semesterGpa,
      totalPoints,
      totalCredits,
      dpc,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50">
      <div className="container mx-auto max-w-4xl px-4 py-10 sm:py-14">
        <header className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 text-white shadow-lg mb-5">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            {c.pageTitle || "UF GPA Calculator"}
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {c.pageSubtitle ||
              "Enter your grades and credit hours this free UF GPA Calculator instantly applies UF's official grading scale and gives you your accurate semester, cumulative, or science GPA in seconds."}
          </p>
        </header>

        <Card className="border-0 shadow-xl shadow-sky-900/10 rounded-2xl overflow-hidden bg-white/90 backdrop-blur ring-1 ring-sky-100">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-sky-100/90 via-blue-50 to-sky-50/80 px-4 sm:px-6 py-4 border-b border-sky-100/80">
              <div className="grid grid-cols-12 gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wide">
                <div className="col-span-12 sm:col-span-4">{form.headers?.course || "Course"}</div>
                <div className="col-span-7 sm:col-span-5">
                  {form.headers?.grade || "Grade (points)"}
                </div>
                <div className="col-span-5 sm:col-span-2 text-right sm:text-left">
                  {form.headers?.credits || "Credits"}
                </div>
                <div className="hidden sm:block sm:col-span-1" aria-hidden />
              </div>
            </div>

            <div className="px-3 sm:px-5 py-4 space-y-3 bg-sky-50/40">
              {rows.map((row) => (
                <div
                  key={row.id}
                  className="grid grid-cols-12 gap-2 sm:gap-3 items-center rounded-xl bg-white/95 p-3 shadow-sm border border-sky-100/80 hover:border-sky-200 transition-colors"
                >
                  <div className="col-span-12 sm:col-span-4">
                    <Input
                      className="h-11 rounded-lg border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
                      placeholder={form.placeholders?.course || "Course"}
                      value={row.name}
                      onChange={(e) => updateRow(row.id, { name: e.target.value })}
                      aria-label="Course name"
                    />
                  </div>
                  <div className="col-span-7 sm:col-span-5">
                    <Select
                      value={row.grade || undefined}
                      onValueChange={(v) => updateRow(row.id, { grade: v as UfGrade })}
                    >
                      <SelectTrigger className="h-11 w-full rounded-lg border-slate-200 bg-white">
                        <SelectValue placeholder={form.gradePlaceholder || "Select grade"} />
                      </SelectTrigger>
                      <SelectContent>
                        {gradeOptions.map((o) => (
                          <SelectItem key={o.value} value={o.value}>
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-5 sm:col-span-2 flex gap-2 items-center justify-end sm:justify-start">
                    <Input
                      type="number"
                      inputMode="decimal"
                      min={0}
                      step="any"
                      className="h-11 rounded-lg border-slate-200 bg-white text-slate-900 tabular-nums"
                      placeholder={form.placeholders?.credits || "0"}
                      value={row.credits}
                      onChange={(e) => updateRow(row.id, { credits: e.target.value })}
                      aria-label="Credits"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-11 w-11 shrink-0 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50"
                      onClick={() => removeRow(row.id)}
                      aria-label="Remove row"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 sm:px-6 py-5 flex flex-wrap items-center gap-3 border-t border-sky-100/80 bg-white">
              <Button
                type="button"
                size="icon"
                className="h-11 w-11 rounded-xl bg-blue-700 hover:bg-blue-800 text-white shadow-md"
                onClick={addRow}
                aria-label={form.addRow || "Add course"}
              >
                <Plus className="w-5 h-5" />
              </Button>
              <span className="text-sm text-slate-600 font-medium">{form.addRow || "Add course"}</span>
            </div>

            <div className="px-4 sm:px-6 pb-6 space-y-5 bg-white border-t border-slate-100">
              <div className="rounded-xl border border-slate-200/90 bg-slate-50/50 p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="max-w-xl space-y-2.5">
                    <Label htmlFor="uf-prior-toggle" className="text-base font-semibold text-slate-900 block leading-snug">
                      {form.includePrior || "Include prior cumulative GPA"}
                    </Label>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {form.priorSectionHint ||
                        "Combine this term with past UF GPA and credits for cumulative GPA."}
                    </p>
                  </div>
                  <Switch
                    id="uf-prior-toggle"
                    checked={includePrior}
                    onCheckedChange={setIncludePrior}
                  />
                </div>
                {includePrior ? (
                  <div className="grid sm:grid-cols-2 gap-4 mt-5">
                    <div>
                      <Label className="text-slate-700">{form.priorGpaLabel || "Prior cumulative GPA"}</Label>
                      <Input
                        type="number"
                        step="any"
                        className="mt-1.5 h-11 rounded-lg"
                        placeholder="e.g. 3.45"
                        value={priorGpa}
                        onChange={(e) => setPriorGpa(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-slate-700">{form.priorCreditsLabel || "Prior UF credits"}</Label>
                      <Input
                        type="number"
                        step="any"
                        className="mt-1.5 h-11 rounded-lg"
                        placeholder="e.g. 60"
                        value={priorCredits}
                        onChange={(e) => setPriorCredits(e.target.value)}
                      />
                    </div>
                  </div>
                ) : null}
              </div>

              {error ? (
                <p className="text-sm text-red-600 font-medium px-1" role="alert">
                  {error}
                </p>
              ) : null}

              <div className="flex flex-col sm:flex-row gap-3 sm:justify-center">
                <Button
                  type="button"
                  size="lg"
                  className={cn(
                    "w-full sm:w-auto min-w-[200px] h-12 rounded-xl text-base font-bold uppercase tracking-wide",
                    "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-600/25",
                    "text-white hover:text-white [&_svg]:text-white"
                  )}
                  onClick={calculate}
                >
                  <Calculator className="w-5 h-5 mr-2 shrink-0" aria-hidden />
                  {form.calculate || "Calculate"}
                </Button>
                <Button type="button" variant="outline" size="lg" className="rounded-xl h-12" onClick={resetAll}>
                  {form.reset || "Reset"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {computed ? (
          <Card className="mt-8 border-0 shadow-lg rounded-2xl overflow-hidden ring-1 ring-slate-200/80">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-bold text-slate-900">{results.title || "Your results"}</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 p-5 text-white shadow-md">
                  <p className="text-blue-100 text-sm font-medium uppercase tracking-wide">
                    {results.gpa || "Cumulative GPA"}
                  </p>
                  <p className="text-4xl font-bold tabular-nums mt-1">{computed.cumulativeGpa.toFixed(2)}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-5">
                  <p className="text-slate-500 text-sm font-medium">{results.semesterGpa || "This term only"}</p>
                  <p className="text-2xl font-bold text-slate-900 tabular-nums mt-1">
                    {computed.semesterGpa.toFixed(2)}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 p-5">
                  <p className="text-slate-500 text-sm">{results.gradePoints || "Total grade points"}</p>
                  <p className="text-xl font-semibold tabular-nums text-slate-900 mt-1">
                    {computed.totalPoints.toFixed(2)}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 p-5">
                  <p className="text-slate-500 text-sm">{results.credits || "Total credits"}</p>
                  <p className="text-xl font-semibold tabular-nums text-slate-900 mt-1">
                    {computed.totalCredits.toFixed(2)}
                  </p>
                </div>
                <div className="sm:col-span-2 rounded-xl border border-amber-200 bg-amber-50/60 p-5">
                  <p className="text-amber-900 text-sm font-semibold">{results.dpc || "Grade point deficit (DPC)"}</p>
                  <p className="text-2xl font-bold tabular-nums text-amber-950 mt-1">{computed.dpc.toFixed(2)}</p>
                  <p className="text-sm text-amber-900/80 mt-2 leading-relaxed">
                    {results.dpcHint ||
                      "Points below a 2.0 average on entered credits. Zero if GPA ≥ 2.0."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}

        <div className="mt-12">
          <RatingProfileSection
            entityId="uf-gpa-calculator"
            entityType="calculator"
            creatorSlug="felix-yacoub"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
        </div>

        <div className="mt-12">
          <CalculatorGuide
            data={
              {
                color: "blue",
                sections: [],
                faq: [],
                ...(typeof guideContent === "object" && guideContent !== null ? guideContent : {}),
              } as CalculatorGuideData
            }
          />
        </div>

        <div className="mt-12">
          <SimilarCalculators
            calculators={[
              {
                calculatorName: "GPA Calculator",
                calculatorHref: "/gpa-calculator",
                calculatorDescription: "General GPA with multiple semesters and grade formats",
              },
              {
                calculatorName: "SSC GPA Calculator",
                calculatorHref: "/ssc-gpa-calculator",
                calculatorDescription: "Secondary school certificate GPA style calculations",
              },
            ]}
            color="blue"
            title="Related calculators"
          />
        </div>
      </div>
    </div>
  );
}
