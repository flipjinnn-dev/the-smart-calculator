"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

import { Calculator, TrendingUp, DollarSign, Percent, Calendar } from "lucide-react";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
;
import { useMobileScroll } from "@/hooks/useMobileScroll";
import { RatingProfileSection } from '@/components/rating-profile-section';

interface InflationCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function InflationCalculatorClient({ content, guideContent }: InflationCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
  
  const contentData = content || {};
  
const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [tab, setTab] = useState("future");
  const [amount, setAmount] = useState("1000");
  const [inflationRate, setInflationRate] = useState("3");
  const [years, setYears] = useState("10");
  const [futureValue, setFutureValue] = useState("1000");
  const [pastValue, setPastValue] = useState("1000");
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);
  const calculateInflation = () => {
    const principal = Number.parseFloat(amount) || 0;
    const rate = Number.parseFloat(inflationRate) / 100 || 0;
    const time = Number.parseFloat(years) || 0;
    const futureVal = Number.parseFloat(futureValue) || 0;
    const pastVal = Number.parseFloat(pastValue) || 0;
    let calculationResult: any = {};
    if (tab === "future") {
      const futureAmount = principal * Math.pow(1 + rate, time);
      const totalInflation = futureAmount - principal;
      const inflationPercent = (futureAmount - principal) / principal * 100;
      calculationResult = {
        type: "future",
        originalAmount: principal,
        futureAmount: futureAmount,
        totalInflation: totalInflation,
        inflationPercent: inflationPercent,
        years: time,
        rate: rate * 100
      };
    } else if (tab === "past") {
      const pastAmount = futureVal / Math.pow(1 + rate, time);
      const totalInflation = futureVal - pastAmount;
      const inflationPercent = (futureVal - pastAmount) / pastAmount * 100;
      calculationResult = {
        type: "past",
        futureAmount: futureVal,
        pastAmount: pastAmount,
        totalInflation: totalInflation,
        inflationPercent: inflationPercent,
        years: time,
        rate: rate * 100
      };
    } else if (tab === "rate") {
      if (pastVal <= 0 || futureVal <= 0 || time <= 0) {
        calculationResult.calculatedRate = 0;
      } else {
        const calculatedRate = (Math.pow(futureVal / pastVal, 1 / time) - 1) * 100;
        const totalInflation = futureVal - pastVal;
        const inflationPercent = (futureVal - pastVal) / pastVal * 100;
        calculationResult = {
          type: "rate",
          pastAmount: pastVal,
          futureAmount: futureVal,
          calculatedRate: calculatedRate,
          totalInflation: totalInflation,
          inflationPercent: inflationPercent,
          years: time
        };
      }
    }
    const yearlyData = [];
    for (let i = 0; i <= time; i++) {
      let value;
      if (tab === "future") {
        // Using FV = PV × (1 + r)^t for each year
        value = principal * Math.pow(1 + rate, i);
      } else if (tab === "past") {
        // Using PV = FV / (1 + r)^t then projecting forward
        const basePastAmount = futureVal / Math.pow(1 + rate, time);
        value = basePastAmount * Math.pow(1 + rate, i);
      } else {
        // Using calculated rate for projection
        const calcRate = Math.pow(futureVal / pastVal, 1 / time) - 1;
        value = pastVal * Math.pow(1 + calcRate, i);
      }
      yearlyData.push({
        year: new Date().getFullYear() + i,
        value: value,
        inflationImpact: value - (tab === "future" ? principal : tab === "past" ? futureVal / Math.pow(1 + rate, time) : pastVal)
      });
    }
    calculationResult.yearlyData = yearlyData;
    setResult(calculationResult);
    setShowResult(true);
  };
  const handleCalculate = () => {
    calculateInflation();
    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };
  return <>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300 ring-4 ring-orange-100">
                  <TrendingUp className="w-10 h-10 text-white drop-shadow-md" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
              <div className="flex justify-center mt-4">
                <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left: Calculator Card */}
              <div>
                <Card className="shadow-xl border-0 min-h-0 rounded-xl pt-0 overflow-hidden hover:shadow-orange-100/50 transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 rounded-t-xl py-5 px-6 border-b border-orange-100/50">
                    <CardTitle className="flex items-center space-x-3 text-xl">
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <Calculator className="w-5 h-5 text-orange-600" />
                      </div>
                      <span className="text-orange-800 font-semibold">{contentData.inflation_details_3}</span>
                    </CardTitle>
                    <CardDescription className="text-sm mt-2 text-orange-700/70">{contentData.enter_your_inflation_calculation_information_below_4}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 bg-white">
                    <div className="mb-6">
                      <Label className="text-sm font-semibold mb-3 block text-orange-800">{contentData.what_would_you_like_to_calculate_5}</Label>
                      <Tabs value={tab} onValueChange={setTab} className="w-full">
                        <TabsList className="bg-gradient-to-r from-orange-50 to-red-50 w-full h-auto p-1 rounded-xl border border-orange-200 shadow-sm">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 w-full">
                            <TabsTrigger value="future" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-2.5 px-3 text-sm font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 hover:shadow-md whitespace-nowrap">{contentData.future_value_6}</TabsTrigger>
                            <TabsTrigger value="past" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-2.5 px-3 text-sm font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 hover:shadow-md whitespace-nowrap">{contentData.past_value_7}</TabsTrigger>
                            <TabsTrigger value="rate" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-2.5 px-3 text-sm font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 hover:shadow-md whitespace-nowrap">{contentData.inflation_rate_8}</TabsTrigger>
                          </div>
                        </TabsList>

                        <TabsContent value="future">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="relative">
                              <Label className="text-sm font-medium text-orange-800 mb-3 block">{contentData.current_amount_9}</Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4" />
                                <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg h-12" placeholder="1000" />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-orange-800 mb-3 block">{contentData.annual_inflation_rate_10}</Label>
                              <div className="relative">
                                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4" />
                                <Input type="number" value={inflationRate} onChange={e => setInflationRate(e.target.value)} className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg h-12" placeholder="3" step="0.1" />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-orange-800 mb-3 block">{contentData.number_of_years_11}</Label>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4" />
                                <Input type="number" value={years} onChange={e => setYears(e.target.value)} className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg h-12" placeholder="10" />
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="past">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="relative">
                              <Label className="text-sm font-medium text-orange-800 mb-3 block">{contentData.future_amount_12}</Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4" />
                                <Input type="number" value={futureValue} onChange={e => setFutureValue(e.target.value)} className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg h-12" placeholder="1000" />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-orange-800 mb-3 block">{contentData.annual_inflation_rate_13}</Label>
                              <div className="relative">
                                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4" />
                                <Input type="number" value={inflationRate} onChange={e => setInflationRate(e.target.value)} className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg h-12" placeholder="3" step="0.1" />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-orange-800 mb-3 block">{contentData.number_of_years_14}</Label>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4" />
                                <Input type="number" value={years} onChange={e => setYears(e.target.value)} className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg h-12" placeholder="10" />
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="rate">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="relative">
                              <Label className="text-sm font-medium text-orange-800 mb-3 block">{contentData.past_amount_15}</Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4" />
                                <Input type="number" value={pastValue} onChange={e => setPastValue(e.target.value)} className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg h-12" placeholder="1000" />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-orange-800 mb-3 block">{contentData.current_amount_16}</Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4" />
                                <Input type="number" value={futureValue} onChange={e => setFutureValue(e.target.value)} className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg h-12" placeholder="1000" />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-orange-800 mb-3 block">{contentData.number_of_years_17}</Label>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4" />
                                <Input type="number" value={years} onChange={e => setYears(e.target.value)} className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg h-12" placeholder="10" />
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    <Button onClick={handleCalculate} className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                      <Calculator className="mr-2 h-5 w-5" />{contentData.calculate_impact_18}</Button>
                  </CardContent>
                </Card>
              </div>

              {/* Right: Results Card */}
              <div>
                <Card ref={resultsRef} className="shadow-xl border-0 pt-0 min-h-0 rounded-xl overflow-hidden hover:shadow-orange-100/50 transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 rounded-t-xl py-5 px-6 border-b border-orange-100/50">
                    <CardTitle className="flex items-center space-x-3 text-xl">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-orange-800 font-semibold">{contentData.your_inflation_results_19}</span>
                    </CardTitle>
                    <CardDescription className="text-base text-gray-700">{contentData.see_your_inflation_calculation_results_here_20}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 bg-white">
                    <div className="min-h-[200px] space-y-6">
                      {showResult && result ? <div className="space-y-6">
                          {/* Main Result Summary */}
                          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
                            <h3 className="text-lg font-semibold text-orange-800 mb-4">
                              {result.type === "future" && "Future Value Impact"}
                              {result.type === "past" && "Past Value Equivalent"}
                              {result.type === "rate" && "Calculated Inflation Rate"}
                            </h3>

                            {result.type === "future" && <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-orange-700">{contentData.current_amount_21}</span>
                                  <span className="font-bold text-lg text-orange-800">
                                    ${result.originalAmount.toLocaleString(undefined, {
                                maximumFractionDigits: 2
                              })}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-orange-700">{contentData.future_value_22}</span>
                                  <span className="font-bold text-lg text-red-600">
                                    ${result.futureAmount.toLocaleString(undefined, {
                                maximumFractionDigits: 2
                              })}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-orange-700">{contentData.total_inflation_impact_23}</span>
                                  <span className="font-bold text-lg text-red-600">
                                    ${result.totalInflation.toLocaleString(undefined, {
                                maximumFractionDigits: 2
                              })}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-orange-700">{contentData.purchasing_power_loss_24}</span>
                                  <span className="font-bold text-lg text-red-600">
                                    {result.inflationPercent.toFixed(2)}%
                                  </span>
                                </div>
                              </div>}

                            {result.type === "past" && <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-orange-700">{contentData.current_amount_25}</span>
                                  <span className="font-bold text-lg text-orange-800">
                                    ${result.futureAmount.toLocaleString(undefined, {
                                maximumFractionDigits: 2
                              })}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-orange-700">{contentData.past_equivalent_26}</span>
                                  <span className="font-bold text-lg text-red-600">
                                    ${result.pastAmount.toLocaleString(undefined, {
                                maximumFractionDigits: 2
                              })}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-orange-700">{contentData.inflation_impact_27}</span>
                                  <span className="font-bold text-lg text-red-600">
                                    ${result.totalInflation.toLocaleString(undefined, {
                                maximumFractionDigits: 2
                              })}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-orange-700">{contentData.total_inflation_28}</span>
                                  <span className="font-bold text-lg text-red-600">
                                    {result.inflationPercent.toFixed(2)}%
                                  </span>
                                </div>
                              </div>}

                            {result.type === "rate" && <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-orange-700">{contentData.past_amount_29}</span>
                                  <span className="font-bold text-lg text-orange-800">
                                    ${result.pastAmount.toLocaleString(undefined, {
                                maximumFractionDigits: 2
                              })}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-orange-700">{contentData.current_amount_30}</span>
                                  <span className="font-bold text-lg text-orange-800">
                                    ${result.futureAmount.toLocaleString(undefined, {
                                maximumFractionDigits: 2
                              })}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-orange-700">{contentData.annual_inflation_rate_31}</span>
                                  <span className="font-bold text-lg text-red-600">
                                    {result.calculatedRate.toFixed(2)}%
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-orange-700">{contentData.total_inflation_32}</span>
                                  <span className="font-bold text-lg text-red-600">
                                    {result.inflationPercent.toFixed(2)}%
                                  </span>
                                </div>
                              </div>}
                          </div>

                          {/* Chart */}
                          {result.yearlyData && <div>
                              <h4 className="font-semibold text-orange-800 mb-3">{contentData.inflation_impact_over_time_33}</h4>
                              <div className="h-64">
                                <ChartContainer config={{
                            value: {
                              label: "Value",
                              color: "#ea580c"
                            }
                          }} className="h-full w-full">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={result.yearlyData}>
                                      <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                                      <XAxis dataKey="year" stroke="#ea580c" />
                                      <YAxis stroke="#ea580c" />
                                      <ChartTooltip content={<ChartTooltipContent />} />
                                      <Line type="monotone" dataKey="value" stroke="#ea580c" strokeWidth={3} dot={{
                                  fill: "#dc2626",
                                  strokeWidth: 2,
                                  r: 4
                                }} />
                                    </LineChart>
                                  </ResponsiveContainer>
                                </ChartContainer>
                              </div>
                            </div>}

                          {/* Year-by-Year Table */}
                          {result.yearlyData && <div>
                              <h4 className="font-semibold text-orange-800 mb-3">{contentData.yearbyyear_breakdown_34}</h4>
                              <div className="max-h-64 overflow-y-auto border border-orange-200 rounded-lg">
                                <Table>
                                  <TableHeader className="bg-orange-50">
                                    <TableRow>
                                      <TableHead className="text-orange-800">{contentData.year_35}</TableHead>
                                      <TableHead className="text-orange-800">{contentData.value_36}</TableHead>
                                      <TableHead className="text-orange-800">{contentData.inflation_impact_37}</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {result.yearlyData.map((row: any, index: number) => <TableRow key={index} className="hover:bg-orange-50/50">
                                        <TableCell className="font-medium">{row.year}</TableCell>
                                        <TableCell>
                                          ${row.value.toLocaleString(undefined, {
                                    maximumFractionDigits: 2
                                  })}
                                        </TableCell>
                                        <TableCell className="text-red-600">
                                          $
                                          {Math.abs(row.inflationImpact).toLocaleString(undefined, {
                                    maximumFractionDigits: 2
                                  })}
                                        </TableCell>
                                      </TableRow>)}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>}
                        </div> : <div className="text-center py-12">
                          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calculator className="w-8 h-8 text-orange-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{contentData.ready_to_calculate_38}</h3>
                          <p className="text-gray-600">{contentData.enter_your_values_and_click_calculate_impact_to_se_39}</p>
                        </div>}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Historical Inflation Data Section */}
          <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <Card className="shadow-xl p-0 border-0 rounded-xl overflow-hidden hover:shadow-orange-100/50 transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 py-6 px-8 border-b border-orange-100/50">
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-orange-800 font-bold">{contentData.historical_us_inflation_rates_40}</span>
                </CardTitle>
                <CardDescription className="text-base text-orange-700/80 mt-2">{contentData.monthly_and_annual_inflation_rates_from_2013_to_20_41}</CardDescription>
              </CardHeader>
              <CardContent className="p-8 bg-white">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-orange-50 to-red-50">
                        <TableHead className="text-orange-800 font-semibold">{contentData.year_42}</TableHead>
                        <TableHead className="text-orange-800 font-semibold">{contentData.jan_43}</TableHead>
                        <TableHead className="text-orange-800 font-semibold">{contentData.feb_44}</TableHead>
                        <TableHead className="text-orange-800 font-semibold">{contentData.mar_45}</TableHead>
                        <TableHead className="text-orange-800 font-semibold">{contentData.apr_46}</TableHead>
                        <TableHead className="text-orange-800 font-semibold">{contentData.may_47}</TableHead>
                        <TableHead className="text-orange-800 font-semibold">{contentData.jun_48}</TableHead>
                        <TableHead className="text-orange-800 font-semibold">{contentData.jul_49}</TableHead>
                        <TableHead className="text-orange-800 font-semibold">{contentData.aug_50}</TableHead>
                        <TableHead className="text-orange-800 font-semibold">{contentData.sep_51}</TableHead>
                        <TableHead className="text-orange-800 font-semibold">{contentData.oct_52}</TableHead>
                        <TableHead className="text-orange-800 font-semibold">{contentData.nov_53}</TableHead>
                        <TableHead className="text-orange-800 font-semibold">{contentData.dec_54}</TableHead>
                        <TableHead className="text-orange-800 font-semibold bg-orange-100">{contentData.average_55}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">{contentData.k_2025_56}</TableCell>
                        <TableCell>{contentData.k_300_57}</TableCell>
                        <TableCell>{contentData.k_282_58}</TableCell>
                        <TableCell>{contentData.k_239_59}</TableCell>
                        <TableCell>{contentData.k_231_60}</TableCell>
                        <TableCell>{contentData.k_235_61}</TableCell>
                        <TableCell>{contentData.k_267_62}</TableCell>
                        <TableCell>{contentData.k_270_63}</TableCell>
                        <TableCell className="text-gray-400">-</TableCell>
                        <TableCell className="text-gray-400">-</TableCell>
                        <TableCell className="text-gray-400">-</TableCell>
                        <TableCell className="text-gray-400">-</TableCell>
                        <TableCell className="text-gray-400">-</TableCell>
                        <TableCell className="font-semibold bg-orange-50">-</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">{contentData.k_2024_64}</TableCell>
                        <TableCell>{contentData.k_309_65}</TableCell>
                        <TableCell>{contentData.k_315_66}</TableCell>
                        <TableCell>{contentData.k_348_67}</TableCell>
                        <TableCell>{contentData.k_336_68}</TableCell>
                        <TableCell>{contentData.k_327_69}</TableCell>
                        <TableCell>{contentData.k_297_70}</TableCell>
                        <TableCell>{contentData.k_289_71}</TableCell>
                        <TableCell>{contentData.k_253_72}</TableCell>
                        <TableCell>{contentData.k_244_73}</TableCell>
                        <TableCell>{contentData.k_260_74}</TableCell>
                        <TableCell>{contentData.k_275_75}</TableCell>
                        <TableCell>{contentData.k_289_76}</TableCell>
                        <TableCell className="font-semibold bg-orange-50">{contentData.k_295_77}</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">{contentData.k_2023_78}</TableCell>
                        <TableCell>{contentData.k_641_79}</TableCell>
                        <TableCell>{contentData.k_604_80}</TableCell>
                        <TableCell>{contentData.k_498_81}</TableCell>
                        <TableCell>{contentData.k_493_82}</TableCell>
                        <TableCell>{contentData.k_405_83}</TableCell>
                        <TableCell>{contentData.k_297_84}</TableCell>
                        <TableCell>{contentData.k_318_85}</TableCell>
                        <TableCell>{contentData.k_367_86}</TableCell>
                        <TableCell>{contentData.k_370_87}</TableCell>
                        <TableCell>{contentData.k_324_88}</TableCell>
                        <TableCell>{contentData.k_314_89}</TableCell>
                        <TableCell>{contentData.k_335_90}</TableCell>
                        <TableCell className="font-semibold bg-orange-50">{contentData.k_412_91}</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">{contentData.k_2022_92}</TableCell>
                        <TableCell className="text-red-600 font-medium">{contentData.k_748_93}</TableCell>
                        <TableCell className="text-red-600 font-medium">{contentData.k_787_94}</TableCell>
                        <TableCell className="text-red-600 font-medium">{contentData.k_854_95}</TableCell>
                        <TableCell className="text-red-600 font-medium">{contentData.k_826_96}</TableCell>
                        <TableCell className="text-red-600 font-medium">{contentData.k_858_97}</TableCell>
                        <TableCell className="text-red-600 font-medium">{contentData.k_906_98}</TableCell>
                        <TableCell className="text-red-600 font-medium">{contentData.k_852_99}</TableCell>
                        <TableCell className="text-red-600 font-medium">{contentData.k_826_100}</TableCell>
                        <TableCell className="text-red-600 font-medium">{contentData.k_820_101}</TableCell>
                        <TableCell className="text-red-600 font-medium">{contentData.k_775_102}</TableCell>
                        <TableCell className="text-red-600 font-medium">{contentData.k_711_103}</TableCell>
                        <TableCell className="text-red-600 font-medium">{contentData.k_645_104}</TableCell>
                        <TableCell className="font-semibold bg-orange-50 text-red-600">{contentData.k_800_105}</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">{contentData.k_2021_106}</TableCell>
                        <TableCell>{contentData.k_140_107}</TableCell>
                        <TableCell>{contentData.k_168_108}</TableCell>
                        <TableCell>{contentData.k_262_109}</TableCell>
                        <TableCell>{contentData.k_416_110}</TableCell>
                        <TableCell>{contentData.k_499_111}</TableCell>
                        <TableCell>{contentData.k_539_112}</TableCell>
                        <TableCell>{contentData.k_537_113}</TableCell>
                        <TableCell>{contentData.k_525_114}</TableCell>
                        <TableCell>{contentData.k_539_115}</TableCell>
                        <TableCell>{contentData.k_622_116}</TableCell>
                        <TableCell>{contentData.k_681_117}</TableCell>
                        <TableCell>{contentData.k_704_118}</TableCell>
                        <TableCell className="font-semibold bg-orange-50">{contentData.k_470_119}</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">{contentData.k_2020_120}</TableCell>
                        <TableCell>{contentData.k_249_121}</TableCell>
                        <TableCell>{contentData.k_233_122}</TableCell>
                        <TableCell>{contentData.k_154_123}</TableCell>
                        <TableCell>{contentData.k_033_124}</TableCell>
                        <TableCell>{contentData.k_012_125}</TableCell>
                        <TableCell>{contentData.k_065_126}</TableCell>
                        <TableCell>{contentData.k_099_127}</TableCell>
                        <TableCell>{contentData.k_131_128}</TableCell>
                        <TableCell>{contentData.k_137_129}</TableCell>
                        <TableCell>{contentData.k_118_130}</TableCell>
                        <TableCell>{contentData.k_117_131}</TableCell>
                        <TableCell>{contentData.k_136_132}</TableCell>
                        <TableCell className="font-semibold bg-orange-50">{contentData.k_124_133}</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">{contentData.k_2019_134}</TableCell>
                        <TableCell>{contentData.k_155_135}</TableCell>
                        <TableCell>{contentData.k_152_136}</TableCell>
                        <TableCell>{contentData.k_186_137}</TableCell>
                        <TableCell>{contentData.k_200_138}</TableCell>
                        <TableCell>{contentData.k_179_139}</TableCell>
                        <TableCell>{contentData.k_165_140}</TableCell>
                        <TableCell>{contentData.k_181_141}</TableCell>
                        <TableCell>{contentData.k_175_142}</TableCell>
                        <TableCell>{contentData.k_171_143}</TableCell>
                        <TableCell>{contentData.k_176_144}</TableCell>
                        <TableCell>{contentData.k_205_145}</TableCell>
                        <TableCell>{contentData.k_229_146}</TableCell>
                        <TableCell className="font-semibold bg-orange-50">{contentData.k_181_147}</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">{contentData.k_2018_148}</TableCell>
                        <TableCell>{contentData.k_207_149}</TableCell>
                        <TableCell>{contentData.k_221_150}</TableCell>
                        <TableCell>{contentData.k_236_151}</TableCell>
                        <TableCell>{contentData.k_246_152}</TableCell>
                        <TableCell>{contentData.k_280_153}</TableCell>
                        <TableCell>{contentData.k_287_154}</TableCell>
                        <TableCell>{contentData.k_295_155}</TableCell>
                        <TableCell>{contentData.k_270_156}</TableCell>
                        <TableCell>{contentData.k_228_157}</TableCell>
                        <TableCell>{contentData.k_252_158}</TableCell>
                        <TableCell>{contentData.k_218_159}</TableCell>
                        <TableCell>{contentData.k_191_160}</TableCell>
                        <TableCell className="font-semibold bg-orange-50">{contentData.k_244_161}</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">{contentData.k_2017_162}</TableCell>
                        <TableCell>{contentData.k_250_163}</TableCell>
                        <TableCell>{contentData.k_274_164}</TableCell>
                        <TableCell>{contentData.k_238_165}</TableCell>
                        <TableCell>{contentData.k_220_166}</TableCell>
                        <TableCell>{contentData.k_187_167}</TableCell>
                        <TableCell>{contentData.k_163_168}</TableCell>
                        <TableCell>{contentData.k_173_169}</TableCell>
                        <TableCell>{contentData.k_194_170}</TableCell>
                        <TableCell>{contentData.k_223_171}</TableCell>
                        <TableCell>{contentData.k_204_172}</TableCell>
                        <TableCell>{contentData.k_220_173}</TableCell>
                        <TableCell>{contentData.k_211_174}</TableCell>
                        <TableCell className="font-semibold bg-orange-50">{contentData.k_213_175}</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">{contentData.k_2016_176}</TableCell>
                        <TableCell>{contentData.k_137_177}</TableCell>
                        <TableCell>{contentData.k_102_178}</TableCell>
                        <TableCell>{contentData.k_085_179}</TableCell>
                        <TableCell>{contentData.k_113_180}</TableCell>
                        <TableCell>{contentData.k_102_181}</TableCell>
                        <TableCell>{contentData.k_101_182}</TableCell>
                        <TableCell>{contentData.k_084_183}</TableCell>
                        <TableCell>{contentData.k_106_184}</TableCell>
                        <TableCell>{contentData.k_146_185}</TableCell>
                        <TableCell>{contentData.k_164_186}</TableCell>
                        <TableCell>{contentData.k_169_187}</TableCell>
                        <TableCell>{contentData.k_207_188}</TableCell>
                        <TableCell className="font-semibold bg-orange-50">{contentData.k_126_189}</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">{contentData.k_2015_190}</TableCell>
                        <TableCell className="text-blue-600">{contentData.k_009_191}</TableCell>
                        <TableCell className="text-blue-600">{contentData.k_003_192}</TableCell>
                        <TableCell className="text-blue-600">{contentData.k_007_193}</TableCell>
                        <TableCell className="text-blue-600">{contentData.k_020_194}</TableCell>
                        <TableCell className="text-blue-600">{contentData.k_004_195}</TableCell>
                        <TableCell>{contentData.k_012_196}</TableCell>
                        <TableCell>{contentData.k_017_197}</TableCell>
                        <TableCell>{contentData.k_020_198}</TableCell>
                        <TableCell className="text-blue-600">{contentData.k_004_199}</TableCell>
                        <TableCell>{contentData.k_017_200}</TableCell>
                        <TableCell>{contentData.k_050_201}</TableCell>
                        <TableCell>{contentData.k_073_202}</TableCell>
                        <TableCell className="font-semibold bg-orange-50">{contentData.k_012_203}</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">{contentData.k_2014_204}</TableCell>
                        <TableCell>{contentData.k_158_205}</TableCell>
                        <TableCell>{contentData.k_113_206}</TableCell>
                        <TableCell>{contentData.k_151_207}</TableCell>
                        <TableCell>{contentData.k_195_208}</TableCell>
                        <TableCell>{contentData.k_213_209}</TableCell>
                        <TableCell>{contentData.k_207_210}</TableCell>
                        <TableCell>{contentData.k_199_211}</TableCell>
                        <TableCell>{contentData.k_170_212}</TableCell>
                        <TableCell>{contentData.k_166_213}</TableCell>
                        <TableCell>{contentData.k_166_214}</TableCell>
                        <TableCell>{contentData.k_132_215}</TableCell>
                        <TableCell>{contentData.k_076_216}</TableCell>
                        <TableCell className="font-semibold bg-orange-50">{contentData.k_162_217}</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">{contentData.k_2013_218}</TableCell>
                        <TableCell>{contentData.k_159_219}</TableCell>
                        <TableCell>{contentData.k_198_220}</TableCell>
                        <TableCell>{contentData.k_147_221}</TableCell>
                        <TableCell>{contentData.k_106_222}</TableCell>
                        <TableCell>{contentData.k_136_223}</TableCell>
                        <TableCell>{contentData.k_175_224}</TableCell>
                        <TableCell>{contentData.k_196_225}</TableCell>
                        <TableCell>{contentData.k_152_226}</TableCell>
                        <TableCell>{contentData.k_118_227}</TableCell>
                        <TableCell>{contentData.k_096_228}</TableCell>
                        <TableCell>{contentData.k_124_229}</TableCell>
                        <TableCell>{contentData.k_150_230}</TableCell>
                        <TableCell className="font-semibold bg-orange-50">{contentData.k_146_231}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">{contentData.key_insights_232}</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>
                      • <strong>{contentData.k_2022_233}</strong>{contentData.saw_the_highest_inflation_rates_in_decades_peaking_234}</li>
                    <li>
                      • <strong>{contentData.k_2015_235}</strong>{contentData.experienced_deflation_negative_inflation_in_severa_236}</li>
                    <li>{contentData.the_federal_reserve_typically_targets_around_237}<strong>{contentData.k_2_annual_inflation_238}</strong>
                    </li>
                    <li>{contentData.use_this_historical_data_to_make_informed_assumpti_239}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Similar Calculators */}
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <SimilarCalculators calculators={[{
            calculatorName: "Currency Calculator",
            calculatorHref: "/financial/currency-calculator",
            calculatorDescription: "Convert between different currencies with real-time exchange rates and historical data."
          }, {
            calculatorName: "Interest Calculator",
            calculatorHref: "/financial/interest-calculator",
            calculatorDescription: "Calculate and compound interest on loans, investments, and savings accounts."
          }, {
            calculatorName: "Salary Calculator",
            calculatorHref: "/financial/salary-calculator",
            calculatorDescription: "Convert between different pay periods and calculate your salary breakdown across various timeframes."
          }]} color="red" title="Related Financial Calculators" />
          </div>

           
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="inflation-calculator"
            entityType="calculator"
            creatorSlug="neo-nicholas"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <div className="mt-8">
              <CalculatorGuide data={guideData} />
            </div>
        </main>

      </div>
    </>;
}
