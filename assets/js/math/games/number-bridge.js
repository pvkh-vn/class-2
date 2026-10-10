(function () {
  'use strict';

  // Number Bridge - Toan 2
  // 6 cap do: trong pham vi 20 -> 100, tim doan thieu, dung so doan,
  // khong duoc dung doan 5, va tim hai cach khac nhau.
  const LEVELS = {
    l1: { label: 'Cấp 1 · Cầu đến 20', mode: 'to20' },
    l2: { label: 'Cấp 2 · Cầu đến 100', mode: 'to100' },
    l3: { label: 'Cấp 3 · Còn thiếu bao nhiêu?', mode: 'missing' },
    l4: { label: 'Cấp 4 · Đúng 2–3 đoạn', mode: 'exactPieces' },
    l5: { label: 'Cấp 5 · Ghép cầu thử thách', mode: 'banFive' },
    l6: { label: 'Cấp 6 · Tìm 2 cách khác nhau', mode: 'alternate' }
  };

  const PALETTES = ['#f59e0b', '#38bdf8', '#8b5cf6', '#14b8a6', '#fb7185', '#22c55e', '#f97316'];
  const st = {
    level: 'l1', round: 0, score: 0, errors: 0,
    target: 12, pieces: [], fixed: [], inventory: [],
    exactCount: null, banned: null, missingAnswer: null,
    firstSolution: null, solved: false, lock: false
  };

  function rand_(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
  function pick_(arr) { return arr[rand_(0, arr.length - 1)]; }
  function shuffle_(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function sum_(a) { return a.reduce((s, n) => s + Number(n || 0), 0); }
  function key_(a) { return a.slice().sort((x, y) => x - y).join('+'); }
  function clamp_(n, a, b) { return Math.max(a, Math.min(b, n)); }
  function uniq_(a) { return [...new Set(a.map(Number).filter(Number.isFinite))]; }
  function range_(start, end, step) { const a = []; for (let n = start; n <= end; n += step) a.push(n); return a; }

  function injectStyle_() {
    if (document.getElementById('number-bridge-style')) return;
    const s = document.createElement('style');
    s.id = 'number-bridge-style';
    s.textContent = `
      .nb-shell{width:100%;max-width:none;margin:0 auto;font-family:inherit;color:#0f172a}
      .nb-head{border:2px solid #bfdbfe;background:linear-gradient(135deg,#eff6ff,#faf5ff);border-radius:24px;padding:14px 16px;margin-bottom:12px}
      .nb-title{font-size:22px;font-weight:1000;color:#4338ca;line-height:1.2}.nb-subtitle{font-size:15px;font-weight:800;color:#475569;margin-top:3px}
      .nb-levels{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:12px}
      .nb-level{min-height:56px;border:2px solid #c7d2fe;background:#fff;border-radius:16px;padding:8px 10px;font-weight:1000;color:#4338ca;transition:.16s;font-size:15px}
      .nb-level:hover{transform:translateY(-1px);box-shadow:0 5px 14px rgba(79,70,229,.11)}
      .nb-level.is-active{color:#fff;border-color:#c4b5fd;background:linear-gradient(135deg,#4f46e5,#8b5cf6);box-shadow:0 5px 16px rgba(99,102,241,.25)}
      .nb-layout{display:grid;grid-template-columns:minmax(0,2.35fr) minmax(300px,.72fr);gap:12px;align-items:start}
      .nb-card,.nb-side{background:#fff;border:2px solid #c7d2fe;border-radius:24px;box-shadow:0 6px 18px rgba(15,23,42,.06)}
      .nb-card{padding:0!important;overflow:visible;border:0!important;background:transparent!important;box-shadow:none!important;min-width:0}
      .nb-side{min-width:0;font-size:16px;line-height:1.5}
      .nb-dock{margin-top:12px;padding:12px 14px 14px;border:2px solid #bae6fd;border-radius:22px;background:linear-gradient(135deg,#f0f9ff,#fdf4ff);box-shadow:0 6px 18px rgba(15,23,42,.06)}
      .nb-dock-title{text-align:center;font-weight:1000;color:#334155;margin-bottom:9px;font-size:18px}
      .nb-board{position:relative;width:100%;aspect-ratio:16/9;min-height:0;overflow:hidden;border-radius:22px;background:#7dd3fc var(--nb-scene-image,url('assets/images/Math scenes/number-bridge-river.jpg')) center/cover no-repeat;box-shadow:inset 0 0 0 1px rgba(255,255,255,.45)}
      .nb-board:after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(255,255,255,.02),transparent 44%,rgba(2,132,199,.08));z-index:1}
      .nb-sky-label{position:absolute;top:4.5%;left:50%;transform:translateX(-50%);z-index:8;border-radius:999px;padding:7px 15px;background:rgba(255,255,255,.94);border:2px solid #93c5fd;color:#1d4ed8;font-weight:1000;font-size:17px;box-shadow:0 4px 12px rgba(15,23,42,.1);white-space:nowrap}
      .nb-water-shimmer{position:absolute;left:4%;right:4%;bottom:4%;height:36%;pointer-events:none;z-index:2;overflow:hidden;opacity:.72}
      .nb-ripple{position:absolute;width:76px;height:16px;border:3px solid rgba(255,255,255,.58);border-color:rgba(255,255,255,.58) transparent transparent transparent;border-radius:50%;animation:nb-ripple 3.2s ease-in-out infinite}
      .nb-ripple.r1{left:18%;top:24%;animation-delay:-1.3s}.nb-ripple.r2{right:16%;top:52%;animation-delay:-2.1s}.nb-ripple.r3{left:48%;top:72%;animation-delay:-.6s}
      .nb-fishes{position:absolute;left:7%;right:7%;top:64%;bottom:7%;pointer-events:none;z-index:3;overflow:hidden}
      .nb-fish{position:absolute;width:34px;height:18px;border-radius:55% 48% 48% 55%;background:var(--fc,#fb923c);box-shadow:inset -7px -4px 0 rgba(0,0,0,.08),inset 5px 4px 0 rgba(255,255,255,.28),0 3px 6px rgba(3,105,161,.18);animation:nb-swim var(--dur,9s) linear infinite;animation-delay:var(--delay,0s)}
      .nb-fish:before{content:'';position:absolute;right:-12px;top:3px;border-top:6px solid transparent;border-bottom:6px solid transparent;border-left:13px solid var(--fc,#fb923c);filter:brightness(.92)}
      .nb-fish:after{content:'';position:absolute;left:7px;top:4px;width:4px;height:4px;border-radius:50%;background:#0f172a;box-shadow:0 0 0 2px rgba(255,255,255,.9)}
      .nb-fish.f1{top:8%;--dur:10s;--delay:-1s;--fc:#fb923c}.nb-fish.f2{top:46%;--dur:12.5s;--delay:-5s;--fc:#f472b6;transform:scale(.86)}.nb-fish.f3{top:72%;--dur:9s;--delay:-2s;--fc:#22c55e;transform:scale(.72)}.nb-fish.f4{top:27%;--dur:14s;--delay:-8s;--fc:#38bdf8;transform:scale(.95)}
      .nb-goal{position:absolute;top:34%;right:3%;width:70px;height:84px;border-radius:38px 38px 12px 12px;background:rgba(255,255,255,.92);border:4px solid #f59e0b;display:flex;align-items:center;justify-content:center;font-size:36px;box-shadow:0 6px 18px rgba(146,64,14,.22);z-index:7}
      .nb-runner{position:absolute;left:4.7%;top:36.5%;font-size:40px;z-index:8;transition:left 1.2s ease,transform .4s ease;filter:drop-shadow(0 3px 3px rgba(0,0,0,.2))}.nb-runner.run{left:89%;transform:translateY(-3px) rotate(4deg)}
      .nb-bridge-zone{position:absolute;left:17.6%;right:17.2%;top:40.3%;height:126px;z-index:6}
      .nb-grid{position:absolute;left:0;right:0;top:0;height:78px;border:3px solid rgba(255,255,255,.93);border-radius:16px;background:rgba(255,255,255,.15);display:grid;align-items:stretch;overflow:visible;box-shadow:0 5px 18px rgba(30,64,175,.20)}
      .nb-cell{border-right:2px dashed rgba(255,255,255,.68);position:relative}.nb-cell:last-child{border-right:0}
      .nb-cell span{position:absolute;left:100%;top:100%;transform:translate(-50%,7px);font-size:11px;font-weight:1000;color:#fff;text-shadow:0 2px 4px rgba(2,48,71,.8);white-space:nowrap}
      .nb-built{position:absolute;left:0;right:0;top:8px;height:60px;display:flex;align-items:stretch;gap:2px;overflow:visible}
      .nb-piece{height:60px;border-radius:10px;border:3px solid rgba(255,255,255,.96);background:linear-gradient(180deg,color-mix(in srgb,var(--pc,#f59e0b) 72%,#fff 28%) 0%,var(--pc,#f59e0b) 46%,color-mix(in srgb,var(--pc,#f59e0b) 72%,#7c2d12 28%) 100%)!important;box-shadow:inset 0 8px 0 rgba(255,255,255,.38),inset 0 -8px 0 rgba(124,74,23,.22),0 0 0 2px rgba(255,255,255,.18),0 6px 14px rgba(15,23,42,.18);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:1000;font-size:22px;flex:none;position:relative;overflow:visible;min-width:0}
      .nb-piece:before{content:'';position:absolute;inset:0;border-radius:7px;background:repeating-linear-gradient(90deg,rgba(255,255,255,.08) 0 14px,rgba(0,0,0,.06) 14px 28px);pointer-events:none}.nb-piece b{position:relative;z-index:2;text-shadow:0 2px 3px rgba(0,0,0,.2)}
      .nb-piece small{position:absolute;bottom:2px;left:50%;transform:translateX(-50%);font-size:10px;z-index:2;white-space:nowrap}.nb-piece.fixed{filter:saturate(.78);opacity:.92}.nb-piece.overflow{outline:4px solid #ef4444;animation:nb-shake .3s ease}
      .nb-piece.tiny b{position:absolute;top:-29px;background:#fff;color:#4338ca;border:2px solid #c4b5fd;border-radius:10px;padding:2px 7px;font-size:15px;text-shadow:none}.nb-piece.tiny small{display:none}
      .nb-missing-slot{height:60px;border:3px dashed #fde68a;border-radius:10px;background:rgba(255,251,235,.88);color:#b45309;display:flex;align-items:center;justify-content:center;font-weight:1000;font-size:26px;flex:none;box-shadow:0 5px 12px rgba(180,83,9,.12)}
      .nb-progress{position:absolute;left:14%;right:14%;top:73%;height:13px;background:#e2e8f0;border-radius:999px;overflow:hidden;z-index:6}.nb-progress i{display:block;height:100%;width:0;background:linear-gradient(90deg,#34d399,#22c55e);transition:.25s}
      .nb-sum{position:absolute;left:50%;top:79%;transform:translateX(-50%);font-size:clamp(21px,2.4vw,32px);font-weight:1000;color:#0f172a;background:rgba(255,255,255,.93);border:2px solid #bae6fd;border-radius:18px;padding:8px 14px;min-width:250px;text-align:center;z-index:7}.nb-sum.live{font-size:clamp(18px,2vw,27px)}
      .nb-pieces{display:grid;grid-template-columns:repeat(auto-fit,minmax(115px,1fr));gap:10px}.nb-piece-btn{min-height:68px;border:2px solid #bfdbfe;background:#fff;border-radius:16px;font-size:20px;font-weight:1000;color:#1e40af;transition:.15s;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 3px 8px rgba(30,64,175,.08);position:relative}.nb-piece-btn:hover{transform:translateY(-2px);background:#eff6ff;box-shadow:0 6px 12px rgba(30,64,175,.14)}.nb-piece-btn:active{transform:translateY(0) scale(.98)}.nb-piece-btn:disabled{opacity:.38;cursor:not-allowed;transform:none;box-shadow:none}
      .nb-piece-btn.is-banned{border-color:#fecaca;background:#fff7f7;color:#dc2626}.nb-piece-btn.is-banned:after{content:'CẤM';position:absolute;top:4px;right:5px;font-size:9px;background:#fee2e2;color:#b91c1c;border-radius:999px;padding:1px 5px}
      .nb-mini-bar{display:inline-block;height:18px;border-radius:6px;border:2px solid rgba(255,255,255,.95);box-shadow:0 2px 5px rgba(15,23,42,.14);min-width:24px;max-width:58px}
      .nb-stat{border-radius:999px;padding:8px 11px;font-size:15px;font-weight:1000;border:1px solid #e2e8f0;background:#fff}.nb-feedback{min-height:62px;border-radius:16px;padding:12px 14px;background:#f8fafc;border:1px solid #e2e8f0;font-size:16px;line-height:1.5;font-weight:850;color:#475569;text-align:center}.nb-action{min-height:46px;border-radius:14px;padding:10px 13px;font-weight:1000;font-size:16px}
      .nb-mission{border-radius:18px;padding:14px;background:#eef2ff;border:1px solid #c7d2fe;font-size:16px;line-height:1.45}.nb-mission strong{display:block;color:#4338ca;font-size:20px;margin-bottom:6px}.nb-condition{margin-top:9px;border-radius:12px;background:#fff;padding:9px 11px;border:1px solid #ddd6fe;font-size:16px;font-weight:1000;color:#5b21b6}
      .nb-goal-line{display:flex;align-items:center;gap:8px;font-size:21px;line-height:1.25;font-weight:1000;color:#1e3a8a}.nb-goal-line+.nb-goal-line{margin-top:8px}.nb-big-target{font-size:28px;color:#1d4ed8}.nb-exact-count{display:inline-flex;align-items:center;justify-content:center;min-width:34px;padding:1px 8px;border-radius:10px;background:#fee2e2;color:#dc2626;font-size:28px;line-height:1;font-weight:1000;border:2px solid #fecaca}
      .nb-first-solution{margin-top:10px;padding:9px 11px;border:2px dashed #c4b5fd;border-radius:13px;background:#faf5ff;color:#6d28d9;font-weight:1000}.nb-first-solution b{color:#4338ca;font-size:18px}
      .nb-hint{margin-top:8px;padding:8px 10px;border-radius:12px;background:#fffbeb;border:1px solid #fde68a;color:#92400e;font-weight:850;font-size:14px}
      @keyframes nb-shake{25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
      @keyframes nb-swim{0%{translate:-18% 0}48%{translate:48% -6px}52%{translate:50% 2px}100%{translate:118% 0}}
      @keyframes nb-ripple{0%,100%{transform:scaleX(.74);opacity:.25}50%{transform:scaleX(1.14);opacity:.9}}
      @media(max-width:900px){.nb-levels{grid-template-columns:repeat(2,minmax(0,1fr))}.nb-layout{grid-template-columns:1fr}.nb-side{order:2}.nb-board{aspect-ratio:15/10}.nb-bridge-zone{left:16%;right:16%;}.nb-goal{right:1.8%;}.nb-runner{left:2.6%}.nb-runner.run{left:88%}}
      @media(max-width:560px){.nb-title{font-size:19px}.nb-level{font-size:13px;min-height:52px}.nb-board{aspect-ratio:4/3}.nb-sky-label{font-size:14px}.nb-bridge-zone{left:12%;right:12%;top:40%;}.nb-goal{width:54px;height:66px;font-size:29px;right:1%}.nb-runner{font-size:32px;left:1.5%}.nb-runner.run{left:87%}.nb-piece{font-size:17px}.nb-pieces{grid-template-columns:repeat(3,minmax(0,1fr))}.nb-piece-btn{min-height:60px;font-size:17px}.nb-sum{min-width:190px;padding:7px 10px}}
    `;
    document.head.appendChild(s);
  }

  function shell_() {
    injectStyle_();
    const root = document.getElementById('game-play-container') || document.getElementById('mini-game-stage') || document.getElementById('minigame-stage') || document.getElementById('game-stage');
    if (!root) return;
    root.innerHTML = `
      <div class="nb-shell">
        <section class="nb-head">
          <div class="flex items-start justify-between gap-3">
            <div><div class="nb-title">🌉 Cây cầu số · Vượt sông</div><div class="nb-subtitle">Toán 2: ghép cầu trong phạm vi 20–100, tìm phần thiếu và giải bằng nhiều cách.</div></div>
            <button type="button" onclick="numberBridgeSpeakRules()" class="shrink-0 rounded-2xl border-2 border-pink-200 bg-white px-4 py-2.5 font-black text-pink-600">🔊 Nghe luật chơi</button>
          </div>
          <div class="nb-levels">${Object.entries(LEVELS).map(([k,v]) => `<button id="nb-level-${k}" type="button" onclick="numberBridgeChooseLevel('${k}')" class="nb-level">${v.label}</button>`).join('')}</div>
        </section>
        <section class="nb-layout">
          <div class="nb-card">
            <div id="nb-board" class="nb-board" ondragover="numberBridgeDragOver(event)" ondrop="numberBridgeDrop(event)"></div>
            <div class="nb-dock"><div class="nb-dock-title">Kho đoạn cầu · kéo thả hoặc chạm để ghép</div><div id="nb-pieces" class="nb-pieces"></div></div>
          </div>
          <aside class="nb-side p-3 md:p-4 space-y-3">
            <div class="flex gap-2 flex-wrap justify-center"><span class="nb-stat">🎯 Lượt <b id="nb-round">0</b></span><span class="nb-stat">⭐ Đúng <b id="nb-score">0</b></span><span class="nb-stat">✏️ Sửa <b id="nb-errors">0</b></span></div>
            <div id="nb-mission" class="nb-mission"></div>
            <div id="nb-feedback" class="nb-feedback">Chọn một đoạn cầu để bắt đầu.</div>
            <div class="grid grid-cols-2 gap-2"><button type="button" onclick="numberBridgeUndo()" class="nb-action bg-white border-2 border-slate-200 text-slate-600">↶ Tháo đoạn cuối</button><button type="button" onclick="numberBridgeReset()" class="nb-action bg-white border-2 border-slate-200 text-slate-600">↻ Làm lại</button></div>
            <button id="nb-new" type="button" onclick="numberBridgeNewRound()" class="nb-action w-full bg-gradient-to-r from-sky-500 to-violet-500 text-white">Cầu mới</button>
          </aside>
        </section>
      </div>`;
  }

  function makePiecesForTarget_(target, count, maxPiece, multiplesOf5) {
    const out = [];
    let remain = target;
    for (let i = 0; i < count - 1; i++) {
      const slots = count - i - 1;
      let min = multiplesOf5 ? 5 : 2;
      let max = Math.min(maxPiece, remain - slots * min);
      if (max < min) max = min;
      let n;
      if (multiplesOf5) {
        const vals = range_(min, max, 5);
        n = vals.length ? pick_(vals) : min;
      } else {
        n = rand_(min, max);
      }
      out.push(n); remain -= n;
    }
    out.push(remain);
    return out;
  }

  function buildInventory_(solution, target, mode) {
    let pool = solution.slice();
    if (mode === 'to20') pool.push(...range_(1, Math.min(10, target - 1), 1));
    else {
      pool.push(...range_(5, Math.min(50, target - 1), 5));
      // them mot vai doan le de bai Toan 2 khong chi quanh so tron chuc
      [12, 18, 22, 24, 25, 28, 32, 35, 40, 45].forEach(n => { if (n < target) pool.push(n); });
    }
    pool = uniq_(pool).filter(n => n > 0 && n < target);
    // Kho toi da 8 loai de nut luon to, de bam/keo tren tablet.
    const must = uniq_(solution);
    const rest = shuffle_(pool.filter(n => !must.includes(n))).slice(0, Math.max(0, 8 - must.length));
    return shuffle_(uniq_(must.concat(rest))).sort((a,b)=>a-b);
  }

  function allSolutions_(target, inv, minCount, maxCount, banned) {
    const vals = inv.filter(x => x !== banned).sort((a,b)=>a-b);
    const results = [];
    function rec(start, cur, total) {
      if (total === target) {
        if (cur.length >= minCount && cur.length <= maxCount) results.push(cur.slice());
        return;
      }
      if (total > target || cur.length >= maxCount) return;
      for (let i = start; i < vals.length; i++) rec(i, cur.concat(vals[i]), total + vals[i]);
    }
    rec(0, [], 0);
    const seen = new Set();
    return results.filter(r => { const k = key_(r); if (seen.has(k)) return false; seen.add(k); return true; });
  }

  function makeRound_() {
    const mode = LEVELS[st.level].mode;
    st.round++;
    st.solved = false; st.lock = false; st.pieces = []; st.fixed = [];
    st.firstSolution = null; st.exactCount = null; st.banned = null; st.missingAnswer = null;

    let solution = [];

    if (mode === 'to20') {
      st.target = rand_(8, 20);
      const count = rand_(2, 3);
      solution = makePiecesForTarget_(st.target, count, 10, false);
      st.inventory = buildInventory_(solution, st.target, mode);
    }

    if (mode === 'to100') {
      st.target = rand_(4, 10) * 10; // 40..100
      const count = rand_(2, 3);
      solution = makePiecesForTarget_(st.target, count, 50, true);
      st.inventory = buildInventory_(solution, st.target, mode);
    }

    if (mode === 'missing') {
      st.target = rand_(3, 9) * 10; // 30..90
      const count = rand_(2, 3);
      solution = makePiecesForTarget_(st.target, count, 45, true);
      const missIdx = rand_(0, solution.length - 1);
      st.missingAnswer = solution[missIdx];
      st.fixed = solution.filter((_, i) => i !== missIdx);
      st.inventory = buildInventory_([st.missingAnswer], st.target, mode);
      // giam kho xuong 6 de be tap trung vao phep tru tim phan thieu
      st.inventory = shuffle_(uniq_([st.missingAnswer].concat(st.inventory))).slice(0, 6).sort((a,b)=>a-b);
    }

    if (mode === 'exactPieces') {
      st.target = rand_(3, 9) * 10;
      st.exactCount = rand_(2, 3);
      solution = makePiecesForTarget_(st.target, st.exactCount, 50, true);
      st.inventory = buildInventory_(solution, st.target, mode);
    }

    if (mode === 'banFive') {
      st.target = rand_(2, 9) * 10;
      const count = rand_(2, 3);
      // Cấp 5 tạo thử thách bằng chính kho vật liệu: không đưa đoạn 5 ô vào kho.
      // Bé chỉ cần nhìn các đoạn đang có và tìm cách ghép, không phải đọc thêm một điều kiện cấm.
      solution = makePiecesForTarget_(st.target, count, 45, true);
      let guard = 0;
      while ((sum_(solution) !== st.target || solution.includes(5)) && guard++ < 40) {
        solution = makePiecesForTarget_(st.target, count, 45, true);
      }
      if (solution.includes(5) || sum_(solution) !== st.target) solution = [10, st.target - 10];
      st.inventory = buildInventory_(solution, st.target, mode).filter(n => n !== 5);
    }

    if (mode === 'alternate') {
      const candidates = [20, 30, 40, 50, 60, 70, 80, 90, 100];
      let tries = 0, sols = [];
      do {
        st.target = pick_(candidates);
        st.inventory = buildInventory_([5, 10, 15, 20, 25, 30].filter(n => n < st.target), st.target, mode);
        sols = allSolutions_(st.target, st.inventory, 2, 3, null);
        tries++;
      } while (sols.length < 2 && tries < 20);
      if (sols.length < 2) {
        st.target = 40;
        st.inventory = [5, 10, 15, 20, 25, 30, 35];
      }
    }

    render_();
  }

  function currentTotal_() { return sum_(st.fixed) + sum_(st.pieces); }

  function missionText_() {
    const mode = LEVELS[st.level].mode;
    if (mode === 'to20') return `<strong>🌉 Xây cầu trong phạm vi 20</strong><div>Ghép <b>2–3 đoạn</b> để tổng độ dài đúng <b>${st.target} ô</b>.</div><div class="nb-hint">💡 Con có thể nhẩm từng bước: đoạn thứ nhất + đoạn thứ hai + ...</div>`;
    if (mode === 'to100') return `<strong>🌉 Cây cầu dài đến 100</strong><div>Ghép các đoạn để được đúng <b>${st.target} ô</b>. Mỗi đoạn có thể dài hàng chục ô.</div><div class="nb-hint">💡 Ưu tiên ghép các chục trước, rồi kiểm tra tổng.</div>`;
    if (mode === 'missing') {
      const fixed = st.fixed.join(' + ');
      return `<strong>🧩 Còn thiếu bao nhiêu?</strong><div>Cầu cần dài <b>${st.target} ô</b>, đã có <b>${fixed} = ${sum_(st.fixed)} ô</b>.</div><div class="nb-condition">? = ${st.target} − ${sum_(st.fixed)}</div><div class="nb-hint">💡 Chỉ chọn <b>1 đoạn</b> còn thiếu để cầu vừa khít.</div>`;
    }
    if (mode === 'exactPieces') return `<strong>🎯 Đúng số đoạn</strong><div class="nb-goal-line">Mục tiêu: <span class="nb-big-target">${st.target} ô</span></div><div class="nb-goal-line">Chỉ dùng: <span class="nb-exact-count">${st.exactCount}</span> đoạn</div><div class="nb-hint">💡 Tổng đúng nhưng sai số đoạn vẫn chưa hoàn thành.</div>`;
    if (mode === 'banFive') return `<div class="nb-goal-line">🎯 Mục tiêu: <span class="nb-big-target">${st.target} ô</span></div><div class="nb-goal-line">🧩 Ghép cầu vừa khít</div>`;
    if (mode === 'alternate') return `<strong>🧠 Hai cách khác nhau</strong><div>Tìm <b>2 cách ghép khác nhau</b> cùng tạo cây cầu dài <b>${st.target} ô</b>.</div>${st.firstSolution ? `<div class="nb-first-solution">Cách 1: <b>${st.firstSolution.replaceAll('+', ' + ')} = ${st.target}</b><br>Giờ tìm cách 2 khác nhé!</div>` : `<div class="nb-hint">💡 Hai cách khác nhau phải dùng bộ đoạn khác nhau, không chỉ đổi thứ tự.</div>`}`;
    return '';
  }

  function tickModel_() {
    if (st.target <= 12) {
      return { count: st.target, labels: Array.from({length: st.target}, (_, i) => i + 1) };
    }
    if (st.target <= 20) {
      const count = 10;
      return { count, labels: Array.from({length: count}, (_, i) => Math.round((i + 1) * st.target / count)) };
    }
    const count = 10;
    return { count, labels: Array.from({length: count}, (_, i) => Math.round((i + 1) * st.target / count)) };
  }

  function pieceHtml_(n, i, fixed) {
    const width = n / st.target * 100;
    const color = PALETTES[i % PALETTES.length];
    const tiny = width < 10;
    return `<div class="nb-piece ${fixed ? 'fixed' : ''} ${tiny ? 'tiny' : ''}" style="width:calc(${width}% - 2px);--pc:${color}"><b>${n}</b><small>${n} ô</small></div>`;
  }

  function liveEquation_() {
    const arr = st.fixed.concat(st.pieces);
    if (!arr.length) return `0 / ${st.target} ô`;
    const total = sum_(arr);
    return `${arr.join(' + ')} = ${total} / ${st.target}`;
  }

  function render_() {
    const board = document.getElementById('nb-board');
    if (!board) return;
    const mode = LEVELS[st.level].mode;
    const total = currentTotal_();
    const pct = clamp_(total / st.target * 100, 0, 115);
    const tm = tickModel_();

    let built = '';
    st.fixed.forEach((n, i) => { built += pieceHtml_(n, i, true); });
    st.pieces.forEach((n, i) => { built += pieceHtml_(n, i + st.fixed.length, false); });
    if (mode === 'missing' && !st.solved && st.pieces.length === 0 && st.missingAnswer) {
      const w = st.missingAnswer / st.target * 100;
      built += `<div class="nb-missing-slot" style="width:calc(${w}% - 2px)">?</div>`;
    }

    board.innerHTML = `
      <div class="nb-water-shimmer"><i class="nb-ripple r1"></i><i class="nb-ripple r2"></i><i class="nb-ripple r3"></i></div>
      <div class="nb-fishes"><i class="nb-fish f1"></i><i class="nb-fish f2"></i><i class="nb-fish f3"></i><i class="nb-fish f4"></i></div>
      <div class="nb-sky-label">Độ dài cần xây: ${st.target} ô</div>
      <div class="nb-goal">🏡</div><div id="nb-runner" class="nb-runner">🐰</div>
      <div class="nb-bridge-zone">
        <div class="nb-grid" style="grid-template-columns:repeat(${tm.count},1fr)">${tm.labels.map(v => `<div class="nb-cell"><span>${v}</span></div>`).join('')}</div>
        <div class="nb-built">${built}</div>
      </div>
      <div class="nb-progress"><i style="width:${pct}%"></i></div>
      <div class="nb-sum live" id="nb-equation">${st.solved ? `${st.fixed.concat(st.pieces).join(' + ')} = ${st.target}` : liveEquation_()}</div>`;

    document.getElementById('nb-round').textContent = st.round;
    document.getElementById('nb-score').textContent = st.score;
    document.getElementById('nb-errors').textContent = st.errors;
    document.getElementById('nb-mission').innerHTML = missionText_();

    const box = document.getElementById('nb-pieces');
    box.innerHTML = st.inventory.map((n, i) => {
      const bannedCls = '';
      const disabled = st.solved || st.lock || (mode === 'missing' && st.pieces.length >= 1);
      const barW = Math.round(26 + Math.min(34, n / Math.max(1, st.target) * 90));
      return `<button type="button" draggable="true" ondragstart="numberBridgeDragStart(event,${n})" onclick="numberBridgeAdd(${n})" class="nb-piece-btn ${bannedCls}" ${disabled ? 'disabled' : ''}><span class="nb-mini-bar" style="width:${barW}px;background:${PALETTES[i % PALETTES.length]}"></span>${n} ô</button>`;
    }).join('');
    updateLevel_();
  }

  function updateLevel_() {
    Object.keys(LEVELS).forEach(k => document.getElementById('nb-level-' + k)?.classList.toggle('is-active', k === st.level));
  }
  function feedback_(t) { const el = document.getElementById('nb-feedback'); if (el) el.textContent = t; }

  function validateCondition_() {
    const mode = LEVELS[st.level].mode;
    const arr = st.fixed.concat(st.pieces);
    if (mode === 'missing' && st.pieces.length !== 1) return 'Màn này chỉ cần một đoạn còn thiếu.';
    if (st.exactCount != null && arr.length !== st.exactCount) return `Cầu đủ dài nhưng con dùng ${arr.length} đoạn. Nhiệm vụ cần đúng ${st.exactCount} đoạn.`;
    return '';
  }

  function success_() {
    const mode = LEVELS[st.level].mode;
    const arr = st.fixed.concat(st.pieces);
    const k = key_(arr);

    if (mode === 'alternate' && !st.firstSolution) {
      st.firstSolution = k;
      st.solved = true;
      render_();
      feedback_(`Đúng cách 1: ${arr.join(' + ')} = ${st.target}. Bây giờ tìm một bộ đoạn khác.`);
      setTimeout(() => {
        st.solved = false;
        st.pieces = [];
        render_();
        feedback_(`Cách 1 là ${st.firstSolution.replaceAll('+', ' + ')}. Hãy tìm cách 2 khác nhé!`);
      }, 1000);
      return;
    }

    if (mode === 'alternate' && k === st.firstSolution) {
      st.errors++;
      render_();
      feedback_('Bộ đoạn này giống cách 1 rồi. Đổi sang các độ dài khác nhé!');
      return;
    }

    st.solved = true;
    st.score++;
    render_();
    const runner = document.getElementById('nb-runner');
    if (runner) requestAnimationFrame(() => runner.classList.add('run'));

    let msg = `Cầu vừa khít! ${arr.join(' + ')} = ${st.target}.`;
    if (mode === 'missing') msg = `Đúng rồi! Còn thiếu ${st.missingAnswer} ô vì ${st.target} − ${sum_(st.fixed)} = ${st.missingAnswer}.`;
    if (mode === 'exactPieces') msg = `Đúng! ${arr.join(' + ')} = ${st.target} và con dùng đúng ${st.exactCount} đoạn.`;
    if (mode === 'banFive') msg = `Đúng rồi! ${arr.join(' + ')} = ${st.target}.`;
    if (mode === 'alternate') msg = `Tuyệt! Con đã tìm được cách thứ hai: ${arr.join(' + ')} = ${st.target}.`;
    feedback_(msg);

    if (typeof speakVietnamese === 'function') {
      const speech = msg.replaceAll('+', ' cộng ').replaceAll('−', ' trừ ').replaceAll('=', ' bằng ');
      speakVietnamese(speech, .9);
    }
    if (st.score > 0 && st.score % 10 === 0 && typeof rewardMiniGameStar_ === 'function') rewardMiniGameStar_('Bé đã hoàn thành 10 cây cầu số!');
  }

  function addPiece_(n) {
    n = Number(n);
    if (!Number.isFinite(n) || st.solved || st.lock) return;
    const mode = LEVELS[st.level].mode;

    if (mode === 'missing' && st.pieces.length >= 1) return;

    st.pieces.push(n);
    const total = currentTotal_();
    render_();

    if (total > st.target) {
      st.errors++;
      document.getElementById('nb-errors').textContent = st.errors;
      feedback_(`Cầu đang dài hơn mục tiêu ${total - st.target} ô. Hãy tháo đoạn cuối hoặc làm lại.`);
      return;
    }
    if (total < st.target) {
      const need = st.target - total;
      if (mode === 'missing') {
        st.errors++;
        feedback_(`Đoạn ${n} ô chưa đúng. Cầu vẫn còn thiếu ${need} ô. Con thử tính ${st.target} − ${sum_(st.fixed)} nhé!`);
      } else {
        feedback_(`Đã xây ${total} ô. Còn thiếu ${need} ô nữa.`);
      }
      return;
    }

    const problem = validateCondition_();
    if (problem) {
      st.errors++;
      document.getElementById('nb-errors').textContent = st.errors;
      feedback_(problem);
      return;
    }
    success_();
  }

  window.numberBridgeAdd = addPiece_;
  window.numberBridgeUndo = function () {
    if (st.solved || st.lock) return;
    if (st.pieces.length) {
      st.pieces.pop();
      render_();
      feedback_('Đã tháo đoạn cuối. Con thử cách khác nhé!');
    }
  };
  window.numberBridgeReset = function () {
    if (st.lock) return;
    st.pieces = [];
    st.solved = false;
    render_();
    feedback_('Cầu đã được làm lại từ đầu.');
  };
  window.numberBridgeNewRound = function () { makeRound_(); feedback_('Cây cầu mới đã sẵn sàng.'); };
  window.numberBridgeChooseLevel = function (level) {
    if (!LEVELS[level]) return;
    st.level = level; st.round = 0; st.score = 0; st.errors = 0;
    makeRound_();
  };
  window.numberBridgeDragStart = function (event, n) {
    if (!event?.dataTransfer) return;
    event.dataTransfer.setData('text/plain', String(n));
    event.dataTransfer.effectAllowed = 'copy';
  };
  window.numberBridgeDragOver = function (event) { event.preventDefault(); if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy'; };
  window.numberBridgeDrop = function (event) {
    event.preventDefault();
    const n = Number(event?.dataTransfer?.getData('text/plain'));
    if (Number.isFinite(n)) addPiece_(n);
  };
  window.numberBridgeSpeakRules = function () {
    if (typeof speakVietnamese === 'function') speakVietnamese('Con hãy kéo hoặc chạm các đoạn cầu để ghép vừa đúng độ dài cần xây. Toán lớp hai có sáu cấp: cầu đến hai mươi, cầu đến một trăm, tìm đoạn còn thiếu, dùng đúng hai hoặc ba đoạn, ghép cầu thử thách, và tìm hai cách ghép khác nhau. Nếu cầu còn ngắn, con tính phần còn thiếu. Nếu cầu quá dài, con tháo đoạn cuối và thử lại.', .88);
  };
  window.stopNumberBridgeGame = function () {};
  window.startNumberBridgeGame = function () { shell_(); if (st.round === 0) makeRound_(); else render_(); };
})();
