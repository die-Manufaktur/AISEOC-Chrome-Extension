---
name: tdd-from-figma
description: Writes failing tests FIRST from Figma structure and the design token lockfile, then implementation makes them pass. Per-component TDD cycle using exact values from design-tokens.lock.json. Keywords: TDD, test-driven development, Figma tests, component testing, red-green-refactor, lockfile assertions
---

# TDD from Figma — Tests Before Components

## Purpose

Write comprehensive test files for every component BEFORE writing implementation code. Tests use exact values from `design-tokens.lock.json` — text content, ARIA roles, component structure — so the implementation is constrained to match the design precisely. This eliminates label drift, missing accessibility attributes, and structural deviations.

## When to Use

- Phase 3 of the `/build-from-figma` pipeline (after `design-token-lock`)
- Any time you're about to generate React components from Figma and want TDD discipline
- When adding new components to an existing Figma-derived codebase

## Inputs

- **Required:** `src/styles/design-tokens.lock.json` (from `design-token-lock` skill)
- **Required:** `.claude/plans/build-spec.json` (from `figma-intake` skill)
- **Optional:** Figma MCP access for additional structural context

## TDD Cycle (Per Component)

### Red Phase: Write Failing Tests

For each component in `build-spec.json`, write a test file BEFORE any implementation exists.

**Test file location:** Mirror the component path with `.test.tsx` suffix:
- `src/components/ui/Button.tsx` → `src/components/ui/Button.test.tsx`
- `src/components/sections/HeroSection.tsx` → `src/components/sections/HeroSection.test.tsx`

**Test categories to cover:**

#### 1. Rendering Tests
```typescript
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders without crashing", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
```

#### 2. Text Content Tests (from lockfile)
```typescript
// Values pulled directly from design-tokens.lock.json textContent
it("displays correct heading text", () => {
  render(<HeroSection />);
  expect(screen.getByText("Build faster with AI")).toBeInTheDocument();
});

it("displays correct subheading", () => {
  render(<HeroSection />);
  expect(screen.getByText("Ship production apps in days, not months")).toBeInTheDocument();
});

it("displays correct CTA text", () => {
  render(<HeroSection />);
  expect(screen.getByRole("button", { name: "Get Started" })).toBeInTheDocument();
});
```

#### 3. Accessibility Tests
```typescript
it("has correct heading hierarchy", () => {
  render(<HeroSection />);
  const h1 = screen.getByRole("heading", { level: 1 });
  expect(h1).toHaveTextContent("Build faster with AI");
});

it("buttons are keyboard accessible", () => {
  render(<Button>Submit</Button>);
  const button = screen.getByRole("button");
  expect(button).not.toHaveAttribute("tabindex", "-1");
});

it("form inputs have labels", () => {
  render(<SearchInput />);
  expect(screen.getByLabelText("Main keyword")).toBeInTheDocument();
});

it("images have alt text", () => {
  render(<HeroSection />);
  const images = screen.getAllByRole("img");
  images.forEach((img) => {
    expect(img).toHaveAttribute("alt");
    expect(img.getAttribute("alt")).not.toBe("");
  });
});
```

#### 4. Component Structure Tests
```typescript
it("renders navigation links", () => {
  render(<Header />);
  expect(screen.getByRole("navigation")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Pricing" })).toBeInTheDocument();
});

it("renders all feature cards", () => {
  render(<FeaturesGrid />);
  const cards = screen.getAllByRole("article");
  expect(cards).toHaveLength(3); // Match Figma frame count
});
```

#### 5. Variant Tests
```typescript
it("renders primary variant", () => {
  const { container } = render(<Button variant="primary">Click</Button>);
  expect(container.firstChild).toHaveClass("bg-primary");
});

it("renders secondary variant", () => {
  const { container } = render(<Button variant="secondary">Click</Button>);
  expect(container.firstChild).toHaveClass("bg-secondary");
});

it("renders disabled state", () => {
  render(<Button disabled>Click</Button>);
  expect(screen.getByRole("button")).toBeDisabled();
});
```

#### 6. Interaction Tests
```typescript
import userEvent from "@testing-library/user-event";

it("calls onClick when clicked", async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click</Button>);
  await user.click(screen.getByRole("button"));
  expect(handleClick).toHaveBeenCalledOnce();
});

it("toggles mobile menu on hamburger click", async () => {
  const user = userEvent.setup();
  render(<Header />);
  const menuButton = screen.getByRole("button", { name: /menu/i });
  await user.click(menuButton);
  expect(screen.getByRole("navigation")).toBeVisible();
});
```

### Confirm Red

After writing all test files for a component batch, run:

```bash
pnpm vitest run --reporter=verbose
```

**Expected:** All tests FAIL (components don't exist yet). This confirms:
- Test files have no syntax errors
- Imports reference the correct paths (that will be created)
- Assertions are meaningful (not vacuously true)

If any test passes unexpectedly, investigate — it may indicate a test that doesn't actually verify anything.

### Green Phase: Implementation

Hand off to the `figma-react-converter` agent or `figma-to-react-workflow` skill. The implementation must:
1. Create component files at the paths tests import from
2. Use design token classes from the lockfile
3. Include exact text content from the lockfile
4. Pass all written tests

Run after each component:
```bash
pnpm vitest run [component-path] --reporter=verbose
```

### Refactor Phase

Once green, refactor while keeping tests passing:
- Extract shared patterns into utility components
- Consolidate duplicate Tailwind class patterns
- Optimize component composition

## Test Generation Rules

### Query Priority (per React Testing Library best practices)
1. `getByRole` — always preferred
2. `getByLabelText` — for form elements
3. `getByPlaceholderText` — fallback for inputs
4. `getByText` — for non-interactive text
5. `getByTestId` — last resort only

### What NOT to Test
- Tailwind class names directly (brittle, test visual outcome instead)
- Internal component state (test behavior, not implementation)
- Third-party library internals
- Exact pixel values in tests (that's what visual QA is for)

### What to ALWAYS Test
- Every text string from the lockfile's `textContent` section
- Every interactive element has the correct ARIA role
- Every form input has an associated label
- Every image has alt text
- Component renders without errors
- Key user interactions trigger expected behavior

## Batch Strategy

Process components in dependency order:
1. **UI primitives** (Button, Input, Card, Badge) — no dependencies
2. **Layout** (Header, Footer, Sidebar) — may use primitives
3. **Sections** (HeroSection, FeaturesGrid) — use primitives + layout
4. **Pages** (HomePage, PricingPage) — compose everything

Write and verify tests for each batch before moving to the next.

## Output

| File | Purpose |
|------|---------|
| `src/components/**/*.test.tsx` | Test files for every component |
| Console output | Red/Green status per test run |

## Integration

- **Reads from:** `design-tokens.lock.json` (exact values), `build-spec.json` (component inventory)
- **Feeds into:** `figma-to-react-workflow` Phase 2 (implementation must pass these tests)
- **References:** `react-testing-workflows` skill for testing patterns and Vitest configuration
- **Verified by:** `pnpm vitest run --coverage` in the quality gate
