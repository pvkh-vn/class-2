(function(){
  'use strict';

  let root = null;
  let state = null;
  let successTimer = null;

  const LEVELS = [
    {id:1, label:'Cấp 1 · Ray đến 20'},
    {id:2, label:'Cấp 2 · Ray đến 100'},
    {id:3, label:'Cấp 3 · Còn thiếu bao nhiêu?'},
    {id:4, label:'Cấp 4 · Đúng số đoạn'},
    {id:5, label:'Cấp 5 · Qua ga trung chuyển'},
    {id:6, label:'Cấp 6 · Ít đoạn nhất'}
  ];

  const PALETTE = [
    ['#f59e0b','#fbbf24'], ['#0ea5e9','#38bdf8'], ['#8b5cf6','#a78bfa'],
    ['#14b8a6','#2dd4bf'], ['#f43f5e','#fb7185'], ['#22c55e','#4ade80'],
    ['#6366f1','#818cf8'], ['#f97316','#fb923c']
  ];

  function startNumberTrainGame(){
    root = document.getElementById('game-play-container');
    if(!root) return;
    injectStyle();
    state = {
      level: 1,
      round: 1,
      correct: 0,
      fixes: 0,
      selected: [],
      challenge: null,
      locked: false,
      arrived: false,
      message: '',
      messageTone: 'neutral',
      rewarded: false
    };
    newChallenge();
  }

  function stopNumberTrainGame(){
    if(successTimer) clearTimeout(successTimer);
    successTimer = null;
    state = null;
    root = null;
  }

  function injectStyle(){
    if(document.getElementById('ee-number-train-style')) return;
    const s = document.createElement('style');
    s.id = 'ee-number-train-style';
    s.textContent = `
      .nt-level-btn{transition:transform .14s ease,box-shadow .14s ease,background .14s ease}
      .nt-level-btn:active,.nt-piece:active{transform:scale(.98)}
      .nt-piece{transition:transform .13s ease,box-shadow .13s ease;cursor:grab}
      .nt-piece:hover{transform:translateY(-2px);box-shadow:0 8px 18px rgba(79,70,229,.12)}
      .nt-piece:active{cursor:grabbing}
      .nt-scene{background-image:var(--nt-scene-image,url('assets/images/Math scenes/number-train-valley.jpg'));background-size:cover;background-position:center;background-repeat:no-repeat}
      .nt-track-bed{box-shadow:inset 0 -7px 0 rgba(71,85,105,.2)}
      .nt-rail-seg{position:relative;min-width:0;overflow:hidden}
      .nt-rail-seg:before,.nt-rail-seg:after{content:'';position:absolute;left:0;right:0;height:5px;background:#475569;border-radius:999px}
      .nt-rail-seg:before{top:13px}.nt-rail-seg:after{bottom:13px}
      .nt-rail-sleeper{background:repeating-linear-gradient(90deg,transparent 0 12px,rgba(71,85,105,.42) 12px 16px,transparent 16px 28px)}
      .nt-train{position:absolute;z-index:25;top:calc(45% - 50px);bottom:auto;left:5%;transition:left 1.55s cubic-bezier(.22,.9,.28,1);filter:drop-shadow(0 5px 5px rgba(15,23,42,.2));pointer-events:none}
      .nt-wheel{animation:ntWheel .45s linear infinite;transform-origin:center}
      .nt-train:not(.nt-moving) .nt-wheel{animation:none}
      @keyframes ntWheel{to{transform:rotate(360deg)}}
      .nt-smoke{animation:ntSmoke 1s ease-out infinite;opacity:.65}
      .nt-train:not(.nt-moving) .nt-smoke{animation:none;opacity:.35}
      @keyframes ntSmoke{0%{transform:translate(0,0) scale(.75);opacity:.7}100%{transform:translate(18px,-20px) scale(1.25);opacity:0}}
      .nt-success{animation:ntPop .42s ease-out}
      @keyframes ntPop{0%{transform:scale(.96)}65%{transform:scale(1.025)}100%{transform:scale(1)}}
      .nt-drop-active{outline:4px solid rgba(14,165,233,.2);outline-offset:2px}
      @media (max-width: 900px){.nt-train{top:calc(45% - 46px);bottom:auto}.nt-piece{min-height:58px}}
    `;
    document.head.appendChild(s);
  }

  function rand(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
  function shuffle(arr){
    const a = arr.slice();
    for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
    return a;
  }
  function uniqueSorted(values){ return [...new Set(values.map(Number).filter(Number.isFinite))].sort((a,b)=>a-b); }

  function makeChallenge(level){
    if(level===1){
      const samples = [
        [10,[4,6]],[12,[5,7]],[14,[4,6,4]],[15,[5,4,6]],[16,[7,5,4]],[18,[8,4,6]],[20,[9,6,5]]
      ];
      const [target,solution] = rand(samples);
      return {level,target,base:0,solution,options:[2,3,4,5,6,7,8,9,10],title:'Ghép ray vừa tới ga',note:'Chọn các đoạn ray sao cho tổng đúng quãng đường.',maxPieces:4};
    }
    if(level===2){
      const samples = [
        [40,[15,25]],[50,[20,30]],[60,[20,15,25]],[70,[30,40]],[80,[20,25,35]],[90,[40,20,30]],[100,[25,35,40]]
      ];
      const [target,solution] = rand(samples);
      return {level,target,base:0,solution,options:[10,15,20,25,30,35,40,45,50],title:'Đưa tàu tới ga lớn',note:'Ghép các đoạn ray trong phạm vi 100.',maxPieces:5};
    }
    if(level===3){
      const samples = [
        [35,15],[45,20],[50,25],[60,20],[70,30],[80,30],[90,40],[100,50]
      ];
      const [target,base] = rand(samples);
      const missing = target-base;
      const pool = uniqueSorted([10,15,20,25,30,35,40,45,50,missing]).filter(v=>v>0 && v<=70);
      return {level,target,base,solution:[missing],options:pool,title:'Còn thiếu bao nhiêu?',note:`Đường ray đã có ${base} ô. Chọn đúng một đoạn để tới ga.`,requiredCount:1};
    }
    if(level===4){
      const samples = [
        [30,2,[10,20]],[40,2,[15,25]],[50,3,[10,15,25]],[60,3,[15,20,25]],[70,3,[20,20,30]],[80,3,[20,25,35]],[90,2,[40,50]]
      ];
      const [target,requiredCount,solution] = rand(samples);
      return {level,target,base:0,solution,options:[10,15,20,25,30,35,40,45,50],title:'Đúng số đoạn ray',note:`Đến đúng ga và chỉ dùng ${requiredCount} đoạn.`,requiredCount};
    }
    if(level===5){
      const samples = [
        [60,25,[10,15,15,20]],[70,30,[10,20,15,25]],[80,35,[15,20,20,25]],[90,40,[15,25,20,30]],[100,45,[20,25,25,30]]
      ];
      const [target,checkpoint,solution] = rand(samples);
      return {level,target,base:0,solution,options:[10,15,20,25,30,35,40],title:'Qua ga trung chuyển',note:`Tàu phải dừng đúng ở ga ${checkpoint} ô trước khi tới ga ${target} ô.`,checkpoint,maxPieces:6};
    }
    const samples = [
      [60,[10,15,20,25]],[70,[10,15,20,25,30]],[75,[10,15,20,25,30]],[80,[10,15,20,25,30]],[90,[15,20,25,30,35]],[100,[20,25,30,35,40]]
    ];
    const [target,options] = rand(samples);
    const minCount = minPieces_(target,options);
    return {level,target,base:0,solution:[],options,title:'Tuyến ray gọn nhất',note:`Đến ga ${target} ô bằng ít đoạn ray nhất có thể.`,minCount,maxPieces:6};
  }

  function minPieces_(target,options){
    const dp = Array(target+1).fill(Infinity); dp[0]=0;
    for(let t=1;t<=target;t++){
      options.forEach(v=>{ if(v<=t && dp[t-v]!==Infinity) dp[t]=Math.min(dp[t],dp[t-v]+1); });
    }
    return dp[target];
  }

  function newChallenge(){
    if(!state) return;
    if(successTimer) clearTimeout(successTimer);
    successTimer = null;
    state.challenge = makeChallenge(state.level);
    state.selected = [];
    state.locked = false;
    state.arrived = false;
    state.message = '';
    state.messageTone = 'neutral';
    render();
  }

  function setLevel(level){
    if(!state || state.level===level) return;
    state.level = level;
    state.round = 1;
    newChallenge();
  }

  function currentTotal(){
    if(!state) return 0;
    return Number(state.challenge.base||0) + state.selected.reduce((s,v)=>s+Number(v||0),0);
  }

  function checkpointReached(){
    const cp = Number(state?.challenge?.checkpoint||0);
    if(!cp) return true;
    let total = Number(state.challenge.base||0);
    if(total===cp) return true;
    for(const v of state.selected){ total += v; if(total===cp) return true; }
    return false;
  }

  function crossedCheckpoint(){
    const cp = Number(state?.challenge?.checkpoint||0);
    if(!cp) return false;
    let total = Number(state.challenge.base||0);
    for(const v of state.selected){ total += v; if(total===cp) return false; if(total>cp) return true; }
    return false;
  }

  function addPiece(value){
    if(!state || state.locked) return;
    const c = state.challenge;
    const maxPieces = Number(c.maxPieces||8);
    if(state.selected.length>=maxPieces){
      state.message = `Bé đang dùng nhiều đoạn quá. Thử tháo bớt một đoạn nhé!`;
      state.messageTone = 'warn';
      render();
      return;
    }
    state.selected.push(Number(value));
    evaluateAfterMove_();
  }

  function undo(){
    if(!state || state.locked || !state.selected.length) return;
    state.selected.pop();
    state.fixes++;
    state.message = '';
    state.messageTone = 'neutral';
    render();
  }

  function reset(){
    if(!state) return;
    if(state.selected.length) state.fixes++;
    state.selected = [];
    state.locked = false;
    state.arrived = false;
    state.message = '';
    state.messageTone = 'neutral';
    render();
  }

  function evaluateAfterMove_(){
    const c = state.challenge;
    const total = currentTotal();
    const count = state.selected.length;

    if(c.checkpoint && crossedCheckpoint()){
      state.message = `Tàu đã đi quá ga trung chuyển ${c.checkpoint} ô. Tháo đoạn cuối và thử lại nhé!`;
      state.messageTone = 'warn';
      state.fixes++;
      render();
      return;
    }
    if(total>c.target){
      state.message = `Đường ray đang dài ${total} ô, vượt ga ${c.target} ô rồi.`;
      state.messageTone = 'warn';
      state.fixes++;
      render();
      return;
    }
    if(total<c.target){
      const remain = c.target-total;
      state.message = `Đã có ${total} ô · còn thiếu ${remain} ô.`;
      state.messageTone = 'neutral';
      render();
      return;
    }

    if(c.requiredCount && count!==c.requiredCount){
      state.message = `Đúng quãng đường rồi, nhưng cần đúng ${c.requiredCount} đoạn. Hiện bé dùng ${count} đoạn.`;
      state.messageTone = 'warn';
      render();
      return;
    }
    if(c.checkpoint && !checkpointReached()){
      state.message = `Đã tới ga cuối nhưng chưa dừng đúng ở ga trung chuyển ${c.checkpoint} ô.`;
      state.messageTone = 'warn';
      render();
      return;
    }
    if(c.minCount && count!==c.minCount){
      state.message = `Đúng quãng đường! Nhưng còn cách gọn hơn: thử dùng ${c.minCount} đoạn nhé.`;
      state.messageTone = 'warn';
      render();
      return;
    }
    completeSuccess_();
  }

  function completeSuccess_(){
    if(state.locked) return;
    state.locked = true;
    state.correct++;
    state.messageTone = 'success';
    const c = state.challenge;
    const equation = buildEquation_();
    if(c.level===5) state.message = `Xuất sắc! Tàu dừng đúng ga ${c.checkpoint} rồi về ga ${c.target}. ${equation}`;
    else if(c.level===6) state.message = `Tối ưu rồi! ${equation} với đúng ${c.minCount} đoạn.`;
    else state.message = `Đúng rồi! ${equation}. Tàu xuất phát nhé!`;
    render();

    const train = root && root.querySelector('.nt-train');
    if(train){
      requestAnimationFrame(()=>{
        train.classList.add('nt-moving');
        train.style.left = 'calc(91% - 70px)';
      });
    }
    if(typeof window.confetti==='function'){
      try{ window.confetti({particleCount:45,spread:55,origin:{y:.55}}); }catch(_){}
    }
    successTimer = setTimeout(()=>{
      if(!state) return;
      state.arrived = true;
      if(state.correct>=6 && !state.rewarded && typeof window.rewardMiniGameStar_==='function'){
        state.rewarded = true;
        window.rewardMiniGameStar_('Bé xây đường ray rất chính xác!');
      }
      render();
    },1650);
  }

  function buildEquation_(){
    const c = state.challenge;
    const parts = [];
    if(c.base) parts.push(String(c.base));
    state.selected.forEach(v=>parts.push(String(v)));
    const total = currentTotal();
    if(total===c.target && parts.length) return `${parts.join(' + ')} = ${c.target}`;
    if(parts.length) return `${parts.join(' + ')} + ? = ${c.target}`;
    return `? = ${c.target}`;
  }

  function taskLines_(){
    const c = state.challenge;
    const lines = [`🎯 Mục tiêu: <b>${c.target} ô</b>`];
    if(c.level===3) lines.push(`🛤️ Đã có: <b>${c.base} ô</b>`);
    if(c.requiredCount) lines.push(`🧩 Chỉ dùng: <b>${c.requiredCount} đoạn</b>`);
    if(c.checkpoint) lines.push(`🚉 Dừng ở: <b>${c.checkpoint} ô</b>`);
    if(c.minCount) lines.push(`✨ Ít nhất: <b>${c.minCount} đoạn</b>`);
    return lines;
  }

  function segmentHtml_(value,index,isBase=false){
    const c = state.challenge;
    const pct = Math.max(3,(Number(value)/Number(c.target))*100);
    const colors = isBase ? ['#94a3b8','#cbd5e1'] : PALETTE[index%PALETTE.length];
    return `<div class="nt-rail-seg nt-rail-sleeper h-[72px] md:h-[82px] border-x-2 border-white/70 flex items-center justify-center text-white font-black shadow-inner" style="width:${pct}%;background:linear-gradient(180deg,${colors[0]},${colors[1]})" title="${value} ô">
      <span class="relative z-10 rounded-xl bg-slate-950/24 px-2.5 py-1 text-lg md:text-xl">${isBase?'Có sẵn ':''}${value}</span>
    </div>`;
  }

  function scenerySvg_(){
    return `<svg viewBox="0 0 1200 500" preserveAspectRatio="none" class="absolute inset-0 w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="ntSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ed8ff"/><stop offset="1" stop-color="#eaf9ff"/></linearGradient>
        <linearGradient id="ntGrass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#86efac"/><stop offset="1" stop-color="#4ade80"/></linearGradient>
      </defs>
      <rect width="1200" height="500" fill="url(#ntSky)"/>
      <circle cx="1020" cy="85" r="48" fill="#fde68a" opacity=".9"/>
      <path d="M0 250 L150 120 L300 245 L455 105 L640 245 L810 135 L990 250 L1200 155 L1200 330 L0 330Z" fill="#86b8df" opacity=".72"/>
      <path d="M0 292 L180 188 L340 286 L515 170 L690 292 L860 205 L1030 290 L1200 220 L1200 355 L0 355Z" fill="#68a7a2" opacity=".72"/>
      <rect y="310" width="1200" height="190" fill="url(#ntGrass)"/>
      <path d="M0 396 C180 350,290 430,450 386 S760 350,920 395 S1080 425,1200 382 L1200 500 L0 500Z" fill="#d9f99d" opacity=".8"/>
      <g opacity=".9">
        <circle cx="115" cy="290" r="34" fill="#16a34a"/><rect x="108" y="290" width="14" height="52" rx="5" fill="#854d0e"/>
        <circle cx="165" cy="300" r="28" fill="#22c55e"/><rect x="159" y="300" width="12" height="44" rx="5" fill="#854d0e"/>
        <circle cx="1040" cy="292" r="36" fill="#16a34a"/><rect x="1032" y="292" width="15" height="56" rx="5" fill="#854d0e"/>
      </g>
      <g transform="translate(1030 268)">
        <rect x="0" y="0" width="118" height="86" rx="12" fill="#fff7ed" stroke="#fb923c" stroke-width="5"/>
        <path d="M-10 10 L59 -34 L128 10Z" fill="#ef4444"/>
        <rect x="18" y="35" width="28" height="51" rx="4" fill="#60a5fa"/><rect x="67" y="28" width="32" height="27" rx="4" fill="#93c5fd"/>
        <text x="58" y="20" text-anchor="middle" font-size="18" font-weight="900" fill="#7c2d12">GA ĐÍCH</text>
      </g>
      <g transform="translate(18 298)">
        <rect x="0" y="0" width="88" height="58" rx="12" fill="#ecfeff" stroke="#0891b2" stroke-width="4"/>
        <text x="44" y="24" text-anchor="middle" font-size="16" font-weight="900" fill="#0e7490">GA</text>
        <text x="44" y="44" text-anchor="middle" font-size="13" font-weight="800" fill="#0e7490">XUẤT PHÁT</text>
      </g>
    </svg>`;
  }

  function trainSvg_(){
    return `<svg width="110" height="72" viewBox="0 0 110 72" aria-hidden="true">
      <g class="nt-smoke"><circle cx="30" cy="10" r="8" fill="#cbd5e1"/><circle cx="41" cy="7" r="6" fill="#e2e8f0"/></g>
      <rect x="18" y="25" width="58" height="28" rx="8" fill="#ef4444" stroke="#991b1b" stroke-width="3"/>
      <rect x="52" y="15" width="26" height="22" rx="5" fill="#fbbf24" stroke="#b45309" stroke-width="3"/>
      <rect x="58" y="19" width="13" height="11" rx="2" fill="#dbeafe"/>
      <rect x="12" y="18" width="16" height="12" rx="3" fill="#334155"/><rect x="16" y="11" width="9" height="10" rx="2" fill="#475569"/>
      <rect x="76" y="35" width="24" height="18" rx="5" fill="#3b82f6" stroke="#1d4ed8" stroke-width="3"/>
      <circle class="nt-wheel" cx="34" cy="57" r="10" fill="#1e293b"/><circle cx="34" cy="57" r="4" fill="#94a3b8"/>
      <circle class="nt-wheel" cx="68" cy="57" r="10" fill="#1e293b"/><circle cx="68" cy="57" r="4" fill="#94a3b8"/>
      <circle class="nt-wheel" cx="89" cy="57" r="8" fill="#1e293b"/><circle cx="89" cy="57" r="3" fill="#94a3b8"/>
    </svg>`;
  }

  function render(){
    if(!root || !state) return;
    const c = state.challenge;
    const total = currentTotal();
    const remain = Math.max(0,c.target-total);
    const pct = Math.min(100,(total/c.target)*100);
    const checkpointPct = c.checkpoint ? (c.checkpoint/c.target)*100 : null;
    const toneClass = state.messageTone==='success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : state.messageTone==='warn' ? 'border-amber-200 bg-amber-50 text-amber-800' : 'border-slate-200 bg-white/85 text-slate-600';
    const equation = buildEquation_();
    const selectedCount = state.selected.length;

    root.innerHTML = `<div class="w-full max-w-[1480px] mx-auto px-2 md:px-4 pb-5 select-none">
      <section class="rounded-[28px] border-2 border-sky-200 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-3 md:p-4 shadow-sm mb-3">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div class="text-xl md:text-2xl font-black text-cyan-700">🚂 Đường ray số · Về ga</div>
            <div class="text-sm md:text-base font-bold text-slate-600">Ghép ray, tính quãng đường rồi xem tàu chạy về ga.</div>
          </div>
          <button data-nt-action="speak" class="rounded-2xl border-2 border-pink-200 bg-white px-4 py-2.5 text-sm md:text-base font-black text-pink-600 shadow-sm">🔊 Nghe luật chơi</button>
        </div>
        <div class="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
          ${LEVELS.map(l=>`<button data-nt-level="${l.id}" class="nt-level-btn rounded-2xl border-2 px-3 py-3 text-sm md:text-base font-black ${state.level===l.id?'border-indigo-500 bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md':'border-indigo-200 bg-white text-indigo-700 hover:bg-indigo-50'}">${l.label}</button>`).join('')}
        </div>
      </section>

      <div class="grid lg:grid-cols-[minmax(0,1.75fr)_minmax(310px,.68fr)] gap-3">
        <section>
          <div class="nt-scene relative overflow-hidden rounded-[28px] border-2 border-emerald-300 shadow-md min-h-[420px] md:min-h-[500px]">
            <div class="absolute top-4 left-1/2 -translate-x-1/2 z-20 rounded-full border-2 border-sky-200 bg-white/94 px-4 py-2 text-base md:text-lg font-black text-sky-700 shadow-sm">Quãng đường: ${c.target} ô</div>
            ${c.checkpoint?`<div class="absolute top-[104px] z-20 -translate-x-1/2 rounded-xl border-2 border-amber-300 bg-amber-50/95 px-3 py-1.5 text-sm md:text-base font-black text-amber-800 shadow-sm" style="left:${Math.min(86,Math.max(14,checkpointPct))}%">🚉 Ga ${c.checkpoint}</div>`:''}

            <div class="absolute left-[7%] right-[7%] top-[45%] z-10">
              <div data-nt-drop class="nt-track-bed relative h-[92px] md:h-[106px] rounded-2xl border-4 border-slate-500/80 bg-white/30 backdrop-blur-[1px] p-2 flex overflow-hidden shadow-xl">
                ${c.base?segmentHtml_(c.base,0,true):''}
                ${state.selected.map((v,i)=>segmentHtml_(v,i+(c.base?1:0),false)).join('')}
                ${remain>0?`<div class="h-full flex-1 min-w-[34px] border-2 border-dashed border-slate-400/70 rounded-lg bg-white/45 flex items-center justify-center text-slate-500 font-black text-sm md:text-base">${remain} ô</div>`:''}
                ${c.checkpoint?`<div class="absolute top-0 bottom-0 border-l-4 border-dashed border-amber-500 z-20" style="left:${checkpointPct}%"></div>`:''}
              </div>
              <div class="mt-2 h-3 rounded-full bg-slate-200 overflow-hidden border border-white/80"><div class="h-full bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 transition-all" style="width:${pct}%"></div></div>
            </div>

            <div class="nt-train" style="left:${state.arrived?'calc(91% - 70px)':'5%'}">${trainSvg_()}</div>
            <div class="absolute left-1/2 -translate-x-1/2 bottom-5 z-20 rounded-2xl border-2 border-white/80 bg-white/92 px-4 py-2.5 text-xl md:text-2xl font-black text-slate-800 shadow-lg">${equation || `0 / ${c.target}`}</div>
          </div>

          <div class="mt-3 rounded-[26px] border-2 border-sky-200 bg-gradient-to-r from-sky-50 to-indigo-50 p-3 md:p-4 shadow-sm">
            <div class="text-center text-base md:text-lg font-black text-slate-700">Kho đoạn ray · kéo thả hoặc chạm để ghép</div>
            <div class="mt-3 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-2">
              ${c.options.map((v,i)=>{const colors=PALETTE[i%PALETTE.length];return `<button draggable="true" data-rail-value="${v}" class="nt-piece min-h-[62px] rounded-2xl border-2 border-white bg-white px-2 py-2 shadow-sm flex flex-col items-center justify-center" style="box-shadow:inset 0 0 0 2px ${colors[1]}55"><span class="block w-12 h-3 rounded-full mb-1" style="background:linear-gradient(90deg,${colors[0]},${colors[1]})"></span><span class="text-lg md:text-xl font-black text-slate-700">${v} ô</span></button>`;}).join('')}
            </div>
          </div>
        </section>

        <aside class="rounded-[28px] border-2 border-indigo-200 bg-white p-3 md:p-4 shadow-sm self-start">
          <div class="flex flex-wrap gap-2 justify-center text-sm md:text-base font-black mb-3">
            <span class="rounded-full border border-slate-200 bg-white px-3 py-1.5">🎯 Lượt ${state.round}</span>
            <span class="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5">⭐ Đúng ${state.correct}</span>
            <span class="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5">✏️ Sửa ${state.fixes}</span>
          </div>

          <div class="rounded-2xl border-2 border-indigo-200 bg-indigo-50/80 p-4">
            <div class="text-lg md:text-xl font-black text-indigo-800">${c.title}</div>
            <div class="mt-1 text-sm md:text-base font-bold text-slate-600">${c.note}</div>
            <div class="mt-3 space-y-2 text-base md:text-lg text-slate-700">${taskLines_().map(x=>`<div class="rounded-xl bg-white/90 border border-indigo-100 px-3 py-2">${x}</div>`).join('')}</div>
          </div>

          <div class="mt-3 rounded-2xl border-2 ${toneClass} px-3 py-3 text-center text-sm md:text-base font-black min-h-[72px] flex items-center justify-center">${state.message || (selectedCount?`Đang có ${total} ô, còn ${remain} ô.`:'Chọn một đoạn ray để bắt đầu.')}</div>

          <div class="mt-3 grid grid-cols-2 gap-2">
            <button data-nt-action="undo" ${state.locked||!selectedCount?'disabled':''} class="rounded-2xl border-2 border-slate-200 bg-white py-3 text-sm md:text-base font-black text-slate-700 disabled:opacity-40">↶ Tháo đoạn cuối</button>
            <button data-nt-action="reset" class="rounded-2xl border-2 border-slate-200 bg-white py-3 text-sm md:text-base font-black text-slate-700">↻ Làm lại</button>
          </div>
          <button data-nt-action="new" class="mt-2 w-full rounded-2xl bg-gradient-to-r from-sky-500 to-violet-500 py-3.5 text-base md:text-lg font-black text-white shadow-md">Câu mới</button>
        </aside>
      </div>
    </div>`;
    bind();
  }

  function bind(){
    if(!root) return;
    root.querySelectorAll('[data-nt-level]').forEach(btn=>btn.addEventListener('click',()=>setLevel(Number(btn.dataset.ntLevel))));
    root.querySelectorAll('[data-nt-action]').forEach(btn=>btn.addEventListener('click',()=>{
      const action=btn.dataset.ntAction;
      if(action==='undo') undo();
      else if(action==='reset') reset();
      else if(action==='new'){ if(state){state.round++; newChallenge();} }
      else if(action==='speak') speakRules_();
    }));
    root.querySelectorAll('[data-rail-value]').forEach(btn=>{
      btn.addEventListener('click',()=>addPiece(Number(btn.dataset.railValue)));
      btn.addEventListener('dragstart',e=>{ e.dataTransfer.setData('text/plain',btn.dataset.railValue); e.dataTransfer.effectAllowed='copy'; });
    });
    const drop=root.querySelector('[data-nt-drop]');
    if(drop){
      drop.addEventListener('dragover',e=>{e.preventDefault();drop.classList.add('nt-drop-active');});
      drop.addEventListener('dragleave',()=>drop.classList.remove('nt-drop-active'));
      drop.addEventListener('drop',e=>{e.preventDefault();drop.classList.remove('nt-drop-active');const v=Number(e.dataTransfer.getData('text/plain'));if(Number.isFinite(v))addPiece(v);});
    }
  }

  function speakRules_(){
    if(!state) return;
    const c=state.challenge;
    let text='Bé hãy ghép các đoạn ray để tàu đi đúng tới ga. Mỗi đoạn ray có một độ dài. ';
    if(c.level===3) text+=`Đường ray đã có ${c.base} ô. Bé tìm phần còn thiếu.`;
    else if(c.level===4) text+=`Bé phải dùng đúng ${c.requiredCount} đoạn ray.`;
    else if(c.level===5) text+=`Tàu phải dừng đúng ở ga trung chuyển ${c.checkpoint} ô rồi mới tới ga cuối.`;
    else if(c.level===6) text+=`Bé tìm cách tới ga bằng ít đoạn ray nhất.`;
    else text+='Khi tổng độ dài vừa đúng quãng đường, tàu sẽ chạy về ga.';
    try{
      if(typeof window.speakText==='function'){ window.speakText(text); return; }
      if('speechSynthesis' in window){ window.speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text); u.lang='vi-VN'; u.rate=.92; window.speechSynthesis.speak(u); }
    }catch(_){}
  }

  window.startNumberTrainGame = startNumberTrainGame;
  window.stopNumberTrainGame = stopNumberTrainGame;
})();
