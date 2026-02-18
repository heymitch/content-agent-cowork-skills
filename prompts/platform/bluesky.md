# Bluesky Content Generation

Generate posts optimized for Bluesky's format. Uses Twitter/X rules with platform-specific adjustments.

## Bluesky vs Twitter Differences

| Aspect | Bluesky | Twitter |
|--------|---------|---------|
| Character limit | **300** | 280 |
| Threads | Supported | Supported |
| Hashtags | Not used | Not used |
| Tone | Slightly nerdier, early-adopter vibe | Broader audience |
| Links | Display nicely with cards | Display with cards |

## Format Decision (CRITICAL)

**SINGLE POST (default)** - 300 chars max:
Ask: "Can I deliver this in 300 characters?" If yes → single.
- **Paragraph**: Single declarative perspective
- **Hot Take**: Bold/controversial statement
- **What/How/Why**: Quick observation → reason

**SHORT THREAD (3-4 posts)** - Only if needed:
- One main point with 2-3 supporting examples
- Each post under 300 chars

**LONG THREAD (5-10 posts)** - Complex arguments only:
- Setup → Examples → Insight → CTA
- Each post advances the argument

**BIAS TOWARD SINGLES.** Most thoughts fit in 300 chars. Threads are for depth.

## Scoring Rubric (Target: 18/25)

### 1. HOOK STRENGTH (0-5)
- Grabs attention immediately?
- Specific with concrete details?
- Creates intrigue?

### 2. THREAD FLOW (0-5) [if thread]
- Each post builds on previous?
- Logical progression?
- Maintains momentum?

### 3. BREVITY + RATE OF REVELATION (0-5)
- Each post under 300 chars?
- Each reveals NEW information?
- Zero fluff?

### 4. PROOF/CREDIBILITY (0-5)
- Concrete examples from user's context?
- ZERO fabricated names, companies, metrics?

### 5. ENGAGEMENT TRIGGER (0-5)
- Ends with question or CTA?
- Invites replies?
- NOT passive ("Follow for more")

## Character Limit

**300 characters per post.** Non-negotiable.

## Bluesky-Specific Rules

- Thread numbering: 1/, 2/, 3/ format (same as Twitter)
- NO markdown formatting
- NO hashtags (Bluesky culture doesn't use them)
- Emoji use: sparingly, 1-2 max
- Tone: Slightly more tech-forward, early-adopter friendly
- All lowercase is authentic

## AI Patterns to Avoid

**Auto-fail:**
- Contrast framing: "It's not X, it's Y"
- Rule of Three: "Same X. Same Y. Over Z%."

**Inline questions (FLAG ALL `?`):**
- CTA at END → OK
- Mid-thread questions → DELETE
- "The catch?" / "Sound familiar?" → DELETE

**Forbidden:**
- "In today's landscape" / "Moreover" / "Furthermore"
- Generic intros: "Here are X ways to..."

## Human Voice Patterns

**Use these:**
- Contractions: "I'm", "I've", "here're", "that's"
- Starters: "So", "And", "But"
- Hedging: "pretty well", "a bunch of"
- Lowercase: "this is how I would design..."
- Fragments: "Boom.", "That's it."

## Rich vs Thin Context

**If user provides detailed outline (>100 words):**
- PRESERVE their strategic thinking
- Polish, don't rewrite
- Keep their language, numbers, anecdotes
- Remove only AI tells

**If user provides topic only (<100 words):**
- Create from scratch
- Follow format decision rules
- BIAS TOWARD SINGLES unless depth required

## Quality Checklist

Before delivering:
- [ ] Each post ≤300 chars
- [ ] Hook grabs attention immediately
- [ ] Zero AI patterns
- [ ] Natural flow (if thread)
- [ ] Engagement trigger at end
- [ ] No hashtags
- [ ] Plain text output
