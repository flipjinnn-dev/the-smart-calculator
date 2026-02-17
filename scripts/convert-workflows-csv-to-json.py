import csv
import json
import os
from pathlib import Path

def clean_category_name(filename):
    """Convert filename to proper display name"""
    name = filename.replace('.csv', '')
    
    # Special cases for proper naming
    name_mapping = {
        'email-calendar': 'Email & Calendar',
        'lead-generation': 'Lead Generation',
        'social-media': 'Social Media',
        'elevenlabs': 'ElevenLabs',
        'ecommerce': 'E-commerce',
        'SEO': 'SEO',
        'chatbot': 'Chatbot',
        'content': 'Content',
        'discord': 'Discord',
        'facebook': 'Facebook',
        'github': 'GitHub',
        'hubspot': 'HubSpot',
        'instagram': 'Instagram',
        'pinterest': 'Pinterest',
        'security': 'Security',
        'shopify': 'Shopify',
        'slack': 'Slack',
        'telegram': 'Telegram',
        'tiktok': 'TikTok',
        'twitter': 'Twitter',
        'wordpress': 'WordPress',
        'youtube': 'YouTube',
        'zendesk': 'Zendesk',
        'other': 'Other'
    }
    
    return name_mapping.get(name, name.replace('-', ' ').title())

def convert_csv_to_json():
    """Convert all CSV files in n8n-workflows folder to a single JSON file"""
    
    workflows_dir = Path('lib/n8n-workflows')
    output_file = workflows_dir / 'workflows.json'
    
    all_workflows = {}
    total_count = 0
    
    # Get all CSV files
    csv_files = sorted(workflows_dir.glob('*.csv'))
    
    print(f"Found {len(csv_files)} CSV files")
    
    for csv_file in csv_files:
        category_key = csv_file.stem
        category_name = clean_category_name(csv_file.name)
        
        workflows = []
        
        try:
            with open(csv_file, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                
                for row in reader:
                    # Skip empty rows
                    if not row.get('Name') or not row.get('Name').strip():
                        continue
                    
                    workflow = {
                        'name': row.get('Name', '').strip(),
                        'description': row.get('Description', '').strip(),
                        'link': row.get('Link', '').strip()
                    }
                    
                    # Only add if all fields are present
                    if workflow['name'] and workflow['description'] and workflow['link']:
                        workflows.append(workflow)
            
            if workflows:
                all_workflows[category_key] = {
                    'name': category_name,
                    'count': len(workflows),
                    'workflows': workflows
                }
                total_count += len(workflows)
                print(f"✓ {category_name}: {len(workflows)} workflows")
        
        except Exception as e:
            print(f"✗ Error processing {csv_file.name}: {str(e)}")
    
    # Write to JSON file
    output_data = {
        'total': total_count,
        'categories': all_workflows
    }
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)
    
    print(f"\n✓ Successfully converted {len(all_workflows)} categories with {total_count} total workflows")
    print(f"✓ Output saved to: {output_file}")

if __name__ == '__main__':
    os.chdir(Path(__file__).parent.parent)
    convert_csv_to_json()
