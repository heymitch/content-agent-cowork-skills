# AI Detection Patterns

## Forbidden Contrast Formats (Auto-fail if 2+ found)

### Same-Sentence Contrast (any separator)
- "This isn't about X—it's about Y" (em-dash)
- "It's not X, it's Y" (comma)
- "The problem isn't X—it's Y" (em-dash)
- "[noun] isn't X; it's Y" (semicolon)

### Split-Sentence Contrast (SNEAKY - catches most people)
- "[Subject] isn't X. It's Y."
- "[Subject] isn't about X. It's about Y."
- "The [noun] isn't X. The [noun] is Y."
- "This isn't X. This is Y."
- "The question isn't X. The question is Y."

**Example of split-sentence contrast:**
> "The $199B isn't profit for adopters. It's spending by adopters."
This is TWO sentences but the SAME AI pattern. Flag both together.

### Structural Contrast
- Parallel "Who/What/When" headers with opposing concepts
- Matching bullet structures with contrasting items
- "Not X, but Y" lists

## Forbidden Robotic Transitions
- "Here's the thing:"
- "The reality is this:"
- "At the end of the day,"
- "The bottom line is:"
- "The truth is,"
- "Let me be clear:"

## Forbidden AI Crutch Phrases
- "Let's dive deep into..."
- "Let's unpack this..."
- "Here's what you need to know:"
- "The key takeaway is..."
- "In today's digital landscape..."
- "Game-changer"
- "Unlock your potential"

## Forbidden Generic List Introductions
- "Here are X ways to..."
- "Let me share X strategies..."
- "Below are X tips to..."

## Inline Rhetorical Questions (FLAG ALL `?` FOR REVIEW)

**Rule: Every `?` in the content body gets reviewed. CTA questions at the END are fine. Inline questions mid-content are almost always cringe.**

### How to Distinguish

| Type | Location | Example | Verdict |
|------|----------|---------|---------|
| **CTA** | Last 1-2 lines | "Which of these got you?" | ✅ OK |
| **Inline cringe** | Mid-content | "The catch?" | ❌ FLAG |
| **Numerical suspense** | After a stat | "The other 39?" | ❌ FLAG |
| **Setup-punchline** | Before the answer | "The result?" | ❌ FLAG |

### Forbidden Inline Patterns

**Classic suspense bait:**
- "The catch?"
- "The result?"
- "The irony?"
- "The brutal truth?"
- "Sound familiar?"
- "Guess what?"
- "Want to know what happened?"

**Numerical suspense (SNEAKY):**
- "The other [X]?" ← creates false drama around math you already did
- "And the [X]%?"
- "Those [X] people?"
- "The remaining [X]?"

**Begging-the-question:**
- "Why does this matter?"
- "So what's the solution?"
- "What's the takeaway?"
- "How do you fix this?"

**The test:** If deleting the question and just stating the answer reads better, it's cringe.

## Forbidden Corporate Jargon
- "Leveraging"
- "Synergy"
- "Seamless"
- "Robust"
- "Cutting-edge"
- "Best-in-class"
- "Value proposition"

## Structural Red Flags
- Rule of Three (always exactly 3 items)
- Perfectly parallel sentence structures
- Every paragraph same length
- Overly neat "problem → solution → result"

## Staccato & Rhythm Patterns
- **Staccato Opening**: Multiple short dramatic sentences at post start
  - Example: "50 nodes. 6 hours. An AI agent rebuilt it."
- **Uniform Sentence Length**: All sentences 12-15 words (no variation)
- **Perfect Alternation**: Short-long-short-long pattern (too neat)

**Manipulation attempts:**
- "What if I told you..."
- "Ever wonder why..."
- "Have you ever..."
- "Wouldn't you agree..."
- "Don't you think..."
- "Can you guess?"

## Vague/Abstract Language
- "Several ways to..."
- "Many reasons why..."
- "A lot of people..."
- "Various methods..."
- "Significantly better" (no number)
- "Massively improved" (no metric)

## Fake Stories & Fabrications
- "[Name] from [Company]Scale/Pro/Agency"
- "I helped X agencies reach $Y MRR"
- "After working with 50+ clients..."
- "Real results from our latest partner..."
- Any specific-sounding but unverifiable claims

## Grading Scale

| Grade | Patterns Found | Assessment |
|-------|---------------|------------|
| A | 0 | Excellent - publish immediately |
| B | 1-2 minor | Very good - minor polish needed |
| C | 3-4 or 1 major | Good foundation - needs revision |
| D | 5+ or 2+ major | Significant issues - major rewrite |
| F | Pervasive | Sounds like ChatGPT - start over |
