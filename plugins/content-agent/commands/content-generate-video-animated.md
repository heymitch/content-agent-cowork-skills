<!-- DEPRECATED: This command file's logic has been absorbed into skills/video-writer/SKILL.md -->
---
description: Generate animated video clips (quote cards, stat highlights, hooks) using Remotion - no API key needed
---

# Generate Animated Video

Create short animated video clips using Remotion templates.

{{file:commands/_shared/preflight-checks.md}}

{{file:commands/_shared/client-context.md}}

## Available Templates

| Template | Best For | Duration |
|----------|----------|----------|
| `QuoteCard` | Testimonials, wisdom, inspiration | 4 sec |
| `StatCard` | Data highlights, social proof | 4 sec |
| `HookSlide` | Carousel openers, scroll-stoppers | 3 sec |
| `ListSlide` | Benefits, steps, tips | 5 sec |

All templates available in square (1080x1080) and wide (1920x1080) formats.
Add `Wide` suffix for wide format (e.g., `QuoteCardWide`).

## Process

### 1. Check Brand Colors

Read `inspiration/brand-style.md` and check if `videos/templates/src/brand.ts` matches.
If not, suggest updating brand.ts.

### 2. Gather Requirements

Ask the user:
- What type of video? (quote, stat, hook, list)
- What content? (the actual text)
- Square or wide format?
- Preset? (dark, light, bold, minimal)

### 3. Generate Props JSON

Build the props object for the chosen template:

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

### 4. Render Video

```bash
cd videos/templates && npm run render [TEMPLATE_ID] -- \
  --props='[PROPS_JSON]' \
  -o ../../content/[YYYY-MM]/[DD]/[slug].mp4
```

Example:
```bash
cd videos/templates && npm run render QuoteCard -- \
  --props='{"quote":"Great ideas need wings","author":"Mitch","preset":"dark"}' \
  -o ../../content/2026-02/03/quote-wings.mp4
```

### 5. Verify & Report

- Check the output file exists
- Report file path and size
- Suggest next steps (post to social, add to carousel)

## Example Invocations

```
/content:generate-video-animated quote "The best time to start was yesterday" by Unknown
```

```
/content:generate-video-animated stat "3x" "more engagement with video vs static images"
```

```
/content:generate-video-animated hook "AI won't take your job. Someone using AI will."
```

## Prerequisites

Ensure Remotion is installed:
```bash
cd videos/templates && npm install
```

## Updating Brand Colors

If user's `inspiration/brand-style.md` has different colors than `videos/templates/src/brand.ts`:

1. Extract hex codes from brand-style.md
2. Update `src/brand.ts` with new values
3. Restart Remotion studio if running

Or run `/design:analyze-inspiration` to auto-extract.

## Output

Videos are rendered as MP4 files, ready for:
- LinkedIn posts/carousels
- Twitter/X videos
- Instagram Reels
- TikTok

No watermarks. No API costs. Full control.
