<!-- DEPRECATED: This command file's logic has been absorbed into skills/video-writer/SKILL.md -->
---
description: Generate short-form video script (30-90 seconds) for TikTok, Reels, Shorts, or LinkedIn
---

# Generate Short-Form Video Script

You are now in video script generation mode.

{{file:commands/_shared/preflight-checks.md}}

{{file:commands/_shared/client-context.md}}

## Loaded Prompt Stack
{{file:prompts/stacks/video-short-full.md}}

## Your Task

Generate a short-form video script (30-90 seconds) based on the user's topic or idea.

### Requirements

1. **Duration**: 30-90 seconds (specify target)
2. **Hook**: Must grab attention in first 3 seconds
3. **Format**: Include visual cues and timing markers
4. **Platform**: Optimize for specified platform
5. **AI Detection**: Zero AI patterns in script

### Video Formats Available

1. **Hook-Value-CTA** (most common)
2. **Story-Lesson** (personal story with takeaway)
3. **Myth-Buster** (challenge common beliefs)
4. **Tutorial/How-To** (step-by-step guide)
5. **Hot Take/Opinion** (controversial statement)

### Script Components

- **Timing markers** (0-3s, 4-20s, etc.)
- **Visual cues** [B-ROLL: description]
- **Text on screen** [TEXT: "Key phrase"]
- **Audio notes** [PAUSE], [EMPHASIS], [SPEED UP]

### Process

{{file:commands/_shared/mentor-consulting.md}}

Replace `{{platform}}` with `video` and add `hooks` focus when running mentor consulting.

2. **Gather Context**:
   - Ask for the topic/idea if not provided
   - Ask for target platform (TikTok, Reels, Shorts, LinkedIn)
   - Ask for target duration (30s, 45s, 60s, 90s)
   - Ask for preferred format or let you choose

3. **Generate Script**:
   - Craft hook first (most critical - 3 seconds)
   - Build value section with specific points
   - Include visual and timing notes
   - End with clear CTA
   - Apply mentor patterns (hooks, pacing, structure)

4. **Quality Check**:
   - Verify hook is in first 3 seconds
   - Check pacing matches duration
   - Scan for AI detection patterns (see `{{file:commands/_shared/quality-patterns.md}}`)
   - Ensure platform optimization

5. **Save & Deliver**:
   - Save to `content/YYYY-MM/DD/vid-slug.md`
   - Run: `node scripts/count-chars.js <file-path>` to verify script length
   - Report results to user
   - Provide complete script with all cues

### Example Invocations

```
/content:generate-video-short why most productivity advice is wrong
Platform: TikTok, Duration: 60s, Format: Myth-Buster
```

```
/content:generate-video-short 3 AI tools that save me 10 hours a week
Platform: LinkedIn, Duration: 90s
```

## Output Format

{{file:commands/_shared/output-frontmatter.md}}

Use `platform: video` and `type: short` in frontmatter.

```markdown
---
fileClass: content
title: [Video Title]
platform: video
type: short
Publish_Date: YYYY-MM-DD
status: Draft
tags:
  - tag1
  - tag2
video_platform: [TikTok/Reels/Shorts/LinkedIn]
duration_seconds: [30/45/60/90]
format: [Hook-Value-CTA/Story-Lesson/etc.]
ai_score:
quality_grade:
gptzero_score:
---

## Hook (0-3s)
[Opening line that stops the scroll]
[VISUAL: Description]

## Value Section (4-Xs)

### Point 1 (4-15s)
[Specific point]
[B-ROLL: Description]
[TEXT ON SCREEN: "Key phrase"]

### Point 2 (16-30s)
[Specific point]
[VISUAL: Description]

## CTA (Last 5-10s)
[What viewer should do next]
[TEXT ON SCREEN: "CTA text"]
```

**Production Notes**:
- Film hook separately for multiple takes
- Use jump cuts to maintain pace
- Add captions for accessibility

{{file:commands/_shared/next-steps.md}}

Now ask the user for their topic, platform, and duration.
