#!/usr/bin/env node

/**
 * StealthGPT Humanizer - Pass AI content through StealthGPT
 *
 * Usage:
 *   node scripts/humanize-stealthgpt.js <file-path> [options]
 *
 * Options:
 *   --tone      Standard|HighSchool|College|PhD (default: Standard)
 *   --mode      High|Medium|Low (default: High)
 *   --business  Use 10x more powerful model (costs more credits)
 *   --preview   Show preview only, don't update file
 *
 * Examples:
 *   node scripts/humanize-stealthgpt.js content/post.md
 *   node scripts/humanize-stealthgpt.js content/post.md --tone College --mode High
 *   node scripts/humanize-stealthgpt.js content/post.md --business
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config();

const STEALTHGPT_API_KEY = process.env.STEALTHGPT_API_KEY;
const STEALTHGPT_API_URL = 'https://stealthgpt.ai/api/stealthify';

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
 * Extract content text (preserve structure)
 */
function extractContentText(body) {
  const metadataStart = body.indexOf('\n---\n');
  const content = metadataStart > 0 ? body.slice(0, metadataStart) : body;
  return content.trim();
}

/**
 * Call StealthGPT API
 */
async function callStealthGPT(text, options = {}) {
  if (!STEALTHGPT_API_KEY) {
    throw new Error('STEALTHGPT_API_KEY not set in .env file');
  }

  const {
    tone = 'Standard',
    mode = 'High',
    business = false
  } = options;

  const payload = {
    prompt: text,
    rephrase: true,
    tone,
    mode,
    business,
    isMultilingual: true
  };

  const response = await fetch(STEALTHGPT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-token': STEALTHGPT_API_KEY
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('StealthGPT: Invalid API key. Check STEALTHGPT_API_KEY in .env');
    }
    if (response.status === 402) {
      throw new Error('StealthGPT: Insufficient credits. Add more at https://stealthgpt.ai/');
    }
    const errorText = await response.text();
    throw new Error(`StealthGPT: HTTP ${response.status} - ${errorText}`);
  }

  return await response.json();
}

/**
 * Update file with humanized content
 */
function updateFileWithHumanized(filePath, originalBody, humanizedText, frontmatter, detectionScore) {
  frontmatter.humanized_by = 'stealthgpt';
  frontmatter.humanized_at = new Date().toISOString().split('T')[0];
  if (detectionScore !== undefined) {
    frontmatter.stealthgpt_score = detectionScore.toString();
  }

  const newFrontmatter = Object.entries(frontmatter)
    .map(([key, value]) => {
      if (value === 'true' || value === 'false' || value === 'null' || value === '') {
        return `${key}: ${value}`;
      }
      return `${key}: "${value}"`;
    })
    .join('\n');

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
function displayReport(original, humanized, options, apiResponse, previewOnly = false) {
  console.log('\n' + '='.repeat(60));
  console.log('StealthGPT Humanization Report');
  console.log('='.repeat(60));

  console.log(`\n⚙️  Tone: ${options.tone}`);
  console.log(`📊 Mode: ${options.mode}`);
  console.log(`💼 Business model: ${options.business ? 'ON' : 'OFF'}`);

  console.log(`\n📝 Original: ${original.length} chars`);
  console.log(`📝 Humanized: ${humanized.length} chars`);

  const changePercent = Math.round(Math.abs(humanized.length - original.length) / original.length * 100);
  console.log(`📈 Length change: ${changePercent}%`);

  if (apiResponse.howLikelyToBeDetected !== undefined) {
    const humanScore = apiResponse.howLikelyToBeDetected;
    console.log(`\n🎯 StealthGPT confidence: ${humanScore}% likely to pass detection`);
  }

  if (apiResponse.wordsSpent !== undefined) {
    console.log(`💰 Words spent: ${apiResponse.wordsSpent}`);
  }
  if (apiResponse.remainingCredits !== undefined) {
    console.log(`💳 Remaining credits: ${apiResponse.remainingCredits}`);
  }

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
StealthGPT Humanizer - Bypass AI detection

Usage:
  node scripts/humanize-stealthgpt.js <file-path> [options]

Options:
  --tone      Standard|HighSchool|College|PhD (default: Standard)
  --mode      High|Medium|Low (default: High)
  --business  Use 10x more powerful model (costs more)
  --preview   Show preview only, don't update file

Examples:
  node scripts/humanize-stealthgpt.js content/post.md
  node scripts/humanize-stealthgpt.js content/post.md --tone College
  node scripts/humanize-stealthgpt.js content/post.md --business --preview
`);
    process.exit(0);
  }

  const filePath = args[0];
  const previewOnly = args.includes('--preview');
  const useBusiness = args.includes('--business');

  const toneIndex = args.indexOf('--tone');
  const modeIndex = args.indexOf('--mode');

  const options = {
    tone: toneIndex > -1 && args[toneIndex + 1] ? args[toneIndex + 1] : 'Standard',
    mode: modeIndex > -1 && args[modeIndex + 1] ? args[modeIndex + 1] : 'High',
    business: useBusiness
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
    console.error('Error: Content too short (minimum 50 characters)');
    process.exit(1);
  }

  try {
    console.log(`\nSending to StealthGPT (mode: ${options.mode}, tone: ${options.tone})...`);
    console.log(`Content: ${contentText.length} chars`);

    const result = await callStealthGPT(contentText, options);

    const humanizedText = result.result;

    if (!humanizedText) {
      console.log('API Response:', JSON.stringify(result, null, 2));
      throw new Error('Could not extract humanized text from response');
    }

    if (!previewOnly) {
      updateFileWithHumanized(absolutePath, body, humanizedText, frontmatter, result.howLikelyToBeDetected);
    }

    displayReport(contentText, humanizedText, options, result, previewOnly);

  } catch (error) {
    console.error('\n❌ Humanization failed:', error.message);

    if (error.message.includes('API key') || error.message.includes('STEALTHGPT_API_KEY')) {
      console.error('\nSetup:');
      console.error('  1. Get API key from https://stealthgpt.ai/');
      console.error('  2. Add to .env: STEALTHGPT_API_KEY=your-key');
    }

    process.exit(1);
  }
}

main();