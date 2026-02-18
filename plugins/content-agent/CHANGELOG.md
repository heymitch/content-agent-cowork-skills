# Changelog

## 1.0.0 — Initial Marketplace Release

Restructured from flat repo to Claude Code plugin marketplace format.

### Skills (15)
- **Platform Writers (8):** linkedin-writer, twitter-writer, email-writer, video-writer, instagram-writer, bluesky-writer, image-generator, batch
- **Utility Skills (7):** business-blueprint, voice-training, quality-pipeline, training-manager, ayrshare-publishing, meeting-connector, content-analytics

### Agents (4)
- **Quality:** content-auditor, content-fix-applier
- **Workflow:** content-orchestrator, surgical-rewriter

### Commands (50)
- Content generation (14), quality (5), voice & training (4), RAG & prompts (6), client management (3), analytics (2), canvas (2), publishing (1), setup (3), connectors (1), design (1), productivity (1), shared modules (7)

### Prompts (24)
- Base (2), brand (4), frameworks (5), platform (6), stacks (6), tools (1)

### Scripts (15)
- Integrations with Notion, Ayrshare, GPTZero, Gamma, Imgflip, Google Sheets, and more

### Changes from Source
- Wrapped all components in `plugins/content-agent/` directory
- Added `.claude-plugin/marketplace.json` and `plugin.json`
- Categorized agents into `quality/` and `workflow/` subdirectories
- Replaced deprecated `content-creation` skill with 8 platform-specific writers
- Added `collaboration-mode.md` shared command
- Added workspace template for new user onboarding
