# Collaboration Mode

Read `config.md` → `## Content Preferences` → check for `{platform}_mode` setting.
Fall back to `default_mode` if no platform-specific override exists.
If no Content Preferences section exists, default to `autopilot`.

## Mode: Autopilot (default)

Generate complete content end-to-end. Self-audit against quality patterns. Deliver the finished piece.

Do NOT ask for approval at intermediate steps. The user wants output, not process.

## Mode: Co-write

1. **Propose 3 hook options** based on topic + training examples
   - Show each hook with a brief note on the angle
   - Wait for user to pick one, modify one, or provide their own
2. **Generate full content** from the chosen hook
   - Apply all quality rules and voice matching
3. **Present for user tweaks**
   - Show the draft, ask "Anything you'd change?"
4. **Finalize and save**
   - Apply any edits, run self-audit, save

## Mode: Step-by-step

1. **Hook** — Propose 3 hooks based on topic + training examples. Wait for user to pick or modify.
2. **Outline** — Show the structure (sections, key points, flow). Wait for approval.
3. **Draft** — Expand outline into full content. Wait for feedback.
4. **Evidence** — Add proof points, specific numbers, examples, case studies. Wait for approval.
5. **Polish** — Run AI pattern scan, voice match check, character/word count verification. Deliver final.

At each gate, present the work and explicitly wait. Do not advance to the next step without user input.
