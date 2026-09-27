```ts
import type { NextConfig } from "next";
import path from "path";

// GitHub Pages serves a project repo (not a *.github.io root repo) from
// https://<user>.github.io/<repo-name>/ — so every asset/link needs that
// repo name prefixed. This only applies when building for GitHub Pages
// (set by the GitHub Actions workflow below); a normal local/Hostinger
// build is unaffected and still serves from "/".
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoBasePath = "/urth";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.join(__dirname),
  },

  ...(isGithubPages && {
    basePath: repoBasePath,
    assetPrefix: repoBasePath,
  }),

  // Make sure static assets from the public folder
  // are exported correctly on GitHub Pages.
  ...(isGithubPages && {
    experimental: {
      optimizeCss: false,
    },
  }),
};

export default nextConfig;
```
