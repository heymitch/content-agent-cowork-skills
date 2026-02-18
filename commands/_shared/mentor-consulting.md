# Mentor Consulting (REQUIRED)

Before generating content, consult training data for structural patterns using native tools.

## Protocol

### 1. Check if training exists
```
Glob: training/examples/{{platform}}/**/*.md
```

If empty, skip to generation. If files exist, continue.

### 2. Search by focus area

| Focus | Search |
|-------|--------|
| hooks | `Grep: tags:.*hook` in training/examples/{{platform}}/ |
| structure | `Grep: tags:.*structure` in training/examples/{{platform}}/ |
| cta | `Grep: tags:.*cta` in training/examples/{{platform}}/ |
| formatting | `Grep: tags:.*formatting` in training/examples/{{platform}}/ |
| all | Read top 5 files by modification date |

### 3. Read top 3-5 matches

For each matching file, extract:
- **Hook**: First non-header line
- **Structure**: Headers and content flow
- **CTA**: Last 3 lines

### 4. Apply patterns (not content)

Use the **structure** from examples to shape new content:
- Pick a hook pattern from Example 1
- Apply the flow from Example 2
- Match the CTA style from Example 3

Never copy content. Only copy bones.

## Focus Options

- `hooks` - Opening lines that stop the scroll
- `structure` - Post organization and flow
- `formatting` - Visual layout, spacing, lists
- `cta` - Call-to-action and ending patterns
- `all` - Everything (default)

## Skip Conditions

- User explicitly says "skip mentors"
- Regenerating with minor edits only
- Quality fix mode (patterns already established)
- Training folder is empty (no examples yet)

## Fallback

If no platform-specific examples exist:
```
Glob: training/examples/**/*.md
```

Search all platforms for general patterns.
