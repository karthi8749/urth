import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { ProjectImageCarousel } from "@/components/ui/project-image-carousel";
import { getProject, projects } from "@/content/projects";
import { withBasePath } from "@/lib/basePath";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.summary,
  };
}

const accents = {
  orange: "from-orange/50 via-brown to-ink",
  blue: "from-sky/40 via-brown to-ink",
  cream: "from-cream/30 via-brown to-ink",
};

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const projectGallery = {
    "bakery-cafe": {
      images: [
        "/project-images/BAKERY PROJECT/1.png",
        "/project-images/BAKERY PROJECT/2.png",
        "/project-images/BAKERY PROJECT/3.png",
        "/project-images/BAKERY PROJECT/4.png",
        "/project-images/BAKERY PROJECT/5.png",
      ],
      details: [
        { label: "Client", value: "B&M Hot Breads Pvt Ltd" },
        { label: "Location", value: "Dubai" },
        { label: "Year", value: "2024" },
        { label: "Size", value: "300 sqm" },
        { label: "Category", value: "Hospitality" },
        { label: "Service", value: "Design" },
      ],
    },
    "corporate-office": {
      images: [
        "/project-images/Contemporary Corporate Office/1.png",
        "/project-images/Contemporary Corporate Office/2.png",
        "/project-images/Contemporary Corporate Office/3.png",
        "/project-images/Contemporary Corporate Office/4.png",
        "/project-images/Contemporary Corporate Office/5.png",
        "/project-images/Contemporary Corporate Office/6.png",
      ],
      details: [
        { label: "Client", value: "Contemporary Office" },
        { label: "Location", value: "Dubai" },
        { label: "Year", value: "2025" },
        { label: "Size", value: "1250 sqmt" },
        { label: "Category", value: "Workplace" },
        { label: "Service", value: "Design" },
      ],
    },
    "healthcare-wayfinding": {
      images: [
        "/project-images/Patient-Centred Healthcare & Wayfinding Design/1.png",
        "/project-images/Patient-Centred Healthcare & Wayfinding Design/2.png",
        "/project-images/Patient-Centred Healthcare & Wayfinding Design/3.png",
        "/project-images/Patient-Centred Healthcare & Wayfinding Design/4.png",
        "/project-images/Patient-Centred Healthcare & Wayfinding Design/5.png",
        "/project-images/Patient-Centred Healthcare & Wayfinding Design/6.png",
      ],
      details: [
        { label: "Client", value: "Healthcare Group" },
        { label: "Location", value: "Abu Dhabi" },
        { label: "Year", value: "2014" },
        { label: "Size", value: "8200 sqmt" },
        { label: "Category", value: "Healthcare" },
        { label: "Service", value: "Design & Wayfinding" },
      ],
    },
    "fmcg-office": {
      images: [
        "/project-images/Brand-Led FMCG Office/1.png",
        "/project-images/Brand-Led FMCG Office/2.png",
        "/project-images/Brand-Led FMCG Office/3.png",
        "/project-images/Brand-Led FMCG Office/4.png",
        "/project-images/Brand-Led FMCG Office/5.png",
        "/project-images/Brand-Led FMCG Office/7.png",
        "/project-images/Brand-Led FMCG Office/8.png",
        "/project-images/Brand-Led FMCG Office/9.png",
        "/project-images/Brand-Led FMCG Office/10.png",
        "/project-images/Brand-Led FMCG Office/11.png",
        "/project-images/Brand-Led FMCG Office/12.png",
      ],
      details: [
        { label: "Client", value: "Brand-Led FMCG Office" },
        { label: "Location", value: "Dubai" },
        { label: "Year", value: "2022" },
        { label: "Size", value: "350 sqmt" },
        { label: "Category", value: "Workplace" },
        { label: "Service", value: "Design" },
      ],
    },
    "finance-hq": {
      images: [
        "/project-images/Finance HQ/1.png",
        "/project-images/Finance HQ/2.jpg",
        "/project-images/Finance HQ/3.png",
        "/project-images/Finance HQ/4.png",
        "/project-images/Finance HQ/5.png",
        "/project-images/Finance HQ/6.png",
        "/project-images/Finance HQ/7.png",
        "/project-images/Finance HQ/8.png",
        "/project-images/Finance HQ/9.png",
        "/project-images/Finance HQ/10.png",
        "/project-images/Finance HQ/11.png",
        "/project-images/Finance HQ/13.png",
        "/project-images/Finance HQ/14.png",
      ],
      details: [
        { label: "Client", value: "financial institution" },
        { label: "Location", value: "Abu Dhabi - UAE" },
        { label: "Year", value: "2023" },
        { label: "Size", value: "2500 sqmt" },
        { label: "Category", value: "Workplace" },
        { label: "Service", value: "Design" },
      ],
    },
    "contemporary-office-building": {
      images: [
        "/project-images/Contemporary Office Building/Abu_Dhabi_Commercial_Building_01.png",
        "/project-images/Contemporary Office Building/Abu_Dhabi_Commercial_Building_02.png",
        "/project-images/Contemporary Office Building/Abu_Dhabi_Commercial_Building_04.jpg",
        "/project-images/Contemporary Office Building/05.png",
        "/project-images/Contemporary Office Building/06.png",
      ],
      details: [
        { label: "Client", value: "financial institution" },
        { label: "Location", value: "Abu Dhabi - UAE" },
        { label: "Year", value: "2023" },
        { label: "Size", value: "2500 sqmt" },
        { label: "Category", value: "Workplace" },
        { label: "Service", value: "Design" },
      ],
    },
  } as const;

  const gallery = projectGallery[project.slug as keyof typeof projectGallery];
  
  const allProjects = [
    {
      slug: "bakery-cafe",
      image: "/project-images/BAKERY PROJECT/1.png",
      location: "DUBAI",
      title: "Bakery Project",
    },
    {
      slug: "corporate-office",
      image: "/project-images/Contemporary Corporate Office/1.png",
      location: "DUBAI",
      title: "Contemporary Corporate Office",
    },
    {
      slug: "healthcare-wayfinding",
      image: "/project-images/Patient-Centred Healthcare & Wayfinding Design/1.png",
      location: "ABU DHABI - UAE",
      title: "Patient-Centred Healthcare & Wayfinding Design",
    },
    {
      slug: "finance-hq",
      image: "/project-images/Finance HQ/1.png",
      location: "ABU DHABI - UAE",
      title: "Finance HQ",
    },
    {
      slug: "fmcg-office",
      image: "/project-images/Brand-Led FMCG Office/1.png",
      location: "DUBAI",
      title: "Brand-Led FMCG Office",
    },

        {
      slug: "contemporary-office-building",
      image: "/project-images/Contemporary Office Building/Abu_Dhabi_Commercial_Building_01.png",
      location: "ABU DHABI - UAE",
      title: "Contemporary Office Building",
    },
  ];

  // Filter out the current project and limit to 3
  const moreProjects = allProjects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);

  return (
    <article className="bg-brown pt-20 md:pt-24">
      <header className="relative">
        <div className="relative mx-auto max-w-[1200px] px-6 py-8 md:px-10 md:py-12">
          <Reveal>
            <div className="text-center">
              <h1 className="font-display text-4xl tracking-tight text-cream md:text-6xl">
                {project.title}
              </h1>
              {project.summary ? (
                <p className="mx-auto mt-6 max-w-2xl text-lg text-cream/65">
                  {project.summary}
                </p>
              ) : null}
            </div>
          </Reveal>

          {gallery && (
            <ProjectImageCarousel
              title={project.title}
              images={gallery.images}
              details={gallery.details}
            />
          )}
        </div>
      </header>

      <section className="mx-auto max-w-[800px] space-y-6 px-6 py-10 md:px-10 md:py-16" style={{ textAlign: "justify" }}>
        {project.body.map((para, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <p className="text-base leading-relaxed text-cream/70 md:text-lg">
              {para}
            </p>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto max-w-[1600px] px-6 py-10 md:px-10 md:py-16">
        <h2 className="mb-6 text-center font-display text-2xl tracking-[0.2em] text-cream md:text-3xl">
          MORE PROJECTS
        </h2>

        <div className="grid gap-8 md:grid-cols-3 md:gap-8">
          {moreProjects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group block"
            >
              <div className="overflow-hidden border border-cream/10 bg-ink/30 transition-opacity duration-300 group-hover:opacity-95">
                <img
                  src={withBasePath(p.image)}
                  alt={p.title}
                  className="h-[420px] w-full object-cover"
                />
              </div>

              <div className="mt-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.26em] text-sky/90 md:text-[11px]">
                    {p.location}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-cream md:text-3xl">
                    {p.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center md:justify-end">
          <ButtonLink href="/projects" showArrow={false}>
            MORE
          </ButtonLink>
        </div>
      </section>
    </article>
  );
}
