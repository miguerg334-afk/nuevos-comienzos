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
  } catch {
    // The applicant's email is accepted first, so an operational copy may fail safely.
    console.error("Form email accepted; Google Sheets copy failed. Email ID:", id);
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
