(() => {
  const map = document.querySelector('[data-cookie-map]');
  if (!map) return;

  const storageKey = 'lauras-cookie-preferences';
  const version = 1;
  const validity = 180 * 24 * 60 * 60 * 1000;
  const mapTemplate = map.querySelector('[data-cookie-map-template]');
  const mapSlot = map.querySelector('[data-cookie-map-slot]');
  const mapPlaceholder = map.querySelector('[data-cookie-map-placeholder]');
  const showMap = map.querySelector('[data-cookie-map-allow]');
  const hideMap = map.querySelector('[data-cookie-map-revoke]');

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

  showMap.addEventListener('click', () => {
    saveChoice(true);
    hideMap.focus();
  });

  hideMap.addEventListener('click', () => {
    saveChoice(false);
    showMap.focus();
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
