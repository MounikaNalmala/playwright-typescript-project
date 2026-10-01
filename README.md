# Ritchie Bros. Playwright Automation Assignment

This repository contains the Playwright + TypeScript solution for the Ritchie Bros. QA automation coding exercise. It includes both UI end-to-end tests and API/page-JSON validation.

## Assignment Requirements Mapping

### Part 1 — Framework Setup

- ✅ TypeScript-based Playwright automation project
- ✅ Playwright end-to-end test suite
- ✅ API testing using Playwright request context
- ✅ UI and API suites can be run independently
- ✅ Page Object Model for reusable UI behavior
- ✅ Reusable utilities for API and page JSON parsing
- ✅ Centralized test data and expected values
- ✅ Playwright web-first assertions with no static waits
- ✅ User-facing locators are prioritized over DOM-coupled selectors
- ✅ TypeScript type checking and Prettier formatting
- ✅ Playwright HTML reporting with screenshots, traces, and videos on failure
- ✅ GitHub Actions workflows for code quality and CI structure
- ✅ Production-safe test design: no account creation, bidding, or seller-form submission

The CI test execution step is intentionally disabled while the project targets the live production website. The workflow is ready to run against a QA or staging environment by supplying a `BASE_URL`.

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
│   ├── pages/                # Page Object Model classes
│   └── utils/                # Reusable API and page JSON helpers
├── tests/
│   ├── api/                  # API/page JSON tests
│   └── e2e/                  # UI end-to-end tests
├── .github/workflows/        # CI workflows
├── playwright.config.ts      # Playwright configuration
└── package.json              # Scripts and dependencies
```

## Test Coverage

### UI

- Scenario 1: Locations directory — 1.1–1.7 and 1.9
- Scenario 2: Open Edmonton yard — 2.1–2.2
- Scenario 3: Edmonton yard page — 3.1–3.6
- Scenario 4: Edmonton inventory search — 4.1–4.2

### API / Page JSON

- API 1: Auction sites page JSON — A1.1–A1.6 plus a negative scenario
- API 2: Edmonton yard page JSON — A2.1–A2.4 plus a negative scenario
- API 3: Edmonton inventory search — A3.1–A3.4 plus a negative scenario

The test names intentionally match the scenario numbers in the assignment so coverage is easy to trace in the Playwright report.

## Prerequisites

Install the following before running the project:

- Node.js 20 or later
- npm
- Git

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/MounikaNalmala/playwright-typescript-project.git
cd playwright-typescript-project
npm install
```

Install the Chromium browser used by the Playwright project:

```bash
npx playwright install chromium
```

On Linux/CI, Playwright system dependencies can also be installed with:

```bash
npx playwright install --with-deps chromium
```

## Running the Tests

Run the complete test suite:

```bash
npm test
```

Run only the UI tests:

```bash
npm run test:e2e
```

Run only the API tests:

```bash
npm run test:api
```

Run the UI tests in headed mode:

```bash
npm run test:headed
```

Run Playwright in debug mode:

```bash
npm run test:debug
```

Run the TypeScript validation without executing tests:

```bash
npm run typecheck
```

## Code Formatting

Check formatting:

```bash
npm run format:check
```

Apply Prettier formatting:

```bash
npm run format
```

## Test Reports

Playwright is configured with an HTML reporter. After a local test run, open the report with:

```bash
npm run report
```

The framework is also configured to retain useful failure diagnostics:

- Screenshot on failure
- Trace on failure
- Video on failure
- HTML test report

These files are generated under `test-results/` and `playwright-report/` when applicable.

## CI / GitHub Actions

The repository includes GitHub Actions for code quality and a Playwright test workflow. The CI test execution step is intentionally disabled because this coding exercise currently points to the production Ritchie Bros. website.

The workflow still demonstrates how the suite would run in CI and how reports, screenshots, traces, videos, and execution logs can be uploaded as build artifacts. In a real project, the test step would be enabled against a dedicated QA or staging environment.

The Playwright configuration supports a `BASE_URL` environment variable so the target environment can be changed without modifying the test code.

Example:

```bash
BASE_URL=https://your-test-environment.example.com npm test
```

## Production Safety

The default target for this exercise is `https://www.rbauction.com`.

The automated scenarios are read-only. They do not place bids, submit the seller form, create users, or intentionally perform other production-changing actions. The inventory search API uses the search endpoint only to retrieve results.

Because this is a live website, inventory totals, auction events, and other data can change. Assertions therefore validate the assignment requirements rather than relying on fixed live counts where the specification says the values are dynamic.

The production site may also apply bot/WAF protection to automated browser or API traffic. If a run receives an Access Denied or HTTP 403 response, that may be an environment/security restriction rather than a functional assertion failure.

## Framework Notes

The solution uses Page Object Model classes for UI behavior, reusable utility functions for JSON/API parsing, and centralized test data to keep test specs readable. Locators prioritize Playwright's user-facing locators such as `getByRole`, `getByLabel`, and `getByText`, with stable fallbacks only where necessary.

Tests use Playwright web-first assertions and avoid static waits. UI and API scenarios are separated so they can be executed independently.
