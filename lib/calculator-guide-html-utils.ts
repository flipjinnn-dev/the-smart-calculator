/** TipTap / empty saves often store `<p></p>` or `<p><br></p>` — treat as no content. */
export function isMeaningfulGuideHtml(html?: string | null): boolean {
  if (!html?.trim()) return false;
  const text = html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 0;
}

export function firstMeaningfulGuideHtml(
  ...values: (string | undefined | null)[]
): string {
  for (const value of values) {
    if (isMeaningfulGuideHtml(value)) return value!.trim();
  }
  return "";
}
