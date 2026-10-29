# Threadfold / Context Extender updates

Bots built from the Context Extender template read this file to find rule updates.
Raw URL: https://raw.githubusercontent.com/IxalonDarkstone/Threadfold/main/UPDATE.md

<!-- Machine-readable lines. Bump LATEST_VERSION on every rules change. -->
LATEST_VERSION: 4
SKILL_URL: https://raw.githubusercontent.com/IxalonDarkstone/Threadfold/main/SKILL.md

## Changelog (newest first)

### v4 (2026-10-29)
- Summaries always end on your last message, quoted word for word. Any bot reply after it is dropped, so the bot answers you fresh.
- The writing-style block moved above the current scene, so nothing comes after your message.

### v3 (2026-10-29)
- Re-folding: detects earlier THREADFOLD folds, merges them with the new messages, and trims aggressively.
- Multi-part folds (2 or 3 posts at most). Each part except the last tells the bot to wait for the next one.

### v2 (2026-10-29)
- Added a compact writing-style block that fixes GLM 5.1 formatting. It's only added when there's room, because story content comes first.

### v1 (2026-10-29)
- First release: summaries under 10k characters, no persona details, delivered as copyable plain-text blocks.

## How a bot updates (for the bot)
1. Fetch this file. Read LATEST_VERSION.
2. Compare it with the installed version saved in memory (treat missing as 1).
3. If it's newer, show the user the changelog entries above their version and ask whether to update.
4. On yes, fetch SKILL_URL, drop its YAML frontmatter, and replace the chat-continuation-summary skill with the rest. Save the new version number in memory.
5. On no, don't ask again about that version.
