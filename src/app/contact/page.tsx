import type { Metadata } from "next";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Say hello to URTH. Tell us what you have, what you need, and what is currently keeping you awake.",
};

export default function ContactPage() {
  return (
    <div className="bg-brown pt-28 md:pt-36">
      <section className="mx-auto max-w-[1600px] px-6 pb-28 md:px-10">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Reveal>
              <p className="text-lg uppercase tracking-[0.28em] text-sky md:text-xl">
                Contact
              </p>
              <h1 className="mt-4 font-display text-4xl tracking-tight text-cream md:text-6xl">
                Say hello
              </h1>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/55">
                No polished brief required. Tell us what you have, what you
                need, and what is currently keeping you awake.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-12 space-y-8">
              <div>
                <p className="text-lg uppercase tracking-[0.22em] text-sky md:text-xl">
                  Email
                </p>
                <a
                  href="mailto:hello@urth.studio"
                  className="mt-2 block text-cream hover:text-orange"
                >
                  hello@urth.studio
                </a>
              </div>
              <div>
                <p className="text-lg uppercase tracking-[0.22em] text-sky md:text-xl">
                  Studio
                </p>
                <p className="mt-2 text-cream/55">INDIA | MIDDLE EAST</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
