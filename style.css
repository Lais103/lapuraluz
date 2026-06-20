/* =========================================================
   Estilo base inspirado no layout do IPESP
   Cada site sobrescreve as variáveis --primary e --accent
   ========================================================= */

:root {
  --primary: #1c1c1c;
  --primary-dark: #000000;
  --accent: #c9a96e;
  --bg-light: #f8f6f1;
  --text: #2b2b2b;
  --text-soft: #555;
  --white: #ffffff;
  --shadow: 0 4px 18px rgba(0,0,0,.08);
  --radius: 10px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: 'Segoe UI', Tahoma, sans-serif;
  color: var(--text);
  line-height: 1.6;
  background: var(--white);
}

img { max-width: 100%; display: block; }

a { color: inherit; text-decoration: none; }

.container {
  width: 92%;
  max-width: 1180px;
  margin: 0 auto;
}

/* ===== HEADER ===== */
.site-header {
  background: var(--white);
  box-shadow: 0 2px 10px rgba(0,0,0,.06);
  position: sticky; top: 0; z-index: 100;
}
.header-inner {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 0;
}
.logo {
  display: flex; align-items: center; gap: 10px;
  font-weight: 700; font-size: 1.25rem; color: var(--primary);
}
.logo-mark {
  width: 42px; height: 42px; border-radius: 8px;
  background: var(--primary); color: var(--white);
  display: grid; place-items: center; font-weight: 800;
}

nav ul { list-style: none; display: flex; gap: 26px; }
nav a {
  font-weight: 500; color: var(--text);
  transition: color .2s;
}
nav a:hover { color: var(--primary); }

.header-cta {
  display: flex; gap: 10px;
}
.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 18px;
  border-radius: 6px; font-weight: 600; font-size: .92rem;
  border: none; cursor: pointer; transition: transform .15s, box-shadow .15s, background .2s;
}
.btn-primary { background: var(--primary); color: var(--white); }
.btn-primary:hover { background: var(--primary-dark); transform: translateY(-2px); }
.btn-accent  { background: var(--accent);  color: var(--white); }
.btn-accent:hover  { filter: brightness(.95); transform: translateY(-2px); }
.btn-outline { background: transparent; color: var(--primary); border: 2px solid var(--primary); }
.btn-outline:hover { background: var(--primary); color: var(--white); }
.btn-whats { background: #25d366; color: white; }
.btn-whats:hover { background: #1ebe5b; }

.menu-toggle {
  display: none; background: none; border: none; cursor: pointer;
  font-size: 1.6rem; color: var(--primary);
}

/* ===== HERO ===== */
.hero {
  position: relative;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: var(--white);
  padding: 90px 0 110px;
  overflow: hidden;
}
.hero::before {
  content: ""; position: absolute; inset: 0;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'><path fill='none' stroke='rgba(255,255,255,.06)' stroke-width='1' d='M0 30h60M30 0v60'/></svg>");
  opacity: .6;
}
.hero-content {
  position: relative;
  display: grid; grid-template-columns: 1fr 2fr 1fr;
  gap: 30px; align-items: center; min-height: 360px;
}
.hero-left, .hero-right { display: flex; flex-direction: column; gap: 12px; }
.hero-center { text-align: center; }
.hero-center h1 {
  font-size: 2.4rem; font-weight: 700; margin-bottom: 14px;
  text-shadow: 0 2px 8px rgba(0,0,0,.3);
}
.hero-center .tagline {
  font-style: italic; font-size: 1.1rem; opacity: .95;
}
.hero-center .tagline::before,
.hero-center .tagline::after { content: '"'; }
.hero-divider {
  width: 90px; height: 3px; background: var(--accent);
  margin: 18px auto;
}

.side-btn {
  display: flex; align-items: center; gap: 10px;
  background: rgba(255,255,255,.1);
  border: 1px solid rgba(255,255,255,.25);
  color: var(--white); padding: 12px 16px;
  border-radius: 6px; font-weight: 500;
  transition: background .2s, transform .15s;
  font-size: .92rem;
}
.side-btn:hover { background: rgba(255,255,255,.22); transform: translateX(4px); }

.menu-card {
  background: rgba(255,255,255,.08);
  border-radius: 8px; padding: 18px;
  border: 1px solid rgba(255,255,255,.15);
}
.menu-card h3 {
  color: var(--accent); text-align: right;
  font-size: 1rem; margin-bottom: 12px; letter-spacing: 1px;
}
.menu-card ul { list-style: none; }
.menu-card li {
  padding: 8px 0; text-align: right;
  border-bottom: 1px solid rgba(255,255,255,.1);
  font-size: .93rem; cursor: pointer; transition: color .2s;
}
.menu-card li:hover { color: var(--accent); }
.menu-card li::after { content: " ›"; color: var(--accent); }

/* ===== SECTIONS ===== */
section { padding: 70px 0; }
.section-alt { background: var(--bg-light); }
.section-title {
  text-align: center; font-size: 1.9rem; color: var(--primary);
  margin-bottom: 12px; font-weight: 700;
}
.section-divider {
  width: 70px; height: 3px; background: var(--accent);
  margin: 0 auto 40px;
}

/* Quem Somos */
.about-grid {
  display: grid; grid-template-columns: 1.2fr 1fr; gap: 36px;
}
.about-text p { margin-bottom: 14px; color: var(--text-soft); }
.cards-col { display: flex; flex-direction: column; gap: 18px; }
.info-card {
  background: var(--white); padding: 22px;
  border-radius: var(--radius); box-shadow: var(--shadow);
}
.info-card h4 {
  color: var(--primary); margin-bottom: 8px;
  display: flex; align-items: center; gap: 8px;
}
.info-card h4::before {
  content: "●"; color: var(--accent); font-size: 1.2rem;
}
.values-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px;
}
.value-pill {
  background: var(--bg-light); padding: 10px 12px;
  border-radius: 6px; font-size: .9rem; text-align: center;
}

/* Catálogo */
.catalog-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 22px;
}
.product-card {
  background: var(--white); border-radius: var(--radius);
  box-shadow: var(--shadow); overflow: hidden;
  transition: transform .2s, box-shadow .2s;
  display: flex; flex-direction: column;
}
.product-card:hover { transform: translateY(-5px); box-shadow: 0 8px 22px rgba(0,0,0,.12); }
.product-img {
  height: 200px; background: linear-gradient(135deg, var(--primary), var(--accent));
  display: grid; place-items: center; color: var(--white);
  font-size: 3rem;
}
.product-info { padding: 18px; flex: 1; display: flex; flex-direction: column; }
.product-info h3 { color: var(--primary); margin-bottom: 6px; font-size: 1.1rem; }
.product-info p { color: var(--text-soft); font-size: .9rem; margin-bottom: 12px; flex: 1; }
.product-price {
  color: var(--accent); font-weight: 700; font-size: 1.2rem; margin-bottom: 12px;
}
.product-card .btn { width: 100%; justify-content: center; }

/* Form de pedido */
.order-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 30px;
  align-items: start;
}
.order-info { background: var(--primary); color: var(--white); padding: 30px; border-radius: var(--radius); }
.order-info h3 { color: var(--accent); margin-bottom: 16px; }
.order-info ul { list-style: none; }
.order-info li { padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,.15); }
.order-info li::before { content: "✓ "; color: var(--accent); font-weight: bold; }

.order-form {
  background: var(--white); padding: 30px; border-radius: var(--radius);
  box-shadow: var(--shadow);
}
.form-group { margin-bottom: 16px; }
.form-group label {
  display: block; margin-bottom: 6px; font-weight: 500; color: var(--text);
}
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%; padding: 11px 14px;
  border: 1px solid #d0d4dc; border-radius: 6px;
  font-family: inherit; font-size: .95rem;
  transition: border .2s, box-shadow .2s;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none; border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(26,58,138,.12);
}
.form-group textarea { resize: vertical; min-height: 90px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

/* Localização */
.map-wrap {
  background: var(--bg-light);
  border-radius: var(--radius); overflow: hidden;
  border: 1px solid #e3e5ea; min-height: 320px;
  display: grid; place-items: center; text-align: center;
  padding: 30px;
}
.map-wrap iframe { width: 100%; min-height: 320px; border: 0; }
.map-placeholder { color: var(--text-soft); }
.map-placeholder i { font-size: 3rem; color: var(--accent); display: block; margin-bottom: 10px; }

/* Contato */
.contact-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 22px;
}
.contact-card {
  background: var(--white); padding: 24px; text-align: center;
  border-radius: var(--radius); box-shadow: var(--shadow);
  transition: transform .2s;
}
.contact-card:hover { transform: translateY(-4px); }
.contact-icon {
  width: 56px; height: 56px; border-radius: 50%;
  background: var(--primary); color: var(--white);
  display: grid; place-items: center; margin: 0 auto 14px;
  font-size: 1.4rem;
}
.contact-card h4 { color: var(--primary); margin-bottom: 6px; }
.contact-card p { color: var(--text-soft); font-size: .94rem; }
.contact-card a { color: var(--primary); font-weight: 600; }

/* Floating WhatsApp */
.float-whats {
  position: fixed; right: 22px; bottom: 22px; z-index: 99;
  width: 58px; height: 58px; border-radius: 50%;
  background: #25d366; color: white;
  display: grid; place-items: center;
  font-size: 1.7rem; box-shadow: 0 6px 18px rgba(0,0,0,.25);
  animation: pulse 2s infinite;
}
.float-whats:hover { background: #1ebe5b; }
@keyframes pulse {
  0%,100% { box-shadow: 0 6px 18px rgba(37,211,102,.5); }
  50%     { box-shadow: 0 6px 24px rgba(37,211,102,.9); }
}

/* Footer */
.site-footer {
  background: #1a1a1a; color: #cfcfcf; padding: 40px 0 20px;
  text-align: center; font-size: .92rem;
}
.site-footer h5 { color: var(--white); margin-bottom: 10px; }
.footer-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 25px; text-align: left; margin-bottom: 28px;
}
.footer-bottom { border-top: 1px solid #333; padding-top: 18px; color: #888; }
.social-links { display: flex; gap: 14px; margin-top: 8px; }
.social-links a {
  width: 36px; height: 36px; border-radius: 50%;
  background: #2a2a2a; display: grid; place-items: center;
  transition: background .2s;
}
.social-links a:hover { background: var(--accent); }

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .hero-content { grid-template-columns: 1fr; }
  .hero-left, .hero-right { display: none; }
  .hero { padding: 60px 0 70px; }
  .hero-center h1 { font-size: 1.7rem; }
  .about-grid, .order-grid { grid-template-columns: 1fr; }
  nav { display: none; position: absolute; top: 70px; right: 0; width: 100%;
        background: var(--white); box-shadow: 0 4px 10px rgba(0,0,0,.1); }
  nav.open { display: block; }
  nav ul { flex-direction: column; padding: 14px; }
  nav li { padding: 10px 0; border-bottom: 1px solid #eee; }
  .menu-toggle { display: block; }
  .header-cta .btn { padding: 8px 12px; font-size: .85rem; }
  .form-row { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .header-cta .btn-outline { display: none; }
  .section-title { font-size: 1.5rem; }
}
