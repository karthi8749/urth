"use client";

import { useEffect, useState } from "react";

export function DotCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const hoverTargets = new WeakSet<Element>();
    const addHoverEvents = () => {
      const targetElements = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], .hover-target',
      );
      targetElements.forEach((el) => {
        if (hoverTargets.has(el)) return;
        hoverTargets.add(el);
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    addHoverEvents();

    const observer = new MutationObserver(addHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0px) translate(-50%, -50%) scale(${isHovered ? 2.2 : 1})`,
      }}
      className={`fixed top-0 left-0 z-[9999] h-2.5 w-2.5 rounded-full pointer-events-none mix-blend-difference transition-transform duration-100 ease-out ${
        isHovered ? "bg-white" : "bg-orange"
      }`}
    />
  );
}