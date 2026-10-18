/* ================================================
   COFFEE BAR CHE — main.js
   Navigation, Scroll Reveal, Filters, Gallery
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initActiveNav();
  initFilterTabs();
  initGalleryLightbox();
  initHashScroll();
  initNewsletter();
  initFlipOnScroll();
  initStoryPopup();
  initMarquee();
  initBeersCarousel();
  initHeroVideos();
  initEventsCarousel();
  if (typeof initMenuCarousel === 'function') initMenuCarousel();
  if (typeof initMenuPopup === 'function') initMenuPopup();
  if (typeof initMapPopup === 'function') initMapPopup();
  if (typeof initSpotifyPlayer === 'function') initSpotifyPlayer();
});

function initNewsletter() {
  document.querySelectorAll('[data-newsletter]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = (window.cheI18n && window.cheI18n.t('blog.newsletter_ok')) || '✓';
      form.innerHTML = `<p class="text-center" style="color:var(--color-secondary);font-family:var(--font-display);letter-spacing:0.08em;text-transform:uppercase;">${msg}</p>`;
    });
  });
}

/* ── Navbar ─────────────────────────────────────── */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.navbar__mobile');

  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => closeMobile(hamburger, mobileMenu));
    });

    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        closeMobile(hamburger, mobileMenu);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobile(hamburger, mobileMenu);
    });
  }
}

function closeMobile(hamburger, mobileMenu) {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

/* ── Active navigation link ─────────────────────── */
function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const page = currentPath === '' ? 'index.html' : currentPath;
  const blogPages = ['blog.html', 'blog-post.html'];

  document.querySelectorAll('.navbar__link').forEach(link => {
    const href = (link.getAttribute('href') || '').split('/').pop();
    const isBlog = blogPages.includes(page) && href === 'blog.html';
    if (href === page || isBlog) {
      link.classList.add('active');
    }
  });
}

/* ── Scroll Reveal ──────────────────────────────── */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = Math.min(Number(entry.target.dataset.delay) || 0, 400);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });

  elements.forEach((el) => observer.observe(el));
}

/* ── Auto-flip "За Нас" card on scroll into view ── */
function initFlipOnScroll() {
  const cards = document.querySelectorAll('.edition__flip');
  if (!cards.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-flipped', entry.isIntersecting);
    });
  }, { threshold: 0.55 });

  cards.forEach((card) => observer.observe(card));
}

/* ── Home — beer selection (2 slides, auto-advance every 3s) ── */
function initBeersCarousel() {
  const root = document.querySelector('[data-beers]');
  if (!root) return;

  const slides = Array.from(root.querySelectorAll('.edition__beers-slide'));
  const dots = Array.from(document.querySelectorAll('[data-beers-dot]'));
  if (slides.length < 2) return;

  const INTERVAL_MS = 3000;
  let index = 0;
  let timer = null;

  const show = (i) => {
    index = (i + slides.length) % slides.length;
    slides.forEach((slide, idx) => {
      slide.classList.toggle('is-active', idx === index);
      slide.setAttribute('aria-hidden', String(idx !== index));
    });
    dots.forEach((dot, idx) => {
      dot.classList.toggle('is-active', idx === index);
      if (idx === index) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  };

  const stop = () => {
    clearInterval(timer);
    timer = null;
  };
  const start = () => {
    stop();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer = setInterval(() => show(index + 1), INTERVAL_MS);
  };

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      show(Number(dot.dataset.beersDot));
      start();
    });
  });

  const area = root.closest('.edition__col') || root;
  area.addEventListener('mouseenter', stop);
  area.addEventListener('mouseleave', start);
  area.addEventListener('focusin', stop);
  area.addEventListener('focusout', start);

  show(0);
  start();
}

/* ── Home — Oktoberfest text marquee ──────────── */
/* The phrase group is cloned until it covers the strip, and the track
   scrolls by exactly one group width so the loop has no visible seam. */
function initMarquee() {
  const root = document.querySelector('[data-marquee]');
  const track = root?.querySelector('[data-marquee-track]');
  const group = track?.querySelector('[data-marquee-group]');
  if (!group) return;

  const PX_PER_SECOND = 70;

  const build = () => {
    track.querySelectorAll('[data-marquee-clone]').forEach((node) => node.remove());
    const groupWidth = group.getBoundingClientRect().width;
    if (!groupWidth) return;

    const copies = Math.ceil(root.clientWidth / groupWidth) + 1;
    for (let i = 0; i < copies; i += 1) {
      const clone = group.cloneNode(true);
      clone.removeAttribute('data-marquee-group');
      clone.setAttribute('data-marquee-clone', '');
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('button, a').forEach((el) => { el.tabIndex = -1; });
      track.appendChild(clone);
    }

    track.style.setProperty('--marquee-shift', `${groupWidth}px`);
    track.style.setProperty('--marquee-duration', `${(groupWidth / PX_PER_SECOND).toFixed(1)}s`);
  };

  let resizeTimer;
  build();
  document.fonts?.ready.then(build);
  document.addEventListener('che:langchange', build);
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 200);
  });
}

/* ── "Нашата приказна" popup (home About card) ── */
function initStoryPopup() {
  const overlay = document.querySelector('[data-story-overlay]');
  const trigger = document.querySelector('[data-story-open]');
  if (!overlay || !trigger) return;

  const close = () => {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('story-popup-open');
    trigger.focus({ preventScroll: true });
  };

  trigger.addEventListener('click', () => {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('story-popup-open');
    overlay.querySelector('.story-popup__body').scrollTop = 0;
    overlay.querySelector('[data-story-close]').focus();
  });

  overlay.querySelector('[data-story-close]').addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
  });
}

/* ── Filter Tabs (Menu + Blog) ──────────────────── */
function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const cat = tab.dataset.tab;
      const sections = document.querySelectorAll('[data-section]');
      const items = document.querySelectorAll('[data-category]');

      if (sections.length) {
        sections.forEach(sec => {
          const show = cat === 'all' || sec.dataset.section === cat;
          sec.classList.toggle('hidden', !show);
        });
      } else {
        items.forEach(item => {
          const show = cat === 'all' || item.dataset.category === cat;
          item.classList.toggle('hidden', !show);
        });
      }
    });
  });
}

/* ── Gallery lightbox ───────────────────────────── */
function initGalleryLightbox() {
  const items = document.querySelectorAll('[data-lightbox]');
  if (!items.length) return;

  const box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.innerHTML = '<button class="lightbox__close" aria-label="Close">&times;</button><img alt="">';
  document.body.appendChild(box);

  const img = box.querySelector('img');
  const close = () => {
    box.classList.remove('show');
    document.body.style.overflow = '';
  };

  items.forEach(item => {
    item.addEventListener('click', () => {
      img.src = item.dataset.lightbox;
      img.alt = item.getAttribute('alt') || '';
      box.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  });

  box.addEventListener('click', (e) => {
    if (e.target === box || e.target.classList.contains('lightbox__close')) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

/* ── Hash targets (privacy, hours) ──────────────── */
function initHashScroll() {
  if (location.hash) {
    const el = document.querySelector(location.hash);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
  }
}

function initHeroVideos() {
  document.querySelectorAll('video[data-playback-rate]').forEach((video) => {
    const rate = parseFloat(video.dataset.playbackRate);
    if (!Number.isFinite(rate) || rate <= 0) return;

    const applyRate = () => {
      video.playbackRate = rate;
    };

    applyRate();
    video.addEventListener('loadedmetadata', applyRate);
  });
}

/* ── Home — upcoming events poster carousel ─────── */
function initEventsCarousel() {
  const track = document.querySelector('[data-events-track]');
  if (!track) return;

  const slides = Array.from(track.querySelectorAll('.edition__events-slide'));
  if (slides.length < 2) return;

  let index = Math.max(0, slides.findIndex(s => s.classList.contains('is-active')));
  if (index < 0) index = 0;

  const show = (i) => {
    slides.forEach((slide, idx) => slide.classList.toggle('is-active', idx === i));
  };
  show(index);

  let timer = null;
  const stop = () => {
    if (timer) clearInterval(timer);
    timer = null;
  };
  const start = () => {
    stop();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer = setInterval(() => {
      index = (index + 1) % slides.length;
      show(index);
    }, 4000);
  };

  start();

  const wrap = document.querySelector('[data-events-carousel]');
  if (wrap) {
    wrap.addEventListener('mouseenter', stop);
    wrap.addEventListener('mouseleave', start);
    wrap.addEventListener('focusin', stop);
    wrap.addEventListener('focusout', start);
  }
}
