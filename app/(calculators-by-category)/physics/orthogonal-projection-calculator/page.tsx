"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calculator, Move3d, ArrowRight, Info } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide from "@/components/calculator-guide";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProjectionResults {
  projectionVector: number[];
  magnitude: number;
  dotProduct: number;
  vectorBMagnitudeSquared: number;
  scaleFactor: number;
}

export default function OrthogonalProjectionCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('orthogonal-projection-calculator', language, "calculator-ui");
  const { content: guideContent } = useCalculatorContent(
    'orthogonal-projection-calculator',
    language,
    "calculator-guide"
  );
  
  const guideData = guideContent || {
    color: 'purple',
    sections: [],
    faq: []
  };

  const contentData = content || {
    "pageTitle": "Orthogonal Projection Calculator",
    "pageDescription": "Calculate the orthogonal projection of one vector onto another with step-by-step solutions",
    "dimension_label": "Dimension",
    "2d": "2D",
    "3d": "3D",
    "vector_a_label": "Vector a",
    "vector_b_label": "Vector b",
    "x_component": "x component",
    "y_component": "y component",
    "z_component": "z component",
    "calculate_button": "Calculate Projection",
    "results_title": "Projection Results",
    "projection_vector": "Projection Vector",
    "magnitude": "Magnitude",
    "dot_product": "Dot Product (a·b)",
    "scale_factor": "Scale Factor",
    "formula_title": "Formula Used",
    "formula_text": "proj_b(a) = ((a·b) / (b·b)) × b",
    "step_by_step": "Step-by-Step Solution",
    "step_1": "Calculate dot product a·b",
    "step_2": "Calculate b·b (magnitude squared)",
    "step_3": "Calculate scale factor: (a·b) / (b·b)",
    "step_4": "Multiply scale factor by vector b",
    "enter_vectors": "Enter vector components to calculate the orthogonal projection",
    "invalid_input": "Please enter valid numeric values for all components",
    "zero_vector_b": "Vector b cannot be a zero vector"
  };

  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  
  const [dimension, setDimension] = useState<"2" | "3">("2");
  const [vectorA, setVectorA] = useState({ x: "3", y: "4", z: "0" });
  const [vectorB, setVectorB] = useState({ x: "1", y: "1", z: "0" });
  const [results, setResults] = useState<ProjectionResults | null>(null);
  const [error, setError] = useState<string>("");

  const calculateProjection = () => {
    setError("");
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);

    // Parse input values
    const ax = parseFloat(vectorA.x);
    const ay = parseFloat(vectorA.y);
    const az = dimension === "3" ? parseFloat(vectorA.z) : 0;
    const bx = parseFloat(vectorB.x);
    const by = parseFloat(vectorB.y);
    const bz = dimension === "3" ? parseFloat(vectorB.z) : 0;

    // Validate inputs
    if (isNaN(ax) || isNaN(ay) || (dimension === "3" && isNaN(az)) ||
        isNaN(bx) || isNaN(by) || (dimension === "3" && isNaN(bz))) {
      setError(contentData.invalid_input);
      setResults(null);
      return;
    }

    // Check if vector b is zero vector
    const bMagnitudeSquared = bx * bx + by * by + bz * bz;
    if (bMagnitudeSquared === 0) {
      setError(contentData.zero_vector_b);
      setResults(null);
      return;
    }

    // Calculate dot product a·b
    const dotProduct = ax * bx + ay * by + az * bz;

    // Calculate scale factor: (a·b) / (b·b)
    const scaleFactor = dotProduct / bMagnitudeSquared;

    // Calculate projection vector: scaleFactor × b
    const projX = scaleFactor * bx;
    const projY = scaleFactor * by;
    const projZ = scaleFactor * bz;

    // Calculate magnitude of projection
    const magnitude = Math.sqrt(projX * projX + projY * projY + projZ * projZ);

    const projectionVector = dimension === "3" 
      ? [projX, projY, projZ]
      : [projX, projY];

    setResults({
      projectionVector,
      magnitude,
      dotProduct,
      vectorBMagnitudeSquared: bMagnitudeSquared,
      scaleFactor
    });
  };

  const formatVector = (vec: number[]) => {
    return `(${vec.map(v => v.toFixed(4)).join(", ")})`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Move3d className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {contentData.pageTitle}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {contentData.pageDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 pt-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-purple-600" />
                    <span>{contentData.pageTitle}</span>
                  </CardTitle>
                  <CardDescription className="text-base">
                    {contentData.pageDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {/* Dimension Selector */}
                  <div className="mb-6">
                    <Label className="text-base font-semibold text-gray-900 mb-3 block">
                      {contentData.dimension_label}
                    </Label>
                    <Select value={dimension} onValueChange={(val) => setDimension(val as "2" | "3")}>
                      <SelectTrigger className="h-12 border-2 focus:border-purple-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">{contentData["2d"]}</SelectItem>
                        <SelectItem value="3">{contentData["3d"]}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Vector A Inputs */}
                  <div className="mb-6">
                    <Label className="text-base font-semibold text-gray-900 mb-3 block">
                      {contentData.vector_a_label}
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm text-gray-600 mb-2 block">
                          {contentData.x_component}
                        </Label>
                        <Input
                          type="number"
                          step="any"
                          value={vectorA.x}
                          onChange={(e) => setVectorA({ ...vectorA, x: e.target.value })}
                          className="h-12 text-lg border-2 focus:border-purple-500"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600 mb-2 block">
                          {contentData.y_component}
                        </Label>
                        <Input
                          type="number"
                          step="any"
                          value={vectorA.y}
                          onChange={(e) => setVectorA({ ...vectorA, y: e.target.value })}
                          className="h-12 text-lg border-2 focus:border-purple-500"
                          placeholder="0"
                        />
                      </div>
                      {dimension === "3" && (
                        <div>
                          <Label className="text-sm text-gray-600 mb-2 block">
                            {contentData.z_component}
                          </Label>
                          <Input
                            type="number"
                            step="any"
                            value={vectorA.z}
                            onChange={(e) => setVectorA({ ...vectorA, z: e.target.value })}
                            className="h-12 text-lg border-2 focus:border-purple-500"
                            placeholder="0"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Vector B Inputs */}
                  <div className="mb-8">
                    <Label className="text-base font-semibold text-gray-900 mb-3 block">
                      {contentData.vector_b_label}
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm text-gray-600 mb-2 block">
                          {contentData.x_component}
                        </Label>
                        <Input
                          type="number"
                          step="any"
                          value={vectorB.x}
                          onChange={(e) => setVectorB({ ...vectorB, x: e.target.value })}
                          className="h-12 text-lg border-2 focus:border-purple-500"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600 mb-2 block">
                          {contentData.y_component}
                        </Label>
                        <Input
                          type="number"
                          step="any"
                          value={vectorB.y}
                          onChange={(e) => setVectorB({ ...vectorB, y: e.target.value })}
                          className="h-12 text-lg border-2 focus:border-purple-500"
                          placeholder="0"
                        />
                      </div>
                      {dimension === "3" && (
                        <div>
                          <Label className="text-sm text-gray-600 mb-2 block">
                            {contentData.z_component}
                          </Label>
                          <Input
                            type="number"
                            step="any"
                            value={vectorB.z}
                            onChange={(e) => setVectorB({ ...vectorB, z: e.target.value })}
                            className="h-12 text-lg border-2 focus:border-purple-500"
                            placeholder="0"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-start space-x-3">
                      <Info className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <p className="text-red-800 text-sm">{error}</p>
                    </div>
                  )}

                  <Button
                    onClick={calculateProjection}
                    className="w-full h-14 text-xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-xl font-bold"
                  >
                    {contentData.calculate_button}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="lg:col-span-1">
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.results_title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? (
                    <div className="space-y-6">
                      <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-200">
                        <p className="text-sm text-gray-600 mb-2">{contentData.projection_vector}</p>
                        <p className="text-2xl font-bold text-purple-600 mb-2">
                          {formatVector(results.projectionVector)}
                        </p>
                        <p className="text-sm text-gray-600 mt-4">{contentData.magnitude}</p>
                        <p className="text-xl font-bold text-gray-900">
                          {results.magnitude.toFixed(4)}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900">{contentData.step_by_step}</h3>
                        
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            {contentData.step_1}
                          </p>
                          <p className="font-bold text-blue-600">
                            a·b = {results.dotProduct.toFixed(4)}
                          </p>
                        </div>

                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            {contentData.step_2}
                          </p>
                          <p className="font-bold text-green-600">
                            b·b = {results.vectorBMagnitudeSquared.toFixed(4)}
                          </p>
                        </div>

                        <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            {contentData.step_3}
                          </p>
                          <p className="font-bold text-orange-600">
                            {results.scaleFactor.toFixed(4)}
                          </p>
                        </div>

                        <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            {contentData.step_4}
                          </p>
                          <p className="font-bold text-purple-600">
                            {formatVector(results.projectionVector)}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          {contentData.formula_title}
                        </p>
                        <p className="text-sm text-gray-600 font-mono">
                          {contentData.formula_text}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Move3d className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">{contentData.enter_vectors}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Similar Calculators Section */}
          <SimilarCalculators
            calculators={[
              {
                calculatorName: "Age Calculator",
                calculatorHref: "/other/age-calculator",
                calculatorDescription: "Calculate exact age between two dates"
              },
              {
                calculatorName: "GPA Calculator",
                calculatorHref: "/other/gpa-calculator",
                calculatorDescription: "Calculate your Grade Point Average"
              },
              {
                calculatorName: "Time Calculator",
                calculatorHref: "/other/time-calculator",
                calculatorDescription: "Add, subtract, and convert time units"
              }
            ]}
            color="purple"
            title="Related Calculators"
          />

          {/* Information Section */}
          <section className="mt-16">
            <div className="mt-8">
              <CalculatorGuide data={guideData} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
