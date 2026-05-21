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
import { Switch } from "@/components/ui/switch";
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
  DollarSign,
  Info,
  Lightbulb,
  PenLine,
  RotateCcw,
  Users,
  CalendarDays,
  Percent,
} from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide, {
  type CalculatorGuideData,
} from "@/components/calculator-guide";
import { RatingProfileSection } from "@/components/rating-profile-section";

type TipPreset = "15" | "18" | "20" | "25" | "30" | "custom";

interface TattooTipResult {
  tattooCost: number;
  tipPercent: number;
  tipAmount: number;
  totalPerSession: number;
  sessions: number;
  multiSessionTotal: number;
  people: number;
  perPerson: number;
}

interface ContentShape {
  pageTitle?: string;
  pageDescriptionBefore?: string;
  pageDescriptionBold?: string;
  pageDescriptionAfter?: string;
  sectionCost?: string;
  sectionTip?: string;
  sectionOptional?: string;
  labelCost?: string;
  placeholderCost?: string;
  labelTip?: string;
  tip15?: string;
  tip18?: string;
  tip20?: string;
  tip25?: string;
  tip30?: string;
  tipCustom?: string;
  labelCustomTip?: string;
  labelSessions?: string;
  labelSplit?: string;
  toggleSessions?: string;
  toggleSplit?: string;
  hintSessions?: string;
  hintSplit?: string;
  importantTitle?: string;
  importantBody?: string;
  btnCalculate?: string;
  btnReset?: string;
  resultsTitle?: string;
  resultsSubtitle?: string;
  emptyTitle?: string;
  emptyHint?: string;
  metricTip?: string;
  metricTotal?: string;
  metricMultiSession?: string;
  metricPerPerson?: string;
  suffixSessions?: string;
  suffixPeople?: string;
  proTipsTitle?: string;
  proTip1?: string;
  proTip2?: string;
  proTip3?: string;
  proTip4?: string;
  proTip5?: string;
  errCost?: string;
  errTip?: string;
  errSessions?: string;
  errPeople?: string;
}

const defaultContent: ContentShape = {
  pageTitle: "Tattoo Tip Calculator",
  pageDescriptionBefore:
    "Use our free tattoo tip calculator to instantly find the perfect tip for your tattoo artist. Enter your tattoo cost, choose a percentage, and get quick accurate results with no guesswork.",
  pageDescriptionBold: "",
  pageDescriptionAfter: "",
};

function formatMoney(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function parsePositive(value: string): number | null {
  const n = Number.parseFloat(value);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

export default function TattooTipCalculatorClient({
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

  const [tattooCost, setTattooCost] = useState("200");
  const [tipPreset, setTipPreset] = useState<TipPreset>("20");
  const [customTip, setCustomTip] = useState("20");
  const [useSessions, setUseSessions] = useState(false);
  const [sessions, setSessions] = useState("2");
  const [useSplit, setUseSplit] = useState(false);
  const [people, setPeople] = useState("2");
  const [result, setResult] = useState<TattooTipResult | null>(null);
  const [errors, setErrors] = useState<{
    cost?: string;
    tip?: string;
    sessions?: string;
    people?: string;
  }>({});

  const getTipPercent = useCallback((): number | null => {
    if (tipPreset !== "custom") return Number.parseFloat(tipPreset);
    const n = Number.parseFloat(customTip);
    if (!Number.isFinite(n) || n < 0) return null;
    return n;
  }, [tipPreset, customTip]);

  const compute = useCallback(() => {
    const nextErr: typeof errors = {};
    const cost = parsePositive(tattooCost);
    if (cost === null) nextErr.cost = c.errCost;

    const tipPercent = getTipPercent();
    if (tipPercent === null) nextErr.tip = c.errTip;

    let sessionCount = 1;
    if (useSessions) {
      const s = Number.parseInt(sessions, 10);
      if (!Number.isFinite(s) || s < 1) nextErr.sessions = c.errSessions;
      else sessionCount = s;
    }

    let peopleCount = 1;
    if (useSplit) {
      const p = Number.parseInt(people, 10);
      if (!Number.isFinite(p) || p < 1) nextErr.people = c.errPeople;
      else peopleCount = p;
    }

    setErrors(nextErr);
    if (Object.keys(nextErr).length > 0 || cost === null || tipPercent === null) {
      setResult(null);
      return;
    }

    const tipAmount = (cost * tipPercent) / 100;
    const totalPerSession = cost + tipAmount;
    const multiSessionTotal = totalPerSession * sessionCount;
    const perPerson = multiSessionTotal / peopleCount;

    setResult({
      tattooCost: cost,
      tipPercent,
      tipAmount: Math.round(tipAmount * 100) / 100,
      totalPerSession: Math.round(totalPerSession * 100) / 100,
      sessions: sessionCount,
      multiSessionTotal: Math.round(multiSessionTotal * 100) / 100,
      people: peopleCount,
      perPerson: Math.round(perPerson * 100) / 100,
    });
    scrollToRef(resultsRef);
  }, [
    tattooCost,
    getTipPercent,
    useSessions,
    sessions,
    useSplit,
    people,
    scrollToRef,
    c.errCost,
    c.errTip,
    c.errSessions,
    c.errPeople,
  ]);

  const reset = useCallback(() => {
    setTattooCost("200");
    setTipPreset("20");
    setCustomTip("20");
    setUseSessions(false);
    setSessions("2");
    setUseSplit(false);
    setPeople("2");
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
          Enter your tattoo cost and tip percentage. Optional fields help with multi-session plans or splitting the bill.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <DollarSign className={`w-5 h-5 ${sectionIconClass}`} />
            <div className="flex-1 space-y-2">
              <Label className="text-sm font-semibold text-gray-800">{c.sectionCost}</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  $
                </span>
                <Input
                  type="number"
                  min={0.01}
                  step={0.01}
                  value={tattooCost}
                  onChange={(e) => setTattooCost(e.target.value)}
                  placeholder={c.placeholderCost}
                  className="h-11 rounded-xl pl-7"
                  aria-invalid={!!errors.cost}
                />
              </div>
              <Label className="text-xs font-medium text-gray-600">{c.labelCost}</Label>
              {errors.cost ? <p className="text-sm text-red-600">{errors.cost}</p> : null}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Percent className={`w-5 h-5 ${sectionIconClass}`} />
            <div className="flex-1 space-y-4">
              <Label className="text-sm font-semibold text-gray-800">{c.sectionTip}</Label>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">{c.labelTip}</Label>
                <Select
                  value={tipPreset}
                  onValueChange={(v) => setTipPreset(v as TipPreset)}
                >
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">{c.tip15}</SelectItem>
                    <SelectItem value="18">{c.tip18}</SelectItem>
                    <SelectItem value="20">{c.tip20}</SelectItem>
                    <SelectItem value="25">{c.tip25}</SelectItem>
                    <SelectItem value="30">{c.tip30}</SelectItem>
                    <SelectItem value="custom">{c.tipCustom}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {tipPreset === "custom" ? (
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">{c.labelCustomTip}</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      step={0.5}
                      value={customTip}
                      onChange={(e) => setCustomTip(e.target.value)}
                      className="h-11 rounded-xl flex-1"
                      aria-invalid={!!errors.tip}
                    />
                    <span className="flex items-center text-sm text-gray-500">%</span>
                  </div>
                </div>
              ) : null}
              {errors.tip ? <p className="text-sm text-red-600">{errors.tip}</p> : null}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-sm font-semibold text-gray-800">{c.sectionOptional}</Label>

          <div className="rounded-xl border border-gray-200 p-4 space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-start gap-2 flex-1">
                <CalendarDays className={`w-5 h-5 ${sectionIconClass}`} />
                <div>
                  <p className="text-sm font-medium text-gray-800">{c.toggleSessions}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{c.hintSessions}</p>
                </div>
              </div>
              <Switch checked={useSessions} onCheckedChange={setUseSessions} />
            </div>
            {useSessions ? (
              <div className="space-y-2 pl-7">
                <Label className="text-xs font-medium text-gray-600">{c.labelSessions}</Label>
                <Input
                  type="number"
                  min={1}
                  step={1}
                  value={sessions}
                  onChange={(e) => setSessions(e.target.value)}
                  className="h-11 rounded-xl max-w-[140px]"
                  aria-invalid={!!errors.sessions}
                />
                {errors.sessions ? (
                  <p className="text-sm text-red-600">{errors.sessions}</p>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="rounded-xl border border-gray-200 p-4 space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-start gap-2 flex-1">
                <Users className={`w-5 h-5 ${sectionIconClass}`} />
                <div>
                  <p className="text-sm font-medium text-gray-800">{c.toggleSplit}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{c.hintSplit}</p>
                </div>
              </div>
              <Switch checked={useSplit} onCheckedChange={setUseSplit} />
            </div>
            {useSplit ? (
              <div className="space-y-2 pl-7">
                <Label className="text-xs font-medium text-gray-600">{c.labelSplit}</Label>
                <Input
                  type="number"
                  min={1}
                  step={1}
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  className="h-11 rounded-xl max-w-[140px]"
                  aria-invalid={!!errors.people}
                />
                {errors.people ? (
                  <p className="text-sm text-red-600">{errors.people}</p>
                ) : null}
              </div>
            ) : null}
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
                <PenLine className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              {c.pageTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {c.pageDescriptionBefore}
              {c.pageDescriptionBold ? (
                <strong className="font-semibold text-gray-900">{c.pageDescriptionBold}</strong>
              ) : null}
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
                      <PenLine className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-lg font-semibold text-gray-800 mb-2">{c.emptyTitle}</p>
                      <p className="text-gray-600 max-w-md mx-auto">{c.emptyHint}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
                          <p className="text-xs font-medium text-emerald-800 uppercase tracking-wide">
                            {c.metricTip}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {formatMoney(result.tipAmount)}
                          </p>
                          <p className="text-sm text-emerald-700 mt-1">
                            {result.tipPercent}% of {formatMoney(result.tattooCost)}
                          </p>
                        </div>
                        <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
                          <p className="text-xs font-medium text-emerald-900 uppercase tracking-wide">
                            {c.metricTotal}
                          </p>
                          <p className="text-3xl font-bold text-emerald-900 tabular-nums">
                            {formatMoney(result.totalPerSession)}
                          </p>
                          <p className="text-sm text-emerald-800/90 mt-1">Per session (cost + tip)</p>
                        </div>
                      </div>

                      {result.sessions > 1 ? (
                        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                          <p className="text-xs font-medium text-slate-700 uppercase tracking-wide">
                            {c.metricMultiSession}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {formatMoney(result.multiSessionTotal)}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {result.sessions} {c.suffixSessions} × {formatMoney(result.totalPerSession)}
                          </p>
                        </div>
                      ) : null}

                      {result.people > 1 ? (
                        <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-4">
                          <p className="text-xs font-medium text-amber-900 uppercase tracking-wide">
                            {c.metricPerPerson}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {formatMoney(result.perPerson)}
                          </p>
                          <p className="text-sm text-amber-950/85 mt-1">
                            Split among {result.people} {c.suffixPeople}
                            {result.sessions > 1 ? " (all sessions included)" : ""}
                          </p>
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
            entityId="tattoo-tip-calculator"
            entityType="calculator"
            creatorSlug="aiden-asher"
            initialRatingTotal={0}
            initialRatingCount={0}
          />

          <CalculatorGuide data={guideData} layout="article" />

          <SimilarCalculators
            calculators={[
              {
                calculatorName: "Venmo fee calculator",
                calculatorHref: "/financial/venmo-fee-calculator",
                calculatorDescription:
                  "Estimate Venmo fees for transfers, credit card payments, and goods & services.",
              },
              {
                calculatorName: "Depop fee calculator",
                calculatorHref: "/depop-fee-calculator",
                calculatorDescription:
                  "Calculate Depop selling and processing fees to see your net payout.",
              },
              {
                calculatorName: "Whatnot fee calculator",
                calculatorHref: "/whatnot-fee-calculator",
                calculatorDescription:
                  "Break down Whatnot commission and processing fees for sellers.",
              },
            ]}
            color="teal"
            title="Related calculators"
          />
        </div>
      </main>
    </div>
  );
}
