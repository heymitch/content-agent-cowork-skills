<!-- DEPRECATED: This command file's logic has been absorbed into skills/instagram-writer/SKILL.md -->
---
description: Generate an Instagram caption (≤2,200 chars) optimized for mobile and engagement
---

# Generate Instagram Caption

You are now in Instagram content generation mode.

{{file:.claude/commands/_shared/preflight-checks.md}}

{{file:.claude/commands/_shared/client-context.md}}

## Loaded Prompt Stack
{{file:.claude/prompts/stacks/instagram-full.md}}

## Your Task

Generate a complete Instagram caption based on the user's topic or idea.

### Requirements

1. **Character Limit**: Must be ≤2,200 characters (including hashtags)
2. **First 125 Characters**: Hook that stops the scroll before "...more" cuts off
3. **Mobile Readability**: Short paragraphs (2-3 lines max), line breaks for scanning
4. **Visual Pairing**: Reference the visual when relevant ("swipe", "above", etc.)
5. **AI Detection**: Zero AI patterns - scan and remove before delivering
6. **Hashtags**: 3-5 relevant hashtags at the very end

### Process

{{file:.claude/commands/_shared/mentor-consulting.md}}

Replace `{{platform}}` with `instagram` when running mentor consulting.

2. **Gather Context**:
   - Ask for the topic/idea if not provided
   - Ask what visual will accompany (photo, carousel, reel cover?)
   - Ask for any specific numbers, examples, or proof points

3. **Generate Content**:
   - Apply Instagram formatting rules strictly
   - Hook must stop the scroll in first 125 chars
   - Break text for mobile readability
   - Include specific engagement trigger (not generic "link in bio")
   - Add 3-5 relevant hashtags at end

4. **Quality Check**:
   - Count characters (must be ≤2,200 including hashtags)
   - Scan for AI detection patterns (see `{{file:.claude/commands/_shared/quality-patterns.md}}`)
   - Verify mobile-friendly formatting
   - Check first 125 chars end on cliffhanger

5. **Save & Deliver**:
   - Save to `content/YYYY-MM/DD/ig-slug.md`
   - Run: `node scripts/count-chars.js <file-path>` to verify character count
   - Report results to user
   - Provide complete formatted caption
   - Note visual pairing suggestions

### Example Invocation

```
/content:generate-instagram I want to write about the 3 tools that replaced
my marketing team. Visual will be a carousel showing each tool.
```

### Use a Prompt Template (Optional)

Browse available prompts or search:
```
/prompts:search [query]
/prompts:list
```

Then attach with @ mention:
```
/content:generate-instagram @prompts/frameworks/listicle.md 5 apps I use daily as a solopreneur
```

## Output Format

{{file:.claude/commands/_shared/output-frontmatter.md}}

Use `platform: instagram` and `type: caption` in frontmatter.

Body should contain ONLY the raw caption content - no headers, no metadata sections.

```markdown
---
fileClass: content
title: [Title]
platform: instagram
type: caption
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

[COMPLETE CAPTION CONTENT - RAW TEXT WITH LINE BREAKS AND HASHTAGS]
```

{{file:.claude/commands/_shared/next-steps.md}}

Now ask the user for their topic/idea and begin the generation process.
