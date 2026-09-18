import { createClient } from "@supabase/supabase-js";

export function submissionClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
}
export function unavailable() { return Response.json({ error: "Servicio de recepción no configurado" }, { status: 503 }); }
