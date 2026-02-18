# Contributing to Content Agent

Prompt improvements, new frameworks, and platform rule tweaks are welcome. Here's how to submit one.

## What You Can Improve

| Layer | Path | What's There |
|-------|------|-------------|
| **Platform rules** | `plugins/content-agent/prompts/platform/*.md` | Per-platform formatting, character limits, best practices |
| **Prompt stacks** | `plugins/content-agent/prompts/stacks/*-full.md` | The full 5-layer stack each skill loads |
| **Frameworks** | `plugins/content-agent/prompts/frameworks/*.md` | Structural patterns (listicle, hot take, story arc, etc.) |
| **Writing rules** | `plugins/content-agent/prompts/brand/writing-rules-no-ai.md` | The 127 anti-AI-detection rules |
| **Banned words** | `plugins/content-agent/prompts/brand/banned-words.md` | Words that trigger AI detectors |
| **System core** | `plugins/content-agent/prompts/base/system-core.md` | Base agent behavior and output format |
| **Shared commands** | `plugins/content-agent/commands/_shared/*.md` | Preflight checks, quality patterns, mentor consulting |
| **Skills** | `plugins/content-agent/skills/*/SKILL.md` | Per-platform skill definitions |

## How to Submit a PR

1. **Fork** this repo
2. **Create a branch** — `improve/linkedin-hooks` or `fix/twitter-char-count`
3. **Edit the prompt files** — keep changes focused on one thing
4. **Show your work** — in the PR description, include:
   - **Before**: What the current prompt produces (paste an example)
   - **After**: What your change produces (paste an example)
   - **Why**: What's better about the output (lower AI detection, better hooks, higher engagement, etc.)
5. **Open the PR** against `main`

## PR Format

```markdown
## What Changed
[One sentence — e.g., "Added a 'contrarian reframe' hook pattern to the LinkedIn platform rules"]

## Before
[Paste example output using the current prompt]

## After
[Paste example output using your improved prompt]

## Why This Is Better
[What improved — AI score, engagement pattern, voice matching, etc.]
```

## Guidelines

- **Don't touch user data** — `workspace-template/` files like `config.md`, `training/`, `content/` are user-side. Improvements go in `plugins/content-agent/`.
- **Keep it surgical** — change one thing per PR. A new framework is one PR. A tweak to writing rules is a separate PR.
- **Test with real output** — run the prompt through the agent and include the actual output in your PR. We don't merge theoretical improvements.
- **Respect the 127 rules** — if you're adding to `writing-rules-no-ai.md`, explain which AI pattern it catches and show a before/after.
- **Match existing format** — look at how current frameworks and platform files are structured. Follow the same pattern.

## What We Won't Merge

- Changes that break `{{file:}}` include paths
- Prompts that increase AI detection scores
- Generic "best practices" without before/after evidence
- Anything that touches the skill routing or plugin manifest without discussion first

## Questions?

Open an issue first if you're unsure whether a change is wanted. Saves everyone time.
