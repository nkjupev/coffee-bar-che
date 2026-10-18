/* ================================================
   COFFEE BAR CHE — i18n.js
   Bilingual MK/EN Language Switching
   ================================================ */

(function () {
  'use strict';

  const DEFAULT_LANG = 'mk';
  let currentStrings = {};

  document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('che-lang') || DEFAULT_LANG;
    initLangButtons(savedLang);
    setLanguage(savedLang);
  });

  function initLangButtons(activeLang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const isActive = btn.dataset.lang === activeLang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));

      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        if (lang === getCurrentLang()) return;
        setLanguage(lang);
        document.querySelectorAll('.lang-btn').forEach(b => {
          const on = b.dataset.lang === lang;
          b.classList.toggle('active', on);
          b.setAttribute('aria-pressed', String(on));
        });
      });
    });
  }

  function setLanguage(lang) {
    const embedded = window.CHE_LOCALES && window.CHE_LOCALES[lang];
    if (embedded) {
      currentStrings = embedded;
      applyTranslations(embedded);
      localStorage.setItem('che-lang', lang);
      document.documentElement.lang = lang === 'mk' ? 'mk' : 'en';
      document.dispatchEvent(new CustomEvent('che:langchange', { detail: { lang } }));
      return;
    }

    fetch(`locales/${lang}.json?v=2`)
      .then(r => {
        if (!r.ok) throw new Error(`Could not load locale: ${lang}`);
        return r.json();
      })
      .then(strings => {
        currentStrings = strings;
        applyTranslations(strings);
        localStorage.setItem('che-lang', lang);
        document.documentElement.lang = lang === 'mk' ? 'mk' : 'en';
        document.dispatchEvent(new CustomEvent('che:langchange', { detail: { lang } }));
      })
      .catch(err => {
        console.warn('[i18n]', err.message);
      });
  }

  function applyTranslations(strings) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const value = getNestedKey(strings, el.dataset.i18n);
      if (value === undefined) return;

      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = value;
      } else if (el.tagName === 'META') {
        el.setAttribute('content', value);
      } else if (el.tagName === 'TITLE' || el.dataset.i18nHtml) {
        if (el.tagName === 'TITLE') {
          el.textContent = value;
        } else {
          el.innerHTML = value;
        }
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const value = getNestedKey(strings, el.dataset.i18nAria);
      if (value !== undefined) el.setAttribute('aria-label', value);
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const value = getNestedKey(strings, el.dataset.i18nTitle);
      if (value !== undefined) el.setAttribute('title', value);
    });
  }

  function getNestedKey(obj, keyPath) {
    return keyPath.split('.').reduce((acc, key) => {
      return acc && acc[key] !== undefined ? acc[key] : undefined;
    }, obj);
  }

  function getCurrentLang() {
    return localStorage.getItem('che-lang') || DEFAULT_LANG;
  }

  window.cheI18n = {
    t: (key) => getNestedKey(currentStrings, key) || key,
    setLanguage,
    getCurrentLang,
    get strings() { return currentStrings; }
  };
})();
