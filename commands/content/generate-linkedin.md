---
description: Generate a thought leadership LinkedIn post (≤2,800 chars) with proven formatting
---

# Generate LinkedIn Post

You are now in LinkedIn content generation mode.

{{file:.claude/commands/_shared/preflight-checks.md}}

{{file:.claude/commands/_shared/client-context.md}}

## Loaded Prompt Stack
{{file:.claude/prompts/stacks/linkedin-full.md}}

## Your Task

Generate a complete LinkedIn thought leadership post based on the user's topic or idea.

### Requirements

1. **Character Limit**: Must be ≤2,800 characters (non-negotiable)
2. **First 200 Characters**: Hook + cliffhanger that makes readers click "See more"
3. **Headers**: Tangible, specific, actionable, skimmable (use numbering or bullets)
4. **Format Alternation**: Alternate between bulleted lists and paragraph style throughout
5. **AI Detection**: Zero AI patterns - scan and remove before delivering
6. **Sections**: Introduction (200-400 chars) → 3-10 Main Sections → Conclusion

### Process

{{file:.claude/commands/_shared/mentor-consulting.md}}

Replace `{{platform}}` with `linkedin` when running mentor consulting.

2. **Gather Context**:
   - Ask for the topic/idea if not provided
   - Ask for any specific case studies, numbers, or examples to include
   - Ask if they want to use a custom framework (via `@` mention)

3. **Generate Content**:
   - Apply LinkedIn formatting rules strictly
   - Use one of the 5 proven styles (Steps, Stats, Mistakes, Lessons, Examples)
   - Pack tactical value into each section
   - Ensure headers deliver 80% of value on their own
   - Apply mentor patterns (hooks, structure, formatting)

4. **Quality Check**:
   - Count characters (must be ≤2,800)
   - Scan for AI detection patterns (see `{{file:.claude/commands/_shared/quality-patterns.md}}`)
   - Verify alternating format (bullets/paragraphs)
   - Check first 200 chars end on cliffhanger

5. **Save & Deliver**:
   - Save to `content/YYYY-MM/DD/li-slug.md`
   - Run: `node scripts/count-chars.js <file-path>` to verify character count
   - Report results to user (under/over limit)
   - Provide complete formatted post
   - Note which style/format used

### Example Invocation

```
/content:generate-linkedin I want to write about how we replaced our $72K/year
marketing coordinator with AI. Include specific ROI numbers and the tools we used.
```

### Use a Prompt Template (Optional)

Browse available prompts or search:
```
/prompts:search [query]
/prompts:list
```

Then attach with @ mention:
```
/content:generate-linkedin @prompts/frameworks/listicle.md 5 lessons from scaling to $1M ARR
```

## Output Format

{{file:.claude/commands/_shared/output-frontmatter.md}}

Use `platform: linkedin` and `type: post` in frontmatter.

Body should contain ONLY the raw post content - no headers, no metadata sections.

```markdown
---
fileClass: content
title: [Title]
platform: linkedin
type: post
Publish_Date: YYYY-MM-DD
status: Draft
tags:
  - tag1
  - tag2
ai_score:
quality_grade:
gptzero_score:
media_url:
---

[COMPLETE POST CONTENT - RAW TEXT ONLY]
```

{{file:.claude/commands/_shared/next-steps.md}}

Now ask the user for their topic/idea and begin the generation process.
