---
description: Create a new client workspace with AI-assisted research
---

# New Client Setup

Create a new client workspace and auto-populate config using web research.

## Usage

```
/client:new [client-name]
```

Or just `/client:new` to be prompted.

## Process

### Step 1: Gather Basic Info

Ask for:
- **Client name** (slug format for folder: lowercase, hyphens, no spaces)
- **Full name or company name** (for research)
- **Website URL** (optional but helpful)
- **LinkedIn URL** (optional but helpful)
- **Brief description** (if no website available)

### Step 2: Search Database for Existing Context

**IMPORTANT**: Most new clients come from discovery calls or meetings. Search the database first:

```
/rag:search-training "[client name]" --source=company_documents
```

Look for:
- Zoom call transcripts mentioning the client
- Meeting notes or discovery call summaries
- Any existing documents about their business
- Previous conversations that reveal their voice, goals, challenges

If meetings are found:
- Extract key insights about their business
- Note their actual language and phrasing (for voice)
- Pull specific goals or challenges they mentioned
- Identify stories or examples they shared

### Step 3: Research with Web Search

Use WebSearch to supplement database findings:

**If website provided:**
- Company about page, mission statement
- Services/products offered
- Target audience indicators
- Team/founder bios
- Content they've published (blog, LinkedIn)

**If LinkedIn provided:**
- Profile headline and about section
- Recent posts (for voice/tone analysis)
- Featured content
- Experience and positioning

**If name only:**
- Search "[name] + [industry hints from description]"
- Look for interviews, podcasts, articles
- Social media presence

### Step 4: Analyze & Draft Config

From database + web research, extract:

**Brand Voice:**
- How do they describe themselves?
- What words/phrases do they use repeatedly?
- What's their tone in public content?
- Any signature frameworks or concepts?

**Company Mission:**
- What problem do they solve?
- Who do they serve (specific audience)?
- What makes them different?

**Curiosity Pattern:**
- What topics do they post about?
- Any contrarian takes or strong opinions?
- Recurring themes in their content?

### Step 5: Create Client Folder

```bash
# Create folder structure
mkdir -p clients/[client-name]/context
mkdir -p clients/[client-name]/content
```

### Step 6: Generate config.md

Create `clients/[client-name]/config.md` with researched content.

Mark sections that need human review with `[REVIEW]` tags:

```markdown
### Identity
[REVIEW] Based on their website, they position as...
```

### Step 7: Present for Review

```markdown
# New Client Created: [client-name]

## Research Summary

### From Database (Meetings/Calls)
- [X] meeting transcripts found
- Key insights: [what they said about their business]
- Their words: [actual phrases they use - for voice matching]

### From Web Research
- Website: [url]
- LinkedIn: [url]
- Key positioning: [summary]

## Draft Config Created

I've created `clients/[client-name]/config.md` with:

### Brand Voice
[Brief summary - what I found]

### Mission
[Brief summary - what I found]

### Content Pillars (suggested)
1. [topic found in their content]
2. [topic found in their content]
3. [NEEDS INPUT - add more based on your knowledge]

## Sections Needing Review

The following sections are marked [REVIEW] and need your input:
- [ ] Contrarian takes (couldn't find strong opinions)
- [ ] Banned words (need your guidance)
- [ ] Content mix percentages

## Next Steps

1. Open `clients/[client-name]/config.md` in Obsidian
2. Review and edit sections marked [REVIEW]
3. Add any context docs to `clients/[client-name]/context/`
4. Run `/client:switch [client-name]` to activate
```

## Research Prompts

When using WebSearch, use queries like:

```
"[company name]" about mission values
"[person name]" LinkedIn about
"[company name]" target audience customers
"[person name]" interview podcast
"[company name]" blog content topics
site:[website] about team founder
```

## Example Session

```
User: /client:new