import csv
import re

# Read all three reports
reports = [
    'docs/sitemap_status_report_2025-11-12_14-06-40.csv',  # German
    'docs/sitemap_status_report_2025-11-12_14-08-07.csv',  # Polish
    'docs/sitemap_status_report_2025-11-12_14-10-20.csv',  # Brazilian
]

broken_links = []

for report_file in reports:
    with open(report_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row['Status Code'] == '404':
                url = row['URL']
                # Extract the path part
                path = url.replace('https://www.thesmartcalculator.com', '')
                broken_links.append({
                    'url': url,
                    'path': path,
                    'lang': path.split('/')[1] if len(path.split('/')) > 1 else '',
                    'slug': path.split('/')[-1] if path else ''
                })

print(f"Total broken links: {len(broken_links)}\n")
print("="*80)

# Group by language
de_broken = [link for link in broken_links if link['lang'] == 'de']
pl_broken = [link for link in broken_links if link['lang'] == 'pl']
br_broken = [link for link in broken_links if link['lang'] == 'br']

print(f"\n🇩🇪 GERMAN - {len(de_broken)} broken:")
for link in de_broken:
    print(f"  ❌ {link['path']}")

print(f"\n🇵🇱 POLISH - {len(pl_broken)} broken:")
for link in pl_broken:
    print(f"  ❌ {link['path']}")

print(f"\n🇧🇷 BRAZILIAN - {len(br_broken)} broken:")
for link in br_broken:
    print(f"  ❌ {link['path']}")

print("\n" + "="*80)
print("\nAnalyzing issues...\n")

# Categorize issues
static_pages = []
calculator_pages = []

for link in broken_links:
    path_parts = link['path'].split('/')
    # Check if it's a static page (about, contact, terms, privacy)
    if any(keyword in link['path'].lower() for keyword in ['nutzungsbedingungen', 'warunki', 'contato', 'uber-uns', 'o-nas', 'sobre-nos']):
        static_pages.append(link)
    else:
        calculator_pages.append(link)

if static_pages:
    print(f"📄 STATIC PAGES ({len(static_pages)}):")
    for link in static_pages:
        print(f"  - {link['path']}")

if calculator_pages:
    print(f"\n🧮 CALCULATOR PAGES ({len(calculator_pages)}):")
    for link in calculator_pages:
        print(f"  - {link['path']}")
