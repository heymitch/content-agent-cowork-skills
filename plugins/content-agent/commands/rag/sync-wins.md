---
description: Add or update company wins, case studies, and context for content proof points
---

# Sync Company Wins & Context

Add wins, case studies, testimonials, and metrics to use as proof points in content.

## Where It Gets Saved

All company context saves to `training/proof-points/` as markdown files.

## Context Types

| Type | Use For | Example |
|------|---------|---------|
| `win` | Specific achievement | "Increased revenue 40% in 90 days" |
| `case_study` | Detailed client story | Full transformation narrative |
| `testimonial` | Client quote | "Results in the first 30 days" |
| `metric` | Key business number | "500+ clients served" |

## File Format

```markdown
---
type: win
title: "Client X: 40% Revenue Increase"
date: 2024-01-15
tags: [ai, revenue, saas]
metrics:
  revenue_increase: "40%"
  timeframe: "90 days"
  industry: "SaaS"
---

## Summary

Helped Client X automate their content workflow...

## The Numbers

- Revenue increased 40% in 90 days
- 20 hours/week saved on content creation
- ROI: 5x within first quarter

## The Story

[Full narrative here...]

## Quotable

"We saw results in the first 30 days." - John Smith, CEO
```

## Adding Context

### Quick Win

```
/rag:sync-wins

Type: win
Title: Client X Replaced Marketing Role with AI
Numbers: $72K saved, 60 days to results, 40 hrs/week saved
Tags: ai, automation, cost_savings

Description:
Helped Client X automate their content workflow, replacing a $72K/year marketing coordinator role.
```

### Testimonial

```
/rag:sync-wins

Type: testimonial
Title: CEO Quote - Results in 30 Days
Quote: "We saw results in the first 30 days. The AI content system paid for itself in month one."
Attribution: John Smith, CEO of TechCorp
```

### Full Case Study

```
/rag:sync-wins

Type: case_study
Title: TechCorp: From 0 to 50K Followers

[Paste full case study...]
```

## Output

```markdown
# Context Added

**Saved to:** `training/proof-points/client-x-revenue-win.md`

| Field | Value |
|-------|-------|
| Type | win |
| Title | Client X: 40% Revenue Increase |
| Tags | ai, revenue, saas |

## Key Metrics

| Metric | Value |
|--------|-------|
| revenue_increase | 40% |
| timeframe | 90 days |

## How to Use

Reference in content generation:
"Include the Client X case study as a proof point"
"Mention the 40% revenue increase stat"

## Search It

```
/rag:search-training revenue case study
```
```

Now provide your win, case study, or testimonial.
