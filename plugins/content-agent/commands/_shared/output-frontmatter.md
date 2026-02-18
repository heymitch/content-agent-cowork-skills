# Output Frontmatter

All content files must include this YAML frontmatter:

```yaml
---
fileClass: content
title: [Title of Post]
platform: [linkedin/twitter/bluesky/instagram/email/video]
type: [post/thread/caption/email/script]
Publish_Date: YYYY-MM-DD
status: Draft
tags:
  - tag1
  - tag2
ai_score:
quality_grade:
media_url:
---
```

**Rules:**
- `fileClass: content` required for Obsidian
- `Publish_Date` is the calendar field (capital P and D)
- No quotes around values
- Tags as YAML list (not inline array)
- Leave `ai_score`, `quality_grade` empty for quality commands to fill
- `media_url` is for associated media (Gamma carousel URL, image URL, video URL)

**File path pattern:**
```
content/YYYY-MM/DD/[platform]-[slug].md
```
Example: `content/2026-02/12/li-ai-automation.md`
