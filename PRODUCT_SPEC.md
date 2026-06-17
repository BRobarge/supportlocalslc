# SupportLocalSLC — Product Spec & North Star
*Last updated: June 2026. Reference this at the start of every build session.*

---

## WHAT THIS PRODUCT IS

**One sentence:** A hyper-local app and directory that connects community members with passionate local small business owners through exclusive offers — and a SaaS platform that lets entrepreneurs replicate the model in their own cities.

**The problem it solves:**
- For local businesses: gives them a way to tell their story, drive traffic, and market themselves affordably without needing to know how to market
- For directory operators: a proven business model to generate residual income while providing real value to their community
- For consumers: a reason to discover and support local businesses they didn't know existed, rewarded with exclusive deals

**The vision:** When a family wonders "what should we do for dinner tonight?" someone says "Check Support Local" — and they find a local restaurant with a deal they can't get anywhere else.

---

## THE TWO CUSTOMERS

**1. Local Business Owner (Sandy phase)**
- Small mom-and-pop, often not tech savvy
- Struggling to get the word out
- Doesn't know how to market themselves
- Needs affordable tools with real ROI
- Ideal target: home-based businesses, new businesses, businesses with slow hours they want to fill

**2. Licensee / Directory Operator (SaaS phase)**
- Entrepreneur who wants residual income
- Willing to hustle locally (door knocking, outreach, social media)
- Does NOT need to be technical — plug and play
- Pays Bobby a monthly fee to run their own version of the platform in their city

---

## CURRENT PHASE: Sandy, UT MVP (Phase 1)

**Launch criteria:** 100+ businesses in the directory with offers. At least 25 restaurants with BOGO-style offers. Site is bug-free. Full flow works: business listed → claimed → offer posted → consumer redeems.

**How businesses enter the directory:**
1. Admin import via Google Places prospecting tool
2. Owner self-signup
3. Admin manually adds
4. Owner claims an existing unclaimed listing

**Business lifecycle flow:**
1. Bobby imports business via prospecting tool → auto-approved, shows in directory, claim_status = unclaimed
2. Bobby reaches out (in person, phone, email, social media) → tells owner their listing is live
3. Owner clicks "Claim This Business" or uses a claim code emailed to them
4. Owner sets up their profile (logo, photos, story, hours, social links)
5. Nudge/upsell to Essentials to unlock offers
6. If slow Tuesday night → owner sends offer to followers → drives traffic

**Unclaimed listings:** Stay in directory with whatever Google data was imported. Look plain but are still findable. Anyone can flag a closed business to alert the admin.

---

## BUSINESS MODEL

### Plan Tiers

| Feature | Free | Essentials ($49/mo) | Pro ($99/mo) |
|---------|------|---------------------|--------------|
| Full profile page | ✅ | ✅ | ✅ |
| Receive & view reviews | ✅ | ✅ | ✅ |
| Basic info & social links | ✅ | ✅ | ✅ |
| Photos | 5 | 15 | Unlimited |
| Business categories | 1 | 3 | 7 |
| Attribute tags | 5 | 15 | Unlimited |
| Active offers | 0 | 1 | 3 |
| Follow button | ❌ | ✅ | ✅ |
| Reply to reviews | ❌ | ✅ | ✅ |
| Search placement | Basic | Enhanced | Top-Tier |
| Homepage featured slot | ❌ | ❌ | ✅ |
| Follower notifications | ❌ | ❌ | Coming Soon |
| Analytics | ❌ | Teaser | Advanced |

**Pricing notes:**
- Founders pricing honored as long as they stay subscribed
- If they cancel and restart, they pay current rates
- Beta period: everyone gets Essentials free (beta_offers_bypass flag in DB)
- After ~6 months beta ends → email campaign → convert to paid

**Year 1 revenue goal:** $10,000/month MRR from Sandy directory

**Payment processor:** Stripe

---

## SAAS / LICENSING MODEL (Phase 3 — target Jan 2028)

**What Bobby sells:** A monthly software license to run their own branded local directory. White label is fine.

**Licensee pricing:**
- Entry tier: ~$97/month (one territory)
- Full tier: ~$297/month (unlimited territories)
- $297 is not too much for a system that can generate tens of thousands in MRR

**What licensees get:**
- Their own admin panel for their territory
- Full control of their directory — businesses, offers, approvals
- No backend database access (Bobby maintains platform control)
- Tech support (outsourced once revenue allows)

**What licensees do NOT get:**
- Access to other territories' data
- Backend/database access
- Ability to modify platform code

**Territory model:**
- One licensee per city (soft guideline, not hard lock)
- If a licensee is inactive, Bobby can open the territory to others
- Competing in the same area is allowed — hustle wins
- One territory at $97, unlimited territories at $297

**Multi-territory businesses:** Pay $49/month per territory they want to appear in. Single dashboard to manage all listings (to be built).

**Data ownership:** TBD — needs legal clarity before SaaS launch.

**Target:** 100 paying licensees at $297 = ~$30K/month passive

---

## TECH STACK & INFRASTRUCTURE

**Current stack:** Supabase (database), Vercel (hosting), vanilla HTML/JS, Tailwind CSS, Stripe (payments), Google Places API (prospecting)

**Key integrations needed:**
- GHL integration for CRM, outreach automation, analytics (Phase 2)
- Follow/notification system (Phase 2)
- Review system (Phase 2)

**Multi-tenant architecture decisions (to be decided before Phase 3):**
- Shared Supabase database with row-level territory separation (preferred for simplicity) vs. separate Supabase project per licensee
- Subdomains (sandy.supportlocal.com) vs. separate domains (supportlocalsandy.com) — TBD
- Bobby maintains Vercel hosting for all licensees

**Current domain/database schema notes:**
- `territory` field on businesses table = city slug (e.g. 'sandy')
- `approval_status` = admin approval (approved/rejected/pending) — NEVER use for geography
- `state` = US state abbreviation (e.g. 'UT') — NEVER use for approval status
- `claim_status` = whether a business owner has claimed the listing (unclaimed/claimed)
- `is_deleted` = soft delete flag
- `is_active` on offers = soft delete flag
- `beta_offers_bypass` = temporary beta flag to bypass offer tier limits

---

## ADMIN HIERARCHY

**Super Admin (Bobby only):**
- Full platform control
- User management
- Category management
- All territories
- Billing/Stripe

**Territory Admin (Vince, future licensees):**
- Their territory only
- Approve/reject/delete businesses
- Add and edit listings
- View territory analytics
- Cannot access other territories or platform settings

**Business Owner:**
- Their listing only
- Edit profile, photos, hours, social links
- Post/manage offers (within plan limits)
- View their own analytics (Essentials: teaser, Pro: full)
- Reply to reviews (Essentials+)

---

## ROADMAP

### Phase 1 — Sandy MVP (NOW)
- ✅ Core directory working
- ✅ Google Places prospecting tool
- ✅ Offer system with plan limits
- ✅ Soft delete on businesses and offers
- 🔲 Get to 100 businesses with offers
- 🔲 End-to-end claim flow tested
- 🔲 GHL outreach integration
- 🔲 Business outreach pipeline

### Phase 2 — Features & First Revenue (target: mid-2026)
- Review system
- Follow system + follower notifications
- GHL/CRM integration for pro members
- Analytics dashboard (teaser for Essentials, full for Pro)
- Beta ends → convert to paid → $10K MRR goal
- Multi-territory business dashboard

### Phase 3 — SaaS Launch (target: Jan 2028)
- Licensee onboarding system
- Territory management
- White-label admin panel
- Licensee billing (Stripe)
- Support system
- First 10 licensees

---

## BACKLOG (build later, not now)
- Follow button functionality (Essentials feature)
- Reviews tab implementation
- Reject button in dashboard admin panel
- User management in dashboard admin panel
- Color-coded status in business table
- Category management in dashboard
- Mobile app (Capacitor or similar — high priority for Phase 2)
- "Report closed business" button
- Inline business edit in admin modal

---

## NORTH STAR STATEMENT
*"In 5 years I'm making more money than I ever thought possible without trading my time for it — helping small business owners avoid closing their doors, educating consumers about their local community, and providing a system that's a win-win-win for everybody."*

*The ONE thing that makes this irreplaceable: it actually works. Offers drive real traffic. Analytics prove ROI. Business owners see $500+ in new revenue for $49/month and can't imagine not having it.*
