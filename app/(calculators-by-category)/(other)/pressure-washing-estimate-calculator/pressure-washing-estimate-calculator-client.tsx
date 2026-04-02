"use client";

import PressureWashingEstimateCalculator from "@/components/pressure-washing-estimate-calculator";
import SimilarCalculators from "@/components/similar-calculators";

const guideContent = {
  color: "blue",
  sections: [
    {
      heading: "Pressure Washing Estimate Calculator",
      content: "Pressure washing costs between $0.08 and $0.35 per square foot in the United States, depending on surface type, job size, location, and level of grime. Use our free pressure washing estimate calculator above to get your personalized quote instantly—no signup required.\n\nKnow your price before you call a contractor. Avoid overpaying. Get accurate results in seconds."
    },
    {
      heading: "Free Pressure Washing Estimate Calculator",
      content: "Our pressure washing estimate calculator is built using real contractor pricing data across the U.S. This is not a guess-based tool—it's a data-driven pressure washing cost estimator designed for:\n\n• Homeowners\n• Property managers\n• Real estate investors\n• Contractors\n• Commercial property owners\n\nWhether you need a pressure washing driveway estimate calculator or a commercial pressure washing estimate calculator, this tool gives you reliable pricing instantly."
    },
    {
      heading: "How to Use This Pressure Washing Cost Calculator",
      content: "Using our pressure washing calculator is simple and takes less than 30 seconds:\n\nStep 1: Select Surface Type\n\nChoose from:\n• Driveway\n• Deck\n• Siding\n• Roof (soft washing)\n• Patio\n• Parking lot\n• Commercial building exterior\n\nStep 2: Enter Square Footage\n\nMeasure length × width of the area. Accurate measurements = accurate estimates.\n\nStep 3: Choose Your Location\n\nPricing varies by region across the United States.\n\nStep 4: Select Dirt Level\n\n• Light dirt → Standard cleaning\n• Moderate buildup → +20% cost\n• Heavy stains (oil, mold, algae) → +30–50%\n\nStep 5: Click &quot;Calculate&quot;\n\nYour instant estimate appears immediately.\n\nThis pressure washer estimate calculator reflects real market rates used by professionals today."
    },
    {
      heading: "What Does Pressure Washing Cost Per Square Foot?",
      content: "Understanding how much pressure washing costs per square foot helps you estimate any project quickly.\n\nPressure Washing Cost Per Square Foot by Surface Type"
    },
    {
      heading: "Pressure Washing Driveway Cost Calculator",
      content: "The pressure washing driveway estimate calculator is one of the most used tools because driveways accumulate:\n\n• Oil stains\n• Tire marks\n• Mold and algae\n• Dirt buildup\n\nDriveway Cost Formula\n\nEstimated Cost = Square Footage × Rate per Sq Ft\n\nExample:\n\n500 sq ft driveway × $0.12 = $60\nAdd stain treatment = $25–$50\n\nFinal estimate: $75 – $150\n\nReal Contractor Insight (Experience-Based)\n\nFrom real job experience:\n• Oil stains can double cleaning time\n• Old concrete absorbs dirt → higher chemical use\n• Sealed driveways clean faster → lower cost\n• Most homeowners underestimate driveway size by 20%\n\nFactors That Increase Driveway Cost\n\n• Heavy oil or rust stains\n• Stamped or decorative concrete\n• Steep slope or poor drainage\n• Mold in humid states like Florida and Georgia"
    },
    {
      heading: "Commercial Pressure Washing Estimate Calculator",
      content: "Our commercial pressure washing estimate calculator is designed for large-scale jobs.\n\nCommercial Pricing Models\n\n1. Per Square Foot\n$0.06 – $0.15 (large areas)\n\n2. Hourly Rate\n$50 – $150 per hour per technician\n\n3. Monthly Contracts\n$200 – $800+ per month\n\nCommercial Estimate Example\n\nProject: Restaurant Cleaning (Dallas, TX)\n• Parking lot (8,000 sq ft × $0.09) = $720\n• Dumpster pad (200 sq ft × $0.25) = $50\n• Building exterior (1,500 sq ft × $0.15) = $225\n\nTotal: $995\nDiscounted monthly: $845–$895\n\nThis is a realistic pressure washing estimate example used by contractors."
    },
    {
      heading: "Pressure Washing Cost Estimator vs Manual Calculation",
      content: "Using a pressure washing cost estimator is more accurate than manual calculations because it:\n\n• Applies real pricing data\n• Adjusts for location automatically\n• Includes difficulty multipliers\n• Reduces human error\n\nManual estimates often miss:\n• Chemical costs\n• Labor time\n• Minimum service fees"
    },
    {
      heading: "How Do You Price Pressure Washing?",
      content: "If you run a business, this is how professionals price jobs:\n\nStep 1 — Calculate Costs\n\n• Labor\n• Equipment wear\n• Chemicals\n• Fuel\n• Insurance\n\nStep 2 — Measure Accurately\n\nUse:\n• On-site measurement\n• Google Maps\n\nStep 3 — Apply Difficulty Multipliers\n\n• Light: 1.0×\n• Moderate: 1.2×\n• Heavy: 1.5×\n• Hazardous: 2.0×\n\nStep 4 — Add Profit Margin\n\nTarget: 40–60% profit margin"
    },
    {
      heading: "Power Washing Cost Calculator vs Pressure Washing",
      content: "Many users search for a power washing cost calculator.\n\nKey Differences\n\n| Feature | Pressure Washing | Power Washing |\n|---------|-----------------|---------------|\n| Water | Cold | Heated |\n| Best For | Dirt, mold | Oil, grease |\n| Cost | Lower | +15–30% |\n\nUse the calculator above to switch between both modes."
    },
    {
      heading: "Average Pressure Washing Costs",
      content: "Location affects pricing significantly.\n\nNortheast (NY, MA, NJ)\n• Driveway: $100–$250\n• House: $250–$600\n\nSoutheast (FL, TX, GA)\n• Driveway: $75–$150\n• House: $150–$400\n\nMidwest (IL, OH, MI)\n• Driveway: $80–$175\n• House: $175–$400\n\nWest (CA, WA, AZ)\n• Driveway: $100–$220\n• House: $200–$500"
    },
    {
      heading: "What Affects Your Pressure Washing Estimate the Most?",
      content: "Our pressure washing estimator considers:\n\n1. Surface Type\nConcrete vs wood vs siding\n\n2. Square Footage\nLarger jobs = lower per sq ft rate\n\n3. Dirt Level\nBiggest cost factor\n\n4. Location\nLabor rates vary by state\n\n5. Accessibility\nHard-to-reach areas cost more\n\n6. Add-On Services\n• Gutter cleaning\n• Window cleaning\n• Sealing\n• Deck staining"
    },
    {
      heading: "Why Use This Free Pressure Washing Estimate Calculator?",
      content: "Our free pressure washing estimate calculator helps you:\n\n• Get instant pricing\n• Avoid overpaying\n• Compare contractor quotes\n• Understand real market rates\n\nThousands of users use this pressure washing cost calculator monthly to negotiate better prices."
    },
    {
      heading: "Pressure Washing Estimate Template",
      content: "A proper pressure washing estimate template includes:\n\n• Customer details\n• Surface breakdown\n• Square footage\n• Pricing\n• Terms\n\nAlways request written estimates."
    },
    {
      heading: "Pressure Washing Estimate Form",
      content: "A standard pressure washing estimate form includes:\n\n• Property type\n• Service areas\n• Dirt level\n• Access details\n• Contact info"
    },
    {
      heading: "Summary — Pressure Washing Cost in the U.S.",
      content: "• Average cost: $0.08–$0.35 per sq ft\n• Driveway: $75–$150\n• House washing: $150–$600\n• Commercial jobs: $200–$5,000+\n• Power washing: 15–30% more expensive\n\nUse the pressure washing estimate calculator above to get your exact price instantly."
    }
  ],
  faq: [
    {
      q: "What is a pressure washing estimate calculator?",
      a: "A pressure washing estimate calculator is a tool that gives you an instant price based on your surface type, size, and condition. It helps you understand the cost before contacting a contractor."
    },
    {
      q: "How much does it cost to pressure wash a driveway per square foot?",
      a: "The cost to pressure wash a driveway is typically $0.10 to $0.18 per square foot, depending on stains, material, and location."
    },
    {
      q: "Do you need a permit for pressure washing in the US?",
      a: "In most areas, you do not need a permit for residential pressure washing. However, commercial jobs may require compliance with local water runoff and environmental regulations."
    },
    {
      q: "What is the difference between soft washing and pressure washing?",
      a: "Soft washing uses low pressure and cleaning solutions, while pressure washing uses high-pressure water. Soft washing is safer for roofs and siding."
    },
    {
      q: "How much can you make pressure washing per day?",
      a: "A pressure washing business can earn $200 to $1,000+ per day, depending on job size, location, and number of clients."
    },
    {
      q: "Is pressure washing a good business in the US?",
      a: "Yes, pressure washing is a profitable business with low startup costs and high demand, especially in residential and commercial cleaning markets."
    }
  ]
};

const costTableData = [
  { surface: "Concrete Driveway", costPerSqFt: "$0.08 – $0.18", typicalSize: "400–1,000 sq ft", estimatedCost: "$50 – $180" },
  { surface: "House Siding", costPerSqFt: "$0.10 – $0.25", typicalSize: "1,200–2,500 sq ft", estimatedCost: "$150 – $600" },
  { surface: "Wood Deck", costPerSqFt: "$0.15 – $0.30", typicalSize: "300–500 sq ft", estimatedCost: "$50 – $150" },
  { surface: "Roof (Soft Wash)", costPerSqFt: "$0.20 – $0.35", typicalSize: "1,500–3,000 sq ft", estimatedCost: "$300 – $1,000" },
  { surface: "Sidewalk", costPerSqFt: "$0.10 – $0.20", typicalSize: "200–400 sq ft", estimatedCost: "$25 – $80" },
  { surface: "Parking Lot", costPerSqFt: "$0.06 – $0.15", typicalSize: "5,000+ sq ft", estimatedCost: "$300 – $7,500" },
  { surface: "Commercial Building", costPerSqFt: "$0.10 – $0.25", typicalSize: "2,000+ sq ft", estimatedCost: "$200 – $5,000" }
];

export default function PressureWashingEstimateCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PressureWashingEstimateCalculator />
        
        {/* Cost Table Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Pressure Washing Cost Per Square Foot</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Surface</th>
                  <th className="px-6 py-4 text-left font-semibold">Cost per Sq Ft</th>
                  <th className="px-6 py-4 text-left font-semibold">Typical Size</th>
                  <th className="px-6 py-4 text-left font-semibold">Estimated Cost</th>
                </tr>
              </thead>
              <tbody>
                {costTableData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-6 py-4 font-medium text-gray-900 border-b">{row.surface}</td>
                    <td className="px-6 py-4 text-gray-700 border-b">{row.costPerSqFt}</td>
                    <td className="px-6 py-4 text-gray-700 border-b">{row.typicalSize}</td>
                    <td className="px-6 py-4 font-semibold text-green-600 border-b">{row.estimatedCost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-600 text-center">
            Note: These numbers are based on aggregated contractor pricing across major U.S. cities.
          </p>
        </div>

        {/* Content Sections - Premium Design */}
        <div className="mt-16 space-y-12">
          {/* Main Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 rounded-2xl shadow-2xl p-10 text-center">
            <div className="absolute inset-0 bg-grid-white/10"></div>
            <div className="relative z-10">
              <div className="inline-block px-4 py-2 bg-white/20 rounded-full mb-4">
                <span className="text-white font-semibold text-sm">Complete Guide</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Pressure Washing Cost Guide</h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto">Everything you need to know about pressure washing estimates, pricing, and cost calculations</p>
            </div>
          </div>

          {/* Content Sections Grid */}
          <div className="space-y-8">
            {guideContent.sections.map((section, index) => {
              // Alternate design patterns for visual variety
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className="group">
                  <div className={`bg-white rounded-2xl shadow-lg border-2 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-blue-300 ${isEven ? 'border-blue-100' : 'border-cyan-100'}`}>
                    {/* Section Header with Icon */}
                    <div className={`relative px-8 py-6 ${isEven ? 'bg-gradient-to-r from-blue-50 via-blue-100/50 to-cyan-50' : 'bg-gradient-to-r from-cyan-50 via-cyan-100/50 to-blue-50'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`relative w-14 h-14 rounded-xl ${isEven ? 'bg-gradient-to-br from-blue-600 to-cyan-600' : 'bg-gradient-to-br from-cyan-600 to-blue-600'} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform`}>
                          <span className="text-white font-bold text-2xl">{index + 1}</span>
                          <div className="absolute inset-0 rounded-xl bg-white/20 animate-pulse"></div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">{section.heading}</h3>
                          <div className={`h-1 w-20 rounded-full ${isEven ? 'bg-blue-600' : 'bg-cyan-600'}`}></div>
                        </div>
                      </div>
                    </div>

                    {/* Section Content */}
                    <div className="px-8 py-8 bg-gradient-to-b from-white to-gray-50/30">
                      <div className="prose prose-lg max-w-none">
                        {section.content.split('\n\n').map((paragraph, pIndex) => {
                          // Check for markdown tables
                          if (paragraph.includes('|') && paragraph.includes('---')) {
                            const lines = paragraph.split('\n').filter(line => line.trim());
                            const tableLines = lines.filter(line => line.includes('|'));
                            
                            if (tableLines.length >= 2) {
                              const textBefore = lines.slice(0, lines.indexOf(tableLines[0])).join('\n');
                              const textAfter = lines.slice(lines.indexOf(tableLines[tableLines.length - 1]) + 1).join('\n');
                              
                              const headers = tableLines[0].split('|').map(h => h.trim()).filter(h => h);
                              const rows = tableLines.slice(2).map(row => 
                                row.split('|').map(cell => cell.trim()).filter(cell => cell)
                              );
                              
                              return (
                                <div key={pIndex} className="mb-8">
                                  {textBefore && <p className="text-gray-700 text-lg leading-relaxed mb-5 font-medium">{textBefore}</p>}
                                  
                                  <div className="overflow-x-auto rounded-xl border-2 border-blue-200 shadow-md">
                                    <table className="w-full border-collapse">
                                      <thead>
                                        <tr className={`${isEven ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : 'bg-gradient-to-r from-cyan-600 to-blue-600'}`}>
                                          {headers.map((header, idx) => (
                                            <th key={idx} className="px-6 py-4 text-left font-bold text-white border-r border-blue-400 last:border-r-0">
                                              {header}
                                            </th>
                                          ))}
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {rows.map((row, rowIdx) => (
                                          <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-blue-50/50' : 'bg-white'}>
                                            {row.map((cell, cellIdx) => (
                                              <td key={cellIdx} className="px-6 py-4 text-gray-700 border-r border-gray-200 last:border-r-0 border-b border-gray-200">
                                                {cell}
                                              </td>
                                            ))}
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                  
                                  {textAfter && <p className="text-gray-700 text-base leading-relaxed mt-5">{textAfter}</p>}
                                </div>
                              );
                            }
                          }
                          
                          // Bullet points with custom styling
                          if (paragraph.includes('•')) {
                            const lines = paragraph.split('\n');
                            const bullets = lines.filter(line => line.trim().startsWith('•'));
                            const text = lines.filter(line => !line.trim().startsWith('•')).join('\n');
                            
                            return (
                              <div key={pIndex} className="mb-8">
                                {text && <p className="text-gray-700 text-lg leading-relaxed mb-5 font-medium">{text}</p>}
                                {bullets.length > 0 && (
                                  <div className="bg-gradient-to-r from-blue-50/50 to-cyan-50/50 rounded-xl p-6 border border-blue-100">
                                    <ul className="space-y-3">
                                      {bullets.map((bullet, bIndex) => (
                                        <li key={bIndex} className="flex items-start gap-4">
                                          <div className={`w-3 h-3 rounded-full ${isEven ? 'bg-blue-600' : 'bg-cyan-600'} mt-2 flex-shrink-0 shadow-sm`}></div>
                                          <span className="text-gray-700 leading-relaxed flex-1 text-base">
                                            {bullet.replace('•', '').trim()}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            );
                          }
                          
                          // Numbered steps with badges
                          if (paragraph.match(/^\d+\./m)) {
                            const lines = paragraph.split('\n');
                            return (
                              <div key={pIndex} className="mb-8 space-y-4">
                                {lines.map((line, lIndex) => {
                                  if (line.match(/^\d+\./)) {
                                    const numMatch = line.match(/^\d+/);
                                    const num = numMatch ? numMatch[0] : '';
                                    return (
                                      <div key={lIndex} className="flex items-start gap-4 bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors">
                                        <div className={`w-10 h-10 rounded-lg ${isEven ? 'bg-gradient-to-br from-blue-600 to-cyan-600' : 'bg-gradient-to-br from-cyan-600 to-blue-600'} text-white font-bold flex items-center justify-center flex-shrink-0 shadow-md text-lg`}>
                                          {num}
                                        </div>
                                        <p className="text-gray-700 leading-relaxed flex-1 pt-2 font-medium">
                                          {line.replace(/^\d+\.\s*/, '')}
                                        </p>
                                      </div>
                                    );
                                  }
                                  return line && (
                                    <p key={lIndex} className="text-gray-600 leading-relaxed ml-14 text-base">
                                      {line}
                                    </p>
                                  );
                                })}
                              </div>
                            );
                          }

                          // Sub-headings
                          if (paragraph.match(/^(Step \d+|.*:)$/m)) {
                            return (
                              <div key={pIndex} className="mt-8 mb-4">
                                <h4 className={`text-xl font-bold ${isEven ? 'text-blue-900' : 'text-cyan-900'} flex items-center gap-3`}>
                                  <span className={`w-1.5 h-8 rounded-full ${isEven ? 'bg-blue-600' : 'bg-cyan-600'}`}></span>
                                  {paragraph}
                                </h4>
                              </div>
                            );
                          }

                          // Regular paragraphs
                          return (
                            <p key={pIndex} className="text-gray-700 text-base leading-relaxed mb-6 whitespace-pre-line">
                              {paragraph}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FAQ Section - Enhanced Design */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Frequently Asked Questions</h3>
              <p className="text-blue-50">Common questions about pressure washing costs and estimates</p>
            </div>
            
            <div className="p-6 space-y-3">
              {guideContent.faq.map((item, index) => (
                <details key={index} className="group bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 overflow-hidden hover:border-blue-300 transition-all">
                  <summary className="flex items-center justify-between cursor-pointer p-5 hover:bg-white transition-colors">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        Q{index + 1}
                      </div>
                      <h4 className="font-semibold text-gray-900 pr-4 pt-1">{item.q}</h4>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center group-open:rotate-180 transition-transform flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-5 pb-5 pt-2 bg-white border-t border-gray-200">
                    <div className="ml-11">
                      <p className="text-gray-700 leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <SimilarCalculators calculators={[
            { id: "towing-estimate-calculator" },
            { id: "end-of-service-calculator" },
            { id: "dental-implant-cost-calculator" },
            { id: "age-calculator" }
          ]} color="blue" />
        </div>
      </div>
    </div>
  );
}
