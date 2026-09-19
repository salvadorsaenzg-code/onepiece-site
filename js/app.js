// ---------- SPLASH / PANTALLA DE INICIO ----------
document.body.classList.add('pre-start');
const startBtn = document.getElementById('start-btn');
if(startBtn){
  startBtn.addEventListener('click', ()=>{
    document.body.classList.remove('pre-start');
    document.body.classList.add('started');
  });
}

// ---------- TAB NAVIGATION ----------
const tabButtons = document.querySelectorAll('nav.tabs button');
const views = document.querySelectorAll('section.view');
tabButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    tabButtons.forEach(b=>b.classList.remove('active'));
    views.forEach(v=>v.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.view).classList.add('active');
    window.scrollTo({top:0, behavior:'smooth'});
  });
});

// ---------- RENDER ----------
function renderArcos(){
  const el = document.getElementById('arcos-list');
  el.innerHTML = arcos.map(a=>`
    <div class="arc-entry">
      <div class="arc-num">${a.n}</div>
      <div>
        <div class="arc-saga">${a.saga} · caps. ${a.capitulos}</div>
        <h3>${a.nombre}</h3>
        <div class="arc-chars">${a.personajes.map(p=>`<span class="char-chip">${p}</span>`).join('')}</div>
        <div class="arc-body">${a.sinopsis}</div>
      </div>
    </div>
  `).join('');
}

// Emblemas: iconografía propia (no retratos) — color de firma + objetos
// característicos de cada personaje, dibujados en SVG.
function emblemIcon(type){
  const s = 'stroke="currentColor" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"';
  switch(type){
    case 'hat': // sombrero de paja
      return `<ellipse cx="24" cy="30" rx="16" ry="4" ${s}/><path d="M12 29 Q13 15 24 15 Q35 15 36 29" ${s}/><path d="M13 25 H35" ${s}/>`;
    case 'swords3': // tres espadas cruzadas + un arete
      return `<path d="M10 12 L34 36 M14 8 L14 16 M34 32 L34 40" ${s}/><path d="M38 12 L14 36 M42 8 L42 16 M14 32 L14 40" ${s}/><path d="M24 6 V42" ${s}/><circle cx="9" cy="9" r="2.5" ${s}/>`;
    case 'swirl': // clima-tact / remolino
      return `<path d="M24 8 C33 8 38 15 38 22 C38 30 31 34 25 32 C20 30 19 24 23 22 C26 20 29 23 27 26" ${s}/><circle cx="15" cy="33" r="3" ${s}/>`;
    case 'flower': // flor arqueológica
      return `<circle cx="24" cy="24" r="4" ${s}/><path d="M24 20 C22 12 18 10 24 6 C30 10 26 12 24 20 M28 24 C36 22 38 18 42 24 C38 30 36 26 28 24 M24 28 C26 36 30 38 24 42 C18 38 22 36 24 28 M20 24 C12 26 10 30 6 24 C10 18 12 22 20 24" ${s}/>`;
    case 'antler': // cornamenta
      return `<path d="M20 40 V22 C20 22 14 20 13 12 M20 30 C20 30 14 29 12 24 M28 40 V22 C28 22 34 20 35 12 M28 30 C28 30 34 29 36 24" ${s}/>`;
    case 'heart': // corazón / marca de "Corazón"
      return `<path d="M24 38 C10 28 8 18 16 13 C21 10 24 15 24 15 C24 15 27 10 32 13 C40 18 38 28 24 38 Z" ${s}/>`;
    case 'crown': // corona
      return `<path d="M9 34 L12 15 L20 25 L24 12 L28 25 L36 15 L39 34 Z" ${s}/><path d="M9 34 H39" ${s}/>`;
    case 'sword1': // espada única, capitán yonko
      return `<path d="M24 6 V32" ${s}/><path d="M15 15 H33" ${s}/><path d="M20 32 H28 L26 40 H22 Z" ${s}/>`;
    case 'ice': // cristal de hielo
      return `<path d="M24 4 L34 20 L24 44 L14 20 Z" ${s}/><path d="M14 20 H34" ${s}/><path d="M24 4 V44" ${s}/>`;
    case 'flame': // llama / lava
      return `<path d="M24 5 C30 14 33 19 29 26 C34 24 36 30 31 36 C27 41 18 41 15 35 C12 29 15 24 18 26 C16 17 18 10 24 5 Z" ${s}/>`;
    case 'beam': // ráfaga de luz
      return `<circle cx="24" cy="24" r="4.5" ${s}/><path d="M24 24 L24 6 M24 24 L38 12 M24 24 L42 24 M24 24 L38 36 M24 24 L24 42 M24 24 L10 36 M24 24 L6 24 M24 24 L10 12" ${s}/>`;
    case 'staff': // bastón con meteorito
      return `<path d="M13 41 L35 9" ${s}/><circle cx="35" cy="9" r="4.5" ${s}/>`;
    case 'leaf': // hoja / naturaleza
      return `<path d="M24 6 C37 11 38 27 24 42 C10 27 11 11 24 6 Z" ${s}/><path d="M24 10 V38" ${s}/>`;
    case 'radiance': // aura / resplandor tipo Buda
      return `<circle cx="24" cy="24" r="7" ${s}/><path d="M24 4 V10 M24 38 V44 M4 24 H10 M38 24 H44 M9.5 9.5 L13.5 13.5 M34.5 34.5 L38.5 38.5 M9.5 38.5 L13.5 34.5 M34.5 13.5 L38.5 9.5" ${s}/>`;
    default:
      return `<circle cx="24" cy="24" r="14" ${s}/>`;
  }
}

function renderCharGroup(list, elId){
  const el = document.getElementById(elId);
  el.innerHTML = list.map(p=>`
    <div class="char-card">
      <div class="char-emblem" style="background:${p.color}22; color:${p.color}">
        <svg viewBox="0 0 48 48" width="40" height="40">${emblemIcon(p.icon)}</svg>
      </div>
      <span class="char-tag">${p.tag}</span>
      <h3>${p.nombre}</h3>
      <p><strong>Fruta:</strong> ${p.fruta}</p>
      <p>${p.texto}</p>
      <div class="char-fact">${p.dato}</div>
    </div>
  `).join('');
}
function renderPersonajes(){
  renderCharGroup(personajes, 'personajes-list');
  renderCharGroup(almirantes, 'almirantes-list');
}

// Sub-pestañas dentro de Personajes (Mugiwaras / Almirantes)
const personajesSubtabs = document.querySelectorAll('#personajes-subtabs button');
personajesSubtabs.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    personajesSubtabs.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const showMugiwaras = btn.dataset.group === 'mugiwaras';
    document.getElementById('personajes-list').style.display = showMugiwaras ? 'grid' : 'none';
    document.getElementById('almirantes-list').style.display = showMugiwaras ? 'none' : 'grid';
  });
});

function renderTeorias(){
  const el = document.getElementById('teorias-list');
  el.innerHTML = teorias.map(t=>`
    <div class="theory">
      <h3>${t.titulo}</h3>
      <p>${t.texto}</p>
      <div class="plausibility">
        <div class="bar"><span style="width:${t.prob}%"></span></div>
        <div class="label">${t.prob}% de probabilidad, según mi lectura</div>
      </div>
    </div>
  `).join('');
}

function renderDuelos(){
  const el = document.getElementById('duelos-list');
  el.innerHTML = duelos.map(d=>{
    const pb = 100 - d.pa;
    return `
    <div class="duel">
      <div class="duel-title">${d.a}<span class="vs">vs</span>${d.b}</div>
      <div class="duel-bar">
        <div class="left" style="width:${d.pa}%">${d.pa}%</div>
        <div class="right" style="width:${pb}%">${pb}%</div>
      </div>
      <div class="duel-names"><span>${d.a}</span><span>${d.b}</span></div>
      <p>${d.texto}</p>
    </div>`;
  }).join('');
}

function renderEncuestas(){
  const el = document.getElementById('encuestas-list');
  function pollBlock(title, data){
    const rows = data.map(r=>`
      <div class="poll-row">
        <div class="name">${r.n}</div>
        <div class="track"><div class="fill" style="width:${r.p}%"></div></div>
        <div class="pct">${r.p}%</div>
      </div>
    `).join('');
    return `<div class="poll"><h3>${title}</h3>${rows}<div class="poll-note">Resultados fijos de partida — reemplázalos cuando conectes votos reales.</div></div>`;
  }
  el.innerHTML = pollBlock('Arco favorito', encuestaFavArco) + pollBlock('Personaje favorito', encuestaFavPersonaje);
}

renderArcos();
renderPersonajes();
renderTeorias();
renderDuelos();
renderEncuestas();
