---
description: Check AI detection score using GPTZero API
---

# Check GPTZero AI Detection

You are now in GPTZero AI detection mode.

## Your Task

Send content to GPTZero's external AI detection API and provide:
1. Overall AI probability score (0-100)
2. Human-readable interpretation
3. Recommendations for next steps
4. Update frontmatter with score

## What is GPTZero?

GPTZero is a third-party AI detection service that uses machine learning to identify AI-generated text. It provides an independent verification score to complement our internal pattern-based detection.

## How It Works

1. **Receive Content**: Accept file path from user
2. **Extract Text**: Remove markdown formatting, extract clean content
3. **Call API**: Send to GPTZero API endpoint
4. **Parse Response**: Extract AI probability score (0-100 scale)
5. **Update File**: Save score to frontmatter as `gptzero_score`
6. **Display Report**: Show human-readable assessment

## Process

### Step 1: Check File
- Read file from path
- Parse frontmatter
- Extract content text (remove markdown formatting)

### Step 2: Call GPTZero API
- Send content to GPTZero endpoint
- Authenticate with API key
- Receive detection response

### Step 3: Update Frontmatter
```yaml
gptzero_score: 85  # 0-100, where higher = more AI-like
```

### Step 4: Display Report
Show:
- Overall AI probability (%)
- Interpretation (Very High / High / Medium / Low / Very Low)
- Specific recommendation
- Additional metrics (if available)

## Example Invocations

```bash
# Check a specific file
/quality:check-gptzero content/12-2025-december/02-mon/ai-automation-linkedin.md

# Check most recent post
/quality:check-gptzero content/12-2025-december/07-sun/ai-scaling-ethics-linkedin.md
```

## Score Interpretation

| Score Range | Assessment | Recommendation |
|------------|------------|----------------|
| 90-100 | 🚨 Very High - Appears AI-generated | Strongly recommend rewriting |
| 70-89 | ⚠️  High - Likely contains AI patterns | Run /quality:ai-hunter for fixes |
| 50-69 | ⚡ Medium - Some AI patterns | Review and polish before publishing |
| 30-49 | ✓ Low - Mostly human-like | Good to go with minor review |
| 0-29 | ✅ Very Low - Appears human-written | Passes AI detection |

## Output Format

```markdown
============================================================
GPTZero AI Detection Report
============================================================

📊 Overall AI Probability: 67%

⚡ Medium - Some AI patterns detected

💡 Recommendation: Review and polish before publishing

📈 Completely Generated Probability: 52%

🔥 Burstiness Score: 38.4
   (Higher = more variation in sentence structure)

============================================================

✓ Score saved to frontmatter: gptzero_score: 67

Next steps:
  1. Run /quality:ai-hunter for detailed pattern analysis
  2. Run /quality:fix-ai-patterns to apply fixes
  3. Re-run GPTZero check to verify improvements

============================================================
```

## Integration with Quality Pipeline

### Recommended Workflow

```bash
# 1. Generate content
/content:generate-linkedin "Your topic"

# 2. Check internal patterns
/quality:audit-ai-detection [file]

# 3. Check external score (GPTZero)
/quality:check-gptzero [file]

# 4. Get detailed fix suggestions
/quality:ai-hunter [file]

# 5. Apply fixes
/quality:fix-ai-patterns [file]

# 6. Re-check scores
/quality:check-gptzero [file]

# 7. When scores are acceptable, change status to "Publish it!"
```

## API Requirements

### Environment Setup

This command requires a GPTZero API key in your `.env` file:

```bash
GPTZERO_API_KEY=your-gptzero-api-key
```

### Getting Your API Key

1. Sign up at: https://gptzero.me/
2. Navigate to API dashboard
3. Generate new API key
4. Add to `.env` file
5. Restart Claude Code

### Pricing

Check current GPTZero pricing at https://gptzero.me/pricing

Typical costs:
- Pay-per-use: ~$0.01 per 1,000 characters
- Monthly plans available for higher volume

### Rate Limits

GPTZero has rate limits based on your plan:
- Free tier: Limited requests per day
- Paid plans: Higher limits

If you hit rate limits, wait a minute and retry.

## Error Handling

### Common Errors

**1. "Invalid GPTZero API key"**
- Check `.env` file has `GPTZERO_API_KEY=your-key`
- Verify key is correct (no extra spaces)
- Regenerate key if needed

**2. "Rate limit exceeded"**
- Wait 60 seconds and retry
- Consider upgrading plan for higher limits

**3. "Content too short"**
- GPTZero requires minimum 50 characters
- Add more content or skip GPTZero check

**4. "API error 400"**
- Content may contain invalid characters
- Check for proper UTF-8 encoding

## Technical Details

### API Endpoint
```
POST https://api.gptzero.me/v2/predict/text
```

### Request Format
```json
{
  "document": "content text here",
  "version": "2024-04-04"
}
```

### Response Format
```json
{
  "documents": [{
    "average_generated_prob": 0.67,      // 0-1 scale
    "completely_generated_prob": 0.52,   // 0-1 scale
    "overall_burstiness": 38.4,          // Variation metric
    "paragraphs": [...]                   // Paragraph-level scores
  }]
}
```

### Score Conversion
- GPTZero returns probability on 0-1 scale
- We convert to 0-100 for consistency with internal scoring
- `gptzero_score = Math.round(average_generated_prob * 100)`

## Comparison with Internal Detection

| Method | What It Detects | Strength | Weakness |
|--------|----------------|----------|----------|
| **Internal** (`/quality:audit-ai-detection`) | Specific phrases and patterns | Fast, no cost, specific fixes | May miss new AI patterns |
| **GPTZero** (`/quality:check-gptzero`) | Statistical AI likelihood | Independent verification, up-to-date | Costs money, rate limits |
| **AI Hunter** (`/quality:ai-hunter`) | Patterns + detailed alternatives | Comprehensive with examples | Takes longer |

**Best Practice**: Use all three for important content, rely on internal for quick checks.

## Frontmatter Tracking

After running GPTZero check, frontmatter will include:

```yaml
---
title: "Post Title"
platform: "linkedin"
# ... other fields ...

# AI Detection Scores
ai_score: 72              # Internal pattern-based (0-100)
quality_grade: "C"        # A/B/C/D/F from internal audit
gptzero_score: 67         # GPTZero external score (0-100)
ai_hunter_grade: null     # Will be set after running /quality:ai-hunter
---
```

Now execute the GPTZero check by calling the script:

```bash
node scripts/check-gptzero.js [file-path]
```

The script will handle all API communication, scoring, and file updates automatically.
