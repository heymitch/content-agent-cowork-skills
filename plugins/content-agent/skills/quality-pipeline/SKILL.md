---
name: quality-pipeline
description: Detect AI patterns in content, provide surgical rewrites, and validate with GPTZero. Grades A-F with line-by-line analysis. Say "Scan this for AI patterns", "Fix the AI patterns", "Check GPTZero score", or "Run full quality check".
user-invocable: true
---

# Quality Pipeline

> **How to run:** "Scan this for AI patterns", "Fix the AI patterns", "Check GPTZero score", "Run full quality check"

You NEVER do quality checks from memory. You READ the full detection system from the command files before scanning.

---

## Route to the Right Command

| Request Contains | Read This File First |
|-----------------|---------------------|
| Scan, audit, AI patterns, hunt | `commands/quality-ai-hunter.md` |
| Fix, surgical, rewrite flagged | `commands/quality-fix-ai.md` |
| GPTZero, detection score | `commands/quality-check-gptzero.md` |
| Full quality, full pipeline, full check | `commands/quality-full-pipeline.md` |

**Read the command file BEFORE running any check.** The files contain the complete 7-category detection system with replacement strategies, context examples, and scoring rules. Don't approximate from memory.

---

## Commands

### AI Pattern Audit (Deep)
**Trigger:** "Scan this for AI patterns" or "Audit this content" or "Hunt AI patterns"

Read `commands/quality-ai-hunter.md` and execute its full protocol:

1. Scan content line-by-line against 7 pattern categories:
   - **Category 1: Contrast Framing** (MAJOR) — "It's not X, it's Y" / em-dash contrasts
   - **Category 2: Robotic Transitions** (MAJOR) — "Here's the thing:" / "The reality is:"
   - **Category 3: AI Crutch Phrases** (MEDIUM) — "Let's dive deep" / "Let's unpack"
   - **Category 4: Generic List Intros** (MEDIUM) — "Here are X ways to..."
   - **Category 5: Inline Rhetorical Questions** (MEDIUM) — "The catch?" / "Sound familiar?"
   - **Category 6: Corporate Jargon** (MINOR) — leverage, synergy, seamless, robust
   - **Category 7: Structural Red Flags** (MINOR) — Rule of Three, perfect parallelism

2. For EACH pattern found, provide:
   - Exact location (line/paragraph)
   - The flagged text
   - Why it's AI (detailed explanation)
   - 2-3 replacement options with rationale
   - Context example from training data (when available)

3. Calculate grade:
   | Grade | Score | Meaning |
   |-------|-------|---------|
   | A | 90-100 | Passes AI detection |
   | B | 80-89 | Minor polish needed |
   | C | 70-79 | Needs revision before publishing |
   | D | 60-69 | Major rewrite required |
   | F | Below 60 | Sounds like ChatGPT |

4. Provide action plan based on grade

---

### Surgical Rewrite
**Trigger:** "Fix the AI patterns" or "Rewrite the flagged lines"

Read `commands/quality-fix-ai.md` and execute:

For each flagged line:
1. Show the original line
2. Identify the specific pattern and category
3. Provide 3-5 alternative rewrites
4. All alternatives preserve 90%+ of original meaning
5. Each alternative should feel genuinely different (not just word swaps)
6. User picks preferred version

**Rules:**
- Only touch flagged lines — preserve everything else
- Never rewrite more than the minimum needed
- If a fix introduces a new pattern, catch it
- After all fixes applied, re-scan to verify improvement

---

### GPTZero Check
**Trigger:** "Check GPTZero score" or "Run AI detection"

Read `commands/quality-check-gptzero.md` and execute:

```bash
node scripts/check-gptzero.js <file-path-or-content>
```

Report the human/AI probability score. Target: >80% human.

If score is below target, recommend specific patterns to address based on GPTZero's feedback.

---

### Full Pipeline
**Trigger:** "Run full quality check" or "Full pipeline"

Read `commands/quality-full-pipeline.md` and execute all three in sequence:

1. **AI Pattern Audit** → grade + flagged lines with replacement options
2. **GPTZero Check** → human probability score
3. **Decision:**
   - If grade ≥ B AND GPTZero ≥ 80%: "Ready to publish"
   - If grade < B OR GPTZero < 80%: Run surgical rewrites automatically, then re-check

**Combined Report:**
```markdown
# Quality Report

| Check | Result |
|-------|--------|
| AI Pattern Grade | [A-F] |
| Patterns Found | [count] (Major: [X], Minor: [X]) |
| GPTZero Score | [X]% human |
| Recommendation | [Publish / Needs fixes / Major rewrite] |

## Patterns Found
[Line-by-line breakdown with fix options]

## Action Plan
[Specific steps based on results]
```

---

## Auto-Fail Patterns Reference

These are the patterns that most reliably trigger AI detection. Any 2+ major patterns = automatic F grade:

**Contrast Format (MAJOR):**
- "It's not X, it's Y"
- "This isn't about X—it's about Y"
- Split: "[Subject] isn't X. It's Y."

**Rule of Three (MAJOR when consistent):**
- Exactly 3 items in every list
- 3 parallel examples every time

**Staccato Openings (MAJOR):**
- "Short. Punchy. Dramatic."
- Fragment sentences as hooks

**Perfect Parallel Structures (MAJOR):**
- Every bullet starts identically
- Every section has same format

**Words That Trigger Detection:**
- Corporate: leverage, synergy, seamless, robust, cutting-edge, optimize, utilize, empower, scalable, innovative, disruptive, ecosystem
- AI crutch: dive deep, unpack, here's what you need to know, key takeaway, digital landscape, game-changer, unlock potential, elevate, delve
- Transitions: here's the thing, the reality is, moreover, furthermore, additionally, consequently
- Cringe: The truth? The catch? Sound familiar? Guess what?

---

## Rules

- **NEVER scan from memory.** Read the command file every time — it contains 400+ lines of detection patterns, replacement strategies, and examples.
- **NEVER show a C+ grade and ask "want me to fix it?"** If you're running the full pipeline, fix it yourself before showing the user.
- **ALWAYS provide replacement options.** Don't just flag — give 2-3 concrete alternatives.
- Update frontmatter with scores after any quality check:
  ```yaml
  quality_grade: "B"
  ai_hunter_scanned: true
  gptzero_score: 85
  ```
