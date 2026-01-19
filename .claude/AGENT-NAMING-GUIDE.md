# Agent Naming Guide

This guide clarifies naming conflicts and helps you choose the right agent for your task.

## Code Reviewer Variants

There are **three agents** named "code-reviewer" with different purposes. Use this guide to select the correct one:

### 1. feature-dev/code-reviewer
**When to use:** General code quality review during active development

**Focus:**
- Bug detection
- Security vulnerabilities
- Code smells and anti-patterns
- Best practices compliance

**Model:** Sonnet (faster reviews)

**Tools:** Read-only (Glob, Grep, Read)

**Confidence:** Reports issues ≥80% confidence

**Example scenarios:**
- "Review this function for bugs"
- "Check if this code is secure"
- "Is this following best practices?"

---

### 2. pr-review-toolkit/code-reviewer
**When to use:** Pull request reviews before merging

**Focus:**
- PR-specific analysis
- Cross-file impact assessment
- Merge readiness
- Integration concerns

**Model:** Opus (comprehensive reviews)

**Tools:** Full access (can run tests, check dependencies)

**Confidence:** Reports issues ≥80% confidence

**Example scenarios:**
- "Review this PR for merge"
- "What's the impact of these changes?"
- "Is this PR ready to ship?"

---

### 3. superpowers/code-reviewer
**When to use:** Verifying implementation matches the plan

**Focus:**
- Plan alignment verification
- Architectural decision validation
- Implementation completeness
- Requirement traceability

**Model:** Inherits from parent (flexible)

**Tools:** Full access

**Example scenarios:**
- "Does this implementation match our plan?"
- "Did we follow the architecture we agreed on?"
- "Are all planned features implemented?"

---

## Quick Decision Tree

```
Need to review code?
│
├─ Is there an implementation plan? ────> superpowers/code-reviewer
│
├─ Is this for a PR/merge? ────────────> pr-review-toolkit/code-reviewer
│
└─ General development review ─────────> feature-dev/code-reviewer
```

---

## Code Simplifier Location

**Previously:** Had both standalone `code-simplifier` plugin AND `pr-review-toolkit/code-simplifier` agent (duplicate)

**Now:** Only `pr-review-toolkit/code-simplifier` remains (standalone plugin removed)

**When to use:** After code review suggests simplification, invoke this agent to refactor complex code while preserving functionality.

---

## Other Naming Clarifications

### Test Agents
- **test-writer-fixer** (custom): Writes tests, runs them, fixes failures
- **pr-test-analyzer** (pr-review-toolkit): Analyzes test coverage in PRs
- **Use both:** They're complementary (active vs. passive testing)

### Frontend Agents
- **frontend-developer** (custom): Full-stack frontend implementation
- **frontend-design** (plugin): UI/UX design and prototyping
- **Use both:** Design first, then implement

---

## WordPress FSE Development Stack

For WordPress block theme development, your core agents are:

**Code Quality:**
- feature-dev/code-reviewer (development reviews)
- pr-review-toolkit/code-reviewer (PR reviews)

**Development:**
- frontend-developer (JS/CSS implementation)
- test-writer-fixer (PHP unit tests)

**Performance:**
- performance-benchmarker (optimization)

**Design:**
- ui-designer (block patterns, theme design)
- ux-researcher (usability testing)

**Infrastructure:**
- php-lsp (code intelligence)
- security-guidance (WordPress security)

---

## When in Doubt

If you're unsure which agent to use:
1. Check this guide's decision tree
2. Use the more specific agent (e.g., pr-review-toolkit for PRs)
3. Ask Claude Code: "Which code-reviewer should I use for [task]?"

---

**Last Updated:** 2026-01-18
