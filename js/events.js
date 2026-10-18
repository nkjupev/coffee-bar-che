(function () {
  const CAT_LABELS = {
    mk: { music: 'Музика', culture: 'Култура', party: 'Забава' },
    en: { music: 'Music', culture: 'Exhibitions', party: 'Parties' }
  };

  const state = {
    activeCat: 'all',
    viewerIndex: 0,
    viewerOpen: false
  };

  let els = {};

  function lang() {
    return (window.cheI18n && window.cheI18n.getCurrentLang()) || localStorage.getItem('che-lang') || 'mk';
  }

  function t(key) {
    if (window.cheI18n && window.cheI18n.t) {
      const v = window.cheI18n.t(key);
      if (v && v !== key) return v;
    }
    return null;
  }

  function filtered() {
    if (!window.CHE_FB_EVENTS) return [];
    return window.CHE_FB_EVENTS.filter(ev => state.activeCat === 'all' || ev.cat === state.activeCat);
  }

  function pad(n, width) {
    return String(n).padStart(width, '0');
  }

  function countLabel(n) {
    const l = lang();
    const imagesWord = l === 'mk' ? 'СЛИКИ' : 'IMAGES';
    return `${n} ${imagesWord}`;
  }

  /* Repeating size cycle — index % length picks hero / wide / tall / large / normal */
  const CELL_SIZES = ['hero', 'normal', 'tall', 'wide', 'normal', 'large', 'normal', 'wide', 'normal', 'tall'];

  function cellSizeClass(index) {
    const size = CELL_SIZES[index % CELL_SIZES.length];
    return size === 'normal' ? 'che-gallery__cell' : `che-gallery__cell che-gallery__cell--${size}`;
  }

  function updateCount() {
    if (!els.count) return;
    const n = filtered().length;
    els.count.textContent = countLabel(n);
  }

  function renderGrid() {
    if (!els.grid) return;
    const items = filtered();
    const labels = CAT_LABELS[lang()] || CAT_LABELS.mk;

    els.grid.innerHTML = items.map((ev, i) => {
      const tag = labels[ev.cat] || ev.cat;
      return `
        <button type="button" class="${cellSizeClass(i)}" data-gallery-index="${i}" aria-label="${ev.title}">
          <img src="${ev.img}" alt="" width="${ev.w}" height="${ev.h}" loading="lazy" />
          <span class="che-gallery__cell-tag">${tag}</span>
        </button>
      `;
    }).join('');

    els.grid.querySelectorAll('[data-gallery-index]').forEach(btn => {
      btn.addEventListener('click', () => openViewer(Number(btn.dataset.galleryIndex)));
    });

    updateCount();
  }

  function renderViewer() {
    const items = filtered();
    if (!items.length) return;

    const idx = Math.min(state.viewerIndex, items.length - 1);
    state.viewerIndex = idx;
    const ev = items[idx];
    const total = items.length;
    const digits = String(total).length;

    if (els.mainImg) {
      els.mainImg.src = ev.img;
      els.mainImg.alt = ev.title;
    }
    if (els.caption) els.caption.textContent = ev.title;
    if (els.counter) els.counter.textContent = `${pad(idx + 1, digits)} / ${pad(total, digits)}`;
    if (els.fbLink) els.fbLink.href = ev.fb;

    if (els.strip) {
      els.strip.innerHTML = items.map((item, i) => `
        <button type="button" class="che-gallery__strip-item${i === idx ? ' active' : ''}" data-strip-index="${i}" aria-label="${item.title}">
          <img src="${item.img}" alt="" loading="lazy" />
        </button>
      `).join('');

      els.strip.querySelectorAll('[data-strip-index]').forEach(btn => {
        btn.addEventListener('click', () => {
          state.viewerIndex = Number(btn.dataset.stripIndex);
          renderViewer();
        });
      });

      const active = els.strip.querySelector('.che-gallery__strip-item.active');
      if (active) active.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  function openViewer(index) {
    state.viewerIndex = index;
    state.viewerOpen = true;
    els.root.classList.add('che-gallery--viewer');
    if (els.viewer) els.viewer.hidden = false;
    document.body.style.overflow = 'hidden';
    renderViewer();
  }

  function closeViewer() {
    state.viewerOpen = false;
    els.root.classList.remove('che-gallery--viewer');
    if (els.viewer) els.viewer.hidden = true;
    document.body.style.overflow = '';
  }

  function setCategory(cat) {
    state.activeCat = cat;
    els.root.dataset.activeCat = cat;
    document.querySelectorAll('[data-event-filter]').forEach(btn => {
      const on = btn.dataset.eventFilter === cat;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    if (state.viewerOpen) {
      state.viewerIndex = 0;
      renderViewer();
    } else {
      renderGrid();
    }
  }

  function navigate(delta) {
    const items = filtered();
    if (!items.length) return;
    state.viewerIndex = (state.viewerIndex + delta + items.length) % items.length;
    renderViewer();
  }

  function bindKeys() {
    document.addEventListener('keydown', e => {
      if (!state.viewerOpen) return;
      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        navigate(1);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        navigate(-1);
      }
    });
  }

  function render() {
    if (state.viewerOpen) renderViewer();
    else renderGrid();
  }

  function init() {
    els = {
      root: document.querySelector('[data-che-gallery]'),
      grid: document.querySelector('[data-gallery-grid]'),
      viewer: document.querySelector('[data-gallery-viewer]'),
      mainImg: document.querySelector('[data-gallery-main-img]'),
      strip: document.querySelector('[data-gallery-strip]'),
      counter: document.querySelector('[data-gallery-counter]'),
      caption: document.querySelector('[data-gallery-caption]'),
      fbLink: document.querySelector('[data-gallery-fb]'),
      count: document.querySelector('[data-gallery-count]')
    };

    if (!els.root || !window.CHE_FB_EVENTS) return;

    document.querySelectorAll('[data-event-filter]').forEach(btn => {
      btn.addEventListener('click', () => setCategory(btn.dataset.eventFilter));
    });

    const back = document.querySelector('[data-gallery-back]');
    if (back) back.addEventListener('click', closeViewer);

    const gridBtn = document.querySelector('[data-gallery-mode="grid"]');
    if (gridBtn) {
      gridBtn.addEventListener('click', () => {
        if (state.viewerOpen) closeViewer();
      });
    }

    bindKeys();
    renderGrid();
  }

  document.addEventListener('DOMContentLoaded', init);
  document.addEventListener('che:langchange', render);
})();
