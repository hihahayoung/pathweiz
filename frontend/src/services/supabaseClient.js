// src/services/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Supabase URL and anonymous key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

/**
 * Create a Supabase client instance to interact with the Supabase backend.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
