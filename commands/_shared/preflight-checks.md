## Preflight Check (Run Silently)

### 1. Config Check
Read `config.md` from project root.
- If missing: Stop. Say "I need your business context first. Say 'Run my business blueprint' — takes 5 minutes."
- If exists but all fields are blank: Stop. Say "Your config exists but isn't filled in. Say 'Run my business blueprint' to set it up."
- If exists with data: Continue.

### 2. Voice Training Check
Check config.md for `- [x] Voice Training completed`.
- If unchecked: Warn once. Say "I can write, but it won't sound like you yet. Say 'Train on my voice' first — or say 'skip' to continue without it."
- If checked: Load the Voice Profile section from config.md silently.

### 3. Notion Check (Silent)
Check for Notion MCP tools in your available tools.
- If found: Will save to Notion after local save. Update config.md `- [x] Notion connected` if unchecked.
- If not found: Save locally to `content/` directory. Don't mention Notion.

### 4. All clear — proceed without announcing.
