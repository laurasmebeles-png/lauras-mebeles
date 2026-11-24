(() => {
  const settings = document.querySelector('#cookie-settings');
  if (!settings || typeof settings.showModal !== 'function') return;

  const storageKey = 'lauras-cookie-preferences';
  const version = 1;
  const validity = 180 * 24 * 60 * 60 * 1000;
  const map = document.querySelector('[data-cookie-map]');
  const mapTemplate = map?.querySelector('[data-cookie-map-template]');
  const mapSlot = map?.querySelector('[data-cookie-map-slot]');
  const mapPlaceholder = map?.querySelector('[data-cookie-map-placeholder]');
  const showMap = map?.querySelector('[data-cookie-map-allow]');
  const hideMap = map?.querySelector('[data-cookie-map-revoke]');
  const allowedNote = settings.querySelector('[data-cookie-allowed]');
  const blockedNote = settings.querySelector('[data-cookie-blocked]');

  function loadChoice() {
    try {
      const value = localStorage.getItem(storageKey);
      if (!value) return null;
      const choice = JSON.parse(value);
      const now = Date.now();
      if (choice?.version === version && typeof choice.mapsAllowed === 'boolean' &&
          Number.isSafeInteger(choice.decidedAt) && choice.decidedAt <= now &&
          choice.expiresAt === choice.decidedAt + validity && choice.expiresAt > now) {
        return choice;
      }
      localStorage.removeItem(storageKey);
    } catch {
      // Unavailable or unreadable storage is treated as a missing choice.
    }
    return null;
  }

  let choice = loadChoice();

  function renderChoice() {
    const allowed = choice?.mapsAllowed === true && choice.expiresAt > Date.now();
    allowedNote.hidden = !allowed;
    blockedNote.hidden = allowed;
    if (!map) return;

    mapPlaceholder.hidden = allowed;
    showMap.hidden = false;
    hideMap.hidden = !allowed;
    if (!allowed) {
      mapSlot.replaceChildren();
    } else if (!mapSlot.firstElementChild) {
      const frame = mapTemplate.content.firstElementChild.cloneNode(true);
      frame.src = frame.dataset.src;
      frame.removeAttribute('data-src');
      mapSlot.append(frame);
    }
  }

  function saveChoice(mapsAllowed) {
    const decidedAt = Date.now();
    choice = { version, mapsAllowed, decidedAt, expiresAt: decidedAt + validity };
    try {
      localStorage.setItem(storageKey, JSON.stringify(choice));
    } catch {
      // An explicit choice can still be applied to the current page.
    }
    renderChoice();
  }

  document.querySelectorAll('[data-cookie-settings]').forEach(trigger => {
    trigger.hidden = false;
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.addEventListener('click', event => {
      event.preventDefault();
      if (!settings.open) settings.showModal();
    });
  });

  settings.querySelector('[data-cookie-close]').addEventListener('click', () => settings.close());
  document.querySelectorAll('[data-cookie-choice]').forEach(button => {
    button.addEventListener('click', () => {
      const allowed = button.dataset.cookieChoice === 'allow';
      saveChoice(allowed);
      if (settings.open) settings.close();
      if (button === showMap) hideMap.focus();
      if (button === hideMap) showMap.focus();
    });
  });

  function syncChoice() {
    choice = loadChoice();
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
