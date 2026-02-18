---
name: training-manager
description: Add winning content to training, sync winners from Notion, and analyze what patterns perform best. Say "Add this to training", "Sync my training", or "Analyze my training". Also detects when you share your own writing and offers to save it.
user-invocable: true
---

# Training Manager

> **How to run:** "Add this to training", "Sync my training", "Analyze my training"

Your agent learns from your best-performing content. This skill manages that learning loop.

---

## Proactive Detection

When a user shares content that appears to be their own writing — pasted posts, "here's something I wrote", "check out this post I published", forwarded content from their platforms — ask:

> "This looks like something you wrote. Want me to add it to your training examples? The more of your winning content I learn from, the better I match your voice."

**Signals that content is the user's own:**
- They paste a post and say "I wrote this" / "here's my post" / "I published this"
- They share content and ask for feedback on it
- They say "this one performed well" or reference engagement numbers
- They paste raw content (no attribution to someone else)
- Content arrives via Notion sync with "Add to Training" checked

**Do NOT auto-detect if:**
- They're sharing someone else's content for inspiration
- They explicitly say "here's an example from [other person]"
- They're asking you to rewrite or remix existing content

When in doubt, ask. One question: "Is this yours? Want me to save it to training?"

---

## Commands

### Add to Training
**Trigger:** "Add this to training", "Save this as a winner", or proactive detection (above)

1. Accept content (pasted text, file path, or most recent generation)
2. Detect platform (LinkedIn, Twitter, Email, etc.) — ask if ambiguous
3. Extract patterns: hook type, structure, CTA style, tone
4. Generate a descriptive slug from the content's first line or topic
5. Save to `training/examples/{platform}/all/user-{slug}.md` with frontmatter:

```yaml
---
platform: linkedin
tags: [hook-type, structure-type]
human_score: 90
source: user
date_added: 2026-02-18
topic: "detected topic"
engagement: (if known)
notes: (user's context about why it performed)
---
```

6. Update `training/examples/_index.md` — increment the user examples count table
7. Confirm: "Saved to training. I'll reference this pattern next time I write {platform} content for you."

### Sync from Notion
**Trigger:** "Sync my training" or "Pull winners from Notion"

**Path 1 — Notion MCP available (Cowork):**
1. Search Notion Content database for pages where "Add to Training" = checked
2. For each winner: extract content, detect platform, save to training/examples/
3. Use `source: user` in frontmatter (these are the user's posts)
4. Update the index counts
5. Report: "Synced {N} posts from Notion to training."

**Path 2 — Script fallback:**
```bash
node scripts/sync-training.js
```

### Analyze Training
**Trigger:** "Analyze my training" or "Show me what's working"

1. Glob all files in `training/examples/`
2. Count by platform, source (user vs. mentor), hook type, structure
3. Identify top-performing patterns from user examples specifically
4. Report:

```markdown
# Training Analysis

## Your Examples vs. Bundled
| Source | Count | Platforms |
|--------|-------|-----------|
| Your posts | {N} | {platforms} |
| Bundled (Cole + Dickie) | 696 | linkedin, twitter, instagram, youtube, tiktok |

## By Platform
| Platform | Your Examples | Bundled | Top Hook Type |
|----------|---------------|---------|---------------|

## Top Patterns (from your content)
- Most common hook: [type]
- Most common structure: [type]
- Engagement sweet spot: [pattern]

## Recommendations
- You need more [platform] examples
- Your [hook type] consistently outperforms
- Consider training on [gap]
```

---

## Rules

- **User examples (`source: user`) always get priority** over bundled examples when generating content. They're closer to the user's actual voice.
- **Always update the index** after adding examples. The counts in `training/examples/_index.md` should stay accurate.
- **Never modify bundled examples.** The 696 mentor posts are reference material — read-only.
- **Ask about engagement** when adding a post. "Do you know how this performed? Likes, comments, impressions?" Even rough numbers help the analysis.
