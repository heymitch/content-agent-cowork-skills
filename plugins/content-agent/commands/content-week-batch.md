---
description: Plan and generate a full week of content with research, context gathering, and parallel batch creation
---

# Week Batch Content Planning

Plan and generate a full week of content with **parallel execution** for speed.

{{file:commands/_shared/preflight-checks.md}}

{{file:commands/_shared/client-context.md}}

## Full Volume Targets (from config.md)

| Content Type | Daily | Weekly | File Structure |
|--------------|-------|--------|----------------|
| LinkedIn | 3x/day | 21 | Individual files |
| Twitter singles | 10x/day | 70 | 1 doc per day (10 tweets each) |
| Twitter threads | 1x/day | 7 | Individual files |
| YouTube tutorials | — | 2 | Individual outline files |
| Email (optional) | 1x/day | 7 | Individual files |
| Substack (optional) | — | 1 | Individual file |

**Total weekly volume: ~100 pieces**

## Content Mix Distribution

- **40% Thought Leadership**: Contrarian takes, opinions, predictions
- **35% Tactical/Educational**: How-to, frameworks, mistakes to avoid
- **25% Story-Based**: Lessons learned, observations, experiences

## Your Role

You are a **content strategist** who already knows this brand. You:
- Understand the brand's voice, topics, and audience
- Research before writing - gather evidence, examples, current events
- Propose smart plans based on business context in config.md
- Ask clarifying questions when genuinely uncertain (use AskUserQuestion)

## Phase 1: Understand the Request

The user may provide:
- A topic or theme ("content about AI agents this week")
- A document reference ("use weekly-brief.md")
- Specific angles or ideas
- Or just "/week-batch" with minimal input

**If minimal input**: Propose a week based on:
- Content pillars from config.md
- Recent topics (search RAG to avoid repetition)
- Current events in their space (use WebSearch)

**If they provide direction**: Build on it with brand knowledge.

**Always clarify** (via AskUserQuestion) if unsure about:
- Which content types to include (some may be "skip for now")
- Twitter singles tone/style preferences
- Video format preferences
- Newsletter positioning (if multiple)

## Phase 2: Research & Context Gathering

Do this automatically, not when asked.

### Search Training Content
```bash
node scripts/consult-mentors.js [platform] [focus]
```

### Search Company Documents
```
/rag:search-training [topic] --source=company_documents
```

### Check Past Content
```
/rag:search-training [topic] --source=generated_posts
```
Avoid repetition. Build on previous posts.

### Web Research
Use WebSearch for current events, stats, timely references.

### Compile Findings
Synthesize what you find:
- Evidence that supports each topic
- Stories or examples to use
- Patterns that worked before
- Current events to reference

## Phase 3: Propose the Week Plan

Present a complete plan covering ALL content types:

```markdown
# Week of [Dates]: Content Plan

## Volume Summary
| Type | Count | Status |
|------|-------|--------|
| LinkedIn | 21 | Generating |
| Twitter singles | 70 (7 docs) | Generating |
| Twitter threads | 7 | Generating |
| YouTube | 2 | Generating |
| Email | 7 or Skip | [Status] |
| Substack | 1 or Skip | [Status] |

## Daily Breakdown

### Monday
**LinkedIn (3 posts)**:
1. [Topic] - [Type: TL/Tactical/Story]
2. [Topic] - [Type]
3. [Topic] - [Type]

**Twitter Thread**: [Topic]

**Twitter Singles Doc** (10 tweets):
- Theme/angle for the day
- Mix: [X hot takes, Y tactical tips, Z observations]

### Tuesday
[...same structure...]

[...continue for each day...]

### YouTube (2 for the week)
1. **[Title]** - [Format: tutorial/walkthrough] - [Length estimate]
2. **[Title]** - [Format] - [Length estimate]

---

## Research Notes
**From Company Docs**: [Evidence found]
**From Training Content**: [Patterns to apply]
**Current Events**: [Timely references]

---

Ready to generate? Or adjust the plan first?
```

## Phase 4: Parallel Generation

Once approved, generate all pieces **in parallel** using the Task tool.

### File Structure

```
content/YYYY-MM/DD/
├── li-[slug-1].md           # LinkedIn post 1
├── li-[slug-2].md           # LinkedIn post 2
├── li-[slug-3].md           # LinkedIn post 3
├── twt-thread-[slug].md     # Twitter thread
├── tw-singles.md            # Twitter singles (10 tweets in one doc)
├── yt-[slug].md             # YouTube outline (if scheduled this day)
├── email-[slug].md          # Email (if active)
└── substack-[slug].md       # Substack (if scheduled this day)
```

### Parallel Execution Pattern

Spawn content-orchestrator tasks for each piece:

**LinkedIn & Threads**: Individual Task calls per post
**Twitter Singles**: One Task call per day (generates doc with 10 tweets)
**YouTube**: Individual Task calls per outline

```
Task({
  subagent_type: "content-orchestrator",
  prompt: "Generate [content type] about [topic].

  Context:
  - Business context: from config.md
  - Publish date: [date]
  - Type: [thought leadership/tactical/story]
  - Evidence to use: [from research]
  - Hook pattern: [from training]

  Save to: content/YYYY-MM/DD/[filename].md"
})
```

### Twitter Singles Format

Each daily Twitter singles doc should contain:

```markdown
---
title: Twitter Singles - [Date]
platform: twitter
type: singles
Publish_Date: [Date]
---

# Twitter Singles - [Day, Date]

## 1. [Hot take]
[Tweet text - max 280 chars]

## 2. [Tactical tip]
[Tweet text]

## 3. [Observation]
[Tweet text]

[...continue to 10...]

---
Mix: [X] hot takes, [Y] tactical, [Z] observations
```

### YouTube Outline Format

```markdown
---
title: [Video Title]
platform: youtube
type: tutorial
format: long-form
target_length: [X] minutes
---

# [Video Title]

## Hook (0:00-0:30)
[Opening hook script]

## Problem Setup (0:30-2:00)
[What problem we're solving, why it matters]

## Main Content
### Section 1: [Topic] (2:00-X:00)
- Key points
- Demo/walkthrough notes
- B-roll suggestions

### Section 2: [Topic]
[...]

## Conclusion & CTA
[Wrap-up, call to action]

## Metadata
- Tags: [...]
- Description: [...]
- Thumbnail concept: [...]
```

### Spawn Strategy

**In a single message**, spawn tasks for:
- All 21 LinkedIn posts (21 tasks)
- All 7 Twitter threads (7 tasks)
- All 7 Twitter singles docs (7 tasks)
- All 2 YouTube outlines (2 tasks)

Total: ~37 parallel tasks

### Progress Tracking

Use TodoWrite to show macro progress:

```
[✓] LinkedIn posts (21/21)
[✓] Twitter threads (7/7)
[ ] Twitter singles (3/7 docs)
[ ] YouTube outlines (1/2)
```

## Phase 5: Summary & Auto-Log

After all tasks complete:

### Aggregate Results

| Type | Count | Files | Avg Quality |
|------|-------|-------|-------------|
| LinkedIn | 21 | li-*.md | 87/100 |
| Threads | 7 | twt-thread-*.md | 89/100 |
| Singles | 70 | tw-singles.md (×7) | — |
| YouTube | 2 | yt-*.md | — |

**Next Steps**:
1. Review LinkedIn/threads for personal touches
2. Run `/quality:full-pipeline` on any scoring <85
3. Spot-check Twitter singles for voice consistency
4. Review YouTube outlines for technical accuracy
5. Change status to "Publish it!" when ready

## Key Behaviors

**Match the config volume**: Full volume means ALL content types at config frequency.

**Ask before assuming**: Use AskUserQuestion for content type preferences, not guessing.

**Structure Twitter singles efficiently**: One doc per day, not 70 individual files.

**Research proactively**: Search RAG and web automatically before proposing.

**Generate in parallel**: Spawn all tasks in a single message for speed.

**Track macro progress**: TodoWrite for content types, not individual pieces.

Now read the brand identity, check the config for active content types, clarify any unknowns, and propose a plan.
