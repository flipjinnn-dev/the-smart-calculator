import type { CalculatorGuideData } from "@/components/calculator-guide";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdownToHtml(text: string): string {
  return escapeHtml(text).replace(
    /\*\*([\s\S]*?)\*\*/g,
    "<strong>$1</strong>"
  );
}

function paragraphsToHtml(content: string): string {
  return content
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("|") && block.includes("|")) {
        const rows = block.split("\n").filter((line) => line.trim());
        const body = rows
          .map((row, index) => {
            const cells = row
              .split("|")
              .map((cell) => cell.trim())
              .filter(Boolean);
            if (!cells.length) return "";
            const tag = index === 0 ? "th" : "td";
            if (cells.every((cell) => /^[-:\s]+$/.test(cell))) return "";
            return `<tr>${cells.map((cell) => `<${tag}>${inlineMarkdownToHtml(cell)}</${tag}>`).join("")}</tr>`;
          })
          .filter(Boolean)
          .join("");
        return body ? `<table>${body}</table>` : `<p>${inlineMarkdownToHtml(block).replace(/\n/g, "<br>")}</p>`;
      }
      return `<p>${inlineMarkdownToHtml(block).replace(/\n/g, "<br>")}</p>`;
    })
    .join("\n");
}

function sectionsToHtml(sections: CalculatorGuideData["sections"]): string {
  const parts: string[] = [];
  for (const section of sections ?? []) {
    parts.push(`<h2>${escapeHtml(section.heading)}</h2>`);
    if (section.content) {
      parts.push(paragraphsToHtml(section.content));
    }
    for (const sub of section.subSections ?? []) {
      parts.push(`<h3>${escapeHtml(sub.heading)}</h3>`);
      parts.push(paragraphsToHtml(sub.content));
    }
  }
  return parts.join("\n");
}

/** Convert structured calculator-guide JSON into HTML for the admin rich text editor. */
export function calculatorGuideToHtml(data: CalculatorGuideData): string {
  const parts: string[] = [];
  parts.push(sectionsToHtml(data.sections));
  parts.push(sectionsToHtml(data.sectionsAfterFaq));

  for (const item of data.faq ?? []) {
    parts.push(`<h3>${escapeHtml(item.question)}</h3>`);
    parts.push(paragraphsToHtml(item.answer));
  }

  return parts.filter(Boolean).join("\n").trim();
}
