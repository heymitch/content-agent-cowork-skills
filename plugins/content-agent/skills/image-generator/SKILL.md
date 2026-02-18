---
name: image-generator
description: Generate AI images and memes for social media — brand-matched images via Gemini/DALL-E and memes via Imgflip. Say "Generate an image for this" or "Make a meme about X".
user-invocable: true
---

# Image Generator

Generate visual content for social media posts — AI images and memes.

{{file:.claude/commands/_shared/preflight-checks.md}}

{{file:.claude/commands/_shared/client-context.md}}

---

## Content Type Detection

| Request Contains | Type |
|-----------------|------|
| Image, generate image, photo, visual | **AI Image** |
| Meme, drake, distracted boyfriend | **Meme** |

---

## AI Image Generation

### Requirements

1. **Aspect Ratio**: Match platform requirements
   - LinkedIn: 1.91:1 (1200x628) or 1:1 (1200x1200)
   - Twitter: 16:9 (1200x675) or 1:1
   - Instagram: 1:1 or 4:5
2. **Style**: Match `inspiration/brand-style.md`
3. **Quality**: High resolution, no text (text added separately if needed)

### Process

1. **Gather Requirements**:
   - What's the image for? (topic/context)
   - Platform? (determines aspect ratio)
   - Style preference? (bold, clean, photorealistic, illustration)

2. **Check Brand Style**:
   - Read `inspiration/brand-style.md` if available
   - Note colors, visual personality

3. **Build Image Prompt**:
   Construct a detailed prompt including:
   - Subject/scene description
   - Style (from brand-style.md)
   - Colors (from brand-style.md)
   - Mood/atmosphere
   - Aspect ratio

   **Good image prompt structure:**
   ```
   [SUBJECT], [ACTION/POSE], [SETTING/BACKGROUND],
   [LIGHTING], [STYLE], [COLORS], [MOOD],
   [TECHNICAL: aspect ratio, quality]
   ```

   **Negative prompt (what to avoid):**
   ```
   text, words, letters, watermark, logo, blurry,
   low quality, distorted faces, extra limbs
   ```

4. **Generate Image**:

   **Option A: Use Gemini Image API**
   ```bash
   curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict" \
     -H "Content-Type: application/json" \
     -H "x-goog-api-key: ${GOOGLE_API_KEY}" \
     -d '{
       "instances": [{
         "prompt": "[DETAILED IMAGE PROMPT]"
       }],
       "parameters": {
         "sampleCount": 1,
         "aspectRatio": "[ASPECT RATIO]",
         "negativePrompt": "text, words, letters, watermark, logo"
       }
     }'
   ```

   **Option B: Use OpenAI DALL-E** (fallback)
   ```bash
   curl -X POST "https://api.openai.com/v1/images/generations" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer ${OPENAI_API_KEY}" \
     -d '{
       "model": "dall-e-3",
       "prompt": "[DETAILED IMAGE PROMPT]",
       "n": 1,
       "size": "1792x1024",
       "quality": "hd"
     }'
   ```

5. **Save Image**:
   - Download to `content/YYYY-MM/DD/[slug]-image.[ext]`
   - Update content file frontmatter with `image_path`

### Style Presets

| Style | Description | Use For |
|-------|-------------|---------|
| `clean-professional` | Minimal, whitespace, subtle gradients | Thought leadership |
| `bold-tech` | High contrast, geometric, futuristic | AI/tech topics |
| `warm-approachable` | Soft lighting, natural colors | Personal stories |
| `data-viz` | Charts, graphs, infographic style | Stats/research |
| `abstract` | Patterns, shapes, conceptual | Generic/flexible |

### Image Output

When generating an image, save metadata to the content file:

```yaml
---
image_path: ./slug-image.png
image_prompt: "[prompt used]"
image_style: [style preset]
image_source: [gemini/dalle]
---
```

---

## Meme Generation

### Process

1. **Parse the request** to determine:
   - Which meme template fits best
   - What text should go on top/bottom

2. **Select template** from popular options:

   | Template | ID | Best For |
   |----------|-----|----------|
   | Drake | 181913649 | Rejecting X / Preferring Y |
   | Distracted Boyfriend | 112126428 | Distracted by new thing, ignoring current |
   | Change My Mind | 129242436 | Hot take / controversial opinion |
   | Two Buttons | 87743020 | Difficult choice between options |
   | Expanding Brain | 93895088 | Increasingly "enlightened" takes (4 levels) |
   | Always Has Been | 252600902 | Realization that something was always true |
   | Woman Yelling at Cat | 188390779 | Someone angry vs someone unbothered |
   | Surprised Pikachu | 155067746 | Obvious consequence is obvious |
   | UNO Draw 25 | 217743513 | Rather do extreme thing than simple thing |
   | One Does Not Simply | 61579 | Something that seems simple but isn't |

3. **Generate using script**:
   ```bash
   node scripts/generate-meme.js --template "template_name" --top "Top text" --bottom "Bottom text"
   ```

4. **Optional: Download** if saving to content folder:
   ```bash
   node scripts/generate-meme.js --template "drake" --top "..." --bottom "..." \
     --output "content/YYYY-MM/DD/meme-slug.jpg"
   ```

### Text Guidelines

- Keep text SHORT (memes are visual, not essays)
- Top text: Setup / Context / The "wrong" way
- Bottom text: Punchline / Contrast / The "right" way
- Match the meme's cultural meaning (Drake = preference, Pikachu = obvious outcome, etc.)

### Expanding Brain (Special Case)

For the Expanding Brain template (4 levels), use boxes:
```bash
node scripts/generate-meme.js --id 93895088 \
  --boxes '[{"text":"Level 1"},{"text":"Level 2"},{"text":"Level 3"},{"text":"Level 4"}]'
```

### Setup Required

If you see auth errors, user needs:
1. Free account at https://imgflip.com/signup
2. Add to `.env`:
   ```
   IMGFLIP_USERNAME=your_username
   IMGFLIP_PASSWORD=your_password
   ```

---

## Rules (Non-Negotiable)

- NEVER generate images without checking brand style first (if available)
- NEVER include text in AI-generated images (text gets garbled)
- NEVER skip platform-appropriate aspect ratios
- Ask for context if the request is vague
