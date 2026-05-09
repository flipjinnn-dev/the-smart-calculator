import type { ReactElement, ReactNode } from 'react';

/** Renders `**bold**` in guide strings as semantic bold. */
function renderInlineWithBold(text: string): ReactNode {
  const parts = text.split(/(\*\*[\s\S]*?\*\*)/g);
  return parts.map((part, i) => {
    const m = part.match(/^\*\*([\s\S]*?)\*\*$/);
    if (m) {
      return (
        <strong key={i} className="font-semibold text-gray-900">
          {m[1]}
        </strong>
      );
    }
    return part ? <span key={i}>{part}</span> : null;
  });
}
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import {
  CheckCircle2,
  Briefcase,
  Zap,
  ListChecks,
  Sigma,
  TrendingUp,
  Hash,
  LockOpen,
  Smartphone,
  ShoppingCart,
  LineChart,
  HeartPulse,
  GraduationCap,
  Landmark,
  Building2,
  FlaskConical,
  School,
  BookOpen,
  HelpCircle,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQ {
  question: string
  answer: string
}

interface SubSection {
  heading: string
  content: string
}

interface Section {
  heading: string
  content?: string
  subSections?: SubSection[]
  displayType?: 'icon-bullets-features' | 'icon-bullets-usecases'
}

export interface CalculatorGuideData {
  color: string
  sections: Section[]
  faq: FAQ[]
  /** Rendered after FAQ (e.g. closing Summary). Article layout: same card styles as main sections. */
  sectionsAfterFaq?: Section[]
}

interface CalculatorGuideProps {
  data: CalculatorGuideData
  /** Stacked article cards + accordion FAQ (matches Combination Sum long-form pages). */
  layout?: 'default' | 'article'
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

export default function CalculatorGuide({ data, layout = 'default' }: CalculatorGuideProps) {
  const hasSections = (data?.sections?.length ?? 0) > 0
  const hasFaq = (data?.faq?.length ?? 0) > 0
  const hasAfterFaq = (data?.sectionsAfterFaq?.length ?? 0) > 0
  if (!data || (!hasSections && !hasFaq && !hasAfterFaq)) {
    return null;
  }

  const colors = getColorVariants(data.color)

  const renderIconBullets = (
    content: string,
    mode: 'features' | 'use-cases'
  ) => {
    if (!content) return null;
    const lines = content
      .split('\n')
      .map((line) => line.trim().replace(/^- /, ''))
      .filter(Boolean);

    if (lines.length === 0) return null;

    return (
      <ul className="space-y-3.5">
        {lines.map((line, index) => {
          const [title, ...rest] = line.split(' - ');
          const description = rest.join(' - ');
          const normalized = `${title} ${description}`.toLowerCase();
          const Icon = (() => {
            if (mode === 'features') {
              if (normalized.includes('instant')) return Zap;
              if (normalized.includes('step-by-step')) return ListChecks;
              if (normalized.includes('decimal')) return Sigma;
              if (normalized.includes('increase detection')) return TrendingUp;
              if (normalized.includes('any numbers')) return Hash;
              if (normalized.includes('no login')) return LockOpen;
              if (normalized.includes('mobile')) return Smartphone;
              return CheckCircle2;
            }

            if (normalized.includes('retail') || normalized.includes('shopping')) return ShoppingCart;
            if (normalized.includes('finance') || normalized.includes('investing')) return LineChart;
            if (normalized.includes('pre-med') || normalized.includes('science major') || normalized.includes('bcpm')) return FlaskConical;
            if (normalized.includes('health') || normalized.includes('fitness')) return HeartPulse;
            if (normalized.includes('business') || normalized.includes('sales')) return Building2;
            if (normalized.includes('graduate school') || normalized.includes('grad school')) return GraduationCap;
            if (normalized.includes('high school') || normalized.includes('freshmen') || normalized.includes('prospective')) return School;
            if (normalized.includes('upper division') || normalized.includes('last 60')) return Landmark;
            if (normalized.includes('below 2') || normalized.includes('deficit')) return TrendingUp;
            if (normalized.includes('transfer')) return Briefcase;
            if (normalized.includes('current uf') || normalized.includes('uf student')) return GraduationCap;
            if (normalized.includes('education')) return GraduationCap;
            if (normalized.includes('economics')) return Landmark;
            return Briefcase;
          })();

          return (
            <li key={`${mode}-${index}`} className="flex items-start gap-3.5">
              <div
                className="mt-0.5 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm"
                style={{ backgroundColor: colors.ultraLight }}
              >
                <Icon className="w-4 h-4" style={{ color: colors.primary }} />
              </div>
              <div className="text-[15px] leading-relaxed pt-0.5">
                <span className="font-semibold text-gray-900">{title}</span>
                {description ? <span className="text-gray-700"> — {description}</span> : null}
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderContent = (content: string) => {
    if (!content) return null;
    const lines = content.split('\n');
    const result: ReactElement[] = [];
    let i = 0;
    let blockKey = 0;

    const shouldUseLatex = (line: string) =>
      line.includes('$$') ||
      line.includes('\\frac') ||
      line.includes('\\text') ||
      line.includes('\\times') ||
      line.includes('\\div');

    const isTableStart = (idx: number) => {
      const row = lines[idx]?.trim() ?? '';
      const sep = lines[idx + 1]?.trim() ?? '';
      return row.includes('|') && sep.includes('---');
    };

    /** Pipe row like `| a | b |` → ['a','b']; keeps empty cells (e.g. corner `| | H1 | H2 |`). */
    const parseTableRow = (line: string): string[] => {
      const t = line.trim();
      if (!t.includes('|')) return [];
      const parts = t.split('|');
      if (parts.length < 3) return [];
      return parts.slice(1, -1).map((c) => c.trim());
    };

    while (i < lines.length) {
      const trimmed = lines[i].trim();
      if (!trimmed) {
        i++;
        continue;
      }

      if (isTableStart(i)) {
        const tableLines: string[] = [];
        let j = i;
        while (j < lines.length && lines[j].trim().includes('|')) {
          tableLines.push(lines[j]);
          j++;
        }
        if (tableLines.length >= 2) {
          const headers = parseTableRow(tableLines[0]);
          const rows = tableLines.slice(2).map((row) => parseTableRow(row));
          const k = blockKey++;
          result.push(
            <div key={k} className="my-6 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-md ring-1 ring-slate-900/5">
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0">
                  <thead className="bg-gradient-to-r from-slate-50 to-slate-100/90">
                    <tr>
                      {headers.map((header, idx) => (
                        <th
                          key={idx}
                          className="border-b border-slate-200 px-4 py-3.5 text-left text-sm font-bold text-slate-800 tracking-wide first:pl-5 last:pr-5 sm:px-5"
                        >
                          {header === '' ? (
                            <span className="block min-w-[1rem]" aria-hidden="true">
                              &nbsp;
                            </span>
                          ) : (
                            renderInlineWithBold(header)
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, rowIdx) => (
                      <tr
                        key={rowIdx}
                        className={`${rowIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'} transition-colors hover:bg-slate-100/90`}
                      >
                        {row.map((cell, cellIdx) => (
                          <td
                            key={cellIdx}
                            className="border-b border-slate-100 px-4 py-3.5 text-[15px] text-slate-700 leading-relaxed align-top first:pl-5 last:pr-5 sm:px-5"
                          >
                            {renderInlineWithBold(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
          i = j;
          continue;
        }
      }

      if (/^[-*]\s+/.test(trimmed)) {
        const items: string[] = [];
        while (i < lines.length) {
          const t = lines[i].trim();
          if (!t || !/^[-*]\s+/.test(t)) break;
          items.push(t.replace(/^[-*]\s+/, ''));
          i++;
        }
        const k = blockKey++;
        result.push(
          <ul key={k} className="my-5 space-y-3 pl-0.5">
            {items.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-[15px] text-gray-700 leading-relaxed">
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full shadow-sm"
                  style={{ backgroundColor: colors.primary }}
                  aria-hidden
                />
                <span className="min-w-0 flex-1">{renderInlineWithBold(item)}</span>
              </li>
            ))}
          </ul>
        );
        continue;
      }

      if (/^\d+\.\s+/.test(trimmed)) {
        const items: string[] = [];
        while (i < lines.length) {
          const t = lines[i].trim();
          if (!t) break;
          const m = t.match(/^\d+\.\s+(.*)$/);
          if (!m) break;
          items.push(m[1]);
          i++;
        }
        const k = blockKey++;
        result.push(
          <ol
            key={k}
            className="my-5 list-decimal space-y-2.5 pl-6 text-[15px] text-gray-700 leading-relaxed marker:font-semibold marker:text-gray-900"
          >
            {items.map((item, idx) => (
              <li key={idx} className="pl-1">
                {shouldUseLatex(item) ? <Latex>{item}</Latex> : renderInlineWithBold(item)}
              </li>
            ))}
          </ol>
        );
        continue;
      }

      const paraLines: string[] = [];
      while (i < lines.length) {
        const t = lines[i].trim();
        if (!t) break;
        if (isTableStart(i)) break;
        if (/^[-*]\s+/.test(t)) break;
        if (/^\d+\.\s+/.test(t)) break;
        paraLines.push(lines[i]);
        i++;
      }

      if (paraLines.length === 0) continue;

      const single = paraLines.length === 1 ? paraLines[0].trim() : null;
      const isShortQuestion =
        Boolean(single && single.endsWith('?') && single.length <= 200 && !single.includes('|'));

      if (isShortQuestion && single) {
        result.push(
          <p key={blockKey++} className="mb-2 mt-5 text-[17px] font-semibold text-gray-900 leading-snug first:mt-0">
            {renderInlineWithBold(single)}
          </p>
        );
        continue;
      }

      if (paraLines.length === 1 && shouldUseLatex(paraLines[0])) {
        result.push(
          <div key={blockKey++} className="mb-4 overflow-x-auto rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-[15px]">
            <Latex>{paraLines[0]}</Latex>
          </div>
        );
        continue;
      }

      const isFormulaLine =
        paraLines.length === 1 &&
        /=\s*\(/.test(single ?? '') &&
        (single?.includes('x 100') || single?.includes('× 100') || single?.includes('* 100'));

      if (isFormulaLine && single) {
        result.push(
          <div
            key={blockKey++}
            className="my-4 rounded-xl border px-4 py-3 font-mono text-[15px] font-medium text-gray-900 shadow-sm sm:text-base"
            style={{
              borderColor: colors.light,
              backgroundColor: colors.ultraLight,
            }}
          >
            {single}
          </div>
        );
        continue;
      }

      result.push(
        <p key={blockKey++} className="mb-4 text-[15px] text-gray-700 leading-relaxed last:mb-0">
          {paraLines.map((pl, pi) => {
            const t = pl.trim();
            return (
              <span key={pi}>
                {pi > 0 ? <br /> : null}
                {shouldUseLatex(pl) ? <Latex>{pl}</Latex> : renderInlineWithBold(t)}
              </span>
            );
          })}
        </p>
      );
    }

    return result;
  };

  if (layout === 'article') {
    const articleSectionShells = [
      'bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg',
      'bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg',
      'bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg',
      'bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg',
      'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-8 shadow-lg',
    ]
    const subBorderClasses = [
      'border-purple-600',
      'border-blue-600',
      'border-green-600',
      'border-orange-600',
    ]

    return (
      <section className="w-full max-w-7xl mx-auto px-4 pb-12">
        <div className="space-y-12">
          {(data.sections ?? []).map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className={articleSectionShells[sectionIndex % articleSectionShells.length]}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                {sectionIndex === 0 ? (
                  <BookOpen className="w-8 h-8 text-purple-600 shrink-0" aria-hidden />
                ) : null}
                <span>{section.heading}</span>
              </h2>

              {section.content ? (
                <div className="space-y-4 text-gray-700 leading-relaxed [&>:first-child]:mt-0">
                  {section.displayType === 'icon-bullets-features'
                    ? renderIconBullets(section.content, 'features')
                    : section.displayType === 'icon-bullets-usecases'
                      ? renderIconBullets(section.content, 'use-cases')
                      : renderContent(section.content)}
                </div>
              ) : null}

              {section.subSections && section.subSections.length > 0 ? (
                <div className="mt-6 space-y-4">
                  {section.subSections.map((subSection, subIndex) => (
                    <div
                      key={subIndex}
                      className={`bg-white p-4 sm:p-6 rounded-lg border-l-4 shadow-sm ${subBorderClasses[subIndex % subBorderClasses.length]}`}
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                        {subSection.heading}
                      </h3>
                      <div className="text-gray-700 leading-relaxed text-[15px] [&>:first-child]:mt-0 [&_ul]:my-4 [&_ol]:my-4">
                        {renderContent(subSection.content)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {data.faq && data.faq.length > 0 ? (
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-purple-600 shrink-0" aria-hidden />
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {data.faq.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-article-${index}`}
                  className="border border-gray-200 rounded-xl px-4 bg-white shadow-sm data-[state=open]:ring-2 data-[state=open]:ring-purple-100 data-[state=open]:border-purple-200"
                >
                  <AccordionTrigger className="text-left text-base font-semibold py-5 hover:no-underline hover:text-purple-700">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed pb-5 text-[15px] border-t border-gray-100">
                    <div className="pt-4 [&>:first-child]:mt-0">{renderContent(item.answer)}</div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ) : null}

        {(data.sectionsAfterFaq ?? []).length > 0 ? (
          <div className="space-y-12 mt-12">
            {(data.sectionsAfterFaq ?? []).map((section, idx) => {
              const sectionIndex = (data.sections?.length ?? 0) + idx
              return (
                <div
                  key={`after-faq-${idx}`}
                  className={articleSectionShells[sectionIndex % articleSectionShells.length]}
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <span>{section.heading}</span>
                  </h2>

                  {section.content ? (
                    <div className="space-y-4 text-gray-700 leading-relaxed [&>:first-child]:mt-0">
                      {section.displayType === 'icon-bullets-features'
                        ? renderIconBullets(section.content, 'features')
                        : section.displayType === 'icon-bullets-usecases'
                          ? renderIconBullets(section.content, 'use-cases')
                          : renderContent(section.content)}
                    </div>
                  ) : null}

                  {section.subSections && section.subSections.length > 0 ? (
                    <div className="mt-6 space-y-4">
                      {section.subSections.map((subSection, subIndex) => (
                        <div
                          key={subIndex}
                          className={`bg-white p-4 sm:p-6 rounded-lg border-l-4 shadow-sm ${subBorderClasses[subIndex % subBorderClasses.length]}`}
                        >
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                            {subSection.heading}
                          </h3>
                          <div className="text-gray-700 leading-relaxed text-[15px] [&>:first-child]:mt-0 [&_ul]:my-4 [&_ol]:my-4">
                            {renderContent(subSection.content)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        ) : null}
      </section>
    )
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/90 ring-1 ring-slate-900/5 overflow-hidden">
        {/* Header */}
        <div
          className="px-6 py-9 sm:px-10 border-b border-slate-200/80"
          style={{ background: `linear-gradient(180deg, ${colors.ultraLight} 0%, #ffffff 100%)` }}
        >
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
              How to Use This Calculator
            </h2>
            <p className="text-gray-600 text-[15px] sm:text-base leading-relaxed">
              Step-by-step guide to get accurate results
            </p>
          </div>
        </div>

        {/* Sections */}
        {data.sections && data.sections.length > 0 && (
          <div className="px-6 sm:px-10 py-8 sm:py-10 space-y-10 sm:space-y-12">
            {data.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-5">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0 shadow-md"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {sectionIndex + 1}
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <h3 className="text-xl sm:text-[1.35rem] font-semibold text-gray-900 mb-4 leading-snug">
                      {section.heading}
                    </h3>

                    {section.content && (
                      <div className="text-gray-700 leading-relaxed [&>:first-child]:mt-0">
                        {section.displayType === 'icon-bullets-features'
                          ? renderIconBullets(section.content, 'features')
                          : section.displayType === 'icon-bullets-usecases'
                            ? renderIconBullets(section.content, 'use-cases')
                            : renderContent(section.content)}
                      </div>
                    )}
                  </div>
                </div>

                {section.subSections && section.subSections.length > 0 && (
                  <div className="ml-0 sm:ml-[3.25rem] space-y-3.5">
                    {section.subSections.map((subSection, subIndex) => (
                      <div
                        key={subIndex}
                        className="p-5 sm:p-6 rounded-xl border border-slate-200/90 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                        style={{
                          borderLeftWidth: 4,
                          borderLeftStyle: 'solid',
                          borderLeftColor: colors.primary,
                        }}
                      >
                        <h4 className="font-semibold text-gray-900 mb-3 text-[15px] sm:text-base leading-snug">
                          {subSection.heading}
                        </h4>
                        <div className="text-gray-700 text-[15px] leading-relaxed [&>:first-child]:mt-0 [&_ul]:my-4 [&_ol]:my-4">
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
          <div className="border-t border-slate-200/80 px-6 sm:px-10 py-9 sm:py-10 bg-gradient-to-b from-slate-50/90 to-slate-50">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-8 text-center tracking-tight">
              Frequently Asked Questions
            </h3>

            <div className="max-w-3xl mx-auto space-y-3">
              {data.faq.map((item, index) => (
                <details
                  key={index}
                  className="group rounded-xl border border-slate-200/90 bg-white shadow-sm hover:border-slate-300/90 transition-colors overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none p-4 sm:p-5 gap-3 [&::-webkit-details-marker]:hidden">
                    <span className="font-medium text-gray-900 text-[15px] sm:text-base leading-snug pr-2">
                      {item.question}
                    </span>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center group-open:rotate-180 transition-transform flex-shrink-0 shadow-sm"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-4 sm:px-5 pb-5 pt-0 border-t border-slate-100">
                    <div className="text-gray-700 text-[15px] leading-relaxed pt-4 [&>:first-child]:mt-0">
                      {renderContent(item.answer)}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}

        {data.sectionsAfterFaq && data.sectionsAfterFaq.length > 0 && (
          <div className="border-t border-slate-200/80 px-6 sm:px-10 py-8 sm:py-10 space-y-10 sm:space-y-12">
            {data.sectionsAfterFaq.map((section, sectionIndex) => {
              const globalIndex = (data.sections?.length ?? 0) + sectionIndex
              return (
                <div key={`after-faq-${sectionIndex}`} className="space-y-5">
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0 shadow-md"
                      style={{ backgroundColor: colors.primary }}
                    >
                      {globalIndex + 1}
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <h3 className="text-xl sm:text-[1.35rem] font-semibold text-gray-900 mb-4 leading-snug">
                        {section.heading}
                      </h3>

                      {section.content && (
                        <div className="text-gray-700 leading-relaxed [&>:first-child]:mt-0">
                          {section.displayType === 'icon-bullets-features'
                            ? renderIconBullets(section.content, 'features')
                            : section.displayType === 'icon-bullets-usecases'
                              ? renderIconBullets(section.content, 'use-cases')
                              : renderContent(section.content)}
                        </div>
                      )}
                    </div>
                  </div>

                  {section.subSections && section.subSections.length > 0 && (
                    <div className="ml-0 sm:ml-[3.25rem] space-y-3.5">
                      {section.subSections.map((subSection, subIndex) => (
                        <div
                          key={subIndex}
                          className="p-5 sm:p-6 rounded-xl border border-slate-200/90 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                          style={{
                            borderLeftWidth: 4,
                            borderLeftStyle: 'solid',
                            borderLeftColor: colors.primary,
                          }}
                        >
                          <h4 className="font-semibold text-gray-900 mb-3 text-[15px] sm:text-base leading-snug">
                            {subSection.heading}
                          </h4>
                          <div className="text-gray-700 text-[15px] leading-relaxed [&>:first-child]:mt-0 [&_ul]:my-4 [&_ol]:my-4">
                            {renderContent(subSection.content)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}