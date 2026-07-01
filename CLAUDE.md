# SupportLocalSLC — Claude Code Guidelines

## Always do this first
1. Read `PRODUCT_SPEC.md` — product context and north star guidance.
2. Read `UX_BRIEF.md` — prioritized design/UX improvements (admin redesign, mobile-first, progressive search, category taxonomy, featured-offers monetization slot, legal guardrails).
3. Check `BACKLOG.md` before adding new features.

## Tech Stack
- Frontend: Vanilla HTML/JS, Tailwind CSS
- Database: Supabase (PostgreSQL)
- Hosting: Vercel
- Payments: Stripe
- Prospecting: Google Places API

## Key Database Rules
- `state` column = US state abbreviation (e.g. 'UT') — NEVER use for approval status
- `approval_status` = admin approval gate (approved/rejected/pending)
- `claim_status` = whether a business owner has claimed the listing (unclaimed/pending/approved)
- `territory` = city slug (e.g. 'sandy') — assigned by admin, never derived from search input, NOT a consumer search filter
- `is_deleted` = soft delete on businesses, never hard delete
- `is_active` on offers = soft delete on offers, never hard delete
- `beta_offers_bypass` = temporary beta flag to bypass offer tier limits
- Coordinates are `latitude` / `longitude` (NOT lat/lng)
- Public directory visibility = `territory = <slug>` AND `approval_status = 'approved'` AND `is_deleted = false`
- Offer tier limits (active, non-expired): free = 0, essentials = 1, pro = 3

When unsure what a column means, inspect the schema — never guess or repurpose a column.

## Offer Engine — the moat (don't water down)
Offers are account-tied and enforced server-side: single-use per customer, first-time-customer-only, quantity caps, redemption tracking. Competitors' "coupons" are just printable blog posts — ours are real. Any offer work must preserve these enforcement properties. Used/claimed offers are hidden from the user; redemption checks happen pre-insert against claimed_offers joined on offers.business_id.

## Unclaimed-Listing Guardrails (legal safety)
For listings created from public data that aren't claimed yet:
- Imagery: placeholder/owned/licensed ONLY — never scraped logos or copyrighted photos
- Show a visible "unclaimed — claim this listing" state; never a fake Verified/member badge on an unclaimed business
- Featured/related offer slots must be labeled "Featured/Sponsored." Paid businesses' own pages show NO ads; free pages may show featured offers from PAYING businesses (relevance + paid-priority)
- Provide a "report incorrect info / request removal" path

## Dev Rules
- Always commit working changes before starting new features
- Never hardcode territory, city, or location values
- Minimal changes only unless doing a planned refactor
- Always read relevant files fresh before editing — never edit from memory
- Use plan mode for any non-trivial change
- Mobile-first: test every UI change at phone width. No horizontal scrolling on mobile, ever. Data-heavy views = stacked cards on mobile, not wide tables
- Tailwind + JS-injected HTML: arbitrary bracket-value classes (e.g. `min-w-[140px]`, `top-[9px]`, arbitrary colors) are unreliable in template-literal / JS-injected HTML — the Tailwind scanner can miss them and they compile to nothing with no error. Prefer standard utility classes in dynamically-rendered markup; if an arbitrary value is truly needed, add it to the safelist in `tailwind.config.js` and re-run `npm run build`.
- Never expose secrets: service-role keys and API keys live in Vercel env vars, never in client code (a service-role key was exposed once — never again)