# Starter 3 isolated canary

Luke authorised this test-site deployment on 2026-11-03. No production domains,
member databases, send credentials, live Stripe keys or scheduled jobs.
Build/deploy only from the dedicated root checkout after committing/pushing this
configuration branch. Bootstrap exists only to establish the two cross-bindings.
All private keys are local ignored files and Worker secrets, never git.

Status: deployed and verified on 2026-11-03 with Luke's approval.

- Deployment root: `/Users/carterzuzu/Projects/starter3-canary-frontend`.
- Branch: `codex/starter3-canary-2026-11-03`.
- Deployed application/config commit: `36c3b3a`; release source: `a052c37`.
- Cloudflare version: `8d934e9c-7eda-4aeb-8429-b179b0571f1e`.
- URL: https://starter3-canary-frontend.luke-9ffworkersdev.workers.dev
- Source test database: `iotldbnwtnzpwpyhwgmo`; recovery remains separate.
- Owner/session, scoped access/approval, authoritative lead capture, Analytics,
  public media and desktop/mobile browser checks passed.
- Test-only Stripe, safe mode on, social off, no mail credentials or crons.
- Full acceptance receipts are committed to Auto Agency's shared PLANS directory.
- Installed Studio runtime upgrade remains a release gate; the read-only file
  preservation audit is not a runtime upgrade proof. No Starter release published.

Later documentation commits record this deployment without redeploying code.

Canary-only /canary-check page exercises the existing /api/leads route with synthetic browser input and requires the authoritative backend path. It is not part of the starter release branch.
