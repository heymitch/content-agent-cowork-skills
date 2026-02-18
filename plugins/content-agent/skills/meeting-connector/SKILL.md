---
name: meeting-connector
description: Connect Fireflies for meeting transcripts, prep for upcoming calls, and turn meetings into content. Say "Connect Fireflies", "Prep me for my 2pm call", or "Turn this meeting into content".
user-invocable: true
---

# Meeting Connector

> **How to run:** "Connect Fireflies", "Prep me for my call", "Turn this meeting into content"

Your agent becomes meeting-aware — it preps you before calls and turns conversations into content after.

---

## Commands

### Connect Fireflies
**Trigger:** "Connect Fireflies" or "Set up meeting transcripts"

Guide the user:
1. Go to Cowork Settings > Connectors
2. Find Fireflies and click Connect
3. Authorize with your Fireflies account
4. Test: "Show my recent meetings"
5. Update config.md: `- [x] Fireflies connected`

If Fireflies MCP tools aren't available, suggest:
> "I don't see Fireflies connected yet. Go to Cowork Settings > Connectors to add it."

---

### Meeting Prep
**Trigger:** "Prep me for my [time] call" or "Meeting prep for [name]"

#### Preflight
Check which connectors are available (silently):
- Fireflies MCP → past meeting history
- Google Calendar MCP → upcoming meetings
- Gmail MCP → recent email threads
- Notion MCP → client/contact pages

#### Process
1. Find the upcoming meeting (from calendar or user description)
2. Search connected sources for context:
   - Past meeting transcripts with this person/company
   - Email threads
   - Notion pages mentioning them
3. Build a prep brief:

```markdown
# Meeting Prep: [Name/Company]

## Quick Context
[2-3 sentences on who they are and what you know]

## Last Interaction
[Summary of most recent contact]

## Key Points to Cover
- [Based on past conversations]
- [Open items or follow-ups]

## Talking Points
- [Prepared questions or topics]
```

---

### Content from Meetings
**Trigger:** "Turn this meeting into content" or "Extract content from this transcript"

#### Process
1. Get the transcript (Fireflies MCP, pasted text, or file path)
2. Extract:
   - Key insights and frameworks mentioned
   - Quotable moments
   - Contrarian takes or strong opinions
   - Stories with specific details
3. Generate 3-5 content ideas with platform suggestions
4. Draft the best 1-2 posts using the content creation workflow:
   - Load voice profile from config.md
   - Apply platform formatting rules
   - Self-audit for AI patterns before showing

#### Output
```markdown
# Content from Meeting: [Title]

## Key Insights Extracted
1. [Insight] — could be a [platform] post
2. [Insight] — could be a [platform] post

## Draft Posts
### Post 1: [Platform]
[Content]

### Post 2: [Platform]
[Content]
```
