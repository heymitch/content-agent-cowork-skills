# Content Agent Workspace

This is your content workspace. It stores your training data, generated content, and custom prompts.

## Setup

1. **Install the content agent plugin:**
   ```bash
   /plugin install heymitch/content-agent-cowork-skills
   ```

2. **Run your business blueprint:**
   ```
   Run my business blueprint
   ```
   This fills `config.md` with your business context (audience, offers, voice, weekly rhythm).

3. **Train on your voice:**
   ```
   Train on my voice
   ```
   This runs a 10-question interview and saves your voice profile to `training/voice/`.

4. **Add training examples:**
   Copy your best-performing posts into `training/examples/{platform}/` as markdown files. The more examples, the better the voice matching.

5. **Create your first post:**
   ```
   Write a LinkedIn post about [topic]
   ```

## Directory Structure

```
config.md                    ← Your business context (filled by business-blueprint)
.env.example                 ← Optional API keys (Ayrshare, GPTZero)
training/
  voice/                     ← Your voice profile
  examples/
    linkedin/                ← Your winning LinkedIn posts
    twitter/                 ← Your winning tweets
    email/                   ← Your best newsletters
    instagram/               ← Your top IG captions
    bluesky/                 ← Your Bluesky posts
    tiktok/                  ← Video scripts
    youtube/                 ← YouTube scripts
  proof-points/              ← Case studies, stats, wins to reference
content/                     ← Generated content output
prompts/
  custom/                    ← Your custom prompt overrides
```

## Tips

- Run "Sync my training" after adding new examples to update the training index
- Run "Analyze my training" to see which patterns work best
- Check "Add to Training" in Notion on your best posts, then sync to pull them back
