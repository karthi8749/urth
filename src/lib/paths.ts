/**
 * GitHub Pages serves this site from a subpath (/urth), so every
 * asset URL needs that prefix. next/image handles this automatically
 * via the custom loader in `image-loader.ts`, but plain <img> tags and
 * any other raw "/..." path need it added manually — use this helper
 * for those.
 */
export function withBasePath(src: string): string {
  if (!src) return src;
  if (/^https?:\/\//i.test(src)) return src;

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!basePath || src.startsWith(basePath)) return src;

  return `${basePath}${src.startsWith("/") ? src : `/${src}`}`;
}
