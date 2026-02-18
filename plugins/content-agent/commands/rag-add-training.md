---
description: Add new content to the training database
---

# Add Training Content

Add high-quality content examples to your training library. This is how I learn your style.

## Process

1. **Receive Content** — paste it or point to a file
2. **Detect Platform** — I'll figure out if it's LinkedIn, Twitter, email, etc. (or ask)
3. **Extract Patterns** — identify the hook, structure, CTA, and what makes it work
4. **Save as Markdown** — with searchable frontmatter tags
5. **Update Index** — add to `training/examples/_index.md` count

## Where Content Gets Saved

| Platform | Location |
|----------|----------|
| LinkedIn | `training/examples/linkedin/` |
| Twitter/X | `training/examples/twitter/` |
| Email | `training/examples/email/` |
| Other | `training/examples/other/` |

## File Format

Each training file uses this format:

```markdown
---
platform: linkedin
content_type: post
hook: "AI replaced our $72K marketing coordinator"
tags: [ai, automation, case_study, roi]
human_score: 95
creator: user
date_added: 2024-01-15
---

[Full content here]
```

## How to Add

### Option 1: Paste Directly

Just paste the content and say "Add this to training." I'll:
- Detect the platform
- Extract the hook line
- Generate relevant tags
- Create a filename based on the hook
- Save to the right folder

### Option 2: Point to a File

"Add this to training: content/2026-02/12/li-ai-tips.md"

I'll read the file, extract patterns, and copy to training.

### Option 3: Batch Add

Paste multiple pieces separated by `---`:

```
[Content 1]
---
[Content 2]
---
[Content 3]
```

## What to Add

**Best training content:**
- Your highest-engagement posts
- Content that captures your voice perfectly
- Examples of formats you want to replicate
- Competitor content you admire (with attribution tag)

**Required info:**
- Platform (I'll detect it or ask)
- The content itself

**Optional but helpful:**
- Hook line (first line that grabs attention)
- Tags for searchability
- Performance score (1-100)

## Output

After adding:

```markdown
Saved to: training/examples/linkedin/ai-replaced-coordinator.md

| Field | Value |
|-------|-------|
| Platform | linkedin |
| Hook | "AI replaced our $72K marketing coordinator" |
| Tags | ai, automation, case_study |
| Word Count | 245 |
```

Want to add more? Paste another piece of content, or say "done."
