# Elevate Learning Site

Marketing site and insights hub for Elevate Learning.

This repository powers:

- the single-page marketing site at `/`
- the insights index at `/insights/`
- individual insight articles generated from Markdown content
- the Decap CMS admin at `/admin/`

## Stack

- Gatsby 5
- React 18
- Bootstrap 5 and Sass
- Markdown content via `gatsby-transformer-remark`
- Decap CMS with Cloudinary media uploads
- Netlify deploys, Netlify Forms, and reCAPTCHA
- Google Analytics 4 in production

## Prerequisites

- Node.js 22.x
- npm 10+
- Access to the relevant Cloudinary, Netlify, GA4, and reCAPTCHA settings if you need production-like integrations

`netlify.toml` pins the Netlify build image to Node 22, so matching that locally avoids version drift.

## Quick Start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create local environment file:

   ```bash
   cp .env.example .env.development
   ```

3. Fill in the required environment variables.

4. Start local development:

   ```bash
   npm run develop
   ```

5. Open:
   - site: `http://localhost:8000`
   - GraphQL playground: `http://localhost:8000/___graphql`
   - CMS: `http://localhost:8000/admin`

## Environment Variables

Copy `.env.example` to `.env.development` for local work and set the values below.

| Variable                | Required        | Used for                                                              |
| ----------------------- | --------------- | --------------------------------------------------------------------- |
| `CLOUDINARY_CLOUD_NAME` | Yes             | Cloudinary source plugin and CMS media handling                       |
| `CLOUDINARY_API_KEY`    | Yes             | Cloudinary API access during builds and CMS asset operations          |
| `CLOUDINARY_API_SECRET` | Yes             | Cloudinary API access during builds                                   |
| `GA4_TRACKING_ID`       | Production only | Enables `gatsby-plugin-google-gtag` when Netlify `CONTEXT=production` |
| `GATSBY_RECAPTCHA_KEY`  | Yes for forms   | Client-side reCAPTCHA on contact and infographic forms                |
| `SITE_RECAPTCHA_KEY`    | No              | Present in env template but not currently read by application code    |
| `SITE_RECAPTCHA_SECRET` | No              | Present in env template but not currently read by application code    |

Notes:

- Gatsby loads `.env.${NODE_ENV}` from `gatsby-config.js`.
- Only variables prefixed with `GATSBY_` are exposed to browser code.
- Netlify previews and branch deploys inject a public test reCAPTCHA key through `netlify.toml`.

## Scripts

| Command           | Purpose                                                 |
| ----------------- | ------------------------------------------------------- |
| `npm run develop` | Start Gatsby dev server with GraphQL Playground enabled |
| `npm run build`   | Create production build in `public/`                    |
| `npm run serve`   | Serve the built site locally                            |
| `npm run clean`   | Clear Gatsby caches and generated files                 |
| `npm run format`  | Run Prettier across JS, TS, JSON, and Markdown files    |
| `npm test`        | Placeholder script, currently exits with failure        |

## Content Workflow

Insight articles live under `content/insights/<slug>/index.md`.

Typical frontmatter:

```md
---
imageUrl: https://res.cloudinary.com/<cloud-name>/image/upload/...
featured: true
title: AI for Learning
date: 2023-02-03
description: Optional summary used for cards and SEO.
author: Lara Hilton
infographicPreviewUrl: https://res.cloudinary.com/<cloud-name>/image/upload/...
infographicUrl: https://res.cloudinary.com/<cloud-name>/raw/upload/...
---
```

Notes:

- `title`, `date`, and `author` are expected across the site and CMS workflow.
- `description` is optional but recommended for article cards and metadata.
- `imageUrl` and infographic assets are fetched as remote files during Gatsby builds.
- `infographicPreviewUrl` and `infographicUrl` power the gated infographic download CTA on article pages.

## CMS Workflow

The CMS is available at `/admin/`.

Current setup:

- backend: Netlify Git Gateway
- editorial flow: `editorial_workflow`
- local CMS backend: enabled
- media library: Cloudinary
- configured branch in `static/admin/config.yml`: `main`

For local CMS authoring, run the proxy server in a second terminal:

```bash
npx netlify-cms-proxy-server
```

## Deployment

Netlify is the expected deployment target.

- build command: `npm run build`
- publish directory: `public`
- Node version: `22`
- deploy previews and branch deploys: `X-Robots-Tag: noindex, nofollow`
- preview and branch deploys use a public Google reCAPTCHA test key

Production-only behavior:

- GA4 is enabled only when `CONTEXT=production`.
- Netlify Forms handle the contact form and infographic download form submissions.

## Project Structure

```text
.
├── content/insights/        # Markdown article content
├── src/components/          # Reusable UI blocks and forms
├── src/pages/               # Top-level routes
├── src/templates/           # Gatsby page templates for article pages
├── src/cms/                 # Decap CMS setup and preview templates
├── src/styles/              # Sass architecture and module styles
├── static/admin/config.yml  # CMS configuration
├── gatsby-config.js         # Site metadata and plugin configuration
├── gatsby-node.js           # Page creation and remote asset node wiring
└── netlify.toml             # Netlify build and deploy settings
```

## Troubleshooting

- If Gatsby schema or page data looks stale, run `npm run clean` and rebuild.
- If article images fail to resolve, verify the Cloudinary credentials and remote asset URLs.
- If the CMS loads but cannot save content locally, make sure `npx netlify-cms-proxy-server` is running.
- If forms render without a captcha, confirm `GATSBY_RECAPTCHA_KEY` is set in the active env file.

## Testing

The project does not have an automated test suite yet. Current verification is build-based:

```bash
npm run build
```

## License

This project is licensed under the MIT License. See `LICENSE`.
