#!/usr/bin/env node

/**
 * Gamma API - Generate carousels, presentations, and documents
 *
 * Usage:
 *   node scripts/gamma-generate.js "Your content/prompt here" [options]
 *
 * Options:
 *   --format      presentation|document|social|webpage (default: social)
 *   --cards       Number of cards/slides (default: 5 for social, 10 for presentation)
 *   --tone        professional|casual|academic|friendly (default: professional)
 *   --export      pdf|pptx (optional, triggers export)
 *   --theme       Theme ID (optional)
 *
 * Examples:
 *   node scripts/gamma-generate.js "5 tips for LinkedIn engagement" --format social --cards 5
 *   node scripts/gamma-generate.js "Q4 Sales Report" --format presentation --export pptx
 */

require('dotenv').config();

const GAMMA_API_KEY = process.env.GAMMA_API_KEY;
const BASE_URL = 'https://public-api.gamma.app/v1.0';

async function createGeneration(inputText, options = {}) {
  const {
    format = 'social',
    numCards = format === 'social' ? 5 : 10,
    tone = 'professional',
    exportAs = null,
    themeId = null,
    additionalInstructions = null
  } = options;

  const payload = {
    inputText,
    textMode: 'generate',
    format,
    numCards,
    textOptions: {
      tone,
      audience: 'general'
    },
    imageOptions: {
      source: 'aiGenerated'
    }
  };

  if (themeId) payload.themeId = themeId;
  if (exportAs) payload.exportAs = exportAs;
  if (additionalInstructions) payload.additionalInstructions = additionalInstructions;

  // For social format, optimize for carousel
  if (format === 'social') {
    payload.cardOptions = {
      dimensions: '1x1' // Square for Instagram/LinkedIn carousels
    };
  }

  const response = await fetch(`${BASE_URL}/generations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': GAMMA_API_KEY
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gamma API error: ${response.status} - ${error}`);
  }

  return response.json();
}

async function checkStatus(generationId) {
  const response = await fetch(`${BASE_URL}/generations/${generationId}`, {
    headers: {
      'X-API-KEY': GAMMA_API_KEY
    }
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Status check error: ${response.status} - ${error}`);
  }

  return response.json();
}

async function waitForCompletion(generationId, maxWaitMs = 120000) {
  const startTime = Date.now();
  const pollInterval = 3000; // 3 seconds

  while (Date.now() - startTime < maxWaitMs) {
    const status = await checkStatus(generationId);

    if (status.status === 'completed') {
      return status;
    }

    if (status.status === 'failed') {
      throw new Error(`Generation failed: ${JSON.stringify(status)}`);
    }

    console.log(`Status: ${status.status}... waiting`);
    await new Promise(resolve => setTimeout(resolve, pollInterval));
  }

  throw new Error('Generation timed out');
}

async function main() {
  if (!GAMMA_API_KEY) {
    console.error('Error: GAMMA_API_KEY not set in .env');
    console.error('Get your API key at: gamma.app > Account Settings > API');
    process.exit(1);
  }

  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help') {
    console.log(`
Gamma Generate - Create carousels and presentations

Usage:
  node scripts/gamma-generate.js "Your content" [options]

Options:
  --format     social|presentation|document|webpage (default: social)
  --cards      Number of slides (default: 5 for social, 10 for presentation)
  --tone       professional|casual|academic|friendly
  --export     pdf|pptx (triggers file export)
  --theme      Theme ID from Gamma

Examples:
  node scripts/gamma-generate.js "5 tips for LinkedIn" --format social
  node scripts/gamma-generate.js "Quarterly report data" --format presentation --export pdf
    `);
    process.exit(0);
  }

  // Parse arguments
  const inputText = args[0];
  const options = {};

  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--format' && args[i + 1]) {
      options.format = args[++i];
    } else if (args[i] === '--cards' && args[i + 1]) {
      options.numCards = parseInt(args[++i]);
    } else if (args[i] === '--tone' && args[i + 1]) {
      options.tone = args[++i];
    } else if (args[i] === '--export' && args[i + 1]) {
      options.exportAs = args[++i];
    } else if (args[i] === '--theme' && args[i + 1]) {
      options.themeId = args[++i];
    }
  }

  console.log('Creating Gamma generation...');
  console.log(`Format: ${options.format || 'social'}`);
  console.log(`Cards: ${options.numCards || (options.format === 'social' ? 5 : 10)}`);

  try {
    const { generationId } = await createGeneration(inputText, options);
    console.log(`Generation ID: ${generationId}`);
    console.log('Waiting for completion...');

    const result = await waitForCompletion(generationId);

    console.log('\n✓ Generation complete!');
    console.log(`URL: ${result.gammaUrl}`);
    console.log(`Credits used: ${result.credits?.deducted || 'N/A'}`);
    console.log(`Credits remaining: ${result.credits?.remaining || 'N/A'}`);

    if (result.exportUrl) {
      console.log(`Export URL: ${result.exportUrl}`);
    }

    // Return URL for use in other scripts
    return result.gammaUrl;

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
