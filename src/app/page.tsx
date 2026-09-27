"use client";

import { Hero } from "@/components/sections/hero";
import { WhoWeAre } from "@/components/sections/who-we-are";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { JourneyTeaser } from "@/components/sections/journey-teaser";
import { ExpertisePreview } from "@/components/sections/expertise-preview";
import { useIntro } from "@/components/providers/homepage-intro-provider";

export default function HomePage() {
  const { isIntroComplete } = useIntro();

  return (
    <div
      className="transition-opacity duration-500"
      style={{ opacity: isIntroComplete ? 1 : 0 }}
    >
      <Hero />
      <WhoWeAre />
      <FeaturedProjects limit={3} />
      <JourneyTeaser />
      <ExpertisePreview />
    </div>
  );
}
