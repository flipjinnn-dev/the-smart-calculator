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
  Building2,
  Calculator,
  DollarSign,
  Home,
  Info,
  Landmark,
  Lightbulb,
  PiggyBank,
  RotateCcw,
} from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide, {
  type CalculatorGuideData,
} from "@/components/calculator-guide";
import { RatingProfileSection } from "@/components/rating-profile-section";

interface MortgageResults {
  pi: number;
  taxMo: number;
  insMo: number;
  pmiMo: number;
  hoaMo: number;
  total: number;
  intNoExtra: number;
  intExtra: number;
  mNoExtra: number;
  mExtra: number;
  loan: number;
  rate: number;
  term: number;
  extra: number;
  intSaved: number;
  moSaved: number;
}

interface AmortRow {
  yr: number;
  yP: number;
  yI: number;
  bal: number;
}

interface ContentShape {
  pageTitle?: string;
  pageDescriptionBefore?: string;
  pageDescriptionBold?: string;
  pageDescriptionAfter?: string;
  sectionLoan?: string;
  labelHomePrice?: string;
  labelDownPayment?: string;
  labelDownPct?: string;
  labelLoanTerm?: string;
  term10?: string;
  term15?: string;
  term20?: string;
  term30?: string;
  labelInterestRate?: string;
  sectionCosts?: string;
  labelPropertyTax?: string;
  labelHomeInsurance?: string;
  labelHoa?: string;
  labelPmiRate?: string;
  labelExtraPayment?: string;
  hintCosts?: string;
  importantTitle?: string;
  importantBody?: string;
  btnCalculate?: string;
  btnReset?: string;
  resultsTitle?: string;
  resultsSubtitle?: string;
  emptyTitle?: string;
  emptyHint?: string;
  metricMonthlyTotal?: string;
  metricPrincipalInterest?: string;
  metricPropertyTax?: string;
  metricHomeInsurance?: string;
  metricPmi?: string;
  metricHoa?: string;
  metricLoanAmount?: string;
  metricTotalInterest?: string;
  metricTotalPaid?: string;
  metricPayoffTerm?: string;
  suffixPerMonth?: string;
  suffixYears?: string;
  extraSavingsTitle?: string;
  extraSavingsNote?: string;
  extraInterestSaved?: string;
  extraMonthsSaved?: string;
  amortTitle?: string;
  amortNote?: string;
  amortYear?: string;
  amortPrincipal?: string;
  amortInterest?: string;
  amortBalance?: string;
  proTipsTitle?: string;
  proTip1?: string;
  proTip2?: string;
  proTip3?: string;
  proTip4?: string;
  proTip5?: string;
  errHomePrice?: string;
  errDownPayment?: string;
  errInterestRate?: string;
  errLoanTerm?: string;
}

const defaultContent: ContentShape = {
  pageTitle: "Mortgage Calculator",
  pageDescriptionBefore:
    "This mortgage recast calculator, also known as a recast mortgage calculator, helps you instantly calculate your ",
  pageDescriptionBold: "new monthly payment",
  pageDescriptionAfter: " after a lump-sum payment. No login required.",
};

function amortStats(
  loan: number,
  mr: number,
  n: number,
  pi: number,
  extra: number
) {
  let bal = loan;
  let interest = 0;
  let months = 0;
  for (let m = 0; m < n && bal > 0; m++) {
    const ic = bal * mr;
    let pr = pi - ic + extra;
    if (pr > bal) pr = bal;
    interest += ic;
    bal = Math.max(0, bal - pr);
    months = m + 1;
  }
  return { interest, months };
}

function fmt(n: number) {
  return Math.round(n).toLocaleString("en-US");
}

function fmtCurrency(n: number) {
  return `$${fmt(n)}`;
}

function fmtK(n: number) {
  if (n >= 1_000_000)
    return `$${(n / 1_000_000).toFixed(2).replace(/\.?0+$/, "")}M`;
  if (n >= 10_000) return `$${Math.round(n / 1000)}K`;
  return fmtCurrency(n);
}

export default function MortgageCalculatorClient({
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

  const [homePrice, setHomePrice] = useState("400000");
  const [downPayment, setDownPayment] = useState("80000");
  const [downPct, setDownPct] = useState("20");
  const [loanTerm, setLoanTerm] = useState("30");
  const [intRate, setIntRate] = useState("6.75");
  const [propTax, setPropTax] = useState("4800");
  const [homeIns, setHomeIns] = useState("1500");
  const [hoa, setHoa] = useState("0");
  const [pmiRate, setPmiRate] = useState("0.5");
  const [extraPmt, setExtraPmt] = useState("0");
  const [result, setResult] = useState<MortgageResults | null>(null);
  const [amortRows, setAmortRows] = useState<AmortRow[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sectionIconClass = "text-emerald-600 flex-shrink-0 mt-0.5";

  const handlePriceChange = (val: string) => {
    setHomePrice(val);
    const price = Number.parseFloat(val);
    const pct = Number.parseFloat(downPct);
    if (Number.isFinite(price) && Number.isFinite(pct)) {
      setDownPayment(String(Math.round(price * (pct / 100))));
    }
  };

  const handleDpAmtChange = (val: string) => {
    setDownPayment(val);
    const dp = Number.parseFloat(val);
    const price = Number.parseFloat(homePrice);
    if (Number.isFinite(dp) && Number.isFinite(price) && price > 0) {
      setDownPct(String(Number(((dp / price) * 100).toFixed(1))));
    }
  };

  const handleDpPctChange = (val: string) => {
    setDownPct(val);
    const pct = Number.parseFloat(val);
    const price = Number.parseFloat(homePrice);
    if (Number.isFinite(pct) && Number.isFinite(price)) {
      setDownPayment(String(Math.round(price * (pct / 100))));
    }
  };

  const compute = useCallback(() => {
    const nextErr: Record<string, string> = {};

    const price = Number.parseFloat(homePrice);
    if (!Number.isFinite(price) || price <= 0) {
      nextErr.homePrice = c.errHomePrice ?? "Invalid home price.";
    }

    const dp = Number.parseFloat(downPayment);
    if (
      !Number.isFinite(dp) ||
      dp < 0 ||
      (Number.isFinite(price) && dp >= price)
    ) {
      nextErr.downPayment = c.errDownPayment ?? "Invalid down payment.";
    }

    const rate = Number.parseFloat(intRate);
    if (!Number.isFinite(rate) || rate < 0) {
      nextErr.interestRate = c.errInterestRate ?? "Invalid rate.";
    }

    const term = Number.parseInt(loanTerm, 10);
    if (![10, 15, 20, 30].includes(term)) {
      nextErr.loanTerm = c.errLoanTerm ?? "Select a loan term.";
    }

    setErrors(nextErr);
    if (Object.keys(nextErr).length > 0) {
      setResult(null);
      setAmortRows([]);
      return;
    }

    const loan = Math.max(0, price - dp);
    const mr = rate / 100 / 12;
    const n = term * 12;
    const ltv = price > 0 ? dp / price : 1;

    let pi = 0;
    if (mr === 0) {
      pi = n > 0 ? loan / n : 0;
    } else {
      pi = (loan * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1);
    }

    const taxNum = Number.parseFloat(propTax) || 0;
    const insNum = Number.parseFloat(homeIns) || 0;
    const hoaNum = Number.parseFloat(hoa) || 0;
    const pmiNum = Number.parseFloat(pmiRate) || 0;
    const extraNum = Number.parseFloat(extraPmt) || 0;

    const taxMo = taxNum / 12;
    const insMo = insNum / 12;
    const pmiMo = ltv < 0.2 ? (loan * pmiNum) / 100 / 12 : 0;
    const hoaMo = hoaNum;
    const total = pi + taxMo + insMo + pmiMo + hoaMo;

    const { interest: intNoExtra, months: mNoExtra } = amortStats(
      loan,
      mr,
      n,
      pi,
      0
    );
    const { interest: intExtra, months: mExtra } = amortStats(
      loan,
      mr,
      n,
      pi,
      extraNum
    );

    setResult({
      pi,
      taxMo,
      insMo,
      pmiMo,
      hoaMo,
      total,
      intNoExtra,
      intExtra,
      mNoExtra,
      mExtra,
      loan,
      rate,
      term,
      extra: extraNum,
      intSaved: intNoExtra - intExtra,
      moSaved: mNoExtra - mExtra,
    });

    const rows: AmortRow[] = [];
    let bal = loan;
    for (let yr = 1; yr <= term && bal > 0; yr++) {
      let yP = 0;
      let yI = 0;
      for (let m = 0; m < 12 && bal > 0; m++) {
        const ic = bal * mr;
        let pr = pi - ic + extraNum;
        if (pr > bal) pr = bal;
        bal = Math.max(0, bal - pr);
        yP += pr;
        yI += ic;
      }
      rows.push({ yr, yP, yI, bal: Math.max(0, bal) });
    }
    setAmortRows(rows);
    scrollToRef(resultsRef);
  }, [
    homePrice,
    downPayment,
    loanTerm,
    intRate,
    propTax,
    homeIns,
    hoa,
    pmiRate,
    extraPmt,
    scrollToRef,
    c.errHomePrice,
    c.errDownPayment,
    c.errInterestRate,
    c.errLoanTerm,
  ]);

  const reset = useCallback(() => {
    setHomePrice("400000");
    setDownPayment("80000");
    setDownPct("20");
    setLoanTerm("30");
    setIntRate("6.75");
    setPropTax("4800");
    setHomeIns("1500");
    setHoa("0");
    setPmiRate("0.5");
    setExtraPmt("0");
    setResult(null);
    setAmortRows([]);
    setErrors({});
  }, []);

  const payoffLabel = (months: number) => {
    const y = Math.floor(months / 12);
    const m = months % 12;
    return m > 0 ? `${y} yr ${m} mo` : `${y} yr`;
  };

  const formCard = (
    <Card className="shadow-lg border border-gray-200/80 bg-white">
      <CardContent className="p-6 space-y-8">
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <Home className={`w-5 h-5 ${sectionIconClass}`} />
            <div className="flex-1 space-y-4">
              <Label className="text-sm font-semibold text-gray-800">
                {c.sectionLoan}
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-xs font-medium text-gray-600">
                    {c.labelHomePrice}
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      $
                    </span>
                    <Input
                      type="number"
                      min={0}
                      step={1000}
                      value={homePrice}
                      onChange={(e) => handlePriceChange(e.target.value)}
                      className="h-11 rounded-xl pl-7"
                      aria-invalid={!!errors.homePrice}
                    />
                  </div>
                  {errors.homePrice ? (
                    <p className="text-sm text-red-600">{errors.homePrice}</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">
                    {c.labelDownPayment}
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      $
                    </span>
                    <Input
                      type="number"
                      min={0}
                      value={downPayment}
                      onChange={(e) => handleDpAmtChange(e.target.value)}
                      className="h-11 rounded-xl pl-7"
                      aria-invalid={!!errors.downPayment}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">
                    {c.labelDownPct}
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      step={0.5}
                      value={downPct}
                      onChange={(e) => handleDpPctChange(e.target.value)}
                      className="h-11 rounded-xl pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      %
                    </span>
                  </div>
                  {errors.downPayment ? (
                    <p className="text-sm text-red-600">{errors.downPayment}</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">
                    {c.labelLoanTerm}
                  </Label>
                  <Select value={loanTerm} onValueChange={setLoanTerm}>
                    <SelectTrigger
                      className="h-11 rounded-xl"
                      aria-invalid={!!errors.loanTerm}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">{c.term10}</SelectItem>
                      <SelectItem value="15">{c.term15}</SelectItem>
                      <SelectItem value="20">{c.term20}</SelectItem>
                      <SelectItem value="30">{c.term30}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.loanTerm ? (
                    <p className="text-sm text-red-600">{errors.loanTerm}</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">
                    {c.labelInterestRate}
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      min={0}
                      max={30}
                      step={0.05}
                      value={intRate}
                      onChange={(e) => setIntRate(e.target.value)}
                      className="h-11 rounded-xl pr-8"
                      aria-invalid={!!errors.interestRate}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      %
                    </span>
                  </div>
                  {errors.interestRate ? (
                    <p className="text-sm text-red-600">{errors.interestRate}</p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <Building2 className={`w-5 h-5 ${sectionIconClass}`} />
            <div className="flex-1 space-y-4">
              <Label className="text-sm font-semibold text-gray-800">
                {c.sectionCosts}
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">
                    {c.labelPropertyTax}
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      $
                    </span>
                    <Input
                      type="number"
                      min={0}
                      value={propTax}
                      onChange={(e) => setPropTax(e.target.value)}
                      className="h-11 rounded-xl pl-7"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">
                    {c.labelHomeInsurance}
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      $
                    </span>
                    <Input
                      type="number"
                      min={0}
                      value={homeIns}
                      onChange={(e) => setHomeIns(e.target.value)}
                      className="h-11 rounded-xl pl-7"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">
                    {c.labelHoa}
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      $
                    </span>
                    <Input
                      type="number"
                      min={0}
                      value={hoa}
                      onChange={(e) => setHoa(e.target.value)}
                      className="h-11 rounded-xl pl-7"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">
                    {c.labelPmiRate}
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      min={0}
                      max={5}
                      step={0.1}
                      value={pmiRate}
                      onChange={(e) => setPmiRate(e.target.value)}
                      className="h-11 rounded-xl pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      %
                    </span>
                  </div>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-xs font-medium text-gray-600">
                    {c.labelExtraPayment}
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      $
                    </span>
                    <Input
                      type="number"
                      min={0}
                      value={extraPmt}
                      onChange={(e) => setExtraPmt(e.target.value)}
                      className="h-11 rounded-xl pl-7"
                    />
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 italic">{c.hintCosts}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50/90 p-4 flex gap-3">
          <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900 text-sm mb-1">
              {c.importantTitle}
            </p>
            <p className="text-sm text-amber-950/90 leading-relaxed">
              {c.importantBody}
            </p>
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
                <Landmark className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              {c.pageTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {c.pageDescriptionBefore}
              <strong className="font-semibold text-gray-900">
                {c.pageDescriptionBold}
              </strong>
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
                  <CardDescription className="text-base">
                    {c.resultsSubtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {!result ? (
                    <div className="rounded-xl border border-dashed border-gray-200 bg-slate-50/50 py-14 px-6 text-center">
                      <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-lg font-semibold text-gray-800 mb-2">
                        {c.emptyTitle}
                      </p>
                      <p className="text-gray-600 max-w-md mx-auto">
                        {c.emptyHint}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
                        <p className="text-xs font-medium text-emerald-900 uppercase tracking-wide">
                          {c.metricMonthlyTotal}
                        </p>
                        <p className="text-4xl font-bold text-emerald-900 tabular-nums">
                          {fmtCurrency(result.total)}
                          <span className="text-lg font-semibold text-emerald-700">
                            {" "}
                            {c.suffixPerMonth}
                          </span>
                        </p>
                        <p className="text-sm text-emerald-800/80 mt-1">
                          {result.term}-year · {result.rate}% · Loan{" "}
                          {fmtK(result.loan)}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
                          <p className="text-xs font-medium text-emerald-800 uppercase tracking-wide">
                            {c.metricPrincipalInterest}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {fmtCurrency(result.pi)}
                            <span className="text-sm font-semibold text-emerald-700">
                              {" "}
                              {c.suffixPerMonth}
                            </span>
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                          <p className="text-xs font-medium text-slate-700 uppercase tracking-wide">
                            {c.metricPropertyTax}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {fmtCurrency(result.taxMo)}
                            <span className="text-sm font-semibold text-slate-600">
                              {" "}
                              {c.suffixPerMonth}
                            </span>
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                            {c.metricHomeInsurance}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {fmtCurrency(result.insMo)}
                            <span className="text-sm font-semibold text-gray-600">
                              {" "}
                              {c.suffixPerMonth}
                            </span>
                          </p>
                        </div>
                        {result.pmiMo > 0 ? (
                          <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-4">
                            <p className="text-xs font-medium text-amber-900 uppercase tracking-wide">
                              {c.metricPmi}
                            </p>
                            <p className="text-2xl font-bold text-gray-900 tabular-nums">
                              {fmtCurrency(result.pmiMo)}
                              <span className="text-sm font-semibold text-amber-800">
                                {" "}
                                {c.suffixPerMonth}
                              </span>
                            </p>
                          </div>
                        ) : null}
                        {result.hoaMo > 0 ? (
                          <div className="rounded-xl border border-slate-200 bg-white p-4">
                            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                              {c.metricHoa}
                            </p>
                            <p className="text-2xl font-bold text-gray-900 tabular-nums">
                              {fmtCurrency(result.hoaMo)}
                              <span className="text-sm font-semibold text-gray-600">
                                {" "}
                                {c.suffixPerMonth}
                              </span>
                            </p>
                          </div>
                        ) : null}
                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                            {c.metricLoanAmount}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {fmtK(result.loan)}
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                            {c.metricTotalInterest}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {fmtK(
                              result.extra > 0 ? result.intExtra : result.intNoExtra
                            )}
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                            {c.metricTotalPaid}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {fmtK(
                              result.loan +
                                (result.extra > 0
                                  ? result.intExtra
                                  : result.intNoExtra)
                            )}
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                            {c.metricPayoffTerm}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {payoffLabel(
                              result.extra > 0 ? result.mExtra : result.mNoExtra
                            )}
                          </p>
                        </div>
                      </div>

                      {result.extra > 0 && result.intSaved > 100 ? (
                        <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-4">
                          <p className="font-semibold text-emerald-900 flex items-center gap-2 mb-2">
                            <PiggyBank className="w-4 h-4" />
                            {c.extraSavingsTitle}
                          </p>
                          <p className="text-sm text-emerald-950/85 mb-3">
                            {c.extraSavingsNote}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            <div className="rounded-lg bg-white/80 border border-emerald-100 px-3 py-2">
                              <span className="text-gray-500 block text-xs">
                                {c.extraInterestSaved}
                              </span>
                              <span className="font-bold text-emerald-900 tabular-nums">
                                {fmtCurrency(result.intSaved)}
                              </span>
                            </div>
                            <div className="rounded-lg bg-white/80 border border-emerald-100 px-3 py-2">
                              <span className="text-gray-500 block text-xs">
                                {c.extraMonthsSaved}
                              </span>
                              <span className="font-bold text-emerald-900 tabular-nums">
                                {result.moSaved} mo
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {amortRows.length > 0 ? (
                        <div className="rounded-xl border border-slate-200 overflow-hidden">
                          <div className="bg-slate-50 px-4 py-3 border-b">
                            <p className="font-semibold text-gray-900 text-sm">
                              {c.amortTitle}
                            </p>
                            <p className="text-xs text-gray-500">{c.amortNote}</p>
                          </div>
                          <div className="max-h-64 overflow-y-auto">
                            <table className="w-full text-sm">
                              <thead className="sticky top-0 bg-slate-800 text-white">
                                <tr>
                                  <th className="px-3 py-2 text-left text-xs font-semibold">
                                    {c.amortYear}
                                  </th>
                                  <th className="px-3 py-2 text-right text-xs font-semibold">
                                    {c.amortPrincipal}
                                  </th>
                                  <th className="px-3 py-2 text-right text-xs font-semibold">
                                    {c.amortInterest}
                                  </th>
                                  <th className="px-3 py-2 text-right text-xs font-semibold">
                                    {c.amortBalance}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {amortRows.map((row, i) => (
                                  <tr
                                    key={row.yr}
                                    className={
                                      i % 2 === 1 ? "bg-slate-50" : "bg-white"
                                    }
                                  >
                                    <td className="px-3 py-2 font-medium text-gray-800">
                                      {row.yr}
                                    </td>
                                    <td className="px-3 py-2 text-right tabular-nums">
                                      ${fmt(row.yP)}
                                    </td>
                                    <td className="px-3 py-2 text-right tabular-nums">
                                      ${fmt(row.yI)}
                                    </td>
                                    <td className="px-3 py-2 text-right tabular-nums">
                                      ${fmt(row.bal)}
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
            entityId="mortgage-calculator"
            entityType="calculator"
            creatorSlug="neo-nicholas"
            initialRatingTotal={0}
            initialRatingCount={0}
          />

          <CalculatorGuide data={guideData} layout="article" />

          <SimilarCalculators
            calculators={[
              {
                calculatorName: "Amortization Calculator",
                calculatorHref: "/financial/amortization-calculator",
                calculatorDescription:
                  "Generate a full amortization schedule for any loan.",
              },
              {
                calculatorName: "Mortgage Payoff Calculator",
                calculatorHref: "/financial/mortgage-payoff-calculator",
                calculatorDescription:
                  "Find your exact payoff date with extra payments.",
              },
              {
                calculatorName: "House Affordability Calculator",
                calculatorHref: "/financial/house-affordability-calculator",
                calculatorDescription:
                  "Determine how much house you can afford.",
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
