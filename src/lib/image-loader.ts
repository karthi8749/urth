/**
 * Custom next/image loader for static export (output: "export").
 *
 * With `images.unoptimized: true`, Next.js does NOT automatically
 * prepend `basePath` to <Image> src values — that auto-prepending only
 * happens for the built-in optimization loader, which static export
 * doesn't use. On GitHub Pages (served from /urth) this made every
 * <Image> 404. A custom loader is responsible for building the final
 * URL itself, so we add the basePath here explicitly.
 */
import { withBasePath } from "./paths";

type ImageLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

export default function imageLoader({ src }: ImageLoaderProps): string {
  return withBasePath(src);
}
