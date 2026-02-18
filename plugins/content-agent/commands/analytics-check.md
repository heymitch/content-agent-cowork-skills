---
description: Check content analytics — generation counts, quality scores, publishing status
---

# Content Analytics Check

Show a snapshot of your content performance and pipeline status.

## How to Run

- "Show my content stats"
- "How much content have I generated?"
- "What's my content pipeline look like?"

## What to Analyze

### 1. Content Generation Stats

```
Glob: content/**/*.md → count all content files
```

Break down by:
- **Platform**: LinkedIn, Twitter, email, video, carousel, etc. (from frontmatter `platform:`)
- **Date range**: This week, this month, all time
- **Type**: posts, threads, singles-batch, carousel, script, etc.

### 2. Training Library Stats

```
Glob: training/examples/**/*.md → count training files
```

Break down by:
- Platform
- High-performers vs recent
- User-created vs synced from Notion

### 3. Quality Scores

```
Grep: ai_score: in content/
Grep: quality_grade: in content/
Grep: gptzero_score: in content/
```

For files that have been quality-checked:
- Average AI detection score
- Grade distribution (A/B/C/D/F)
- GPTZero score range

### 4. Status Pipeline

```
Grep: status: in content/
```

Count by status:
- Not started
- Draft
- Edit With AI
- Ready
- Publish It
- Scheduled
- Published

### 5. Notion Stats (if connected)

If Notion MCP tools are available:
- Query Content database for engagement data
- Pull view counts, likes, comments where available
- Identify top performers by engagement

## Output Format

```markdown
# Content Stats

## Generation Summary
| Platform | This Week | This Month | Total |
|----------|-----------|------------|-------|
| LinkedIn | X | X | X |
| Twitter | X | X | X |
| Email | X | X | X |
| Video | X | X | X |
| Carousel | X | X | X |
| **Total** | **X** | **X** | **X** |

## Pipeline Status
| Status | Count |
|--------|-------|
| Draft | X |
| Review | X |
| Approved | X |
| Scheduled | X |
| Published | X |

## Quality Scores (checked content only)
- Average AI score: X/100
- Grade distribution: A(X) B(X) C(X) D(X) F(X)
- GPTZero average: X% human

## Training Library
- Total examples: X
- High performers: X
- Platforms covered: [list]

## Recommendations
- [If low quality scores: suggest running quality pipeline]
- [If no training: suggest adding winners]
- [If stuck in Draft: suggest review workflow]
```
