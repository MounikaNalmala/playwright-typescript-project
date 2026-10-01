# Ritchie Bros. Playwright Automation Assignment

Playwright + TypeScript test project for the Ritchie Bros. QA automation coding exercise. The project covers the requested UI scenarios, page JSON validation, and inventory search API tests.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Prettier
- GitHub Actions

## Project Structure

```text
.
├── src/
│   ├── data/                 # Test data and expected values
│   ├── pages/                # Page objects
│   └── utils/                # JSON and API helpers
├── tests/
│   ├── api/                  # API/page JSON tests
│   └── e2e/                  # UI tests
├── .github/workflows/        # Quality and Playwright workflows
├── playwright.config.ts
├── package.json
└── package-lock.json
```

## Coverage

### UI (`@ui`)

- Scenario 1: Locations directory — 1.1–1.7 and 1.9
- Scenario 2: Open Edmonton yard — 2.1–2.2
- Scenario 3: Edmonton yard page — 3.1–3.6
- Scenario 4: Edmonton inventory search — 4.1–4.2

### API (`@api`)

- API 1: Auction sites page JSON — A1.1–A1.6 and a negative scenario
- API 2: Edmonton yard page JSON — A2.1–A2.4 and a negative scenario
- API 3: Edmonton inventory search — A3.1–A3.4 and a negative scenario

A small set of happy-path checks is also tagged `@smoke` for quick validation.

## Setup

Requirements:

- Node.js 20+
- npm
- Git

Clone the repository and install dependencies:

```bash
git clone https://github.com/MounikaNalmala/playwright-typescript-project.git
cd playwright-typescript-project
npm ci
npx playwright install chromium
```

For Linux/CI:

```bash
npx playwright install --with-deps chromium
```

## Running Tests

Run the full suite:

```bash
npm test
```

Run UI or API tests:

```bash
npm run test:e2e
npm run test:api
```

Run tests by tag:

```bash
npx playwright test --grep @smoke
npx playwright test --grep @ui
npx playwright test --grep @api
```

Useful local commands:

```bash
npm run test:headed
npm run test:debug
npm run typecheck
npm run format:check
```

To list tests without running them against the live site:

```bash
npx playwright test --list
```

## Reporting

Playwright HTML reporting is enabled. Open the latest report with:

```bash
npm run report
```

On failures, the configuration retains screenshots, traces, and videos. Selected UI flows use `test.step()` so important actions are easier to follow in the HTML report and Trace Viewer.

## CI

GitHub Actions workflows are included for formatting/type checks and Playwright test execution structure.

The Playwright execution step is intentionally disabled in CI because the assignment targets the live production website. In a real project, the same workflow can run against a QA or staging environment by providing `BASE_URL`.

```bash
BASE_URL=https://your-test-environment.example.com npm test
```

## Production Safety

The default target is `https://www.rbauction.com`.

The automated scenarios are read-only. They do not create accounts, place bids, or submit the Become a Seller form. The inventory search API test only performs a search request.

Because this is a live site, inventory totals, auction events, and other data can change. The tests use the thresholds and validation rules from the assignment instead of hard-coding dynamic totals.

The site may also block automated traffic through its security/WAF layer. An Access Denied or HTTP 403 response can therefore be an environment restriction rather than an application assertion failure.

## Framework Notes

- Page objects keep UI locators and reusable page behavior outside the specs.
- Test data and expected values are centralized under `src/data`.
- Locators prefer `getByRole`, `getByLabel`, and `getByText`, with stable fallbacks where needed.
- Tests use Playwright web-first assertions and do not use static waits.
- API/page JSON parsing is kept in reusable utilities so the API specs stay focused on validation.
- `@smoke`, `@ui`, and `@api` tags allow selective execution without changing the folder structure.
