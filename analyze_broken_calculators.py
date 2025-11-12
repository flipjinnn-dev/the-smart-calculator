import re

# Read metadata
with open('meta/calculators.ts', 'r', encoding='utf-8') as f:
    meta_content = f.read()

# Broken calculator URLs
broken_calculators = {
    'de': [
        '/de/andere/alter-rechner',
    ],
    'pl': [
        '/pl/finansowy/kalkulator-małżeński',
        '/pl/finansowy/kalkulator-stóp-procentowych',
        '/pl/finansowy/kalkulator-wynagrodzeń',
        '/pl/finansowy/kalkulator-płatności',
        '/pl/matematyka/kalkulator-odcinkowy-funkcja-kalkulador-wykres-kalkulador',
        '/pl/inne/kalkulator-przedsiebiorstwo-seo-roi-kalkulador',
        '/pl/lekkoatletyka/kalkulator-rpe-kalkulador',
        '/pl/finansowy/kalkulator-indiana-dziecko-wsparcie-kalkulador',
    ],
    'br': [
        '/br/outro/calculadora-de-idade',
        '/br/outro/calculadora-de-funcao-por-partes-e-graficador',
        '/br/outro/calculadora-de-roi-de-seo-empresarial',
        '/br/saude/calculadora-de-epe',
        '/br/outro/calculadora-de-pensao-alimenticia-de-indiana',
        '/br/outro/calculadora-de-tempo',
        '/br/outro/calculadora-gpa',
        '/br/saude/calculadora-de-altura',
        '/br/outro/calculadora-desub-rede-IP',
    ]
}

print("Checking each broken calculator in metadata...\n")
print("="*80)

for lang, urls in broken_calculators.items():
    print(f"\n🔍 {lang.upper()} Language:")
    for url in urls:
        # Search for this exact slug in metadata
        if url in meta_content:
            print(f"  ✅ FOUND in metadata: {url}")
        else:
            # Try to find similar slugs
            slug_part = url.split('/')[-1]
            pattern = rf'slug: "[^"]*{re.escape(slug_part)}'
            matches = re.findall(pattern, meta_content)
            if matches:
                print(f"  ⚠️  NOT FOUND exact: {url}")
                print(f"      Similar slugs found: {matches[:3]}")
            else:
                # Try without special characters
                simple_slug = slug_part.replace('-', '').replace('ł', 'l').replace('ó', 'o')
                print(f"  ❌ NOT FOUND: {url}")
                print(f"      Slug: {slug_part}")
                
                # Try to guess the English calculator name
                if 'alter' in slug_part:
                    print(f"      → Likely: age-calculator")
                elif 'małżeński' in slug_part or 'malzenski' in slug_part:
                    print(f"      → Likely: marriage-calculator")
                elif 'stóp' in slug_part or 'stop' in slug_part:
                    print(f"      → Likely: interest-rate-calculator")
                elif 'wynagrodzeń' in slug_part or 'wynagrodzen' in slug_part:
                    print(f"      → Likely: salary-calculator")
                elif 'płatności' in slug_part or 'platnosci' in slug_part:
                    print(f"      → Likely: payment-calculator")
                elif 'odcinkowy' in slug_part:
                    print(f"      → Likely: piecewise-function-calculator-grapher")
                elif 'przedsiebiorstwo' in slug_part or 'seo-roi' in slug_part:
                    print(f"      → Likely: enterprise-seo-roi-calculator")
                elif 'rpe' in slug_part:
                    print(f"      → Likely: rpe-calculator")
                elif 'indiana' in slug_part:
                    print(f"      → Likely: indiana-child-support-calculator")
                elif 'idade' in slug_part:
                    print(f"      → Likely: age-calculator")
                elif 'funcao-por-partes' in slug_part:
                    print(f"      → Likely: piecewise-function-calculator-grapher")
                elif 'roi-de-seo' in slug_part:
                    print(f"      → Likely: enterprise-seo-roi-calculator")
                elif 'epe' in slug_part:
                    print(f"      → Likely: rpe-calculator")
                elif 'pensao-alimenticia' in slug_part:
                    print(f"      → Likely: indiana-child-support-calculator")
                elif 'tempo' in slug_part:
                    print(f"      → Likely: time-calculator")
                elif 'gpa' in slug_part:
                    print(f"      → Likely: gpa-calculator")
                elif 'altura' in slug_part:
                    print(f"      → Likely: height-calculator")
                elif 'sub-rede-IP' in slug_part or 'IP' in slug_part:
                    print(f"      → Likely: ip-subnet-calculator")

print("\n" + "="*80)
