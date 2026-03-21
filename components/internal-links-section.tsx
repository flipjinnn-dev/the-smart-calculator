import Link from 'next/link';
import { getInternalLinks } from '@/lib/internal-links/getInternalLinks';
import type { InternalLink } from '@/lib/internal-links/getInternalLinks';

// ─── Category Definitions ───────────────────────────────────────────────
// Order matches the site structure. Slugs per language for grouping.
const CATEGORY_ORDER = [
  'homepage',
  'financial',
  'health',
  'maths',
  'physics',
  'construction',
  'food',
  'sports',
  'games',
  'software',
  'business',
  'other',
] as const;

// Localized category slugs (used to match hrefs)
const CATEGORY_SLUGS: Record<string, Record<string, string>> = {
  financial: { en: 'financial', br: 'financeiro', pl: 'finansowy', de: 'finanziell', es: 'financiero' },
  health:    { en: 'health',    br: 'saude',      pl: 'zdrowie',   de: 'gesundheit', es: 'salud' },
  maths:     { en: 'maths',     br: 'matematica', pl: 'matematyka',de: 'mathe',      es: 'matematicas' },
  physics:   { en: 'physics',   br: 'fisica',     pl: 'fizyka',    de: 'physik',     es: 'fisica' },
  construction: { en: 'construction', br: 'construcao', pl: 'budowa', de: 'konstruktion', es: 'construccion' },
  food:      { en: 'food',      br: 'alimento',   pl: 'zywnosc',   de: 'essen',      es: 'alimentos' },
  sports:    { en: 'sports',    br: 'esportes',   pl: 'lekkoatletyka', de: 'sport',  es: 'deportes' },
  games:     { en: 'games',     br: 'games',      pl: 'games',     de: 'games',      es: 'games' },
  software:  { en: 'software',  br: 'software',   pl: 'oprogramowanie', de: 'software', es: 'software' },
  business:  { en: 'business',  br: 'negocios',   pl: 'biznes',    de: 'geschaeft',  es: 'negocios' },
  other:     { en: 'other-calculators', br: 'outro', pl: 'inne', de: 'andere', es: 'otra' },
};

// Localized category display names
const CATEGORY_NAMES: Record<string, Record<string, string>> = {
  homepage:     { en: 'Homepage', br: 'Página Inicial', pl: 'Strona Główna', de: 'Startseite', es: 'Página Principal' },
  financial:    { en: 'Financial Calculators', br: 'Calculadoras Financeiras', pl: 'Kalkulatory Finansowe', de: 'Finanzrechner', es: 'Calculadoras Financieras' },
  health:       { en: 'Health & Fitness Calculators', br: 'Calculadoras de Saúde e Fitness', pl: 'Kalkulatory Zdrowia i Fitnessu', de: 'Gesundheits- & Fitnessrechner', es: 'Calculadoras de Salud y Fitness' },
  maths:        { en: 'Mathematics Calculators', br: 'Calculadoras de Matemática', pl: 'Kalkulatory Matematyczne', de: 'Matherechner', es: 'Calculadoras de Matemáticas' },
  physics:      { en: 'Physics Calculators', br: 'Calculadoras de Física', pl: 'Kalkulatory Fizyczne', de: 'Physikrechner', es: 'Calculadoras de Física' },
  construction: { en: 'Construction Calculators', br: 'Calculadoras de Construção', pl: 'Kalkulatory Budowlane', de: 'Bau-Rechner', es: 'Calculadoras de Construcción' },
  food:         { en: 'Food & Nutrition Calculators', br: 'Calculadoras de Alimentação e Nutrição', pl: 'Kalkulatory Żywieniowe', de: 'Ernährungsrechner', es: 'Calculadoras de Alimentos y Nutrición' },
  sports:       { en: 'Sports & Performance Calculators', br: 'Calculadoras Esportivas', pl: 'Kalkulatory Sportowe', de: 'Sportrechner', es: 'Calculadoras de Deportes y Rendimiento' },
  games:        { en: 'Games', br: 'Jogos', pl: 'Gry', de: 'Spiele', es: 'Juegos' },
  software:     { en: 'Software & IT Calculators', br: 'Calculadoras de Software e TI', pl: 'Kalkulatory Oprogramowania i IT', de: 'Software- und IT-Rechner', es: 'Calculadoras de Software e IT' },
  business:     { en: 'Business & Startups Calculators', br: 'Calculadoras de Negócios e Startups', pl: 'Kalkulatory Biznesowe', de: 'Geschäfts- und Startup-Rechner', es: 'Calculadoras de Negocios y Startups' },
  other:        { en: 'Other Calculators', br: 'Outras Calculadoras', pl: 'Inne Kalkulatory', de: 'Andere Rechner', es: 'Otras Calculadoras' },
};

// Localized section title
const SECTION_TITLES: Record<string, string> = {
  en: 'Popular Calculators',
  br: 'Calculadoras Populares',
  pl: 'Popularne Kalkulatory',
  de: 'Beliebte Rechner',
  es: 'Calculadoras Populares',
};

// ─── Uniform chip style ─────────────────────────────────────────────────
const CHIP_STYLE = 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50 hover:text-gray-900';

// Category heading colors (one per category, matching the chip vibe)
const CATEGORY_COLORS: Record<string, string> = {
  homepage:     'text-blue-600',
  financial:    'text-emerald-600',
  health:       'text-rose-600',
  maths:        'text-violet-600',
  physics:      'text-amber-600',
  construction: 'text-orange-600',
  food:         'text-teal-600',
  sports:       'text-cyan-600',
  games:        'text-pink-600',
  software:     'text-indigo-600',
  business:     'text-lime-700',
  other:        'text-gray-600',
};

// ─── Grouping logic ─────────────────────────────────────────────────────
function groupLinksByCategory(links: InternalLink[], lang: string) {
  const groups: Record<string, InternalLink[]> = {};

  // Initialize groups in order
  for (const cat of CATEGORY_ORDER) {
    groups[cat] = [];
  }

  for (const link of links) {
    const href = link.href;
    let matched = false;

    // Check against each category slug for this language
    for (const [category, slugs] of Object.entries(CATEGORY_SLUGS)) {
      const slug = slugs[lang] || slugs.en;
      // Match: /{lang_prefix}/{slug}/... or /{slug}/...
      // For non-en: /br/financeiro/... → category=financial
      // For en: /financial/... → category=financial
      if (lang === 'en') {
        if (href === `/${slug}` || href.startsWith(`/${slug}/`)) {
          groups[category].push(link);
          matched = true;
          break;
        }
      } else {
        if (href === `/${lang}/${slug}` || href.startsWith(`/${lang}/${slug}/`)) {
          groups[category].push(link);
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      // Homepage link (/ or /{lang})
      if (href === '/' || href === `/${lang}`) {
        groups.homepage.push(link);
      } else {
        // Anything else → "other"
        groups.other.push(link);
      }
    }
  }

  return groups;
}

// ─── Component ──────────────────────────────────────────────────────────
interface InternalLinksSectionProps {
  language?: string;
}

export async function InternalLinksSection({ language = 'en' }: InternalLinksSectionProps) {
  const links = await getInternalLinks(language);

  if (!links || links.length === 0) return null;

  const groups = groupLinksByCategory(links, language);
  const sectionTitle = SECTION_TITLES[language] || SECTION_TITLES.en;


  return (
    <section className="border-t border-gray-200 bg-gradient-to-b from-gray-50/80 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Section title */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8">
          {sectionTitle}
        </h2>

        {/* Category groups */}
        <div className="space-y-6">
          {CATEGORY_ORDER.map((category) => {
            const categoryLinks = groups[category];
            if (!categoryLinks || categoryLinks.length === 0) return null;

            const categoryName = CATEGORY_NAMES[category]?.[language] || CATEGORY_NAMES[category]?.en || category;
            const headingColor = CATEGORY_COLORS[category] || 'text-gray-700';

            return (
              <div key={category}>
                {/* Category heading */}
                <h3 className={`text-sm font-semibold uppercase tracking-wide mb-3 ${headingColor}`}>
                  {categoryName}
                </h3>

                {/* Chips */}
                <div className="flex flex-wrap gap-2">
                  {categoryLinks.map((link, index) => {

                    return (
                      <Link
                        key={`${link.href}-${index}`}
                        href={link.href}
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200 hover:scale-105 hover:shadow-sm ${CHIP_STYLE}`}
                      >
                        {link.keyword}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
