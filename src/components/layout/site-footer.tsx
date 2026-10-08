import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button-link";
import { navLinks } from "@/content/nav";
import { brandPatternCssUrl } from "@/lib/brand-assets";

export function SiteFooter() {
  return (
    <footer
      className="relative overflow-hidden bg-brown"
      style={{
        backgroundImage: `url(${brandPatternCssUrl("orange")})`,
        backgroundSize: "562px",
        backgroundPosition: "center center",
        backgroundRepeat: "repeat",
      }}
    >
      {/* Darken overlay so pattern stays subtle */}
      <div className="pointer-events-none absolute inset-0 bg-brown/90" />

      <div className="relative mx-auto grid max-w-[1600px] md:grid-cols-3 border-t border-white/20">
        <div className="border-b border-white/20 md:border-b-0 md:border-r border-white/20 px-6 py-20 md:px-10 md:py-28">
          <h2 className="font-display text-4xl uppercase tracking-tight text-cream md:text-5xl">
            Let&apos;s make
            <br />
            something real
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/55">
            SPACES, THOUGHTFULLY DESIGNED
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/contact" variant="solid">
              Enquire Now
            </ButtonLink>
            <span className="inline-flex items-center gap-2 rounded-sm border border-cream/40 bg-transparent px-6 py-3 text-sm uppercase tracking-[0.18em] text-cream transition-colors">
              JOIN US
            </span>
          </div>
        </div>

        <div className="border-b border-white/20 md:border-b-0 md:border-r border-white/20 px-6 py-20 md:px-10 md:py-28">
          <p className="text-[11px] uppercase tracking-[0.22em] text-sky">
            Contact
          </p>
          <a
            href="mailto:Info@urthdesign.com"
            data-cursor-merge="text"
            className="mt-4 block text-cream transition-colors hover:text-orange"
          >
            Info@urthdesign.com
          </a>
          <p className="mt-3 text-sm text-cream/45">
            INDIA | MIDDLE EAST
          </p>

          <p className="mt-10 text-[11px] uppercase tracking-[0.22em] text-sky">
            Follow
          </p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-cream/70">
            <a href="#" data-cursor-merge="text" className="hover:text-orange">
              LinkedIn
            </a>
            <span className="text-cream/25">|</span>
            <a target="_blank" href="https://www.instagram.com/urth_made/" data-cursor-merge="text" className="hover:text-orange">
              Instagram
            </a>
          </div>
        </div>

        <div className="border-b border-white/20 md:border-b-0 px-6 py-20 md:px-10 md:py-28">
          <p className="text-[11px] uppercase tracking-[0.22em] text-sky">
            Quick Links
          </p>
          <ul className="mt-4 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
    <Link
      href={link.label === "Expertise" ? "/expertise#expertise" : link.href}
      data-cursor-merge="text"
      className="text-sm text-cream/70 transition-colors hover:text-orange"
    >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-[1600px] flex-col gap-4 border-t border-white/20 px-6 py-8 md:flex-row md:items-center md:justify-between md:gap-6 md:px-10">
        <Logo variant="primary" color="orange" className="h-20 w-auto md:h-24" />
        <p className="text-[11px] uppercase tracking-[0.18em] text-cream/35">
          © {new Date().getFullYear()} — URTH Studio
        </p>
      </div>
    </footer>
  );
}
