// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://elbnddemvmpsvrqffauz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsYm5kZGVtdm1wc3ZycWZmYXV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNzE3NjAsImV4cCI6MjA2NTY0Nzc2MH0.QbLWaED5Kc3iHS9U2tMI-ILlLBPac44N6sS2NWWYr4U";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);