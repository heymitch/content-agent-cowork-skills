---
name: content-analytics
description: Content generation stats, quality scores, publishing status breakdown, and weekly performance reviews. Say "Show my content stats" or "Review this week's performance".
user-invocable: true
---

# Content Analytics

> **How to run:** "Show my content stats", "Review this week's performance"

Track what you're creating, what's publishing, and what's performing.

---

## Commands

### Content Stats
**Trigger:** "Show my content stats" or "How much content have I made?"

1. Glob all files in `content/**/*.md`
2. Read frontmatter from each file
3. Report:

```markdown
# Content Stats

## Generation Summary
| Platform | Count | This Week | This Month |
|----------|-------|-----------|------------|

## Quality Scores
| Grade | Count | Percentage |
|-------|-------|------------|
| A     |       |            |
| B     |       |            |
| C+    |       |            |

## Publishing Status
| Status | Count |
|--------|-------|
| Draft  |       |
| Review |       |
| Publish it! |  |
| Scheduled |    |
| Published |    |

## Training Library
| Platform | Examples | Recent Adds |
|----------|----------|-------------|
```

If Notion MCP available: also pull engagement data (likes, comments, shares) from Content database.

---

### Performance Review
**Trigger:** "Review this week's performance" or "What's working?"

1. Pull content from the past 7 days (or user-specified range)
2. If Notion connected: pull engagement metrics
3. Analyze:

```markdown
# Performance Review: [Date Range]

## What Performed Best
1. [Title] — [platform] — [engagement if available]
   Pattern: [hook type], [structure], [CTA]

## Patterns That Worked
- Hook type: [most engaging]
- Platform: [best performing]
- Topic: [resonated most]

## What to Double Down On
- [Actionable recommendation based on data]

## What to Train On
- [Suggest adding top performers to training]

## Next Week Suggestions
- [Topic/format recommendations based on trends]
```

---

## Data Sources

| Source | What It Provides | How to Access |
|--------|-----------------|---------------|
| `content/**/*.md` frontmatter | Generation counts, quality scores, status | Glob + Read |
| Notion Content database | Engagement metrics, publishing dates | Notion MCP (if connected) |
| `training/examples/` | Training library size and composition | Glob |
