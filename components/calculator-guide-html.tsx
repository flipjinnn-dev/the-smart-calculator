import { stripHeadElementsFromGuideHtml } from "@/lib/calculator-guide-html-utils";

const GUIDE_HTML_STYLES = `
  .calculator-guide-html h1 { font-size: 2rem; font-weight: 700; color: #111827; margin-top: 2rem; margin-bottom: 1rem; line-height: 1.2; }
  .calculator-guide-html h2 { font-size: 1.75rem; font-weight: 700; color: #111827; margin-top: 1.75rem; margin-bottom: 0.75rem; line-height: 1.3; }
  .calculator-guide-html h3 { font-size: 1.375rem; font-weight: 600; color: #111827; margin-top: 1.5rem; margin-bottom: 0.65rem; line-height: 1.4; }
  .calculator-guide-html h4 { font-size: 1.125rem; font-weight: 600; color: #111827; margin-top: 1.25rem; margin-bottom: 0.5rem; }
  .calculator-guide-html p { font-size: 1rem; color: #374151; line-height: 1.75; margin-bottom: 1rem; }
  .calculator-guide-html ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; color: #374151; }
  .calculator-guide-html ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; color: #374151; }
  .calculator-guide-html li { margin-bottom: 0.35rem; }
  .calculator-guide-html blockquote { border-left: 4px solid #3b82f6; padding-left: 1.25rem; font-style: italic; color: #4b5563; margin: 1.25rem 0; }
  .calculator-guide-html pre { background: #1f2937; color: #f9fafb; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; font-family: monospace; font-size: 0.9rem; margin: 1rem 0; }
  .calculator-guide-html code { background: #f3f4f6; color: #dc2626; padding: 0.15rem 0.4rem; border-radius: 0.25rem; font-size: 0.875rem; font-family: monospace; }
  .calculator-guide-html a { color: #2563eb; text-decoration: underline; }
  .calculator-guide-html a:hover { color: #1e40af; }
  .calculator-guide-html strong { font-weight: 700; }
  .calculator-guide-html em { font-style: italic; }
  .calculator-guide-html img { border-radius: 0.5rem; max-width: 100%; height: auto; margin: 1rem 0; }
  .calculator-guide-html hr { border: none; border-top: 2px solid #e5e7eb; margin: 1.5rem 0; }
  .calculator-guide-html table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
  .calculator-guide-html td, .calculator-guide-html th { border: 1px solid #d1d5db; padding: 0.5rem 0.75rem; text-align: left; }
  .calculator-guide-html th { background: #f9fafb; font-weight: 600; }
`;

type Props = {
  html: string;
  className?: string;
};

export function CalculatorGuideHtml({ html, className = "" }: Props) {
  const safeHtml = stripHeadElementsFromGuideHtml(html);
  if (!safeHtml.trim()) return null;

  return (
    <>
      <style>{GUIDE_HTML_STYLES}</style>
      <div
        className={`calculator-guide-html ${className}`.trim()}
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    </>
  );
}
