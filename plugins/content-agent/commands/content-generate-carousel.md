---
description: Generate a LinkedIn carousel (3-10 slides) via Gamma API with brand styling
---

# Generate LinkedIn Carousel

You are now in carousel generation mode.

{{file:commands/_shared/preflight-checks.md}}

{{file:commands/_shared/client-context.md}}

## Loaded Skills
{{file:skills/gamma-api.md}}

## Your Task

Generate a LinkedIn carousel using Gamma API, styled to match the brand inspiration library.

### Requirements

1. **Slide Count**: 3-10 slides (5-7 is optimal for engagement)
2. **First Slide**: Bold hook that stops the scroll
3. **Middle Slides**: One clear point per slide, minimal text
4. **Last Slide**: CTA or summary takeaway
5. **Styling**: Match `inspiration/brand-style.md` colors/fonts

### Process

1. **Gather Content Direction**:
   ```
   Ask the user:
   - What's the carousel topic?
   - How many slides? (default: 5)
   - Any specific points to cover?
   ```

2. **Check Brand Style**:
   - Read `domains/lead-gen/content/clients/heymitch/inspiration/brand-style.md`
   - Note colors, fonts, visual personality
   - Check `/carousels` folder for reference designs

3. **Structure the Carousel**:
   ```
   Slide 1: Hook (bold statement, question, or stat)
   Slides 2-N: One key point per slide
   Final Slide: Summary + CTA
   ```

4. **Generate via Gamma API**:

   **IMPORTANT**: First read the API key from .env:
   ```bash
   # Read the key first
   cat .env | grep GAMMA_API_KEY
   ```

   Then use the **actual key value** in the curl command (do NOT use `${GAMMA_API_KEY}` - shell variable expansion doesn't work reliably in this context).

   Format slides with `---` separators and `#` headers:
   ```
   # Slide 1 Title
   • Bullet point
   • Bullet point

   ---

   # Slide 2 Title
   • Bullet point
   ```

   ```bash
   curl --request POST \
     --url https://public-api.gamma.app/v1.0/generations \
     --header 'Content-Type: application/json' \
     --header "X-API-KEY: [PASTE_ACTUAL_KEY_HERE]" \
     --data '{
       "inputText": "[SLIDE OUTLINE WITH --- BREAKS]",
       "textMode": "preserve",
       "format": "social",
       "themeId": "ash",
       "cardSplit": "inputTextBreaks",
       "imageOptions": {
         "source": "noImages"
       }
     }'
   ```

   **After getting generationId**, poll for completion:
   ```bash
   curl --request GET \
     --url https://public-api.gamma.app/v1.0/generations/[GENERATION_ID] \
     --header "X-API-KEY: [PASTE_ACTUAL_KEY_HERE]"
   ```

   **Valid imageOptions.source values**: `noImages`, `aiGenerated`, `unsplash`, `webFreeToUse`

5. **Save & Deliver**:
   - Save response URL to carousel file frontmatter as `gamma_url`
   - **Update associated post's `media_url`** with the gamma URL
   - Report carousel URL to user

### Slide Content Guidelines

**Hook Slide (Slide 1):**
- 5-10 words max
- Bold statement or question
- Creates curiosity gap

**Content Slides (2-N):**
- One point per slide
- 15-25 words max
- Use numbers when possible
- Clear hierarchy (title → supporting text)

**CTA Slide (Final):**
- Summary of key points OR
- Direct call to action
- Profile mention or next step

### Example Input Format

```
Slide 1: 5 AI Mistakes That Cost You $100K
Slide 2: Mistake #1: Starting too complex
Slide 3: Mistake #2: No success metrics
Slide 4: Mistake #3: Ignoring current workflows
Slide 5: Mistake #4: Over-automating too fast
Slide 6: Mistake #5: Skipping the pilot
Slide 7: The fix? Start small. Measure everything. Scale what works.
```

## Output Format

Save to `content/MM-YYYY-month/DD-day/carousel-slug.md`:

```markdown
---
fileClass: content
title: [Carousel Title]
platform: linkedin
type: carousel
slides: [number]
Publish Date: YYYY-MM-DD
status: Draft
gamma_url: [URL from Gamma response]
gamma_export: [PDF/PPTX URL if available]
image_path: [local path if downloaded]
tags:
  - carousel
  - [topic-tag]
---

## Slide Outline

[The slide-by-slide content used for generation]

## Generation Notes

- Theme: [theme used]
- Style: [visual style]
- Generated: [timestamp]
```

{{file:commands/_shared/next-steps.md}}

## Quick Start

```
/content:generate-carousel "5 mistakes people make with AI agents"
```

Now ask the user for their carousel topic and begin.
