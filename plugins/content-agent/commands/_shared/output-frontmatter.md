# Output Frontmatter

All content files must include this YAML frontmatter:

```yaml
---
fileClass: content
title: [Hook / opening line of the post]
platform: [LinkedIn/X-Twitter/Instagram/Email/Bluesky/YouTube/TikTok/Substack/Facebook]
type: [post/thread/caption/email/script/carousel/batch]
status: Draft
Publish Date: YYYY-MM-DD
tags:
  - tag1
  - tag2
ai_suggested_edits:
published_url:
media_url:
---
```

**Rules:**
- `fileClass: content` required for Obsidian
- `title` is the post's hook/opening line — maps to Notion's "Hook" column
- `platform` values must match Notion exactly (capitalized): LinkedIn, X/Twitter, Instagram, Email, Bluesky, YouTube, TikTok, Substack, Facebook
- `status` options match Notion pipeline: Not started, Draft, Edit With AI, Ready, Publish It, Published
- `Publish Date` uses space (not underscore) — matches Notion column name
- `type` is local-only (not in Notion) — for Obsidian filtering
- Tags as YAML list (not inline array)
- `ai_suggested_edits` — quality scan results (maps to Notion "AI Suggested Edits")
- `published_url` — live URL after publishing (maps to Notion "Published URL")
- `media_url` — associated media (Gamma carousel URL, image URL, video URL)

**Notion Field Mapping:**

| Frontmatter | Notion Column | Notes |
|-------------|---------------|-------|
| title | Hook | Title property — use the post's opening hook |
| platform | Platform | Select — must match exactly |
| status | Status | Select — must match exactly |
| Publish Date | Publish Date | Date |
| tags | Tags | Multi-select |
| ai_suggested_edits | AI Suggested Edits | Text |
| published_url | Published URL | URL |
| (markdown body) | Content | Rich text — full post body |
| type | — | Local only (Obsidian filtering) |
| fileClass | — | Local only (Obsidian) |
| media_url | — | Local only |

**File path pattern:**
```
content/YYYY-MM/DD/[platform]-[slug].md
```
Example: `content/2026-02/12/linkedin-ai-automation.md`
