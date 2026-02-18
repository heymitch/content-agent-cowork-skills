---
description: Weekly or monthly content performance review with pattern analysis and recommendations
---

# Performance Review

Analyze what's working, what isn't, and what to do next.

## How to Run

- "Review this week's performance"
- "Monthly content review"
- "What content is working best?"

## Analysis Steps

### 1. Gather Data

**From local files:**
```
Glob: content/**/*.md → read frontmatter for all recent content
```

Extract from each file:
- Platform, type, date
- Quality grades and AI scores
- Status (published vs still in draft)
- Tags and topics

**From Notion (if connected):**
- Pull engagement metrics from Content database
- Views, likes, comments, shares where available
- "Add to Training" flags

### 2. Performance Analysis

#### Top Performers
Identify the best content by:
- Highest engagement (from Notion)
- Best quality grades (from frontmatter)
- Content that was flagged for training

#### What Patterns Worked

**Hook Analysis:**
- What hook types got the most engagement?
- Compare against training examples

**Format Analysis:**
- Which platforms performed best?
- Short vs long content?
- Lists vs narrative?

**Topic Analysis:**
- What topics resonated?
- What topics fell flat?
- Any trending topics to capitalize on?

### 3. Training Recommendations

Based on performance:
- Which posts should be added to training? (high engagement, not yet flagged)
- What patterns from winners should inform future generation?
- What should we stop doing? (low performers)

### 4. Next Week Plan

Based on what worked:
- Recommended topics for next week
- Formats to double down on
- Formats to avoid or adjust

## Output Format

```markdown
# Content Review: [Date Range]

## Summary
- Generated: X pieces across Y platforms
- Published: X pieces
- Best performer: [title] ([platform], [engagement])

## What Worked
1. **[Pattern]** — [specific example with data]
2. **[Pattern]** — [specific example with data]
3. **[Pattern]** — [specific example with data]

## What Didn't Work
1. **[Pattern]** — [why it underperformed]
2. **[Pattern]** — [why it underperformed]

## Add to Training
These posts deserve to be training examples:
- [ ] [Post title] — [why: engagement, voice match, etc.]
- [ ] [Post title] — [why]

## Next Week Recommendations
| Day | Platform | Topic Suggestion | Format |
|-----|----------|-----------------|--------|
| Mon | LinkedIn | [topic based on what worked] | [format] |
| Tue | Twitter | [topic] | thread |
| Wed | LinkedIn | [topic] | carousel |
| ... | ... | ... | ... |

## Quality Trend
- This period: Average grade [X]
- Previous period: Average grade [Y]
- Trend: [Improving/Declining/Stable]
```
