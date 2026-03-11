# Scripts Reference

**Last Updated:** 2026-03-11

## Project-Level Scripts

### Lint & Format (`lint-and-format.sh`)
- **Purpose**: Run ESLint + Prettier across the project
- **Usage**: `./scripts/lint-and-format.sh` or `./scripts/lint-and-format.sh --check` (CI mode)

### Run Tests (`run-tests.sh`)
- **Purpose**: Run Vitest with coverage report
- **Usage**: `./scripts/run-tests.sh` or `./scripts/run-tests.sh --watch`

### Type Check (`check-types.sh`)
- **Purpose**: TypeScript type checking (tsc --noEmit)
- **Usage**: `./scripts/check-types.sh`

### Bundle Size (`check-bundle-size.sh`)
- **Purpose**: Analyze bundle size, warn on large chunks
- **Usage**: `./scripts/check-bundle-size.sh`
- **Config**: Set `BUNDLE_SIZE_LIMIT` env var (default: 250KB)

### Accessibility (`check-accessibility.sh`)
- **Purpose**: Run eslint-plugin-jsx-a11y checks
- **Usage**: `./scripts/check-accessibility.sh`

### Setup Project (`setup-project.sh`)
- **Purpose**: Initialize a new React project with standard tooling
- **Usage**: `./scripts/setup-project.sh my-app --next` or `--vite`

### Cross-Browser Testing (`cross-browser-test.sh`)
- **Purpose**: Capture screenshots across browsers at standard breakpoints
- **Usage**: `./scripts/cross-browser-test.sh <browser> <url>`
- **Browsers**: chromium, firefox, webkit

### Setup Playwright (`setup-playwright.sh`)
- **Purpose**: One-time setup for Playwright browser engines
- **Usage**: `./scripts/setup-playwright.sh`

## Agent-Specific Scripts

Each agent has supporting scripts in `scripts/<agent-name>/`:

| Agent | Scripts | Purpose |
|-------|---------|---------|
| frontend-developer | lint-and-format.sh, check-build.sh, build-report.sh | Code quality and build validation |
| performance-benchmarker | check-tools.sh, save-benchmarks.sh, compare-results.sh | Performance profiling |
| test-writer-fixer | validate-test-command.sh, save-coverage.sh, commit-coverage.sh | Test execution and coverage |
| api-tester | check-endpoints.sh, save-results.sh, generate-summary.sh | API testing |
| docusaurus-expert | validate-markdown.sh, check-build.sh, preview-link.sh | Documentation |
| analytics-reporter | check-data-sources.sh, format-report.sh, archive-report.sh | Analytics |
| test-results-analyzer | create-run-dir.sh, validate-report.sh, archive-and-trend.sh | Test analysis |
