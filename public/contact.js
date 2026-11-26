(() => {
  const form = document.getElementById('lead-form');
  const config = window.LAURAS_CONTACT;
  if (!form || !config) return;
  const ui = config.ui;
  const field = id => document.getElementById(id);
  const button = form.querySelector('button[type="submit"]');
  const status = field('form-status');
  const fields = ['name','email','phone','furniture','message'];
  const EMAIL = /^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/;
  let busy = false, widget = null, token = '', pending = null, statusCode = '';
  const recorded = new Set();
  form.noValidate = true;
  button.disabled = false;
  function showStatus(code, extra = '') {
    statusCode = code;
    status.textContent = (ui[code] || ui.sendError) + (extra ? ` ${extra}` : '');
    status.focus({ preventScroll:true });
  }
  function clearError(id) {
    field(id).removeAttribute('aria-invalid');
    field(`${id}-error`).hidden = true;
    field(`${id}-error`).textContent = '';
  }
  function markErrors(errors) {
    for (const [id,code] of Object.entries(errors)) {
      if (!fields.includes(id)) continue;
      field(id).setAttribute('aria-invalid','true');
      field(`${id}-error`).textContent = ui[code] || ui.invalidRequest;
      field(`${id}-error`).hidden = false;
    }
    showStatus('validationSummary');
    const first = fields.find(id => errors[id]);
    if (first) field(first).focus();
  }
  function contactMethod() {
    const phone = form.elements.contactMethod.value === 'phone';
    field('phone-field').hidden = !phone;
    field('phone').required = phone;
    field('phone').disabled = !phone;
    field('email-field').hidden = false;
    field('email').disabled = false;
    field('email').required = !phone;
    field('email-required').hidden = phone;
    field('email-optional').hidden = !phone;
    clearError('email'); clearError('phone');
  }
  form.querySelectorAll('[name="contactMethod"]').forEach(radio => radio.addEventListener('change', contactMethod));
  contactMethod();
  fields.forEach(id => field(id).addEventListener('input', () => { clearError(id); status.textContent = ''; }));
  function validate() {
    const errors = {};
    const name = field('name').value.trim();
    const email = field('email').value.trim();
    const phone = field('phone').disabled ? '' : field('phone').value.trim();
    if (!name || name.length > 100 || /[\r\n\u0000-\u001f\u007f]/.test(name)) errors.name = 'invalidName';
    if ((field('email').required && !email) || (email && (!EMAIL.test(email) || email.length > 254))) errors.email = 'invalidEmail';
    if (field('phone').required && (!/^[+0-9 ().-]{7,25}$/.test(phone) || phone.replace(/\D/g,'').length < 7)) errors.phone = 'invalidPhone';
    if (field('message').value.length > 3000) errors.message = 'invalidMessage';
    return errors;
  }
  function resetVerification() {
    token = '';
    if (widget !== null && window.turnstile) window.turnstile.reset(widget);
  }
  if (config.enabled) {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.onload = () => {
      widget = window.turnstile.render('#contact-security',{
        sitekey:config.siteKey, action:'contact', language:config.language === 'no' ? 'nb' : config.language,
        size:'flexible', theme:'light', callback:value => { token = value; if (statusCode.startsWith('verification')) status.textContent = ''; },
        'expired-callback':() => { token = ''; showStatus('verificationExpired'); },
        'error-callback':() => { token = ''; showStatus('verificationUnavailable'); }
      });
    };
    script.onerror = () => showStatus('verificationUnavailable');
    document.head.append(script);
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (busy) return;
    fields.forEach(clearError);
    const errors = validate();
    if (Object.keys(errors).length) return markErrors(errors);
    if (!config.enabled) {
      window.track?.('form_preview_complete',{ category:field('furniture').value });
      return showStatus('previewSuccess');
    }
    if (!token) return showStatus(widget === null ? 'verificationUnavailable' : 'verificationRequired');
    const input = {
      language:config.language, name:field('name').value.trim(), contactMethod:form.elements.contactMethod.value,
      email:field('email').value.trim(), phone:field('phone').disabled ? '' : field('phone').value.trim(),
      furniture:field('furniture').value, message:field('message').value.trim(), sourcePage:location.pathname,
      priceExample:field('price-example-input').value,
      context:field('project-context').hidden ? '' : field('context-text').textContent,
      website:field('website').value
    };
    const signature = JSON.stringify(input);
    // Retain the ID when retrying an uncertain result with unchanged content.
    // Keep this only in memory, never localStorage/sessionStorage.
    if (!pending || pending.signature !== signature) pending = { signature,id:crypto.randomUUID() };
    const submissionId = pending.id;
    busy = true; form.setAttribute('aria-busy','true');
    const controls = [...form.querySelectorAll('input,select,textarea,button')].map(el => [el,el.disabled]);
    controls.forEach(([el]) => { el.disabled = true; });
    field('contact-submit-text').textContent = ui.sending;
    status.textContent = ui.sending;
    let resetAfterSuccess = false;
    try {
      const response = await fetch(form.action,{
        method:'POST',headers:{ 'Content-Type':'application/json' },
        body:JSON.stringify({ ...input,submissionId,turnstileToken:token }), signal:AbortSignal.timeout(30000)
      });
      // The hosting firewall can return its own 429 response before the API runs.
      const result = response.status === 429 ? { code:'rateLimited' } : await response.json();
      controls.forEach(([el,disabled]) => { el.disabled = disabled; });
      if (response.ok && result.ok === true && result.submissionId === submissionId) {
        if (!recorded.has(submissionId)) {
          recorded.add(submissionId);
          window.track?.('generate_lead',{ category:input.furniture,page_language:config.language });
        }
        form.reset(); window.clearFormContext?.(); pending = null; resetAfterSuccess = true;
        showStatus('success',result.confirmation === true ? ui.confirmationNote : '');
      } else if (result.fields) markErrors(result.fields);
      else showStatus(Object.hasOwn(ui,result.code) ? result.code : 'sendError');
    } catch { showStatus('networkError'); }
    finally {
      controls.forEach(([el,disabled]) => { el.disabled = disabled; });
      if (resetAfterSuccess) contactMethod();
      busy = false; form.removeAttribute('aria-busy');
      field('contact-submit-text').textContent = ui.submit;
      resetVerification();
    }
  });
})();
