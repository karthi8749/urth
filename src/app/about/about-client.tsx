"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/ui/reveal";
import { aboutIntro, aboutSections } from "@/content/about";

gsap.registerPlugin(ScrollTrigger);

const PEEK_X = 200;       // px offset per depth level
const PEEK_SCALE = 0.88;  // scale step per depth level

export default function AboutPageClient() {
  const sectionRef = useRef<HTMLElement>(null);
  const animRefs = useRef<(HTMLDivElement | null)[]>(Array(aboutSections.length).fill(null));
  const wrapRefs = useRef<(HTMLDivElement | null)[]>(Array(aboutSections.length).fill(null));

  useEffect(() => {
    const section = sectionRef.current;
    const animEls = animRefs.current.filter(Boolean) as HTMLDivElement[];
    const wrapEls = wrapRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!section || animEls.length === 0) return;

    const n = animEls.length;

    // Track which card is currently "active" (front/center)
    let activeIndex = 0;

    const updateZAndPointer = (frontIndex: number) => {
      wrapEls.forEach((wrap, i) => {
        // The front card gets the highest z-index
        // Cards behind get decreasing z-index
        const depth = i - frontIndex;
        if (depth < 0) {
          // Card has already exited — put it behind everything
          wrap.style.zIndex = "0";
        } else {
          wrap.style.zIndex = String(n - depth);
        }
      });
    };
    // Set initial stacked state
    animEls.forEach((el, i) => {
      gsap.set(el, {
        x: i * PEEK_X,
        scale: Math.pow(PEEK_SCALE, i),
        transformOrigin: "center center",
        opacity: 1,
      });
    });

    // Initial z-index: card 0 is front
    updateZAndPointer(0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${(n - 1) * 800}`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        fastScrollEnd: false,
        onUpdate: (self) => {
          // Determine which card should be "front" based on scroll progress
          const progress = self.progress;
          const stepSize = 1 / (n - 1);
          // frontIndex is the card currently animating into center
          const rawIndex = progress / stepSize;
          const newFront = Math.min(Math.round(rawIndex), n - 1);
          if (newFront !== activeIndex) {
            activeIndex = newFront;
            updateZAndPointer(activeIndex);
          }
        },
      },
    });

    for (let i = 0; i < n - 1; i++) {
      const stepStart = i / (n - 1);

      tl.to(animEls[i], {
        x: "-150%",
        scale: 0.85,
        opacity: 1,
        ease: "power2.inOut",
      }, stepStart);

      tl.to(animEls[i + 1], {
        x: 0,
        scale: 1,
        opacity: 1,
        ease: "power2.inOut",
      }, stepStart);

      for (let j = i + 2; j < n; j++) {
        const newDepth = j - (i + 1);
        tl.to(animEls[j], {
          x: newDepth * PEEK_X,
          scale: Math.pow(PEEK_SCALE, newDepth),
          opacity: 1,
          ease: "power2.inOut",
        }, stepStart);
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="bg-brown pt-28 md:pt-36">
      <section className="mx-auto max-w-[1100px] px-6 pb-16 text-center md:px-10 md:pb-20">
        <Reveal>
          <p className="text-lg uppercase tracking-[0.28em] text-sky md:text-xl">
            About Us
          </p>
          <h1 className="mt-6 font-display text-4xl tracking-tight text-cream md:text-6xl">
            {aboutIntro}
          </h1>
        </Reveal>
      </section>

      <section ref={sectionRef} className="relative overflow-hidden bg-brown" style={{ minHeight: "100vh" }}>
        <div className="relative w-full" style={{ height: "80vh" }}>
          {aboutSections.map((section, i) => (
            <div
              key={section.id}
              ref={(el) => { if (el) wrapRefs.current[i] = el; }}
              className="absolute top-0"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                width: "min(900px, 90vw)",
                height: "100%",
                pointerEvents: "none",
              }}
            >
              <div
                ref={(el) => { if (el) animRefs.current[i] = el; }}
                className="h-full w-full"
                style={{ willChange: "transform, opacity", pointerEvents: "auto" }}
              >
                <div
                  id={section.id}
                  className="relative h-full w-full overflow-hidden"
                  style={{
                    borderRadius: "6px",
                    background: "rgba(26,18,16,0.95)",
                    boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)",
                    backfaceVisibility: "hidden",
                    perspective: "1000px",
                  }}
                >
                  {/* Content */}
                  <div className="flex h-full flex-col items-center justify-center gap-8 p-8 md:flex-row md:gap-12 md:p-12">
                    <Reveal>
                      <div className="w-full max-w-[320px] overflow-hidden rounded-lg">
                        <Image
                          src={`/about-page-images/0${i + 1}.png`}
                          alt={section.label}
                          width={320}
                          height={320}
                          priority={i === 0}
                          className="h-auto w-full object-contain"
                          quality={90}
                        />
                      </div>
                    </Reveal>
                    <div className="flex max-w-md flex-col">
                      <Reveal>
                        <p className="font-display text-xl uppercase tracking-[0.22em] text-orange">
                          {section.label}
                        </p>
                        <p className="mt-2 text-[11px] text-cream/30">
                          {String(i + 1).padStart(2, "0")}
                        </p>
                      </Reveal>
                      <Reveal delay={0.1}>
                        <p className="mt-6 text-base leading-relaxed text-cream/75 md:text-lg" style={{ textAlign: "justify" }}>
                          {section.body}
                        </p>
                      </Reveal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-cream/30">
            <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
            <div className="h-8 w-px bg-cream/20" />
          </div>
        </div>
      </section>
    </div>
  );
}
