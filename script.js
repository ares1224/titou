// Basic interactions for TITOU site
const LINKS = {
  telegram: 'https://t.me/one_eye_circle',
  twitter: 'https://twitter.com/YourTwitterHere',
  dex: '#', // Replace with your DEX link (Jupiter / Uniswap / Raydium etc.)
};

// Set links in all relevant anchors
function wireLinks() {
  const map = [
    ['navTelegram', LINKS.telegram],
    ['navTwitter', LINKS.twitter],
    ['ctaTelegram', LINKS.telegram],
    ['ctaTwitter', LINKS.twitter],
    ['ctaDex',      LINKS.dex],
    ['linksTelegram', LINKS.telegram],
    ['linksTwitter',  LINKS.twitter],
  ];
  map.forEach(([id, href]) => {
    const a = document.getElementById(id);
    if (a && href) a.href = href;
  });
}

function setupNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('siteNav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // Close on link click (mobile)
  nav.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('open'));
  });
}

function smoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function revealOnScroll() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  els.forEach(el => io.observe(el));
}

function copyContract() {
  const btn = document.getElementById('copyAddress');
  const code = document.getElementById('contractAddress');
  if (!btn || !code) return;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.textContent.trim());
      btn.textContent = 'Copié !';
      setTimeout(() => (btn.textContent = 'Copier'), 1200);
    } catch (e) {
      alert('Copie impossible, sélectionne le texte manuellement.');
    }
  });
}

function setYear() {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  wireLinks();
  setupNav();
  smoothAnchors();
  revealOnScroll();
  copyContract();
  setYear();
});
