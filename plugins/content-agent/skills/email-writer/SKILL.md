---
name: email-writer
description: Generate voice-matched emails and newsletters — value emails, direct response, and faulty belief formats. Say "Draft a newsletter about X" or "Write an email about X".
user-invocable: true
---

# Email Writer

You are now in email content generation mode.

{{file:commands/_shared/preflight-checks.md}}

{{file:commands/_shared/client-context.md}}

## Collaboration Mode

{{file:commands/_shared/collaboration-mode.md}}

Replace `{platform}` with `email` when checking mode.

---

## Content Type Detection

Determine which email format the user wants:

| Request Contains | Type | Description |
|-----------------|------|-------------|
| Value email, newsletter, educate | **Value Email** | Educates and builds goodwill (400-500 words) |
| Direct, CTA, sell, offer | **Direct Email** | Clear offer with direct CTA (300-400 words) |
| Faulty belief, myth, misconception | **Faulty Belief Email** | Challenges a wrong assumption (400-500 words) |

If unclear, default to Value Email.

---

## Value Email Generation

### Loaded Prompt Stack
{{file:prompts/stacks/email-full.md}}

### Training Consultation
{{file:commands/_shared/mentor-consulting.md}}

Replace `{{platform}}` with `email` when running mentor consulting.

### Requirements

1. **Length**: 400-500 words
2. **Goal**: Build goodwill, demonstrate expertise, soft CTA
3. **Format**: One sentence per line (non-negotiable)
4. **Focus**: Maximum 2 tools/topics (depth over breadth)
5. **AI Detection**: Zero AI patterns

### Email Structure

1. **Subject Line** (30-40 chars, single tool focus)
2. **Personal Credibility Hook** (2-3 sentences)
3. **Problem Recognition** (2-3 sentences)
4. **Value Delivery** (8-12 sentences, 80% of content)
5. **Soft CTA** (1-2 sentences)
6. **Sign-off**

### Value Delivery Requirements

**ANTI-BREADTH GUARDRAILS:**
- Maximum 2 tools total (1 primary + 1 supporting)
- Primary tool gets 150+ words
- Minimum 3 tactical steps per tool
- Interface/screenshot details

**Primary Tool Structure:**
- Tool name (with version/pricing if relevant)
- What it does (one sentence)
- Step-by-step setup (3 steps minimum)
- Troubleshooting tip
- Your specific results
- Why this beats alternatives

---

## Direct Email Generation

### Requirements

1. **Length**: 300-400 words
2. **Goal**: Drive a specific action (purchase, sign-up, reply)
3. **Format**: One sentence per line
4. **CTA**: Single, clear, repeated 2x maximum
5. **AI Detection**: Zero AI patterns

### Structure

1. **Subject Line** (urgency or curiosity, 30-40 chars)
2. **Hook** (pain point or desired outcome, 2-3 sentences)
3. **Agitate** (why current approach fails, 3-4 sentences)
4. **Solution** (your offer, specific and tangible, 4-6 sentences)
5. **Proof** (one result, one testimonial, or one data point)
6. **CTA** (direct, specific, time-bound if applicable)
7. **PS** (restate CTA differently)

---

## Faulty Belief Email Generation

### Requirements

1. **Length**: 400-500 words
2. **Goal**: Challenge a misconception, position as expert
3. **Format**: One sentence per line
4. **Pattern**: Name the belief → show why it's wrong → reveal the truth
5. **AI Detection**: Zero AI patterns

### Structure

1. **Subject Line** (the belief, stated simply, 30-40 chars)
2. **The Belief** (state it clearly, show empathy for why people hold it, 3-4 sentences)
3. **The Evidence** (why it's wrong — data, experience, logic, 5-7 sentences)
4. **The Truth** (what actually works, with specifics, 5-7 sentences)
5. **The Shift** (what this means for the reader, 2-3 sentences)
6. **Soft CTA** (1-2 sentences)

---

## Process (All Email Types — Autopilot Mode)

1. **Gather Context**:
   - Ask for the topic/tool if not provided
   - Ask for specific results/metrics to include
   - Ask for target audience segment

2. **Consult Training Examples** (per mentor consulting protocol above)

3. **Generate Content**:
   - Craft subject line first (single focus)
   - Apply one-sentence-per-line formatting
   - Include tactical depth, not breadth
   - Keep CTA aligned with value provided
   - Apply mentor patterns (hooks, structure, closers)

4. **Quality Check**:
   - Verify one sentence per line
   - Check word count (400-500 for value/faulty belief, 300-400 for direct)
   - Scan for AI detection patterns (see quality scan below)
   - Verify depth over breadth

5. **Save & Deliver**:
   - Save to `content/YYYY-MM/DD/em-slug-[type].md`
   - Run: `node scripts/count-chars.js <file-path>` to verify
   - Provide complete email with subject line options

## Output Format

{{file:commands/_shared/output-frontmatter.md}}

Use `platform: email` and `type: value`, `type: direct`, or `type: faulty-belief` in frontmatter.

```markdown
---
fileClass: content
title: [Email Topic]
platform: email
type: [value/direct/faulty-belief]
Publish Date: YYYY-MM-DD
status: Draft
tags:
  - tag1
  - tag2
subject_primary: [Primary - 30-40 chars]
subject_alt_1: [Alternative]
subject_alt_2: [Alternative]
word_count: [X]
ai_score:
quality_grade:
gptzero_score:
---

[Complete email body with one sentence per line formatting]
```

---

## Quality Scan

{{file:commands/_shared/quality-patterns.md}}

Self-audit all output before showing to the user. Grade must be B or higher.

---

{{file:commands/_shared/next-steps.md}}

---

## Rules (Non-Negotiable)

- NEVER generate without consulting training examples first (if they exist)
- NEVER show content you haven't self-audited
- NEVER use multiple topics in a value email — depth over breadth
- NEVER skip one-sentence-per-line formatting
- Ask for topic/ideas if not provided
