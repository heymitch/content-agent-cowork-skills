# Generate Weekly Strategy Canvas

Create a visual weekly content planning canvas in Obsidian.

## Instructions

1. **Read the canvas primer** at `.claude/prompts/tools/obsidian-canvas.md` to understand the `.canvas` JSON format.

2. **Get the active client** by reading `.claude/state/active-client.txt` (default: `heymitch`).

3. **Scan for this week's content** in `clients/[client]/content/` folder:
   - Look for content dated within the current or upcoming week
   - Note the platform, title, and file path of each piece
   - If no content exists yet, create placeholder text cards for planning

4. **Determine the week range**:
   - Use the current date to calculate Monday-Friday of this week (or next week if requested)
   - Format dates for group labels (e.g., "Mon 12/2", "Tue 12/3")

5. **Generate the canvas JSON** with:
   - A theme card at the top (ask user for theme or infer from content)
   - 5 colored groups for Monday-Friday
   - File embeds for existing content, positioned in their publish day's group
   - Text cards for planned but not-yet-created content
   - Edges connecting related content (e.g., LinkedIn → Twitter thread repurpose)

6. **Save the canvas** to `clients/[client]/content/MM-YYYY-month/week-[YYYY-MM-DD].canvas` (using Monday's date):
   - Create the month folder if it doesn't exist
   - Canvas lives alongside the content it references

7. **Report what was created**:
   - List content pieces added
   - Note any days without content
   - Suggest content gaps to fill

## Layout Specification

```
Theme Card: x=-200, y=-200, width=400, height=80

Groups (Monday to Friday):
- Monday:   x=-700, y=0, width=280, height=400, color="1" (red)
- Tuesday:  x=-400, y=0, width=280, height=400, color="2" (orange)
- Wednesday: x=-100, y=0, width=280, height=400, color="3" (yellow)
- Thursday:  x=200, y=0, width=280, height=400, color="4" (green)
- Friday:    x=500, y=0, width=280, height=400, color="5" (cyan)

Content nodes: Centered within their day's group, width=240, height=280
```

## Output Path

```
clients/[client]/content/MM-YYYY-month/week-[YYYY-MM-DD].canvas
```

Example: `clients/heymitch/content/12-2025-december/week-2025-12-02.canvas`

## Example Output

```json
{
  "nodes": [
    {
      "id": "theme-abc123",
      "type": "text",
      "x": -200,
      "y": -200,
      "width": 400,
      "height": 80,
      "text": "# Week of Dec 2: AI Agents\n\nFocus: Practical implementation over hype"
    },
    {
      "id": "group-mon",
      "type": "group",
      "x": -700,
      "y": 0,
      "width": 280,
      "height": 400,
      "label": "Mon 12/2",
      "color": "1"
    },
    {
      "id": "file-linkedin-mon",
      "type": "file",
      "file": "clients/heymitch/content/12-2025-december/02-mon/ai-automation-linkedin.md",
      "x": -680,
      "y": 50,
      "width": 240,
      "height": 280
    }
  ],
  "edges": []
}
```

## Arguments

- `$ARGUMENTS` - Optional: Week theme or "next week" to generate for upcoming week

## Usage

```
/canvas:generate-weekly AI Agents theme
/canvas:generate-weekly next week
/canvas:generate-weekly
```
