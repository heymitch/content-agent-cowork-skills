---
description: Schedule content to Ayrshare for auto-publishing (only sends if status is "Publish it!")
---

# Schedule to Ayrshare

You are now in publishing mode.

## Preflight Check

### 1. Check AYRSHARE_API_KEY
```
Read .env and check for AYRSHARE_API_KEY
```
- **If missing:** Say: "I need your Ayrshare API key to publish. Get one at https://www.ayrshare.com/ and add `AYRSHARE_API_KEY=your-key` to your `.env` file."
- **If found:** Continue. Update config.md `- [x] Ayrshare connected` if not already checked.

### 2. Check content status
- Content must have `status: "Publish it!"` in frontmatter
- If status is anything else, inform user and show how to update

## Your Task

Schedule approved content to Ayrshare for automatic publishing at the specified `publish_date`.

**IMPORTANT**: Content is ONLY sent if `status: "Publish it!"` in the frontmatter.

## How It Works

1. Check file has `status: "Publish it!"`
2. Read `publish_date` for when to publish
3. Send content + schedule to Ayrshare API
4. Update status to "Scheduled"
5. Add `ayrshare_id` to frontmatter for tracking

## Process

1. **Receive File Path**:
   - Accept file path as argument OR
   - Ask for the file path if not provided

2. **Run the Script**:
   ```bash
   node scripts/schedule-ayrshare.js <file-path>
   ```

3. **Handle Result**:
   - Success: Report scheduled time and Ayrshare ID
   - Skipped: Status wasn't "Publish it!" - inform user
   - Error: Report the issue

## Status Flow

```
Draft → Review → Publish it! → [this command] → Scheduled → [Ayrshare posts] → Published
```

## Required Frontmatter

For the script to work, content must have:

```yaml
---
title: "Post Title"
platform: linkedin  # linkedin, twitter, instagram, facebook, tiktok
publish_date: 2025-12-05  # When to publish
status: "Publish it!"     # REQUIRED - triggers the publish
---
```

## Example Invocations

**Schedule specific file:**
```
/publish:schedule-ayrshare content/2026-02/12/li-ai-tips.md
```

**Schedule with custom time (default is 9:00 AM):**
```
/publish:schedule-ayrshare content/2026-02/12/li-ai-tips.md 14:30
```

## Output Format

```markdown
# Ayrshare Scheduling Result

## Successfully Scheduled

| Field | Value |
|-------|-------|
| File | [file path] |
| Platform | [platform] |
| Scheduled For | [datetime] |
| Ayrshare ID | [id] |

Status updated: "Publish it!" → "Scheduled"

## What Happens Next

1. Ayrshare holds the post until the scheduled time
2. At publish time, Ayrshare posts to [platform]
3. You can view/edit in Ayrshare dashboard
```

## Supported Platforms

| Platform | Ayrshare Support |
|----------|-----------------|
| linkedin | Yes |
| twitter | Yes |
| facebook | Yes |
| instagram | Yes |
| tiktok | Yes |

Now provide the file path to schedule, or confirm to use the most recently generated content.
