(() => {
  const element = document.querySelector('#tracking-config');
  if (!element) return;
  const config = JSON.parse(element.textContent);
  const ids = config.services;
  const scripts = new Map();
  let consent = { maps: false, analytics: false, marketing: false };
  let restarting = false;
  let validUntil = 0;

  window.dataLayer = window.dataLayer || [];
  function googleCommand() { window.dataLayer.push(arguments); }
  googleCommand('consent', 'default', {
    analytics_storage: 'denied', ad_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied'
  });

  function loadScript(service, src) {
    if (scripts.has(service)) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = src;
    script.dataset.consentService = service;
    scripts.set(service, script);
    script.addEventListener('error', () => {
      script.remove();
      scripts.delete(service);
    });
    document.head.append(script);
  }

  function clearMeasurementCookies() {
    const names = document.cookie.split(';').map(part => part.split('=')[0].trim())
      .filter(name => /^(?:_ga(?:_|$)|_gid$|_gat(?:_|$)|_gcl_|_fbp$|_fbc$|li_fat_id$)/.test(name));
    const hostParts = location.hostname.split('.');
    const domains = ['', ...hostParts.map((_, index) => '.' + hostParts.slice(index).join('.'))];
    const parts = location.pathname.split('/').filter(Boolean);
    const paths = ['/', ...parts.map((_, index) => '/' + parts.slice(0, index + 1).join('/'))];
    for (const name of names) {
      for (const domain of domains) {
        for (const path of paths) {
          document.cookie = name + '=; Max-Age=0; Path=' + path + (domain ? '; Domain=' + domain : '');
        }
      }
    }
  }

  function applyConsent(selected, expiresAt) {
    const previous = consent;
    validUntil = expiresAt || 0;
    consent = Object.fromEntries(Object.keys(config.enabled).map(category =>
      [category, config.enabled[category] && selected[category] === true && validUntil > Date.now()]));
    const revoked = (previous.analytics && !consent.analytics) || (previous.marketing && !consent.marketing);
    if (ids.ga4) window['ga-disable-' + ids.ga4] = !consent.analytics;
    if (revoked) {
      restarting = scripts.size > 0;
      if (window.fbq) window.fbq('consent', 'revoke');
      try { clearMeasurementCookies(); } catch { /* Cookie access may be blocked by the browser. */ }
      for (const script of scripts.values()) script.remove();
      // Reload destroys SDK listeners, timers and queued work from the previous choice.
      // Removing a script element alone does not stop code that has already executed.
      if (restarting) {
        location.reload();
        return;
      }
    }

    googleCommand('consent', 'update', {
      analytics_storage: consent.analytics ? 'granted' : 'denied',
      ad_storage: consent.marketing ? 'granted' : 'denied',
      ad_user_data: consent.marketing ? 'granted' : 'denied',
      ad_personalization: consent.marketing ? 'granted' : 'denied'
    });
    const page = location.origin + location.pathname;
    const language = document.documentElement.lang;
    if (ids.gtm) {
      // An arbitrary container can contain both Google and third-party tags.
      // Its declared purposes must all be accepted before it receives any access.
      if (config.gtmCategories.every(category => consent[category])) {
        if (!scripts.has('gtm')) {
          window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js', page_language: language });
          loadScript('gtm', 'https://www.googletagmanager.com/gtm.js?id=' + ids.gtm);
        }
      }
      return;
    }
    if (consent.analytics && ids.ga4 && !scripts.has('ga4')) {
      window.gtag = googleCommand;
      googleCommand('js', new Date());
      googleCommand('config', ids.ga4, {
        page_location: page, page_referrer: '', page_language: language,
        allow_google_signals: false, allow_ad_personalization_signals: false
      });
      loadScript('ga4', 'https://www.googletagmanager.com/gtag/js?id=' + ids.ga4);
    }
    if (consent.marketing && ids.meta && !scripts.has('meta')) {
      const fbq = function () {
        if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
        else fbq.queue.push(arguments);
      };
      fbq.queue = [];
      fbq.loaded = true;
      fbq.version = '2.0';
      fbq.push = fbq;
      window.fbq = fbq;
      window._fbq = fbq;
      fbq('consent', 'grant');
      fbq('set', 'autoConfig', false, ids.meta);
      fbq('init', ids.meta);
      fbq('track', 'PageView');
      loadScript('meta', 'https://connect.facebook.net/en_US/fbevents.js');
    }
    if (consent.marketing && ids.linkedin && !scripts.has('linkedin')) {
      window._linkedin_partner_id = ids.linkedin;
      window._linkedin_data_partner_ids = [ids.linkedin];
      const lintrk = function (action, parameters) { lintrk.q.push([action, parameters]); };
      lintrk.q = [];
      window.lintrk = lintrk;
      loadScript('linkedin', 'https://snap.licdn.com/li.lms-analytics/insight.min.js');
    }
  }

  function track(event, parameters) {
    if (restarting || Date.now() >= validUntil || !consent.analytics ||
      !config.enabled.analytics || event === 'form_preview_complete') return;
    const record = { ...parameters, page_language: document.documentElement.lang };
    if (ids.gtm && scripts.has('gtm')) window.dataLayer.push({ event, ...record });
    else if (ids.ga4 && scripts.has('ga4')) googleCommand('event', event, record);
  }

  window.LAURAS_TRACKING = { config, applyConsent, track };
})();
