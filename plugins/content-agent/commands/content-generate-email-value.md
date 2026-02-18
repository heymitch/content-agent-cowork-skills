---
description: Generate a value-building email that educates and builds goodwill (400-500 words)
---

# Generate Value Email

You are now in email content generation mode (Value Email type).

{{file:.claude/commands/_shared/preflight-checks.md}}

{{file:.claude/commands/_shared/client-context.md}}

## Loaded Prompt Stack
{{file:.claude/prompts/stacks/email-full.md}}

## Your Task

Generate a value-building email that educates and engages without direct selling.

### Requirements

1. **Length**: 400-500 words
2. **Goal**: Build goodwill, demonstrate expertise, soft CTA
3. **Format**: One sentence per line (non-negotiable)
4. **Focus**: Maximum 2 tools/topics (depth over breadth)
5. **AI Detection**: Zero AI patterns

### Email Structure

1. **Subject Line** (30-40 chars, single tool focus)
2. **Personal Credibility Hook** (2-3 sentences)
3. **Problem Recognition** (2-3 sentences)
4. **Value Delivery** (8-12 sentences, 80% of content)
5. **Soft CTA** (1-2 sentences)
6. **Sign-off**

### Value Delivery Requirements

**ANTI-BREADTH GUARDRAILS:**
- Maximum 2 tools total (1 primary + 1 supporting)
- Primary tool gets 150+ words
- Minimum 3 tactical steps per tool
- Interface/screenshot details

**Primary Tool Structure:**
- Tool name (with version/pricing if relevant)
- What it does (one sentence)
- Step-by-step setup (3 steps minimum)
- Troubleshooting tip
- Your specific results
- Why this beats alternatives

### Process

{{file:.claude/commands/_shared/mentor-consulting.md}}

Replace `{{platform}}` with `email` when running mentor consulting.

2. **Gather Context**:
   - Ask for the topic/tool if not provided
   - Ask for specific results/metrics to include
   - Ask for target audience segment

3. **Generate Content**:
   - Craft subject line first (single tool focus)
   - Apply one-sentence-per-line formatting
   - Include tactical depth, not breadth
   - Keep soft CTA aligned with value provided
   - Apply mentor patterns (hooks, structure, closers)

4. **Quality Check**:
   - Verify one sentence per line
   - Check word count (400-500)
   - Scan for AI detection patterns (see `{{file:.claude/commands/_shared/quality-patterns.md}}`)
   - Verify depth over breadth

5. **Save & Deliver**:
   - Save to `content/YYYY-MM/DD/em-slug-value.md`
   - Run: `node scripts/count-chars.js <file-path>` to verify word count
   - Report results to user
   - Provide complete email with subject line options

### Example Invocation

```
/content:generate-email-value our new AI content workflow tool
Focus on the one-click publishing feature.
```

## Output Format

{{file:.claude/commands/_shared/output-frontmatter.md}}

Use `platform: email` and `type: value` in frontmatter.

```markdown
---
fileClass: content
title: [Email Topic]
platform: email
type: value
Publish_Date: YYYY-MM-DD
status: Draft
tags:
  - tag1
  - tag2
subject_primary: [Primary - 30-40 chars]
subject_alt_1: [Alternative]
subject_alt_2: [Alternative]
word_count: [X]
ai_score:
quality_grade:
gptzero_score:
---

[Complete email body with one sentence per line formatting]
```

{{file:.claude/commands/_shared/next-steps.md}}

Now ask the user for their topic and context.
