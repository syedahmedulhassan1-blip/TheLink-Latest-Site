/**
 * Client-side image compression. Before a CMS upload hits Supabase, we resize
 * it down to a sane max width and re-encode as WebP at high quality. This means
 * a 4000px, 3 MB source becomes a ~1600px, ~150–300 KB WebP automatically —
 * no manual exporting needed, and the site stays fast.
 *
 * Videos and non-images pass through untouched.
 */
const MAX_WIDTH = 2000;       // generous cap; full-bleed images still look sharp
const QUALITY = 0.82;         // visually lossless for photos/campaign art

export async function compressImage(file: File): Promise<File> {
  // Only process raster images. Skip videos, SVG, GIF (animation), etc.
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml' || file.type === 'image/gif') {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_WIDTH / bitmap.width);
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close?.();

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, 'image/webp', QUALITY),
    );
    if (!blob) return file;

    // If compression somehow made it bigger, keep the original.
    if (blob.size >= file.size) return file;

    const newName = file.name.replace(/\.(png|jpe?g|webp|bmp|tiff?)$/i, '') + '.webp';
    return new File([blob], newName, { type: 'image/webp' });
  } catch {
    return file; // never block an upload if compression fails
  }
}
