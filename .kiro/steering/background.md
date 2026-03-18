# myAdmin Website Project — Background & Guidelines

## Project Context

This is the **myAdmin-website** repository — a separate project from the main myAdmin application (React CRA + Flask). This repo contains the promotional/marketing website for myAdmin, an integrated platform for STR (Short-Term Rental) property managers that combines rental analytics with financial administration.

## Why a Separate Repo

- The website is a public-facing marketing site; the app is behind authentication
- Different release cycles: website copy/design changes shouldn't touch application code
- Different concerns: marketing/SEO vs application logic
- Keeps the myAdmin app repo clean and focused on the product

## What This Repo Contains

- Next.js website (SSR/SSG for SEO)
- Marketing pages: homepage, features, pricing, FAQ, blog
- Trial signup flow (redirects to the actual myAdmin app)
- Analytics integration (GA4)
- CMS integration for blog content (future)

## Tech Stack

- **Framework**: Next.js (SEO-friendly, React-based)
- **Styling**: Tailwind CSS
- **Hosting**: Frontend deployed via GitHub Actions; Backend hosted on AWS
- **CMS**: Headless CMS for blog (future phase)

## Product Positioning (from requirements spec)

myAdmin targets STR property managers (3-15 properties) who currently juggle multiple tools (PMS + accounting software + spreadsheets + tax advisor). The platform integrates everything: bookings flow into financials, financials flow into tax declarations.

- **Primary message**: "Manage your rentals. Optimize your pricing. Handle your taxes. All in one platform."
- **Key differentiator**: Integrated STR analytics AND financial administration — one platform replaces 3-4 tools
- **Target market**: Dutch STR property managers, primarily €200K-€2M annual revenue
- **Pricing tiers**: Starter (€49/mo, 1-3 properties), Professional (€99/mo, 4-15), Enterprise (custom, 16+)

## Website Structure

The site follows a conversion-focused structure:

1. Hero section with integrated platform messaging
2. Problem/solution section (multiple tools → one platform)
3. Feature showcase in tabs (STR Analytics, Financial Admin, Integrated Platform)
4. Social proof / testimonials
5. Pricing tiers
6. Integration showcase (Airbnb, Booking.com, Dutch banks, Belastingdienst)
7. FAQ (STR-specific)

## Implementation Phases

- **Phase 1 (MVP)**: Core pages, trial signup, basic SEO, GA4
- **Phase 2**: Blog, case studies, demo videos, email capture
- **Phase 3**: Conversion optimization, A/B testing, live chat
- **Phase 4**: Multi-language, partner program, community

## Visual & Media Creation

Images, visuals, and videos for the website are created using AI generation tools. When producing visual assets:

- **Primary tool**: Google AI Studio (Gemini) for image generation — use it for hero images, feature illustrations, dashboard mockups, and marketing visuals
- **Alternative tools**: Midjourney, DALL-E, or Canva AI for supplementary graphics when needed
- **Video**: Use AI video tools (Google Veo, Runway, or similar) for product demo animations and explainer clips
- **Workflow**:
  1. Write a detailed prompt describing the desired visual (include style, colors, composition, context)
  2. Generate multiple variations and pick the best fit
  3. Post-process in Canva or Figma if needed (cropping, text overlays, branding)
  4. Export in appropriate formats: WebP for web images, MP4 for video, SVG for icons/illustrations
- **Style guidelines**:
  - Clean, modern, professional look — consistent with SaaS marketing aesthetics
  - Use myAdmin brand colors and typography in overlays
  - Dashboard screenshots/mockups should look realistic but use placeholder data (no real customer info)
  - Prefer light backgrounds with subtle gradients for hero sections
- **Storage**: Keep source prompts and original generated files in a `/assets/source/` folder for reproducibility

## Source of Truth

Full requirements and messaging details live in the myAdmin app repo at `.kiro/specs/Website/SAAS_WEBSITE_REQUIREMENTS.md`. A copy is also maintained in this repo for reference.

## Key Reminders

- All website copy should reflect the "integrated platform" positioning (Option A from the spec)
- SEO is a first-class concern — use SSR/SSG, proper meta tags, structured data
- The site must support multiple European languages: Dutch and English at launch, with German, French, Spanish, Italian, and Portuguese planned
- GDPR compliance is required (cookie consent, privacy policy)
- Keep the brand voice: confident but approachable, data-driven but human
