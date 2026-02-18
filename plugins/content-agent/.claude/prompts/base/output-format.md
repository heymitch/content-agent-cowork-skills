# Output Format and File Management

This document defines how content should be formatted, saved, and organized in the content library.

## CRITICAL: Automatic File Saving

**EVERY time you generate content, you MUST automatically save it to a markdown file using the Write tool.**

### File Path Pattern

**Default (single posts):**
```
clients/[client]/content/MM-YYYY-month/DD-day/platform-slug.md
```

**Batch/custom (user specifies folder):**
```
clients/[client]/content/[user-specified-folder]/NNN-platform-slug.md
```

Save to whatever folder the user specifies. If no folder specified for batches, use `content/[topic-slug]/`.

**Where:**
- `MM-YYYY-month` = Two-digit month, four-digit year, lowercase month name (e.g., `12-2025-december`)
- `DD-day` = Two-digit day + lowercase day name (e.g., `02-tue`, `15-sat`, `28-fri`)
- `platform` = Platform prefix: `li-` (LinkedIn), `tw-` (Twitter), `twt-` (Twitter thread), `em-` (email), `vid-` (video)
- `slug` = Short topic description in lowercase with hyphens (e.g., `ai-automation-tips`)
- `NNN` = Three-digit number for batches (e.g., `001-`, `002-`) to keep sorted

**Day abbreviations:** mon, tue, wed, thu, fri, sat, sun

**Examples:**
- `clients/heymitch/content/12-2025-december/02-tue/li-ai-automation.md` (LinkedIn post)
- `clients/heymitch/content/12-2025-december/03-wed/twt-obsidian-tips.md` (Twitter thread)
- `clients/heymitch/content/ai-tips-series/001-li-cursor-shortcuts.md` (batch, numbered)

## File Naming Conventions

### Slug Format
- Use lowercase letters
- Separate words with hyphens
- Keep it short (3-5 words max)
- Describe the content topic
- Examples: `ai-replaced-role`, `cursor-workflow-guide`, `content-leverage-framework`

### Platform Prefixes
Include platform type as prefix in filename:
- `li-slug.md` - LinkedIn posts
- `tw-slug.md` - Twitter/X single posts
- `twt-slug.md` - Twitter/X threads
- `em-slug-value.md` - Value-building emails
- `em-slug-direct.md` - Direct selling emails
- `vid-slug.md` - Short-form video scripts
- `yt-slug.md` - YouTube video scripts

## Content File Structure

### Standard Markdown Format

```markdown
---
fileClass: content
title: Post Title Here
platform: linkedin
type: post
Publish_Date: YYYY-MM-DD
status: Draft
tags:
  - tag1
  - tag2
client_id: heymitch
ai_score:
quality_grade:
gptzero_score:
---

[Generated content goes here - RAW TEXT ONLY, no headers or metadata sections]
```

**Key rules:**
- `fileClass: content` is required for Obsidian Projects
- `Publish_Date` is the calendar date field (not `date`)
- No quotes around values unless they contain special characters
- Tags as YAML list, not inline array
- Body is raw post content only — no markdown headers or metadata sections

## Directory Structure

### Content Library Organization
```
clients/heymitch/content/
├── 12-2025-december/
│   ├── 01-mon/
│   │   ├── li-ai-automation.md
│   │   └── tw-quick-tip.md
│   ├── 02-tue/
│   │   ├── li-case-study.md
│   │   ├── twt-thought-piece.md
│   │   └── em-newsletter-value.md
│   └── 15-sun/
│       └── vid-product-demo.md
├── 01-2026-january/
│   └── ...
└── README.md
```

## Content Status Workflow

### Status Values
1. **draft** - Initial generation, needs review
2. **review** - Ready for quality check and edits
3. **approved** - Passed quality check, ready to schedule
4. **published** - Live on platform(s)

### Status Transitions
```
draft → review → approved → published
  ↓        ↓
  └────────┴─→ [needs-revision] → draft
```

## Platform-Specific Formatting

### LinkedIn Posts
- Include character count (must be ≤2,800)
- Use line breaks for readability
- Format headers clearly
- Include soft CTAs at end

### Twitter/X Posts
- Single posts ≤280 characters
- Threads: Number posts (1/X, 2/X, etc.)
- Include thread structure notes
- Note primary post for hook

### Emails
- Include subject line separately
- Format with one sentence per line
- Mark CTA variables with backticks: `{{cta_link}}`
- Note email type (value/direct)

### Video Scripts
- Include estimated duration
- Mark visual cues and b-roll
- Include CTA timing notes
- Format for teleprompter reading

## Output Delivery

When generating content, provide:

1. **Complete Content**: Full formatted markdown
2. **Metadata Summary**: Quick reference stats
3. **Platform Notes**: Any platform-specific considerations
4. **File Confirmation**: Confirm where file was saved

### Example Output Format

```markdown
# Generated Content

[Full content here formatted per platform rules]

---

## Summary
- **Platform**: LinkedIn
- **Type**: Thought Leadership Post
- **Character Count**: 2,743 / 2,800
- **Status**: Ready for review

## Quality Notes
- Hook is within 200 char limit ✓
- Uses alternating format (bullets/paragraph) ✓
- Includes soft CTA ✓
- AI detection scan: Pending

## File Saved
✓ Saved to: clients/heymitch/content/12-2025-december/02-tue/li-ai-automation.md

## Next Steps
1. Run /quality:audit-ai-detection
2. Review for brand voice consistency
3. Change status to "Publish it!" when ready
```

## Workflow for Content Generation

When you generate ANY content (LinkedIn, Twitter, Email, Video), you MUST:

1. **Generate the content** following all platform and brand rules
2. **Immediately save to file** using Write tool with pattern: `clients/[client]/content/MM-YYYY-month/DD-day/platform-slug.md`
3. **Include full metadata** in the markdown file (character count, status, tags)
4. **Confirm to user** where the file was saved
5. **Suggest next steps** (quality audit, calendar sync)

**Do NOT just output content to the conversation. ALWAYS save to file automatically.**
