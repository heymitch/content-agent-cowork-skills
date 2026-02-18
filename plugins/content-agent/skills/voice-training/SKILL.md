---
name: voice-training
description: 10-question Curiosity Pattern interview that captures how you think and write, so your agent produces content that sounds like you.
user-invocable: true
version: 1.0.0
---

# Voice Training

> **How to run:** Say "Train on my voice"

This captures HOW you think — not just what you write about. After this, your agent matches your natural voice.

---

## Preflight

Read `config.md` from project root.
- If missing: Say "I need your business context first. Say 'Run my business blueprint' — takes 5 minutes."
- If exists: Continue.

---

## The Curiosity Pattern Interview

Ask these questions one at a time. Listen for patterns, energy, natural rhythm.

1. **Origin Story**: "What's the story of how you got into [their field]? Not the resume version - the real one."
2. **Obsession**: "What's something in your field you could talk about for hours that most people find boring?"
3. **Contrarian Take**: "What's a popular opinion in your industry that you think is completely wrong?"
4. **Aha Moment**: "Describe a moment when something clicked for you that changed how you see your work."
5. **Pet Peeve**: "What makes you roll your eyes when you see it on LinkedIn/Twitter?"
6. **Secret Weapon**: "What's something you do that gives you an unfair advantage that you rarely share?"
7. **Prediction**: "What do you think is coming in your field that most people aren't prepared for?"
8. **Failure Story**: "Tell me about a time you were completely wrong about something. What did you learn?"
9. **Teaching Moment**: "If you had 5 minutes to explain one concept to a beginner, what would it be?"
10. **Voice Check**: "When you're texting your smartest friend about work, how do you actually talk? Give me an example."

## Voice Archetypes

| Signal | Archetype |
|--------|-----------|
| Short, punchy answers | Opinionator |
| Stories with scenes | Storyteller |
| Stats and evidence | Fact Presenter |
| Step-by-step thinking | Frameworker |
| Casual profanity | F-Bomber |

## After Interview

1. Summarize findings
2. Ask user to confirm/adjust
3. Replace the `## Voice Profile` section in `config.md`:

```markdown
## Voice Profile
**Status:** Configured

### How You Think
[2-3 sentences on their thinking patterns]

### Your Archetype: [Primary] with [Secondary] tendencies
[1-2 sentences describing their style]

### Tone Markers
- [Characteristic 1]
- [Characteristic 2]
- [Characteristic 3]

### Things You'd Never Say
- [Anti-pattern 1]
- [Anti-pattern 2]

### Sample Voice (from interview)
> "[Direct quote from question 10]"
```

4. Update `- [x] Voice Training completed` in Setup Status
