"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ButtonLink } from "@/components/ui/button-link";
import { brandPatternCssUrl } from "@/lib/brand-assets";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const bg = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        gsap.fromTo(
          "[data-hero-item]",
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.2,
          },
        );

        gsap.to(bg.current, {
          scale: 1.08,
          duration: 18,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
      } else {
        gsap.set("[data-hero-item]", { opacity: 1, y: 0 });
      }

      const onMove = (e: MouseEvent) => {
        if (prefersReduced || !bg.current) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        gsap.to(bg.current, {
          x,
          y,
          duration: 1.2,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-brown"
    >
      <div
        ref={bg}
        className="absolute inset-[-5%] will-change-transform"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#4a2a1a_0%,transparent_55%),radial-gradient(ellipse_at_80%_70%,#fa4f0122_0%,transparent_45%),linear-gradient(180deg,#1a1210_0%,#332727_55%,#1a1210_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `url(${brandPatternSrc("orange")})`,
            backgroundSize: "560px",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-brown via-brown/40 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-16 pt-32 md:px-10 md:pb-24">
        <div className="absolute top-[-130px] left-0 right-0">
          <p
            data-hero-item
            className="mb-6 text-center text-lg uppercase tracking-[0.32em] text-sky opacity-0 md:text-xl"
          >
            Design Beyond
          </p>
          <h1
            data-hero-item
            className="mx-auto max-w-5xl text-center font-display text-4xl leading-[1.05] tracking-tight text-cream opacity-0 sm:text-5xl md:text-7xl lg:text-[5.5rem]"
          >
            Between Earth and Sky
            <br />
            <span className="text-orange">Everything Is Orange</span>
          </h1>
        </div>
        <div data-hero-item className="mt-10 flex flex-wrap items-center justify-center gap-6 opacity-0">
        </div>
      </div>

      <div
        data-hero-item
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 opacity-0 md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.28em] text-cream/40">
          Scroll
        </span>
        <span className="h-10 w-px animate-pulse bg-cream/30" />
      </div>
    </section>
  );
}
