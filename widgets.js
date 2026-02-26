// ============================================================
//  LEON Graphics — widgets.js  (v4)
//  1) Embedded WhatsApp Chat Panel
//  2) LEON AI Assistant — works offline with smart replies
//     + upgrades to live Claude API when /api/chat is available
// ============================================================

(function () {
  'use strict';

  const CONFIG = {
    whatsapp: {
      phone: '254719628766',
      agentName: 'Leon Nkuyia',
      agentAvatar: 'LN',
      onlineHours: { start: 0, end: 24 },
      greeting: "👋 Hi there! Thanks for reaching out to LEON Graphics Design & Branding.\n\nHow can we help bring your vision to life today?",
      awayMessage: "Hey! We're currently offline but will get back to you shortly.\n\nLeave your message and we'll reply on WhatsApp! 📲",
      quickReplies: [
        { label: '🎨 Graphic Design', text: "Hi! I'm interested in graphic design services." },
        { label: '💻 Web Design/Dev',     text: "Hi! I need a website designed or developed." },
        { label: '🚀 Branding',       text: "Hi! I'd like help with branding and identity." },
        { label: '💰 Get a Quote',    text: "Hi! I'd like to get a quote for a project." },
      ]
    },
    ai: {
      name: 'LEON AI',
      subtitle: 'Design Assistant · Always Online',
      greeting: "Hello! 👋 I'm LEON's AI assistant — always here to help!\n\nI can answer questions about our services, pricing, timelines, and more. What would you like to know?",
      systemPrompt: `You are LEON AI, the official assistant for LEON Graphics Design & Branding — a premium creative studio in Nairobi, Kenya.

SERVICES & PRICING:
- Graphic Design (logos, brand identity, illustrations, social media) — from KES 1,200+
- Web Design & Development (responsive sites, UI/UX, e-commerce) — from KES 20,000+
- Brand Strategy (positioning, style guides, naming) — from KES 15,000+
- Print & Packaging (cards, brochures, banners, packaging) — from KES 800+

PROCESS: Discovery → Strategy → Design → Delivery
TIMELINE: Logo 3–7 days | Website 2–7 weeks | Full branding 3–6 weeks
CONTACT: +254 719 628 766 | leonkuyia@gmail.com | Nairobi, Kenya
HOURS: Mon–Fri, 9:00 AM – 5:30 PM EAT

Be concise, warm, and professional. Reflect LEON's brand: creative, confident, sophisticated.`
    }
  };

  // ── Online check ─────────────────────────────────────────
  function isOnline() {
    const n = new Date(), d = n.getDay(), h = n.getHours();
    return d >= 1 && d <= 5 &&
      h >= CONFIG.whatsapp.onlineHours.start &&
      h < CONFIG.whatsapp.onlineHours.end;
  }

  // ── Smart Reply Engine ────────────────────────────────────
  // Answers instantly without needing any API connection
  function smartReply(text) {
    const t = text.toLowerCase().trim();

    if (/^(hi|hello|hey|good morning|good afternoon|good evening|habari|sasa|niaje|howdy|greet)/.test(t))
      return "Hello! 👋 Welcome to LEON Graphics Design & Branding.\n\nI'm here to help with any questions about our services, pricing, or how to get started.\n\nWhat can I do for you today?";

    if (/what.*service|what.*offer|what.*do you do|what.*can you|services available/.test(t))
      return "We offer 4 core services:\n\n🎨 Graphic Design — Logos, brand identity, social media graphics\n\n💻 Web Design & Dev — Responsive websites, UI/UX, e-commerce\n\n🚀 Brand Strategy — Positioning, style guides, naming\n\n🖨️ Print & Packaging — Business cards, brochures, banners\n\nWhich one interests you?";

    if (/price|cost|how much|pricing|rate|charge|fee|budget|ksh|kes|afford/.test(t))
      return "Here's our pricing guide:\n\n🎨 Graphic Design — from KES 1,200+\n💻 Web Design & Dev — from KES 20,000+\n🚀 Brand Strategy — from KES 15,000+\n🖨️ Print & Packaging — from KES 800+\n\nPrices vary by project scope. For a custom quote:\n📱 +254 719 628 766\n📧 leonkuyia@gmail.com";

    if (/logo/.test(t))
      return "We design professional logos that truly capture your brand! 🎨\n\n✅ Multiple unique concepts\n✅ Revisions until you love it\n✅ Final files in all formats (PNG, SVG, PDF, AI)\n✅ Delivered in 3–7 days\n\nStarting from KES 1,200+\n\nReady to start?\n📱 +254 719 628 766";

    if (/web|website|site|online|develop|e-commerce|ecommerce/.test(t))
      return "We build beautiful, fast websites! 💻\n\n✅ Mobile-friendly & responsive\n✅ SEO optimized\n✅ E-commerce ready\n✅ Easy to manage (CMS)\n✅ Delivered in 2–7 weeks\n\nStarting from KES 20,000+\n\nLet's discuss your project:\n📱 +254 719 628 766\n📧 leonkuyia@gmail.com";

    if (/brand|identity|rebrand|brand strategy/.test(t))
      return "A strong brand is everything! 🚀\n\nOur branding package includes:\n✅ Brand strategy & positioning\n✅ Logo & visual identity\n✅ Color palette & typography\n✅ Full brand style guide\n✅ Stationery design\n\nStarting from KES 15,000+\nTimeline: 3–6 weeks\n\nGet in touch:\n📱 +254 719 628 766";

    if (/print|card|brochure|flyer|banner|packaging|poster|sticker/.test(t))
      return "We create print materials that leave a lasting impression! 🖨️\n\n✅ Business & Wedding cards\n✅ Brochures & flyers\n✅ Banners & posters\n✅ Product packaging\n✅ Branded stationery\n\nStarting from KES 800+\n\nContact us for a custom quote:\n📱 +254 719 628 766";

    if (/how long|timeline|time|days|weeks|fast|quick|urgent|rush/.test(t))
      return "Our typical turnaround times:\n\n⏱️ Logo design — 3–7 days\n⏱️ Website — 2–7 weeks\n⏱️ Full branding — 3–6 weeks\n⏱️ Print materials — 2–5 days\n\nNeed something urgent? We offer rush delivery!\n📱 +254 719 628 766";

    if (/how.*work|process|how.*start|steps|procedure/.test(t))
      return "Here's how we work together:\n\n1️⃣ Discovery — We learn about your brand & goals\n2️⃣ Strategy — We build a creative direction\n3️⃣ Design/Dev — We craft your visuals\n4️⃣ Delivery — Final files, ready to use\n\nReady to begin?\n📱 +254 719 628 766\n📧 leonkuyia@gmail.com";

    if (/contact|reach|phone|email|whatsapp|location|address|where|nairobi|find you/.test(t))
      return "You can reach LEON Graphics here:\n\n📱 WhatsApp/Call: +254 719 628 766\n📧 Email: leonkuyia@gmail.com\n📍 Nairobi, Kenya\n⏰ Mon–Fri, 9:00 AM – 5:30 PM EAT\n\nOr tap the green WhatsApp button to chat instantly! 👇";

    if (/portfolio|past work|sample|example|previous work|projects/.test(t))
      return "Our portfolio includes:\n\n🏆 Brand identities for local & international businesses\n🏆 E-commerce & corporate websites\n🏆 Product packaging designs\n🏆 Social media campaigns & graphics\n\nVisit our Portfolio page to see our work, or contact us to see projects in your specific industry:\n📱 +254 719 628 766";

    if (/pay|payment|deposit|mpesa|m-pesa|bank|transfer|installment/.test(t))
      return "We accept:\n\n📱 M-Pesa\n🏦 Bank Transfer\n💳 Card Payments\n\nWe require a 50% deposit to begin, 30% when 75% of the work is done and confirmed by the client, balance on delivery.\n\nFor payment details:\n📱 +254 719 628 766\n📧 leonkuyia@gmail.com";

    if (/revis|change|edit|update|modify|not happy|amend/.test(t))
      return "We want you to absolutely love your design! 💛\n\n✅ All packages include revision rounds\n✅ We refine until you're 100% satisfied\n✅ Clear communication throughout\n\nFor specific revision terms, contact us:\n📱 +254 719 628 766";

    if (/social media|instagram|facebook|twitter|tiktok|content/.test(t))
      return "Yes, we create stunning social media graphics! 📱\n\n✅ Post designs & templates\n✅ Story & reel covers\n✅ Profile branding (bio, highlights)\n✅ Content calendars\n✅ Ad creatives\n\nStarting from KES 1,200+\n\nContact us:\n📱 +254 719 628 766";

    if (/thank|thanks|asante|appreciate|helpful/.test(t))
      return "You're very welcome! 😊\n\nIt's our pleasure to help. If you're ready to start a project or have more questions:\n\n📱 +254 719 628 766\n📧 leonkuyia@gmail.com\n\nWe look forward to working with you! ✨";

    if (/who are you|what are you|are you (a )?bot|are you (an )?ai|are you human|are you real/.test(t))
      return "I'm LEON AI — the virtual assistant for LEON Graphics Design & Branding! 🤖✨\n\nI can answer questions about our services, pricing, and process instantly.\n\nFor complex enquiries, our human team is always available:\n📱 +254 719 628 766\n📧 leonkuyia@gmail.com";

    if (/bye|goodbye|cya|see you|later|kwaheri/.test(t))
      return "Goodbye! 👋 It was great chatting with you.\n\nWhenever you're ready to start your project, we're here:\n📱 +254 719 628 766\n📧 leonkuyia@gmail.com\n\nHave a wonderful day! ☀️";

    // Default
    return "Great question! For the most accurate answer I'd recommend speaking directly with our team:\n\n📱 WhatsApp: +254 719 628 766\n📧 Email: leonkuyia@gmail.com\n⏰ Mon–Fri, 9:00AM–5:30PM EAT\n\nOr tap the green WhatsApp button to chat instantly! 👇";
  }

  // ── Styles ────────────────────────────────────────────────
  const css = document.createElement('style');
  css.textContent = `
    .lw-wrap {
      position:fixed; bottom:32px; right:32px;
      display:flex; flex-direction:column; align-items:flex-end; gap:14px;
      z-index:99000; font-family:'DM Sans','Segoe UI',sans-serif;
    }
    .lw-fab {
      width:44px; height:44px; border-radius:50%;
      display:flex; align-items:center; justify-content:center;
      cursor:pointer; border:none; position:relative;
      transition:transform 0.3s ease, box-shadow 0.3s ease;
    }
    .lw-fab:hover { transform:scale(1.1) translateY(-3px); }
    .lw-fab-tip {
      position:absolute; right:56px; top:50%; transform:translateY(-50%);
      background:rgba(8,8,8,0.93); color:#E8E4DC;
      font-size:0.72rem; letter-spacing:1px; padding:6px 14px;
      white-space:nowrap; pointer-events:none; opacity:0;
      transition:opacity 0.2s; border:1px solid rgba(201,168,76,0.25);
    }
    .lw-fab:hover .lw-fab-tip { opacity:1; }
    .lw-wa-fab { background:#25D366; box-shadow:0 4px 20px rgba(37,211,102,0.45); }
    .lw-wa-fab:hover { box-shadow:0 8px 32px rgba(37,211,102,0.6); }
    .lw-wa-fab svg { width:22px; height:22px; fill:#fff; }
    .lw-wa-fab::before {
      content:''; position:absolute; inset:-6px; border-radius:50%;
      border:2px solid rgba(37,211,102,0.35);
      animation:lwWaPulse 2.5s ease-in-out infinite;
    }
    @keyframes lwWaPulse { 0%,100%{transform:scale(1);opacity:.6;} 50%{transform:scale(1.3);opacity:0;} }
    .lw-ai-fab { background:linear-gradient(135deg,#C9A84C,#E8CB7A); box-shadow:0 4px 20px rgba(201,168,76,0.45); }
    .lw-ai-fab:hover { box-shadow:0 8px 32px rgba(201,168,76,0.6); }
    .lw-ai-fab svg { width:20px; height:20px; }
    .lw-notif {
      position:absolute; top:2px; right:2px;
      width:8px; height:8px; background:#ff4757;
      border-radius:50%; border:2px solid #080808;
      animation:lwNotif 0.4s ease 1.2s both;
    }
    @keyframes lwNotif { from{transform:scale(0);} to{transform:scale(1);} }
    .lw-panel {
      position:fixed; bottom:100px; right:32px;
      width:370px; display:flex; flex-direction:column;
      z-index:98998; overflow:hidden;
      box-shadow:0 24px 80px rgba(0,0,0,0.75);
      transform:translateY(24px) scale(0.96);
      opacity:0; pointer-events:none;
      transition:all 0.38s cubic-bezier(0.34,1.4,0.64,1);
      max-height:540px;
    }
    .lw-panel.open { transform:translateY(0) scale(1); opacity:1; pointer-events:all; }

    /* WhatsApp panel */
    .lw-wa-panel { border:1px solid rgba(37,211,102,0.2); background:#ECE5DD; z-index:98999; }
    .lw-wa-hd { background:#075E54; padding:14px 18px; display:flex; align-items:center; gap:14px; flex-shrink:0; }
    .lw-wa-av-wrap { position:relative; flex-shrink:0; }
    .lw-wa-av { width:44px; height:44px; border-radius:50%; background:linear-gradient(135deg,#25D366,#128C7E); display:flex; align-items:center; justify-content:center; font-size:0.78rem; font-weight:700; color:#fff; letter-spacing:1px; }
    .lw-wa-status-dot { position:absolute; bottom:1px; right:1px; width:10px; height:10px; border-radius:50%; border:2px solid #075E54; background:#25D366; }
    .lw-wa-status-dot.away { background:#ffa502; }
    .lw-wa-hd-info { flex:1; }
    .lw-wa-hd-name { font-size:0.95rem; font-weight:600; color:#fff; }
    .lw-wa-hd-sub { font-size:0.7rem; color:rgba(255,255,255,0.7); margin-top:2px; }
    .lw-wa-hd-btns { display:flex; gap:14px; align-items:center; }
    .lw-wa-hd-btns a, .lw-wa-hd-btn { color:rgba(255,255,255,0.75); font-size:1rem; cursor:pointer; transition:color 0.2s; background:none; border:none; text-decoration:none; display:flex; align-items:center; }
    .lw-wa-hd-btns a:hover, .lw-wa-hd-btn:hover { color:#fff; }
    .lw-wa-body { flex:1; overflow-y:auto; background-color:#ECE5DD; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect fill='%23e4ddd5' width='60' height='60'/%3E%3Ccircle fill='%23d9d2c9' cx='30' cy='30' r='0.8'/%3E%3C/svg%3E"); padding:12px 14px; display:flex; flex-direction:column; gap:5px; scrollbar-width:thin; }
    .lw-wa-date { text-align:center; margin:6px 0; }
    .lw-wa-date span { background:rgba(255,255,255,0.82); color:#667781; font-size:0.68rem; padding:3px 12px; border-radius:6px; box-shadow:0 1px 2px rgba(0,0,0,0.1); }
    .lw-wa-msg { display:flex; align-items:flex-end; animation:lwMsgIn 0.22s ease; }
    .lw-wa-msg.out { justify-content:flex-end; }
    @keyframes lwMsgIn { from{opacity:0;transform:translateY(6px);} to{opacity:1;transform:translateY(0);} }
    .lw-wa-bubble { max-width:82%; padding:8px 12px 5px; border-radius:8px; box-shadow:0 1px 2px rgba(0,0,0,0.15); font-size:0.875rem; line-height:1.5; color:#111; }
    .lw-wa-bubble.in { background:#fff; border-top-left-radius:0; }
    .lw-wa-bubble.out { background:#DCF8C6; border-top-right-radius:0; }
    .lw-wa-bubble pre { white-space:pre-wrap; font-family:inherit; font-size:inherit; margin:0; }
    .lw-wa-meta { display:flex; justify-content:flex-end; align-items:center; gap:3px; margin-top:2px; }
    .lw-wa-time { font-size:0.62rem; color:#999; }
    .lw-wa-tick { font-size:0.68rem; color:#53bdeb; }
    .lw-wa-typing { display:flex; }
    .lw-wa-typing-bub { background:#fff; padding:11px 15px; border-radius:8px; border-top-left-radius:0; box-shadow:0 1px 2px rgba(0,0,0,0.1); display:flex; gap:5px; align-items:center; }
    .lw-wa-typing-bub span { width:7px; height:7px; background:#aaa; border-radius:50%; animation:lwWaTyping 1.4s infinite; }
    .lw-wa-typing-bub span:nth-child(2){animation-delay:.2s;} .lw-wa-typing-bub span:nth-child(3){animation-delay:.4s;}
    @keyframes lwWaTyping { 0%,60%,100%{transform:translateY(0);opacity:.4;} 30%{transform:translateY(-5px);opacity:1;} }
    .lw-wa-qr-bar { padding:6px 12px; display:flex; flex-wrap:wrap; gap:6px; background:#f2f2f2; border-top:1px solid #ddd; flex-shrink:0; }
    .lw-wa-qr-btn { background:#fff; border:1px solid #25D366; color:#075E54; border-radius:18px; font-size:0.75rem; padding:5px 13px; cursor:pointer; transition:all 0.2s; font-family:inherit; }
    .lw-wa-qr-btn:hover { background:#25D366; color:#fff; }
    .lw-wa-input-row { padding:8px 12px; display:flex; gap:8px; align-items:flex-end; background:#f2f2f2; border-top:1px solid #ddd; flex-shrink:0; }
    .lw-wa-input { flex:1; background:#fff; border:none; border-radius:22px; padding:10px 16px; font-family:inherit; font-size:0.875rem; color:#111; outline:none; resize:none; max-height:80px; line-height:1.4; box-shadow:0 1px 3px rgba(0,0,0,0.1); }
    .lw-wa-send-btn { width:44px; height:44px; border-radius:50%; background:#25D366; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.2s,transform 0.2s; flex-shrink:0; }
    .lw-wa-send-btn:hover { background:#128C7E; transform:scale(1.08); }
    .lw-wa-send-btn svg { width:20px; height:20px; fill:#fff; }
    .lw-wa-footer { text-align:center; padding:7px 12px; background:#f2f2f2; border-top:1px solid #e0e0e0; flex-shrink:0; }
    .lw-wa-footer a { font-size:0.68rem; color:#128C7E; text-decoration:none; display:inline-flex; align-items:center; gap:5px; }
    .lw-wa-footer a:hover { text-decoration:underline; }

    /* AI panel */
    .lw-ai-panel { background:#0E0E0F; border:1px solid rgba(201,168,76,0.25); }
    .lw-ai-hd { background:linear-gradient(135deg,#141416,#1A1A1D); border-bottom:1px solid rgba(201,168,76,0.2); padding:16px 20px; display:flex; align-items:center; gap:14px; flex-shrink:0; }
    .lw-ai-av { width: 40px; height: 40px; border-radius: 50%; background: url('logo.png') center/cover no-repeat; }
    .lw-ai-hd-info { flex:1; }
    .lw-ai-hd-name { font-size:0.9rem; font-weight:600; color:#E8E4DC; letter-spacing:1px; }
    .lw-ai-hd-sub { display:flex; align-items:center; gap:6px; font-size:0.7rem; color:#888880; margin-top:2px; }
    .lw-sdot { width:6px; height:6px; background:#25D366; border-radius:50%; animation:lwBlink 2s infinite; }
    @keyframes lwBlink { 0%,100%{opacity:1;} 50%{opacity:.4;} }
    .lw-close { background:none; border:none; cursor:pointer; color:#888880; font-size:1rem; transition:color 0.2s; padding:4px; }
    .lw-close:hover { color:#C9A84C; }
    .lw-ai-msgs { flex:1; overflow-y:auto; padding:16px 14px; display:flex; flex-direction:column; gap:10px; scrollbar-width:thin; scrollbar-color:rgba(201,168,76,.15) transparent; }
    .lw-ai-msgs::-webkit-scrollbar { width:3px; }
    .lw-ai-msgs::-webkit-scrollbar-thumb { background:rgba(201,168,76,.15); }
    .lw-ai-msg { display:flex; gap:8px; align-items:flex-end; animation:lwMsgIn 0.28s ease; }
    .lw-ai-msg.user { flex-direction:row-reverse; }
    .lw-ai-msg-av { width:26px; height:26px; border-radius:50%; flex-shrink:0; background:linear-gradient(135deg,#C9A84C,#E8CB7A); display:flex; align-items:center; justify-content:center; font-size:0.6rem; color:#080808; font-weight:700; }
    .lw-ai-msg.user .lw-ai-msg-av { background:#1A1A1D; border:1px solid rgba(201,168,76,.3); color:#C9A84C; }
    .lw-ai-bubble { max-width:82%; padding:10px 14px; font-size:0.875rem; line-height:1.6; color:#E8E4DC; }
    .lw-ai-msg.ai .lw-ai-bubble { background:#141416; border:1px solid rgba(201,168,76,.15); border-bottom-left-radius:0; }
    .lw-ai-msg.user .lw-ai-bubble { background:rgba(201,168,76,.15); border:1px solid rgba(201,168,76,.3); border-bottom-right-radius:0; text-align:right; }
    .lw-ai-time { font-size:0.62rem; color:#333; margin-top:3px; }
    .lw-ai-typing { display:flex; gap:8px; align-items:flex-end; }
    .lw-ai-typing-dots { background:#141416; border:1px solid rgba(201,168,76,.15); padding:10px 14px; display:flex; gap:5px; }
    .lw-ai-typing-dots span { width:6px; height:6px; background:#C9A84C; border-radius:50%; animation:lwAiTyping 1.4s infinite; }
    .lw-ai-typing-dots span:nth-child(2){animation-delay:.2s;} .lw-ai-typing-dots span:nth-child(3){animation-delay:.4s;}
    @keyframes lwAiTyping { 0%,60%,100%{transform:translateY(0);opacity:.4;} 30%{transform:translateY(-5px);opacity:1;} }
    .lw-ai-qr-bar { padding:6px 14px 4px; display:flex; flex-wrap:wrap; gap:6px; flex-shrink:0; }
    .lw-ai-qr-btn { background:transparent; border:1px solid rgba(201,168,76,.3); color:#C9A84C; font-size:0.7rem; letter-spacing:1px; padding:5px 12px; cursor:pointer; transition:all 0.2s; font-family:inherit; }
    .lw-ai-qr-btn:hover { background:rgba(201,168,76,.12); border-color:#C9A84C; }
    .lw-ai-input-row { border-top:1px solid rgba(201,168,76,.15); padding:12px 14px; display:flex; gap:8px; align-items:flex-end; flex-shrink:0; background:#0E0E0F; }
    .lw-ai-input { flex:1; background:#141416; border:1px solid rgba(201,168,76,.2); padding:10px 14px; color:#E8E4DC; font-family:inherit; font-size:0.875rem; outline:none; resize:none; max-height:80px; line-height:1.5; transition:border-color 0.25s; }
    .lw-ai-input:focus { border-color:#C9A84C; }
    .lw-ai-input::placeholder { color:#444; }
    .lw-ai-send-btn { width:42px; height:42px; background:linear-gradient(135deg,#C9A84C,#E8CB7A); border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:transform 0.2s,box-shadow 0.2s; flex-shrink:0; }
    .lw-ai-send-btn:hover { transform:scale(1.08); box-shadow:0 4px 16px rgba(201,168,76,.4); }
    .lw-ai-send-btn:disabled { opacity:.4; cursor:not-allowed; transform:none; }
    .lw-ai-send-btn svg { width:18px; height:18px; fill:#080808; }
    .lw-powered { text-align:center; font-size:0.62rem; letter-spacing:1px; color:#282828; padding:5px; border-top:1px solid rgba(255,255,255,.03); flex-shrink:0; }
    .lw-powered span { color:#C9A84C; }

    @media(max-width:480px){
      .lw-wrap { bottom:16px; right:14px; gap:10px; }
      .lw-panel { right:0; bottom:86px; width:100vw; max-height:72vh; }
    }
  `;
  document.head.appendChild(css);

  // ── FABs ─────────────────────────────────────────────────
  const wrap = document.createElement('div');
  wrap.className = 'lw-wrap';
  wrap.innerHTML = `
    <button class="lw-fab lw-wa-fab" id="lwWaToggle" aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      <div class="lw-fab-tip">Chat with us</div>
    </button>
    <button class="lw-fab lw-ai-fab" id="lwAiToggle" aria-label="LEON AI Assistant">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.06L2 22l4.94-1.38A9.958 9.958 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" stroke="#080808" stroke-width="1.5"/>
        <path d="M8 10h8M8 13h5" stroke="#080808" stroke-width="1.8" stroke-linecap="round"/>
        <circle cx="17" cy="7" r="2.5" fill="#080808" opacity="0.5"/>
        <path d="M15.8 7h2.4M17 5.8v2.4" stroke="#C9A84C" stroke-width="1.2" stroke-linecap="round"/>
      </svg>
      <div class="lw-notif" id="lwAiDot"></div>
      <div class="lw-fab-tip">Ask LEON AI</div>
    </button>
  `;
  document.body.appendChild(wrap);

  // ── WhatsApp Panel ────────────────────────────────────────
  const online = isOnline();
  const waEl = document.createElement('div');
  waEl.className = 'lw-panel lw-wa-panel'; waEl.id = 'lwWaPanel';
  waEl.innerHTML = `
    <div class="lw-wa-hd">
      <div class="lw-wa-av-wrap">
        <div class="lw-wa-av">${CONFIG.whatsapp.agentAvatar}</div>
        <div class="lw-wa-status-dot ${online?'':'away'}"></div>
      </div>
      <div class="lw-wa-hd-info">
        <div class="lw-wa-hd-name">${CONFIG.whatsapp.agentName}</div>
        <div class="lw-wa-hd-sub">${online?'🟢 Online · Replies instantly':'🟡 Away · Replies within hours'}</div>
      </div>
      <div class="lw-wa-hd-btns">
        <a href="https://wa.me/${CONFIG.whatsapp.phone}" target="_blank" rel="noopener" title="Open in WhatsApp app">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3zm-1 2H5a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-8h-2v8H5V7h8V5z"/></svg>
        </a>
        <button class="lw-wa-hd-btn" id="lwWaClose">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
      </div>
    </div>
    <div class="lw-wa-body" id="lwWaBody">
      <div class="lw-wa-date"><span>TODAY</span></div>
    </div>
    <div class="lw-wa-qr-bar" id="lwWaQr">
      ${CONFIG.whatsapp.quickReplies.map(q=>`<button class="lw-wa-qr-btn" data-text="${q.text}">${q.label}</button>`).join('')}
    </div>
    <div class="lw-wa-input-row">
      <textarea class="lw-wa-input" id="lwWaInput" placeholder="Type a message..." rows="1"></textarea>
      <button class="lw-wa-send-btn" id="lwWaSend">
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
    <div class="lw-wa-footer">
      <a href="https://wa.me/${CONFIG.whatsapp.phone}" target="_blank" rel="noopener">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="#128C7E"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Continue in WhatsApp app
      </a>
    </div>
  `;
  document.body.appendChild(waEl);

  // ── AI Panel ──────────────────────────────────────────────
  const aiEl = document.createElement('div');
  aiEl.className = 'lw-panel lw-ai-panel'; aiEl.id = 'lwAiPanel';
  aiEl.innerHTML = `
    <div class="lw-ai-hd">
      <div class="lw-ai-av">L</div>
      <div class="lw-ai-hd-info">
        <div class="lw-ai-hd-name">${CONFIG.ai.name}</div>
        <div class="lw-ai-hd-sub"><div class="lw-sdot"></div><span>${CONFIG.ai.subtitle}</span></div>
      </div>
      <button class="lw-close" id="lwAiClose">✕</button>
    </div>
    <div class="lw-ai-msgs" id="lwAiMsgs"></div>
    <div class="lw-ai-qr-bar" id="lwAiQr">
      <button class="lw-ai-qr-btn" data-q="What services do you offer?">Services</button>
      <button class="lw-ai-qr-btn" data-q="What are your prices?">Pricing</button>
      <button class="lw-ai-qr-btn" data-q="How long does a project take?">Timeline</button>
      <button class="lw-ai-qr-btn" data-q="How do I get started?">Get Started</button>
    </div>
    <div class="lw-ai-input-row">
      <textarea class="lw-ai-input" id="lwAiInput" placeholder="Ask me anything..." rows="1"></textarea>
      <button class="lw-ai-send-btn" id="lwAiSend">
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
    <div class="lw-powered">Powered by <span>LEON AI ✦ Claude</span></div>
  `;
  document.body.appendChild(aiEl);

  // ── Helpers ──────────────────────────────────────────────
  const $ = id => document.getElementById(id);
  const getTime = () => new Date().toLocaleTimeString('en-KE',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Africa/Nairobi'});
  const scrollWa = () => { const b=$('lwWaBody'); setTimeout(()=>{b.scrollTop=b.scrollHeight;},40); };
  const scrollAi = () => { const m=$('lwAiMsgs'); setTimeout(()=>{m.scrollTop=m.scrollHeight;},40); };

  // ── State ────────────────────────────────────────────────
  let waOpen=false, aiOpen=false, aiLoading=false;
  let waGreeted=false, aiGreeted=false;
  const aiHistory=[];

  // ── WhatsApp messages ────────────────────────────────────
  function waMsg(text, dir) {
    const body=$('lwWaBody');
    const div=document.createElement('div');
    div.className=`lw-wa-msg ${dir==='out'?'out':''}`;
    div.innerHTML=`
      <div class="lw-wa-bubble ${dir==='out'?'out':'in'}">
        <pre>${text}</pre>
        <div class="lw-wa-meta">
          <span class="lw-wa-time">${getTime()}</span>
          ${dir==='out'?'<span class="lw-wa-tick">✓✓</span>':''}
        </div>
      </div>`;
    body.appendChild(div); scrollWa();
  }
  function waTypingShow(){const b=$('lwWaBody');const d=document.createElement('div');d.className='lw-wa-typing';d.id='lwWaTyping';d.innerHTML=`<div class="lw-wa-typing-bub"><span></span><span></span><span></span></div>`;b.appendChild(d);scrollWa();}
  function waTypingHide(){const t=$('lwWaTyping');if(t)t.remove();}

  // ── AI messages ──────────────────────────────────────────
  function aiMsg(role, text) {
    const msgs=$('lwAiMsgs');
    const div=document.createElement('div');
    div.className=`lw-ai-msg ${role}`;
    div.innerHTML=`
      <div class="lw-ai-msg-av">${role==='ai'?'L':'✦'}</div>
      <div>
        <div class="lw-ai-bubble">${text.replace(/\n/g,'<br>')}</div>
        <div class="lw-ai-time">${getTime()}</div>
      </div>`;
    msgs.appendChild(div); scrollAi();
  }
  function aiTypingShow(){const m=$('lwAiMsgs');const d=document.createElement('div');d.className='lw-ai-typing';d.id='lwAiTyping';d.innerHTML=`<div class="lw-ai-msg-av">L</div><div class="lw-ai-typing-dots"><span></span><span></span><span></span></div>`;m.appendChild(d);scrollAi();}
  function aiTypingHide(){const t=$('lwAiTyping');if(t)t.remove();}

  // ── Open / Close ─────────────────────────────────────────
  function openWa(){
    waOpen=true; if(aiOpen)closeAi(); waEl.classList.add('open');
    if(!waGreeted){waGreeted=true;waTypingShow();setTimeout(()=>{waTypingHide();waMsg(online?CONFIG.whatsapp.greeting:CONFIG.whatsapp.awayMessage,'in');},900);}
    setTimeout(()=>$('lwWaInput')?.focus(),400);
  }
  function closeWa(){waOpen=false;waEl.classList.remove('open');}

  function openAi(){
    aiOpen=true; if(waOpen)closeWa(); aiEl.classList.add('open');
    $('lwAiDot').style.display='none';
    if(!aiGreeted){aiGreeted=true;aiTypingShow();setTimeout(()=>{aiTypingHide();aiMsg('ai',CONFIG.ai.greeting);},800);}
    setTimeout(()=>$('lwAiInput')?.focus(),400);
  }
  function closeAi(){aiOpen=false;aiEl.classList.remove('open');}

  // ── WhatsApp Send ────────────────────────────────────────
  function waSend(text){
    if(!text.trim())return;
    const inp=$('lwWaInput');
    if(inp){inp.value='';inp.style.height='auto';}
    $('lwWaQr').style.display='none';
    waMsg(text,'out');
    waTypingShow();
    setTimeout(()=>{
      waTypingHide();
      waMsg(online?`Got it! 🙌 We'll reply to you on WhatsApp right away.\n\nYou can also continue in the app by tapping the link below.`:`Message received! 📩 We're currently offline but will reply on WhatsApp ASAP!\n\n📱 +254 719 628 766`,'in');
      const url=`https://wa.me/${CONFIG.whatsapp.phone}?text=${encodeURIComponent(text)}`;
      const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';
      document.body.appendChild(a);a.click();a.remove();
    },1400);
  }

  // ── AI Send — smart replies + optional live API ──────────
  async function aiSend(text){
    if(!text.trim()||aiLoading)return;
    aiLoading=true;
    const inp=$('lwAiInput'), btn=$('lwAiSend');
    if(inp){inp.value='';inp.style.height='auto';}
    if(btn)btn.disabled=true;
    $('lwAiQr').style.display='none';
    aiMsg('user',text);
    aiHistory.push({role:'user',content:text});
    aiTypingShow();

    let reply = null;

    // Try live Claude API first
    try {
      const r = await fetch('/api/chat',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({system:CONFIG.ai.systemPrompt, messages:aiHistory})
      });
      if(r.ok){
        const d = await r.json();
        if(d.content?.[0]?.text) reply = d.content[0].text;
      }
    } catch(e) {
      // API not available — fall through to smart replies
    }

    // Fall back to smart replies if API didn't work
    if(!reply) reply = smartReply(text);

    aiTypingHide();
    aiHistory.push({role:'assistant', content:reply});
    aiMsg('ai', reply);

    aiLoading=false;
    if(btn)btn.disabled=false;
    if(inp)inp.focus();
  }

  // ── Events ───────────────────────────────────────────────
  $('lwWaToggle').addEventListener('click',()=>waOpen?closeWa():openWa());
  $('lwAiToggle').addEventListener('click',()=>aiOpen?closeAi():openAi());
  $('lwWaClose').addEventListener('click',closeWa);
  $('lwAiClose').addEventListener('click',closeAi);

  $('lwWaSend').addEventListener('click',()=>waSend($('lwWaInput').value.trim()));
  $('lwWaInput').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();waSend(e.target.value.trim());}});
  $('lwWaInput').addEventListener('input',function(){this.style.height='auto';this.style.height=Math.min(this.scrollHeight,80)+'px';});
  $('lwWaQr').addEventListener('click',e=>{if(e.target.classList.contains('lw-wa-qr-btn'))waSend(e.target.dataset.text);});

  $('lwAiSend').addEventListener('click',()=>aiSend($('lwAiInput').value.trim()));
  $('lwAiInput').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();aiSend(e.target.value.trim());}});
  $('lwAiInput').addEventListener('input',function(){this.style.height='auto';this.style.height=Math.min(this.scrollHeight,80)+'px';});
  $('lwAiQr').addEventListener('click',e=>{if(e.target.classList.contains('lw-ai-qr-btn'))aiSend(e.target.dataset.q);});

  document.addEventListener('click',e=>{
    if(waOpen&&!waEl.contains(e.target)&&!$('lwWaToggle').contains(e.target))closeWa();
    if(aiOpen&&!aiEl.contains(e.target)&&!$('lwAiToggle').contains(e.target))closeAi();
  });

  wrap.style.opacity='0';
  setTimeout(()=>{wrap.style.transition='opacity 0.5s ease';wrap.style.opacity='1';},700);

})();
