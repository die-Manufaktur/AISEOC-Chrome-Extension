---
allowed-tools: Skill, Agent, Bash, Read, Write, Edit, Glob, Grep, TodoWrite, mcp__figma__get_metadata, mcp__figma__get_variable_defs, mcp__figma__get_design_context, mcp__figma__get_screenshot, mcp__figma-desktop__get_metadata, mcp__figma-desktop__get_variable_defs, mcp__figma-desktop__get_design_context, mcp__figma-desktop__get_screenshot, mcp__chrome-devtools__navigate_page, mcp__chrome-devtools__take_screenshot, mcp__chrome-devtools__resize_page, mcp__chrome-devtools__lighthouse_audit, mcp__chrome-devtools__evaluate_script, AskUserQuestion
---

# /build-from-figma — Autonomous Figma-to-Working-App Pipeline

You are the master orchestrator for converting a Figma design into a fully working, tested React application. You receive a Figma URL and guide the entire process through 7 phases, using specialized skills and agents.

## Input

The user provides: `$ARGUMENTS` (a Figma URL, optionally with node-id)

Parse the Figma URL to extract:
- `fileKey` from the URL path
- `nodeId` from the `?node-id=` parameter (convert `-` to `:`)
- For branch URLs: use `branchKey` as `fileKey`

## Progress Tracking

Use `TodoWrite` to create a master checklist. Update each item as phases complete. This enables interrupted sessions to resume.

```
[ ] Phase 1: Intake — figma-intake skill
[ ] Phase 2: Token Lock — design-token-lock skill
[ ] Phase 3: TDD Scaffold — tdd-from-figma skill
[ ] Phase 4: Component Build — figma-to-react-workflow skill
[ ] Phase 5: Visual Verification — automated screenshot loop
[ ] Phase 6: Quality Gate — tests, types, build, tokens, Lighthouse
[ ] Phase 7: Report — build-report.md
```

For each component, track: `[ ] ComponentName: test-written → implemented → visual-verified`

## Phase 1: Intake

Invoke the `figma-intake` skill.

**Input:** The Figma URL from $ARGUMENTS
**Output:** `.claude/plans/build-spec.json`

This phase:
1. Auto-discovers Figma file structure via MCP
2. Scans the local project for framework, existing components, UI libraries
3. Asks the user 3-5 targeted questions (scope, reuse, business logic, labels, integration)
4. Writes the build spec

**Resume check:** If `.claude/plans/build-spec.json` already exists, ask the user if they want to reuse it or regenerate.

## Phase 2: Token Lock

Invoke the `design-token-lock` skill.

**Input:** Figma file key from build-spec.json
**Output:** `src/styles/design-tokens.lock.json`, `tailwind.config.ts`, `src/styles/tokens.css`

This phase:
1. Extracts all design values from Figma via MCP
2. Writes the lockfile with exact hex, px, text content values
3. Generates Tailwind config and CSS custom properties from lockfile
4. Validates completeness against the Figma file

**Resume check:** If `src/styles/design-tokens.lock.json` already exists, ask the user if they want to reuse it or re-extract.

## Phase 3: TDD Scaffold

Invoke the `tdd-from-figma` skill.

**Input:** `build-spec.json` + `design-tokens.lock.json`
**Output:** `src/components/**/*.test.tsx` files

This phase:
1. Reads the build spec for component inventory
2. Reads the lockfile for exact text content, ARIA expectations
3. Writes test files for every component (rendering, content, a11y, interactions)
4. Runs `pnpm vitest run` to confirm RED (all tests fail — no implementations yet)

Process components in dependency order: UI primitives → Layout → Sections → Pages

## Phase 4: Component Build

Invoke the `figma-to-react-workflow` skill (which detects build-spec.json and lockfile automatically).

**Input:** build-spec.json, lockfile, existing test files
**Output:** `src/components/**/*.tsx`, page files

This phase:
1. Skips discovery (build-spec.json exists)
2. References lockfile for all token values (no approximating)
3. Generates components that satisfy the test files from Phase 3
4. Runs `pnpm vitest run` after each component batch to confirm GREEN

**Critical rule:** If tests fail, fix the component — never modify the test files.

## Phase 5: Visual Verification

Automated screenshot comparison loop.

**Prerequisites:** All tests passing from Phase 4.

For each page in build-spec.json:

```
1. Start: pnpm dev (background)
2. Wait for dev server ready

3. FOR iteration IN 1..3:
   a. Chrome DevTools MCP: navigate to page URL
   b. Chrome DevTools MCP: resize to 1440px → take_screenshot
   c. Chrome DevTools MCP: resize to 768px → take_screenshot
   d. Chrome DevTools MCP: resize to 375px → take_screenshot
   e. Figma MCP: get_screenshot for matching frame

   f. Compare all screenshots using vision:
      - Layout alignment
      - Color accuracy (cross-reference lockfile)
      - Typography match
      - Component completeness
      - Responsive behavior

   g. IF differences AND iteration < 3:
      → Fix issues in component code
      → Run: pnpm vitest run (ensure tests still pass)
      → Next iteration
   h. ELSE IF acceptable match:
      → Mark page as verified
      → Break
   i. ELSE:
      → Log remaining differences
      → Mark as "needs manual review"

4. Stop dev server
```

## Phase 6: Quality Gate

Run all quality checks:

```bash
# 1. Test coverage (target: 80%+)
pnpm vitest run --coverage

# 2. TypeScript
pnpm tsc --noEmit

# 3. Production build
pnpm build

# 4. Token verification
./scripts/verify-tokens.sh

# 5. Lighthouse audit (via Chrome DevTools MCP)
#    → Start dev server, run lighthouse_audit per page
#    → Record: Performance, Accessibility, Best Practices, SEO
```

If any check fails, attempt to fix automatically (max 2 attempts per check). If still failing after fixes, report the failure and continue to the report phase.

## Phase 7: Report

Write `.claude/visual-qa/build-report.md` with:

- Build summary (pages, components, framework, timestamps)
- Visual QA results table (pass/fail per page per breakpoint)
- Quality gate results table (each check with status and details)
- Test coverage percentage
- Lighthouse scores
- Remaining issues requiring manual attention

Create the `.claude/visual-qa/` directory if it doesn't exist.

Present the report summary to the user when complete.

## Error Recovery

- **Figma MCP unavailable:** Ask user to verify Figma Desktop is running. Offer to proceed with manual screenshots.
- **Dev server won't start:** Check for port conflicts, missing dependencies. Run `pnpm install` if needed.
- **Tests won't pass after 3 attempts:** Mark component as needing manual intervention, continue with remaining components.
- **Build fails:** Check TypeScript errors first, then dependency issues. Report blockers to user.
- **Session interrupted:** On resume, check TodoWrite progress. Skip completed phases, resume from first incomplete item.

## Completion

When all phases complete, present:

1. The build report summary
2. Count of pages/components built and verified
3. Any items needing manual review
4. Next steps (e.g., "run `pnpm dev` to see the app")
