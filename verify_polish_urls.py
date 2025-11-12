import re

# Read metadata file
with open('meta/calculators.ts', 'r', encoding='utf-8') as f:
    meta_content = f.read()

# Extract all Polish slugs from metadata
pl_slugs_in_meta = re.findall(r'slug: "(/pl/[^"]+)"', meta_content)

# Extract just the calculator names (last part of the slug)
calc_names_in_meta = set()
for slug in pl_slugs_in_meta:
    parts = slug.split('/')
    if len(parts) >= 4:
        calc_names_in_meta.add(parts[-1])

print(f"Total Polish calculators in metadata: {len(pl_slugs_in_meta)}")
print(f"Unique calculator names: {len(calc_names_in_meta)}")

# Read middleware file
with open('middleware.ts', 'r', encoding='utf-8') as f:
    middleware_content = f.read()

# Find the Polish section in middleware
pl_section_start = middleware_content.find("'pl': {")
de_section_start = middleware_content.find("'de': {", pl_section_start)
pl_section = middleware_content[pl_section_start:de_section_start]

# Find all forward mappings in Polish section
forward_mappings = re.findall(r"'([^']+)':\s*'([^']+)'", pl_section)
forward_map_dict = {k: v for k, v in forward_mappings}

print(f"\nTotal forward mappings in middleware: {len(forward_map_dict)}")

# Check which calculators are missing from middleware
missing_from_middleware = []
for calc_name in calc_names_in_meta:
    if calc_name not in forward_map_dict:
        missing_from_middleware.append(calc_name)

if missing_from_middleware:
    print(f"\n❌ MISSING FROM MIDDLEWARE ({len(missing_from_middleware)}):")
    for name in sorted(missing_from_middleware):
        # Find the English name from metadata
        for slug in pl_slugs_in_meta:
            if slug.endswith(name):
                print(f"  - {name}")
                break
else:
    print("\n✅ All Polish calculators are in middleware forward mappings!")

# Now check reverse mappings
reverse_section_start = middleware_content.find("'pl': {", de_section_start)
reverse_section_end = middleware_content.find("'de': {", reverse_section_start + 10)
reverse_section = middleware_content[reverse_section_start:reverse_section_end]

reverse_mappings = re.findall(r"'([^']+)':\s*'([^']+)'", reverse_section)
reverse_map_dict = {k: v for k, v in reverse_mappings}

print(f"\nTotal reverse mappings in middleware: {len(reverse_map_dict)}")

# Check consistency between forward and reverse
print("\n=== CHECKING CONSISTENCY ===")
inconsistent = []
for pl_name, en_name in forward_map_dict.items():
    if pl_name in ['budowa', 'finansowy', 'fizyka', 'inne', 'matematyka', 'zdrowie', 'zywnosc', 'lekkoatletyka']:
        continue  # Skip category mappings
    
    if en_name in reverse_map_dict:
        if reverse_map_dict[en_name] != pl_name:
            inconsistent.append((pl_name, en_name, reverse_map_dict[en_name]))
    else:
        inconsistent.append((pl_name, en_name, "MISSING"))

if inconsistent:
    print(f"❌ INCONSISTENT MAPPINGS ({len(inconsistent)}):")
    for pl, en, rev in inconsistent[:10]:
        print(f"  Forward: '{pl}' -> '{en}'")
        print(f"  Reverse: '{en}' -> '{rev}'")
        print()
else:
    print("✅ All mappings are consistent!")
