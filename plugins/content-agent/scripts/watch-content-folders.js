#!/usr/bin/env node
//
// Content Folder Watcher - Auto-add Frontmatter
//
// Watches clients/[name]/content/ folders and automatically adds frontmatter
// to any new .md files that are missing it.
//
// Usage:
//   node scripts/watch-content-folders.js          # Run in foreground
//   node scripts/watch-content-folders.js --daemon # Run in background
//
// What it does:
//   - Watches all client content folders for new/moved .md files
//   - Infers platform from filename (e.g., topic-linkedin.md -> linkedin)
//   - Infers date from folder path (e.g., /12-december-2025/03/ -> 2025-12-03)
//   - Infers client from path (e.g., clients/heymitch/... -> heymitch)
//   - Adds frontmatter template with smart defaults
//   - Skips files that already have frontmatter
//

const fs = require('fs');
const path = require('path');

// Configuration
const CLIENTS_DIR = path.join(__dirname, '..', 'clients');
const DEBOUNCE_MS = 500; // Wait for file to finish writing

// Platform detection patterns
const PLATFORM_PATTERNS = {
  'linkedin': /[-_]linkedin\.md$/i,
  'twitter': /[-_]twitter\.md$/i,
  'twitter-thread': /[-_]twitter[-_]thread\.md$/i,
  'email': /[-_]email\.md$/i,
  'video': /[-_]video\.md$/i,
  'tiktok': /[-_]tiktok\.md$/i,
  'reels': /[-_]reels\.md$/i,
  'shorts': /[-_]shorts\.md$/i,
};

// Month name to number mapping
const MONTH_MAP = {
  'january': '01', 'february': '02', 'march': '03', 'april': '04',
  'may': '05', 'june': '06', 'july': '07', 'august': '08',
  'september': '09', 'october': '10', 'november': '11', 'december': '12'
};

/**
 * Check if file has frontmatter
 */
function hasFrontmatter(content) {
  return content.trim().startsWith('---');
}

/**
 * Infer platform from filename
 */
function inferPlatform(filename) {
  for (const [platform, pattern] of Object.entries(PLATFORM_PATTERNS)) {
    if (pattern.test(filename)) {
      return platform;
    }
  }
  return 'unknown';
}

/**
 * Infer date from folder path
 * Expected format: .../MM-month-YYYY/DD/...
 */
function inferDate(filePath) {
  // Match patterns like /12-december-2025/03/
  const match = filePath.match(/(\d{2})-(\w+)-(\d{4})\/(\d{2})\//);
  if (match) {
    const [, monthNum, monthName, year, day] = match;
    // Use month number if available, otherwise try to map month name
    const month = MONTH_MAP[monthName.toLowerCase()] || monthNum;
    return `${year}-${month}-${day}`;
  }

  // Fallback to today's date
  return new Date().toISOString().split('T')[0];
}

/**
 * Infer client from path
 * Expected format: clients/[client-name]/content/...
 */
function inferClient(filePath) {
  const match = filePath.match(/clients\/([^\/]+)\/content/);
  return match ? match[1] : 'unknown';
}

/**
 * Generate title from filename
 */
function generateTitle(filename) {
  // Remove extension and platform suffix
  let title = filename.replace(/\.md$/, '');

  // Remove platform suffix
  for (const pattern of Object.values(PLATFORM_PATTERNS)) {
    title = title.replace(pattern.source.replace('\\.md$', ''), '');
  }
  title = title.replace(/[-_](linkedin|twitter|email|video|tiktok|reels|shorts)$/i, '');

  // Convert slug to title case
  title = title
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return title || 'Untitled';
}

/**
 * Generate frontmatter for a file
 */
function generateFrontmatter(filePath) {
  const filename = path.basename(filePath);
  const platform = inferPlatform(filename);
  const date = inferDate(filePath);
  const clientId = inferClient(filePath);
  const title = generateTitle(filename);

  return `---
title: "${title}"
platform: ${platform}
type: post
date: ${date}
status: draft
tags: ""
client_id: ${clientId}
ai_score: ""
quality_grade: ""
gptzero_score: ""
---

`;
}

/**
 * Add frontmatter to a file if missing
 */
function addFrontmatterIfMissing(filePath) {
  try {
    // Wait a moment for file to finish writing
    const content = fs.readFileSync(filePath, 'utf8');

    if (hasFrontmatter(content)) {
      console.log(`⏭️  Skipping (has frontmatter): ${path.basename(filePath)}`);
      return false;
    }

    const frontmatter = generateFrontmatter(filePath);
    const newContent = frontmatter + content;

    fs.writeFileSync(filePath, newContent, 'utf8');

    const platform = inferPlatform(path.basename(filePath));
    const client = inferClient(filePath);
    console.log(`✅ Added frontmatter: ${path.basename(filePath)}`);
    console.log(`   Platform: ${platform} | Client: ${client} | Date: ${inferDate(filePath)}`);

    return true;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Get all client content directories
 */
function getContentDirs() {
  const dirs = [];

  if (!fs.existsSync(CLIENTS_DIR)) {
    console.error(`❌ Clients directory not found: ${CLIENTS_DIR}`);
    return dirs;
  }

  const clients = fs.readdirSync(CLIENTS_DIR);

  for (const client of clients) {
    if (client.startsWith('_')) continue; // Skip _template

    const contentDir = path.join(CLIENTS_DIR, client, 'content');
    if (fs.existsSync(contentDir)) {
      dirs.push(contentDir);
    }
  }

  return dirs;
}

/**
 * Recursively watch a directory
 */
function watchDirectory(dir, debounceTimers) {
  // Watch current directory
  try {
    fs.watch(dir, { recursive: true }, (eventType, filename) => {
      if (!filename || !filename.endsWith('.md')) return;

      const filePath = path.join(dir, filename);

      // Debounce to avoid processing file while it's still being written
      if (debounceTimers[filePath]) {
        clearTimeout(debounceTimers[filePath]);
      }

      debounceTimers[filePath] = setTimeout(() => {
        if (fs.existsSync(filePath)) {
          addFrontmatterIfMissing(filePath);
        }
        delete debounceTimers[filePath];
      }, DEBOUNCE_MS);
    });

    return true;
  } catch (error) {
    console.error(`❌ Failed to watch ${dir}:`, error.message);
    return false;
  }
}

/**
 * Process existing files that may be missing frontmatter
 */
function processExistingFiles(contentDirs) {
  let processed = 0;
  let added = 0;

  for (const dir of contentDirs) {
    const walkDir = (currentDir) => {
      const entries = fs.readdirSync(currentDir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);

        if (entry.isDirectory()) {
          walkDir(fullPath);
        } else if (entry.name.endsWith('.md')) {
          processed++;
          if (addFrontmatterIfMissing(fullPath)) {
            added++;
          }
        }
      }
    };

    walkDir(dir);
  }

  return { processed, added };
}

/**
 * Main function
 */
function main() {
  console.log('🔍 Content Folder Watcher');
  console.log('========================\n');

  const contentDirs = getContentDirs();

  if (contentDirs.length === 0) {
    console.error('No client content directories found.');
    process.exit(1);
  }

  console.log(`Found ${contentDirs.length} client content folder(s):`);
  contentDirs.forEach(dir => console.log(`  📁 ${dir}`));
  console.log('');

  // Process existing files first
  console.log('Checking existing files...\n');
  const { processed, added } = processExistingFiles(contentDirs);
  console.log(`\n📊 Processed ${processed} files, added frontmatter to ${added}\n`);

  // Set up watchers
  console.log('👀 Now watching for new files...\n');
  console.log('Press Ctrl+C to stop\n');

  const debounceTimers = {};
  let watcherCount = 0;

  for (const dir of contentDirs) {
    if (watchDirectory(dir, debounceTimers)) {
      watcherCount++;
    }
  }

  if (watcherCount === 0) {
    console.error('Failed to set up any watchers');
    process.exit(1);
  }

  // Keep process running
  process.on('SIGINT', () => {
    console.log('\n\n👋 Stopping watcher...');
    process.exit(0);
  });
}

// Export for testing
module.exports = {
  hasFrontmatter,
  inferPlatform,
  inferDate,
  inferClient,
  generateTitle,
  generateFrontmatter,
  addFrontmatterIfMissing
};

// Run if called directly
if (require.main === module) {
  main();
}
