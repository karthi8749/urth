import type { Metadata } from "next";
import { ExpertiseHorizontalScroll } from "@/components/sections/expertise-horizontal-scroll";
import { JourneyInteractive } from "@/components/sections/journey-interactive";
import { ScrollToHash } from "@/components/ui/scroll-to-hash";
import { expertiseIntro } from "@/content/expertise";

export const metadata: Metadata = {
  title: "Expertise",
  description: expertiseIntro,
};

export default function ExpertisePage() {
  return (
    <div className="bg-brown">
      <ScrollToHash />
      <JourneyInteractive />
      <ExpertiseHorizontalScroll />
    </div>
  );
}