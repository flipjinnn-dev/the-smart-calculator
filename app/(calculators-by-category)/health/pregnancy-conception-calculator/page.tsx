"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

import { Calendar, Baby } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
;
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Pregnancy Conception Calculator",
  description: "Estimate conception date and related pregnancy milestones based on due date, last period, or ultrasound date.",
  url: "https://www.thesmartcalculator.com/health/pregnancy-conception-calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: ["Conception date estimation", "Due date, last period, ultrasound support", "Pregnancy milestones", "Weeks and days since conception"]
};
const calculateOptions = [{
  value: "dueDate",
  label: "Due Date"
}, {
  value: "lastPeriod",
  label: "Last Period"
}, {
  value: "ultrasound",
  label: "Ultrasound"
}];
export default function PregnancyConceptionCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('pregnancy-conception-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('pregnancy-conception-calculator', language, "calculator-guide");

  // Use content or fallback to defaults
  const contentData = content || {
    "pageTitle": "",
    "pageDescription": "",
    "form": "",
    "results": "",
    "educational": "",
    "messages": "",
    "disclaimer": "",
    "seekHelp": "",
    "errors": "",
    "tooltips": "",
    "pregnancy_conception_calculator_0": "",
    "modify_the_values_and_click_the_calculate_button_t_1": "",
    "calculate_on_2": "",
    "your_date_3": "",
    "calculate_4": "",
    "conception_info_5": "",
    "your_conception_and_pregnancy_milestones_6": "",
    "conception_date_7": "",
    "due_date_8": "",
    "last_period_date_9": "",
    "weeks_since_conception_10": "",
    "days_since_conception_11": "",
    "enter_your_date_and_click_calculate_see_your_conce_12": ""
  }

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };;
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [calculateBasedOn, setCalculateBasedOn] = useState("dueDate");
  const [inputDate, setInputDate] = useState("");
  const [result, setResult] = useState<any>(null);
  function calculateConception() {
    if (!inputDate) return;
    const date = new Date(inputDate);
    let conceptionDate = date;
    switch (calculateBasedOn) {
      case "dueDate":
        conceptionDate = new Date(date.getTime() - 266 * 24 * 60 * 60 * 1000);
        break;
      case "lastPeriod":
        conceptionDate = new Date(date.getTime() + 14 * 24 * 60 * 60 * 1000);
        break;
      case "ultrasound":
        conceptionDate = date; // ultrasound date is often close to conception
        break;
    }
    // Calculate, milestones, etc.
    setResult({
      conceptionDate: conceptionDate.toDateString(),
      dueDate: new Date(conceptionDate.getTime() + 266 * 24 * 60 * 60 * 1000).toDateString(),
      lastPeriodDate: new Date(conceptionDate.getTime() - 14 * 24 * 60 * 60 * 1000).toDateString(),
      today: new Date().toDateString(),
      weeksSinceConception: Math.floor((new Date().getTime() - conceptionDate.getTime()) / (7 * 24 * 60 * 60 * 1000)),
      daysSinceConception: Math.floor((new Date().getTime() - conceptionDate.getTime()) / (24 * 60 * 60 * 1000))
    });
    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  }
  return <>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-pink-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Baby className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Baby className="w-6 h-6 text-pink-500" />
                      <span>{contentData.pregnancy_conception_calculator_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.modify_the_values_and_click_the_calculate_button_t_1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="mb-8">
                      <Label className="text-base font-semibold text-gray-900 mb-4 block">{contentData.calculate_on_2}</Label>
                      <Select value={calculateBasedOn} onValueChange={setCalculateBasedOn}>
                        <SelectTrigger className="w-full mt-2">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          {calculateOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="mb-8">
                      <Label className="text-base font-semibold text-gray-900">{contentData.your_date_3}</Label>
                      <Input type="date" value={inputDate} onChange={e => setInputDate(e.target.value)} className="w-full mt-2" />
                    </div>
                    <Button onClick={calculateConception} className="w-full h-14 text-xl bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 shadow-xl font-bold">{contentData.calculate_4}</Button>
                  </CardContent>
                </Card>
              </div>

              {/* Results Info Section */}
              <div className="lg:col-span-1">
                <Card ref={resultsRef} className="shadow-2xl p-0 border-0 bg-white sticky top-24">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="text-2xl">{contentData.conception_info_5}</CardTitle>
                    <CardDescription className="text-base">{contentData.your_conception_and_pregnancy_milestones_6}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    {result ? <div className="space-y-4">
                        <div><strong>{contentData.conception_date_7}</strong> {result.conceptionDate}</div>
                        <div><strong>{contentData.due_date_8}</strong> {result.dueDate}</div>
                        <div><strong>{contentData.last_period_date_9}</strong> {result.lastPeriodDate}</div>
                        <div><strong>{contentData.weeks_since_conception_10}</strong> {result.weeksSinceConception}</div>
                        <div><strong>{contentData.days_since_conception_11}</strong> {result.daysSinceConception}</div>
                      </div> : <div className="text-center py-12 text-gray-500">
                        <Baby className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">{contentData.enter_your_date_and_click_calculate_see_your_conce_12}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        <SimilarCalculators calculators={[{
          calculatorName: "Pregnancy Weight Gain Calculator",
          calculatorHref: "/health/pregnancy-weight-gain-calculator",
        }, {
          calculatorName: "Pregnancy Calculator",
          calculatorHref: "/health/pregnancy-calculator",
        }, {
          calculatorName: "BAC Calculator",
          calculatorHref: "/health/bac-calculator",
        }
        ]} 
        color="pink" 
        title="Related Health Calculators" />
          {/* How to Use Section */}
          <div className="mt-8">
              <CalculatorGuide data={guideData} />
          </div>

        </main>

      </div>
    </>;
}