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
  Banknote,
  Calculator,
  Home,
  Info,
  Lightbulb,
  Percent,
  PiggyBank,
  RotateCcw,
  TrendingDown,
} from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide, { type CalculatorGuideData } from "@/components/calculator-guide";
import { RatingProfileSection } from "@/components/rating-profile-section";
import {
  calculateMortgageRecast,
  formatCurrency,
  type MortgageRecastResult,
  type OriginalTermYears,
} from "@/lib/mortgage-recast-calculator";

interface ContentShape {
  pageTitle?: string;
  pageDescriptionBefore?: string;
  pageDescriptionBold?: string;
  pageDescriptionAfter?: string;
  inputsTitle?: string;
  inputsSubtitle?: string;
  sectionLoan?: string;
  labelOriginalAmount?: string;
  labelCurrentBalance?: string;
  labelInterestRate?: string;
  labelOriginalTerm?: string;
  term10?: string;
  term15?: string;
  term20?: string;
  term25?: string;
  term30?: string;
  labelRemainingTerm?: string;
  suffixYears?: string;
  hintRemainingTerm?: string;
  sectionRecast?: string;
  labelLumpSum?: string;
  hintLumpSum?: string;
  labelRecastFee?: string;
  hintRecastFee?: string;
  importantTitle?: string;
  importantBody?: string;
  btnCalculate?: string;
  btnReset?: string;
  resultsTitle?: string;
  resultsSubtitle?: string;
  emptyTitle?: string;
  emptyHint?: string;
  metricNewPayment?: string;
  metricMonthlySavings?: string;
  metricCurrentPayment?: string;
  metricNewBalance?: string;
  metricInterestSaved?: string;
  metricRecastFee?: string;
  metricNetSavings?: string;
  metricRemainingTerm?: string;
  metricPaymentReduction?: string;
  suffixPerMonth?: string;
  suffixMonths?: string;
  breakdownTitle?: string;
  breakdownNote?: string;
  optionBeforeRecast?: string;
  optionAfterRecast?: string;
  optionInterestSaved?: string;
  proTipsTitle?: string;
  proTip1?: string;
  proTip2?: string;
  proTip3?: string;
  proTip4?: string;
  proTip5?: string;
  errOriginalAmount?: string;
  errCurrentBalance?: string;
  errInterestRate?: string;
  errRemainingTerm?: string;
  errLumpSum?: string;
  errRecastFee?: string;
}

const defaultContent: ContentShape = {
  pageTitle: "Mortgage Recast Calculator",
  pageDescriptionBefore:
    "This mortgage recast calculator, also known as a recast mortgage calculator, helps you instantly calculate your ",
  pageDescriptionBold: "new monthly payment",
  pageDescriptionAfter: " after a lump-sum payment. No login required.",
};

export default function MortgageRecastCalculatorClient({
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

  const [originalAmount, setOriginalAmount] = useState("400000");
  const [currentBalance, setCurrentBalance] = useState("320000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [originalTerm, setOriginalTerm] = useState<OriginalTermYears>(30);
  const [remainingYears, setRemainingYears] = useState("22");
  const [lumpSum, setLumpSum] = useState("50000");
  const [recastFee, setRecastFee] = useState("250");
  const [result, setResult] = useState<MortgageRecastResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sectionIconClass = "text-emerald-600 flex-shrink-0 mt-0.5";

  const compute = useCallback(() => {
    const nextErr: Record<string, string> = {};

    const original = Number.parseFloat(originalAmount);
    if (!Number.isFinite(original) || original <= 0) {
      nextErr.originalAmount = c.errOriginalAmount ?? "Invalid original amount.";
    }

    const balance = Number.parseFloat(currentBalance);
    if (!Number.isFinite(balance) || balance <= 0) {
      nextErr.currentBalance = c.errCurrentBalance ?? "Invalid balance.";
    }

    const rate = Number.parseFloat(interestRate);
    if (!Number.isFinite(rate) || rate < 0) {
      nextErr.interestRate = c.errInterestRate ?? "Invalid rate.";
    }

    const remaining = Number.parseFloat(remainingYears);
    if (!Number.isFinite(remaining) || remaining <= 0) {
      nextErr.remainingTerm = c.errRemainingTerm ?? "Invalid remaining term.";
    }

    const lump = Number.parseFloat(lumpSum);
    if (!Number.isFinite(lump) || lump <= 0 || (Number.isFinite(balance) && lump >= balance)) {
      nextErr.lumpSum = c.errLumpSum ?? "Invalid lump sum.";
    }

    const fee = recastFee.trim() === "" ? 0 : Number.parseFloat(recastFee);
    if (!Number.isFinite(fee) || fee < 0) {
      nextErr.recastFee = c.errRecastFee ?? "Invalid fee.";
    }

    setErrors(nextErr);
    if (Object.keys(nextErr).length > 0) {
      setResult(null);
      return;
    }

    const out = calculateMortgageRecast({
      originalLoanAmount: original,
      currentBalance: balance,
      annualRatePct: rate,
      originalTermYears: originalTerm,
      remainingYears: remaining,
      lumpSumPayment: lump,
      recastFee: fee,
    });

    if (!out) {
      setResult(null);
      return;
    }

    setResult(out);
    scrollToRef(resultsRef);
  }, [
    originalAmount,
    currentBalance,
    interestRate,
    originalTerm,
    remainingYears,
    lumpSum,
    recastFee,
    scrollToRef,
    c.errOriginalAmount,
    c.errCurrentBalance,
    c.errInterestRate,
    c.errRemainingTerm,
    c.errLumpSum,
    c.errRecastFee,
  ]);

  const reset = useCallback(() => {
    setOriginalAmount("400000");
    setCurrentBalance("320000");
    setInterestRate("6.5");
    setOriginalTerm(30);
    setRemainingYears("22");
    setLumpSum("50000");
    setRecastFee("250");
    setResult(null);
    setErrors({});
  }, []);

  const formCard = (
    <Card className="shadow-lg border border-gray-200/80 bg-white">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100/80 py-5 px-6">
        <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 text-gray-900">
          <Calculator className="w-6 h-6 text-emerald-600" />
          {c.inputsTitle}
        </CardTitle>
        <CardDescription className="text-base text-gray-600">{c.inputsSubtitle}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Home className={`w-5 h-5 ${sectionIconClass}`} />
            <div className="flex-1 space-y-4">
              <Label className="text-sm font-semibold text-gray-800">{c.sectionLoan}</Label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">{c.labelOriginalAmount}</Label>
                  <div className="flex gap-2">
                    <span className="flex items-center text-sm font-semibold text-gray-600">$</span>
                    <Input
                      type="number"
                      min={0}
                      step={1000}
                      value={originalAmount}
                      onChange={(e) => setOriginalAmount(e.target.value)}
                      className="h-11 rounded-xl flex-1"
                      aria-invalid={!!errors.originalAmount}
                    />
                  </div>
                  {errors.originalAmount ? (
                    <p className="text-sm text-red-600">{errors.originalAmount}</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">{c.labelCurrentBalance}</Label>
                  <div className="flex gap-2">
                    <span className="flex items-center text-sm font-semibold text-gray-600">$</span>
                    <Input
                      type="number"
                      min={0}
                      step={1000}
                      value={currentBalance}
                      onChange={(e) => setCurrentBalance(e.target.value)}
                      className="h-11 rounded-xl flex-1"
                      aria-invalid={!!errors.currentBalance}
                    />
                  </div>
                  {errors.currentBalance ? (
                    <p className="text-sm text-red-600">{errors.currentBalance}</p>
                  ) : null}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">{c.labelInterestRate}</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min={0}
                      step={0.01}
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="h-11 rounded-xl flex-1"
                      aria-invalid={!!errors.interestRate}
                    />
                    <span className="flex items-center text-sm text-gray-500">%</span>
                  </div>
                  {errors.interestRate ? (
                    <p className="text-sm text-red-600">{errors.interestRate}</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">{c.labelOriginalTerm}</Label>
                  <Select
                    value={String(originalTerm)}
                    onValueChange={(v) => setOriginalTerm(Number(v) as OriginalTermYears)}
                  >
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">{c.term10}</SelectItem>
                      <SelectItem value="15">{c.term15}</SelectItem>
                      <SelectItem value="20">{c.term20}</SelectItem>
                      <SelectItem value="25">{c.term25}</SelectItem>
                      <SelectItem value="30">{c.term30}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">{c.labelRemainingTerm}</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min={0.5}
                    step={0.5}
                    value={remainingYears}
                    onChange={(e) => setRemainingYears(e.target.value)}
                    className="h-11 rounded-xl flex-1 max-w-[160px]"
                    aria-invalid={!!errors.remainingTerm}
                  />
                  <span className="flex items-center text-sm text-gray-500">{c.suffixYears}</span>
                </div>
                {c.hintRemainingTerm ? (
                  <p className="text-sm text-gray-500 italic">{c.hintRemainingTerm}</p>
                ) : null}
                {errors.remainingTerm ? (
                  <p className="text-sm text-red-600">{errors.remainingTerm}</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <PiggyBank className={`w-5 h-5 ${sectionIconClass}`} />
            <div className="flex-1 space-y-4">
              <Label className="text-sm font-semibold text-gray-800">{c.sectionRecast}</Label>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">{c.labelLumpSum}</Label>
                <div className="flex gap-2">
                  <span className="flex items-center text-sm font-semibold text-gray-600">$</span>
                  <Input
                    type="number"
                    min={0}
                    step={1000}
                    value={lumpSum}
                    onChange={(e) => setLumpSum(e.target.value)}
                    className="h-11 rounded-xl flex-1"
                    aria-invalid={!!errors.lumpSum}
                  />
                </div>
                {c.hintLumpSum ? (
                  <p className="text-sm text-gray-500 italic">{c.hintLumpSum}</p>
                ) : null}
                {errors.lumpSum ? <p className="text-sm text-red-600">{errors.lumpSum}</p> : null}
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">{c.labelRecastFee}</Label>
                <div className="flex gap-2">
                  <span className="flex items-center text-sm font-semibold text-gray-600">$</span>
                  <Input
                    type="number"
                    min={0}
                    step={50}
                    value={recastFee}
                    onChange={(e) => setRecastFee(e.target.value)}
                    placeholder="0"
                    className="h-11 rounded-xl flex-1 max-w-[160px]"
                    aria-invalid={!!errors.recastFee}
                  />
                </div>
                {c.hintRecastFee ? (
                  <p className="text-sm text-gray-500 italic">{c.hintRecastFee}</p>
                ) : null}
                {errors.recastFee ? (
                  <p className="text-sm text-red-600">{errors.recastFee}</p>
                ) : null}
              </div>
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
                <Home className="w-8 h-8 text-white" />
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
                      <Banknote className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-lg font-semibold text-gray-800 mb-2">{c.emptyTitle}</p>
                      <p className="text-gray-600 max-w-md mx-auto">{c.emptyHint}</p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                        <p className="text-sm text-emerald-950/90 leading-relaxed">{result.summary}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 sm:col-span-2">
                          <p className="text-xs font-medium text-emerald-900 uppercase tracking-wide">
                            {c.metricNewPayment}
                          </p>
                          <p className="text-3xl font-bold text-emerald-900 tabular-nums">
                            {formatCurrency(Math.round(result.newMonthlyPayment))}
                            <span className="text-lg font-semibold">{c.suffixPerMonth}</span>
                          </p>
                          <p className="text-xs text-emerald-800/80 mt-1">
                            {c.metricCurrentPayment}:{" "}
                            {formatCurrency(Math.round(result.currentMonthlyPayment))}
                            {c.suffixPerMonth}
                          </p>
                        </div>
                        <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
                          <p className="text-xs font-medium text-emerald-800 uppercase tracking-wide flex items-center gap-1">
                            <TrendingDown className="w-3.5 h-3.5" />
                            {c.metricMonthlySavings}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {formatCurrency(Math.round(result.monthlySavings))}
                            <span className="text-base font-semibold text-emerald-700">
                              {c.suffixPerMonth}
                            </span>
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                          <p className="text-xs font-medium text-slate-700 uppercase tracking-wide">
                            {c.metricNewBalance}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {formatCurrency(Math.round(result.newLoanBalance))}
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                            {c.metricInterestSaved}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {formatCurrency(Math.round(result.totalInterestSaved))}
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                          <p className="text-xs font-medium text-slate-700 uppercase tracking-wide">
                            {c.metricRecastFee}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {formatCurrency(Math.round(result.recastFee))}
                          </p>
                        </div>
                        <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-4">
                          <p className="text-xs font-medium text-amber-800 uppercase tracking-wide">
                            {c.metricNetSavings}
                          </p>
                          <p className="text-2xl font-bold text-amber-900 tabular-nums">
                            {formatCurrency(Math.round(result.netSavingsAfterFee))}
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                            {c.metricRemainingTerm}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {result.remainingMonths}{" "}
                            <span className="text-base font-semibold text-gray-600">
                              {c.suffixMonths}
                            </span>
                          </p>
                        </div>
                        <div className="rounded-xl border border-violet-100 bg-violet-50/40 p-4">
                          <p className="text-xs font-medium text-violet-800 uppercase tracking-wide flex items-center gap-1">
                            <Percent className="w-3.5 h-3.5" />
                            {c.metricPaymentReduction}
                          </p>
                          <p className="text-2xl font-bold text-violet-700 tabular-nums">
                            {result.paymentReductionPct.toFixed(1)}%
                          </p>
                        </div>
                      </div>

                      <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-4">
                        <p className="font-semibold text-amber-950 flex items-center gap-2 mb-2">
                          <Lightbulb className="w-4 h-4" />
                          {c.breakdownTitle}
                        </p>
                        <p className="text-sm text-amber-950/85 mb-3">{c.breakdownNote}</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                          <li className="rounded-lg bg-white/80 border border-amber-100 px-3 py-2">
                            <span className="text-gray-500 block text-xs">{c.optionBeforeRecast}</span>
                            <span className="font-bold text-gray-900 tabular-nums">
                              {formatCurrency(Math.round(result.interestRemainingBefore))}
                            </span>
                          </li>
                          <li className="rounded-lg bg-white/80 border border-amber-100 px-3 py-2">
                            <span className="text-gray-500 block text-xs">{c.optionAfterRecast}</span>
                            <span className="font-bold text-gray-900 tabular-nums">
                              {formatCurrency(Math.round(result.interestRemainingAfter))}
                            </span>
                          </li>
                          <li className="rounded-lg bg-white/80 border border-amber-100 px-3 py-2">
                            <span className="text-gray-500 block text-xs">{c.optionInterestSaved}</span>
                            <span className="font-bold text-emerald-800 tabular-nums">
                              {formatCurrency(Math.round(result.totalInterestSaved))}
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
            entityId="mortgage-recast-calculator"
            entityType="calculator"
            creatorSlug="hudson-hale"
            initialRatingTotal={0}
            initialRatingCount={0}
          />

          <CalculatorGuide data={guideData} layout="article" />

          <SimilarCalculators
            calculators={[
              {
                calculatorName: "Mortgage Calculator",
                calculatorHref: "/financial/mortgage-calculator",
                calculatorDescription:
                  "Calculate monthly mortgage payments, total interest, and amortization schedules.",
              },
              {
                calculatorName: "Mortgage Payoff Calculator",
                calculatorHref: "/financial/mortgage-payoff-calculator",
                calculatorDescription:
                  "See how extra payments shorten your loan and reduce total interest paid.",
              },
              {
                calculatorName: "Amortization Calculator",
                calculatorHref: "/financial/amortization-calculator",
                calculatorDescription:
                  "Generate a full loan amortization schedule with principal and interest breakdown.",
              },
            ]}
            color="teal"
            title="Related financial calculators"
          />
        </div>
      </main>
    </div>
  );
}
