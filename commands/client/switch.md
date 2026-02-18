---
description: Switch active client for content generation
---

# Switch Client

Switch the active client context for all content generation.

## Usage

```
/client:switch [client-name]
```

Or just `/client:switch` to auto-switch or see options.

## Process

1. **Check Available Clients**
   - List all folders in `clients/` that have a `config.md`
   - Get current `CLIENT_ID` from `.env`

2. **Smart Switching**
   - **If client-name provided**: Switch to that client (validate it exists)
   - **If 2 clients total**: Auto-switch to the other one
   - **If 3+ clients**: List available clients and ask which to switch to

3. **Switch Context**
   - Update `CLIENT_ID` in `.env` file:
     ```bash
     sed -i '' 's/^CLIENT_ID=.*/CLIENT_ID=[client-name]/' .env
     ```
   - Read and display summary of client config

4. **Confirm Switch**

```markdown
# Switched to: [client-name]

## Brand Summary
**Voice**: [brief description from config]
**Mission**: [one-liner]
**Platforms**: [active platforms]

Content will now save to: `clients/[client-name]/content/`

Ready to generate content for [client-name].
```

## Examples

**With 2 clients (auto-switch):**
```
User: /client:switch
Assistant: # Switched to: dickie-bush

(Auto-switched from heymitch - only 2 clients configured)

## Brand Summary
**Voice**: Conversational, numbered lists, bold claims
**Mission**: Help people start writing online
...
```

**With 3+ clients (ask):**
```
User: /client:switch
Assistant: Which client do you want to switch to?

Current: heymitch

Available:
- dickie-bush
- nicolas-cole
- client-three

Reply with the client name.
```

**Direct switch:**
```
User: /client:switch dickie-bush
Assistant: # Switched to: dickie-bush
...
```
