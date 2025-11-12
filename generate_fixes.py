"""
Generate fixes for broken calculator slugs
"""

# Broken URLs with their expected English translations
fixes_needed = [
    # Polish
    {
        'broken_url': '/pl/finansowy/kalkulator-małżeński',
        'calc_id': 'marriage-calculator',
        'en_slug': '/financial/marriage-calculator',  # Has category
        'should_have_category': True,
        'action': 'OK - matches pattern'
    },
    {
        'broken_url': '/pl/finansowy/kalkulator-stóp-procentowych',
        'calc_id': 'interest-rate-calculator',
        'en_slug': '/financial/interest-rate-calculator',
        'should_have_category': True,
        'action': 'OK - matches pattern'
    },
    {
        'broken_url': '/pl/finansowy/kalkulator-wynagrodzeń',
        'calc_id': 'salary-calculator',
        'en_slug': '/financial/salary-calculator',
        'should_have_category': True,
        'action': 'OK - matches pattern'
    },
    {
        'broken_url': '/pl/finansowy/kalkulator-płatności',
        'calc_id': 'payment-calculator',
        'en_slug': '/financial/payment-calculator',
        'should_have_category': True,
        'action': 'OK - matches pattern'
    },
    {
        'broken_url': '/pl/matematyka/kalkulator-odcinkowy-funkcja-kalkulador-wykres-kalkulador',
        'calc_id': 'piecewise-function-calculator-grapher',
        'en_slug': '/piecewise-function-calculator-grapher',  # NO category!
        'should_have_category': False,
        'fix_to': '/pl/kalkulator-odcinkowy-funkcja-kalkulador-wykres-kalkulador'
    },
    {
        'broken_url': '/pl/inne/kalkulator-przedsiebiorstwo-seo-roi-kalkulador',
        'calc_id': 'enterprise-seo-roi-calculator',
        'en_slug': '/enterprise-seo-roi-calculator',  # NO category!
        'should_have_category': False,
        'fix_to': '/pl/kalkulator-przedsiebiorstwo-seo-roi-kalkulador'
    },
    {
        'broken_url': '/pl/lekkoatletyka/kalkulator-rpe-kalkulador',
        'calc_id': 'rpe-calculator',
        'en_slug': '/rpe-calculator',  # NO category!
        'should_have_category': False,
        'fix_to': '/pl/kalkulator-rpe-kalkulador'
    },
    {
        'broken_url': '/pl/finansowy/kalkulator-indiana-dziecko-wsparcie-kalkulador',
        'calc_id': 'indiana-child-support-calculator',
        'en_slug': '/indiana-child-support-calculator',  # NO category!
        'should_have_category': False,
        'fix_to': '/pl/kalkulator-indiana-dziecko-wsparcie-kalkulador'
    },
    # Brazilian
    {
        'broken_url': '/br/outro/calculadora-de-idade',
        'calc_id': 'age-calculator',
        'en_slug': '/age-calculator',  # NO category!
        'should_have_category': False,
        'fix_to': '/br/calculadora-de-idade'
    },
    {
        'broken_url': '/br/outro/calculadora-de-funcao-por-partes-e-graficador',
        'calc_id': 'piecewise-function-calculator-grapher',
        'en_slug': '/piecewise-function-calculator-grapher',  # NO category!
        'should_have_category': False,
        'fix_to': '/br/calculadora-de-funcao-por-partes-e-graficador'
    },
    {
        'broken_url': '/br/outro/calculadora-de-roi-de-seo-empresarial',
        'calc_id': 'enterprise-seo-roi-calculator',
        'en_slug': '/enterprise-seo-roi-calculator',  # NO category!
        'should_have_category': False,
        'fix_to': '/br/calculadora-de-roi-de-seo-empresarial'
    },
    {
        'broken_url': '/br/saude/calculadora-de-epe',
        'calc_id': 'rpe-calculator',
        'en_slug': '/rpe-calculator',  # NO category!
        'should_have_category': False,
        'fix_to': '/br/calculadora-de-epe'
    },
    {
        'broken_url': '/br/outro/calculadora-de-pensao-alimenticia-de-indiana',
        'calc_id': 'indiana-child-support-calculator',
        'en_slug': '/indiana-child-support-calculator',  # NO category!
        'should_have_category': False,
        'fix_to': '/br/calculadora-de-pensao-alimenticia-de-indiana'
    },
    {
        'broken_url': '/br/outro/calculadora-de-tempo',
        'calc_id': 'time-calculator',
        'en_slug': '/time-calculator',  # NO category!
        'should_have_category': False,
        'fix_to': '/br/calculadora-de-tempo'
    },
    {
        'broken_url': '/br/outro/calculadora-gpa',
        'calc_id': 'gpa-calculator',
        'en_slug': '/gpa-calculator',  # NO category!
        'should_have_category': False,
        'fix_to': '/br/calculadora-gpa'
    },
    {
        'broken_url': '/br/saude/calculadora-de-altura',
        'calc_id': 'height-calculator',
        'en_slug': '/height-calculator',  # NO category!
        'should_have_category': False,
        'fix_to': '/br/calculadora-de-altura'
    },
    {
        'broken_url': '/br/outro/calculadora-desub-rede-IP',
        'calc_id': 'ip-subnet-calculator',
        'en_slug': '/ip-subnet-calculator',  # NO category!
        'should_have_category': False,
        'fix_to': '/br/calculadora-desub-rede-IP'
    },
    # German
    {
        'broken_url': '/de/andere/alter-rechner',
        'calc_id': 'age-calculator',
        'en_slug': '/age-calculator',  # NO category!
        'should_have_category': False,
        'fix_to': '/de/alter-rechner'
    },
]

print("="*80)
print("FIXES NEEDED FOR BROKEN CALCULATOR SLUGS\n")

needs_fix = [f for f in fixes_needed if not f.get('should_have_category', True)]

print(f"Total broken URLs: {len(fixes_needed)}")
print(f"URLs that are correctly structured: {len([f for f in fixes_needed if f.get('should_have_category', False)])}")
print(f"URLs that need fixing: {len(needs_fix)}\n")

print("="*80)
print("\nSLUGS TO FIX IN METADATA:\n")

for fix in needs_fix:
    print(f"📝 {fix['calc_id']}")
    print(f"   Current: {fix['broken_url']}")
    print(f"   Fix to:  {fix['fix_to']}")
    print()

print("="*80)
