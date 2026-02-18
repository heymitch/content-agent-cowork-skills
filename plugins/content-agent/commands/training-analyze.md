---
description: Analyze patterns in your training examples to understand what works
---

# Training Analyze

Analyze patterns in your training examples to understand what works.

## What to Analyze

Run this analysis using native tools (Glob/Grep/Read):

### 1. Quick Stats

```
Glob: training/examples/**/*.md → count by platform
Glob: training/examples/**/high-performers/*.md → count high performers
```

Report:
- Total examples by platform
- High performers vs recent
- Date range of examples

### 2. Hook Patterns

```
Read first non-frontmatter line from each training example
```

Categorize hooks found:
- **Numbers in hooks**: "I made $X doing Y"
- **Contrarian takes**: "Stop doing X"
- **Story openers**: "3 years ago I..."
- **Questions**: "Why do most X fail?"
- **Bold claims**: "[Strong statement]. Here's why."

Report which hook types appear most in high-performers vs all.

### 3. Engagement Correlation

```
Grep: engagement: in training/examples/
```

Sort by engagement, identify:
- What topics get highest engagement?
- What formats (post length, structure) correlate with performance?
- What hooks appear in top 10 posts?

### 4. Common Tags

```
Grep: tags: in training/examples/
```

Count tag frequency. Report top 10 most-used tags.

### 5. Structure Patterns

For high-performer files, analyze:
- Average post length (word count)
- Use of bullet points vs paragraphs
- Number of sections/breaks
- CTA placement and style

### 6. Voice Consistency

Read `config.md` Voice Profile section, then compare against high-performer content:
- Does the archetype match what's actually performing?
- Are there tone markers in high-performers not captured in voice profile?

## Output

Present a clear summary:

```markdown
# Training Analysis

## Quick Stats
- LinkedIn: X examples (Y high-performers)
- Twitter: X examples (Y high-performers)
- Total: X examples

## What's Working
1. [Pattern 1 with specific examples]
2. [Pattern 2 with specific examples]
3. [Pattern 3 with specific examples]

## Hook Breakdown
| Type | Count | % of High Performers |
|------|-------|---------------------|
| Numbers | X | Y% |
| Contrarian | X | Y% |
| Story | X | Y% |

## Recommendations
1. [Actionable suggestion based on data]
2. [Actionable suggestion based on data]
3. [Actionable suggestion based on data]

## Missing
- [Gaps in training data — platforms or types underrepresented]
```

## Action Items

After analysis:
1. Add winning hooks to `prompts/hooks/` if not already there
2. Update voice profile if patterns diverge
3. Suggest specific types of content to add to training
4. Feed insights into next generation session
