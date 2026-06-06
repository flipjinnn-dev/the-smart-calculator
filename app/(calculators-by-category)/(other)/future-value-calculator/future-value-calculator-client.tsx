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
  DollarSign,
  Info,
  Lightbulb,
  LineChart,
  PiggyBank,
  RotateCcw,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide, { type CalculatorGuideData } from "@/components/calculator-guide";
import { RatingProfileSection } from "@/components/rating-profile-section";
import {
  calculateFutureValue,
  formatCurrency,
  type CompoundingFrequency,
  type FutureValueResult,
  type WithdrawalFrequency,
} from "@/lib/future-value-calculator";

interface ContentShape {
  pageTitle?: string;
  pageDescriptionBefore?: string;
  pageDescriptionBold?: string;
  pageDescriptionAfter?: string;
  sectionInvestment?: string;
  labelInitial?: string;
  labelInitialHint?: string;
  labelMonthlyContribution?: string;
  labelMonthlyHint?: string;
  labelAnnualRate?: string;
  labelYears?: string;
  labelYearsHint?: string;
  sectionCompounding?: string;
  labelCompounding?: string;
  compoundYearly?: string;
  compoundSemiannual?: string;
  compoundQuarterly?: string;
  compoundMonthly?: string;
  compoundDaily?: string;
  labelInflation?: string;
  labelInflationHint?: string;
  labelWithdrawal?: string;
  labelWithdrawalHint?: string;
  labelWithdrawalFreq?: string;
  withdrawalNone?: string;
  withdrawalMonthly?: string;
  withdrawalAnnual?: string;
  btnCalculate?: string;
  btnReset?: string;
  resultsTitle?: string;
  resultsSubtitle?: string;
  emptyTitle?: string;
  emptyHint?: string;
  metricFutureValue?: string;
  metricContributions?: string;
  metricInterest?: string;
  metricInflationAdj?: string;
  metricMonthlyGrowth?: string;
  metricPortfolio?: string;
  metricBreakdown?: string;
  breakdownYear?: string;
  breakdownBalance?: string;
  breakdownInterest?: string;
  hintCompounding?: string;
  importantTitle?: string;
  importantBody?: string;
  proTipsTitle?: string;
  proTip1?: string;
  proTip2?: string;
  proTip3?: string;
  proTip4?: string;
  proTip5?: string;
  errInitial?: string;
  errRate?: string;
  errYears?: string;
}

const defaultContent: ContentShape = {
  pageTitle: "Future Value Calculator",
  pageDescriptionBefore:
    "With a $10,000 initial investment and $200 monthly at 8% return, your portfolio could grow to ",
  pageDescriptionBold: "approximately $150,000+ in 20 years.",
  pageDescriptionAfter:
    " Use our calculator for exact projections based on your inputs.",
  btnCalculate: "Calculate future value",
  emptyTitle: "No calculation yet",
  emptyHint:
    'Enter your investment details and click "Calculate future value" to see projected growth here.',
  importantTitle: "Important",
  importantBody:
    "This calculator provides estimated investment growth for planning only. Actual returns vary with market conditions, fees, and taxes. Past performance does not guarantee future results. Consult a licensed financial advisor for personalized advice.",
  proTipsTitle: "Pro tips for investment growth",
  proTip1: "Start early — compound interest has the biggest impact over long time horizons.",
  proTip2: "Match compounding frequency to how your account actually credits interest.",
  proTip3: "Use inflation adjustment to see real purchasing power, not just nominal dollars.",
  proTip4:
    "Regular monthly contributions often matter more than chasing a slightly higher return rate.",
  proTip5: "Review assumptions periodically; past returns do not guarantee future performance.",
};

export default function FutureValueCalculatorClient({
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

  const [initialInvestment, setInitialInvestment] = useState("10000");
  const [monthlyContribution, setMonthlyContribution] = useState("200");
  const [annualRate, setAnnualRate] = useState("8");
  const [years, setYears] = useState("20");
  const [compounding, setCompounding] = useState<CompoundingFrequency>("monthly");
  const [inflationRate, setInflationRate] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [withdrawalFrequency, setWithdrawalFrequency] =
    useState<WithdrawalFrequency>("none");
  const [result, setResult] = useState<FutureValueResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sectionIcon = "text-emerald-600 flex-shrink-0 mt-0.5";

  const compute = useCallback(() => {
    const pv = Number.parseFloat(initialInvestment);
    const pmt = Number.parseFloat(monthlyContribution) || 0;
    const rate = Number.parseFloat(annualRate);
    const t = Number.parseFloat(years);
    const nextErr: Record<string, string> = {};

    if (!Number.isFinite(pv) || pv < 0) {
      nextErr.initial = c.errInitial ?? "Invalid initial investment.";
    }
    if (!Number.isFinite(rate) || rate < 0) {
      nextErr.rate = c.errRate ?? "Invalid interest rate.";
    }
    if (!Number.isFinite(t) || t <= 0) {
      nextErr.years = c.errYears ?? "Invalid time period.";
    }

    setErrors(nextErr);
    if (Object.keys(nextErr).length > 0) {
      setResult(null);
      return;
    }

    const inflationRaw = inflationRate.trim();
    const inflation =
      inflationRaw === "" ? undefined : Number.parseFloat(inflationRaw);

    const withdrawalRaw = withdrawalAmount.trim();
    const withdrawal =
      withdrawalRaw === "" ? 0 : Number.parseFloat(withdrawalRaw);

    const out = calculateFutureValue({
      initialInvestment: pv,
      monthlyContribution: pmt,
      annualRate: rate,
      years: t,
      compounding,
      inflationRate: inflation,
      withdrawalAmount: withdrawal,
      withdrawalFrequency,
    });

    setResult(out);
    if (out) scrollToRef(resultsRef);
  }, [
    initialInvestment,
    monthlyContribution,
    annualRate,
    years,
    compounding,
    inflationRate,
    withdrawalAmount,
    withdrawalFrequency,
    scrollToRef,
    c.errInitial,
    c.errRate,
    c.errYears,
  ]);

  const reset = useCallback(() => {
    setInitialInvestment("10000");
    setMonthlyContribution("200");
    setAnnualRate("8");
    setYears("20");
    setCompounding("monthly");
    setInflationRate("");
    setWithdrawalAmount("");
    setWithdrawalFrequency("none");
    setResult(null);
    setErrors({});
  }, []);

  const formCard = (
    <Card className="shadow-lg border border-gray-200/80 bg-white">
      <CardContent className="p-6 space-y-8">
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <PiggyBank className={`w-5 h-5 ${sectionIcon}`} />
            <Label className="text-sm font-semibold text-gray-800">{c.sectionInvestment}</Label>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-600">{c.labelInitial}</Label>
            <div className="flex gap-2">
              <span className="flex items-center text-sm font-semibold text-gray-600 tabular-nums">$</span>
              <Input
                type="number"
                min={0}
                step={0.01}
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                placeholder="10000"
                className="h-11 rounded-xl flex-1"
                aria-invalid={!!errors.initial}
              />
            </div>
            <p className="text-sm text-gray-500 italic">{c.labelInitialHint}</p>
            {errors.initial ? <p className="text-sm text-red-600">{errors.initial}</p> : null}
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-600">{c.labelMonthlyContribution}</Label>
            <div className="flex gap-2">
              <span className="flex items-center text-sm font-semibold text-gray-600 tabular-nums">$</span>
              <Input
                type="number"
                min={0}
                step={0.01}
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                placeholder="200"
                className="h-11 rounded-xl flex-1"
              />
            </div>
            <p className="text-sm text-gray-500 italic">{c.labelMonthlyHint}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-gray-600">{c.labelAnnualRate}</Label>
              <Input
                type="number"
                min={0}
                step={0.01}
                value={annualRate}
                onChange={(e) => setAnnualRate(e.target.value)}
                placeholder="8"
                className="h-11 rounded-xl"
                aria-invalid={!!errors.rate}
              />
              {errors.rate ? <p className="text-sm text-red-600">{errors.rate}</p> : null}
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-gray-600">{c.labelYears}</Label>
              <Input
                type="number"
                min={0.1}
                step={0.1}
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="20"
                className="h-11 rounded-xl"
                aria-invalid={!!errors.years}
              />
              <p className="text-sm text-gray-500 italic">{c.labelYearsHint}</p>
              {errors.years ? <p className="text-sm text-red-600">{errors.years}</p> : null}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <LineChart className={`w-5 h-5 ${sectionIcon}`} />
            <Label className="text-sm font-semibold text-gray-800">{c.sectionCompounding}</Label>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-600">{c.labelCompounding}</Label>
            <Select value={compounding} onValueChange={(v) => setCompounding(v as CompoundingFrequency)}>
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yearly">{c.compoundYearly}</SelectItem>
                <SelectItem value="semiannual">{c.compoundSemiannual}</SelectItem>
                <SelectItem value="quarterly">{c.compoundQuarterly}</SelectItem>
                <SelectItem value="monthly">{c.compoundMonthly}</SelectItem>
                <SelectItem value="daily">{c.compoundDaily}</SelectItem>
              </SelectContent>
            </Select>
            {c.hintCompounding ? (
              <p className="text-sm text-gray-500 leading-relaxed">{c.hintCompounding}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-600">{c.labelInflation}</Label>
            <Input
              type="number"
              min={0}
              step={0.01}
              value={inflationRate}
              onChange={(e) => setInflationRate(e.target.value)}
              placeholder="3"
              className="h-11 rounded-xl"
            />
            <p className="text-sm text-gray-500 italic">{c.labelInflationHint}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-gray-600">{c.labelWithdrawal}</Label>
              <div className="flex gap-2">
                <span className="flex items-center text-sm font-semibold text-gray-600 tabular-nums">$</span>
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                  placeholder="0"
                  className="h-11 rounded-xl flex-1"
                />
              </div>
              <p className="text-sm text-gray-500 italic">{c.labelWithdrawalHint}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-gray-600">{c.labelWithdrawalFreq}</Label>
              <Select
                value={withdrawalFrequency}
                onValueChange={(v) => setWithdrawalFrequency(v as WithdrawalFrequency)}
              >
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{c.withdrawalNone}</SelectItem>
                  <SelectItem value="monthly">{c.withdrawalMonthly}</SelectItem>
                  <SelectItem value="annual">{c.withdrawalAnnual}</SelectItem>
                </SelectContent>
              </Select>
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
                <TrendingUp className="w-8 h-8 text-white" />
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
                      <Wallet className="w-12 h-12 text-gray-300 mx-auto mb-3" />
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
                        <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 sm:col-span-2">
                          <p className="text-xs font-medium text-emerald-800 uppercase tracking-wide">
                            {c.metricFutureValue}
                          </p>
                          <p className="text-3xl font-bold text-emerald-700 tabular-nums">
                            {formatCurrency(result.totalFutureValue)}
                          </p>
                        </div>
                        <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4">
                          <p className="text-xs font-medium text-blue-800 uppercase tracking-wide">
                            {c.metricContributions}
                          </p>
                          <p className="text-2xl font-bold text-blue-700 tabular-nums">
                            {formatCurrency(result.totalContributions)}
                          </p>
                        </div>
                        <div className="rounded-xl border border-violet-100 bg-violet-50/40 p-4">
                          <p className="text-xs font-medium text-violet-800 uppercase tracking-wide">
                            {c.metricInterest}
                          </p>
                          <p className="text-2xl font-bold text-violet-700 tabular-nums">
                            {formatCurrency(result.totalInterestEarned)}
                          </p>
                        </div>
                        {result.inflationAdjustedValue != null ? (
                          <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-4">
                            <p className="text-xs font-medium text-amber-800 uppercase tracking-wide">
                              {c.metricInflationAdj}
                            </p>
                            <p className="text-2xl font-bold text-amber-700 tabular-nums">
                              {formatCurrency(result.inflationAdjustedValue)}
                            </p>
                          </div>
                        ) : null}
                        <div className="rounded-xl border border-teal-100 bg-teal-50/40 p-4">
                          <p className="text-xs font-medium text-teal-800 uppercase tracking-wide">
                            {c.metricMonthlyGrowth}
                          </p>
                          <p className="text-2xl font-bold text-teal-700 tabular-nums">
                            {formatCurrency(result.averageMonthlyGrowth)}
                          </p>
                        </div>
                        <div className="rounded-xl border border-green-100 bg-green-50/40 p-4 sm:col-span-2">
                          <p className="text-xs font-medium text-green-800 uppercase tracking-wide">
                            {c.metricPortfolio}
                          </p>
                          <p className="text-2xl font-bold text-green-700 tabular-nums">
                            {formatCurrency(result.totalFutureValue)}
                          </p>
                        </div>
                      </div>

                      {result.yearlyBreakdown.length > 0 ? (
                        <div className="rounded-xl border border-gray-200 overflow-hidden">
                          <div className="bg-slate-50 px-4 py-3 border-b">
                            <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-emerald-600" />
                              {c.metricBreakdown}
                            </p>
                          </div>
                          <div className="max-h-64 overflow-y-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-white sticky top-0">
                                <tr className="text-left text-gray-500 border-b">
                                  <th className="px-4 py-2 font-medium">{c.breakdownYear}</th>
                                  <th className="px-4 py-2 font-medium">{c.breakdownBalance}</th>
                                  <th className="px-4 py-2 font-medium">{c.breakdownInterest}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {result.yearlyBreakdown.map((row) => (
                                  <tr key={row.year} className="border-b border-gray-100 last:border-0">
                                    <td className="px-4 py-2 font-medium text-gray-800">{row.year}</td>
                                    <td className="px-4 py-2 tabular-nums text-emerald-700">
                                      {formatCurrency(row.endingBalance)}
                                    </td>
                                    <td className="px-4 py-2 tabular-nums text-violet-700">
                                      {formatCurrency(row.interestEarned)}
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
            entityId="future-value-calculator"
            entityType="calculator"
            creatorSlug="neo-nicholas"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <CalculatorGuide data={guideData} layout="article" />
          <SimilarCalculators
            calculators={[
              {
                calculatorName: "Compound Interest Calculator",
                calculatorHref: "/financial/compound-interest-calculator",
                calculatorDescription: "Calculate compound interest growth over time with regular contributions.",
              },
              {
                calculatorName: "Savings Calculator",
                calculatorHref: "/financial/savings-calculator",
                calculatorDescription: "Plan savings goals with contributions, interest, and inflation.",
              },
              {
                calculatorName: "Investment Calculator",
                calculatorHref: "/financial/investment-calculator",
                calculatorDescription: "Model investment returns, contributions, and portfolio growth.",
              },
            ]}
          />
        </div>
      </main>
    </div>
  );
}
