import type { Metadata } from "next";
import { Syne, Figtree } from "next/font/google";
import { NavProvider } from "@/components/providers/nav-provider";
import { HomepageIntroProvider } from "@/components/providers/homepage-intro-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { SiteHeader } from "@/components/layout/site-header";
import { OverlayMenu } from "@/components/layout/overlay-menu";
import { SiteFooter } from "@/components/layout/site-footer";
import { LogoIntro } from "@/components/ui/logo-intro";
import { DotCursor } from "@/components/ui/dot-cursor";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "URTH — Design Beyond",
    template: "%s · URTH",
  },
  description:
    "URTH is an architecture and interior design practice shaped by people, place and the rhythms of everyday life.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "URTH — Design Beyond",
    description:
      "Between Earth and Sky, Everything Is Orange. Architecture and interiors with intention.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} min-h-screen bg-brown text-cream antialiased`}
      >
        <HomepageIntroProvider>
          <DotCursor />
          <LogoIntro />
          <NavProvider>
            <SmoothScroll>
              <SiteHeader />
              <OverlayMenu />
              <main>{children}</main>
              <SiteFooter />
            </SmoothScroll>
          </NavProvider>
        </HomepageIntroProvider>
      </body>
    </html>
  );
}