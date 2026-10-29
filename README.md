![Threadfold: Fold the thread. Keep the story.](threadfold-banner.jpg)

# Threadfold

Export a full SpicyChat.ai conversation to JSON from your iPhone, then fold it into a continuation summary under 10,000 characters so you can carry a long roleplay into a fresh chat session past the 32k context limit.

## What's in this repo
- [`threadfold-export.user.js`](threadfold-export.user.js): a userscript that exports a full SpicyChat conversation to JSON.
- [`SKILL.md`](SKILL.md): instructions any AI can follow to turn that export into a paste-ready continuation summary.

## 1. Export a chat (userscript)
- Adds a floating **Export JSON** button to SpicyChat chat pages.
- Pulls the **entire** conversation from SpicyChat's API using your existing logged-in session, with no scrolling or "Load previous messages" taps.
- Saves a `.json` file in the S.AI Toolkit export format (oldest message first), through the iOS share sheet or as a normal download.

### Install (iPhone, Orion Browser)
1. Install **Orion Browser** from the App Store.
2. In Orion's settings, turn on support for Firefox extensions.
3. Install **Violentmonkey** from Firefox Add-ons inside Orion.
4. In Violentmonkey, create a new script, paste in the contents of [`threadfold-export.user.js`](threadfold-export.user.js), and save. On desktop, you can open the file's raw link with Violentmonkey or Tampermonkey installed to install it directly.
5. Open any chat on spicychat.ai and reload the page once.

### Use
1. Open the chat you want to save.
2. Tap **Export JSON**. The button shows the message count when it's done (for example, "Exported 96 ✓").
3. Save or share the file from the share sheet.

If the first tap fails, reload the chat page and tap again. The script needs to see SpicyChat make one request of its own before it can reuse your login. If that fails, just copy from share and drop it in your bot/AI.

## 2. Summarize it

### Option A: Context Extender bot (easiest)
Use the ready-made Grok Bot [Context Extender bot template](https://x.ai/bot/ewIHxPc0OFG2kV5heZMT4). Send it your exported `.json` and it replies with a copyable summary under 10k characters.

### Option B: Any AI, using SKILL.md
1. Download [`SKILL.md`](SKILL.md).
2. Give it to your AI:
   - **Chat apps (ChatGPT, Claude, Grok, Gemini):** upload the file or paste its contents, then say "Follow the instructions in SKILL.md." In apps with projects or custom instructions, add it there so it applies to every chat.
   - **Agents that support skills (Claude Code, Cursor, and similar):** put it in that tool's skills folder, for example `.claude/skills/chat-continuation-summary/SKILL.md`. The tool loads it automatically when your request matches.
3. Attach your exported `.json` (or paste the chat) and ask for a continuation summary.

## 3. Continue the story
Paste the summary as the first message of a new chat with the same bot. Your persona details are left out on purpose, because the bot already has them.

## Output format
```json
{
  "exportedAt": "2026-10-29T19:54:26.662Z",
  "exportedBy": "Threadfold Export",
  "character": { "id": "...", "name": "..." },
  "conversationId": "...",
  "messageCount": 96,
  "messages": [
    { "conversation_id": "...", "role": "bot", "id": "...",
      "content": "...", "createdAt": 1793043848698, "is_nsfw": false }
  ]
}
```

## Privacy
Everything runs in your own browser. Your SpicyChat session is only used to call SpicyChat's own API. Nothing is sent anywhere else, and the file goes only where you choose to share it.

## Credits
The export approach is modeled on [S.AI Toolkit](https://github.com/OnyxMizuna/SAI-Toolkit) by OnyxMizuna. Threadfold's script was written independently and is not affiliated with SpicyChat or S.AI Toolkit.

## Disclaimer
This is an unofficial tool. SpicyChat can change its site or API at any time, which may break the script. Use it only on your own account and chats.
