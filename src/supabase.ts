import { createClient } from "@supabase/supabase-js";
import { SUPABASE } from "./secrets";

export const supabase = createClient(SUPABASE.url, SUPABASE.apiKey);
