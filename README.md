# Content Agent Cowork Skills

Voice-matched content creation for Claude Code. 15 skills, 50 commands, 127 anti-AI-detection rules. By Mitch Harris & Nicolas Cole.

## Install

```bash
# From the Claude Code plugin marketplace
/plugin marketplace add heymitch/content-agent-cowork-skills

# Or install directly
/plugin install heymitch/content-agent-cowork-skills
```

## What You Get

**15 Skills** — Platform-specific writers (LinkedIn, Twitter, Email, Video, Instagram, Bluesky, Image, Batch) + utility skills (Business Blueprint, Voice Training, Quality Pipeline, Training Manager, Ayrshare Publishing, Meeting Connector, Content Analytics)

**4 AI Agents** — Content Orchestrator, Surgical Rewriter, Content Auditor, Content Fix Applier

**50 Commands** — Content generation, quality checking, voice training, publishing, analytics, and more

**24 Prompt Templates** — Battle-tested frameworks, hooks, styles, and CTAs organized by platform

**15 Scripts** — Integrations with Notion, Ayrshare, GPTZero, Gamma, and more

## Quick Start

1. Install the plugin
2. Say **"Run my business blueprint"** — 5-minute interview to learn your business
3. Say **"Train on my voice"** — 10-minute interview to learn how you write
4. Say **"Write a LinkedIn post about [topic]"** — Your first post, in your voice

## How It Works

Every content request routes to a platform-specific skill that loads a 5-layer prompt stack:

1. **System core** — Base behavior and output format
2. **Brand rules** — 127 anti-AI-detection rules + banned words
3. **Platform spec** — Character limits, formatting, best practices
4. **Voice profile** — Your trained writing patterns
5. **Training examples** — Your best-performing posts as reference

The result: content that sounds like you wrote it, not like AI generated it.

## Workspace Setup

Download the workspace template from Notion (link provided in your cohort materials), then install the plugin and run the business blueprint.

## Philosophy

- **Voice-first**: Every piece of content matches your trained voice profile
- **Quality-obsessed**: 127 anti-AI-detection rules, self-audit before showing you anything
- **Platform-native**: Each platform has its own skill with specific rules and constraints
- **Training-powered**: The more examples you provide, the better the voice matching

## Full Reference

See [plugins/content-agent/README.md](plugins/content-agent/README.md) for the complete component reference.

## License

Proprietary — (c) 2025 Mitch Harris & Nicolas Cole. All rights reserved.
