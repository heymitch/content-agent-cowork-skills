# Generate Meme

Generate a meme using the Imgflip API.

{{file:.claude/commands/_shared/preflight-checks.md}}

## Arguments
- `$ARGUMENTS` - Meme concept or topic (e.g., "drake meme about manual vs automated content")

## Process

1. **Parse the request** to determine:
   - Which meme template fits best
   - What text should go on top/bottom

2. **Select template** from popular options:
   - **Drake** (181913649): Rejecting X / Preferring Y
   - **Distracted Boyfriend** (112126428): Person distracted by new thing, ignoring current thing
   - **Change My Mind** (129242436): Hot take / controversial opinion
   - **Two Buttons** (87743020): Difficult choice between options
   - **Expanding Brain** (93895088): Increasingly "enlightened" takes (4 levels)
   - **Always Has Been** (252600902): Realization that something was always true
   - **Woman Yelling at Cat** (188390779): Someone angry vs someone unbothered
   - **Surprised Pikachu** (155067746): Obvious consequence is obvious
   - **UNO Draw 25** (217743513): Rather do extreme thing than simple thing
   - **One Does Not Simply** (61579): Something that seems simple but isn't

3. **Generate using script**:
   ```bash
   node scripts/generate-meme.js --template "template_name" --top "Top text" --bottom "Bottom text"
   ```

4. **Optional: Download** if saving to content folder:
   ```bash
   node scripts/generate-meme.js --template "drake" --top "..." --bottom "..." \
     --output "content/YYYY-MM/DD/meme-slug.jpg"
   ```

## Examples

**Input:** "meme about people using chatgpt wrong"
**Output:**
```bash
node scripts/generate-meme.js --template "drake" \
  --top "Asking ChatGPT to write your entire strategy" \
  --bottom "Using AI to amplify your existing expertise"
```

**Input:** "surprised pikachu about AI tools failing without context"
**Output:**
```bash
node scripts/generate-meme.js --template "surprised pikachu" \
  --top "Gives AI zero context about your business" \
  --bottom "AI produces generic garbage"
```

**Input:** "expanding brain about content creation"
**Output:**
```bash
node scripts/generate-meme.js --id 93895088 \
  --boxes '[{"text":"Writing posts manually"},{"text":"Using templates"},{"text":"AI-assisted drafts"},{"text":"Full content agent pipeline"}]'
```

## Setup Required

If you see auth errors, user needs:
1. Free account at https://imgflip.com/signup
2. Add to `.env`:
   ```
   IMGFLIP_USERNAME=your_username
   IMGFLIP_PASSWORD=your_password
   ```

## Text Guidelines

- Keep text SHORT (memes are visual, not essays)
- Top text: Setup / Context / The "wrong" way
- Bottom text: Punchline / Contrast / The "right" way
- Match the meme's cultural meaning (Drake = preference, Pikachu = obvious outcome, etc.)
