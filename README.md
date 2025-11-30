# puma
Puma Jobs is a prototype job portal for South Africa: `pumajob.co.za`.

This repository contains a mobile-first Next.js prototype with:

- Public job listings and job detail pages (fast, low-res images for cards)
- Admin backoffice to post/manage jobs, categories, provinces, and AdSense snippets
- Ad slots with stored ad snippets (admin editable)
- A CV upload endpoint that calls an AI (OpenAI) to tailor a candidate's CV to a job (placeholder integration)
- Simple JSON-based datastore under `data/` for prototyping

See `SETUP` for how to run locally and `NOTES` for SEO, Adsense and deployment recommendations.

## SETUP

1. Install dependencies:

```bash
cd /workspaces/puma
npm install
```

2. Create environment variables (for local development):

```bash
export ADMIN_PASSWORD="your-admin-password"
export OPENAI_API_KEY="sk-..." # optional, for CV tailoring
```

3. Run the dev server:

```bash
npm run dev
```

The site runs on `http://localhost:3000`.

## NOTES & NEXT STEPS

- This is a prototype focused on functionality and SEO-friendly server-rendered pages.
- Data is stored in `data/` JSON files for simplicity. For production, migrate to a real database (Postgres/SQLite + ORM).
- CV tailoring endpoint expects a plain text CV for prototype. For PDF/DOCX support add parsing (e.g. `pdf-parse` or `mammoth`) and consider virus-scanning and size limits.
- Ads: Admin can paste AdSense snippets in the Admin dashboard. Ad code will be rendered as-is on the site — ensure you follow AdSense placement rules.
- Images: job cards use a small thumbnail URL. For automatic thumbnails and better performance, add server-side resizing (e.g. `sharp`) or host thumbnails on a CDN.
- SEO: pages are standard HTML and support crawlers. Add meta tags, sitemaps, OpenGraph tags, and structured data (JobPosting schema) for better search results.

## Example AdSense snippets

Use the scripts/snippets you were provided by Google AdSense. Example (in-article):

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9847321075142960"
	crossorigin="anonymous"></script>
<ins class="adsbygoogle"
	style="display:block; text-align:center;"
	data-ad-layout="in-article"
	data-ad-format="fluid"
	data-ad-client="ca-pub-9847321075142960"
	data-ad-slot="6521724398"></ins>
<script>
	(adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

Paste ad snippets into Admin → Manage Ads to show them on the public pages.

