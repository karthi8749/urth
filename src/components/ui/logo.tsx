import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  brandDotSrc,
  brandLogoSrc,
  type BrandColor,
  type BrandLogoVariant,
} from "@/lib/brand-assets";

type LogoProps = {
  /** primary = full graphic mark (default). wordmark = URTH letters only.
   *  "dot" = the plain orange dot mark, used in the nav bar. */
  variant?: BrandLogoVariant | "dot";
  color?: BrandColor;
  className?: string;
  href?: string;
  onClick?: () => void;
};

const sizes: Record<BrandLogoVariant, { width: number; height: number }> = {
  primary: { width: 192, height: 192 },
  secondary: { width: 192, height: 192 },
  tertiary: { width: 140, height: 140 },
  quaternary: { width: 112, height: 112 },
  brandmark: { width: 72, height: 72 },
  wordmark: { width: 280, height: 280 },
};

export function Logo({
  variant = "primary",
  color = "orange",
  className,
  href = "/",
  onClick,
}: LogoProps) {
  const isDot = variant === "dot";
  const size = isDot ? { width: 120, height: 120 } : sizes[variant];
  const src = isDot ? brandDotSrc() : brandLogoSrc(variant, color);

  const image = (
    <Image
      src={src}
      alt="URTH Studio"
      width={size.width}
      height={size.height}
      className={cn("h-auto w-auto object-contain", className)}
      priority
    />
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label="Open menu"
        className="inline-flex items-center"
      >
        {image}
      </button>
    );
  }

  return (
    <Link href={href} aria-label="URTH home" className="inline-flex items-center">
      {image}
    </Link>
  );
}
