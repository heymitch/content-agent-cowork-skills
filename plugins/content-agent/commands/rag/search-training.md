---
description: Search training content database for style references and similar content
---

# Search Training Content

Search local training files for style references, examples, and proof points.

## What Gets Searched

| Location | Content |
|----------|---------|
| `training/examples/linkedin/` | LinkedIn post examples |
| `training/examples/twitter/` | Twitter/X examples |
| `training/proof-points/` | Case studies, wins, testimonials |
| `training/voice/` | Voice profile and brand docs |

## How to Search

Use grep and glob to find relevant content:

```bash
# Search all training content for a topic
grep -r "AI automation" training/ --include="*.md"

# Search just LinkedIn examples
grep -r "hook" training/examples/linkedin/ --include="*.md"

# Search proof points
grep -r "case study" training/proof-points/ --include="*.md"

# List all training files
find training/ -name "*.md" -type f
```

## Search Parameters

**Required:**
- `query` - Topic, keyword, or pattern to search for

**Optional:**
- `platform` - Filter to: linkedin, twitter, email
- `type` - Filter to: examples, proof-points, voice

## Process

1. **Receive Query** from user
2. **Search locally** using grep across training folders
3. **Read matching files** to get full content
4. **Present results** with file paths and previews

## Example Searches

```
/rag:search-training AI automation
→ Searches all training content for "AI automation"

/rag:search-training hooks --platform linkedin
→ Searches LinkedIn examples for hook patterns

/rag:search-training case study revenue
→ Searches proof-points for revenue case studies
```

## Output Format

```markdown
# Training Search Results

**Query:** "[search term]"
**Files Found:** [X]

---

### Result 1: `training/examples/linkedin/ai-automation-post.md`

**Preview:**
[First 300 characters...]

---

### Result 2: `training/proof-points/client-wins.md`

**Preview:**
[First 300 characters...]

---

## How to Use

Reference these in generation:
"Use the hook style from result 1"
"Include the case study from result 2"
```

## No Results?

If no matches found:
- Try broader keywords
- Check if training folder has content
- Add examples with `/rag:add-training`
