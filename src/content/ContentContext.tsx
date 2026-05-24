import {
  createContext, useContext, useEffect, useState, useCallback, type ReactNode,
} from 'react';
import {
  getSupabase, isSupabaseConfigured, CONTENT_TABLE, CONTENT_ROW_ID, STORAGE_BUCKET,
} from '../lib/supabase';
import { defaultContent, type SiteContent } from './defaultContent';

interface ContentCtx {
  content: SiteContent;
  loading: boolean;
  configured: boolean;
  save: (next: SiteContent) => Promise<{ ok: boolean; error?: string }>;
  uploadFile: (file: File) => Promise<{ url?: string; error?: string }>;
  refresh: () => Promise<void>;
}

const Ctx = createContext<ContentCtx | null>(null);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = await getSupabase();
    if (!supabase) {
      setContent(defaultContent);
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from(CONTENT_TABLE)
        .select('data')
        .eq('id', CONTENT_ROW_ID)
        .maybeSingle();

      if (error) throw error;

      if (data?.data) {
        // Merge so newly-added code fields still appear over an older stored row.
        setContent({ ...defaultContent, ...(data.data as SiteContent) });
      } else {
        await supabase.from(CONTENT_TABLE).upsert({ id: CONTENT_ROW_ID, data: defaultContent });
        setContent(defaultContent);
      }
    } catch {
      setContent(defaultContent); // never break the site on a backend hiccup
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const save: ContentCtx['save'] = useCallback(async (next) => {
    const supabase = await getSupabase();
    if (!supabase) return { ok: false, error: 'Supabase not configured.' };
    const { error } = await supabase
      .from(CONTENT_TABLE)
      .upsert({ id: CONTENT_ROW_ID, data: next, updated_at: new Date().toISOString() });
    if (error) return { ok: false, error: error.message };
    setContent(next);
    return { ok: true };
  }, []);

  const uploadFile: ContentCtx['uploadFile'] = useCallback(async (file) => {
    const supabase = await getSupabase();
    if (!supabase) return { error: 'Supabase not configured.' };
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const path = `${Date.now()}-${safeName}`;
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, { cacheControl: '3600', upsert: false });
    if (error) return { error: error.message };
    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
    return { url: data.publicUrl };
  }, []);

  return (
    <Ctx.Provider value={{
      content, loading, configured: isSupabaseConfigured, save, uploadFile, refresh: load,
    }}>
      {children}
    </Ctx.Provider>
  );
};

export const useContent = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
};
