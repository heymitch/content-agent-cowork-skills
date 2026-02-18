/**
 * Check GPTZero - AI Detection via GPTZero API
 *
 * This script sends content to GPTZero's API for external AI detection scoring.
 *
 * Usage:
 *   node scripts/check-gptzero.js <file-path>
 *
 * Example:
 *   node scripts/check-gptzero.js content/12-december-2025/02/ai-automation-linkedin.md
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configuration from environment
const GPTZERO_API_KEY = process.env.GPTZERO_API_KEY;
const GPTZERO_API_URL = 'https://api.gptzero.me/v2/predict/text';

/**
 * Parse frontmatter from markdown file
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) return { frontmatter: {}, body: content };

  const frontmatterStr = match[1];
  const body = content.slice(match[0].length).trim();

  const frontmatter = {};
  frontmatterStr.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      let value = valueParts.join(':').trim();
      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      frontmatter[key.trim()] = value;
    }
  });

  return { frontmatter, body };
}

/**
 * Extract just the content text (minimal cleanup, preserve structure)
 */
function extractContentText(body) {
  // Find where the metadata section starts (after the post content)
  const metadataStart = body.indexOf('\n---\n');
  const content = metadataStart > 0 ? body.slice(0, metadataStart) : body;

  return content
    .replace(/^#+ /gm, '')   // Remove header markers but keep text
    .replace(/\*\*/g, '')    // Remove bold markers
    .replace(/\*/g, '')      // Remove italic markers
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // Remove links, keep text
    .trim();
}

/**
 * Call GPTZero API
 */
async function checkGPTZero(content) {
  if (!GPTZERO_API_KEY) {
    throw new Error('GPTZERO_API_KEY not set in .env file. Get your API key at https://gptzero.me/');
  }

  const response = await fetch(GPTZERO_API_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': GPTZERO_API_KEY
    },
    body: JSON.stringify({
      document: content,
      version: '2025-11-28-base'  // Latest GPTZero model version
    })
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid GPTZero API key. Check GPTZERO_API_KEY in .env file.');
    }
    if (response.status === 429) {
      throw new Error('GPTZero rate limit exceeded. Try again in a minute.');
    }
    if (response.status === 400) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`GPTZero API error: ${errorData.message || 'Invalid request'}`);
    }
    throw new Error(`GPTZero API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Update frontmatter in file with GPTZero score
 */
function updateFileWithScore(filePath, score) {
  let content = fs.readFileSync(filePath, 'utf8');
  const { frontmatter, body } = parseFrontmatter(content);

  // Update frontmatter
  frontmatter.gptzero_score = Math.round(score).toString();

  // Rebuild frontmatter
  const newFrontmatter = Object.entries(frontmatter)
    .map(([key, value]) => {
      // Don't quote booleans or nulls
      if (value === 'true' || value === 'false' || value === 'null') {
        return `${key}: ${value}`;
      }
      return `${key}: "${value}"`;
    })
    .join('\n');

  const newContent = `---\n${newFrontmatter}\n---\n\n${body}`;

  fs.writeFileSync(filePath, newContent);
}

/**
 * Display human-readable report
 */
function displayReport(data, score) {
  console.log('\n' + '='.repeat(60));
  console.log('GPTZero AI Detection Report');
  console.log('='.repeat(60));

  console.log(`\n📊 Overall AI Probability: ${score}%`);

  // Interpret score
  let interpretation = '';
  let recommendation = '';

  if (score >= 90) {
    interpretation = '🚨 Very High - Content appears AI-generated';
    recommendation = 'Strongly recommend rewriting with more human voice';
  } else if (score >= 70) {
    interpretation = '⚠️  High - Likely contains AI patterns';
    recommendation = 'Run /quality:ai-hunter for specific fixes';
  } else if (score >= 50) {
    interpretation = '⚡ Medium - Some AI patterns detected';
    recommendation = 'Review and polish before publishing';
  } else if (score >= 30) {
    interpretation = '✓ Low - Mostly human-like';
    recommendation = 'Good to go with minor review';
  } else {
    interpretation = '✅ Very Low - Appears human-written';
    recommendation = 'Passes AI detection';
  }

  console.log(`\n${interpretation}`);
  console.log(`\n💡 Recommendation: ${recommendation}`);

  // Additional metrics if available
  if (data.documents && data.documents[0]) {
    const doc = data.documents[0];

    if (doc.completely_generated_prob !== undefined) {
      const completelyGenerated = Math.round(doc.completely_generated_prob * 100);
      console.log(`\n📈 Completely Generated Probability: ${completelyGenerated}%`);
    }

    if (doc.overall_burstiness !== undefined) {
      console.log(`\n🔥 Burstiness Score: ${doc.overall_burstiness.toFixed(1)}`);
      console.log('   (Higher = more variation in sentence structure)');
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n✓ Score saved to frontmatter: gptzero_score: ' + score);
  console.log('\nNext steps:');
  console.log('  1. Run /quality:ai-hunter for detailed pattern analysis');
  console.log('  2. Run /quality:fix-ai-patterns to apply fixes');
  console.log('  3. Re-run GPTZero check to verify improvements');
  console.log('='.repeat(60) + '\n');
}

/**
 * Main function
 */
async function main() {
  const [,, filePath] = process.argv;

  if (!filePath) {
    console.error('Usage: node check-gptzero.js <file-path>');
    console.error('Example: node check-gptzero.js content/12-december-2025/02/post.md');
    process.exit(1);
  }

  // Read and parse the content file
  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`Error: File not found: ${absolutePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(absolutePath, 'utf8');
  const { body } = parseFrontmatter(content);
  const contentText = extractContentText(body);

  if (!contentText || contentText.length < 50) {
    console.error('Error: Content too short (minimum 50 characters required)');
    process.exit(1);
  }

  try {
    console.log('Sending content to GPTZero API...');
    console.log(`Content length: ${contentText.length} characters`);

    const data = await checkGPTZero(contentText);

    // Extract average generated probability (0-1 scale) and convert to 0-100
    const avgGenProb = data.documents?.[0]?.average_generated_prob || 0;
    const score = Math.round(avgGenProb * 100);

    // Update file
    updateFileWithScore(absolutePath, score);

    // Display report
    displayReport(data, score);

  } catch (error) {
    console.error('\n❌ GPTZero check failed:', error.message);

    if (error.message.includes('API key')) {
      console.error('\nSetup instructions:');
      console.error('  1. Sign up at https://gptzero.me/');
      console.error('  2. Get your API key from the dashboard');
      console.error('  3. Add to .env file: GPTZERO_API_KEY=your-key-here');
    }

    process.exit(1);
  }
}

main();
