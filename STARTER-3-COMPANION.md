# Starter 3.0 companion — development only

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
