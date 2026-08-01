# Known Gaps — Not Fixed in the MVP Launch-Readiness Pass

These pages were intentionally left as-is (not fixed, not converted to
honest "Coming Soon" placeholders) because they're outside the core role
flows (Founder/Mentor/Admin core loop, Investor, Bookings/Resources/Events)
that were the scope of that pass. They still show mocked or non-functional
content and should be revisited before being promoted/linked more
prominently, or cleaned up if they're not going to be built out.

- `app/opportunities/page.tsx` — fully hardcoded `opportunities` array, no backend endpoint exists for this concept at all.
- `app/library/page.tsx` — real UI shell, but every tab (Guides/Videos/FAQs) is a static empty state; search input isn't wired up.
- `app/startups/browse/page.tsx` — search input isn't wired to any handler; verify whether the grid below it renders real or mock startup data.
- `app/startups/[id]/page.tsx` — entirely demo content (`getMockStartupProfile`). The real `Startup` model only has name/description/founder/phase; this page's rich UI (financial metrics, team bios, investors, milestones, press, assigned mentor, tags) has no backing model at all. Either the model needs to grow substantially or this page needs a major simplification before it can show real data.
- `app/teams/[id]/brief/page.tsx` — hardcoded `startupInfo`; the form has a `handleSubmit` that doesn't call any API — submissions are silently discarded.
- `app/messages/page.tsx` — intentionally left as "Coming Soon" (no messaging backend exists). `components/messaging/message-thread.tsx`, a fully-built but disconnected chat UI, was removed as dead code during this pass; if messaging gets built, start from a fresh design against a real backend rather than resurrecting that component.

## Mentor dashboard scope cut

The Feedback tab, Availability tab, and "Mentoring Statistics" card were
removed from `app/mentor/page.tsx` (they were 100% hardcoded with no
backing model). If these become real features, they'll need new Django
models/endpoints — there's currently no concept of mentor feedback requests,
availability slots, or session/rating stats anywhere in the backend.

## Investor dashboard scope cut

`app/investor/page.tsx` was replaced with an honest "Coming Soon" page.
The SRS already scopes Investor access as forward-looking ("Future
read-level access to startup and analytics data"), so this matches the
original intent rather than cutting a planned feature.
