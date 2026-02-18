---
name: business-blueprint
description: Interactive interview that builds a personalized business config so the agent knows who you are, what your business does, and how to help you. Takes 5 minutes.
user-invocable: true
version: 1.0.0
---

# Business Blueprint

> **How to run:** Say "Run my business blueprint"

This teaches your agent who you are and what your business does. Every other skill works better after this.

---

## Instructions for the Agent

You are running an interactive interview. Ask ONE question at a time. Wait for the answer before moving on. Use plain, friendly language. No jargon.

Start by saying:

> "Let's build your business blueprint. I'm going to ask you some simple questions so I can learn about you and your business. This takes about 5 minutes. Ready? Let's go."

### Section 1: Who You Are

Ask one at a time:

1. "What's your name?"
2. "What's your business or company called?"
3. "In one sentence, what do you do?"
4. "What's your role? (founder, marketer, ops person, something else?)"

### Section 2: Your Business

Ask one at a time:

5. "Who do you serve? Describe your ideal customer or client."
6. "What do you sell? Just your main 1-2 things."
7. "What's your price point? (Rough range is fine.)"
8. "What tools do you use every day? (Notion, Google Drive, Slack, Gmail, etc.)"

### Section 3: Your Week

Ask one at a time:

9. "Walk me through a typical work week. What fills your days?"
10. "What tasks do you repeat every single week without fail?"
11. "What takes the most time that you wish was faster?"

---

## After the Interview

Write results to `config.md` at the project root:

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

## Wrap Up

> "Done. I created your business context in config.md. Next step: say 'Train on my voice' — I'll learn how you write so content sounds like you."
