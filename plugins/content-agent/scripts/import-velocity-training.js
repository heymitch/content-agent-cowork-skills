#!/usr/bin/env node

/**
 * Import training content from Velocity-Agent
 *
 * Usage:
 *   node scripts/import-velocity-training.js [--dry-run] [--limit=N] [--all] [--skip-existing]
 *
 * Options:
 *   --dry-run        Preview what would be imported without writing files
 *   --limit=N        Only import first N files (for testing)
 *   --all            Import ALL posts (not just Proven ones)
 *   --skip-existing  Skip files that already exist
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SOURCE_DIR = '/Users/heymitch/Code/Cursor/Velocity-Agent/domains/offer-creation/training-socials/Private & Shared 3';
const CSV_FILE = path.join(SOURCE_DIR, 'Master Content Table + Pipeline add434b09ee548dd9713d26ec38cee2a_all.csv');
const MD_DIR = path.join(SOURCE_DIR, 'Master Content Table + Pipeline add434b09ee548dd9713d26ec38cee2a');
const TARGET_DIR = '/Users/heymitch/content-agent-notion/training/examples';

// Parse command line args
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const IMPORT_ALL = args.includes('--all');
const SKIP_EXISTING = args.includes('--skip-existing');
const LIMIT = args.find(a => a.startsWith('--limit='))?.split('=')[1] || null;

// Simple CSV parser that handles quoted fields
function parseCSV(content) {
  const lines = content.split('\n');
  const headers = parseCSVLine(lines[0]);
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = parseCSVLine(lines[i]);
    const row = {};
    headers.forEach((h, idx) => {
      row[h.trim()] = values[idx]?.trim() || '';
    });
    rows.push(row);
  }
  return rows;
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

// Find markdown file matching a title
function findMdFile(title) {
  if (!fs.existsSync(MD_DIR)) return null;

  const files = fs.readdirSync(MD_DIR);

  // Clean title for matching
  const cleanTitle = title.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  for (const file of files) {
    if (!file.endsWith('.md')) continue;

    const cleanFile = file.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .replace(/md$/, '')
      .trim();

    // Check if title is contained in filename (Notion adds UUID suffix)
    if (cleanFile.includes(cleanTitle.slice(0, 30)) ||
        cleanTitle.includes(cleanFile.slice(0, 30))) {
      return path.join(MD_DIR, file);
    }
  }
  return null;
}

// Extract content from markdown file
function extractContent(mdPath, platform) {
  const content = fs.readFileSync(mdPath, 'utf-8');
  const result = {
    hook: '',
    body: '',
    fullContent: ''
  };

  // Platform-specific markers (case-insensitive, handles ## and ###)
  const platformMarkers = {
    'LinkedIn': ['linkedin copy', 'post copy', 'deck copy', 'long-form copy'],
    'X': ['x copy', 'post hook', 'thread copy', 'long-form copy', 'atomic essay'],
    'Twitter': ['x copy', 'post hook', 'thread copy', 'long-form copy', 'atomic essay']
  };

  const markers = platformMarkers[platform] || platformMarkers['LinkedIn'];
  const lines = content.split('\n');
  const codeBlocks = [];

  // First pass: extract ALL code blocks with their context
  let inCodeBlock = false;
  let currentBlock = '';
  let blockContext = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Track context (headers and labels before code blocks)
    if (line.match(/^#{1,3}\s/) || line.match(/^(Post|Hook|Copy|CTA|Thread)/i)) {
      blockContext = line.toLowerCase();
    }

    if (line.startsWith('```') && !inCodeBlock) {
      inCodeBlock = true;
      currentBlock = '';
    } else if (line.startsWith('```') && inCodeBlock) {
      inCodeBlock = false;
      if (currentBlock.trim() && currentBlock.trim().length > 20) {
        codeBlocks.push({
          content: currentBlock.trim(),
          context: blockContext,
          index: i
        });
      }
    } else if (inCodeBlock) {
      currentBlock += line + '\n';
    }
  }

  // Second pass: find best matching code block for platform
  let bestBlock = null;

  // Priority 1: Block after a platform-specific marker
  for (const block of codeBlocks) {
    for (const marker of markers) {
      if (block.context.includes(marker)) {
        // Skip CTA/promo blocks
        if (block.context.includes('cta') ||
            block.content.toLowerCase().includes('free email course') ||
            block.content.toLowerCase().includes('download it here')) {
          continue;
        }
        bestBlock = block;
        break;
      }
    }
    if (bestBlock) break;
  }

  // Priority 2: First substantial code block that's not a promo
  if (!bestBlock) {
    for (const block of codeBlocks) {
      const lower = block.content.toLowerCase();
      // Skip promotional content
      if (lower.includes('free email course') ||
          lower.includes('download it here') ||
          lower.includes('startwritingonline.com') ||
          lower.includes('sign up') ||
          block.content.length < 50) {
        continue;
      }
      bestBlock = block;
      break;
    }
  }

  // Priority 3: Any code block with substantial content
  if (!bestBlock && codeBlocks.length > 0) {
    const substantial = codeBlocks.filter(b => b.content.length > 100);
    if (substantial.length > 0) {
      bestBlock = substantial[0];
    }
  }

  if (bestBlock) {
    result.fullContent = bestBlock.content;
    const contentLines = bestBlock.content.split('\n').filter(l => l.trim());
    result.hook = contentLines[0] || '';
    result.body = contentLines.slice(1).join('\n');
  }

  return result;
}

// Auto-generate tags from content
function generateTags(content, contentType, category) {
  const tags = [];
  const text = content.fullContent.toLowerCase();
  const hook = content.hook.toLowerCase();

  // Hook type detection
  if (hook.match(/^\d+|I (wrote|spent|made|built|grew)/i)) {
    tags.push('hook-number');
  }
  if (hook.includes('?')) {
    tags.push('hook-question');
  }
  if (hook.match(/^(most|everyone|nobody|the (truth|problem|reality))/i)) {
    tags.push('hook-contrarian');
  }
  if (hook.match(/^(I'm|I was|last|yesterday|today)/i)) {
    tags.push('hook-story');
  }

  // Structure detection
  if (contentType?.toLowerCase().includes('thread')) {
    tags.push('structure-thread');
  }
  if (text.match(/\d+\.\s|•\s|-\s/)) {
    tags.push('structure-listicle');
  }
  if (text.match(/lesson|learned|mistake|truth/i)) {
    tags.push('topic-lessons');
  }

  // CTA detection
  if (text.match(/https?:\/\//)) {
    tags.push('cta-link');
  }
  if (text.match(/\?[\s]*$/m)) {
    tags.push('cta-question');
  }

  // Category-based tags
  if (category) {
    tags.push(`topic-${category.toLowerCase().replace(/\s+/g, '-')}`);
  }

  // Always include 'hook' for searchability
  if (!tags.some(t => t.startsWith('hook-'))) {
    tags.push('hook');
  }

  return [...new Set(tags)]; // dedupe
}

// Calculate human score from engagement
function calculateHumanScore(row) {
  const isProven = row['Proven?']?.toLowerCase() === 'yes';
  let score = isProven ? 90 : 75; // Base score depends on proven status

  const engagements = parseInt(row['Engagements']) || 0;
  const impressions = parseInt(row['Impressions']) || 0;
  const likes = parseInt(row['Likes']) || 0;

  if (engagements > 500) score += 2;
  if (engagements > 1000) score += 2;
  if (engagements > 5000) score += 3;
  if (impressions > 10000) score += 1;
  if (impressions > 100000) score += 2;
  if (likes > 100) score += 1;
  if (likes > 500) score += 2;

  return Math.min(score, 99); // Cap at 99
}

// Convert to training file format
function createTrainingFile(row, content, targetPath) {
  const platform = row['Platform']?.toLowerCase() || 'linkedin';
  const normalizedPlatform = platform === 'x' ? 'twitter' : platform;
  const author = row['Account'] || 'Unknown';
  const authorSlug = author.toLowerCase().replace(/\s+/g, '-');

  const tags = generateTags(content, row['Content Type'], row['Category']);
  const humanScore = calculateHumanScore(row);

  // Parse date
  let date = '';
  if (row['Created time']) {
    const parsed = new Date(row['Created time']);
    if (!isNaN(parsed)) {
      date = parsed.toISOString().split('T')[0];
    }
  }

  // Create slug from title
  const titleSlug = (row['Title'] || 'untitled')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 50);

  // Build frontmatter
  const frontmatter = `---
platform: ${normalizedPlatform}
tags: [${tags.join(', ')}]
human_score: ${humanScore}
source: mentor
author: ${author}
date: ${date}
topic: ${row['Category'] || 'general'}
engagements: ${row['Engagements'] || 0}
impressions: ${row['Impressions'] || 0}
proven: ${row['Proven?']?.toLowerCase() === 'yes'}
original_title: "${(row['Title'] || '').replace(/"/g, '\\"')}"
content_type: ${row['Content Type'] || 'unknown'}
---`;

  // Build content
  const fileContent = `${frontmatter}

# ${author}: ${row['Title'] || 'Untitled'}

${content.fullContent}

---

## Pattern Notes

- **Hook**: "${content.hook.slice(0, 100)}${content.hook.length > 100 ? '...' : ''}"
- **Content Type**: ${row['Content Type'] || 'Unknown'}
- **Category**: ${row['Category'] || 'General'}
`;

  // Determine target path (proven goes to high-performers, others to all)
  const isProven = row['Proven?']?.toLowerCase() === 'yes';
  const subDir = isProven ? 'high-performers' : 'all';
  const targetDir = path.join(
    TARGET_DIR,
    normalizedPlatform,
    subDir,
    authorSlug
  );

  const fileName = `${titleSlug}.md`;
  const fullPath = path.join(targetDir, fileName);

  return {
    path: fullPath,
    dir: targetDir,
    content: fileContent,
    author,
    platform: normalizedPlatform,
    title: row['Title']
  };
}

// Update index files
function updateIndexes(imported) {
  const byPlatform = {};
  const byAuthor = {};

  for (const item of imported) {
    byPlatform[item.platform] = byPlatform[item.platform] || [];
    byPlatform[item.platform].push(item);

    const key = `${item.platform}/${item.author}`;
    byAuthor[key] = byAuthor[key] || [];
    byAuthor[key].push(item);
  }

  // Update platform indexes
  for (const [platform, items] of Object.entries(byPlatform)) {
    const indexPath = path.join(TARGET_DIR, platform, '_index.md');
    if (fs.existsSync(indexPath)) {
      let content = fs.readFileSync(indexPath, 'utf-8');

      // Update file count in status table
      const authorCounts = {};
      for (const item of items) {
        authorCounts[item.author] = (authorCounts[item.author] || 0) + 1;
      }

      // Add to current files section
      const newRows = items.map(i =>
        `| ${path.basename(i.path)} | mentor | ${i.author} |`
      ).join('\n');

      console.log(`  Updated ${indexPath} with ${items.length} entries`);
    }
  }
}

// Main import function
async function main() {
  console.log('=== Velocity Training Importer ===\n');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  console.log(`Filter: ${IMPORT_ALL ? 'ALL posts' : 'PROVEN only'}`);
  if (SKIP_EXISTING) console.log('Skipping existing files');
  if (LIMIT) console.log(`Limit: ${LIMIT} files`);
  console.log('');

  // Read and parse CSV
  console.log('Reading CSV...');
  const csvContent = fs.readFileSync(CSV_FILE, 'utf-8');
  const rows = parseCSV(csvContent);
  console.log(`  Found ${rows.length} total rows`);

  // Filter for Cole/Dickie (optionally + Proven)
  const filtered = rows.filter(row => {
    const account = row['Account']?.toLowerCase() || '';
    const proven = row['Proven?']?.toLowerCase() || '';

    // Must be Cole or Dickie
    if (!account.includes('cole') && !account.includes('dickie')) {
      return false;
    }

    // If not importing all, only take Proven posts
    if (!IMPORT_ALL && proven !== 'yes') {
      return false;
    }

    return true;
  });

  const provenCount = filtered.filter(r => r['Proven?']?.toLowerCase() === 'yes').length;
  const notProvenCount = filtered.length - provenCount;
  console.log(`  Filtered to ${filtered.length} Cole/Dickie posts (${provenCount} proven, ${notProvenCount} not proven)`);

  // Apply limit if specified
  const toProcess = LIMIT ? filtered.slice(0, parseInt(LIMIT)) : filtered;
  console.log(`  Processing ${toProcess.length} posts\n`);

  // Process each row
  const imported = [];
  const errors = [];

  for (const row of toProcess) {
    const title = row['Title'] || 'Untitled';
    process.stdout.write(`Processing: ${title.slice(0, 50)}...`);

    // Find matching markdown file
    const mdPath = findMdFile(title);
    if (!mdPath) {
      console.log(' [SKIP: No MD file]');
      errors.push({ title, error: 'No markdown file found' });
      continue;
    }

    // Extract content
    const content = extractContent(mdPath, row['Platform']);
    if (!content.fullContent) {
      console.log(' [SKIP: No content]');
      errors.push({ title, error: 'No content extracted' });
      continue;
    }

    // Create training file
    const file = createTrainingFile(row, content, TARGET_DIR);

    // Check if file exists
    if (SKIP_EXISTING && fs.existsSync(file.path)) {
      console.log(' [SKIP: Exists]');
      continue;
    }

    if (!DRY_RUN) {
      // Create directory if needed
      if (!fs.existsSync(file.dir)) {
        fs.mkdirSync(file.dir, { recursive: true });
      }

      // Write file
      fs.writeFileSync(file.path, file.content);
    }

    imported.push(file);
    console.log(' [OK]');
  }

  // Summary
  console.log('\n=== Summary ===');
  console.log(`Imported: ${imported.length}`);
  console.log(`Errors: ${errors.length}`);

  if (imported.length > 0) {
    console.log('\nBy platform:');
    const byPlatform = {};
    for (const i of imported) {
      byPlatform[i.platform] = (byPlatform[i.platform] || 0) + 1;
    }
    for (const [p, c] of Object.entries(byPlatform)) {
      console.log(`  ${p}: ${c}`);
    }

    console.log('\nBy author:');
    const byAuthor = {};
    for (const i of imported) {
      byAuthor[i.author] = (byAuthor[i.author] || 0) + 1;
    }
    for (const [a, c] of Object.entries(byAuthor)) {
      console.log(`  ${a}: ${c}`);
    }
  }

  if (errors.length > 0) {
    console.log('\nErrors:');
    for (const e of errors.slice(0, 10)) {
      console.log(`  - ${e.title}: ${e.error}`);
    }
    if (errors.length > 10) {
      console.log(`  ... and ${errors.length - 10} more`);
    }
  }

  if (DRY_RUN) {
    console.log('\n[DRY RUN - No files written]');
    console.log('Run without --dry-run to actually import.');
  } else {
    console.log('\n✓ Import complete!');
    console.log(`Files written to: ${TARGET_DIR}`);
  }
}

main().catch(console.error);
