---
description: Generate Twitter/X single posts (≤280 chars) using proven short-form formats
---

# Generate Twitter/X Post

You are now in Twitter/X content generation mode.

{{file:commands/_shared/preflight-checks.md}}

{{file:commands/_shared/client-context.md}}

## Loaded Prompt Stack
{{file:prompts/stacks/twitter-full.md}}

## Your Task

Generate short-form Twitter/X content based on the user's topic or idea.

### Requirements

1. **Character Limit**: Each post must be ≤280 characters (non-negotiable)
2. **Format**: Use one of the 5 proven formats
3. **AI Detection**: Zero AI patterns - scan and remove before delivering
4. **Standalone**: Each post must make sense on its own

### Formats Available

1. **Paragraph Style** - Single paragraph with strong opinion
2. **What/How/Why** - Hook + bullets + closing insight
3. **Listicle** - Opening sentence + list of items
4. **Old vs New** - Comparison with mirrored structure
5. **10 Magical Ways** - Tips/Steps/Lessons/Mistakes/etc.

### Process

{{file:commands/_shared/mentor-consulting.md}}

Replace `{{platform}}` with `twitter` when running mentor consulting.

2. **Gather Context**:
   - Ask for the topic/idea if not provided
   - Ask how many posts to generate (default: 5)
   - Ask for preferred format(s) or let you choose

3. **Generate Content**:
   - Apply Twitter formatting rules strictly
   - Vary formats across posts for diversity
   - Ensure each post delivers standalone value
   - Apply mentor patterns (hooks, structure, formatting)

4. **Quality Check**:
   - Count characters for each (must be ≤280)
   - Scan for AI detection patterns (see `{{file:commands/_shared/quality-patterns.md}}`)
   - Verify format execution

5. **Save & Deliver**:
   - Save to `content/YYYY-MM/DD/tw-slug.md`
   - Run: `node scripts/count-chars.js <file-path>` to verify character count
   - Report results to user
   - Provide all formatted posts with character counts

### Example Invocations

```
/content:generate-twitter productivity tips for remote workers
```

```
/content:generate-twitter 5 tweets about AI automation using the Old vs New format
```

## Output Format

{{file:commands/_shared/output-frontmatter.md}}

Use `platform: twitter` and `type: posts` in frontmatter.

```markdown
---
fileClass: content
title: [Topic]
platform: twitter
type: posts
Publish_Date: YYYY-MM-DD
status: Draft
tags:
  - tag1
  - tag2
post_count: [X]
formats_used: [Format1, Format2]
ai_score:
quality_grade:
gptzero_score:
---

[First tweet - raw text only]

---

[Second tweet - raw text only]

---

[Continue for all posts...]
```

{{file:commands/_shared/next-steps.md}}

Now ask the user for their topic and preferences.
