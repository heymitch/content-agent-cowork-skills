---
name: content-creation
description: Generate voice-matched content for any platform — LinkedIn, Twitter, email, carousel, video, Instagram, Bluesky, memes, images, and full week batches. Say "Write a LinkedIn post about X" or "Create a tweet about X" or "Create a week of content".
user-invocable: true
---

# Content Creation

> **How to run:** "Write a LinkedIn post about X", "Write a tweet about X", "Create a carousel about X", "Draft a newsletter", "Script a video", "Create a week of content", "Turn this meeting into content"

You NEVER freestyle content. Every request routes to a command file that loads the full prompt stack, quality rules, and training patterns.

---

## Preflight (Run Silently Every Time)

### 1. Config Check
Read `config.md` from project root.
- If missing: Stop. Say "I need your business context first. Say 'Run my business blueprint' — takes 5 minutes."
- If exists: Load business context silently.

### 2. Voice Training Check
Check config.md for `- [x] Voice Training completed`.
- If unchecked: Warn once. "I can write, but it won't sound like you yet. Say 'Train on my voice' first — or say 'skip' to continue."
- If checked: Load Voice Profile section silently.

### 3. Notion Check (Silent)
Check for Notion MCP tools. If found, will save to Notion after local save. Don't mention either way.

### 4. All clear — proceed without announcing.

---

## Step 1: Route to the Right Command File

Match the user's request to the correct command file. **READ the file BEFORE writing anything.**

| Request Contains | Read This File |
|-----------------|---------------|
| LinkedIn, post | `.claude/commands/content/generate-linkedin.md` |
| Tweet, Twitter, X (single) | `.claude/commands/content/generate-twitter.md` |
| Thread | `.claude/commands/content/generate-twitter-thread.md` |
| Batch of tweets | `.claude/commands/content/generate-twitter-singles-batch.md` |
| Email, newsletter | `.claude/commands/content/generate-email-value.md` |
| Carousel | `.claude/commands/content/generate-carousel.md` |
| Video script | `.claude/commands/content/generate-video-short.md` |
| Animated video | `.claude/commands/content/generate-video-animated.md` |
| Instagram | `.claude/commands/content/generate-instagram.md` |
| Bluesky | `.claude/commands/content/generate-bluesky.md` |
| Image | `.claude/commands/content/generate-image.md` |
| Meme | `.claude/commands/content/generate-meme.md` |
| Week of content | `.claude/commands/content/week-batch.md` |
| Meeting into content | `.claude/commands/content/generate-from-meeting.md` |

The command file contains `{{file:}}` includes — follow every one. These load the 5-layer prompt stack:
1. `system-core.md` — Core generation rules
2. `brand-identity.md` — Who you are and what you sell
3. `writing-rules-no-ai.md` — 127 rules including GPTZero bypass (rules 111-127)
4. `banned-words.md` — Words that trigger AI detection
5. Platform-specific rules (linkedin.md, twitter.md, etc.)

---

## Step 2: Consult Training Examples

Before generating, search training data for structural patterns:

```
Glob: training/examples/{platform}/**/*.md
```

Read top 3-5 matches. For each, extract:
- **Hook**: First non-header line (opening pattern)
- **Structure**: Headers and content flow
- **CTA**: Last 3 lines (closing pattern)

Apply the **bones** from examples to shape new content. Never copy content — only copy structure.

If no platform-specific examples exist, search all platforms:
```
Glob: training/examples/**/*.md
```

---

## Step 3: Generate Content

Follow ALL rules from the loaded prompt stack:

**Platform Limits (non-negotiable):**
| Platform | Limit |
|----------|-------|
| LinkedIn | ≤2,800 chars |
| Twitter single | ≤280 chars |
| Twitter thread | 5-12 posts, ≤280 each |
| Twitter batch | 10 singles per batch |
| Email | 400-500 words |
| Carousel | 3-10 slides via Gamma |
| Video script | 30-90 seconds |
| Instagram | ≤2,200 chars |
| Bluesky | ≤300 chars |

**Quality Standards:**
- **The Surprise Test:** Would this surprise someone who's read 10 posts on this topic? If no — go deeper.
- **Rate of Revelation:** Aim for 4+/5 (most sections add genuine insight).
- Contractions always (I'm, don't, can't)
- Vary sentence length (mix 5-word and 20-word sentences)
- One idea per sentence
- Specific numbers over vague claims

**Auto-Fail Patterns (scan and remove BEFORE showing user):**
- Contrast format: "It's not X, it's Y" / "This isn't about X—it's about Y"
- Rule of Three (exactly 3 items every time)
- Staccato openings (short. punchy. dramatic.)
- Perfect parallel structures
- Corporate jargon: leverage, synergy, seamless, robust, cutting-edge, optimize, utilize, empower
- AI crutch phrases: dive deep, unpack, here's what you need to know, key takeaway, game-changer, unlock potential
- Robotic transitions: here's the thing, the reality is, moreover, furthermore, additionally
- Cringe rhetorical: The truth? The catch? Sound familiar? Guess what?

---

## Step 4: Self-Audit Before Showing

Before presenting content to the user, scan your output against the patterns above.

- **Grade A (0 patterns):** Ship it.
- **Grade B (1-2 minor):** Ship it with note.
- **Grade C or below:** Fix it yourself. NEVER show the user C+ content and ask "want me to fix it?" Fix it first, show the clean version.

---

## Step 5: Save & Deliver

Save to `content/YYYY-MM/DD/[platform]-[slug].md` with frontmatter:

```markdown
---
fileClass: content
title: [Title]
platform: [platform]
type: [post/thread/email/carousel/video/image]
Publish_Date: YYYY-MM-DD
status: Draft
tags:
  - [tag1]
  - [tag2]
ai_score:
quality_grade:
gptzero_score:
media_url:
---

[COMPLETE POST CONTENT - RAW TEXT ONLY]
```

If Notion MCP available: push to Content database after local save.

---

## Step 6: Next Steps

After delivering:
1. "Run quality audit" — full AI pattern scan with grade
2. "Check GPTZero score" — external AI detection validation
3. "Fix the AI patterns" — surgical rewrites of flagged lines
4. Change status to "Publish it!" when ready
5. "Schedule this post" — send to Ayrshare for auto-publishing

---

## Rules

- **NEVER generate without reading the command file first.** The command files contain the full prompt stack and platform-specific rules.
- **NEVER skip training example consultation.** 700+ examples exist for a reason.
- **NEVER show content you haven't self-audited.** The user should never see a C+ draft.
- **NEVER use your own judgment on "what sounds human."** Use the 127 rules in writing-rules-no-ai.md.
- Ask for topic/idea if not provided. Ask for specific case studies, numbers, or examples to include. Don't batch questions — ask naturally in conversation.
