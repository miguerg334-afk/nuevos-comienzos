import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { sendFormEmail, type EmailAttachment } from "./form-email";
import type { EmailContent } from "./email-templates";

export function submissionClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
}

/** Email is the primary destination; Supabase is an optional secondary copy. */
export async function deliverSubmission(
  message: EmailContent,
  backup: (db: SupabaseClient, emailId: string) => Promise<void>,
  attachments: EmailAttachment[] = [],
  afterEmailAccepted?: (emailId: string) => Promise<void>,
) {
  const id = await sendFormEmail(message, attachments);
  try {
    await afterEmailAccepted?.(id);
  } catch (error) {
    // The applicant's email is accepted first, so an operational copy may fail safely.
    const reason = error instanceof Error ? error.message : "Unknown Google Sheets error";
    console.error("Form email accepted; Google Sheets copy failed.", { emailId: id, reason });
  }
  try {
    const db = submissionClient();
    if (db) await backup(db, id);
  } catch {
    // An optional backup failure must not cause a duplicate email submission.
    console.error("Form email accepted; optional Supabase backup failed. Email ID:", id);
  }
  return Response.json({ ok: true });
}
