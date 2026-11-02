"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const NAV_OFFSET = 112; // fixed nav (~7rem)
const PILLAR_IDS = ["architecture", "human-centric", "interior", "management"];

const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;

// Scroll through Lenis (if running) so it never drags the page back to its
// old target. Plain window.scrollTo is the fallback.
function scrollToY(top: number, smooth: boolean) {
  const lenis = (
    window as unknown as {
      __lenis?: {
        scrollTo: (
          t: number,
          o?: { immediate?: boolean; force?: boolean; duration?: number },
        ) => void;
      };
    }
  ).__lenis;
  if (lenis) {
    lenis.scrollTo(
      top,
      smooth ? { duration: 1.2, force: true } : { immediate: true, force: true },
    );
  } else {
    window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
  }
}

function findPin() {
  const section = document.getElementById("expertise");
  if (!section) return undefined;
  return ScrollTrigger.getAll().find((st) => st.trigger === section && st.pin);
}

function scrollToId(id: string, smooth: boolean, arriving = false) {
  const pin = findPin();

  // Desktop expertise section is pinned + horizontal: jump to the right point
  if (pin && (id === "expertise" || PILLAR_IDS.includes(id))) {
    const index = PILLAR_IDS.indexOf(id);
    const progress = index <= 0 ? 0 : index / (PILLAR_IDS.length - 1);
    const top = pin.start + (pin.end - pin.start) * progress;

    if (arriving && index > 0) {
      // 1) instantly land on the first card (skips the journey section)
      scrollToY(pin.start, false);
      // 2) then glide smoothly to the requested card
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          scrollToY(top, true),
        ),
      );
      return;
    }
    scrollToY(top, smooth);
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  scrollToY(top, smooth);
}

export function ScrollToHash() {
  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    // Wait until the pin ScrollTrigger exists (children mount after this
    // component), then jump. Polls every 40ms instead of a fixed 600ms delay,
    // which was the cause of the visible lag.
    const go = (hash: string, smooth: boolean, arriving = false) => {
      const id = decodeURIComponent(hash.replace("#", ""));
      if (!id) return;

      const needsPin =
        isDesktop() && (id === "expertise" || PILLAR_IDS.includes(id));
      const started = Date.now();

      const attempt = () => {
        if (cancelled) return;
        const ready = !needsPin || findPin();
        if (!ready && Date.now() - started < 2000) {
          timer = setTimeout(attempt, 40);
          return;
        }
        ScrollTrigger.refresh();
        scrollToId(id, smooth, arriving);
      };
      attempt();
    };

    // Arriving from another page (e.g. home -> /expertise#interior):
    // jump instantly so you never see the first card / journey section.
    if (window.location.hash) {
      const hash = window.location.hash;
      const run = () => go(hash, false, true);
      if (document.fonts?.ready) document.fonts.ready.then(run);
      else run();
    }

    // Same-page hash links: smooth scroll
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a) return;
      const url = new URL(a.href, window.location.href);
      if (
        url.origin === window.location.origin &&
        url.pathname.replace(/\/$/, "") ===
          window.location.pathname.replace(/\/$/, "") &&
        url.hash
      ) {
        clearTimeout(timer);
        timer = setTimeout(() => go(url.hash, true), 50);
      }
    };
    const onHashChange = () => {
      clearTimeout(timer);
      timer = setTimeout(() => go(window.location.hash, true), 30);
    };

    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return null;
}