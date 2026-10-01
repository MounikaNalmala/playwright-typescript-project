# Ritchie Bros. Playwright Automation Assignment

This repository contains the Playwright + TypeScript solution for the Ritchie Bros. QA automation coding exercise. It demonstrates a maintainable automation framework covering UI end-to-end testing, API/page-JSON validation, selective test execution, reporting, diagnostics, and CI-ready structure.

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
- ✅ Meaningful `test.step()` sections for readable reports and traces
- ✅ Test tagging for UI, API, and smoke execution
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
│   ├── api/                  # API/page JSON tests (@api)
│   └── e2e/                  # UI end-to-end tests (@ui)
├── .github/workflows/        # Code quality and Playwright CI workflows
├── playwright.config.ts      # Playwright configuration and reporting
├── package.json              # Scripts and dependencies
└── package-lock.json         # Locked dependency versions for reproducible installs
```

## Test Coverage

### UI — `@ui`

- Scenario 1: Locations directory — 1.1–1.7 and 1.9
- Scenario 2: Open Edmonton yard — 2.1–2.2
- Scenario 3: Edmonton yard page — 3.1–3.6
- Scenario 4: Edmonton inventory search — 4.1–4.2

### API / Page JSON — `@api`

- API 1: Auction sites page JSON — A1.1–A1.6 plus a negative scenario
- API 2: Edmonton yard page JSON — A2.1–A2.4 plus a negative scenario
- API 3: Edmonton inventory search — A3.1–A3.4 plus a negative scenario

### Smoke — `@smoke`

A small set of representative happy-path tests is tagged `@smoke`. This demonstrates how a fast validation suite can be separated from the broader UI and API regression coverage.

The test names intentionally match the scenario numbers in the assignment so coverage is easy to trace in the Playwright report.

## Prerequisites

Install the following before running the project:

- Node.js 20 or later
- npm
- Git

## Installation

Clone the repository and install the locked dependencies:

```bash
git clone https://github.com/MounikaNalmala/playwright-typescript-project.git
cd playwright-typescript-project
npm ci
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

> **Production safety:** The default target is the public production website. The tests are designed to be read-only, but reviewers should avoid unnecessary repeated execution against production. CI execution is intentionally disabled until a safe QA/staging `BASE_URL` is supplied.

Run the complete suite:

```bash
npm test
```

Run the existing UI script:

```bash
npm run test:e2e
```

Run the existing API script:

```bash
npm run test:api
```

### Run by Playwright tag

Run all UI tests:

```bash
npx playwright test --grep @ui
```

Run all API tests:

```bash
npx playwright test --grep @api
```

Run the smaller smoke suite:

```bash
npx playwright test --grep @smoke
```

Tags make the framework easy to extend into CI jobs such as smoke, API, UI, or full regression execution without reorganizing the test files.

### Development and debugging

Run UI tests in headed mode:

```bash
npm run test:headed
```

Run Playwright in debug mode:

```bash
npm run test:debug
```

Run TypeScript validation without executing tests:

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

## Test Reports and Diagnostics

Playwright is configured with an HTML reporter. After a local test run, open the report with:

```bash
npm run report
```

The framework captures useful diagnostics when a test fails:

- Screenshot on failure
- Trace on failure
- Video on failure
- HTML test report
- Test execution logs in CI artifact structure

Larger UI scenarios also use selective `test.step()` blocks around meaningful business actions. This keeps the source code readable while making the HTML report and Playwright Trace Viewer easier to follow. Instead of seeing only a long sequence of assertions, a reviewer can identify the important action or validation being performed.

Generated output is available under `test-results/` and `playwright-report/` when applicable.

## CI / GitHub Actions

The repository includes GitHub Actions for code quality and a Playwright test workflow.

The quality workflow demonstrates automated validation such as formatting and TypeScript checks. The Playwright workflow demonstrates the structure required to install dependencies/browsers, execute automation, and publish test evidence.

The actual Playwright test execution step is intentionally disabled because this coding exercise targets the live Ritchie Bros. production website. The workflow still demonstrates how reports, screenshots, traces, videos, and logs would be uploaded as GitHub Actions artifacts after execution.

In a real project, the test step would be enabled against a dedicated QA or staging environment. The Playwright configuration supports a `BASE_URL` environment variable so the target environment can be changed without modifying test code.

Example:

```bash
BASE_URL=https://your-test-environment.example.com npm test
```

The tags can then be used to create purpose-specific CI jobs, for example:

```bash
npx playwright test --grep @smoke
npx playwright test --grep @api
npx playwright test --grep @ui
```

## Production Safety

The default target for this exercise is `https://www.rbauction.com`.

The automated scenarios are read-only. They do not place bids, submit the Become a Seller form, create users, or intentionally perform other production-changing actions. The inventory search API uses the search endpoint only to retrieve results.

Because this is a live website, inventory totals, auction events, and other data can change. Assertions therefore validate the assignment requirements rather than relying on fixed live counts where the specification says the values are dynamic.

The production site may also apply bot/WAF protection to automated browser or API traffic. If a run receives an Access Denied or HTTP 403 response, that may be an environment/security restriction rather than a functional assertion failure.

## Framework Design Notes

The solution uses Page Object Model classes for reusable UI behavior, utility functions for JSON/API parsing, and centralized test data to keep specifications readable and maintainable.

Locators prioritize Playwright's user-facing locators such as `getByRole`, `getByLabel`, and `getByText`, with stable fallbacks only where necessary. Tests use Playwright web-first assertions and avoid static waits.

UI and API scenarios are separated physically and also tagged with `@ui` and `@api`, while representative happy paths use `@smoke`. This supports both straightforward local execution and future CI test-suite segmentation.

`test.step()` is used selectively rather than around every assertion. The goal is to make reports and traces communicate business-level test intent without adding unnecessary abstraction to the test code.

## Reviewer Quick Start

For a reviewer who wants to inspect the framework quickly:

```bash
npm ci
npx playwright install chromium
npm run typecheck
npm run format:check
```

To inspect available tests without executing them against production:

```bash
npx playwright test --list
```

When execution against the target environment is appropriate, tests can be selected using `@smoke`, `@ui`, or `@api`, and the resulting HTML report can be opened with `npm run report`.
