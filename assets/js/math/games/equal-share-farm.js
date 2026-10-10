(function () {
  'use strict';

  let root = null;
  let state = null;
  let dragIndex = null;
  const rnd = (a,b)=>Math.floor(Math.random()*(b-a+1))+a;
  const shuffle = a => a.slice().sort(()=>Math.random()-.5);

  function startEqualShareFarmGame(){
    root=document.getElementById('game-play-container'); if(!root)return;
    injectStyle();
    state={round:1,score:0,locked:false,task:null,placed:[],pool:[],message:''};
    newRound();
  }
  function stopEqualShareFarmGame(){state=null;root=null;dragIndex=null;}
  function injectStyle(){
    if(document.getElementById('ee-equal-farm-style'))return;
    const s=document.createElement('style');s.id='ee-equal-farm-style';s.textContent=`
      .ef-carrot{cursor:grab;transition:transform .15s}.ef-carrot:active{cursor:grabbing;transform:scale(.92)}
      .ef-basket{min-height:150px;transition:box-shadow .2s,transform .2s}.ef-basket.ef-hot{box-shadow:0 0 0 5px rgba(16,185,129,.15);transform:translateY(-2px)}
      @keyframes efHop{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}.ef-hop{animation:efHop .55s ease}
    `;document.head.appendChild(s);
  }
  function buildTask(){
    const divisor=Math.random()<.5?2:5;
    const q=rnd(2,5);
    const total=divisor*q;
    const mode=Math.random()<.5?'share':'group';
    return mode==='share'
      ?{mode,total,baskets:divisor,per:q,prompt:`Chia đều ${total} củ cà rốt vào ${divisor} giỏ. Mỗi giỏ có bao nhiêu củ?`}
      :{mode,total,baskets:q,per:divisor,prompt:`Mỗi giỏ cần ${divisor} củ cà rốt. Hãy đóng hết ${total} củ vào các giỏ.`};
  }
  function newRound(){
    if(!state)return;state.task=buildTask();state.locked=false;state.message='';
    state.pool=Array.from({length:state.task.total},(_,i)=>i);state.placed=Array.from({length:state.task.baskets},()=>[]);render();
  }
  function render(){
    if(!root||!state)return;
    const t=state.task;
    root.innerHTML=`<div class="w-full max-w-[1280px] mx-auto px-2 md:px-4 pb-4 select-none">
      <div class="flex flex-wrap justify-between gap-3 mb-3"><div><div class="text-sm md:text-base font-black text-emerald-600">🥕 NÔNG TRẠI CHIA ĐỀU</div><h2 class="text-xl md:text-2xl font-black text-slate-800">Chia thật bằng tay để hiểu phép chia</h2></div><div class="flex gap-2 text-sm md:text-base font-black"><span class="rounded-full bg-violet-100 text-violet-700 px-3 py-1">Màn ${state.round}</span><span class="rounded-full bg-amber-100 text-amber-700 px-3 py-1">⭐ ${state.score}</span></div></div>
      <div class="grid lg:grid-cols-[minmax(0,1.9fr)_minmax(300px,.75fr)] gap-4">
        <section class="rounded-[28px] border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-4 md:p-5 shadow-sm">
          <div class="rounded-2xl bg-white border-2 border-amber-200 p-3 md:p-4 text-center text-xl md:text-2xl font-black text-slate-800">${t.prompt}</div>
          <div class="mt-4 grid gap-3" style="grid-template-columns:repeat(${Math.min(t.baskets,5)},minmax(0,1fr))">${state.placed.map((arr,i)=>basketHtml(i,arr)).join('')}</div>
          <div id="ef-msg" class="min-h-[48px] mt-3 flex items-center justify-center text-center text-base md:text-lg font-black ${state.message.startsWith('✅')?'text-emerald-700':'text-rose-600'}">${state.message}</div>
        </section>
        <aside class="rounded-[28px] border-2 border-orange-200 bg-orange-50/70 p-4 shadow-sm">
          <div class="text-center text-lg md:text-xl font-black text-orange-700">Kho cà rốt</div>
          <p class="text-center text-sm md:text-base font-bold text-slate-600 mb-3">Kéo từng củ vào giỏ hoặc chạm cà rốt rồi chạm giỏ</p>
          <div class="rounded-3xl border-2 border-dashed border-orange-300 bg-white min-h-[180px] p-3 flex flex-wrap content-center justify-center gap-1.5">${state.pool.length?state.pool.map((id,idx)=>`<button draggable="true" data-ef-carrot="${id}" class="ef-carrot text-4xl md:text-5xl leading-none" title="Cà rốt">🥕</button>`).join(''):'<span class="text-emerald-600 font-black">Đã chia hết cà rốt!</span>'}</div>
          <div class="mt-3 rounded-2xl border-2 border-sky-200 bg-sky-50 p-3 text-center"><div class="text-sm font-black text-sky-700">SỐ ĐÃ CHIA / TỔNG</div><div class="text-3xl font-black text-sky-700">${t.total-state.pool.length} / ${t.total}</div></div>
          <div class="mt-3 grid grid-cols-2 gap-2"><button data-ef-action="undo" class="rounded-2xl border-2 border-slate-200 bg-white py-3 font-black">↶ Lấy lại</button><button data-ef-action="reset" class="rounded-2xl border-2 border-slate-200 bg-white py-3 font-black">🧹 Làm lại</button></div>
          <button data-ef-action="check" class="mt-2 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-lg font-black text-white shadow-md">✓ Kiểm tra chia đều</button>
        </aside>
      </div></div>`;bind();
  }
  function basketHtml(i,arr){
    return `<button data-ef-basket="${i}" class="ef-basket rounded-3xl border-2 border-amber-300 bg-amber-50 p-3 text-center">
      <div class="text-4xl md:text-5xl">🧺</div><div class="mt-1 text-base font-black text-amber-800">Giỏ ${i+1}</div>
      <div class="mt-2 min-h-[58px] flex flex-wrap justify-center gap-0.5">${arr.map(()=>'<span class="text-3xl">🥕</span>').join('')}</div>
      <div class="mt-1 inline-flex rounded-full bg-white px-3 py-1 text-lg font-black text-amber-700">${arr.length} củ</div>
    </button>`;
  }
  function bind(){
    root.querySelectorAll('[data-ef-carrot]').forEach(el=>{
      el.addEventListener('dragstart',e=>{dragIndex=Number(el.dataset.efCarrot);try{e.dataTransfer.setData('text/plain',String(dragIndex));}catch(_){}});
      el.addEventListener('click',()=>{dragIndex=Number(el.dataset.efCarrot); state.message='Đã cầm 1 củ cà rốt. Bé chọn một giỏ nhé!'; render();});
    });
    root.querySelectorAll('[data-ef-basket]').forEach(el=>{
      el.addEventListener('dragover',e=>{e.preventDefault();el.classList.add('ef-hot');});
      el.addEventListener('dragleave',()=>el.classList.remove('ef-hot'));
      el.addEventListener('drop',e=>{e.preventDefault();el.classList.remove('ef-hot');let id=Number((e.dataTransfer&&e.dataTransfer.getData('text/plain'))||dragIndex);put(id,Number(el.dataset.efBasket));});
      el.addEventListener('click',()=>{if(dragIndex!==null)put(dragIndex,Number(el.dataset.efBasket));});
    });
    root.querySelectorAll('[data-ef-action]').forEach(b=>b.addEventListener('click',()=>action(b.dataset.efAction)));
  }
  function put(id,basket){
    if(!state||state.locked||!Number.isFinite(id))return;const ix=state.pool.indexOf(id);if(ix<0)return;
    state.pool.splice(ix,1);state.placed[basket].push(id);dragIndex=null;state.message='';render();
  }
  function action(a){
    if(!state||state.locked)return;
    if(a==='reset'){state.pool=Array.from({length:state.task.total},(_,i)=>i);state.placed=Array.from({length:state.task.baskets},()=>[]);state.message='';dragIndex=null;render();return;}
    if(a==='undo'){for(let i=state.placed.length-1;i>=0;i--){if(state.placed[i].length){state.pool.push(state.placed[i].pop());break;}}dragIndex=null;state.message='';render();return;}
    if(a==='check')check();
  }
  function check(){
    const t=state.task;if(state.pool.length){state.message=`Còn ${state.pool.length} củ chưa được chia hết nhé!`;render();return;}
    const ok=state.placed.every(a=>a.length===t.per);
    if(!ok){state.message=`Các giỏ chưa bằng nhau. Mỗi giỏ cần ${t.per} củ.`;render();return;}
    state.locked=true;state.score++;state.message=`✅ Chính xác! ${t.total} ÷ ${t.baskets} = ${t.per}. ${t.baskets} nhóm bằng nhau, mỗi nhóm ${t.per}.`;render();
    const sec=root&&root.querySelector('section');if(sec)sec.classList.add('ef-hop');
    setTimeout(()=>{if(!state)return;state.round++;if(state.round===6&&typeof window.rewardMiniGameStar_==='function')window.rewardMiniGameStar_('Bé đã chia đều rất khéo!');newRound();},1350);
  }
  window.startEqualShareFarmGame=startEqualShareFarmGame;
  window.stopEqualShareFarmGame=stopEqualShareFarmGame;
})();
