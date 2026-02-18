---
description: Pull winning content from Notion to local training examples
---

# Training Sync

Pull winning content from Notion to local training examples.

## What This Does

1. Finds posts marked "Add to Training" in your content
2. Converts each post to markdown with frontmatter
3. Saves to `training/examples/{platform}/` directory

## Dual-Path Sync

### Path 1: Notion MCP (Preferred — Cowork Users)

If Notion MCP tools are available, use them directly:

1. Search for your Content database in Notion
2. Query for pages where "Add to Training" checkbox = true
3. For each matching page:
   - Read the page content
   - Extract platform, title, tags, engagement data
   - Save to `training/examples/{platform}/notion-{slug}.md`
4. Report how many new examples were synced

**No API key needed.** Notion MCP handles auth through Cowork.

### Path 2: Script Fallback

If Notion MCP is NOT available but `NOTION_API_KEY` exists in `.env`:

```bash
# Sync all platforms
node scripts/sync-training.js

# Dry run (see what would sync)
node scripts/sync-training.js --dry-run

# Sync specific platform
node scripts/sync-training.js --platform linkedin
```

### Path 3: No Notion

If neither path is available:
"Training sync pulls winners from Notion. You can add training content manually — just paste your best posts and say 'Add this to training'."

## Output Location

```
training/examples/
├── linkedin/
│   ├── high-performers/   ← engagement > 500
│   └── recent/            ← all others
└── twitter/
    ├── high-performers/
    └── recent/
```

## Frontmatter Format

Each synced file includes:
```yaml
---
title: "Post title"
platform: linkedin
engagement: 1234
date: "2024-01-15"
tags: ["ai", "automation"]
source: notion-sync
---
```

## When to Run

- **Manual**: When you've marked new winners in Notion
- **After approval**: When you check "Add to Training" on a post you liked
