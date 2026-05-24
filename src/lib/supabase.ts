import type { SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * Supabase is optional AND lazy-loaded. The heavy @supabase/supabase-js client
 * is only fetched the first time we actually need it (content load / upload),
 * keeping it out of the initial public-site bundle.
 */
export const isSupabaseConfigured = Boolean(url && anonKey);

let _client: SupabaseClient | null = null;
let _loading: Promise<SupabaseClient | null> | null = null;

export async function getSupabase(): Promise<SupabaseClient | null> {
  if (!isSupabaseConfigured) return null;
  if (_client) return _client;
  if (!_loading) {
    _loading = import('@supabase/supabase-js').then(({ createClient }) => {
      _client = createClient(url!, anonKey!);
      return _client;
    });
  }
  return _loading;
}

// Names used in Supabase — must match the SQL/bucket you create (see SUPABASE_SETUP.md)
export const CONTENT_TABLE = 'site_content';
export const CONTENT_ROW_ID = 1;
export const STORAGE_BUCKET = 'media';
