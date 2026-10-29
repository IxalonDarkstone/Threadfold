// ==UserScript==
// @name         Threadfold Export (SpicyChat full-history JSON)
// @namespace    threadfold
// @version      1.0.0
// @description  Adds an "Export JSON" button on spicychat.ai chats; fetches the full conversation from the API and saves S.AI-Toolkit-style JSON.
// @match        https://spicychat.ai/*
// @match        https://www.spicychat.ai/*
// @run-at       document-start
// @grant        none
// ==/UserScript==
(function () {
  'use strict';
  const API = 'https://prod.nd-api.com';
  const W = window; // @grant none => runs in page context, so patches affect the site's own requests
  const H = (W.__tfHeaders = W.__tfHeaders || {});
  const KEEP = ['authorization','x-guest-userid','x-country','x-app-id','x-app-version','x-platform','x-platform-os'];

  function grab(name, value) {
    const k = String(name).toLowerCase();
    if (KEEP.includes(k) && value) H[k] = value;
  }
  function grabAll(headers) {
    if (!headers) return;
    if (typeof headers.forEach === 'function' && !Array.isArray(headers)) headers.forEach((v, k) => grab(k, v));
    else if (Array.isArray(headers)) headers.forEach(([k, v]) => grab(k, v));
    else Object.keys(headers).forEach(k => grab(k, headers[k]));
  }
  function tokenFrom(text) {
    try { const d = JSON.parse(text); if (d && d.access_token) H.authorization = 'Bearer ' + d.access_token; } catch (e) {}
  }

  // --- Capture auth headers the site itself sends (same approach as S.AI Toolkit) ---
  const xo = XMLHttpRequest.prototype.open, xs = XMLHttpRequest.prototype.send, xh = XMLHttpRequest.prototype.setRequestHeader;
  XMLHttpRequest.prototype.open = function (m, u) { this.__tfUrl = String(u || ''); return xo.apply(this, arguments); };
  XMLHttpRequest.prototype.setRequestHeader = function (k, v) { if ((this.__tfUrl || '').includes('nd-api.com')) grab(k, v); return xh.apply(this, arguments); };
  XMLHttpRequest.prototype.send = function () {
    if ((this.__tfUrl || '').includes('kinde.com/oauth2/token')) this.addEventListener('load', function () { if (this.status === 200) tokenFrom(this.responseText); }, { once: true });
    return xs.apply(this, arguments);
  };
  const of = W.fetch;
  W.fetch = function (input, init) {
    const url = typeof input === 'string' ? input : (input && input.url) || '';
    try {
      if (url.includes('nd-api.com')) { grabAll(init && init.headers); if (input && input.headers) grabAll(input.headers); }
    } catch (e) {}
    const p = of.apply(this, arguments);
    if (url.includes('kinde.com/oauth2/token')) p.then(r => r.clone().text().then(tokenFrom)).catch(() => {});
    return p;
  };

  function tokenFromStorage() {
    for (const k of Object.keys(localStorage)) {
      const v = localStorage.getItem(k) || '';
      try {
        if (v.startsWith('eyJ')) return v;
        if (v[0] === '{') { const o = JSON.parse(v); const t = o.access_token || o.accessToken || o.token; if (t) return t; }
      } catch (e) {}
    }
    return null;
  }
  function buildHeaders() {
    const h = { accept: 'application/json, text/plain, */*', 'x-app-id': 'spicychat' };
    for (const k of Object.keys(H)) h[k] = H[k];
    if (!h.authorization) { const t = tokenFromStorage(); if (t) h.authorization = 'Bearer ' + t; }
    return h;
  }
  function ids() {
    const m = location.pathname.match(/\/(?:[a-z]{2}\/)?chat\/([a-f0-9-]+)(?:\/([a-f0-9-]+))?/i);
    return m ? { characterId: m[1], conversationId: m[2] || null } : null;
  }
  async function getJSON(url) {
    const r = await of.call(W, url, { headers: buildHeaders(), credentials: 'include' });
    if (!r.ok) throw new Error(r.status + ' from ' + url.replace(API, ''));
    return r.json();
  }

  async function exportChat(btn) {
    const id = ids();
    if (!id) return alert('Open a chat first (URL /chat/<character>/<conversation>).');
    btn.textContent = 'Fetching…';
    try {
      const base = id.conversationId ? `${API}/characters/${id.characterId}/messages/${id.conversationId}` : `${API}/characters/${id.characterId}/messages`;
      const data = await getJSON(base);
      let all = (data.messages || []).slice();
      // S.AI Toolkit gets everything in one call. Safety net: if the API ever pages, follow it backwards.
      for (let guard = 0; guard < 200 && all.length && (data.has_more || data.hasMore || data.next_cursor); guard++) {
        const oldest = all.reduce((a, b) => (a.createdAt <= b.createdAt ? a : b));
        const more = await getJSON(`${base}?before=${encodeURIComponent(oldest.id)}`).catch(() => null);
        const got = (more && more.messages || []).filter(m => !all.some(x => x.id === m.id));
        if (!got.length) break;
        all = all.concat(got);
        btn.textContent = `Fetching… ${all.length}`;
        if (!(more.has_more || more.hasMore || more.next_cursor)) break;
      }
      let ch = await getJSON(`${API}/v2/characters/${id.characterId}`).catch(() => null);
      if (!ch || !ch.name) {
        const convs = await getJSON(`${API}/v2/conversations?limit=500`).catch(() => null);
        const hit = Array.isArray(convs) && convs.find(c => c.id === id.conversationId || c.character_id === id.characterId);
        if (hit && hit.character) ch = Object.assign({}, ch, hit.character);
      }
      const convId = data.conversation_id || id.conversationId;
      all.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      const out = {
        exportedAt: new Date().toISOString(),
        exportedBy: 'Threadfold Export',
        character: { id: (ch && ch.id) || id.characterId, name: (ch && ch.name) || null },
        conversationId: convId,
        messageCount: all.length,
        messages: all.map(m => ({
          conversation_id: m.conversation_id || convId, role: m.role, id: m.id,
          content: m.content, createdAt: m.createdAt, is_nsfw: m.is_nsfw
        }))
      };
      const safe = ((ch && ch.name) || 'chat').replace(/[^a-zA-Z0-9-_ ]/g, '').trim() || 'chat';
      await save(JSON.stringify(out, null, 2), `chat-${safe}-${new Date().toISOString().slice(0, 10)}.json`);
      btn.textContent = `Exported ${all.length} ✓`;
    } catch (e) {
      alert('Threadfold export failed: ' + e.message + (H.authorization ? '' : '\n(No auth token captured yet — reload the chat and try again.)'));
      btn.textContent = 'Export JSON';
    }
    setTimeout(() => (btn.textContent = 'Export JSON'), 4000);
  }

  async function save(text, name) {
    const blob = new Blob([text], { type: 'application/json' });
    try {
      const file = new File([blob], name, { type: 'application/json' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: name }); return; }
    } catch (e) { if (e && e.name === 'AbortError') return; }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 10000);
  }

  function addButton() {
    if (!document.body || document.getElementById('tf-export-btn')) return;
    const b = document.createElement('button');
    b.id = 'tf-export-btn'; b.textContent = 'Export JSON';
    b.style.cssText = 'position:fixed;right:12px;bottom:90px;z-index:2147483647;padding:10px 14px;border-radius:20px;border:0;background:#7c3aed;color:#fff;font:600 14px system-ui;box-shadow:0 2px 8px rgba(0,0,0,.4)';
    b.addEventListener('click', () => exportChat(b));
    document.body.appendChild(b);
  }
  setInterval(() => { const btn = document.getElementById('tf-export-btn'); if (ids()) addButton(); else if (btn) btn.remove(); }, 1000);
})();
