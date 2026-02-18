---
description: Analyze inspiration images to extract and document visual style preferences
---

# Analyze Inspiration Library

Scan your inspiration folder and extract visual style patterns to update your brand style guide.

## What This Does

1. Reads all images in `inspiration/` folder
2. Analyzes each for: colors, typography, layout, mood
3. Identifies patterns across multiple images
4. Updates `inspiration/brand-style.md` with findings

## Process

### Step 1: Scan Inspiration Folder

```bash
# Find all images
find inspiration -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.webp" \) | head -20
```

### Step 2: Analyze Each Image

For each image found, use the Read tool to view it and extract:

**Colors:**
- Dominant colors (describe as "deep navy", "electric blue", etc.)
- Background colors
- Accent colors
- Estimate hex codes if possible

**Typography:**
- Sans-serif vs serif
- Weight (bold, regular, light)
- Case (ALL CAPS, Title Case, lowercase)
- Spacing (tight, normal, loose)

**Layout:**
- Minimal vs busy
- Centered vs asymmetric
- Grid-based vs organic
- Whitespace usage

**Mood:**
- Professional / Casual
- Bold / Subtle
- Tech / Organic
- Dark / Light

### Step 3: Find Patterns

After analyzing all images, identify:
- **Consistent elements:** What appears in most/all images?
- **Color palette:** 2-4 colors that repeat
- **Typography preference:** What style dominates?
- **Overall vibe:** 1-2 sentence summary

### Step 4: Update Brand Style Guide

Update `inspiration/brand-style.md` with findings:

```markdown
## Colors

### Primary
- **Name:** [extracted name]
- **Hex:** #[estimated]
- **Use:** Headlines, key accents

### Secondary
- **Name:** [extracted name]
- **Hex:** #[estimated]
- **Use:** CTAs, highlights

## Typography

### Headlines
- **Style:** [Sans-serif Bold / Serif / etc.]
- **Case:** [ALL CAPS / Title Case]

### Body
- **Style:** [Sans-serif Regular / etc.]

## Visual Personality

[Check boxes based on analysis]

**One-line vibe:** "[Extracted summary]"
```

## Example Output

After analyzing 5 carousel images with similar dark backgrounds and bold white text:

```markdown
## Colors

### Primary
- **Name:** Pure White
- **Hex:** #FFFFFF
- **Use:** Headlines, key text

### Secondary
- **Name:** Electric Cyan
- **Hex:** #00D4FF
- **Use:** Accents, highlights, CTAs

### Background
- **Dark:** #0A0A0A (near black)
- **Light:** #1A1A2E (dark navy)

## Typography

### Headlines
- **Style:** Sans-serif, Extra Bold
- **Case:** ALL CAPS or Title Case
- **Size:** Large, dominant

### Body
- **Style:** Sans-serif, Regular
- **Case:** Sentence case

## Visual Personality

- [x] Bold / Attention-grabbing
- [x] Clean / Minimal
- [x] Dark mode / Moody
- [x] Tech-forward / Futuristic
- [ ] Playful / Casual
- [ ] Warm / Approachable

**One-line vibe:** "Bold, high-contrast, tech-forward with minimal elements and dark backgrounds"
```

## Usage

```
/design:analyze-inspiration
```

Or with specific folder:
```
/design:analyze-inspiration carousels
```

## Tips

1. **Add 5-10 images minimum** for meaningful pattern detection
2. **Be consistent** - add images you actually want to emulate
3. **Organize by type** - carousels/, single-images/, quote-cards/
4. **Re-run after adding** - style guide should evolve with your taste
5. **Override manually** - if AI gets something wrong, edit brand-style.md directly

## After Analysis

Your brand style is now documented. When generating visuals:

- `/content:generate-carousel` will reference these colors/styles
- `/content:generate-image` will use the mood/vibe
- Template-based cards will use the color palette
