"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const expertiseData = [
  {
    number: "01",
    id: "architecture",
    title: "Architecture",
    description:
      "We design architecture that responds to its site, climate, context and the people who will use it. From planning and spatial flow to form, light and material, every element is shaped as part of one clear and purposeful idea.",
    image: "/images/expertise/Architecture.png",
  },
  {
    number: "02",
    id: "human-centric",
    title: "Human-Centric Design",
    description:
      "We design around the way people live, work and move through space. Every decision is guided by comfort, experience, function and a genuine understanding of human needs.",
    image: "/images/expertise/Human-Centric Design.png",
  },
  {
    number: "03",
    id: "interior",
    title: "Interior Design",
    description:
      "We approach architecture and interiors as one connected idea. Space, structure, material, light and detail are developed together to create a cohesive and considered environment.",
    image: "/images/expertise/Interior Design.png",
  },
  {
    number: "04",
    id: "management",
    title: "Design Management",
    description:
      "We guide the project from concept to completion, coordinating specialist consultants. Our role is to align technical inputs, timelines and design decisions while protecting the overall vision of the project.",
    image: "/images/expertise/Design Management.png",
  },
];

export function ExpertiseHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressDotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // gsap.matchMedia creates the animation only on desktop + motion allowed,
    // and REVERTS everything (including the pin-spacer div) on cleanup.
    // No more killing every ScrollTrigger on the page by hand.
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const items = itemsRef.current;
        const progressDots = progressDotsRef.current;

        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

        const updateProgressDot = (activeIndex: number) => {
          progressDots.forEach((dot, index) => {
            if (!dot) return;
            gsap.to(dot, {
              backgroundColor:
                index === activeIndex
                  ? "rgba(250, 79, 1, 0.8)"
                  : "rgba(255, 237, 227, 0.3)",
              scale: index === activeIndex ? 1.3 : 1,
              duration: 0.3,
            });
          });
        };

        const horizontalScroll = gsap.to(track, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
  trigger: container,
  pin: true,
  scrub: true,
  end: () => `+=${Math.abs(getScrollAmount()) * 0.5}`,
  invalidateOnRefresh: true,
  snap: {
    snapTo: 1 / (items.length - 1),
    directional: true,
    duration: { min: 0.3, max: 0.8 },
    delay: 0.05,
    ease: "power2.inOut",
  },
},
        });

        // ONE timeline per item (fade in -> fade out), scrubbed by the
        // horizontal scroll. A single timeline plays correctly in BOTH
        // directions; two separate tweens on the same properties did not.
        items.forEach((item, index) => {
          if (!item) return;

          const number = item.querySelector(".expertise-number");

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: item,
              containerAnimation: horizontalScroll,
              start: "left center",
              end: "right center",
              scrub: true,
              onToggle: (self) => {
                if (self.isActive) updateProgressDot(index);
              },
            },
          });

          // first half: coming into focus
          tl.fromTo(
            item,
            { opacity: 0.4, scale: 0.96 },
            { opacity: 1, scale: 1, duration: 1 }
          );
          if (number) {
            tl.fromTo(
              number,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
              0
            );
          }

          // second half: moving out of focus
          tl.to(item, { opacity: 0.4, scale: 0.96, duration: 1 });
        });
      }
    );

    // Page height above this section can change after fonts / images load,
    // so recalculate the pin positions once everything is ready.
    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      cancelled = true;
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return (
    <section
      id="expertise"
      ref={containerRef}
      className="expertise-scroll relative overflow-hidden bg-brown"
    >
      {/* Section title - visible at start */}
      <div className="pointer-events-none hidden md:absolute md:left-10 md:top-32 md:z-10 md:block">
        <p className="text-lg uppercase tracking-[0.28em] text-sky/80 md:text-xl">
          Expertise
        </p>
      </div>

      {/* Progress indicator */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3 md:bottom-12 md:flex">
        {expertiseData.map((item, index) => (
          <div
            key={item.number}
            className="flex items-center"
          >
            <div
              ref={(el) => {
                progressDotsRef.current[index] = el;
              }}
              className="expertise-dot h-1.5 w-1.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  index === 0 ? "rgba(250, 79, 1, 0.8)" : "rgba(255, 237, 227, 0.3)",
              }}
            />
            {index < expertiseData.length - 1 && (
              <div className="h-px w-12 bg-cream/10" />
            )}
          </div>
        ))}
      </div>

      {/* Horizontal scrolling track - desktop */}
      <div
        ref={trackRef}
        className="expertise-track hidden h-screen items-center will-change-transform md:flex"
      >
        {expertiseData.map((item, index) => (
          <div
            key={item.number}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            className="expertise-item flex h-screen shrink-0 translate-y-16 items-center gap-0 px-8 md:px-12 lg:px-16"
            style={{
              width: "100vw",
            }}
          >
            {/* Portrait Image Panel - Left Side */}
            <div className="relative h-[min(25rem,calc(100vh_-_20rem))] w-64 shrink-0 overflow-hidden md:h-[min(28.125rem,calc(100vh_-_20rem))] md:w-72 lg:h-[min(31.25rem,calc(100vh_-_20rem))] lg:w-80 xl:h-[min(34.375rem,calc(100vh_-_20rem))]">
              {/* Actual expertise image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 288px, 320px"
              />

              {/* Bottom-to-top fade for edge blending */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
                }}
              />

              {/* Number watermark */}
              <div className="absolute bottom-6 left-6">
                <span className="font-display text-7xl font-bold leading-none text-white/10 md:text-8xl">
                  {item.number}
                </span>
              </div>
            </div>

            {/* Content - Right Side */}
            <div className="relative flex-1 pl-8 text-center md:pl-12 lg:pl-16 xl:pl-20">
              <div className="max-w-2xl">
                {/* Number */}
                <div className="expertise-number mb-6 overflow-hidden">
                  <span className="font-display text-7xl font-light leading-none text-cream/20 md:text-8xl lg:text-9xl">
                    {item.number}
                  </span>
                </div>

                {/* Title */}
                <h2 className="mb-6 font-display text-4xl tracking-tight text-cream md:text-5xl lg:text-6xl">
                  {item.title}
                </h2>

                {/* Description */}
                <p className="text-base leading-relaxed text-cream/70 md:text-lg lg:text-xl" style={{ textAlign: "justify" }}>
                  {item.description}
                </p>

                {/* Orange accent */}
                <div className="mt-8 h-0.5 w-12 bg-orange opacity-80" />
              </div>
            </div>
          </div>
        ))}
      </div>

        {/* Mobile vertical layout */}
        <div className="block md:hidden">
          <div className="px-6 pb-8 pt-28">
            <p className="text-lg uppercase tracking-[0.28em] text-sky">
              Expertise
            </p>
          </div>
          {expertiseData.map((item) => (
          <div
            key={item.number}
            id={item.id}
            className="scroll-mt-28 border-b border-cream/10"
          >
            {/* Portrait Image - Mobile */}
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]">
              {/* Actual expertise image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="100vw"
              />

              {/* Bottom-to-top fade */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
                }}
              />

              {/* Number watermark */}
              <div className="absolute bottom-4 left-6">
                <span className="font-display text-7xl font-bold leading-none text-white/10">
                  {item.number}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-12">
              {/* Number */}
              <div className="mb-4">
                <span className="font-display text-5xl font-light leading-none text-orange">
                  {item.number}
                </span>
              </div>

              {/* Title */}
              <h2 className="mb-4 font-display text-3xl tracking-tight text-cream">
                {item.title}
              </h2>

              {/* Description */}
              <p className="text-base leading-relaxed text-cream/70" style={{ textAlign: "justify" }}>
                {item.description}
              </p>

              {/* Orange accent */}
              <div className="mt-6 h-0.5 w-12 bg-orange opacity-80" />
            </div>
          </div>
        ))}
      </div>

      {/* Reduced motion fallback styles */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .expertise-track {
            display: block;
            height: auto;
          }
          .expertise-item {
            width: 100%;
            max-width: 900px;
            margin: 0 auto;
            padding: 4rem 1.5rem;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
