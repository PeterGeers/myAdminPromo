# Homepage Wireframe — myAdmin Website

This document describes the layout and content structure for each section of the homepage, top to bottom. Use this as the blueprint for development.

---

## Navigation Bar (sticky)

```
┌──────────────────────────────────────────────────────────────────────┐
│  [Logo]    Features   Pricing   FAQ   Blog    [🌐 NL ▾]  [Start Trial] │
└──────────────────────────────────────────────────────────────────────┘
                                                  │
                                          ┌───────┴───────┐
                                          │ 🇳🇱 Nederlands │
                                          │ 🇬🇧 English    │
                                          │ 🇩🇪 Deutsch    │
                                          │ 🇫🇷 Français   │
                                          │ 🇪🇸 Español    │
                                          │ 🇮🇹 Italiano   │
                                          │ 🇵🇹 Português  │
                                          └───────────────┘
```

- Logo links to homepage
- Nav links scroll to sections (Features, Pricing, FAQ) or route (Blog)
- Language selector: dropdown showing current language with flag + code, expands to list European languages
  - Launch with NL + EN active; other languages shown as "coming soon" (disabled/muted)
  - Each option shows flag emoji + native language name (e.g. "Deutsch", not "German")
  - Dropdown closes on selection or click-outside
  - Selected language persists via URL path prefix (`/nl/`, `/en/`, `/de/`, etc.) and cookie
  - Mobile: same dropdown, positioned in the hamburger drawer
- CTA button: "Start Free Trial" (brand-blue, solid)
- Sticky on scroll with subtle shadow
- Mobile: hamburger menu with slide-out drawer

---

## 1. Hero Section

Background: Off-white (#F8FAFC) with subtle gradient or light pattern

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ┌─────────────────────────┐  ┌──────────────────────────────────┐  │
│  │                         │  │                                  │  │
│  │  [Eyebrow tag]          │  │                                  │  │
│  │  "One platform for      │  │   [Hero image / illustration]   │  │
│  │   STR property managers" │  │   Animated dashboard showing    │  │
│  │                         │  │   bookings flowing into          │  │
```

│ │ H1: "Manage your │ │ financial reports │ │
│ │ rentals. Optimize your │ │ │ │
│ │ pricing. Handle your │ │ │ │
│ │ taxes. All in one │ │ │ │
│ │ platform." │ │ │ │
│ │ │ │ │ │
│ │ Sub: "myAdmin connects │ │ │ │
│ │ directly to Airbnb and │ └──────────────────────────────────┘ │
│ │ Booking.com, uses AI │ │
│ │ to maximize revenue, │ │
│ │ and handles your │ │
│ │ bookkeeping and tax │ │
│ │ declarations." │ │
│ │ │ │
│ │ [Start Free Trial] │ │
│ │ [Watch Demo ▶] │ │
│ │ │ │
│ │ Trust: "Built by │ │
│ │ financial professionals│ │
│ │ — one platform replaces│ │
│ │ 3-4 tools" │ │
│ └─────────────────────────┘ │
│ │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ [Airbnb] [Booking.com] [Rabobank] [ING] [Belastingdienst] │ │
│ └──────────────────────────────────────────────────────────────┘ │
│ │
└──────────────────────────────────────────────────────────────────────┘

```

Layout notes:
- Two-column on desktop (text left 55%, image right 45%), stacked on mobile (text → image)
- H1: `font-heading text-6xl font-extrabold`, Deep Blue
- Sub-headline: `font-sans text-lg`, muted gray
- Primary CTA: brand-blue solid button
- Secondary CTA: outline button or text link with play icon
- Trust signal: small text, muted
- Platform logos: grayscale row, centered below hero content
- Generous vertical padding: `py-20` to `py-28`

---

## 2. Problem / Solution Section

Background: White (#FFFFFF)

```

┌──────────────────────────────────────────────────────────────────────┐
│ │
│ H2: "Stop juggling multiple tools" │
│ Sub: "Most STR hosts use 3-4 disconnected tools. There's a │
│ better way." │
│ │
│ ┌─── BEFORE ──────────────┐ ┌─── AFTER ───────────────────┐ │
│ │ │ │ │ │
│ │ ┌─────────┐ │ │ │ │
│ │ │ Airbnb │──┐ │ │ ┌──────────────────────┐ │ │
│ │ └─────────┘ │ │ │ │ │ │ │
│ │ ┌─────────┐ ├→ Excel │ │ │ myAdmin │ │ │
│ │ │Booking │──┘ ↓ │ │ │ Integrated │ │ │
│ │ └─────────┘ Accounting│ │ │ Platform │ │ │
│ │ ↓ │ │ │ │ │ │
│ │ Tax Advisor │ │ │ Bookings → Finance │ │ │
│ │ │ │ │ → Taxes (auto) │ │ │
│ │ 📊 Juggling 3-4 tools │ │ └──────────────────────┘ │ │
│ │ 💰 Pricing guesswork │ │ │ │
│ │ 📄 Tax complexity │ │ 🤖 Automatic data sync │ │
│ │ ⏰ Hours of manual work│ │ 🎯 Data-driven pricing │ │
│ │ │ │ ✅ One-click tax filing │ │
│ └─────────────────────────┘ │ ⚡ Minutes, not hours │ │
│ └──────────────────────────────┘ │
│ │
└──────────────────────────────────────────────────────────────────────┘

```

Layout notes:
- Two-column: "Before" (left, muted/gray tones) vs "After" (right, brand colors, highlighted)
- Before side: chaotic flow diagram with pain point bullets
- After side: clean unified diagram with benefit bullets
- Visual contrast tells the story — messy vs clean
- Mobile: stacked vertically, Before on top
- Section padding: `py-20`

---

## 3. Feature Showcase (Tabbed)

Background: Off-white (#F8FAFC)

```

┌──────────────────────────────────────────────────────────────────────┐
│ │
│ H2: "Everything you need in one platform" │
│ Sub: "From booking analytics to tax declarations" │
│ │
│ ┌──────────────┬──────────────────┬─────────────────────┐ │
│ │ 🏠 STR │ 💰 Financial │ 🔗 Integrated │ │
│ │ Analytics │ Administration │ Platform │ │
│ └──────────────┴──────────────────┴─────────────────────┘ │
│ │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ │ │
│ │ ┌──────────────────────┐ ┌──────────────────────────────┐ │ │
│ │ │ │ │ │ │ │
│ │ │ Feature list: │ │ [Screenshot / mockup of │ │ │
│ │ │ │ │ the active tab's │ │ │
│ │ │ ✓ Multi-platform │ │ dashboard view] │ │ │
│ │ │ import │ │ │ │ │
│ │ │ ✓ Pricing insights │ │ │ │ │
│ │ │ ✓ Revenue analytics │ │ │ │ │
│ │ │ ✓ Year-month matrix │ │ │ │ │
│ │ │ ✓ Channel compare │ │ │ │ │
│ │ │ │ │ │ │ │
│ │ │ [Learn More →] │ │ │ │ │
│ │ └──────────────────────┘ └──────────────────────────────┘ │ │
│ │ │ │
│ └──────────────────────────────────────────────────────────────┘ │
│ │
└──────────────────────────────────────────────────────────────────────┘

```

Tab content per tab:

**Tab 1 — STR Analytics & Pricing:**
- Multi-platform import (Airbnb + Booking.com)
- AI pricing recommendations
- Revenue analytics with year-month matrix
- Channel performance comparison
- Occupancy & ADR tracking
- Screenshot: pricing dashboard or revenue matrix

**Tab 2 — Financial Administration:**
- AI-powered invoice processing
- Automated bank statement import
- Smart categorization
- Tax declarations (BTW, IB, tourist tax)
- P&L and balance sheets
- Screenshot: financial dashboard or invoice processing view

**Tab 3 — Integrated Platform:**
- Data flow visualization: Bookings → Financials → Taxes
- "One platform replaces 3-4 tools"
- Time savings demonstration
- ROI calculator (interactive, future phase)
- Screenshot: unified dashboard overview

Layout notes:
- Three tabs, horizontally aligned, active tab highlighted with brand-blue underline
- Tab content: two-column (feature list left, screenshot right), swap on alternating tabs for variety
- Screenshots should have rounded corners (`rounded-2xl`) with subtle shadow
- Mobile: tabs become a horizontal scroll or accordion
- Section padding: `py-20`

---

## 4. Social Proof Section

Background: White (#FFFFFF)

```

┌──────────────────────────────────────────────────────────────────────┐
│ │
│ H2: "Trusted by STR property managers" │
│ │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ │
│ │ │ │ │ │ │ │
│ │ ⭐⭐⭐⭐⭐ │ │ ⭐⭐⭐⭐⭐ │ │ ⭐⭐⭐⭐⭐ │ │
│ │ │ │ │ │ │ │
│ │ "I increased │ │ "I was spending│ │ "As a property │ │
│ │ my revenue by │ │ 20 hours a week│ │ manager, I need│ │
│ │ 28% in 6 │ │ on spreadsheets│ │ detailed reports│ │
│ │ months..." │ │ Now it's 2 │ │ for my clients.│ │
│ │ │ │ hours." │ │ myAdmin gives │ │
│ │ — Sarah M. │ │ │ │ me everything." │ │
│ │ 8 properties │ │ — Tom V. │ │ │ │
│ │ Amsterdam │ │ 12 properties │ │ — Lisa K. │ │
│ │ │ │ Rotterdam │ │ 45 properties │ │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘ │
│ │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ [Metric] [Metric] [Metric] [Metric] │ │
│ │ Automated Streamlined Simplified Built by │ │
│ │ invoice financial tax financial│ │
│ │ processing workflows compliance pros │ │
│ └──────────────────────────────────────────────────────────────┘ │
│ │
└──────────────────────────────────────────────────────────────────────┘

```

Layout notes:
- Three testimonial cards in a row (desktop), carousel on mobile
- Cards: white bg, `rounded-xl`, `shadow-sm`, `p-8`
- Star rating at top, quote in the middle, name/details at bottom
- Below testimonials: 4-column metrics bar with icons
- If no real testimonials at launch, show only the metrics bar and skip the cards
- Section padding: `py-20`

---

## 5. Pricing Section

Background: Off-white (#F8FAFC)

```

┌──────────────────────────────────────────────────────────────────────┐
│ │
│ H2: "Simple, transparent pricing" │
│ Sub: "Pay for properties, not features. Start small, scale │
│ as you grow." │
│ │
│ [Monthly] ●───○ [Annual — Save 20%] │
│ │
│ ┌─────────────────┐ ┌─────────────────────┐ ┌─────────────────┐ │
│ │ │ │ ⭐ MOST POPULAR │ │ │ │
│ │ STARTER │ │ │ │ ENTERPRISE │ │
│ │ │ │ PROFESSIONAL │ │ │ │
│ │ €49/mo │ │ │ │ Custom │ │
│ │ │ │ €99/mo │ │ │ │
│ │ 1-3 properties │ │ │ │ 16+ properties │ │
│ │ │ │ 4-15 properties │ │ │ │
│ │ ✓ All STR │ │ │ │ ✓ Everything │ │
│ │ features │ │ ✓ All STR features │ │ in Pro │ │
│ │ ✓ Basic │ │ ✓ Full financial │ │ ✓ Multi-user │ │
│ │ financial │ │ administration │ │ ✓ API access │ │
│ │ reports │ │ ✓ Tax declarations │ │ ✓ Dedicated │ │
│ │ ✓ Email │ │ ✓ Priority support │ │ support │ │
│ │ support │ │ │ │ ✓ White-label │ │
│ │ │ │ │ │ │ │
│ │ [Start Trial] │ │ [Start Trial] │ │ [Contact Us] │ │
│ │ │ │ │ │ │ │
│ └─────────────────┘ └─────────────────────┘ └─────────────────┘ │
│ │
│ "2-month free trial · No credit card required · Cancel anytime" │
│ │
└──────────────────────────────────────────────────────────────────────┘

```

Layout notes:
- Three pricing cards, center card (Professional) visually elevated with brand-blue border and "Most Popular" badge
- Monthly/Annual toggle at top (annual shows discounted price)
- Each card: tier name, price, property count, feature checklist, CTA button
- Starter & Enterprise: outline CTA buttons; Professional: solid brand-blue CTA
- Trust line below cards: centered, muted text
- Mobile: cards stack vertically, Professional card first
- Section padding: `py-20`

---

## 6. Integration Showcase

Background: White (#FFFFFF)

```

┌──────────────────────────────────────────────────────────────────────┐
│ │
│ H2: "Works with your existing tools" │
│ Sub: "Connect the platforms you already use" │
│ │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│ │ BOOKING │ │ FINANCIAL │ │ TAX & │ │
│ │ PLATFORMS │ │ SERVICES │ │ COMPLIANCE │ │
│ │ │ │ │ │ │ │
│ │ [Airbnb] │ │ [Rabobank] │ │ [Belasting- │ │
│ │ [Booking] │ │ [ING] │ │ dienst] │ │
│ │ [VRBO*] │ │ [ABN AMRO] │ │ │ │
│ │ │ │ [Google │ │ [Excel/CSV] │ │
│ │ \*coming soon│ │ Drive] │ │ [PDF export]│ │
│ └──────────────┘ └──────────────┘ └──────────────┘ │
│ │
│ "More integrations coming soon — request yours" │
│ │
└──────────────────────────────────────────────────────────────────────┘

```

Layout notes:
- Three category columns with logos/icons in each
- Logos displayed in grayscale, color on hover
- "Coming soon" items shown with a subtle badge or reduced opacity
- Link at bottom to request integrations (captures interest / leads)
- Mobile: single column, categories stacked
- Section padding: `py-20`

---

## 7. FAQ Section

Background: Off-white (#F8FAFC)

```

┌──────────────────────────────────────────────────────────────────────┐
│ │
│ H2: "Frequently asked questions" │
│ │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ ▸ How does the pricing optimizer work? │ │
│ ├──────────────────────────────────────────────────────────────┤ │
│ │ ▸ Do I need accounting knowledge? │ │
│ ├──────────────────────────────────────────────────────────────┤ │
│ │ ▸ What if I use other platforms besides Airbnb? │ │
│ ├──────────────────────────────────────────────────────────────┤ │
│ │ ▸ Is my data secure? │ │
│ ├──────────────────────────────────────────────────────────────┤ │
│ │ ▸ Can I try before I buy? │ │
│ ├──────────────────────────────────────────────────────────────┤ │
│ │ ▸ What about my existing bookings? │ │
│ ├──────────────────────────────────────────────────────────────┤ │
│ │ ▸ Do you support my language? │ │
│ ├──────────────────────────────────────────────────────────────┤ │
│ │ ▸ What if I need help? │ │
│ └──────────────────────────────────────────────────────────────┘ │
│ │
│ "Still have questions?" [Contact Us] │
│ │
└──────────────────────────────────────────────────────────────────────┘

```

Layout notes:
- Accordion style: click to expand, one open at a time
- Max-width ~768px, centered on page for readability
- Chevron icon rotates on open/close
- Answers use body text styling, can include links
- "Contact Us" link below for unanswered questions
- FAQ content sourced from SAAS_WEBSITE_REQUIREMENTS.md section 5.7
- Section padding: `py-20`

---

## 8. CTA Banner (Pre-Footer)

Background: Deep Blue (#1E3A8A) or gradient (Deep Blue → Indigo)

```

┌──────────────────────────────────────────────────────────────────────┐
│ │
│ H2: "Ready to simplify your STR business?" [Start Free Trial]│
│ Sub: "2-month free trial. No credit card required." │
│ │
└──────────────────────────────────────────────────────────────────────┘

```

Layout notes:
- Full-width dark section, white text
- H2 left-aligned, CTA button right-aligned (desktop); stacked centered (mobile)
- CTA: white button with brand-blue text (inverted from normal)
- Compact section: `py-16`

---

## 9. Footer

Background: Deep Slate (#0F172A)

```

┌──────────────────────────────────────────────────────────────────────┐
│ │
│ [Logo - white] │
│ "The integrated platform for │
│ STR property managers" │
│ │
│ Product Company Legal Connect │
│ ───────── ───────── ───────── ───────── │
│ Features About Privacy Twitter/X │
│ Pricing Blog Terms LinkedIn │
│ Integrations Careers Cookies Email │
│ FAQ Contact GDPR │
│ │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ © 2026 myAdmin. All rights reserved. [🌐 NL ▾] │ │
│ └──────────────────────────────────────────────────────────────┘ │
│ │
└──────────────────────────────────────────────────────────────────────┘

```

Layout notes:
- Four-column link grid (desktop), two-column (tablet), stacked (mobile)
- Logo in white variant, tagline below
- Footer links: `text-sm font-medium`, muted white/gray, hover white
- Bottom bar: copyright + language toggle
- Section padding: `py-12`

---

## Responsive Breakpoints

| Breakpoint | Width | Key changes |
|---|---|---|
| Mobile | < 640px | Single column, stacked sections, hamburger nav, carousel for testimonials |
| Tablet | 640-1024px | Two-column where possible, condensed nav |
| Desktop | > 1024px | Full layout as wireframed above, max-w-7xl centered |

## Section Background Pattern

| # | Section | Background |
|---|---|---|
| Nav | Navigation | White, sticky |
| 1 | Hero | Off-white (#F8FAFC) |
| 2 | Problem/Solution | White |
| 3 | Features | Off-white |
| 4 | Social Proof | White |
| 5 | Pricing | Off-white |
| 6 | Integrations | White |
| 7 | FAQ | Off-white |
| 8 | CTA Banner | Deep Blue (#1E3A8A) |
| 9 | Footer | Deep Slate (#0F172A) |

Alternating white/off-white creates visual rhythm without heavy dividers.
```
