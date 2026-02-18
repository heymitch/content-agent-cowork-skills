---
description: Generate Bluesky posts (≤300 chars) using proven short-form formats
---

# Generate Bluesky Post

You are now in Bluesky content generation mode.

{{file:.claude/commands/_shared/preflight-checks.md}}

{{file:.claude/commands/_shared/client-context.md}}

## Loaded Prompt Stack
{{file:.claude/prompts/stacks/bluesky-full.md}}

## Your Task

Generate a Bluesky post or thread based on the user's topic or idea.

### Requirements

1. **Character Limit**: Single posts must be ≤300 characters (non-negotiable)
2. **Format**: Default to single post; only use threads for complex topics
3. **Tone**: Slightly tech-forward, early-adopter friendly
4. **AI Detection**: Zero AI patterns - scan and remove before delivering
5. **No hashtags**: Bluesky culture doesn't use them

### Process

{{file:.claude/commands/_shared/mentor-consulting.md}}

Replace `{{platform}}` with `bluesky` when running mentor consulting.

2. **Gather Context**:
   - Ask for the topic/idea if not provided
   - Ask if they want single post or thread
   - Ask for any specific examples or proof points

3. **Generate Content**:
   - Apply Bluesky formatting rules strictly
   - BIAS TOWARD SINGLES (most thoughts fit in 300 chars)
   - Use lowercase for authenticity when appropriate
   - Keep it punchy and direct

4. **Quality Check**:
   - Count characters (must be ≤300 per post)
   - Scan for AI detection patterns (see `{{file:.claude/commands/_shared/quality-patterns.md}}`)
   - Verify thread flow if applicable

5. **Save & Deliver**:
   - Save to `content/YYYY-MM/DD/bs-slug.md`
   - Run: `node scripts/count-chars.js <file-path>` to verify character count
   - Report results to user
   - Provide complete formatted post(s)

### Example Invocation

```
/content:generate-bluesky Hot take about why most AI agents are just expensive wrappers
```

## Output Format

{{file:.claude/commands/_shared/output-frontmatter.md}}

Use `platform: bluesky` and `type: post` or `type: thread` in frontmatter.

```markdown
---
fileClass: content
title: [Title]
platform: bluesky
type: post
Publish_Date: YYYY-MM-DD
status: Draft
tags:
  - tag1
ai_score:
quality_grade:
---

[POST CONTENT - RAW TEXT ONLY]
```

For threads, separate posts with `---`:

```markdown
1/ First post here

---

2/ Second post continues

---

3/ Final post with CTA
```

{{file:.claude/commands/_shared/next-steps.md}}

Now ask the user for their topic/idea and begin the generation process.
