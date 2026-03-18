# Pricing Page Wireframe — myAdmin Website

This is a dedicated pricing page (separate from the homepage pricing section). It provides more detail, a full feature comparison table, add-ons, and pricing-specific FAQ.

---

## Navigation Bar

Same sticky nav as homepage. "Pricing" link is active/highlighted.

---

## 1. Hero / Header

Background: Off-white (#F8FAFC)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  H1: "Simple, transparent pricing"                                   │
│  Sub: "Pay for properties, not features. Start with a free           │
│        2-month trial — no credit card required."                     │
│                                                                      │
│              [Monthly]  ●───○  [Annual — Save 20%]                   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

Layout notes:

- Centered text, compact section (`py-16`)
- H1: `font-heading text-5xl font-extrabold`, Deep Blue
- Sub: `font-sans text-lg`, muted gray
- Toggle: pill-style switcher, active side uses brand-blue bg
- Annual toggle shows "Save 20%" badge in brand-teal
- Toggle state persists across the page (cards + comparison table update)

---

## 2. Pricing Cards

Background: Off-white (continues from header)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ┌──────────────────┐ ┌────────────────────────┐ ┌────────────────┐ │
│  │                  │ │  ⭐ MOST POPULAR        │ │                │ │
│  │  STARTER         │ │                        │ │  ENTERPRISE    │ │
│  │                  │ │  PROFESSIONAL           │ │                │ │
│  │  Perfect for     │ │                        │ │  Perfect for   │ │
│  │  part-time hosts │ │  Perfect for growing   │ │  property      │ │
│  │                  │ │  operators             │ │  managers      │ │
│  │  €49             │ │                        │ │                │ │
│  │  /month          │ │  €99                   │ │  Custom        │ │
│  │                  │ │  /month                │ │  pricing       │ │
│  │  1-3 properties  │ │                        │ │                │ │
```
│  │                  │ │  4-15 properties       │ │  16+           │ │
│  │  ✓ All STR       │ │                        │ │  properties    │ │
│  │    analytics     │ │  ✓ All STR analytics   │ │                │ │
│  │  ✓ Pricing       │ │  ✓ Pricing insights    │ │  Everything    │ │
│  │    insights      │ │  ✓ Full financial      │ │  in Pro, plus: │ │
│  │  ✓ Basic         │ │    administration      │ │                │ │
│  │    financial     │ │  ✓ Tax declarations    │ │  ✓ Multi-user  │ │
│  │    reports       │ │    (BTW, IB, tourist)  │ │    access      │ │
│  │  ✓ Bank import   │ │  ✓ AI invoice          │ │  ✓ API access  │ │
│  │  ✓ Email support │ │    processing          │ │  ✓ Dedicated   │ │
│  │                  │ │  ✓ Google Drive        │ │    support     │ │
│  │                  │ │    integration          │ │  ✓ White-label │ │
│  │                  │ │  ✓ Priority support    │ │    options     │ │
│  │                  │ │                        │ │  ✓ Custom      │ │
│  │                  │ │                        │ │    integrations│ │
│  │                  │ │                        │ │                │ │
│  │ [Start Trial]    │ │ [Start Trial]          │ │ [Contact Us]   │ │
│  │                  │ │                        │ │                │ │
│  └──────────────────┘ └────────────────────────┘ └────────────────┘ │
│                                                                      │
│  "2-month free trial · No credit card required · Cancel anytime"     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

Layout notes:
- Three cards, center card (Professional) elevated with:
  - Brand-blue border (`border-2 border-brand-blue`)
  - "Most Popular" badge (brand-blue bg, white text, `rounded-full`)
  - Slightly larger or lifted with `shadow-lg` vs `shadow-sm` on others
- Price updates when monthly/annual toggle changes (annual = price × 10 / 12, rounded)
- Starter & Enterprise CTAs: outline buttons; Professional: solid brand-blue
- Mobile: cards stack vertically, Professional first
- Section padding: `py-8` (tight, since header is above)

---

## 3. Add-Ons

Background: White (#FFFFFF)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  H2: "Customize your plan"                                           │
│  Sub: "Add what you need, when you need it"                          │
│                                                                      │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐           │
│  │  🏠             │ │  👤             │ │  📊             │           │
│  │  Extra          │ │  Additional    │ │  Advanced      │           │
│  │  properties     │ │  users         │ │  analytics     │           │
│  │                 │ │                │ │                │           │
│  │  €5/mo each    │ │  €10/mo each   │ │  €20/mo        │           │
│  │                 │ │                │ │                │           │
│  │  Add properties │ │  Team members  │ │  Deep insights │           │
│  │  beyond your    │ │  with role-    │ │  & custom      │           │
│  │  plan limit     │ │  based access  │ │  reports       │           │
│  └────────────────┘ └────────────────┘ └────────────────┘           │
│                                                                      │
│  ┌────────────────┐                                                  │
│  │  🆓             │                                                  │
│  │  Accountant     │                                                  │
│  │  access         │                                                  │
│  │                 │                                                  │
│  │  FREE           │                                                  │
│  │                 │                                                  │
│  │  Read-only      │                                                  │
│  │  access for     │                                                  │
│  │  your accountant│                                                  │
│  └────────────────┘                                                  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

Layout notes:
- Four cards in a grid (3 + 1 row, or 4-column on wide screens)
- Cards: white bg, `rounded-xl`, `shadow-sm`, `p-6`
- Icon at top, name, price, short description
- "FREE" badge on accountant access card (brand-teal)
- Mobile: 2-column grid or stacked
- Section padding: `py-20`

---

## 4. Feature Comparison Table

Background: Off-white (#F8FAFC)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  H2: "Compare plans in detail"                                       │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │                    │ Starter  │ Professional │ Enterprise    │    │
│  ├────────────────────┼──────────┼──────────────┼───────────────┤    │
│  │ STR ANALYTICS      │          │              │               │    │
│  ├────────────────────┼──────────┼──────────────┼───────────────┤    │
│  │ Properties         │ 1-3      │ 4-15         │ 16+           │    │
│  │ Platform import    │ ✓        │ ✓            │ ✓             │    │
│  │ Pricing insights   │ ✓        │ ✓            │ ✓             │    │
│  │ Revenue analytics  │ ✓        │ ✓            │ ✓             │    │
│  │ Channel comparison │ ✓        │ ✓            │ ✓             │    │
│  │ Guest analytics    │ —        │ ✓            │ ✓             │    │
│  │ Country reports    │ —        │ ✓            │ ✓             │    │
│  ├────────────────────┼──────────┼──────────────┼───────────────┤    │
│  │ FINANCIAL          │          │              │               │    │
│  ├────────────────────┼──────────┼──────────────┼───────────────┤    │
│  │ Bank import        │ ✓        │ ✓            │ ✓             │    │
│  │ Basic reports      │ ✓        │ ✓            │ ✓             │    │
│  │ AI invoice process │ —        │ ✓            │ ✓             │    │
│  │ Full P&L / Balance │ —        │ ✓            │ ✓             │    │
│  │ Google Drive       │ —        │ ✓            │ ✓             │    │
│  │ Multi-year compare │ —        │ ✓            │ ✓             │    │
│  ├────────────────────┼──────────┼──────────────┼───────────────┤    │
│  │ TAX COMPLIANCE     │          │              │               │    │
│  ├────────────────────┼──────────┼──────────────┼───────────────┤    │
│  │ BTW (VAT)          │ —        │ ✓            │ ✓             │    │
│  │ Income tax (IB)    │ —        │ ✓            │ ✓             │    │
│  │ Tourist tax        │ —        │ ✓            │ ✓             │    │
│  │ Audit trail        │ —        │ ✓            │ ✓             │    │
│  ├────────────────────┼──────────┼──────────────┼───────────────┤    │
│  │ PLATFORM           │          │              │               │    │
│  ├────────────────────┼──────────┼──────────────┼───────────────┤    │
│  │ Users              │ 1        │ 1            │ Unlimited     │    │
│  │ API access         │ —        │ —            │ ✓             │    │
│  │ White-label        │ —        │ —            │ ✓             │    │
│  │ Accountant access  │ ✓ (free) │ ✓ (free)     │ ✓ (free)      │    │
│  ├────────────────────┼──────────┼──────────────┼───────────────┤    │
│  │ SUPPORT            │          │              │               │    │
│  ├────────────────────┼──────────┼──────────────┼───────────────┤    │
│  │ Email support      │ ✓        │ ✓            │ ✓             │    │
│  │ Priority support   │ —        │ ✓            │ ✓             │    │
│  │ Dedicated support  │ —        │ —            │ ✓             │    │
│  ├────────────────────┼──────────┼──────────────┼───────────────┤    │
│  │                    │[Trial]   │ [Trial]      │ [Contact]     │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

Layout notes:
- Full-width table, horizontally scrollable on mobile
- Category headers (STR Analytics, Financial, etc.) span full width, bold, light gray bg
- ✓ = included (brand-teal), — = not included (muted gray)
- Column headers sticky on scroll (Professional column highlighted with light blue bg)
- CTA buttons at bottom of each column
- On mobile: consider a "select plan to compare" dropdown that shows 2 columns at a time
- Section padding: `py-20`

---

## 5. Value Proposition Strip

Background: White (#FFFFFF)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │  💳       │  │  📈       │  │  🔒       │  │  🚀       │           │
│  │  No hidden│  │  Scale as │  │  Bank-    │  │  Cancel   │           │
│  │  fees     │  │  you grow │  │  level    │  │  anytime  │           │
│  │           │  │           │  │  security │  │           │           │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘           │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

Layout notes:
- Four icons in a row, centered
- Icon + short label, muted text
- Compact section: `py-12`
- Reinforces trust without being heavy

---

## 6. Pricing FAQ

Background: Off-white (#F8FAFC)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  H2: "Pricing questions"                                             │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │  ▸ What happens after the 2-month free trial?                │    │
│  │    You'll be asked to choose a plan. No automatic charges.   │    │
│  │    Your data is kept for 30 days if you don't subscribe.     │    │
│  ├──────────────────────────────────────────────────────────────┤    │
│  │  ▸ Can I switch plans later?                                 │    │
│  │    Yes, upgrade or downgrade anytime. Changes take effect    │    │
│  │    at the start of your next billing cycle. Pro-rated        │    │
│  │    credits for upgrades.                                     │    │
│  ├──────────────────────────────────────────────────────────────┤    │
│  │  ▸ What counts as a "property"?                              │    │
│  │    Each unique listing on Airbnb or Booking.com counts as    │    │
│  │    one property. A house listed on both platforms = 1        │    │
│  │    property, not 2.                                          │    │
│  ├──────────────────────────────────────────────────────────────┤    │
│  │  ▸ Do I need a credit card to start the trial?               │    │
│  │    No. Sign up with just your email. We'll only ask for      │    │
│  │    payment when you choose a plan after the trial.           │    │
│  ├──────────────────────────────────────────────────────────────┤    │
│  │  ▸ Is there a discount for annual billing?                   │    │
│  │    Yes — save 20% when you pay annually. That's 2 months     │    │
│  │    free compared to monthly billing.                         │    │
│  ├──────────────────────────────────────────────────────────────┤    │
│  │  ▸ What payment methods do you accept?                       │    │
│  │    Credit card (Visa, Mastercard, Amex), iDEAL, SEPA         │    │
│  │    direct debit, and bank transfer (Enterprise only).        │    │
│  ├──────────────────────────────────────────────────────────────┤    │
│  │  ▸ Can I cancel anytime?                                     │    │
│  │    Yes. No lock-in contracts. Cancel from your account       │    │
│  │    settings. You keep access until the end of your billing   │    │
│  │    period.                                                   │    │
│  ├──────────────────────────────────────────────────────────────┤    │
│  │  ▸ What if I have more than 15 properties?                   │    │
│  │    Our Enterprise plan is designed for you. Contact us for   │    │
│  │    custom pricing based on your portfolio size and needs.    │    │
│  ├──────────────────────────────────────────────────────────────┤    │
│  │  ▸ Is accountant access really free?                         │    │
│  │    Yes. Invite your accountant with read-only access at no   │    │
│  │    extra cost on any plan.                                   │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  "Have a different question?"  [Contact Us]                          │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

Layout notes:
- Accordion style, same pattern as homepage FAQ
- Max-width ~768px, centered
- First item expanded by default (trial question — most common)
- Answers shown in expanded state in wireframe for content reference
- "Contact Us" link at bottom
- Section padding: `py-20`

---

## 7. CTA Banner (Pre-Footer)

Background: Deep Blue (#1E3A8A)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  H2: "Ready to get started?"              [Start Free 2-Month Trial] │
│  Sub: "No credit card required.                                      │
│        Full access to all features."                                 │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

Layout notes:
- Same pattern as homepage CTA banner
- White text, inverted CTA button (white bg, brand-blue text)
- `py-16`

---

## 8. Footer

Same footer as homepage (see homepage wireframe).

---

## Page-Level Notes

**SEO:**
- Page title: "Pricing — myAdmin | STR Property Management Platform"
- Meta description: "Simple, transparent pricing for STR property managers. Start with a free 2-month trial. Plans from €49/month."
- Structured data: `Product` schema with pricing offers

**Behavior:**
- Monthly/annual toggle updates all prices across cards AND comparison table simultaneously
- Annual prices: Starter €39/mo (billed €468/yr), Professional €79/mo (billed €948/yr)
- Smooth animation on price change (number counter or fade)
- Scroll-to-top when navigating from homepage pricing section

**Tracking (GA4):**
- Toggle interaction (monthly ↔ annual)
- CTA clicks per tier
- Comparison table scroll depth
- FAQ accordion opens
- "Contact Us" clicks

**Mobile considerations:**
- Cards stack vertically (Professional first)
- Comparison table: horizontal scroll with sticky first column, or plan-selector dropdown
- FAQ accordion works naturally on mobile
- CTA banner stacks centered
