import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function cleanCategoryName(filename) {
  const name = filename.replace('.csv', '');
  
  const nameMapping = {
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
  };
  
  return nameMapping[name] || name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function parseCSV(csvText) {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    
    if (values.length === headers.length && values[0]) {
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index];
      });
      data.push(row);
    }
  }
  
  return data;
}

function convertCSVToJSON() {
  const workflowsDir = join(__dirname, '../lib/n8n-workflows');
  const outputFile = join(workflowsDir, 'workflows.json');
  
  const allWorkflows = {};
  let totalCount = 0;
  
  const files = readdirSync(workflowsDir).filter(f => f.endsWith('.csv')).sort();
  
  console.log(`Found ${files.length} CSV files`);
  
  files.forEach(file => {
    const categoryKey = file.replace('.csv', '');
    const categoryName = cleanCategoryName(file);
    
    try {
      const csvPath = join(workflowsDir, file);
      const csvContent = readFileSync(csvPath, 'utf-8');
      const rows = parseCSV(csvContent);
      
      const workflows = rows
        .filter(row => row.Name && row.Description && row.Link)
        .map(row => ({
          name: row.Name.trim(),
          description: row.Description.trim(),
          link: row.Link.trim()
        }))
        .filter(w => w.name && w.description && w.link);
      
      if (workflows.length > 0) {
        allWorkflows[categoryKey] = {
          name: categoryName,
          count: workflows.length,
          workflows
        };
        totalCount += workflows.length;
        console.log(`✓ ${categoryName}: ${workflows.length} workflows`);
      }
    } catch (error) {
      console.error(`✗ Error processing ${file}:`, error.message);
    }
  });
  
  const output = {
    total: totalCount,
    categories: allWorkflows
  };
  
  writeFileSync(outputFile, JSON.stringify(output, null, 2), 'utf-8');
  
  console.log(`\n✓ Successfully converted ${Object.keys(allWorkflows).length} categories with ${totalCount} total workflows`);
  console.log(`✓ Output saved to: ${outputFile}`);
}

convertCSVToJSON();
