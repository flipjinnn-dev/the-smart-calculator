// Script to add Spanish metadata for (other) category calculators
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const otherCalculators = [
    {
        id: 'age-calculator',
        title: 'Calculadora de Edad – Descubre tu Edad Exacta al Instante',
        description: 'Calcula tu edad exacta al instante con nuestra herramienta rápida y precisa. ¡Descúbrelo ahora y lleva un control de tu tiempo de manera fácil!',
        slug: '/calculadora-de-edad',
        keywords: 'calculadora, edad, descubre, exacta, instante, calcula, nuestra, herramienta, rápida, precisa, descúbrelo, ahora, lleva, control, tiempo'
    },
    {
        id: 'gpa-calculator',
        title: 'Calculadora de GPA – Calcula tu Promedio Académico Fácil',
        description: 'Calcula tu GPA al instante con nuestra herramienta rápida y precisa. ¡Conoce tu promedio académico y planifica tu éxito universitario ahora mismo!',
        slug: '/Calculadora-de-gpa',
        keywords: 'calculadora, calcula, promedio, académico, fácil, nuestra, herramienta, rápida, precisa, conoce, planifica, éxito, universitario, ahora'
    },
    {
        id: 'height-calculator',
        title: 'Calculadora de Altura – Predice tu Crecimiento Fácilmente',
        description: 'Usa nuestra calculadora de altura para estimar tu crecimiento o el de tus hijos. ¡Descúbrelo al instante y planifica tu desarrollo ahora mismo!',
        slug: '/calculadora-de-altura',
        keywords: 'calculadora, altura, predice, crecimiento, fácilmente, nuestra, estimar, hijos, descúbrelo, instante, planifica, desarrollo, ahora'
    },
    {
        id: 'enterprise-seo-roi-calculator',
        title: 'Calculadora de ROI SEO – Mide tu Retorno Rápido y Fácil',
        description: 'Calcula el ROI de tus estrategias SEO al instante y optimiza tus inversiones. ¡Descubre cuánto retorno obtienes y mejora tu marketing ahora mismo',
        slug: '/calculadora-de-roi-seo',
        keywords: 'calculadora, mide, retorno, rápido, fácil, calcula, estrategias, instante, optimiza, inversiones, descubre, cuánto, obtienes, mejora, marketing'
    },
    {
        id: 'rpe-calculator',
        title: 'Calculadora RPE – Evalúa tu Esfuerzo Físico Fácil y Rápido',
        description: 'Calcula tu RPE (Percepción del Esfuerzo) al instante y optimiza tu entrenamiento. ¡Mejora tus rutinas y alcanza tus metas ahora mismo!',
        slug: '/calculadora-rpe',
        keywords: 'calculadora, evalúa, esfuerzo, físico, fácil, rápido, calcula, percepción, instante, optimiza, entrenamiento, mejora, rutinas, alcanza, metas'
    },
    {
        id: 'indiana-child-support-calculator',
        title: 'Calculadora de Manutención Infantil – Calcula Fácil y Rápido',
        description: 'Calcula la manutención infantil al instante con nuestra herramienta precisa. ¡Conoce los pagos justos y planifica el bienestar de tus hijos ahora mismo!',
        slug: '/calculadora-de-manutencion-infantil',
        keywords: 'calculadora, manutención, infantil, calcula, fácil, rápido, instante, nuestra, herramienta, precisa, conoce, pagos, justos, planifica, bienestar'
    },
    {
        id: 'time-calculator',
        title: 'Calculadora de Tiempo – Calcula Duraciones Rápida y Fácil',
        description: 'Calcula tiempos y duraciones al instante con nuestra herramienta precisa. ¡Ahorra tiempo y organiza tus actividades de manera eficiente ahora mismo!',
        slug: '/calculadora-de-tiempo',
        keywords: 'calculadora, tiempo, calcula, duraciones, rápida, fácil, tiempos, instante, nuestra, herramienta, precisa, ahorra, organiza, actividades, manera'
    },
    {
        id: 'piecewise-function-calculator-grapher',
        title: 'Calculadora de Funciones por Tramos – Calcula Fácil y Rápido',
        description: 'Resuelve funciones por tramos al instante con nuestra calculadora precisa. ¡Simplifica tus ejercicios y aprende matemáticas de manera eficiente ahora!',
        slug: '/calculadora-de-funciones-por-tramos',
        keywords: 'calculadora, funciones, tramos, calcula, fácil, rápido, resuelve, instante, nuestra, precisa, simplifica, ejercicios, aprende, matemáticas, manera'
    },
    {
        id: 'ip-subnet-calculator',
        title: 'Calculadora de Subnet – Calcula Redes IP Fácil y Rápido',
        description: 'Calcula tus subnets al instante con nuestra herramienta precisa. ¡Optimiza tus redes IP y simplifica la planificación de tus direcciones ahora mismo!',
        slug: '/calculadora-subnet',
        keywords: 'calculadora, subnet, calcula, redes, fácil, rápido, subnets, instante, nuestra, herramienta, precisa, optimiza, simplifica, planificación, direcciones'
    }
];

async function main() {
    console.log('🚀 Adding Spanish to (other) category calculators...\n');

    for (const calc of otherCalculators) {
        console.log(`\n📝 Processing: ${calc.id}`);

        // 1. Update layout.tsx
        const layoutPath = path.join(__dirname, '..', 'app', '(calculators-by-category)', '(other)', calc.id, 'layout.tsx');

        try {
            let content = await fs.readFile(layoutPath, 'utf-8');

            // Find the meta object closing brace
            const metaObjectRegex = /const\s+\w+Meta\s*=\s*\{[\s\S]*?\n\};/;
            const match = metaObjectRegex.exec(content);

            if (match) {
                const metaObject = match[0];

                if (!metaObject.includes('es: {')) {
                    console.log(`  ✅ Adding Spanish to layout.tsx`);

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

                    await fs.writeFile(layoutPath, content, 'utf-8');
                } else {
                    console.log(`  ⚠️  Spanish already exists in layout.tsx`);
                }
            }
        } catch (error) {
            console.error(`  ❌ Error updating layout: ${error}`);
        }

        // 2. Update meta/calculators.ts entry
        console.log(`  📝 Check meta/calculators.ts - needs manual addition`);
    }

    console.log('\n\n✅ Layout files updated!');
    console.log('\n⚠️  MANUAL STEP REQUIRED:');
    console.log('Add these 9 calculators to meta/calculators.ts with Spanish blocks');
}

main();
