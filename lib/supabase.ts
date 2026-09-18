import { createClient } from "@supabase/supabase-js";

function createConfiguredClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error("Supabase no está configurado para el módulo académico.");
  }

  return createClient(url, anonKey);
}

let client: ReturnType<typeof createConfiguredClient> | undefined;

export function getSupabase() {
  return (client ??= createConfiguredClient());
}
