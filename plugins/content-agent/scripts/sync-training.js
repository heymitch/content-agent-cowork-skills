#!/usr/bin/env node
/**
 * Sync Training Examples from Notion
 *
 * Pulls posts marked "Add to Training" from Notion Content database
 * and saves them as markdown files in training/examples/
 *
 * Usage:
 *   node scripts/sync-training.js
 *   node scripts/sync-training.js --dry-run
 *   node scripts/sync-training.js --platform linkedin
 *
 * Can be called by n8n webhook or cron.
 */

import { config } from 'dotenv';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parseArgs } from 'util';

config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const TRAINING_DIR = join(__dirname, '..', 'training', 'examples');

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_CONTENT_DB = process.env.NOTION_CONTENT_DB;

function extractDatabaseId(urlOrId) {
  if (!urlOrId) return null;
  if (/^[a-f0-9-]{32,36}$/i.test(urlOrId)) {
    return urlOrId.replace(/-/g, '');
  }
  const match = urlOrId.match(/([a-f0-9]{32})/i);
  return match ? match[1] : null;
}

const DATABASE_ID = extractDatabaseId(NOTION_CONTENT_DB);

async function notionRequest(endpoint, method = 'GET', body = null) {
  if (!NOTION_API_KEY) {
    throw new Error('NOTION_API_KEY not set');
  }

  const url = `https://api.notion.com/v1${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${NOTION_API_KEY}`,
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28',
  };

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Notion API error: ${data.message || JSON.stringify(data)}`);
  }

  return data;
}

/**
 * Query Notion for training candidates
 */
async function getTrainingCandidates(platformFilter = null) {
  if (!DATABASE_ID) {
    throw new Error('NOTION_CONTENT_DB not set');
  }

  const filter = {
    property: 'Add to Training',
    checkbox: { equals: true },
  };

  // Add platform filter if specified
  const filters = [filter];
  if (platformFilter) {
    filters.push({
      property: 'Platform',
      select: { equals: platformFilter },
    });
  }

  const queryFilter = filters.length > 1
    ? { and: filters }
    : filter;

  const data = await notionRequest(`/databases/${DATABASE_ID}/query`, 'POST', {
    filter: queryFilter,
    page_size: 100,
  });

  return data.results.map(page => {
    const props = page.properties;
    return {
      id: page.id,
      title: props.Hook?.title?.[0]?.text?.content || 'Untitled',
      content: props.Content?.rich_text?.[0]?.text?.content || '',
      platform: props.Platform?.select?.name || 'unknown',
      engagements: props.Engagements?.number || 0,
      engagementRate: props['Engagement Rate']?.number || 0,
      likes: props.Likes?.number || 0,
      publishedDate: props['Publish Date']?.date?.start || null,
      tags: props.Tags?.multi_select?.map(t => t.name) || [],
      url: page.url,
    };
  });
}

/**
 * Generate slug from title
 */
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);
}

/**
 * Save post as markdown file
 */
function saveAsMarkdown(post, dryRun = false) {
  const platform = post.platform.toLowerCase().replace('x/', '');
  const subdir = post.engagements > 500 ? 'high-performers' : 'recent';
  const dir = join(TRAINING_DIR, platform, subdir);
  const slug = slugify(post.title);
  const filename = `${slug}.md`;
  const filepath = join(dir, filename);

  const frontmatter = `---
title: "${post.title.replace(/"/g, '\\"')}"
platform: ${post.platform}
engagements: ${post.engagements}
engagement_rate: ${post.engagementRate}
likes: ${post.likes}
date: "${post.publishedDate || new Date().toISOString().split('T')[0]}"
tags: [${post.tags.map(t => `"${t}"`).join(', ')}]
notion_id: "${post.id}"
notion_url: "${post.url}"
---

${post.content}
`;

  if (dryRun) {
    console.log(`[DRY RUN] Would write: ${filepath}`);
    return { filepath, written: false };
  }

  // Ensure directory exists
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  writeFileSync(filepath, frontmatter, 'utf-8');
  return { filepath, written: true };
}

async function main() {
  const { values } = parseArgs({
    options: {
      'dry-run': { type: 'boolean', default: false },
      platform: { type: 'string', short: 'p' },
      help: { type: 'boolean', short: 'h' },
    },
  });

  if (values.help) {
    console.log(`
Sync Training Examples from Notion

Usage:
  node scripts/sync-training.js
  node scripts/sync-training.js --dry-run
  node scripts/sync-training.js --platform linkedin

Options:
  --dry-run       Show what would be synced without writing files
  -p, --platform  Filter by platform (LinkedIn, Twitter, etc.)
  -h, --help      Show this help

Writes to:
  training/examples/{platform}/high-performers/  (engagement > 500)
  training/examples/{platform}/recent/           (all others)

Environment:
  NOTION_API_KEY      Notion integration token
  NOTION_CONTENT_DB   Content database ID or URL
`);
    return;
  }

  console.log('🔄 Syncing training examples from Notion...\n');

  try {
    const posts = await getTrainingCandidates(values.platform);

    if (posts.length === 0) {
      console.log('No posts marked for training found.');
      return;
    }

    console.log(`Found ${posts.length} training candidates:\n`);

    let written = 0;
    for (const post of posts) {
      const result = saveAsMarkdown(post, values['dry-run']);
      const status = result.written ? '✅' : '📋';
      console.log(`${status} ${post.platform}: ${post.title}`);
      console.log(`   Engagement: ${post.engagement} | File: ${result.filepath}\n`);
      if (result.written) written++;
    }

    if (values['dry-run']) {
      console.log(`\n📋 Dry run complete. ${posts.length} files would be written.`);
    } else {
      console.log(`\n✅ Sync complete. ${written} files written to training/examples/`);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
