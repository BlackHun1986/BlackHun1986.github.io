/* 시대별 배경 그림 (화면 크기에 맞춰 SVG로 그려요) */
(function () {
  function rng(seed) { let a = seed >>> 0; return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function mix(a, b, t) {
    const pa = [1, 3, 5].map(i => parseInt(a.substr(i, 2), 16)), pb = [1, 3, 5].map(i => parseInt(b.substr(i, 2), 16));
    return '#' + pa.map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, '0')).join('');
  }
  const r1 = n => Math.round(n * 10) / 10;
  const dk = (c, t = .3) => mix(c, '#1d2a1a', t), lt = (c, t = .3) => mix(c, '#ffffff', t);

  function leaf(x, y, len, ang, w, fill, edge, droop = 0.22) {
    const tx = x + Math.cos(ang) * len, ty = y + Math.sin(ang) * len + len * droop * Math.abs(Math.cos(ang));
    const mx = x + Math.cos(ang) * len * 0.5, my = y + Math.sin(ang) * len * 0.5 - len * 0.1;
    const nx = -Math.sin(ang) * w, ny = Math.cos(ang) * w;
    return `<path d="M${r1(x)},${r1(y)} Q${r1(mx + nx)},${r1(my + ny)} ${r1(tx)},${r1(ty)} Q${r1(mx - nx)},${r1(my - ny)} ${r1(x)},${r1(y)}Z" fill="${fill}" stroke="${edge}" stroke-width="${r1(Math.max(1.2, len * 0.025))}" stroke-linejoin="round"/>`;
  }
  function fern(x, y, s, col, n = 9) {
    let o = '';
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1), ang = -Math.PI * (0.88 - t * 0.76);
      o += leaf(x, y, s * (0.75 + 0.25 * Math.sin(t * Math.PI)), ang, s * 0.09, i % 2 ? col : lt(col, .12), dk(col, .35));
    }
    return o;
  }
  function cycad(x, y, s, col, trunk = '#8a6a4a') {
    let o = `<path d="M${x - s * .09},${y} L${x - s * .06},${y - s * .42} L${x + s * .06},${y - s * .42} L${x + s * .09},${y}Z" fill="${trunk}" stroke="${dk(trunk, .4)}" stroke-width="2" stroke-linejoin="round"/>`;
    for (let k = 0; k < 4; k++) o += `<path d="M${x - s * .08},${y - s * (.08 + k * .09)} h${s * .16}" stroke="${dk(trunk, .35)}" stroke-width="2" opacity=".6"/>`;
    for (let i = 0; i < 9; i++) {
      const ang = -Math.PI + (i / 8) * Math.PI;
      o += leaf(x, y - s * .42, s * .62, ang, s * .085, i % 2 ? col : lt(col, .15), dk(col, .4), 0.32);
    }
    return o;
  }
  function conifer(x, y, h, col) {
    const tr = '#7a5538';
    let o = `<rect x="${r1(x - h * .035)}" y="${r1(y - h * .22)}" width="${r1(h * .07)}" height="${r1(h * .22)}" rx="3" fill="${tr}" stroke="${dk(tr, .4)}" stroke-width="2"/>`;
    for (let i = 0; i < 4; i++) {
      const yy = y - h * (0.16 + i * 0.2), w = h * (0.42 - i * 0.08), hh = h * 0.32;
      o += `<path d="M${r1(x - w / 2)},${r1(yy)} L${r1(x)},${r1(yy - hh)} L${r1(x + w / 2)},${r1(yy)}Z" fill="${i % 2 ? col : lt(col, .1)}" stroke="${dk(col, .35)}" stroke-width="${r1(h * 0.03)}" stroke-linejoin="round"/>`;
    }
    return o;
  }
  function araucaria(x, y, h, col) {
    const tr = '#8a6a4a';
    let o = `<path d="M${r1(x - h * .03)},${y} L${r1(x - h * .02)},${r1(y - h * .75)} L${r1(x + h * .02)},${r1(y - h * .75)} L${r1(x + h * .03)},${y}Z" fill="${tr}" stroke="${dk(tr, .4)}" stroke-width="2" stroke-linejoin="round"/>`;
    [[.78, .34, .13], [.62, .26, .1], [.5, .2, .08]].forEach((p, i) => {
      o += `<ellipse cx="${x}" cy="${r1(y - h * p[0])}" rx="${r1(h * p[1])}" ry="${r1(h * p[2])}" fill="${i % 2 ? col : lt(col, .12)}" stroke="${dk(col, .35)}" stroke-width="${r1(h * .025)}"/>`;
    });
    return o;
  }
  function horsetail(x, y, s, col) {
    let o = '';
    [-.12, 0, .1, .2].forEach((dx, i) => {
      const hh = s * (0.7 + (i % 2) * 0.3), xx = x + dx * s;
      o += `<path d="M${r1(xx)},${y} L${r1(xx + dx * 8)},${r1(y - hh)}" stroke="${dk(col, .3)}" stroke-width="${r1(s * .07)}" stroke-linecap="round"/>`;
      o += `<path d="M${r1(xx)},${y} L${r1(xx + dx * 8)},${r1(y - hh)}" stroke="${col}" stroke-width="${r1(s * .04)}" stroke-linecap="round"/>`;
      for (let k = 1; k < 5; k++) {
        const yy = y - hh * k / 5, w = s * .1 * (1 - k / 6);
        o += `<path d="M${r1(xx - w + dx * 8 * k / 5)},${r1(yy + 2)} L${r1(xx + dx * 8 * k / 5)},${r1(yy - 5)} L${r1(xx + w + dx * 8 * k / 5)},${r1(yy + 2)}" fill="none" stroke="${dk(col, .2)}" stroke-width="2" stroke-linecap="round"/>`;
      }
    });
    return o;
  }
  function broadleaf(x, y, h, col, blossom) {
    const tr = '#8a5f3d';
    let o = `<path d="M${r1(x - h * .05)},${y} Q${r1(x - h * .03)},${r1(y - h * .25)} ${r1(x - h * .02)},${r1(y - h * .45)} L${r1(x + h * .02)},${r1(y - h * .45)} Q${r1(x + h * .03)},${r1(y - h * .25)} ${r1(x + h * .05)},${y}Z" fill="${tr}" stroke="${dk(tr, .4)}" stroke-width="2" stroke-linejoin="round"/>`;
    [[0, .62, .26], [-.18, .5, .2], [.18, .5, .2], [-.08, .78, .2], [.1, .74, .18]].forEach((p, i) => {
      o += `<circle cx="${r1(x + p[0] * h)}" cy="${r1(y - p[1] * h)}" r="${r1(p[2] * h)}" fill="${i % 2 ? col : lt(col, .1)}" stroke="${dk(col, .3)}" stroke-width="${r1(h * .02)}"/>`;
    });
    if (blossom) {
      const R = rng(Math.round(x * 7 + y));
      for (let i = 0; i < 9; i++) {
        const a = R() * 6.28, d = R() * h * .34;
        const px = x + Math.cos(a) * d * 1.1, py = y - h * .62 + Math.sin(a) * d * .8;
        o += flower(px, py, h * .045, i % 3 ? blossom : '#ffffff');
      }
    }
    return o;
  }
  function flower(x, y, r, col) {
    let o = '';
    for (let i = 0; i < 5; i++) { const a = i * 1.2566; o += `<circle cx="${r1(x + Math.cos(a) * r)}" cy="${r1(y + Math.sin(a) * r)}" r="${r1(r * .75)}" fill="${col}"/>`; }
    return o + `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(r * .6)}" fill="#ffd54a"/>`;
  }
  function rock(x, y, s, col) {
    return `<path d="M${r1(x - s)},${y} Q${r1(x - s * .9)},${r1(y - s * .7)} ${r1(x - s * .2)},${r1(y - s * .8)} Q${r1(x + s * .7)},${r1(y - s * .9)} ${r1(x + s)},${y}Z" fill="${col}" stroke="${dk(col, .35)}" stroke-width="2.4" stroke-linejoin="round"/>` +
      `<path d="M${r1(x - s * .5)},${r1(y - s * .45)} q${r1(s * .3)},${r1(-s * .2)} ${r1(s * .6)},${r1(-s * .1)}" stroke="${lt(col, .5)}" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".7"/>`;
  }
  function mesa(x, y, w, h, col) {
    const top = lt(col, .12);
    let o = `<path d="M${r1(x)},${y} L${r1(x + w * .08)},${r1(y - h)} L${r1(x + w * .92)},${r1(y - h)} L${r1(x + w)},${y}Z" fill="${col}"/>`;
    for (let i = 1; i < 5; i++) o += `<path d="M${r1(x + w * .04 * (1 - i / 5))},${r1(y - h * i / 5)} H${r1(x + w - w * .04 * (1 - i / 5))}" stroke="${i % 2 ? dk(col, .12) : lt(col, .15)}" stroke-width="${r1(h * .07)}" opacity=".6"/>`;
    return o + `<rect x="${r1(x + w * .08)}" y="${r1(y - h)}" width="${r1(w * .84)}" height="${r1(h * .08)}" fill="${top}"/>`;
  }
  function hills(W, y, amp, col, R, step = 140) {
    let d = `M0,${r1(y + amp * 3)} L0,${r1(y)}`;
    for (let x = 0; x <= W + step; x += step) d += ` Q${r1(x - step / 2)},${r1(y - amp * (0.5 + R()))} ${r1(x)},${r1(y - amp * R() * 0.4)}`;
    return `<path d="${d} L${W + step},${r1(y + amp * 3)}Z" fill="${col}"/>`;
  }
  function cloud(x, y, s, dur, delay, op = .95) {
    return `<g class="cloud" style="animation-duration:${dur}s;animation-delay:${delay}s"><g opacity="${op}" fill="#fff">` +
      `<ellipse cx="${x}" cy="${y}" rx="${s}" ry="${s * .38}"/><ellipse cx="${x - s * .5}" cy="${y + s * .08}" rx="${s * .55}" ry="${s * .3}"/><ellipse cx="${x + s * .5}" cy="${y + s * .08}" rx="${s * .6}" ry="${s * .32}"/><ellipse cx="${x + s * .1}" cy="${y - s * .22}" rx="${s * .5}" ry="${s * .3}"/></g></g>`;
  }
  function volcano(x, y, w, h) {
    return `<g>` +
      `<path d="M${x - w / 2},${y} L${x - w * .09},${y - h} Q${x},${y - h * 1.06} ${x + w * .09},${y - h} L${x + w / 2},${y}Z" fill="#7a5a52" stroke="#4e3731" stroke-width="3" stroke-linejoin="round"/>` +
      `<path d="M${x - w * .09},${y - h} Q${x},${y - h * .93} ${x + w * .09},${y - h} L${x + w * .13},${y - h * .8} L${x - w * .12},${y - h * .8}Z" fill="#ff7a2e"/>` +
      `<path d="M${x - w * .1},${y - h * .8} q${w * .02},${h * .25} ${-w * .02},${h * .5} M${x + w * .05},${y - h * .8} q${w * .04},${h * .3} ${w * .06},${h * .6}" stroke="#ff9a3e" stroke-width="5" fill="none" stroke-linecap="round"/>` +
      `<path d="M${x - w * .3},${y - h * .35} q${w * .12},${-h * .08} ${w * .24},${h * .03}" stroke="#a07a6c" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/>` +
      [0, 1, 2].map(i => `<circle class="smoke" style="animation-delay:${-i * 1.6}s" cx="${x + (i - 1) * 6}" cy="${y - h * 1.05}" r="${w * .06}" fill="#d8d2d0"/>`).join('') + `</g>`;
  }
  function river(W, y, h, col) {
    let d = `M0,${y}`; const n = 7;
    for (let i = 0; i <= n; i++) d += ` Q${r1(W * (i + .5) / (n + 1))},${r1(y + (i % 2 ? -h * .7 : h * .7))} ${r1(W * (i + 1) / (n + 1))},${y}`;
    let d2 = `L${W},${y + h}`; for (let i = n; i >= 0; i--) d2 += ` Q${r1(W * (i + .5) / (n + 1))},${r1(y + h + (i % 2 ? -h * .7 : h * .7))} ${r1(W * i / (n + 1))},${y + h}`;
    let o = `<path d="${d} ${d2}Z" fill="${col}" stroke="${dk(col, .25)}" stroke-width="3"/>`;
    for (let i = 0; i < 9; i++) { const sx = W * (i + .4) / 9; o += `<path d="M${r1(sx)},${r1(y + h * .5)} q${r1(W * .02)},${r1(-h * .15)} ${r1(W * .04)},0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>`; }
    return o;
  }

  function build(eraId, W, H) {
    const portrait = H > W;
    const hz = H * (portrait ? 0.3 : 0.37);
    const seed = { triassic: 11, jurassic: 23, cretaceous: 37 }[eraId];
    const R = rng(seed);
    const gh = H - hz;
    let defs = '', sky = '', far = '', gnd = '', back = '', fg = '';
    const U = Math.min(W, H * 1.4); // 그림 크기 기준
    if (eraId === 'triassic') {
      defs = `<linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffc98f"/><stop offset=".6" stop-color="#ffe4bd"/><stop offset="1" stop-color="#fff2d9"/></linearGradient>
        <linearGradient id="gd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ecc07c"/><stop offset="1" stop-color="#d89c5a"/></linearGradient>
        <radialGradient id="sun"><stop offset="0" stop-color="#fffbe0"/><stop offset=".5" stop-color="#ffe9a8" stop-opacity=".9"/><stop offset="1" stop-color="#ffd88a" stop-opacity="0"/></radialGradient>`;
      sky = `<rect width="${W}" height="${hz + 4}" fill="url(#sk)"/><circle cx="${W * .78}" cy="${hz * .5}" r="${hz * .55}" fill="url(#sun)"/><circle cx="${W * .78}" cy="${hz * .5}" r="${hz * .17}" fill="#fff6c8"/>` +
        cloud(W * .2, hz * .3, U * .06, 70, -10, .8) + cloud(W * .5, hz * .22, U * .045, 90, -40, .7);
      far = mesa(W * .04, hz + 4, W * .16, hz * .62, '#d8825c') + mesa(W * .16, hz + 4, W * .1, hz * .4, '#c9704f') + mesa(W * .58, hz + 4, W * .2, hz * .5, '#d8825c') + mesa(W * .78, hz + 4, W * .12, hz * .72, '#c9704f') +
        hills(W, hz + 6, hz * .12, '#e3a56c', R, 180);
      gnd = `<rect y="${hz}" width="${W}" height="${gh + 2}" fill="url(#gd)"/>` + hills(W, hz + gh * .05, gh * .05, '#e9b476', rng(5), 220);
      // 갈라진 땅
      for (let i = 0; i < 22; i++) {
        const x = R() * W, y = hz + gh * (.15 + R() * .85), l = U * (.03 + R() * .04);
        gnd += `<path d="M${r1(x)},${r1(y)} l${r1(l)},${r1(l * .2)} l${r1(l * .5)},${r1(-l * .15)} M${r1(x + l)},${r1(y + l * .2)} l${r1(l * .2)},${r1(l * .4)}" stroke="#b9803f" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".5"/>`;
      }
      for (let i = 0; i < 16; i++) gnd += `<ellipse cx="${r1(R() * W)}" cy="${r1(hz + gh * (.2 + R() * .8))}" rx="${r1(3 + R() * 4)}" ry="${r1(2 + R() * 2)}" fill="#c78d4c" opacity=".55"/>`;
      // 식물: 양치식물, 속새, 소철 (건조한 곳 – 드문드문)
      const spots = [[.06, .12], [.2, .08], [.36, .1], [.52, .07], [.68, .12], [.84, .08], [.95, .14]];
      spots.forEach((p, i) => {
        const x = W * p[0], y = hz + gh * p[1] + 8, s = U * .09;
        back += i % 3 === 0 ? cycad(x, y, s * 1.5, '#7ba047') : i % 3 === 1 ? horsetail(x, y, s * 1.3, '#8fae55') : fern(x, y, s * 1.2, '#7da24a');
      });
      back += rock(W * .12, hz + gh * .2, U * .035, '#cf9a62') + rock(W * .62, hz + gh * .26, U * .028, '#cf9a62');
      fg = fern(W * .0, H + 14, U * .15, '#7ba047', 8) + cycad(W * 1.0, H + 30, U * .2, '#7ba047');
    } else if (eraId === 'jurassic') {
      defs = `<linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6cc2f2"/><stop offset="1" stop-color="#d4f1ff"/></linearGradient>
        <linearGradient id="gd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fc65e"/><stop offset="1" stop-color="#3f9a44"/></linearGradient>`;
      sky = `<rect width="${W}" height="${hz + 4}" fill="url(#sk)"/><circle cx="${W * .16}" cy="${hz * .42}" r="${hz * .13}" fill="#fff6c0"/>` +
        cloud(W * .35, hz * .3, U * .06, 80, -20) + cloud(W * .65, hz * .18, U * .05, 100, -60) + cloud(W * .9, hz * .38, U * .04, 70, -5, .85);
      far = hills(W, hz + 8, hz * .25, '#7fbf9a', rng(3), 200) + volcano(W * .74, hz + 10, U * .3, hz * .85) + hills(W, hz + 10, hz * .12, '#4f9a62', rng(8), 170);
      gnd = `<rect y="${hz}" width="${W}" height="${gh + 2}" fill="url(#gd)"/>`;
      for (let i = 0; i < 40; i++) { const x = R() * W, y = hz + gh * (.08 + R() * .92), s = U * (.012 + R() * .012); gnd += `<path d="M${r1(x)},${r1(y)} q${r1(-s * .3)},${r1(-s)} ${r1(-s * .6)},${r1(-s * 1.2)} M${r1(x)},${r1(y)} q${r1(s * .1)},${r1(-s * 1.2)} ${r1(s * .2)},${r1(-s * 1.4)} M${r1(x)},${r1(y)} q${r1(s * .5)},${r1(-s)} ${r1(s * .9)},${r1(-s)}" stroke="#2f7d36" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".7"/>`; }
      const trees = [[.05, 1], [.15, .8], [.3, 1.1], [.45, .75], [.58, .95], [.7, .7], [.86, 1.05], [.96, .8]];
      trees.forEach((p, i) => {
        const x = W * p[0], y = hz + gh * (.08 + (i % 3) * .035) + 6, h = hz * .85 * p[1];
        back += i % 2 ? araucaria(x, y, h, '#3f8f4b') : conifer(x, y, h * .85, '#3f9456');
      });
      [[.1, .13], [.4, .16], [.62, .14], [.92, .15]].forEach((p, i) => { back += (i % 2 ? cycad(W * p[0], hz + gh * p[1] + 6, U * .13, '#46a050') : fern(W * p[0], hz + gh * p[1] + 6, U * .12, '#4aa456')); });
      back += horsetail(W * .26, hz + gh * .16, U * .1, '#6dbb58') + horsetail(W * .78, hz + gh * .17, U * .1, '#6dbb58');
      fg = cycad(W * .0, H + 30, U * .2, '#3f9a4a') + fern(W * 1.0, H + 14, U * .16, '#3f9a4a', 8);
    } else {
      defs = `<linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fcbf7"/><stop offset=".7" stop-color="#d7f0ff"/><stop offset="1" stop-color="#ffe8f0"/></linearGradient>
        <linearGradient id="gd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#82d066"/><stop offset="1" stop-color="#4fae4f"/></linearGradient>`;
      sky = `<rect width="${W}" height="${hz + 4}" fill="url(#sk)"/><circle cx="${W * .82}" cy="${hz * .4}" r="${hz * .13}" fill="#fff6c0"/>` +
        cloud(W * .22, hz * .32, U * .06, 85, -15) + cloud(W * .55, hz * .2, U * .05, 110, -50) + cloud(W * .8, hz * .55, U * .035, 75, -30, .8);
      far = hills(W, hz + 8, hz * .22, '#8fcf9f', rng(4), 190) + hills(W, hz + 10, hz * .12, '#58ad6a', rng(9), 150);
      gnd = `<rect y="${hz}" width="${W}" height="${gh + 2}" fill="url(#gd)"/>` + river(W, hz + gh * .075, gh * .07, '#6cc4f0');
      for (let i = 0; i < 60; i++) {
        const x = R() * W, y = hz + gh * (.2 + R() * .8), c = ['#ffd54a', '#ff8fb3', '#ffffff', '#c59bff'][i % 4];
        gnd += flower(x, y, U * (.006 + R() * .004), c);
      }
      const trees = [[.05, 1.0], [.17, .8], [.33, 1.05], [.47, .75], [.6, .95], [.72, .78], [.86, 1.05], [.96, .85]];
      trees.forEach((p, i) => { back += broadleaf(W * p[0], hz + gh * (.05 + (i % 3) * .03) + 4, hz * .82 * p[1], i % 2 ? '#4fa860' : '#5bb86a', i % 3 === 0 ? '#ff8fb3' : '#ffc1d6'); });
      back += fern(W * .26, hz + gh * .2, U * .1, '#4aa456') + fern(W * .75, hz + gh * .21, U * .1, '#4aa456') + rock(W * .1, hz + gh * .3, U * .03, '#b6bdc2');
      fg = broadleaf(W * -.01, H + 40, U * .26, '#4fa860', '#ff8fb3') + fern(W * 1.0, H + 14, U * .16, '#44a055', 8) + flower(W * .95, H - 14, U * .012, '#ff8fb3') + flower(W * .06, H - 12, U * .011, '#ffd54a');
    }
    const bgsvg = `<svg viewBox="0 0 ${r1(W)} ${r1(H)}" width="${r1(W)}" height="${r1(H)}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>${defs}</defs>${sky}${far}${gnd}${back}</svg>`;
    const fgsvg = `<svg viewBox="0 0 ${r1(W)} ${r1(H)}" width="${r1(W)}" height="${r1(H)}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${fg}</svg>`;
    return { bg: bgsvg, fg: fgsvg, hz };
  }
  window.DinoScenes = { build };
})();
