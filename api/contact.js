import { createHmac } from 'node:crypto';
import { businessEmail, customerEmail, furnitureLabels, priceExampleLabels, contactLanguages } from '../lib/contact-content.mjs';
import { contactConfig } from '../lib/contact-config.mjs';

const MAX_BYTES = 24_576;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EMAIL = /^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/;
const controls = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;

export function validateSubmission(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { code:'invalidRequest' };
  const fields = {};
  const str = key => typeof body[key] === 'string' ? body[key].trim() : '';
  const data = Object.fromEntries(['submissionId','language','name','contactMethod','email','phone','furniture','message','sourcePage','context','priceExample','website','turnstileToken'].map(k => [k,str(k)]));
  if (!UUID.test(data.submissionId) || !contactLanguages.includes(data.language)) return { code:'invalidRequest' };
  if (!['email','phone'].includes(data.contactMethod)) return { code:'invalidRequest' };
  if (!data.name || data.name.length > 100 || /[\r\n]/.test(data.name) || controls.test(data.name)) fields.name = 'invalidName';
  if ((data.contactMethod === 'email' && !data.email) || (data.email && (!EMAIL.test(data.email) || data.email.length > 254))) fields.email = 'invalidEmail';
  if ((data.contactMethod === 'phone' && !data.phone) || (data.phone && (!/^[+0-9 ().-]{7,25}$/.test(data.phone) || data.phone.replace(/\D/g,'').length < 7))) fields.phone = 'invalidPhone';
  if (data.message.length > 3000 || controls.test(data.message)) fields.message = 'invalidMessage';
  if (!Object.hasOwn(furnitureLabels,data.furniture)) fields.furniture = 'invalidCategory';
  if (data.context.length > 1200 || controls.test(data.context)
    || (data.priceExample && !Object.hasOwn(priceExampleLabels,data.priceExample))
    || (data.priceExample && data.furniture !== 'virtuve')) return { code:'invalidRequest' };
  // Source is a path, never an arbitrary user-supplied URL/query string.
  if (!/^\/(?:[a-z0-9-]+\/)*$/.test(data.sourcePage) || data.sourcePage.length > 300) return { code:'invalidRequest' };
  const pathLanguage = data.sourcePage.match(/^\/(en|ru|no)(?:\/|$)/)?.[1] || 'lv';
  if (pathLanguage !== data.language) return { code:'invalidRequest' };
  if (Object.keys(fields).length) return { code:'validationSummary', fields };
  if (data.website) return { code:'invalidRequest' };
  if (!data.turnstileToken || data.turnstileToken.length > 2048) return { code:'verificationRequired' };
  return { data };
}

async function readBody(req) {
  if (Number(req.headers['content-length']) > MAX_BYTES) throw new Error('tooLarge');
  if (req.body !== undefined) {
    const raw = typeof req.body === 'string' || Buffer.isBuffer(req.body) ? String(req.body) : JSON.stringify(req.body);
    if (Buffer.byteLength(raw) > MAX_BYTES) throw new Error('tooLarge');
    return JSON.parse(raw);
  }
  const chunks = []; let size = 0;
  for await (const chunk of req) {
    size += Buffer.byteLength(chunk);
    if (size > MAX_BYTES) throw new Error('tooLarge');
    chunks.push(Buffer.from(chunk));
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

export function createContactHandler({ env = process.env, fetchImpl = globalThis.fetch, now = Date.now, log = console.warn } = {}) {
  // An extra per-instance throttle. Turnstile is always checked as well.
  // This map is not a shared/durable fleet-wide limiter. See docs/contact-form.txt.
  const attempts = new Map();
  const limited = (key, limit, windowMs) => {
    const time = now();
    for (const [k,v] of attempts) if (v.until <= time) attempts.delete(k);
    const entry = attempts.get(key) || { count:0, until:time + windowMs };
    entry.count++; attempts.set(key,entry);
    return entry.count > limit || attempts.size > 5000;
  };
  return async function contact(req, res) {
    res.setHeader('Content-Type','application/json; charset=utf-8');
    res.setHeader('Cache-Control','no-store');
    res.setHeader('X-Content-Type-Options','nosniff');
    const reply = (status, body) => { res.statusCode = status; res.end(JSON.stringify(body)); };
    if (req.method !== 'POST') { res.setHeader('Allow','POST'); return reply(405,{ ok:false,code:'invalidRequest' }); }
    const config = contactConfig(env);
    if (!config.ready) return reply(503,{ ok:false,code:'unavailable' });
    const origin = req.headers.origin;
    if (!config.origins.includes(origin)) return reply(403,{ ok:false,code:'invalidRequest' });
    if (!/^application\/json(?:\s*;|$)/i.test(req.headers['content-type'] || '')) return reply(415,{ ok:false,code:'invalidRequest' });
    const digest = value => createHmac('sha256',config.apiKey).update(value).digest('hex');
    // On Vercel use its trusted forwarded IP, not a user-supplied first XFF item.
    const ip = env.VERCEL ? req.headers['x-vercel-forwarded-for'] : req.socket?.remoteAddress;
    const ipKey = digest(`ip:${ip || 'unknown'}`);
    if (limited(ipKey,8,10 * 60_000)) { res.setHeader('Retry-After','600'); return reply(429,{ ok:false,code:'rateLimited' }); }
    let body;
    try { body = await readBody(req); }
    catch (error) { return reply(error.message === 'tooLarge' ? 413 : 400,{ ok:false,code:error.message === 'tooLarge' ? 'tooLarge' : 'invalidRequest' }); }
    const checked = validateSubmission(body);
    if (!checked.data) return reply(400,{ ok:false,code:checked.code,...(checked.fields ? { fields:checked.fields } : {}) });
    const data = checked.data;
    // In the private Preview test both email roles belong to the designated test mailbox.
    if (env.VERCEL_ENV === 'preview' && data.email && data.email.toLowerCase() !== config.to.toLowerCase()) {
      return reply(400,{ ok:false,code:'invalidRequest' });
    }
    const source = new URL(data.sourcePage, origin).href;
    const { turnstileToken, website, ...submission } = data;
    const key = `contact/${data.submissionId}/${digest(JSON.stringify({ ...submission, origin }))}`;
    try {
      const verification = await fetchImpl('https://challenges.cloudflare.com/turnstile/v0/siteverify',{
        method:'POST',headers:{ 'Content-Type':'application/json' },signal:AbortSignal.timeout(8000),
        body:JSON.stringify({ secret:config.turnstileSecret, response:turnstileToken, ...(ip ? { remoteip:ip } : {}) })
      });
      if (!verification.ok) return reply(503,{ ok:false,code:'verificationUnavailable' });
      const result = await verification.json();
      if (!result.success || result.hostname !== new URL(origin).hostname || result.action !== 'contact') {
        return reply(400,{ ok:false,code:result['error-codes']?.includes('timeout-or-duplicate') ? 'verificationExpired' : 'verificationFailed' });
      }
    } catch { return reply(503,{ ok:false,code:'verificationUnavailable' }); }

    const send = async (email, idempotencyKey) => {
      const response = await fetchImpl('https://api.resend.com/emails',{
        method:'POST',signal:AbortSignal.timeout(8000),
        headers:{ Authorization:`Bearer ${config.apiKey}`, 'Content-Type':'application/json','Idempotency-Key':idempotencyKey },
        body:JSON.stringify(email)
      });
      if (!response.ok) throw new Error('resend_rejected');
      const result = await response.json();
      if (!result.id) throw new Error('resend_missing_id');
    };
    try {
      await send({ from:`Lauras mēbeles <${config.from}>`, to:[config.to],
        reply_to:data.email || config.replyTo, ...businessEmail(data,source),
        tags:[{ name:'type',value:'enquiry' },{ name:'language',value:data.language }]
      },`${key}/business`);
    } catch (error) {
      log('contact: business email not confirmed'); // Never log payloads, addresses, tokens or provider errors.
      return reply(502,{ ok:false,code:error.message === 'resend_rejected' ? 'sendError' : 'networkError' });
    }
    let confirmation = false;
    if (data.email && !limited(digest(`email:${data.email.toLowerCase()}`),3,60 * 60_000)) {
      try {
        await send({ from:`Lauras mēbeles <${config.from}>`,to:[data.email],reply_to:config.replyTo,
          ...customerEmail(data.language,config.replyTo),headers:{ 'Auto-Submitted':'auto-replied' },
          tags:[{ name:'type',value:'confirmation' },{ name:'language',value:data.language }]
        },`${key}/customer`);
        confirmation = true;
      } catch { log('contact: customer confirmation not confirmed'); }
    }
    // Success means accepted by Resend, not proof of inbox delivery. The lead
    // remains successful if the independent confirmation email fails.
    return reply(200,{ ok:true,code:'success',confirmation,submissionId:data.submissionId });
  };
}

export default createContactHandler();
