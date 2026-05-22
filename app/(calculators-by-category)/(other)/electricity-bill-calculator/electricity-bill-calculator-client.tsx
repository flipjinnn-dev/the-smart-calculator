"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  Info,
  Lightbulb,
  RotateCcw,
  Zap,
  Plug,
  Calendar,
  DollarSign,
} from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide, { type CalculatorGuideData } from "@/components/calculator-guide";
import { RatingProfileSection } from "@/components/rating-profile-section";

type CurrencyCode = "USD" | "EUR" | "GBP" | "PKR" | "INR";

const CURRENCY_LOCALE: Record<CurrencyCode, string> = {
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  PKR: "en-PK",
  INR: "en-IN",
};

interface BillResult {
  currency: CurrencyCode;
  kilowatts: number;
  dailyKwh: number;
  monthlyKwh: number;
  subtotal: number;
  taxAmount: number;
  serviceCharges: number;
  monthlyBill: number;
  annualCost: number;
  costPerHour: number;
  formulaNote: string;
}

function parsePositive(value: string): number | null {
  const n = Number.parseFloat(value);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

function parseHours(value: string): number | null {
  const n = Number.parseFloat(value);
  if (!Number.isFinite(n) || n < 0 || n > 24) return null;
  return n;
}

function parseNonNegative(value: string): number | null {
  const n = Number.parseFloat(value);
  if (!Number.isFinite(n) || n < 0) return null;
  return n;
}

function formatMoney(currency: CurrencyCode, amount: number): string {
  return new Intl.NumberFormat(CURRENCY_LOCALE[currency], {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function computeBill(
  watts: number,
  hours: number,
  rate: number,
  days: number,
  quantity: number,
  peak: number,
  taxPercent: number,
  serviceCharges: number,
  currency: CurrencyCode
): BillResult {
  const kilowatts = watts / 1000;
  const dailyKwh = kilowatts * hours * peak;
  const monthlyKwh = dailyKwh * days * quantity;
  const subtotal = monthlyKwh * rate;
  const taxAmount = subtotal * (taxPercent / 100);
  const monthlyBill = subtotal + taxAmount + serviceCharges;
  const annualCost = days > 0 ? (monthlyBill / days) * 365 : monthlyBill * 12;
  const costPerHour = kilowatts * rate;

  return {
    currency,
    kilowatts: Math.round(kilowatts * 1000) / 1000,
    dailyKwh: Math.round(dailyKwh * 100) / 100,
    monthlyKwh: Math.round(monthlyKwh * 100) / 100,
    subtotal: Math.round(subtotal * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
    serviceCharges: Math.round(serviceCharges * 100) / 100,
    monthlyBill: Math.round(monthlyBill * 100) / 100,
    annualCost: Math.round(annualCost * 100) / 100,
    costPerHour: Math.round(costPerHour * 10000) / 10000,
    formulaNote: `kWh = (${watts}÷1000)×${hours}h×${peak}×${days}d×${quantity}; bill = kWh×${rate}+tax+fees`,
  };
}

interface ContentShape {
  pageTitle?: string;
  pageDescription?: string;
  sectionUsage?: string;
  labelWattage?: string;
  placeholderWattage?: string;
  labelHours?: string;
  labelRate?: string;
  labelDays?: string;
  labelQuantity?: string;
  labelCurrency?: string;
  currencyUsd?: string;
  currencyEur?: string;
  currencyGbp?: string;
  currencyPkr?: string;
  currencyInr?: string;
  sectionAdvanced?: string;
  labelPeak?: string;
  peakHint?: string;
  labelTax?: string;
  labelService?: string;
  importantTitle?: string;
  importantBody?: string;
  btnCalculate?: string;
  btnReset?: string;
  resultsTitle?: string;
  resultsSubtitle?: string;
  emptyTitle?: string;
  emptyHint?: string;
  metricDailyKwh?: string;
  metricMonthlyKwh?: string;
  metricMonthlyBill?: string;
  metricAnnual?: string;
  metricHourly?: string;
  metricSubtotal?: string;
  metricTax?: string;
  metricService?: string;
  formulaUsed?: string;
  proTipsTitle?: string;
  proTip1?: string;
  proTip2?: string;
  proTip3?: string;
  proTip4?: string;
  proTip5?: string;
  errWattage?: string;
  errHours?: string;
  errRate?: string;
  errDays?: string;
  errQuantity?: string;
}

const defaultContent: ContentShape = {
  pageTitle: "Electricity Bill Calculator",
  pageDescription:
    "Estimate your monthly electric bill using appliance wattage, daily hours, and your local kWh rate. Follows standard kWh billing — get kWh usage, monthly cost, and annual estimate in seconds.",
};

export default function ElectricityBillCalculatorClient({
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

  const [wattage, setWattage] = useState("1500");
  const [hours, setHours] = useState("8");
  const [rate, setRate] = useState("0.12");
  const [days, setDays] = useState("30");
  const [quantity, setQuantity] = useState("1");
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [peak, setPeak] = useState("1");
  const [taxPercent, setTaxPercent] = useState("0");
  const [serviceCharges, setServiceCharges] = useState("0");
  const [result, setResult] = useState<BillResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const parseInputs = useCallback(() => {
    const w = parsePositive(wattage);
    const h = parseHours(hours);
    const r = parsePositive(rate);
    const d = parsePositive(days);
    const q = parsePositive(quantity);
    const p = parsePositive(peak) ?? 1;
    const tax = parseNonNegative(taxPercent) ?? 0;
    const svc = parseNonNegative(serviceCharges) ?? 0;
    const ok = w !== null && h !== null && r !== null && d !== null && q !== null;
    return { ok, w, h, r, d, q, peak: p, tax, svc };
  }, [wattage, hours, rate, days, quantity, peak, taxPercent, serviceCharges]);

  const runCompute = useCallback(
    (scroll: boolean) => {
      const nextErr: Record<string, string> = {};
      const v = parseInputs();
      if (!v.ok || v.w === null || v.h === null || v.r === null || v.d === null || v.q === null) {
        if (!v.w) nextErr.wattage = c.errWattage ?? "Invalid wattage";
        if (v.h === null) nextErr.hours = c.errHours ?? "Invalid hours";
        if (!v.r) nextErr.rate = c.errRate ?? "Invalid rate";
        if (!v.d) nextErr.days = c.errDays ?? "Invalid days";
        if (!v.q) nextErr.quantity = c.errQuantity ?? "Invalid quantity";
        setErrors(nextErr);
        setResult(null);
        return;
      }
      setErrors({});
      setResult(
        computeBill(v.w, v.h, v.r, v.d, v.q, v.peak, v.tax, v.svc, currency)
      );
      if (scroll) scrollToRef(resultsRef);
    },
    [parseInputs, currency, scrollToRef, c]
  );

  useEffect(() => {
    const v = parseInputs();
    if (v.ok && v.w !== null && v.h !== null && v.r !== null && v.d !== null && v.q !== null) {
      setResult(
        computeBill(v.w, v.h, v.r, v.d, v.q, v.peak, v.tax, v.svc, currency)
      );
    } else {
      setResult(null);
    }
  }, [wattage, hours, rate, days, quantity, peak, taxPercent, serviceCharges, currency, parseInputs]);

  const reset = useCallback(() => {
    setWattage("1500");
    setHours("8");
    setRate("0.12");
    setDays("30");
    setQuantity("1");
    setCurrency("USD");
    setPeak("1");
    setTaxPercent("0");
    setServiceCharges("0");
    setErrors({});
  }, []);

  const fmt = (n: number) => (result ? formatMoney(result.currency, n) : "");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <Zap className="w-8 h-8 text-white" />
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
            <div className="space-y-6">
              <Card className="shadow-lg border border-gray-200/80 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100/80 py-5 px-6">
                  <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 text-gray-900">
                    <Calculator className="w-6 h-6 text-blue-600" />
                    Inputs
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600">
                    Results update as you type.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-start gap-2">
                    <Plug className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-4">
                      <Label className="text-sm font-semibold text-gray-800">
                        {c.sectionUsage}
                      </Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2 sm:col-span-2">
                          <Label className="text-xs font-medium text-gray-600">
                            {c.labelWattage}
                          </Label>
                          <Input
                            type="number"
                            min={1}
                            step={1}
                            placeholder={c.placeholderWattage}
                            value={wattage}
                            onChange={(e) => setWattage(e.target.value)}
                            className="h-11 rounded-xl"
                            aria-invalid={!!errors.wattage}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-medium text-gray-600">
                            {c.labelHours}
                          </Label>
                          <Input
                            type="number"
                            min={0}
                            max={24}
                            step={0.1}
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                            className="h-11 rounded-xl"
                            aria-invalid={!!errors.hours}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-medium text-gray-600">
                            {c.labelQuantity}
                          </Label>
                          <Input
                            type="number"
                            min={1}
                            step={1}
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="h-11 rounded-xl"
                            aria-invalid={!!errors.quantity}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-medium text-gray-600">
                            {c.labelRate}
                          </Label>
                          <Input
                            type="number"
                            min={0.001}
                            step={0.01}
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            className="h-11 rounded-xl"
                            aria-invalid={!!errors.rate}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-medium text-gray-600">
                            {c.labelDays}
                          </Label>
                          <Input
                            type="number"
                            min={1}
                            step={1}
                            value={days}
                            onChange={(e) => setDays(e.target.value)}
                            className="h-11 rounded-xl"
                            aria-invalid={!!errors.days}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-medium text-gray-600">
                            {c.labelCurrency}
                          </Label>
                          <Select
                            value={currency}
                            onValueChange={(v) => setCurrency(v as CurrencyCode)}
                          >
                            <SelectTrigger className="h-11 rounded-xl">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">{c.currencyUsd}</SelectItem>
                              <SelectItem value="EUR">{c.currencyEur}</SelectItem>
                              <SelectItem value="GBP">{c.currencyGbp}</SelectItem>
                              <SelectItem value="PKR">{c.currencyPkr}</SelectItem>
                              <SelectItem value="INR">{c.currencyInr}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4 space-y-4">
                    <p className="text-sm font-semibold text-indigo-950 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      {c.sectionAdvanced}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-gray-600">
                          {c.labelPeak}
                        </Label>
                        <Input
                          type="number"
                          min={0.1}
                          step={0.05}
                          value={peak}
                          onChange={(e) => setPeak(e.target.value)}
                          className="h-11 rounded-xl bg-white"
                        />
                        <p className="text-xs text-gray-500">{c.peakHint}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-gray-600">
                          {c.labelTax}
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min={0}
                            step={0.1}
                            value={taxPercent}
                            onChange={(e) => setTaxPercent(e.target.value)}
                            className="h-11 rounded-xl bg-white"
                          />
                          <span className="text-sm text-gray-600">%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-gray-600">
                          {c.labelService}
                        </Label>
                        <Input
                          type="number"
                          min={0}
                          step={0.01}
                          value={serviceCharges}
                          onChange={(e) => setServiceCharges(e.target.value)}
                          className="h-11 rounded-xl bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {(errors.wattage || errors.hours || errors.rate || errors.days || errors.quantity) && (
                    <p className="text-sm text-red-600">
                      {errors.wattage || errors.hours || errors.rate || errors.days || errors.quantity}
                    </p>
                  )}

                  <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50/90 p-4 flex gap-3">
                    <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-900 text-sm mb-1">
                        {c.importantTitle}
                      </p>
                      <p className="text-sm text-amber-950/90 leading-relaxed">{c.importantBody}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      onClick={() => runCompute(true)}
                      className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md"
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
            </div>

            <div ref={resultsRef} className="space-y-6">
              <Card className="shadow-lg border border-gray-200/80 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b py-5 px-6">
                  <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 text-gray-900">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                    {c.resultsTitle}
                  </CardTitle>
                  <CardDescription className="text-base">{c.resultsSubtitle}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {!result ? (
                    <div className="rounded-xl border border-dashed border-gray-200 bg-slate-50/50 py-14 px-6 text-center">
                      <Zap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-lg font-semibold text-gray-800 mb-2">{c.emptyTitle}</p>
                      <p className="text-gray-600 max-w-md mx-auto">{c.emptyHint}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                          <p className="text-xs font-medium text-blue-800 uppercase tracking-wide">
                            {c.metricDailyKwh}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {result.dailyKwh.toLocaleString()} kWh
                          </p>
                        </div>
                        <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
                          <p className="text-xs font-medium text-indigo-800 uppercase tracking-wide">
                            {c.metricMonthlyKwh}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {result.monthlyKwh.toLocaleString()} kWh
                          </p>
                        </div>
                        <div className="rounded-xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:col-span-2">
                          <p className="text-xs font-medium text-blue-900 uppercase tracking-wide">
                            {c.metricMonthlyBill}
                          </p>
                          <p className="text-3xl font-bold text-blue-950 tabular-nums">
                            {fmt(result.monthlyBill)}
                          </p>
                          {(result.taxAmount > 0 || result.serviceCharges > 0) && (
                            <div className="mt-3 text-sm text-blue-900/80 space-y-1">
                              <p>
                                {c.metricSubtotal}: {fmt(result.subtotal)}
                              </p>
                              {result.taxAmount > 0 ? (
                                <p>
                                  {c.metricTax}: {fmt(result.taxAmount)}
                                </p>
                              ) : null}
                              {result.serviceCharges > 0 ? (
                                <p>
                                  {c.metricService}: {fmt(result.serviceCharges)}
                                </p>
                              ) : null}
                            </div>
                          )}
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                          <p className="text-xs font-medium text-slate-700 uppercase tracking-wide flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {c.metricAnnual}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {fmt(result.annualCost)}
                          </p>
                        </div>
                        <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-4">
                          <p className="text-xs font-medium text-amber-900 uppercase tracking-wide">
                            {c.metricHourly}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {fmt(result.costPerHour)}
                            <span className="text-sm font-medium text-gray-600"> /hr</span>
                          </p>
                          <p className="text-xs text-amber-800 mt-1">
                            @ {result.kilowatts} kW per appliance
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                        <span className="font-medium text-gray-800">{c.formulaUsed}:</span>{" "}
                        {result.formulaNote}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="rounded-xl border-l-4 border-blue-400 bg-blue-50/90 p-5 shadow-sm">
                <p className="font-semibold text-blue-950 flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5" />
                  {c.proTipsTitle}
                </p>
                <ul className="space-y-2 text-sm text-blue-950/90 list-disc pl-5">
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
            entityId="electricity-bill-calculator"
            entityType="calculator"
            creatorSlug="aiden-asher"
            initialRatingTotal={0}
            initialRatingCount={0}
          />

          <CalculatorGuide data={guideData} layout="article" />

          <SimilarCalculators
            calculators={[
              {
                calculatorName: "Calorie Calculator",
                calculatorHref: "/health/calorie-calculator",
                calculatorDescription: "Estimate daily calorie needs based on activity and goals.",
              },
              {
                calculatorName: "Compound Interest Calculator",
                calculatorHref: "/financial/compound-interest-calculator",
                calculatorDescription: "Project savings growth with compound interest over time.",
              },
              {
                calculatorName: "Shipping Cost Calculator",
                calculatorHref: "/shipping-cost-calculator",
                calculatorDescription: "Estimate shipping costs by weight, size, and destination.",
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
