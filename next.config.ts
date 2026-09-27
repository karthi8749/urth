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
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  // Exposed to both server and client bundles so the custom image loader
  // (and any plain <img> tag using withBasePath()) knows the prefix.
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? repoBasePath : "",
  },
  turbopack: {
    root: path.join(__dirname),
  },
  ...(isGithubPages && {
    basePath: repoBasePath,
    assetPrefix: repoBasePath,
  }),
};

export default nextConfig;
