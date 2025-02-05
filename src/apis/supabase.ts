import { createClient } from "@supabase/supabase-js";

const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_APIKEY;
export const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_API_KEY)