---
description: Add a new prompt to the library (framework, hook, style, or CTA)
---

# Add New Prompt

Create a new prompt file in the prompts library. This command guides you through creating properly formatted prompt files that work with @ mentions and Obsidian.

## Process

### Step 1: Gather Information

Ask the user for:
1. **Prompt type**: framework, hook, style, or cta
2. **Title**: Name for this prompt
3. **Description**: What it does / when to use it
4. **Content**: The actual prompt template/pattern

### Step 2: Generate Frontmatter

Based on the type, create appropriate YAML frontmatter:

```yaml
---
title: "[User provided title]"
type: [framework|hook|style|cta]
platforms: [linkedin, twitter, email]
difficulty: [beginner|intermediate|advanced]
tags: [relevant, keywords, here]
author: [Dickie|Cole|Ship 30 for 30|Custom]
example_use: "[Short example]"
---
```

### Step 3: Create File Structure

Based on type, organize the content:

**For Frameworks:**
- When to Use
- Structure (with sections)
- Example
- Quality Criteria
- Forbidden Patterns
- Pro Tips

**For Hooks:**
- Format
- When to Use
- Examples (4-6)
- What Makes It Work
- Variations
- Common Mistakes
- Platform Notes
- Pro Tips

**For Styles:**
- Characteristics
- When to Use
- Tone Guidelines (Do/Don't table)
- Sentence Structure
- Example Transformation
- Platform Adjustments
- Common Mistakes

**For CTAs:**
- Format
- When to Use
- Examples
- Types/Variations
- What Makes It Work
- Platform Adjustments
- Common Mistakes

### Step 4: Save File

Ask the user where to save:
- **Custom folder** (default, recommended): `prompts/custom/[slug].md` - protected from git updates
- **Standard folder**: `prompts/[type]/[slug].md` - will be tracked by git

For custom prompts, always default to the custom folder unless user specifies otherwise.

Directory options:
- Custom (any type): `prompts/custom/[slug].md`
- Frameworks: `prompts/frameworks/[slug].md`
- Hooks: `prompts/hooks/[slug].md`
- Styles: `prompts/styles/[slug].md`
- CTAs: `prompts/ctas/[slug].md`

Use kebab-case for filename (e.g., "Bold Outcome Hook" → "bold-outcome.md")

### Step 5: Confirm

Tell the user:
- File path for @ mention usage
- How to use it in generation commands

## Example Interaction

```
User: /prompts:add

Claude: What type of prompt are you adding?
1. Framework (complete content structure)
2. Hook (opening line pattern)
3. Style (voice/tone template)
4. CTA (call-to-action pattern)

User: Hook

Claude: What's the name of this hook pattern?

User: The "I Hate When" hook

Claude: Describe the pattern - what makes it work and when to use it?

User: Opens with something annoying that the audience relates to, then pivots to a solution. Creates instant agreement.

Claude: Give me 3-5 examples of this hook in action:

User:
- "I hate when gurus say 'just be consistent.' That's not advice, it's a platitude."
- "I hate when people ask 'what do you do?' I never know how to answer."
- "I hate when LinkedIn posts start with 'I'm humbled to announce...'"

Claude: [Creates full prompt file with frontmatter, structure, and examples]

Created: prompts/hooks/i-hate-when.md

To use in generation:
/content:generate-linkedin @prompts/hooks/i-hate-when.md
[your topic]
```

## Output

After creating the file, show:
1. Confirmation message with file path
2. Usage example for @ mention
3. Brief note that it's now visible in Obsidian Prompt Library
