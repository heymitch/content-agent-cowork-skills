---
description: Run complete quality pipeline - detect patterns, fix them, verify
---

# Full Quality Pipeline

Run AI pattern detection → apply fixes → verify results.

## Flow

```
┌─────────────────┐
│  /quality:ai-hunter  │  ← Detect all patterns
└────────┬────────┘
         │
    Grade C or below?
         │
         ▼
┌─────────────────┐
│  /quality:fix-ai     │  ← Apply surgical fixes
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Re-scan & Report    │  ← Verify improvement
└─────────────────┘
```

## Process

### Step 1: Run AI Hunter

Scan content for all AI patterns:

```
/quality:ai-hunter [content]
```

This returns:
- Grade (A-F)
- Pattern count by type
- 2-3 fix options per pattern
- Location of each issue

### Step 2: Evaluate Grade

| Grade | Action |
|-------|--------|
| A-B | Done - content is ready |
| C | Run fix-ai with SAFE options |
| D-F | Run fix-ai with BALANCED/CREATIVE options |

### Step 3: Apply Fixes (if needed)

```
/quality:fix-ai [content]
```

This:
- Generates 3 alternatives per pattern (SAFE/BALANCED/CREATIVE)
- Applies fixes bottom-up
- Preserves 90%+ of original
- Reports all changes

### Step 4: Verify & Report

Re-scan to confirm improvement:

```markdown
# Quality Pipeline Results

## Before/After
| Metric | Before | After |
|--------|--------|-------|
| Grade | C | A |
| Major patterns | 3 | 0 |
| Minor patterns | 5 | 1 |

## Fixes Applied
1. Line 3: Contrast framing → removed
2. Line 7: Robotic transition → deleted
3. Line 12: Corporate jargon → simplified

## Preservation Score: 94%

## Status: Ready to publish
```

## Example Usage

With file:
```
/quality:full-pipeline clients/acme/content/02-2026/03/li-habits.md
```

With pasted content:
```
/quality:full-pipeline

[paste content here]
```

## When to Use

**Use full-pipeline when:**
- Finishing content for publication
- Want detection + fixes in one pass
- Need before/after comparison

**Use individual commands when:**
- Just want to see patterns → `/quality:ai-hunter`
- Already know what to fix → `/quality:fix-ai`
- Want external validation → `/quality:check-gptzero`

## Optional: Add GPTZero Check

For external validation, add after the pipeline:

```
/quality:check-gptzero [file]
```

This provides a second opinion from GPTZero's AI detection model.

Now provide content to run through the full pipeline.
