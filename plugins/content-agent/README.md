# Content Agent Plugin — Full Reference

Voice-matched content creation across 14 platforms. 4 agents, 50 commands, 15 skills, 24 prompts, 15 scripts.

## Agents (4)

### Quality Agents
| Agent | Purpose |
|-------|---------|
| `content-auditor` | Grade content A-F for AI patterns, provide line-by-line issues |
| `content-fix-applier` | Apply surgical fixes to AI-detected patterns (90%+ preservation) |

### Workflow Agents
| Agent | Purpose |
|-------|---------|
| `content-orchestrator` | Route requests to correct skills, manage multi-step workflows |
| `surgical-rewriter` | Rewrite specific sections while preserving voice and structure |

## Skills (15)

### Platform Writers (8)
| Skill | Platform | Output |
|-------|----------|--------|
| `linkedin-writer` | LinkedIn | Posts (≤2,800 chars), carousels (3-10 slides) |
| `twitter-writer` | Twitter/X | Singles (≤280 chars), threads (5-12 posts), batches (10 singles) |
| `email-writer` | Email | Value newsletters (400-500 words) |
| `video-writer` | Video | Short-form scripts (30-90s), animated video clips |
| `instagram-writer` | Instagram | Captions (≤2,200 chars) |
| `bluesky-writer` | Bluesky | Posts (≤300 chars) |
| `image-generator` | All | AI images, memes via Imgflip |
| `batch` | Multi-platform | Week batches, meeting-to-content, campaigns |

### Utility Skills (7)
| Skill | Purpose |
|-------|---------|
| `business-blueprint` | 5-minute interview to capture business context → config.md |
| `voice-training` | 10-question Curiosity Pattern interview to capture writing voice |
| `quality-pipeline` | Full quality check pipeline (127 anti-AI rules) |
| `training-manager` | Save, sync, and analyze training examples |
| `ayrshare-publishing` | Auto-publish to social platforms via Ayrshare API |
| `meeting-connector` | Extract insights from meeting transcripts → content drafts |
| `content-analytics` | Generation counts, quality scores, performance reviews |

## Commands (50)

### Content Generation (14)
`generate-linkedin`, `generate-twitter`, `generate-twitter-thread`, `generate-twitter-singles-batch`, `generate-email-value`, `generate-bluesky`, `generate-instagram`, `generate-video-short`, `generate-video-animated`, `generate-image`, `generate-meme`, `generate-carousel`, `generate-from-meeting`, `week-batch`

### Quality (5)
`ai-hunter`, `fix-ai`, `check-gptzero`, `full-pipeline`, `humanize-ryne`

### Voice & Training (4)
`voice/setup`, `voice/sync`, `training/analyze`, `training/sync`

### RAG & Prompts (6)
`rag/add-training`, `rag/search-training`, `rag/sync-wins`, `prompts/add`, `prompts/list`, `prompts/search`

### Client Management (3)
`client/new`, `client/list`, `client/switch`

### Analytics (2)
`analytics/check`, `analytics/review`

### Canvas (2)
`canvas/generate-weekly`, `canvas/research`

### Publishing (1)
`publish/schedule-ayrshare`

### Setup (3)
`first-time-setup`, `learn`, `setup/business-blueprint`

### Connectors (1)
`connectors/fireflies-connector`

### Design (1)
`design/analyze-inspiration`

### Productivity (1)
`productivity/meeting-prep`

### Shared Modules (7)
`_shared/client-context`, `_shared/collaboration-mode`, `_shared/mentor-consulting`, `_shared/next-steps`, `_shared/output-frontmatter`, `_shared/preflight-checks`, `_shared/quality-patterns`

## Prompts (24)

### Base (2)
`system-core`, `output-format`

### Brand (4)
`banned-words`, `brand-identity`, `brand-identity.example`, `writing-rules-no-ai`

### Frameworks (5)
`10x-leverage`, `cole-hook-patterns`, `dickie-listicle-formula`, `ror-standards`, `strengthen-before-expand`

### Platform (6)
`linkedin`, `twitter`, `bluesky`, `email`, `instagram`, `video-short`

### Stacks (6)
`linkedin-full`, `twitter-full`, `bluesky-full`, `email-full`, `instagram-full`, `video-short-full`

### Tools (1)
`obsidian-canvas`

## Scripts (15)

| Script | Integration |
|--------|------------|
| `check-gptzero.js` | GPTZero API for AI detection scoring |
| `configure-terminal.js` | Terminal setup utility |
| `consult-mentors.js` | Mentor pattern consultation |
| `count-chars.js` | Character count validation |
| `gamma-generate.js` | Gamma API for carousel/presentation generation |
| `generate-meme.js` | Imgflip API for meme generation |
| `humanize-ryne.js` | Ryne humanization integration |
| `humanize-stealthgpt.js` | StealthGPT humanization integration |
| `import-velocity-training.js` | Import training data from Velocity |
| `push-to-notion.js` | Push content to Notion database |
| `render-card.js` | Card rendering for visual content |
| `schedule-ayrshare.js` | Ayrshare API for social media scheduling |
| `send-to-sheets.js` | Google Sheets integration |
| `sync-training.js` | Sync training examples from Notion |
| `watch-content-folders.js` | File watcher for content directory changes |

## Environment Variables

All optional. See `.env.example` for details.

| Variable | Service | Purpose |
|----------|---------|---------|
| `AYRSHARE_API_KEY` | Ayrshare | Auto-publish to social platforms |
| `GPTZERO_API_KEY` | GPTZero | External AI detection scoring |
