---
description: Run the Curiosity Pattern interview to capture your authentic voice
---

# Voice Setup

Run the Curiosity Pattern interview to capture the user's authentic voice.

## What This Does

1. Conducts a 10-question interview designed to understand HOW the user thinks
2. Analyzes responses for voice patterns, not just content
3. Identifies their Voice Archetype
4. Saves Voice Profile directly into `config.md`
5. Updates Setup Status checkbox

## The Curiosity Pattern

This isn't about WHAT they write. It's about HOW they think.

### Interview Flow

Ask these questions one at a time. Listen for patterns, energy, natural rhythm.

**1. Origin Story**
"What's the story of how you got into [their field]? Not the resume version - the real one."

**2. Obsession**
"What's something in your field that you could talk about for hours that most people find boring?"

**3. Contrarian Take**
"What's a popular opinion in your industry that you think is completely wrong?"

**4. Aha Moment**
"Describe a moment when something clicked for you that changed how you see your work."

**5. Pet Peeve**
"What makes you roll your eyes when you see it on LinkedIn/Twitter?"

**6. Secret Weapon**
"What's something you do that gives you an unfair advantage that you rarely share?"

**7. Prediction**
"What do you think is coming in your field that most people aren't prepared for?"

**8. Failure Story**
"Tell me about a time you were completely wrong about something. What did you learn?"

**9. Teaching Moment**
"If you had 5 minutes to explain one concept to a beginner, what would it be and how would you explain it?"

**10. Voice Check**
"When you're texting your smartest friend about work, how do you actually talk? Give me an example."

### What to Listen For

| Signal | Indicates |
|--------|-----------|
| Short, punchy answers | Opinionator archetype |
| Stories with scenes | Storyteller archetype |
| Stats and evidence | Fact Presenter archetype |
| Step-by-step thinking | Frameworker archetype |
| Casual profanity | F-Bomber archetype |
| Mixed energy | Hybrid (pick primary) |

## Voice Archetypes

**Storyteller**: Opens with scenes, uses "I remember when...", paints pictures
**Opinionator**: Leads with takes, uses "Here's the thing...", polarizing
**Fact Presenter**: Data-first, uses "Research shows...", measured
**Frameworker**: Systems thinker, uses "There are 3 types...", organized
**F-Bomber**: Raw authenticity, casual profanity, no filter

## After Interview

1. Summarize findings in voice profile format
2. Ask user to confirm/adjust
3. Write Voice Profile section directly into `config.md`
4. Update `- [x] Voice Training completed` in Setup Status

### How to Save to config.md

Replace the `## Voice Profile` section in `config.md` with the results:

```markdown
## Voice Profile
**Status:** Configured

### How You Think
[2-3 sentences on their thinking patterns from interview]

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
> "[Direct quote from question 10 that captures their voice]"
```

Also update the CLAUDE.md voice sync section between `<!-- VOICE_SYNC_START -->` and `<!-- VOICE_SYNC_END -->` markers with a summary of the voice profile.

## Usage

```bash
/voice:setup
```

Then answer the questions conversationally. Takes about 10-15 minutes.
