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
    const pos = portrait ? 'center 30%' : 'center 38%';
    const bg = `<img class="era-photo" src="assets/bg/${eraId}.webp" alt="" aria-hidden="true" style="object-position:${pos}">`;
    const fg = `<div class="era-veil" aria-hidden="true"></div>`;
    return { bg, fg, hz };
  }

  window.DinoScenes = { build };
})();
