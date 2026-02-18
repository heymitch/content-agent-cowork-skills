---
description: Humanize content with Ryne AI to bypass AI detection
---

# Humanize Content with Ryne AI

You are now in Ryne AI humanization mode.

## Your Task

Send content through Ryne AI's humanization API to reduce AI detection scores, then verify improvement with GPTZero.

## How It Works

1. **Receive Content**: Accept file path from user
2. **Send to Ryne AI**: Humanize with stealth mode enabled
3. **Update File**: Replace content with humanized version
4. **Verify Score**: Run GPTZero to confirm improvement
5. **Report Results**: Show before/after comparison

## Process

### Step 1: Humanize with Ryne AI

```bash
node scripts/humanize-ryne.js [file-path] [options]
```

**Options:**
- `--tone professional|casual|friendly|academic` (default: professional)
- `--purpose linkedin|twitter|email|blog|general` (default: linkedin)
- `--stealth` Enable restructure for max AI bypass (default: ON)
- `--no-stealth` Disable restructure mode
- `--preview` Show preview only, don't update file

### Step 2: Verify with GPTZero

```bash
node scripts/check-gptzero.js [file-path]
```

## Example Invocations

```bash
# Humanize and verify a post
/quality:humanize-ryne content/01-2026-january/16-thu/li-text-to-action-agents.md

# Preview first without saving
/quality:humanize-ryne content/post.md --preview

# Twitter content with casual tone
/quality:humanize-ryne content/tweet.md --tone casual --purpose twitter

# Maximum stealth mode
/quality:humanize-ryne content/post.md --stealth
```

## Ryne AI Settings

### Modes

| Option | Effect |
|--------|--------|
| `--stealth` (default) | Enables `enableRestructure` - slightly restructures sentences for maximum AI bypass |
| `--no-stealth` | Preserves structure, focuses on word changes only |

### Tone Settings

| Tone | Best For |
|------|----------|
| `professional` | LinkedIn, business content |
| `casual` | Twitter, personal posts |
| `friendly` | Community engagement |
| `academic` | Long-form, research |

### Purpose Settings

| Purpose | Optimizations |
|---------|---------------|
| `linkedin` | Professional voice, engagement hooks |
| `twitter` | Concise, punchy phrasing |
| `email` | Direct, personal tone |
| `blog` | Narrative flow |
| `general` | Balanced approach |

## Output Format

```markdown
============================================================
Ryne AI Humanization Report
============================================================

⚙️  Tone: professional
📋 Purpose: linkedin
🔒 Stealth mode: ON

📊 Original: 1,245 chars
📊 Humanized: 1,198 chars
📈 Length change: 4%

------------------------------------------------------------
HUMANIZED CONTENT:
------------------------------------------------------------
[Full humanized content displayed here]
------------------------------------------------------------

✓ File updated with humanized content

Next steps:
  1. Run: node scripts/check-gptzero.js <file>
  2. Review content for accuracy
============================================================
```

## Integration with Quality Pipeline

### Recommended Workflow

```bash
# 1. Generate content
/content:generate-linkedin "Your topic"

# 2. Check initial GPTZero score
/quality:check-gptzero [file]

# 3. If score > 50, humanize with Ryne
/quality:humanize-ryne [file]

# 4. Verify improvement
/quality:check-gptzero [file]

# 5. If still high, run surgical rewrite
/quality:surgical-rewrite [file]

# 6. Final check
/quality:check-gptzero [file]
```

### Score Targets

| Platform | Target GPTZero Score | Action if Higher |
|----------|---------------------|------------------|
| LinkedIn | < 40 | Humanize + manual review |
| Twitter | < 30 | Humanize is usually enough |
| Email | < 50 | Humanize, less strict |
| Blog | < 35 | Humanize + surgical rewrite |

## API Requirements

### Environment Setup

Add to `.env`:

```bash
RYNE_AI_API_KEY=your-ryne-api-key
```

### Getting Your API Key

1. Sign up at: https://ryne.ai/
2. Choose a plan with API access
3. Get API key from dashboard
4. Add to `.env` file

### Pricing

Ryne AI uses a credit-based system:
- Credits consumed per humanization
- Plans range from free tier to unlimited
- Check https://ryne.ai/ for current pricing

## Error Handling

### Common Errors

**1. "INSUFFICIENT_COINS"**
- Add credits at https://ryne.ai/
- Check your plan balance

**2. "Invalid API key"**
- Verify `RYNE_AI_API_KEY` in `.env`
- Regenerate key if needed

**3. "Content too short"**
- Minimum 50 characters required
- Combine with other content if needed

## Frontmatter Tracking

After humanization, frontmatter includes:

```yaml
---
title: "Post Title"
# ... other fields ...

# Humanization tracking
humanized_by: "ryne-ai"
humanized_at: "2026-01-21"
gptzero_score: "35"  # Post-humanization score
---
```

## When to Use Ryne AI

✅ **Good candidates:**
- GPTZero score > 50
- Content that sounds "too polished"
- Posts with repetitive sentence structures
- Technical content that needs human touch

❌ **Skip Ryne AI when:**
- GPTZero score < 30 (already passing)
- Content is short tweets (< 100 chars)
- Preserving exact wording is critical

## Now Execute

Run the humanization by calling:

```bash
node scripts/humanize-ryne.js [file-path] [options]
```

Then verify with:

```bash
node scripts/check-gptzero.js [file-path]
```