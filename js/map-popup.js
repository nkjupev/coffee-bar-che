/* ================================================
   COFFEE BAR CHE — map-popup.js
   Floating map button (contact) + map modal popup
   ================================================ */

(function () {
  'use strict';

  const MAP_SRC = 'https://maps.google.com/maps?q=Kosturski+Heroi+15+Skopje&hl=mk&z=16&output=embed';

  function buildMapPopupHTML() {
    return `
      <div class="map-popup-overlay" data-map-overlay aria-hidden="true">
        <div class="map-popup" role="dialog" aria-modal="true" aria-labelledby="map-popup-title">
          <button type="button" class="map-popup__close" data-map-close aria-label="" data-i18n-aria="contact.map_close">&times;</button>
          <div class="map-popup__header">
            <h2 id="map-popup-title" data-i18n="contact.map_title">Карта</h2>
            <p class="map-popup__address"><i class="fa-solid fa-location-dot" aria-hidden="true"></i><span data-i18n="contact.address_value"></span></p>
          </div>
          <div class="map-popup__frame map-wrap">
            <iframe data-map-iframe title="Локација на Кафе Бар Че" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <a class="map-popup__directions btn btn-outline" href="https://maps.google.com/?q=Kosturski+Heroi+15+Skopje" target="_blank" rel="noopener noreferrer">
            <i class="fa-solid fa-diamond-turn-right"></i>
            <span data-i18n="contact.map_directions">Насоки</span>
          </a>
        </div>
      </div>`;
  }

  function applyI18n() {
    if (window.cheI18n && window.cheI18n.setLanguage) {
      window.cheI18n.setLanguage(window.cheI18n.getCurrentLang());
    }
  }

  function loadMap(iframe) {
    if (!iframe.src) iframe.src = MAP_SRC;
  }

  function openPopup(overlay) {
    const iframe = overlay.querySelector('[data-map-iframe]');
    if (iframe) loadMap(iframe);
    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('is-open');
    document.body.classList.add('map-popup-open');
    overlay.querySelector('.map-popup__close')?.focus();
  }

  function closePopup(overlay) {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('map-popup-open');
  }

  function initMapPopup() {
    if (document.querySelector('.map-popup-overlay')) return;

    document.body.insertAdjacentHTML('beforeend', buildMapPopupHTML());
    applyI18n();

    const overlay = document.querySelector('.map-popup-overlay');

    document.querySelectorAll('[data-map-open]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openPopup(overlay);
      });
    });

    overlay.querySelector('[data-map-close]').addEventListener('click', () => closePopup(overlay));

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closePopup(overlay);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
        closePopup(overlay);
        document.querySelector('[data-map-open]')?.focus();
      }
    });

    if (location.hash === '#map') {
      openPopup(overlay);
      history.replaceState(null, '', location.pathname + location.search);
    }
  }

  window.initMapPopup = initMapPopup;
})();
