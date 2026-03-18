# Email Templates — myAdmin

## Overview

Two transactional emails, each in Dutch (NL) and English (EN):

| Email        | Trigger                      | Sender     |
| ------------ | ---------------------------- | ---------- |
| Verification | After signup form submission | Gmail SMTP |
| Welcome      | After email verification     | Gmail SMTP |

**Email service**: Gmail SMTP (Google Workspace) for transactional emails at launch. AWS SNS for internal notifications (new signup alerts to peter@jabaki.nl). Can migrate to AWS SES later if volume exceeds Gmail limits.

## Template Variables

| Variable              | Description                              | Example                                                  |
| --------------------- | ---------------------------------------- | -------------------------------------------------------- |
| `{{firstName}}`       | User's first name                        | Jan                                                      |
| `{{email}}`           | User's email address                     | jan@example.com                                          |
| `{{verificationUrl}}` | Email verification link (24h expiry)     | https://myadmin.jabaki.nl/api/signup/verify?token=abc123 |
| `{{trialEndDate}}`    | Trial expiry date (2 months from signup) | 15 mei 2026 / May 15, 2026                               |
| `{{unsubscribeUrl}}`  | Unsubscribe link (GDPR required)         | https://myadmin.jabaki.nl/unsubscribe?id=xyz             |

## Files

```
verification-email-en.html  — Email verification (English)
verification-email-nl.html  — Email verification (Dutch)
welcome-email-en.html       — Welcome / onboarding (English)
welcome-email-nl.html       — Welcome / onboarding (Dutch)
```

## Locale Selection

Send the email in the user's chosen locale (from the `locale` field in the signup payload). If `locale=nl`, use the NL template. Otherwise, default to EN.

## Gmail SMTP Setup (Google Workspace)

### Prerequisites

- Google Workspace account with `jabaki.nl` domain
- Admin access to Google Workspace

### Configuration

1. **Enable SMTP relay** in Google Workspace Admin:
   - Go to: Apps → Google Workspace → Gmail → Routing → SMTP relay service
   - Add: allow relay for your app's IP or with SMTP authentication

2. **Create an App Password** (if 2FA is enabled, which it should be):
   - Go to: Google Account → Security → 2-Step Verification → App passwords
   - Generate a password for "Mail" / "Other (myAdmin)"
   - Store this securely (environment variable, never in code)

3. **SMTP settings for Flask backend**:

   ```
   MAIL_SERVER=smtp-relay.gmail.com   (or smtp.gmail.com for direct)
   MAIL_PORT=587
   MAIL_USE_TLS=true
   MAIL_USERNAME=noreply@jabaki.nl    (or your Google Workspace email)
   MAIL_PASSWORD=<app-password>
   MAIL_DEFAULT_SENDER=myAdmin <noreply@jabaki.nl>
   MAIL_REPLY_TO=support@jabaki.nl
   ```

4. **Flask integration** (using Flask-Mail):

   ```python
   from flask_mail import Mail, Message

   mail = Mail(app)

   def send_verification_email(user, locale):
       template = f"verification-email-{locale}.html"
       html = render_template(template,
           firstName=user.first_name,
           email=user.email,
           verificationUrl=generate_verification_url(user)
       )
       msg = Message(
           subject="Verify your email — myAdmin" if locale == "en"
                   else "Bevestig je e-mailadres — myAdmin",
           recipients=[user.email],
           html=html
       )
       mail.send(msg)
   ```

### Limits

- Google Workspace Business Standard: 2,000 emails/day
- Google Workspace Business Plus: 10,000 emails/day
- More than enough for early launch (first 50-100 signups)
- If you outgrow this, migrate to AWS SES

### DNS (already set up via Google Workspace)

- SPF: Google Workspace adds this automatically
- DKIM: Enable in Google Workspace Admin → Apps → Gmail → Authenticate email
- DMARC: Add a DNS TXT record: `_dmarc.jabaki.nl` → `v=DMARC1; p=none; rua=mailto:dmarc@jabaki.nl`

## AWS SNS (for internal notifications)

Used alongside Gmail SMTP — not for sending emails to users, but for alerting you:

- New signup notification → sends email/SMS to peter@jabaki.nl
- Email verification completed → triggers tenant provisioning (Phase 2)
- Failed signup attempts → monitoring/alerting
