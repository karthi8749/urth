"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useNav } from "@/components/providers/nav-provider";
import { expertiseSubLinks, navLinks } from "@/content/nav";
import { brandPatternSrc } from "@/lib/brand-assets";
import { cn } from "@/lib/utils";

export function OverlayMenu() {
  const { open, setOpen } = useNav();
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 bg-brown"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="absolute inset-0 opacity-[0.07]">
            <div
              className="h-full w-full bg-repeat"
              style={{
                backgroundImage: `url(${brandPatternSrc("orange")})`,
                backgroundSize: "420px",
              }}
            />
          </div>

          <div className="relative mx-auto flex h-full max-w-[1600px] flex-col px-6 pb-16 pt-28 md:px-10 lg:flex-row lg:items-center lg:gap-16">
            <nav className="flex-1">
              <ul className="space-y-1 md:space-y-2">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.05, duration: 0.45 }}
                    >
                      <Link
                        href={link.href}
                        data-cursor-merge="text"
                        onClick={() => setOpen(false)}
                        className={cn(
                          "group flex items-baseline gap-4 text-4xl font-light uppercase tracking-[-0.02em] text-cream transition-colors md:text-6xl lg:text-7xl",
                          active ? "text-orange" : "hover:text-orange",
                        )}
                      >
                        <span className="text-[0.35em] text-sky/70">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <motion.div
              className="mt-12 border-t border-cream/15 pt-10 lg:mt-0 lg:w-[340px] lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.45 }}
            >
              <p className="mb-6 text-[11px] uppercase tracking-[0.22em] text-sky">
                Expertise
              </p>
              <ul className="space-y-4">
                {expertiseSubLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      data-cursor-merge="text"
                      onClick={() => setOpen(false)}
                      className="text-sm text-cream/70 transition-colors hover:text-orange"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mt-12 text-[11px] uppercase tracking-[0.22em] text-sky">
                Design Beyond
              </p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/55">
                Between Earth and Sky, Everything Is Orange.
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
