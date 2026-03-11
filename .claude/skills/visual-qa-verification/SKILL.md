---
name: visual-qa-verification
description: Use after Figma-to-React conversion to verify generated components and pages match the source design. Covers screenshot comparison, responsive checks, Lighthouse audits, asset rendering, and accessibility validation. Keywords: verify app, visual QA, compare to Figma, check screenshots, responsive test, pixel-perfect check, cross-browser testing
---

# Visual QA Verification

## Overview

After the figma-react-converter agent generates React components and pages, this skill guides verification that the output matches the Figma source design. It covers screenshot comparison, responsive behavior, accessibility, performance, and asset rendering.

**Core Principle:** Every converted design must be visually verified before delivery. Build checks validate structure and types; this skill validates what the user actually sees in the browser.

## When to Use

Use this skill when:
- A Figma-to-React conversion has just completed
- Verifying generated components match their Figma source
- Running post-conversion visual QA
- Checking responsive behavior of generated pages
- Validating that all images and assets render correctly

**Symptoms that trigger this skill:**
- "verify app"
- "visual QA"
- "compare to Figma"
- "check screenshots"
- "does it match the design"
- "responsive check"
- "pixel-perfect"

## Verification Checklist

Run these checks in order after conversion completes.

### Step 1: Start Development Server

Start the React application and verify it builds and renders without errors.

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Verify build passes (catches TypeScript errors, missing imports)
pnpm build
```

**Check the terminal output for:**
- Zero TypeScript errors
- Zero import resolution failures
- No runtime console errors on initial load

Open the browser console and verify no errors or warnings appear on page load.

### Step 2: Screenshot Comparison

Take screenshots at standard breakpoints and compare against the Figma source.

**Breakpoints to test:**

| Breakpoint | Width | Description |
|------------|-------|-------------|
| Mobile | 375px | iPhone SE / small phones |
| Tablet | 768px | iPad portrait |
| Desktop | 1280px | Standard laptop |
| Wide | 1440px | Design canvas (Figma default) |
| Extra-large | 1920px | Full HD monitors / large displays |

**Using Chrome DevTools MCP (Chromium -- primary):**

```
1. Navigate to the local dev server URL (e.g., http://localhost:3000)
2. Resize page to each breakpoint width
3. Take screenshot at each breakpoint
4. Get Figma source screenshot using Figma MCP (get_screenshot)
5. Compare side-by-side
```

**Using Playwright MCP (Firefox and WebKit -- cross-browser):**

```
1. Navigate to the dev server URL in Firefox
2. Resize to each breakpoint and take screenshots
3. Repeat in WebKit
4. Compare Firefox/WebKit screenshots against Chromium baseline
5. Flag any browser-specific rendering differences
```

Or use the Playwright MCP tools directly (`browser_navigate`, `browser_resize`, `browser_take_screenshot`) for interactive testing.

**What to compare:**
- Layout structure (columns, rows, spacing, alignment)
- Typography (font sizes, weights, line heights, letter spacing)
- Color accuracy (background, text, borders, shadows)
- Component alignment (centered, left, right)
- Whitespace and padding
- Cross-browser rendering consistency (Chromium vs Firefox vs WebKit)

### Step 3: Asset and Image Rendering

Verify all images and assets load correctly. This catches broken imports and missing files.

```bash
# Check for broken image imports in components
grep -r "src=\"\"" src/components/ --include="*.tsx" && echo "FAIL: Empty src found" || echo "PASS"

# Check that image imports resolve
grep -r "from.*\.\(png\|jpg\|jpeg\|webp\|svg\|avif\)" src/components/ --include="*.tsx"

# Check for hardcoded external image URLs (should use imports or public/ paths)
grep -r "src=\"http" src/components/ --include="*.tsx" && echo "WARN: Hardcoded URLs" || echo "PASS"

# Verify public directory assets exist
ls public/images/ 2>/dev/null || echo "No public/images/ directory"
```

**In browser:** Open DevTools Network tab, filter by "Img", reload page. Any 404s indicate broken image references or missing assets.

**Common issues:**
- Image import path is wrong (case sensitivity on Linux/CI)
- Asset not exported from Figma and placed in the project
- Using `<img src="">` instead of a proper import or public path
- Next.js `<Image>` component missing required `width`/`height` props

### Step 4: Responsive Behavior

Test that layouts respond correctly at each breakpoint.

**Check for:**
- Navigation collapses to mobile menu at mobile breakpoints
- Multi-column layouts stack on mobile
- Images scale proportionally (no overflow or distortion)
- Text remains readable at all sizes
- Touch targets are at least 44x44px on mobile
- No horizontal scrollbar on any breakpoint
- Tailwind responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) applied correctly

**Common failures after conversion:**
- Fixed widths that should be fluid (`max-w-*` not `w-[fixed]`)
- Flexbox items that don't wrap (`flex-wrap` missing)
- Images overflowing containers (missing `max-w-full` or `w-full`)
- Grid columns not adjusting (missing responsive `grid-cols-*` variants)
- Text size not scaling (missing responsive `text-*` variants)

### Step 5: Lighthouse Audit

Run Lighthouse to catch performance and accessibility issues.

**Target scores:**

| Category | Minimum | Target |
|----------|---------|--------|
| Performance | 80 | 90+ |
| Accessibility | 90 | 100 |
| Best Practices | 90 | 100 |
| SEO | 90 | 100 |

**Using Chrome DevTools MCP:**
```
Run lighthouse_audit on the app's main page
```

**Common issues in generated React apps:**
- Missing `alt` text on images (accessibility)
- Large unoptimized images without lazy loading (performance)
- Missing `<meta name="description">` (SEO)
- Low color contrast ratios (accessibility)
- Large JavaScript bundles (performance -- check code splitting)
- Missing `<html lang="en">` (accessibility)

### Step 6: Accessibility Checks

Beyond Lighthouse, manually verify:

- **Keyboard navigation:** Tab through the page. Every interactive element must be reachable. Tab order must match visual order.
- **Focus indicators:** Visible focus rings on all focusable elements (`focus-visible:ring-*`).
- **Heading hierarchy:** h1 > h2 > h3, no skipped levels. One h1 per page.
- **Color contrast:** Text meets WCAG AA (4.5:1 for normal text, 3:1 for large text).
- **Skip link:** First focusable element should be "Skip to content".
- **Landmark regions:** `<header>`, `<nav>`, `<main>`, `<footer>` present with correct hierarchy.
- **ARIA attributes:** Interactive components have proper `role`, `aria-expanded`, `aria-label`, etc.
- **Screen reader:** Content reads in a logical order.

```bash
# Check heading hierarchy in components
grep -rn "<h[1-6]" src/components/ --include="*.tsx" | sort

# Check for missing alt attributes
grep -rn "<img" src/components/ --include="*.tsx" | grep -v "alt="

# Check for interactive elements without ARIA
grep -rn "onClick" src/components/ --include="*.tsx" | grep -v "role=" | grep -v "<button" | grep -v "<a "
```

## Design Token Verification

Confirm the app uses only design tokens from the Tailwind config, not hardcoded values.

```bash
# Check for hardcoded hex colors in components (should use Tailwind classes)
grep -rE '#[0-9a-fA-F]{3,8}' src/components/ --include="*.tsx" | grep -v "// token:" | grep -v ".css"

# Check for hardcoded pixel values in Tailwind arbitrary values (should use scale)
grep -rE '\b(w|h|p|m|gap)-\[' src/components/ --include="*.tsx"

# Check for inline styles (should be rare or absent)
grep -r 'style={{' src/components/ --include="*.tsx"
```

**Verify in browser:**
- Change a color in `tailwind.config.ts` or `tokens.css`, restart dev server -- it should update everywhere
- Change a font size token, restart -- all matching text should update
- Change spacing tokens, restart -- all matching spacing should update

## Common Failures

### 1. Fonts Don't Match

**Symptom:** Body text or headings use wrong font family.

**Cause:** Font not loaded, or Tailwind `fontFamily` config doesn't match the CSS import.

**Fix:** Check `tailwind.config.ts` > `theme.extend.fontFamily` and verify fonts are loaded via `next/font` (Next.js), `@fontsource` packages (Vite), or a CSS `@import` from Google Fonts.

### 2. Colors Are Close But Not Exact

**Symptom:** Colors are visibly different from Figma.

**Cause:** Figma uses a different color space, or variables were not resolved correctly.

**Fix:** Re-extract color palette from Figma using `get_variable_defs` or `get_design_context`. Ensure Figma color mode is sRGB.

### 3. Spacing Feels Wrong

**Symptom:** Elements are too close or too far apart vs. the design.

**Cause:** Figma auto-layout padding/gap values were not mapped to the Tailwind spacing scale accurately.

**Fix:** Compare Tailwind config spacing values against Figma auto-layout settings. Add custom spacing values to `tailwind.config.ts` if they don't fit the default scale.

### 4. Images Missing or Broken

**Symptom:** Placeholder boxes or broken image icons.

**Cause:** Image assets were not exported from Figma, import paths are incorrect, or the file extension doesn't match.

**Fix:** Export images from Figma at 1x and 2x. Place in `public/images/` (static) or `src/assets/images/` (imported). Verify import paths are correct and case-sensitive.

### 5. Layout Breaks at Certain Breakpoints

**Symptom:** Content overlaps or overflows at specific viewport widths.

**Cause:** Missing responsive Tailwind variants or incorrect breakpoint logic.

**Fix:** Add responsive prefixes (`sm:`, `md:`, `lg:`) to layout classes. Test at every breakpoint in the table above, not just the extremes.

## Integration

This skill works with:
- **figma-react-converter agent** -- Generates the React components and pages to verify
- **visual-qa-agent** -- Performs visual comparison between screenshots and Figma source
- **accessibility-auditor agent** -- Runs comprehensive accessibility checks beyond Lighthouse
- **react-accessibility skill** -- Provides ARIA patterns and keyboard navigation guidance
- **react-performance-optimization skill** -- Provides bundle analysis and Core Web Vitals optimization
- **Chrome DevTools MCP** -- Screenshots, Lighthouse, responsive testing, network inspection
- **Playwright MCP** -- Cross-browser screenshots (Firefox, WebKit) and automated interaction testing
- **Figma MCP** -- Source design screenshots for comparison (`get_screenshot`, `get_design_context`)

## Verification Report Template

After completing all steps, summarize results:

```markdown
# Visual QA Report: [project-name]

**Date:** YYYY-MM-DD
**Figma Source:** [URL]
**Dev Server URL:** [local URL]

## Results

| Check | Status | Notes |
|-------|--------|-------|
| Build passes | PASS/FAIL | |
| Desktop match (1440px) | PASS/FAIL | |
| Tablet match (768px) | PASS/FAIL | |
| Mobile match (375px) | PASS/FAIL | |
| Cross-browser (Firefox) | PASS/FAIL | |
| Cross-browser (WebKit) | PASS/FAIL | |
| Images/assets render | PASS/FAIL | |
| Responsive behavior | PASS/FAIL | |
| Lighthouse Performance | XX/100 | |
| Lighthouse Accessibility | XX/100 | |
| Keyboard navigation | PASS/FAIL | |
| Token-only styling | PASS/FAIL | |

## Issues Found
1. ...

## Recommendation
[ ] Ready for delivery
[ ] Needs fixes (see issues above)
```

---

**Skill Version:** 2.0.0
**Last Updated:** 2026-03-11
