import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { journeyIntro } from "@/content/journey";

export function JourneyTeaser() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-1">
          <div>
            <Reveal>
              <p className="text-lg uppercase tracking-[0.28em] text-sky md:text-xl">
                Your journey
              </p>
              <h2 className="mt-4 font-display text-3xl tracking-tight text-cream md:text-5xl">
                {journeyIntro.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg text-cream/80">
                {journeyIntro.lead}
              </p>
              <p className="mt-4 max-w-xl whitespace-pre-line text-sm leading-relaxed text-cream/50">
                {journeyIntro.body}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8">
                <ButtonLink href="/expertise#journey" variant="solid">
                  See the full process
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
