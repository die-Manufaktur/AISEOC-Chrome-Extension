---
name: figma-to-react-workflow
description: Orchestrates end-to-end Figma-to-React conversion pipeline. Extracts design tokens, generates TypeScript React components with Tailwind CSS, and maps Figma components to your project library. Supports Next.js, Vite, and Remix output targets. Keywords: Figma to React, design tokens, autonomous component generation, Figma conversion, Tailwind config, component library
---

# Figma-to-React Autonomous Workflow

## Overview

This skill orchestrates the complete pipeline for converting Figma designs into production-ready React applications. It extracts design systems (colors, typography, spacing, effects) from Figma, transforms them into Tailwind CSS configuration and CSS custom properties, then generates functional TypeScript React components that faithfully reproduce the source design.

The workflow operates in three phases: interactive discovery, autonomous execution, and visual verification. The result is a set of React components, pages, and a design token system ready for integration into Next.js, Vite, or Remix projects.

**Core Principles:**
- Every component is a functional TypeScript component with explicit prop interfaces
- All styling uses Tailwind utility classes backed by design tokens from Figma
- No hardcoded color values, font sizes, or spacing -- everything references the token system
- Images use proper imports or public directory references, never broken paths
- Output is framework-aware (Next.js App Router, Vite SPA, Remix routes)

## When to Use

Use this skill when:
- Converting a Figma design file into a React application
- Extracting a design system from Figma into Tailwind configuration
- Generating a component library from Figma component sets
- Rebuilding an existing UI from a Figma redesign
- Starting a new React project from a Figma prototype

**Trigger phrases:**
- "Convert this Figma design to React"
- "Generate React components from Figma"
- "Extract design tokens from Figma"
- "Build a React app from this Figma file"
- "Figma to Next.js"
- "Figma to Vite"

## Phase 1: Discovery (Interactive)

This phase requires user input. Do not proceed autonomously until the user confirms the plan.

### Pipeline Integration Check

**Before asking any questions**, check if upstream artifacts exist:

```
1. Check: .claude/plans/build-spec.json
   → If exists: SKIP all discovery questions. Load spec directly.
   → Log: "Found build-spec.json from figma-intake — skipping discovery"

2. Check: src/styles/design-tokens.lock.json
   → If exists: SKIP token extraction in Phase 2. Use lockfile values.
   → Log: "Found design-tokens.lock.json — using locked token values"
```

If `build-spec.json` exists, jump directly to Phase 2 with the spec's framework, components, and options pre-loaded.

### Step 1.1: Gather Figma Context

Use the Figma MCP to inspect the design file.

```
1. get_metadata        — File name, pages, last modified, component counts
2. get_variable_defs   — Design tokens (colors, typography, spacing, effects)
3. get_design_context  — Layout structure, component hierarchy, auto-layout settings
4. get_screenshot      — Visual reference for each page/frame
```

### Step 1.2: Extract Design Tokens

Map Figma variables and styles to a token structure:

```
Design Tokens
├── Colors
│   ├── Primitives (blue-500, gray-100, etc.)
│   ├── Semantic (primary, secondary, destructive, muted)
│   └── Component-specific (card-bg, button-primary, input-border)
├── Typography
│   ├── Font families (with fallback stacks)
│   ├── Font sizes (scale: xs through 5xl)
│   ├── Font weights
│   ├── Line heights
│   └── Letter spacing
├── Spacing
│   ├── Base unit
│   └── Scale (0.5 through 96)
├── Border Radius
│   ├── Scale (sm, md, lg, xl, full)
│   └── Component-specific overrides
├── Shadows / Effects
│   ├── Box shadows (sm, md, lg, xl)
│   └── Drop shadows
└── Breakpoints
    └── Mobile, tablet, desktop, wide
```

### Step 1.3: Survey Components

Identify all Figma components and map them to React components:

| Figma Component | React Component | Category |
|----------------|-----------------|----------|
| Button/Primary | `<Button variant="primary">` | Primitives |
| Card | `<Card>` | Containers |
| Navigation/Header | `<Header>` | Layout |
| Hero Section | `<HeroSection>` | Sections |
| Input/Text | `<Input type="text">` | Forms |

### Step 1.4: Confirm Output Target

Ask the user to confirm:
1. **Framework:** Next.js (App Router), Next.js (Pages Router), Vite, or Remix
2. **Styling approach:** Tailwind CSS (default), CSS Modules, or styled-components
3. **Component library base:** shadcn/ui, Radix UI, Headless UI, or none
4. **State management:** React state, Zustand, Jotai, or none
5. **Output directory:** e.g., `src/components/`, `app/`, etc.

Present the component inventory and token summary for user approval before proceeding.

## Phase 2: Execution (Autonomous)

Once the user approves the discovery plan, proceed autonomously through all steps.

### Token Lockfile Constraint

**If `src/styles/design-tokens.lock.json` exists**, ALL generated code MUST reference lockfile values:
- Colors: Use Tailwind classes mapped in the lockfile, never approximate hex values
- Typography: Use exact font families, sizes, and weights from the lockfile
- Spacing: Use lockfile spacing scale values
- Text content: Use exact strings from `lockfile.textContent`

**Never approximate or guess values when a lockfile exists.** If a value isn't in the lockfile, add it to the lockfile first, then reference it.

### Test-First Constraint

**Check for existing test files** before writing component implementations:

```
For each component to generate:
  1. Check: src/components/**/{ComponentName}.test.tsx
  2. If test exists:
     → Read test file to understand expected behavior
     → Implementation MUST make all tests pass
     → Run: pnpm vitest run {test-file} after writing component
  3. If no test exists:
     → Generate component normally
     → Consider invoking tdd-from-figma skill to write tests
```

### Step 2.1: Generate Tailwind Configuration

Create or extend `tailwind.config.ts` with extracted tokens:

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic tokens mapped from Figma variables
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)",
          // ... full scale
        },
        // ... all color tokens
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Mapped from Figma typography styles
      },
      spacing: {
        // Mapped from Figma spacing variables
      },
      borderRadius: {
        // Mapped from Figma corner radius tokens
      },
      boxShadow: {
        // Mapped from Figma effect styles
      },
    },
  },
  plugins: [],
};

export default config;
```

Generate a companion CSS file with custom properties:

```css
/* src/styles/tokens.css */
:root {
  /* Colors - Primitives */
  --color-blue-500: #3b82f6;
  /* ... */

  /* Colors - Semantic */
  --color-primary: var(--color-blue-500);
  --color-primary-foreground: #ffffff;
  /* ... */

  /* Typography */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-heading: "Plus Jakarta Sans", system-ui, sans-serif;
  /* ... */
}
```

### Step 2.2: Generate React Components

For each component identified in Phase 1, generate:

**File structure per component:**
```
src/components/
├── ui/
│   ├── button.tsx          # Primitive components
│   ├── input.tsx
│   ├── card.tsx
│   └── ...
├── layout/
│   ├── header.tsx          # Layout components
│   ├── footer.tsx
│   └── ...
├── sections/
│   ├── hero-section.tsx    # Page sections
│   ├── features-grid.tsx
│   └── ...
└── pages/                  # Full page compositions (or app/ for Next.js)
    ├── home-page.tsx
    └── ...
```

**Component template:**
```typescript
// src/components/ui/button.tsx
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-primary text-primary-foreground hover:bg-primary/90": variant === "primary",
            "bg-secondary text-secondary-foreground hover:bg-secondary/90": variant === "secondary",
            "border border-input bg-transparent hover:bg-accent": variant === "outline",
            "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
          },
          {
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-4 text-sm": size === "md",
            "h-12 px-6 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, type ButtonProps };
```

**Rules for component generation:**
1. All components are functional with `forwardRef` where appropriate
2. Every component has an explicit TypeScript `interface` for props
3. All styling uses Tailwind classes referencing token values
4. Components accept a `className` prop for composition
5. Use `cn()` utility (clsx + tailwind-merge) for class merging
6. Include proper ARIA attributes for interactive elements
7. Export both the component and its props type

### Step 2.3: Generate Page Compositions

Compose section components into full pages matching Figma frames:

```typescript
// app/page.tsx (Next.js App Router)
import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesGrid } from "@/components/sections/features-grid";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesGrid />
      </main>
      <Footer />
    </div>
  );
}
```

### Step 2.4: Handle Images and Assets

**For static images from Figma:**
```typescript
// Next.js - use next/image
import Image from "next/image";
import heroImage from "@/assets/images/hero.webp";

<Image src={heroImage} alt="Hero illustration" width={1200} height={600} priority />

// Vite - use standard imports
import heroImage from "@/assets/images/hero.webp";

<img src={heroImage} alt="Hero illustration" width={1200} height={600} loading="eager" />
```

**Rules:**
- Export images from Figma at 1x and 2x for retina
- Use WebP format with JPEG/PNG fallback
- Place in `public/images/` or `src/assets/images/`
- Every `<img>` must have a meaningful `alt` attribute
- Hero/above-fold images use `priority` (Next.js) or `loading="eager"`
- Below-fold images use `loading="lazy"`

### Step 2.5: Generate Utility Files

```
src/lib/
├── utils.ts          # cn() helper, formatters
└── fonts.ts          # Font loading (Next.js: next/font, Vite: @fontsource)
```

### Step 2.6: Run Tests (if test files exist)

After generating all components, if test files were written by `tdd-from-figma`:

```bash
pnpm vitest run --reporter=verbose
```

**If tests fail:** Fix the component implementation to match test expectations. The tests are authoritative — they encode exact values from the lockfile. Do not modify tests to match implementation.

Iterate until all tests pass (Green phase of TDD).

## Phase 3: Verification

After generation completes, invoke verification checks.

### Step 3.1: Build Verification

```bash
# Verify the project builds without errors
pnpm build

# Verify TypeScript types pass
pnpm tsc --noEmit

# Verify linting passes
pnpm lint
```

### Step 3.2: Visual QA (Automated Loop)

Perform automated visual comparison between generated app and Figma source:

```
For each page in build-spec:
  1. Start dev server: pnpm dev (background)
  2. Wait for server ready

  3. FOR iteration IN 1..3:
     a. Chrome DevTools MCP: take_screenshot at 1440px width
     b. Chrome DevTools MCP: take_screenshot at 768px width
     c. Chrome DevTools MCP: take_screenshot at 375px width
     d. Figma MCP: get_screenshot for the same page/frame

     e. Compare screenshots (Claude vision):
        - Layout alignment (grid, spacing, positioning)
        - Color accuracy (reference lockfile values)
        - Typography (size, weight, family match)
        - Component completeness (nothing missing)
        - Responsive behavior across breakpoints

     f. IF differences found AND iteration < 3:
        → Fix identified issues in component code
        → Re-run: pnpm vitest run (ensure tests still pass)
        → Continue to next iteration
     g. ELSE IF no significant differences:
        → Mark page as verified
        → Break loop
     h. ELSE (iteration 3, still differences):
        → Log remaining differences in build report
        → Mark page as "needs manual review"
        → Continue to next page

  4. Stop dev server
```

### Step 3.3: Token Integrity Check

Run the token verification script:

```bash
./scripts/verify-tokens.sh
```

This checks for:
- Hardcoded hex colors in `.tsx` files
- Arbitrary pixel values not in the lockfile
- Inline `style={{}}` attributes
- Text content diverging from lockfile entries

### Step 3.4: Quality Gate

Run the full quality gate:

```bash
# Test coverage (80%+ threshold)
pnpm vitest run --coverage

# TypeScript
pnpm tsc --noEmit

# Production build
pnpm build

# Token verification
./scripts/verify-tokens.sh

# Lighthouse audit (via Chrome DevTools MCP)
# → lighthouse_audit for each page URL
# → Performance, accessibility, best practices, SEO scores
```

### Step 3.5: Generate Build Report

Write a build report to `.claude/visual-qa/build-report.md`:

```markdown
# Build Report — [Project Name]
Generated: [timestamp]
Figma Source: [URL]

## Summary
- Pages: [N] built, [N] verified
- Components: [N] generated, [N] reused
- Test coverage: [X]%
- Build status: PASS/FAIL

## Visual QA Results
| Page | Desktop (1440) | Tablet (768) | Mobile (375) | Status |
|------|---------------|--------------|--------------|--------|
| Home | ✓ Match | ✓ Match | ⚠ Minor diff | Verified |

## Quality Gate
| Check | Status | Details |
|-------|--------|---------|
| vitest | ✓ | 45/45 tests pass, 87% coverage |
| tsc | ✓ | No type errors |
| build | ✓ | Bundle: 142kb gzipped |
| tokens | ✓ | No violations |
| Lighthouse | ✓ | Perf: 95, A11y: 100, BP: 100, SEO: 100 |

## Remaining Issues
- [List any items that need manual review]
```

## Output Summary

At the end of a successful conversion, the following artifacts are produced:

```
project/
├── tailwind.config.ts          # Extended with Figma design tokens
├── src/
│   ├── styles/
│   │   ├── tokens.css          # CSS custom properties from Figma
│   │   └── design-tokens.lock.json  # Lockfile (if generated)
│   ├── lib/
│   │   ├── utils.ts            # Utility functions (cn, etc.)
│   │   └── fonts.ts            # Font loading configuration
│   ├── components/
│   │   ├── ui/                 # Primitive UI components
│   │   ├── layout/             # Layout components (header, footer)
│   │   └── sections/           # Page sections
│   └── app/ or pages/          # Page compositions
├── .claude/
│   ├── plans/
│   │   └── build-spec.json     # Build specification (if generated)
│   └── visual-qa/
│       └── build-report.md     # Visual QA and quality report
└── public/
    └── images/                 # Exported Figma assets
```

## Common Failures

### 1. Colors Don't Match Figma

**Symptom:** Colors are visibly different from the Figma design.

**Cause:** Figma uses a different color space, or variables were not resolved correctly.

**Fix:** Re-extract colors using `get_variable_defs`. If lockfile exists, verify lockfile values against Figma screenshot. Ensure Figma color mode is sRGB.

### 2. Typography Scale Is Off

**Symptom:** Text sizes or line heights don't match Figma.

**Cause:** Figma measures in logical pixels; CSS may differ depending on root font size.

**Fix:** Ensure `html { font-size: 16px }` as baseline. Map Figma text styles 1:1 with rem values. Cross-reference lockfile typography section.

### 3. Spacing Inconsistencies

**Symptom:** Padding and margins differ from Figma auto-layout values.

**Cause:** Figma auto-layout padding/gap values were not mapped to the Tailwind spacing scale.

**Fix:** Use exact pixel values from Figma auto-layout settings. Add custom spacing values to `tailwind.config.ts` if they don't fit the default scale.

### 4. Components Missing Variants

**Symptom:** A Figma component has hover/active/disabled states that aren't implemented.

**Cause:** Component variants in Figma were not fully surveyed in Phase 1.

**Fix:** Re-inspect the component in Figma using `get_design_context` to capture all variant properties.

### 5. Tests Fail After Generation

**Symptom:** `pnpm vitest run` fails after component generation.

**Cause:** Component implementation doesn't match lockfile values encoded in tests.

**Fix:** Read the failing test assertions. They contain exact expected values from the lockfile. Fix the component to match — do NOT modify the test.

## Integration

This skill works with:
- **figma-intake skill** — Produces `build-spec.json` consumed by Phase 1
- **design-token-lock skill** — Produces `design-tokens.lock.json` consumed by Phase 2
- **tdd-from-figma skill** — Produces test files that Phase 2 must satisfy
- **figma-react-converter agent** — Generates React components during Phase 2
- **visual-qa-agent** — Performs screenshot comparison in Phase 3
- **accessibility-auditor agent** — Validates ARIA and keyboard navigation
- **Figma MCP** — Source design extraction (`get_metadata`, `get_variable_defs`, `get_design_context`, `get_screenshot`)
- **Chrome DevTools MCP** — Browser-based visual verification and Lighthouse audits
- **Playwright MCP** — Cross-browser screenshot comparison
- **verify-tokens.sh** — Token integrity enforcement in quality gate

---

**Skill Version:** 2.0.0
**Last Updated:** 2026-03-16
