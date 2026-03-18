# Mobile Responsive Considerations

This document consolidates all responsive behavior across pages. Use alongside the individual page wireframes.

---

## Breakpoints

| Name    | Width      | Tailwind      | Primary device              |
| ------- | ---------- | ------------- | --------------------------- |
| Mobile  | < 640px    | default       | Phones (portrait)           |
| Tablet  | 640–1024px | `sm:` / `md:` | Tablets, phones (landscape) |
| Desktop | > 1024px   | `lg:` / `xl:` | Laptops, desktops           |

Max content width: `max-w-7xl` (1280px), centered with `mx-auto`.

---

## Global Responsive Rules

**Typography scaling:**

| Element    | Desktop | Mobile  | Tailwind                           |
| ---------- | ------- | ------- | ---------------------------------- |
| Hero H1    | 56-64px | 36-40px | `text-4xl sm:text-5xl lg:text-6xl` |
| Section H2 | 36-40px | 28-30px | `text-3xl lg:text-4xl`             |
| Card H3    | 24px    | 20px    | `text-xl lg:text-2xl`              |
| Body       | 16-18px | 16px    | `text-base lg:text-lg`             |

**Spacing scaling:**

| Context                      | Desktop      | Mobile  | Tailwind                  |
| ---------------------------- | ------------ | ------- | ------------------------- |
| Section padding (vertical)   | 80-96px      | 48-64px | `py-12 sm:py-16 lg:py-20` |
| Section padding (horizontal) | 0 (centered) | 16-24px | `px-4 sm:px-6 lg:px-0`    |
| Grid gaps                    | 24-32px      | 16-20px | `gap-4 sm:gap-6 lg:gap-8` |
| Card padding                 | 32px         | 20-24px | `p-5 sm:p-6 lg:p-8`       |

**Touch targets:**

- Minimum tap target: 44×44px (WCAG 2.5.8)
- Buttons: `py-3 px-6` minimum on mobile
- Nav links in drawer: `py-4` with full-width tap area
- Accordion items: full-width clickable row, `py-4`

---

## Homepage — Section by Section

### Hero

| Aspect         | Desktop                          | Mobile                                  |
| -------------- | -------------------------------- | --------------------------------------- |
| Layout         | Two-column (text 55%, image 45%) | Single column, stacked                  |
| Order          | Text left, image right           | Text first, image below                 |
| Image          | Full size, right-aligned         | Scaled down, centered, `max-w-sm`       |
| CTAs           | Inline (side by side)            | Stacked, full-width buttons             |
| Platform logos | Single row                       | Wrap to 2 rows if needed, smaller logos |
| H1 size        | `text-6xl`                       | `text-4xl`                              |

### Problem / Solution

| Aspect               | Desktop                                  | Mobile                     |
| -------------------- | ---------------------------------------- | -------------------------- |
| Layout               | Two-column (Before / After side by side) | Stacked vertically         |
| Order                | Before left, After right                 | Before on top, After below |
| Flow diagrams        | Full detail                              | Simplified, smaller icons  |
| Pain/benefit bullets | Side by side with diagram                | Below each diagram         |

### Feature Showcase (Tabs)

| Aspect       | Desktop                                  | Mobile                                               |
| ------------ | ---------------------------------------- | ---------------------------------------------------- |
| Tabs         | Horizontal row, centered                 | Horizontal scroll with fade edges, or pill-style row |
| Tab content  | Two-column (list left, screenshot right) | Stacked: screenshot on top, list below               |
| Screenshots  | Large, `rounded-2xl`                     | Full-width, `rounded-xl`                             |
| Feature list | Checkmark list                           | Same, but tighter spacing                            |

### Social Proof

| Aspect            | Desktop       | Mobile                              |
| ----------------- | ------------- | ----------------------------------- |
| Testimonial cards | 3-column grid | Horizontal carousel (swipeable)     |
| Carousel          | Not needed    | Dots indicator below, swipe gesture |
| Metrics bar       | 4-column row  | 2×2 grid                            |
| Card size         | Fixed width   | Full-width minus padding            |

### Pricing

| Aspect     | Desktop                           | Mobile                            |
| ---------- | --------------------------------- | --------------------------------- |
| Cards      | 3-column, center elevated         | Stacked vertically                |
| Card order | Starter, Professional, Enterprise | Professional first (most popular) |
| Toggle     | Centered above cards              | Same, full-width pill             |
| Trust line | Below cards, centered             | Same                              |

### Integrations

| Aspect        | Desktop                            | Mobile                            |
| ------------- | ---------------------------------- | --------------------------------- |
| Layout        | 3-column (categories side by side) | Single column, categories stacked |
| Logos         | Grid within each category          | Horizontal row, wrap              |
| "Coming soon" | Inline badge                       | Same                              |

### FAQ

| Aspect       | Desktop              | Mobile                   |
| ------------ | -------------------- | ------------------------ |
| Width        | `max-w-3xl` centered | Full-width with padding  |
| Accordion    | Same behavior        | Same, larger tap targets |
| "Contact Us" | Below accordion      | Same                     |

### CTA Banner

| Aspect | Desktop                     | Mobile            |
| ------ | --------------------------- | ----------------- |
| Layout | H2 left, CTA right (inline) | Stacked, centered |
| Button | Auto-width                  | Full-width        |

---

## Pricing Page

### Pricing Cards

Same as homepage pricing section (see above).

### Add-Ons

| Aspect | Desktop             | Mobile                    |
| ------ | ------------------- | ------------------------- |
| Layout | 4-column grid (3+1) | 2-column grid, or stacked |
| Cards  | Equal height        | Auto height               |

### Feature Comparison Table

| Aspect           | Desktop                               | Mobile                                                                      |
| ---------------- | ------------------------------------- | --------------------------------------------------------------------------- |
| Table            | Full table visible, sticky header row | Two approaches (pick one):                                                  |
|                  |                                       | **Option A**: Horizontal scroll with sticky first column (feature names)    |
|                  |                                       | **Option B**: Plan selector dropdown — pick 2 plans to compare side by side |
| Column highlight | Professional column has light blue bg | Same                                                                        |
| CTAs             | Bottom of each column                 | Sticky bottom bar with selected plan CTA                                    |

### Pricing FAQ

Same behavior as homepage FAQ (see above).

---

## Trial Signup Page

### Signup Form

| Aspect         | Desktop                                   | Mobile                                               |
| -------------- | ----------------------------------------- | ---------------------------------------------------- |
| Layout         | Two-column (value props left, form right) | Single column, stacked                               |
| Order          | Side by side                              | Value props on top (condensed), form below           |
| Value props    | Full checklist + logos                    | Shortened to 3-4 key points, logos hidden or smaller |
| Form card      | `max-w-md`, right-aligned                 | Full-width, no card shadow (feels native)            |
| Form inputs    | Standard width                            | Full-width                                           |
| CTA button     | Auto-width within form                    | Full-width                                           |
| Social signup  | Inline buttons                            | Stacked full-width buttons                           |
| Password field | Show/hide toggle inline                   | Same, ensure toggle is 44px tap target               |

### Email Verification

| Aspect          | Desktop              | Mobile                                    |
| --------------- | -------------------- | ----------------------------------------- |
| Card            | `max-w-md`, centered | Full-width with padding, no card border   |
| Icon            | Large (64px)         | Medium (48px)                             |
| "Resend" button | Inline text link     | Full-width outline button (easier to tap) |

### Confirmation / Welcome

| Aspect     | Desktop              | Mobile                  |
| ---------- | -------------------- | ----------------------- |
| Card       | `max-w-md`, centered | Full-width with padding |
| Steps list | Numbered list        | Same                    |
| CTA        | Auto-width           | Full-width              |

---

## Shared Layout

### Header

See `shared-layout.md` for full responsive specs. Summary:

| Aspect            | Desktop        | Tablet           | Mobile                    |
| ----------------- | -------------- | ---------------- | ------------------------- |
| Nav links         | Visible inline | Hidden in drawer | Hidden in drawer          |
| Language dropdown | Visible inline | Visible inline   | Inside drawer             |
| CTA button        | Visible inline | Compact "Trial"  | Inside drawer, full-width |
| Hamburger         | Hidden         | Visible          | Visible                   |
| Height            | 64px           | 56px             | 56px                      |

### Footer

See `shared-layout.md` for full responsive specs. Summary:

| Aspect         | Desktop                    | Tablet              | Mobile            |
| -------------- | -------------------------- | ------------------- | ----------------- |
| Link columns   | 4-column grid              | 4-column (narrower) | 2×2 grid          |
| Logo + tagline | Left-aligned               | Left-aligned        | Centered          |
| Bottom bar     | Copyright left, lang right | Same                | Stacked, centered |

---

## Image & Media Handling

| Asset type                | Desktop                | Mobile                                     |
| ------------------------- | ---------------------- | ------------------------------------------ |
| Hero image/illustration   | Full size, beside text | Scaled down below text, `max-w-sm mx-auto` |
| Dashboard screenshots     | Large with shadow      | Full-width, smaller border radius          |
| Platform logos            | Row, original size     | Smaller, may wrap to 2 rows                |
| Integration logos         | Grid per category      | Inline row, wrap                           |
| Icons (features, metrics) | 48-64px                | 36-48px                                    |

**Image optimization:**

- Use `<Image>` from `next/image` for automatic responsive sizing
- Provide `sizes` attribute: `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"`
- Use WebP format with JPEG fallback
- Lazy load all images below the fold (`loading="lazy"`)
- Hero image: eager load (`priority` prop in Next.js)

---

## Interaction Patterns

| Pattern        | Desktop                                     | Mobile                                       |
| -------------- | ------------------------------------------- | -------------------------------------------- |
| Hover states   | Color change, shadow lift                   | Not applicable (no hover on touch)           |
| Focus states   | `ring-2 ring-brand-blue`                    | Same (keyboard + assistive tech)             |
| Tooltips       | On hover                                    | On tap (toggle), or replace with inline text |
| Dropdowns      | Click to open, click-outside to close       | Same + swipe-down to close                   |
| Carousels      | Not used (grid layouts)                     | Swipe gesture + dot indicators               |
| Accordions     | Click row to expand                         | Same, full-width tap target                  |
| Scroll anchors | Smooth scroll with offset for sticky header | Same, offset = 56px (mobile header height)   |

---

## Performance Considerations

- **Mobile-first CSS**: Write base styles for mobile, layer up with `sm:`, `md:`, `lg:` breakpoints
- **Font loading**: Use `font-display: swap` (already set via Google Fonts `&display=swap`)
- **Critical CSS**: Inline above-the-fold styles for hero section
- **Bundle size**: Keep JS minimal — most sections are static content, no heavy client-side logic needed
- **Lighthouse targets**: 90+ on Performance, Accessibility, Best Practices, SEO (mobile)
- **Core Web Vitals**:
  - LCP < 2.5s (hero image/text)
  - FID < 100ms (minimal JS)
  - CLS < 0.1 (reserve space for images, fonts)

---

## Testing Checklist

Before launch, test each page on:

- [ ] iPhone SE (375px) — smallest common phone
- [ ] iPhone 14/15 (390px) — standard phone
- [ ] iPhone 14 Pro Max (430px) — large phone
- [ ] iPad (768px) — tablet portrait
- [ ] iPad landscape (1024px) — tablet/small laptop
- [ ] 1280px — standard laptop
- [ ] 1440px+ — large desktop
- [ ] Landscape orientation on phones
- [ ] With keyboard navigation (no mouse)
- [ ] With screen reader (VoiceOver / NVDA)
- [ ] Slow 3G throttle (Chrome DevTools)
