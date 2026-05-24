import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Save, Plus, ArrowUp, ArrowDown, Trash2, LogOut, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useContent } from '../content/ContentContext';
import { defaultContent, type SiteContent, type PortfolioCampaign } from '../content/defaultContent';
import MediaField from './MediaField';

// Simple client-side gate. Set VITE_ADMIN_PASSWORD in your .env.
const ADMIN_PASSWORD = (import.meta.env.VITE_ADMIN_PASSWORD as string) || 'thelink-admin';
const AUTH_KEY = 'tl_admin_authed';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4 pb-2 border-b border-gray-200">{title}</h2>
    <div className="space-y-3">{children}</div>
  </section>
);

const AdminPage: React.FC = () => {
  const { content, save, configured, loading } = useContent();
  const [draft, setDraft] = useState<SiteContent>(content);
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => { setAuthed(sessionStorage.getItem(AUTH_KEY) === '1'); }, []);
  useEffect(() => { if (!loading) setDraft(content); }, [loading, content]);

  const update = (fn: (d: SiteContent) => SiteContent) => setDraft((d) => fn(structuredClone(d)));

  const doSave = async () => {
    setStatus('saving'); setErrMsg('');
    const res = await save(draft);
    if (res.ok) { setStatus('saved'); setTimeout(() => setStatus('idle'), 2500); }
    else { setStatus('error'); setErrMsg(res.error || 'Save failed'); }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Helmet><title>Admin · The Link</title><meta name="robots" content="noindex" /></Helmet>
        <div className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-lg font-semibold text-gray-900 mb-1">Content Manager</h1>
          <p className="text-sm text-gray-500 mb-6">Enter the password to manage site media.</p>
          <input
            type="password" value={pw} onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && pw === ADMIN_PASSWORD) { sessionStorage.setItem(AUTH_KEY, '1'); setAuthed(true); } }}
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-emerald-400"
          />
          <button
            onClick={() => { if (pw === ADMIN_PASSWORD) { sessionStorage.setItem(AUTH_KEY, '1'); setAuthed(true); } else setErrMsg('Wrong password'); }}
            className="w-full py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >Enter</button>
          {errMsg && <p className="text-xs text-red-600 mt-3">{errMsg}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet><title>Admin · The Link</title><meta name="robots" content="noindex" /></Helmet>

      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-base font-semibold text-gray-900">Content Manager</h1>
            <p className="text-xs text-gray-400">Edit every image & video on the site</p>
          </div>
          <div className="flex items-center gap-2">
            {status === 'saved' && <span className="text-xs text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Saved</span>}
            {status === 'error' && <span className="text-xs text-red-600 flex items-center gap-1"><AlertTriangle className="w-4 h-4" /> {errMsg}</span>}
            <button onClick={doSave} disabled={status === 'saving'} className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-50 transition-colors">
              {status === 'saving' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Publish
            </button>
            <button onClick={() => { sessionStorage.removeItem(AUTH_KEY); setAuthed(false); }} className="inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {!configured && (
          <div className="mb-8 rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
            <strong>Supabase not connected.</strong> You can edit fields, but uploading and publishing
            require Supabase env vars. See SUPABASE_SETUP.md. The live site still runs from defaults.
          </div>
        )}

        <Section title="Branding">
          <MediaField label="Logo — dark (for light backgrounds)" value={draft.branding.logoDark.src} onChange={(v) => update((d) => { d.branding.logoDark.src = v; return d; })} />
          <MediaField label="Logo — light (for dark backgrounds)" value={draft.branding.logoLight.src} onChange={(v) => update((d) => { d.branding.logoLight.src = v; return d; })} />
          <MediaField label="Favicon" value={draft.branding.favicon.src} onChange={(v) => update((d) => { d.branding.favicon.src = v; return d; })} />
          <MediaField label="Social share image (OG, 1200×630)" value={draft.branding.ogImage.src} onChange={(v) => update((d) => { d.branding.ogImage.src = v; return d; })} />
        </Section>

        <Section title="Homepage Hero">
          <MediaField label="Hero image" value={draft.hero.image.src} onChange={(v) => update((d) => { d.hero.image.src = v; return d; })} />
        </Section>

        <Section title="Homepage Slideshow">
          {draft.slideshow.images.map((img, i) => (
            <MediaField
              key={i} label={`Slide ${i + 1}`} value={img.src}
              onChange={(v) => update((d) => { d.slideshow.images[i].src = v; return d; })}
              onRemove={() => update((d) => { d.slideshow.images.splice(i, 1); return d; })}
            />
          ))}
          <button onClick={() => update((d) => { d.slideshow.images.push({ src: '', alt: '' }); return d; })} className="inline-flex items-center gap-1.5 text-sm text-emerald-700 hover:text-emerald-600">
            <Plus className="w-4 h-4" /> Add slide
          </button>
        </Section>

        <Section title="About — CEO Photo">
          <MediaField label="CEO portrait" value={draft.about.ceoPhoto.src} onChange={(v) => update((d) => { d.about.ceoPhoto.src = v; return d; })} />
        </Section>

        <Section title="Showreel Videos">
          {draft.showreel.videos.map((vid, i) => (
            <MediaField
              key={i} kind="video" label={vid.alt || `Showreel ${i + 1}`} value={vid.src}
              onChange={(v) => update((d) => { d.showreel.videos[i].src = v; return d; })}
              onRemove={() => update((d) => { d.showreel.videos.splice(i, 1); return d; })}
            />
          ))}
          <button onClick={() => update((d) => { d.showreel.videos.push({ src: '', alt: '' }); return d; })} className="inline-flex items-center gap-1.5 text-sm text-emerald-700 hover:text-emerald-600">
            <Plus className="w-4 h-4" /> Add video
          </button>
        </Section>

        <Section title="Portfolio Campaigns">
          {draft.portfolio.map((camp, ci) => (
            <CampaignEditor
              key={camp.id} camp={camp}
              onChange={(next) => update((d) => { d.portfolio[ci] = next; return d; })}
              onRemove={() => update((d) => { d.portfolio.splice(ci, 1); return d; })}
              onMove={(dir) => update((d) => {
                const j = ci + dir;
                if (j < 0 || j >= d.portfolio.length) return d;
                [d.portfolio[ci], d.portfolio[j]] = [d.portfolio[j], d.portfolio[ci]];
                return d;
              })}
            />
          ))}
          <button
            onClick={() => update((d) => {
              const nextId = Math.max(0, ...d.portfolio.map((c) => c.id)) + 1;
              d.portfolio.push({ id: nextId, title: 'New Campaign', client: '', category: 'creative', description: '', images: [] });
              return d;
            })}
            className="inline-flex items-center gap-1.5 text-sm text-emerald-700 hover:text-emerald-600"
          >
            <Plus className="w-4 h-4" /> Add campaign
          </button>
        </Section>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
          <button onClick={doSave} disabled={status === 'saving'} className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-50">
            {status === 'saving' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Publish changes
          </button>
          <button onClick={() => setDraft(structuredClone(defaultContent))} className="text-sm text-gray-500 hover:text-gray-700">Reset to defaults</button>
        </div>
      </div>
    </div>
  );
};

// ── Campaign editor ──────────────────────────────────────
const CampaignEditor: React.FC<{
  camp: PortfolioCampaign;
  onChange: (c: PortfolioCampaign) => void;
  onRemove: () => void;
  onMove: (dir: 1 | -1) => void;
}> = ({ camp, onChange, onRemove, onMove }) => {
  const set = <K extends keyof PortfolioCampaign>(k: K, v: PortfolioCampaign[K]) => onChange({ ...camp, [k]: v });

  return (
    <details className="border border-gray-200 rounded-lg bg-white">
      <summary className="cursor-pointer px-4 py-3 flex items-center justify-between select-none">
        <span className="font-medium text-gray-800 text-sm">{camp.title || 'Untitled'} <span className="text-gray-400 font-normal">· {camp.images.length} images</span></span>
        <span className="flex items-center gap-1">
          <button onClick={(e) => { e.preventDefault(); onMove(-1); }} className="p-1 text-gray-400 hover:text-gray-700"><ArrowUp className="w-4 h-4" /></button>
          <button onClick={(e) => { e.preventDefault(); onMove(1); }} className="p-1 text-gray-400 hover:text-gray-700"><ArrowDown className="w-4 h-4" /></button>
          <button onClick={(e) => { e.preventDefault(); onRemove(); }} className="p-1 text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
        </span>
      </summary>
      <div className="px-4 pb-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs text-gray-600">Title
            <input value={camp.title} onChange={(e) => set('title', e.target.value)} className="mt-1 w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-emerald-400" />
          </label>
          <label className="text-xs text-gray-600">Client
            <input value={camp.client} onChange={(e) => set('client', e.target.value)} className="mt-1 w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-emerald-400" />
          </label>
        </div>
        <label className="text-xs text-gray-600 block">Category
          <select value={camp.category} onChange={(e) => set('category', e.target.value as PortfolioCampaign['category'])} className="mt-1 w-full px-2 py-1.5 border border-gray-200 rounded text-sm bg-white focus:outline-none focus:border-emerald-400">
            <option value="creative">Creative</option>
            <option value="print">Print</option>
            <option value="pos">POS</option>
          </select>
        </label>
        <label className="text-xs text-gray-600 block">Description
          <textarea value={camp.description} onChange={(e) => set('description', e.target.value)} rows={3} className="mt-1 w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-emerald-400" />
        </label>
        <label className="flex items-center gap-2 text-xs text-gray-600">
          <input type="checkbox" checked={!!camp.featured} onChange={(e) => set('featured', e.target.checked)} /> Featured (larger card)
        </label>

        <div className="text-xs font-medium text-gray-700 pt-2">Images</div>
        {camp.images.map((m, i) => (
          <MediaField
            key={i} value={m.src}
            onChange={(v) => { const imgs = [...camp.images]; imgs[i] = { ...imgs[i], src: v }; set('images', imgs); }}
            onRemove={() => { const imgs = [...camp.images]; imgs.splice(i, 1); set('images', imgs); }}
          />
        ))}
        <button onClick={() => set('images', [...camp.images, { src: '' }])} className="inline-flex items-center gap-1.5 text-sm text-emerald-700 hover:text-emerald-600">
          <Plus className="w-4 h-4" /> Add image
        </button>
      </div>
    </details>
  );
};

export default AdminPage;
