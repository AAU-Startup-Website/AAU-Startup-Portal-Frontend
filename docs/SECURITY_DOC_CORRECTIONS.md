# Corrections to Security Documentation & System Architecture Design v1.0

The original PDFs (`AAU_Startups_Portal_Security_Documentation.pdf`,
`System_Architecture_Design_AAU_Startups_Portal.pdf`) aren't checked into any
of the three repos, so they can't be edited directly here. This file is the
source of truth for the sections that no longer match the implementation,
for whoever next revises the canonical documents. Section numbers refer to
the v1.0 PDFs.

## Decision on record

The token-storage mismatch between the docs (HTTP-only cookies) and the code
(localStorage + `Authorization: Token` header) was resolved by keeping the
current code as-is and correcting the docs — not migrating to cookies. See
the reasoning below.

## Security Documentation corrections

### §3.3 Client-Side Token Storage — replace entirely

> Authentication tokens are stored in `localStorage` (`authToken` key) on
> both frontends, not in an HTTP-only cookie. Every authenticated request
> attaches the token manually via an `Authorization: Token <token>` header
> (see `lib/api.ts` / `api/client.tsx` in each frontend repo).
>
> This means the token is readable by any JavaScript executing on the page,
> including injected/third-party scripts — a successful XSS attack can
> exfiltrate it. The compensating control is a strict Content-Security-Policy
> (`next.config.mjs` → `headers()` → `Content-Security-Policy`, applied on
> both the public portal and the admin dashboard) that blocks non-`self`
> script execution, which is what an attacker would need in order to read
> `localStorage` in the first place. React's default output escaping and the
> avoidance of `dangerouslySetInnerHTML` with untrusted content remain in
> place as before.
>
> The admin dashboard additionally mirrors the token into a plain (non-
> HttpOnly) cookie (`admin_auth_token`) purely so `middleware.ts` can see
> "is a token present" at the edge and redirect unauthenticated requests
> before a page renders. This cookie carries no additional trust — it's the
> same already-JS-exposed token, and doesn't change the risk profile
> described above. The actual authorization boundary remains server-side:
> Django's permission classes reject any request with an invalid or
> insufficiently-privileged token, regardless of what the frontend does.

### §9.1 Risk Matrix — "Client-side token exposure to XSS" row

Replace the mitigation text with:

> Tokens are stored in `localStorage`, not cookies — this is a real,
> accepted exposure if an XSS vulnerability exists elsewhere in the app.
> The compensating control is a strict CSP (`script-src 'self'`, no
> `unsafe-inline`/`unsafe-eval` in production) on both frontends, which
> prevents the injected-script execution that XSS-based token theft
> requires. Status: **Managed** (residual risk controlled architecturally),
> not **Mitigated** — the exposure exists, it's just constrained.

### §4.3 Admin Dashboard Authorization — now accurate as originally written

The original text ("the admin dashboard is a client of the same Django API
as the public portal... there is no separate database-level authorization
layer") is now true. As of this revision, the dashboard's Supabase
integration has been fully removed — see the Architecture Doc correction
below for what changed and why. `AuthGuard` is now applied to all five
dashboard routes (`/`, `/announcements`, `/events`, `/resources`,
`/bookings`), not just two.

## Architecture Design corrections

### §2 / §4.3 — Admin dashboard backend

At the time of the original v1.0 draft, the admin dashboard was actually
running on Supabase (Supabase Auth + Supabase Postgres) for both
authentication and all CRUD (announcements/events/resources/bookings),
contradicting this document's description entirely. This has since been
migrated: the dashboard now calls the same Django REST API as the public
portal, via a shared client (`api/client.tsx`), with no Supabase dependency
remaining. The diagrams in §2.1 and §4.3 describing a single shared
Django/PostgreSQL backend for both frontends are accurate again.

Note: `events`, `resources`, and `bookings` did not previously exist as
Django models at all (only `announcements` did) — a new `operations` Django
app was added (`Event`, `Resource`, `Booking` models, `IsIncubatorStaff`
permission class restricting all access to staff/profile-admin) to actually
back the operational data the dashboard and SRS §FR-DASH describe.

### §11 Summary of Architectural Assurances

> Client-side route guarding on the admin dashboard is applied consistently
> across all routes (`AuthGuard`), backed by Next.js middleware for edge-
> level enforcement.

is now true — previously, `middleware.ts` was a no-op that unconditionally
called `NextResponse.next()`, and three of five routes (`events`,
`resources`, `bookings`) had no `AuthGuard` at all. Both are fixed. See the
`§3.3` correction above for the important caveat that the middleware check
is a UX/edge redirect, not the actual security boundary (the token it reads
isn't HttpOnly), which the original document did not make clear even for
the cookie-based model it assumed.

## SRS

FR-DASH-03 ("The system shall authenticate dashboard staff via email and
password") required no correction — it was already accurate to how the
dashboard's login form worked, even before this fix; only the backend it
was actually authenticating against was wrong. The Django login endpoint
(`POST /api/users/login/`) was extended to accept either `email` or
`username` so this holds true end-to-end now.
