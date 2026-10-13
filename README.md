# Project Rasengan Wiki

A fan-made community wiki for Project Rasengan, the official NARUTO franchise revival initiative covering anime, manga, card game, and mobile game projects.

## Tech Stack

- Next.js (App Router)
- next-intl (i18n: en / ja / es / fr)
- Tailwind CSS
- MDX content pages

## Getting Started

``powershell
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
``

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

`
site/
├── content/           # MDX wiki pages (45 pages × 4 locales)
│   ├── en/
│   ├── ja/
│   ├── es/
│   └── fr/
├── public/
│   ├── images/rasengan/   # Official visual assets
│   └── videos/            # Local video files
├── src/
│   ├── app/[locale]/      # Pages and layouts
│   ├── components/        # Shared UI components
│   ├── config/            # Navigation config
│   ├── i18n/              # i18n routing
│   └── locales/           # UI translation JSON files
└── package.json
`

## Deployment

The site is configured for Vercel deployment with NEXT_PUBLIC_SITE_URL=https://project-rasengan-wiki.vercel.app.

For GitHub Pages or other static hosting, update src/app/sitemap.ts and src/app/robots.ts with your actual domain.

## Content Guidelines

- All content uses only confirmed official information
- Unannounced dates/details are marked as TBA
- No fabricated codes, stats, or links
