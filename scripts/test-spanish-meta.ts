// TEST Script - Only processes mortgage-calculator for testing
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// TEST: Only process this calculator
const TEST_CALCULATOR_ID = 'mortgage-calculator';

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
async function parseCSV(csvPath: string): Promise<{ calculators: SpanishMetaData[], categories: CategoryData[] }> {
    console.log('📖 Reading CSV file...');

    const csvContent = await fs.readFile(csvPath, 'utf-8');
    const lines = csvContent.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    const calculators: SpanishMetaData[] = [];
    const categories: CategoryData[] = [];

    for (let i = 2; i < lines.length; i++) {
        const line = lines[i];

        // CSV parsing with quote handling
        const parts: string[] = [];
        let current = '';
        let inQuotes = false;

        for (let j = 0; j < line.length; j++) {
            const char = line[j];

            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                parts.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        parts.push(current.trim());

        // Extract columns and clean
        let englishUrl = parts[0]?.trim().replace(/\r$/, '') || '';
        let spanishUrl = parts[1]?.trim().replace(/\r$/, '') || '';
        let title = parts[2]?.trim().replace(/\r$/, '').replace(/^"/, '').replace(/"$/, '') || '';
        let description = parts[3]?.trim().replace(/\r$/, '').replace(/^"/, '').replace(/"$/, '') || '';

        if (!englishUrl || !spanishUrl || !title || !description) continue;

        // Parse URLs properly - remove protocol and split
        const englishParts = englishUrl.replace(/https?:\/\//, '').split('/').filter(p => p);
        // englishParts[0] = domain, [1] = category, [2] = calculator

        const isCategory = englishParts.length === 2; // domain + category only

        if (isCategory) {
            const category = englishParts[1];
            const spanishParts = spanishUrl.replace(/https?:\/\//, '').split('/').filter(p => p);
            const spanishCategory = spanishParts[2] || category;

            categories.push({
                category,
                spanishCategory,
                title,
                description
            });
        } else if (englishParts.length === 3) {
            // domain/category/calculator
            const calculatorId = englishParts[2];

            console.log(`   Found calculator: ${calculatorId}`);

            // TEST: Only mortgage-calculator
            if (calculatorId !== TEST_CALCULATOR_ID) continue;

            const category = englishParts[1];
            const spanishParts = spanishUrl.replace(/https?:\/\//, '').split('/').filter(p => p);
            const spanishCategory = spanishParts[2] || category;
            const spanishCalcSlug = spanishParts[3] || calculatorId;
            const slug = `/es/${spanishCategory}/${spanishCalcSlug}`;

            const keywords = generateKeywords(title, description);

            console.log(`   ✅ MATCH! Adding to list`);
            console.log(`      Spanish slug: ${slug}`);
            calculators.push({
                calculatorId,
                englishUrl,
                spanishUrl,
                title,
                description,
                slug,
                category,
                spanishCategory,
                keywords
            });
        }
    }

    console.log(`\n✅ TEST MODE: Found ${calculators.length} calculator`);
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
    console.log('\n📝 TEST: Updating meta/calculators.ts...');

    const metaPath = path.join(__dirname, '..', 'meta', 'calculators.ts');
    let content = await fs.readFile(metaPath, 'utf-8');

    for (const calc of calculators) {
        console.log(`\n🔍 Processing: ${calc.calculatorId}`);
        console.log(`   Title: ${calc.title}`);
        console.log(`   Slug: ${calc.slug}`);

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
            console.log(`   ✅ Found calculator block`);

            if (calcBlock.includes('es: {')) {
                console.log(`   ⚠️  Spanish block exists, replacing...`);
                const esBlockRegex = /es:\s*\{[^}]*\}/;
                const updatedBlock = calcBlock.replace(esBlockRegex, spanishBlock.trim());
                content = content.replace(calcBlock, updatedBlock);
            } else {
                console.log(`   ➕ Adding Spanish block...`);
                const lastBraceIndex = calcBlock.lastIndexOf('}');
                const beforeBrace = calcBlock.substring(0, lastBraceIndex);
                const updatedBlock = beforeBrace + ',\n' + spanishBlock + '\n  }';
                content = content.replace(calcBlock, updatedBlock);
            }
        } else {
            console.log(`   ❌ Calculator block not found!`);
        }
    }

    await fs.writeFile(metaPath, content, 'utf-8');
    console.log(`\n✅ meta/calculators.ts updated`);
}

// Update layout.tsx
async function updateLayoutFiles(calculators: SpanishMetaData[]) {
    console.log('\n📝 TEST: Updating layout.tsx...');

    const appDir = path.join(__dirname, '..', 'app');

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
                console.log(`   ✅ Found: ${path.relative(process.cwd(), p)}`);
                break;
            } catch {
                continue;
            }
        }

        if (!layoutPath) {
            console.log(`   ❌ Layout not found`);
            continue;
        }

        let content = await fs.readFile(layoutPath, 'utf-8');
        const metaObjectRegex = /const\s+\w+Meta\s*=\s*\{[\s\S]*?\n\};/;
        const match = metaObjectRegex.exec(content);

        if (match) {
            const metaObject = match[0];

            if (metaObject.includes('es: {')) {
                console.log(`   ⚠️  Spanish meta exists, replacing...`);
                const esBlockRegex = /es:\s*\{[\s\S]*?\n  \}/;
                const spanishBlock = `es: {
    title: "${calc.title}",
    description: "${calc.description}",
    keywords: "${calc.keywords}"
  }`;
                const updatedMeta = metaObject.replace(esBlockRegex, spanishBlock);
                content = content.replace(metaObject, updatedMeta);
            } else {
                console.log(`   ➕ Adding Spanish meta...`);
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
            console.log(`   ✅ layout.tsx updated`);
        } else {
            console.log(`   ❌ Meta object not found`);
        }
    }
}

// Update middleware.ts
async function updateMiddleware(calculators: SpanishMetaData[], categories: CategoryData[]) {
    console.log('\n📝 TEST: Middleware mappings preview...');

    const urlMappings: Record<string, string> = {};
    const reverseUrlMappings: Record<string, string> = {};

    // Categories
    const financialCat = categories.find(c => c.category === 'financial');
    if (financialCat) {
        urlMappings[financialCat.spanishCategory] = financialCat.category;
        reverseUrlMappings[financialCat.category] = financialCat.spanishCategory;
    }

    // Calculators
    for (const calc of calculators) {
        const spanishCalcName = calc.slug.split('/').pop() || '';
        if (spanishCalcName) {
            urlMappings[spanishCalcName] = calc.calculatorId;
            reverseUrlMappings[calc.calculatorId] = spanishCalcName;
        }
    }

    console.log('\n📊 URL Mappings to add:');
    Object.entries(urlMappings).forEach(([key, value]) => {
        console.log(`   '${key}': '${value}'`);
    });

    console.log('\n📊 Reverse Mappings to add:');
    Object.entries(reverseUrlMappings).forEach(([key, value]) => {
        console.log(`   '${key}': '${value}'`);
    });

    console.log('\n⚠️  TEST MODE: Not modifying middleware.ts');
    console.log('   Run full script to update middleware');
}

// Main
async function main() {
    console.log('🧪 TEST MODE - Only processing mortgage-calculator\n');

    try {
        const csvPath = path.join(__dirname, '..', 'docs', 'spanish-meta-info-and-slugs.csv');

        const { calculators, categories } = await parseCSV(csvPath);

        if (calculators.length === 0) {
            console.log('❌ Mortgage calculator not found in CSV!');
            return;
        }

        await updateCalculatorsMeta(calculators);
        await updateLayoutFiles(calculators);
        await updateMiddleware(calculators, categories);

        console.log('\n✅ TEST completed successfully! 🎉');
        console.log('\n📋 Next steps:');
        console.log('   1. Check meta/calculators.ts for mortgage-calculator');
        console.log('   2. Check layout.tsx for mortgage-calculator');
        console.log('   3. If looks good, run: npm run add-spanish-meta');
    } catch (error) {
        console.error('\n❌ Error:', error);
        process.exit(1);
    }
}

main();
