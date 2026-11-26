import assert from 'node:assert/strict';
import { test } from 'node:test';
import { randomUUID } from 'node:crypto';
import { createContactHandler, validateSubmission } from '../api/contact.js';
import { contactCopy, customerEmail, businessEmail } from '../lib/contact-content.mjs';
import { contactMarkup } from './contact-markup.mjs';
import { readFile } from 'node:fs/promises';

const origin = 'https://lauras-mebeles.vercel.app';
const env = {
  CONTACT_ENABLED:'true',CONTACT_ALLOWED_ORIGINS:origin,RESEND_API_KEY:'test-private-key',
  TURNSTILE_SECRET_KEY:'test-secret',TURNSTILE_SITE_KEY:'test-public-site-key',
  CONTACT_FROM:'website@laurasmebeles.lv', CONTACT_TO:'info@laurasmebeles.lv', CONTACT_REPLY_TO:'info@laurasmebeles.lv'
};
const valid = (extra = {}) => ({ submissionId:randomUUID(),language:'lv',name:'Pārbaudes klients',contactMethod:'email',
  email:'client@example.com',phone:'',furniture:'virtuve',message:'Vēlos pārrunāt virtuvi.',sourcePage:'/kontakti/',
  context:'',priceExample:'',website:'',turnstileToken:'test-token',...extra });
async function invoke(handler, body, options = {}) {
  const req = { method:'POST',headers:{ origin,'content-type':'application/json',...options.headers },
    socket:{ remoteAddress:'127.0.0.1' },body,...options.req };
  const headers = {};
  let result;
  const res = { statusCode:200,setHeader:(key,value) => { headers[key] = value; },end:raw => { result = JSON.parse(raw); } };
  await handler(req,res);
  return { status:res.statusCode,body:result,headers };
}
function setup({ verification, rejectBusiness, rejectCustomer, timeoutBusiness } = {}) {
  const calls = [], warnings = [];
  const handler = createContactHandler({ env,log:message => warnings.push(message),fetchImpl:async (url,options) => {
    const body = JSON.parse(options.body);
    calls.push({ url,body,headers:options.headers });
    if (url.includes('siteverify')) return Response.json(verification || { success:true,hostname:new URL(origin).hostname,action:'contact' });
    const customer = body.tags[0].value === 'confirmation';
    if (!customer && timeoutBusiness) throw new DOMException('Timeout','TimeoutError');
    return customer && rejectCustomer || !customer && rejectBusiness ? Response.json({ error:'failure' },{ status:503 }) : Response.json({ id:randomUUID() });
  } });
  return { handler,calls,warnings };
}

test('disabled or incomplete configuration cannot contact external services', async () => {
  for (const settings of [{}, { ...env,CONTACT_ENABLED:'false' }, { ...env,CONTACT_REPLY_TO:'' }]) {
    const handler = createContactHandler({ env:settings,fetchImpl:() => assert.fail('No external request allowed') });
    const r = await invoke(handler,valid());
    assert.equal(r.status,503); assert.equal(r.body.ok,false);
  }
});
test('POST JSON, exact allowed origin, bounded request and valid fields required', async () => {
  const { handler,calls } = setup();
  assert.equal((await invoke(handler,valid(),{ req:{ method:'GET' } })).status,405);
  assert.equal((await invoke(handler,valid(),{ headers:{ origin:'https://evil.example' } })).status,403);
  assert.equal((await invoke(handler,valid(),{ headers:{ origin:undefined } })).status,403);
  assert.equal((await invoke(handler,valid(),{ headers:{ 'content-type':'text/plain' } })).status,415);
  assert.equal((await invoke(handler,'{')).status,400);
  assert.equal((await invoke(handler,valid({ message:'x'.repeat(25000) }))).status,413);
  const r = await invoke(handler,valid({ name:' ',email:'bad\r\nBcc:other@example.com' }));
  assert.equal(r.status,400); assert.deepEqual(r.body.fields,{ name:'invalidName',email:'invalidEmail' });
  assert.equal(calls.length,0);
});
test('path, language, category, context and honeypot validated on the server', () => {
  for (const changes of [{ language:'de' },{ sourcePage:'//evil.example/' },{ sourcePage:'/en/kontakti/' },
    { sourcePage:'/kontakti/?email=private@example.com' },{ furniture:'invented' },{ message:'x'.repeat(3001) },
    { context:'x'.repeat(1201) },{ website:'https://spam.example' },{ priceExample:'invented' },
    { furniture:'skapis',priceExample:'taisna' },{ turnstileToken:'' },{ phone:'-------',contactMethod:'phone',email:'' }]) {
    assert.ok(validateSubmission(valid(changes)).code,JSON.stringify(changes));
  }
  assert.ok(validateSubmission(valid({ contactMethod:'phone',phone:'+47 123 45 678',email:'' })).data);
});
test('private Preview only sends to its designated test mailbox', async () => {
  const previewEnv = { ...env, VERCEL_ENV:'preview' };
  const handler = createContactHandler({ env:previewEnv, fetchImpl:() => assert.fail('No external request allowed') });
  const result = await invoke(handler,valid());
  assert.equal(result.status,400);
  assert.equal(result.body.code,'invalidRequest');
});

test('Turnstile failure, expiry, wrong hostname and wrong action block all email', async () => {
  for (const verification of [{ success:false },{ success:false,'error-codes':['timeout-or-duplicate'] },
    { success:true,hostname:'evil.example',action:'contact' },{ success:true,hostname:new URL(origin).hostname,action:'login' }]) {
    const { handler,calls } = setup({ verification });
    const r = await invoke(handler,valid());
    assert.equal(r.status,400); assert.equal(calls.length,1);
    if (verification['error-codes']) assert.equal(r.body.code,'verificationExpired');
  }
});
test('each language sends the business enquiry first and a faithful fixed customer confirmation', async () => {
  for (const language of Object.keys(contactCopy)) {
    const { handler,calls } = setup();
    const data = valid({ language,sourcePage:language === 'lv' ? '/kontakti/' : `/${language}/kontakti/`,name:'<script>alert(1)</script>',message:'private words https://untrusted.example' });
    const r = await invoke(handler,data);
    assert.equal(r.status,200); assert.equal(r.body.confirmation,true); assert.equal(r.body.submissionId,data.submissionId);
    assert.equal(calls.length,3);
    const business = calls[1].body, customer = calls[2].body;
    assert.deepEqual(business.to,[env.CONTACT_TO]); assert.equal(business.reply_to,data.email);
    assert.ok(business.text.includes(`(${language})`)); assert.ok(business.text.includes(origin + data.sourcePage));
    assert.ok(business.html.includes('&lt;script&gt;')); assert.ok(!business.html.includes('<script>'));
    assert.deepEqual(customer.to,[data.email]); assert.equal(customer.reply_to,env.CONTACT_REPLY_TO);
    assert.equal(customer.subject,contactCopy[language].email.subject);
    assert.ok(!customer.html.includes('private words') && !customer.text.includes('untrusted.example'));
    assert.equal(customer.headers['Auto-Submitted'],'auto-replied');
    assert.ok(!JSON.stringify(r).includes(data.email));
  }
});
test('phone-only gets no email; optional email with phone gets a confirmation', async () => {
  for (const email of ['', 'client@example.com']) {
    const { handler,calls } = setup();
    const r = await invoke(handler,valid({ contactMethod:'phone',phone:'+371 29142364',email }));
    assert.equal(r.status,200); assert.equal(r.body.confirmation,Boolean(email));
    assert.equal(calls.length,email ? 3 : 2);
    assert.equal(calls[1].body.reply_to,email || env.CONTACT_REPLY_TO);
  }
});
test('business rejection prevents confirmation; uncertain send does not claim definite failure', async () => {
  for (const scenario of [{ rejectBusiness:true }, { timeoutBusiness:true }]) {
    const { handler,calls,warnings } = setup(scenario);
    const r = await invoke(handler,valid());
    assert.equal(r.status,502); assert.equal(r.body.code,scenario.timeoutBusiness ? 'networkError' : 'sendError');
    assert.equal(calls.length,2); assert.deepEqual(warnings,['contact: business email not confirmed']);
  }
});
test('confirmation failure preserves accepted enquiry and does not claim email confirmation', async () => {
  const { handler,warnings } = setup({ rejectCustomer:true });
  const r = await invoke(handler,valid());
  assert.equal(r.status,200); assert.equal(r.body.ok,true); assert.equal(r.body.confirmation,false);
  assert.deepEqual(warnings,['contact: customer confirmation not confirmed']);
});
test('retry uses identical business/customer idempotency keys and payloads with fresh Turnstile tokens', async () => {
  const { handler,calls } = setup(); const data = valid();
  await invoke(handler,data); await invoke(handler,{ ...data,turnstileToken:'fresh-token' });
  assert.equal(calls[1].headers['Idempotency-Key'],calls[4].headers['Idempotency-Key']);
  assert.equal(calls[2].headers['Idempotency-Key'],calls[5].headers['Idempotency-Key']);
  assert.notEqual(calls[1].headers['Idempotency-Key'],calls[2].headers['Idempotency-Key']);
  assert.deepEqual(calls[1].body,calls[4].body); assert.deepEqual(calls[2].body,calls[5].body);
  assert.notEqual(calls[0].body.response,calls[3].body.response);
});
test('throttles repeated submissions and repeated automatic emails', async () => {
  const { handler,calls } = setup();
  for (let i = 0; i < 8; i++) {
    const r = await invoke(handler,valid());
    assert.equal(r.status,200); assert.equal(r.body.confirmation,i < 3);
  }
  assert.equal(calls.filter(c => c.body.tags?.[0].value === 'confirmation').length,3);
  const r = await invoke(handler,valid()); assert.equal(r.status,429); assert.ok(r.headers['Retry-After']);
});
test('all copy complete, localized email documents and UI contains no private settings', async () => {
  const source = await readFile(new URL('../src/home.html',import.meta.url),'utf8');
  for (const [lang,copy] of Object.entries(contactCopy)) {
    for (const group of ['ui','email']) {
      assert.deepEqual(Object.keys(copy[group]).sort(),Object.keys(contactCopy.lv[group]).sort());
      assert.ok(Object.values(copy[group]).every(s => typeof s === 'string' && s.trim()));
    }
    const email = customerEmail(lang,env.CONTACT_REPLY_TO);
    assert.match(email.html,new RegExp(`<html lang="${lang === 'no' ? 'nb' : lang}">`));
    assert.ok(email.text.includes(copy.email.received));
    const preview = contactMarkup(source,lang,{});
    const active = contactMarkup(source,lang,env);
    assert.ok(preview.includes(copy.ui.previewNote));
    assert.ok(active.includes('"enabled":true')); assert.ok(active.includes(env.TURNSTILE_SITE_KEY));
    assert.ok(!active.includes(env.RESEND_API_KEY) && !active.includes(env.TURNSTILE_SECRET_KEY));
    assert.ok(!active.includes('class="form-demo"'));
    for (const id of ['name','email','phone','furniture','message']) assert.ok(active.includes(`id="${id}-error"`));
    assert.ok(active.includes('action="/api/contact"'));
  }
  assert.throws(() => contactMarkup(source,'lv',{ CONTACT_ENABLED:'true' }));
  assert.ok(businessEmail(valid(),'https://example.com/').html.includes('Jauns mājaslapas pieteikums'));
});
