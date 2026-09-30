# Ritchie Bros. Playwright Assignment

Playwright + TypeScript UI and API automation for the Ritchie Bros. interview exercise.

## Coverage

- Scenario 1: Locations directory (1.1–1.7, 1.9)
- Scenario 2: Open Edmonton yard (2.1–2.2)
- Scenario 3: Edmonton yard page (3.1–3.6)
- Scenario 4: Edmonton inventory search (4.1–4.2)
- API 1: Auction sites page JSON (A1.1–A1.6 + negative)
- API 2: Edmonton yard page JSON (A2.1–A2.4 + negative)
- API 3: Edmonton inventory search (A3.1–A3.4 + negative)

## Setup

```bash
npm install
npx playwright install chromium
```

## Run

```bash
npm test
npm run test:e2e
npm run test:api
npm run typecheck
```

The tests run against the live production site. No bid, seller-form submission, user creation, or other production-changing workflow is automated. Inventory totals and events are dynamic, so assertions focus on the requirements rather than hard-coded live values.

The target site can apply bot/WAF protection to automated sessions. An Access Denied/403 response may therefore be environmental rather than an assertion failure.
