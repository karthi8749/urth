import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { aboutIntro } from "@/content/about";

export function WhoWeAre() {
  return (
    <section className="relative overflow-hidden bg-brown py-24 md:py-36">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffede3 1px, transparent 1px), linear-gradient(to bottom, #ffede3 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative mx-auto max-w-[1100px] px-6 text-center md:px-10">
        <Reveal>
          <p className="text-lg uppercase tracking-[0.28em] text-sky md:text-xl">
            Who we are
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-3xl leading-tight tracking-tight text-cream md:text-5xl lg:text-6xl">
            {aboutIntro}
          </h2>
        </Reveal>
        <Reveal delay={0.2} className="mt-12 flex justify-center">
          <ButtonLink href="/about">Dive In</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
