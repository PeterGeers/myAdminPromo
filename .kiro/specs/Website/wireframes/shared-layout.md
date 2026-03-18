# Shared Layout Wireframe — Header & Footer

These components appear on every page. They live as shared Next.js layout components (`Header.tsx`, `Footer.tsx`) used in the root layout.

---

## Header / Navigation Bar

Sticky, white background, subtle bottom shadow on scroll.

### Desktop (> 1024px)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  [Logo]     Features    Pricing    FAQ    Blog    [🌐 NL ▾] [Start Trial]│
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Tablet (640–1024px)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  [Logo]                                    [🌐 NL ▾] [Trial] [☰]   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Mobile (< 640px)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  [Logo]                                              [☰]            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Mobile Drawer (hamburger open)

```
┌──────────────────────────────────────────────────────────────────────┐
│  [Logo]                                              [✕]            │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Features                                                            │
│  ─────────────────────────────────────────────────                   │
│  Pricing                                                             │
│  ─────────────────────────────────────────────────                   │
│  FAQ                                                                 │
│  ─────────────────────────────────────────────────                   │
│  Blog                                                                │
│  ─────────────────────────────────────────────────                   │
│                                                                      │
│  [🌐 NL ▾]  Language selector                                       │
│                                                                      │
│  ┌──────────────────────────────────────────────┐                   │
│  │          Start Free Trial                     │                   │
│  └──────────────────────────────────────────────┘                   │
│                                                                      │
│  Already have an account? Log in →                                   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Header Specifications

**Logo:**

- Horizontal variant (icon + wordmark)
- Links to homepage (`/`)
- Height: 32px (desktop), 28px (mobile)

**Nav Links:**

| Label | Target | Type | Notes |
|---|---|---|---|
| Features | `/#features` | Scroll anchor | On homepage: smooth scroll. On other pages: navigate to homepage + scroll |
| Pricing | `/pricing` | Page route | Dedicated pricing page |
| FAQ | `/#faq` | Scroll anchor | Same behavior as Features |
| Blog | `/blog` | Page route | Blog listing page (Phase 2, hidden until ready) |

- Style: `font-sans text-[15px] font-medium text-gray-700 hover:text-brand-blue transition-colors`
- Active page: `text-brand-blue` with subtle underline or heavier weight
- Spacing between links: `gap-8`

**Language Dropdown:**

```
┌──────────────┐
│  🌐 NL ▾     │
└──────┬───────┘
       │
┌──────┴───────────────┐
│  🇳🇱 Nederlands  ✓   │  ← active
│  🇬🇧 English         │
│  ─────────────────── │
│  🇩🇪 Deutsch    soon │  ← disabled, muted
│  🇫🇷 Français   soon │
│  🇪🇸 Español    soon │
│  🇮🇹 Italiano   soon │
│  🇵🇹 Português  soon │
└──────────────────────┘
```

- Trigger: button showing globe icon + current language code + chevron
- Dropdown: `rounded-xl`, `shadow-lg`, white bg, `py-2`
- Active language: checkmark, `text-brand-blue`
- "Coming soon" languages: muted text (`text-gray-400`), not clickable
- Divider between active and coming-soon languages
- Closes on: selection, click outside, Escape key
- Selection updates URL path prefix (`/nl/...`, `/en/...`) and sets locale cookie
- Position: aligned right on desktop, full-width in mobile drawer

**CTA Button:**
- Label: "Start Free Trial" (desktop), "Trial" (tablet, space-constrained)
- Style: `bg-brand-blue text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-800 transition-colors`
- Links to `/signup`
- On the signup page itself: button changes to "Log In" linking to the app login

**Scroll Behavior:**
- Sticky: `position: sticky; top: 0; z-index: 50`
- On scroll down: add `shadow-sm` via scroll listener or Intersection Observer
- Optional: hide on scroll down, show on scroll up (mobile only, for more screen space)
- Height: 64px (desktop), 56px (mobile)
- Background: white with `backdrop-blur-sm` for slight transparency effect

**Mobile Drawer:**
- Slide in from right, with backdrop overlay (`bg-black/50`)
- Close button (✕) in top-right
- Nav links: full-width, `py-4`, large tap targets
- Dividers between links
- CTA button: full-width, prominent at bottom
- "Log in" text link below CTA
- Trap focus inside drawer when open (accessibility)
- Close on Escape key

---

## Footer

Appears on every page. Dark background, light text.

### Desktop (> 1024px)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │                                                                │  │
│  │  [Logo - white variant]                                        │  │
│  │  "The integrated platform for                                  │  │
│  │   STR property managers"                                       │  │
│  │                                                                │  │
│  │  Product       Company      Legal         Connect              │  │
│  │  ──────────    ──────────   ──────────    ──────────           │  │
│  │  Features      About        Privacy       Twitter/X            │  │
│  │  Pricing       Blog         Terms         LinkedIn             │  │
│  │  Integrations  Careers      Cookies       Email                │  │
│  │  FAQ           Contact      GDPR          YouTube              │  │
│  │  Changelog                                                     │  │
│  │                                                                │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │                                                                │  │
│  │  © 2026 myAdmin. All rights reserved.          [🌐 NL ▾]      │  │
│  │                                                                │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Tablet (640–1024px)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  [Logo - white]                                                      │
│  "The integrated platform for STR property managers"                 │
│                                                                      │
│  Product       Company      Legal         Connect                    │
│  ──────────    ──────────   ──────────    ──────────                 │
│  Features      About        Privacy       Twitter/X                  │
│  Pricing       Blog         Terms         LinkedIn                   │
│  Integrations  Careers      Cookies       Email                      │
│  FAQ           Contact      GDPR          YouTube                    │
│                                                                      │
│  ────────────────────────────────────────────────────                │
│  © 2026 myAdmin.                              [🌐 NL ▾]             │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Mobile (< 640px)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  [Logo - white]                                                      │
│  "The integrated platform for                                        │
│   STR property managers"                                             │
│                                                                      │
│  Product            Company                                          │
│  ──────────         ──────────                                       │
│  Features           About                                            │
│  Pricing            Blog                                             │
│  Integrations       Careers                                          │
│  FAQ                Contact                                          │
│                                                                      │
│  Legal              Connect                                          │
│  ──────────         ──────────                                       │
│  Privacy            Twitter/X                                        │
│  Terms              LinkedIn                                         │
│  Cookies            Email                                            │
│  GDPR               YouTube                                         │
│                                                                      │
│  ────────────────────────────────────────                            │
│  [🌐 NL ▾]                                                          │
│  © 2026 myAdmin. All rights reserved.                                │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Footer Specifications

**Background:** Deep Slate `#0F172A` (`bg-preview-dark`)

**Logo:**
- White variant of the logo
- Height: 28px
- Tagline below: `font-sans text-sm text-gray-400`

**Link Columns:**

| Column | Links |
|---|---|
| Product | Features, Pricing, Integrations, FAQ, Changelog |
| Company | About, Blog, Careers, Contact |
| Legal | Privacy Policy, Terms of Service, Cookie Settings, GDPR |
| Connect | Twitter/X, LinkedIn, Email, YouTube |

- Column headers: `font-heading text-sm font-semibold text-white uppercase tracking-wider`
- Links: `font-sans text-sm text-gray-400 hover:text-white transition-colors`
- Spacing: `space-y-3` between links, `gap-8` between columns
- Desktop: 4-column grid
- Tablet: 4-column grid (narrower)
- Mobile: 2-column grid (Product + Company top row, Legal + Connect bottom row)

**Social Links (in Connect column):**
- Text links (not icon-only) for clarity
- Open in new tab (`target="_blank" rel="noopener noreferrer"`)
- Email link: `mailto:hello@myadmin.nl`

**Bottom Bar:**
- Top border: `border-t border-gray-800`
- Copyright left, language dropdown right (desktop/tablet)
- Language dropdown on top, copyright below (mobile)
- Copyright: `font-sans text-sm text-gray-500`
- Language dropdown: same component as header, but styled for dark bg
  - Trigger text: `text-gray-400 hover:text-white`
  - Dropdown panel: same white bg as header version (pops over dark footer)

**Padding:**
- Main footer content: `py-12 px-6` (mobile), `py-16 px-8` (desktop)
- Bottom bar: `py-6`
- Max width: `max-w-7xl mx-auto`

---

## Shared Component Structure (Next.js)

```
app/
├── layout.tsx              ← Root layout, includes Header + Footer
├── [locale]/
│   ├── layout.tsx          ← Locale layout (wraps i18n provider)
│   ├── page.tsx            ← Homepage
│   ├── pricing/page.tsx
│   ├── signup/page.tsx
│   └── blog/page.tsx
components/
├── layout/
│   ├── Header.tsx          ← Sticky nav, responsive
│   ├── Footer.tsx          ← Dark footer
│   ├── MobileDrawer.tsx    ← Slide-out mobile nav
│   └── LanguageDropdown.tsx ← Shared between header + footer
├── ui/
│   ├── Button.tsx          ← Primary, secondary, outline variants
│   └── Container.tsx       ← max-w-7xl centered wrapper
```

---

## Accessibility Notes

- Header: `<header role="banner">`, nav wrapped in `<nav aria-label="Main navigation">`
- Footer: `<footer role="contentinfo">`, nav wrapped in `<nav aria-label="Footer navigation">`
- Mobile drawer: `aria-expanded` on hamburger, focus trap when open, `aria-hidden` on main content
- Language dropdown: `aria-haspopup="listbox"`, `aria-expanded`, keyboard navigable (arrow keys)
- Skip-to-content link: hidden link before header that becomes visible on focus, jumps to `<main>`
- All interactive elements have visible focus indicators (`focus-visible:ring-2 ring-brand-blue`)
