"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { useNav } from "@/components/providers/nav-provider";
import { useIntro } from "@/components/providers/homepage-intro-provider";
import { cn } from "@/lib/utils";

// blur strength (px) + where each layer fades out (top -> bottom)
const BLUR_LAYERS = [
  { blur: 1, mask: "linear-gradient(to bottom, #000 0%, #000 60%, transparent 100%)" },
  { blur: 2, mask: "linear-gradient(to bottom, #000 0%, #000 45%, transparent 80%)" },
  { blur: 4, mask: "linear-gradient(to bottom, #000 0%, #000 30%, transparent 65%)" },
  { blur: 8, mask: "linear-gradient(to bottom, #000 0%, #000 15%, transparent 50%)" },
  { blur: 10, mask: "linear-gradient(to bottom, #000 0%, transparent 35%)" },
];

export function SiteHeader() {
  const { open, toggle, setOpen } = useNav();
  const { isIntroComplete } = useIntro();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHomepage = pathname === "/";
  // Before mount, always hide to match SSR (server has no intro state).
  // After mount, show based on actual intro state.
  const shouldShow = mounted && (!isHomepage || isIntroComplete);

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 bg-transparent",
        !shouldShow && "pointer-events-none opacity-0",
      )}
    >
      {/* Progressive blur: content softly blurs + fades as it goes under the
          nav. Several blur layers, each masked with a gradient, so there is
          NO visible cut-off line. */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-16 transition-opacity duration-500 md:h-20",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      >
        {BLUR_LAYERS.map((layer, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${layer.blur}px)`,
              WebkitBackdropFilter: `blur(${layer.blur}px)`,
              maskImage: layer.mask,
              WebkitMaskImage: layer.mask,
            }}
          />
        ))}
        {/* very light tint so the logo / menu stay readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-brown/30 via-brown/20 to-transparent" />
      </div>

      {/* Logo — fixed to viewport centre-top, independent of inner container */}
      <div
        className={cn(
          "fixed left-1/2 top-0 z-50 -translate-x-1/2 flex h-24 items-center md:h-28 transition-all duration-500",
          !shouldShow && "pointer-events-none opacity-0",
        )}
      >
        <div className="group/logo rounded-full p-2 transition-all duration-300 hover:shadow-[0_0_32px_10px_rgba(250,79,1,0.45)] hover:bg-orange/10">
<Logo
  variant="dot"
  onClick={toggle}
  ariaLabel={open ? "Close menu" : "Open menu"}
  className="h-12 w-12 md:h-14 md:w-14 transition-transform duration-300 group-hover/logo:scale-105"
/>
        </div>
      </div>

      <div className="mx-auto relative flex h-24 max-w-[1600px] items-center px-6 md:h-28 md:px-10">
        {/* Menu button — pinned to the right */}
        <button
          type="button"
          onClick={toggle}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="group ml-auto flex items-center gap-3 text-cream transition-colors duration-300 hover:text-orange"
        >
          <span className="hidden text-[11px] uppercase tracking-[0.22em] md:inline">
            {open ? "Close" : "Menu"}
          </span>
          {open ? (
            <X className="size-5" strokeWidth={1.25} />
          ) : (
            <Menu className="size-5" strokeWidth={1.25} />
          )}
        </button>
      </div>
    </header>
  );
}