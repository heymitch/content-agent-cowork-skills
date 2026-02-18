---
description: Search and browse the prompt library
---

# Search Prompt Library

Search the prompts/ folder for frameworks, hooks, styles, and ctas.

## Instructions

Search the `prompts/` directory for files matching the user's query. Search across:
- File titles (frontmatter `title` field)
- Tags (frontmatter `tags` field)
- Type (framework, hook, style, cta)
- Content (the markdown body)
- Platforms (linkedin, twitter, email)

## Process

1. **Parse the search query** from $ARGUMENTS
   - If empty, ask what they're looking for

2. **Search prompts/ folder**
   - Use Grep to search file contents
   - Use Glob to find all prompt files
   - Match against frontmatter fields

3. **Display results** in this format:

```
Found X matching prompts:

1. **[Title]** (prompts/[type]/[filename].md)
   Type: [type] | Platforms: [platforms] | Difficulty: [difficulty]
   [Brief description or example_use from frontmatter]

2. **[Title]** (prompts/[type]/[filename].md)
   ...
```

4. **Provide usage instructions**:

```
To use in generation:
/content:generate-linkedin @prompts/[type]/[filename].md
[your topic or content idea]
```

## Search Tips

- Search by type: "hook", "framework", "style", "cta"
- Search by platform: "linkedin", "twitter", "email"
- Search by purpose: "storytelling", "contrarian", "data"
- Search by difficulty: "beginner", "intermediate", "advanced"

## Examples

```
/prompts:search hook patterns
→ Returns all hook prompts

/prompts:search linkedin storytelling
→ Returns prompts for LinkedIn with storytelling tags

/prompts:search beginner
→ Returns prompts suitable for beginners
```

## Output Format

Always end with:
- The exact file path for @ mention
- A complete example command showing how to use it
