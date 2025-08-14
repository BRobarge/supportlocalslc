# Billing & Subscriptions – SupportLocalSLC

This doc explains how our Stripe + Supabase billing works and what to touch if we need to tweak prices, promos, or webhooks.

---

## TL;DR

- **Plans:** Essentials ($50/mo), Pro ($100/mo)
- **Promo:** `FIRST100` (50% off, forever, limited redemptions)
- **Stripe Price IDs (TEST)**
  - Essentials → `price_1Rvrq8LLX7qXMo92KPK6c52R`
  - Pro → `price_1RvrqfLLX7qXMo923QwHaP6d`
- **Edge Functions**
  - `create-checkout` – creates Stripe Checkout Sessions
  - `stripe-webhook` – receives Stripe events and updates Supabase `profiles`
- **DB columns (`profiles`):**
  - `membership_level` → `"free" | "essentials" | "pro"`
  - `plan_status` → `"active" | "canceled" | "incomplete" | "trialing" | …`
  - `stripe_customer_id` (string)
  - `stripe_subscription_id` (string)

---

## Components

**Frontend (static, Vercel)**
- `public/dashboard.html` – “My Business” tab shows billing + **Upgrade** buttons.
- `public/shared/auth-nav.js`, `public/shared/header-nav.js`, `public/shared/include.js`

**Supabase Edge Functions**
- `supabase/functions/create-checkout/index.ts` – REST-based Stripe call to create Checkout Session (no Node polyfills).
- `supabase/functions/stripe-webhook/index.ts` – Handles Stripe events, updates `profiles`.

**Stripe**
- Products/Prices
- Promotion Code (`FIRST100`)
- Webhook endpoint (points to our `stripe-webhook` function)

---

## Environment / Secrets (where they live)

> **Do not commit secrets** to Git. They are stored in Supabase → Edge Functions → **Secrets**.

| Key                     | Where                                | Notes |
|-------------------------|---------------------------------------|-------|
| `SITE_URL`              | Supabase → Edge Functions → Secrets   | `https://www.supportlocalslc.com` in prod; `http://localhost:3000` for local |
| `SUPABASE_URL`          | Supabase Secrets                      | Your project URL |
| `SUPABASE_ANON_KEY`     | Supabase Secrets                      | Public anon key; OK to be on client, also used by function to read user |
| `SERVICE_ROLE_KEY`      | Supabase Secrets                      | **Private** service key (function uses it for DB writes) |
| `STRIPE_SECRET_KEY`     | Supabase Secrets                      | Stripe Secret Key (test/live as appropriate) |
| `STRIPE_WEBHOOK_SECRET` | Supabase Secrets                      | The `whsec_...` from Stripe Webhook endpoint |

**Non-secret (safe to document):**
- Essentials Price ID: `price_1Rvrq8LLX7qXMo92KPK6c52R`
- Pro Price ID: `price_1RvrqfLLX7qXMo923QwHaP6d`
- Promo Code: `FIRST100`

---

## Required Stripe Webhooks

In Stripe → **Developers → Webhooks → Your endpoint** (the URL should be):
