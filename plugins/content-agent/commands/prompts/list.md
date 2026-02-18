---
description: List all available prompts by category
---

# List All Prompts

Display a quick reference of all available prompts organized by category.

## Instructions

Read the prompts/ directory and display all available prompts grouped by type:
- Frameworks
- Hooks
- Styles
- CTAs

## Output Format

```
# Prompt Library

## Frameworks (content structures)
- listicle.md - Tips, lessons, numbered lists
- hot-take.md - Strong opinions, debate starters
- x-vs-y.md - Comparison posts, contrasts
- outline-as-content.md - Quick list posts for testing ideas
- long-form-expansion.md - Deep dive posts with PAS format
- lead-magnet.md - Lead generation, giveaway posts
- story-arc.md - Personal narratives, transformation stories

## Hooks (opening lines)
- bold-outcome.md - "I [action] and [surprising result]" (2.5x)
- contrarian-question.md - "What if [wisdom] is wrong?" (2.1x)
- specific-number.md - "X → Y in Z timeframe" (3.0x)
- mistake-admission.md - "I [mistake] for [time]. Here's what I learned" (2.8x)
- pattern-interrupt.md - "Everyone does X. I do Y." (2.3x)
- tease-framework.md - "The N-step framework that [outcome]" (2.4x)
- urgent-observation.md - "In [time], [change]. Here's how to prepare" (2.2x)

## Styles (voice/tone)
- authoritative.md - Confident, expert, decisive
- conversational.md - Friendly, relatable, casual
- storyteller.md - Narrative-driven, emotional
- data-driven.md - Evidence-based, precise
- provocative.md - Bold, challenging, contrarian

## CTAs (CTAs)
- soft-ask.md - Discussion questions, low pressure
- direct-cta.md - Clear action, link/DM based
- question-close.md - Thought-provoking engagement
- cliffhanger.md - Teases future content, drives follows

---

## Quick Usage

Single prompt:
/content:generate-linkedin @prompts/frameworks/listicle.md
[your topic]

Stacked prompts:
/content:generate-linkedin @prompts/frameworks/x-vs-y.md @prompts/hooks/pattern-interrupt.md
[your topic]

Search for specific prompts:
/prompts:search [query]
```

## Process

1. Use Glob to find all .md files in prompts/ subdirectories
2. Read frontmatter from each file to get title and brief description
3. Group by type (frameworks, hooks, styles, ctas)
4. Display in the format above
5. Include usage examples at the end
