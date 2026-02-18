<!-- DEPRECATED: This command file's logic has been absorbed into skills/batch/SKILL.md -->
---
description: Extract insights from a meeting transcript and generate content ideas and drafts
---

# Generate Content from Meeting

Turn meetings into content. This is the "always ready employee" behavior — your conversations become posts automatically.

{{file:.claude/commands/_shared/preflight-checks.md}}

{{file:.claude/commands/_shared/client-context.md}}

## How to Run

- "Turn this meeting into content"
- "Turn my last call into posts"
- "What content can I make from this meeting?"

## Process

### 1. Get the Transcript

**If Fireflies is connected:**
- Ask which meeting (or use the most recent)
- Pull the full transcript via Fireflies MCP tools

**If no Fireflies:**
- Ask user to paste the transcript or point to a file
- Accept any format (raw text, markdown, timestamps)

### 2. Extract Content Gold

Read the transcript and identify:

**Insights** — Original thoughts, frameworks, or observations
- Things they said that made the other person react
- Unique perspectives or contrarian takes
- Frameworks or processes they described

**Quotes** — Direct quotes that sound authentic
- Natural language, not polished
- Memorable phrasing
- Things that capture their voice

**Stories** — Specific examples or experiences
- Client results or case studies mentioned
- Personal anecdotes with lessons
- Before/after transformations

**Data Points** — Any numbers, stats, or metrics mentioned
- Revenue numbers, percentages, timelines
- Results from experiments or implementations
- Industry benchmarks

### 3. Generate Content Ideas

Present 3-5 content ideas based on extracted material:

```markdown
# Content Ideas from [Meeting Name]

## Idea 1: [LinkedIn Post]
**Hook:** "[Specific insight from meeting]"
**Angle:** [How to frame it]
**Key quote:** "[Direct quote]"
**Evidence:** [Data point or story from meeting]

## Idea 2: [Twitter Thread]
**Hook:** "[Different angle]"
**Thread structure:** [Brief outline]

## Idea 3: [LinkedIn Post]
**Hook:** "[Story-based opening]"
**Angle:** [How to frame it]
```

### 4. Draft Selected Posts

Ask the user which ideas to develop, then:

{{file:.claude/commands/_shared/mentor-consulting.md}}

Replace `{{platform}}` with the chosen platform.

Generate full drafts using:
- The extracted content as raw material
- Their voice profile from config.md
- Training examples for structure
- The actual words and phrases from the transcript (authenticity)

### 5. Save & Deliver

Save each draft to `content/YYYY-MM/DD/[platform]-from-meeting-[slug].md`

{{file:.claude/commands/_shared/output-frontmatter.md}}

Add extra frontmatter:
```yaml
source_meeting: "[meeting title or date]"
```

{{file:.claude/commands/_shared/next-steps.md}}

## Quality Notes

- Use their actual words from the meeting whenever possible — this is the most authentic content
- Don't polish too much — meeting language is naturally more casual and real
- If the meeting was with a client, be careful not to share confidential details
- Flag any content that might reveal private information for review
