import type { Metadata } from "next";
import { aboutIntro } from "@/content/about";
import AboutPageClient from "./about-client";

export const metadata: Metadata = {
  title: "About Us",
  description: aboutIntro,
};

export default function AboutPage() {
  return <AboutPageClient />;
}
