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
;
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Pregnancy Calculator",
  description: "Estimate your pregnancy schedule based on due date, last period, ultrasound, conception, or IVF transfer date.",
  url: "https://www.thesmartcalculator.com/health/pregnancy-calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: ["Pregnancy schedule estimation", "Due date, last period, ultrasound, conception, IVF support", "Trimester calculation", "Weeks and days pregnant"]
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
}, {
  value: "conception",
  label: "Conception Date"
}, {
  value: "ivf",
  label: "IVF Transfer Date"
}];
export default function PregnancyCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('pregnancy-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('pregnancy-calculator', language, "calculator-guide");

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
    "pregnancy_calculator_0": "",
    "modify_the_values_and_click_the_calculate_button_t_1": "",
    "calculate_on_2": "",
    "your_date_3": "",
    "calculate_4": "",
    "pregnancy_info_5": "",
    "your_pregnancy_schedule_breakdown_6": "",
    "due_date_7": "",
    "conception_date_8": "",
    "last_period_date_9": "",
    "weeks_pregnant_10": "",
    "days_pregnant_11": "",
    "trimester_12": "",
    "enter_your_date_and_click_calculate_see_your_pregn_13": "",
    "how_pregnancy_is_calculated_14": "",
    "the_pregnancy_calculator_estimates_your_pregnancy__15": "",
    "due_date_16": "",
    "the_estimated_date_when_your_baby_is_due_calculate_17": "",
    "trimester_18": "",
    "pregnancy_is_divided_into_three_trimesters_the_cal_19": "",
    "weeks_pregnant_20": "",
    "the_number_of_weeks_you_have_been_pregnant_calcula_21": "",
    "important_22": "",
    "the_results_above_are_a_guideline_for_typical_situ_23": ""
  }

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };;
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [calculateBasedOn, setCalculateBasedOn] = useState("dueDate");
  const [inputDate, setInputDate] = useState("");
  const [result, setResult] = useState<any>(null);
  function calculatePregnancy() {
    if (!inputDate) return;
    const date = new Date(inputDate);
    let dueDate = date;
    switch (calculateBasedOn) {
      case "dueDate":
        dueDate = date;
        break;
      case "lastPeriod":
        dueDate = new Date(date.getTime() + 280 * 24 * 60 * 60 * 1000);
        break;
      case "ultrasound":
        dueDate = new Date(date.getTime() + 280 * 24 * 60 * 60 * 1000);
        break;
      case "conception":
        dueDate = new Date(date.getTime() + 266 * 24 * 60 * 60 * 1000);
        break;
      case "ivf":
        dueDate = new Date(date.getTime() + 266 * 24 * 60 * 60 * 1000);
        break;
    }
    setResult({
      dueDate: dueDate.toDateString(),
      conceptionDate: new Date(dueDate.getTime() - 266 * 24 * 60 * 60 * 1000).toDateString(),
      lastPeriodDate: new Date(dueDate.getTime() - 280 * 24 * 60 * 60 * 1000).toDateString(),
      today: new Date().toDateString(),
      weeksPregnant: Math.floor((new Date().getTime() - (dueDate.getTime() - 280 * 24 * 60 * 60 * 1000)) / (7 * 24 * 60 * 60 * 1000)),
      daysPregnant: Math.floor((new Date().getTime() - (dueDate.getTime() - 280 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000)),
      trimester: Math.floor((new Date().getTime() - (dueDate.getTime() - 280 * 24 * 60 * 60 * 1000)) / (7 * 24 * 60 * 60 * 1000)) < 13 ? "First Trimester" : Math.floor((new Date().getTime() - (dueDate.getTime() - 280 * 24 * 60 * 60 * 1000)) / (7 * 24 * 60 * 60 * 1000)) < 27 ? "Second Trimester" : "Third Trimester"
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
                <Card className="shadow-2xl p-0 border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Baby className="w-6 h-6 text-pink-500" />
                      <span>{contentData.pregnancy_calculator_0}</span>
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
                    <Button onClick={calculatePregnancy} className="w-full h-14 text-xl bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 shadow-xl font-bold">{contentData.calculate_4}</Button>
                  </CardContent>
                </Card>
              </div>

              {/* Results Info Section */}
              <div className="lg:col-span-1">
                <Card ref={resultsRef} className="shadow-2xl p-0 border-0 bg-white sticky top-24">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="text-2xl">{contentData.pregnancy_info_5}</CardTitle>
                    <CardDescription className="text-base">{contentData.your_pregnancy_schedule_breakdown_6}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    {result ? <div className="space-y-4">
                        <div><strong>{contentData.due_date_7}</strong> {result.dueDate}</div>
                        <div><strong>{contentData.conception_date_8}</strong> {result.conceptionDate}</div>
                        <div><strong>{contentData.last_period_date_9}</strong> {result.lastPeriodDate}</div>
                        <div><strong>{contentData.weeks_pregnant_10}</strong> {result.weeksPregnant}</div>
                        <div><strong>{contentData.days_pregnant_11}</strong> {result.daysPregnant}</div>
                        <div><strong>{contentData.trimester_12}</strong> {result.trimester}</div>
                      </div> : <div className="text-center py-12 text-gray-500">
                        <Baby className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">{contentData.enter_your_date_and_click_calculate_see_your_pregn_13}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Information Section */}
            <section className="mt-16">
              <Card className="shadow-2xl p-0 border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-pink-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.how_pregnancy_is_calculated_14}</CardTitle>
                </CardHeader>
                <CardContent className="p-8 prose max-w-none">
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">{contentData.the_pregnancy_calculator_estimates_your_pregnancy__15}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900">{contentData.due_date_16}</h3>
                      <p className="text-gray-600">{contentData.the_estimated_date_when_your_baby_is_due_calculate_17}</p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900">{contentData.trimester_18}</h3>
                      <p className="text-gray-600">{contentData.pregnancy_is_divided_into_three_trimesters_the_cal_19}</p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900">{contentData.weeks_pregnant_20}</h3>
                      <p className="text-gray-600">{contentData.the_number_of_weeks_you_have_been_pregnant_calcula_21}</p>
                    </div>
                  </div>
                  <div className="mt-8 p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-gray-700 font-medium">
                      <strong>{contentData.important_22}</strong>{contentData.the_results_above_are_a_guideline_for_typical_situ_23}</p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* How to Use Section */}
          <div className="mt-8">
            <CalculatorGuide data={guideData} />
          </div>

        </main>

      </div>
    </>;
}