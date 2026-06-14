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

/** Remove head-only tags if pasted into admin guide HTML (title/meta belong in page metadata). */
export function stripHeadElementsFromGuideHtml(html: string): string {
  if (!html) return html;

  return html
    .replace(/<meta\s+[^>]*\/?>/gi, "")
    .replace(/<meta\s+[^>]*>.*?<\/meta>/gi, "")
    .replace(/<link\b[\s\S]*?>/gi, "")
    .replace(/<\/link>/gi, "")
    .replace(/<title\s*[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(/<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<script\s+[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\s+[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<base\s+[^>]*\/?>/gi, "")
    .replace(/<noscript\s+[^>]*>[\s\S]*?<\/noscript>/gi, "")
    .replace(/<head\s*[^>]*>[\s\S]*?<\/head>/gi, "")
    .replace(/<\/?html[^>]*>/gi, "")
    .replace(/<\/?body[^>]*>/gi, "")
    .replace(/\n\s*\n\s*\n/g, "\n\n")
    .trim();
}
