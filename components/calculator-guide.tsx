import { useState, useEffect } from 'react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

interface FAQ {
  q: string
  a: string
}

interface SubSection {
  heading: string
  content: string
}

interface Section {
  heading: string
  content?: string
  subSections?: SubSection[]
}

interface CalculatorGuideData {
  color: string
  sections: Section[]
  faq: FAQ[]
}

interface CalculatorGuideProps {
  data: CalculatorGuideData
}

const getColorVariants = (color: string) => {
  const colorMap: Record<string, { primary: string; light: string; ultraLight: string; gradient: string }> = {
    blue: {
      primary: "#3b82f6",
      light: "#3b82f620",
      ultraLight: "#3b82f608",
      gradient: "from-blue-500 to-blue-600",
    },
    lightgreen: {
      primary: "#22c55e",
      light: "#22c55e20",
      ultraLight: "#22c55e08",
      gradient: "from-green-500 to-green-600",
    },
    pink: {
      primary: "#ec4899",
      light: "#ec489920",
      ultraLight: "#ec489908",
      gradient: "from-pink-500 to-pink-600",
    },
    green: {
      primary: "#10b981",
      light: "#10b98120",
      ultraLight: "#10b98108",
      gradient: "from-emerald-500 to-emerald-600",
    },
    purple: {
      primary: "#8b5cf6",
      light: "#8b5cf620",
      ultraLight: "#8b5cf608",
      gradient: "from-purple-500 to-purple-600",
    },
    red: {
      primary: "#ef4444",
      light: "#ef444420",
      ultraLight: "#ef444408",
      gradient: "from-red-500 to-red-600",
    },
    orange: {
      primary: "#f97316",
      light: "#f9731620",
      ultraLight: "#f9731608",
      gradient: "from-orange-500 to-orange-600",
    },
    teal: {
      primary: "#14b8a6",
      light: "#14b8a620",
      ultraLight: "#14b8a608",
      gradient: "from-teal-500 to-teal-600",
    },
    black: {
      primary: "#000303ff",
      light: "#000303ff20",
      ultraLight: "#000303ff08",
      gradient: "from-teal-500 to-teal-600",
    },
  }

  return colorMap[color] || colorMap.blue
}

export default function CalculatorGuide({ data }: CalculatorGuideProps) {
  // If no data or empty sections/faq, don't render anything
  if (!data || (!data.sections || data.sections.length === 0) && (!data.faq || data.faq.length === 0)) {
    return null;
  }

  const colors = getColorVariants(data.color)

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const result: JSX.Element[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      
      // Check if this line starts a markdown table (contains | and next line has dashes)
      if (line.includes('|') && i + 1 < lines.length && lines[i + 1].includes('---')) {
        const tableLines: string[] = [];
        let j = i;
        
        // Collect all table lines
        while (j < lines.length && lines[j].trim().includes('|')) {
          tableLines.push(lines[j]);
          j++;
        }
        
        if (tableLines.length >= 2) {
          // Parse table
          const headers = tableLines[0].split('|').map(h => h.trim()).filter(h => h);
          const rows = tableLines.slice(2).map(row => 
            row.split('|').map(cell => cell.trim()).filter(cell => cell)
          );
          
          result.push(
            <div key={i} className="overflow-x-auto my-4">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    {headers.map((header, idx) => (
                      <th key={idx} className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIdx) => (
                    <tr key={rowIdx} className="hover:bg-gray-50">
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="border border-gray-300 px-4 py-2 text-gray-700">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          
          i = j;
          continue;
        }
      }
      
      // Regular line rendering
      result.push(
        <div key={i} className="min-h-[1.5em]">
          <Latex>{line}</Latex>
        </div>
      );
      i++;
    }

    return result;
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        {/* Header */}
        <div className="px-6 py-8 border-b border-gray-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">How to Use This Calculator</h2>
            <p className="text-gray-600">Step-by-step guide to get accurate results</p>
          </div>
        </div>

        {/* Sections */}
        {data.sections && data.sections.length > 0 && (
          <div className="px-6 py-8 space-y-8">
            {data.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <div className="flex items-start gap-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {sectionIndex + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{section.heading}</h3>

                    {/* ✅ Render content only if exists */}
                    {section.content && (
                      <div className="text-gray-700 leading-relaxed space-y-1">
                        {renderContent(section.content)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Subsections */}
                {section.subSections && section.subSections.length > 0 && (
                  <div className="ml-12 space-y-3">
                    {section.subSections.map((subSection, subIndex) => (
                      <div
                        key={subIndex}
                        className="p-4 rounded-lg border"
                        style={{
                          backgroundColor: colors.ultraLight,
                          borderColor: colors.light,
                        }}
                      >
                        <h4 className="font-semibold text-gray-900 mb-2">{subSection.heading}</h4>
                        <div className="text-gray-700 text-sm space-y-1">
                          {renderContent(subSection.content)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* FAQs */}
        {data.faq && data.faq.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-8 bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Frequently Asked Questions</h3>

            <div className="space-y-4">
              {data.faq.map((item, index) => (
                <details key={index} className="group">
                  <summary className="flex items-center justify-between cursor-pointer p-4 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-colors">
                    <h4 className="font-medium text-gray-900 pr-4">{item.q}</h4>
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center group-open:rotate-180 transition-transform flex-shrink-0"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-4 pb-4 pt-2">
                    <div className="text-gray-700 text-sm leading-relaxed space-y-1">
                      {renderContent(item.a)}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}