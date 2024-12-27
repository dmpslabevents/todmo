import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.REACT_APP_DB_URL,
  process.env.REACT_APP_KEY,
  {
    auth: {
      persistSession: true, // Ensure session is persisted
      detectSessionInUrl: true, // Ensure session is detected in URLs
      autoRefreshToken: true, // Automatically refresh tokens when expired
    },
  }
);
