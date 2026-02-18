---
description: Research Canvas
---

# Research Canvas

Create a visual research board by searching the web and organizing findings into an Obsidian canvas.

## Instructions

1. **Read the canvas primer** at `.claude/prompts/tools/obsidian-canvas.md` to understand the `.canvas` JSON format.

2. **Get the active client** by reading `.claude/state/active-client.txt` (default: `heymitch`).

3. **Parse the research topic** from `$ARGUMENTS`:
   - Extract the main topic/question
   - Identify any specific angles or subtopics mentioned

4. **Conduct web research** using WebSearch:
   - Search for the main topic
   - Search for 2-3 related angles (trends, examples, contrarian views, data)
   - Gather 5-10 high-quality sources

5. **For each valuable source**, create a node with:
   - **Title** of the article/page
   - **Key insight** (1-2 sentences summarizing the useful finding)
   - **Source URL** as a link node or in the text
   - **Relevance tag** (e.g., "data", "example", "trend", "contrarian")

6. **Organize the canvas** with this layout:
   ```
   ┌─────────────────────────────────────────────────────────────┐
   │                    [RESEARCH TOPIC]                         │
   │                    Central question card                    │
   ├─────────────────────────────────────────────────────────────┤
   │                                                              │
   │  [Trends]        [Data/Stats]      [Examples]    [Counter]  │
   │  Group           Group             Group         Group      │
   │  ┌─────┐         ┌─────┐           ┌─────┐       ┌─────┐   │
   │  │Card │         │Card │           │Card │       │Card │   │
   │  └─────┘         └─────┘           └─────┘       └─────┘   │
   │  ┌─────┐         ┌─────┐           ┌─────┐                 │
   │  │Card │         │Card │           │Card │                 │
   │  └─────┘         └─────┘           └─────┘                 │
   │                                                              │
   ├─────────────────────────────────────────────────────────────┤
   │  [Key Takeaways]                                            │
   │  Summary card with main insights for content creation       │
   └─────────────────────────────────────────────────────────────┘
   ```

7. **Generate the canvas JSON** with:
   - Central topic card at top
   - 4 colored groups: Trends (cyan), Data (green), Examples (yellow), Contrarian (red)
   - Source cards within appropriate groups
   - Key takeaways summary card at bottom
   - Edges connecting related findings

8. **Save the canvas** to `clients/[client]/research/[slug].canvas`:
   - Create the research folder if it doesn't exist
   - Use a slug derived from the topic (lowercase, hyphens)
   - Example: `clients/heymitch/research/ai-agents-vs-chatbots.canvas`

9. **Report the findings**:
   - Summarize what was found
   - Highlight the strongest content angles
   - Note any gaps in the research
   - Suggest which findings would make good content

## Output Path

```
clients/[client]/research/[slug].canvas
```

Example: `clients/heymitch/research/ai-agents-vs-chatbots.canvas`

## Layout Specification

```
Topic Card: x=0, y=-300, width=500, height=100

Groups (4 columns):
- Trends:     x=-600, y=-100, width=280, height=500, color="5" (cyan)
- Data:       x=-280, y=-100, width=280, height=500, color="4" (green)
- Examples:   x=40,   y=-100, width=280, height=500, color="3" (yellow)
- Contrarian: x=360,  y=-100, width=280, height=500, color="1" (red)

Source cards: width=240, height=150, stacked vertically within groups

Takeaways card: x=-100, y=450, width=600, height=120
```

## Node Format for Sources

Text cards for sources should follow this format:
```markdown
## [Source Title]

**Key insight:** [1-2 sentence summary of the useful finding]

**Why it matters:** [How this could be used in content]

[Source URL]
```

## Example Output

```json
{
  "nodes": [
    {
      "id": "topic-main",
      "type": "text",
      "x": 0,
      "y": -300,
      "width": 500,
      "height": 100,
      "text": "# Research: AI Agents in 2025\n\nWhat's real vs. hype? Where are the opportunities?"
    },
    {
      "id": "group-trends",
      "type": "group",
      "x": -600,
      "y": -100,
      "width": 280,
      "height": 500,
      "label": "Trends",
      "color": "5"
    },
    {
      "id": "source-1",
      "type": "text",
      "x": -580,
      "y": -50,
      "width": 240,
      "height": 150,
      "text": "## Gartner: Agentic AI Predictions\n\n**Key insight:** 33% of enterprise software will include agentic AI by 2028, up from <1% today.\n\n**Why it matters:** Massive growth curve = content opportunity\n\nhttps://gartner.com/..."
    },
    {
      "id": "takeaways",
      "type": "text",
      "x": -100,
      "y": 450,
      "width": 600,
      "height": 120,
      "text": "# Key Takeaways\n\n1. **Content angle:** Gap between hype and implementation\n2. **Data point:** 33% enterprise adoption by 2028\n3. **Contrarian take:** Most \"agents\" are just chatbots with loops"
    }
  ],
  "edges": []
}
```

## Arguments

- `$ARGUMENTS` - Required: The research topic or question

## Usage

```
/canvas:research AI agents vs chatbots - what's the real difference
/canvas:research content marketing trends 2025
/canvas:research why most AI automation fails
```

## Tips

- Focus on **actionable insights** for content creation
- Look for **data points** that can anchor posts
- Find **contrarian angles** that differentiate from generic takes
- Note **specific examples** and case studies
- The takeaways card should directly inform content strategy
