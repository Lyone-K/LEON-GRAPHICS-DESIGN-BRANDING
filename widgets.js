// ============================================================
//  LEON Graphics — widgets.js
//  Drop this script into any page BEFORE </body>
//  Injects: 1) WhatsApp floating button
//           2) LEON AI Assistant chat widget (Claude-powered)
// ============================================================

(function () {
  'use strict';

  // ── CONFIG ──────────────────────────────────────────────────
  const CONFIG = {
    whatsapp: {
      phone: '254719628766',        // ← your number, no + or spaces
      message: 'Hi LEON! I visited your website and I\'d love to discuss a project with you.',
      tooltip: 'Chat on WhatsApp'
    },
    ai: {
      name: 'LEON AI',
      subtitle: 'Creative Design Assistant',
      greeting: "Hello! I'm LEON's AI assistant. I can answer questions about our design services, pricing, timelines, and more. How can I help you today?",
      systemPrompt: `You are LEON AI, the official assistant for LEON Graphics Design & Branding — a premium creative studio based in Nairobi, Kenya. You help potential clients learn about LEON's services, pricing, process, and portfolio.

LEON's Services:
- Graphic Design (logos, brand identity, illustrations, social media graphics) — from KES 5,000
- Web Design & Development (responsive websites, UI/UX, e-commerce, CMS) — from KES 25,000  
- Brand Strategy (positioning, style guides, naming, full brand systems) — from KES 15,000
- Print & Packaging (business cards, brochures, banners, packaging) — from KES 3,000

Contact: +254 719 628 766 | leonkuyia@gmail.com | Nairobi, Kenya
Working hours: Monday–Friday, 8:00 AM – 6:00 PM EAT

Keep answers concise, friendly, and professional. Reflect LEON's brand voice: creative, confident, and sophisticated. If asked something you don't know, encourage them to contact LEON directly. Never make up specific project details or client names.`
    }
  };

  // ── INJECT FONTS & STYLES ───────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    /* ── Floating Buttons Shell ── */
    .leon-widgets {
      position: fixed;
      bottom: 32px;
      right: 32px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 14px;
      z-index: 99000;
      font-family: 'DM Sans', 'Segoe UI', sans-serif;
    }

    /* ── WhatsApp Button ── */
    .leon-wa-btn {
      width: 56px; height: 56px;
      background: #25D366;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(37,211,102,0.4);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      text-decoration: none;
      position: relative;
    }
    .leon-wa-btn:hover {
      transform: scale(1.12) translateY(-3px);
      box-shadow: 0 8px 32px rgba(37,211,102,0.55);
    }
    .leon-wa-btn svg { width: 28px; height: 28px; fill: #fff; }
    .leon-wa-tooltip {
      position: absolute;
      right: 68px; top: 50%;
      transform: translateY(-50%);
      background: rgba(8,8,8,0.92);
      color: #E8E4DC;
      font-size: 0.75rem;
      letter-spacing: 1px;
      padding: 6px 14px;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.25s;
      border: 1px solid rgba(201,168,76,0.25);
    }
    .leon-wa-btn:hover .leon-wa-tooltip { opacity: 1; }

    /* Pulse ring */
    .leon-wa-btn::before {
      content: '';
      position: absolute; inset: -6px;
      border-radius: 50%;
      border: 2px solid rgba(37,211,102,0.4);
      animation: waPulse 2.5s ease-in-out infinite;
    }
    @keyframes waPulse {
      0%,100% { transform: scale(1); opacity: 0.6; }
      50% { transform: scale(1.25); opacity: 0; }
    }

    /* ── AI Chat Button ── */
    .leon-ai-btn {
      width: 56px; height: 56px;
      background: linear-gradient(135deg, #C9A84C, #E8CB7A);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(201,168,76,0.45);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border: none;
      position: relative;
    }
    .leon-ai-btn:hover {
      transform: scale(1.12) translateY(-3px);
      box-shadow: 0 8px 32px rgba(201,168,76,0.6);
    }
    .leon-ai-btn svg { width: 26px; height: 26px; }
    .leon-ai-tooltip {
      position: absolute;
      right: 68px; top: 50%;
      transform: translateY(-50%);
      background: rgba(8,8,8,0.92);
      color: #E8E4DC;
      font-size: 0.75rem;
      letter-spacing: 1px;
      padding: 6px 14px;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.25s;
      border: 1px solid rgba(201,168,76,0.25);
    }
    .leon-ai-btn:hover .leon-ai-tooltip { opacity: 1; }

    /* Notification dot */
    .leon-ai-dot {
      position: absolute;
      top: 3px; right: 3px;
      width: 10px; height: 10px;
      background: #ff4757;
      border-radius: 50%;
      border: 2px solid #080808;
      animation: dotPop 0.4s ease 1s both;
    }
    @keyframes dotPop { from { transform: scale(0); } to { transform: scale(1); } }

    /* ── Chat Window ── */
    .leon-chat-window {
      position: fixed;
      bottom: 110px; right: 32px;
      width: 380px;
      max-height: 560px;
      background: #0E0E0F;
      border: 1px solid rgba(201,168,76,0.25);
      box-shadow: 0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.08);
      display: flex; flex-direction: column;
      z-index: 98999;
      transform: translateY(20px) scale(0.95);
      opacity: 0;
      pointer-events: none;
      transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
      overflow: hidden;
    }
    .leon-chat-window.open {
      transform: translateY(0) scale(1);
      opacity: 1;
      pointer-events: all;
    }

    /* Chat header */
    .leon-chat-header {
      background: linear-gradient(135deg, #141416, #1A1A1D);
      border-bottom: 1px solid rgba(201,168,76,0.2);
      padding: 18px 20px;
      display: flex; align-items: center; gap: 14px;
      flex-shrink: 0;
    }
    .leon-chat-avatar {
      width: 42px; height: 42px;
      background: linear-gradient(135deg, #C9A84C, #E8CB7A);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.1rem; font-weight: 700; color: #080808;
      font-family: 'Bebas Neue', sans-serif;
      letter-spacing: 1px;
      flex-shrink: 0;
    }
    .leon-chat-header-info { flex: 1; }
    .leon-chat-header-name {
      font-size: 0.9rem; font-weight: 600;
      color: #E8E4DC; letter-spacing: 1px;
    }
    .leon-chat-header-status {
      display: flex; align-items: center; gap: 6px;
      font-size: 0.72rem; color: #888880; margin-top: 2px;
    }
    .leon-status-dot {
      width: 6px; height: 6px;
      background: #25D366; border-radius: 50%;
      animation: statusBlink 2s ease-in-out infinite;
    }
    @keyframes statusBlink { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
    .leon-chat-close {
      background: none; border: none; cursor: pointer;
      color: #888880; font-size: 1.1rem;
      transition: color 0.2s; padding: 4px;
    }
    .leon-chat-close:hover { color: #C9A84C; }

    /* Messages area */
    .leon-chat-messages {
      flex: 1; overflow-y: auto; padding: 20px 16px;
      display: flex; flex-direction: column; gap: 14px;
      scrollbar-width: thin; scrollbar-color: rgba(201,168,76,0.2) transparent;
    }
    .leon-chat-messages::-webkit-scrollbar { width: 4px; }
    .leon-chat-messages::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.2); border-radius: 2px; }

    /* Message bubbles */
    .leon-msg {
      display: flex; gap: 10px; align-items: flex-end;
      animation: msgIn 0.3s ease;
    }
    @keyframes msgIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
    .leon-msg.user { flex-direction: row-reverse; }

    .leon-msg-avatar {
      width: 28px; height: 28px; border-radius: 50%;
      background: linear-gradient(135deg, #C9A84C, #E8CB7A);
      display: flex; align-items: center; justify-content: center;
      font-size: 0.65rem; color: #080808; font-weight: 700;
      flex-shrink: 0;
    }
    .leon-msg.user .leon-msg-avatar {
      background: #1A1A1D; border: 1px solid rgba(201,168,76,0.3);
      color: #C9A84C;
    }

    .leon-msg-bubble {
      max-width: 78%;
      padding: 10px 14px;
      font-size: 0.875rem;
      line-height: 1.6;
      color: #E8E4DC;
    }
    .leon-msg.ai .leon-msg-bubble {
      background: #141416;
      border: 1px solid rgba(201,168,76,0.15);
      border-bottom-left-radius: 0;
    }
    .leon-msg.user .leon-msg-bubble {
      background: linear-gradient(135deg, rgba(201,168,76,0.2), rgba(232,203,122,0.12));
      border: 1px solid rgba(201,168,76,0.3);
      border-bottom-right-radius: 0;
      text-align: right;
    }
    .leon-msg-time {
      font-size: 0.65rem; color: #555;
      margin-top: 4px;
    }

    /* Typing indicator */
    .leon-typing {
      display: flex; gap: 10px; align-items: flex-end;
    }
    .leon-typing-dots {
      background: #141416; border: 1px solid rgba(201,168,76,0.15);
      padding: 12px 16px; display: flex; gap: 5px; align-items: center;
    }
    .leon-typing-dots span {
      width: 6px; height: 6px; background: #C9A84C;
      border-radius: 50%; animation: typingBounce 1.4s ease-in-out infinite;
    }
    .leon-typing-dots span:nth-child(2) { animation-delay: 0.2s; }
    .leon-typing-dots span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes typingBounce { 0%,60%,100%{transform:translateY(0);opacity:0.4;} 30%{transform:translateY(-6px);opacity:1;} }

    /* Quick replies */
    .leon-quick-replies {
      padding: 8px 16px 4px;
      display: flex; flex-wrap: wrap; gap: 6px;
      flex-shrink: 0;
    }
    .leon-qr-btn {
      background: transparent;
      border: 1px solid rgba(201,168,76,0.3);
      color: #C9A84C;
      font-size: 0.7rem; letter-spacing: 1px;
      padding: 5px 12px;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }
    .leon-qr-btn:hover { background: rgba(201,168,76,0.12); border-color: #C9A84C; }

    /* Input area */
    .leon-chat-input-area {
      border-top: 1px solid rgba(201,168,76,0.15);
      padding: 14px 16px;
      display: flex; gap: 10px; align-items: flex-end;
      flex-shrink: 0; background: #0E0E0F;
    }
    .leon-chat-input {
      flex: 1;
      background: #141416;
      border: 1px solid rgba(201,168,76,0.2);
      padding: 10px 14px;
      color: #E8E4DC;
      font-family: inherit; font-size: 0.875rem;
      outline: none; resize: none;
      line-height: 1.5; max-height: 100px;
      transition: border-color 0.25s;
    }
    .leon-chat-input:focus { border-color: #C9A84C; }
    .leon-chat-input::placeholder { color: #555; }

    .leon-send-btn {
      width: 42px; height: 42px;
      background: linear-gradient(135deg, #C9A84C, #E8CB7A);
      border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.2s, box-shadow 0.2s;
      flex-shrink: 0;
    }
    .leon-send-btn:hover { transform: scale(1.08); box-shadow: 0 4px 16px rgba(201,168,76,0.4); }
    .leon-send-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    .leon-send-btn svg { width: 18px; height: 18px; fill: #080808; }

    /* Powered by */
    .leon-powered {
      text-align: center;
      font-size: 0.65rem; letter-spacing: 1px; color: #333;
      padding: 6px; border-top: 1px solid rgba(255,255,255,0.03);
      flex-shrink: 0;
    }
    .leon-powered span { color: #C9A84C; }

    /* ── Responsive ── */
    @media (max-width: 480px) {
      .leon-widgets { bottom: 20px; right: 16px; }
      .leon-chat-window { right: 0; bottom: 90px; width: 100vw; max-height: 70vh; border-left: none; border-right: none; }
    }
  `;
  document.head.appendChild(style);

  // ── BUILD HTML ──────────────────────────────────────────────
  const container = document.createElement('div');
  container.className = 'leon-widgets';
  container.innerHTML = `
    <!-- WhatsApp -->
    <a class="leon-wa-btn"
       href="https://wa.me/${CONFIG.whatsapp.phone}?text=${encodeURIComponent(CONFIG.whatsapp.message)}"
       target="_blank" rel="noopener noreferrer"
       aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <div class="leon-wa-tooltip">${CONFIG.whatsapp.tooltip}</div>
    </a>

    <!-- AI Chat Button -->
    <button class="leon-ai-btn" id="leon-ai-toggle" aria-label="Open AI Assistant">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="rgba(8,8,8,0.3)"/>
        <path d="M8 10h8M8 13h5" stroke="#080808" stroke-width="1.8" stroke-linecap="round"/>
        <circle cx="17" cy="7" r="3" fill="#080808" opacity="0.6"/>
        <path d="M15.5 7h3M17 5.5v3" stroke="#C9A84C" stroke-width="1.2" stroke-linecap="round"/>
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.06L2 22l4.94-1.38A9.958 9.958 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" stroke="#080808" stroke-width="1.5" fill="none"/>
      </svg>
      <div class="leon-ai-dot" id="leon-ai-dot"></div>
      <div class="leon-ai-tooltip">Ask LEON AI</div>
    </button>
  `;
  document.body.appendChild(container);

  // ── BUILD CHAT WINDOW ───────────────────────────────────────
  const chatWindow = document.createElement('div');
  chatWindow.className = 'leon-chat-window';
  chatWindow.id = 'leon-chat-window';
  chatWindow.innerHTML = `
    <div class="leon-chat-header">
      <div class="leon-chat-avatar">L</div>
      <div class="leon-chat-header-info">
        <div class="leon-chat-header-name">${CONFIG.ai.name}</div>
        <div class="leon-chat-header-status">
          <div class="leon-status-dot"></div>
          <span>${CONFIG.ai.subtitle}</span>
        </div>
      </div>
      <button class="leon-chat-close" id="leon-chat-close" aria-label="Close chat">✕</button>
    </div>

    <div class="leon-chat-messages" id="leon-chat-messages"></div>

    <div class="leon-quick-replies" id="leon-quick-replies">
      <button class="leon-qr-btn" data-q="What services do you offer?">Services</button>
      <button class="leon-qr-btn" data-q="What are your prices?">Pricing</button>
      <button class="leon-qr-btn" data-q="How long does a project take?">Timeline</button>
      <button class="leon-qr-btn" data-q="How do I start a project with LEON?">Get Started</button>
    </div>

    <div class="leon-chat-input-area">
      <textarea class="leon-chat-input" id="leon-chat-input"
        placeholder="Ask me anything about LEON..." rows="1"
        aria-label="Chat input"></textarea>
      <button class="leon-send-btn" id="leon-send-btn" aria-label="Send message">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
        </svg>
      </button>
    </div>

    <div class="leon-powered">Powered by <span>LEON AI ✦ Claude</span></div>
  `;
  document.body.appendChild(chatWindow);

  // ── STATE ───────────────────────────────────────────────────
  let isOpen = false;
  let isLoading = false;
  const conversationHistory = [];

  // ── HELPERS ─────────────────────────────────────────────────
  function getTime() {
    return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  function scrollToBottom() {
    const msgs = document.getElementById('leon-chat-messages');
    setTimeout(() => { msgs.scrollTop = msgs.scrollHeight; }, 50);
  }

  function appendMessage(role, text) {
    const msgs = document.getElementById('leon-chat-messages');
    const div = document.createElement('div');
    div.className = `leon-msg ${role}`;
    const initial = role === 'ai' ? 'L' : '✦';
    div.innerHTML = `
      <div class="leon-msg-avatar">${initial}</div>
      <div>
        <div class="leon-msg-bubble">${text.replace(/\n/g, '<br>')}</div>
        <div class="leon-msg-time">${getTime()}</div>
      </div>
    `;
    msgs.appendChild(div);
    scrollToBottom();
  }

  function showTyping() {
    const msgs = document.getElementById('leon-chat-messages');
    const div = document.createElement('div');
    div.className = 'leon-typing'; div.id = 'leon-typing';
    div.innerHTML = `
      <div class="leon-msg-avatar">L</div>
      <div class="leon-typing-dots">
        <span></span><span></span><span></span>
      </div>`;
    msgs.appendChild(div);
    scrollToBottom();
  }

  function removeTyping() {
    const t = document.getElementById('leon-typing');
    if (t) t.remove();
  }

  function hideQuickReplies() {
    const qr = document.getElementById('leon-quick-replies');
    if (qr) qr.style.display = 'none';
  }

  // ── OPEN / CLOSE ────────────────────────────────────────────
  function openChat() {
    isOpen = true;
    chatWindow.classList.add('open');
    const dot = document.getElementById('leon-ai-dot');
    if (dot) dot.style.display = 'none';
    // Show greeting if first open
    if (conversationHistory.length === 0) {
      setTimeout(() => {
        showTyping();
        setTimeout(() => {
          removeTyping();
          appendMessage('ai', CONFIG.ai.greeting);
        }, 1200);
      }, 300);
    }
    setTimeout(() => document.getElementById('leon-chat-input')?.focus(), 400);
  }

  function closeChat() {
    isOpen = false;
    chatWindow.classList.remove('open');
  }

  // ── SEND MESSAGE ─────────────────────────────────────────────
  async function sendMessage(text) {
    if (!text.trim() || isLoading) return;
    isLoading = true;
    hideQuickReplies();

    const input = document.getElementById('leon-chat-input');
    const sendBtn = document.getElementById('leon-send-btn');
    if (input) input.value = '';
    if (sendBtn) sendBtn.disabled = true;

    appendMessage('user', text);
    conversationHistory.push({ role: 'user', content: text });

    showTyping();

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 400,
          system: CONFIG.ai.systemPrompt,
          messages: conversationHistory
        })
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || "I'm having trouble connecting right now. Please contact us directly at leonkuyia@gmail.com or WhatsApp +254 719 628 766.";

      removeTyping();
      conversationHistory.push({ role: 'assistant', content: reply });
      appendMessage('ai', reply);
    } catch (err) {
      removeTyping();
      appendMessage('ai', "I'm offline at the moment. Please reach LEON directly:\n📧 leonkuyia@gmail.com\n📱 +254 719 628 766");
    }

    isLoading = false;
    if (sendBtn) sendBtn.disabled = false;
    if (input) { input.focus(); input.style.height = 'auto'; }
  }

  // ── EVENT LISTENERS ──────────────────────────────────────────
  document.getElementById('leon-ai-toggle').addEventListener('click', () => {
    isOpen ? closeChat() : openChat();
  });

  document.getElementById('leon-chat-close').addEventListener('click', closeChat);

  document.getElementById('leon-send-btn').addEventListener('click', () => {
    const input = document.getElementById('leon-chat-input');
    sendMessage(input.value.trim());
  });

  document.getElementById('leon-chat-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e.target.value.trim());
    }
  });

  // Auto-resize textarea
  document.getElementById('leon-chat-input').addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 100) + 'px';
  });

  // Quick reply buttons
  document.getElementById('leon-quick-replies').addEventListener('click', (e) => {
    if (e.target.classList.contains('leon-qr-btn')) {
      sendMessage(e.target.dataset.q);
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (isOpen &&
        !chatWindow.contains(e.target) &&
        !document.getElementById('leon-ai-toggle').contains(e.target)) {
      closeChat();
    }
  });

  // Entrance animation — stagger buttons in
  container.style.opacity = '0';
  setTimeout(() => {
    container.style.transition = 'opacity 0.5s ease';
    container.style.opacity = '1';
  }, 800);

})();
