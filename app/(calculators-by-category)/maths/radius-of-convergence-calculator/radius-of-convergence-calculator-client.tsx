"use client";

import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import CalculatorGuide from "@/components/calculator-guide";
import { Calculator, Sigma, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";

interface RadiusOfConvergenceCalculatorClientProps {
  content: any;
  guideContent: any;
}

interface CalculationResult {
  radius: number | string;
  center: number;
  interval: string;
  leftEndpoint: number | string;
  rightEndpoint: number | string;
  leftConvergence: string;
  rightConvergence: string;
  steps: string[];
  ratioParts?: {
    an: string;
    anPlus1: string;
    limit: string;
  };
}

const evaluateExpression = (expr: string, n: number): number => {
  try {
    const safeExpr = expr
      .replace(/\bn\b/g, `(${n})`)
      .replace(/\^/g, '**')
      .replace(/!/g, '')
      .replace(/factorial\(([^)]+)\)/g, (_, p) => {
        const num = parseInt(p);
        let fact = 1;
        for (let i = 2; i <= num; i++) fact *= i;
        return fact.toString();
      });
    
    const func = Function(`return ${safeExpr};`);
    const result = func();
    return isFinite(result) ? result : Number.NaN;
  } catch {
    return Number.NaN;
  }
};

const factorial = (n: number): number => {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
};

const parseCoefficient = (coeffExpr: string): { type: string; params: any } => {
  coeffExpr = coeffExpr.trim().toLowerCase();
  
  if (coeffExpr.includes('n!') || coeffExpr.includes('factorial')) {
    return { type: 'factorial', params: {} };
  }
  
  if (coeffExpr.includes('n**') || coeffExpr.includes('n^')) {
    const match = coeffExpr.match(/(\d+)\*?\*?n/);
    if (match) {
      return { type: 'exponential', params: { base: parseFloat(match[1]) } };
    }
  }
  
  if (coeffExpr.match(/^\d+$/)) {
    return { type: 'constant', params: { value: parseFloat(coeffExpr) } };
  }
  
  if (coeffExpr.includes('/n') || coeffExpr.match(/n\*\*(-?\d+)/)) {
    return { type: 'polynomial', params: {} };
  }
  
  return { type: 'general', params: {} };
};

const calculateRadiusOfConvergence = (
  coefficientExpr: string,
  center: number
): CalculationResult => {
  const steps: string[] = [];
  steps.push(`Given power series: ∑(n=0 to ∞) aₙ(x - ${center})ⁿ`);
  steps.push(`Coefficient term: aₙ = ${coefficientExpr}`);
  
  const coeffType = parseCoefficient(coefficientExpr);
  
  const testRatio = (n: number): number => {
    const an = evaluateExpression(coefficientExpr, n);
    const anPlus1 = evaluateExpression(coefficientExpr, n + 1);
    if (an === 0 || !isFinite(an) || !isFinite(anPlus1)) return NaN;
    return Math.abs(an / anPlus1);
  };
  
  let radius: number | string = 1;
  let ratioParts = {
    an: coefficientExpr,
    anPlus1: coefficientExpr.replace(/n/g, '(n+1)'),
    limit: '1'
  };
  
  steps.push('');
  steps.push('**Step 1: Apply the Ratio Test**');
  steps.push(`R = lim(n→∞) |aₙ / aₙ₊₁|`);
  
  if (coeffType.type === 'factorial') {
    steps.push('For factorial terms: aₙ = 1/n!');
    steps.push('aₙ / aₙ₊₁ = (1/n!) / (1/(n+1)!) = (n+1)!/n! = n+1');
    steps.push('lim(n→∞) (n+1) = ∞');
    steps.push('**R = ∞** (series converges for all x)');
    radius = 'Infinity';
    ratioParts.limit = '∞';
  } else if (coeffType.type === 'exponential' && coeffType.params.base) {
    const base = coeffType.params.base;
    steps.push(`For exponential terms: aₙ = 1/${base}ⁿ`);
    steps.push(`aₙ / aₙ₊₁ = (1/${base}ⁿ) / (1/${base}ⁿ⁺¹) = ${base}`);
    steps.push(`**R = ${base}**`);
    radius = base;
    ratioParts.limit = base.toString();
  } else if (coeffType.type === 'constant') {
    steps.push('For constant coefficients: aₙ = c (constant)');
    steps.push('aₙ / aₙ₊₁ = c/c = 1');
    steps.push('**R = 1**');
    radius = 1;
    ratioParts.limit = '1';
  } else if (coeffType.type === 'polynomial') {
    steps.push('For polynomial terms in n:');
    const ratios: number[] = [];
    for (let n = 10; n <= 100; n += 10) {
      ratios.push(testRatio(n));
    }
    const avgRatio = ratios.reduce((a, b) => a + b, 0) / ratios.length;
    radius = Math.round(avgRatio * 1000) / 1000;
    steps.push(`Computing limit numerically: R ≈ ${radius}`);
    ratioParts.limit = radius.toString();
  } else {
    const ratios: number[] = [];
    for (let n = 10; n <= 100; n += 10) {
      const r = testRatio(n);
      if (isFinite(r)) ratios.push(r);
    }
    
    if (ratios.length > 0) {
      const avgRatio = ratios.reduce((a, b) => a + b, 0) / ratios.length;
      radius = Math.round(avgRatio * 1000) / 1000;
      steps.push(`Computing limit numerically: R ≈ ${radius}`);
      ratioParts.limit = radius.toString();
    } else {
      radius = 1;
      steps.push('Using default R = 1 (verify manually for complex expressions)');
      ratioParts.limit = '1';
    }
  }
  
  steps.push('');
  steps.push('**Step 2: Determine Interval of Convergence**');
  
  let leftEndpoint: number | string = center;
  let rightEndpoint: number | string = center;
  let interval = '';
  let leftConvergence = 'Not Tested';
  let rightConvergence = 'Not Tested';
  
  if (radius === 'Infinity') {
    interval = '(-∞, ∞)';
    leftEndpoint = '-∞';
    rightEndpoint = '∞';
    leftConvergence = 'N/A';
    rightConvergence = 'N/A';
    steps.push('Since R = ∞, the series converges for all real x');
    steps.push(`**Interval of Convergence: ${interval}**`);
  } else if (radius === 0) {
    interval = `{${center}}`;
    leftEndpoint = center;
    rightEndpoint = center;
    leftConvergence = 'Only at center';
    rightConvergence = 'Only at center';
    steps.push('Since R = 0, the series only converges at the center');
    steps.push(`**Interval of Convergence: ${interval}**`);
  } else {
    const R = radius as number;
    leftEndpoint = Math.round((center - R) * 1000) / 1000;
    rightEndpoint = Math.round((center + R) * 1000) / 1000;
    
    steps.push(`Base interval: (${center} - ${R}, ${center} + ${R}) = (${leftEndpoint}, ${rightEndpoint})`);
    steps.push('');
    steps.push('**Step 3: Test Endpoints**');
    
    const testEndpoint = (x: number, side: string): string => {
      steps.push(`\nTesting x = ${x} (${side} endpoint):`);
      
      const series: number[] = [];
      let converges = true;
      let diverges = false;
      
      for (let n = 1; n <= 50; n++) {
        const an = evaluateExpression(coefficientExpr, n);
        const term = an * Math.pow(x - center, n);
        
        if (!isFinite(term)) {
          diverges = true;
          break;
        }
        
        series.push(Math.abs(term));
        
        if (n > 10) {
          const recent = series.slice(-10);
          const isIncreasing = recent.every((val, i) => i === 0 || val >= recent[i - 1]);
          if (isIncreasing && recent[recent.length - 1] > 1) {
            diverges = true;
            break;
          }
        }
      }
      
      if (diverges) {
        steps.push(`The series ∑aₙ(${x - center})ⁿ diverges (terms do not decrease)`);
        return 'Diverges';
      }
      
      const sum = series.slice(0, 30).reduce((a, b) => a + b, 0);
      if (isFinite(sum) && sum < 1000) {
        steps.push(`The series appears to converge (partial sum ≈ ${sum.toFixed(4)})`);
        return 'Converges';
      }
      
      steps.push('Convergence at endpoint requires further analysis');
      return 'Inconclusive';
    };
    
    leftConvergence = testEndpoint(leftEndpoint as number, 'left');
    rightConvergence = testEndpoint(rightEndpoint as number, 'right');
    
    const leftBracket = leftConvergence === 'Converges' ? '[' : '(';
    const rightBracket = rightConvergence === 'Converges' ? ']' : ')';
    
    interval = `${leftBracket}${leftEndpoint}, ${rightEndpoint}${rightBracket}`;
    steps.push('');
    steps.push(`**Final Interval of Convergence: ${interval}**`);
  }
  
  return {
    radius,
    center,
    interval,
    leftEndpoint,
    rightEndpoint,
    leftConvergence,
    rightConvergence,
    steps,
    ratioParts
  };
};

export default function RadiusOfConvergenceCalculatorClient({ content, guideContent }: RadiusOfConvergenceCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'purple',
    sections: [],
    faq: []
  };
  
  const contentData = content || {};
  
  const [coefficientExpr, setCoefficientExpr] = useState("1/3**n");
  const [center, setCenter] = useState("0");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();

  const handleCalculate = () => {
    setError("");
    setResult(null);

    const centerNum = parseFloat(center);
    
    if (!coefficientExpr.trim()) {
      setError(contentData.errors?.coefficient || "Please enter a coefficient expression");
      return;
    }
    
    if (isNaN(centerNum)) {
      setError(contentData.errors?.center || "Please enter a valid center value");
      return;
    }

    try {
      const calcResult = calculateRadiusOfConvergence(coefficientExpr, centerNum);
      setResult(calcResult);
      scrollToRef(resultRef as React.RefObject<HTMLElement>);
    } catch (err) {
      setError(contentData.errors?.calculation || "Error calculating radius of convergence. Please check your input.");
    }
  };

  const handleReset = () => {
    setCoefficientExpr("1/3**n");
    setCenter("0");
    setResult(null);
    setError("");
  };

  const handleExample = () => {
    setCoefficientExpr("1/n!");
    setCenter("0");
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
              <Sigma className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {contentData.pageTitle || "Radius of Convergence Calculator"}
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {contentData.pageDescription || "Calculate the radius and interval of convergence for power series"}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-xl border-t-4 border-t-purple-500 hover:shadow-2xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Calculator className="w-5 h-5" />
                {contentData.form?.title || "Power Series Input"}
              </CardTitle>
              <CardDescription>{contentData.form?.description || "Enter the coefficient and center of your power series"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="coefficient" className="text-sm font-semibold text-gray-700">
                  {contentData.form?.labels?.coefficient || "Coefficient aₙ"}
                </Label>
                <Input
                  id="coefficient"
                  type="text"
                  value={coefficientExpr}
                  onChange={(e) => setCoefficientExpr(e.target.value)}
                  placeholder={contentData.form?.placeholders?.coefficient || "e.g., 1/n!, 1/3**n, 1/n"}
                  className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                />
                <p className="text-xs text-gray-500">
                  {contentData.form?.hints?.coefficient || "Use n for the index, ** for powers (e.g., n**2), n! for factorial"}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="center" className="text-sm font-semibold text-gray-700">
                  {contentData.form?.labels?.center || "Center (c)"}
                </Label>
                <Input
                  id="center"
                  type="text"
                  value={center}
                  onChange={(e) => setCenter(e.target.value)}
                  placeholder={contentData.form?.placeholders?.center || "e.g., 0, 2, -1"}
                  className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={handleCalculate}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  {contentData.form?.buttons?.calculate || "Calculate"}
                </Button>
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 font-semibold py-6 px-6"
                >
                  {contentData.form?.buttons?.reset || "Reset"}
                </Button>
              </div>

              <Button 
                onClick={handleExample}
                variant="ghost"
                className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              >
                {contentData.form?.buttons?.example || "Try Example: aₙ = 1/n!"}
              </Button>

              <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-2 text-sm">
                  {contentData.formula?.title || "Radius of Convergence Formula:"}
                </h3>
                <div className="text-center py-3 bg-white rounded-lg">
                  <p className="text-lg font-mono">R = lim(n→∞) |aₙ / aₙ₊₁|</p>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {contentData.formula?.description || "Interval: (c - R, c + R) with endpoint testing"}
                </p>
              </div>
            </CardContent>
          </Card>

          <div ref={resultRef}>
            <Card className="shadow-xl border-t-4 border-t-pink-500 hover:shadow-2xl transition-shadow h-full">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
                <CardTitle className="flex items-center gap-2 text-pink-700">
                  <Sigma className="w-5 h-5" />
                  {contentData.results?.title || "Convergence Results"}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {!result ? (
                  <div className="text-center py-12 text-gray-500">
                    <Sigma className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p>{contentData.results?.placeholder || "Enter a power series and click Calculate to see results"}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                        <p className="text-sm text-gray-600 mb-1">{contentData.results?.radius || "Radius (R)"}</p>
                        <p className="text-2xl font-bold text-purple-700">
                          {result.radius === 'Infinity' ? '∞' : result.radius}
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
                        <p className="text-sm text-gray-600 mb-1">{contentData.results?.center || "Center (c)"}</p>
                        <p className="text-2xl font-bold text-blue-700">{result.center}</p>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                      <p className="text-sm text-gray-600 mb-2 font-semibold">
                        {contentData.results?.interval || "Interval of Convergence"}
                      </p>
                      <p className="text-3xl font-bold text-green-700 text-center">{result.interval}</p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        {contentData.results?.endpointTests || "Endpoint Analysis"}
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">
                            {contentData.results?.leftEndpoint || "Left Endpoint"}
                          </p>
                          <p className="font-mono font-semibold text-gray-800">
                            x = {result.leftEndpoint}
                          </p>
                          <p className={`text-sm mt-1 font-medium ${
                            result.leftConvergence === 'Converges' ? 'text-green-600' :
                            result.leftConvergence === 'Diverges' ? 'text-red-600' : 'text-yellow-600'
                          }`}>
                            {result.leftConvergence}
                          </p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">
                            {contentData.results?.rightEndpoint || "Right Endpoint"}
                          </p>
                          <p className="font-mono font-semibold text-gray-800">
                            x = {result.rightEndpoint}
                          </p>
                          <p className={`text-sm mt-1 font-medium ${
                            result.rightConvergence === 'Converges' ? 'text-green-600' :
                            result.rightConvergence === 'Diverges' ? 'text-red-600' : 'text-yellow-600'
                          }`}>
                            {result.rightConvergence}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-white rounded-xl border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        {contentData.results?.stepByStep || "Step-by-Step Solution"}
                      </h4>
                      <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                        {result.steps.map((step, index) => (
                          <p 
                            key={index} 
                            className={`text-sm ${
                              step.startsWith('**') 
                                ? 'font-bold text-purple-700 mt-3' 
                                : step.trim() === '' 
                                ? 'h-2' 
                                : 'text-gray-700 pl-3'
                            }`}
                          >
                            {step.replace(/\*\*/g, '')}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-12">
            <SimilarCalculators 
              calculators={[
                {
                  calculatorName: "Scientific Calculator",
                  calculatorHref: "/maths/scientific-calculator",
                  calculatorDescription: "Calculate loan payments and schedules for any type of loan"
                }
              ]}
              color="pink"
              title="Related Math Calculators" 
            />
        </div>

        <div className="mt-12">
          <CalculatorGuide data={guideData} />
        </div>
      </div>
    </div>
  );
}
