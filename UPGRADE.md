# Frontend 3.0.0 release candidate

Publication is pending. Pair this candidate with backend 3.0.0 after both
immutable `v3.0.0` tags/releases are published. The previous public frontend
remains 2.5.4 until that happens. See RELEASE-3.md.

1. Use the backend's pinned UPGRADE-3.md with the member's existing Simon.
   Snapshot both repositories/database/media, prove recovery, and capture custom
   additions, edits and deleted files before changing either checkout.
2. Merge `src/lib/analytics/tracker.ts` for page/source/device event provenance.
   Review the nullable-schema fixes in `src/app/api/content-calendar/[id]/route.ts`,
   `src/app/blog/[slug]/page.tsx` and `src/app/sitemap.ts` against member changes.
   Keep current capture endpoints, the authoritative backend service binding/
   fallback, and the member's CRM_CAPTURE_KEY choice.
3. Preserve the member's design, routes, copy, assets, domains and bindings.
   Generate database types from their complete migrated schema, retain helpers
   and merge newly required aliases. Do not replace custom types or their site
   with the starter. This companion adds no frontend SQL migration.
4. Run TypeScript, tests, lint and the production build. Verify existing pages,
   articles/images and form-to-lead against the paired backend; check Analytics
   event provenance and old Funnel links. Deploy only with the member's approval,
   then record frontend VERSION 3.0.0 after verification.

## Historical frontend 2.5.4

This release routes server-side CRM capture through a Cloudflare service binding
when available. It also clarifies the Simon-guided foundation handover.

For an existing customised frontend, work on a branch and merge changes to
`src/lib/crm/capture.ts`, `src/lib/crm/capture-backend.ts`, and `cloudflare-env.d.ts`.
Add the `backend-binding.test.ts` coverage. Preserve the existing capture fallback
and payment rules. Add a `BACKEND_WORKER` binding in wrangler.jsonc pointing to
the actual backend Worker in the same account; preserve all existing names,
routes, bindings and secrets. Keep BACKEND_URL and CRM_CAPTURE_KEY configured.
Non-Cloudflare/local deployments can keep HTTP without this binding.

Run `npm test`, lint and build. Deploy with the member's authorisation, verify a
lead reaches the backend through its capture endpoint, and record VERSION 2.5.4.
No database migration or new credential is required. Do not replace customer
content with the starter. The bundled CLAUDE.md changes separate later content
and design work from completing a verified foundation.

## Member database changes

Follow the member migration rules in CLAUDE.md and the backend UPGRADE.md.
Review existing custom SQL and applied history before changing any filenames.
Preserve migration history and review paired database types by hand;
never overwrite member columns with starter definitions.
