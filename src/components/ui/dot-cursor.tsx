"use client";

import { useEffect, useRef } from "react";
import { useIntro } from "@/components/providers/homepage-intro-provider";

type Variant = "pop" | "fly" | "shrink" | "burst" | "trail" | "logo";

// Change this one word to switch animation:
// "pop" | "fly" | "shrink" | "burst" | "trail" | "logo"
const VARIANT: Variant = "shrink";

const SPARK_COUNT = 8;

export function DotCursor() {
  // Don't show the cursor dot during the landing-page loading intro.
  const { isIntroComplete } = useIntro();

  const wrapRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const sparkRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isIntroComplete) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const wrap = wrapRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!wrap || !ring || !dot) return;

    const sparks = sparkRefs.current.filter(
      (s): s is HTMLDivElement => s !== null,
    );

    const follows = VARIANT === "trail" || VARIANT === "logo";

    let visible = false;
    let settled = false;
    let merged: HTMLElement | null = null;
    let fast = false;
    let timer = 0;
    let frame = 0;
    let loopFrame = 0;
    const cur = { x: 0, y: 0 };
    const tgt = { x: 0, y: 0 };

    const place = (x: number, y: number) => {
      wrap.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const nextFrame = (fn: () => void) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(fn);
      });
    };

    // Smooth follow loop (used by "trail" and "logo")
    const loop = () => {
      if (!visible) return;
      const f =
        VARIANT === "trail" ? 0.16 : settled ? 1 : fast ? 0.28 : 0.08;
      cur.x += (tgt.x - cur.x) * f;
      cur.y += (tgt.y - cur.y) * f;
      if (
        VARIANT === "logo" &&
        !settled &&
        Math.abs(tgt.x - cur.x) + Math.abs(tgt.y - cur.y) < 2
      ) {
        settled = true;
        fast = false;
      }
      place(cur.x, cur.y);
      loopFrame = requestAnimationFrame(loop);
    };

    const reset = () => {
      merged?.removeAttribute("data-cursor-merged");
      merged = null;
      fast = false;
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(loopFrame);
      wrap.style.transition = "none";
      ring.style.transition = "none";
      dot.style.transition = "none";
      ring.style.transform = "scale(1)";
      ring.style.opacity = "0";
      dot.style.transform = "scale(1)";
      dot.style.opacity = "1";
      sparks.forEach((s) => {
        s.style.transition = "none";
        s.style.transform = "translate(0, 0)";
        s.style.opacity = "0";
      });
    };

    const getLogoOrigin = () => {
      const el = document.querySelector("[data-dot-origin]");
      if (el) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        }
      }
      return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    };

    const popDot = () => {
      dot.style.transform = "scale(0)";
      void wrap.offsetWidth;
      nextFrame(() => {
        dot.style.transition =
          "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)";
        dot.style.transform = "scale(1)";
      });
    };

    const play = (x: number, y: number) => {
      reset();
      visible = true;
      settled = false;
      wrap.style.display = "block";

      if (VARIANT === "fly") {
        place(window.innerWidth / 2, window.innerHeight / 2);
        void wrap.offsetWidth;
        nextFrame(() => {
          wrap.style.transition =
            "transform 900ms cubic-bezier(0.22, 1, 0.36, 1)";
          place(x, y);
          timer = window.setTimeout(() => {
            wrap.style.transition = "none";
          }, 900);
        });
        return;
      }

      if (VARIANT === "trail") {
        cur.x = x;
        cur.y = y;
        tgt.x = x;
        tgt.y = y;
        place(x, y);
        popDot();
        loopFrame = requestAnimationFrame(loop);
        return;
      }

      if (VARIANT === "logo") {
        const origin = getLogoOrigin();
        cur.x = origin.x;
        cur.y = origin.y;
        tgt.x = x;
        tgt.y = y;
        place(origin.x, origin.y);
        popDot();
        loopFrame = requestAnimationFrame(loop);
        return;
      }

      place(x, y);

      if (VARIANT === "pop") {
        ring.style.opacity = "0.8";
        dot.style.transform = "scale(0)";
        void wrap.offsetWidth;
        nextFrame(() => {
          ring.style.transition =
            "transform 700ms ease-out, opacity 700ms ease-out";
          dot.style.transition =
            "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)";
          ring.style.transform = "scale(5)";
          ring.style.opacity = "0";
          dot.style.transform = "scale(1)";
        });
      }

      if (VARIANT === "shrink") {
        dot.style.transform = "scale(7)";
        dot.style.opacity = "0.15";
        void wrap.offsetWidth;
        nextFrame(() => {
          dot.style.transition =
            "transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease-out";
          dot.style.transform = "scale(1)";
          dot.style.opacity = "1";
        });
      }

      if (VARIANT === "burst") {
        dot.style.transform = "scale(0)";
        sparks.forEach((s) => {
          s.style.opacity = "1";
        });
        void wrap.offsetWidth;
        nextFrame(() => {
          dot.style.transition =
            "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)";
          dot.style.transform = "scale(1)";
          sparks.forEach((s, i) => {
            const angle = (i / SPARK_COUNT) * Math.PI * 2;
            s.style.transition =
              "transform 600ms ease-out, opacity 600ms ease-out";
            s.style.transform = `translate(${Math.round(Math.cos(angle) * 30)}px, ${Math.round(Math.sin(angle) * 30)}px)`;
            s.style.opacity = "0";
          });
        });
      }
    };

    // Dot melts into a [data-cursor-merge] element at the point where it
    // entered; the element's orange fill then expands from that exact point
    // (CSS clip-path in globals.css) until the whole shape is one.
    const setOrigin = (el: HTMLElement, x: number, y: number) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${x - r.left}px`);
      el.style.setProperty("--my", `${y - r.top}px`);
    };

    const mergeInto = (el: HTMLElement, x: number, y: number) => {
      merged = el;
      setOrigin(el, x, y);
      el.setAttribute("data-cursor-merged", "");
      // dot stays at the entry point and dissolves into the growing fill
      tgt.x = x;
      tgt.y = y;
      // hide the dot instantly (no scale-up) so no orange leaks outside the shape
      dot.style.transition = "opacity 70ms linear";
      dot.style.transform = "scale(1)";
      dot.style.opacity = "0";
    };

    const unmerge = (x: number, y: number) => {
      if (merged) {
        setOrigin(merged, x, y); // fill shrinks back toward the exit point
        merged.removeAttribute("data-cursor-merged");
      }
      merged = null;
      cur.x = x;
      cur.y = y;
      tgt.x = x;
      tgt.y = y;
      place(x, y);
      dot.style.transition =
        "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 200ms ease-out";
      dot.style.transform = "scale(1)";
      dot.style.opacity = "1";
    };

    const hide = () => {
      visible = false;
      reset();
      wrap.style.display = "none";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!visible) {
        play(e.clientX, e.clientY);
        return;
      }
      if (follows) {
        const el = (e.target as Element | null)?.closest?.(
          "[data-cursor-merge]",
        ) as HTMLElement | null;
        if (el) {
          if (el !== merged) mergeInto(el, e.clientX, e.clientY);
        } else if (merged) {
          unmerge(e.clientX, e.clientY);
        } else {
          tgt.x = e.clientX;
          tgt.y = e.clientY;
        }
      } else {
        place(e.clientX, e.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", hide);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", hide);
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(loopFrame);
    };
  }, [isIntroComplete]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{ display: "none" }}
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-2.5 w-2.5"
    >
      <div
        ref={ringRef}
        className="absolute inset-0 rounded-full border border-[#FA4F01] opacity-0"
      />

      {Array.from({ length: SPARK_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            sparkRefs.current[i] = el;
          }}
          className="absolute left-[3.5px] top-[3.5px] h-[3px] w-[3px] rounded-full bg-[#FA4F01] opacity-0"
        />
      ))}

      <div
        ref={dotRef}
        className="absolute inset-0 rounded-full bg-[#FA4F01]"
      />
    </div>
  );
}