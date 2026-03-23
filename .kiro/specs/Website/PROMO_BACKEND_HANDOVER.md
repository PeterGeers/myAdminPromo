# Promo → Backend Handover: Signup Flow

**Purpose:** Document the complete handover between the promo website and the myAdmin backend for new applicants, including all state transitions, edge cases, and known gaps.

**Last updated:** March 24, 2026

---

## Systems Involved

| System | Role | Location |
|--------|------|----------|
| Promo website | Signup form, email verification UI, confirmation page | Next.js on AWS Amplify (`myadmin.jabaki.nl`) |
| Backend API | Signup logic, validation, Cognito calls, DB writes | Flask on Railway (`invigorating-celebration-production.up.railway.app`) |
| AWS Cognito | User authentication, email verification | User pool `eu-west-1_Hdp40eWmu` |
| Railway MySQL | Signup records (`myadmin_promo.pending_signups`), tenant data (`finance.tenants`) | EU-West Amsterdam |
| AWS SNS | Admin notifications | Topic → `peter@jabaki.nl` |

---

## Happy Path: New User Signup

```
Step  Who           Action                                    State After
────  ────────────  ────────────────────────────────────────  ──────────────────────────
1     User          Fills in signup form on promo site
2     Promo         POST /api/signup with form data           
3     Backend       Validates input                           
4     Backend       Creates Cognito user (UNCONFIRMED)        Cognito: user exists, unconfirmed
5     Backend       Inserts pending_signups record            DB: status = 'pending'
6     Backend       SNS notification → admin                  
7     Backend       Returns 201 to promo                      
8     Cognito       Sends verification email (6-digit code)   
9     User          Enters code on promo verification page    
10    Promo         POST /api/signup/verify                   
11    Backend       Confirms user in Cognito                  Cognito: user confirmed
12    Backend       Updates pending_signups                   DB: status = 'verified'
13    Backend       SNS notification → admin                  
14    Backend       Returns 200 with redirectUrl              
15    Promo         Shows success page                        
16    Admin         Runs provision_tenant.py (manual)         DB: status = 'provisioned'
17    Admin         Tenant created in finance DB              finance.tenants: new row
18    Admin         Cognito custom:tenants updated            Cognito: tenant assigned
19    User          Can now log in to myAdmin app             
```

---

## State Machine: pending_signups.status

```
                    POST /api/signup
                          │
                          ▼
                    ┌──────────┐
                    │ pending  │  Cognito user: UNCONFIRMED
                    └────┬─────┘
                         │ POST /api/signup/verify (valid code)
                         ▼
                    ┌──────────┐
                    │ verified │  Cognito user: CONFIRMED
                    └────┬─────┘
                         │ provision_tenant.py (manual)
                         ▼
                  ┌─────────────┐
                  │ provisioned │  Tenant exists in finance DB
                  └─────────────┘

                  ┌─────────────┐
                  │   expired   │  Trial ended without subscription
                  └─────────────┘
```

---

## Edge Cases & Known Gaps

### 1. Email already in Cognito (409)

**Trigger:** User tries to sign up with an email that already exists in the Cognito user pool.

**Current behavior:** Backend returns 409. Promo shows "You are already a registered user for myAdmin. Please contact support@jabaki.nl for assistance."

**Scenarios where this happens:**
- User already has an active myAdmin account → correct to block
- User signed up but never verified → stuck, can't re-signup or verify
- User was provisioned but tenant was later removed → stuck
- Accountant needs access to a second tenant with same email → blocked

**Gap:** The backend checks Cognito only. It does not distinguish between these scenarios. A smarter check would look at `pending_signups.status` and `finance.tenants` to determine the right action.

**Future fix (backend):** On 409 from Cognito, check:
- If `pending_signups.status = 'pending'` → resend verification email, return guidance
- If `pending_signups.status = 'verified'` → tell user provisioning is in progress
- If `pending_signups.status = 'provisioned'` → tell user to log in
- If user needs multi-tenant access → create new pending_signup linked to existing Cognito user

### 2. User in Cognito but not in pending_signups

**How it happens:** User was created directly in Cognito (e.g. by admin, or from the main app), not through the promo signup flow.

**Current behavior:** Signup returns 409. No pending_signups record exists.

**Gap:** No way to distinguish "promo signup duplicate" from "existing app user."

### 3. User verified but never provisioned

**How it happens:** User completed signup + verification, but admin hasn't run `provision_tenant.py` yet.

**Current behavior:** User sees success page saying "Your account is being set up." If they try to log in to the app, they authenticate with Cognito but have no tenant → app behavior undefined.

**Gap:** No timeout or follow-up. User could wait indefinitely. No automated reminder to admin.

**Future fix:** 
- Add a cron/scheduled check for verified signups older than X hours without provisioning
- Send reminder SNS to admin
- Consider auto-provisioning (Phase 2)

### 4. Verification code expired

**How it happens:** Cognito verification codes expire after 24 hours (default).

**Current behavior:** POST /api/signup/verify returns 400 "Verification code has expired." Promo shows error and offers resend.

**This works correctly.** User can request a new code via POST /api/signup/resend.

### 5. User tries to sign up again after failed verification

**How it happens:** User signed up, got the email, but never entered the code. Comes back days later and tries to sign up again.

**Current behavior:** 409 — email already in Cognito.

**Gap:** User is stuck. They can't re-signup and may not remember they need to verify. The promo site doesn't have a "resend verification" entry point outside the signup flow.

**Future fix:** Add a "Resend verification email" link on the 409 error message, or a standalone `/signup/resend` page.

### 6. Multi-tenant / accountant access

**How it happens:** An accountant already has a myAdmin account for their own properties. A client invites them to access their tenant.

**Current behavior:** Not supported through the promo signup flow. The promo site blocks with 409.

**Correct approach:** Multi-tenant access should be managed through the app itself (invite flow), not through the promo signup. The promo site is for new users only.

**Future fix (app):** Build an invite flow in the myAdmin app where a tenant admin can invite users by email. If the email exists in Cognito, add the tenant to their `custom:tenants`. If not, create a Cognito user and send an invite.

---

## Shared Secrets & Configuration

| Secret | Where (Promo) | Where (Backend) | Must Match |
|--------|---------------|-----------------|------------|
| CSRF token | `NEXT_PUBLIC_CSRF_SECRET` in Amplify env | `CSRF_SECRET` in Railway env | Yes, exact match |
| API URL | `NEXT_PUBLIC_API_URL` in Amplify env | N/A (backend is the target) | Must point to Railway |
| Cognito pool | N/A (promo doesn't talk to Cognito) | `SIGNUP_COGNITO_USER_POOL_ID` | N/A |
| CORS origin | N/A | Hardcoded to `https://myadmin.jabaki.nl` | Must match promo domain |

---

## What the Promo Site Sends vs What the Backend Expects

| Field | Promo sends | Backend validates | Notes |
|-------|-------------|-------------------|-------|
| firstName | `form.firstName.trim()` | required, 1-50 chars | |
| lastName | `form.lastName.trim()` | required, 1-50 chars | |
| email | `form.email.trim().toLowerCase()` | required, valid format | |
| password | `form.password` (raw) | required, min 8 chars; Cognito enforces upper/lower/digit/special | |
| companyName | `form.companyName.trim() \|\| undefined` | optional, max 100 chars | Sent as undefined if empty |
| propertyRange | `form.propertyRange \|\| undefined` | optional, one of: `1-5`, `6-20`, `21-50`, `50+` | |
| referralSource | `form.referralSource \|\| undefined` | optional, max 50 chars | |
| acceptedTerms | `form.terms` (boolean) | must be `true` | |
| locale | `document.documentElement.lang \|\| "nl"` | required, `nl` or `en` | |
| honeypot | hidden input value | if non-empty → fake 200 | |
| X-CSRF-Token | header from `NEXT_PUBLIC_CSRF_SECRET` | must match `CSRF_SECRET` | |

---

## Promo Site Error Handling Summary

| HTTP Status | Promo Behavior |
|-------------|----------------|
| 200 | Honeypot triggered — show success (user doesn't know) |
| 201 | Real success — navigate to verification page |
| 403 | CSRF mismatch — show generic server error |
| 409 | Email exists — show "already registered, contact support@jabaki.nl" |
| 422 | Validation errors — map to field-level errors |
| 429 | Rate limited — show "too many attempts, try again in 60s" |
| 500 | Server error — show generic error |
| Network error | Fetch failed — show "no internet connection" (was the original bug — wrong API URL) |

---

## Action Items (Backend)

1. **Smarter 409 handling:** Check pending_signups status + tenants table before returning 409
2. **Resend flow for stuck users:** Allow resend verification from 409 state
3. **Provisioning timeout alerts:** Notify admin if verified signups aren't provisioned within 24h
4. **Auto-provisioning (Phase 2):** Trigger provisioning automatically after verification
5. **Invite flow (App):** Multi-tenant access via app invite, not promo signup
