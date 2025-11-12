import re

# Read metadata file
with open('meta/calculators.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Split into calculator blocks
calculators = re.split(r'\n  \'([^\']+)\': \{', content)

missing_polish = []
has_polish = []

for i in range(1, len(calculators), 2):
    calc_name = calculators[i]
    calc_block = calculators[i + 1]
    
    # Check if this calculator has Polish translation
    if 'pl: {' in calc_block:
        has_polish.append(calc_name)
    else:
        missing_polish.append(calc_name)

print(f"Total calculators with Polish: {len(has_polish)}")
print(f"Total calculators WITHOUT Polish: {len(missing_polish)}")
print(f"\n❌ Missing Polish translations:")
for calc in missing_polish:
    print(f"  - {calc}")

# Also check which ones have BR and DE
print(f"\n\nChecking which missing ones have BR and DE:")
for calc in missing_polish:
    # Find the calculator block
    for i in range(1, len(calculators), 2):
        if calculators[i] == calc:
            calc_block = calculators[i + 1]
            has_br = 'br: {' in calc_block
            has_de = 'de: {' in calc_block
            print(f"  - {calc}: BR={has_br}, DE={has_de}")
            break
