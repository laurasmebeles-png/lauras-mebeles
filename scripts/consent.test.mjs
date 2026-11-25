import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { trackingConfig } from '../src/tracking-config.mjs';

const source = await readFile(new URL('../public/tracking.js', import.meta.url), 'utf8');
function harness(env = {}) {
  const config = trackingConfig(env);
  const requests = [];
  const deletedCookies = [];
  const window = { dataLayer: [] };
  const location = {
    origin: 'https://example.test', hostname: 'example.test', pathname: '/en/kontakti/',
    reloads: 0, reload() { this.reloads++; }
  };
  const document = {
    documentElement: { lang: 'en' },
    querySelector: () => ({ textContent: JSON.stringify(config) }),
    head: { append(script) { requests.push(script.src); } },
    createElement: () => ({ dataset: {}, addEventListener() {}, remove() {} }),
    get cookie() { return '_ga=sample; _fbp=sample; li_fat_id=sample; unrelated=keep'; },
    set cookie(value) { deletedCookies.push(value); }
  };
  vm.runInNewContext(source, { window, document, location, Date, Object, JSON, Map });
  const tracker = window.LAURAS_TRACKING;
  const update = selected => tracker.applyConsent(selected, Date.now() + 60000);
  const events = () => window.dataLayer.filter(entry => entry[0] === 'event' || entry.event);
  return { config, requests, deletedCookies, window, document, location, tracker, update, events };
}

const direct = {
  GA4_MEASUREMENT_ID: 'G-TEST123', META_PIXEL_ID: '123456789', LINKEDIN_PARTNER_ID: '987654'
};
const blank = harness();
blank.update({ analytics: true, marketing: true });
blank.tracker.track('cta_click', { location: 'header' });
assert.deepEqual(blank.requests, []);
assert.deepEqual(blank.events(), []);

const analytics = harness(direct);
analytics.update({});
analytics.tracker.track('cta_click', { location: 'header' });
assert.deepEqual(analytics.requests, []);
assert.deepEqual(analytics.events(), []);
analytics.update({ maps: true });
assert.deepEqual(analytics.requests, []);
analytics.update({ analytics: true });
assert.deepEqual(analytics.requests, ['https://www.googletagmanager.com/gtag/js?id=G-TEST123']);
assert.deepEqual(analytics.events(), []); // No interaction history is replayed after permission.
analytics.tracker.track('cta_click', { location: 'header' });
assert.equal(analytics.events().length, 1);
assert.equal(analytics.events()[0][2].page_language, 'en');
analytics.tracker.track('form_preview_complete', {});
assert.equal(analytics.events().length, 1);
analytics.update({});
assert.equal(analytics.location.reloads, 1);
assert.equal(analytics.window['ga-disable-G-TEST123'], true);
analytics.tracker.track('cta_click', {});
assert.equal(analytics.events().length, 1);
assert.ok(analytics.deletedCookies.some(value => value.startsWith('_ga=')));
assert.ok(analytics.deletedCookies.every(value => !value.startsWith('unrelated=')));

const marketing = harness(direct);
marketing.update({ marketing: true });
assert.deepEqual(marketing.requests, [
  'https://connect.facebook.net/en_US/fbevents.js',
  'https://snap.licdn.com/li.lms-analytics/insight.min.js'
]);
marketing.tracker.track('cta_click', {});
assert.deepEqual(marketing.events(), []);
marketing.update({});
assert.equal(marketing.location.reloads, 1);
assert.ok(marketing.window.fbq.queue.some(entry => entry[0] === 'consent' && entry[1] === 'revoke'));

const expired = harness(direct);
expired.tracker.applyConsent({ analytics: true, marketing: true }, Date.now() - 1);
assert.deepEqual(expired.requests, []);

const blockedCookieAccess = harness(direct);
blockedCookieAccess.update({ analytics: true });
Object.defineProperty(blockedCookieAccess.document, 'cookie', { get() { throw new Error('SecurityError'); } });
blockedCookieAccess.update({});
assert.equal(blockedCookieAccess.location.reloads, 1, 'Cookie access failure must not prevent SDK shutdown');

const gtm = harness({ GTM_CONTAINER_ID: 'GTM-TEST123' });
gtm.update({ analytics: true });
assert.deepEqual(gtm.requests, []);
gtm.tracker.track('cta_click', {});
assert.deepEqual(gtm.events(), []);
gtm.update({ analytics: true, marketing: true });
assert.deepEqual(gtm.requests, ['https://www.googletagmanager.com/gtm.js?id=GTM-TEST123']);
gtm.tracker.track('cta_click', { location: 'header' });
assert.equal(gtm.events().at(-1).event, 'cta_click');
gtm.update({ analytics: true });
assert.equal(gtm.location.reloads, 1);

assert.throws(() => trackingConfig({ GA4_MEASUREMENT_ID: 'invalid' }));
assert.throws(() => trackingConfig({ ...direct, GTM_CONTAINER_ID: 'GTM-TEST123' }));
assert.throws(() => trackingConfig({ GTM_CONSENT_CATEGORIES: 'maps' }));
assert.notEqual(trackingConfig({}).revision, trackingConfig(direct).revision);
assert.notEqual(trackingConfig({ META_PIXEL_ID: '123' }).revision, trackingConfig({ META_PIXEL_ID: '456' }).revision);
console.log('Consent: no pre-consent or rejected measurement, independent categories, GTM guard, expiry, revocation, cookie cleanup and no history replay checked.');
