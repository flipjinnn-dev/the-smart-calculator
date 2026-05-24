import "server-only";
import { revalidatePath } from "next/cache";
import { getCalculatorById } from "@/lib/calculator-data";
import { getCalculatorUrl } from "@/lib/url-utils";
import { loadCalculatorSeo } from "@/lib/calculator-seo";

function toPathname(urlOrPath: string): string | null {
  const s = urlOrPath.trim();
  if (!s) return null;
  if (s.startsWith("/")) {
    return s.split("?")[0].split("#")[0] || null;
  }
  try {
    return new URL(s).pathname;
  } catch {
    return null;
  }
}

/** Bust Next.js cached HTML/metadata for a calculator's public URL(s). */
export async function revalidateCalculatorCache(
  calculatorId: string,
  extraCanonical?: string
): Promise<string[]> {
  const paths = new Set<string>();

  const calc = getCalculatorById(calculatorId);
  if (calc?.href) {
    paths.add(calc.href);
  }

  const enSlug = getCalculatorUrl(calculatorId, "en");
  if (enSlug && enSlug !== "/") {
    paths.add(enSlug.startsWith("/") ? enSlug : `/${enSlug}`);
  }

  const canonical =
    extraCanonical?.trim() ||
    (await loadCalculatorSeo(calculatorId, "en"))?.canonical;
  if (canonical) {
    const fromCanonical = toPathname(canonical);
    if (fromCanonical) paths.add(fromCanonical);
  }

  const revalidated: string[] = [];
  for (const path of paths) {
    revalidatePath(path, "layout");
    revalidatePath(path, "page");
    revalidated.push(path);
  }

  return revalidated;
}
