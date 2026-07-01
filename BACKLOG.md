# SupportLocalSLC — Backlog
*Things to build later, not now. Check this before starting new features.*

- **Multi-theme color picker** (light / dark / ocean / forest / sunset) — see `docs/color-theme-audit.md`
  for full audit (2026-06-30). Recommended approach: CSS custom properties as runtime layer consumed by
  Tailwind tokens; flip `data-theme` on `<html>`. ~790 color-class occurrences across source files;
  start with semantic-only tokenization (~350 occurrences, ~3–4 days) before tackling structural grays.

- Follow button functionality (Essentials feature)
- Reviews tab implementation
- Reject button in dashboard admin panel
- User management in dashboard admin panel
- Color-coded status in business table
- Category management in dashboard
- Mobile app (Capacitor or similar — high priority for Phase 2)
- "Report closed business" button
- Inline business edit in admin modal
- **Guarded hard-delete for junk rows** — permanently remove fake/test/bad-import
  businesses without going into Supabase directly. GUARDRAILS (do not weaken the
  no-hard-delete rule for anything with real data): (1) only from the Archived view —
  must be soft-deleted first (trash, then empty trash); (2) only rows with NO dependent
  data (no offers, no claimed_offers, no claims) — protects analytic value/redemption
  history and avoids FK cascade wiping redemptions; (3) server-side Vercel function
  only (elevated perms stay in env vars, never client code); (4) typed-name confirmation.

- **Analytics dashboards** (HIGH VALUE — the proof layer on top of the offer-engine
  moat; BD can't match this because their coupons track nothing):
  - *Admin analytics*: directory-wide — businesses, offers, redemptions, claims, growth
    over time, top categories/plans.
  - *Pro analytics*: full per-business dashboard — listing views, offer claims/redemptions,
    trends over time, repeat vs first-time customers, follower growth, time-of-day patterns.
  - *Essentials ("growth") analytics*: real but basic — views + claim/redemption counts,
    a limited subset below Pro.
  - *Teaser analytics* (conversion lever, two seams): (a) unclaimed listings → top-line
    views + "claim it to see more" (drives claims/cold-start); (b) free-but-claimed →
    top-line number with the good panels locked/blurred + upgrade CTA (drives paid).
    Same tracking data, different CTA per seam.

- **Investigate document-level horizontal overflow at 375px on dashboard.html** —
  surfaced during Manage Businesses redesign (scrollWidth ~468 vs clientWidth 375);
  believed pre-existing and unrelated to that change (likely the prospects table or
  another wide element). Confirm source and fix as part of the mobile-first audit of
  remaining data views (claims, prospect results, edit-business).

  - **Photo-forward business story tab** (consumer UX — first impression):
  Business pages currently open to the "Our Story" tab showing only a paragraph of
  text — bland, weak first impression on the core consumer surface. Bring images onto
  the story tab so the page looks good immediately (idea via Vince). Decisions for
  build: (a) hero image(s) on story vs. keeping a separate Gallery tab for photo-heavy
  businesses — likely hero-on-story for the common case, full Gallery when many photos;
  (b) MUST honor unclaimed-listing guardrails — placeholder/owned/licensed imagery only,
  graceful empty state for the many unclaimed listings with no owned photos (doubles as
  a claim incentive: "claim your listing to add photos").

- **Admin override controls on edit-business page** (operability + SaaS requirement):
  Admins should be able to edit ANY business field from edit-business.html without
  touching Supabase — especially claim_status, approval_status, territory,
  membership_level, is_featured. Concrete driver: test businesses marked "claimed" that
  currently can only be reverted to unclaimed via Supabase directly. STRATEGIC WHY: future
  SaaS licensees will NOT have database access — every action that requires Supabase today
  is a capability the product is missing for them. Build guardrails: gate the override
  fields behind admin role, visually distinct "Admin controls" section, never visible to
  a business owner editing their own listing (same fenced-off principle as guarded
  hard-delete).