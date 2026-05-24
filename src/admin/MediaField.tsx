import { useRef, useState } from 'react';
import { Upload, Trash2, Loader2 } from 'lucide-react';
import { useContent } from '../content/ContentContext';
import SmartImage from '../components/SmartImage';

interface MediaFieldProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  kind?: 'image' | 'video';
}

const MediaField: React.FC<MediaFieldProps> = ({ label, value, onChange, onRemove, kind = 'image' }) => {
  const { uploadFile, configured } = useContent();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setErr(''); setBusy(true);
    const { url, error } = await uploadFile(file);
    setBusy(false);
    if (error) { setErr(error); return; }
    if (url) onChange(url);
  };

  return (
    <div className="flex gap-3 items-start border border-gray-200 rounded-lg p-3 bg-white">
      <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
        {kind === 'video' ? (
          value ? <video src={value} className="w-full h-full object-cover" muted />
                : <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">No video</div>
        ) : (
          <SmartImage src={value} alt="" variant="light" className="w-full h-full object-cover" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        {label && <div className="text-xs font-medium text-gray-700 mb-1">{label}</div>}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={kind === 'video' ? '/videos/clip.mp4 or upload' : '/path/to/image.png or upload'}
          className="w-full text-xs px-2 py-1.5 border border-gray-200 rounded font-mono text-gray-600 focus:outline-none focus:border-emerald-400"
        />
        <div className="flex items-center gap-2 mt-2">
          <input
            ref={fileRef} type="file"
            accept={kind === 'video' ? 'video/*' : 'image/*'}
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) void handleFile(f); }}
          />
          <button
            type="button" onClick={() => fileRef.current?.click()}
            disabled={busy || !configured}
            title={!configured ? 'Connect Supabase to enable uploads' : 'Upload'}
            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
            {busy ? 'Uploading…' : 'Upload'}
          </button>
          {onRemove && (
            <button
              type="button" onClick={onRemove}
              className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Remove
            </button>
          )}
        </div>
        {err && <div className="text-[11px] text-red-600 mt-1">{err}</div>}
      </div>
    </div>
  );
};

export default MediaField;
