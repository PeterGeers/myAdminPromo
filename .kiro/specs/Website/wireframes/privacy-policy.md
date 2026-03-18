# Privacy Policy Page Wireframe — myAdmin Website

This is a legal page required for GDPR compliance. It must be accessible from the footer ("Privacy" link) and linked from the trial signup form's terms checkbox. The page should be clear, readable, and structured for both users and regulators.

---

## Navigation Bar

Same sticky nav as all pages. No nav link is active/highlighted (legal pages aren't in the main nav).

---

## 1. Page Header

Background: Off-white (#F8FAFC)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  H1: "Privacy Policy"                                                │
│  Sub: "Last updated: [date]"                                         │
│                                                                      │
│  "We take your privacy seriously. This policy explains what          │
│   data we collect, why, and what rights you have."                   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

Layout notes:

- Left-aligned, compact header (`py-12`)
- H1: `font-heading text-4xl font-extrabold`, Deep Blue
- "Last updated" date: `text-sm text-gray-500`
- Intro paragraph: `text-lg text-gray-600`, max-width `max-w-3xl`

---

## 2. Table of Contents (Sidebar Navigation)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ┌─────────────────┐  ┌──────────────────────────────────────────┐  │
│  │                 │  │                                          │  │
│  │  ON THIS PAGE   │  │  [Policy content sections]               │  │
│  │                 │  │                                          │  │
│  │  1. Who we are  │  │                                          │  │
│  │  2. Data we     │  │                                          │  │
│  │     collect     │  │                                          │  │
│  │  3. Why we      │  │                                          │  │
│  │     collect it  │  │                                          │  │
│  │  4. Cookies     │  │                                          │  │
│  │  5. Third-party │  │                                          │  │
│  │     services    │  │                                          │  │
│  │  6. Data        │  │                                          │  │
│  │     storage     │  │                                          │  │
│  │  7. Your rights │  │                                          │  │
│  │  8. Children    │  │                                          │  │
│  │  9. Changes     │  │                                          │  │
│  │  10. Contact    │  │                                          │  │
│  │                 │  │                                          │  │
│  └─────────────────┘  └──────────────────────────────────────────┘  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

Layout notes:

- Desktop: two-column — sticky sidebar (left, 25%) + content (right, 75%)
- Sidebar: `position: sticky; top: 80px` (below header), scrollspy highlights active section
- Mobile: sidebar becomes a collapsible "On this page" dropdown at the top, or hidden entirely
- Content area: `max-w-3xl`, clean typography, generous line height (`leading-relaxed`)

---

## 3. Policy Content Sections

Background: White (#FFFFFF)

Each section follows the same pattern:

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  H2: "1. Who we are"                                                 │
│  ────────────────────────────────────────                            │
│                                                                      │
│  myAdmin is operated by [Goodwin Solutrions BV], registered in          │
│  the Netherlands under KvK number [24352408].                          │
│                                                                      │
│  Address: [Beemsterstraat 3, 2131 ZA Hoofddorp]                                       │
│  Email: privacy@jabaki.nl                                         │
│  Data Protection Officer: [name/email if applicable]                 │
│                                                                      │
│  ────────────────────────────────────────                            │
│                                                                      │
│  H2: "2. Data we collect"                                            │
│  ────────────────────────────────────────                            │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  DATA TYPE        │  EXAMPLES              │  REQUIRED?     │    │
│  ├───────────────────┼────────────────────────┼────────────────┤    │
│  │  Account info     │  Name, email, password │  Yes           │    │
│  │  Company info     │  Company name          │  No            │    │
│  │  Usage data       │  Property count,       │  No            │    │
│  │                   │  referral source       │                │    │
│  │  Technical data   │  IP address, browser,  │  Automatic     │    │
│  │                   │  device type           │                │    │
│  │  Analytics data   │  Pages visited, clicks,│  Via consent   │    │
│  │                   │  scroll depth          │                │    │
│  └───────────────────┴────────────────────────┴────────────────┘    │
│                                                                      │
│  ────────────────────────────────────────                            │
│                                                                      │
│  H2: "3. Why we collect it (legal basis)"                            │
│  ────────────────────────────────────────                            │
│                                                                      │
│  • Contract performance — to create and manage your account          │
│  • Legitimate interest — to improve our service, prevent fraud       │
│  • Consent — for analytics cookies and marketing emails              │
│  • Legal obligation — tax and financial record-keeping               │
│                                                                      │
│  ────────────────────────────────────────                            │
│                                                                      │
│  H2: "4. Cookies"                                                    │
│  ────────────────────────────────────────                            │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  COOKIE          │  PURPOSE          │  TYPE       │ DURATION│   │
│  ├──────────────────┼──────────────────┼────────────┼─────────┤    │
│  │  locale          │  Language pref    │  Essential  │ 1 year  │    │
│  │  session_id      │  Login session    │  Essential  │ Session │    │
│  │  cookie_consent  │  Consent choice   │  Essential  │ 1 year  │    │
│  │  _ga / _gid      │  Google Analytics │  Analytics  │ 2 years │    │
│  │  _gat             │  GA rate limiting │  Analytics  │ 1 min   │    │
│  └──────────────────┴──────────────────┴────────────┴─────────┘    │
│                                                                      │
│  Essential cookies are always active. Analytics cookies require       │
│  your consent via the cookie banner.                                 │
│                                                                      │
│  [Manage cookie preferences]  ← opens cookie consent dialog         │
│                                                                      │
│  ────────────────────────────────────────                            │
│                                                                      │
│  H2: "5. Third-party services"                                       │
│  ────────────────────────────────────────                            │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  SERVICE            │  PURPOSE              │  DATA SHARED  │    │
│  ├─────────────────────┼───────────────────────┼───────────────┤    │
│  │  Railway            │  Database hosting      │  Account &    │    │
│  │  (EU West, NL)      │                        │  app data     │    │
│  │  AWS Cognito        │  Authentication        │  Login        │    │
│  │  (EU-WEST-1)        │                        │  credentials  │    │
│  │  Google Drive /     │  Document storage      │  User-owned   │    │
│  │  AWS S3             │  (invoices, files)     │  documents    │    │
│  │  Google Analytics   │  Website analytics     │  Usage data   │    │
│  │  (GA4)              │                        │  (anonymized) │    │
│  │  Google Fonts       │  Typography            │  IP address   │    │
│  │  Email provider     │  Transactional emails  │  Email, name  │    │
│  │  (TBD)              │  (verification, etc.)  │               │    │
│  └─────────────────────┴───────────────────────┴───────────────┘    │
│                                                                      │
│  All third-party services are GDPR-compliant and process data        │
│  within the EU/EEA, or under Standard Contractual Clauses.           │
│                                                                      │
│  ────────────────────────────────────────                            │
│                                                                      │
│  H2: "6. Data storage & retention"                                   │
│  ────────────────────────────────────────                            │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  DATA              │  LOCATION              │  RETENTION    │    │
│  ├────────────────────┼────────────────────────┼───────────────┤    │
│  │  Account data      │  Railway EU West       │  1 year after │    │
│  │  (name, email,     │  (Amsterdam, NL)       │  contract     │    │
│  │  settings, usage)  │                        │  closure      │    │
│  │                    │                        │               │    │
│  │  Login credentials │  AWS Cognito           │  1 year after │    │
│  │  (auth tokens,     │  EU-WEST-1 (Ireland)   │  contract     │    │
│  │  password hashes)  │                        │  closure      │    │
│  │                    │                        │               │    │
│  │  Documents &       │  User-owned Google     │  Owned and    │    │
│  │  invoices          │  Drive or S3 buckets   │  managed by   │    │
│  │                    │                        │  the user     │    │
│  │                    │                        │               │    │
│  │  Analytics data    │  Google Analytics      │  Per GA4      │    │
│  │  (anonymized)      │  (EU settings)         │  defaults     │    │
│  └────────────────────┴────────────────────────┴───────────────┘    │
│                                                                      │
│  • All data stored within the EU (Netherlands and Ireland)           │
│  • Trial data: retained 30 days after trial expires if not           │
│    converted to paid, then deleted                                   │
│  • After contract closure: data retained for 1 year with             │
│    export available, then permanently deleted                        │
│  • Financial records: user is responsible for 7-year retention       │
│    (Dutch tax law) via their own Google Drive / S3 storage           │
│  • Data export available at any time from account settings           │
│                                                                      │
│  ────────────────────────────────────────                            │
│                                                                      │
│  H2: "7. Your rights"                                                │
│  ────────────────────────────────────────                            │
│                                                                      │
│  Under GDPR, you have the right to:                                  │
│                                                                      │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                │
│  │  📋 Access   │ │  ✏️ Rectify  │ │  🗑️ Erase    │                │
│  │  Request a   │ │  Correct     │ │  Delete your │                │
│  │  copy of     │ │  inaccurate  │ │  personal    │                │
│  │  your data   │ │  data        │ │  data        │                │
│  └──────────────┘ └──────────────┘ └──────────────┘                │
│                                                                      │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                │
│  │  📦 Port     │ │  ⛔ Restrict │ │  🚫 Object   │                │
│  │  Export your │ │  Limit how   │ │  Opt out of  │                │
│  │  data in a   │ │  we process  │ │  certain     │                │
│  │  common      │ │  your data   │ │  processing  │                │
│  │  format      │ │              │ │              │                │
│  └──────────────┘ └──────────────┘ └──────────────┘                │
│                                                                      │
│  To exercise any of these rights, email privacy@jabaki.nl.          │
│  We will respond within 30 days.                                     │
│                                                                      │
│  You also have the right to lodge a complaint with the               │
│  Autoriteit Persoonsgegevens (Dutch Data Protection Authority).      │
│                                                                      │
│  ────────────────────────────────────────                            │
│                                                                      │
│  H2: "8. Children's privacy"                                         │
│  ────────────────────────────────────────                            │
│                                                                      │
│  myAdmin is a business tool not intended for use by anyone           │
│  under 18. We do not knowingly collect data from minors.             │
│                                                                      │
│  ────────────────────────────────────────                            │
│                                                                      │
│  H2: "9. Changes to this policy"                                     │
│  ────────────────────────────────────────                            │
│                                                                      │
│  We may update this policy from time to time. Significant            │
│  changes will be communicated via email or an in-app notice.         │
│  The "last updated" date at the top reflects the latest revision.    │
│                                                                      │
│  ────────────────────────────────────────                            │
│                                                                      │
│  H2: "10. Contact us"                                                │
│  ────────────────────────────────────────                            │
│                                                                      │
│  For privacy-related questions:                                      │
│                                                                      │
│  Email: privacy@jabaki.nl                                           │
│  Address: [Company registered address]                               │
│                                                                      │
│  For general inquiries: privacy@jabaki.nl                             │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 4. Cookie Consent Banner

This is a global component that appears on every page (not just the privacy policy). It's documented here because it's part of the cookie/privacy system.

### First Visit — Banner (Bottom of Screen)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  🍪 We use cookies to improve your experience.                       │
│                                                                      │
│  Essential cookies are always active. We'd also like to use          │
│  analytics cookies to understand how you use our site.               │
│                                                                      │
│  [Read our Privacy Policy]                                           │
│                                                                      │
│  [Manage Preferences]    [Reject All]    [Accept All]                │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Manage Preferences — Modal / Drawer

Opens when user clicks "Manage Preferences" on the banner, or "Manage cookie preferences" on the privacy policy page.

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                 [✕]  │
│                                                                      │
│  H3: "Cookie Preferences"                                            │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                                                              │   │
│  │  Essential cookies                          [Always on] 🔒  │   │
│  │  Required for the website to function.                       │   │
│  │  Language preference, session, consent choice.               │   │
│  │                                                              │   │
│  ├──────────────────────────────────────────────────────────────┤   │
│  │                                                              │   │
│  │  Analytics cookies                          [  Toggle  ] ○  │   │
│  │  Help us understand how visitors use our site.               │   │
│  │  Google Analytics (GA4). Data is anonymized.                 │   │
│  │  Cookies: _ga, _gid, _gat                                   │   │
│  │                                                              │   │
│  ├──────────────────────────────────────────────────────────────┤   │
│  │                                                              │   │
│  │  Marketing cookies                          [  Toggle  ] ○  │   │
│  │  Used to show relevant ads and measure campaigns.            │   │
│  │  Not currently in use. Reserved for future use.              │   │
│  │                                                              │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                      │
│                              [Save Preferences]                      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### After Consent — Minimized State

Once the user makes a choice, the banner disappears. A small floating button allows them to revisit their preferences:

```
┌─────┐
│ 🍪  │  ← bottom-left corner, subtle, opens preferences modal
└─────┘
```

### Cookie Consent Specifications

**Banner behavior:**

- Appears on first visit (no `cookie_consent` cookie found)
- Fixed to bottom of viewport, above footer, `z-index: 60` (above sticky nav)
- Blocks analytics/marketing scripts until consent is given (GDPR opt-in model)
- Does NOT block page interaction (no overlay on the page itself)
- Disappears after any choice (Accept All, Reject All, or Save Preferences)

**Consent categories:**

| Category  | Default | User can change? | Scripts blocked until consent |
| --------- | ------- | ---------------- | ----------------------------- |
| Essential | On      | No (locked)      | Never blocked                 |
| Analytics | Off     | Yes (toggle)     | GA4 scripts                   |
| Marketing | Off     | Yes (toggle)     | Future ad/tracking scripts    |

**Consent storage:**

- Store choice in a `cookie_consent` cookie (essential, so no consent needed for itself)
- Cookie value: JSON string, e.g. `{"essential":true,"analytics":false,"marketing":false}`
- Duration: 1 year
- Also store consent timestamp for GDPR audit trail
- On consent change: immediately load or unload the relevant scripts

**Script loading logic:**

```
if (consent.analytics === true) {
  → Load GA4 gtag.js
  → Initialize tracking
} else {
  → Do NOT load GA4
  → Remove existing GA cookies (_ga, _gid, _gat) if consent revoked
}
```

**Implementation approach:**

- Custom lightweight component (recommended for myAdmin — keeps bundle small)
- Alternative: use a library like `cookie-consent` (npm) or a service like Cookiebot
- The custom approach is ~50 lines of React + a cookie utility, no external dependency

**Design:**

- Banner: white bg, `rounded-t-2xl` (desktop) or full-width (mobile), `shadow-lg`
- Desktop: horizontal layout — text left, buttons right
- Mobile: stacked — text on top, buttons below (full-width, stacked vertically)
- "Accept All" button: brand-blue solid (primary action)
- "Reject All" button: outline style
- "Manage Preferences" button: text link style
- Preferences modal: centered modal with backdrop (`bg-black/50`), `max-w-lg`, `rounded-2xl`
- Toggles: standard switch component, brand-blue when on, gray when off
- Essential toggle: visually locked (grayed out, no interaction), shows lock icon

**Responsive:**

| Aspect          | Desktop                           | Mobile                         |
| --------------- | --------------------------------- | ------------------------------ |
| Banner position | Bottom, centered, `max-w-4xl`     | Bottom, full-width             |
| Banner layout   | Text left, buttons right (inline) | Stacked vertically             |
| Buttons         | Inline row                        | Full-width, stacked            |
| Preferences     | Centered modal                    | Full-screen drawer from bottom |
| Cookie icon     | Bottom-left, 48px                 | Bottom-left, 44px              |

**Accessibility:**

- Banner has `role="dialog"` and `aria-label="Cookie consent"`
- Focus trapped inside preferences modal when open
- All toggles have associated labels and `aria-checked` state
- "Always on" for essential cookies announced to screen readers
- Escape key closes preferences modal
- Buttons have clear, descriptive labels (not just "Accept")
- Respects `prefers-reduced-motion` for any animations

**GDPR compliance checklist:**

- ✓ Opt-in model (no analytics/marketing cookies before consent)
- ✓ Granular control (per-category toggles)
- ✓ Easy to reject (same prominence as accept)
- ✓ Revocable (cookie icon to reopen preferences anytime)
- ✓ Transparent (lists specific cookies and purposes)
- ✓ Consent recorded with timestamp (audit trail)
- ✓ No cookie walls (site is fully usable without analytics consent)
- ✓ Links to full privacy policy

---

## 5. Footer

Same footer as all pages (see shared-layout.md).

---

## Page-Level Notes

**SEO:**

- Page title: "Privacy Policy — myAdmin"
- Meta description: "How myAdmin collects, uses, and protects your personal data. GDPR-compliant privacy policy for our STR property management platform."
- `noindex` is optional — some companies index their privacy page for transparency, others don't. Recommend indexing it (builds trust with Google).

**Design:**

- Clean, readable typography — this is a text-heavy page
- Body text: `text-base leading-relaxed text-gray-700`
- Section headings: `text-2xl font-heading font-bold text-gray-900`
- Tables: `text-sm`, alternating row backgrounds (`even:bg-gray-50`), `rounded-lg overflow-hidden`
- Generous spacing between sections: `space-y-12`
- Max content width: `max-w-3xl` for readability (65-75 characters per line)

**Responsive:**

- Desktop: sticky sidebar TOC + content
- Tablet: sidebar collapses to top-of-page TOC (scrollable horizontal pills or dropdown)
- Mobile: TOC hidden or collapsible "Jump to section" button, full-width content

**Accessibility:**

- Proper heading hierarchy (H1 → H2 for each section)
- Tables have `<caption>` and proper `<th>` headers
- "Manage cookie preferences" button is keyboard accessible
- Skip-to-content link works as on all pages
- Language is clear and plain (avoid legal jargon where possible)

**Legal notes:**

- This wireframe provides the structure and content outline — final legal text should be reviewed by a legal professional or generated via a GDPR-compliant template service (e.g., iubenda, Termly, or a Dutch legal advisor)
- The cookie table must match the actual cookies used on the site
- Third-party services table must be kept up to date as integrations change
- Dutch translation must be available at launch (`/nl/privacy`)
