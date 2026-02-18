#!/usr/bin/env node

/**
 * Meme Generator Script
 * Uses Imgflip API to generate memes
 *
 * Usage:
 *   node scripts/generate-meme.js --list                    # List popular templates
 *   node scripts/generate-meme.js --template "Drake" --top "Old way" --bottom "New way"
 *   node scripts/generate-meme.js --id 181913649 --top "Text" --bottom "More text"
 *   node scripts/generate-meme.js --search "distracted"     # Search templates (requires premium)
 *
 * Environment:
 *   IMGFLIP_USERNAME - Imgflip account username (optional for basic use)
 *   IMGFLIP_PASSWORD - Imgflip account password (optional for basic use)
 */

import https from 'https';
import fs from 'fs';
import path from 'path';

const API_BASE = 'https://api.imgflip.com';

// Popular meme templates with their IDs (cached for quick access)
const POPULAR_TEMPLATES = {
  'drake': 181913649,
  'distracted boyfriend': 112126428,
  'two buttons': 87743020,
  'change my mind': 129242436,
  'expanding brain': 93895088,
  'is this a pigeon': 100777631,
  'surprised pikachu': 155067746,
  'always has been': 252600902,
  'uno draw 25': 217743513,
  'woman yelling at cat': 188390779,
  'bernie sanders': 222403160,
  'disaster girl': 97984,
  'one does not simply': 61579,
  'batman slapping robin': 438680,
  'waiting skeleton': 4087833,
  'hide the pain harold': 27813981,
  'roll safe': 89370399,
  'success kid': 61544,
  'ancient aliens': 101470,
  'futurama fry': 61520
};

async function httpRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    });
    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function getMemes() {
  const response = await httpRequest(`${API_BASE}/get_memes`);
  if (response.success) {
    return response.data.memes;
  }
  throw new Error(response.error_message || 'Failed to get memes');
}

async function captionImage(templateId, topText, bottomText, boxes = null) {
  const username = process.env.IMGFLIP_USERNAME;
  const password = process.env.IMGFLIP_PASSWORD;

  if (!username || !password) {
    throw new Error(
      'IMGFLIP_USERNAME and IMGFLIP_PASSWORD required.\n' +
      '  1. Create free account at https://imgflip.com/signup\n' +
      '  2. Add to .env:\n' +
      '     IMGFLIP_USERNAME=your_username\n' +
      '     IMGFLIP_PASSWORD=your_password'
    );
  }

  const params = new URLSearchParams({
    template_id: templateId,
    username: username,
    password: password
  });

  if (boxes) {
    // Advanced: multiple text boxes
    boxes.forEach((box, i) => {
      params.append(`boxes[${i}][text]`, box.text);
      if (box.x !== undefined) params.append(`boxes[${i}][x]`, box.x);
      if (box.y !== undefined) params.append(`boxes[${i}][y]`, box.y);
      if (box.width !== undefined) params.append(`boxes[${i}][width]`, box.width);
      if (box.height !== undefined) params.append(`boxes[${i}][height]`, box.height);
      if (box.color) params.append(`boxes[${i}][color]`, box.color);
      if (box.outline_color) params.append(`boxes[${i}][outline_color]`, box.outline_color);
    });
  } else {
    // Simple: top and bottom text
    params.append('text0', topText || '');
    params.append('text1', bottomText || '');
  }

  const response = await httpRequest(`${API_BASE}/caption_image`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  if (response.success) {
    return response.data;
  }
  throw new Error(response.error_message || 'Failed to create meme');
}

async function searchMemes(query) {
  const username = process.env.IMGFLIP_USERNAME;
  const password = process.env.IMGFLIP_PASSWORD;

  if (!username || !password) {
    throw new Error('IMGFLIP_USERNAME and IMGFLIP_PASSWORD required for search (premium feature)');
  }

  const params = new URLSearchParams({
    query: query,
    username: username,
    password: password
  });

  const response = await httpRequest(`${API_BASE}/search_memes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  if (response.success) {
    return response.data.memes;
  }
  throw new Error(response.error_message || 'Failed to search memes');
}

async function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(outputPath);
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

function findTemplateId(name) {
  const lower = name.toLowerCase();

  // Check cached popular templates first
  if (POPULAR_TEMPLATES[lower]) {
    return POPULAR_TEMPLATES[lower];
  }

  // Fuzzy match
  for (const [key, id] of Object.entries(POPULAR_TEMPLATES)) {
    if (key.includes(lower) || lower.includes(key)) {
      return id;
    }
  }

  return null;
}

async function listTemplates() {
  console.log('\n📋 Popular Meme Templates:\n');
  console.log('Cached (instant):');
  for (const [name, id] of Object.entries(POPULAR_TEMPLATES)) {
    console.log(`  • ${name.padEnd(25)} (ID: ${id})`);
  }

  console.log('\nFetching full list from API...\n');
  const memes = await getMemes();

  console.log('Top 50 from Imgflip:');
  memes.slice(0, 50).forEach((meme, i) => {
    console.log(`  ${(i + 1).toString().padStart(2)}. ${meme.name.padEnd(35)} (ID: ${meme.id}, boxes: ${meme.box_count})`);
  });
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h') || args.length === 0) {
    console.log(`
Meme Generator - Imgflip API Integration

Usage:
  node scripts/generate-meme.js --list
  node scripts/generate-meme.js --template "drake" --top "Old way" --bottom "New way"
  node scripts/generate-meme.js --id 181913649 --top "Text" --bottom "More text"
  node scripts/generate-meme.js --search "distracted" (requires premium)

Options:
  --list              List popular meme templates
  --template, -t      Template name (fuzzy matched)
  --id                Template ID (exact)
  --top               Top text
  --bottom            Bottom text
  --search            Search templates (premium)
  --output, -o        Output file path (optional, downloads image)
  --json              Output as JSON

Environment:
  IMGFLIP_USERNAME    Account username (optional for basic, required for premium)
  IMGFLIP_PASSWORD    Account password

Examples:
  node scripts/generate-meme.js --template "drake" --top "Writing prompts manually" --bottom "Using AI agents"
  node scripts/generate-meme.js -t "change my mind" --top "Memes are valid business content"
`);
    return;
  }

  if (args.includes('--list')) {
    await listTemplates();
    return;
  }

  if (args.includes('--search')) {
    const searchIdx = args.indexOf('--search');
    const query = args[searchIdx + 1];
    if (!query) {
      console.error('Error: --search requires a query');
      process.exit(1);
    }

    try {
      const results = await searchMemes(query);
      console.log(`\n🔍 Search results for "${query}":\n`);
      results.slice(0, 20).forEach((meme, i) => {
        console.log(`  ${(i + 1).toString().padStart(2)}. ${meme.name.padEnd(35)} (ID: ${meme.id})`);
      });
    } catch (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
    return;
  }

  // Get template ID
  let templateId = null;

  const idIdx = args.indexOf('--id');
  if (idIdx !== -1 && args[idIdx + 1]) {
    templateId = args[idIdx + 1];
  }

  const templateIdx = args.findIndex(a => a === '--template' || a === '-t');
  if (templateIdx !== -1 && args[templateIdx + 1]) {
    const templateName = args[templateIdx + 1];
    templateId = findTemplateId(templateName);

    if (!templateId) {
      // Try to find in API list
      console.log(`Looking up "${templateName}" in API...`);
      const memes = await getMemes();
      const match = memes.find(m =>
        m.name.toLowerCase().includes(templateName.toLowerCase())
      );
      if (match) {
        templateId = match.id;
        console.log(`Found: ${match.name} (ID: ${match.id})`);
      } else {
        console.error(`Error: Template "${templateName}" not found`);
        console.log('Use --list to see available templates');
        process.exit(1);
      }
    }
  }

  if (!templateId) {
    console.error('Error: Must specify --template or --id');
    process.exit(1);
  }

  // Get text
  const topIdx = args.indexOf('--top');
  const bottomIdx = args.indexOf('--bottom');
  const topText = topIdx !== -1 ? args[topIdx + 1] : '';
  const bottomText = bottomIdx !== -1 ? args[bottomIdx + 1] : '';

  if (!topText && !bottomText) {
    console.error('Error: Must provide --top and/or --bottom text');
    process.exit(1);
  }

  // Generate meme
  try {
    console.log(`\n🎨 Generating meme...`);
    const result = await captionImage(templateId, topText, bottomText);

    const jsonOutput = args.includes('--json');

    if (jsonOutput) {
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log(`\n✅ Meme created!`);
      console.log(`   URL: ${result.url}`);
      console.log(`   Page: ${result.page_url}`);
    }

    // Download if output specified
    const outputIdx = args.findIndex(a => a === '--output' || a === '-o');
    if (outputIdx !== -1 && args[outputIdx + 1]) {
      const outputPath = args[outputIdx + 1];
      console.log(`\n📥 Downloading to ${outputPath}...`);
      await downloadImage(result.url, outputPath);
      console.log(`   Saved!`);
    }

    return result;
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

// Export for use as module
export { getMemes, captionImage, searchMemes, downloadImage, findTemplateId, POPULAR_TEMPLATES };

main().catch(console.error);
