# SupportLocalSLC — UX/Design Improvement Brief for Claude Code
*Hand this to Claude Code. Actionable, prioritized design and UX improvements based on competitive analysis. Always read PRODUCT_SPEC.md and this brief before a design session. Use plan mode for anything non-trivial.*

---

## DESIGN NORTH STAR
Goal: Modern, clean, mobile-first, "fun to use." The current UI feels dated ("Windows XP"). The competitor (Brilliant Directories) looks more modern but is desktop-first and clunky on mobile. We win by being BOTH modern AND genuinely mobile-first. Every screen should look and feel great on a phone first, desktop second.

Reference the frontend-design skill for design tokens and styling constraints in this environment.

---

## PRIORITY 1: Admin Dashboard Redesign (the biggest visual win)

The current admin/dashboard looks dated. Redesign it to feel modern and organized, mobile-first. Borrow these proven patterns (described, not copied):

### Snapshot cards (top of dashboard)
Three at-a-glance summary cards in a responsive grid (stack on mobile, row on desktop):
- **Business Snapshot** — total businesses, new today / 7 days / 30 days
- **Offers Snapshot** — total active offers, redemptions today / 7 days / 30 days
- **Moderation Snapshot** — pending claims, pending approvals, flagged items

Clean cards, subtle colored top-border accent per card, big numbers, small labels. Modern card styling (rounded corners, soft shadow, generous whitespace).

### Quick-action cards ("What do you want to do today?")
A row of large, friendly tappable cards for the most common admin actions:
- Import Businesses (→ Prospect tool)
- Add a Business
- Review Pending Claims
- (later) Send Announcement

Icon + label per card. Reduces friction, guides the user. Modern gradient header bar above them is a nice touch.

### Clean left/bottom nav
Modern nav with clear icons. On mobile this should be a bottom tab bar or a clean hamburger drawer — NOT a desktop sidebar that forces horizontal scrolling.

---

## PRIORITY 2: Mobile-First Everything (our key advantage over BD)

CRITICAL RULE: No screen should ever require horizontal scrolling on mobile. BD's admin literally tells users to "swipe on mobile to view full content" — that's the bar we must clear.

For data-heavy views (business lists, member lists, offer lists, claims):
- On mobile: render each record as a STACKED CARD, not a wide table. Card shows the key info vertically (name, status badge, key actions) with a tap-to-expand for details.
- On desktop: can use a table, but it must be responsive and never overflow.
- Status indicators: color-coded badges (approved = green, pending = amber, rejected/deleted = red/gray) — clear at a glance.
- Actions: accessible via a tap menu on each card, not a row of buttons that overflow.

Audit every admin view (dashboard business list, edit-business sections, prospect tool results, claims) and ensure all are clean stacked cards on mobile.

---

## PRIORITY 3: Progressive 3-Step Directory Search (frontend)
Replace the current wall-of-tags search with a guided funnel:
1. "What are you looking for?" → high-level category dropdown
2. "Narrow it down" → dynamically populated sub-category based on step 1
3. (later, for multi-territory) location
4. Search button

Start broad, get specific. Much less cognitive load. Searchable dropdowns for long lists. Clean card layout (left sidebar on desktop, top on mobile).

---

## PRIORITY 4: Refined Tabbed Listing Pages (frontend)
Clean up the public business profile page tabs (Our Story / Offers / Gallery / Reviews). Show counts on tabs ("Offers (2)", "Reviews (5)"). Modern tab styling. Make sure offers are visually prominent since they're the consumer hook.

---

## PRIORITY 5: Banner / Ad Slot (monetization, frontend)
Add a tasteful designated banner slot on listing pages (and optionally directory pages). Will be used for either Google AdSense or sold/featured placement. Keep it tasteful — never cluttered or spammy (protects the consumer experience). Could be a Pro-tier perk (featured business banner shows here).

---

## GENERAL DESIGN PRINCIPLES (apply everywhere)
- Generous whitespace, rounded corners, soft shadows, modern card-based layouts
- Clear visual hierarchy — big headings, readable body, obvious primary actions
- Color-coded status badges everywhere status matters
- Consistent, modern button styles (primary / secondary / destructive)
- Friendly microcopy, not corporate jargon
- Smooth, subtle transitions
- Mobile-first: design for the phone, enhance for desktop
- Proper icons (not emoji) via a consistent icon set
- Accessibility: sufficient contrast, tappable target sizes

---

## RELATED FEATURE BACKLOG (build later, captured here for context)
- AI Story Onboarding (conversational, Typeform-style, AI-written business stories) — see Onboarding spec
- PWA + custom install prompt — see Onboarding spec
- Push notifications (per-business follow relationships; "new deals near you" habit ping front-loaded with food/treats/impulse categories; rate-limited business-to-follower pushes)
- Lead management system (consumer "get matched"/contact form → tracked lead with status + notes → routed to business via GHL)
- Video embeds on business pages (Insta360 content, YouTube/Vimeo)
- Reviews system + Follow system (Essentials/Pro features)
- Reject button + user management + category management in dashboard admin
- Self-signup submissions should fire GHL webhook
- Favicon
- "Report closed business" button
- Creative Services category (Photography, Videography, Graphic Design)

---

## PROCESS REMINDER
- Use plan mode for any non-trivial change; review the full plan before approving
- Commit working changes before starting new work
- Minimal, targeted changes unless doing a planned refactor
- Read files fresh before editing — never edit from memory
- This is a mobile-first product — test every change at phone width

---

## PRIORITY 6: Category Taxonomy (parent → child + type-to-filter)
Replace flat tag list with a two-level hierarchy, browsable on a "Find Local Businesses by Category" page:
- **Parent categories** (collapsible sections), each with **sub-categories** beneath
- A **"Type to Filter Categories"** search box at the top that instantly filters the whole list as the user types (this is the key UX move — keeps the taxonomy comprehensive without overwhelming; user types "barber" and only matching items show)
- Each parent has a "View All" link

Starter taxonomy (adapt/trim for Sandy reality; parent → children):
- **Food & Dining:** Restaurants, Cafes, Bakeries, Bars & Pubs, Fast Food, Delis, Desserts/Treats, Caterers
- **Personal Services / Beauty:** Hair Salons, Barber Shops, Nail Salons, Day Spas, Skin Care, Tanning, Wellness
- **Home Services:** Plumbers, Electricians, HVAC, Landscaping, Cleaning, Painters, Concrete, Handyman
- **Professional Services:** Photographers, Videographers, Graphic Designers, Printing, Web Designers, Real Estate Agents, Marketing/Advertising, IT
- **Health & Medicine:** Chiropractors, Dentists, Optometrists, Physical Therapists, Urgent Care
- **Automotive:** Auto Repair, Detailing, Car Wash, Tires, Towing
- **Shopping/Retail:** as relevant locally

This taxonomy IS the progressive-search funnel: parent = step 1 ("what are you looking for?"), child = step 2 ("narrow it down").

NOTE: Offer/coupon categories (for the Coupons & Deals browse) should be a SMALL subset — 4-5 max, food-first — since that's the consumer-impulse reality: Food & Dining, Personal Services, Home Services, Professional Services. Don't expose the full taxonomy on the offers browse; keep it tight.

---

## PRIORITY 7: Featured/Related Offers Slot (monetization engine — see strategy note)
On business listing pages (especially FREE/unclaimed ones) and offer pages, add a "Featured Nearby Offers" / "Related Offers" section showing offers from OTHER businesses.

Rules (critical to get right):
- **Relevance first:** show offers matching the same category/sub-category and/or nearby location. On an Italian restaurant page → show other Food & Dining (ideally Italian/restaurant) offers.
- **Paid priority:** among relevant offers, rank PAYING businesses (Essentials/Pro) first. Free businesses don't appear in these slots (they're inventory, not beneficiaries).
- **Tasteful & limited:** 2-3 offers max, styled as a helpful "nearby deals" recommendation, NOT a banner farm. Protects consumer trust (which powers the habit loop).
- **Paid pages are clean:** a paying business's OWN page shows NO competitor/related-offer ads. Ad-free is a paid perk (see strategy note).

This requires: a flag for whether a page shows ads (free = yes, paid = no), and a query that pulls relevant + paid-prioritized offers excluding the current business.

---

## PRIORITY 8: Listing Page Polish (match BD's clean layout)
BD's listing pages are clean and modern. Borrow the layout patterns (on OUR mobile-first foundation):
- Clear header: logo, name, category, location, primary actions (Message / Call / Claim)
- Tabbed content (Our Story / Offers / Gallery / Reviews) with counts
- Right sidebar (desktop) / stacked (mobile): contact card, map, "Related Searches" links, share buttons
- "Related Searches" links (e.g. "Cafes in Sandy", "Restaurants in Sandy") — good for SEO and internal navigation
- Embedded map, Get Directions
- Tasteful share buttons

---

## PRIORITY 9: Unclaimed-Listing Legitimacy Guardrails (legal safety — see policy note)
For listings created from public data (prospecting tool) that haven't been claimed:
- **Imagery:** use ONLY a generic placeholder or owned/licensed imagery. Do NOT display scraped logos or copyrighted photos from the business's website/social. When the owner claims the listing, THEY upload their own assets (IP question disappears).
- **Clear unclaimed status:** mark unclaimed listings visibly ("This listing was created from public information. Are you the owner? Claim it.") — also doubles as the cold-start growth mechanic. Never show a fake "Verified"/member badge on an unclaimed business.
- **Accuracy + removal path:** every listing needs a clear "Report incorrect info" and "Request removal / I'm the owner" path. Honor removal requests promptly. (Extend the existing "report closed business" feature into a broader report/removal flow.)
- **Featured-offers labeling:** the featured/related offers slot must be clearly labeled "Featured local offers" or "Sponsored" so it never implies the unclaimed business endorses the advertised competitors.