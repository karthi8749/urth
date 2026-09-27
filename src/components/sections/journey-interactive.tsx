"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  journeyIntro,
  journeySteps,
  type JourneyStep,
} from "@/content/journey";
import { ButtonLink } from "@/components/ui/button-link";

const ease = [0.22, 1, 0.36, 1] as const;

// Each step alternates left / right column
const SIDE: ("left" | "right")[] = [
  "left",
  "right",
  "left",
  "right",
  "left",
  "right",
  "left",
  "right",
];

export function JourneyInteractive() {
  const [activeStep, setActiveStep] = useState(-1);
  const [locked, setLocked] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const nextStep = activeStep + 1;

  const handleClick = (index: number) => {
    if (locked) return;
    if (index !== nextStep) return;
    if (index >= journeySteps.length) return;

    setLocked(true);
    setActiveStep(index);

    // Once the card has appeared, put the card you just opened in the
    // CENTER of the screen so it can be read comfortably.
    setTimeout(() => {
      const target = document.getElementById(`journey-step-${index}`);
      if (target) {
        target.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "center",
        });
      }
    }, 550);

    setTimeout(() => {
      setLocked(false);
    }, 700);
  };

  // On reload, stop the browser from restoring an old scroll position
  // (which pushes the header out of view). Start from the top instead.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Don't reset to top when we arrived via a #hash link
    if (!window.location.hash) window.scrollTo(0, 0);
  }, []);

  return (
    <section
      id="journey"
      // overflow-anchor:none stops the browser from auto-jumping the scroll
      // position when content inside this section changes.
      className="relative scroll-mt-28 bg-brown py-24 [overflow-anchor:none] md:py-32"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        {/* Header */}
        <div className="mb-20 md:mb-32">
          <p className="text-lg uppercase tracking-[0.28em] text-sky md:text-xl">
            Your journey
          </p>

          <h2 className="mt-4 max-w-3xl font-display text-3xl tracking-tight text-cream md:text-5xl">
            {journeyIntro.title}
          </h2>

          <p className="mt-6 text-lg text-cream/80">{journeyIntro.lead}</p>

          <p className="mt-8 text-lg uppercase tracking-[0.22em] text-orange">
            {journeyIntro.prompt}
          </p>
        </div>

        {/* Desktop */}
        <div className="hidden lg:block">
          <DesktopJourney
            activeStep={activeStep}
            nextStep={nextStep}
            onNodeClick={handleClick}
            prefersReducedMotion={!!prefersReducedMotion}
          />
        </div>

        {/* Mobile */}
        <div className="block lg:hidden">
          <MobileJourney
            activeStep={activeStep}
            nextStep={nextStep}
            onNodeClick={handleClick}
            prefersReducedMotion={!!prefersReducedMotion}
          />
        </div>
      </div>
    </section>
  );
}

interface JourneyProps {
  activeStep: number;
  nextStep: number;
  onNodeClick: (index: number) => void;
  prefersReducedMotion: boolean;
}

// ─── Desktop ──────────────────────────────────────────────────────────────────
// KEY FIX: the card is ALWAYS rendered (so the row keeps its final height),
// but it is invisible + non-interactive until revealed. Only opacity/transform
// animate, so the page height never changes when a dot is clicked.

function DesktopJourney({
  activeStep,
  nextStep,
  onNodeClick,
  prefersReducedMotion,
}: JourneyProps) {
  return (
    <div className="relative">
      {/* Centre spine line (decorative) */}
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-cream/10" />

      {journeySteps.map((step, index) => {
        const side = SIDE[index % SIDE.length];
        const isRevealed = index <= activeStep;
        const isNext = index === nextStep;
        const isCompleted = index < activeStep;
        const isUpcoming = index > nextStep;

        return (
          <div
            key={index}
            id={`journey-step-${index}`}
            className={`relative flex scroll-mt-40 items-start gap-0 py-10 ${
              side === "right" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* ── Card side (50% width) ── */}
            <div className={`w-1/2 ${side === "left" ? "pr-20" : "pl-20"}`}>
              <motion.div
                initial={false}
                animate={{
                  opacity: isRevealed ? 1 : 0,
                  y: isRevealed ? 0 : 24,
                  x: isRevealed ? 0 : side === "left" ? -16 : 16,
                }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.55,
                  ease,
                }}
                style={{ pointerEvents: isRevealed ? "auto" : "none" }}
                aria-hidden={!isRevealed}
                // `inert` keeps hidden buttons/links out of tab order
                {...(!isRevealed ? { inert: true as unknown as undefined } : {})}
              >
                <StepCard
                  step={step}
                  revealed={isRevealed}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </motion.div>
            </div>

            {/* ── Node (sits on the spine) ── */}
            <div className="relative flex w-0 items-start justify-center">
              <Node
                index={index}
                isNext={isNext}
                isCompleted={isCompleted}
                isUpcoming={isUpcoming}
                isRevealed={isRevealed}
                onClick={() => onNodeClick(index)}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>

            {/* ── Empty opposite side ── */}
            <div className="w-1/2" />
          </div>
        );
      })}
    </div>
  );
}

// ─── Mobile ───────────────────────────────────────────────────────────────────

function MobileJourney({
  activeStep,
  nextStep,
  onNodeClick,
  prefersReducedMotion,
}: JourneyProps) {
  return (
    <div className="relative">
      {/* Spine */}
      <div className="absolute left-4 top-0 h-full w-px bg-cream/15" />

      {/* Orange progress */}
      <motion.div
        className="absolute left-4 top-0 w-px origin-top bg-orange"
        style={{ height: "100%" }}
        initial={{ scaleY: 0 }}
        animate={{
          scaleY:
            activeStep >= 0 ? (activeStep + 1) / journeySteps.length : 0,
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.7,
          ease,
        }}
      />

      <div className="space-y-10 pl-12">
        {journeySteps.map((step, index) => {
          const isRevealed = index <= activeStep;
          const isNext = index === nextStep;
          const isCompleted = index < activeStep;
          const isUpcoming = index > nextStep;

          return (
            <div
              key={index}
              id={`journey-step-${index}`}
              className="relative scroll-mt-28"
            >
              {/* Node on spine */}
              <div className="absolute -left-12 top-1">
                <Node
                  index={index}
                  isNext={isNext}
                  isCompleted={isCompleted}
                  isUpcoming={isUpcoming}
                  isRevealed={isRevealed}
                  onClick={() => onNodeClick(index)}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>

              {/* Step number always visible */}
              <p
                className={`mb-3 text-[11px] tracking-widest transition-colors duration-300 ${
                  isNext
                    ? "text-orange"
                    : isRevealed
                    ? "text-orange/60"
                    : "text-cream/25"
                }`}
              >
                {String(index).padStart(2, "0")}
              </p>

              {/* Card (mobile keeps the collapsing height so there is no big empty gap) */}
              {isRevealed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.45,
                    ease,
                  }}
                  className="overflow-hidden"
                >
                  <StepCard
                    step={step}
                    revealed={isRevealed}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Shared Node ──────────────────────────────────────────────────────────────

interface NodeProps {
  index: number;
  isNext: boolean;
  isCompleted: boolean;
  isUpcoming: boolean;
  isRevealed: boolean;
  onClick: () => void;
  prefersReducedMotion: boolean;
}

function Node({
  index,
  isNext,
  isCompleted,
  isUpcoming,
  isRevealed,
  onClick,
  prefersReducedMotion,
}: NodeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isNext}
      aria-label={`Step ${String(index).padStart(2, "0")}`}
      className="relative flex h-14 w-14 items-center justify-center disabled:cursor-default"
    >
      {/* Glow rings — only on next step */}
      {isNext && !prefersReducedMotion && (
        <>
          <motion.span
            className="absolute inset-0 rounded-full bg-orange"
            animate={{ scale: [1, 2.4], opacity: [0.4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          />

          <motion.span
            className="absolute inset-0 rounded-full bg-orange"
            animate={{ scale: [1, 1.8], opacity: [0.25, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.6,
            }}
          />
        </>
      )}

      {/* Core dot */}
      <motion.span
        className="block rounded-full"
        initial={false}
        animate={{
          width: isNext ? 22 : isRevealed ? 16 : isUpcoming ? 12 : 14,
          height: isNext ? 22 : isRevealed ? 16 : isUpcoming ? 12 : 14,
          backgroundColor: isNext || isRevealed ? "#fa4f01" : "transparent",
          opacity: isUpcoming ? 0.22 : 1,
          boxShadow: isNext ? "0 0 0 4px rgba(250,79,1,0.25)" : "none",
          borderWidth: isUpcoming ? "1.5px" : "0",
          borderColor: "rgba(255,237,227,0.3)",
        }}
        transition={{ duration: 0.3, ease }}
      />

      {/* Number label above */}
      <span className="pointer-events-none absolute -top-6 text-[10px] tracking-widest text-cream/40">
        {String(index).padStart(2, "0")}
      </span>
    </button>
  );
}

// ─── Shared Step Card ─────────────────────────────────────────────────────────

function StepCard({
  step,
  revealed,
  prefersReducedMotion,
}: {
  step: JourneyStep;
  revealed: boolean;
  prefersReducedMotion: boolean;
}) {
  const item = (delay: number) => ({
    initial: false as const,
    animate: { opacity: revealed ? 1 : 0, y: revealed ? 0 : 12 },
    transition: {
      delay: prefersReducedMotion || !revealed ? 0 : delay,
      duration: 0.4,
      ease,
    },
  });

  return (
    <div className="rounded-sm border border-cream/10 bg-ink p-8">
      <motion.p className="font-display text-5xl text-orange" {...item(0.08)}>
        {String(step.step).padStart(2, "0")}
      </motion.p>

      <motion.h3 className="mt-4 font-display text-2xl text-cream" {...item(0.18)}>
        {step.title}
      </motion.h3>

      <motion.p
        className="mt-4 whitespace-pre-line text-sm leading-relaxed text-cream/65"
        {...item(0.3)}
      >
        {step.body}
      </motion.p>

      {step.cta && (
        <motion.div className="mt-6" {...item(0.42)}>
          <ButtonLink href={step.cta.href} variant="solid">
            {step.cta.label}
          </ButtonLink>
        </motion.div>
      )}
    </div>
  );
}
