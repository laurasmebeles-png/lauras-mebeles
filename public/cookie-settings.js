(() => {
  const banner = document.querySelector('[data-cookie-banner]');
  const settings = document.querySelector('#cookie-settings');
  if (!banner || !settings || typeof settings.showModal !== 'function') return;

  const storageKey = 'lauras-cookie-preferences';
  const version = 2;
  const validity = 180 * 24 * 60 * 60 * 1000;
  const form = settings.querySelector('[data-cookie-options]');
  const categories = [...form.querySelectorAll('input[type="checkbox"]:enabled')];
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
        if (saved.version === version && Object.keys(saved.categories || {}).length === categories.length &&
          categories.every(input => typeof saved.categories?.[input.name] === 'boolean')) {
          return saved;
        }
        if (saved.version === 1 && categories.length === 1 && categories[0].name === 'maps' &&
          typeof saved.mapsAllowed === 'boolean') {
          return { version, categories: { maps: saved.mapsAllowed }, decidedAt: saved.decidedAt, expiresAt: saved.expiresAt };
        }
      }
      localStorage.removeItem(storageKey);
    } catch {
      // An unreadable or unavailable preference leaves every optional category off.
    }
    return null;
  }

  let choice = loadChoice();

  function renderChoice() {
    banner.hidden = Boolean(choice);
    if (!map) return;

    const allowed = choice?.categories.maps === true && choice.expiresAt > Date.now();
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

  function resetForm() {
    for (const input of categories) input.checked = choice?.categories[input.name] === true;
  }

  function saveChoice(selected) {
    const decidedAt = Date.now();
    choice = { version, categories: selected, decidedAt, expiresAt: decidedAt + validity };
    try {
      localStorage.setItem(storageKey, JSON.stringify(choice));
    } catch {
      // An explicit choice can still be applied to the current page.
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
      saveChoice(Object.fromEntries(categories.map(input => [input.name, allow])));
    });
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    saveChoice(Object.fromEntries(categories.map(input => [input.name, input.checked])));
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
  renderChoice();
})();
