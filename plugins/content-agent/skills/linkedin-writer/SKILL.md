---
name: linkedin-writer
description: Generate voice-matched LinkedIn posts and carousels. Say "Write a LinkedIn post about X" or "Create a carousel about X".
user-invocable: true
---

# LinkedIn Writer

You are now in LinkedIn content generation mode.

{{file:commands/_shared/preflight-checks.md}}

{{file:commands/_shared/client-context.md}}

## Collaboration Mode

{{file:commands/_shared/collaboration-mode.md}}

Replace `{platform}` with `linkedin` when checking mode.

---

## Content Type Detection

Determine which format the user wants:

| Request Contains | Type | Constraints |
|-----------------|------|-------------|
| Post, LinkedIn, thought leadership | **Standard Post** | ≤2,800 characters |
| Carousel, slides, swipe | **Carousel** | 3-10 slides via Gamma |

If unclear, default to Standard Post.

---

## Standard Post Generation

### Loaded Prompt Stack
{{file:prompts/stacks/linkedin-full.md}}

### Training Consultation
{{file:commands/_shared/mentor-consulting.md}}

Replace `{{platform}}` with `linkedin` when running mentor consulting.

### Requirements

1. **Character Limit**: Must be ≤2,800 characters (non-negotiable)
2. **First 200 Characters**: Hook + cliffhanger that makes readers click "See more"
3. **Headers**: Tangible, specific, actionable, skimmable (use numbering or bullets)
4. **Format Alternation**: Alternate between bulleted lists and paragraph style throughout
5. **AI Detection**: Zero AI patterns — scan and remove before delivering
6. **Sections**: Introduction (200-400 chars) → 3-10 Main Sections → Conclusion

### Process (Autopilot Mode)

1. **Gather Context**:
   - Ask for the topic/idea if not provided
   - Ask for any specific case studies, numbers, or examples to include
   - Ask if they want to use a custom framework (via `@` mention)

2. **Consult Training Examples** (per mentor consulting protocol above)

3. **Generate Content**:
   - Apply LinkedIn formatting rules strictly
   - Use one of the 5 proven styles (Steps, Stats, Mistakes, Lessons, Examples)
   - Pack tactical value into each section
   - Ensure headers deliver 80% of value on their own
   - Apply mentor patterns (hooks, structure, formatting)

4. **Quality Check**:
   - Count characters (must be ≤2,800)
   - Scan for AI detection patterns (see quality patterns below)
   - Verify alternating format (bullets/paragraphs)
   - Check first 200 chars end on cliffhanger

5. **Save & Deliver**:
   - Save to `content/YYYY-MM/DD/li-slug.md`
   - Run: `node scripts/count-chars.js <file-path>` to verify character count
   - Report results to user (under/over limit)
   - Provide complete formatted post
   - Note which style/format used

### Use a Prompt Template (Optional)

Browse available prompts or search:
```
/prompts:search [query]
/prompts:list
```

Then attach with @ mention:
```
/linkedin-writer @prompts/frameworks/listicle.md 5 lessons from scaling to $1M ARR
```

### Output Format

{{file:commands/_shared/output-frontmatter.md}}

Use `platform: linkedin` and `type: post` in frontmatter.

Body should contain ONLY the raw post content — no headers, no metadata sections.

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

---

## Carousel Generation

### Requirements

1. **Slide Count**: 3-10 slides (5-7 is optimal for engagement)
2. **First Slide**: Bold hook that stops the scroll
3. **Middle Slides**: One clear point per slide, minimal text
4. **Last Slide**: CTA or summary takeaway
5. **Styling**: Match `inspiration/brand-style.md` colors/fonts

### Process

1. **Gather Content Direction**:
   - What's the carousel topic?
   - How many slides? (default: 5)
   - Any specific points to cover?

2. **Check Brand Style**:
   - Read `inspiration/brand-style.md` if available
   - Note colors, fonts, visual personality

3. **Structure the Carousel**:
   ```
   Slide 1: Hook (bold statement, question, or stat)
   Slides 2-N: One key point per slide
   Final Slide: Summary + CTA
   ```

4. **Generate via Gamma API**:

   Read the API key from .env:
   ```bash
   cat .env | grep GAMMA_API_KEY
   ```

   Use the **actual key value** in the curl command (do NOT use `${GAMMA_API_KEY}`).

   Format slides with `---` separators and `#` headers:
   ```
   # Slide 1 Title
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

   Poll for completion:
   ```bash
   curl --request GET \
     --url https://public-api.gamma.app/v1.0/generations/[GENERATION_ID] \
     --header "X-API-KEY: [PASTE_ACTUAL_KEY_HERE]"
   ```

   **Valid imageOptions.source values**: `noImages`, `aiGenerated`, `unsplash`, `webFreeToUse`

5. **Save & Deliver**:
   - Save response URL to carousel file frontmatter as `gamma_url`
   - Update associated post's `media_url` with the gamma URL
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

### Carousel Output Format

Save to `content/YYYY-MM/DD/carousel-slug.md`:

```markdown
---
fileClass: content
title: [Carousel Title]
platform: linkedin
type: carousel
slides: [number]
Publish_Date: YYYY-MM-DD
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

---

## Quality Scan

{{file:commands/_shared/quality-patterns.md}}

Self-audit all output before showing to the user. Grade must be B or higher. If below B, fix it yourself — never show the user a C+ draft.

---

{{file:commands/_shared/next-steps.md}}

---

## Rules (Non-Negotiable)

- NEVER generate without consulting training examples first (if they exist)
- NEVER show content you haven't self-audited
- NEVER use your own judgment on "what sounds human" — use the quality patterns
- NEVER exceed 2,800 characters for posts
- Ask for topic/ideas if not provided
