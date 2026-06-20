const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
  });
});

const tel = document.getElementById('telefone');
if (tel) {
  tel.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);

    if (v.length > 10) {
      v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (v.length > 6) {
      v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (v.length > 2) {
      v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    }

    e.target.value = v;
  });
}

document.querySelectorAll('.btn-pedir').forEach(btn => {
  btn.addEventListener('click', () => {
    const produto = btn.dataset.produto;
    const select = document.getElementById('produto');
    if (select) {
      [...select.options].forEach(option => {
        if (option.value === produto) {
          option.selected = true;
        }
      });
    }
    document.getElementById('pedido')?.scrollIntoView({ behavior: 'smooth' });
  });
});

const form = document.getElementById('order-form');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const nome = form.nome.value.trim();
    const telefone = form.telefone.value.trim();
    const produto = form.produto.value.trim();
    const quantidade = form.quantidade.value.trim() || '1';
    const obs = form.obs.value.trim();
    const numero = form.dataset.whats;

    if (!nome || !telefone || !produto) {
      alert('Por favor, preencha nome, telefone e escolha um produto.');
      return;
    }

    const mensagem =
      `Olá! Gostaria de fazer um pedido:%0A%0A` +
      `*Nome:* ${nome}%0A` +
      `*Telefone:* ${telefone}%0A` +
      `*Produto:* ${produto}%0A` +
      `*Quantidade:* ${quantidade}%0A` +
      (obs ? `*Observações:* ${obs}%0A` : '');

    const url = `https://wa.me/${numero}?text=${mensagem}`;
    window.open(url, '_blank');
  });
}
