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
  DollarSign,
  Globe,
  Lightbulb,
  RotateCcw,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide, { type CalculatorGuideData } from "@/components/calculator-guide";
import { RatingProfileSection } from "@/components/rating-profile-section";
import {
  calculateDepopFees,
  CURRENCY_SYMBOL,
  currencyForRegion,
  formatMoney,
  type Currency,
  type DepopFeeResult,
  type PaymentMethod,
  type SellerRegion,
} from "@/lib/depop-fee-calculator";

interface ContentShape {
  pageTitle?: string;
  pageDescriptionBefore?: string;
  pageDescriptionBold?: string;
  pageDescriptionAfter?: string;
  sectionSale?: string;
  sectionLocation?: string;
  labelCurrency?: string;
  labelRegion?: string;
  labelPayment?: string;
  labelSalePrice?: string;
  labelBuyerShipping?: string;
  labelItemCost?: string;
  hintShipping?: string;
  hintItemCost?: string;
  regionUs?: string;
  regionUk?: string;
  regionAu?: string;
  regionIntl?: string;
  paymentDepop?: string;
  paymentStripe?: string;
  paymentPaypal?: string;
  importantTitle?: string;
  importantBody?: string;
  btnCalculate?: string;
  btnReset?: string;
  resultsTitle?: string;
  resultsSubtitle?: string;
  emptyTitle?: string;
  emptyHint?: string;
  metricDepopFee?: string;
  metricProcessingFee?: string;
  metricTotalFees?: string;
  metricNetPayout?: string;
  metricProfit?: string;
  proTipsTitle?: string;
  proTip1?: string;
  proTip2?: string;
  proTip3?: string;
  proTip4?: string;
  proTip5?: string;
  errSalePrice?: string;
}

const defaultContent: ContentShape = {
  pageTitle: "Depop Fee Calculator Calculate Depop Fees Instantly",
  pageDescriptionBefore:
    "Stop guessing your payout enter your sale price and I'll calculate your exact Depop fees in seconds.",
  pageDescriptionBold: "",
  pageDescriptionAfter: "",
};

export default function DepopFeeCalculatorClient({
  content,
  guideContent,
}: {
  content: ContentShape | null;
  guideContent: CalculatorGuideData | null;
}) {
  const c = { ...defaultContent, ...content };
  const guideData: CalculatorGuideData = guideContent ?? {
    color: "pink",
    sections: [],
    faq: [],
  };

  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();

  const [currency, setCurrency] = useState<Currency>("USD");
  const [region, setRegion] = useState<SellerRegion>("us");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("depop");
  const [salePrice, setSalePrice] = useState("");
  const [buyerShipping, setBuyerShipping] = useState("");
  const [itemCost, setItemCost] = useState("");
  const [result, setResult] = useState<DepopFeeResult | null>(null);
  const [errors, setErrors] = useState<{ salePrice?: string }>({});

  const currencySymbol = CURRENCY_SYMBOL[currency];

  const handleRegionChange = useCallback((value: SellerRegion) => {
    setRegion(value);
    setCurrency(currencyForRegion(value));
  }, []);

  const compute = useCallback(() => {
    const price = Number.parseFloat(salePrice);
    const nextErr: typeof errors = {};

    if (!Number.isFinite(price) || price <= 0) {
      nextErr.salePrice = c.errSalePrice;
    }

    setErrors(nextErr);
    if (Object.keys(nextErr).length > 0) {
      setResult(null);
      return;
    }

    const shipping = Number.parseFloat(buyerShipping) || 0;
    const costRaw = itemCost.trim();
    const cost = costRaw === "" ? undefined : Number.parseFloat(costRaw);

    const out = calculateDepopFees({
      currency,
      region,
      paymentMethod,
      salePrice: price,
      buyerShipping: shipping,
      itemCost: cost,
    });

    setResult(out);
    if (out) scrollToRef(resultsRef);
  }, [
    salePrice,
    buyerShipping,
    itemCost,
    currency,
    region,
    paymentMethod,
    scrollToRef,
    c.errSalePrice,
  ]);

  const reset = useCallback(() => {
    setCurrency("USD");
    setRegion("us");
    setPaymentMethod("depop");
    setSalePrice("");
    setBuyerShipping("");
    setItemCost("");
    setResult(null);
    setErrors({});
  }, []);

  const sectionIcon = "text-fuchsia-600 flex-shrink-0 mt-0.5";

  const formCard = (
    <Card className="shadow-lg border border-gray-200/80 bg-white">
      <CardContent className="p-6 space-y-8">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Globe className={`w-5 h-5 ${sectionIcon}`} />
            <div className="flex-1 space-y-4">
              <Label className="text-sm font-semibold text-gray-800">{c.sectionLocation}</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">{c.labelCurrency}</Label>
                  <Select
                    value={currency}
                    onValueChange={(v) => setCurrency(v as Currency)}
                  >
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="AUD">AUD (A$)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">{c.labelRegion}</Label>
                  <Select value={region} onValueChange={(v) => handleRegionChange(v as SellerRegion)}>
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">{c.regionUs}</SelectItem>
                      <SelectItem value="uk">{c.regionUk}</SelectItem>
                      <SelectItem value="au">{c.regionAu}</SelectItem>
                      <SelectItem value="international">{c.regionIntl}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">{c.labelPayment}</Label>
                <Select
                  value={paymentMethod}
                  onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
                >
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="depop">{c.paymentDepop}</SelectItem>
                    <SelectItem value="stripe">{c.paymentStripe}</SelectItem>
                    <SelectItem value="paypal">{c.paymentPaypal}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <DollarSign className={`w-5 h-5 ${sectionIcon}`} />
            <div className="flex-1 space-y-4">
              <Label className="text-sm font-semibold text-gray-800">{c.sectionSale}</Label>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">{c.labelSalePrice}</Label>
                <div className="flex gap-2">
                  <span className="flex items-center text-sm font-semibold text-gray-600 tabular-nums">
                    {currencySymbol}
                  </span>
                  <Input
                    type="number"
                    min={0}
                    step={0.01}
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    placeholder="50"
                    className="h-11 rounded-xl flex-1"
                    aria-invalid={!!errors.salePrice}
                  />
                </div>
                {errors.salePrice ? (
                  <p className="text-sm text-red-600">{errors.salePrice}</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">{c.labelBuyerShipping}</Label>
                <div className="flex gap-2">
                  <span className="flex items-center text-sm font-semibold text-gray-600 tabular-nums">
                    {currencySymbol}
                  </span>
                  <Input
                    type="number"
                    min={0}
                    step={0.01}
                    value={buyerShipping}
                    onChange={(e) => setBuyerShipping(e.target.value)}
                    placeholder="5"
                    className="h-11 rounded-xl flex-1"
                  />
                </div>
                <p className="text-sm text-gray-500 italic">{c.hintShipping}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">{c.labelItemCost}</Label>
                <div className="flex gap-2">
                  <span className="flex items-center text-sm font-semibold text-gray-600 tabular-nums">
                    {currencySymbol}
                  </span>
                  <Input
                    type="number"
                    min={0}
                    step={0.01}
                    value={itemCost}
                    onChange={(e) => setItemCost(e.target.value)}
                    placeholder="15"
                    className="h-11 rounded-xl flex-1"
                  />
                </div>
                <p className="text-sm text-gray-500 italic">{c.hintItemCost}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            onClick={compute}
            className="flex-1 h-12 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold shadow-md"
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
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-600 flex items-center justify-center shadow-lg">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              {c.pageTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {c.pageDescriptionBefore}
              {c.pageDescriptionBold ? (
                <>
                  <strong className="font-semibold text-gray-900">{c.pageDescriptionBold}</strong>
                  {c.pageDescriptionAfter}
                </>
              ) : null}
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>{formCard}</div>

            <div ref={resultsRef} className="space-y-6">
              <Card className="shadow-lg border border-gray-200/80 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-fuchsia-50/50 border-b py-5 px-6">
                  <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 text-gray-900">
                    <BarChart3 className="w-6 h-6 text-fuchsia-600" />
                    {c.resultsTitle}
                  </CardTitle>
                  <CardDescription className="text-base">{c.resultsSubtitle}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {!result ? (
                    <div className="rounded-xl border border-dashed border-gray-200 bg-slate-50/50 py-14 px-6 text-center">
                      <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-lg font-semibold text-gray-800 mb-2">{c.emptyTitle}</p>
                      <p className="text-gray-600 max-w-md mx-auto">{c.emptyHint}</p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div className="rounded-xl border border-fuchsia-100 bg-fuchsia-50/50 p-4">
                        <p className="text-sm text-fuchsia-950/90 leading-relaxed flex items-start gap-2">
                          <TrendingUp className="w-4 h-4 text-fuchsia-600 flex-shrink-0 mt-0.5" />
                          {result.summary}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-xl border border-red-100 bg-red-50/40 p-4">
                          <p className="text-xs font-medium text-red-800 uppercase tracking-wide">
                            {c.metricDepopFee}
                          </p>
                          <p className="text-2xl font-bold text-red-700 tabular-nums">
                            {formatMoney(result.depopFee, currencySymbol)}
                          </p>
                          <p className="text-xs text-red-700/80 mt-1">{result.depopRateLabel}</p>
                        </div>
                        <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4">
                          <p className="text-xs font-medium text-blue-800 uppercase tracking-wide">
                            {c.metricProcessingFee}
                          </p>
                          <p className="text-2xl font-bold text-blue-700 tabular-nums">
                            {formatMoney(result.processingFee, currencySymbol)}
                          </p>
                          <p className="text-xs text-blue-700/80 mt-1">
                            {result.processingRateLabel}
                          </p>
                        </div>
                        <div className="rounded-xl border border-orange-100 bg-orange-50/40 p-4">
                          <p className="text-xs font-medium text-orange-800 uppercase tracking-wide">
                            {c.metricTotalFees}
                          </p>
                          <p className="text-2xl font-bold text-orange-700 tabular-nums">
                            {formatMoney(result.totalFees, currencySymbol)}
                          </p>
                        </div>
                        <div className="rounded-xl border-2 border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 to-pink-50 p-4">
                          <p className="text-xs font-medium text-fuchsia-900 uppercase tracking-wide">
                            {c.metricNetPayout}
                          </p>
                          <p className="text-3xl font-bold text-fuchsia-900 tabular-nums">
                            {formatMoney(result.netPayout, currencySymbol)}
                          </p>
                        </div>
                      </div>

                      {result.profit !== null && (
                        <div
                          className={`rounded-xl border-2 p-4 ${
                            result.profit >= 0
                              ? "border-teal-200 bg-teal-50/60"
                              : "border-red-200 bg-red-50/60"
                          }`}
                        >
                          <p className="text-xs font-medium uppercase tracking-wide mb-1">
                            {c.metricProfit}
                          </p>
                          <p
                            className={`text-2xl font-bold tabular-nums ${
                              result.profit >= 0 ? "text-teal-800" : "text-red-700"
                            }`}
                          >
                            {formatMoney(result.profit, currencySymbol)}
                          </p>
                        </div>
                      )}
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
            entityId="depop-fee-calculator"
            entityType="calculator"
            creatorSlug="antonio-ares"
            initialRatingTotal={0}
            initialRatingCount={0}
          />

          <CalculatorGuide data={guideData} layout="article" />

          <SimilarCalculators
            calculators={[
              {
                calculatorName: "Whatnot Fee Calculator",
                calculatorHref: "/whatnot-fee-calculator",
                calculatorDescription:
                  "Calculate Whatnot seller fees and net profit by region.",
              },
              {
                calculatorName: "Grailed Fee Calculator",
                calculatorHref: "/financial/grailed-fee-calculator",
                calculatorDescription:
                  "Estimate Grailed commission, Stripe fees, and payout.",
              },
              {
                calculatorName: "Venmo Fee Calculator",
                calculatorHref: "/financial/venmo-fee-calculator",
                calculatorDescription:
                  "Calculate Venmo fees for instant transfers and card payments.",
              },
            ]}
            color="pink"
            title="Related resale calculators"
          />
        </div>
      </main>
    </div>
  );
}
