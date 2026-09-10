(() => {
  const D = window.PCDL_DATA;
  const $ = id => document.getElementById(id);
  const clamp = (n,min,max) => Math.max(min,Math.min(max,n));

  function fillLists(){
    D.cpus.forEach(x=>{const o=document.createElement('option');o.value=x.name;$('cpuList').appendChild(o)});
    D.gpus.forEach(x=>{const o=document.createElement('option');o.value=x.name;$('gpuList').appendChild(o)});
    D.cpus.forEach(x=>{const o=document.createElement('option');o.value=x.name;$('compatCpuList').appendChild(o)});
    D.motherboards.forEach(x=>{const o=document.createElement('option');o.value=x.name;$('compatBoardList').appendChild(o)});
    D.games.forEach(x=>{const o=document.createElement('option');o.value=x.id;o.textContent=x.name;$('gameSelect').appendChild(o)});

    D.gpus.forEach((x,i)=>{
      const a=document.createElement('option');a.value=String(i);a.textContent=x.name;$('compareGpuA').appendChild(a);
      const b=document.createElement('option');b.value=String(i);b.textContent=x.name;$('compareGpuB').appendChild(b);
    });
    D.games.forEach(x=>{const o=document.createElement('option');o.value=x.id;o.textContent=x.name;$('compareGame').appendChild(o)});

    D.cpus.forEach((x,i)=>{
      const a=document.createElement('option');a.value=String(i);a.textContent=x.name;$('compareCpuA').appendChild(a);
      const b=document.createElement('option');b.value=String(i);b.textContent=x.name;$('compareCpuB').appendChild(b);
    });
    D.motherboards.forEach((x,i)=>{
      const a=document.createElement('option');a.value=String(i);a.textContent=x.name;$('compareBoardA').appendChild(a);
      const b=document.createElement('option');b.value=String(i);b.textContent=x.name;$('compareBoardB').appendChild(b);
    });

    $('gameSelect').value='general';
    $('compareGame').value='general';
    $('compareGpuA').value=String(Math.max(0,D.gpus.findIndex(g=>g.name.includes('RTX 4060 Ti'))));
    $('compareGpuB').value=String(Math.max(0,D.gpus.findIndex(g=>g.name.includes('RTX 5070'))));
    $('compareCpuA').value=String(Math.max(0,D.cpus.findIndex(c=>c.name.includes('5700X'))));
    $('compareCpuB').value=String(Math.max(0,D.cpus.findIndex(c=>c.name.includes('7800X3D'))));
    $('compareBoardA').value=String(Math.max(0,D.motherboards.findIndex(m=>m.name.includes('B550-A PRO'))));
    $('compareBoardB').value=String(Math.max(0,D.motherboards.findIndex(m=>m.name.includes('B650 TOMAHAWK'))));
  }

  function findExact(list, value){return list.find(x=>x.name.toLocaleLowerCase('tr')===value.trim().toLocaleLowerCase('tr'))}


  function refillCompareSelect(list, selectId, query){
    const sel=$(selectId);
    const oldValue=sel.value;
    const oldText=sel.options[sel.selectedIndex]?.textContent || '';
    const q=(query||'').trim().toLocaleLowerCase('tr');
    const filtered=list.map((x,i)=>({x,i})).filter(({x})=>!q || x.name.toLocaleLowerCase('tr').includes(q));

    sel.innerHTML='';
    filtered.forEach(({x,i})=>{
      const o=document.createElement('option');
      o.value=String(i);
      o.textContent=x.name;
      sel.appendChild(o);
    });

    if([...sel.options].some(o=>o.value===oldValue)){
      sel.value=oldValue;
    }else if(oldText){
      const match=[...sel.options].find(o=>o.textContent===oldText);
      if(match) sel.value=match.value;
    }
  }

  function setupCompareFilters(){
    $('filterGpuA').addEventListener('input',e=>refillCompareSelect(D.gpus,'compareGpuA',e.target.value));
    $('filterGpuB').addEventListener('input',e=>refillCompareSelect(D.gpus,'compareGpuB',e.target.value));

    $('filterCpuA').addEventListener('input',e=>refillCompareSelect(D.cpus,'compareCpuA',e.target.value));
    $('filterCpuB').addEventListener('input',e=>refillCompareSelect(D.cpus,'compareCpuB',e.target.value));

    $('filterBoardA').addEventListener('input',e=>refillCompareSelect(D.motherboards,'compareBoardA',e.target.value));
    $('filterBoardB').addEventListener('input',e=>refillCompareSelect(D.motherboards,'compareBoardB',e.target.value));
  }

  function encodeAnalysisUrl(){
    const params=new URLSearchParams({
      cpu:$('cpuInput').value,
      gpu:$('gpuInput').value,
      ram:$('ramSelect').value,
      res:$('resolutionSelect').value,
      scenario:$('scenarioSelect').value,
      game:$('gameSelect').value
    });
    return `${location.origin}${location.pathname}?${params.toString()}#analysis`;
  }

  async function shareAnalysis(){
    if(!findExact(D.cpus,$('cpuInput').value) || !findExact(D.gpus,$('gpuInput').value)){
      $('shareStatus').textContent='Önce geçerli bir analiz yap.';
      return;
    }
    const url=encodeAnalysisUrl();
    try{
      if(navigator.share){
        await navigator.share({title:'PC Darboğaz Lab Analizi',text:'PC sistem analizim',url});
        $('shareStatus').textContent='Paylaşım açıldı.';
      }else{
        await navigator.clipboard.writeText(url);
        $('shareStatus').textContent='Bağlantı kopyalandı.';
      }
    }catch(err){
      try{
        await navigator.clipboard.writeText(url);
        $('shareStatus').textContent='Bağlantı kopyalandı.';
      }catch(_){
        $('shareStatus').textContent=url;
      }
    }
  }

  function loadAnalysisFromUrl(){
    const p=new URLSearchParams(location.search);
    if(!p.has('cpu') || !p.has('gpu')) return;
    $('cpuInput').value=p.get('cpu')||'';
    $('gpuInput').value=p.get('gpu')||'';
    if(p.get('ram')) $('ramSelect').value=p.get('ram');
    if(p.get('res')) $('resolutionSelect').value=p.get('res');
    if(p.get('scenario')) $('scenarioSelect').value=p.get('scenario');
    if(p.get('game')) $('gameSelect').value=p.get('game');
    if(findExact(D.cpus,$('cpuInput').value) && findExact(D.gpus,$('gpuInput').value)){
      $('analysisForm').requestSubmit();
    }
  }

  function checkCompatibility(){
    const cpu=findExact(D.cpus,$('compatCpu').value);
    const board=findExact(D.motherboards,$('compatBoard').value);
    const ram=$('compatRam').value;

    if(!cpu || !board){
      $('compatOutput').innerHTML='<div class="compat-banner warn"><h3>Eksik seçim</h3><p>Listeden geçerli bir işlemci ve anakart seç.</p></div>';
      return;
    }

    const socketOk=cpu.socket===board.socket;
    const cpuMemory=(cpu.platform||'').toUpperCase();
    const boardMemory=(board.memory||'').toUpperCase();
    const ramOk=boardMemory.includes(ram);
    const cpuRamOk=cpuMemory.includes(ram);

    let statusClass='good', title='Temel olarak uyumlu';
    let msg='CPU soketi, anakart soketi ve seçilen RAM türü temel seviyede eşleşiyor.';
    if(!socketOk || !ramOk || !cpuRamOk){
      statusClass='bad'; title='Uyumsuz parça seçimi';
      const problems=[];
      if(!socketOk) problems.push(`${cpu.name} ${cpu.socket} soket kullanırken ${board.name} ${board.socket} soket kullanıyor`);
      if(!ramOk) problems.push(`${board.name} ${board.memory} bellek kullanıyor; seçimin ${ram}`);
      if(!cpuRamOk) problems.push(`${cpu.name} platformu ${cpu.platform} ile listelenmiş; seçimin ${ram}`);
      msg=problems.join('. ')+'.';
    }

    $('compatOutput').innerHTML=`
      <div class="compat-result">
        <div class="compat-banner ${statusClass}">
          <h3>${title}</h3>
          <p>${msg}</p>
        </div>
        <div class="compat-grid">
          <div class="compat-item"><span>CPU soketi</span><strong>${cpu.socket}</strong></div>
          <div class="compat-item"><span>Anakart</span><strong>${board.chipset} • ${board.socket} • ${board.memory}</strong></div>
          <div class="compat-item"><span>Seçilen RAM</span><strong>${ram}</strong></div>
        </div>
        ${socketOk?'<div class="compat-banner warn"><h3>BIOS kontrolünü unutma</h3><p>Soket eşleşse bile özellikle yeni işlemcilerde anakartın BIOS sürümü CPU desteği için güncel olmayabilir.</p></div>':''}
      </div>`;
  }


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


  function gpuTier(score){
    if(score>=92) return 'Üst seviye';
    if(score>=78) return 'Yüksek performans';
    if(score>=60) return 'Orta-üst seviye';
    if(score>=45) return 'Orta seviye';
    return 'Giriş seviyesi';
  }

  function compareFps(gpu,game,res){
    const resFactor={1080:1,1440:.72,2160:.43}[res];
    const gpuNorm=clamp(gpu.score/80,.38,1.34);
    // Sabit, güçlü bir CPU varsayımıyla GPU farkını öne çıkar.
    let fps=Math.round(game.base*resFactor*Math.pow(gpuNorm,game.gpu));
    if(gpu.vram<game.vram && res!=='1080') fps=Math.round(fps*.90);
    return Math.max(20,fps);
  }

  function pctDiff(a,b){
    if(!a && !b) return 0;
    return ((b-a)/Math.max(a,1))*100;
  }

  function compareGpus(){
    const a=D.gpus[Number($('compareGpuA').value)];
    const b=D.gpus[Number($('compareGpuB').value)];
    const game=D.games.find(g=>g.id===$('compareGame').value) || D.games[0];
    if(!a || !b) return;

    const scoreDelta=pctDiff(a.score,b.score);
    const absScore=Math.abs(scoreDelta);
    const winner=scoreDelta>2?b:scoreDelta<-2?a:null;
    const loser=winner?(winner===a?b:a):null;
    const winnerSide=winner===a?'A':winner===b?'B':'';

    const reasonsA=[];
    const reasonsB=[];

    if(a.score>b.score+2) reasonsA.push(`Bileşik performans endeksi yaklaşık %${Math.round(Math.abs(pctDiff(b.score,a.score)))} daha yüksek.`);
    if(b.score>a.score+2) reasonsB.push(`Bileşik performans endeksi yaklaşık %${Math.round(Math.abs(pctDiff(a.score,b.score)))} daha yüksek.`);

    if(a.vram>b.vram) reasonsA.push(`${a.vram} GB VRAM ile ${b.vram} GB modele göre daha fazla bellek alanı sunuyor.`);
    if(b.vram>a.vram) reasonsB.push(`${b.vram} GB VRAM ile ${a.vram} GB modele göre daha fazla bellek alanı sunuyor.`);

    if(a.vram>=game.vram && b.vram<game.vram) reasonsA.push(`${game.name} profilindeki ${game.vram} GB VRAM hedefini karşılıyor.`);
    if(b.vram>=game.vram && a.vram<game.vram) reasonsB.push(`${game.name} profilindeki ${game.vram} GB VRAM hedefini karşılıyor.`);

    if(!reasonsA.length) reasonsA.push('Bu eşleşmede belirgin bir teorik üstünlük görünmüyor; avantaj oyun ve ayara göre değişebilir.');
    if(!reasonsB.length) reasonsB.push('Bu eşleşmede belirgin bir teorik üstünlük görünmüyor; avantaj oyun ve ayara göre değişebilir.');

    const fpsRows=['1080','1440','2160'].map(res=>{
      const fa=compareFps(a,game,res), fb=compareFps(b,game,res);
      const d=pctDiff(fa,fb);
      let advantage='<span class="perf-close">≈ Eşit</span>';
      if(Math.abs(d)>=3){
        const rowWinner=d>0?b:a;
        const shortName=rowWinner.name.replace('NVIDIA GeForce ','').replace('AMD Radeon ','').replace('Intel Arc ','');
        advantage=`<span class="perf-winner">🏆 ${shortName} <b>+%${Math.round(Math.abs(d))}</b></span>`;
      }
      return `<tr><td>${res==='1080'?'1080p':res==='1440'?'1440p':'4K'}</td><td>${fa} FPS</td><td>${fb} FPS</td><td>${advantage}</td></tr>`;
    }).join('');

    let verdictTitle='Çok yakın performans';
    let verdictText=`${a.name} ve ${b.name} bu modelde birbirine yakın sınıfta. Oyun motoru, çözünürlük ve VRAM kullanımı sonucu değiştirebilir.`;
    if(winner){
      verdictTitle=`🏆 ${winner.name} önde`;
      verdictText=`Normalize edilmiş performans endeksi ve ${game.name} profiline göre ${winner.name}, ${loser.name} karşısında daha güçlü seçenek görünüyor. Aşağıdaki tabloda her çözünürlükte kazanan kart ve yüzde avantajı doğrudan gösteriliyor.`;
    }

    $('compareOutput').innerHTML=`
      <div class="compare-head">
        <div class="gpu-name-card"><span>GPU A</span><strong>${a.name}</strong><small>${gpuTier(a.score)} • ${a.vram} GB VRAM</small></div>
        <div class="vs-badge">VS</div>
        <div class="gpu-name-card right"><span>GPU B</span><strong>${b.name}</strong><small>${gpuTier(b.score)} • ${b.vram} GB VRAM</small></div>
      </div>

      <div class="compare-verdict">
        <b>Genel yorum</b>
        <h3>${verdictTitle}</h3>
        <p>${verdictText}</p>
      </div>

      <div class="compare-grid">
        <div class="compare-metric">
          <span>Performans endeksi</span>
          <div class="metric-row"><strong>${a.score}</strong><i>vs</i><strong>${b.score}</strong></div>
        </div>
        <div class="compare-metric">
          <span>VRAM</span>
          <div class="metric-row"><strong>${a.vram} GB</strong><i>vs</i><strong>${b.vram} GB</strong></div>
        </div>
        <div class="compare-metric">
          <span>Sınıf</span>
          <div class="metric-row"><strong>${gpuTier(a.score)}</strong><i>vs</i><strong>${gpuTier(b.score)}</strong></div>
        </div>
      </div>

      <div class="compare-reasons">
        <div class="reason-box"><h4>${a.name} neden tercih edilebilir?</h4><ul>${reasonsA.map(x=>`<li>${x}</li>`).join('')}</ul></div>
        <div class="reason-box"><h4>${b.name} neden tercih edilebilir?</h4><ul>${reasonsB.map(x=>`<li>${x}</li>`).join('')}</ul></div>
      </div>

      <div class="fps-compare">
        <h4>${game.name} • Tahmini FPS karşılaştırması</h4>
        <table class="fps-table">
          <thead><tr><th>Çözünürlük</th><th>${a.name}</th><th>${b.name}</th><th>Performans avantajı</th></tr></thead>
          <tbody>${fpsRows}</tbody>
        </table>
      </div>
    `;
  }




  function realGpuBenchHtml(a,b){
    const db=window.PCDB_BENCH?.gpu||{};
    const ba=db[a.name], bb=db[b.name];
    if(!ba || !bb){
      return `<div class="real-bench unavailable"><h4>Kaynaklı benchmark</h4><p>Bu iki model için ortak kaynaklı benchmark verisi henüz veri setine eklenmedi. Tahmini FPS sonucu yukarıda ayrı olarak gösteriliyor.</p></div>`;
    }
    const rs=[
      ['1080p Ultra','p1080'],
      ['1440p Ultra','p1440'],
      ['4K Ultra','p4k']
    ].map(([label,k])=>{
      const av=ba.raster[k], bv=bb.raster[k];
      const d=((bv-av)/av)*100;
      const win=Math.abs(d)<1?'≈ Eşit':`${d>0?b.name:a.name} +%${Math.round(Math.abs(d))}`;
      return `<tr><td>${label}</td><td>${av.toFixed(1)} FPS</td><td>${bv.toFixed(1)} FPS</td><td><span class="${Math.abs(d)<1?'perf-close':'perf-winner'}">${Math.abs(d)<1?'≈ Eşit':'🏆 '+win}</span></td></tr>`;
    }).join('');
    return `<div class="real-bench">
      <div class="real-bench-head"><div><span class="eyebrow">HARİCİ KAYNAK</span><h4>Gerçek raster benchmark ortalaması</h4></div><a href="${window.PCDB_BENCH.meta.gpuSourceUrl}" target="_blank" rel="noopener">Kaynağı aç ↗</a></div>
      <div class="table-wrap"><table class="fps-table"><thead><tr><th>Çözünürlük</th><th>${a.name}</th><th>${b.name}</th><th>Avantaj</th></tr></thead><tbody>${rs}</tbody></table></div>
      <p class="fineprint">Kaynak: ${window.PCDB_BENCH.meta.gpuSource}. Değerler kaynağın 11 oyunluk raster geometrik ortalamasıdır; DLSS/FSR/XeSS ve frame generation kapalıdır.</p>
    </div>`;
  }

  function realCpuBenchHtml(a,b){
    const db=window.PCDB_BENCH?.cpu||{};
    const ba=db[a.name], bb=db[b.name];
    if(!ba || !bb) return '';
    const rows=[];
    if(ba.gaming!=null && bb.gaming!=null) rows.push(`<tr><td>1080p oyun endeksi</td><td>${ba.gaming.toFixed(1)}</td><td>${bb.gaming.toFixed(1)}</td></tr>`);
    if(ba.multi!=null && bb.multi!=null) rows.push(`<tr><td>Çok çekirdek endeksi</td><td>${ba.multi.toFixed(1)}</td><td>${bb.multi.toFixed(1)}</td></tr>`);
    if(!rows.length) return '';
    return `<div class="real-bench"><div class="real-bench-head"><div><span class="eyebrow">HARİCİ KAYNAK</span><h4>Kaynaklı CPU benchmark karşılaştırması</h4></div><a href="${window.PCDB_BENCH.meta.cpuSourceUrl}" target="_blank" rel="noopener">Kaynağı aç ↗</a></div><div class="table-wrap"><table class="fps-table"><thead><tr><th>Test</th><th>${a.name}</th><th>${b.name}</th></tr></thead><tbody>${rows.join('')}</tbody></table></div><p class="fineprint">Kaynak: ${window.PCDB_BENCH.meta.cpuSource}. Farklı test koşullarındaki eski ve yeni veri setleri doğrudan karıştırılmaz.</p></div>`;
  }

  function cpuScoreForMode(cpu, mode){
    if(mode==='gaming') return cpu.gaming ?? cpu.score;
    if(mode==='multi') return cpu.multi ?? cpu.score;
    return Math.round(((cpu.gaming ?? cpu.score)*.55)+((cpu.multi ?? cpu.score)*.45));
  }

  function compareCpus(){
    const a=D.cpus[Number($('compareCpuA').value)];
    const b=D.cpus[Number($('compareCpuB').value)];
    const mode=$('compareCpuMode').value;
    if(!a || !b) return;

    const sa=cpuScoreForMode(a,mode), sb=cpuScoreForMode(b,mode);
    const d=pctDiff(sa,sb);
    const winner=Math.abs(d)<3?null:(d>0?b:a);
    const loser=winner?(winner===a?b:a):null;
    const modeLabel=mode==='gaming'?'oyun':mode==='multi'?'çok çekirdek / üretkenlik':'genel kullanım';

    const reasonsA=[],reasonsB=[];
    if(a.gaming>b.gaming+2) reasonsA.push(`Oyun endeksi ${a.gaming}; ${b.name} değerinden daha yüksek.`);
    if(b.gaming>a.gaming+2) reasonsB.push(`Oyun endeksi ${b.gaming}; ${a.name} değerinden daha yüksek.`);
    if(a.multi>b.multi+2) reasonsA.push(`Çok çekirdek endeksi ${a.multi}; üretkenlik işlerinde avantaj sağlayabilir.`);
    if(b.multi>a.multi+2) reasonsB.push(`Çok çekirdek endeksi ${b.multi}; üretkenlik işlerinde avantaj sağlayabilir.`);
    if(a.cores>b.cores) reasonsA.push(`${a.cores} çekirdek / ${a.threads} izlek ile daha yüksek paralel işlem kapasitesi sunuyor.`);
    if(b.cores>a.cores) reasonsB.push(`${b.cores} çekirdek / ${b.threads} izlek ile daha yüksek paralel işlem kapasitesi sunuyor.`);
    if(a.socket!==b.socket){
      if(a.socket==='AM5' || a.socket==='LGA1851') reasonsA.push(`${a.socket} platformu daha yeni bir yükseltme yoluna sahip olabilir.`);
      if(b.socket==='AM5' || b.socket==='LGA1851') reasonsB.push(`${b.socket} platformu daha yeni bir yükseltme yoluna sahip olabilir.`);
    }
    if(!reasonsA.length) reasonsA.push('Bu karşılaştırmada belirgin teknik üstünlük az; fiyat ve platform maliyeti belirleyici olabilir.');
    if(!reasonsB.length) reasonsB.push('Bu karşılaştırmada belirgin teknik üstünlük az; fiyat ve platform maliyeti belirleyici olabilir.');

    const title=winner?`🏆 ${winner.name} ${modeLabel} için önde`:'İki CPU birbirine yakın';
    const text=winner?`${winner.name}, seçilen ${modeLabel} profilinde ${loser.name} karşısında yaklaşık %${Math.round(Math.abs(d))} daha yüksek normalize edilmiş endeks üretiyor.`:
      `Seçilen ${modeLabel} profilinde fark küçük. Oyun motoru, RAM, soğutma ve güç limitleri sonucu değiştirebilir.`;

    $('compareCpuOutput').innerHTML=`
      <div class="compare-head">
        <div class="gpu-name-card"><span>CPU A</span><strong>${a.name}</strong><small>${a.socket} • ${a.cores}C/${a.threads}T</small></div>
        <div class="vs-badge">VS</div>
        <div class="gpu-name-card right"><span>CPU B</span><strong>${b.name}</strong><small>${b.socket} • ${b.cores}C/${b.threads}T</small></div>
      </div>
      <div class="compare-verdict"><b>Genel yorum</b><h3>${title}</h3><p>${text}</p></div>
      <div class="compare-grid">
        <div class="compare-metric"><span>Oyun endeksi</span><div class="metric-row"><strong>${a.gaming}</strong><i>vs</i><strong>${b.gaming}</strong></div></div>
        <div class="compare-metric"><span>Çok çekirdek endeksi</span><div class="metric-row"><strong>${a.multi}</strong><i>vs</i><strong>${b.multi}</strong></div></div>
        <div class="compare-metric"><span>Çekirdek / İzlek</span><div class="metric-row"><strong>${a.cores}/${a.threads}</strong><i>vs</i><strong>${b.cores}/${b.threads}</strong></div></div>
      </div>
      <div class="compare-tech-grid">
        <div class="compare-tech"><span>CPU A soket</span><strong>${a.socket}</strong></div>
        <div class="compare-tech"><span>CPU B soket</span><strong>${b.socket}</strong></div>
        <div class="compare-tech"><span>CPU A bellek platformu</span><strong>${a.platform}</strong></div>
        <div class="compare-tech"><span>CPU B bellek platformu</span><strong>${b.platform}</strong></div>
      </div>
      <div class="compare-reasons">
        <div class="reason-box"><h4>${a.name} neden tercih edilebilir?</h4><ul>${reasonsA.map(x=>`<li>${x}</li>`).join('')}</ul></div>
        <div class="reason-box"><h4>${b.name} neden tercih edilebilir?</h4><ul>${reasonsB.map(x=>`<li>${x}</li>`).join('')}</ul></div>
      </div>${realGpuBenchHtml(a,b)}`;
  }

  function boardFeatureScore(board){
    return Math.round(board.vrm*.36 + board.upgrade*.34 + Math.min(board.m2,4)*6 + (board.wifi?8:0) + (board.oc?8:0));
  }

  function boardScoreForMode(board,mode){
    if(mode==='vrm') return Math.round(board.vrm*.72 + board.upgrade*.18 + (board.oc?10:0));
    if(mode==='upgrade') return Math.round(board.upgrade*.72 + board.vrm*.18 + (board.memory==='DDR5'?10:0));
    if(mode==='features') return Math.round(Math.min(100, board.m2*12 + (board.wifi?22:0) + (board.oc?16:0) + board.vrm*.28));
    return Math.round((boardFeatureScore(board)+board.vrm+board.upgrade)/3);
  }

  function compareBoards(){
    const a=D.motherboards[Number($('compareBoardA').value)];
    const b=D.motherboards[Number($('compareBoardB').value)];
    const mode=$('compareBoardMode').value;
    if(!a || !b) return;

    const sa=boardScoreForMode(a,mode), sb=boardScoreForMode(b,mode);
    const d=pctDiff(sa,sb);
    const winner=Math.abs(d)<4?null:(d>0?b:a);
    const loser=winner?(winner===a?b:a):null;

    const reasonsA=[],reasonsB=[];
    if(a.vrm>b.vrm+5) reasonsA.push(`VRM/güç teslimi sınıfı daha yüksek (${a.vrm}/100). Güçlü işlemciler için daha rahat olabilir.`);
    if(b.vrm>a.vrm+5) reasonsB.push(`VRM/güç teslimi sınıfı daha yüksek (${b.vrm}/100). Güçlü işlemciler için daha rahat olabilir.`);
    if(a.upgrade>b.upgrade+5) reasonsA.push(`Platform/yükseltme endeksi daha yüksek (${a.upgrade}/100).`);
    if(b.upgrade>a.upgrade+5) reasonsB.push(`Platform/yükseltme endeksi daha yüksek (${b.upgrade}/100).`);
    if(a.m2>b.m2) reasonsA.push(`${a.m2} adet M.2 yuvasıyla daha fazla NVMe genişleme alanı sunuyor.`);
    if(b.m2>a.m2) reasonsB.push(`${b.m2} adet M.2 yuvasıyla daha fazla NVMe genişleme alanı sunuyor.`);
    if(a.wifi && !b.wifi) reasonsA.push('Dahili Wi‑Fi özelliğine sahip.');
    if(b.wifi && !a.wifi) reasonsB.push('Dahili Wi‑Fi özelliğine sahip.');
    if(a.oc && !b.oc) reasonsA.push('CPU hız aşırtma desteği bulunan bir chipset sınıfında.');
    if(b.oc && !a.oc) reasonsB.push('CPU hız aşırtma desteği bulunan bir chipset sınıfında.');
    if(a.memory==='DDR5' && b.memory==='DDR4') reasonsA.push('DDR5 platformu kullanıyor; daha yeni bellek ekosistemine sahip.');
    if(b.memory==='DDR5' && a.memory==='DDR4') reasonsB.push('DDR5 platformu kullanıyor; daha yeni bellek ekosistemine sahip.');
    if(!reasonsA.length) reasonsA.push('Belirgin bir teknik üstünlük yok; fiyat, kasa boyutu ve bağlantı ihtiyacı belirleyici olabilir.');
    if(!reasonsB.length) reasonsB.push('Belirgin bir teknik üstünlük yok; fiyat, kasa boyutu ve bağlantı ihtiyacı belirleyici olabilir.');

    let compat='';
    if(a.socket!==b.socket){
      compat=`<div class="compat-warning">⚠️ Bu iki anakart farklı işlemci soketleri kullanıyor: <b>${a.socket}</b> ve <b>${b.socket}</b>. Aynı CPU ile doğrudan birbirinin alternatifi olmayabilirler.</div>`;
    }else{
      compat=`<div class="compat-good">✓ Her iki anakart da ${a.socket} soketini kullanıyor; aynı platform içindeki alternatifler olarak daha doğrudan karşılaştırılabilir.</div>`;
    }

    const title=winner?`Avantajlı: ${winner.name}`:'İki anakart yakın seviyede';
    const text=winner?`${winner.name}, özellik/altyapı endeksinde ${loser.name} karşısında önde. Bu fark doğrudan daha fazla FPS anlamına gelmez.`:
      'Seçilen öncelikte fark küçük. Fiyat, BIOS özellikleri, port ihtiyacı ve kasa form faktörü daha önemli olabilir.';

    $('compareBoardOutput').innerHTML=`
      <div class="compare-head">
        <div class="gpu-name-card"><span>Anakart A</span><strong>${a.name}</strong><small>${a.chipset} • ${a.socket} • ${a.form}</small></div>
        <div class="vs-badge">VS</div>
        <div class="gpu-name-card right"><span>Anakart B</span><strong>${b.name}</strong><small>${b.chipset} • ${b.socket} • ${b.form}</small></div>
      </div>
      <div class="compare-verdict"><b>Genel yorum</b><h3>${title}</h3><p>${text}</p></div>
      ${compat}
      <div class="compare-tech-grid">
        <div class="compare-tech"><span>Chipset</span><strong>${a.chipset} vs ${b.chipset}</strong></div>
        <div class="compare-tech"><span>Bellek</span><strong>${a.memory} vs ${b.memory}</strong></div>
        <div class="compare-tech"><span>M.2 yuvası</span><strong>${a.m2} vs ${b.m2}</strong></div>
        <div class="compare-tech"><span>Wi‑Fi</span><strong>${a.wifi?'Var':'Yok'} vs ${b.wifi?'Var':'Yok'}</strong></div>
      </div>
      <div class="score-bars">
        <div class="score-row"><span>${a.name} • VRM</span><div class="score-track"><div class="score-fill" style="width:${a.vrm}%"></div></div><b>${a.vrm}</b></div>
        <div class="score-row"><span>${b.name} • VRM</span><div class="score-track"><div class="score-fill" style="width:${b.vrm}%"></div></div><b>${b.vrm}</b></div>
        <div class="score-row"><span>${a.name} • Yükseltme</span><div class="score-track"><div class="score-fill" style="width:${a.upgrade}%"></div></div><b>${a.upgrade}</b></div>
        <div class="score-row"><span>${b.name} • Yükseltme</span><div class="score-track"><div class="score-fill" style="width:${b.upgrade}%"></div></div><b>${b.upgrade}</b></div>
      </div>
      <div class="compare-reasons">
        <div class="reason-box"><h4>${a.name} neden tercih edilebilir?</h4><ul>${reasonsA.map(x=>`<li>${x}</li>`).join('')}</ul></div>
        <div class="reason-box"><h4>${b.name} neden tercih edilebilir?</h4><ul>${reasonsB.map(x=>`<li>${x}</li>`).join('')}</ul></div>
      </div>${realCpuBenchHtml(a,b)}`;
  }

  function setupCompareTabs(){
    document.querySelectorAll('.compare-tab').forEach(btn=>{
      btn.addEventListener('click',()=>{
        document.querySelectorAll('.compare-tab').forEach(x=>x.classList.remove('active'));
        document.querySelectorAll('.compare-panel').forEach(x=>x.classList.remove('active'));
        btn.classList.add('active');
        const panel=document.querySelector(`[data-compare-panel="${btn.dataset.compareTab}"]`);
        if(panel) panel.classList.add('active');
      });
    });
  }


  function build(){
    const tier=$('budgetTier').value,use=$('buildUse').value,parts=D.builds[use][tier];
    const labels=['CPU','GPU','RAM','Depolama','Anakart','PSU'];
    $('buildOutput').innerHTML=parts.map((p,i)=>`<div class="part-card"><span>${labels[i]}</span><strong>${p}</strong></div>`).join('')+`<p class="build-note">Bu bölüm parça sınıfı önerir; satın almadan önce anakart soketi, RAM tipi, kasa ölçüsü ve PSU güç bağlantılarını ayrıca doğrula.</p>`;
  }

  fillLists();
  $('analysisForm').addEventListener('submit',analyze);
  $('compareBtn').addEventListener('click',compareGpus);
  $('compareCpuBtn').addEventListener('click',compareCpus);
  $('compareBoardBtn').addEventListener('click',compareBoards);
  $('compatBtn').addEventListener('click',checkCompatibility);
  $('shareAnalysisBtn').addEventListener('click',shareAnalysis);
  $('buildBtn').addEventListener('click',build);
  setupCompareTabs();
  setupCompareFilters();
  compareGpus();
  compareCpus();
  compareBoards();
  build();
  loadAnalysisFromUrl();
})();
