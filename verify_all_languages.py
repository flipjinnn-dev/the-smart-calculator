import re

# Read metadata file
with open('meta/calculators.ts', 'r', encoding='utf-8') as f:
    meta_content = f.read()

# Read middleware file
with open('middleware.ts', 'r', encoding='utf-8') as f:
    middleware_content = f.read()

def check_language(lang_code, lang_name):
    print(f"\n{'='*60}")
    print(f"CHECKING {lang_name.upper()} ({lang_code})")
    print(f"{'='*60}")
    
    # Extract all slugs from metadata (without leading slash in pattern)
    pattern = rf'slug: "({lang_code}/[^"]+)"'
    slugs_in_meta = re.findall(pattern, meta_content)
    
    # Extract just the calculator names (last part of the slug)
    calc_names_in_meta = set()
    incomplete_slugs = []
    for slug in slugs_in_meta:
        if slug == f"{lang_code}/":
            incomplete_slugs.append(slug)
        else:
            parts = slug.split('/')
            if len(parts) >= 3:
                calc_names_in_meta.add(parts[-1])
    
    print(f"✓ Total calculators in metadata: {len(slugs_in_meta)}")
    print(f"✓ Unique calculator names: {len(calc_names_in_meta)}")
    
    if incomplete_slugs:
        print(f"❌ INCOMPLETE SLUGS FOUND ({len(incomplete_slugs)}): {incomplete_slugs}")
        return False
    
    # Find the language section in middleware (forward mappings)
    # Remove the leading slash from lang_code for middleware search
    middleware_lang = lang_code[1:] if lang_code.startswith('/') else lang_code
    section_marker = f"'{middleware_lang}': {{"
    section_start = middleware_content.find(section_marker)
    
    if section_start == -1:
        print(f"❌ Language section not found in middleware!")
        return False
    
    # Find next language section
    next_section = middleware_content.find("'", section_start + len(section_marker) + 1)
    bracket_count = 1
    pos = section_start + len(section_marker)
    while bracket_count > 0 and pos < len(middleware_content):
        if middleware_content[pos] == '{':
            bracket_count += 1
        elif middleware_content[pos] == '}':
            bracket_count -= 1
        pos += 1
    
    forward_section = middleware_content[section_start:pos]
    
    # Find all forward mappings
    forward_mappings = re.findall(r"'([^']+)':\s*'([^']+)'", forward_section)
    forward_map_dict = {k: v for k, v in forward_mappings}
    
    print(f"✓ Forward mappings in middleware: {len(forward_map_dict)}")
    
    # Check which calculators are missing from middleware
    missing_from_middleware = []
    for calc_name in calc_names_in_meta:
        if calc_name not in forward_map_dict:
            missing_from_middleware.append(calc_name)
    
    if missing_from_middleware:
        print(f"❌ MISSING FROM MIDDLEWARE ({len(missing_from_middleware)}):")
        for name in sorted(missing_from_middleware)[:10]:
            print(f"  - {name}")
        if len(missing_from_middleware) > 10:
            print(f"  ... and {len(missing_from_middleware) - 10} more")
        return False
    else:
        print(f"✅ All calculators are in middleware forward mappings!")
    
    # Find reverse mappings section (after urlMappings)
    reverse_marker = f"'{middleware_lang}': {{"
    reverse_start = middleware_content.find(reverse_marker, pos)
    
    if reverse_start == -1:
        print(f"❌ Reverse mapping section not found!")
        return False
    
    # Find end of reverse section
    bracket_count = 1
    pos = reverse_start + len(reverse_marker)
    while bracket_count > 0 and pos < len(middleware_content):
        if middleware_content[pos] == '{':
            bracket_count += 1
        elif middleware_content[pos] == '}':
            bracket_count -= 1
        pos += 1
    
    reverse_section = middleware_content[reverse_start:pos]
    reverse_mappings = re.findall(r"'([^']+)':\s*'([^']+)'", reverse_section)
    reverse_map_dict = {k: v for k, v in reverse_mappings}
    
    print(f"✓ Reverse mappings in middleware: {len(reverse_map_dict)}")
    
    # Check consistency between forward and reverse
    categories = ['budowa', 'finansowy', 'fizyka', 'inne', 'matematyka', 'zdrowie', 
                  'zywnosc', 'lekkoatletyka', 'construcao', 'saude', 'matematica', 
                  'fisica', 'alimento', 'esportes', 'outro', 'essen', 'andere',
                  'konstruktion', 'physik', 'mathe', 'sport', 'construction',
                  'financial', 'physics', 'other-calculators', 'maths', 'health',
                  'food', 'sports']
    
    inconsistent = []
    for local_name, en_name in forward_map_dict.items():
        if local_name in categories:
            continue  # Skip category mappings
        
        if en_name in reverse_map_dict:
            if reverse_map_dict[en_name] != local_name:
                inconsistent.append((local_name, en_name, reverse_map_dict[en_name]))
        else:
            inconsistent.append((local_name, en_name, "MISSING"))
    
    if inconsistent:
        print(f"❌ INCONSISTENT MAPPINGS ({len(inconsistent)}):")
        for local, en, rev in inconsistent[:5]:
            print(f"  Forward: '{local}' -> '{en}'")
            print(f"  Reverse: '{en}' -> '{rev}'")
        if len(inconsistent) > 5:
            print(f"  ... and {len(inconsistent) - 5} more")
        return False
    else:
        print(f"✅ All mappings are consistent!")
    
    return True

# Check all languages
all_good = True
all_good &= check_language('/br', 'Brazilian Portuguese')
all_good &= check_language('/pl', 'Polish')
all_good &= check_language('/de', 'German')

print(f"\n{'='*60}")
if all_good:
    print("✅✅✅ ALL LANGUAGES ARE PERFECT! ✅✅✅")
else:
    print("❌ SOME ISSUES FOUND - FIX THEM!")
print(f"{'='*60}")
