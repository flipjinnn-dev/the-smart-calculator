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
  CreditCard,
  Info,
  Lightbulb,
  RotateCcw,
  Smile,
  Stethoscope,
} from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide, { type CalculatorGuideData } from "@/components/calculator-guide";
import { RatingProfileSection } from "@/components/rating-profile-section";
import {
  calculateInvisalignCost,
  DEFAULT_INSURANCE_BENEFIT,
  DEFAULT_TOTAL_COST,
  formatCurrency,
  type FinancingTermMonths,
  type InvisalignCostResult,
  type TreatmentType,
} from "@/lib/invisalign-cost-calculator";

interface ContentShape {
  pageTitle?: string;
  pageDescriptionBefore?: string;
  pageDescriptionBold?: string;
  pageDescriptionAfter?: string;
  sectionTreatment?: string;
  labelTreatmentType?: string;
  placeholderTreatmentType?: string;
  treatmentLite?: string;
  treatmentModerate?: string;
  treatmentComprehensive?: string;
  hintTreatmentType?: string;
  labelTotalCost?: string;
  hintTotalCost?: string;
  sectionCoverage?: string;
  labelHasInsurance?: string;
  insuranceYes?: string;
  insuranceNo?: string;
  labelInsuranceBenefit?: string;
  hintInsuranceBenefit?: string;
  labelDownPayment?: string;
  hintDownPayment?: string;
  labelFinancingTerm?: string;
  financing6?: string;
  financing12?: string;
  financing24?: string;
  financing36?: string;
  labelApr?: string;
  hintApr?: string;
  importantTitle?: string;
  importantBody?: string;
  btnCalculate?: string;
  btnReset?: string;
  resultsTitle?: string;
  resultsSubtitle?: string;
  emptyTitle?: string;
  emptyHint?: string;
  metricTotalCost?: string;
  metricInsurance?: string;
  metricOutOfPocket?: string;
  metricMonthly?: string;
  paymentPlanTitle?: string;
  paymentPlanNote?: string;
  optionDownPayment?: string;
  optionFinanced?: string;
  optionTotalPaid?: string;
  proTipsTitle?: string;
  proTip1?: string;
  proTip2?: string;
  proTip3?: string;
  proTip4?: string;
  proTip5?: string;
  errTreatmentType?: string;
  errTotalCost?: string;
  errInsurance?: string;
  errDownPayment?: string;
}

const defaultContent: ContentShape = {
  pageTitle: "Invisalign Cost Calculator",
  pageDescriptionBefore: "Most Invisalign treatments cost ",
  pageDescriptionBold: "$3,000–$8,000.",
  pageDescriptionAfter:
    " Use our calculator for exact out-of-pocket cost based on treatment type, insurance, and payment plan.",
};

export default function InvisalignCostCalculatorClient({
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

  const [treatmentType, setTreatmentType] = useState<TreatmentType | "">("");
  const [totalCost, setTotalCost] = useState("");
  const [hasInsurance, setHasInsurance] = useState<"yes" | "no">("yes");
  const [insuranceBenefit, setInsuranceBenefit] = useState(String(DEFAULT_INSURANCE_BENEFIT));
  const [downPayment, setDownPayment] = useState("500");
  const [financingTerm, setFinancingTerm] = useState<FinancingTermMonths>(24);
  const [apr, setApr] = useState("");
  const [result, setResult] = useState<InvisalignCostResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sectionIconClass = "text-emerald-600 flex-shrink-0 mt-0.5";

  const onTreatmentChange = useCallback((value: TreatmentType) => {
    setTreatmentType(value);
    setTotalCost(String(DEFAULT_TOTAL_COST[value]));
    if (value === "comprehensive") {
      setInsuranceBenefit("2000");
    } else {
      setInsuranceBenefit(String(DEFAULT_INSURANCE_BENEFIT));
    }
  }, []);

  const compute = useCallback(() => {
    const nextErr: Record<string, string> = {};
    if (!treatmentType) nextErr.treatmentType = c.errTreatmentType ?? "Select treatment type.";

    const cost = Number.parseFloat(totalCost);
    if (!Number.isFinite(cost) || cost < 0) {
      nextErr.totalCost = c.errTotalCost ?? "Invalid total cost.";
    }

    const benefit =
      hasInsurance === "yes"
        ? Number.parseFloat(insuranceBenefit)
        : 0;

    if (hasInsurance === "yes" && (!Number.isFinite(benefit) || benefit < 0)) {
      nextErr.insurance = c.errInsurance ?? "Invalid insurance benefit.";
    }

    const down = downPayment.trim() === "" ? 0 : Number.parseFloat(downPayment);
    if (!Number.isFinite(down) || down < 0) {
      nextErr.downPayment = c.errDownPayment ?? "Invalid down payment.";
    }

    setErrors(nextErr);
    if (Object.keys(nextErr).length > 0 || !treatmentType) {
      setResult(null);
      return;
    }

    const aprRaw = apr.trim();
    const aprVal = aprRaw === "" ? 0 : Number.parseFloat(aprRaw);

    const out = calculateInvisalignCost({
      treatmentType,
      totalCost: cost,
      insuranceBenefit: benefit,
      downPayment: down,
      financingTermMonths: financingTerm,
      aprPct: Number.isFinite(aprVal) ? aprVal : 0,
    });

    if (!out) {
      setResult(null);
      return;
    }

    if (down > out.outOfPocketCost) {
      setErrors({ downPayment: c.errDownPayment ?? "Down payment too high." });
      setResult(null);
      return;
    }

    setResult(out);
    scrollToRef(resultsRef);
  }, [
    treatmentType,
    totalCost,
    hasInsurance,
    insuranceBenefit,
    downPayment,
    financingTerm,
    apr,
    scrollToRef,
    c.errTreatmentType,
    c.errTotalCost,
    c.errInsurance,
    c.errDownPayment,
  ]);

  const reset = useCallback(() => {
    setTreatmentType("");
    setTotalCost("");
    setHasInsurance("yes");
    setInsuranceBenefit(String(DEFAULT_INSURANCE_BENEFIT));
    setDownPayment("500");
    setFinancingTerm(24);
    setApr("");
    setResult(null);
    setErrors({});
  }, []);

  const formCard = (
    <Card className="shadow-lg border border-gray-200/80 bg-white">
      <CardContent className="p-6 space-y-8">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Stethoscope className={`w-5 h-5 ${sectionIconClass}`} />
            <div className="flex-1 space-y-4">
              <Label className="text-sm font-semibold text-gray-800">{c.sectionTreatment}</Label>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">{c.labelTreatmentType}</Label>
                <Select
                  value={treatmentType || undefined}
                  onValueChange={(v) => onTreatmentChange(v as TreatmentType)}
                >
                  <SelectTrigger className="h-11 rounded-xl" aria-invalid={!!errors.treatmentType}>
                    <SelectValue placeholder={c.placeholderTreatmentType} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lite">{c.treatmentLite}</SelectItem>
                    <SelectItem value="moderate">{c.treatmentModerate}</SelectItem>
                    <SelectItem value="comprehensive">{c.treatmentComprehensive}</SelectItem>
                  </SelectContent>
                </Select>
                {c.hintTreatmentType ? (
                  <p className="text-sm text-gray-500 italic">{c.hintTreatmentType}</p>
                ) : null}
                {errors.treatmentType ? (
                  <p className="text-sm text-red-600">{errors.treatmentType}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">{c.labelTotalCost}</Label>
                <div className="flex gap-2">
                  <span className="flex items-center text-sm font-semibold text-gray-600 tabular-nums">$</span>
                  <Input
                    type="number"
                    min={0}
                    step={50}
                    value={totalCost}
                    onChange={(e) => setTotalCost(e.target.value)}
                    placeholder="4500"
                    className="h-11 rounded-xl flex-1"
                    aria-invalid={!!errors.totalCost}
                  />
                </div>
                {c.hintTotalCost ? (
                  <p className="text-sm text-gray-500 italic">{c.hintTotalCost}</p>
                ) : null}
                {errors.totalCost ? (
                  <p className="text-sm text-red-600">{errors.totalCost}</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <CreditCard className={`w-5 h-5 ${sectionIconClass}`} />
            <div className="flex-1 space-y-4">
              <Label className="text-sm font-semibold text-gray-800">{c.sectionCoverage}</Label>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">{c.labelHasInsurance}</Label>
                <Select
                  value={hasInsurance}
                  onValueChange={(v) => setHasInsurance(v as "yes" | "no")}
                >
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">{c.insuranceYes}</SelectItem>
                    <SelectItem value="no">{c.insuranceNo}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {hasInsurance === "yes" ? (
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">{c.labelInsuranceBenefit}</Label>
                  <div className="flex gap-2">
                    <span className="flex items-center text-sm font-semibold text-gray-600 tabular-nums">$</span>
                    <Input
                      type="number"
                      min={0}
                      step={50}
                      value={insuranceBenefit}
                      onChange={(e) => setInsuranceBenefit(e.target.value)}
                      placeholder="1500"
                      className="h-11 rounded-xl flex-1"
                      aria-invalid={!!errors.insurance}
                    />
                  </div>
                  {c.hintInsuranceBenefit ? (
                    <p className="text-sm text-gray-500 italic">{c.hintInsuranceBenefit}</p>
                  ) : null}
                  {errors.insurance ? (
                    <p className="text-sm text-red-600">{errors.insurance}</p>
                  ) : null}
                </div>
              ) : null}

              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">{c.labelDownPayment}</Label>
                <div className="flex gap-2">
                  <span className="flex items-center text-sm font-semibold text-gray-600 tabular-nums">$</span>
                  <Input
                    type="number"
                    min={0}
                    step={50}
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    placeholder="500"
                    className="h-11 rounded-xl flex-1"
                    aria-invalid={!!errors.downPayment}
                  />
                </div>
                {c.hintDownPayment ? (
                  <p className="text-sm text-gray-500 italic">{c.hintDownPayment}</p>
                ) : null}
                {errors.downPayment ? (
                  <p className="text-sm text-red-600">{errors.downPayment}</p>
                ) : null}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">{c.labelFinancingTerm}</Label>
                  <Select
                    value={String(financingTerm)}
                    onValueChange={(v) => setFinancingTerm(Number(v) as FinancingTermMonths)}
                  >
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">{c.financing6}</SelectItem>
                      <SelectItem value="12">{c.financing12}</SelectItem>
                      <SelectItem value="24">{c.financing24}</SelectItem>
                      <SelectItem value="36">{c.financing36}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">{c.labelApr}</Label>
                  <Input
                    type="number"
                    min={0}
                    step={0.1}
                    value={apr}
                    onChange={(e) => setApr(e.target.value)}
                    placeholder="0"
                    className="h-11 rounded-xl"
                  />
                  {c.hintApr ? (
                    <p className="text-sm text-gray-500 italic">{c.hintApr}</p>
                  ) : null}
                </div>
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
                <Smile className="w-8 h-8 text-white" />
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
                      <Smile className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-lg font-semibold text-gray-800 mb-2">{c.emptyTitle}</p>
                      <p className="text-gray-600 max-w-md mx-auto">{c.emptyHint}</p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
                          <p className="text-xs font-medium text-emerald-800 uppercase tracking-wide">
                            {c.metricTotalCost}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {formatCurrency(result.totalTreatmentCost)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{result.treatmentTypeLabel}</p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                          <p className="text-xs font-medium text-slate-700 uppercase tracking-wide">
                            {c.metricInsurance}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {formatCurrency(result.insuranceCoverageAmount)}
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                            {c.metricOutOfPocket}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            {formatCurrency(result.outOfPocketCost)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            After insurance; before down payment.
                          </p>
                        </div>
                        <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
                          <p className="text-xs font-medium text-emerald-900 uppercase tracking-wide">
                            {c.metricMonthly}
                          </p>
                          <p className="text-3xl font-bold text-emerald-900 tabular-nums">
                            {formatCurrency(Math.round(result.monthlyPayment))}
                          </p>
                          <p className="text-xs text-emerald-800/80 mt-1">
                            Over {financingTerm} months
                            {result.totalInterestPaid > 0
                              ? ` · ${formatCurrency(Math.round(result.totalInterestPaid))} interest`
                              : " · interest-free"}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-4">
                        <p className="font-semibold text-amber-950 flex items-center gap-2 mb-2">
                          <Lightbulb className="w-4 h-4" />
                          {c.paymentPlanTitle}
                        </p>
                        <p className="text-sm text-amber-950/85 mb-3">{c.paymentPlanNote}</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                          <li className="rounded-lg bg-white/80 border border-amber-100 px-3 py-2">
                            <span className="text-gray-500 block text-xs">{c.optionDownPayment}</span>
                            <span className="font-bold text-gray-900 tabular-nums">
                              {formatCurrency(
                                Math.min(
                                  Number.parseFloat(downPayment) || 0,
                                  result.outOfPocketCost
                                )
                              )}
                            </span>
                          </li>
                          <li className="rounded-lg bg-white/80 border border-amber-100 px-3 py-2">
                            <span className="text-gray-500 block text-xs">{c.optionFinanced}</span>
                            <span className="font-bold text-gray-900 tabular-nums">
                              {formatCurrency(result.amountFinanced)}
                            </span>
                          </li>
                          <li className="rounded-lg bg-white/80 border border-amber-100 px-3 py-2">
                            <span className="text-gray-500 block text-xs">{c.optionTotalPaid}</span>
                            <span className="font-bold text-gray-900 tabular-nums">
                              {formatCurrency(Math.round(result.totalFinancingCost))}
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
            entityId="invisalign-cost-calculator"
            entityType="calculator"
            creatorSlug="neo-nicholas"
            initialRatingTotal={0}
            initialRatingCount={0}
          />

          <CalculatorGuide data={guideData} layout="article" />

          <SimilarCalculators
            calculators={[
              {
                calculatorName: "Dental Implant Cost Calculator",
                calculatorHref: "/health/dental-implant-cost-calculator",
                calculatorDescription:
                  "Estimate dental implant costs with international price comparison and implant type options.",
              },
              {
                calculatorName: "Payment Calculator",
                calculatorHref: "/financial/payment-calculator",
                calculatorDescription:
                  "Calculate loan payments, interest, and amortization schedules for any financing plan.",
              },
              {
                calculatorName: "Savings Calculator",
                calculatorHref: "/financial/savings-calculator",
                calculatorDescription:
                  "Plan savings goals with contributions, interest, and long-term growth projections.",
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
