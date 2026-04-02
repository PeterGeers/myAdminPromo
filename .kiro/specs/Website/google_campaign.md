# Google Ads Campaign Plan — myAdmin

**Target market:** Dutch STR property managers (3-15 properties)
**Site:** https://myadmin.jabaki.nl
**Budget:** Start at €10-15/day
**Geo:** Netherlands only
**Language:** Dutch
**Devices:** All (mobile + desktop)

---

## Campaign 1: Search — High Intent

**Goal:** Direct signups from people actively looking for STR admin software.

**Keywords (exact + phrase match):**

- "vakantieverhuur administratie"
- "airbnb boekhouding software"
- "toeristenbelasting software"
- "verhuur administratie automatiseren"
- "booking.com financiële administratie"
- "vakantieverhuur software"
- "airbnb verhuur beheer"
- "korte termijn verhuur administratie"

**Ad copy (responsive search ad):**

Headlines (max 30 chars each):

1. Verhuuradministratie in 1 tool
2. Airbnb + Booking.com koppeling
3. 2 maanden gratis proberen
4. Geen creditcard nodig
5. BTW, IB & toeristenbelasting
6. Vanaf €30/maand
7. Alles in één platform
8. Stop met spreadsheets

Descriptions (max 90 chars each):

1. Boekingen, financiën en belastingaangiftes in één platform. Start gratis.
2. Stop met 3-4 losse tools. myAdmin vervangt je spreadsheets en boekhouder.
3. Automatische bankkoppeling, slimme factuurverwerking. Probeer 2 maanden gratis.
4. Gebouwd voor verhuurders met 3-15 woningen. Alle functies, geen verborgen kosten.

**Landing page:** `/nl/signup`

---

## Campaign 2: Search — Problem Aware

**Goal:** Capture people searching for STR tax/admin answers, introduce myAdmin as the solution.

**Keywords (phrase match):**

- "airbnb belasting nederland"
- "toeristenbelasting aangifte"
- "vakantieverhuur belasting tips"
- "meerdere vakantiewoningen beheren"
- "airbnb btw aangifte"
- "inkomstenbelasting vakantieverhuur"
- "boekhouding airbnb host"

**Ad copy (responsive search ad):**

Headlines:

1. Airbnb belasting geregeld
2. Toeristenbelasting automatisch
3. Van boekingen naar aangifte
4. Probeer 2 maanden gratis
5. Eén platform, alles geregeld
6. Geen boekhouder nodig

Descriptions:

1. myAdmin berekent je BTW, IB en toeristenbelasting automatisch. Probeer gratis.
2. Importeer je boekingen, koppel je bank, en doe je aangifte in minuten.
3. Speciaal voor vakantieverhuurders. Alle belastingaangiftes vanuit één dashboard.

**Landing page:** `/nl` (homepage — let them discover the full platform)

---

## Campaign 3: Search — Pricing/Comparison

**Goal:** Capture people comparing tools or looking at pricing.

**Keywords:**

- "vakantieverhuur software vergelijken"
- "airbnb management tool prijs"
- "guesty alternatief"
- "hostaway alternatief nederland"
- "goedkope verhuur software"

**Landing page:** `/nl/pricing`

---

## Negative Keywords

Add these to avoid wasted spend:

- "gratis" (freebie seekers)
- "vacature" / "baan" (job seekers)
- "cursus" / "opleiding" (education seekers)
- "airbnb boeken" (travelers, not hosts)
- "hotel boeken"
- "vakantie boeken"

---

## Conversion Tracking

GA4 is already set up with these events:

- `sign_up_start` — form interaction begins
- `sign_up_submit` — form submitted
- `sign_up_complete` — signup successful (primary conversion)

**Setup steps:**

1. Link GA4 (G-EVDCRG8DX2) to Google Ads account
2. Import `sign_up_complete` as a conversion action in Google Ads
3. Optionally import `sign_up_start` as a micro-conversion for optimization

---

## UTM Parameters

Use consistent UTM tags for tracking:

```
Campaign 1 (high intent):
https://myadmin.jabaki.nl/nl/signup?utm_source=google&utm_medium=cpc&utm_campaign=str_high_intent&utm_content={adgroupid}

Campaign 2 (problem aware):
https://myadmin.jabaki.nl/nl?utm_source=google&utm_medium=cpc&utm_campaign=str_problem_aware&utm_content={adgroupid}

Campaign 3 (pricing):
https://myadmin.jabaki.nl/nl/pricing?utm_source=google&utm_medium=cpc&utm_campaign=str_pricing&utm_content={adgroupid}
```

---

## Ad Extensions

- **Sitelinks:** Prijzen, Features, FAQ, Gratis proefperiode
- **Callouts:** 2 maanden gratis · Geen creditcard · Alle functies · Nederlandse support
- **Structured snippets:** Type: Functies → Verhuuranalyses, Bankkoppeling, Belastingaangiftes, Factuurverwerking

---

## Optimization Tips

- Start with exact match + phrase match only — avoid broad match initially
- Review search terms weekly, add irrelevant terms as negatives
- Pause underperforming keywords after 2 weeks (high spend, no conversions)
- A/B test ad copy — rotate headlines to find winners
- Consider dayparting: STR managers often search evenings/weekends
- After 30 days with data: enable Target CPA bidding based on actual conversion cost

---

## What to Avoid at Launch

- Broad match keywords — too expensive, too vague
- English keywords — market is Dutch
- Display/YouTube campaigns — focus on search intent first
- Too many campaigns at once — start with Campaign 1, add others after 2 weeks
