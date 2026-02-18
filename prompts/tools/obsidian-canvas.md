# Obsidian Canvas Primer

When the user asks you to create, modify, or interact with an Obsidian Canvas file (`.canvas`), use this reference.

## Canvas File Format

Canvas files are JSON with this structure:

```json
{
  "nodes": [...],
  "edges": [...]
}
```

## Node Types

### Text Card
```json
{
  "id": "unique-id-1",
  "type": "text",
  "x": 0,
  "y": 0,
  "width": 250,
  "height": 100,
  "text": "Your text content here\n\nSupports **markdown**"
}
```

### File Embed (Link to existing note)
```json
{
  "id": "unique-id-2",
  "type": "file",
  "file": "content/12-2025-december/02-mon/ai-automation-linkedin.md",
  "x": 300,
  "y": 0,
  "width": 400,
  "height": 300
}
```

### Web Link
```json
{
  "id": "unique-id-3",
  "type": "link",
  "url": "https://example.com",
  "x": 0,
  "y": 200,
  "width": 400,
  "height": 300
}
```

### Group (colored background container)
```json
{
  "id": "group-1",
  "type": "group",
  "x": -50,
  "y": -50,
  "width": 500,
  "height": 400,
  "label": "Monday",
  "color": "1"
}
```

**Group colors:** `"1"` (red), `"2"` (orange), `"3"` (yellow), `"4"` (green), `"5"` (cyan), `"6"` (purple)

## Edges (Arrows/Connections)

```json
{
  "id": "edge-1",
  "fromNode": "unique-id-1",
  "fromSide": "right",
  "toNode": "unique-id-2",
  "toSide": "left",
  "color": "1",
  "label": "repurposed as"
}
```

**Sides:** `"top"`, `"right"`, `"bottom"`, `"left"`

**Edge colors:** Same as group colors, or omit for default gray

## ID Generation

Generate unique IDs using a pattern like:
- `text-{random-hex}` for text cards
- `file-{random-hex}` for file embeds
- `group-{random-hex}` for groups
- `edge-{random-hex}` for edges

Example: `"text-a1b2c3d4"`, `"file-e5f6g7h8"`

## Coordinate System

- Origin (0,0) is center of canvas
- X increases to the right
- Y increases downward

### Sizing Guidelines (IMPORTANT)

**Card Widths:**
- Small text cards: 300-350px
- Standard cards: 400-480px
- Wide content (diagrams, code): 650-800px
- File embeds: 260-400px

**Card Heights - Size for content, not arbitrary values:**
- Short (1-3 lines): 80-100px
- Medium (4-8 lines): 140-200px
- Long (lists, details): 250-400px
- Very long (full explanations): 400-500px

**Calculate height:** ~25px per line of text + 40px padding

**Spacing Between Nodes:**
- Vertical gaps: 80-180px (NOT 50px - too cramped)
- Horizontal gaps: 100-150px between columns
- Inside groups: 20px padding on all sides

### Group Sizing

Groups must fully contain their nodes with padding:
```
Group x = leftmost node x - 20
Group y = topmost node y - 50 (room for label)
Group width = rightmost node edge - leftmost node x + 40
Group height = bottom node edge - topmost node y + 70
```

## Complete Example: Weekly Strategy Canvas

```json
{
  "nodes": [
    {
      "id": "group-monday",
      "type": "group",
      "x": -600,
      "y": 0,
      "width": 300,
      "height": 400,
      "label": "Monday",
      "color": "1"
    },
    {
      "id": "group-tuesday",
      "type": "group",
      "x": -250,
      "y": 0,
      "width": 300,
      "height": 400,
      "label": "Tuesday",
      "color": "2"
    },
    {
      "id": "theme-card",
      "type": "text",
      "x": -200,
      "y": -150,
      "width": 400,
      "height": 80,
      "text": "# Week Theme: AI Agents\n\nFocus on practical implementation over hype"
    },
    {
      "id": "file-linkedin-mon",
      "type": "file",
      "file": "clients/heymitch/content/12-2025-december/02-mon/ai-automation-linkedin.md",
      "x": -580,
      "y": 50,
      "width": 260,
      "height": 300
    },
    {
      "id": "file-twitter-tue",
      "type": "file",
      "file": "clients/heymitch/content/12-2025-december/03-wed/ai-agents-twitter-thread.md",
      "x": -230,
      "y": 50,
      "width": 260,
      "height": 300
    }
  ],
  "edges": [
    {
      "id": "edge-repurpose-1",
      "fromNode": "file-linkedin-mon",
      "fromSide": "right",
      "toNode": "file-twitter-tue",
      "toSide": "left",
      "label": "thread version"
    }
  ]
}
```

## Common Canvas Tasks

### Creating a new canvas
1. Create a `.canvas` file with the JSON structure
2. Add nodes for the content pieces
3. Add groups to organize visually
4. Add edges to show relationships

### Adding content to existing canvas
1. Read the existing `.canvas` file
2. Parse the JSON
3. Add new nodes with unique IDs
4. Update edges if needed
5. Write back the modified JSON

### Reorganizing a canvas
1. Read the canvas file
2. Adjust x/y coordinates to move nodes
3. Adjust group positions/sizes to contain nodes
4. Write back the changes

## Layout Patterns

### Weekly Calendar (5 columns)
```
Groups at x positions: 0, 400, 800, 1200, 1600
Each group width: 350
Gap between groups: 50
File embeds inside: 300px wide, height based on content
```

### Pipeline/Architecture Flow (vertical with side context)
```
Main flow (left column):     Context (right column):
x: 0                         x: 520
y: 0    → Step 1             y: 0    → Related info
y: 180  → Step 2             y: 200  → More context
y: 400  → Step 3             y: 450  → Details
y: 650  → Step 4
...continues down

Edges: top→bottom for main flow, right→left for context connections
```

### Two-Column Documentation
```
Left column (main content): x: 0, width: 400
Right column (details):     x: 520, width: 480
Vertical spacing: 180-220px between rows

Good for: architecture docs, comparisons, main+sidebar layouts
```

### Prompt Stack (vertical hierarchy)
```
Layer 1 at y: 0      (height: 150)
Layer 2 at y: 230    (height: 200)
Layer 3 at y: 510    (height: 180)
Layer 4 at y: 770    (height: 250)

Gap = previous y + previous height + 80
Edges connect top→bottom
```

## When Generating Canvases

1. **Ask about purpose** - What is this canvas for? (weekly planning, campaign, documentation)
2. **Identify content** - What files should be embedded? Check `clients/[client]/content/` for existing posts
3. **Choose layout** - Calendar grid, flow diagram, or freeform cluster
4. **Generate JSON** - Create the complete canvas file
5. **Save the file** - Write to the specified `.canvas` path

## Tips

- File embeds show live content - use for content you want to see updated
- Text cards are for notes, labels, and planning text
- Groups help visually organize but don't affect functionality
- Edges with labels explain relationships
- Keep canvases focused - one canvas per purpose

## Common Mistakes to Avoid

### 1. Cards Too Small
❌ `"height": 100` for 10 lines of text → content gets cut off
✅ Calculate: 10 lines × 25px + 40px padding = 290px height

### 2. Insufficient Spacing
❌ 50px gaps between cards → cramped, overlapping labels
✅ 80-180px vertical gaps, 100-150px horizontal gaps

### 3. Groups Too Tight
❌ Group exactly fits nodes → labels overlap, no breathing room
✅ Add 20px padding on sides, 50px on top (for label), 20px on bottom

### 4. Uniform Sizing
❌ All cards same size regardless of content
✅ Size each card based on its actual content length

### 5. Edge Label Collisions
❌ Multiple edges with labels crossing same area
✅ Use different `fromSide`/`toSide` combinations, keep labels short

## Best Practices

1. **Start with content** - Write all the text first, then calculate sizes
2. **Use numbered steps** - For flows, add "1.", "2.", etc. to card titles
3. **Color coding** - Use consistent colors (e.g., green=input, purple=processing, cyan=output)
4. **Two-column layouts** - Main flow left, context/details right
5. **Test in Obsidian** - Generate, open, adjust coordinates if needed
6. **Wide cards for code/diagrams** - 650-800px width for technical content

## Quick Reference: Y Position Calculator

For vertical flow, calculate next card's y position:
```
next_y = current_y + current_height + gap

Example:
Card 1: y=0, height=160, gap=80 → Card 2 y = 0+160+80 = 240
Card 2: y=240, height=200, gap=100 → Card 3 y = 240+200+100 = 540
```
