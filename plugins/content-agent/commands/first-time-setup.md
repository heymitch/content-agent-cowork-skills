---
description: Interactive first-time setup wizard for new users
---

# First-Time Setup

Welcome new users and get them creating content within 30 minutes.

## The Goal

By the end of this setup, the user has:
1. Business context captured (config.md filled)
2. Voice profile trained (so content sounds like them)
3. Their first post generated as proof it works

All connectors (Notion, Fireflies, Gamma, Ayrshare, GPTZero) are **optional** — the agent generates high-quality, voice-matched content with zero external tools. Connectors add bonus features like auto-publishing and meeting-to-content workflows, but you don't need any of them to get started.

## How to Run This

This orchestrates the full onboarding flow. Run each step in sequence.

---

## Step 1: Check If Already Set Up

Read `config.md` from project root.

**If config.md exists and has `- [x] Business Blueprint completed`:**
"Looks like we've already met! Your business context is set up."

Check if voice is trained:
- If `- [x] Voice Training completed`: "And your voice is trained. You're good to go. What should we create?"
- If voice not trained: "But I haven't learned your voice yet. Want to do that now? Say 'Train on my voice' — takes about 10 minutes."

**If no config.md or blueprint not completed:**
Continue with setup.

---

## Step 2: Business Blueprint

Run the business blueprint interview. This fills config.md with their business context.

Say: "Let's start by learning about you and your business. This takes about 5 minutes."

Then follow the instructions in the business-blueprint command — ask ONE question at a time through all 11 questions. Save results to config.md.

---

## Step 3: Voice Training

After blueprint is complete, transition to voice training:

"Great, now I know your business. Next up — I need to learn how you write so I don't sound like a robot. This is the Curiosity Pattern interview — 10 questions about how you think. Takes about 10 minutes."

Then follow the instructions in the voice/setup command — run the full Curiosity Pattern interview. Save results to config.md Voice Profile section.

---

## Step 3.5: Content Preferences

After voice training, before checking connectors:

"One more thing — how do you like to work with content?

A) **Autopilot** — Give me a topic, I handle everything and deliver a finished post
B) **Co-write** — I propose hooks and drafts, you steer the direction
C) **Step-by-step** — We build each post together: hook → outline → draft → polish

Most people start with Autopilot and switch to Co-write once they see how it works."

Save choice as `default_mode` in config.md → `## Content Preferences` → `### How I Work`.

Then ask:

"Which platforms do you publish on? (Check all that apply)"
- LinkedIn
- Twitter/X
- Email/Newsletter
- Video (TikTok, Shorts, Reels)
- Instagram
- Bluesky

Save checked platforms to config.md → `## Content Preferences` → `### Active Platforms`. Mark selected ones with `[x]`, unselected with `[ ]`.

---

## Step 4: Connect Your Content Calendar (Notion)

After content preferences, set up their content command center:

"Now let's set up where all your content lives. We use a Notion Content Calendar — every draft, edit, and published post flows through it.

**Here's what it gives you:**
- All generated content auto-saves to your Content Calendar
- Status pipeline: Draft → Edit With AI → Ready → Publish It → Published
- Check 'Add to Training' on your best posts and I learn your voice over time
- Performance tracking with engagement metrics right in the calendar"

### Setup Flow

1. **Add the Notion connector** — In Cowork, go to your connectors and add Notion
2. **Duplicate the template** — Your instructor will share the ACA Content Calendar Template in the course. Duplicate it to your Notion workspace.
3. **Paste the URL** — Copy the URL of your duplicated Content Calendar database and paste it here.

When the user pastes the Notion database URL:
- Fetch the database with `notion-fetch` to confirm it has the expected columns (Hook, Content, Platform, Status, Publish Date, Tags, Add to Training)
- Save the database URL to config.md under `## Notion` → `content_calendar_db: [url]`
- Save the data source URL (collection:// URL from fetch results) to config.md under `content_calendar_datasource: [collection-url]`
- Update `- [x] Notion connected` in config.md
- Say: "Content Calendar connected! I'll save all content there automatically."

**If they don't have Notion or want to skip:**
"No problem — the content agent works great standalone. Content saves to local files. You can connect Notion anytime later."

---

## Step 4.5: Other Connectors (Optional)

Silently check for bonus tools (all are optional — skip any that aren't found):
- Fireflies MCP tools → update `- [x] Fireflies connected` in config.md (meetings → content)
- Gamma API key in .env → update `- [x] Gamma connected` in config.md (carousel generation)
- Ayrshare API key in .env → update `- [x] Ayrshare connected` in config.md (auto-publishing)
- GPTZero API key in .env → update `- [x] GPTZero connected` in config.md (AI detection scoring)

If any found: "I also found these connected: [list]. Nice — that unlocks [brief benefit per tool]."
If none found beyond Notion: "No other tools connected — that's fine. You can add Fireflies (meetings→content), Gamma (carousels), Ayrshare (auto-publish), or GPTZero (AI scoring) anytime."

---

## Step 5: First Post

"You're all set. Let's prove it works. What topic should we write about? Pick something you'd actually post."

Generate a LinkedIn post using their voice profile and business context. This is the proof that the 25-minute setup works.

After generating:
"That's your first post, written in your voice. From here you can:
- **Generate more**: 'Write a tweet about X', 'Create a carousel about X'
- **Improve quality**: 'Scan this for AI patterns'
- **Train me better**: 'Add this to training' when you write something great
- **Auto-publish**: Connect Ayrshare and say 'Schedule this post'

Say 'What can you do?' anytime to see everything I can help with."

---

## Behavior Notes

- Keep energy high but not cheesy
- React to answers naturally
- Don't over-explain the process
- Save incrementally — if they bail halfway, save what you have
- The whole flow should take ~25 minutes
- Never pressure users to connect external tools — standalone is the default
