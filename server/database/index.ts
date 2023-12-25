import { SupabaseClient, createClient } from "@supabase/supabase-js";
import "dotenv/config";

export const supabase: SupabaseClient = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);
