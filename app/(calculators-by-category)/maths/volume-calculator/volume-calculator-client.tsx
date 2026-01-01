"use client";

import React, { useRef, useState } from "react";
import CalculatorGuide from "@/components/calculator-guide";
import { Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';

const SHAPES = [{
  key: "sphere",
  label: "Sphere",
  fields: [{
    name: "radius",
    label: "Radius (r)",
    type: "number"
  }],
  formula: ({
    radius
  }: {
    radius: number;
  }) => 4 / 3 * Math.PI * Math.pow(radius, 3),
  example: "volume = 4/3 × π × r³"
}, {
  key: "cone",
  label: "Cone",
  fields: [{
    name: "radius",
    label: "Base Radius (r)",
    type: "number"
  }, {
    name: "height",
    label: "Height (h)",
    type: "number"
  }],
  formula: ({
    radius,
    height
  }: {
    radius: number;
    height: number;
  }) => 1 / 3 * Math.PI * Math.pow(radius, 2) * height,
  example: "volume = 1/3 × π × r² × h"
}, {
  key: "cube",
  label: "Cube",
  fields: [{
    name: "edge",
    label: "Edge Length (a)",
    type: "number"
  }],
  formula: ({
    edge
  }: {
    edge: number;
  }) => Math.pow(edge, 3),
  example: "volume = a³"
}, {
  key: "cylinder",
  label: "Cylinder",
  fields: [{
    name: "radius",
    label: "Base Radius (r)",
    type: "number"
  }, {
    name: "height",
    label: "Height (h)",
    type: "number"
  }],
  formula: ({
    radius,
    height
  }: {
    radius: number;
    height: number;
  }) => Math.PI * Math.pow(radius, 2) * height,
  example: "volume = π × r² × h"
}, {
  key: "rectangular_tank",
  label: "Rectangular Tank",
  fields: [{
    name: "length",
    label: "Length (l)",
    type: "number"
  }, {
    name: "width",
    label: "Width (w)",
    type: "number"
  }, {
    name: "height",
    label: "Height (h)",
    type: "number"
  }],
  formula: ({
    length,
    width,
    height
  }: {
    length: number;
    width: number;
    height: number;
  }) => length * width * height,
  example: "volume = l × w × h"
}, {
  key: "capsule",
  label: "Capsule",
  fields: [{
    name: "radius",
    label: "Base Radius (r)",
    type: "number"
  }, {
    name: "height",
    label: "Height (h)",
    type: "number"
  }],
  formula: ({
    radius,
    height
  }: {
    radius: number;
    height: number;
  }) => Math.PI * Math.pow(radius, 2) * height + 4 / 3 * Math.PI * Math.pow(radius, 3),
  example: "volume = π × r² × h + 4/3 × π × r³"
}, {
  key: "spherical_cap",
  label: "Spherical Cap",
  fields: [{
    name: "baseRadius",
    label: "Base Radius (r)",
    type: "number"
  }, {
    name: "sphereRadius",
    label: "Ball Radius (R)",
    type: "number"
  }, {
    name: "height",
    label: "Height (h)",
    type: "number"
  }],
  formula: ({
    baseRadius,
    sphereRadius,
    height
  }: {
    baseRadius: number;
    sphereRadius: number;
    height: number;
  }) => 1 / 3 * Math.PI * Math.pow(height, 2) * (3 * sphereRadius - height),
  example: "volume = 1/3 × π × h² × (3R - h)"
}, {
  key: "conical_frustum",
  label: "Conical Frustum",
  fields: [{
    name: "topRadius",
    label: "Top Radius (r)",
    type: "number"
  }, {
    name: "bottomRadius",
    label: "Bottom Radius (R)",
    type: "number"
  }, {
    name: "height",
    label: "Height (h)",
    type: "number"
  }],
  formula: ({
    topRadius,
    bottomRadius,
    height
  }: {
    topRadius: number;
    bottomRadius: number;
    height: number;
  }) => 1 / 3 * Math.PI * height * (Math.pow(topRadius, 2) + topRadius * bottomRadius + Math.pow(bottomRadius, 2)),
  example: "volume = 1/3 × π × h × (r² + rR + R²)"
}, {
  key: "ellipsoid",
  label: "Ellipsoid",
  fields: [{
    name: "a",
    label: "Axis 1 (a)",
    type: "number"
  }, {
    name: "b",
    label: "Axis 2 (b)",
    type: "number"
  }, {
    name: "c",
    label: "Axis 3 (c)",
    type: "number"
  }],
  formula: ({
    a,
    b,
    c
  }: {
    a: number;
    b: number;
    c: number;
  }) => 4 / 3 * Math.PI * a * b * c,
  example: "volume = 4/3 × π × a × b × c"
}, {
  key: "square_pyramid",
  label: "Square Pyramid",
  fields: [{
    name: "edge",
    label: "Base Edge (a)",
    type: "number"
  }, {
    name: "height",
    label: "Height (h)",
    type: "number"
  }],
  formula: ({
    edge,
    height
  }: {
    edge: number;
    height: number;
  }) => 1 / 3 * Math.pow(edge, 2) * height,
  example: "volume = 1/3 × a² × h"
}, {
  key: "tube",
  label: "Tube",
  fields: [{
    name: "outerDiameter",
    label: "Outer Diameter (d₁)",
    type: "number"
  }, {
    name: "innerDiameter",
    label: "Inner Diameter (d₂)",
    type: "number"
  }, {
    name: "length",
    label: "Length (l)",
    type: "number"
  }],
  formula: ({
    outerDiameter,
    innerDiameter,
    length
  }: {
    outerDiameter: number;
    innerDiameter: number;
    length: number;
  }) => Math.PI * (Math.pow(outerDiameter, 2) - Math.pow(innerDiameter, 2)) / 4 * length,
  example: "volume = π × (d₁² - d₂²) / 4 × l"
}];

interface VolumeCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function VolumeCalculatorClient({ content, guideContent }: VolumeCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
  
  const contentData = content || {};
  
const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [shape, setShape] = useState<typeof SHAPES[number]>(SHAPES[0]);
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [inputUnits, setInputUnits] = useState<Record<string, string>>({});
  const [result, setResult] = useState<number | null>(null);
  const [resultUnit, setResultUnit] = useState<string>("m³");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: parseFloat(e.target.value)
    });
  };
  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputUnits({
      ...inputUnits,
      [e.target.name]: e.target.value
    });
  };
  const handleShapeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = SHAPES.find(s => s.key === e.target.value) || SHAPES[0];
    setShape(selected);
    setInputs({});
    setResult(null);
  };

  // Conversion factors to meters
  const unitToMeters: Record<string, number> = {
    m: 1,
    cm: 0.01,
    mm: 0.001,
    inch: 0.0254,
    ft: 0.3048,
    yd: 0.9144
  };

  // Volume unit conversions from m³
  const volumeUnits = [{
    label: "Cubic meters (m³)",
    value: "m³",
    factor: 1
  }, {
    label: "Liters (L)",
    value: "L",
    factor: 1000
  }, {
    label: "Cubic centimeters (cm³)",
    value: "cm³",
    factor: 1e6
  }, {
    label: "Cubic millimeters (mm³)",
    value: "mm³",
    factor: 1e9
  }, {
    label: "Cubic inches (in³)",
    value: "in³",
    factor: 61023.7441
  }, {
    label: "Cubic feet (ft³)",
    value: "ft³",
    factor: 35.3146667
  }, {
    label: "Cubic yards (yd³)",
    value: "yd³",
    factor: 1.30795062
  }, {
    label: "US gallons (gal)",
    value: "gal",
    factor: 264.172052
  }, {
    label: "US quarts (qt)",
    value: "qt",
    factor: 1056.68821
  }, {
    label: "US pints (pt)",
    value: "pt",
    factor: 2113.37642
  }, {
    label: "US cups (cup)",
    value: "cup",
    factor: 4226.75284
  }, {
    label: "US fluid ounces (fl oz)",
    value: "floz",
    factor: 33814.0227
  }];
  const handleResultUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setResultUnit(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const missing = shape.fields.some(f => typeof inputs[f.name] !== 'number' || isNaN(inputs[f.name]));
    if (missing) {
      setResult(null);
      return;
    }
    // Convert all inputs to meters
    const convertedInputs: Record<string, number> = {};
    shape.fields.forEach(f => {
      const val = inputs[f.name];
      const unit = inputUnits[f.name] || 'm';
      convertedInputs[f.name] = typeof val === 'number' && !isNaN(val) ? val * (unitToMeters[unit] || 1) : 0;
    });
    try {
      // @ts-ignore
      const volumeM3 = shape.formula(convertedInputs);
      setResult(volumeM3);
    } catch {
      setResult(null);
    }
    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };
  return <>

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Calculator className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Calculator Form and shape selection */}
            <div className="col-span-1">
              <Card className="shadow-2xl border-0 bg-white">
                <CardHeader className="bg-white rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-900">{contentData.volume_calculations_0}</span>
                  </CardTitle>
                  <CardDescription className="text-base text-gray-700">{contentData.select_a_shape_and_enter_your_values_1}</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="mb-6">
                    <Label className="text-base font-semibold mb-2 block text-gray-900">{contentData.select_shape_2}</Label>
                    <select className="w-full border rounded p-2" value={shape.key} onChange={handleShapeChange}>
                      {SHAPES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                    </select>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {shape.fields.map(field => <div key={field.name} className="flex items-end gap-2">
                      <div className="flex-1">
                        <Label className="block mb-1 text-gray-900">{field.label}</Label>
                        <Input type="number" name={field.name} value={inputs[field.name] || ""} onChange={handleInputChange} step="any" required />
                      </div>
                      <div>
                        <select name={field.name} value={inputUnits[field.name] || 'm'} onChange={handleUnitChange} className="border rounded p-2 bg-white">
                          <option value="m">{contentData.m_3}</option>
                          <option value="cm">{contentData.cm_4}</option>
                          <option value="mm">{contentData.mm_5}</option>
                          <option value="inch">{contentData.inch_6}</option>
                          <option value="ft">{contentData.ft_7}</option>
                          <option value="yd">{contentData.yd_8}</option>
                        </select>
                      </div>
                    </div>)}
                    <div className="text-sm text-gray-700">{contentData.formula_9}{shape.example}</div>
                    <Button type="submit" className="w-full mt-2 bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800">{contentData.calculate_10}</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            {/* Right: Results */}
            <div className="col-span-1 flex items-stretch">
              <Card ref={resultsRef} className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-green-200 flex flex-col w-full h-full">
                <div className="flex flex-1 flex-col justify-center items-center h-full py-12">
                  <div className="flex flex-col items-center justify-center w-full">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center mb-4 shadow-lg">
                      <Calculator className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-green-700 tracking-tight mb-4 text-center">{contentData.result_11}</div>
                    {result !== null ? <>
                      <div className="flex flex-col items-center w-full">
                        <div className="text-3xl font-bold mb-2 text-center w-full bg-gradient-to-l from-green-700 to-green-300 bg-clip-text text-transparent">
                          {(() => {
                            const unitObj = volumeUnits.find(u => u.value === resultUnit) || volumeUnits[0];
                            return (result * unitObj.factor).toLocaleString(undefined, {
                              maximumFractionDigits: 6
                            });
                          })()} <span className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-l from-green-700 to-green-300">{resultUnit}</span>
                        </div>
                        <div className="mt-2">
                          <select value={resultUnit} onChange={handleResultUnitChange} className="border rounded p-2 bg-white">
                            {volumeUnits.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                          </select>
                        </div>
                      </div>
                    </> : <div className="text-green-700 text-center text-base">{contentData.enter_values_and_click_12}<span className="font-semibold text-green-900">{contentData.calculate_13}</span>{contentData.to_see_result_14}</div>}
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="volume-calculator"
            entityType="calculator"
            creatorSlug="felix-yacoub"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <CalculatorGuide data={guideData} />
          <SimilarCalculators calculators={[{
            calculatorName: "Percentage Calculator",
            calculatorHref: "/maths/percentage-calculator",
            calculatorDescription: "Calculate percentages, ratios, and percentage changes easily with our comprehensive percentage calculator"
          }, {
            calculatorName: "Critical Point Calculator",
            calculatorHref: "/maths/critical-point-calculator",
            calculatorDescription: "Find critical points of single-variable or multivariable functions by solving f′(x)=0 or ∂f/∂x=0 and ∂f/∂y=0. Identify where derivatives are zero or undefined."
          }, {
            calculatorName: "Scientific Calculator",
            calculatorHref: "/maths/scientific-calculator",
            calculatorDescription: "Perform advanced mathematical calculations and scientific functions including trigonometry, logarithms, exponents, and statistical operations"
          }
          ]}
            color="green"
            title="Related Math Calculators" />
        </div>
      </main>

    </div>
  </>;
}
