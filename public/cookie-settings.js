(() => {
  const banner = document.querySelector('[data-cookie-banner]');
  const settings = document.querySelector('#cookie-settings');
  if (!banner || !settings || typeof settings.showModal !== 'function') return;

  const storageKey = 'lauras-cookie-preferences';
  const version = 3;
  const validity = 180 * 24 * 60 * 60 * 1000;
  const form = settings.querySelector('[data-cookie-options]');
  const categories = [...form.querySelectorAll('input[type="checkbox"]')];
  const tracking = window.LAURAS_TRACKING;
  const revision = tracking?.config.revision || 'maps-only';
  for (const input of categories) {
    input.disabled = !(tracking?.config.enabled[input.name] ?? input.name === 'maps');
    const status = settings.querySelector('#cookie-' + input.name + '-status');
    if (status) status.hidden = !input.disabled;
  }
  const map = document.querySelector('[data-cookie-map]');
  const mapTemplate = map?.querySelector('[data-cookie-map-template]');
  const mapSlot = map?.querySelector('[data-cookie-map-slot]');
  const mapPlaceholder = map?.querySelector('[data-cookie-map-placeholder]');

  function loadChoice() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (!saved) return null;

      const now = Date.now();
      const validDates = Number.isSafeInteger(saved.decidedAt) && saved.decidedAt <= now &&
        saved.expiresAt === saved.decidedAt + validity && saved.expiresAt > now;
      if (validDates) {
        if (saved.version === version && saved.revision === revision &&
          Object.keys(saved.categories || {}).length === categories.length &&
          categories.every(input => typeof saved.categories?.[input.name] === 'boolean' && (!input.disabled || !saved.categories[input.name]))) {
          return saved;
        }
      }
      const expired = Number.isSafeInteger(saved.expiresAt) && saved.expiresAt <= Date.now();
      if (expired || (saved.version === version && saved.revision === revision)) localStorage.removeItem(storageKey);
    } catch {
      // An unreadable or unavailable preference leaves every optional category off.
    }
    return null;
  }

  let choice = loadChoice();
  let expiryTimer;

  function renderChoice() {
    clearTimeout(expiryTimer);
    if (choice && choice.expiresAt <= Date.now()) {
      choice = null;
      try { localStorage.removeItem(storageKey); } catch { /* Storage may be unavailable. */ }
    }
    if (choice) expiryTimer = setTimeout(syncChoice, Math.min(choice.expiresAt - Date.now(), 2147483647));
    banner.hidden = Boolean(choice);
    if (map) {
      const allowed = choice?.categories.maps === true;
      mapPlaceholder.hidden = allowed;
      if (!allowed) {
        mapSlot.replaceChildren();
      } else if (!mapSlot.firstElementChild) {
        const frame = mapTemplate.content.firstElementChild.cloneNode(true);
        frame.src = frame.dataset.src;
        frame.removeAttribute('data-src');
        mapSlot.append(frame);
      }
    }
    tracking?.applyConsent(choice?.categories || {}, choice?.expiresAt || 0);
  }

  function resetForm() {
    for (const input of categories) input.checked = choice?.categories[input.name] === true;
  }

  function saveChoice(selected) {
    const decidedAt = Date.now();
    choice = { version, revision, categories: selected, decidedAt, expiresAt: decidedAt + validity };
    try {
      localStorage.setItem(storageKey, JSON.stringify(choice));
    } catch {
      // A failed rejection write must not leave an older opt-in for the reload.
      try { localStorage.removeItem(storageKey); } catch { /* Storage may be unavailable. */ }
    }
    if (settings.open) settings.close();
    renderChoice();
  }

  for (const trigger of document.querySelectorAll('[data-cookie-open]')) {
    trigger.hidden = false;
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      resetForm();
      if (!settings.open) settings.showModal();
    });
  }
  for (const button of document.querySelectorAll('[data-cookie-action]')) {
    button.addEventListener('click', () => {
      const allow = button.dataset.cookieAction === 'accept';
      saveChoice(Object.fromEntries(categories.map(input => [input.name, allow && !input.disabled])));
    });
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    saveChoice(Object.fromEntries(categories.map(input => [input.name, input.checked && !input.disabled])));
  });
  settings.querySelector('[data-cookie-info]').addEventListener('click', () => settings.close());

  function syncChoice() {
    choice = loadChoice();
    if (settings.open) resetForm();
    renderChoice();
  }

  window.addEventListener('storage', event => {
    if (event.key === storageKey || event.key === null) syncChoice();
  });
  window.addEventListener('pageshow', event => {
    if (event.persisted) syncChoice();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') syncChoice();
  });
  renderChoice();
})();
