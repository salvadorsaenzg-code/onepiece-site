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
        <div class="arc-saga">${a.saga}</div>
        <h3>${a.nombre}</h3>
        <div class="arc-body">${a.texto}</div>
      </div>
      <div class="rating"><span class="score">${a.nota.toFixed(1)}</span><span class="of10">/10</span></div>
    </div>
  `).join('');
}

function renderPersonajes(){
  const el = document.getElementById('personajes-list');
  el.innerHTML = personajes.map(p=>`
    <div class="char-card">
      <span class="char-tag">${p.tag}</span>
      <h3>${p.nombre}</h3>
      <p><strong>Fruta:</strong> ${p.fruta}</p>
      <p>${p.texto}</p>
      <div class="char-fact">${p.dato}</div>
    </div>
  `).join('');
}

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
