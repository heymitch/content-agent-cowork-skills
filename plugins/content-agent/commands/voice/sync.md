# Voice Sync

Sync user's voice profile to CLAUDE.md from the best available source.

## What This Does

1. Checks for voice profile data
2. Updates the `<!-- VOICE_SYNC_START -->` section in CLAUDE.md
3. Preserves all other CLAUDE.md content

## When This Runs

- **Manually**: User runs `/voice:sync`
- **After setup**: When `/voice:setup` completes the Curiosity Pattern interview

## Sync Logic (Dual Path)

### Path 1: Notion MCP Available
If Notion MCP tools are detected:
1. Search for a "Voice Profile" or "Voice Lab" page in the user's Notion workspace
2. Extract voice configuration (archetypes, examples, tone markers)
3. Update config.md Voice Profile section with the Notion content
4. Update CLAUDE.md between markers

### Path 2: config.md (Default)
If no Notion MCP tools available:
1. Read `config.md` from project root
2. Extract the `## Voice Profile` section
3. Update CLAUDE.md between `<!-- VOICE_SYNC_START -->` and `<!-- VOICE_SYNC_END -->` markers

config.md IS the voice source when Notion isn't connected. No sync needed — just confirm it's up to date.

## Voice Profile Format (in CLAUDE.md)

After sync, the voice section looks like:

```markdown
<!-- VOICE_SYNC_START -->
## User Voice Profile

### How They Think (Curiosity Pattern)
- Approaches problems by [pattern from interview]
- Gets excited about [topics/angles]
- Natural speaking rhythm: [short/long, formal/casual]

### Voice Archetype: [Primary]
[Description of their dominant style]

### Tone Markers
- [Specific characteristics]
- [Words/phrases they use]
- [Things they avoid]

### Reference Posts
See `training/examples/` for posts that nail this voice.

<!-- VOICE_SYNC_END -->
```

## Usage

```bash
# Manual sync
/voice:sync
```
