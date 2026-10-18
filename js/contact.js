/* ================================================
   COFFEE BAR CHE — contact.js
   Contact forms: job / music / space type switching
   ================================================ */

const CONTACT_TYPES = {
  job: {
    icon: 'fa-briefcase',
    titleKey: 'contact.title_job',
    subtitleKey: 'contact.subtitle_job',
    labelKey: 'contact.type_job',
  },
  music: {
    icon: 'fa-music',
    titleKey: 'contact.title_music',
    subtitleKey: 'contact.subtitle_music',
    labelKey: 'contact.type_music',
  },
  space: {
    icon: 'fa-champagne-glasses',
    titleKey: 'contact.title_space',
    subtitleKey: 'contact.subtitle_space',
    labelKey: 'contact.type_space',
  },
};

document.addEventListener('DOMContentLoaded', () => {
  initContactTypePicker();
  initContactDock();
  document.querySelectorAll('[data-form]').forEach(bindForm);
});

function initContactDock() {
  const mailLink = document.getElementById('contact-dock-mail');
  if (!mailLink) return;

  const updateMailLink = () => {
    const lang = localStorage.getItem('che-lang') || 'mk';
    const subject = lang === 'mk'
      ? 'Контакт - Кафе Бар Че'
      : 'Contact - Coffee Bar Che';
    mailLink.href = `mailto:hello@kafebarche.mk?subject=${encodeURIComponent(subject)}`;
  };

  updateMailLink();
  document.addEventListener('che:langchange', updateMailLink);
}

function initContactTypePicker() {
  const picker = document.querySelector('[data-type-select]');
  const form = document.getElementById('contact-form');
  if (!picker || !form) return;

  const trigger = picker.querySelector('.che-type-select__trigger');
  const list = picker.querySelector('.che-type-select__list');
  const hiddenInput = document.getElementById('contact-inquiry-type');
  const titleEl = document.getElementById('contact-dynamic-title');
  const subtitleEl = document.getElementById('contact-dynamic-subtitle');

  // On the stacked (phone/tablet) layout the form sits far below the picker,
  // so bring it into view as soon as a type is chosen.
  const scrollToFormOnMobile = () => {
    if (!window.matchMedia('(max-width: 980px)').matches) return;
    const target = form.closest('.edition__hero-photo--form') || form;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const navbar = document.querySelector('.navbar');
    const offset = (navbar ? navbar.offsetHeight : 0) + 8;
    requestAnimationFrame(() => {
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  };

  const setType = (type) => {
    if (!CONTACT_TYPES[type]) return;

    hiddenInput.value = type;
    form.dataset.contactType = type;

    form.querySelectorAll('[data-form-panel]').forEach((panel) => {
      const active = panel.dataset.formPanel === type;
      panel.hidden = !active;
      syncPanelRequired(panel, active);
    });

    picker.querySelectorAll('.che-type-select__option').forEach((opt) => {
      const selected = opt.dataset.type === type;
      opt.classList.toggle('is-active', selected);
      opt.setAttribute('aria-selected', selected ? 'true' : 'false');
    });

    const meta = CONTACT_TYPES[type];
    const iconEl = trigger.querySelector('.che-type-select__icon i');
    const labelEl = trigger.querySelector('.che-type-select__label');

    iconEl.className = `fa-solid ${meta.icon}`;
    if (window.cheI18n) {
      titleEl.textContent = window.cheI18n.t(meta.titleKey);
      subtitleEl.textContent = window.cheI18n.t(meta.subtitleKey);
      labelEl.textContent = window.cheI18n.t(meta.labelKey);
    } else {
      titleEl.dataset.i18n = meta.titleKey;
      subtitleEl.dataset.i18n = meta.subtitleKey;
      labelEl.dataset.i18n = meta.labelKey;
    }

    clearFormState(form);
    list.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
  };

  trigger.addEventListener('click', () => {
    const open = list.hidden;
    list.hidden = !open;
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  list.querySelectorAll('.che-type-select__option').forEach((option) => {
    option.addEventListener('click', () => {
      setType(option.dataset.type);
      scrollToFormOnMobile();
    });
  });

  document.addEventListener('click', (e) => {
    if (!picker.contains(e.target)) {
      list.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !list.hidden) {
      list.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
    }
  });

  window.addEventListener('che:langchange', () => {
    setType(hiddenInput.value || 'job');
  });

  setType(hiddenInput.value || 'job');
}

function syncPanelRequired(panel, active) {
  panel.querySelectorAll('input, textarea, select').forEach((field) => {
    const shouldRequire = field.hasAttribute('required') || field.dataset.required === 'true';
    if (!shouldRequire) return;
    field.required = active;
  });
}

function getActivePanel(form) {
  return form.querySelector('[data-form-panel]:not([hidden])');
}

function bindForm(form) {
  form.addEventListener('submit', (e) => handleSubmit(e, form));

  form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) validateField(field);
    });
    field.addEventListener('change', () => {
      if (field.classList.contains('error')) validateField(field);
    });
  });
}

function handleSubmit(e, form) {
  e.preventDefault();
  const panel = getActivePanel(form);
  if (!panel) return;

  const fields = panel.querySelectorAll('.form-input, .form-textarea, .form-select');
  let valid = true;
  fields.forEach((field) => {
    if (!validateField(field)) valid = false;
  });
  if (!valid) return;

  const submitBtn = form.querySelector('[type="submit"]');
  const label = submitBtn.querySelector('[data-i18n], span') || submitBtn;
  const original = label.textContent;
  submitBtn.disabled = true;
  label.textContent = '...';

  setTimeout(() => {
    const successMsg = form.parentElement.querySelector('.form-success') || document.querySelector('#form-success');
    if (successMsg) {
      const key = form.dataset.successKey;
      if (key && window.cheI18n) successMsg.textContent = window.cheI18n.t(key);
      successMsg.classList.add('show');
    }

    form.reset();
    clearFormState(form);
    syncPanelRequired(panel, true);

    submitBtn.disabled = false;
    if (window.cheI18n && label.dataset && label.dataset.i18n) {
      label.textContent = window.cheI18n.t(label.dataset.i18n);
    } else {
      label.textContent = original;
    }
  }, 900);
}

function clearFormState(form) {
  form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach((f) => f.classList.remove('error'));
  form.querySelectorAll('.form-error').forEach((el) => { el.textContent = ''; });
  const successMsg = form.parentElement.querySelector('.form-success');
  if (successMsg) successMsg.classList.remove('show');
}

function validateField(field) {
  if (field.closest('[hidden]')) return true;

  const errorEl = field.parentElement.classList.contains('che-field-wrap')
    ? field.closest('.che-contact-form__group')?.querySelector('.form-error')
    : field.parentElement.querySelector('.form-error');
  const lang = localStorage.getItem('che-lang') || 'mk';
  let error = '';
  const value = field.value.trim();

  const isRequired = field.required || field.dataset.required === 'true';

  if (isRequired && !value) {
    error = lang === 'mk' ? 'Ова поле е задолжително.' : 'This field is required.';
  } else if (field.type === 'email' && value && !isValidEmail(value)) {
    error = lang === 'mk' ? 'Внесете валидна е-пошта.' : 'Please enter a valid email.';
  } else if (field.type === 'tel' && value && !/^[+\d\s()-]{7,}$/.test(value)) {
    error = lang === 'mk' ? 'Внесете валиден телефон.' : 'Please enter a valid phone number.';
  } else if (field.type === 'url' && value && !/^https?:\/\/.+/i.test(value)) {
    error = lang === 'mk' ? 'Внесете валиден линк (https://...).' : 'Please enter a valid link (https://...).';
  } else if (field.minLength && value && value.length < field.minLength) {
    error = lang === 'mk'
      ? `Минимум ${field.minLength} карактери.`
      : `Minimum ${field.minLength} characters.`;
  }

  if (errorEl) errorEl.textContent = error;
  field.classList.toggle('error', !!error);
  return !error;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
