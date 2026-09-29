# PODBACKEND

An eight-page responsive Next.js website recreated from the supplied PODBACKEND visual references. The homepage header and footer are shared across every page.

## Run

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open http://localhost:3000. For a production build, run `npm run build`, then `npm start`.

On Windows, you can also open `Start Website.cmd` after installing Node.js. Keep its window open while viewing the website.

## Pages

- `/` — landing page
- `/services` — services and interactive service tabs
- `/about` — story, values, team and testimonials
- `/case-studies` — category filtering and seven individual story pages
- `/blog` — search, category filters, sorting and nine article pages
- `/free-podcast-course` — six written lessons, with local completion storage
- `/contact` — contact options, partner testimonial carousel and FAQs
- `/reviews` — 27 attributed industry review summaries with search, service filters, and original source links

## Implementation

Next.js App Router and TypeScript, React, Framer Motion, Lenis smooth scrolling, a custom pointer-responsive WebGL ribbon shader, Lucide icons, and responsive CSS. Reduced-motion preferences, keyboard navigation, modal focus management, semantic FAQ accordions, and accessible form labels are supported.

Photographs and branded mockups are individually generated, standalone assets inspired by the supplied references. The website uses full-frame WebP files in `public/assets/generated`, with no screenshot cropping or screenshot image dependencies. The original generated PNGs are supplied separately. Logos are standalone SVG vector recreations. Layout, typography, buttons, cards, controls, tables, and content are live HTML components. The generated photographs match the reference direction but are not pixel-identical copies.

## Forms and launch configuration

Contact and newsletter forms validate input on the server and persist submissions as newline-delimited JSON under `data/`. Set `PODBACKEND_DATA_DIR` to a private persistent writable folder on a Node hosting server. Do not put this folder in `public/`. No email is sent automatically. Serverless hosting requires replacing file storage with a durable database/provider before launch.

The WhatsApp and booking calls to action open the working contact form because no destination phone number or booking calendar was supplied. Real social-profile URLs, final legal policies, a privacy notice/retention policy, production spam protection, and email delivery should be configured for the operating business before launch.

The images contain sample brand claims, client metrics and testimonials; these have been reproduced as supplied visual content, not independently verified. Search indexing is disabled until those details are approved for public launch.

Each of the 18 podcast play buttons opens its own topic-matched episode, drawn from Masters of Scale, Social Media Marketing Podcast, AskPat 2.0, and Reimagine. Native audio controls stream the original public RSS recording directly from the publisher, with play/pause, seeking, volume, attribution, publication date, an error state, and a publisher-page link. No audio is downloaded or rehosted. See PODCASTS.md for all assignments. The free course remains six written lessons and exercises.

## Checks

```sh
npm run typecheck
npm run build
```

Production route and form checks are summarized in `VERIFICATION.md`.


## Reviews collection

The Reviews page summarizes public feedback about five other podcast service providers. It explicitly distinguishes these from PODBACKEND customer reviews. Every card links to its source and identifies whether it is a provider-published testimonial or a public Trustpilot review. No fabricated ratings, customer-verification badges, or reviewer portraits are used. Entries are editorial paraphrases; customer relationships and reported outcomes have not been independently verified. Edit src/components/review-data.ts to maintain the collection. Existing reference-design testimonials elsewhere remain sample content as described above.
