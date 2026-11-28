(function () {
  'use strict';
  const { ERAS, DINOS, DIET, QUIZ } = window.DinoData;
  const $ = id => document.getElementById(id);
  const app = $('app');
  const eraById = Object.fromEntries(ERAS.map(e => [e.id, e]));
  const ERA_STYLE = {
    triassic: { c: '#e08a2e', cd: '#a85a10', bg: '#ffe0b0', g: '#fff0d0', n: '#a85a10' },
    jurassic: { c: '#3fa35f', cd: '#1f7a40', bg: '#cdeeb8', g: '#eaf9d8', n: '#1f7a40' },
    cretaceous: { c: '#e0609a', cd: '#b02a68', bg: '#ffd6e6', g: '#fff0f6', n: '#b02a68' }
  };
  const REP = { triassic: ['coelophysis', 'plateosaurus'], jurassic: ['brachiosaurus', 'stegosaurus'], cretaceous: ['tyrannosaurus', 'triceratops'] };
  const ANGLES = { triassic: [-80, -50], jurassic: [-15, 15], cretaceous: [50, 80] };
  const SPR = 240 / 170; // 그림 가로세로 비율
  const FEET = 156 / 170;

  /* ---------- 저장: 만난 공룡 ---------- */
  const KEY = 'dino-seen-v1';
  let seen = new Set();
  try { seen = new Set(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch (e) { }
  function saveSeen() { try { localStorage.setItem(KEY, JSON.stringify([...seen])); } catch (e) { } }
  const TOTAL = Object.keys(DINOS).length;
  function updateStamps() {
    $('stampCount').textContent = `${seen.size}/${TOTAL}`;
    if (state.era) {
      const ids = eraById[state.era].layout.map(l => l[0]);
      $('sceneStamp').textContent = `⭐ ${ids.filter(i => seen.has(i)).length}/${ids.length}`;
    }
    document.querySelectorAll('.cr').forEach(el => { el.classList.toggle('seen', seen.has(el.dataset.id)); const m = el.querySelector('.nm i'); if (m) m.textContent = seen.has(el.dataset.id) ? '⭐' : ''; });
    document.querySelectorAll('.pill').forEach(p => {
      const ids = eraById[p.dataset.era].layout.map(l => l[0]);
      const done = ids.every(i => seen.has(i));
      let d = p.querySelector('.done'); if (done && !d) { d = document.createElement('span'); d.className = 'done'; d.textContent = '🏅'; p.appendChild(d); }
    });
  }

  /* ---------- 화면 크기 맞추기 ---------- */
  const state = { era: null, cardId: null, resizeT: 0 };
  function fit() {
    const vv = window.visualViewport;
    const w = Math.round(vv ? vv.width : window.innerWidth), h = Math.round(vv ? vv.height : window.innerHeight);
    app.style.setProperty('--app-w', w + 'px'); app.style.setProperty('--app-h', h + 'px');
  }
  function relayout() {
    fit();
    if (state.era) renderScene(state.era, true); else layoutHome();
  }
  function onResize() { clearTimeout(state.resizeT); state.resizeT = setTimeout(relayout, 120); }

  /* ---------- 별 ---------- */
  function makeStars() {
    const box = document.querySelector('#home .stars'); let h = '';
    let a = 7; const r = () => (a = (a * 9301 + 49297) % 233280) / 233280;
    for (let i = 0; i < 70; i++) { const s = 1.5 + r() * 3; h += `<i class="star" style="left:${r() * 100}%;top:${r() * 100}%;width:${s}px;height:${s}px;animation-delay:${-r() * 3}s;animation-duration:${2 + r() * 3}s"></i>`; }
    box.innerHTML = h;
  }

  /* ---------- 지구 ---------- */
  function globeMarkup(R) {
    const bx = 100 - 100 * Math.sin(32.5 * Math.PI / 180), by = 100 - 100 * Math.cos(32.5 * Math.PI / 180);
    const x1 = bx.toFixed(1), x2 = (200 - bx).toFixed(1), y1 = by.toFixed(1), y2 = (200 - by).toFixed(1);
    const left = `M-30,-30 L${x1},-30 L${x1},${y1} Q${(bx - 9).toFixed(1)},100 ${x1},${y2} L${x1},230 L-30,230Z`;
    const mid = `M${x1},-30 L${x2},-30 L${x2},${y1} Q${(200 - bx + 9).toFixed(1)},100 ${x2},${y2} L${x2},230 L${x1},230 L${x1},${y2} Q${(bx - 9).toFixed(1)},100 ${x1},${y1}Z`;
    const right = `M${x2},-30 L230,-30 L230,230 L${x2},230 L${x2},${y2} Q${(200 - bx + 9).toFixed(1)},100 ${x2},${y1}Z`;
    return `
    <defs>
      <radialGradient id="ocean" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#5fb7f5"/><stop offset=".6" stop-color="#2a7fd8"/><stop offset="1" stop-color="#174aa0"/></radialGradient>
      <radialGradient id="shade" cx=".36" cy=".3" r=".85"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset=".75" stop-color="#001040" stop-opacity=".1"/><stop offset="1" stop-color="#001040" stop-opacity=".5"/></radialGradient>
      <radialGradient id="atmo" cx=".5" cy=".5" r=".5"><stop offset=".9" stop-color="#8fd0ff" stop-opacity=".55"/><stop offset="1" stop-color="#8fd0ff" stop-opacity="0"/></radialGradient>
      <clipPath id="cg"><circle cx="100" cy="100" r="100"/></clipPath>
      <clipPath id="cL"><path d="${left}"/></clipPath><clipPath id="cM"><path d="${mid}"/></clipPath><clipPath id="cR"><path d="${right}"/></clipPath>
    </defs>
    <circle cx="100" cy="100" r="112" fill="url(#atmo)"/>
    <g class="globe-float">
    <g clip-path="url(#cg)">
      <circle cx="100" cy="100" r="100" fill="url(#ocean)"/>
      <g clip-path="url(#cL)">
        <path d="M-6,64 C10,40 36,34 50,50 C60,60 46,78 56,92 C62,108 44,134 30,138 C12,134 -2,110 -6,90Z" fill="#e8c27a" stroke="#c99650" stroke-width="2.4"/>
        <path d="M14,150 C24,142 40,146 38,158 C34,168 18,166 14,150Z" fill="#e8c27a" stroke="#c99650" stroke-width="2.2"/>
        <path d="M10,70 l12,-8 l10,6 l-4,12 l-14,2Z M26,100 l10,-6 l8,10 l-10,8Z" fill="#c9693f" opacity=".75"/>
        <circle cx="22" cy="118" r="4" fill="#8fae55"/><circle cx="34" cy="84" r="3.5" fill="#8fae55"/><circle cx="14" cy="96" r="3" fill="#8fae55"/>
        <rect x="-10" y="-10" width="70" height="220" fill="#ffb95e" opacity=".14"/>
      </g>
      <g clip-path="url(#cM)">
        <path d="M58,26 C78,16 104,24 112,42 C120,58 100,68 106,84 C112,102 100,120 86,128 C72,134 62,118 66,102 C68,86 52,74 54,56 C54,42 52,30 58,26Z" fill="#62b95a" stroke="#3f8f3f" stroke-width="2.4"/>
        <path d="M120,138 C132,130 146,136 142,150 C136,160 120,156 120,138Z" fill="#62b95a" stroke="#3f8f3f" stroke-width="2.2"/>
        <path d="M82,48 l8,-14 l8,14Z" fill="#8a5a4a"/><path d="M86,40 l4,-6 l4,6Z" fill="#ff7a2e"/>
        <circle cx="76" cy="72" r="5" fill="#3f9456"/><circle cx="92" cy="96" r="4.5" fill="#3f9456"/><circle cx="82" cy="110" r="4" fill="#3f9456"/><circle cx="98" cy="62" r="4" fill="#3f9456"/>
        <rect x="55" y="-10" width="95" height="220" fill="#2fe07a" opacity=".1"/>
      </g>
      <g clip-path="url(#cR)">
        <path d="M120,42 C142,30 170,44 176,66 C180,84 166,92 162,108 C158,124 140,132 128,122 C118,112 130,98 124,84 C118,70 112,54 120,42Z" fill="#7bc77a" stroke="#4a9a4a" stroke-width="2.4"/>
        <path d="M148,50 q-14,22 6,36 q14,12 -2,34" stroke="#6cc4f0" stroke-width="5" fill="none" stroke-linecap="round"/>
        <circle cx="136" cy="64" r="4" fill="#ff8fb3"/><circle cx="160" cy="76" r="4" fill="#ff8fb3"/><circle cx="144" cy="104" r="4" fill="#ffd54a"/><circle cx="158" cy="94" r="3.5" fill="#fff"/><circle cx="130" cy="86" r="3.5" fill="#ffc1d6"/>
        <rect x="150" y="-10" width="100" height="220" fill="#ff7aa8" opacity=".1"/>
      </g>
      <g class="gcloud" fill="#fff" opacity=".6"><ellipse cx="60" cy="38" rx="26" ry="5.5"/><ellipse cx="128" cy="150" rx="30" ry="6"/><ellipse cx="40" cy="132" rx="20" ry="5"/><ellipse cx="150" cy="30" rx="22" ry="5"/></g>
      <path d="${`M${x1},${y1} Q${(bx - 9).toFixed(1)},100 ${x1},${y2}`}" stroke="#fff" stroke-width="2.6" stroke-dasharray="1 7" stroke-linecap="round" fill="none" opacity=".95"/>
      <path d="${`M${x2},${y1} Q${(200 - bx + 9).toFixed(1)},100 ${x2},${y2}`}" stroke="#fff" stroke-width="2.6" stroke-dasharray="1 7" stroke-linecap="round" fill="none" opacity=".95"/>
      <circle cx="100" cy="100" r="100" fill="url(#shade)" pointer-events="none"/>
      <g clip-path="url(#cg)">
        <path class="band" data-era="triassic" d="${left}"/><path class="band" data-era="jurassic" d="${mid}"/><path class="band" data-era="cretaceous" d="${right}"/>
      </g>
    </g>
    <circle cx="100" cy="100" r="100" fill="none" stroke="#bfe3ff" stroke-width="1.6" opacity=".6" pointer-events="none"/>
    </g>`;
  }

  function layoutHome() {
    const W = app.clientWidth, H = app.clientHeight;
    const portrait = H > W;
    const topH = Math.max(52, Math.min(72, H * 0.085));
    app.style.setProperty('--topH', topH + 'px');
    const sw = Math.max(96, Math.min(portrait ? 190 : 165, Math.min(W, H) * 0.26));
    const sh = sw / SPR;
    const bottom = 12;
    let R = Math.min((W - 2 * (sh * 1.12 + 8)) / 2, (H - topH - sh - 6) / 2 * (portrait ? 1 : 1.1));
    R = Math.floor(R);
    const cy = portrait ? Math.max(topH + sh + R + 4, (topH + H) / 2) : topH + sh + R + 4;
    const cx = W / 2;
    const g = $('globe');
    g.setAttribute('viewBox', '0 0 200 200');
    g.style.left = (cx - R) + 'px'; g.style.top = (cy - R) + 'px'; g.style.width = 2 * R + 'px'; g.style.height = 2 * R + 'px';
    g.innerHTML = globeMarkup(R);
    // 공룡
    let h = '';
    ERAS.forEach(era => {
      REP[era.id].forEach((id, k) => {
        const phi = ANGLES[era.id][k], rad = phi * Math.PI / 180;
        const px = cx + R * Math.sin(rad), py = cy - R * Math.cos(rad);
        const d = DINOS[id];
        const w = sw * Math.min(1.08, d.sc), hh = w / SPR;
        const face = k === 0 ? 1 : -1;
        h += `<div class="hd" role="button" tabindex="0" aria-label="${d.name} – ${era.name}" data-era="${era.id}" data-id="${id}" style="left:${(px - w / 2).toFixed(1)}px;top:${(py - hh * FEET + hh * 0.07).toFixed(1)}px;width:${w.toFixed(1)}px;height:${hh.toFixed(1)}px;transform:rotate(${phi}deg);transform-origin:50% ${FEET * 100}%;--d:${-(k * 0.7 + ERAS.indexOf(era) * 0.3)}s">` +
          `<div class="flip" style="transform:scaleX(${face})"><div class="walk${k ? ' rev' : ''}" style="--amp:${(w * 0.05).toFixed(1)}px;--wd:${(9 + k * 2 + ERAS.indexOf(era)).toFixed(1)}s;--wl:${(-k * 3).toFixed(1)}s">${window.DinoArt.svg(id)}</div></div></div>`;
      });
    });
    $('homeDinos').innerHTML = h;
    // 시대 이름표
    const fs = Math.round(R * 0.108);
    const pos = { triassic: [-0.57, 0.14], jurassic: [0, 0.58], cretaceous: [0.57, 0.14] };
    let p = '';
    ERAS.forEach(e => {
      const st = ERA_STYLE[e.id];
      p += `<button type="button" class="pill" data-era="${e.id}" style="left:${(cx + pos[e.id][0] * R).toFixed(1)}px;top:${(cy + pos[e.id][1] * R).toFixed(1)}px;font-size:${fs}px;--c:${st.c};--cd:${st.cd}"><b>${e.name}</b><small>${e.time}</small></button>`;
    });
    $('homePills').innerHTML = p;
    $('homePills').style.pointerEvents = 'none';
    updateStamps();
  }

  /* ---------- 시대 화면 ---------- */
  function renderScene(eraId, keep) {
    const era = eraById[eraId], st = ERA_STYLE[eraId];
    state.era = eraId;
    $('home').hidden = true; $('scene').hidden = false;
    const W = app.clientWidth, H = app.clientHeight, portrait = H > W;
    const sc = window.DinoScenes.build(eraId, W, H);
    $('sceneBg').innerHTML = sc.bg; $('sceneFg').innerHTML = sc.fg;
    $('sceneTitle').innerHTML = `<span class="tpill">${era.name}<small>${era.time}</small></span>`;
    $('sceneTitle').style.setProperty('--ec', st.cd);
    const hz = sc.hz, gh = H - hz;
    const base = Math.min(W * (portrait ? 0.3 : 0.235), H * 0.285);
    const nmfs0 = Math.max(13, Math.min(20, W * 0.0165 + (portrait ? 4 : 0)));
    const lblH = nmfs0 * 1.8 + base * 1.04 * 1.2 / SPR * 0.09;
    const rowEnd = (H - lblH - 8 - hz) / gh;
    const rowF = portrait ? [0.2 * rowEnd, 0.57 * rowEnd, rowEnd] : [0.3 * rowEnd, 0.64 * rowEnd, rowEnd];
    const depth = [0.82, 0.94, 1.04];
    const nmfs = Math.max(13, Math.min(20, W * 0.0165 + (portrait ? 4 : 0)));
    let h = '';
    era.layout.forEach((l, i) => {
      const [id, xp, row] = l, d = DINOS[id];
      const fly = row === 'fly';
      const r = fly ? 1 : row;
      const w = fly ? base * 1.0 * d.sc : base * depth[r] * d.sc;
      const hh = w / SPR;
      const amp = fly ? W * 0.28 : Math.min(W * 0.03, 40);
      let cx = W * xp / 100;
      if (!fly) cx = Math.max(w / 2 + amp + 6, Math.min(W - w / 2 - amp - 6, cx));
      else cx = W * 0.5;
      const fy = fly ? hz * (portrait ? 0.78 : 0.8) + hh * 0.2 : hz + gh * rowF[r];
      const top = fly ? fy - hh * 0.5 : fy - hh * FEET;
      const z = fly ? 30 : 2 + r * 10;
      const rev = i % 2;
      const dur = fly ? 26 : 12 + (i * 7 % 6);
      const delay = -((i * 3.7) % dur);
      h += `<div class="cr${d.friend ? ' friend' : ''}${fly ? ' fly' : ''}" role="button" tabindex="0" aria-label="${d.name}" data-id="${id}" style="left:${(cx - w / 2).toFixed(1)}px;top:${top.toFixed(1)}px;width:${w.toFixed(1)}px;height:${hh.toFixed(1)}px;--z:${z};--d:${(-(i * 0.37)).toFixed(2)}s;--nmfs:${nmfs}px">` +
        (fly ? `<div class="flight" style="--amp:${amp.toFixed(0)}px;--fy:${(hz * 0.18).toFixed(0)}px;--wd:${dur}s;--wl:${delay}s"><div class="flip">${window.DinoArt.svg(id)}</div></div><span class="nm"><i></i>${d.name}<i></i></span>` :
          `<div class="walk${rev ? ' rev' : ''}" style="--amp:${amp.toFixed(1)}px;--wd:${dur}s;--wl:${delay.toFixed(1)}s"><div class="flip">${window.DinoArt.svg(id)}</div></div><span class="nm" style="animation:lblwalk ${dur / 2}s ease-in-out infinite alternate${rev ? '-reverse' : ''};animation-delay:${(delay / 2).toFixed(1)}s;--amp:${amp.toFixed(1)}px">${d.name}<i></i></span>`) +
        `</div>`;
    });
    $('creatures').innerHTML = h;
    // 날아다니는 친구는 이름표를 따라가지 않게 고정
    document.querySelectorAll('.cr.fly .nm').forEach(n => { n.style.top = '100%'; n.style.bottom = 'auto'; n.style.transform = 'translate(-50%, 0)'; n.style.display = 'none'; });
    updateStamps();
  }

  function goHome() {
    closeCard(); state.era = null;
    $('scene').hidden = true; $('home').hidden = false;
    layoutHome();
  }

  /* ---------- 읽어 주기 ---------- */
  function stripForSpeech(text) {
    return String(text)
      .replace(/\uFE0F/g, '').replace(/\u200D/g, '')
      .replace(/\p{Extended_Pictographic}/gu, '')
      .replace(/[\u{1F1E6}-\u{1F1FF}]/gu, '').replace(/[\u{1F3FB}-\u{1F3FF}]/gu, '')
      .replace(/[\u20E3\uFE0E]/g, '').replace(/[\u{E0020}-\u{E007F}]/gu, '').replace(/[\uFE00-\uFE0F]/g, '')
      .replace(/[\u2190-\u21FF\u2300-\u23FF\u2600-\u27BF\u2B00-\u2BFF\u25A0-\u25FF]/g, '')
      .replace(/[▶◀✕✓★☆●○■□♥♡]/g, '')
      .replace(/[()\[\]{}"“”]/g, ' ').replace(/['‘’]/g, '')
      .replace(/\s+/g, ' ').trim();
  }
  let speakToken = 0, speaking = false, activeBtn = null;
  const synth = window.speechSynthesis;
  function setBtn(btn, on) {
    if (!btn) return;
    btn.classList.toggle('playing', on);
    btn.textContent = on ? '⏹ 그만 듣기' : '🔊 읽어 줘';
  }
  function stopSpeak() {
    speakToken++; speaking = false;
    if (synth) { try { synth.cancel(); } catch (e) { } }
    setBtn(activeBtn, false); activeBtn = null;
  }
  function pickVoice() {
    if (!synth) return null;
    const v = synth.getVoices();
    return v.find(x => x.lang === 'ko-KR') || v.find(x => /^ko/i.test(x.lang)) || null;
  }
  function chunks(text) {
    const parts = text.split(/(?<=[.!?。])\s+/).filter(Boolean), out = [];
    parts.forEach(p => { const last = out[out.length - 1]; if (last && (last + ' ' + p).length < 90) out[out.length - 1] = last + ' ' + p; else out.push(p); });
    return out;
  }
  function speak(raw, btn) {
    if (!synth || typeof SpeechSynthesisUtterance === 'undefined') { if (btn) btn.textContent = '이 기기는 읽기를 못 해요'; return; }
    if (speaking && activeBtn === btn) { stopSpeak(); return; }
    stopSpeak();
    const text = stripForSpeech(raw); if (!text) return;
    const token = ++speakToken; speaking = true; activeBtn = btn; setBtn(btn, true);
    const list = chunks(text), voice = pickVoice();
    list.forEach((t, i) => {
      const u = new SpeechSynthesisUtterance(t);
      u.lang = 'ko-KR'; u.rate = 0.85; u.pitch = 1.1; if (voice) u.voice = voice;
      const done = () => { if (token === speakToken && i === list.length - 1) { speaking = false; setBtn(btn, false); activeBtn = null; } };
      u.onend = done; u.onerror = done;
      synth.speak(u);
    });
  }
  if (synth) { synth.getVoices(); synth.addEventListener && synth.addEventListener('voiceschanged', () => synth.getVoices()); }

  function cardSpeech(d) {
    const era = eraById[d.era];
    const dt = DIET[d.diet];
    const parts = [d.name + '.', d.friend ? '공룡은 아니고, 공룡의 친구예요.' : '', `${era.name}에 살았어요. ${d.time}이에요.`];
    d.facts.forEach(f => parts.push(f[1]));
    parts.push('쉿! 나만 아는 비밀.', d.secret);
    return parts.join(' ');
  }

  /* ---------- 카드 ---------- */
  function openCard(id) {
    const d = DINOS[id], st = ERA_STYLE[d.era], era = eraById[d.era];
    stopSpeak(); state.cardId = id;
    seen.add(id); saveSeen(); updateStamps();
    const box = $('cardBox');
    box.style.setProperty('--ebg', st.bg); box.style.setProperty('--eg', st.g); box.style.setProperty('--ec', st.c); box.style.setProperty('--en', st.n);
    $('cArt').innerHTML = window.DinoArt.svg(id);
    $('cName').textContent = d.name;
    const dt = DIET[d.diet];
    $('cChips').innerHTML = `<span class="era">${era.name}</span><span>${d.time}</span><span>${dt[0]} ${dt[1]}</span>` +
      (d.friend ? '<span class="friend">공룡의 친구</span>' : '') + (d.korea ? '<span class="korea">🇰🇷 한국 공룡</span>' : '');
    $('cFacts').innerHTML = d.facts.map(f => `<li><span class="ic">${f[0]}</span><span>${f[1]}</span></li>`).join('');
    $('cSecret').textContent = d.secret;
    $('card').hidden = false; document.body.classList.add('pausedAnim');
    $('cText').scrollTop = 0;
    const ids = eraById[d.era].layout.map(l => l[0]);
    $('btnPrev').style.visibility = $('btnNext').style.visibility = state.era ? 'visible' : 'hidden';
    setBtn($('btnSpeak'), false);
    $('cardClose').focus({ preventScroll: true });
  }
  function closeCard() {
    stopSpeak(); $('card').hidden = true; state.cardId = null;
    if ($('quiz').hidden) document.body.classList.remove('pausedAnim');
  }
  function stepCard(dir) {
    const d = DINOS[state.cardId]; if (!d) return;
    const ids = eraById[d.era].layout.map(l => l[0]);
    const i = ids.indexOf(state.cardId);
    openCard(ids[(i + dir + ids.length) % ids.length]);
  }

  /* ---------- 퀴즈 ---------- */
  const qz = { list: [], i: 0, score: 0, tries: 0, cur: null };
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function startQuiz() {
    qz.list = shuffle(QUIZ).slice(0, 5); qz.i = 0; qz.score = 0;
    $('quiz').hidden = false; document.body.classList.add('pausedAnim');
    showQ();
  }
  function showQ() {
    stopSpeak();
    if (qz.i >= qz.list.length) return finishQuiz();
    const q = qz.list[qz.i]; qz.tries = 0;
    let opts = q.opts.map((t, k) => ({ t, k, art: q.art && q.art[k] }));
    if (q.art) opts = shuffle(opts);
    qz.cur = { q, opts };
    $('qStep').textContent = `${qz.i + 1} / ${qz.list.length}`;
    $('qText').textContent = q.q;
    $('qMsg').textContent = ''; $('qNext').hidden = true;
    $('qOpts').innerHTML = opts.map((o, n) => `<button type="button" class="opt${o.art ? '' : ' eraopt'}" data-n="${n}">${o.art ? `<span class="art">${window.DinoArt.svg(o.art)}</span>` : ''}<span>${o.t}</span></button>`).join('');
    $('btnQSpeak').style.display = '';
  }
  function answer(n) {
    const { q, opts } = qz.cur, o = opts[n];
    const btn = $('qOpts').children[n];
    if (btn.classList.contains('no') || btn.classList.contains('ok')) return;
    if (o.k === q.a) {
      btn.classList.add('ok'); if (qz.tries === 0) qz.score++;
      $('qMsg').style.color = '#2a8a4a'; $('qMsg').textContent = '맞았어요! 👏 ' + q.say;
      [...$('qOpts').children].forEach(b => b.disabled = true);
      $('qNext').hidden = false; $('qNext').textContent = qz.i === qz.list.length - 1 ? '결과 보기 ▶' : '다음 ▶';
      speak('맞았어요! ' + q.say, null);
    } else {
      qz.tries++; btn.classList.add('no');
      $('qMsg').style.color = '#d0482a'; $('qMsg').textContent = '아쉬워요! 다시 골라 봐요 🤔';
    }
  }
  function finishQuiz() {
    const n = qz.score, t = qz.list.length;
    $('qStep').textContent = '끝!';
    $('qText').textContent = `${t}문제 중 ${n}개를 맞혔어요! ${n === t ? '🏆 공룡 박사님!' : n >= 3 ? '🎉 잘했어요!' : '💪 또 해 봐요!'}`;
    $('qOpts').innerHTML = '';
    $('qMsg').textContent = ''; $('qNext').hidden = false; $('qNext').textContent = '다시 하기 ↻';
    $('qNext').dataset.again = '1'; $('btnQSpeak').style.display = 'none';
  }
  function closeQuiz() { stopSpeak(); $('quiz').hidden = true; if ($('card').hidden) document.body.classList.remove('pausedAnim'); }

  /* ---------- 이벤트 ---------- */
  function activate(el) {
    if (!el) return;
    if (el.classList.contains('cr')) {
      el.classList.remove('hop'); void el.offsetWidth; el.classList.add('hop');
      setTimeout(() => el.classList.remove('hop'), 450);
      setTimeout(() => openCard(el.dataset.id), 120);
    }
  }
  function bind() {
    $('creatures').addEventListener('click', e => activate(e.target.closest('.cr')));
    $('creatures').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(e.target.closest('.cr')); } });
    $('homeDinos').addEventListener('click', e => { const d = e.target.closest('.hd'); if (d) renderScene(d.dataset.era); });
    $('homeDinos').addEventListener('keydown', e => { const d = e.target.closest('.hd'); if (d && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); renderScene(d.dataset.era); } });
    $('homePills').addEventListener('click', e => { const p = e.target.closest('.pill'); if (p) renderScene(p.dataset.era); });
    $('globe').addEventListener('click', e => { const b = e.target.closest('.band'); if (b) renderScene(b.dataset.era); });
    $('globe').addEventListener('pointerdown', e => { const b = e.target.closest('.band'); if (b) { b.classList.add('press'); setTimeout(() => b.classList.remove('press'), 300); } });
    $('btnBack').addEventListener('click', goHome);
    $('cardClose').addEventListener('click', closeCard);
    $('card').addEventListener('click', e => { if (e.target === $('card')) closeCard(); });
    $('btnSpeak').addEventListener('click', () => { const d = DINOS[state.cardId]; if (d) speak(cardSpeech(d), $('btnSpeak')); });
    $('btnPrev').addEventListener('click', () => stepCard(-1));
    $('btnNext').addEventListener('click', () => stepCard(1));
    $('btnQuiz').addEventListener('click', startQuiz);
    $('quizClose').addEventListener('click', closeQuiz);
    $('qOpts').addEventListener('click', e => { const b = e.target.closest('.opt'); if (b && !b.disabled) answer(+b.dataset.n); });
    $('qNext').addEventListener('click', () => { if ($('qNext').dataset.again) { delete $('qNext').dataset.again; startQuiz(); } else { qz.i++; showQ(); } });
    $('btnQSpeak').addEventListener('click', () => speak(qz.cur ? qz.cur.q : '', $('btnQSpeak')));
    window.addEventListener('keydown', e => { if (e.key === 'Escape') { if (!$('card').hidden) closeCard(); else if (!$('quiz').hidden) closeQuiz(); else if (state.era) goHome(); } });
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    if (window.visualViewport) window.visualViewport.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', () => { if (document.hidden) stopSpeak(); });
    window.addEventListener('pagehide', stopSpeak);
  }

  /* 시작 */
  fit(); makeStars(); bind(); layoutHome();
  window.__dino = { stripForSpeech, cardSpeech, openCard, renderScene, goHome, state };
  if ('serviceWorker' in navigator && /^https?:/.test(location.protocol)) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(() => { }));
  }
})();
