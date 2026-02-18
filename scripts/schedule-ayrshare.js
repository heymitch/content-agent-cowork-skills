#!/usr/bin/env node

/**
 * Schedule content to Ayrshare for auto-publishing
 *
 * ONLY sends if status is "Publish it!" - otherwise exits silently
 * Designed to be triggered from Obsidian via QuickAdd/Templater
 *
 * Usage: node scripts/schedule-ayrshare.js <file-path> [publish-datetime]
 *
 * If no datetime provided, uses publish_date from frontmatter
 * Datetime format: YYYY-MM-DD HH:MM (24-hour, defaults to 09:00 if no time)
 */

const fs = require('fs');
const path = require('path');

// Load environment variables from .env
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Platform mapping from our system to Ayrshare
const PLATFORM_MAP = {
  'linkedin': 'linkedin',
  'twitter': 'twitter',
  'facebook': 'facebook',
  'instagram': 'instagram',
  'tiktok': 'tiktok',
  'youtube': 'youtube'
};

/**
 * Parse frontmatter from markdown file
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { frontmatter: {}, body: content };

  const frontmatterStr = match[1];
  const body = content.slice(match[0].length).trim();

  const frontmatter = {};
  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      frontmatter[key] = value;
    }
  });

  return { frontmatter, body };
}

/**
 * Extract the actual post content from the markdown body
 *
 * New format: Body contains ONLY raw content (no headers/metadata)
 * - LinkedIn: Raw post text
 * - Twitter posts: Posts separated by ---
 * - Twitter thread: Posts prefixed with 1/, 2/, etc.
 * - Email: Raw email body (markdown OK)
 * - Video: Full script (markdown OK, not for social publishing)
 */
function extractPostContent(body, platform, type) {
  let content = body.trim();

  // For Twitter posts (multiple), get just the first one for now
  // TODO: Support batch scheduling
  if (platform === 'twitter' && type === 'posts') {
    const posts = content.split(/\n---\n/).map(p => p.trim()).filter(p => p);
    if (posts.length > 0) {
      content = posts[0]; // First post only
    }
  }

  // For Twitter threads, combine all posts
  if (platform === 'twitter' && type === 'thread') {
    // Content is already in 1/, 2/, format - Ayrshare handles threads
    // Just clean up any extra whitespace
    content = content.replace(/\n{3,}/g, '\n\n');
  }

  // For video scripts, this shouldn't be published directly to social
  if (platform === 'video') {
    console.warn('⚠️  Video scripts are production documents, not for direct social publishing');
  }

  return content.trim();
}

/**
 * Parse datetime string to ISO format for Ayrshare
 */
function parseDateTime(dateStr, timeStr = '09:00') {
  // Handle YYYY-MM-DD format
  const dateParts = dateStr.split('-');
  if (dateParts.length !== 3) {
    throw new Error(`Invalid date format: ${dateStr}. Use YYYY-MM-DD`);
  }

  const [year, month, day] = dateParts;
  const [hour, minute] = timeStr.split(':');

  // Create date in local timezone, then convert to ISO
  const date = new Date(year, month - 1, day, hour || 9, minute || 0);
  return date.toISOString();
}

/**
 * Schedule post to Ayrshare
 */
async function scheduleToAyrshare(content, platform, scheduledDate, title) {
  const apiKey = process.env.AYRSHARE_API_KEY;

  if (!apiKey) {
    throw new Error('AYRSHARE_API_KEY not set in environment');
  }

  const ayrPlatform = PLATFORM_MAP[platform.toLowerCase()];
  if (!ayrPlatform) {
    throw new Error(`Unsupported platform: ${platform}. Supported: ${Object.keys(PLATFORM_MAP).join(', ')}`);
  }

  const payload = {
    post: content,
    platforms: [ayrPlatform],
    scheduleDate: scheduledDate
  };

  // Add title for platforms that support it
  if (title && ['linkedin', 'facebook'].includes(ayrPlatform)) {
    payload.title = title;
  }

  const response = await fetch('https://app.ayrshare.com/api/post', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(`Ayrshare API error: ${result.message || JSON.stringify(result)}`);
  }

  return result;
}

/**
 * Update frontmatter with scheduling info
 */
function updateFrontmatter(filePath, content, ayrshareResult) {
  const lines = content.split('\n');
  const endOfFrontmatter = lines.findIndex((line, i) => i > 0 && line === '---');

  if (endOfFrontmatter === -1) return content;

  // Add scheduling metadata before the closing ---
  const newFields = [
    `ayrshare_scheduled: true`,
    `ayrshare_id: "${ayrshareResult.id || ''}"`,
    `scheduled_at: "${new Date().toISOString()}"`
  ];

  lines.splice(endOfFrontmatter, 0, ...newFields);

  const updatedContent = lines.join('\n');
  fs.writeFileSync(filePath, updatedContent);

  return updatedContent;
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: node scripts/schedule-ayrshare.js <file-path> [YYYY-MM-DD] [HH:MM]');
    console.error('');
    console.error('Examples:');
    console.error('  node scripts/schedule-ayrshare.js content/12-december-2025/03/post-linkedin.md');
    console.error('  node scripts/schedule-ayrshare.js content/12-december-2025/03/post-linkedin.md 2025-12-05');
    console.error('  node scripts/schedule-ayrshare.js content/12-december-2025/03/post-linkedin.md 2025-12-05 14:30');
    process.exit(1);
  }

  const filePath = args[0];
  const overrideDate = args[1];
  const overrideTime = args[2] || '09:00';

  // Resolve file path
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath);

  if (!fs.existsSync(absolutePath)) {
    console.error(`File not found: ${absolutePath}`);
    process.exit(1);
  }

  // Read and parse file
  const content = fs.readFileSync(absolutePath, 'utf-8');
  const { frontmatter, body } = parseFrontmatter(content);

  // Check status - ONLY proceed if "Publish it!"
  const status = frontmatter.status;
  if (status !== 'Publish it!') {
    console.log(`⏭️  Skipping: status is "${status || 'not set'}" (requires "Publish it!")`);
    console.log('');
    console.log('---RESULT---');
    console.log(JSON.stringify({
      success: false,
      skipped: true,
      reason: `Status is "${status || 'not set'}", not "Publish it!"`
    }));
    process.exit(0);
  }

  // Get platform
  const platform = frontmatter.platform;
  if (!platform) {
    console.error('No platform specified in frontmatter');
    process.exit(1);
  }

  // Get publish date
  const publishDate = overrideDate || frontmatter.publish_date;
  if (!publishDate) {
    console.error('No publish_date in frontmatter and no date provided as argument');
    process.exit(1);
  }

  // Parse scheduled datetime
  const scheduledISO = parseDateTime(publishDate, overrideTime);

  // Get content type
  const contentType = frontmatter.type || 'post';

  // Extract post content
  const postContent = extractPostContent(body, platform, contentType);

  if (!postContent) {
    console.error('Could not extract post content from file');
    process.exit(1);
  }

  console.log('📤 Scheduling to Ayrshare...');
  console.log(`   Platform: ${platform}`);
  console.log(`   Scheduled: ${scheduledISO}`);
  console.log(`   Content length: ${postContent.length} chars`);
  console.log('');

  try {
    const result = await scheduleToAyrshare(
      postContent,
      platform,
      scheduledISO,
      frontmatter.title
    );

    // Update file with scheduling info and change status
    updateFrontmatter(absolutePath, content, result);

    // Update status to "Scheduled"
    const updatedContent = fs.readFileSync(absolutePath, 'utf-8');
    const newContent = updatedContent.replace(/status:\s*["']?Publish it!["']?/, 'status: "Scheduled"');
    fs.writeFileSync(absolutePath, newContent);

    console.log('✅ Successfully scheduled!');
    console.log('');
    console.log('Ayrshare Response:');
    console.log(JSON.stringify(result, null, 2));

    // Output for Claude to parse
    console.log('');
    console.log('---RESULT---');
    console.log(JSON.stringify({
      success: true,
      platform,
      scheduledDate: scheduledISO,
      ayrshareId: result.id,
      filePath: absolutePath
    }));

  } catch (error) {
    console.error('❌ Scheduling failed:', error.message);
    console.log('');
    console.log('---RESULT---');
    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));
    process.exit(1);
  }
}

main();
