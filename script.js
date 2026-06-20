/* Script comum a todos os sites */

// Menu mobile
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
if (toggle) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
}

// Fecha menu ao clicar em link
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => nav?.classList.remove('open'));
});

// Formulário de pedido → envia pro WhatsApp
const form = document.getElementById('order-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = form.nome.value.trim();
    const telefone = form.telefone.value.trim();
    const produto = form.produto.value;
    const quantidade = form.quantidade.value || '1';
    const obs = form.obs.value.trim();

    if (!nome || !telefone || !produto) {
      alert('Por favor, preencha nome, telefone e escolha um produto.');
      return;
    }

    const numero = form.dataset.whats; // número fica no data-whats do form
    const msg = `Olá! Gostaria de fazer um pedido:%0A%0A`
              + `*Nome:* ${nome}%0A`
              + `*Telefone:* ${telefone}%0A`
              + `*Produto:* ${produto}%0A`
              + `*Quantidade:* ${quantidade}%0A`
              + (obs ? `*Observações:* ${obs}%0A` : '');
    const url = `https://wa.me/${numero}?text=${msg}`;
    window.open(url, '_blank');
  });
}

// Botão "Pedir" do catálogo preenche o select do formulário
document.querySelectorAll('.btn-pedir').forEach(btn => {
  btn.addEventListener('click', () => {
    const produto = btn.dataset.produto;
    const select = document.querySelector('#produto');
    if (select) {
      [...select.options].forEach(o => {
        if (o.value === produto) o.selected = true;
      });
    }
    document.getElementById('pedido')?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Máscara simples de telefone
const tel = document.querySelector('#telefone');
if (tel) {
  tel.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g,'').slice(0,11);
    if (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    else if (v.length > 6) v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    e.target.value = v;
  });
}
