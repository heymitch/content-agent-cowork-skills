---
description: Prepare a comprehensive brief before any meeting by pulling from connected sources
---

# Meeting Prep

Build a complete meeting brief by pulling from your connected tools — all at once.

## How to Run

- "Prep me for my meeting with [person/company]"
- "Brief me on my next call"
- "What do I need to know before my 2pm?"

---

## Preflight Check (Run Every Time)

Run through this silently. Only speak up if something is missing.

### 1. Does config.md exist?
Read `config.md` from the project root.
- **If missing:** Stop. Say: "I need to know about you and your business first. Say **'Run my business blueprint'** — it takes 5 minutes."
- **If exists:** Continue.

### 2. Which connectors are available?
Check your available tools for each of these. Build a list of what's available:
- **Gmail tools** → can pull email threads
- **Slack tools** → can pull channel mentions and threads
- **Google Drive/Docs tools** → can pull shared documents
- **Fireflies tools** → can pull meeting transcripts
- **Calendar tools** → can check meeting details
- **Notion tools** → can search for related pages/notes

For each connector found, if config.md has it unchecked in Setup Status, update it to checked.

- **If zero connectors found:** Say: "I don't have any of your tools connected yet, so I can't pull context automatically. I can still build a brief if you paste what you know — emails, notes, or just tell me about this person."
- **If at least one found:** Continue. Note which sources are available and which aren't — only pull from what's connected.

### 3. All clear — proceed silently.

---

## What to Do

**Step 1:** Check calendar for the meeting details (who, when, what). If no calendar tools, ask the user.

**Step 2:** Pull context from every connected source (skip unavailable ones silently):
- **Gmail**: Recent email threads with this person/company
- **Slack**: Recent mentions or threads about this person/project
- **Google Docs**: Any shared documents or proposals
- **Fireflies**: Transcripts from past meetings — what was discussed, what was promised, what's still open
- **Notion**: Related pages, notes, or CRM entries

**Step 3:** Build the brief:

```markdown
# Meeting Brief: [Person/Company]

## Who You're Meeting
- **Name:** [name]
- **Role:** [role]
- **Company:** [company]
- **Relationship:** [how you know them, how long]

## Last Interaction
[When you last spoke and what was discussed]

## Open Items
- [ ] [Action item from past meetings not yet completed]
- [ ] [Another open item]

## Recent Context
[What's been happening in email/Slack since last meeting]

## Key Documents
- [Link to relevant shared docs]

## Suggested Talking Points
1. [Based on open items and recent context]
2. [Based on open items and recent context]
3. [Based on open items and recent context]

## Sources Used
- [x] Calendar
- [x] Fireflies (3 past meetings found)
- [ ] Gmail (not connected)
- [ ] Slack (not connected)
```

**Step 4:** Show the brief for review.

**Step 5:** Save to `content/meeting-prep/` or Notion if connected.

## Rules

- Only pull from connectors that are actually available — skip the rest silently
- If a connector has no relevant results, say so instead of making something up
- Always show the brief before saving
- Flag anything that looks urgent or time-sensitive
- If meeting is with someone new (no history), say so and focus on what's available
- At the end, if key connectors are missing, mention once: "This brief would be stronger with [Gmail/Fireflies] connected. Want me to help set that up?"
