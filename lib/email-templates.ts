import type { Contact, Donativo, Prematricula, Talento } from "./form-validation";

export type EmailContent = { subject: string; html: string; text: string; replyTo: string };
type Section = { title: string; fields: [string, string][] };

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
}
function contactFields(data: Contact): [string, string][] {
  return [["Nombre completo", data.nombre], ["Correo electrónico", data.email], ["Teléfono", data.telefono]];
}
function template(category: string, title: string, intro: string, summary: string, sections: Section[], person: Contact, note: string): EmailContent {
  const e = escapeHtml;
  const subject = `[Nuevos Comienzos] ${category} · ${person.nombre}`;
  const sectionsHtml = sections.map(section => `<tr><td class="content" style="padding:0 36px 28px;">
    <h2 style="margin:0 0 14px;font:600 19px Georgia,serif;color:#102b33;">${e(section.title)}</h2>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e8e2d6;border-radius:12px;background:#fbfaf7;">${section.fields.map(([label,value]) => `<tr><td style="padding:13px 18px;border-bottom:1px solid #e8e2d6;word-break:break-word;"><p style="margin:0 0 5px;font:11px Arial,sans-serif;letter-spacing:.3px;color:#6b7280;">${e(label)}</p><p style="margin:0;font:14px/1.65 Arial,sans-serif;color:#102b33;white-space:pre-line;">${e(value)}</p></td></tr>`).join("")}</table></td></tr>`).join("");
  const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${e(subject)}</title>
<style>@media only screen and (max-width:600px){.outer{padding:16px 8px!important}.content{padding-left:22px!important;padding-right:22px!important}.email-title{font-size:28px!important}}</style></head>
<body style="margin:0;padding:0;background:#f2efe8;color:#102b33;font-family:Arial,sans-serif;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${e(summary)} — ${e(person.nombre)}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f2efe8;"><tr><td class="outer" align="center" style="padding:36px 16px;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border:1px solid #e1dacd;border-radius:20px;overflow:hidden;">
<tr><td class="content" style="padding:30px 36px;background:#08232c;border-bottom:4px solid #dca925;"><p style="margin:0;color:#ffffff;font:600 15px Arial,sans-serif;letter-spacing:2px;">NUEVOS COMIENZOS</p><p style="margin:8px 0 0;color:#e5bd61;font:10px Arial,sans-serif;letter-spacing:3px;">COLLEGE · CAMPOALEGRE</p></td></tr>
<tr><td class="content" style="padding:32px 36px 24px;"><p style="margin:0 0 14px;color:#967026;font:600 12px Arial,sans-serif;">${e(category)} · Nueva solicitud</p><h1 class="email-title" style="margin:0 0 16px;font:normal 34px/1.15 Georgia,serif;color:#102b33;">${e(title)}</h1><p style="margin:0;color:#647078;font:14px/1.8 Arial,sans-serif;">${e(intro)}</p><p style="margin:20px 0 0;padding:14px 16px;border-left:3px solid #dca925;background:#f6f0df;color:#775419;font:600 13px/1.7 Arial,sans-serif;">${e(summary)}</p></td></tr>
${sectionsHtml}
<tr><td class="content" style="padding:0 36px 32px;"><p style="margin:0 0 20px;color:#647078;font:13px/1.8 Arial,sans-serif;">${e(note)}</p><table role="presentation" cellspacing="0" cellpadding="0"><tr><td bgcolor="#08232c" style="border-radius:9px;"><a href="mailto:${e(encodeURIComponent(person.email))}" style="display:inline-block;padding:15px 24px;border:1px solid #08232c;border-radius:9px;color:#ffffff;text-decoration:none;font:600 13px Arial,sans-serif;">Responder a ${e(person.nombre)}</a></td></tr></table><p style="margin:14px 0 0;color:#7b8186;font:12px/1.7 Arial,sans-serif;">También puedes usar «Responder» en Gmail para contactar a esta persona.</p></td></tr>
<tr><td class="content" style="padding:22px 36px;background:#f7f5ef;border-top:1px solid #e8e2d6;"><p style="margin:0;color:#967026;font:italic 16px Georgia,serif;">Cada historia merece un nuevo comienzo.</p><p style="margin:10px 0 0;color:#7b8186;font:11px/1.7 Arial,sans-serif;">Solicitud enviada desde el sitio web de Nuevos Comienzos College.<br>Información para uso del equipo del colegio.</p></td></tr>
</table></td></tr></table></body></html>`;
  const text = ["Nuevos Comienzos College · Campoalegre", title, intro, summary, ...sections.map(section => `${section.title}\n${section.fields.map(([label,value]) => `${label}: ${value}`).join("\n")}`), note, `Responder a: ${person.email}`].join("\n\n");
  return { subject, html, text, replyTo: person.email };
}
export function prematriculaEmail(data: Prematricula): EmailContent {
  const count = data.estudiantes.length;
  return template("Prematrícula", "Una familia quiere dar el siguiente paso.", "Llegó una nueva solicitud de prematrícula. Aquí encontrarás los datos de contacto y la información de cada estudiante.", `${count} ${count === 1 ? "estudiante registrado" : "estudiantes registrados"} en esta solicitud`, [{ title:"Datos del acudiente", fields:contactFields(data.acudiente) }, ...data.estudiantes.map((s,i) => ({ title:`Estudiante ${i+1}`, fields:[["Nombre completo",s.nombre],["Edad",`${s.edad} años`],["Grado al que aspira",`${s.grado}°`],["Institución de procedencia",s.procedencia]] as [string,string][] }))], data.acudiente, "Esta es una solicitud de información y prematrícula; no confirma un cupo ni una matrícula.");
}
export function donativoEmail(data: Donativo): EmailContent {
  return template("Donativos", "Alguien quiere ser parte del comienzo.", "Una persona desea apoyar la misión del colegio. Estos son sus datos y la modalidad que eligió.", data.modalidad, [{title:"Datos de contacto",fields:contactFields(data)},{title:"Su aporte",fields:[["Modalidad",data.modalidad],["Propuesta",data.mensaje || "No incluyó una propuesta adicional."]]}], data, "Este mensaje registra interés en aportar. No es un comprobante de pago ni confirma una donación recibida.");
}
export function talentoEmail(data: Talento, attachments: [string,string]): EmailContent {
  return template("Talento humano", "Una nueva vocación quiere sumarse.", "Recibimos una postulación para formar parte del equipo. Los documentos se incluyen como archivos adjuntos en este correo.", `Especialidad: ${data.especialidad}`, [{title:"Datos del postulante",fields:[...contactFields(data),["Especialidad",data.especialidad]]},{title:"Documentos adjuntos",fields:[["Hoja de Vida (CV)",attachments[0]],["Carta de Recomendación Pastoral",attachments[1]]]}], data, "Revisa los dos documentos adjuntos para continuar con la postulación.");
}
