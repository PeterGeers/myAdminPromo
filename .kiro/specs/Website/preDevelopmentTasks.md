# Phase 1 MVP — Pre-Development Tasks

These items need to be resolved before (or during) development of the Phase 1 MVP website. Items 1-3 and 5-7 should be completed before coding starts. Items 4, 8, and 9 can be filled in during or after the build.

---

## 1. Brand Identity

**Priority**: 🔴 Before development  
**Status**: [ ] Not started

Define the visual foundation for the entire website.

- [x] Design or finalize the myAdmin logo (primary + icon variant)
      Design a modern, minimal logo for "myAdmin" — a SaaS platform for short-term rental property managers. The platform integrates rental analytics, financial administration, and tax compliance into one tool.
      Style: clean, professional, modern SaaS aesthetic. Think Stripe, Linear, or Notion-level simplicity.
      Colors: use a blue-to-teal gradient as the primary accent, with dark navy or charcoal for the text.
      The logo should work on both white and dark backgrounds.
      Include an icon/symbol that subtly conveys integration or bringing things together (e.g. connected nodes, overlapping shapes, a unified dashboard hint).
      The wordmark "myAdmin" should use a clean sans-serif font. The "my" part can be lighter weight or a different shade to create visual hierarchy.
      No clip art, no generic house icons, no overly complex illustrations.
      Output: logo on a white background, high resolution and logo on a black background
- [x] Define color palette (primary, secondary, accent, neutrals) — document as Tailwind theme values
- [x] Choose typography (heading + body fonts) — pick from Google Fonts for web performance
- [x] Create a mini brand guide (logo usage, spacing, color codes, font sizes)
- [x] Generate favicon and Open Graph image from the logo
- [x] Backgropunds removed of images

**Output**: Brand guide document + Tailwind theme config values

---

## 2. Wireframes / Page Layouts

**Priority**: 🔴 Before development  
**Status**: [ ] Not started

Translate the spec's content structure into actual page layouts.

- [x] Homepage wireframe (hero → problem/solution → features → social proof → pricing → integrations → FAQ → footer)
- [x] Pricing page wireframe (tier comparison, toggle monthly/annual, FAQ)
- [x] Trial signup page wireframe (form fields, flow, confirmation)
- [x] Shared layout: header navigation + footer
- [x] Mobile responsive considerations for each page

**Tools**: Figma, Excalidraw, or even pen & paper — just get the layout decisions made.  
**Output**: Wireframe images or Figma link

---

## 3. Trial Signup Flow

**Priority**: 🔴 Before development  
**Status**: [ ] Not started

Define exactly how the trial signup works end-to-end.

- [x] Decide what data to collect (name, email, company, number of properties?)  
       See: .kiro\specs\Website\wireframes\trial-signup.md
- [x] Where does the form submit to? (myAdmin backend API endpoint, or a third-party like Mailchimp/HubSpot?)
      Target: cognito user pool and myAdmin backend API endpoint
- [x] What happens after signup? (redirect to myAdmin app login? confirmation page? onboarding email?) onboarding e-mail cc peter@jabaki.nl
- [x] Is the myAdmin app ready to accept new trial signups via API?
      No not yet. If needed we have to create this. Parellel workstream.

### ⚠️ Backend Dependency: Trial Signup API (myAdmin App)

This is a parallel workstream in the myAdmin app repo (Flask backend). The website signup form cannot function without these endpoints.

**Phase 1 — Launch MVP (manual onboarding):**

1. Build `POST /api/signup` endpoint:
   - Validate input (see wireframe for field specs)
   - Create user in AWS Cognito user pool
   - Store signup request in `pending_signups` table (Railway DB)
   - Send verification email via AWS SES/SNS
   - Return 201 with userId
2. Build `POST /api/signup/verify` endpoint:
   - Validate email verification token from Cognito
   - Mark signup as verified in `pending_signups`
   - Notify admin (email to peter@jabaki.nl) that a new signup needs provisioning
   - Return redirect URL
3. Build `POST /api/signup/resend` endpoint:
   - Resend Cognito verification email
   - Rate limit: 1 per 60 seconds

At this stage, tenant provisioning is manual — you receive the notification and run a script or manually set up the tenant.

**Phase 2 — Automated provisioning (post-launch):**

1. Build a tenant provisioning service/script that:
   - Creates tenant schema/records in Railway DB
   - Sets up default configuration (trial plan, 2-month expiry)
   - Optionally creates Google Drive folder structure or S3 bucket
   - Sends welcome/onboarding email
2. Trigger provisioning automatically after email verification (background job or Cognito post-confirmation Lambda)
3. Build `pending_signups` → `tenants` promotion flow

**API contract**: See `.kiro/specs/Website/wireframes/trial-signup.md` for full request/response specs.

- [x] Define validation rules and error states
      See: .kiro\specs\Website\wireframes\trial-signup.md (Validation Rules & Error States section)
- [ ] Email confirmation / welcome email — who sends it?
      AWS SNS

**Output**: Signup flow diagram + API contract (endpoint, payload, response)
Your trial signup wireframe already has this documented for three endpoints: /api/signup (create account), /api/signup/verify (email verification), and /api/signup/resend (resend verification email). That's the contract the myAdmin backend needs to implement for the website to work.

---

## 4. GA4 Event Tracking Plan

**Priority**: 🟡 During development  
**Status**: [x] Defined

Define which user interactions to track beyond basic pageviews.

- [x] Trial signup form submission (conversion event)
- [x] CTA button clicks (hero CTA, pricing CTA, nav CTA)
- [x] Pricing tier toggle / selection
- [x] Demo video play (if video exists at launch)
- [x] FAQ accordion opens
- [x] Scroll depth on homepage
- [x] Outbound link clicks (to myAdmin app)
- [x] Language switcher usage

### Event Tracking Specification

All events use `gtag('event', ...)` and only fire when analytics consent is granted.

| Event Name             | Trigger                          | Parameters                                                                                 | Notes                              |
| ---------------------- | -------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------- |
| `sign_up_start`        | User focuses first form field    | `method: "email"`                                                                          | Funnel entry point                 |
| `sign_up_submit`       | Form submitted (before API call) | `method: "email"`                                                                          | Includes failed validations        |
| `sign_up_complete`     | API returns 201 success          | `method: "email"`                                                                          | 🔴 Primary conversion event        |
| `sign_up_verified`     | Email verification completed     | —                                                                                          | 🔴 Secondary conversion event      |
| `sign_up_social_click` | Google/Microsoft button clicked  | `method: "google" \| "microsoft"`                                                          | UI only at launch                  |
| `cta_click`            | Any CTA button clicked           | `location: "hero" \| "pricing" \| "nav" \| "cta_banner" \| "footer"`, `label: button text` |                                    |
| `pricing_toggle`       | Monthly/Annual toggle switched   | `value: "monthly" \| "annual"`                                                             |                                    |
| `pricing_tier_click`   | Plan CTA clicked                 | `tier: "starter" \| "professional" \| "enterprise"`, `billing: "monthly" \| "annual"`      |                                    |
| `video_play`           | Demo video play button clicked   | `video_title: string`                                                                      | Deferred if no video at launch     |
| `faq_open`             | FAQ accordion item expanded      | `question: first 50 chars of question`, `page: "home" \| "pricing"`                        |                                    |
| `scroll_depth`         | User scrolls past 25/50/75/100%  | `percent: 25 \| 50 \| 75 \| 100`, `page: path`                                             | Homepage only at launch            |
| `outbound_click`       | Click on link to myAdmin app     | `url: destination URL`                                                                     | app.myadmin.nl links               |
| `language_switch`      | Language changed via dropdown    | `from: "nl" \| "en"`, `to: "nl" \| "en"`                                                   |                                    |
| `cookie_consent`       | User makes consent choice        | `action: "accept_all" \| "reject_all" \| "custom"`, `analytics: true \| false`             | Fires before GA4 loads if rejected |

**GA4 Configuration:**

- Mark `sign_up_complete` and `sign_up_verified` as conversion events in GA4 Console
- Enable Enhanced Measurement for: page views, scrolls (disabled — custom), outbound clicks (disabled — custom), site search
- Data stream: Web, domain `myadmin.jabaki.nl`
- Data retention: 14 months
- IP anonymization: enabled (default in GA4)
- Google Signals: disabled (privacy)

**Implementation:**

- All events go through a `trackEvent(name, params)` wrapper in `lib/analytics.ts`
- The wrapper checks consent state before firing
- Events are typed with TypeScript for consistency

**Output**: Event tracking spreadsheet (above) — implement during Task 8 of phase1-tasks.md

---

What's still open before you can start building:

DNS configuration — you need to point myadmin.jabaki.nl to your hosting target. Where are you deploying the Next.js site? Vercel, GitHub Pages, AWS CloudFront? This takes 10 minutes once you decide.

Validation rules and error states for the signup form — the wireframe has the field specs but the exact validation rules (min lengths, regex patterns, error messages in NL + EN) need to be defined. I can generate these.

GA4 tracking plan — this can happen during development, not a blocker.

## 5. Domain & DNS

**Priority**: 🔴 Before development  
**Status**: [ ] Not started

Get the domain ready for deployment.

- [x] Decide on domain (e.g. myadmin.nl, getmyadmin.com, myadmin.io?)
      myadmin.jabaki.nl
- [x] Register domain if not already owned
- [x] Configure DNS for the hosting target — AWS Amplify
      **Hosting**: AWS Amplify (built-in Next.js support, git-based deployments)

      Setup steps:
      1. Create Amplify app in AWS Console:
         - Go to AWS Amplify → New app → Host web app
         - Connect your GitHub repo (myAdmin-website)
         - Select branch: main
         - Amplify auto-detects Next.js and configures build settings
         - Build command: npm run build / Output: .next
      2. Add custom domain in Amplify Console:
         - App settings → Domain management → Add domain
         - Enter: myadmin.jabaki.nl
         - Amplify provides CNAME records to add to your DNS
      3. Configure DNS at your domain registrar (where jabaki.nl is managed):
         - Add CNAME: myadmin.jabaki.nl → [amplify-value].amplifyapp.com
         - Add CNAME validation record for SSL verification
         - If using Route 53: Amplify can configure DNS automatically
      4. SSL: Amplify provisions via ACM automatically (free, auto-renewing)
      5. Verify: wait for DNS propagation (5-30 min), test https://myadmin.jabaki.nl

      Deployment flow: git push to main → Amplify builds → deploys to CDN → live

      Environment variables (Amplify Console → Environment variables):
      - NEXT_PUBLIC_GA_ID (GA4 measurement ID)
      - NEXT_PUBLIC_SITE_URL (https://myadmin.jabaki.nl)
      - NEXT_PUBLIC_API_URL (myAdmin backend API base URL)

- [x] Set up SSL certificate (usually automatic with hosting provider)
      Automatic via AWS Amplify + ACM
- [x] Decide on www vs non-www canonical
      Decision: myadmin.jabaki.nl (no www, subdomain of jabaki.nl)

**Output**: Domain registered, DNS configured, SSL active

---

## 6. Legal Pages (GDPR)

**Priority**: 🔴 Before development  
**Status**: [ ] Not started

Required for launch — especially in the Dutch/EU market.

- [x] Privacy Policy (data collection, cookies, third-party services, user rights)
      See .kiro\specs\Website\wireframes\privacy-policy.md
- [x] Terms of Service / Terms of Use
      See .kiro\specs\Website\wireframes\terms-of-service.md
- [x] Cookie consent banner implementation (opt-in for analytics/marketing cookies)
      See .kiro\specs\Website\wireframes\privacy-policy.md
- [x] Decide on cookie consent tool (e.g. Cookiebot, cookie-consent library, custom)
      Custom component (recommended):
      You already have the full wireframe spec for the banner and preferences modal
      It's roughly 100-150 lines of React: a banner component, a preferences modal, a cookie utility, and a conditional GA4 loader
      Full control over design — matches your Tailwind theme exactly
      Zero external dependencies, zero monthly cost, zero performance overhead
      Easy to extend later if you add marketing cookies in Phase 2/3
      The implementation is straightforward:
      CookieConsent.tsx — banner + preferences modal
      useCookieConsent.ts — hook that reads/writes the consent cookie
      analytics.ts — conditionally loads GA4 based on consent state
      Wire it into your root layout so it appears on every page
      When you get to the coding phase, this is maybe a half-day task.
- [x] Data processing details for trial signup (where is data stored, retention period)
      Database is stored in railway.com EU West (Amsterdam, Nederland) retention 1 year after contract closure with export of data understanding that the user has exported everything and holds the retention obligation themselves
      Login gegevens in aws cognito in EU-WEST-1. retention 1 year after contract closure
      Documents/Invocies will be stored on user/client owned storage: (google drives or s3 buckets Owned by user)

**Output**: Privacy policy page, terms page, cookie consent component

---

## 7. Bilingual Strategy

**Priority**: 🔴 Before development  
**Status**: [ ] Not started

Dutch + English is required — but the approach affects the entire project structure.

- [x] Decide: launch bilingual from day one, or English-first with Dutch added later?
      Decision: NL and English in version 1
- [x] Choose i18n approach: path-based (`/nl/`, `/en/`) or subdomain (`nl.myadmin.com`)?
      Decision: Choose i18n approach: path-based (`/nl/`, `/en/`)
- [x] Set up Next.js internationalization config (next-intl, next-i18next, or built-in i18n routing)
      Decision: next-intl
- [x] Define default locale and fallback behavior
      NL
- [x] Decide who translates: manual translation, AI-assisted, or professional service?
      Decision: AI assisted
- [x] Create translation file structure (JSON/YAML per locale)
      Decision: JSON  
       messages/
      nl.json ← all Dutch translations
      en.json ← all English translations

**Output**: i18n architecture decision + initial translation files for homepage

---

## 8. Testimonials & Social Proof

**Priority**: 🟢 Can launch without, add later  
**Status**: [ ] Not started

The spec has placeholder quotes. Real ones are better but not a blocker.

- [ ] Reach out to existing myAdmin users for testimonials
- [ ] Collect: name, role, number of properties, quote, photo (optional)
- [ ] If no real testimonials yet: launch with success metrics only ("Automated invoice processing", "Simplified tax compliance") or skip the section
- [ ] Plan a post-launch process to collect testimonials (in-app prompt, email request)

**Decision**: Defer testimonials to post-launch. Launch with success metrics only.  
**Early adopter incentive**: First 10 customers receive 50% discount on their first year. In exchange, request a testimonial + permission to feature them on the website after 3 months of usage.

**Output**: Success metrics section at launch → real testimonials added post-launch via early adopter program
Decision to defer. Award for first 10 customers 50% discount for first year

---

## 9. Demo Video

**Priority**: 🟢 Can launch without, add later  
**Status**: [ ] Not started

"Watch 2-Minute Demo" is a hero CTA — it needs to go somewhere.

- [ ] Decide: create video before launch, or swap CTA for something else initially?
- [ ] If creating: write a script/storyboard (2 min max)
- [ ] Record or generate using AI video tools (see Visual & Media Creation guidelines in background.md)
- [ ] Options: screen recording of the app, animated explainer, or AI-generated product walkthrough
- [ ] Host on YouTube (SEO benefit) and embed on site
- [ ] If deferring: replace hero secondary CTA with "See Features" or "How It Works" scroll link

**Output**: 2-minute demo video uploaded to YouTube, or alternative CTA decision

Good question. Here's how AI can realistically help with each part of the demo video:

Script/storyboard — AI can write this entirely. You describe your app's key flows (connect Airbnb → see bookings → view financials → file taxes) and a tool like ChatGPT/Claude writes a 2-minute narration script with scene descriptions and timing. This is the easy part.

Voiceover — AI text-to-speech tools like ElevenLabs, Google Cloud TTS, or even the built-in voices in video editors can generate a professional-sounding narration in Dutch and English. No need to record yourself.

The actual video — this is where it gets nuanced. You have three realistic options:

Screen recording with AI polish (recommended). Record yourself clicking through the real myAdmin app (or a staging version with placeholder data). Then use AI video tools (like Runway, Descript, or CapCut) to clean it up: smooth transitions, zoom into key areas, add text overlays, background music. This gives you the most authentic result because people want to see the real product.

Animated explainer. Tools like Synthesia (AI avatar presenter), HeyGen, or D-ID can generate a talking-head presenter explaining the product while you show screenshots/mockups. Good if the app isn't fully polished yet. The AI generates the presenter, you supply the visuals.

Fully AI-generated product walkthrough. Google Veo, Runway Gen-3, or Pika can generate short video clips from text prompts. But honestly, for a SaaS product demo, these aren't great yet. They can't accurately show your specific UI. They're better for abstract/lifestyle B-roll clips (person working at laptop, property management vibes) that you'd splice between real screenshots.

The practical approach for myAdmin:

Write the script with AI
Screen-record the real app flows
Use Descript or CapCut to edit (auto-remove silences, add captions, transitions)
Generate voiceover with ElevenLabs
Add AI-generated B-roll for the intro/outro if you want polish
Upload to YouTube, embed on site
If the app isn't ready for screen recording yet, defer the video and swap the hero CTA to "See Features ↓" (scroll link to the feature showcase section). That's a perfectly fine launch strategy — many SaaS sites launch without a demo video.
