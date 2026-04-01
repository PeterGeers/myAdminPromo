# Property Definition — Pricing Model

**Decision date:** April 1, 2026
**Status:** Agreed

## Definition

**1 property = 1 unique rental unit or group of identical rooms.**

This follows the industry standard used by Guesty, Hostaway, and Lodgify.

## Examples

| Situation                                                | Properties counted               |
| -------------------------------------------------------- | -------------------------------- |
| Studio apartment on Airbnb                               | 1                                |
| House listed on Airbnb + Booking.com                     | 1 (same unit, 2 channels)        |
| 2 apartments in same building                            | 2                                |
| Hotel with 30 rooms, all standard                        | 1 (one group of identical rooms) |
| Hotel with 30 rooms of 3 types (standard, deluxe, suite) | 3 (one per room type)            |
| B&B with 5 unique rooms (all different)                  | 5                                |
| Apartment complex with 10 identical studios              | 1                                |
| Apartment complex with 8 studios + 4 penthouses          | 2                                |

## Key Principle

A property is defined by **uniqueness of the rental unit type**, not by the number of individual rooms or platform listings. Cross-platform listings of the same unit do not count as additional properties.

## Industry Reference

Guesty uses a similar model:

- **Single-unit**: one standalone property = 1 listing
- **Multi-unit**: a group of identical rooms (e.g. 10 standard doubles) = 1 listing with sub-units
- **Complex**: a hotel with different room types = 1 complex with multiple multi-units (each type = 1 listing)

Source: [Guesty Help Center — Multi-Unit Listings](https://support.guesty.com/kb/en/article/multi-units-listings-overview)

## Impact on Pricing Tiers

| Plan                  | Properties | Meaning                    |
| --------------------- | ---------- | -------------------------- |
| Starter (€49/mo)      | 1-3        | Up to 3 unique unit types  |
| Professional (€99/mo) | 4-15       | Up to 15 unique unit types |
| Enterprise (custom)   | 16+        | Unlimited unit types       |

## Where This Is Documented

- Pricing FAQ (both homepage and pricing page): "What counts as a property?"
- Terms of Service: Definition section (def7)
- This document (product reference)

## Backend Implications

The backend needs to support this model when importing listings from Airbnb/Booking.com:

- Group identical rooms under one property
- Cross-platform deduplication (same unit on Airbnb + Booking.com = 1 property)
- Property count for billing should count unique unit types, not individual rooms or listings
