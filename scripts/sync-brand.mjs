#!/usr/bin/env node
/**
 * Copy official brand package into public/ so the browser can load original files.
 * Source: urthstudiobrandingpackage/
 * Served as: /urthstudiobrandingpackage/...
 *
 * Run: npm run sync:brand
 */
import { cpSync, existsSync, rmSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";

const root = process.cwd();
const src = join(root, "urthstudiobrandingpackage");
const dest = join(root, "public/urthstudiobrandingpackage");

if (!existsSync(src)) {
  console.error("Missing source:", src);
  process.exit(1);
}

rmSync(dest, { recursive: true, force: true });
mkdirSync(join(root, "public"), { recursive: true });

try {
  execSync(
    `rsync -a --exclude '.DS_Store' --exclude '*.pdf' --exclude '*.zip' "${src}/" "${dest}/"`,
    { stdio: "inherit" },
  );
} catch {
  cpSync(src, dest, {
    recursive: true,
    filter: (name) =>
      !name.endsWith(".DS_Store") &&
      !name.endsWith(".pdf") &&
      !name.endsWith(".zip"),
  });
}

const faviconSrc = join(
  dest,
  "URTH LOGO PACKAGE/BRANDMARK/URTH_BRANDMARK BOLD ORANGE.svg",
);
if (existsSync(faviconSrc)) {
  cpSync(faviconSrc, join(root, "public/favicon.svg"));
}

// Crop primary logo square padding so the mark fills the frame in header/footer
const primaryDir = join(dest, "URTH LOGO PACKAGE/PRIMARY LOGO");
if (existsSync(primaryDir)) {
  const vb = 'viewBox="178 132 210 300"';
  for (const name of readdirSync(primaryDir)) {
    if (!name.endsWith(".svg") || !name.startsWith("URTH_PRIMARY")) continue;
    const file = join(primaryDir, name);
    const svg = readFileSync(file, "utf8").replace(/viewBox="[^"]+"/, vb);
    writeFileSync(file, svg);
  }
}

console.log("Official logos available at /urthstudiobrandingpackage/URTH LOGO PACKAGE/...");
