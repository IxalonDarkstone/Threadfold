---
name: chat-continuation-summary
description: Use when given a long roleplay chat export (JSON or pasted text) and asked to compact it into a paste-ready continuation summary under 10,000 characters so the story can continue in a fresh chat session past the context limit.
---

# Chat Continuation Summary

Want a ready-made assistant that does this for you? Use the Context Extender bot template: https://x.ai/bot/ewIHxPc0OFG2kV5heZMT4

## How to use this file with any AI
1. Save this file as `SKILL.md`.
2. Give it to your AI in one of these ways:
   - **Chat apps (ChatGPT, Claude, Grok, Gemini):** upload this file or paste its contents, then say: "Follow the instructions in SKILL.md." In apps with projects or custom instructions, add it there so it applies to every chat.
   - **Agents that support skills (Claude Code, Cursor, and similar):** put it in that tool's skills folder, for example `.claude/skills/chat-continuation-summary/SKILL.md`. The tool loads it when a request matches the description above.
3. Attach your chat export (for example an S.AI Toolkit or Threadfold Export `.json`) or paste the chat, and ask for a continuation summary.
4. Paste the result as the first message of a new chat with the same bot.

## Goal
Write a paste-ready brief under 10,000 characters that lets the bot continue the story seamlessly from the last message.

## Steps
1. Read the whole export in order. In JSON exports, messages are in `messages[]` with `role` set to `bot` or `user`. Note the character's name and the message count.
2. Leave out the user's persona details, since the bot already has them. Keep only facts about the user's character that the story itself established.
3. Write these sections:
   - A header line telling the bot to continue from the exact point below and never to speak or act for the user's character.
   - **Premise:** setting, situation and stakes.
   - **Characters:** the bot character(s) and NPCs as they've developed, including looks, personality, tells, relationships and running gags.
   - **Key events, in order:** promises, secrets, reveals, rules and established lore.
   - **Current scene:** time, place, who's present, clothing and physical state, and mood.
   - **Last exchange:** the final one or two messages, paraphrased closely, and whose turn is next.
   - **Open threads:** unresolved plot points and upcoming plans.
   - **Tone and style:** point of view, formatting (such as italic actions and quoted dialogue), the balance of humor and sincerity, content level, reply length, and ending replies on a hook.
4. Never invent details. If the chat leaves something unresolved, mark it as unclear and tell the user so they can settle it.
5. Check the length. It must be under 10,000 characters, so trim older detail before you cut anything about the current scene.
6. Deliver it as one copyable plain-text block with no Markdown headers inside, so it pastes cleanly into any chat app.
