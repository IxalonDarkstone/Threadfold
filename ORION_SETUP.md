# Threadfold Export in Orion (iPhone)

Orion can't install `.user.js` files by itself on iOS. You run them through a userscript manager extension. The common free setup is **Violentmonkey** from Firefox Add-ons.

## 1. Turn on extensions
1. Install **Orion Browser by Kagi** from the App Store and open it.
2. Tap **•••** (bottom right), then **Settings**. Under **Extensions**, turn on **Firefox extensions** (and Chrome if you want).

## 2. Install Violentmonkey
1. In Orion, go to addons.mozilla.org and search for **Violentmonkey**.
2. Tap **Add to Orion** and allow it.
3. Tap **•••**, then **Extensions**. Make sure Violentmonkey is turned on and allowed on spicychat.ai.

## 3. Add the script
- **Easiest:** host `https://github.com/IxalonDarkstone/Threadfold/raw/refs/heads/main/threadfold-export.user.js` at any URL (a GitHub Gist "Raw" link works), then open that URL in Orion. Violentmonkey shows an install page. Tap **Install**.
- **No hosting:** tap **•••**, then **Extensions**, then **Violentmonkey**, then **+ (New script)**. Delete the template, paste the whole file, and save.

## 4. Use it
1. Open a SpicyChat chat. The URL looks like `/chat/<character>/<conversation>`.
2. **Reload once** so the script can pick up your login headers. Then wait for the chat to load.
3. Tap the purple **Export JSON** button (bottom right).
4. When the share sheet opens, pick **Save to Files** or send the file straight to me. If no share sheet appears, the file goes to Orion's downloads.
5. Check that the button reads `Exported N ✓`. For the Tara chat, N should be about 278.

## Troubleshooting
- **401/403 or "No auth token captured":** reload the chat page, wait until messages load, then tap the button again.
- **No button:** check that Violentmonkey is on for this site. Turn off Orion's "Compatibility mode" for spicychat.ai, because it suspends extensions. Restart Orion.
- **Scripts vanished after an Orion update:** a Violentmonkey bug in March 2026 was fixed in a later Orion release. Update Orion and add the script again.
