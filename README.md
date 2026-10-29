# Threadfold

Export a full SpicyChat.ai conversation to JSON from your iPhone, then fold it into a continuation summary under 10,000 characters so you can carry a long roleplay into a fresh chat session past the 32k context limit.

## What it does
- Adds a floating **Export JSON** button to SpicyChat chat pages.
- Pulls the **entire** conversation from SpicyChat's API using your existing logged-in session, with no scrolling or "Load previous messages" taps.
- Saves a `.json` file in the S.AI Toolkit export format (oldest message first), through the iOS share sheet or as a normal download.
- Works in Orion Browser on iOS through Violentmonkey, and in any desktop browser with a userscript manager.

## Install (iPhone, Orion Browser)
1. Install **Orion Browser** from the App Store.
2. In Orion's settings, turn on support for Firefox extensions.
3. Install **Violentmonkey** from Firefox Add-ons inside Orion.
4. In Violentmonkey, create a new script, paste in the contents of `threadfold-export.user.js`, and save.
5. Open any chat on spicychat.ai and reload the page once.

## Use
1. Open the chat you want to save.
2. Tap **Export JSON**. The button shows the message count when it's done (for example, "Exported 96 ✓").
3. Save or share the file from the share sheet.
4. Give the JSON to your summarizer (a human, an AI assistant, or your own tool) and ask for a continuation summary under 10k characters that leaves out your persona details.
5. Paste the summary as the first message of a new chat with the same bot.

If the first tap fails, reload the chat page and tap again. The script needs to see SpicyChat make one request of its own before it can reuse your login.

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
The export approach (fetching the full history from SpicyChat's API with your session) is modeled on [S.AI Toolkit](https://github.com/OnyxMizuna/SAI-Toolkit) by OnyxMizuna. Threadfold's script was written independently and is not affiliated with SpicyChat or S.AI Toolkit.

## Disclaimer
This is an unofficial tool. SpicyChat can change its site or API at any time, which may break the script. Use it only on your own account and chats.
