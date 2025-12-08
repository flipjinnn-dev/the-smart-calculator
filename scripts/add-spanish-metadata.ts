// Production Script - Add Spanish metadata to ALL calculators
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface SpanishMetaData {
    calculatorId: string;
    englishUrl: string;
    spanishUrl: string;
    title: string;
    description: string;
    slug: string;
    category: string;
    spanishCategory: string;
    keywords: string;
}

interface CategoryData {
    category: string;
    spanishCategory: string;
    title: string;
    description: string;
}

// Parse CSV file
// Parse meta/calculators.ts directly
async function parseCalculatorsMetaFromCode(): Promise<{ calculators: SpanishMetaData[], categories: CategoryData[] }> {
    console.log('📖 Reading meta/calculators.ts file...');

    const metaPath = path.join(__dirname, '..', 'meta', 'calculators.ts');
    const content = await fs.readFile(metaPath, 'utf-8');

    const calculators: SpanishMetaData[] = [];
    const categories: CategoryData[] = [];
    const categoryMap = new Map<string, string>(); // es -> en

    // Regex to find calculator blocks
    // Matches: 'calc-id': { ... en: { ... slug: "..." ... } ... es: { ... slug: "..." ... } ... }
    // This is complex to regex reliably if nested. 
    // Simplified assumption: keys are top level indent 2 spaces.

    const calcBlockRegex = /'([\w-]+)':\s*\{[\s\S]*?en:\s*\{[\s\S]*?slug:\s*"([^"]+)"[\s\S]*?es:\s*\{[\s\S]*?slug:\s*"([^"]+)"/g;

    let match;
    while ((match = calcBlockRegex.exec(content)) !== null) {
        const calculatorId = match[1];
        const enSlug = match[2];
        const esSlug = match[3];

        // enSlug: /category/calc-id or /category/subcategory/calc-id (usually just /category/calc-id)
        // esSlug: /es/category/calc-id

        // Remove leading / and split
        const enParts = enSlug.replace(/^\//, '').split('/');
        const esParts = esSlug.replace(/^\//, '').split('/');

        if (enParts.length >= 2 && esParts.length >= 3 && esParts[0] === 'es') {
            // enParts[0] is category (usually)
            // esParts[1] is es category

            const enCategory = enParts[0];
            const esCategory = esParts[1];
            const esCalcSlug = esParts[esParts.length - 1]; // Last part is the calc slug

            // Store category mapping
            if (!categoryMap.has(esCategory)) {
                categoryMap.set(esCategory, enCategory);
                categories.push({
                    category: enCategory,
                    spanishCategory: esCategory,
                    title: '', // Not needed for middleware sync
                    description: ''
                });
            }

            calculators.push({
                calculatorId,
                englishUrl: enSlug,
                spanishUrl: esSlug,
                title: '',
                description: '',
                slug: esSlug,
                category: enCategory,
                spanishCategory: esCategory,
                keywords: ''
            });
        }
    }

    console.log(`✅ Parsed ${calculators.length} calculators and ${categories.length} categories from code`);
    return { calculators, categories };
}

function generateKeywords(title: string, description: string): string {
    const stopWords = ['el', 'la', 'de', 'y', 'en', 'tu', 'con', 'para', 'por', 'un', 'una', 'los', 'las'];
    const words = [...title.split(/\s+/), ...description.split(/\s+/)]
        .map(w => w.toLowerCase().replace(/[^a-záéíóúñü]/g, ''))
        .filter(w => w.length > 3 && !stopWords.includes(w));

    const uniqueWords = [...new Set(words)];
    return uniqueWords.slice(0, 15).join(', ');
}

// Update meta/calculators.ts
async function updateCalculatorsMeta(calculators: SpanishMetaData[]) {
    console.log('\n📝 Updating meta/calculators.ts...');

    const metaPath = path.join(__dirname, '..', 'meta', 'calculators.ts');
    let content = await fs.readFile(metaPath, 'utf-8');

    let updatedCount = 0;
    let addedCount = 0;

    for (const calc of calculators) {
        const spanishBlock = `    es: {
      title: "${calc.title}",
      description: "${calc.description}",
      slug: "${calc.slug}",
      keywords: "${calc.keywords}"
    }`;

        const escapedId = calc.calculatorId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const calcBlockRegex = new RegExp(
            `'${escapedId}':\\s*\\{[\\s\\S]*?\\n  \\}(?=,\\n  '|\\n\\};)`,
            'g'
        );

        const match = calcBlockRegex.exec(content);

        if (match) {
            const calcBlock = match[0];

            if (calcBlock.includes('es: {')) {
                const esBlockRegex = /es:\s*\{[^}]*\}/;
                const updatedBlock = calcBlock.replace(esBlockRegex, spanishBlock.trim());
                content = content.replace(calcBlock, updatedBlock);
                updatedCount++;
            } else {
                const lastBraceIndex = calcBlock.lastIndexOf('}');
                const beforeBrace = calcBlock.substring(0, lastBraceIndex);
                const updatedBlock = beforeBrace + ',\n' + spanishBlock + '\n  }';
                content = content.replace(calcBlock, updatedBlock);
                addedCount++;
            }
        } else {
            console.warn(`⚠️  Calculator '${calc.calculatorId}' not found`);
        }
    }

    await fs.writeFile(metaPath, content, 'utf-8');
    console.log(`✅ Updated ${updatedCount} and added ${addedCount} Spanish blocks`);
}

// Update layout.tsx files
async function updateLayoutFiles(calculators: SpanishMetaData[]) {
    console.log('\n📝 Updating layout.tsx files...');

    const appDir = path.join(__dirname, '..', 'app');
    let updatedCount = 0;

    for (const calc of calculators) {
        const layoutPaths = [
            path.join(appDir, `(calculators-by-category)`, calc.category, calc.calculatorId, 'layout.tsx'),
            path.join(appDir, `(calculators-by-category)`, `(other)`, calc.calculatorId, 'layout.tsx'),
            path.join(appDir, calc.calculatorId, 'layout.tsx'),
        ];

        let layoutPath: string | null = null;
        for (const p of layoutPaths) {
            try {
                await fs.access(p);
                layoutPath = p;
                break;
            } catch {
                continue;
            }
        }

        if (!layoutPath) {
            console.warn(`⚠️  Layout not found: ${calc.calculatorId}`);
            continue;
        }

        try {
            let content = await fs.readFile(layoutPath, 'utf-8');
            const metaObjectRegex = /const\s+\w+Meta\s*=\s*\{[\s\S]*?\n\};/;
            const match = metaObjectRegex.exec(content);

            if (match) {
                const metaObject = match[0];

                if (metaObject.includes('es: {')) {
                    const esBlockRegex = /es:\s*\{[\s\S]*?\n  \}/;
                    const spanishBlock = `es: {
    title: "${calc.title}",
    description: "${calc.description}",
    keywords: "${calc.keywords}"
  }`;
                    const updatedMeta = metaObject.replace(esBlockRegex, spanishBlock);
                    content = content.replace(metaObject, updatedMeta);
                } else {
                    const closingIndex = metaObject.lastIndexOf('};');
                    const before = metaObject.substring(0, closingIndex);
                    const spanishBlock = `,
  es: {
    title: "${calc.title}",
    description: "${calc.description}",
    keywords: "${calc.keywords}"
  }
};`;
                    const updatedMeta = before + spanishBlock;
                    content = content.replace(metaObject, updatedMeta);
                }

                await fs.writeFile(layoutPath, content, 'utf-8');
                updatedCount++;
                console.log(`  ✅ ${calc.calculatorId}`);
            }
        } catch (error) {
            console.error(`  ❌ Error: ${calc.calculatorId}`);
        }
    }

    console.log(`✅ Updated ${updatedCount} layout files`);
}

// Update middleware.ts
async function updateMiddleware(calculators: SpanishMetaData[], categories: CategoryData[]) {
    console.log('\n📝 Updating middleware.ts...');

    const middlewarePath = path.join(__dirname, '..', 'middleware.ts');
    let content = await fs.readFile(middlewarePath, 'utf-8');

    const urlMappings: Record<string, string> = {};
    const reverseUrlMappings: Record<string, string> = {};

    // Add categories
    for (const cat of categories) {
        urlMappings[cat.spanishCategory] = cat.category;
        reverseUrlMappings[cat.category] = cat.spanishCategory;
    }

    // Add calculators
    for (const calc of calculators) {
        const spanishCalcName = calc.slug.split('/').pop() || '';
        if (spanishCalcName) {
            urlMappings[spanishCalcName] = calc.calculatorId;
            reverseUrlMappings[calc.calculatorId] = spanishCalcName;
        }
    }

    // Update urlMappings['es']
    const entries = Object.entries(urlMappings)
        .map(([key, value]) => `    '${key}': '${value}'`)
        .join(',\n');

    const esBlock = `'es': {\n${entries}\n  }`;

    // Check if es already exists in urlMappings
    if (content.includes("'es': {") && content.indexOf("'es': {") < content.indexOf('reverseUrlMappings')) {
        const urlMappingsEsRegex = /'es':\s*\{[\s\S]*?\n  \}/;
        content = content.replace(urlMappingsEsRegex, esBlock);
    } else {
        const urlMappingsEnd = content.indexOf('} as const;');
        if (urlMappingsEnd > 0) {
            const before = content.substring(0, urlMappingsEnd);
            const after = content.substring(urlMappingsEnd);
            content = before + `  },\n  ${esBlock}\n` + after;
        }
    }

    // Update reverseUrlMappings['es']
    const reverseEntries = Object.entries(reverseUrlMappings)
        .map(([key, value]) => `    '${key}': '${value}'`)
        .join(',\n');

    const reverseEsBlock = `'es': {\n${reverseEntries}\n  }`;

    const reverseStartIndex = content.indexOf('reverseUrlMappings');
    if (content.includes("'es': {", reverseStartIndex)) {
        const reverseEsRegex = /'es':\s*\{[\s\S]*?\n  \}/g;
        const matches = [...content.matchAll(reverseEsRegex)];
        if (matches.length > 1) {
            const secondMatch = matches[1];
            const before = content.substring(0, secondMatch.index);
            const after = content.substring((secondMatch.index || 0) + secondMatch[0].length);
            content = before + reverseEsBlock + after;
        }
    } else {
        const staticPagesIndex = content.indexOf('// Define static pages');
        if (staticPagesIndex > 0) {
            const reverseEnd = content.lastIndexOf('} as const;', staticPagesIndex);
            const before = content.substring(0, reverseEnd);
            const after = content.substring(reverseEnd);
            content = before + `  },\n  ${reverseEsBlock}\n` + after;
        }
    }

    await fs.writeFile(middlewarePath, content, 'utf-8');
    console.log('✅ Middleware updated');
}

// Main
async function main() {
    console.log('🚀 Starting Spanish metadata integration...\n');

    try {
        const { calculators, categories } = await parseCalculatorsMetaFromCode();
        // await updateCalculatorsMeta(calculators); // Not needed for sync
        // await updateLayoutFiles(calculators); // Not needed for sync
        await updateMiddleware(calculators, categories);

        console.log('\n✅ Spanish metadata integration completed! 🎉');
        console.log(`\n📊 Summary:`);
        console.log(`   - ${calculators.length} calculators processed`);
        console.log(`   - ${categories.length} categories processed`);
    } catch (error) {
        console.error('\n❌ Error:', error);
        process.exit(1);
    }
}

main();
