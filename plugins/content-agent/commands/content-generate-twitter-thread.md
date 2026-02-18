---
description: Generate Twitter/X thread (5-12 connected posts) with hook-driven structure
---

# Generate Twitter/X Thread

You are now in Twitter/X thread generation mode.

{{file:commands/_shared/preflight-checks.md}}

{{file:commands/_shared/client-context.md}}

## Loaded Prompt Stack
{{file:prompts/stacks/twitter-full.md}}

## Your Task

Generate a Twitter/X thread (5-12 connected posts) based on the user's topic or idea.

### Requirements

1. **Character Limit**: Each post must be ≤280 characters
2. **Length**: 5-12 posts total (default: 7-10)
3. **Numbering**: Use 1/, 2/, 3/ format (not 1/X)
4. **First Post**: Strongest hook - must stop the scroll
5. **Last Post**: Clear CTA (follow, reply, retweet, link)
6. **Flow**: Each post connects to next while standing alone
7. **AI Detection**: Zero AI patterns

### Thread Structure

```
Post 1: HOOK (strongest content, makes them click)
Post 2-3: Setup/Context (why this matters)
Post 4-8: Value Delivery (main points, steps, insights)
Post 9-10: Proof/Examples (case study, numbers)
Post 11: Summary/Synthesis (tie it together)
Post 12: CTA (what to do next)
```

### Process

{{file:commands/_shared/mentor-consulting.md}}

Replace `{{platform}}` with `twitter` and add `structure` focus when running mentor consulting.

2. **Gather Context**:
   - Ask for the topic/idea if not provided
   - Ask for thread length preference (5-12)
   - Ask for specific examples or data to include

3. **Generate Content**:
   - Craft hook first (most critical)
   - Build logical flow through thread
   - Include specific, tangible value
   - End with clear CTA
   - Apply mentor patterns (hooks, structure, pacing)

4. **Quality Check**:
   - Count characters for each post (must be ≤280)
   - Verify flow between posts
   - Scan for AI detection patterns (see `{{file:commands/_shared/quality-patterns.md}}`)
   - Check hook strength

5. **Save & Deliver**:
   - Save to `content/YYYY-MM/DD/twt-slug.md`
   - Run: `node scripts/count-chars.js <file-path>` to verify character count
   - Report results to user
   - Provide complete formatted thread

### Example Invocations

```
/content:generate-twitter-thread how I built a $10K/month side hustle
```

```
/content:generate-twitter-thread 7 lessons from scaling to 7 figures
```

## Output Format

{{file:commands/_shared/output-frontmatter.md}}

Use `platform: twitter` and `type: thread` in frontmatter.

```markdown
---
fileClass: content
title: [Thread Title]
platform: twitter
type: thread
Publish Date: YYYY-MM-DD
status: Draft
tags:
  - tag1
  - tag2
post_count: [X]
hook_type: [Question/Bold Statement/Story]
cta_type: [Follow/Reply/Link]
ai_score:
quality_grade:
gptzero_score:
---

1/ [Hook - strongest opening]

2/ [Setup/Context]

3/ [Value point 1]

[...continue...]

X/ [CTA - follow/reply/retweet/link]
```

**Posting Notes**:
- Post all at once or space 1-2 minutes apart
- Reply to first post with rest of thread

{{file:commands/_shared/next-steps.md}}

Now ask the user for their topic and thread preferences.
