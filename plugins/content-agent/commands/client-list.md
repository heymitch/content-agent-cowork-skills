---
description: List all available clients
---

# List Clients

Show all configured client workspaces.

## Usage

```
/client:list
```

## Process

1. **Scan Client Folders**
   - List all folders in `clients/` (excluding `_template`)
   - Read `.claude/state/active-client.txt` for current active client

2. **Display Each Client**
   - Read first few lines of each `config.md` for summary
   - Show content count if available
   - Mark active client

3. **Output Format**

```markdown
# Available Clients

| Client | Status | Last Content | Summary |
|--------|--------|--------------|---------|
| heymitch | **ACTIVE** | Dec 3 | Systems-first strategist |
| alex | - | Dec 1 | B2B SaaS founder |
| jordan | - | Nov 28 | Executive coach |

## Quick Actions

- Switch: `/client:switch [name]`
- New client: `/client:new`
- View config: Open `clients/[name]/config.md`
```

Now scan the `clients/` folder and display available clients.
