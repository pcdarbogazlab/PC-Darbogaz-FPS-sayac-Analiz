(() => {
  const D = window.PCDL_DATA;
  const $ = id => document.getElementById(id);
  const clamp = (n,min,max) => Math.max(min,Math.min(max,n));

  function fillLists(){
    D.cpus.forEach(x=>{const o=document.createElement('option');o.value=x.name;$('cpuList').appendChild(o)});
    D.gpus.forEach(x=>{const o=document.createElement('option');o.value=x.name;$('gpuList').appendChild(o)});
    D.games.forEach(x=>{const o=document.createElement('option');o.value=x.id;o.textContent=x.name;$('gameSelect').appendChild(o)});
    $('gameSelect').value='general';
  }

  function findExact(list, value){return list.find(x=>x.name.toLocaleLowerCase('tr')===value.trim().toLocaleLowerCase('tr'))}

  function analyze(e){
    e.preventDefault();
    const scrollPosition = window.scrollY;
    const cpu=findExact(D.cpus,$('cpuInput').value), gpu=findExact(D.gpus,$('gpuInput').value);
    if(!cpu || !gpu){alert('Lütfen açılır listeden geçerli bir CPU ve GPU seç.');return}
    const ram=Number($('ramSelect').value), res=$('resolutionSelect').value, scenario=$('scenarioSelect').value;
    const game=D.games.find(g=>g.id===$('gameSelect').value) || D.games[0];

    const resCpu={1080:1.12,1440:1,2160:.86}[res], resGpu={1080:.88,1440:1,2160:1.18}[res];
    const scenarioWeights={esports:[.60,.40],balanced:[.45,.55],aaa:[.32,.68],creator:[.55,.45]}[scenario];
    const cpuEffective=cpu.score*resCpu, gpuEffective=gpu.score/resGpu;
    const cpuContribution=cpuEffective*scenarioWeights[0], gpuContribution=gpuEffective*scenarioWeights[1];
    const raw=(cpuContribution-gpuContribution)/(cpuContribution+gpuContribution);
    const marker=clamp(50-raw*130,6,94); // left CPU-limited, right GPU-limited
    const mismatch=Math.abs(raw);
    const balance=Math.round(clamp(100-mismatch*105,55,100));

    let status='Dengeli', summary='CPU ve GPU seçilen senaryoda birbirine yakın seviyede çalışıyor.', pill='good';
    if(raw < -.16){status='CPU sınırlı';summary='Bu senaryoda işlemci, ekran kartının potansiyelini daha erken sınırlayabilir.';pill='warn'}
    else if(raw > .16){status='GPU sınırlı';summary='Bu senaryoda ekran kartı yükü daha baskın; performans artışı için GPU yükseltmesi daha anlamlı olabilir.';pill='info'}

    const resFactor={1080:1,1440:.72,2160:.43}[res];
    const cpuNorm=clamp(cpu.score/80,.48,1.28), gpuNorm=clamp(gpu.score/80,.38,1.32);
    const perf=Math.pow(cpuNorm,game.cpu)*Math.pow(gpuNorm,game.gpu);
    let fps=Math.round(game.base*resFactor*perf);
    if(ram<16) fps=Math.round(fps*.88);
    if(gpu.vram<game.vram && res!=='1080') fps=Math.round(fps*.90);
    const low=Math.max(20,Math.round(fps*.88)), high=Math.round(fps*1.12);

    const cpuFit=Math.round(clamp(100-Math.max(0,-raw)*85,58,100));
    const gpuFit=Math.round(clamp(100-Math.max(0,raw)*85,58,100));
    const ramFit=ram>=32?100:ram>=16?92:68;

    let advice='Öncelikli yükseltme ihtiyacı görünmüyor. Bütçeyi depolama, soğutma veya monitöre ayırmak daha anlamlı olabilir.';
    if(status==='CPU sınırlı') advice='Yüksek FPS hedefliyorsan daha güçlü CPU, hızlı çift kanal RAM ve arka plan yüklerini azaltmak daha fazla katkı sağlayabilir.';
    if(status==='GPU sınırlı') advice='Hedef çözünürlükte daha yüksek grafik ayarları/FPS için ilk yükseltme adayı ekran kartı. PSU kapasitesini de kontrol et.';
    if(ram<16) advice+=' 8 GB RAM güncel oyunlarda ek sınırlama oluşturabilir; 16 GB ve üzeri önerilir.';
    if(gpu.vram<game.vram && res!=='1080') advice+=` ${game.name} profili için ${gpu.vram} GB VRAM, yüksek çözünürlükte sınıra yaklaşabilir.`;

    $('resultCard').classList.remove('is-empty');
    document.querySelector('.empty-state').hidden=true; document.querySelector('.result-content').hidden=false;
    $('statusPill').textContent=status;
    $('statusPill').style.color=pill==='warn'?'var(--red)':pill==='info'?'var(--cyan)':'var(--green)';
    $('statusPill').style.background=pill==='warn'?'rgba(255,126,145,.12)':pill==='info'?'rgba(57,217,255,.12)':'rgba(78,230,168,.12)';
    $('resultTitle').textContent=`${cpu.name} + ${gpu.name}`;
    $('resultSummary').textContent=summary;
    $('balanceScore').textContent=balance;
    $('fpsValue').textContent=`${fps} FPS`;
    $('fpsRange').textContent=`yaklaşık ${low}–${high} FPS • ${game.name}`;
    $('cpuFit').textContent=`%${cpuFit}`;$('cpuLabel').textContent=cpu.score>=80?'Güçlü seviye':cpu.score>=60?'Orta-üst seviye':'Giriş-orta seviye';
    $('gpuFit').textContent=`%${gpuFit}`;$('gpuLabel').textContent=`${gpu.vram} GB VRAM`;
    $('ramFit').textContent=`%${ramFit}`;$('ramLabel').textContent=ram>=32?'Rahat':ram>=16?'Yeterli':'Sınırlı';
    $('balanceMarker').style.left=`${marker}%`;
    $('adviceText').textContent=advice;

    // Sonuç kartı güncellenirken tarayıcının sayfayı aşağı kaydırmasını engelle.
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollPosition, left: 0, behavior: 'auto' });
    });
  }

  function build(){
    const tier=$('budgetTier').value,use=$('buildUse').value,parts=D.builds[use][tier];
    const labels=['CPU','GPU','RAM','Depolama','Anakart','PSU'];
    $('buildOutput').innerHTML=parts.map((p,i)=>`<div class="part-card"><span>${labels[i]}</span><strong>${p}</strong></div>`).join('')+`<p class="build-note">Bu bölüm parça sınıfı önerir; satın almadan önce anakart soketi, RAM tipi, kasa ölçüsü ve PSU güç bağlantılarını ayrıca doğrula.</p>`;
  }

  fillLists();
  $('analysisForm').addEventListener('submit',analyze);
  $('buildBtn').addEventListener('click',build);
  build();
})();
