# URTH Studio Website

Premium architecture & interior design site for **URTH**.

## Stack

- Next.js 15 (static export) + React 19 + TypeScript
- Tailwind CSS v4
- GSAP + ScrollTrigger, Lenis, Framer Motion
- PHP contact mailer for Hostinger

## Develop

```bash
cd website
nvm use 20
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for Hostinger (static)

```bash
npm run build
```

This creates an `out/` folder with:

- All static HTML pages
- Assets (`_next/`, brand logos, etc.)
- `api/contact.php` (contact form)
- `.htaccess` (Apache / Hostinger)

### Upload

1. Edit `api/contact.php` — set `$to_email`, `$from_email`, and `$allowed_origins` (your live domain).
2. Run `npm run build`.
3. Upload **everything inside `out/`** to Hostinger `public_html` (File Manager or FTP).
4. Ensure PHP is enabled on the hosting plan (shared Hostinger plans support this).

Preview locally:

```bash
npx serve out
```

## Routes

| Path | Content |
|------|---------|
| `/` | Hero, Who we are, Projects, Journey teaser, Expertise |
| `/about/` | Who / Why / What |
| `/projects/` | Project index |
| `/projects/[slug]/` | Case study |
| `/expertise/` | Four pillars + Journey 0–7 |
| `/contact/` | Enquiry form → `api/contact.php` |

## Brand tokens

- Bold Orange `#fa4f01`
- Soft Cream `#ffede3`
- Cool Brown `#332727`
- Sky Blue `#93baba`

Logos & patterns live in `public/brand/`.

## Contact form

Form posts JSON to `/api/contact.php` (same domain after upload).

Before go-live, in `api/contact.php` (source) or `out/api/contact.php`:

- `$to_email` — inbox that receives enquiries
- `$from_email` — mailbox on your Hostinger domain
- `$allowed_origins` — e.g. `https://urth.studio`
