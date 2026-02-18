---
description: Guide to connecting Fireflies for meeting transcripts and business context
---

# Connect Fireflies

Set up Fireflies so I can access your meeting transcripts and build better content from real conversations.

## What This Gets You

Once connected:
- "Prep me for my meeting with [person]" — I pull past conversations
- "Turn my last meeting into content" — I extract insights and draft posts
- "What did we discuss with [company]?" — I search your transcript history

## Setup Guide

### For Cowork Users

1. Open Cowork Settings
2. Go to Connectors
3. Find Fireflies and click Connect
4. Authorize access to your Fireflies account
5. Done — I can now access your transcripts

**Test it:** Say "Show my recent meetings" — I should be able to list them.

### For Direct API Users

If you're not using Cowork but have a Fireflies API key:

1. Get your API key from [Fireflies Settings](https://app.fireflies.ai/integrations)
2. Add to your `.env`:
   ```
   FIREFLIES_API_KEY=your-key-here
   ```
3. Done — the scripts can now query Fireflies

## After Connecting

I'll update your config.md:
```
- [x] Fireflies connected
```

## What I Can Do With Fireflies

| Command | What Happens |
|---------|-------------|
| "Show my recent meetings" | List recent transcripts |
| "What did we discuss with [person]?" | Search transcript content |
| "Prep me for my call with [person]" | Pull all history for meeting brief |
| "Turn this meeting into content" | Extract insights → draft posts |

## Troubleshooting

**"I can't see any meetings":**
- Check that Fireflies is recording your meetings (it needs to join calls)
- Verify the connector is active in Cowork Settings
- Try "Show meetings from this week" to narrow the search

**"Transcripts are empty":**
- Fireflies needs time to process recordings (usually 5-15 minutes after a call)
- Check your Fireflies dashboard to confirm transcripts exist
