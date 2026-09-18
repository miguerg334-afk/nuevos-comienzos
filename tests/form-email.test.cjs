const { test, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const ts = require('typescript');
const fs = require('node:fs');

// Load only the server-side TypeScript modules under test, without starting Next.js.
require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  module._compile(output, filename);
};
const { prematriculaEmail, donativoEmail, talentoEmail } = require('../lib/email-templates.ts');
const { prematricula, donativo, documentFile, FormError, readBody } = require('../lib/form-validation.ts');
const { FORM_RECIPIENT, sendFormEmail } = require('../lib/form-email.ts');
const originalFetch = global.fetch;
const originalApiKey = process.env.RESEND_API_KEY;
const originalFrom = process.env.RESEND_FROM_EMAIL;
const originalSmtpUser = process.env.HOSTINGER_SMTP_USER;
const originalSmtpPassword = process.env.HOSTINGER_SMTP_PASSWORD;
afterEach(() => {
  global.fetch = originalFetch;
  if (originalSmtpUser === undefined) delete process.env.HOSTINGER_SMTP_USER; else process.env.HOSTINGER_SMTP_USER = originalSmtpUser;
  if (originalSmtpPassword === undefined) delete process.env.HOSTINGER_SMTP_PASSWORD; else process.env.HOSTINGER_SMTP_PASSWORD = originalSmtpPassword;
  if (originalApiKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = originalApiKey;
  if (originalFrom === undefined) delete process.env.RESEND_FROM_EMAIL; else process.env.RESEND_FROM_EMAIL = originalFrom;
});
const contact = { nombre: 'Ana <Gómez>', email: 'ana@example.com', telefono: '+57 314 555 0000' };

test('prematrícula incluye a los hermanos y escapa datos introducidos en HTML', () => {
  const data = prematricula({ acudiente: contact, estudiantes: [
    { nombre: 'Juan & María', edad: '12', grado: '7', procedencia: '<script>alert(1)</script>' },
    { nombre: 'Lucía', edad: '14', grado: '9', procedencia: 'Otro colegio' },
  ] });
  const email = prematriculaEmail(data);
  assert.match(email.html, /2 estudiantes registrados/);
  assert.match(email.html, /Estudiante 2/);
  assert.match(email.html, /Juan &amp; María/);
  assert.match(email.html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.doesNotMatch(email.html, /<script>/);
  assert.equal(email.replyTo, contact.email);
  assert.match(email.text, /Lucía/);
});

test('las tres plantillas se diferencian y empleo enumera ambos adjuntos', () => {
  const donation = donativoEmail(donativo({ ...contact, modalidad: 'Equipa un sueño', mensaje: 'Pupitres' }));
  const job = talentoEmail({ ...contact, especialidad: 'Matemáticas' }, ['Hoja-de-vida.pdf', 'Carta-pastoral.pdf']);
  assert.match(donation.html, /Equipa un sueño/);
  assert.match(donation.text, /No es un comprobante de pago/);
  assert.match(job.html, /Hoja-de-vida.pdf/);
  assert.match(job.html, /Carta-pastoral.pdf/);
  assert.match(job.text, /Matemáticas/);
});

test('el destinatario es fijo y el proveedor recibe idempotencia y respuesta directa', async () => {
  process.env.RESEND_API_KEY = 're_test';
  process.env.RESEND_FROM_EMAIL = 'Nuevos Comienzos <forms@school.example>';
  let calls = 0;
  global.fetch = async (url, init) => {
    calls++;
    assert.equal(url, 'https://api.resend.com/emails');
    const payload = JSON.parse(init.body);
    assert.deepEqual(payload.to, [FORM_RECIPIENT]);
    assert.equal(payload.reply_to, contact.email);
    assert.match(init.headers['Idempotency-Key'], /^school-form-[a-f0-9]{64}$/);
    return Response.json({ id: 'dcb652bd-b3c0-4480-a1d0-937fc4d54b35' });
  };
  const email = donativoEmail(donativo({ ...contact, modalidad: 'Equipa un sueño', mensaje: '' }));
  assert.equal(await sendFormEmail(email), 'dcb652bd-b3c0-4480-a1d0-937fc4d54b35');
  assert.equal(calls, 1);
});

test('sin credenciales o con rechazo del proveedor no afirma que se recibió el correo', async () => {
  delete process.env.RESEND_API_KEY;
  delete process.env.RESEND_FROM_EMAIL;
  const email = donativoEmail(donativo({ ...contact, modalidad: 'Equipa un sueño', mensaje: '' }));
  await assert.rejects(sendFormEmail(email), error => error instanceof FormError && error.status === 503);
  process.env.RESEND_API_KEY = 're_test';
  process.env.RESEND_FROM_EMAIL = 'forms@school.example';
  global.fetch = async () => new Response('blocked', { status: 403 });
  await assert.rejects(sendFormEmail(email), error => error instanceof FormError && error.status === 502);
});

test('valida la firma de los documentos y corta el cuerpo sobredimensionado', async () => {
  const fakePdf = new File(['not-a-pdf'], 'cv.pdf', { type: 'application/pdf' });
  await assert.rejects(documentFile(fakePdf, 'CV'), FormError);
  const pdf = new File([new Uint8Array([37,80,68,70,45,49,46,55])], 'cv.pdf', { type: 'application/pdf' });
  assert.equal((await documentFile(pdf, 'CV')).name, 'cv.pdf');
  const request = new Request('http://local.test/', { method: 'POST', body: 'a'.repeat(101) });
  await assert.rejects(readBody(request, 100), error => error instanceof FormError && error.status === 413);
});


test('Hostinger envía con SSL y adjunta los documentos al correo del colegio', async () => {
  const nodemailer = require('nodemailer').default;
  const originalTransport = nodemailer.createTransport;
  process.env.HOSTINGER_SMTP_USER = 'info@nuevoscomienzosco.com';
  process.env.HOSTINGER_SMTP_PASSWORD = 'replacement-test-secret';
  process.env.RESEND_API_KEY = 're_unused';
  process.env.RESEND_FROM_EMAIL = 'unused@example.com';
  let closed = false, observedOptions, observedPayload;
  nodemailer.createTransport = options => {
    observedOptions = options;
    return {
      sendMail: async payload => {
        observedPayload = payload;
        return { accepted: [FORM_RECIPIENT], messageId: '<test-message@hostinger>' };
      },
      close: () => { closed = true; },
    };
  };
  try {
    const id = await sendFormEmail(talentoEmail({ ...contact, especialidad: 'Matemáticas' }, ['CV.pdf','Carta.pdf']), [{ filename: 'CV.pdf', content: Buffer.from('PDF example').toString('base64') }]);
    assert.match(id, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-a[0-9a-f]{3}-[0-9a-f]{12}$/);
    assert.equal(observedOptions.host, 'smtp.hostinger.com');
    assert.equal(observedOptions.port, 465);
    assert.equal(observedOptions.secure, true);
    assert.equal(observedOptions.auth.user, 'info@nuevoscomienzosco.com');
    assert.equal(observedPayload.to, FORM_RECIPIENT);
    assert.equal(observedPayload.replyTo, contact.email);
    assert.equal(observedPayload.attachments[0].content.toString(), 'PDF example');
    assert.ok(closed);
  } finally { nodemailer.createTransport = originalTransport; }
});

test('si falta una credencial de Hostinger no afirma que envió el mensaje', async () => {
  process.env.HOSTINGER_SMTP_USER = 'info@nuevoscomienzosco.com';
  delete process.env.HOSTINGER_SMTP_PASSWORD;
  const email = donativoEmail(donativo({ ...contact, modalidad: 'Equipa un sueño', mensaje: '' }));
  await assert.rejects(sendFormEmail(email), error => error instanceof FormError && error.status === 503);
});
