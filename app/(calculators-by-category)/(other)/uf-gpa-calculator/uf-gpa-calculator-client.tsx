"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, Calculator, Sparkles } from "lucide-react";
import CalculatorGuide, { type CalculatorGuideData } from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from "@/components/rating-profile-section";
import { cn } from "@/lib/utils";

const selectTriggerClass =
  "h-11 w-full rounded-xl border-2 border-gray-200 bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-200";

const rowInputClass =
  "h-11 rounded-xl border-2 border-gray-200 bg-white text-slate-900 placeholder:text-slate-400 shadow-sm focus-visible:border-blue-400 focus-visible:ring-blue-200";

/** Renders `**bold**` segments in hint strings (same convention as calculator guides). */
function renderHintWithBold(text: string): ReactNode {
  const parts = text.split(/(\*\*[\s\S]*?\*\*)/g);
  return parts.map((part, i) => {
    const m = part.match(/^\*\*([\s\S]*?)\*\*$/);
    if (m) {
      return (
        <strong key={i} className="font-bold text-amber-950">
          {m[1]}
        </strong>
      );
    }
    return part ? <span key={i}>{part}</span> : null;
  });
}

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
  };

  const [rows, setRows] = useState<CourseRow[]>(() => [newRow(), newRow(), newRow(), newRow()]);
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

    const totalPoints = termPoints;
    const totalCredits = termCredits;
    const semesterGpa = termCredits > 0 ? termPoints / termCredits : 0;
    const cumulativeGpa = semesterGpa;
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
            {c.pageTitle || "UF GPA Calculator"}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {c.pageSubtitle ||
              "Enter your grades and credit hours — this free UF GPA Calculator applies UF's official grading scale and shows semester, cumulative, and deficit figures in seconds."}
          </p>
        </div>

        <div className="mb-12">
          <Card className="border-2 border-blue-200 shadow-xl overflow-hidden">
            <CardHeader className="py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="text-2xl sm:text-3xl flex items-center gap-3">
                <Calculator className="w-8 h-8 shrink-0" aria-hidden />
                {c.pageTitle || "UF GPA Calculator"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-blue-50/90 via-white to-blue-50/60 px-4 sm:px-6 py-4 border-b border-blue-100">
                <div className="grid grid-cols-12 gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-gray-800 uppercase tracking-wide">
                  <div className="col-span-12 sm:col-span-4">{form.headers?.course || "Course"}</div>
                  <div className="col-span-7 sm:col-span-5">{form.headers?.grade || "Grade (points)"}</div>
                  <div className="col-span-5 sm:col-span-2 text-right sm:text-left">
                    {form.headers?.credits || "Credits"}
                  </div>
                  <div className="hidden sm:block sm:col-span-1" aria-hidden />
                </div>
              </div>

              <div className="px-3 sm:px-5 py-4 space-y-3 bg-blue-50/30">
                {rows.map((row) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-12 gap-2 sm:gap-3 items-center rounded-xl bg-white p-3 shadow-sm border-2 border-blue-100 hover:border-blue-200 transition-colors"
                  >
                    <div className="col-span-12 sm:col-span-4">
                      <Input
                        className={rowInputClass}
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
                        <SelectTrigger className={selectTriggerClass}>
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
                        className={cn(rowInputClass, "tabular-nums")}
                        placeholder={form.placeholders?.credits || "0"}
                        value={row.credits}
                        onChange={(e) => updateRow(row.id, { credits: e.target.value })}
                        aria-label="Credits"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-11 w-11 shrink-0 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50"
                        onClick={() => removeRow(row.id)}
                        aria-label="Remove row"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 sm:px-6 py-5 flex flex-wrap items-center gap-3 border-t border-blue-100 bg-white">
                <Button
                  type="button"
                  size="icon"
                  className="h-11 w-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md"
                  onClick={addRow}
                  aria-label={form.addRow || "Add course"}
                >
                  <Plus className="w-5 h-5" />
                </Button>
                <span className="text-sm text-gray-700 font-medium">{form.addRow || "Add course"}</span>
              </div>

              <div className="px-4 sm:px-6 pb-6 space-y-5 bg-white border-t border-gray-100">
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
                      "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-600/25",
                      "text-white hover:text-white [&_svg]:text-white"
                    )}
                    onClick={calculate}
                  >
                    <Calculator className="w-5 h-5 mr-2 shrink-0" aria-hidden />
                    {form.calculate || "Calculate"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="rounded-xl h-12 border-2 border-gray-200 hover:bg-blue-50"
                    onClick={resetAll}
                  >
                    {form.reset || "Reset"}
                  </Button>
                </div>
              </div>

              {computed ? (
                <div className="px-4 sm:px-6 py-6 sm:py-8 border-t border-blue-100 bg-gradient-to-br from-blue-50/90 to-sky-50/70">
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="w-6 h-6 text-blue-600" aria-hidden />
                    <h2 className="text-xl font-bold text-gray-900">{results.title || "Your results"}</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white shadow-md">
                      <p className="text-blue-100 text-sm font-medium uppercase tracking-wide">
                        {results.gpa || "GPA"}
                      </p>
                      <p className="text-4xl font-bold tabular-nums mt-1">{computed.semesterGpa.toFixed(2)}</p>
                    </div>
                    <div className="rounded-xl border-2 border-blue-100 bg-white p-5 shadow-sm">
                      <p className="text-gray-500 text-sm">{results.gradePoints || "Total grade points"}</p>
                      <p className="text-xl font-semibold tabular-nums text-gray-900 mt-1">
                        {computed.totalPoints.toFixed(2)}
                      </p>
                    </div>
                    <div className="rounded-xl border-2 border-blue-100 bg-white p-5 shadow-sm">
                      <p className="text-gray-500 text-sm">{results.credits || "Total credits"}</p>
                      <p className="text-xl font-semibold tabular-nums text-gray-900 mt-1">
                        {computed.totalCredits.toFixed(2)}
                      </p>
                    </div>
                    <div className="sm:col-span-2 rounded-xl border-2 border-amber-200 bg-amber-50/80 p-5">
                      <p className="text-amber-900 text-sm">
                        <strong className="font-bold text-amber-950">
                          {results.dpc || "Grade Point Deficit (GPD)"}
                        </strong>
                      </p>
                      <p className="text-2xl font-bold tabular-nums text-amber-950 mt-1">{computed.dpc.toFixed(2)}</p>
                      <p className="text-sm text-amber-900/85 mt-2 leading-relaxed">
                        {renderHintWithBold(
                          results.dpcHint ||
                            "At the **minimum 2.0 cumulative GPA** standard: (2.0 × total credits) − total quality points when below good standing. Shown as 0 if your GPA for entered courses is 2.0 or higher."
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>

        <div className="mt-10">
          <RatingProfileSection
            entityId="uf-gpa-calculator"
            entityType="calculator"
            creatorSlug="felix-yacoub"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
        </div>

        <div id="uf-gpa-guide" className="mt-12 scroll-mt-20">
          <CalculatorGuide
            layout="article"
            data={
              {
                sections: [],
                faq: [],
                ...(typeof guideContent === "object" && guideContent !== null ? guideContent : {}),
                color: "blue",
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
