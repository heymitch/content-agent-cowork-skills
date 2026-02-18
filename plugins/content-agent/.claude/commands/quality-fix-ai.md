---
description: Surgically rewrite ONLY flagged sentences - pattern detection first, GPTZero optional
---

# Surgical Rewrite

Fix AI-flagged content while preserving 90%+ of original wording.

## Core Philosophy

**Preserve What's Great, Fix What's Broken**

- Original narrative → KEEP IT
- Language choices → RESPECT THEM
- Authentic voice → PRESERVE IT
- AI patterns only → FIX THOSE

## Process

### Step 1: Detect Patterns

Scan for these AI tells (reference: `_shared/quality-patterns.md`):

**Major (auto-fail if 2+):**
- Contrast framing: "It's not X, it's Y" / "This isn't about X—it's about Y"
- Split contrast: "[Subject] isn't X. It's Y." (two sentences, same pattern)

**Medium:**
- Robotic transitions: "Here's the thing:", "The reality is:", "At the end of the day"
- AI crutch: "Let's dive deep", "Let's unpack", "In today's digital landscape"
- Inline questions: FLAG ALL `?` - see below
- Generic intros: "Here are X ways to..."

**Inline Questions (FLAG ALL `?` FOR REVIEW):**
- CTA questions at END of post → OK
- Inline questions mid-content → CRINGE, fix them
- Numerical suspense: "The other 39?", "And the 12%?" → DELETE
- Begging-the-question: "Why does this matter?", "So what's the solution?" → DELETE

**Minor:**
- Corporate jargon: leverage, synergy, seamless, robust, cutting-edge
- Structural: Rule of Three everywhere, perfect parallel structures

### Step 2: Generate Alternatives

For EACH flagged pattern, generate 3 alternatives:

| Style | Approach |
|-------|----------|
| **SAFE** | Minimal change, just remove the AI tell |
| **BALANCED** | Moderate rewrite, improve flow |
| **CREATIVE** | Bold rewrite, add personality |

**Example:**

Original: "Here's the thing: most people overcomplicate content."

1. **SAFE**: "Most people overcomplicate content."
2. **BALANCED**: "Most people overcomplicate content. I did too."
3. **CREATIVE**: "I used to write 2,000-word posts nobody read."

### Step 3: Apply Fixes

- Work bottom-up (preserves line numbers)
- Pick SAFE by default unless user prefers bolder
- Track all changes for the report

### Step 4: Verify

Calculate preservation score:
- Count original words
- Count changed words
- Target: 90%+ preserved

## Fix Strategies by Pattern

### Contrast Framing
**Before**: "This isn't about working harder—it's about working smarter."
**SAFE**: "Work smarter, not harder."
**BALANCED**: "Working smarter beats working harder."
**CREATIVE**: "I stopped grinding at 60 hours. Started thinking at 30."

### Robotic Transitions
**Before**: "Here's the thing: most people overcomplicate content."
**SAFE**: "Most people overcomplicate content."
**BALANCED**: "Most people overcomplicate content. I did for years."
**CREATIVE**: Delete entirely, start with next sentence.

### AI Crutch Phrases
**Before**: "Let's dive deep into why this matters."
**SAFE**: "Why this matters:"
**BALANCED**: "Here's why it matters:"
**CREATIVE**: Jump straight into the content.

### Cringe Questions
**Before**: "The catch? It requires consistency."
**SAFE**: "It requires consistency."
**BALANCED**: "The tradeoff is consistency."
**CREATIVE**: "Consistency is the price. Most won't pay it."

### Corporate Jargon
| AI Word | Human Word |
|---------|------------|
| leverage | use |
| utilize | use |
| synergy | teamwork |
| robust | strong |
| cutting-edge | new |
| seamless | smooth |

## Output Format

```markdown
# Surgical Rewrite Report

## Preservation Score: [X]% of original retained

## Summary
- **Patterns Found**: [X]
- **Fixes Applied**: [X]
- **Words Changed**: [X] of [Total]

---

## Fixes Applied

### Fix 1: [Pattern Type]
**Location**: Line [X]
**Original**: "[text]"
**Options**:
1. SAFE: "[text]"
2. BALANCED: "[text]"
3. CREATIVE: "[text]"
**Applied**: [SAFE/BALANCED/CREATIVE]

[...repeat for each fix...]

---

## Revised Content

[Complete content with all fixes applied]

---

## Quality Check
- [ ] 90%+ preserved
- [ ] Voice maintained
- [ ] All major patterns removed
```

## Example Usage

```
/quality:surgical-rewrite

[paste content here]
```

Or with file:
```
/quality:surgical-rewrite clients/acme/content/02-2026/03/li-habits.md
```

## When to Use

- **This command**: When content is mostly good but has 3-7 AI patterns
- **ai-hunter first**: When you want to see all patterns before fixing
- **Full rewrite**: When content has 10+ patterns or sounds fundamentally AI

## Optional: GPTZero Enhancement

If GPTZero API is available, you can:
1. Run GPTZero to get sentence-level probabilities
2. Target HIGH (>80%) and MEDIUM (50-80%) probability sentences
3. Generate alternatives for flagged sentences
4. Verify improvement with second GPTZero check

This adds external validation but isn't required for pattern-based fixes.

Now provide the content to fix (paste or file path).
