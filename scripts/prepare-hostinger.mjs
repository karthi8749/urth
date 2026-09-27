import { cpSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outDir = join(root, "out");

if (!existsSync(outDir)) {
  console.error("out/ not found — run next build first");
  process.exit(1);
}

// Copy PHP contact endpoint into the static export
const apiOut = join(outDir, "api");
mkdirSync(apiOut, { recursive: true });
cpSync(join(root, "api/contact.php"), join(apiOut, "contact.php"));

// Hostinger / Apache helpers
const htaccess = `# URTH — Hostinger static + PHP
Options -Indexes

# Serve PHP for contact form
<IfModule mod_rewrite.c>
  RewriteEngine On

  # Force HTTPS (uncomment on live domain)
  # RewriteCond %{HTTPS} off
  # RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Prefer trailing-slash directories (Next static export)
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_URI} !(.*)/$
  RewriteCond %{REQUEST_URI} !\\.[a-zA-Z0-9]{2,5}$
  RewriteRule ^(.*)$ /$1/ [L,R=301]
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/svg+xml "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/webp "access plus 1 month"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>
`;

writeFileSync(join(outDir, ".htaccess"), htaccess);

console.log("Hostinger package ready in out/");
console.log("  - Static HTML/CSS/JS");
console.log("  - api/contact.php");
console.log("  - .htaccess");
