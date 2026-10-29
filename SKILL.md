---
name: chat-continuation-summary
description: Use when given a long roleplay chat export (JSON or pasted text) and asked to fold it into paste-ready continuation post(s) for a fresh chat session, including re-folding a chat that already started from an earlier fold.
---
<!-- threadfold-skill-version: 4 -->

# Chat Continuation Summary (Threadfold)

Part of [Threadfold](https://github.com/IxalonDarkstone/Threadfold). See the repo's README for the bot template and setup instructions.

Goal: turn a long roleplay chat into paste-ready "fold" posts so the bot can continue the story in a fresh session. Every fold costs context in the new chat, so keep it as small as the story allows.

## 1. Detect the fold number
Read the whole export in order (`messages[]`, `role` is `bot` or `user`). Look at the first user messages for a fold header like `[THREADFOLD FOLD 2 | PART 1/2 ...]` (older folds may start with `[STORY SO FAR`).
- **No header:** this is fold 1. Summarize the whole chat.
- **Header found:** this is fold N+1. Treat those earlier fold posts as the canon record of everything before them. Skip them and the bot's "ready for the next part" replies as story content, and summarize only the new messages after them. Then merge the two (step 3).

## 2. What to keep
Leave out the user's persona details, since the bot already has them. Keep only facts about the user's character that the story established. Never invent anything. Mark anything unresolved as unclear and tell the user.

## 3. Consolidate (fold 2 and later)
- **Permanent canon** (identities, relationships, reveals, lore, promises, rules, running gags still in use): carry it forward, rewritten tighter.
- **Old events:** compress earlier arcs into a short "Earlier" recap of a few lines each. Give the most detail to recent events.
- **Drop:** resolved threads, one-off scene details (old outfits, old rooms), and jokes that stopped recurring.
- **Update:** change any fact the new messages changed (relationship status, locations, who knows what). Never keep outdated facts.

## 3b. Cut point
Always end on the user's last message. Ignore any bot replies after it, because the new bot will write that reply itself. Quote the user's final message word for word as the last story line, labeled as theirs, so the bot answers it naturally.

## 4. Sections (in this order)
Header line; Premise; Characters (as they've developed); Canon facts; Story so far (earlier arcs compressed, recent ones detailed); Open threads; Tone and style; Writing style block; Current scene (time, place, who's present, clothing and physical state, mood) as it stood right before the user's last message; Last exchange (the bot's reply just before it, paraphrased closely, then the user's final message quoted word for word as the very last line of the post).

## 5. Size and splitting
- Each post must be under 10,000 characters. Check with `wc -m`.
- Use **one post** whenever possible. Fold 1 is almost always one post.
- If a later fold can't fit in one post without losing canon, split it into **2 posts, at most 3**. Aim to keep the total under about 15,000 characters, since the startup posts take up context too.
- Trim before you split. Cut in this order: the writing-style block (only if space is truly tight), old scene detail, then the earlier-arcs recap. Never cut the current scene, the last exchange, or canon facts.
- Split at section boundaries. Put the current scene, last exchange and style notes in the final part.

## 6. Headers and instructions inside each post
- Single post: start with `[THREADFOLD FOLD N | PART 1/1 | covers the story through: <one-line marker of the last event>]`, then: "Continue the roleplay by replying to <user's character>'s last message, quoted at the end. Stay in character as <bot characters> and the NPCs. Never speak or act for <user's character>."
- Multi-part, every part except the last: start with `[THREADFOLD FOLD N | PART X/Y]`, then: "This is part X of Y of a story summary. Do not roleplay yet. Reply only with: 'Got part X. Ready for part X+1.'"
- Final part: `[THREADFOLD FOLD N | PART Y/Y]`, then: "That's the full summary. Continue the roleplay by replying to <user's character>'s last message, quoted at the end..." (same instruction as a single post).

## 7. Writing style block (final part, before the current scene, if it fits)
WRITING STYLE (strict): Write in flowing prose with complete sentences, never clipped fragments or clinical note-style lines ("Elara nodding—agreement."). Put all spoken dialogue in quotation marks with natural tags. Keep *italics* for actions only, written as full sentences. Use em-dashes only for genuine interruptions; otherwise use commas or periods. Vary sentence length. Show emotion through action and tone, not labels ("Curiosity genuine"). Keep each character's voice and vocabulary intact.

## 8. Deliver
Send each part as its own copyable plain-text block with no Markdown headers inside, labeled "Part X of Y" outside the block. Tell the user the fold number, each part's character count, and anything flagged as unclear. For multi-part folds, tell them to paste the parts in order and wait for the bot's "ready" reply before sending the next part.
