"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Ruler, Calculator, RotateCcw, Users, TrendingUp } from "lucide-react";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide from "@/components/calculator-guide";
import { RatingProfileSection } from '@/components/rating-profile-section';

interface HeightCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function HeightCalculatorClient({ content, guideContent }: HeightCalculatorClientProps) {
  const guideData = guideContent || { color: 'blue', sections: [], faq: [] };
  
  const contentData = content || {
    "pageTitle": "",
    "pageDescription": "",
    "height_converter": "Height Converter",
    "enter_height": "Enter your height",
    "height_value": "Height Value",
    "from_unit": "From Unit",
    "to_unit": "To Unit",
    "calculate": "Convert",
    "result": "Result",
    "converted_height": "Converted Height"
  };

  const [height, setHeight] = useState("170");
  const [fromUnit, setFromUnit] = useState("cm");
  const [toUnit, setToUnit] = useState("ft");
  const [result, setResult] = useState<string | null>(null);

  const convertHeight = () => {
    const heightValue = parseFloat(height);
    if (isNaN(heightValue)) return;

    let heightInCm = heightValue;
    if (fromUnit === "ft") heightInCm = heightValue * 30.48;
    if (fromUnit === "in") heightInCm = heightValue * 2.54;
    if (fromUnit === "m") heightInCm = heightValue * 100;

    let convertedValue = heightInCm;
    if (toUnit === "ft") {
      const feet = Math.floor(heightInCm / 30.48);
      const inches = Math.round((heightInCm % 30.48) / 2.54);
      setResult(`${feet}' ${inches}"`);
      return;
    }
    if (toUnit === "in") convertedValue = heightInCm / 2.54;
    if (toUnit === "m") convertedValue = heightInCm / 100;
    if (toUnit === "cm") convertedValue = heightInCm;

    setResult(convertedValue.toFixed(2));
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Ruler className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-2xl border-0">
                <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
                  <CardTitle className="flex items-center space-x-3">
                    <Ruler className="w-6 h-6 text-green-600" />
                    <span>{contentData.height_converter}</span>
                  </CardTitle>
                  <CardDescription>{contentData.enter_height}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <Label className="mb-2 block">{contentData.height_value}</Label>
                      <Input 
                        type="number" 
                        value={height} 
                        onChange={e => setHeight(e.target.value)} 
                        className="h-12"
                        placeholder="170"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="mb-2 block">{contentData.from_unit}</Label>
                        <Select value={fromUnit} onValueChange={setFromUnit}>
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cm">Centimeters (cm)</SelectItem>
                            <SelectItem value="m">Meters (m)</SelectItem>
                            <SelectItem value="ft">Feet (ft)</SelectItem>
                            <SelectItem value="in">Inches (in)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="mb-2 block">{contentData.to_unit}</Label>
                        <Select value={toUnit} onValueChange={setToUnit}>
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cm">Centimeters (cm)</SelectItem>
                            <SelectItem value="m">Meters (m)</SelectItem>
                            <SelectItem value="ft">Feet (ft)</SelectItem>
                            <SelectItem value="in">Inches (in)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button onClick={convertHeight} className="w-full h-12 bg-gradient-to-r from-green-500 to-teal-600">
                      <Calculator className="w-5 h-5 mr-2" />{contentData.calculate}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-2xl border-0">
                <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
                  <CardTitle>{contentData.result}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {result ? (
                    <div className="text-center p-8 bg-green-100 rounded-lg">
                      <p className="text-sm font-semibold mb-2">{contentData.converted_height}</p>
                      <p className="text-4xl font-bold text-green-700">{result} {toUnit !== "ft" ? toUnit : ""}</p>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Ruler className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-500">Enter height and click convert</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <SimilarCalculators 
              calculators={[
                {
                  calculatorName: "BMI Calculator",
                  calculatorHref: "/health/bmi-calculator",
                  calculatorDescription: "Calculate your body mass index"
                }
              ]} 
              color="green" 
              title="Related Health Calculators" 
            />
            <RatingProfileSection
              entityId="height-calculator"
              entityType="calculator"
              creatorSlug="simon-stephen"
              initialRatingTotal={0}
              initialRatingCount={0}
            />
            <CalculatorGuide data={guideData} />
          </div>
        </main>
      </div>
    </>
  );
}
