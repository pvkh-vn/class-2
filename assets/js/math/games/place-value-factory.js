(function () {
  'use strict';

  const GAME_ID = 'place-value-factory';
  let root = null;
  let state = null;
  let dragKind = null;

  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

  function startPlaceValueFactoryGame() {
    root = document.getElementById('game-play-container');
    if (!root) return;
    injectStyle();
    state = {
      round: 1,
      score: 0,
      level: 1,
      target: 0,
      hundreds: 0,
      tens: 0,
      ones: 0,
      locked: false,
      message: ''
    };
    newRound();
  }

  function stopPlaceValueFactoryGame() {
    dragKind = null;
    state = null;
    root = null;
  }

  function injectStyle() {
    if (document.getElementById('ee-place-value-factory-style')) return;
    const style = document.createElement('style');
    style.id = 'ee-place-value-factory-style';
    style.textContent = `
      .pvf-block{transition:transform .16s ease,box-shadow .16s ease}.pvf-block:active{transform:scale(.95)}
      .pvf-bin{min-height:210px}.pvf-pop{animation:pvfPop .28s ease}.pvf-belt{background:repeating-linear-gradient(90deg,#e2e8f0 0 22px,#f8fafc 22px 44px)}
      @keyframes pvfPop{0%{transform:scale(.78)}70%{transform:scale(1.08)}100%{transform:scale(1)}}
      @keyframes pvfFly{0%{transform:translateY(0)}50%{transform:translateY(-10px)}100%{transform:translateY(0)}}
      .pvf-success{animation:pvfFly .55s ease}
    `;
    document.head.appendChild(style);
  }

  function newRound() {
    if (!state) return;
    state.locked = false;
    state.message = '';
    state.hundreds = 0;
    state.tens = 0;
    state.ones = 0;
    state.level = state.round >= 7 ? 3 : state.round >= 4 ? 2 : 1;
    if (state.level === 1) {
      state.target = rnd(21, 89);
    } else if (state.level === 2) {
      state.target = rnd(101, 399);
    } else {
      const h = rnd(1, 5);
      const t = rnd(0, 8);
      const o = rnd(0, 9);
      state.target = h * 100 + t * 10 + o;
    }
    render();
  }

  function valueNow() {
    return state.hundreds * 100 + state.tens * 10 + state.ones;
  }

  function warehouseCard(kind, label, sub, visual, tone) {
    return `<button type="button" draggable="true" data-pvf-add="${kind}" data-pvf-drag="${kind}"
      class="pvf-block w-full rounded-2xl border-2 ${tone} bg-white p-3 text-center shadow-sm hover:shadow-md">
      <div class="mx-auto mb-2 flex min-h-[64px] items-center justify-center">${visual}</div>
      <div class="text-lg md:text-xl font-black text-slate-800">${label}</div>
      <div class="text-sm md:text-base font-extrabold text-slate-500">${sub}</div>
    </button>`;
  }

  function render() {
    if (!root || !state) return;
    const allowHundreds = state.level >= 2;
    root.innerHTML = `
      <div class="w-full max-w-[1280px] mx-auto px-2 md:px-4 pb-4 select-none">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <div class="text-sm md:text-base font-black text-emerald-600">🏭 NHÀ MÁY ĐỔI CHỤC</div>
            <h2 class="text-xl md:text-2xl font-black text-slate-800">Xây đúng số bằng các khối giá trị hàng</h2>
          </div>
          <div class="flex items-center gap-2 text-sm md:text-base font-black">
            <span class="rounded-full bg-violet-100 text-violet-700 px-3 py-1">Màn ${state.round}</span>
            <span class="rounded-full bg-amber-100 text-amber-700 px-3 py-1">⭐ ${state.score}</span>
          </div>
        </div>

        <div class="grid lg:grid-cols-[minmax(0,1.8fr)_minmax(300px,.8fr)] gap-4 items-stretch">
          <section class="rounded-[28px] border-2 border-sky-200 bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-4 md:p-5 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <div class="text-sm font-black text-slate-500">ĐƠN HÀNG CỦA NHÀ MÁY</div>
                <div class="mt-1 text-lg md:text-xl font-extrabold text-slate-700">Hãy tạo số</div>
              </div>
              <div class="min-w-[150px] rounded-3xl border-4 border-rose-300 bg-white px-6 py-3 text-center shadow-sm">
                <span class="text-4xl md:text-5xl font-black text-rose-600">${state.target}</span>
              </div>
            </div>

            <div class="grid ${allowHundreds ? 'grid-cols-3' : 'grid-cols-2'} gap-3">
              ${allowHundreds ? binHtml('hundreds', 'HÀNG TRĂM', state.hundreds, '100', 'amber') : ''}
              ${binHtml('tens', 'HÀNG CHỤC', state.tens, '10', 'sky')}
              ${binHtml('ones', 'HÀNG ĐƠN VỊ', state.ones, '1', 'emerald')}
            </div>

            <div class="mt-4 rounded-2xl border-2 border-slate-200 bg-white p-3 md:p-4">
              <div class="flex flex-wrap items-center justify-center gap-2 text-xl md:text-2xl font-black">
                ${allowHundreds ? `<span class="text-amber-600">${state.hundreds} × 100</span><span>+</span>` : ''}
                <span class="text-sky-600">${state.tens} × 10</span><span>+</span>
                <span class="text-emerald-600">${state.ones} × 1</span><span>=</span>
                <span class="rounded-xl bg-rose-50 px-3 py-1 text-rose-600">${valueNow()}</span>
              </div>
            </div>

            <div id="pvf-message" class="min-h-[48px] mt-3 flex items-center justify-center text-center text-base md:text-lg font-black ${state.message.startsWith('✅') ? 'text-emerald-700' : 'text-rose-600'}">${state.message}</div>
          </section>

          <aside class="rounded-[28px] border-2 border-violet-200 bg-violet-50/60 p-4 shadow-sm">
            <div class="text-center mb-3">
              <div class="text-lg md:text-xl font-black text-violet-700">Kho khối</div>
              <p class="text-sm md:text-base font-bold text-slate-600">Kéo vào đúng hàng hoặc chạm để thêm</p>
            </div>
            <div class="grid ${allowHundreds ? 'grid-cols-3 lg:grid-cols-1' : 'grid-cols-2 lg:grid-cols-1'} gap-2.5">
              ${allowHundreds ? warehouseCard('hundreds','1 trăm','100','<div class="grid grid-cols-5 gap-[2px] rounded-lg bg-amber-200 p-2">'+Array.from({length:25},()=>'<i class="w-2 h-2 bg-amber-500 rounded-[2px]"></i>').join('')+'</div>','border-amber-200') : ''}
              ${warehouseCard('tens','1 chục','10','<div class="flex gap-[2px] rounded-lg bg-sky-100 p-2">'+Array.from({length:10},()=>'<i class="w-2 h-12 bg-sky-500 rounded-sm"></i>').join('')+'</div>','border-sky-200')}
              ${warehouseCard('ones','1 đơn vị','1','<div class="w-14 h-14 rounded-xl bg-emerald-400 border-4 border-emerald-200 shadow-inner"></div>','border-emerald-200')}
            </div>

            <div class="mt-3 grid grid-cols-2 gap-2">
              <button data-pvf-action="undo" class="rounded-2xl border-2 border-slate-200 bg-white py-3 text-base font-black text-slate-700 hover:bg-slate-50">↶ Bớt 1</button>
              <button data-pvf-action="clear" class="rounded-2xl border-2 border-slate-200 bg-white py-3 text-base font-black text-slate-700 hover:bg-slate-50">🧹 Làm lại</button>
            </div>
            <button data-pvf-action="check" class="mt-2 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-lg font-black text-white shadow-md hover:brightness-105">✓ Kiểm tra đơn hàng</button>
            ${state.ones >= 10 ? '<button data-pvf-action="bundle10" class="mt-2 w-full rounded-2xl border-2 border-sky-300 bg-sky-50 py-3 text-base font-black text-sky-700">✨ Gom 10 đơn vị → 1 chục</button>' : ''}
            ${state.tens >= 10 && allowHundreds ? '<button data-pvf-action="bundle100" class="mt-2 w-full rounded-2xl border-2 border-amber-300 bg-amber-50 py-3 text-base font-black text-amber-700">✨ Gom 10 chục → 1 trăm</button>' : ''}
          </aside>
        </div>
      </div>`;
    bind();
  }

  function binHtml(kind, title, count, value, tone) {
    const toneMap = {
      amber: ['border-amber-300','bg-amber-50','text-amber-700'],
      sky: ['border-sky-300','bg-sky-50','text-sky-700'],
      emerald: ['border-emerald-300','bg-emerald-50','text-emerald-700']
    }[tone];
    const blocks = count === 0 ? '<span class="text-slate-300 text-base font-bold">Thả khối vào đây</span>' : Array.from({length:Math.min(count,18)},(_,i)=>{
      if (kind === 'hundreds') return '<span class="w-10 h-10 rounded-lg bg-amber-300 border-2 border-amber-400 shadow-sm pvf-pop"></span>';
      if (kind === 'tens') return '<span class="w-5 h-14 rounded-md bg-sky-400 border-2 border-sky-500 shadow-sm pvf-pop"></span>';
      return '<span class="w-9 h-9 rounded-lg bg-emerald-400 border-2 border-emerald-500 shadow-sm pvf-pop"></span>';
    }).join('') + (count > 18 ? `<span class="font-black text-slate-500">+${count-18}</span>` : '');
    return `<div data-pvf-drop="${kind}" class="pvf-bin rounded-3xl border-2 ${toneMap[0]} ${toneMap[1]} p-3 flex flex-col">
      <div class="flex items-center justify-between gap-2 mb-2"><span class="text-sm md:text-base font-black ${toneMap[2]}">${title}</span><span class="rounded-full bg-white px-3 py-1 text-lg font-black ${toneMap[2]}">${count}</span></div>
      <div class="flex-1 flex flex-wrap content-center justify-center gap-2">${blocks}</div>
      <div class="text-center text-sm font-black ${toneMap[2]}">Mỗi khối = ${value}</div>
    </div>`;
  }

  function bind() {
    if (!root) return;
    root.querySelectorAll('[data-pvf-add]').forEach(btn => btn.addEventListener('click', () => add(btn.dataset.pvfAdd)));
    root.querySelectorAll('[data-pvf-drag]').forEach(btn => btn.addEventListener('dragstart', (e) => {
      dragKind = btn.dataset.pvfDrag;
      try { e.dataTransfer.setData('text/plain', dragKind); } catch (_) {}
    }));
    root.querySelectorAll('[data-pvf-drop]').forEach(zone => {
      zone.addEventListener('dragover', e => e.preventDefault());
      zone.addEventListener('drop', e => {
        e.preventDefault();
        const k = (e.dataTransfer && e.dataTransfer.getData('text/plain')) || dragKind;
        if (k === zone.dataset.pvfDrop) add(k);
        else flash('Khối phải đặt đúng hàng của nó nhé!');
      });
    });
    root.querySelectorAll('[data-pvf-action]').forEach(btn => btn.addEventListener('click', () => action(btn.dataset.pvfAction)));
  }

  function add(kind) {
    if (!state || state.locked) return;
    if (kind === 'hundreds') state.hundreds++;
    if (kind === 'tens') state.tens++;
    if (kind === 'ones') state.ones++;
    state.message = '';
    render();
  }

  function action(a) {
    if (!state || state.locked) return;
    if (a === 'clear') { state.hundreds = 0; state.tens = 0; state.ones = 0; state.message=''; render(); return; }
    if (a === 'undo') {
      if (state.ones > 0) state.ones--;
      else if (state.tens > 0) state.tens--;
      else if (state.hundreds > 0) state.hundreds--;
      state.message=''; render(); return;
    }
    if (a === 'bundle10' && state.ones >= 10) { state.ones -= 10; state.tens += 1; state.message = '✅ 10 đơn vị đã được đổi thành 1 chục.'; render(); return; }
    if (a === 'bundle100' && state.tens >= 10) { state.tens -= 10; state.hundreds += 1; state.message = '✅ 10 chục đã được đổi thành 1 trăm.'; render(); return; }
    if (a === 'check') check();
  }

  function flash(msg) {
    state.message = msg;
    render();
  }

  function check() {
    const now = valueNow();
    if (now === state.target) {
      state.locked = true;
      state.score++;
      state.message = `✅ Chính xác! ${state.target} = ${state.hundreds ? state.hundreds + ' trăm + ' : ''}${state.tens} chục + ${state.ones} đơn vị.`;
      render();
      const panel = root && root.querySelector('section');
      if (panel) panel.classList.add('pvf-success');
      setTimeout(() => {
        if (!state) return;
        state.round++;
        if (state.round === 6 && typeof window.rewardMiniGameStar_ === 'function') window.rewardMiniGameStar_('Bé đã vận hành Nhà máy đổi chục rất tốt!');
        newRound();
      }, 1150);
    } else {
      const diff = state.target - now;
      state.message = diff > 0 ? `Chưa đủ đâu bé. Nhà máy còn thiếu ${diff}.` : `Đang nhiều hơn ${Math.abs(diff)}. Bé bớt khối hoặc đổi lại nhé!`;
      render();
    }
  }

  window.startPlaceValueFactoryGame = startPlaceValueFactoryGame;
  window.stopPlaceValueFactoryGame = stopPlaceValueFactoryGame;
})();
