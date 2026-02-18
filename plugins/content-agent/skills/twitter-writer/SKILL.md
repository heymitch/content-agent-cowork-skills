---
name: twitter-writer
description: Generate voice-matched tweets, threads, and daily batches. Say "Write a tweet about X" or "Write a Twitter thread" or "Write a batch of tweets".
user-invocable: true
---

# Twitter/X Writer

You are now in Twitter/X content generation mode.

{{file:commands/_shared/preflight-checks.md}}

{{file:commands/_shared/client-context.md}}

## Collaboration Mode

{{file:commands/_shared/collaboration-mode.md}}

Replace `{platform}` with `twitter` when checking mode.

---

## Content Type Detection

Determine which format the user wants:

| Request Contains | Type | Constraints |
|-----------------|------|-------------|
| Tweet, single, post | **Single Tweet** | ≤280 characters |
| Thread | **Thread** | 5-12 connected posts, each ≤280 |
| Batch, singles, daily tweets, shitposts | **Daily Batch** | 10 standalone tweets |

If unclear, default to Single Tweet.

---

## Single Tweet Generation

### Loaded Prompt Stack
{{file:prompts/stacks/twitter-full.md}}

### Training Consultation
{{file:commands/_shared/mentor-consulting.md}}

Replace `{{platform}}` with `twitter` when running mentor consulting.

### Requirements

1. **Character Limit**: Each post must be ≤280 characters (non-negotiable)
2. **Format**: Use one of the 5 proven formats
3. **AI Detection**: Zero AI patterns — scan and remove before delivering
4. **Standalone**: Each post must make sense on its own

### Formats Available

1. **Paragraph Style** — Single paragraph with strong opinion
2. **What/How/Why** — Hook + bullets + closing insight
3. **Listicle** — Opening sentence + list of items
4. **Old vs New** — Comparison with mirrored structure
5. **10 Magical Ways** — Tips/Steps/Lessons/Mistakes/etc.

### Process (Autopilot Mode)

1. **Gather Context**:
   - Ask for the topic/idea if not provided
   - Ask how many posts to generate (default: 5)
   - Ask for preferred format(s) or let you choose

2. **Consult Training Examples** (per mentor consulting protocol above)

3. **Generate Content**:
   - Apply Twitter formatting rules strictly
   - Vary formats across posts for diversity
   - Ensure each post delivers standalone value
   - Apply mentor patterns (hooks, structure, formatting)

4. **Quality Check**:
   - Count characters for each (must be ≤280)
   - Scan for AI detection patterns (see quality scan below)
   - Verify format execution

5. **Save & Deliver**:
   - Save to `content/YYYY-MM/DD/tw-slug.md`
   - Run: `node scripts/count-chars.js <file-path>` to verify character count
   - Provide all formatted posts with character counts

### Single Tweet Output Format

{{file:commands/_shared/output-frontmatter.md}}

Use `platform: twitter` and `type: posts` in frontmatter.

```markdown
---
fileClass: content
title: [Topic]
platform: twitter
type: posts
Publish Date: YYYY-MM-DD
status: Draft
tags:
  - tag1
  - tag2
post_count: [X]
formats_used: [Format1, Format2]
ai_score:
quality_grade:
gptzero_score:
---

[First tweet - raw text only]

---

[Second tweet - raw text only]

---

[Continue for all posts...]
```

---

## Thread Generation

### Requirements

1. **Character Limit**: Each post must be ≤280 characters
2. **Length**: 5-12 posts total (default: 7-10)
3. **Numbering**: Use 1/, 2/, 3/ format (not 1/X)
4. **First Post**: Strongest hook — must stop the scroll
5. **Last Post**: Clear CTA (follow, reply, retweet, link)
6. **Flow**: Each post connects to next while standing alone
7. **AI Detection**: Zero AI patterns

### Thread Structure

```
Post 1: HOOK (strongest content, makes them click)
Post 2-3: Setup/Context (why this matters)
Post 4-8: Value Delivery (main points, steps, insights)
Post 9-10: Proof/Examples (case study, numbers)
Post 11: Summary/Synthesis (tie it together)
Post 12: CTA (what to do next)
```

### Process (Autopilot Mode)

1. **Gather Context**:
   - Ask for the topic/idea if not provided
   - Ask for thread length preference (5-12)
   - Ask for specific examples or data to include

2. **Consult Training Examples** (focus on `structure`)

3. **Generate Content**:
   - Craft hook first (most critical)
   - Build logical flow through thread
   - Include specific, tangible value
   - End with clear CTA
   - Apply mentor patterns (hooks, structure, pacing)

4. **Quality Check**:
   - Count characters for each post (must be ≤280)
   - Verify flow between posts
   - Scan for AI detection patterns
   - Check hook strength

5. **Save & Deliver**:
   - Save to `content/YYYY-MM/DD/twt-slug.md`
   - Run: `node scripts/count-chars.js <file-path>` to verify
   - Provide complete formatted thread

### Thread Output Format

```markdown
---
fileClass: content
title: [Thread Title]
platform: twitter
type: thread
Publish Date: YYYY-MM-DD
status: Draft
tags:
  - tag1
  - tag2
post_count: [X]
hook_type: [Question/Bold Statement/Story]
cta_type: [Follow/Reply/Link]
ai_score:
quality_grade:
gptzero_score:
---

1/ [Hook - strongest opening]

2/ [Setup/Context]

3/ [Value point 1]

[...continue...]

X/ [CTA - follow/reply/retweet/link]
```

**Posting Notes**:
- Post all at once or space 1-2 minutes apart
- Reply to first post with rest of thread

---

## Daily Batch Generation (10 Singles)

### What This Is

Twitter singles are short, standalone posts designed for volume. Unlike threads (which build an argument), singles are:

- Quick hits that stand alone
- Mix of tones and formats
- Designed for 10x/day posting cadence
- The "ambient presence" layer of your content strategy

### Daily Mix Target

Each batch of 10 should include variety:

| Type | Count | Description |
|------|-------|-------------|
| Hot takes | 2-3 | Contrarian opinions, spicy observations |
| Tactical tips | 2-3 | Quick advice, micro-frameworks, "do this" |
| Observations | 2-3 | Patterns noticed, industry commentary |
| Personal/Story | 1-2 | Quick anecdotes, lessons, "today I..." |
| Engagement | 1 | Question, poll prompt, or conversation starter |

### Format Rules

1. **Character Limit**: Each tweet ≤280 characters (hard limit)
2. **No hashtags**: They look desperate
3. **No threads in disguise**: Each tweet is complete on its own
4. **No "1/" numbering**: These aren't connected
5. **Lowercase okay**: Casual tone acceptable for hot takes
6. **Punctuation optional**: "this is fine" reads differently than "This is fine."

### Tone Spectrum

Singles can range across the tone spectrum within a single batch:

```
Serious ←――――――――――――――――――――――――→ Playful
"Most AI tools are chatbots      "my agent just mass-emailed
with delusions of grandeur"       my entire contact list.
                                  we're learning together"
```

Both are valid. Mix them.

### Process (Autopilot Mode)

1. **Get the day's theme** (optional):
   - User may provide a topic focus
   - Or generate based on content pillars and current events
   - Theme loosely connects ~half the tweets; rest can be random observations

2. **Generate 10 tweets**:
   - Vary formats and tones
   - Ensure each stands alone
   - Check character counts
   - Remove AI patterns

3. **Label each tweet** with type:
   - [HOT TAKE]
   - [TACTICAL]
   - [OBSERVATION]
   - [PERSONAL]
   - [ENGAGEMENT]

4. **Save as single document** per day

### Batch Output Format

Save to: `content/YYYY-MM/DD/tw-singles.md`

```markdown
---
fileClass: content
title: Twitter Singles - [Date]
platform: twitter
type: singles-batch
Publish Date: YYYY-MM-DD
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
[Tweet text]

**Chars**: [count]

---

## 2. [TACTICAL]
[Tweet text]

**Chars**: [count]

---

[...continue to 10...]

---

## Batch Summary
- Hot takes: X
- Tactical: X
- Observations: X
- Personal: X
- Engagement: X
- **Total chars**: XXX (avg XX/tweet)
```

### Anti-Patterns to Avoid

- "Here's a thread on..." (this isn't a thread)
- "1/" or any numbering (not connected)
- "Let me explain..." (just say the thing)
- Generic motivational content ("Believe in yourself!")
- Hashtag stuffing
- All tweets sounding the same tone
- Corporate voice in what should be casual

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
- NEVER exceed 280 characters per tweet
- NEVER use hashtags
- Ask for topic/ideas if not provided
