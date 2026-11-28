/* 공룡 그림 (손으로 만든 SVG) – 모두 오른쪽을 보고 서 있어요 */
(function () {
  const GY = 156; // 땅 높이
  const SW = 3.4;
  function hex2rgb(h) { h = h.replace('#', ''); return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16)); }
  function mix(a, b, t) {
    const A = hex2rgb(a), B = hex2rgb(b);
    return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join('');
  }
  const dk = (c, t = 0.5) => mix(c, '#2a1626', t);
  const lt = (c, t = 0.45) => mix(c, '#ffffff', t);
  const f1 = n => Math.round(n * 10) / 10;

  const path = (d, f, o, sw = SW, extra = '') => `<path d="${d}" fill="${f}" stroke="${o}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round" ${extra}/>`;
  const plain = (d, f, extra = '') => `<path d="${d}" fill="${f}" ${extra}/>`;
  const ell = (cx, cy, rx, ry, f, o, sw = SW, rot = 0) =>
    `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${o ? `stroke="${o}" stroke-width="${sw}"` : ''} ${rot ? `transform="rotate(${rot} ${cx} ${cy})"` : ''}/>`;
  const grp = (cls, ox, oy, inner) => `<g class="${cls}" style="transform-origin:${ox}px ${oy}px;transform-box:view-box">${inner}</g>`;
  const stroke = (d, w, col, extra = '') => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;

  function eye(cx, cy, r) {
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="#2a1626" stroke-width="2"/>` +
      `<circle cx="${f1(cx + r * 0.22)}" cy="${f1(cy + r * 0.05)}" r="${f1(r * 0.62)}" fill="#2a1626"/>` +
      `<circle cx="${f1(cx + r * 0.42)}" cy="${f1(cy - r * 0.28)}" r="${f1(r * 0.24)}" fill="#fff"/>`;
  }
  const blush = (cx, cy, r = 5) => `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${f1(r * 0.7)}" fill="#ff6f8a" opacity=".5"/>`;
  const smile = (x, y, w = 10) => stroke(`M${x},${y} q${w * 0.5},${w * 0.45} ${w},${-w * 0.1}`, 2.2, '#2a1626');

  /* ---------- 머리 ---------- */
  // 머리는 목과 이어지는 점이 (0,0)이고 오른쪽을 봐요
  function headTheropod(c, o = {}) {
    const sx = o.sx || 1, sy = o.sy || 1, a = c.a, ou = dk(c.a);
    let s = `<g transform="scale(${sx} ${sy})">`;
    s += path('M-14,-6 C-14,-24 14,-28 36,-24 C52,-21 62,-12 62,-2 C62,3 58,6 52,6 L-4,8 C-12,8 -14,2 -14,-6Z', a, ou);
    s += path('M-6,8 L52,6 C58,6 60,10 56,14 C48,22 20,24 4,22 C-8,20 -10,14 -6,8Z', lt(a, 0.25), ou);
    if (o.teeth !== false) {
      for (let x = 22; x <= 52; x += 8) s += plain(`M${x},7 l3,7 l3,-7Z`, '#fff', `stroke="${ou}" stroke-width="1" stroke-linejoin="round"`);
    }
    s += '</g>';
    const ex = 18 * sx, ey = -12 * sy;
    let top = '';
    if (o.horn === 'nose') top += path(`M${42 * sx},${-20 * sy} L${52 * sx},${-44 * sy} L${58 * sx},${-14 * sy}Z`, c.d, ou);
    if (o.brow) top += path(`M${ex - 8},${ey - 6} Q${ex},${ey - 22} ${ex + 14},${ey - 8}Z`, c.d, ou);
    if (o.crests) top += path(`M${6 * sx},${-22 * sy} Q${14 * sx},${-52 * sy} ${36 * sx},${-44 * sy} Q${34 * sx},${-30 * sy} ${38 * sx},${-22 * sy}Z`, c.d, ou) +
      path(`M${12 * sx},${-24 * sy} Q${22 * sx},${-44 * sy} ${30 * sx},${-38 * sy}`, 'none', dk(c.d, 0.4), 2);
    if (o.sail) top += path(`M${4 * sx},${-22 * sy} Q${20 * sx},${-40 * sy} ${40 * sx},${-24 * sy}Z`, c.d, ou);
    return s + top + eye(ex, ey, o.er || 7) + `<circle cx="${54 * sx}" cy="${-8 * sy}" r="2.2" fill="${ou}"/>` + blush(8 * sx, 8 * sy) + smile(40 * sx, 12 * sy, 12 * sx);
  }
  function headSpino(c) {
    const a = c.a, ou = dk(a);
    let s = path('M-14,-4 C-14,-18 10,-20 28,-18 C54,-16 74,-12 80,-4 C84,2 80,6 72,6 L-4,10 C-12,10 -14,4 -14,-4Z', a, ou);
    s += path('M-4,10 L72,6 C78,6 78,12 72,15 C54,22 20,24 4,22 C-8,20 -10,16 -4,10Z', lt(a, 0.25), ou);
    s += path('M2,-16 Q10,-30 26,-16Z', c.d, ou);
    for (let x = 40; x <= 72; x += 8) s += plain(`M${x},7 l2.6,6 l2.6,-6Z`, '#fff');
    s += ell(76, -3, 5, 4, lt(a, .3), ou, 2);
    return s + eye(14, -8, 6.5) + blush(6, 8) + smile(52, 13, 12);
  }
  function headSauro(c, o = {}) {
    const a = c.a, ou = dk(a), sx = o.sx || 1, sy = o.sy || 1;
    let s = `<g transform="scale(${sx} ${sy})">` + path('M-12,-8 C-10,-24 12,-26 26,-16 C36,-9 38,0 34,6 C28,13 6,13 -4,9 C-12,6 -12,0 -12,-8Z', a, ou);
    if (o.bump) s += path('M0,-18 C4,-30 18,-30 22,-18Z', lt(a, .15), ou);
    s += '</g>';
    return s + eye(8 * sx, -7 * sy, 6) + `<circle cx="${28 * sx}" cy="${-4 * sy}" r="2" fill="${ou}"/>` + blush(2 * sx, 5 * sy, 4.5) + smile(18 * sx, 7 * sy, 10);
  }
  function headBeak(c, o = {}) {
    const a = c.a, ou = dk(a), sx = o.sx || 1, sy = o.sy || 1;
    let s = `<g transform="scale(${sx} ${sy})">` +
      path('M-10,-10 C-8,-24 16,-26 30,-18 C42,-12 46,-4 42,4 C38,10 20,12 4,10 C-8,10 -12,0 -10,-10Z', a, ou);
    s += path('M34,-12 C44,-8 48,-2 44,4 L36,4Z', c.d || lt(a, .4), ou, 2.4);
    s += '</g>';
    return s + eye(10 * sx, -9 * sy, 6.5) + `<circle cx="${36 * sx}" cy="${-8 * sy}" r="2" fill="${ou}"/>` + blush(2 * sx, 4 * sy, 4.5) + smile(22 * sx, 6 * sy, 10);
  }
  function headDuck(c, o = {}) {
    const a = c.a, ou = dk(a);
    let s = path('M-10,-10 C-6,-24 20,-26 34,-20 L48,-14 C56,-10 56,0 48,2 L34,8 C20,12 0,12 -8,6 C-12,0 -12,-4 -10,-10Z', a, ou);
    s += path('M42,-14 C56,-10 56,0 46,2 L40,0Z', lt(a, .25), ou, 2.4);
    return s + eye(10, -9, 6.5) + `<circle cx="47" cy="-8" r="1.8" fill="${ou}"/>` + blush(0, 5, 4.5) + smile(22, 6, 10);
  }
  function headCerato(c, o = {}) {
    const a = c.a, ou = dk(a);
    let s = '';
    // 프릴(목 방패)
    const big = o.frill || 1;
    s += path(`M-4,-22 C-24,${-62 * big} ${-72 * big},${-50 * big} ${-66 * big},-6 C${-64 * big},14 -44,26 -8,22Z`, c.e || lt(c.d, .1), ou);
    for (let i = 0; i < 6; i++) {
      const t = i / 5, ang = (-1.9 + t * 2.1);
      const px = -6 + Math.cos(Math.PI + ang * 0.0) * 0; // placeholder
    }
    if (o.frillDots !== false) {
      const pts = [[-26, -46], [-46, -42], [-58, -26], [-62, -8], [-54, 10], [-38, 18]];
      pts.forEach(p => { s += ell(p[0] * big, p[1] * big * (p[1] < 0 ? 1 : 1), 4.4, 4.4, c.d, ou, 1.8); });
      s += stroke('M-14,-18 C-24,-36 -40,-34 -46,-18', 2, dk(c.d, .3), 'opacity=".6"');
    }
    // 머리
    s += path('M-12,-14 C0,-26 30,-24 44,-8 L54,6 C52,15 36,17 20,17 C0,19 -12,10 -12,-14Z', a, ou);
    s += path('M40,-8 C50,-4 56,2 52,10 L42,8Z', lt(a, .35), ou, 2.4);
    if (o.brow !== false) s += path('M10,-20 L40,-54 L28,-18Z', '#fffbe8', ou, 2.6);
    if (o.nose !== false) s += path('M38,-8 L54,-26 L50,-4Z', '#fffbe8', ou, 2.6);
    return s + eye(10, -8, 6.5) + blush(4, 8, 5) + smile(26, 12, 12);
  }
  function headPachy(c) {
    const a = c.a, ou = dk(a);
    let s = path('M-10,-4 C-14,-40 32,-44 36,-14 C38,0 32,8 20,10 L-2,12 C-8,10 -10,4 -10,-4Z', a, ou);
    s += path('M-8,-14 C-4,-34 28,-36 30,-16', 'none', lt(a, .4), 4, 'opacity=".7"');
    [[-10, -2], [-14, -14], [-6, -28], [6, -36]].forEach(p => { s += ell(p[0], p[1], 3.6, 3.6, c.d, ou, 1.8); });
    s += path('M26,2 C38,-2 44,2 40,8 L28,10Z', lt(a, .3), ou, 2.4);
    return s + eye(14, -10, 6.5) + blush(6, 6, 4.5) + smile(24, 9, 9);
  }
  function headAnky(c) {
    const a = c.a, ou = dk(a);
    let s = path('M-14,-12 L-34,-20 L-16,-2Z', c.d, ou);
    s += path('M-14,0 L-32,10 L-10,10Z', c.d, ou);
    s += path('M-14,-10 C0,-24 28,-22 42,-6 C46,0 42,10 30,12 L-6,12 C-16,8 -16,-4 -14,-10Z', a, ou);
    s += path('M34,-4 C46,-2 48,6 40,10 L30,8Z', lt(a, .3), ou, 2.4);
    return s + eye(12, -7, 6.5) + blush(2, 6, 4.5) + smile(22, 8, 10);
  }
  function headStego(c) {
    const a = c.a, ou = dk(a);
    let s = path('M-8,-6 C-6,-16 14,-16 30,-9 C42,-4 48,2 42,7 C32,11 10,11 -2,9Z', a, ou);
    return s + eye(8, -5, 5.5) + `<circle cx="40" cy="1" r="1.8" fill="${ou}"/>` + blush(0, 5, 4) + smile(20, 6, 9);
  }
  function headBird(c) {
    const a = c.a, ou = dk(a);
    let s = path('M-4,-12 L-12,-26 L2,-18 L6,-30 L12,-16Z', c.d, ou, 2.4); // 머리 깃
    s += path('M-14,0 C-14,-16 10,-18 20,-8 C26,-2 22,10 8,12 C-6,14 -14,10 -14,0Z', a, ou);
    s += path('M18,-8 L34,-1 L18,4Z', '#ffcf4a', ou, 2.4);
    return s + eye(6, -3, 6) + blush(4, 8, 4.5);
  }
  function headPtero(c, o = {}) {
    const a = c.a, ou = dk(a);
    let s = '';
    if (o.crest) s += path('M-2,-10 L-42,-22 L-8,2Z', c.d, ou);
    s += path('M-12,-6 C-6,-18 14,-16 30,-12 L74,-4 C78,-2 76,2 72,3 L28,8 C14,14 -10,12 -12,-6Z', a, ou);
    if (o.teeth) for (let x = 30; x <= 68; x += 7) s += plain(`M${x},4 l2,6 l2,-6Z`, '#fff');
    if (o.tail) s += '';
    return s + eye(8, -5, 6) + blush(2, 6, 4) + smile(36, 7, 10);
  }

  /* ---------- 몸/다리/꼬리 부품 ---------- */
  function tail(bx, by, tx, ty, th, sag, col, ou, thTip = 3) {
    const mx = (bx + tx) / 2, my = (by + ty) / 2 - sag;
    const d = `M${bx},${by - th / 2} Q${mx},${my - th * 0.3} ${tx},${ty - thTip / 2} L${tx},${ty + thTip / 2} Q${mx},${my + th * 0.3 + 2} ${bx},${by + th / 2}Z`;
    return path(d, col, ou);
  }
  // 두 발 달리는 공룡 다리 (넓적다리 + 정강이 + 발)
  function thighLeg(x, y, th, col, ou, cls, delay) {
    const shinW = th * 0.42, fy = GY - 3;
    let s = '';
    s += path(`M${x - shinW / 2},${y} L${x - shinW / 2 + 2},${fy - 6} L${x + shinW / 2 + 4},${fy - 6} L${x + shinW / 2},${y}Z`, col, ou);
    s += path(`M${x - 4},${fy - 4} Q${x + 14},${fy - 12} ${x + th * 0.7 + 12},${fy - 2} Q${x + th * 0.7 + 14},${fy + 3} ${x + th * 0.7 + 8},${fy + 3} L${x - 6},${fy + 3}Z`, col, ou);
    s += ell(x, y, th * 0.78, th * 0.95, col, ou, SW, -12);
    return grp(cls, x, y, s);
  }
  // 네 발 기둥 다리
  function columnLeg(x, y, th, col, ou, cls, o = {}) {
    const fy = GY - 4, w2 = th / 2, foot = o.foot || th * 0.65;
    let s = path(`M${x - w2},${y} C${x - w2 - 1},${y + (fy - y) * 0.5} ${x - w2 + 1},${fy - 6} ${x - w2 - 1},${fy} L${x + w2 + 1},${fy} C${x + w2 - 1},${fy - 6} ${x + w2 + 1},${y + (fy - y) * 0.5} ${x + w2},${y}Z`, col, ou);
    s += path(`M${x - w2 - 2},${fy - 1} C${x - w2 - 2},${fy + 6} ${x + foot},${fy + 6} ${x + foot},${fy + 2} C${x + foot},${fy - 2} ${x + w2},${fy - 3} ${x + w2},${fy - 3}Z`, col, ou);
    if (o.toes) for (let i = 0; i < 3; i++) s += plain(`M${x - w2 + i * (th / 3) + 3},${fy + 4} l2.5,3 l-5,0Z`, '#fffbe8');
    return grp(cls, x, y, s);
  }
  function armLimb(x, y, len, ang, col, ou, cls) {
    const d = `M${x},${y} l${f1(len * Math.cos(ang))},${f1(len * Math.sin(ang))}`;
    return grp(cls || 'arm', x, y, stroke(d, 8, ou) + stroke(d, 4.2, col) + `<circle cx="${f1(x + len * Math.cos(ang))}" cy="${f1(y + len * Math.sin(ang))}" r="3.2" fill="${col}" stroke="${ou}" stroke-width="2"/>`);
  }
  function neckStroke(pts, w, col, ou) {
    // pts: [[x,y],[cx,cy],[x2,y2]] 2차 곡선 또는 3차
    const d = pts.length === 3 ? `M${pts[0]} Q${pts[1]} ${pts[2]}` : `M${pts[0]} C${pts[1]} ${pts[2]} ${pts[3]}`;
    return stroke(d, w + SW * 2, ou) + stroke(d, w, col);
  }
  function bodyShape(cx, cy, rx, ry, rot, c, ou, o = {}) {
    let s = ell(cx, cy, rx, ry, c.a, ou, SW, rot);
    s += `<g transform="rotate(${rot} ${cx} ${cy})">` + ell(cx + rx * 0.08, cy + ry * 0.36, rx * 0.78, ry * 0.5, c.b, '', 0) + `</g>`;
    s += `<g transform="rotate(${rot} ${cx} ${cy})">` + ell(cx - rx * 0.2, cy - ry * 0.55, rx * 0.5, ry * 0.18, '#fff', '', 0).replace('/>', ' opacity=".2"/>') + `</g>`;
    return s;
  }
  const spots = (list, col, r = 3) => list.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="${p[2] || r}" fill="${col}" opacity=".55"/>`).join('');
  const bands = (list, col, w = 4) => list.map(p => stroke(`M${p[0]},${p[1]} q${p[2] || 4},${p[3] || 12} ${p[4] || 0},${p[5] || 24}`, w, col, 'opacity=".5"')).join('');

  function wrap(inner, shadowRx = 70) {
    return `<svg class="dino-svg" viewBox="0 0 240 170" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">` +
      `<ellipse cx="116" cy="${GY + 3}" rx="${shadowRx}" ry="6" fill="#000" opacity=".2"/><g class="bob">${inner}</g></svg>`;
  }

  /* ---------- 공룡 만들기 (큰 틀) ---------- */
  function theropodTpl(c, o) {
    const ou = dk(c.a), far = mix(c.a, '#2a1626', .22);
    let s = '';
    s += thighLeg(o.hipX - 18, o.hipY - 2, o.leg, far, ou, 'legB');
    s += grp('tail', o.tailBase[0], o.tailBase[1], tail(o.tailBase[0], o.tailBase[1], o.tailTip[0], o.tailTip[1], o.tailTh, o.sag || 0, c.a, ou));
    s += bodyShape(o.body[0], o.body[1], o.body[2], o.body[3], o.body[4] || -8, c, ou);
    if (o.deco) s += o.deco(c, ou);
    if (o.neck) s += neckStroke(o.neck.pts, o.neck.w, c.a, ou);
    s += thighLeg(o.hipX, o.hipY, o.leg, c.a, ou, 'legA');
    if (o.arm) s += armLimb(o.arm[0], o.arm[1], o.arm[2], o.arm[3] || 1.0, c.a, ou, 'arm');
    s += grp('head', o.head.x, o.head.y, `<g transform="translate(${o.head.x} ${o.head.y}) rotate(${o.head.rot || 0}) scale(${o.head.s || 1})">${o.head.svg}</g>`);
    if (o.front) s += o.front(c, ou);
    return s;
  }
  function quadTpl(c, o) {
    const ou = dk(c.a), far = mix(c.a, '#2a1626', .22);
    let s = '';
    s += columnLeg(o.legs[0][0] + 10, o.legs[0][1], o.legs[0][2], far, ou, 'legB', o.legOpt);
    s += columnLeg(o.legs[2][0] + 10, o.legs[2][1], o.legs[2][2], far, ou, 'legA', o.legOpt);
    s += columnLeg(o.legs[1][0], o.legs[1][1], o.legs[1][2], c.a, ou, 'legA', o.legOpt);
    s += columnLeg(o.legs[3][0], o.legs[3][1], o.legs[3][2], c.a, ou, 'legB', o.legOpt);
    if (o.under) s += o.under(c, ou);
    s += grp('tail', o.tailBase[0], o.tailBase[1], tail(o.tailBase[0], o.tailBase[1], o.tailTip[0], o.tailTip[1], o.tailTh, o.sag || 0, c.a, ou, o.tipTh || 3) + (o.tailDeco ? o.tailDeco(c, ou) : ''));
    if (o.back) s += o.back(c, ou);
    if (o.neck) s += neckStroke(o.neck.pts, o.neck.w, c.a, ou);
    s += bodyShape(o.body[0], o.body[1], o.body[2], o.body[3], o.body[4] || 0, c, ou);
    if (o.deco) s += o.deco(c, ou);
    s += grp('head', o.head.x, o.head.y, `<g transform="translate(${o.head.x} ${o.head.y}) rotate(${o.head.rot || 0}) scale(${o.head.s || 1})">${o.head.svg}</g>`);
    if (o.front) s += o.front(c, ou);
    return s;
  }
  const C = (a, b, d, e) => ({ a, b, d, e });

  const ART = {};

  /* ===== 트라이아스기 ===== */
  ART.coelophysis = () => {
    const c = C('#e6b35c', '#fbecc6', '#b9722f');
    return wrap(theropodTpl(c, {
      hipX: 104, hipY: 112, leg: 16, body: [104, 100, 34, 22, -6], tailBase: [76, 96], tailTip: [4, 112], tailTh: 18, sag: -4,
      neck: { pts: [[128, 92], [146, 78], [150, 52]], w: 16 },
      head: { x: 148, y: 46, s: 0.95, svg: headTheropod(c, { sx: 1.05, sy: 0.62, er: 6.5 }) },
      arm: [130, 104, 14, 1.0],
      deco: (c, ou) => bands([[84, 86, 3, 8, 0, 14], [96, 82, 3, 8, 0, 16], [108, 80, 3, 8, 0, 16]], dk(c.a, .5))
    }), 62);
  };
  ART.plateosaurus = () => {
    const c = C('#93b35c', '#eef2c4', '#5e7d36');
    return wrap(theropodTpl(c, {
      hipX: 100, hipY: 116, leg: 22, body: [104, 96, 42, 32, -14], tailBase: [68, 100], tailTip: [4, 128], tailTh: 26, sag: -6,
      neck: { pts: [[134, 82], [158, 66], [170, 30]], w: 20 },
      head: { x: 172, y: 28, s: 0.9, svg: headBeak(c, { sx: 1.1, sy: .85 }) },
      arm: [136, 104, 18, 1.1],
      deco: (c, ou) => spots([[88, 84, 3.5], [104, 78, 3], [118, 84, 3.5], [96, 96, 3]], dk(c.a, .45))
    }), 66);
  };
  ART.eoraptor = () => {
    const c = C('#e1774a', '#ffe7c9', '#a8442a');
    return wrap(theropodTpl(c, {
      hipX: 106, hipY: 112, leg: 18, body: [110, 100, 36, 28, -8], tailBase: [76, 96], tailTip: [6, 104], tailTh: 20, sag: 2,
      neck: { pts: [[134, 90], [148, 74], [152, 58]], w: 18 },
      head: { x: 152, y: 52, s: 1, svg: headTheropod(c, { sx: 0.95, sy: 0.9, er: 7.5 }) },
      arm: [134, 104, 14, 1.0],
      deco: (c, ou) => bands([[90, 86, 3, 8, 0, 18], [102, 82, 3, 8, 0, 20], [114, 82, 3, 8, 0, 20], [126, 86, 3, 8, 0, 16]], dk(c.a, .45), 5)
    }), 58);
  };
  ART.herrerasaurus = () => {
    const c = C('#c25a68', '#fde0d3', '#7e2f45');
    return wrap(theropodTpl(c, {
      hipX: 102, hipY: 110, leg: 20, body: [106, 96, 40, 28, -8], tailBase: [72, 92], tailTip: [4, 104], tailTh: 22, sag: -2,
      neck: { pts: [[134, 84], [150, 70], [158, 54]], w: 20 },
      head: { x: 156, y: 50, s: 1, svg: headTheropod(c, { sx: 1.0, sy: 0.82 }) },
      arm: [136, 100, 16, 1.0],
      deco: (c, ou) => spots([[88, 82], [102, 78], [116, 80], [96, 90], [110, 88]], dk(c.a, .5), 3.2)
    }), 64);
  };
  ART.riojasaurus = () => {
    const c = C('#a98bd0', '#f0e6fb', '#6c4f98');
    return wrap(quadTpl(c, {
      legs: [[62, 104, 20], [92, 108, 20], [132, 104, 20], [150, 108, 20]], body: [106, 96, 52, 30, -4],
      tailBase: [62, 94], tailTip: [4, 128], tailTh: 26, sag: -4,
      neck: { pts: [[142, 84], [172, 60], [182, 30]], w: 22 },
      head: { x: 184, y: 26, s: 0.85, svg: headSauro(c) },
      deco: (c, ou) => spots([[84, 84, 3.5], [100, 80, 3], [118, 82, 3.5], [132, 90, 3]], dk(c.a, .45))
    }), 80);
  };
  ART.eodromaeus = () => {
    const c = C('#5fb0a8', '#e1f6ef', '#2f7c78');
    return wrap(theropodTpl(c, {
      hipX: 106, hipY: 114, leg: 17, body: [110, 102, 32, 24, -10], tailBase: [80, 98], tailTip: [4, 98], tailTh: 18, sag: 0,
      neck: { pts: [[132, 94], [146, 78], [150, 62]], w: 16 },
      head: { x: 150, y: 56, s: 1, svg: headTheropod(c, { sx: 0.9, sy: 0.8, er: 7.2 }) },
      arm: [130, 106, 13, 1.0],
      deco: (c, ou) => stroke('M86,96 Q110,84 134,92', 4, dk(c.a, .45), 'opacity=".5"')
    }), 58);
  };
  ART.thecodontosaurus = () => {
    const c = C('#d99a4e', '#fbeccc', '#9a6226');
    return wrap(theropodTpl(c, {
      hipX: 104, hipY: 114, leg: 17, body: [108, 102, 34, 24, -10], tailBase: [76, 100], tailTip: [6, 118], tailTh: 20, sag: -3,
      neck: { pts: [[132, 94], [150, 82], [156, 58]], w: 15 },
      head: { x: 156, y: 52, s: 0.9, svg: headBeak(c, { sx: 1, sy: .9 }) },
      arm: [132, 106, 14, 1.0],
      deco: (c, ou) => spots([[92, 92], [104, 88], [116, 90], [124, 98]], dk(c.a, .5), 3)
    }), 58);
  };
  ART.saturnalia = () => {
    const c = C('#d6637a', '#ffe3dd', '#8f3350');
    return wrap(theropodTpl(c, {
      hipX: 104, hipY: 114, leg: 16, body: [108, 102, 30, 22, -10], tailBase: [80, 98], tailTip: [6, 112], tailTh: 17, sag: -2,
      neck: { pts: [[130, 94], [148, 82], [152, 62]], w: 14 },
      head: { x: 152, y: 56, s: 0.9, svg: headBeak(c, { sx: 0.95, sy: .9 }) },
      arm: [130, 106, 13, 1.0],
      deco: (c, ou) => bands([[92, 90, 3, 8, 0, 14], [104, 88, 3, 8, 0, 14], [116, 88, 3, 8, 0, 14]], '#fff', 4) +
        // 카니발 리본 목도리
        ''
    }), 54);
  };
  ART.staurikosaurus = () => {
    const c = C('#4f95d0', '#e2f1fb', '#2a5f95');
    return wrap(theropodTpl(c, {
      hipX: 104, hipY: 112, leg: 18, body: [108, 98, 36, 26, -8], tailBase: [76, 94], tailTip: [4, 104], tailTh: 20, sag: -2,
      neck: { pts: [[134, 90], [150, 76], [156, 58]], w: 17 },
      head: { x: 156, y: 52, s: 1, svg: headTheropod(c, { sx: 0.98, sy: 0.82, er: 7 }) },
      arm: [134, 102, 14, 1.0],
      deco: (c, ou) => spots([[88, 84, 3], [100, 80, 3], [112, 80, 3], [124, 86, 3], [96, 92, 2.6], [108, 90, 2.6]], '#fff', 3)
    }), 60);
  };
  ART.eudimorphodon = () => pterosaur({ a: '#e98a5b', b: '#ffe6c9', d: '#b3532b', wing: '#f4b98c' }, { crest: false, teeth: true, diamond: true, long: false });

  /* ===== 쥐라기 ===== */
  ART.brachiosaurus = () => {
    const c = C('#58a9c9', '#e0f4fb', '#2f7a9e');
    return wrap(quadTpl(c, {
      legs: [[60, 100, 21], [88, 104, 21], [126, 96, 22], [148, 96, 22]], body: [100, 92, 52, 30, -10],
      tailBase: [56, 96], tailTip: [4, 120], tailTh: 22, sag: -2,
      neck: { pts: [[138, 78], [168, 70], [176, 30]], w: 20 },
      head: { x: 176, y: 26, s: 0.8, svg: headSauro(c, { bump: true }) },
      deco: (c, ou) => spots([[80, 82, 3.5], [96, 76, 3], [114, 80, 3.5], [126, 90, 3]], dk(c.a, .4))
    }), 80);
  };
  ART.stegosaurus = () => {
    const c = C('#7fb44f', '#eef6c8', '#e8803a');
    const plates = (c, ou) => {
      const L = [[62, 82, 13, 16], [76, 73, 18, 24], [92, 68, 22, 30], [110, 66, 22, 30], [128, 69, 19, 26], [144, 77, 13, 18]];
      return L.map(p => path(`M${p[0] - p[2] / 2},${p[1] + 6} Q${p[0] - p[2] * .3},${p[1] - p[3] * .7} ${p[0]},${p[1] - p[3]} Q${p[0] + p[2] * .3},${p[1] - p[3] * .7} ${p[0] + p[2] / 2},${p[1] + 6}Z`, c.d, dk(c.d, .55), 3)).join('') +
        L.map(p => stroke(`M${p[0]},${p[1] - p[3] * .65} L${p[0]},${p[1] - 2}`, 2.4, lt(c.d, .55), 'opacity=".7"')).join('');
    };
    return wrap(quadTpl(c, {
      legs: [[56, 110, 22], [84, 112, 22], [124, 112, 20], [146, 114, 20]], body: [104, 100, 56, 34, 6],
      tailBase: [58, 102], tailTip: [10, 118], tailTh: 26, sag: 0,
      tailDeco: (c, ou) => path('M36,104 L26,78 L44,100Z', '#fffbe8', ou, 2.6) + path('M20,111 L8,88 L28,108Z', '#fffbe8', ou, 2.6) + path('M30,114 L12,128 L34,110Z', '#f1ead2', ou, 2.6),
      head: { x: 158, y: 118, s: 0.95, rot: 8, svg: headStego(c) },
      deco: (c, ou) => spots([[88, 98, 4], [104, 92, 3.5], [122, 98, 4], [108, 108, 3]], dk(c.a, .4)) + plates(c, ou)
    }), 80);
  };
  ART.allosaurus = () => {
    const c = C('#d8643b', '#ffe2c5', '#8f2f1c');
    return wrap(theropodTpl(c, {
      hipX: 104, hipY: 112, leg: 24, body: [112, 94, 46, 34, -8], tailBase: [72, 90], tailTip: [4, 104], tailTh: 28, sag: -2,
      head: { x: 148, y: 62, s: 1.08, svg: headTheropod(c, { sx: 1.1, sy: 1.0, brow: true }) },
      arm: [148, 100, 15, 1.0],
      deco: (c, ou) => bands([[86, 80, 3, 8, 0, 20], [100, 76, 3, 8, 0, 22], [114, 76, 3, 8, 0, 22], [128, 80, 3, 8, 0, 20]], dk(c.a, .5), 5)
    }), 74);
  };
  ART.diplodocus = () => {
    const c = C('#8aa0dc', '#e6ecfb', '#5568a8');
    return wrap(quadTpl(c, {
      legs: [[62, 108, 18], [88, 112, 18], [124, 108, 18], [146, 112, 18]], body: [104, 98, 48, 26, 0],
      tailBase: [60, 96], tailTip: [2, 134], tailTh: 22, sag: 14, tipTh: 2.5,
      neck: { pts: [[142, 88], [176, 76], [206, 54]], w: 18 },
      head: { x: 208, y: 50, s: 0.78, rot: 10, svg: headSauro(c, { sx: 1.1, sy: .8 }) },
      deco: (c, ou) => spots([[84, 88, 3], [100, 84, 3], [118, 86, 3], [130, 94, 3]], dk(c.a, .4))
    }), 80);
  };
  ART.dilophosaurus = () => {
    const c = C('#47b69b', '#e3f8ef', '#e0503e');
    return wrap(theropodTpl(c, {
      hipX: 104, hipY: 114, leg: 20, body: [108, 98, 38, 26, -8], tailBase: [74, 94], tailTip: [4, 112], tailTh: 22, sag: -4,
      neck: { pts: [[134, 88], [150, 74], [156, 56]], w: 17 },
      head: { x: 156, y: 50, s: 1, svg: headTheropod(c, { sx: 1.0, sy: 0.78, crests: true, er: 7 }) },
      arm: [134, 102, 15, 1.0],
      deco: (c, ou) => spots([[88, 86], [100, 82], [112, 82], [124, 88], [96, 94], [110, 92]], dk(c.a, .5), 3)
    }), 62);
  };
  ART.archaeopteryx = () => {
    const c = C('#4e78bd', '#f4f0d8', '#f2b63a');
    const ou = dk(c.a);
    let s = '';
    // 긴 깃털 꼬리
    s += grp('tail', 78, 100, path('M82,96 C54,98 30,106 6,120 C34,124 62,120 86,108Z', c.a, ou) +
      [0, 1, 2, 3, 4].map(i => stroke(`M${70 - i * 12},${103 + i * 3} l-8,${5}`, 3, c.d)).join(''));
    s += thighLeg(104, 118, 14, '#e9b84e', ou, 'legB');
    s += bodyShape(108, 100, 32, 24, -10, c, ou);
    s += thighLeg(118, 118, 14, '#e9b84e', ou, 'legA');
    // 날개
    s += grp('wingF', 112, 90, path('M112,90 C94,86 70,92 54,108 C64,112 70,110 76,114 C86,116 96,112 100,118 C108,112 120,104 122,96Z', lt(c.a, .1), ou) +
      [0, 1, 2, 3, 4].map(i => stroke(`M${104 - i * 11},${96 + i * 3.4} l-10,${8 + i}`, 3.4, c.d)).join('') +
      stroke('M110,92 L104,96', 3, ou));
    s += neckStroke([[128, 90], [140, 82], [146, 70]], 14, c.a, ou);
    s += grp('head', 146, 66, `<g transform="translate(146 66) scale(.95)">${headBird(c)}</g>`);
    return wrap(s, 50);
  };
  ART.compsognathus = () => {
    const c = C('#eaa23d', '#fff1c8', '#a8601a');
    return wrap(theropodTpl(c, {
      hipX: 108, hipY: 116, leg: 15, body: [112, 106, 28, 20, -10], tailBase: [86, 102], tailTip: [8, 108], tailTh: 15, sag: 2,
      neck: { pts: [[132, 98], [148, 90], [152, 72]], w: 13 },
      head: { x: 152, y: 66, s: 0.95, svg: headTheropod(c, { sx: 0.95, sy: 0.75, er: 7.2 }) },
      arm: [132, 108, 12, 1.0],
      deco: (c, ou) => spots([[96, 96, 2.6], [108, 92, 2.6], [120, 96, 2.6]], dk(c.a, .5))
    }), 48);
  };
  ART.ceratosaurus = () => {
    const c = C('#b8628c', '#fbe0ea', '#e24a3a');
    return wrap(theropodTpl(c, {
      hipX: 104, hipY: 112, leg: 22, body: [110, 94, 42, 32, -8], tailBase: [72, 90], tailTip: [4, 106], tailTh: 26, sag: -2,
      head: { x: 146, y: 62, s: 1.05, svg: headTheropod(c, { sx: 1.05, sy: 1.0, horn: 'nose', brow: true }) },
      arm: [146, 100, 14, 1.0],
      deco: (c, ou) => [0, 1, 2, 3, 4, 5].map(i => path(`M${78 + i * 12},${72 + Math.abs(i - 2.5) * 2} l5,-10 l5,10Z`, c.d, dk(c.d, .5), 2.2)).join('') +
        spots([[96, 88, 3], [112, 84, 3], [128, 90, 3]], dk(c.a, .5))
    }), 70);
  };
  ART.kentrosaurus = () => {
    const c = C('#c99b4f', '#f8eac8', '#8a4f26');
    const plates = (c, ou) => {
      let s = '';
      [[64, 86, 12], [78, 78, 16], [92, 74, 18], [106, 73, 16], [120, 76, 12]].forEach(p => {
        s += path(`M${p[0] - 6},${p[1] + 5} Q${p[0] - 3},${p[1] - p[2] * .6} ${p[0]},${p[1] - p[2]} Q${p[0] + 3},${p[1] - p[2] * .6} ${p[0] + 6},${p[1] + 5}Z`, c.d, dk(c.d, .55), 2.6);
      });
      [[50, 100], [38, 104], [26, 108]].forEach(p => { s += path(`M${p[0] - 4},${p[1] + 2} L${p[0] - 10},${p[1] - 22} L${p[0] + 5},${p[1]}Z`, '#fffbe8', ou, 2.4); });
      s += path('M132,84 L152,74 L142,98Z', '#fffbe8', ou, 2.4);
      return s;
    };
    return wrap(quadTpl(c, {
      legs: [[58, 112, 17], [80, 114, 17], [120, 114, 17], [140, 114, 17]], body: [102, 102, 46, 28, 4],
      tailBase: [60, 102], tailTip: [8, 112], tailTh: 22, sag: 0,
      head: { x: 148, y: 108, s: 0.9, rot: 10, svg: headStego(c) },
      deco: (c, ou) => spots([[90, 98, 3.4], [106, 94, 3], [122, 100, 3.4]], dk(c.a, .4)) + plates(c, ou)
    }), 70);
  };
  ART.rhamphorhynchus = () => pterosaur({ a: '#7e8dd0', b: '#e8ecfa', d: '#4f5ca0', wing: '#aab4e6' }, { crest: false, teeth: true, diamond: true, long: true });

  /* ===== 백악기 ===== */
  ART.tyrannosaurus = () => {
    const c = C('#6ea54b', '#f0f3c4', '#3f6f2a');
    return wrap(theropodTpl(c, {
      hipX: 106, hipY: 112, leg: 26, body: [112, 92, 48, 38, -10], tailBase: [70, 86], tailTip: [4, 100], tailTh: 30, sag: -2,
      head: { x: 146, y: 62, s: 1.12, svg: headTheropod(c, { sx: 1.12, sy: 1.12 }) },
      arm: [148, 102, 11, 1.1],
      deco: (c, ou) => bands([[84, 76, 3, 8, 0, 22], [98, 70, 3, 8, 0, 24], [112, 68, 3, 8, 0, 24], [126, 72, 3, 8, 0, 22]], dk(c.a, .5), 5)
    }), 76);
  };
  ART.triceratops = () => {
    const c = C('#dc8c4c', '#ffe9c8', '#e0627a', '#f3a1b0');
    return wrap(quadTpl(c, {
      legs: [[54, 108, 22], [80, 112, 22], [124, 108, 22], [148, 112, 22]], body: [100, 94, 54, 38, 2],
      tailBase: [52, 98], tailTip: [8, 114], tailTh: 24, sag: -2,
      head: { x: 158, y: 100, s: 1.05, svg: headCerato(c, { frill: 0.9 }) },
      deco: (c, ou) => spots([[84, 84, 3.6], [100, 78, 3.2], [118, 82, 3.6], [128, 94, 3]], dk(c.a, .4))
    }), 80);
  };
  ART.velociraptor = () => {
    const c = C('#d4703a', '#ffe7cf', '#3d78b8');
    const ou = dk(c.a);
    const deco = (c, ou) => {
      let s = '';
      // 깃털 팔
      s += [0, 1, 2, 3, 4].map(i => stroke(`M${84 + i * 10},${92 - i} l-2,${-12}`, 4, c.d)).join('');
      s += stroke('M70,92 l-16,-4 M68,98 l-18,2 M70,104 l-16,8', 4, c.d);
      return s;
    };
    return wrap(theropodTpl(c, {
      hipX: 104, hipY: 112, leg: 18, body: [108, 98, 34, 24, -8], tailBase: [76, 94], tailTip: [4, 98], tailTh: 18, sag: 0,
      neck: { pts: [[130, 90], [146, 78], [152, 60]], w: 16 },
      head: { x: 152, y: 54, s: 0.98, svg: headTheropod(c, { sx: 1.0, sy: 0.7, er: 7 }) },
      deco
    }), 56);
  };
  ART.spinosaurus = () => {
    const c = C('#3ea1b4', '#e0f6f5', '#ee7c3a');
    const sailF = (c, ou) => {
      let s = path('M70,80 C76,36 100,22 116,28 C130,22 146,40 148,84Z', c.d, dk(c.d, .5));
      for (let i = 0; i < 5; i++) s += stroke(`M${82 + i * 14},${82} L${86 + i * 12},${40 + Math.abs(2 - i) * 8}`, 2.2, lt(c.d, .5), 'opacity=".7"');
      return s;
    };
    return wrap(theropodTpl(c, {
      hipX: 108, hipY: 114, leg: 20, body: [114, 98, 46, 30, -6], tailBase: [72, 94], tailTip: [4, 112], tailTh: 26, sag: -2,
      deco: sailF,
      head: { x: 150, y: 76, s: 0.98, svg: headSpino(c) },
      arm: [146, 108, 14, 1.0]
    }), 76);
  };
  ART.ankylosaurus = () => {
    const c = C('#b3895a', '#f3e3c3', '#6f5a47');
    const armor = (c, ou) => {
      let s = '';
      for (let i = 0; i < 6; i++) s += ell(70 + i * 15, 82 + Math.abs(i - 2.5) * 2.5, 7, 6, '#8a755f', ou, 2.2);
      for (let i = 0; i < 5; i++) s += ell(77 + i * 15, 92 + Math.abs(i - 2) * 2, 5.5, 4.6, '#a08a72', ou, 2);
      s += [0, 1, 2, 3, 4, 5].map(i => path(`M${68 + i * 15},${74 + Math.abs(i - 2.5) * 2} l3,-9 l3,9Z`, '#efe4cf', ou, 2)).join('');
      return s;
    };
    return wrap(quadTpl(c, {
      legs: [[56, 118, 22], [82, 120, 22], [126, 118, 22], [148, 120, 22]], body: [104, 104, 58, 34, 0],
      tailBase: [52, 108], tailTip: [26, 120], tailTh: 22, sag: 0, tipTh: 12,
      tailDeco: (c, ou) => ell(16, 120, 16, 15, '#8a755f', ou, 3) + ell(10, 118, 5, 4, '#a89680', '', 0),
      head: { x: 164, y: 112, s: 0.95, svg: headAnky(c) },
      deco: armor
    }), 84);
  };
  ART.pachycephalosaurus = () => {
    const c = C('#c8707d', '#fde6e0', '#7d3a4c');
    return wrap(theropodTpl(c, {
      hipX: 104, hipY: 114, leg: 22, body: [108, 98, 38, 32, -14], tailBase: [72, 100], tailTip: [4, 120], tailTh: 24, sag: -4,
      neck: { pts: [[134, 84], [148, 74], [154, 60]], w: 20 },
      head: { x: 156, y: 56, s: 1.0, svg: headPachy(c) },
      arm: [138, 104, 15, 1.1],
      deco: (c, ou) => spots([[90, 86, 3.5], [104, 80, 3.2], [118, 84, 3.5]], dk(c.a, .45))
    }), 66);
  };
  ART.iguanodon = () => {
    const c = C('#69a5d8', '#e2f0fb', '#3a6ea5');
    return wrap(quadTpl(c, {
      legs: [[60, 108, 20], [86, 112, 20], [122, 106, 18], [144, 110, 18]], body: [102, 96, 48, 32, -8],
      tailBase: [58, 96], tailTip: [4, 112], tailTh: 24, sag: -4,
      neck: { pts: [[134, 82], [152, 70], [160, 54]], w: 22 },
      head: { x: 162, y: 50, s: 0.98, svg: headBeak(c, { sx: 1.25, sy: 0.95 }) },
      deco: (c, ou) => spots([[84, 86, 3.4], [100, 80, 3], [116, 84, 3.4]], dk(c.a, .4)),
      front: (c, ou) => path('M142,106 L158,92 L152,112Z', '#fffbe8', ou, 2.6) // 엄지 가시
    }), 76);
  };
  ART.parasaurolophus = () => {
    const c = C('#e1a63e', '#fdf0c8', '#d7523a');
    const ou = dk(c.a);
    return wrap(theropodTpl(c, {
      hipX: 104, hipY: 114, leg: 22, body: [108, 98, 40, 30, -12], tailBase: [72, 100], tailTip: [4, 122], tailTh: 24, sag: -4,
      neck: { pts: [[134, 84], [152, 74], [160, 56]], w: 20 },
      head: { x: 162, y: 52, s: 0.98, svg: headDuck(c) + path('M0,-20 C-20,-40 -50,-36 -62,-8 C-54,-18 -38,-22 -22,-14 C-14,-12 -6,-8 0,-6Z', c.d, dk(c.d, .5)) + stroke('M-6,-18 C-24,-34 -44,-28 -54,-12', 2, lt(c.d, .5), 'opacity=".7"') },
      arm: [138, 104, 15, 1.1],
      deco: (c, ou) => bands([[88, 86, 3, 8, 0, 18], [100, 82, 3, 8, 0, 20], [112, 82, 3, 8, 0, 20]], dk(c.a, .45), 4)
    }), 66);
  };
  ART.pteranodon = () => pterosaur({ a: '#d96a4c', b: '#ffe3d3', d: '#e8c34a', wing: '#f1a98f' }, { crest: true, teeth: false, diamond: false, long: false, big: true });
  ART.koreaceratops = () => {
    const c = C('#e8a652', '#fff0d0', '#d86a50', '#f2a08a');
    const fin = (c, ou) => path('M74,98 C66,68 50,56 34,64 C24,70 20,84 14,92 C26,98 40,102 54,106Z', c.d, dk(c.d, .5), 3);
    return wrap(quadTpl(c, {
      legs: [[62, 116, 16], [84, 118, 16], [120, 116, 16], [138, 118, 16]], body: [100, 104, 44, 28, 0],
      tailBase: [62, 104], tailTip: [10, 112], tailTh: 22, sag: 0,
      back: fin,
      head: { x: 146, y: 108, s: 0.92, svg: headCerato(c, { frill: 0.45, brow: false, nose: false, frillDots: false }) },
      deco: (c, ou) => spots([[84, 96, 3], [98, 92, 3], [112, 96, 3]], dk(c.a, .4))
    }), 66);
  };

  /* 하늘 친구: 날개 달린 파충류 */
  function pterosaur(c, o) {
    const ou = dk(c.a), wing = c.wing;
    const sc = o.big ? 1 : 0.9;
    let s = '';
    const far = grp('wingB', 118, 82, path('M118,82 C104,56 84,40 52,32 C66,48 62,62 50,70 C76,66 92,72 100,84Z', mix(wing, '#2a1626', .25), ou) + stroke('M118,82 L52,34', 3, ou));
    s += far;
    if (o.long) s += grp('tail', 90, 98, stroke('M90,100 C64,110 44,114 26,112', 5, ou) + stroke('M90,100 C64,110 44,114 26,112', 2.4, c.a) + path('M26,112 l-12,-9 l-3,9 l3,9Z', c.d, ou, 2.6));
    else s += grp('tail', 90, 100, stroke('M90,100 C74,106 62,108 50,106', 5, ou) + stroke('M90,100 C74,106 62,108 50,106', 2.4, c.a));
    s += ell(112, 94, 30, 20, c.a, ou, SW, -8);
    s += ell(116, 102, 22, 11, c.b, '', 0, -6);
    s += neckStroke([[132, 88], [146, 80], [148, 70]], 12, c.a, ou);
    s += `<path d="M104,112 l-10,16 l16,-6Z" fill="${c.a}" stroke="${ou}" stroke-width="2.4" stroke-linejoin="round"/>`;
    s += grp('head', 148, 66, `<g transform="translate(148 66) scale(${o.big ? 1.1 : 0.95})">${headPtero(c, o)}</g>`);
    const near = grp('wingF', 118, 84, path('M118,84 C100,52 78,34 40,24 C56,44 50,60 38,70 C68,64 88,70 98,86 C104,90 114,90 118,84Z', wing, ou) +
      stroke('M118,84 L42,26', 3.4, ou) + stroke('M42,26 L40,68', 2, ou, 'opacity=".5"') + stroke('M98,86 L52,66', 2, ou, 'opacity=".4"'));
    s += near;
    return `<svg class="dino-svg fly" viewBox="0 0 240 170" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><g class="bob">${s}</g></svg>`;
  }

  window.DinoArt = {
    svg(id) { return ART[id] ? ART[id]() : ''; },
    ids: Object.keys(ART)
  };
})();
