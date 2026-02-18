#!/usr/bin/env node
/**
 * Push content to Notion Content Database
 *
 * Usage:
 *   node scripts/push-to-notion.js --title "Post Title" --content "Content here" --platform linkedin
 *   node scripts/push-to-notion.js --file scratch/draft.md --platform twitter
 *   cat draft.md | node scripts/push-to-notion.js --title "Title" --platform linkedin
 */

import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { parseArgs } from 'util';

config();

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_CONTENT_DB = process.env.NOTION_CONTENT_DB;

// Extract database ID from URL or use directly
function extractDatabaseId(urlOrId) {
  if (!urlOrId) return null;
  if (/^[a-f0-9-]{32,36}$/i.test(urlOrId)) {
    return urlOrId.replace(/-/g, '');
  }
  const match = urlOrId.match(/([a-f0-9]{32})/i);
  return match ? match[1] : null;
}

const DATABASE_ID = extractDatabaseId(NOTION_CONTENT_DB);

/**
 * Make authenticated request to Notion API
 */
async function notionRequest(endpoint, method = 'GET', body = null) {
  if (!NOTION_API_KEY) {
    throw new Error('NOTION_API_KEY not set in environment');
  }

  const url = `https://api.notion.com/v1${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${NOTION_API_KEY}`,
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28',
  };

  const options = { method, headers };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Notion API error (${response.status}): ${data.message || JSON.stringify(data)}`);
  }

  return data;
}

/**
 * Split text into chunks for Notion's 2000 char block limit
 */
function chunkText(text, maxLength = 2000) {
  const chunks = [];
  let remaining = text;

  while (remaining.length > 0) {
    if (remaining.length <= maxLength) {
      chunks.push(remaining);
      break;
    }

    let breakPoint = remaining.lastIndexOf('\n\n', maxLength);
    if (breakPoint === -1 || breakPoint < maxLength / 2) {
      breakPoint = remaining.lastIndexOf('\n', maxLength);
    }
    if (breakPoint === -1 || breakPoint < maxLength / 2) {
      breakPoint = remaining.lastIndexOf('. ', maxLength);
      if (breakPoint !== -1) breakPoint += 1;
    }
    if (breakPoint === -1 || breakPoint < maxLength / 2) {
      breakPoint = remaining.lastIndexOf(' ', maxLength);
    }
    if (breakPoint === -1) {
      breakPoint = maxLength;
    }

    chunks.push(remaining.substring(0, breakPoint).trim());
    remaining = remaining.substring(breakPoint).trim();
  }

  return chunks;
}

/**
 * Convert content to Notion blocks
 */
function contentToBlocks(content) {
  const blocks = [];
  const lines = content.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const chunks = chunkText(trimmed, 2000);
    for (const chunk of chunks) {
      blocks.push({
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [{ type: 'text', text: { content: chunk } }],
        },
      });
    }
  }

  return blocks;
}

/**
 * Create a content page in Notion
 */
async function pushToNotion({ title, content, platform, tags = [] }) {
  if (!DATABASE_ID) {
    throw new Error('NOTION_CONTENT_DB not set or invalid');
  }

  const blocks = contentToBlocks(content);

  const properties = {
    Title: {
      title: [{ text: { content: title } }],
    },
    Content: {
      rich_text: [{ text: { content: content.substring(0, 2000) } }],
    },
    Platform: {
      select: { name: platform },
    },
    Status: {
      select: { name: 'Review' },
    },
  };

  if (tags.length > 0) {
    properties.Tags = {
      multi_select: tags.map(tag => ({ name: tag })),
    };
  }

  const page = await notionRequest('/pages', 'POST', {
    parent: { database_id: DATABASE_ID },
    properties,
    children: blocks.slice(0, 100),
  });

  // Append remaining blocks if needed
  if (blocks.length > 100) {
    for (let i = 100; i < blocks.length; i += 100) {
      await notionRequest(`/blocks/${page.id}/children`, 'PATCH', {
        children: blocks.slice(i, i + 100),
      });
    }
  }

  return {
    id: page.id,
    url: page.url,
    title,
    platform,
  };
}

/**
 * Read content from stdin
 */
async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

async function main() {
  const { values } = parseArgs({
    options: {
      title: { type: 'string', short: 't' },
      content: { type: 'string', short: 'c' },
      file: { type: 'string', short: 'f' },
      platform: { type: 'string', short: 'p', default: 'LinkedIn' },
      tags: { type: 'string', multiple: true },
      help: { type: 'boolean', short: 'h' },
    },
  });

  if (values.help) {
    console.log(`
Push Content to Notion

Usage:
  node scripts/push-to-notion.js --title "Title" --content "Content" --platform linkedin
  node scripts/push-to-notion.js --title "Title" --file draft.md --platform twitter
  cat draft.md | node scripts/push-to-notion.js --title "Title" --platform linkedin

Options:
  -t, --title     Post title (required)
  -c, --content   Content string
  -f, --file      Read content from file
  -p, --platform  Platform: LinkedIn, Twitter, Email (default: LinkedIn)
  --tags          Tags (can specify multiple)
  -h, --help      Show this help

Environment:
  NOTION_API_KEY      Notion integration token
  NOTION_CONTENT_DB   Content database ID or URL
`);
    return;
  }

  if (!values.title) {
    console.error('Error: --title is required');
    process.exit(1);
  }

  let content = values.content;

  if (values.file) {
    content = readFileSync(values.file, 'utf-8');
  } else if (!content && !process.stdin.isTTY) {
    content = await readStdin();
  }

  if (!content) {
    console.error('Error: No content provided. Use --content, --file, or pipe to stdin');
    process.exit(1);
  }

  try {
    const result = await pushToNotion({
      title: values.title,
      content: content.trim(),
      platform: values.platform,
      tags: values.tags || [],
    });

    console.log(`\n✅ Pushed to Notion`);
    console.log(`   Title: ${result.title}`);
    console.log(`   Platform: ${result.platform}`);
    console.log(`   Status: Review`);
    console.log(`   URL: ${result.url}`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
