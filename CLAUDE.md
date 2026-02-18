# Content Agent Cowork Skills — Repo Maintenance

This repo is the **Claude Code plugin marketplace** for the AI Content Agent. It follows the plugin marketplace spec used by [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin).

## Structure

```
.claude-plugin/marketplace.json    → Marketplace registry (lists all plugins)
plugins/content-agent/             → The content agent plugin
  .claude-plugin/plugin.json       → Plugin manifest
  CLAUDE.md                        → Content agent behavior spec (loaded when active)
  agents/                          → 4 AI agents (quality + workflow)
  commands/                        → 50 slash commands
  prompts/                         → 24 prompt templates
  skills/                          → 15 skills
  scripts/                         → 15 utility scripts
workspace-template/                → User scaffold (not part of plugin)
```

## Component Count Verification

Run these to verify counts match what's documented:

```bash
find plugins/content-agent/agents -name "*.md" | wc -l     # 4
find plugins/content-agent/commands -name "*.md" | wc -l    # 50
ls -d plugins/content-agent/skills/*/  | wc -l              # 15
find plugins/content-agent/prompts -name "*.md" | wc -l     # 24
find plugins/content-agent/scripts -name "*.js" | wc -l     # 15
```

## Version Bump Checklist

When updating the plugin:

1. Update `plugins/content-agent/.claude-plugin/plugin.json` version
2. Update `.claude-plugin/marketplace.json` plugin version + metadata version
3. Update `plugins/content-agent/CHANGELOG.md` with changes
4. Verify component counts still match
5. Validate JSON: `cat .claude-plugin/marketplace.json | jq .`

## marketplace.json Schema

```json
{
  "name": "string",
  "owner": { "name": "string", "url": "string" },
  "metadata": { "description": "string", "version": "string" },
  "plugins": [{
    "name": "string",
    "description": "string",
    "version": "string",
    "author": { "name": "string", "url": "string" },
    "homepage": "string",
    "tags": ["string"],
    "source": "./plugins/<name>"
  }]
}
```

## Commit Conventions

- `feat:` — New skills, commands, or agents
- `fix:` — Bug fixes in existing components
- `docs:` — Documentation updates
- `refactor:` — Structural changes without behavior change
- `sync:` — Syncing updated files from source workspace
