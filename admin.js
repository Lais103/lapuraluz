// ============================================================
// LA PURA LUZ — Painel Administrativo v2
// Com catálogo (foto direto do celular), estoque, despesas,
// pedidos por canal, fluxo de caixa e fechamentos.
// ============================================================

const ADMIN_EMAIL = 'lais103@gmail.com';
const ADMIN_SENHA = '123456';
const CHAVE_SESSAO = 'lpl_logado';
const CHAVE_DADOS = 'lpl_dados';

const telaLogin = document.getElementById('telaLogin');
const painel = document.getElementById('painel');

function estaLogado() { return sessionStorage.getItem(CHAVE_SESSAO) === 'sim'; }
function mostrarPainel() { telaLogin.hidden=true; telaLogin.style.display='none'; painel.hidden=false; renderizarTudo(); }

document.getElementById('formLogin').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const senha = document.getElementById('loginSenha').value;
  if (email === ADMIN_EMAIL && senha === ADMIN_SENHA) {
    sessionStorage.setItem(CHAVE_SESSAO, 'sim');
    document.getElementById('loginErro').classList.remove('visivel');
    mostrarPainel();
  } else { document.getElementById('loginErro').classList.add('visivel'); }
});
document.getElementById('btnSair').addEventListener('click', () => { sessionStorage.removeItem(CHAVE_SESSAO); location.reload(); });
if (estaLogado()) mostrarPainel();

// ---------- DADOS ----------
function vazio() { return { produtos: [], pedidos: [], entradas: [], saidas: [], despesas: [] }; }
function carregarDados() { try { const b=localStorage.getItem(CHAVE_DADOS); if(b) return JSON.parse(b); } catch(e){} return vazio(); }
let dados = carregarDados();
function salvar() { localStorage.setItem(CHAVE_DADOS, JSON.stringify(dados)); }
function novoId() { return Date.now().toString(36)+Math.random().toString(36).slice(2,7); }

// ---------- UTILS ----------
function real(v) { return (v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }
function dataBR(iso) { if(!iso) return '—'; const[a,m,d]=iso.split('-'); return `${d}/${m}/${a}`; }
function mesDe(iso) { return iso ? iso.slice(0,7) : ''; }
function mesAtual() { const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`; }
function hojeISO() { const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
const NOMES_MES=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
function nomeMes(am) { const[a,m]=am.split('-'); return `${NOMES_MES[parseInt(m,10)-1]} / ${a}`; }

function lerImagem(file) {
  return new Promise((ok, fail) => {
    if (!file) { ok(''); return; }
    const r = new FileReader();
    // Redimensionar pra não estourar o localStorage
    r.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX = 600;
        let w = img.width, h = img.height;
        if (w > MAX || h > MAX) { if (w > h) { h = h * MAX / w; w = MAX; } else { w = w * MAX / h; h = MAX; } }
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        ok(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.onerror = () => ok('');
      img.src = r.result;
    };
    r.onerror = () => fail();
    r.readAsDataURL(file);
  });
}

// ---------- ABAS ----------
document.getElementById('abas').addEventListener('click', (e) => {
  const btn = e.target.closest('.aba'); if(!btn) return;
  document.querySelectorAll('.aba').forEach(a => a.classList.remove('ativa'));
  document.querySelectorAll('.painel-secao').forEach(s => s.classList.remove('ativa'));
  btn.classList.add('ativa');
  document.getElementById('sec-'+btn.dataset.aba).classList.add('ativa');
});

// ---------- CATÁLOGO ----------
const formProduto = document.getElementById('formProduto');
formProduto.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fileInput = document.getElementById('prodImg');
  const imagem = await lerImagem(fileInput.files[0]);
  dados.produtos.push({
    id: novoId(),
    sku: document.getElementById('prodSku').value.trim(),
    nome: document.getElementById('prodNome').value.trim(),
    categoria: document.getElementById('prodCat').value,
    custo: parseFloat(document.getElementById('prodCusto').value) || 0,
    preco: parseFloat(document.getElementById('prodPreco').value) || 0,
    estoque: parseInt(document.getElementById('prodEstoque').value) || 0,
    minimo: parseInt(document.getElementById('prodMin').value) || 3,
    descricao: document.getElementById('prodDesc').value.trim(),
    imagem: imagem,
    ativo: true
  });
  salvar(); formProduto.reset(); document.getElementById('prodMin').value = '3'; renderizarTudo();
});

function renderizarProdutos() {
  const tbody = document.getElementById('tbodyProdutos');
  document.getElementById('totalProdutos').textContent = dados.produtos.length + ' produtos';
  if (!dados.produtos.length) { tbody.innerHTML = '<tr class="linha-vazia"><td colspan="9">Cadastre o primeiro produto acima! ✨</td></tr>'; return; }
  tbody.innerHTML = dados.produtos.map(p => {
    const img = p.imagem ? `<img src="${p.imagem}" class="thumb-mini">` : '<div class="thumb-mini" style="background:#e9dbc5;display:flex;align-items:center;justify-content:center;font-size:1.2rem">💎</div>';
    return `<tr>
      <td>${img}</td>
      <td>${p.sku||'—'}</td>
      <td><strong>${p.nome}</strong>${p.descricao?`<br><small style="color:#6f6458">${p.descricao}</small>`:''}</td>
      <td>${p.categoria}</td>
      <td>${p.custo?real(p.custo):'—'}</td>
      <td>${p.preco?real(p.preco):'Consulte'}</td>
      <td>${p.estoque||0} ${p.estoque <= (p.minimo||3) ? '<span style="color:var(--vermelho);font-weight:800">⚠️</span>' : ''}</td>
      <td><button class="acao" data-toggle-prod="${p.id}">${p.ativo!==false?'✅':'❌'}</button></td>
      <td><button class="acao" data-del-prod="${p.id}">✖</button></td>
    </tr>`; }).join('');
}

// ---------- ESTOQUE ----------
function renderizarEstoque() {
  const tbody = document.getElementById('tbodyEstoque');
  document.getElementById('totalEstoque').textContent = dados.produtos.length + ' produtos';
  if (!dados.produtos.length) { tbody.innerHTML = '<tr class="linha-vazia"><td colspan="8">Cadastre produtos no catálogo para controlar o estoque.</td></tr>'; return; }
  tbody.innerHTML = dados.produtos.map(p => {
    const status = p.estoque <= 0 ? '<span class="tag tag-cancel">Sem estoque</span>' :
      p.estoque <= (p.minimo||3) ? '<span class="tag tag-pend">Atenção</span>' : '<span class="tag tag-ok">OK</span>';
    const valorEstoque = (p.custo||0) * (p.estoque||0);
    return `<tr>
      <td>${p.sku||'—'}</td><td>${p.nome}</td><td>${p.categoria}</td>
      <td>${p.custo?real(p.custo):'—'}</td><td>${p.preco?real(p.preco):'—'}</td>
      <td><input type="number" min="0" value="${p.estoque||0}" style="width:60px;text-align:center;border:1px solid #e9dbc5;border-radius:6px;padding:4px" data-estoque-prod="${p.id}"></td>
      <td>${p.minimo||3}</td><td>${status}</td>
    </tr>`; }).join('');
  // Atualizar estoque inline
  tbody.querySelectorAll('[data-estoque-prod]').forEach(inp => {
    inp.addEventListener('change', () => {
      const p = dados.produtos.find(x => x.id === inp.dataset.estoqueProd);
      if (p) { p.estoque = parseInt(inp.value) || 0; salvar(); renderizarEstoque(); }
    });
  });
}

// ---------- PEDIDOS ----------
const formPedido = document.getElementById('formPedido');
formPedido.addEventListener('submit', (e) => {
  e.preventDefault();
  dados.pedidos.push({
    id: novoId(),
    cliente: document.getElementById('pedCliente').value.trim(),
    tel: document.getElementById('pedTel').value.trim(),
    produto: document.getElementById('pedProduto').value.trim(),
    valor: parseFloat(document.getElementById('pedValor').value) || 0,
    canal: document.getElementById('pedCanal').value,
    status: document.getElementById('pedStatus').value,
    data: hojeISO()
  });
  salvar(); formPedido.reset(); renderizarPedidos();
});

function renderizarPedidos() {
  const tbody = document.getElementById('tbodyPedidos');
  document.getElementById('totalPedidos').textContent = dados.pedidos.length;
  if (!dados.pedidos.length) { tbody.innerHTML = '<tr class="linha-vazia"><td colspan="6">Nenhum pedido.</td></tr>'; return; }
  tbody.innerHTML = [...dados.pedidos].reverse().map(p => {
    const tc = p.status==='Entregue'||p.status==='Aprovado'?'tag-ok':(p.status==='Cancelado'?'tag-cancel':'tag-pend');
    return `<tr>
      <td>${p.cliente}${p.canal?` <small>(${p.canal})</small>`:''}</td><td>${p.produto}</td><td>${real(p.valor)}</td>
      <td><span class="tag ${tc}">${p.status}</span></td><td>${dataBR(p.data)}</td>
      <td>
        <select class="acao" data-status-pedido="${p.id}" style="border:1px solid #e9dbc5;border-radius:6px;padding:2px 6px;font-size:.8rem">
          ${['Pendente','Aprovado','Enviado','Entregue','Cancelado'].map(s=>`<option ${s===p.status?'selected':''}>${s}</option>`).join('')}
        </select>
        <button class="acao" data-del-pedido="${p.id}">✖</button>
      </td></tr>`; }).join('');
}

// ---------- ENTRADAS ----------
const formEntrada = document.getElementById('formEntrada');
document.getElementById('entData').value = hojeISO();
document.getElementById('mesEnt').value = mesAtual();
formEntrada.addEventListener('submit', (e) => {
  e.preventDefault();
  dados.entradas.push({ id: novoId(), desc: document.getElementById('entDesc').value.trim()+' ('+document.getElementById('entForma').value+')', valor: parseFloat(document.getElementById('entValor').value), data: document.getElementById('entData').value });
  salvar(); document.getElementById('entDesc').value=''; document.getElementById('entValor').value=''; renderizarTudo();
});
document.getElementById('mesEnt').addEventListener('change', renderizarEntradas);
function renderizarEntradas() {
  const mes=document.getElementById('mesEnt').value; const tbody=document.getElementById('tbodyEnt');
  const lista=dados.entradas.filter(x=>!mes||mesDe(x.data)===mes).sort((a,b)=>b.data.localeCompare(a.data));
  document.getElementById('totalEnt').textContent='Total: '+real(lista.reduce((s,x)=>s+x.valor,0));
  if(!lista.length){tbody.innerHTML='<tr class="linha-vazia"><td colspan="4">Nenhuma entrada.</td></tr>';return;}
  tbody.innerHTML=lista.map(x=>`<tr><td>${x.desc}</td><td class="valor-pos">${real(x.valor)}</td><td>${dataBR(x.data)}</td><td><button class="acao" data-del-ent="${x.id}">✖</button></td></tr>`).join('');
}

// ---------- SAÍDAS ----------
const formSaida = document.getElementById('formSaida');
document.getElementById('saiData').value = hojeISO();
document.getElementById('mesSai').value = mesAtual();
formSaida.addEventListener('submit', (e) => {
  e.preventDefault();
  dados.saidas.push({ id: novoId(), desc: document.getElementById('saiDesc').value.trim(), valor: parseFloat(document.getElementById('saiValor').value), data: document.getElementById('saiData').value });
  salvar(); document.getElementById('saiDesc').value=''; document.getElementById('saiValor').value=''; renderizarTudo();
});
document.getElementById('mesSai').addEventListener('change', renderizarSaidas);
function renderizarSaidas() {
  const mes=document.getElementById('mesSai').value; const tbody=document.getElementById('tbodySai');
  const lista=dados.saidas.filter(x=>!mes||mesDe(x.data)===mes).sort((a,b)=>b.data.localeCompare(a.data));
  document.getElementById('totalSai').textContent='Total: '+real(lista.reduce((s,x)=>s+x.valor,0));
  if(!lista.length){tbody.innerHTML='<tr class="linha-vazia"><td colspan="4">Nenhuma saída.</td></tr>';return;}
  tbody.innerHTML=lista.map(x=>`<tr><td>${x.desc}</td><td class="valor-neg">${real(x.valor)}</td><td>${dataBR(x.data)}</td><td><button class="acao" data-del-sai="${x.id}">✖</button></td></tr>`).join('');
}

// ---------- DESPESAS ----------
const formDespesa = document.getElementById('formDespesa');
document.getElementById('despData').value = hojeISO();
document.getElementById('mesDesp').value = mesAtual();
formDespesa.addEventListener('submit', (e) => {
  e.preventDefault();
  dados.despesas.push({
    id: novoId(),
    tipo: document.getElementById('despTipo').value,
    categoria: document.getElementById('despCat').value,
    desc: document.getElementById('despDesc').value.trim(),
    valor: parseFloat(document.getElementById('despValor').value),
    pago: document.getElementById('despPago').value,
    forma: document.getElementById('despForma').value,
    data: document.getElementById('despData').value
  });
  salvar(); document.getElementById('despDesc').value=''; document.getElementById('despValor').value=''; renderizarTudo();
});
document.getElementById('mesDesp').addEventListener('change', renderizarDespesas);
function renderizarDespesas() {
  if (!dados.despesas) dados.despesas = [];
  const mes=document.getElementById('mesDesp').value; const tbody=document.getElementById('tbodyDesp');
  const lista=dados.despesas.filter(x=>!mes||mesDe(x.data)===mes).sort((a,b)=>(b.data||'').localeCompare(a.data||''));
  const total=lista.reduce((s,x)=>s+x.valor,0);
  const pend=dados.despesas.filter(x=>x.pago==='Não').length;
  document.getElementById('totalDesp').textContent='Total: '+real(total)+(pend?` (${pend} pendentes)`:'');
  if(!lista.length){tbody.innerHTML='<tr class="linha-vazia"><td colspan="7">Nenhuma despesa neste mês.</td></tr>';return;}
  tbody.innerHTML=lista.map(x=>{
    const tc=x.pago==='Sim'?'tag-ok':'tag-pend';
    return `<tr><td>${x.tipo}</td><td>${x.categoria}</td><td>${x.desc}</td><td class="valor-neg">${real(x.valor)}</td><td><span class="tag ${tc}">${x.pago}</span></td><td>${dataBR(x.data)}</td><td><button class="acao" data-del-desp="${x.id}">✖</button></td></tr>`;
  }).join('');
}

// ---------- RESUMO ----------
document.getElementById('mesResumo').value = mesAtual();
document.getElementById('mesResumo').addEventListener('change', renderizarResumo);
function renderizarResumo() {
  const mes=document.getElementById('mesResumo').value||mesAtual();
  const ent=dados.entradas.filter(x=>mesDe(x.data)===mes).reduce((s,x)=>s+x.valor,0);
  const sai=dados.saidas.filter(x=>mesDe(x.data)===mes).reduce((s,x)=>s+x.valor,0);
  const desp=(dados.despesas||[]).filter(x=>mesDe(x.data)===mes).reduce((s,x)=>s+x.valor,0);
  const totalSaidas=sai+desp;
  const ped=dados.pedidos.filter(x=>mesDe(x.data)===mes).length;
  document.getElementById('kpiEnt').textContent=real(ent);
  document.getElementById('kpiSai').textContent=real(totalSaidas);
  document.getElementById('kpiPed').textContent=ped;
  const kpi=document.getElementById('kpiSaldo');
  kpi.textContent=real(ent-totalSaidas);
  kpi.style.color=(ent-totalSaidas)>=0?'var(--verde)':'var(--vermelho)';
}

// ---------- FECHAMENTOS ----------
function renderizarFechamentos() {
  const tbody=document.getElementById('tbodyFech');
  const meses=new Set([...dados.entradas.map(x=>mesDe(x.data)),...dados.saidas.map(x=>mesDe(x.data)),...(dados.despesas||[]).map(x=>mesDe(x.data))]);
  const lista=[...meses].filter(Boolean).sort().reverse();
  if(!lista.length){tbody.innerHTML='<tr class="linha-vazia"><td colspan="4">Lance entradas e saídas para ver os fechamentos.</td></tr>';return;}
  tbody.innerHTML=lista.map(mes=>{
    const e=dados.entradas.filter(x=>mesDe(x.data)===mes).reduce((s,x)=>s+x.valor,0);
    const s=dados.saidas.filter(x=>mesDe(x.data)===mes).reduce((s2,x)=>s2+x.valor,0);
    const d=(dados.despesas||[]).filter(x=>mesDe(x.data)===mes).reduce((s3,x)=>s3+x.valor,0);
    const saldo=e-s-d;
    return `<tr><td><strong>${nomeMes(mes)}</strong></td><td class="valor-pos">${real(e)}</td><td class="valor-neg">- ${real(s+d)}</td><td style="font-weight:800;color:${saldo>=0?'var(--verde)':'var(--vermelho)'}">${real(saldo)}</td></tr>`;
  }).join('');
}

// ---------- AÇÕES ----------
document.querySelector('.conteudo').addEventListener('click', (e) => {
  const btn=e.target.closest('button,select'); if(!btn) return;
  const d=btn.dataset;
  if(d.delProd&&confirm('Excluir?')){dados.produtos=dados.produtos.filter(x=>x.id!==d.delProd);}
  else if(d.toggleProd){const p=dados.produtos.find(x=>x.id===d.toggleProd);if(p)p.ativo=p.ativo===false?true:false;}
  else if(d.delPedido&&confirm('Excluir?')){dados.pedidos=dados.pedidos.filter(x=>x.id!==d.delPedido);}
  else if(d.statusPedido){const p=dados.pedidos.find(x=>x.id===d.statusPedido);if(p)p.status=btn.value;}
  else if(d.delEnt&&confirm('Excluir?')){dados.entradas=dados.entradas.filter(x=>x.id!==d.delEnt);}
  else if(d.delSai&&confirm('Excluir?')){dados.saidas=dados.saidas.filter(x=>x.id!==d.delSai);}
  else if(d.delDesp&&confirm('Excluir?')){dados.despesas=dados.despesas.filter(x=>x.id!==d.delDesp);}
  else return;
  salvar(); renderizarTudo();
});

// ---------- BACKUP ----------
document.getElementById('btnExportJSON').addEventListener('click',()=>{
  const blob=new Blob([JSON.stringify(dados,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`lapuraluz-backup-${hojeISO()}.json`;a.click();
});
document.getElementById('inputImport').addEventListener('change',(e)=>{
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=()=>{try{const n=JSON.parse(r.result);if(confirm('Restaurar?')){dados={produtos:n.produtos||[],pedidos:n.pedidos||[],entradas:n.entradas||[],saidas:n.saidas||[],despesas:n.despesas||[]};salvar();renderizarTudo();alert('Restaurado!');}}catch(er){alert('Arquivo inválido.');}e.target.value='';};
  r.readAsText(f);
});
document.getElementById('btnLimpar').addEventListener('click',()=>{
  if(confirm('Apagar TUDO?')&&confirm('Baixou o backup?')){dados=vazio();salvar();renderizarTudo();}
});

// ---------- RENDERIZAR TUDO ----------
function renderizarTudo() {
  renderizarResumo(); renderizarProdutos(); renderizarEstoque();
  renderizarPedidos(); renderizarEntradas(); renderizarSaidas();
  renderizarDespesas(); renderizarFechamentos();
}
