/* ================================================
   COFFEE BAR CHE — cookies.js
   Cookie Consent Banner with localStorage persistence
   ================================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'che-cookies-consent';

  document.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('.cookie-banner');
    if (!banner) return;

    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      setTimeout(() => banner.classList.add('show'), 800);
    }

    banner.querySelector('[data-cookie-accept]')?.addEventListener('click', () => {
      localStorage.setItem(STORAGE_KEY, 'accepted');
      hideBanner(banner);
    });

    banner.querySelector('[data-cookie-decline]')?.addEventListener('click', () => {
      localStorage.setItem(STORAGE_KEY, 'declined');
      hideBanner(banner);
    });

    document.querySelectorAll('[data-cookie-settings]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem(STORAGE_KEY);
        banner.classList.add('show');
        banner.style.transform = '';
        banner.style.opacity = '';
        banner.scrollIntoView({ block: 'end' });
      });
    });
  });

  function hideBanner(banner) {
    banner.style.transition = 'transform 0.35s ease, opacity 0.35s ease';
    banner.style.transform = 'translateY(100%)';
    banner.style.opacity = '0';
    setTimeout(() => {
      banner.classList.remove('show');
      banner.style.transform = '';
      banner.style.opacity = '';
    }, 380);
  }
})();
