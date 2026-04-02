# Bug: "Start gratis proefperiode" — No internet connection error

## Symptom

Clicking "Start Free Trial" after filling in the signup form showed:
"No internet connection. Check your network and try again."

## Root Cause

`NEXT_PUBLIC_API_URL` in Amplify was set to `https://api.myadmin.jabaki.nl` — a non-existent domain. The actual backend runs on Railway at `https://invigorating-celebration-production.up.railway.app`.

The fetch to the wrong URL failed with a network error, which the catch block mapped to the `networkError` translation key.

## Fix Applied

1. Updated `NEXT_PUBLIC_API_URL` in Amplify via AWS CLI to the correct Railway URL
2. Triggered redeploy (build #19) — deployed successfully
3. Updated `frontend/.env.local.example` to document the correct URL

## Additional Improvement

Updated the 409 (email already exists) error message to be more helpful:

- Old: "An account with this email already exists."
- New: "You are already a registered user for myAdmin. Please contact support@jabaki.nl for assistance."

This covers the scenario where a user (e.g. an accountant) needs access to multiple tenants with the same email. Multi-tenant support via `custom:tenants` in Cognito exists but the signup flow doesn't yet handle adding a second tenant to an existing user — that's a future backend change.

## Files Changed

- `frontend/.env.local.example` — correct Railway URL
- `frontend/src/components/signup/SignupForm.tsx` — pass email param to emailExists message
- `frontend/messages/en.json` — updated emailExists translation
- `frontend/messages/nl.json` — updated emailExists translation
