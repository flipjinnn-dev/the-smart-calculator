"""
Test middleware translation logic for broken URLs
"""

# Simulate middleware mappings (subset)
url_mappings_pl = {
    'finansowy': 'financial',
    'kalkulator-małżeński': 'marriage-calculator',
    'kalkulator-stóp-procentowych': 'interest-rate-calculator',
    'kalkulator-wynagrodzeń': 'salary-calculator',
    'kalkulator-płatności': 'payment-calculator',
    'matematyka': 'maths',
    'kalkulator-odcinkowy-funkcja-kalkulador-wykres-kalkulador': 'piecewise-function-calculator-grapher',
    'inne': 'other-calculators',
    'kalkulator-przedsiebiorstwo-seo-roi-kalkulador': 'enterprise-seo-roi-calculator',
    'lekkoatletyka': 'sports',
    'kalkulator-rpe-kalkulador': 'rpe-calculator',
    'kalkulator-indiana-dziecko-wsparcie-kalkulador': 'indiana-child-support-calculator',
}

url_mappings_br = {
    'outro': 'other-calculators',
    'calculadora-de-idade': 'age-calculator',
    'calculadora-de-funcao-por-partes-e-graficador': 'piecewise-function-calculator-grapher',
    'calculadora-de-roi-de-seo-empresarial': 'enterprise-seo-roi-calculator',
    'saude': 'health',
    'calculadora-de-epe': 'rpe-calculator',
    'calculadora-de-pensao-alimenticia-de-indiana': 'indiana-child-support-calculator',
    'calculadora-de-tempo': 'time-calculator',
    'calculadora-gpa': 'gpa-calculator',
    'calculadora-de-altura': 'height-calculator',
    'calculadora-desub-rede-IP': 'ip-subnet-calculator',
}

url_mappings_de = {
    'andere': 'other-calculators',
    'alter-rechner': 'age-calculator',
}

# Broken URLs to test
broken_urls = [
    ('/pl/finansowy/kalkulator-małżeński', url_mappings_pl),
    ('/pl/finansowy/kalkulator-stóp-procentowych', url_mappings_pl),
    ('/pl/finansowy/kalkulator-wynagrodzeń', url_mappings_pl),
    ('/pl/finansowy/kalkulator-płatności', url_mappings_pl),
    ('/pl/matematyka/kalkulator-odcinkowy-funkcja-kalkulador-wykres-kalkulador', url_mappings_pl),
    ('/pl/inne/kalkulator-przedsiebiorstwo-seo-roi-kalkulador', url_mappings_pl),
    ('/pl/lekkoatletyka/kalkulator-rpe-kalkulador', url_mappings_pl),
    ('/pl/finansowy/kalkulator-indiana-dziecko-wsparcie-kalkulador', url_mappings_pl),
    ('/br/outro/calculadora-de-idade', url_mappings_br),
    ('/br/outro/calculadora-de-funcao-por-partes-e-graficador', url_mappings_br),
    ('/br/outro/calculadora-de-roi-de-seo-empresarial', url_mappings_br),
    ('/br/saude/calculadora-de-epe', url_mappings_br),
    ('/br/outro/calculadora-de-pensao-alimenticia-de-indiana', url_mappings_br),
    ('/br/outro/calculadora-de-tempo', url_mappings_br),
    ('/br/outro/calculadora-gpa', url_mappings_br),
    ('/br/saude/calculadora-de-altura', url_mappings_br),
    ('/br/outro/calculadora-desub-rede-IP', url_mappings_br),
    ('/de/andere/alter-rechner', url_mappings_de),
]

print("Testing middleware translation logic:\n")
print("="*80)

for url, mappings in broken_urls:
    # Remove leading slash and split
    parts = url[1:].split('/')
    lang = parts[0]
    path_parts = parts[1:]
    
    # Translate each part
    translated_parts = []
    for part in path_parts:
        translated = mappings.get(part, part)
        translated_parts.append(translated)
    
    # Construct new path
    new_path = '/' + '/'.join(translated_parts)
    
    print(f"\n📍 {url}")
    print(f"   Parts: {path_parts}")
    print(f"   Translated: {translated_parts}")
    print(f"   → Result: {new_path}")
    
    # Check if all parts were translated
    untranslated = [p for p in path_parts if mappings.get(p, None) is None]
    if untranslated:
        print(f"   ⚠️  Untranslated parts: {untranslated}")

print("\n" + "="*80)
