# Terms of Service Page Wireframe — myAdmin Website

Terms of Service (Algemene Voorwaarden) for myAdmin, governed by Dutch law. This page is linked from the footer ("Terms" link) and from the trial signup form's terms checkbox. The structure follows standard Dutch SaaS terms conventions.

---

## Navigation Bar

Same sticky nav as all pages. No nav link is active/highlighted.

---

## 1. Page Header

Background: Off-white (#F8FAFC)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  H1: "Terms of Service"                                              │
│  Sub: "Algemene Voorwaarden"                                         │
│                                                                      │
│  Last updated: [date]                                                │
│  Effective date: [date]                                              │
│                                                                      │
│  "These terms govern your use of the myAdmin platform.               │
│   By creating an account, you agree to these terms."                 │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

Layout notes:

- Same style as privacy policy header
- Show both Dutch title ("Algemene Voorwaarden") and English for bilingual clarity
- `py-12`, left-aligned, `max-w-3xl`

---

## 2. Table of Contents (Sidebar)

Same sticky sidebar pattern as privacy policy page.

```
┌─────────────────┐
│  ON THIS PAGE   │
│                 │
│  1.  Definitions│
│  2.  Account    │
│  3.  Free trial │
│  4.  Subscript. │
│  5.  Payment    │
│  6.  Your data  │
│  7.  Acceptable │
│      use        │
│  8.  IP rights  │
│  9.  Liability  │
│  10. Warranty   │
│  11. Terminat.  │
│  12. Changes    │
│  13. Governing  │
│      law        │
│  14. Disputes   │
│  15. Contact    │
│                 │
└─────────────────┘
```

---

## 3. Terms Content Sections

Background: White (#FFFFFF)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  H2: "1. Definitions"                                                │
│  ────────────────────────────────────────                            │
│                                                                      │
│  • "Platform" — the myAdmin web application and website              │
│  • "Service" — all features provided through the Platform            │
│  • "User" / "You" — the person or entity using the Service          │
│  • "We" / "myAdmin" — [Company Legal Name], KvK [number]            │
│  • "Subscription" — a paid plan granting access to the Service       │
│  • "Content" — any data, text, or files you upload to the Platform  │
│  • "Property" — a unique rental listing managed through myAdmin      │
│                                                                      │
│  ────────────────────────────────────────                            │
│                                                                      │
│  H2: "2. Account registration"                                       │
│  ────────────────────────────────────────                            │
│                                                                      │
│  • You must be 18+ and legally able to enter contracts               │
│  • You must provide accurate, complete registration information      │
│  • You are responsible for keeping your login credentials secure     │
│  • One account per person; business accounts may have multiple       │
│    users under the Enterprise plan                                   │
│  • You must notify us immediately of unauthorized access             │
│                                                                      │
│  ────────────────────────────────────────                            │
│                                                                      │
│  H2: "3. Free trial"                                                 │
│  ────────────────────────────────────────                            │
│                                                                      │
│  • Trial period: 2 months from account creation                      │
│  • Full access to all features during trial                          │
│  • No credit card required to start                                  │
│  • Trial does not automatically convert to a paid subscription       │
│  • At trial end: choose a plan or your account becomes inactive      │
│  • Data retained for 30 days after trial expiry, then deleted        │
│  • One trial per person/company — abuse may result in termination    │
│                                                                      │
│  ────────────────────────────────────────                            │
│                                                                      │
│  H2: "4. Subscriptions & plans"                                      │
│  ────────────────────────────────────────                            │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  PLAN          │  PROPERTIES  │  PRICE        │  BILLING    │    │
│  ├────────────────┼─────────────┼───────────────┼─────────────┤    │
│  │  Starter       │  1-3         │  €49/month    │  Monthly or │    │
│  │  Professional  │  4-15        │  €99/month    │  annual     │    │
│  │  Enterprise    │  16+         │  Custom       │  Custom     │    │
│  └────────────────┴─────────────┴───────────────┴─────────────┘    │
│                                                                      │
│  • Annual billing: 20% discount (billed upfront)                     │
│  • Plan determines property limit and feature access                 │
│  • Upgrade: immediate, pro-rated credit applied                      │
│  • Downgrade: takes effect at next billing cycle                     │
│  • Add-ons (extra properties, users, analytics) billed separately   │
│                                                                      │
│  ────────────────────────────────────────                            │
│                                                                      │
│  H2: "5. Payment terms"                                              │
│  ────────────────────────────────────────                            │
│                                                                      │
│  • All prices are in EUR and exclude VAT (BTW) unless stated         │
│  • VAT is charged at the applicable Dutch/EU rate                    │
│  • Accepted methods: credit card (Visa, Mastercard, Amex),          │
│    iDEAL, SEPA direct debit, bank transfer (Enterprise only)        │
│  • Invoices issued electronically at the start of each period       │
│  • Payment due within 14 days of invoice date                        │
│  • Late payment: statutory commercial interest rate                  │
│    (wettelijke handelsrente, currently ECB rate + 8%)               │
│  • Persistent non-payment: account suspension after 30 days,        │
│    termination after 60 days                                         │
│  • Refunds: no refunds for partial billing periods;                  │
│    annual plans refundable pro-rata within first 30 days            │
│                                                                      │
│  ────────────────────────────────────────                            │
│                                                                      │
│  H2: "6. Your data & privacy"                                        │
│  ────────────────────────────────────────                            │
│                                                                      │
│  • You retain ownership of all data you upload to myAdmin            │
│  • We process your data as described in our [Privacy Policy]         │
│  • We act as "data processor" for your financial/booking data;       │
│    you are the "data controller" (GDPR terminology)                  │
│  • We will not sell, share, or use your data for purposes            │
│    other than providing the Service                                  │
│  • Data storage locations:                                           │
│    - Account data: Railway EU West (Amsterdam, Netherlands)          │
│    - Authentication: AWS Cognito EU-WEST-1 (Ireland)                 │
│    - Documents & invoices: your own Google Drive or S3 bucket        │
│  • Data export: you can export your data at any time in              │
│    standard formats (CSV, PDF)                                       │
│  • Data retention after contract closure: 1 year, with data          │
│    export available throughout, then permanently deleted              │
│  • Documents and invoices stored on your own Google Drive or         │
│    S3 are owned and controlled by you — we do not delete these       │
│  • You are responsible for retaining financial records for            │
│    7 years as required by Dutch tax law (AWR) — ensure your          │
│    documents are stored in your own Google Drive or S3               │
│  • If we act as data processor, a Data Processing Agreement          │
│    (Verwerkersovereenkomst) is available upon request                │
│                                                                      │
│  ────────────────────────────────────────                            │
│                                                                      │
│  H2: "7. Acceptable use"                                             │
│  ────────────────────────────────────────                            │
│                                                                      │
│  You agree NOT to:                                                   │
│  • Use the Service for illegal activities                            │
│  • Upload malicious code or attempt to breach security               │
│  • Share your account credentials with unauthorized parties          │
│  • Reverse-engineer, scrape, or copy the Platform                    │
│  • Use the Service to process data for third parties without         │
│    an Enterprise plan                                                │
│  • Exceed your plan's property limit without upgrading               │
│  • Misrepresent your identity or property count                      │
│                                                                      │
│  Violation may result in immediate account suspension or             │
│  termination without refund.                                         │
│                                                                      │
│  ────────────────────────────────────────                            │
│                                                                      │
│  H2: "8. Intellectual property"                                      │
│  ────────────────────────────────────────                            │
│                                                                      │
│  • The myAdmin platform, brand, code, design, and documentation     │
│    are owned by [Company Legal Name] and protected by Dutch and      │
│    international copyright law (Auteurswet)                          │
│  • Your subscription grants a non-exclusive, non-transferable        │
│    license to use the Service for your business purposes             │
│  • You may not sublicense, resell, or white-label the Service       │
│    without an Enterprise agreement                                   │
│  • Feedback and suggestions you provide may be used by us to        │
│    improve the Service without obligation or compensation            │
│                                                                      │
│  ────────────────────────────────────────                            │
│                                                                      │
│  H2: "9. Limitation of liability"                                    │
│  ────────────────────────────────────────                            │
│                                                                      │
│  ⚠️  Important section — highlighted with a subtle warning bg        │
│                                                                      │
│  • myAdmin is a tool to assist with financial administration;        │
│    it does NOT replace professional tax or accounting advice         │
│  • You are responsible for verifying the accuracy of tax             │
│    declarations and financial reports generated by the Platform      │
│  • Our total liability is limited to the amount you paid in the      │
│    12 months preceding the claim                                     │
│  • We are NOT liable for:                                            │
│    - Indirect, consequential, or incidental damages                  │
│    - Lost profits or revenue                                         │
│    - Tax penalties resulting from incorrect filings                  │
│    - Data loss due to circumstances beyond our control               │
│    - Third-party service outages (Airbnb, banks, etc.)              │
│  • These limitations apply to the maximum extent permitted           │
│    by Dutch law (Article 6:233 BW for general terms)                │
│  • Nothing in these terms excludes liability for gross               │
│    negligence (grove schuld) or willful misconduct (opzet)          │
│                                                                      │
│  ────────────────────────────────────────                            │
│                                                                      │
│  H2: "10. Warranty disclaimer"                                       │
│  ────────────────────────────────────────                            │
│                                                                      │
│  • The Service is provided "as is" and "as available"                │
│  • We aim for 99.5% uptime but do not guarantee uninterrupted       │
│    service                                                           │
│  • Scheduled maintenance will be communicated in advance             │
│  • We do not warrant that the Service will meet all your             │
│    specific requirements                                             │
│  • AI-powered features (pricing recommendations, invoice            │
│    processing) are assistive tools — results should be verified     │
│                                                                      │
│  ────────────────────────────────────────                            │
│                                                                      │
│  H2: "11. Termination"                                               │
│  ────────────────────────────────────────                            │
│                                                                      │
│  By you:                                                             │
│  • Cancel anytime from your account settings                         │
│  • Access continues until end of current billing period              │
│  • No cancellation fees                                              │
│  • Data export available for 30 days after cancellation              │
│                                                                      │
│  By us:                                                              │
│  • We may terminate for breach of these terms (with notice)          │
│  • We may terminate immediately for serious violations               │
│    (fraud, security breach, illegal use)                             │
│  • If we discontinue the Service: 90 days notice + pro-rated        │
│    refund + data export period                                       │
│                                                                      │
│  After termination:                                                  │
│  • Data retained for 1 year after contract closure, with             │
│    export available throughout                                       │
│  • After 1 year: account data permanently deleted from               │
│    Railway and Cognito                                               │
│  • Documents on your Google Drive / S3 are unaffected —              │
│    you own and control those                                         │
│  • You are responsible for 7-year financial record retention          │
│    (Dutch tax law) via your own storage                              │
│  • Sections that survive termination: 6 (data), 8 (IP),             │
│    9 (liability), 13 (governing law), 14 (disputes)                 │
│                                                                      │
│  ────────────────────────────────────────                            │
│                                                                      │
│  H2: "12. Changes to these terms"                                    │
│  ────────────────────────────────────────                            │
│                                                                      │
│  • We may modify these terms with 30 days written notice             │
│    (email + in-app notification)                                     │
│  • Material changes require explicit acceptance on next login        │
│  • Continued use after the notice period = acceptance                │
│  • If you disagree: you may terminate your account before            │
│    the changes take effect, with pro-rated refund                    │
│  • Previous versions available upon request                          │
│                                                                      │
│  ────────────────────────────────────────                            │
│                                                                      │
│  H2: "13. Governing law"                                             │
│  ────────────────────────────────────────                            │
│                                                                      │
│  • These terms are governed by the laws of the Netherlands           │
│  • Dutch civil code (Burgerlijk Wetboek) applies                     │
│  • EU consumer protection regulations apply where applicable         │
│  • In case of conflict between language versions, the Dutch          │
│    version prevails                                                  │
│                                                                      │
│  ────────────────────────────────────────                            │
│                                                                      │
│  H2: "14. Dispute resolution"                                        │
│  ────────────────────────────────────────                            │
│                                                                      │
│  • We prefer to resolve disputes amicably — contact us first        │
│  • If unresolved within 30 days: mediation through a certified      │
│    Dutch mediator (MfN-registered)                                   │
│  • If mediation fails: exclusive jurisdiction of the competent       │
│    court in [Amsterdam / city of registration]                       │
│  • For EU consumers: you may also use the EU Online Dispute          │
│    Resolution platform (https://ec.europa.eu/odr)                    │
│                                                                      │
│  ────────────────────────────────────────                            │
│                                                                      │
│  H2: "15. Contact"                                                   │
│  ────────────────────────────────────────                            │
│                                                                      │
│  [Company Legal Name]                                                │
│  KvK: [number]                                                       │
│  BTW-id: [NL number]                                                 │
│  Address: [registered address]                                       │
│                                                                      │
│  General: hello@myadmin.nl                                           │
│  Legal: legal@myadmin.nl                                             │
│  Privacy: privacy@myadmin.nl                                         │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 4. Footer

Same footer as all pages (see shared-layout.md).

---

## Page-Level Notes

**SEO:**

- Page title: "Terms of Service — myAdmin"
- Meta description: "Terms of Service (Algemene Voorwaarden) for the myAdmin STR property management platform. Governed by Dutch law."
- Index this page (transparency builds trust)

**Design:**

- Same layout pattern as privacy policy: sticky sidebar TOC + content area
- Body text: `text-base leading-relaxed text-gray-700`
- Section headings: `text-2xl font-heading font-bold text-gray-900`
- Liability section (9): subtle warning background (`bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg`)
- Tables: `text-sm`, alternating rows, `rounded-lg`
- Max content width: `max-w-3xl`
- Generous section spacing: `space-y-12`

**Responsive:**

- Desktop: sticky sidebar TOC (25%) + content (75%)
- Tablet: TOC collapses to horizontal pills or dropdown at top
- Mobile: collapsible "Jump to section" button, full-width content

**Dutch law specifics included:**

- Wettelijke handelsrente (statutory commercial interest) for late payments
- Article 6:233 BW reference for general terms reasonableness
- Auteurswet (Copyright Act) for IP protection
- Verwerkersovereenkomst (DPA) availability
- KvK and BTW-id identification requirements
- MfN-registered mediator for dispute resolution
- EU ODR platform reference for consumer disputes
- 7-year financial record retention per Dutch tax law
- Distinction between grove schuld/opzet and regular liability

**Legal notes:**

- This wireframe provides structure and content direction — final legal text MUST be reviewed by a Dutch legal professional (advocaat) familiar with SaaS/IT law
- Consider using Dutch Chamber of Commerce (KvK) model terms as a starting point
- The terms must be available in Dutch at launch (`/nl/terms`) — Dutch version is legally binding
- Terms must be presented and accepted before account creation (checkbox on signup form)
- Keep a versioned archive of previous terms
