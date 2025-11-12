import re

# Read metadata
with open('meta/calculators.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Broken URLs
broken_urls = [
    '/de/andere/alter-rechner',
    '/pl/finansowy/kalkulator-małżeński',
    '/pl/finansowy/kalkulator-stóp-procentowych',
    '/pl/finansowy/kalkulator-wynagrodzeń',
    '/pl/finansowy/kalkulator-płatności',
    '/pl/matematyka/kalkulator-odcinkowy-funkcja-kalkulador-wykres-kalkulador',
    '/pl/inne/kalkulator-przedsiebiorstwo-seo-roi-kalkulador',
    '/pl/lekkoatletyka/kalkulator-rpe-kalkulador',
    '/pl/finansowy/kalkulator-indiana-dziecko-wsparcie-kalkulador',
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

# Extract calculators and check their English slugs
print("Checking URL patterns for broken calculators:\n")
print("="*80)

for url in broken_urls:
    # Find this URL in metadata
    if url in content:
        # Extract the calculator block
        start_idx = content.find(url)
        # Go back to find the calculator ID
        before_content = content[:start_idx]
        # Find the last occurrence of '  \'' which starts a calculator block
        calc_start = before_content.rfind("  '")
        calc_id_match = re.search(r"'([^']+)':", content[calc_start:calc_start+100])
        
        if calc_id_match:
            calc_id = calc_id_match.group(1)
            # Find English slug for this calculator
            calc_block_start = content.find(f"  '{calc_id}':")
            calc_block_end = content.find("\n  '", calc_block_start + 10)
            calc_block = content[calc_block_start:calc_block_end]
            
            en_slug_match = re.search(r'en: \{[^}]*slug: "([^"]+)"', calc_block)
            if en_slug_match:
                en_slug = en_slug_match.group(1)
                
                # Count slashes to see path depth
                broken_depth = url.count('/')
                en_depth = en_slug.count('/')
                
                print(f"\n📌 {calc_id}")
                print(f"   EN:     {en_slug} ({en_depth} slashes)")
                print(f"   BROKEN: {url} ({broken_depth} slashes)")
                
                if broken_depth != en_depth:
                    print(f"   ❌ DEPTH MISMATCH!")

print("\n" + "="*80)
