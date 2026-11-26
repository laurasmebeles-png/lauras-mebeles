export function contactConfig(env = process.env) {
  const enabled = env.CONTACT_ENABLED === 'true';
  const origins = (env.CONTACT_ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  const mailbox = value => /^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/.test(value || '');
  const validOrigin = value => {
    try { const u = new URL(value); return u.origin === value && (u.protocol === 'https:' || (u.protocol === 'http:' && ['127.0.0.1','localhost'].includes(u.hostname))); }
    catch { return false; }
  };
  const valid = Boolean(env.RESEND_API_KEY && env.TURNSTILE_SECRET_KEY && env.TURNSTILE_SITE_KEY
    && mailbox(env.CONTACT_FROM) && mailbox(env.CONTACT_TO) && mailbox(env.CONTACT_REPLY_TO)
    && origins.length && origins.every(validOrigin));
  return {
    enabled, ready:enabled && valid, siteKey:env.TURNSTILE_SITE_KEY || '', origins,
    apiKey:env.RESEND_API_KEY, turnstileSecret:env.TURNSTILE_SECRET_KEY,
    from:env.CONTACT_FROM, to:env.CONTACT_TO, replyTo:env.CONTACT_REPLY_TO
  };
}

export function publicContactConfig(env = process.env) {
  const c = contactConfig(env);
  if (c.enabled && !c.ready) throw new Error('CONTACT_ENABLED=true requires all contact settings. See .env.example.');
  return { enabled:c.ready, siteKey:c.ready ? c.siteKey : '' };
}
