# Creative Tech Global Enterprise — Website Build Plan

Direction chosen: **Engineered editorial** — near-black foundation, white surface breaks, terracotta-flare accent (#ff4d00), Inter Tight display + Inter body + JetBrains Mono labels, hairline borders, numbered section markers, restrained motion.

## Pages

- `/` — Home: hero, intro ("We don't just create..."), Creative Tech Ecosystem diagram, service index, "A world of creative possibilities" mosaic, portfolio strip, From Idea to Reality, Creative Lab, trust section, testimonials placeholder, "What are you trying to create?" selector, CTA
- `/about` — Who We Are, Mission, Vision, Values, What We Believe, Creative Approach, Creativity + Technology
- `/services` and `/services/$slug` — full service index plus the Service Explorer detail view (what it is, who it's for, what we create, process, example project types, Start Project)
- `/portfolio` and `/portfolio/$slug` — filterable grid (All, Branding, Design, Print, Web, Writing, Film, Content, AI) with project detail view; all samples labelled CONCEPT PROJECT
- `/creative-hub` and `/creative-hub/$slug` — article index and article reader
- `/start-project` — full project request form
- `/contact` — "Let's Create Something Meaningful", contact form, contact placeholders, socials, Nigeria
- `/admin` — protected dashboard (login-gated) for inquiries, projects, articles
- `sitemap.xml` route + robots.txt

Shared: sticky nav with mobile drawer, premium footer, floating WhatsApp button, 404.

## Backend (Lovable Cloud)

Tables with RLS + grants:
- `projects` — title, slug, category, description, body, image_url, project_url, is_concept, published, sort, created_at. Public read of published rows; admin write.
- `articles` — title, slug, excerpt, content, image_url, category, published, created_at. Public read of published; admin write.
- `inquiries` — name, email, phone, company, service, description, budget, deadline, contact_method, status, created_at. Insert via a validated server function only; read/update restricted to admins.
- `user_roles` + `has_role()` security-definer function for the admin gate (roles never stored on profiles).

Seeded via migration: the concept projects and the Creative Hub starter articles so the site is populated on first load.

Form submission goes through a server function with Zod validation (length limits, email format), returning loading / success / error states.

## Content and honesty rules

- No invented clients, testimonials, statistics, prices, awards, offices, or years of experience.
- Testimonials component renders "Client testimonials will appear here." until real ones exist.
- Contact email, phone and WhatsApp render as bracketed placeholders from a single `src/config/site.ts` file (also holds social links and the prefilled WhatsApp message). You can paste the real details there any time — or send them to me and I'll drop them in.
- Trust section uses capability statements only (Creative Thinking, Modern Technology, Professional Execution, Multi-Disciplinary Services, Client-Focused Solutions, Continuous Innovation).

## Interactions

Ecosystem diagram: SVG hub-and-node graph, click/tap a node to reveal its services in an adjacent panel; keyboard accessible. Process: 5 stages with line-draw on scroll. Portfolio: client-side filtering, no reload. Service explorer: route-driven detail. Project selector: pick an outcome, get tailored copy plus a START THIS PROJECT link that pre-selects the service on the request form. All motion respects `prefers-reduced-motion`.

## Images

Generated locally into `src/assets` (branding, design, print, web, writing, film, photography, video, AI, technology) and imported as ES modules — no fragile remote URLs. Lazy-loaded below the fold, explicit dimensions, descriptive alt text. DB rows carry `image_url` so real work can replace them later.

## Technical notes

- Stack is TanStack Start + React + TypeScript + Tailwind v4 (this platform's stack, deployed through Lovable rather than Next.js/Vercel). Tokens go in `src/styles.css` as oklch semantic variables; fonts load via `<link>` in the root route.
- Per-route `head()` with unique title, description, og and twitter tags; canonical on leaves; Organization JSON-LD at root, Article/BreadcrumbList on detail routes.
- Semantic HTML, single H1 per page, focus states, labelled form fields.
- Route-level code splitting; mobile layouts designed separately, not shrunk.

## Delivery notes

At the end I'll document: replacing contact placeholders, replacing portfolio images and adding real projects/articles via the admin, admin access setup, publishing, and connecting a custom domain.
