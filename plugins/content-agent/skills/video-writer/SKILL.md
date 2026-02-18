---
name: video-writer
description: Generate short-form video scripts (30-90s) and Remotion animated clips (quote cards, stat highlights, hooks). Say "Script a video about X" or "Create an animated video".
user-invocable: true
---

# Video Writer

You are now in video content generation mode.

{{file:commands/_shared/preflight-checks.md}}

{{file:commands/_shared/client-context.md}}

## Collaboration Mode

{{file:commands/_shared/collaboration-mode.md}}

Replace `{platform}` with `video` when checking mode.

---

## Content Type Detection

Determine which format the user wants:

| Request Contains | Type | Output |
|-----------------|------|--------|
| Video script, short video, TikTok, Reels, Shorts | **Short Script** | Written script with timing + visual cues |
| Animated video, quote card, stat card, hook slide | **Remotion Animated** | Rendered MP4 via Remotion templates |

If unclear, default to Short Script.

---

## Short Script Generation

### Loaded Prompt Stack
{{file:prompts/stacks/video-short-full.md}}

### Training Consultation
{{file:commands/_shared/mentor-consulting.md}}

Replace `{{platform}}` with `video` and add `hooks` focus when running mentor consulting.

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

### Process (Autopilot Mode)

1. **Gather Context**:
   - Ask for the topic/idea if not provided
   - Ask for target platform (TikTok, Reels, Shorts, LinkedIn)
   - Ask for target duration (30s, 45s, 60s, 90s)
   - Ask for preferred format or let you choose

2. **Consult Training Examples** (per mentor consulting protocol above)

3. **Generate Script**:
   - Craft hook first (most critical — 3 seconds)
   - Build value section with specific points
   - Include visual and timing notes
   - End with clear CTA
   - Apply mentor patterns (hooks, pacing, structure)

4. **Quality Check**:
   - Verify hook is in first 3 seconds
   - Check pacing matches duration
   - Scan for AI detection patterns
   - Ensure platform optimization

5. **Save & Deliver**:
   - Save to `content/YYYY-MM/DD/vid-slug.md`
   - Run: `node scripts/count-chars.js <file-path>` to verify script length
   - Provide complete script with all cues

### Short Script Output Format

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

---

## Remotion Animated Clip Generation

### Available Templates

| Template | Best For | Duration |
|----------|----------|----------|
| `QuoteCard` | Testimonials, wisdom, inspiration | 4 sec |
| `StatCard` | Data highlights, social proof | 4 sec |
| `HookSlide` | Carousel openers, scroll-stoppers | 3 sec |
| `ListSlide` | Benefits, steps, tips | 5 sec |

All templates available in square (1080x1080) and wide (1920x1080) formats.
Add `Wide` suffix for wide format (e.g., `QuoteCardWide`).

### Process

1. **Check Brand Colors**:
   Read `inspiration/brand-style.md` and check if `videos/templates/src/brand.ts` matches.
   If not, suggest updating brand.ts.

2. **Gather Requirements**:
   - What type of video? (quote, stat, hook, list)
   - What content? (the actual text)
   - Square or wide format?
   - Preset? (dark, light, bold, minimal)

3. **Generate Props JSON**:

   **QuoteCard:**
   ```json
   {
     "quote": "The actual quote text",
     "author": "Author Name",
     "preset": "dark"
   }
   ```

   **StatCard:**
   ```json
   {
     "number": "73%",
     "label": "of buyers read 3+ pieces before talking to sales",
     "preset": "dark"
   }
   ```

   **HookSlide:**
   ```json
   {
     "mainText": "Stop scrolling. This changes everything.",
     "subText": "Here's what nobody tells you →",
     "preset": "bold"
   }
   ```

   **ListSlide:**
   ```json
   {
     "title": "What you'll learn:",
     "items": ["Item one", "Item two", "Item three", "Item four"],
     "preset": "dark"
   }
   ```

4. **Render Video**:
   ```bash
   cd videos/templates && npm run render [TEMPLATE_ID] -- \
     --props='[PROPS_JSON]' \
     -o ../../content/[YYYY-MM]/[DD]/[slug].mp4
   ```

5. **Verify & Report**:
   - Check the output file exists
   - Report file path and size
   - Suggest next steps (post to social, add to carousel)

### Prerequisites

Ensure Remotion is installed:
```bash
cd videos/templates && npm install
```

### Updating Brand Colors

If user's `inspiration/brand-style.md` has different colors than `videos/templates/src/brand.ts`:
1. Extract hex codes from brand-style.md
2. Update `src/brand.ts` with new values
3. Restart Remotion studio if running

---

## Quality Scan

{{file:commands/_shared/quality-patterns.md}}

Self-audit all script content before showing to the user. Grade must be B or higher.

---

{{file:commands/_shared/next-steps.md}}

---

## Rules (Non-Negotiable)

- NEVER generate without consulting training examples first (if they exist)
- NEVER show content you haven't self-audited
- NEVER skip the 3-second hook rule for short scripts
- Ask for topic/ideas if not provided
