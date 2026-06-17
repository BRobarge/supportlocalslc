# SupportLocalSLC — Claude Code Guidelines

## Always do this first
Read PRODUCT_SPEC.md at the start of each session for product context and north star guidance.

## Tech Stack
- Frontend: Vanilla HTML/JS, Tailwind CSS
- Database: Supabase (PostgreSQL)
- Hosting: Vercel
- Payments: Stripe
- Prospecting: Google Places API

## Key Database Rules
- `state` column = US state abbreviation (e.g. 'UT') — NEVER use for approval status
- `approval_status` = admin approval gate (approved/rejected/pending)
- `claim_status` = whether a business owner has claimed the listing
- `territory` = city slug (e.g. 'sandy') — assigned by admin, never derived from search input
- `is_deleted` = soft delete on businesses, never hard delete
- `is_active` on offers = soft delete on offers, never hard delete
- `beta_offers_bypass` = temporary beta flag to bypass offer tier limits

## Dev Rules
- Always commit working changes before starting new features
- Never hardcode territory, city, or location values
- Minimal changes only unless doing a planned refactor
- Check BACKLOG.md before adding new features
- Always read relevant files fresh before editing — never edit from memory
