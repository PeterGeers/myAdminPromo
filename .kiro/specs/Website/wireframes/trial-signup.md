# Trial Signup Page Wireframe — myAdmin Website

This page handles the free 2-month trial registration. It's the destination for all "Start Free Trial" CTAs across the site. The flow is: form → email verification → redirect to myAdmin app onboarding.

---

## Navigation Bar

Same sticky nav as other pages. CTA button in nav changes to "Log In" (since user is already on the signup page).

---

## 1. Signup Form (Main Content)

Background: Off-white (#F8FAFC), full viewport height (min-height)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ┌──────────────────────────┐  ┌─────────────────────────────────┐  │
│  │                          │  │                                 │  │
│  │  H1: "Start your free   │  │  ┌─────────────────────────┐   │  │
│  │   2-month trial"        │  │  │                         │   │  │
│  │                          │  │  │  First name *           │   │  │
│  │  Sub: "Full access to   │  │  │  [___________________]  │   │  │
│  │  all features. No credit│  │  │                         │   │  │
│  │  card required."        │  │  │  Last name *            │   │  │
│  │                          │  │  │  [___________________]  │   │  │
│  │                          │  │  │                         │   │  │
│  │  ✓ All STR analytics    │  │  │  Email address *        │   │  │
│  │  ✓ Pricing insights     │  │  │  [___________________]  │   │  │
│  │  ✓ Financial reports    │  │  │                         │   │  │
│  │  ✓ Tax declarations     │  │  │  Password *             │   │  │
│  │  ✓ No credit card       │  │  │  [_______________] [👁]  │   │  │
│  │  ✓ Cancel anytime       │  │  │                         │   │  │
│  │                          │  │  │  Company name           │   │  │
│  │                          │  │  │  [___________________]  │   │  │
│  │                          │  │  │                         │   │  │
│  │  "Trusted by property   │  │  │  Number of properties   │   │  │
│  │   managers across the   │  │  │  [▾ Select range      ] │   │  │
│  │   Netherlands"          │  │  │                         │   │  │
│  │                          │  │  │  How did you hear       │   │  │
│  │  [Airbnb] [Booking.com] │  │  │  about us?              │   │  │
│  │  [Rabobank] [ING]       │  │  │  [▾ Select            ] │   │  │
│  │                          │  │  │                         │   │  │
```

│ │ │ │ │ ☐ I agree to the │ │ │
│ │ │ │ │ Terms of Service │ │ │
│ │ │ │ │ and Privacy Policy \* │ │ │
│ │ │ │ │ │ │ │
│ │ │ │ │ [Start Free Trial ] │ │ │
│ │ │ │ │ │ │ │
│ │ │ │ │ Already have an │ │ │
│ │ │ │ │ account? Log in → │ │ │
│ │ │ │ │ │ │ │
│ └──────────────────────────┘ │ └─────────────────────────┘ │ │
│ │ │ │
│ │ Or sign up with: │ │
│ │ [G] Google [M] Microsoft │ │
│ │ │ │
│ └─────────────────────────────────┘ │
│ │
└──────────────────────────────────────────────────────────────────────┘

```

### Form Fields Detail

| Field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| First name | text | ✓ | Min 2 chars | |
| Last name | text | ✓ | Min 2 chars | |
| Email address | email | ✓ | Valid email format, unique check | Show error if already registered |
| Password | password | ✓ | Min 8 chars, 1 uppercase, 1 number | Show/hide toggle, strength indicator |
| Company name | text | — | | Optional, for business accounts |
| Number of properties | select | — | | Options: "1-3", "4-10", "11-15", "16-30", "30+" |
| How did you hear about us? | select | — | | Options: "Google search", "Social media", "Friend/colleague", "Blog/article", "Podcast", "Other" |
| Terms agreement | checkbox | ✓ | Must be checked | Links to Terms and Privacy Policy pages |

### Validation Rules & Error States

Validation triggers on blur (per field) and on form submit (all fields). Errors display inline below the field in red (`text-red-600`), with `aria-describedby` linking the error to the input.

**First name:**

| Rule | Regex / Check | Error (EN) | Error (NL) |
|---|---|---|---|
| Required | non-empty | "First name is required" | "Voornaam is verplicht" |
| Min length | `.length >= 2` | "First name must be at least 2 characters" | "Voornaam moet minimaal 2 tekens bevatten" |
| Max length | `.length <= 50` | "First name must be 50 characters or less" | "Voornaam mag maximaal 50 tekens bevatten" |
| Valid chars | `/^[a-zA-ZÀ-ÿ\s'-]+$/` | "First name contains invalid characters" | "Voornaam bevat ongeldige tekens" |

**Last name:**

| Rule | Regex / Check | Error (EN) | Error (NL) |
|---|---|---|---|
| Required | non-empty | "Last name is required" | "Achternaam is verplicht" |
| Min length | `.length >= 2` | "Last name must be at least 2 characters" | "Achternaam moet minimaal 2 tekens bevatten" |
| Max length | `.length <= 50` | "Last name must be 50 characters or less" | "Achternaam mag maximaal 50 tekens bevatten" |
| Valid chars | `/^[a-zA-ZÀ-ÿ\s'-]+$/` | "Last name contains invalid characters" | "Achternaam bevat ongeldige tekens" |

**Email address:**

| Rule | Regex / Check | Error (EN) | Error (NL) |
|---|---|---|---|
| Required | non-empty | "Email address is required" | "E-mailadres is verplicht" |
| Format | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | "Please enter a valid email address" | "Voer een geldig e-mailadres in" |
| Max length | `.length <= 254` | "Email address is too long" | "E-mailadres is te lang" |
| Unique (async) | API check on blur (debounced 500ms) | "An account with this email already exists. [Log in instead →]" | "Er bestaat al een account met dit e-mailadres. [Log in →]" |

**Password:**

| Rule | Regex / Check | Error (EN) | Error (NL) |
|---|---|---|---|
| Required | non-empty | "Password is required" | "Wachtwoord is verplicht" |
| Min length | `.length >= 8` | "Password must be at least 8 characters" | "Wachtwoord moet minimaal 8 tekens bevatten" |
| Max length | `.length <= 128` | "Password must be 128 characters or less" | "Wachtwoord mag maximaal 128 tekens bevatten" |
| Uppercase | `/[A-Z]/` | "Password must contain at least one uppercase letter" | "Wachtwoord moet minimaal één hoofdletter bevatten" |
| Number | `/[0-9]/` | "Password must contain at least one number" | "Wachtwoord moet minimaal één cijfer bevatten" |

Password strength indicator (visual bar below field):

| Strength | Criteria | Color | Label (EN) | Label (NL) |
|---|---|---|---|---|
| Weak | < 8 chars or missing uppercase/number | Red `#EF4444` | "Weak" | "Zwak" |
| Fair | 8+ chars, has uppercase + number | Orange `#F59E0B` | "Fair" | "Redelijk" |
| Good | 10+ chars, uppercase + number + special char | Teal `#0D9488` | "Good" | "Goed" |
| Strong | 12+ chars, uppercase + number + special char | Green `#22C55E` | "Strong" | "Sterk" |

**Company name (optional):**

| Rule | Regex / Check | Error (EN) | Error (NL) |
|---|---|---|---|
| Max length | `.length <= 100` | "Company name must be 100 characters or less" | "Bedrijfsnaam mag maximaal 100 tekens bevatten" |

**Terms agreement:**

| Rule | Check | Error (EN) | Error (NL) |
|---|---|---|---|
| Required | `checked === true` | "You must agree to the Terms of Service and Privacy Policy" | "U moet akkoord gaan met de Algemene Voorwaarden en het Privacybeleid" |

**Form-level error states:**

| Scenario | HTTP | Error (EN) | Error (NL) |
|---|---|---|---|
| Server error | 500 | "Something went wrong. Please try again." | "Er is iets misgegaan. Probeer het opnieuw." |
| Rate limited | 429 | "Too many attempts. Please try again in 60 seconds." | "Te veel pogingen. Probeer het over 60 seconden opnieuw." |
| Network error | — | "No internet connection. Check your network and try again." | "Geen internetverbinding. Controleer uw netwerk en probeer het opnieuw." |

**Validation UX behavior:**

- On blur: validate the field, show error if invalid, show green checkmark if valid
- On submit: validate all fields, focus the first field with an error, scroll into view if needed
- Async email check: debounce 500ms after blur, show spinner while checking, then error or checkmark
- Disable submit button while form is submitting (show spinner)
- Error messages appear with a subtle slide-down animation (`150ms ease-out`)
- Errors clear when user starts typing in the field again

### Layout Notes

- Two-column on desktop: value props left (45%), form right (55%)
- Left column: headline, benefit checklist (brand-teal checkmarks), trust signal, platform logos
- Right column: form card with white bg, `rounded-2xl`, `shadow-lg`, `p-8`
- Mobile: stacked — headline + benefits on top, form below
- Form inputs: `rounded-lg`, `border-gray-300`, focus ring in brand-blue
- CTA button: full-width within form, brand-blue, `py-3`, `font-semibold`
- Social signup buttons: outlined, below the form with "Or sign up with:" divider
- "Already have an account?" link below CTA
- Inline validation: show errors on blur, success checkmark on valid
- Section: `min-h-screen`, vertically centered content

### Error States

```

┌─────────────────────────┐
│ Email address \* │
│ [john@example.com ] │
│ ⚠ This email is │
│ already registered. │
│ Log in instead → │
└─────────────────────────┘

┌─────────────────────────┐
│ Password \* │
│ [•••••• ] [👁]│
│ ■■□□□ Weak │
│ Add a number and │
│ uppercase letter │
└─────────────────────────┘

```

---

## 2. Email Verification Page

After form submission, user sees this page and receives a verification email.

Background: Off-white (#F8FAFC)

```

┌──────────────────────────────────────────────────────────────────────┐
│ │
│ ┌─────────────────────┐ │
│ │ │ │
│ │ ✉️ 📬 │ │
│ │ │ │
│ │ H2: "Check your │ │
│ │ inbox" │ │
│ │ │ │
│ │ We've sent a │ │
│ │ verification email │ │
│ │ to: │ │
│ │ │ │
│ │ john@example.com │ │
│ │ │ │
│ │ Click the link in │ │
│ │ the email to │ │
│ │ activate your │ │
│ │ account. │ │
│ │ │ │
│ │ Didn't receive it? │ │
│ │ [Resend email] │ │
│ │ │ │
│ │ Check your spam │ │
│ │ folder, or try a │ │
│ │ different email │ │
│ │ address. │ │
│ │ │ │
│ └─────────────────────┘ │
│ │
└──────────────────────────────────────────────────────────────────────┘

```

Layout notes:
- Centered card, max-width ~480px
- Email icon/illustration at top
- User's email displayed in bold
- "Resend email" button: text link or outline button, with cooldown (60s) after click
- Helpful hint about spam folder
- Minimal page — no distractions, no nav links except logo (home)

---

## 3. Confirmation / Welcome Page

After clicking the email verification link, user lands here briefly before redirect.

Background: Off-white (#F8FAFC)

```

┌──────────────────────────────────────────────────────────────────────┐
│ │
│ ┌─────────────────────┐ │
│ │ │ │
│ │ ✅ 🎉 │ │
│ │ │ │
│ │ H2: "You're all │ │
│ │ set!" │ │
│ │ │ │
│ │ Your 2-month free │ │
│ │ trial is active. │ │
│ │ │ │
│ │ Here's what to do │ │
│ │ next: │ │
│ │ │ │
│ │ 1. Connect your │ │
│ │ Airbnb or │ │
│ │ Booking.com │ │
│ │ │ │
│ │ 2. Import your │ │
│ │ bookings │ │
│ │ │ │
│ │ 3. Explore your │ │
│ │ dashboard │ │
│ │ │ │
│ │ [Go to Dashboard →]│ │
│ │ │ │
│ │ Redirecting in 5s..│ │
│ │ │ │
│ └─────────────────────┘ │
│ │
└──────────────────────────────────────────────────────────────────────┘

```

Layout notes:
- Centered card, max-width ~480px
- Success icon/animation at top (confetti optional)
- Three quick-start steps to set expectations
- CTA button redirects to myAdmin app dashboard
- Auto-redirect after 5 seconds (with visible countdown)
- If user clicks CTA before countdown, redirect immediately

---

## Complete Signup Flow

```

[Website CTA]
│
▼
┌─────────────┐ ┌──────────────┐ ┌──────────────┐ ┌─────────────┐
│ Signup │────▶│ Email │────▶│ Confirmation│────▶│ myAdmin │
│ Form │ │ Verification│ │ / Welcome │ │ App │
│ Page │ │ Page │ │ Page │ │ Dashboard │
└─────────────┘ └──────────────┘ └──────────────┘ └─────────────┘
│ │ │
│ POST /api/signup │ Verification │
│ → Creates account │ email sent │
│ → Sends email │ via link │
│ │ │
▼ ▼ ▼
Validation Resend option Onboarding
errors inline (60s cooldown) flow starts

````

---

## API Contract (for backend integration)

### POST /api/signup

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "[email]",
  "password": "********",
  "companyName": "Doe Properties",
  "propertyRange": "4-10",
  "referralSource": "google_search",
  "acceptedTerms": true,
  "locale": "nl"
}
````

**Success Response (201):**

```json
{
  "message": "Account created. Verification email sent.",
  "userId": "usr_abc123"
}
```

**Error Responses:**

```json
// 409 - Email already exists
{ "error": "email_exists", "message": "An account with this email already exists." }

// 422 - Validation error
{ "error": "validation_error", "fields": { "password": "Must be at least 8 characters" } }

// 429 - Rate limited
{ "error": "rate_limited", "message": "Too many attempts. Try again in 60 seconds." }
```

### POST /api/signup/verify

**Request:**

```json
{ "token": "verification_token_from_email" }
```

**Success Response (200):**

```json
{
  "message": "Email verified. Account active.",
  "redirectUrl": "https://app.myadmin.nl/onboarding"
}
```

### POST /api/signup/resend

**Request:**

```json
{ "email": "[email]" }
```

**Success Response (200):**

```json
{ "message": "Verification email resent." }
```

---

## Page-Level Notes

**SEO:**

- Page title: "Start Free Trial — myAdmin"
- Meta: noindex (don't index signup page in search engines)
- Canonical: self-referencing

**Tracking (GA4):**

- Form field focus events (funnel analysis)
- Form submission attempt (including validation failures)
- Successful signup (conversion event — primary)
- Email verification completed (conversion event — secondary)
- Social signup button clicks
- "Already have an account" clicks
- Resend email clicks
- Time to complete form

**Security:**

- HTTPS only
- CSRF token on form
- Rate limiting: max 5 signup attempts per IP per hour
- Password hashed server-side (bcrypt/argon2)
- Email verification token expires after 24 hours
- Honeypot field for bot detection (hidden field, reject if filled)

**Accessibility:**

- All form fields have associated labels
- Error messages linked to fields via `aria-describedby`
- Focus management: move focus to first error on failed submission
- Password visibility toggle has accessible label
- Form can be completed entirely via keyboard
