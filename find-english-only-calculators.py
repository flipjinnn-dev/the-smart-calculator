import re
import json

# Read the calculators.ts file
with open(r'c:\Users\Hammad Razi\Desktop\the-smart-calculator\meta\calculators.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all calculator entries
# Pattern to match calculator IDs and their language blocks
calculator_pattern = r"'([^']+)':\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\},"

matches = re.finditer(calculator_pattern, content, re.DOTALL)

english_only_calculators = []
multi_language_calculators = []

for match in matches:
    calc_id = match.group(1)
    calc_content = match.group(2)
    
    # Check which languages are present
    has_en = 'en:' in calc_content
    has_pl = 'pl:' in calc_content
    has_br = 'br:' in calc_content
    has_de = 'de:' in calc_content
    has_es = 'es:' in calc_content
    
    # Extract slug from en block
    slug_match = re.search(r'en:\s*\{[^}]*slug:\s*["\']([^"\']+)["\']', calc_content, re.DOTALL)
    slug = slug_match.group(1) if slug_match else None
    
    if has_en and not (has_pl or has_br or has_de or has_es):
        english_only_calculators.append({
            'id': calc_id,
            'slug': slug
        })
    else:
        multi_language_calculators.append({
            'id': calc_id,
            'slug': slug
        })

# Print results
print("=" * 80)
print(f"ENGLISH-ONLY CALCULATORS: {len(english_only_calculators)}")
print("=" * 80)
for calc in english_only_calculators:
    print(f"  '{calc['slug']}',  // {calc['id']}")

print("\n" + "=" * 80)
print(f"MULTI-LANGUAGE CALCULATORS: {len(multi_language_calculators)}")
print("=" * 80)

# Save to JSON for further processing
output = {
    'english_only': english_only_calculators,
    'multi_language': multi_language_calculators
}

with open(r'c:\Users\Hammad Razi\Desktop\the-smart-calculator\calculator-analysis.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, indent=2)

print(f"\n✅ Analysis saved to calculator-analysis.json")
print(f"   - English-only: {len(english_only_calculators)}")
print(f"   - Multi-language: {len(multi_language_calculators)}")
