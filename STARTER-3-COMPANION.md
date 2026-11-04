# Starter 3.0 companion

## Publication authorisation — 2026-11-04

Luke approved publishing frontend 3.0.0 together with backend 3.0.0. Use the paired
published GitHub releases and RELEASE-PAIR.json; this does not update a member's
Home automatically. Money/Approvals screens are not bundled; the backend retains
their capabilities for owner-authorised agents and member-built interfaces.
Verify the pair at https://github.com/lukesbrave/digital-home-frontend/releases/tag/v3.0.0
and https://github.com/lukesbrave/digital-home-backend/releases/tag/v3.0.0.
The preparation notes below predate this approval and are historical snapshots.


**Current status — 2026-11-04:** Paired 3.0.0 release metadata is prepared;
publication remains pending. Production builds, complete generated-schema builds
with installed Studio, and the isolated deployed form/Analytics/browser checks
pass. See RELEASE-3.md and RELEASE-PAIR.json. Candidate VERSION is now 3.0.0;
public latest remains 2.5.4 until publication. Earlier progress notes below are
historical, including earlier pending work and version statements.


Keep the member’s existing frontend design, routes, tracking choices and
credentials. The backend Analytics workspace reads the existing shared
`analytics_events` table and funnel API; this candidate does not install new
tracking, replace cookie choices, change frontend auth or publish anything.

For an existing Home, the same Simon reads the backend release’s UPGRADE-3.md
as a task guide. No card or training replacement is required. Capture and verify
frontend custom-file hashes separately, using the frontend’s own baseline tag.
A backend tag is not the frontend baseline. Production approval remains separate.

Frontend VERSION remains 2.5.4 until a companion release is actually verified.
The full backend 3.0 port and isolated installation/upgrade canary are pending.

## Second development increment — 2026-10-30

Shared types now include additive agent-key, event and Money tables. These are
paired with backend migrations 004–007; this repository does not install them.
Merge the new type blocks into a member's generated types; never replace their
custom columns/types with this file. Existing frontend design, tracking, routes,
media and employee files are unchanged. No version bump or publication.

## Hosted schema alignment — 2026-11-03

Shared Database/Json types regenerated from the isolated fresh 19-migration
Starter schema. Removed inherited optional-module table placeholders, preserved
local helper aliases. Handles nullable calendar states and publication dates
without inventing dates. For member Homes generate from their actual full schema;
never replace installed Studio or custom table types with this fresh-install file.
