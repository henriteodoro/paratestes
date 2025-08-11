// nav.js — carrega nav.html dentro do #nav-placeholder
(async function loadNav(){
  async function includeNav() {
    const placeholder = document.getElementById('nav-placeholder');
    if (!placeholder) return;
    const candidates = ['./nav.html', 'nav.html', '../nav.html'];
    for (const p of candidates) {
      try {
        const res = await fetch(p, { cache: 'no-store' });
        if (res.ok) {
          placeholder.innerHTML = await res.text();
          // (opcional) marca link ativo se nav tiver id/site-nav
          try {
            const nav = placeholder.querySelector('#site-nav');
            if (nav) {
              const anchors = nav.querySelectorAll('a');
              const loc = window.location.pathname.split('/').pop() || 'index.html';
              anchors.forEach(a => {
                if (a.getAttribute('href') === loc) a.classList.add('active-nav');
                else a.classList.remove('active-nav');
              });
            }
          } catch(e){}
          return;
        }
      } catch(e){}
    }
    // fallback discreto
    placeholder.innerHTML = '<!-- nav não encontrada: verifique nav.html -->';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', includeNav);
  } else {
    includeNav();
  }
})();
