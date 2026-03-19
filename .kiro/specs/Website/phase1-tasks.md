# Phase 1 MVP — Implementation Tasks

All pre-development decisions are complete. These are the coding tasks to build and launch the myAdmin promotional website.

Reference: wireframes in `.kiro/specs/Website/wireframes/`, brand assets in `.kiro/specs/Common/visual foundation/`

---

## 1. Project Scaffolding

**Priority**: 🔴 First  
**Estimated effort**: 2-3 hours  
**Depends on**: Nothing

- [x] Initialize Next.js 14+ project with App Router (`npx create-next-app@latest`)
- [x] Install and configure Tailwind CSS with brand theme:
  - Colors: Deep Blue `#1E3A8A`, Brand Blue `#2563EB`, Brand Teal `#0D9488`, Deep Slate `#0F172A`, Off-white `#F8FAFC`
  - Fonts: heading font + body font (Google Fonts, per brand guide)
- [x] Install and configure `next-intl` for i18n (App Router integration)
  - Path-based routing: `/nl/`, `/en/`
  - Default locale: `nl`
  - Fallback chain: active → EN → NL → key name
- [x] Create translation file structure: `messages/nl.json`, `messages/en.json`
- [x] Set up folder structure per shared-layout wireframe:
  ```
  app/
  ├── [locale]/
  │   ├── layout.tsx
  │   ├── page.tsx            (homepage)
  │   ├── pricing/page.tsx
  │   ├── signup/page.tsx
  │   ├── privacy/page.tsx
  │   ├── terms/page.tsx
  │   └── not-found.tsx
  components/
  ├── layout/
  ├── sections/
  └── ui/
  ```
- [x] Add favicon and Open Graph image from brand assets
- [x] Configure `next.config.js` for Amplify deployment (output settings)
- [x] Verify Amplify auto-build succeeds with placeholder page
- [x] Push to GitHub, confirm Amplify deploys to `myadmin.jabaki.nl`

**Output**: Working Next.js project deployed on Amplify with placeholder page visible at `myadmin.jabaki.nl`

---

## 2. Shared Layout Components

**Priority**: 🔴 Second  
**Estimated effort**: 4-6 hours  
**Depends on**: Task 1
**Wireframe**: `wireframes/shared-layout.md`

- [x] `components/ui/Container.tsx` — max-w-7xl centered wrapper
- [x] `components/ui/Button.tsx` — primary (solid), secondary (outline), text variants
- [x] `components/layout/Header.tsx` — sticky nav bar
  - Logo (links to homepage)
  - Nav links: Features (scroll anchor), Pricing (route), FAQ (scroll anchor)
  - Blog link (hidden until Phase 2)
  - Language dropdown (NL + EN active, DE/FR/ES/IT/PT shown as "coming soon")
  - CTA button: "Start Free Trial" → `/signup`
  - Scroll shadow on scroll-down
- [x] `components/layout/MobileDrawer.tsx` — slide-out hamburger menu
  - Slide from right, backdrop overlay
  - Full-width nav links, language selector, CTA button
  - Focus trap, close on Escape
- [x] `components/layout/LanguageDropdown.tsx` — shared between header + footer
  - Flag emoji + native language name
  - Active language checkmark
  - "Coming soon" languages disabled
  - Updates URL path prefix + locale cookie
- [x] `components/layout/Footer.tsx` — dark footer
  - White logo variant + tagline
  - 4-column link grid (Product, Company, Legal, Connect)
  - Bottom bar: copyright + language dropdown
  - Responsive: 4-col → 2×2 → stacked
- [x] Skip-to-content link (accessibility)
- [x] Wire layout into `app/[locale]/layout.tsx`

**Output**: Header + footer visible on all pages, responsive across breakpoints, language switching works

---

## 3. Homepage

**Priority**: 🔴 Third  
**Estimated effort**: 8-12 hours  
**Depends on**: Task 2
**Wireframe**: `wireframes/homepage.md`

Build each section as a separate component in `components/sections/`:

- [x] `HeroSection.tsx`
  - Two-column: text left (55%), image/illustration right (45%)
  - H1: "Manage your rentals. Optimize your pricing. Handle your taxes. All in one platform."
  - Sub-headline, primary CTA (Start Free Trial), secondary CTA (Watch Demo or See Features)
  - Trust signal line
  - Platform logos row (Airbnb, Booking.com, Rabobank, ING, Belastingdienst) — grayscale
  - Mobile: stacked, text first
- [x] `ProblemSolutionSection.tsx`
  - Before/After two-column comparison
  - Before: chaotic flow diagram + pain point bullets (muted tones)
  - After: clean unified diagram + benefit bullets (brand colors)
  - Mobile: stacked vertically
- [x] `FeatureShowcase.tsx`
  - Three tabs: STR Analytics, Financial Administration, Integrated Platform
  - Tab content: feature checklist left, screenshot/mockup right
  - Mobile: horizontal scroll tabs, stacked content
- [x] `SocialProofSection.tsx`
  - Launch with metrics bar only (testimonials deferred)
  - 4 metrics: Automated invoice processing, Streamlined financial workflows, Simplified tax compliance, Built by financial pros
  - Mobile: 2×2 grid
- [x] `PricingSection.tsx` (homepage version — compact)
  - Monthly/Annual toggle
  - 3 pricing cards (Starter €49, Professional €99, Enterprise custom)
  - Professional card elevated with "Most Popular" badge
  - Trust line: "2-month free trial · No credit card required · Cancel anytime"
  - Mobile: stacked, Professional first
- [x] `IntegrationShowcase.tsx`
  - 3 categories: Booking Platforms, Financial Services, Tax & Compliance
  - Logos grayscale, color on hover
  - "Coming soon" badges where applicable
- [x] `FAQSection.tsx`
  - Accordion component (one open at a time)
  - 8 FAQ items from wireframe
  - "Still have questions? Contact Us" link
  - Max-width centered
- [x] `CTABanner.tsx`
  - Deep Blue background, white text
  - H2 + CTA button (inverted colors)
  - Mobile: stacked centered
- [x] Wire all sections into `app/[locale]/page.tsx`
- [x] Add all homepage text to `messages/nl.json` and `messages/en.json`

**Output**: Full homepage with all 8 sections + CTA banner, bilingual, responsive

---

## 4. Pricing Page

**Priority**: 🟡 After homepage  
**Estimated effort**: 4-6 hours  
**Depends on**: Task 3 (reuses PricingSection, FAQSection, CTABanner)
**Wireframe**: `wireframes/pricing.md`

- [x] Page header with H1 + monthly/annual toggle
- [x] Pricing cards (reuse/extend from homepage, with more detail)
- [x] Add-ons section (4 cards: extra properties, additional users, advanced analytics, accountant access)
- [x] Feature comparison table
  - Full table: STR Analytics, Financial, Tax Compliance, Platform, Support categories
  - ✓/— indicators per plan
  - Professional column highlighted
  - Mobile: horizontal scroll with sticky first column
- [x] Value proposition strip (4 icons: no hidden fees, scale as you grow, bank-level security, cancel anytime)
- [x] Pricing FAQ (9 items, accordion, first item expanded by default)
- [x] CTA banner (reuse component)
- [x] Add all pricing page text to translation files
- [x] SEO: page title, meta description, structured data (`Product` schema)

**Output**: Dedicated pricing page with comparison table, add-ons, FAQ, bilingual

---

## 5. Trial Signup Page

**Priority**: 🟡 After pricing  
**Estimated effort**: 6-8 hours  
**Depends on**: Task 2
**Wireframe**: `wireframes/trial-signup.md`

- [x] Signup form (right column):
  - Required: first name, last name, email, password, terms checkbox
  - Optional: company name, property range (dropdown), referral source (dropdown)
  - Password: show/hide toggle, strength indicator
  - Inline validation on blur
  - Honeypot field for bot detection
  - CSRF token
- [x] Value props (left column):
  - Benefit checklist with brand-teal checkmarks
  - Trust signal + platform logos
- [x] Form submission:
  - Read .kiro\specs\Website\backendApiReference.md
  - POST to `/api/signup` (connect when backend ready)
  - For now: show success state with mock response
  - Handle error states: email exists (409), validation error (422), rate limit (429)
- [x] Email verification page (`/signup/verify`):
  - "Check your inbox" message with user's email
  - Resend button with 60s cooldown
  - Spam folder hint
- [x] Confirmation page (`/signup/confirm`):
  - "You're all set!" with 3 quick-start steps
  - CTA: "Go to Dashboard"
  - Auto-redirect countdown (5s)
- [x] Social signup buttons (Google, Microsoft) — UI only, wire up later
- [x] Add all signup text to translation files
- [x] SEO: noindex meta tag
- [x] GA4: form field focus events, submission attempt, successful signup (conversion)

**Output**: Complete signup flow (form → verification → confirmation), bilingual, responsive

---

## 6. Legal Pages

**Priority**: 🟡 Before launch  
**Estimated effort**: 4-6 hours  
**Depends on**: Task 2
**Wireframes**: `wireframes/privacy-policy.md`, `wireframes/terms-of-service.md`

- [x] Privacy Policy page (`/privacy`):
  - Sticky sidebar TOC (desktop), collapsible dropdown (mobile)
  - 10 content sections per wireframe
  - Data tables (data collected, cookies, third-party services, storage/retention)
  - GDPR rights as visual cards (6 rights)
  - "Manage cookie preferences" button (opens consent modal)
  - Scrollspy highlights active section in sidebar
- [x] Terms of Service page (`/terms`):
  - Same sidebar TOC pattern as privacy page
  - 15 content sections per wireframe
  - Plan comparison table in section 4
  - Liability section with warning background styling
  - All Dutch law references included
- [x] Add all legal text to translation files (NL + EN)
- [x] Link from footer (Privacy, Terms) and signup form checkbox

**Output**: Privacy policy + terms pages, bilingual, with sidebar navigation

---

## 7. Cookie Consent

**Priority**: 🟡 Before launch  
**Estimated effort**: 3-4 hours  
**Depends on**: Task 2
**Wireframe**: `wireframes/privacy-policy.md` (section 4)

- [x] `components/CookieConsent.tsx` — banner + preferences modal
  - Banner: bottom of viewport, 3 buttons (Accept All, Reject All, Manage Preferences)
  - Preferences modal: Essential (locked on), Analytics (toggle), Marketing (toggle, future)
  - Minimized state: small cookie icon bottom-left to reopen
- [x] `hooks/useCookieConsent.ts` — reads/writes consent cookie
  - Cookie: `cookie_consent` with JSON value + timestamp
  - Duration: 1 year
- [x] `lib/analytics.ts` — conditional GA4 loader
  - Only load gtag.js if `consent.analytics === true`
  - Remove GA cookies if consent revoked
- [x] Wire into root layout (appears on every page)
- [x] GDPR compliant: opt-in model, no analytics before consent

**Output**: Cookie consent banner + preferences modal, GA4 conditionally loaded

---

## 8. GA4 Integration

**Priority**: 🟡 Before launch  
**Estimated effort**: 2-3 hours  
**Depends on**: Task 7

- [x] Set up GA4 property and get measurement ID
- [x] Integrate gtag.js via cookie consent system (only loads after consent)
- [x] Track events:
  - Page views (automatic)
  - Trial signup form submission (conversion event)
  - CTA button clicks (hero, pricing, nav)
  - Pricing toggle (monthly ↔ annual)
  - FAQ accordion opens
  - Language switcher usage
  - Scroll depth on homepage
- [x] Configure `NEXT_PUBLIC_GA_ID` environment variable in Amplify
- [ ] Test tracking in GA4 Realtime view

**Output**: GA4 tracking live with consent-gated analytics

---

## 9. SEO & Meta

**Priority**: 🟡 Before launch  
**Estimated effort**: 2-3 hours  
**Depends on**: Task 3

- [x] Configure `metadata` in Next.js for each page:
  - Homepage: title, description, Open Graph image, Twitter card
  - Pricing: title, description, Product structured data
  - Signup: noindex
  - Privacy/Terms: title, description
- [x] Add `robots.txt` and `sitemap.xml` (auto-generated or manual)
- [x] Add structured data (JSON-LD):
  - `Organization` schema (homepage)
  - `Product` schema with pricing offers (pricing page)
  - `FAQPage` schema (homepage FAQ, pricing FAQ)
- [x] Configure canonical URLs per locale (`/nl/`, `/en/`)
- [x] Add `hreflang` tags for NL + EN
- [ ] Verify with Google Search Console (after domain is live)

**Output**: SEO-optimized pages with structured data, sitemap, proper meta tags

---

## 10. Final QA & Launch

**Priority**: 🔴 Last  
**Estimated effort**: 4-6 hours  
**Depends on**: All above

- [ ] Cross-browser testing: Chrome, Firefox, Safari, Edge
- [ ] Responsive testing per mobile-responsive.md checklist:
  - iPhone SE (375px), iPhone 14 (390px), iPhone Pro Max (430px)
  - iPad (768px), iPad landscape (1024px)
  - Desktop 1280px, 1440px+
- [ ] Keyboard navigation test (all pages)
- [ ] Lighthouse audit: target 90+ on Performance, Accessibility, Best Practices, SEO (mobile)
- [ ] Core Web Vitals check: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] Verify all links work (internal + external)
- [ ] Verify language switching works on all pages
- [ ] Verify cookie consent blocks GA4 until accepted
- [ ] Verify signup form validation (all error states)
- [ ] Test on slow 3G (Chrome DevTools throttle)
- [ ] Final content review: NL + EN text accuracy
- [ ] Remove any placeholder/mock data
- [ ] Push to main → Amplify auto-deploys → verify `myadmin.jabaki.nl`

**Output**: Production-ready website live at `https://myadmin.jabaki.nl`

---

## Summary

| Task                   | Effort   | Depends on | Priority |
| ---------------------- | -------- | ---------- | -------- |
| 1. Project Scaffolding | 2-3 hrs  | —          | 🔴       |
| 2. Shared Layout       | 4-6 hrs  | 1          | 🔴       |
| 3. Homepage            | 8-12 hrs | 2          | 🔴       |
| 4. Pricing Page        | 4-6 hrs  | 3          | 🟡       |
| 5. Trial Signup        | 6-8 hrs  | 2          | 🟡       |
| 6. Legal Pages         | 4-6 hrs  | 2          | 🟡       |
| 7. Cookie Consent      | 3-4 hrs  | 2          | 🟡       |
| 8. GA4 Integration     | 2-3 hrs  | 7          | 🟡       |
| 9. SEO & Meta          | 2-3 hrs  | 3          | 🟡       |
| 10. Final QA & Launch  | 4-6 hrs  | All        | 🔴       |

**Total estimated effort: 40-58 hours**

Critical path: 1 → 2 → 3 → 10  
Parallel work after task 2: tasks 4-9 can be built in any order
