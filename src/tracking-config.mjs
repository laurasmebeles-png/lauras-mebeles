import { createHash } from 'node:crypto';

export function trackingConfig(env = process.env) {
  const definitions = {
    ga4: ['GA4_MEASUREMENT_ID', /^G-[A-Z0-9]+$/],
    meta: ['META_PIXEL_ID', /^\d+$/],
    linkedin: ['LINKEDIN_PARTNER_ID', /^\d+$/],
    gtm: ['GTM_CONTAINER_ID', /^GTM-[A-Z0-9]+$/]
  };
  const services = {};
  for (const [service, [variable, pattern]] of Object.entries(definitions)) {
    const value = (env[variable] || '').trim();
    if (value && !pattern.test(value)) throw new Error(`Invalid ${variable}`);
    services[service] = value;
  }
  if (services.gtm && (services.ga4 || services.meta || services.linkedin)) {
    throw new Error('Configure either a GTM container or direct tracking IDs to avoid duplicate tags.');
  }
  const gtmCategories = (env.GTM_CONSENT_CATEGORIES || 'analytics,marketing').split(',').map(value => value.trim());
  if (gtmCategories.some(value => !['analytics', 'marketing'].includes(value)) ||
      new Set(gtmCategories).size !== gtmCategories.length) {
    throw new Error('GTM_CONSENT_CATEGORIES must list analytics, marketing, or both.');
  }
  const config = {
    services, gtmCategories,
    enabled: {
      maps: true,
      analytics: Boolean(services.ga4 || (services.gtm && gtmCategories.includes('analytics'))),
      marketing: Boolean(services.meta || services.linkedin || (services.gtm && gtmCategories.includes('marketing')))
    }
  };
  config.revision = createHash('sha256').update('2026-11-25:' + JSON.stringify(config)).digest('hex').slice(0, 16);
  return config;
}
