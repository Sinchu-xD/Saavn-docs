// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// Copy to clipboard helper
function copyText(text, btn) {
  navigator.clipboard.writeText(text).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select(); document.execCommand('copy');
    document.body.removeChild(ta);
  }).finally ? navigator.clipboard.writeText(text).finally(() => {}) : null;
  const orig = btn.innerHTML;
  btn.innerHTML = 'Copied!'; btn.classList.add('copied');
  setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('copied'); }, 2000);
}

// Hero install copy button
document.querySelectorAll('.copy-btn[data-target]').forEach(btn => {
  btn.addEventListener('click', () => {
    const el = document.getElementById(btn.dataset.target);
    if (el) copyText(el.textContent.trim(), btn);
  });
});

// Code block copy buttons
document.querySelectorAll('.copy-btn[data-clipboard]').forEach(btn => {
  btn.addEventListener('click', () => copyText(btn.dataset.clipboard, btn));
});

// Active sidebar link on scroll
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const docSections = document.querySelectorAll('[id]');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      sidebarLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id);
      });
    }
  });
}, { rootMargin: '-60px 0px -70% 0px' });
docSections.forEach(s => io.observe(s));

// Smooth anchor scrolling
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// Entrance animations
const animEls = document.querySelectorAll('.feature-card, .doc-section');
const aio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      aio.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
animEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  aio.observe(el);
});
