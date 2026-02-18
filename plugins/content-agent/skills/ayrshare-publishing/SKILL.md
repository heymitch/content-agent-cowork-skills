---
name: ayrshare-publishing
description: Schedule and auto-publish content to social media platforms via Ayrshare API. Supports LinkedIn, Twitter, Instagram, Facebook, and TikTok.
user-invocable: true
version: 1.0.0
---

# Ayrshare Publishing

> **How to run:** "Schedule this post" or "Publish this to LinkedIn"

## Preflight

### 1. Check AYRSHARE_API_KEY
Read `.env` and check for `AYRSHARE_API_KEY`.
- **If missing:** Say: "I need your Ayrshare API key to publish. Get one at https://www.ayrshare.com/ and add `AYRSHARE_API_KEY=your-key` to your `.env` file."
- **If found:** Continue. Update config.md `- [x] Ayrshare connected` if not already checked.

### 2. Check content status
Content must have `status: "Publish It"` in frontmatter.
- If status is anything else, inform user and show how to update.

## Process

1. **Receive content** — file path or most recently generated content
2. **Verify status** — must be "Publish It"
3. **Schedule via Ayrshare:**
   ```bash
   node scripts/schedule-ayrshare.js <file-path>
   ```
4. **Update frontmatter** — status → "Scheduled", add ayrshare_id
5. **Report result** — scheduled time, platform, Ayrshare ID

## Status Flow

```
Draft → Edit With AI → Ready → Publish It → Scheduled → Published
```

## Supported Platforms

| Platform | Supported |
|----------|-----------|
| LinkedIn | Yes |
| X/Twitter | Yes |
| Facebook | Yes |
| Instagram | Yes |
| TikTok | Yes |

## Required Frontmatter

```yaml
---
platform: LinkedIn
Publish Date: 2026-02-18
status: "Publish It"
---
```

## Output

```
Scheduled: [platform] post for [date/time]
Ayrshare ID: [id]
Status updated: "Publish It" → "Scheduled"
```
