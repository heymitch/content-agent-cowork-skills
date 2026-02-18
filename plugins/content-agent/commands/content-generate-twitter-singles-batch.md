<!-- DEPRECATED: This command file's logic has been absorbed into skills/twitter-writer/SKILL.md -->
---
description: Generate a daily batch of 10 Twitter/X singles (shitposts, hot takes, tips, observations)
---

# Generate Twitter Singles Batch

Generate a daily batch of 10 Twitter singles for high-volume posting.

{{file:commands/_shared/preflight-checks.md}}

{{file:commands/_shared/client-context.md}}

## What This Is

Twitter singles are short, standalone posts designed for volume. Unlike threads (which build an argument) or essays (which go deep), singles are:

- Quick hits that stand alone
- Mix of tones and formats
- Designed for 10x/day posting cadence
- The "ambient presence" layer of your content strategy

## Daily Mix Target

Each batch of 10 should include variety:

| Type | Count | Description |
|------|-------|-------------|
| Hot takes | 2-3 | Contrarian opinions, spicy observations |
| Tactical tips | 2-3 | Quick advice, micro-frameworks, "do this" |
| Observations | 2-3 | Patterns noticed, industry commentary |
| Personal/Story | 1-2 | Quick anecdotes, lessons, "today I..." |
| Engagement | 1 | Question, poll prompt, or conversation starter |

## Format Rules

1. **Character Limit**: Each tweet ≤280 characters (hard limit)
2. **No hashtags**: They look desperate
3. **No threads in disguise**: Each tweet is complete on its own
4. **No "1/" numbering**: These aren't connected
5. **Lowercase okay**: Casual tone acceptable for hot takes
6. **Punctuation optional**: "this is fine" reads differently than "This is fine."

## Tone Spectrum

Singles can range across the tone spectrum within a single batch:

```
Serious ←――――――――――――――――――――――――→ Playful
"Most AI tools are chatbots      "my agent just mass-emailed
with delusions of grandeur"       my entire contact list.
                                  we're learning together"
```

Both are valid. Mix them.

## Process

1. **Get the day's theme** (optional):
   - User may provide a topic focus
   - Or generate based on content pillars and current events
   - Theme loosely connects ~half the tweets; rest can be random observations

2. **Generate 10 tweets**:
   - Vary formats and tones
   - Ensure each stands alone
   - Check character counts
   - Remove AI patterns

3. **Label each tweet** with type (for tracking mix):
   - [HOT TAKE]
   - [TACTICAL]
   - [OBSERVATION]
   - [PERSONAL]
   - [ENGAGEMENT]

4. **Save as single document** per day

## Output Format

Save to: `content/YYYY-MM/DD/tw-singles.md`

```markdown
---
fileClass: content
title: Twitter Singles - [Date]
platform: twitter
type: singles-batch
Publish_Date: YYYY-MM-DD
status: Draft
tags:
  - [theme-tag]
tweet_count: 10
mix:
  hot_takes: X
  tactical: X
  observations: X
  personal: X
  engagement: X
ai_score:
quality_grade:
---

# Twitter Singles - [Day], [Date]

## 1. [HOT TAKE]
Most "AI strategy" is just "we bought ChatGPT seats" with extra steps.

**Chars**: 71

---

## 2. [TACTICAL]
Before you automate a process, document it. If you can't write down the steps, neither can your agent.

**Chars**: 112

---

## 3. [OBSERVATION]
Noticed a pattern: the companies winning with AI aren't the ones with the most tools. They're the ones who deleted the most tools.

**Chars**: 147

---

## 4. [PERSONAL]
Spent 3 hours debugging an agent today. The bug? I'd spelled "customer" wrong in one prompt. Automation is humbling.

**Chars**: 128

---

## 5. [ENGAGEMENT]
What's the dumbest thing you've automated? I'll go first: I built an agent to remind me to drink water. It worked too well.

**Chars**: 138

---

## 6. [HOT TAKE]
[Tweet text]

**Chars**: XX

---

## 7. [TACTICAL]
[Tweet text]

**Chars**: XX

---

## 8. [OBSERVATION]
[Tweet text]

**Chars**: XX

---

## 9. [HOT TAKE]
[Tweet text]

**Chars**: XX

---

## 10. [TACTICAL]
[Tweet text]

**Chars**: XX

---

## Batch Summary
- Hot takes: X
- Tactical: X
- Observations: X
- Personal: X
- Engagement: X
- **Total chars**: XXX (avg XX/tweet)
```

## Quality Checks

Before delivering:

1. **Character count**: Every tweet ≤280 (use `node scripts/count-chars.js` or count manually)
2. **AI patterns**: Scan for corporate speak, hollow enthusiasm, "Here's the thing:"
3. **Standalone test**: Does each tweet make sense without context?
4. **Voice check**: Would this sound normal coming from the brand?
5. **Mix check**: Is there variety in tone and format?

## Example Invocations

```
/content:generate-twitter-singles-batch
```
Generates 10 tweets based on content pillars, random mix.

```
/content:generate-twitter-singles-batch theme: agent orchestration
```
Generates 10 tweets loosely themed around orchestration.

```
/content:generate-twitter-singles-batch for Monday Feb 3
```
Generates batch for specific date.

## Anti-Patterns to Avoid

- ❌ "Here's a thread on..." (this isn't a thread)
- ❌ "1/" or any numbering (not connected)
- ❌ "Let me explain..." (just say the thing)
- ❌ Generic motivational content ("Believe in yourself!")
- ❌ Hashtag stuffing (#AI #Automation #Winning)
- ❌ Asking questions you'll never engage with
- ❌ All tweets sounding the same tone
- ❌ Corporate voice in what should be casual

## Good Examples by Type

**Hot Take:**
> most "AI roadmaps" are just PowerPoints that cost $50k

**Tactical:**
> quick test for any automation: if it breaks at 2am, do you need to fix it immediately? if yes, add alerting before you ship.

**Observation:**
> interesting pattern: the teams building the best agents aren't AI teams. they're ops teams who got tired of waiting.

**Personal:**
> just mass-deleted 6 agents I built last month. none of them were doing anything useful. cleanup is underrated.

**Engagement:**
> what's one process you'd never automate, even if you could?

{{file:commands/_shared/next-steps.md}}
