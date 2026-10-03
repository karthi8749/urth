"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { projects } from "@/content/projects";
import { brandPatternSrc } from "@/lib/brand-assets";

gsap.registerPlugin(ScrollTrigger);

const accentBg: Record<string, string> = {
  orange: "rgba(250,79,1,0.18)",
  blue: "rgba(147,186,186,0.18)",
  cream: "rgba(255,237,227,0.12)",
};
const accentHex: Record<string, string> = {
  orange: "#fa4f01",
  blue: "#93baba",
  cream: "#ffede3",
};

const PEEK_X = 200;       // px offset per depth level
const PEEK_SCALE = 0.88;  // scale step per depth level

export function FeaturedProjects({ limit = 5 }: { limit?: number }) {
  const items = projects.slice(0, limit);
  const totalCards = items.length + 1; // Include the "More Projects" card
  const sectionRef = useRef<HTMLElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const animRefs = useRef<(HTMLDivElement | null)[]>(Array(totalCards).fill(null));
  const wrapRefs = useRef<(HTMLDivElement | null)[]>(Array(totalCards).fill(null));
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const animEls = animRefs.current.filter(Boolean) as HTMLDivElement[];
    const wrapEls = wrapRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!section || animEls.length === 0) return;

    const n = animEls.length;
    const PX_PER_STEP = 900; // scroll distance for moving ONE card

    // gsap.context tracks everything created inside, and ctx.revert()
    // cleans up ONLY this section (no more killing every ScrollTrigger).
    const ctx = gsap.context(() => {
      const updateZByScale = () => {
        animEls
          .map((el, i) => ({
            i,
            scale: (gsap.getProperty(el, "scale") as number) || 1,
          }))
          .sort((a, b) => a.scale - b.scale) // smallest first -> lowest z-index
          .forEach(({ i }, rank) => {
            wrapEls[i].style.zIndex = String(rank + 1);
          });
      };

      // Initial stacked state
      animEls.forEach((el, i) => {
        gsap.set(el, {
          x: i * PEEK_X,
          scale: Math.pow(PEEK_SCALE, i),
          transformOrigin: "center center",
          opacity: 1,
        });
      });
      updateZByScale();

      const tl = gsap.timeline({
        defaults: { duration: 1, ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${(n - 1) * PX_PER_STEP}`,
          pin: true,
          scrub: true, // Lenis already smooths the scroll; extra scrub lag
                       // made the REVERSE direction feel fast/jumpy
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: updateZByScale,
        },
      });

      // Each step is exactly 1 unit long and steps NEVER overlap, so every
      // card's start value is always well defined, forward or backward.
      for (let i = 0; i < n - 1; i++) {
        // card leaving
        tl.to(animEls[i], { x: "-150%", scale: 0.85 }, i);
        // next card comes to front
        tl.to(animEls[i + 1], { x: 0, scale: 1 }, i);
        // remaining cards shift one level forward
        for (let j = i + 2; j < n; j++) {
          const newDepth = j - (i + 1);
          tl.to(
            animEls[j],
            { x: newDepth * PEEK_X, scale: Math.pow(PEEK_SCALE, newDepth) },
            i
          );
        }
      }
    }, section);

    // Recalculate pin positions after fonts / images finish loading
    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      cancelled = true;
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink"
      style={{ minHeight: "100vh" }}
    >
      {/* Section header */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 pt-20 md:px-10 md:pt-28">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="text-lg uppercase tracking-[0.28em] text-sky md:text-xl">
              Our projects
            </p>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-cream md:text-5xl">
              Spaces with intention
            </h2>
          </Reveal>
        </div>
      </div>

      {/* Card deck */}
      <div
        ref={deckRef}
        className="relative w-full"
        style={{ height: "62vh" }}
      >
        {items.map((project, i) => (
          /*
           * OUTER wrap — only for CSS centering.
           * pointer-events: none so it never blocks clicks from other cards.
           * z-index is managed dynamically by GSAP onUpdate.
           */
          <div
            key={project.slug}
            ref={(el) => { if (el) wrapRefs.current[i] = el; }}
            className="absolute top-0"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(820px, 82vw)",
              aspectRatio: "2 / 1",
              pointerEvents: "none",
            }}
          >
            {/*
             * INNER animated div — GSAP moves this.
             * pointer-events: auto so the card itself is clickable.
             */}
            <div
              ref={(el) => { if (el) animRefs.current[i] = el; }}
              className="h-full w-full"
              style={{ willChange: "transform, opacity", pointerEvents: "auto" }}
            >
              <Link
                ref={(el) => { linkRefs.current[i] = el; }}
                href={`/projects/${project.slug}`}
                className="group block h-full w-full"
                tabIndex={0}
                aria-label={`Open ${project.title} project page`}
              >
                <div
                  className="relative h-full w-full overflow-hidden"
                  style={{
                    borderRadius: "6px",
                    background: `linear-gradient(135deg, ${accentBg[project.accent]}, rgba(26,18,16,0.95)), #1a1210`,
                    boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)",
                    backfaceVisibility: "hidden",
                    perspective: "1000px",
                  }}
                >
                  {/* Project Image */}
                  {project.featuredImage && (
                    <Image
                      src={project.featuredImage}
                      alt={project.title}
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-105"
                      style={{ pointerEvents: "none" }}
                      sizes="(max-width: 768px) 82vw, 820px"
                      priority={i === 0}
                    />
                  )}

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      pointerEvents: "none",
                      background:
                        "linear-gradient(to top, rgba(26,18,16,0.85) 0%, rgba(26,18,16,0.4) 40%, transparent 60%)",
                    }}
                  />

                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-0 h-full w-0.75"
                    style={{ pointerEvents: "none", backgroundColor: accentHex[project.accent] }}
                  />

                  {/* Text gradient */}
                  <div
                    className="absolute inset-0"
                    style={{
                      pointerEvents: "none",
                      background:
                        "linear-gradient(to right, rgba(26,18,16,0.88) 0%, rgba(26,18,16,0.45) 50%, transparent 100%)",
                    }}
                  />

                  {/* Text — bottom left */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10" style={{ pointerEvents: "none" }}>
                    <p
                      className="text-[10px] uppercase tracking-[0.3em]"
                      style={{ color: accentHex[project.accent], opacity: 0.9 }}
                    >
                      {project.location || ""}
                    </p>
                    <h3 className="mt-3 font-display text-2xl leading-tight text-cream transition-colors group-hover:text-orange md:text-3xl lg:text-4xl">
                      {project.title}&nbsp;
                      <span className="inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                        ↗
                      </span>
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}

        {/* More Projects Button Card */}
        <div
          ref={(el) => { if (el) wrapRefs.current[items.length] = el; }}
          className="absolute top-0"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(820px, 82vw)",
            aspectRatio: "2 / 1",
            pointerEvents: "none",
          }}
        >
          <div
            ref={(el) => { if (el) animRefs.current[items.length] = el; }}
            className="h-full w-full"
            style={{ willChange: "transform, opacity", pointerEvents: "auto" }}
          >
            <Link
              href="/projects"
              className="group block h-full w-full"
              tabIndex={0}
              aria-label="View all projects"
            >
              <div
                className="relative h-full w-full overflow-hidden flex items-center justify-center"
                style={{
                  borderRadius: "6px",
                  background: `linear-gradient(135deg, ${accentBg.orange}, rgba(26,18,16,0.95)), #1a1210`,
                  boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)",
                  backfaceVisibility: "hidden",
                  perspective: "1000px",
                }}
              >
                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-0 h-full w-0.75"
                  style={{ pointerEvents: "none", backgroundColor: accentHex.orange }}
                />

                {/* Center button text */}
                <div className="text-center" style={{ pointerEvents: "none" }}>
                  <p className="font-display text-4xl md:text-5xl lg:text-6xl text-cream transition-colors group-hover:text-orange">
                    More Projects
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-cream/60 mt-4">
                    Explore All
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-cream/30">
          <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
          <div className="h-8 w-px bg-cream/20" />
        </div>
      </div>
    </section>
  );
}
