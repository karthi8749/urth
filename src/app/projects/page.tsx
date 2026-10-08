import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/content/projects";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected architecture and interior work by URTH Studio.",
};

const accents = {
  orange: "from-orange/40 to-brown",
  blue: "from-sky/35 to-brown",
  cream: "from-cream/25 to-brown",
};

export default function ProjectsPage() {
  return (
    <div className="bg-ink pt-28 md:pt-36">
      <section className="mx-auto max-w-[1600px] px-6 pb-16 md:px-10">
        <Reveal>
          <p className="text-lg uppercase tracking-[0.28em] text-sky md:text-xl">
            Projects
          </p>
          <h1 className="mt-4 font-display text-4xl tracking-tight text-cream md:text-6xl">
            Work shaped by place
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-28 md:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.08}>
              <Link
                href={`/projects/${project.slug}`}
                data-cursor-merge="text"
                className="group block overflow-hidden"
              >
                <div
                  className={cn(
                    "relative aspect-[16/11] overflow-hidden bg-gradient-to-br",
                    accents[project.accent],
                  )}
                >
                  {/* Project image */}
                  {project.featuredImage && (
                    <Image
                      src={project.featuredImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                  {/* Dark overlay so text stays legible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brown/90 via-brown/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <h2 className="font-display text-2xl text-cream transition-colors group-hover:text-orange md:text-3xl">
                      {project.title}
                    </h2>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
