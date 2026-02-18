---
description: Generate a single image for social media posts using AI (Gemini Image or design-studio)
---

# Generate Single Image

Generate a single image to accompany a social media post.

{{file:.claude/commands/_shared/preflight-checks.md}}

{{file:.claude/commands/_shared/client-context.md}}

## Your Task

Create an on-brand image for a social media post using AI image generation.

### Requirements

1. **Aspect Ratio**: Match platform requirements
   - LinkedIn: 1.91:1 (1200x628) or 1:1 (1200x1200)
   - Twitter: 16:9 (1200x675) or 1:1
   - Instagram: 1:1 or 4:5
2. **Style**: Match `inspiration/brand-style.md`
3. **Quality**: High resolution, no text (text added separately if needed)

### Process

1. **Gather Requirements**:
   ```
   Ask the user:
   - What's the image for? (topic/context)
   - Platform? (determines aspect ratio)
   - Style preference? (bold, clean, photorealistic, illustration)
   ```

2. **Check Brand Style**:
   - Read `domains/lead-gen/content/clients/heymitch/inspiration/brand-style.md`
   - Note colors, visual personality
   - Check `/single-images` folder for references

3. **Build Image Prompt**:
   Construct a detailed prompt including:
   - Subject/scene description
   - Style (from brand-style.md)
   - Colors (from brand-style.md)
   - Mood/atmosphere
   - Aspect ratio

4. **Generate Image**:

   **Option A: Use design-studio skill** (if available)
   ```
   Invoke /design-studio with the image prompt
   ```

   **Option B: Use Gemini Image API**
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

   **Option C: Use OpenAI DALL-E** (fallback)
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

### Prompt Engineering Tips

**Good image prompt structure:**
```
[SUBJECT], [ACTION/POSE], [SETTING/BACKGROUND],
[LIGHTING], [STYLE], [COLORS], [MOOD],
[TECHNICAL: aspect ratio, quality]
```

**Example:**
```
Business professional looking at holographic data dashboard,
confident stance, modern minimalist office,
soft natural lighting from large windows,
photorealistic with subtle tech glow effects,
deep navy and electric blue color palette,
professional yet innovative mood,
16:9 aspect ratio, high detail
```

**Negative prompt (what to avoid):**
```
text, words, letters, watermark, logo, blurry,
low quality, distorted faces, extra limbs
```

### Style Presets

| Style | Description | Use For |
|-------|-------------|---------|
| `clean-professional` | Minimal, whitespace, subtle gradients | Thought leadership |
| `bold-tech` | High contrast, geometric, futuristic | AI/tech topics |
| `warm-approachable` | Soft lighting, natural colors | Personal stories |
| `data-viz` | Charts, graphs, infographic style | Stats/research |
| `abstract` | Patterns, shapes, conceptual | Generic/flexible |

## Output Format

When generating an image, save metadata to the content file:

```yaml
---
image_path: ./slug-image.png
image_prompt: "[prompt used]"
image_style: [style preset]
image_source: [gemini/dalle/design-studio]
---
```

## Quick Start

```
/content:generate-image "AI agent dashboard visualization" --platform linkedin --style bold-tech
```

Or invoke interactively and I'll ask for details.
