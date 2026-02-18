---
description: Interactive interview that builds your business context so the agent knows who you are, what your business does, and how to help you. Takes 5 minutes.
---

# Business Blueprint

> **How to run:** Say "Run my business blueprint"

This teaches your agent who you are and what your business does. Every other skill works better after this because your agent has real context instead of guessing.

---

## Instructions for the Agent

You are running an interactive interview. Ask ONE question at a time. Wait for the answer before moving on. Use plain, friendly language. No jargon. No walls of text.

Start by saying:

> "Let's build your business blueprint. I'm going to ask you some simple questions so I can learn about you and your business. This takes about 5 minutes. After we're done, I'll create a config file that makes me way more useful to you. Ready? Let's go."

### Section 1: Who You Are

Ask these one at a time:

1. "What's your name?"
2. "What's your business or company called?"
3. "In one sentence, what do you do?"
4. "What's your role? (founder, marketer, ops person, something else?)"

### Section 2: Your Business

Ask these one at a time:

5. "Who do you serve? Describe your ideal customer or client."
6. "What do you sell? Just your main 1-2 things."
7. "What's your price point? (Rough range is fine.)"
8. "What tools do you use every day? (Notion, Google Drive, Slack, Gmail, etc.)"

### Section 3: Your Week

Ask these one at a time:

9. "Walk me through a typical work week. What fills your days?"
10. "What tasks do you repeat every single week without fail?"
11. "What takes the most time that you wish was faster?"

---

## After the Interview

Once all questions are answered, write the results to `config.md` at the project root.

### Update config.md

Fill in each section with their answers:

```markdown
# Business Context

## Owner
- **Name:** [name]
- **Business:** [business name]
- **One-liner:** [what they do]
- **Role:** [role]

## Business
- **Ideal Customer:** [who they serve]
- **Main Offer:** [what they sell]
- **Price Point:** [price range]
- **Daily Tools:** [tools list]

## Weekly Rhythm
- **Typical Week:** [summary]
- **Recurring Tasks:** [weekly repeats]
- **Biggest Time Sink:** [pain point]

## Voice Profile
**Status:** Not configured. Run "Train on my voice" to set up.

## Setup Status
- [x] Business Blueprint completed
- [ ] Voice Training completed
- [ ] Notion connected
- [ ] Fireflies connected
- [ ] Gamma connected
- [ ] Ayrshare connected
```

Mark `- [x] Business Blueprint completed` in Setup Status.

### Check for Notion

Silently check if Notion MCP tools are available.
- If found: Update `- [x] Notion connected` in Setup Status.
- If not found: Don't mention it.

---

## Wrap Up

After creating the config, say:

> "Done. I created your business context in config.md. Every skill I have works better now because I know your business.
>
> **Next step:** Say 'Train on my voice' — I'll learn how you write so content sounds like you, not AI. Takes about 10 minutes."

---

## Behavior Notes

- Ask ONE question at a time
- React to answers naturally ("Got it, so you're B2B SaaS focused")
- Don't over-explain
- Save incrementally — if they bail halfway, save what you have
- If config.md already exists with data, confirm before overwriting
