import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

import { trackingConfig } from '../src/tracking-config.mjs';

const read = name => fs.readFileSync(new URL('../public/' + name, import.meta.url), 'utf8');
const scripts = {
  tracking: read('tracking.js'),
  cookies: read('cookie-settings.js'),
};
const validity = 180 * 24 * 60 * 60 * 1000;
const now = 1_800_000_000_000;
const config = trackingConfig({ GTM_CONTAINER_ID: 'GTM-EXAMPLE' });
const accepted = { maps: true, analytics: true, marketing: true };

function eventTarget(attributes = {}) {
  const events = {};
  return {
    ...attributes,
    addEventListener(type, listener) { events[type] = listener; },
    dispatch(type, event = {}) { events[type]?.(event); },
  };
}

function choice(categories, { revision = config.revision, version = 3, expiresAt = now + 1000 } = {}) {
  return JSON.stringify({ version, revision, decidedAt: expiresAt - validity, expiresAt, categories });
}

function browserStorage(initial = null, { full = false } = {}) {
  let stored = initial;
  return {
    getItem() { return stored; },
    setItem(key, value) {
      if (full) throw new Error('QuotaExceededError');
      stored = value;
    },
    removeItem() { stored = null; },
  };
}

function simulatePage(localStorage, tracking = config) {
  const loaded = [];
  const removed = [];
  let reloads = 0;
  let simulatedTime = now;
  let timer;
  const inputs = Object.keys(tracking.enabled).map(name => ({ name }));
  const banner = { hidden: false };
  const reject = eventTarget({ dataset: { cookieAction: 'reject' } });
  const accept = eventTarget({ dataset: { cookieAction: 'accept' } });
  const form = eventTarget({ querySelectorAll: () => inputs });
  const dialog = {
    open: false,
    close() { this.open = false; },
    showModal() { this.open = true; },
    querySelector(key) { return key === '[data-cookie-options]' ? form : eventTarget(); },
  };
  const elements = {
    '#tracking-config': { textContent: JSON.stringify(tracking) },
    '[data-cookie-banner]': banner,
    '#cookie-settings': dialog,
  };
  const document = eventTarget({
    documentElement: { lang: 'lv' },
    cookie: '',
    querySelector: selector => elements[selector] || null,
    querySelectorAll: selector => selector === '[data-cookie-action]' ? [reject, accept] : [],
    createElement() {
      return eventTarget({
        dataset: {},
        remove() { removed.push(this.dataset.consentService); },
      });
    },
    head: {
      append(script) { loaded.push(script.dataset.consentService); },
    },
  });
  const window = eventTarget();
  const location = {
    origin: 'https://example.test',
    pathname: '/en/',
    hostname: 'example.test',
    reload() { reloads++; },
  };
  class BrowserDate extends Date {
    static now() { return simulatedTime; }
  }
  const realm = vm.createContext({
    window, document, location, localStorage, Date: BrowserDate,
    setTimeout(callback) { timer = callback; return 1; },
    clearTimeout() { timer = undefined; },
  });
  vm.runInContext(scripts.tracking, realm, { filename: 'public/tracking.js' });
  vm.runInContext(scripts.cookies, realm, { filename: 'public/cookie-settings.js' });

  return {
    window, loaded, removed, inputs,
    isBannerHidden: () => banner.hidden,
    advanceTo: value => { simulatedTime = value; },
    tick: () => timer?.(),
    reloads: () => reloads,
    reject: () => reject.dispatch('click'),
    accept: () => accept.dispatch('click'),
    sendEvent: (name = 'project_view') => window.LAURAS_TRACKING.track(name, { project_id: 'test' }),
    hasEvent: (name = 'project_view') => window.dataLayer.some(entry => entry.event === name),
  };
}

const fresh = simulatePage(browserStorage());
fresh.sendEvent();
assert.deepEqual(fresh.loaded, []);
assert.equal(fresh.hasEvent(), false);
assert.equal(fresh.isBannerHidden(), false);
fresh.accept();
assert.deepEqual(fresh.loaded, ['gtm']);
assert.equal(fresh.hasEvent(), false, 'No pre-consent event replay');
fresh.sendEvent();
assert.equal(fresh.hasEvent(), true);
fresh.sendEvent('form_preview_complete');
assert.equal(fresh.hasEvent('form_preview_complete'), false);

for (const categories of [
  { maps: true, analytics: true, marketing: false },
  { maps: true, analytics: false, marketing: true },
]) {
  const partial = simulatePage(browserStorage(choice(categories)));
  partial.sendEvent();
  assert.deepEqual(partial.loaded, [], 'Mixed GTM requires both declared choices');
  assert.equal(partial.hasEvent(), false);
}

const expired = simulatePage(browserStorage(choice(accepted, { expiresAt: now - 1 })));
assert.deepEqual(expired.loaded, []);
assert.equal(expired.isBannerHidden(), false);

const activeStorage = browserStorage(choice(accepted));
const active = simulatePage(activeStorage);
assert.deepEqual(active.loaded, ['gtm']);
active.advanceTo(now + 1000);
active.sendEvent();
assert.equal(active.hasEvent(), false, 'Dispatch is blocked even before the expiry timer can run');
active.tick();
assert.deepEqual(active.removed, ['gtm']);
assert.equal(active.reloads(), 1);
assert.deepEqual(simulatePage(activeStorage).loaded, []);

const fullStorage = browserStorage(choice(accepted), { full: true });
const revoking = simulatePage(fullStorage);
assert.deepEqual(revoking.loaded, ['gtm']);
revoking.reject();
assert.equal(revoking.reloads(), 1);
assert.equal(fullStorage.getItem(), null, 'Failed overwrite removes the previously granted consent');
assert.deepEqual(simulatePage(fullStorage).loaded, []);

for (const foreign of [choice(accepted, { revision: 'other-deployment' }), choice(accepted, { version: 4 })]) {
  const otherDeploymentStorage = browserStorage(foreign);
  assert.deepEqual(simulatePage(otherDeploymentStorage).loaded, []);
  assert.equal(otherDeploymentStorage.getItem(), foreign, 'Stale tab preserves another deployment choice');
}

const expiredOldRecord = browserStorage(choice(accepted, { version: 2, expiresAt: now - 1 }));
assert.deepEqual(simulatePage(expiredOldRecord).loaded, []);
assert.equal(expiredOldRecord.getItem(), null, 'Expired records from an earlier deployment are removed');

const mapOnlyConfig = trackingConfig({});
const mapOnlyStorage = browserStorage(choice(accepted, { revision: mapOnlyConfig.revision }));
const mapOnly = simulatePage(mapOnlyStorage, mapOnlyConfig);
assert.deepEqual(mapOnly.loaded, []);
assert.equal(mapOnly.isBannerHidden(), false, 'Disabled true category invalidates choice');
mapOnly.accept();
assert.deepEqual(JSON.parse(mapOnlyStorage.getItem()).categories, { maps: true, analytics: false, marketing: false });
assert.deepEqual(mapOnly.loaded, []);

console.log('PASS: reject with full storage, stale revision/version, mixed GTM gating, no pre-consent event/replay, preview conversion excluded, expired on load/in tab, disabled categories.');
