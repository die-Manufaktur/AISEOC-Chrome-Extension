# Skills Catalog

**Last Updated:** 2026-03-11
**Total Skills:** 6
**Location:** `.claude/skills/`

Skills are documentation-based workflows that trigger automatically when relevant keywords appear in conversation. They provide systematic guidance, not tool integrations.

---

## Skills Index

### 1. figma-to-react-workflow
- **Purpose:** Orchestrates the Figma-to-React conversion pipeline
- **Triggers:** "convert Figma", "Figma to React", "design to code"
- **Works with:** figma-react-converter agent, asset-cataloger agent

### 2. react-component-development
- **Purpose:** React component patterns, TypeScript conventions, and Tailwind CSS best practices
- **Triggers:** "create component", "component pattern", "React best practices"
- **Works with:** frontend-developer agent, ui-designer agent

### 3. react-testing-workflows
- **Purpose:** Testing strategy with Vitest, React Testing Library, Playwright, and Storybook
- **Triggers:** "write tests", "test coverage", "Vitest", "Playwright", "Storybook"
- **Works with:** test-writer-fixer agent, test-results-analyzer agent

### 4. react-performance-optimization
- **Purpose:** Performance profiling, bundle analysis, code splitting, and Web Vitals
- **Triggers:** "performance", "bundle size", "Web Vitals", "lazy loading", "profiling"
- **Works with:** performance-benchmarker agent, analytics-reporter agent

### 5. react-accessibility
- **Purpose:** WCAG 2.1 AA patterns for React, ARIA usage, keyboard navigation
- **Triggers:** "accessibility", "WCAG", "ARIA", "a11y", "keyboard navigation"
- **Works with:** accessibility-auditor agent, ux-researcher agent

### 6. visual-qa-verification
- **Purpose:** Post-conversion visual QA: screenshots, responsive checks, cross-browser testing
- **Triggers:** "visual QA", "compare to Figma", "screenshot diff", "cross-browser"
- **Works with:** visual-qa-agent agent, accessibility-auditor agent

---

## Pipeline Flow

```
Figma Design
    |
    v
figma-to-react-workflow (orchestrator)
    |
    +-- react-component-development (component patterns)
    +-- react-accessibility (WCAG compliance)
    |
    v
Generated React Components
    |
    +-- react-testing-workflows (test coverage)
    +-- react-performance-optimization (bundle/runtime)
    +-- visual-qa-verification (visual regression)
    |
    v
Production-Ready Components
```

## Skills vs Agents vs Plugins

| Type | Purpose | Invocation |
|------|---------|------------|
| **Skills** | Systematic workflows and best practices | Automatic keyword detection |
| **Agents** | Specialized task execution | Task tool (auto or explicit) |
| **Plugins** | Tool integrations and commands | Manual `/` commands |

## Skill File Structure

```yaml
---
name: skill-name
description: Use when [triggers]. Keywords: term1, term2
---

# Skill Name
## Overview
## When to Use
## Quick Reference
## Implementation
## Common Mistakes
```
