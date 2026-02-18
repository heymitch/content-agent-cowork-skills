#!/usr/bin/env node

/**
 * Ryne AI Humanizer - Pass AI content through Ryne AI humanization
 *
 * Usage:
 *   node scripts/humanize-ryne.js <file-path> [options]
 *
 * Options:
 *   --tone        professional|casual|friendly|academic (default: professional)
 *   --purpose     linkedin|twitter|email|blog|general (default: linkedin)
 *   --stealth     Enable restructure mode for maximum AI bypass (default: true)
 *   --no-stealth  Disable restructure mode
 *   --preview     Show preview only, don't update file
 *
 * Examples:
 *   node scripts/humanize-ryne.js content/post.md
 *   node scripts/humanize-ryne.js content/post.md --tone casual --purpose twitter
 *   node scripts/humanize-ryne.js content/post.md --stealth --preview
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config();

const RYNE_API_KEY = process.env.RYNE_AI_API_KEY;
const RYNE_API_URL = 'https://ryne.ai/api/humanizer/models/supernova';

/**
 * Parse frontmatter from markdown file
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) return { frontmatter: {}, body: content, raw: '' };

  const frontmatterStr = match[1];
  const body = content.slice(match[0].length).trim();

  const frontmatter = {};
  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      frontmatter[key] = value;
    }
  });

  return { frontmatter, body, raw: match[0] };
}

/**
 * Extract just the content text (preserve some structure for humanization)
 */
function extractContentText(body) {
  // Find where trailing metadata section starts (if any)
  const metadataStart = body.indexOf('\n---\n');
  const content = metadataStart > 0 ? body.slice(0, metadataStart) : body;
  return content.trim();
}

/**
 * Call Ryne AI API
 */
async function callRyneAPI(text, options = {}) {
  if (!RYNE_API_KEY) {
    throw new Error('RYNE_AI_API_KEY not set in .env file');
  }

  const {
    tone = 'professional',
    purpose = 'linkedin',
    enableRestructure = true,
    keepMarkdown = true
  } = options;

  const payload = {
    text,
    tone,
    purpose,
    language: 'english',
    beast_mode: true,
    shouldStream: false,  // We want the full response
    keepMarkdown,
    user_id: RYNE_API_KEY,  // Using API key as user_id
    enableRestructure,
    settings: {
      preserveQuotes: true,
      synonymVariation: 0.7,
      formalityLevel: tone === 'professional' ? 0.8 : 0.5,
      toneConsistency: 0.9,
      preserveFormatting: true,
      maxLengthVariation: 0.15
    }
  };

  const response = await fetch(RYNE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${RYNE_API_KEY}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    if (response.status === 403) {
      const errorData = await response.json().catch(() => ({}));
      if (errorData.error === 'INSUFFICIENT_COINS') {
        throw new Error('Ryne AI: Insufficient balance. Please add credits at https://ryne.ai/');
      }
      throw new Error(`Ryne AI: Access forbidden - check API key`);
    }
    if (response.status === 401) {
      throw new Error('Ryne AI: Invalid API key. Check RYNE_AI_API_KEY in .env');
    }
    if (response.status === 400) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Ryne AI: Bad request - ${JSON.stringify(errorData)}`);
    }
    throw new Error(`Ryne AI: HTTP ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Update file with humanized content
 */
function updateFileWithHumanized(filePath, originalBody, humanizedText, frontmatter) {
  // Add humanization metadata
  frontmatter.humanized_by = 'ryne-ai';
  frontmatter.humanized_at = new Date().toISOString().split('T')[0];

  // Rebuild frontmatter
  const newFrontmatter = Object.entries(frontmatter)
    .map(([key, value]) => {
      if (value === 'true' || value === 'false' || value === 'null' || value === '') {
        return `${key}: ${value}`;
      }
      return `${key}: "${value}"`;
    })
    .join('\n');

  // Preserve any trailing metadata section
  const metadataStart = originalBody.indexOf('\n---\n');
  let newBody;

  if (metadataStart > 0) {
    const trailingMetadata = originalBody.slice(metadataStart);
    newBody = humanizedText + trailingMetadata;
  } else {
    newBody = humanizedText;
  }

  const newContent = `---\n${newFrontmatter}\n---\n\n${newBody}`;
  fs.writeFileSync(filePath, newContent);
}

/**
 * Display report
 */
function displayReport(original, humanized, options, previewOnly = false) {
  console.log('\n' + '='.repeat(60));
  console.log('Ryne AI Humanization Report');
  console.log('='.repeat(60));

  console.log(`\n⚙️  Tone: ${options.tone}`);
  console.log(`📋 Purpose: ${options.purpose}`);
  console.log(`🔒 Stealth mode: ${options.enableRestructure ? 'ON' : 'OFF'}`);
  console.log(`\n📊 Original: ${original.length} chars`);
  console.log(`📊 Humanized: ${humanized.length} chars`);

  const changePercent = Math.round(Math.abs(humanized.length - original.length) / original.length * 100);
  console.log(`📈 Length change: ${changePercent}%`);

  console.log('\n' + '-'.repeat(60));
  console.log('HUMANIZED CONTENT:');
  console.log('-'.repeat(60));
  console.log(humanized);
  console.log('-'.repeat(60));

  if (previewOnly) {
    console.log('\n⚠️  PREVIEW MODE - File not updated');
    console.log('Remove --preview flag to save changes');
  } else {
    console.log('\n✓ File updated with humanized content');
  }

  console.log('\nNext steps:');
  console.log('  1. Run: node scripts/check-gptzero.js <file>');
  console.log('  2. Review content for accuracy');
  console.log('='.repeat(60) + '\n');
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(`
Ryne AI Humanizer - Reduce AI detection in content

Usage:
  node scripts/humanize-ryne.js <file-path> [options]

Options:
  --tone        professional|casual|friendly|academic (default: professional)
  --purpose     linkedin|twitter|email|blog|general (default: linkedin)
  --stealth     Enable restructure for max AI bypass (default: ON)
  --no-stealth  Disable restructure mode
  --preview     Show preview only, don't update file

Examples:
  node scripts/humanize-ryne.js content/post.md
  node scripts/humanize-ryne.js content/post.md --tone casual --purpose twitter
  node scripts/humanize-ryne.js content/post.md --preview
`);
    process.exit(0);
  }

  const filePath = args[0];

  // Parse options
  const toneIndex = args.indexOf('--tone');
  const purposeIndex = args.indexOf('--purpose');
  const previewOnly = args.includes('--preview');
  const enableRestructure = !args.includes('--no-stealth');

  const options = {
    tone: toneIndex > -1 && args[toneIndex + 1] ? args[toneIndex + 1] : 'professional',
    purpose: purposeIndex > -1 && args[purposeIndex + 1] ? args[purposeIndex + 1] : 'linkedin',
    enableRestructure,
    keepMarkdown: true
  };

  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`Error: File not found: ${absolutePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(absolutePath, 'utf8');
  const { frontmatter, body } = parseFrontmatter(content);
  const contentText = extractContentText(body);

  if (!contentText || contentText.length < 50) {
    console.error('Error: Content too short (minimum 50 characters required)');
    process.exit(1);
  }

  try {
    console.log(`\nSending to Ryne AI (stealth: ${enableRestructure ? 'ON' : 'OFF'})...`);
    console.log(`Content: ${contentText.length} chars`);

    const result = await callRyneAPI(contentText, options);

    // Extract humanized text from response
    const humanizedText = result.content || result.text || result.humanized || result.output;

    if (!humanizedText) {
      console.log('API Response:', JSON.stringify(result, null, 2));
      throw new Error('Could not extract humanized text from response');
    }

    // Update file unless preview mode
    if (!previewOnly) {
      updateFileWithHumanized(absolutePath, body, humanizedText, frontmatter);
    }

    // Display report
    displayReport(contentText, humanizedText, options, previewOnly);

  } catch (error) {
    console.error('\n❌ Humanization failed:', error.message);

    if (error.message.includes('API key') || error.message.includes('RYNE_AI_API_KEY')) {
      console.error('\nSetup:');
      console.error('  1. Get API key from https://ryne.ai/');
      console.error('  2. Add to .env: RYNE_AI_API_KEY=your-key');
    }

    process.exit(1);
  }
}

main();
