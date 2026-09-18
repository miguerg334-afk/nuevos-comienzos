import { createHash } from "node:crypto";
import nodemailer from "nodemailer";
import type { EmailContent } from "./email-templates";
import { FormError } from "./form-validation";

// The destination is server-controlled, never taken from a public form.
export const FORM_RECIPIENT = "nuevoscomienzosco@gmail.com";
export type EmailAttachment = { filename: string; content: string };
const unavailable = () => new FormError(`El envío de formularios aún no está disponible. Puedes escribir a ${FORM_RECIPIENT}.`, 503);

export function emailConfiguration() {
  const user = process.env.HOSTINGER_SMTP_USER?.trim();
  const password = process.env.HOSTINGER_SMTP_PASSWORD;
  if (user || password) {
    if (!user || !password || !/^[^\s@]+@nuevoscomienzosco\.com$/i.test(user)) throw unavailable();
    return { provider: "hostinger" as const, user, password };
  }
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (!apiKey || !from || /[\r\n]/.test(from)) throw unavailable();
  return { provider: "resend" as const, apiKey, from };
}
export async function attachment(file: File, name: string): Promise<EmailAttachment> {
  const extension = file.name.split(".").pop()!.toLowerCase();
  return { filename: `${name}.${extension}`, content: Buffer.from(await file.arrayBuffer()).toString("base64") };
}

function uuidForMessage(messageId: string): string {
  const digest = createHash("sha256").update(messageId).digest("hex");
  return `${digest.slice(0,8)}-${digest.slice(8,12)}-4${digest.slice(13,16)}-a${digest.slice(17,20)}-${digest.slice(20,32)}`;
}

export async function sendFormEmail(message: EmailContent, attachments: EmailAttachment[] = []): Promise<string> {
  const config = emailConfiguration();
  if (config.provider === "hostinger") {
    // Port 465 negotiates TLS before credentials are sent.
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com", port: 465, secure: true,
      auth: { user: config.user, pass: config.password },
      connectionTimeout: 10_000, greetingTimeout: 10_000, socketTimeout: 15_000,
    });
    try {
      const result = await transporter.sendMail({
        from: { name: "Nuevos Comienzos College", address: config.user },
        to: FORM_RECIPIENT, replyTo: message.replyTo,
        subject: message.subject, html: message.html, text: message.text,
        attachments: attachments.map(({ filename, content }) => ({ filename, content: Buffer.from(content, "base64") })),
      });
      if (!result.accepted?.some(address => address.toLowerCase() === FORM_RECIPIENT) || !result.messageId) throw new Error("SMTP did not accept recipient");
      return uuidForMessage(result.messageId);
    } catch {
      // Never log the mailbox password or the applicant's personal information.
      throw new FormError("No pudimos confirmar el envío. Conserva tus datos y vuelve a intentarlo en unos minutos.", 502);
    } finally { transporter.close(); }
  }
  const payload = {
    from: config.from, to: [FORM_RECIPIENT], reply_to: message.replyTo,
    subject: message.subject, html: message.html, text: message.text,
    ...(attachments.length ? { attachments } : {}),
  };
  const body = JSON.stringify(payload);
  // The same Resend request payload uses the same key for 24 hours.
  const key = `school-form-${createHash("sha256").update(body).digest("hex")}`;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json", "Idempotency-Key": key },
      body, signal: AbortSignal.timeout(20_000), cache: "no-store",
    });
    if (!response.ok) throw new Error("Email provider rejected request");
    const data: unknown = await response.json();
    if (!data || typeof data !== "object" || !("id" in data) || typeof data.id !== "string" || !data.id) throw new Error("Missing email acknowledgement");
    return data.id;
  } catch {
    throw new FormError("No pudimos confirmar el envío. Conserva tus datos y vuelve a intentarlo en unos minutos.", 502);
  }
}
