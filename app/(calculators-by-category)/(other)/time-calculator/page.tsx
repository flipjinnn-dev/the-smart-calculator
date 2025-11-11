"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Clock, Calculator, Plus, Minus, AlertCircle, Timer } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
export default function TimeCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('time-calculator', language, "calculator-ui");

  // Use content or fallback to defaults
  const contentData = content || {
    "pageTitle": "",
    "pageDescription": "",
    "operation_2": "",
    "addition_3": "",
    "subtraction_4": "",
    "time_a_5": "",
    "days_6": "",
    "hours_7": "",
    "minutes_8": "",
    "seconds_9": "",
    "time_b_10": "",
    "days_11": "",
    "hours_12": "",
    "minutes_13": "",
    "seconds_14": "",
    "formula_15": "",
    "convert_each_time_to_seconds_perform_operation_the_16": "",
    "k_1_day_86400_seconds_1_hour_3600_seconds_1_minute_6_17": "",
    "calculate_18": "",
    "time_results_19": "",
    "days_20": "",
    "hours_21": "",
    "minutes_22": "",
    "seconds_23": "",
    "enter_time_values_and_click_24": "",
    "calculate_25": "",
    "to_see_results_26": "",
    "detailed_time_breakdown_27": "",
    "days_28": "",
    "d_29": "",
    "hours_30": "",
    "h_31": "",
    "minutes_32": "",
    "m_33": "",
    "seconds_34": "",
    "s_35": "",
    "calculation_steps_36": "",
    "step_1_37": "",
    "time_a_38": "",
    "seconds_39": "",
    "step_2_40": "",
    "time_b_41": "",
    "seconds_42": "",
    "step_3_43": "",
    "seconds_44": "",
    "step_4_45": "",
    "convert_back_46": "",
    "d_47": "",
    "h_48": "",
    "m_49": "",
    "s_50": "",
    "understanding_time_calculations_51": "",
    "how_it_works_52": "",
    "time_calculations_involve_converting_time_units_to_53": "",
    "conversion_factors_54": "",
    "k_1_day_86400_seconds_55": "",
    "k_1_hour_3600_seconds_56": "",
    "k_1_minute_60_seconds_57": "",
    "k_1_second_1_second_58": "",
    "sample_calculation_59": "",
    "example_60": "",
    "addition_61": "",
    "time_a_1d_2h_30m_20s_62": "",
    "time_b_0d_5h_45m_40s_63": "",
    "steps_64": "",
    "a_95420_seconds_65": "",
    "b_20740_seconds_66": "",
    "sum_116160_seconds_67": "",
    "result_1d_8h_16m_0s_68": "",
    "time_calculation_0": "",
    "enter_two_time_values_and_select_an_operation_1": ""
  };
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  // Input states for Time A
  const [timeADays, setTimeADays] = useState("");
  const [timeAHours, setTimeAHours] = useState("");
  const [timeAMinutes, setTimeAMinutes] = useState("");
  const [timeASeconds, setTimeASeconds] = useState("");

  // Input states for Time B
  const [timeBDays, setTimeBDays] = useState("");
  const [timeBHours, setTimeBHours] = useState("");
  const [timeBMinutes, setTimeBMinutes] = useState("");
  const [timeBSeconds, setTimeBSeconds] = useState("");

  // Operation selection
  const [operation, setOperation] = useState("add");
  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};

    // Validate Time A inputs
    const aDays = Number.parseFloat(timeADays || "0");
    const aHours = Number.parseFloat(timeAHours || "0");
    const aMinutes = Number.parseFloat(timeAMinutes || "0");
    const aSeconds = Number.parseFloat(timeASeconds || "0");
    if (aDays < 0 || aHours < 0 || aMinutes < 0 || aSeconds < 0) {
      newErrors.timeA = "Time A values must be non-negative";
    }

    // Validate Time B inputs
    const bDays = Number.parseFloat(timeBDays || "0");
    const bHours = Number.parseFloat(timeBHours || "0");
    const bMinutes = Number.parseFloat(timeBMinutes || "0");
    const bSeconds = Number.parseFloat(timeBSeconds || "0");
    if (bDays < 0 || bHours < 0 || bMinutes < 0 || bSeconds < 0) {
      newErrors.timeB = "Time B values must be non-negative";
    }

    // Check if at least one time has values
    const timeATotal = aDays + aHours + aMinutes + aSeconds;
    const timeBTotal = bDays + bHours + bMinutes + bSeconds;
    if (timeATotal === 0 && timeBTotal === 0) {
      newErrors.general = "Please enter at least one time value";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateTime = () => {
    if (!validateInputs()) return;

    // Convert Time A to seconds
    const aDays = Number.parseFloat(timeADays || "0");
    const aHours = Number.parseFloat(timeAHours || "0");
    const aMinutes = Number.parseFloat(timeAMinutes || "0");
    const aSeconds = Number.parseFloat(timeASeconds || "0");
    const timeAInSeconds = aDays * 86400 + aHours * 3600 + aMinutes * 60 + aSeconds;

    // Convert Time B to seconds
    const bDays = Number.parseFloat(timeBDays || "0");
    const bHours = Number.parseFloat(timeBHours || "0");
    const bMinutes = Number.parseFloat(timeBMinutes || "0");
    const bSeconds = Number.parseFloat(timeBSeconds || "0");
    const timeBInSeconds = bDays * 86400 + bHours * 3600 + bMinutes * 60 + bSeconds;

    // Perform operation
    let resultInSeconds = 0;
    if (operation === "add") {
      resultInSeconds = timeAInSeconds + timeBInSeconds;
    } else {
      resultInSeconds = Math.abs(timeAInSeconds - timeBInSeconds);
    }

    // Convert result back to days, hours, minutes, seconds
    const resultDays = Math.floor(resultInSeconds / 86400);
    const resultHours = Math.floor(resultInSeconds % 86400 / 3600);
    const resultMinutes = Math.floor(resultInSeconds % 3600 / 60);
    const finalSeconds = resultInSeconds % 60;
    setResult({
      timeA: {
        days: aDays,
        hours: aHours,
        minutes: aMinutes,
        seconds: aSeconds,
        totalSeconds: timeAInSeconds
      },
      timeB: {
        days: bDays,
        hours: bHours,
        minutes: bMinutes,
        seconds: bSeconds,
        totalSeconds: timeBInSeconds
      },
      operation: operation,
      result: {
        days: resultDays,
        hours: resultHours,
        minutes: resultMinutes,
        seconds: Math.round(finalSeconds),
        totalSeconds: resultInSeconds
      }
    });
    setShowResult(true);
    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Clock className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Timer className="w-6 h-6 text-gray-600" />
                      <span>{contentData.time_calculation_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_two_time_values_and_select_an_operation_1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="mb-8">
                      <Label className="text-sm font-medium text-gray-700 mb-4 block">{contentData.operation_2}</Label>
                      <RadioGroup value={operation} onValueChange={setOperation} className="flex space-x-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="add" id="add" />
                          <Label htmlFor="add" className="flex items-center space-x-2 cursor-pointer">
                            <Plus className="w-4 h-4 text-green-600" />
                            <span>{contentData.addition_3}</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="subtract" id="subtract" />
                          <Label htmlFor="subtract" className="flex items-center space-x-2 cursor-pointer">
                            <Minus className="w-4 h-4 text-red-600" />
                            <span>{contentData.subtraction_4}</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="mb-8">
                      <Label className="text-lg font-semibold text-gray-700 mb-4 block">{contentData.time_a_5}</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-600 mb-2 block">{contentData.days_6}</Label>
                          <Input className={`h-12 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-200 shadow-sm ${errors.timeA ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" min="0" placeholder="0" value={timeADays} onChange={e => {
                          setTimeADays(e.target.value);
                          if (errors.timeA) setErrors(prev => ({
                            ...prev,
                            timeA: ""
                          }));
                        }} />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600 mb-2 block">{contentData.hours_7}</Label>
                          <Input className={`h-12 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-200 shadow-sm ${errors.timeA ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" min="0" placeholder="0" value={timeAHours} onChange={e => {
                          setTimeAHours(e.target.value);
                          if (errors.timeA) setErrors(prev => ({
                            ...prev,
                            timeA: ""
                          }));
                        }} />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600 mb-2 block">{contentData.minutes_8}</Label>
                          <Input className={`h-12 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-200 shadow-sm ${errors.timeA ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" min="0" placeholder="0" value={timeAMinutes} onChange={e => {
                          setTimeAMinutes(e.target.value);
                          if (errors.timeA) setErrors(prev => ({
                            ...prev,
                            timeA: ""
                          }));
                        }} />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600 mb-2 block">{contentData.seconds_9}</Label>
                          <Input className={`h-12 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-200 shadow-sm ${errors.timeA ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" min="0" placeholder="0" value={timeASeconds} onChange={e => {
                          setTimeASeconds(e.target.value);
                          if (errors.timeA) setErrors(prev => ({
                            ...prev,
                            timeA: ""
                          }));
                        }} />
                        </div>
                      </div>
                      {errors.timeA && <div className="flex items-center mt-2 text-red-600">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm">{errors.timeA}</span>
                        </div>}
                    </div>

                    <div className="mb-8">
                      <Label className="text-lg font-semibold text-gray-700 mb-4 block">{contentData.time_b_10}</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-600 mb-2 block">{contentData.days_11}</Label>
                          <Input className={`h-12 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-200 shadow-sm ${errors.timeB ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" min="0" placeholder="0" value={timeBDays} onChange={e => {
                          setTimeBDays(e.target.value);
                          if (errors.timeB) setErrors(prev => ({
                            ...prev,
                            timeB: ""
                          }));
                        }} />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600 mb-2 block">{contentData.hours_12}</Label>
                          <Input className={`h-12 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-200 shadow-sm ${errors.timeB ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" min="0" placeholder="0" value={timeBHours} onChange={e => {
                          setTimeBHours(e.target.value);
                          if (errors.timeB) setErrors(prev => ({
                            ...prev,
                            timeB: ""
                          }));
                        }} />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600 mb-2 block">{contentData.minutes_13}</Label>
                          <Input className={`h-12 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-200 shadow-sm ${errors.timeB ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" min="0" placeholder="0" value={timeBMinutes} onChange={e => {
                          setTimeBMinutes(e.target.value);
                          if (errors.timeB) setErrors(prev => ({
                            ...prev,
                            timeB: ""
                          }));
                        }} />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600 mb-2 block">{contentData.seconds_14}</Label>
                          <Input className={`h-12 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-200 shadow-sm ${errors.timeB ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" min="0" placeholder="0" value={timeBSeconds} onChange={e => {
                          setTimeBSeconds(e.target.value);
                          if (errors.timeB) setErrors(prev => ({
                            ...prev,
                            timeB: ""
                          }));
                        }} />
                        </div>
                      </div>
                      {errors.timeB && <div className="flex items-center mt-2 text-red-600">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm">{errors.timeB}</span>
                        </div>}
                    </div>

                    {errors.general && <div className="flex items-center mb-6 text-red-600">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">{errors.general}</span>
                      </div>}

                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-700">
                        <strong>{contentData.formula_15}</strong>{contentData.convert_each_time_to_seconds_perform_operation_the_16}</p>
                      <p className="text-xs text-gray-600 mt-1">{contentData.k_1_day_86400_seconds_1_hour_3600_seconds_1_minute_6_17}</p>
                    </div>

                    <Button onClick={calculateTime} className="w-full h-12 text-lg bg-gradient-to-r from-gray-600 to-slate-700 hover:from-gray-700 hover:to-slate-800">{contentData.calculate_18}</Button>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card (right side) */}
              <div className="">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-gradient-to-br from-gray-50 to-slate-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-600 to-slate-700 flex items-center justify-center mb-3 shadow-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-700 tracking-tight">{contentData.time_results_19}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-4">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="text-2xl font-bold text-gray-900">{result.result.days}</p>
                            <p className="text-gray-600">{contentData.days_20}</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="text-2xl font-bold text-gray-900">{result.result.hours}</p>
                            <p className="text-gray-600">{contentData.hours_21}</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="text-2xl font-bold text-gray-900">{result.result.minutes}</p>
                            <p className="text-gray-600">{contentData.minutes_22}</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="text-2xl font-bold text-gray-900">{result.result.seconds}</p>
                            <p className="text-gray-600">{contentData.seconds_23}</p>
                          </div>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Clock className="w-8 h-8 text-gray-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_time_values_and_click_24}<span className="font-semibold text-gray-600">{contentData.calculate_25}</span>{contentData.to_see_results_26}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && <div className="mt-8">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-gray-600" />
                      <span>{contentData.detailed_time_breakdown_27}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">{contentData.days_28}</h3>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{result.result.days}</p>
                        <p className="text-sm text-gray-600">{contentData.d_29}</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Timer className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">{contentData.hours_30}</h3>
                        <p className="text-2xl font-bold text-gray-900 mb-1">{result.result.hours}</p>
                        <p className="text-sm text-gray-600">{contentData.h_31}</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Calculator className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">{contentData.minutes_32}</h3>
                        <p className="text-2xl font-bold text-gray-900 mb-1">{result.result.minutes}</p>
                        <p className="text-sm text-gray-600">{contentData.m_33}</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">{contentData.seconds_34}</h3>
                        <p className="text-2xl font-bold text-gray-900 mb-1">{result.result.seconds}</p>
                        <p className="text-sm text-gray-600">{contentData.s_35}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-700 mb-2">{contentData.calculation_steps_36}</h4>
                      <div className="text-gray-700 space-y-1">
                        <p>
                          <strong>{contentData.step_1_37}</strong>{contentData.time_a_38}{result.timeA.totalSeconds?.toLocaleString()}{contentData.seconds_39}</p>
                        <p>
                          <strong>{contentData.step_2_40}</strong>{contentData.time_b_41}{result.timeB.totalSeconds?.toLocaleString()}{contentData.seconds_42}</p>
                        <p>
                          <strong>{contentData.step_3_43}</strong> {result.operation === "add" ? "Addition" : "Subtraction"} ={" "}
                          {result.result.totalSeconds?.toLocaleString()}{contentData.seconds_44}</p>
                        <p>
                          <strong>{contentData.step_4_45}</strong>{contentData.convert_back_46}{result.result.days}{contentData.d_47}{result.result.hours}{contentData.h_48}{" "}
                          {result.result.minutes}{contentData.m_49}{result.result.seconds}{contentData.s_50}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>}

            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-gray-50 to-slate-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-600 to-slate-700 flex items-center justify-center mr-3 shadow-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-700 tracking-tight">{contentData.understanding_time_calculations_51}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">{contentData.how_it_works_52}</h3>
                      <p className="text-gray-700 mb-4">{contentData.time_calculations_involve_converting_time_units_to_53}</p>
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">{contentData.conversion_factors_54}</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>{contentData.k_1_day_86400_seconds_55}</li>
                        <li>{contentData.k_1_hour_3600_seconds_56}</li>
                        <li>{contentData.k_1_minute_60_seconds_57}</li>
                        <li>{contentData.k_1_second_1_second_58}</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">{contentData.sample_calculation_59}</h3>
                      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                        <p className="text-gray-700 mb-2">
                          <strong>{contentData.example_60}</strong>{contentData.addition_61}</p>
                        <p className="text-gray-700">{contentData.time_a_1d_2h_30m_20s_62}</p>
                        <p className="text-gray-700">{contentData.time_b_0d_5h_45m_40s_63}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-gray-700 mb-2">
                          <strong>{contentData.steps_64}</strong>
                        </p>
                        <p className="text-gray-700">{contentData.a_95420_seconds_65}</p>
                        <p className="text-gray-700">{contentData.b_20740_seconds_66}</p>
                        <p className="text-gray-700">{contentData.sum_116160_seconds_67}</p>
                        <p className="text-gray-700 font-semibold">{contentData.result_1d_8h_16m_0s_68}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

      </div>
    </>;
}