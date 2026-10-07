"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ButtonLink } from "@/components/ui/button-link";
import { expertisePillars } from "@/content/expertise";

const pillarImage: Record<string, string> = {
  architecture: "/images/expertise/Architecture.png",
  "human-centric": "/images/expertise/Human-Centric Design.png",
  interior: "/images/expertise/Interior Design.png",
  management: "/images/expertise/Design Management.png",
};

function ExpertiseCard({
  pillar,
  index,
  scrollYProgress,
  hovered,
  setHovered,
}: {
  pillar: (typeof expertisePillars)[number];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  hovered: number | null;
  setHovered: (i: number | null) => void;
}) {
  const img = pillarImage[pillar.id];
  const isHovered = hovered === index;
  const isDimmed = hovered !== null && hovered !== index;

  // Scroll-linked entrance: slides up from below the viewport into the grid.
  const startScroll = index * 0.1;
  const endScroll = startScroll + 0.25;
  const y = useTransform(scrollYProgress, [startScroll, endScroll], ["100vh", "0vh"]);

  return (
    <motion.div style={{ y }}>
      <Link
        href={`/expertise#${pillar.id}`}
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        onFocus={() => setHovered(index)}
        onBlur={() => setHovered(null)}
        className="relative block overflow-hidden"
        style={{
          aspectRatio: "3 / 4",
          border: "1px solid rgba(255,255,255,0.15)",
          transform: isHovered ? "scale(1.25)" : "scale(1)",
          zIndex: isHovered ? 10 : 1,
          filter: isDimmed ? "brightness(0.5)" : "brightness(1)",
          transition: "transform 700ms ease-out, filter 700ms ease-out, z-index 0s",
        }}
      >
        {/* Image */}
        {img && (
          <Image
            src={img}
            alt={pillar.title}
            fill
            className="object-cover"
            style={{
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              transition: "transform 700ms ease-out",
            }}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}

        {/* Gradient Overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 45%, transparent 100%)",
          }}
        />

        {/* Number — top left */}
        <div className="absolute left-5 top-5">
          <span
            className="font-display text-xs tracking-[0.2em]"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 z-10 p-5 md:p-6">
          <h3
            className="font-display text-xl leading-snug md:text-2xl"
            style={{
              color: isHovered ? "var(--orange)" : "var(--cream)",
              transition: "color 300ms ease-out",
            }}
          >
            {pillar.title}
          </h3>
          <span
            className="mt-2 block text-xs uppercase tracking-[0.2em]"
            style={{
              color: "rgba(255,255,255,0.55)",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 300ms ease-out",
            }}
          >
            Explore →
          </span>
        </div>

        {/* Highlight border */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            border: "1px solid rgba(255,255,255,0.35)",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 300ms ease-out",
          }}
        />
      </Link>
    </motion.div>
  );
}

export function ExpertisePreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  // Track scroll progress through the pinned section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 50vh", "start -50vh"]
  });

  return (
    // Height reduced to 200vh so there is zero delay/blank gap on scroll
    <section ref={containerRef} className="relative h-[200vh] bg-ink">
      {/* Sticky Viewport */}
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-10">
        <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">

          {/* Header */}
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.32em] text-sky md:text-sm">
              OUR EXPERTISE
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {expertisePillars.map((pillar, i) => (
              <ExpertiseCard
                key={pillar.id}
                pillar={pillar}
                index={i}
                scrollYProgress={scrollYProgress}
                hovered={hovered}
                setHovered={setHovered}
              />
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-10 text-center">
            <ButtonLink href="/expertise#expertise">
              Explore Expertise
            </ButtonLink>
          </div>

        </div>
      </div>
    </section>
  );
}
