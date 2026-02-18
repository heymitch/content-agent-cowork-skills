---
description: Hunt AI patterns with detailed replacement options and context examples
---

# AI Hunter - Pattern Detection with Multiple Fix Options

You are now in AI Hunter mode.

## Your Mission

Hunt for AI detection patterns and provide **2-3 replacement options per pattern** with context examples. This is more comprehensive than `/quality:audit-ai-detection` which only provides single fix suggestions.

## Key Differences from Standard Audit

| Feature | /quality:audit-ai-detection | /quality:ai-hunter |
|---------|----------------------------|-------------------|
| Fix suggestions | 1 per pattern | 2-3 per pattern |
| Context examples | None | Included from training |
| Explanation depth | Basic | Detailed "why it's AI" |
| Pattern library | Standard | Extended + custom |
| Best for | Quick check | Deep revision |

## AI Patterns to Hunt

### Category 1: Contrast Framing (MAJOR - Auto-fail if 2+)

**Patterns:**
- "This isn't about X—it's about Y"
- "This isn't X—it's Y"
- "It's not X, it's Y"
- "It's not about X, it's about Y"
- "The problem isn't X—it's Y"
- "The issue isn't X, it's Y"

**Why it's AI:**
Em-dash contrast framing is the #1 ChatGPT tell. No human naturally writes this way. It's a rhetorical pattern that AI models love because it creates false tension.

**Replacement Strategy:**
1. **Direct assertion**: State the truth directly
2. **Reframe as question**: "What matters? Y."
3. **Delete entirely**: Start with Y

### Category 2: Robotic Transitions (MAJOR)

**Patterns:**
- "Here's the thing:"
- "The reality is this:"
- "At the end of the day,"
- "The bottom line is:"
- "The truth is,"
- "Let me be clear:"
- "Let me be honest:"

**Why it's AI:**
These are throat-clearing phrases that add zero value. They're conversational filler that AI uses to bridge ideas when it doesn't know how else to transition.

**Replacement Strategy:**
1. **Delete entirely**: Jump to the actual point
2. **Make specific**: Replace with concrete transition
3. **Use "you" framing**: "You need to know this:"

### Category 3: AI Crutch Phrases (MEDIUM)

**Patterns:**
- "Let's dive deep into..."
- "Let's unpack this..."
- "Let's explore..."
- "Here's what you need to know:"
- "The key takeaway is..."
- "In today's digital landscape..."
- "In an ever-evolving world..."
- "In this day and age..."
- "Moving forward,"
- "Going forward,"

**Why it's AI:**
AI loves meta-narration. These phrases announce what you're about to do instead of just doing it. Humans jump right in.

**Replacement Strategy:**
1. **Delete + start directly**: Just begin with the content
2. **Make concrete**: Replace vague "unpack" with specific verb
3. **Use active voice**: "I'll show you" instead of "Let's explore"

### Category 4: Generic List Intros (MEDIUM)

**Patterns:**
- "Here are X ways to..."
- "Let me share X strategies..."
- "I'm going to break down X methods..."
- "Below are X tips to..."
- "There are X things to consider:"

**Why it's AI:**
These announce the list instead of just starting it. They add a layer of unnecessary preamble that humans skip.

**Replacement Strategy:**
1. **Numbered directly**: "1. First strategy..."
2. **Action framing**: "Start with these X..."
3. **Hook first item**: Make first item interesting enough to not need intro

### Category 5: Inline Rhetorical Questions (MEDIUM - FLAG ALL `?`)

**Rule: Flag EVERY `?` in content body for review. CTA questions at the END are fine. Inline questions mid-content are almost always cringe.**

**Classic suspense bait:**
- "The catch?"
- "The result?"
- "The brutal truth?"
- "Sound familiar?"
- "Want to know the secret?"

**Numerical suspense (SNEAKY):**
- "The other [X]?" ← false drama around math already done
- "And the [X]%?"
- "Those [X] people?"

**Begging-the-question:**
- "Why does this matter?"
- "So what's the solution?"
- "What's the takeaway?"

**Why it's AI:**
These create false suspense. The reader knows you're about to answer. It's manipulation disguised as engagement. Just state the thing.

**The Test:** If deleting the question and stating the answer reads better, it's cringe.

**Replacement Strategy:**
1. **Delete + state directly**: "The other 39?" → "They made the same mistakes:"
2. **Merge into previous sentence**: "Only 8 made it. The rest failed for the same reasons:"
3. **Just answer it**: Skip the question entirely

### Category 6: Corporate Jargon (MINOR)

**Patterns:**
- "Leveraging"
- "Synergy"
- "Seamless"
- "Robust"
- "Cutting-edge"
- "Best-in-class"
- "Thought leader"
- "Value proposition"
- "Stakeholders"
- "Touch base"

**Why it's AI:**
These are MBA buzzwords that dilute meaning. They're abstract when you should be concrete.

**Replacement Strategy:**
1. **Use simple word**: "Using" not "leveraging"
2. **Be specific**: "Fast" not "cutting-edge"
3. **Delete if meaningless**: "Robust" often adds nothing

### Category 7: Structural Red Flags (MINOR)

**Patterns:**
- Rule of Three (always exactly 3 items in lists)
- Perfectly parallel sentence structures
- Every paragraph is same length
- Overly neat "problem → solution → result" framing

**Why it's AI:**
Real writing has natural variation. AI creates unnaturally balanced structures because it's optimizing for patterns, not communication.

**Replacement Strategy:**
1. **Vary list lengths**: 2, 4, 5 items instead of always 3
2. **Break parallelism**: Intentionally vary sentence starts
3. **Add personality**: Throw in a short punchy sentence or long rambling one

## Output Format

For each pattern found, provide this structure:

```markdown
# AI Hunter Report

## Overall Grade: [A/B/C/D/F]

**Patterns Found**: [X]
**Major Issues**: [X]
**Minor Issues**: [X]

---

## Pattern #1: [Pattern Type] (Major/Minor)

**Location**: Line [X] / Paragraph [X]

**Found**: "[Exact text from content]"

**Why it's AI**: [Detailed explanation of why this screams ChatGPT]

---

### Replacement Options

**Option 1 ([Style])**:
"[Replacement text]"

**Why this works**: [Explanation]

**Option 2 ([Style])**:
"[Replacement text]"

**Why this works**: [Explanation]

**Option 3 ([Style])**:
"[Replacement text]"

**Why this works**: [Explanation]

---

### Context Example

Here's how similar text was fixed in a high-performing post:

**Before (AI-like):**
"[Example from training content that had this pattern]"

**After (Human):**
"[How it was fixed]"

**Result**: [Engagement metrics or quality improvement]

---

[Repeat for each pattern found]

---

## Summary & Grading

### Grading Breakdown

| Pattern Type | Count | Points Deducted |
|-------------|-------|-----------------|
| Contrast framing | [X] | -[X] |
| Robotic transitions | [X] | -[X] |
| AI crutch phrases | [X] | -[X] |
| Generic intros | [X] | -[X] |
| Cringe questions | [X] | -[X] |
| Corporate jargon | [X] | -[X] |
| Structural issues | [X] | -[X] |

**Starting Score**: 100
**Total Deductions**: -[X]
**Final Score**: [X]

**Grade**: [A/B/C/D/F]

### Interpretation

[A] 90-100: Excellent - Passes AI detection
[B] 80-89: Very good - Minor polish needed
[C] 70-79: Good - Needs revision before publishing
[D] 60-69: Significant issues - Major rewrite required
[F] Below 60: Sounds like ChatGPT - Start over

---

## Recommended Action Plan

### If Grade A-B:
1. Apply Option 1 fixes for remaining patterns
2. Re-scan with /quality:check-gptzero
3. Publish if scores improve

### If Grade C:
1. Apply all Option 1 or Option 2 fixes
2. Run /quality:fix-ai-patterns for surgical edits
3. Re-run /quality:ai-hunter to verify
4. Re-check with GPTZero

### If Grade D-F:
1. Consider regenerating with clearer brand voice
2. OR apply Option 2/Option 3 fixes for more drastic changes
3. Multiple revision passes required
4. Consider human rewrite of hook and key sections

---

## Quick Fix Checklist

Use this to manually apply fixes:

- [ ] Pattern 1 (Line [X]): Applied Option [1/2/3]
- [ ] Pattern 2 (Line [X]): Applied Option [1/2/3]
- [ ] Pattern 3 (Line [X]): Applied Option [1/2/3]
[...continue for all patterns]

---

## Next Steps

1. **Choose fix options** for each pattern (Option 1 is usually safest)
2. **Apply changes** manually or run /quality:fix-ai-patterns
3. **Re-scan** with /quality:ai-hunter to verify improvements
4. **External check** with /quality:check-gptzero
5. **Publish** when both internal and external scores are acceptable

---

```

## Example Pattern Detection & Fix

### Example Pattern Found:

**Pattern #3: AI Crutch Phrase (Medium)**

**Location**: Line 12 / Opening paragraph

**Found**: "Let's dive deep into the three strategies that actually work."

**Why it's AI**: "Let's dive deep" is classic AI meta-narration. It announces what you're about to do instead of just doing it. Humans don't waste words on setup.

---

### Replacement Options

**Option 1 (Direct Start)**:
"Three strategies actually work:"

**Why this works**: Gets straight to value. No throat-clearing. More confident.

**Option 2 (Personal Framing)**:
"I've tested dozens of strategies. Three work:"

**Why this works**: Adds credibility through experience. Shows you've done the work.

**Option 3 (Question Hook)**:
"Which strategies actually work? I found three:"

**Why this works**: Creates curiosity without sounding manipulative. Natural question flow.

---

### Context Example

Here's a similar pattern from training content:

**Before (AI-like):**
"Let's dive deep into how AI automation can transform your content workflow."

**After (Human):**
"AI automation cut my content team from 5 people to 1. Here's how:"

**Result**: 3.2× higher engagement, 847 clicks, multiple client inquiries

---

## Process for Running AI Hunter

1. **Load file or paste content**
2. **Scan line-by-line** through entire content
3. **Flag every pattern** (no exceptions, even minor ones)
4. **For each pattern**: Provide location, text, explanation, 3 options, context
5. **Calculate grade** based on deductions
6. **Provide action plan** based on grade
7. **Update frontmatter** with:
   ```yaml
   ai_hunter_grade: "C"  # Letter grade
   ai_hunter_scanned: true
   ```

## Integration with Quality Pipeline

**Typical Workflow:**

```bash
# Generate content
/content:generate-linkedin "topic"

# Quick internal check
/quality:audit-ai-detection [file]

# Deep pattern analysis (this command)
/quality:ai-hunter [file]

# External validation
/quality:check-gptzero [file]

# Apply fixes based on AI Hunter recommendations
/quality:fix-ai-patterns [file]

# Re-check to verify improvements
/quality:ai-hunter [file]

# When ready, change status to "Publish It"
```

## Tips for Best Results

1. **Be ruthless**: Flag even minor patterns. Cumulative effect matters.
2. **Provide context**: Always include "why it's AI" explanation
3. **Multiple options**: Give 2-3 distinct approaches (safe/moderate/bold)
4. **Real examples**: Use training content to show what works
5. **Actionable**: Make it easy to apply fixes

Now provide the file path or paste content to hunt for AI patterns.
